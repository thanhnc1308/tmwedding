import WeddingInvitation from '@/features/invitation/components/WeddingInvitation';
import { getGuestById } from '@/server/services/guest.service';

export const revalidate = 300;

type GuestInvitationPageProps = {
  params: Promise<{
    guestId: string;
  }>;
};

export default async function GuestInvitation({
  params,
}: GuestInvitationPageProps) {
  const { guestId } = await params;
  const guest = await getGuestById(guestId);

  return <WeddingInvitation guest={guest} />;
}
