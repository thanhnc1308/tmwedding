import mongoose from 'mongoose';
import '../mongodb'; // Auto-connect to MongoDB

export interface InvitationResponse extends mongoose.Document {
  guestId?: string;
  name: string;
  numberOfGuests: number;
  message?: string;
  createdAt: Date;
}

const InvitationResponseSchema = new mongoose.Schema<InvitationResponse>(
  {
    guestId: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: [true, 'Please provide a name.'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
    },
    message: {
      type: String,
      maxlength: [1000, 'Message cannot be more than 1000 characters'],
    },
  },
  {
    timestamps: true,
  },
);

InvitationResponseSchema.index({ createdAt: -1 });
InvitationResponseSchema.index({ guestId: 1 }, { sparse: true });
InvitationResponseSchema.index({ message: 1, createdAt: -1 });

export default mongoose.models.InvitationResponse ||
  mongoose.model<InvitationResponse>(
    'InvitationResponse',
    InvitationResponseSchema,
  );
