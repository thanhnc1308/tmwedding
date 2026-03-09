'use client';

import { useState } from 'react';
import Navigation from '@/features/invitation/components/Navigation';
import Banner from '@/features/invitation/components/Banner';
import PhotoGallery from '@/features/invitation/components/PhotoGallery';
import WeddingMonetaryGift from '@/features/invitation/components/WeddingMonetaryGift';
import InvitationResponse from '@/features/invitation/components/InvitationResponse';
import WeddingGuestBook from '@/features/invitation/components/WeddingGuestBook';
import Footer from '@/features/invitation/components/Footer';
import EventInfo from '@/features/invitation/components/EventInfo';
import Envelop from '@/features/invitation/components/Envelop';
import InvitationMessage from '@/features/invitation/components/InvitationMessage';
import GiftMessage from '@/features/invitation/components/GiftMessage';
import { Box, Fade, Grow } from '@mui/material';
import { Guest, GuestSource } from '@/types/guest';
import { WeddingInvitationContext } from '@/features/invitation/context/WeddingInvitationContext';

export default function WeddingInvitation({
  guest,
  side,
}: {
  guest: Guest | null;
  side?: GuestSource;
}) {
  const resolvedSide = side ?? guest?.guestSource ?? GuestSource.Groom;
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);

  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
  };

  const shouldShowEnvelop = guest !== null && !isInvitationOpened;
  const shouldShowContent = guest === null || isInvitationOpened;

  return (
    <WeddingInvitationContext.Provider
      value={{ isInvitationOpened, handleOpenInvitation }}
    >
      <Fade in={shouldShowEnvelop} timeout={800} unmountOnExit>
        <Box>
          <Envelop guest={guest} />
        </Box>
      </Fade>

      <Grow
        in={shouldShowContent}
        timeout={1000}
        style={{ transformOrigin: '0 0 0' }}
        unmountOnExit
      >
        <Box>
          <Navigation />
          <Banner />
          <InvitationMessage />
          <EventInfo side={resolvedSide} />
          <PhotoGallery />
          <GiftMessage />
          <WeddingMonetaryGift />
          <InvitationResponse guest={guest} />
          <WeddingGuestBook />
          <Footer />
        </Box>
      </Grow>
    </WeddingInvitationContext.Provider>
  );
}
