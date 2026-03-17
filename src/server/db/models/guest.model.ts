import {
  GuestConfirmationStatus,
  GuestSource,
  GuestAgeComparison,
  GuestGender,
} from '@/types/guest';
import mongoose from 'mongoose';
import '../mongodb'; // Auto-connect to MongoDB

export interface Guest extends mongoose.Document {
  _id: string;
  name: string;
  memberCount: number;
  status: string;
  invited: boolean;
  guestSource: string;
  ageComparison: string;
  gender?: string;
}

const GuestSchema = new mongoose.Schema<Guest>({
  _id: {
    // https://www.mongodb.com/docs/manual/core/document/
    type: String,
    required: true,
    immutable: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for this guest.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  memberCount: {
    type: Number,
    default: 1,
  },
  status: {
    type: String,
    enum: [
      GuestConfirmationStatus.Accepted,
      GuestConfirmationStatus.Pending,
      GuestConfirmationStatus.Declined,
    ],
    default: GuestConfirmationStatus.Pending,
  },
  invited: {
    type: Boolean,
    default: false,
  },
  guestSource: {
    type: String,
    enum: [GuestSource.Groom, GuestSource.Bride],
    default: GuestSource.Groom,
  },
  ageComparison: {
    type: String,
    enum: [
      GuestAgeComparison.Older,
      GuestAgeComparison.Younger,
      GuestAgeComparison.Same,
    ],
    default: GuestAgeComparison.Same,
  },
  gender: {
    type: String,
    enum: [GuestGender.Male, GuestGender.Female],
    required: false,
  },
});

GuestSchema.index({ name: 1 });
GuestSchema.index({ guestSource: 1 });
GuestSchema.index({ status: 1 });
GuestSchema.index({ invited: 1 });

export default mongoose.models.Guest ||
  mongoose.model<Guest>('Guest', GuestSchema);
