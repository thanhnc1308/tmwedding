import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure } from '../trpc';
import InvitationResponseModel from '@/server/db/models/invitation-response.model';
import GuestModel from '@/server/db/models/guest.model';
import { GuestConfirmationStatus } from '@/types/guest';
import { checkRateLimit } from '@/server/utils/rate-limit';

interface InvitationResponseLean {
  _id: string;
  name: string;
  message?: string;
  createdAt: Date;
}

const submitResponseSchema = z.object({
  guestId: z.string().optional(),
  name: z.string().min(1, 'Name is required').max(100),
  numberOfGuests: z.number().min(1, 'At least 1 guest is required').max(20, 'Maximum 20 guests'),
  message: z.string().max(1000).optional(),
});

const getResponsesSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
});

export const invitationRouter = router({
  submitResponse: publicProcedure
    .input(submitResponseSchema)
    .mutation(async ({ input }) => {
      const { guestId, name, numberOfGuests, message } = input;

      const rateLimitKey = guestId || name;
      if (!checkRateLimit(rateLimitKey)) {
        throw new TRPCError({
          code: 'TOO_MANY_REQUESTS',
          message: 'Too many submissions. Please try again later.',
        });
      }

      let response;

      if (guestId) {
        // Upsert by guestId if provided
        response = await InvitationResponseModel.findOneAndUpdate(
          { guestId },
          { guestId, name, numberOfGuests, message },
          { upsert: true, new: true },
        );

        // Update the guest's status to accepted
        await GuestModel.findByIdAndUpdate(guestId, {
          status: GuestConfirmationStatus.Accepted,
          memberCount: numberOfGuests,
        });
      } else {
        // Create new response if no guestId
        response = await InvitationResponseModel.create({
          name,
          numberOfGuests,
          message,
        });
      }

      return {
        success: true,
        id: response._id.toString(),
      };
    }),

  getResponses: publicProcedure
    .input(getResponsesSchema)
    .query(async ({ input }) => {
      const { page, limit } = input;
      const skip = (page - 1) * limit;

      const [responses, total] = await Promise.all([
        InvitationResponseModel.find({ message: { $exists: true, $ne: '' } })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean<InvitationResponseLean[]>(),
        InvitationResponseModel.countDocuments({
          message: { $exists: true, $ne: '' },
        }),
      ]);

      return {
        data: responses.map((r) => ({
          id: r._id.toString(),
          name: r.name,
          message: r.message || '',
          createdAt: r.createdAt.toISOString(),
        })),
        total,
        page,
        totalPages: Math.ceil(total / limit),
      };
    }),
});
