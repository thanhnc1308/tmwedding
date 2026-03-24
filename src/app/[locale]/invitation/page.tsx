import WeddingInvitation from '@/features/invitation/components/WeddingInvitation';
import { GuestSource } from '@/types/guest';

export default function GeneralInvitation() {
  return <WeddingInvitation guest={null} side={GuestSource.Groom} />;
}
