'use client';

import { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Banner from '@/features/invitation/components/Banner';
import InvitationResponse from '@/features/invitation/components/InvitationResponse';
import Footer from '@/features/invitation/components/Footer';
import EventInfo from '@/features/invitation/components/EventInfo';
import Envelop from '@/features/invitation/components/Envelop';
import Timeline from '@/features/invitation/components/Timeline';
import GiftMessage from '@/features/invitation/components/GiftMessage';
import InvitationHeading from '@/features/invitation/components/InvitationHeading';

const PhotoGallery = dynamic(() => import('./PhotoGallery'), { ssr: false });
const WeddingMonetaryGift = dynamic(() => import('./WeddingMonetaryGift'), { ssr: false });
const WeddingGuestBook = dynamic(() => import('./WeddingGuestBook'), { ssr: false });
import MusicToggle from '@/features/invitation/components/MusicToggle';
import { Box, Fade, Grow } from '@mui/material';
import { Guest, GuestSource } from '@/types/guest';
import { WeddingInvitationContext } from '@/features/invitation/context/WeddingInvitationContext';
import { useBackgroundMusic } from '@/features/invitation/hooks/useBackgroundMusic';

export default function WeddingInvitation({
  guest,
  side,
}: {
  guest: Guest | null;
  side?: GuestSource;
}) {
  const resolvedSide = side ?? guest?.guestSource ?? GuestSource.Groom;
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const { play, isPlaying, isMuted, toggleMute } = useBackgroundMusic(
    '/audio/bg-music.mp3',
  );

  const handleOpenInvitation = useCallback(() => {
    setIsInvitationOpened(true);
    play();
  }, [play]);

  const contextValue = useMemo(
    () => ({ isInvitationOpened, handleOpenInvitation }),
    [isInvitationOpened, handleOpenInvitation],
  );

  const shouldShowEnvelop = guest !== null && !isInvitationOpened;
  const shouldShowContent = guest === null || isInvitationOpened;

  return (
    <WeddingInvitationContext.Provider value={contextValue}>
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
          <Banner />
          <InvitationHeading />
          <EventInfo side={resolvedSide} />
          <Timeline />
          <PhotoGallery />
          <GiftMessage />
          <WeddingMonetaryGift />
          <InvitationResponse guest={guest} />
          <WeddingGuestBook />
          <Footer />
        </Box>
      </Grow>
      {(isPlaying || guest === null) && (
        <MusicToggle
          isPlaying={isPlaying}
          isMuted={isMuted}
          onPlay={play}
          onToggle={toggleMute}
        />
      )}
    </WeddingInvitationContext.Provider>
  );
}
