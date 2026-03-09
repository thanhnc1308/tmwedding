import WeddingInvitation from '@/features/invitation/components/WeddingInvitation';
import { GuestSource } from '@/types/guest';

export default function BrideInvitation() {
  return <WeddingInvitation guest={null} side={GuestSource.Bride} />;
}
