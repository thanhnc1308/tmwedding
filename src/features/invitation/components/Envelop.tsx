'use client';

import { Box, Typography, Container } from '@mui/material';
import { useWeddingInvitation } from '@/features/invitation/context/WeddingInvitationContext';
import { Guest } from '@/types/guest';
import { BRIDE_NAME, GROOM_NAME } from '@/constants/wedding';
import { getGuestPronoun } from '../helpers/guest';
import { COLORS, FONTS } from '../constants/design';

function FloatingParticles() {
  const particles = Array.from({ length: 8 });
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles.map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            left: `${10 + ((i * 11) % 80)}%`,
            bottom: '-10%',
            fontSize: i % 2 === 0 ? '0.9rem' : '0.6rem',
            opacity: 0,
            color: 'rgba(255,255,255,0.4)',
            animation: `floatUp ${10 + (i % 3) * 2}s ease-in-out infinite`,
            animationDelay: `${(i * 1.2) % 10}s`,
            '@keyframes floatUp': {
              '0%': {
                transform: 'translateY(0) rotate(0deg)',
                opacity: 0,
              },
              '15%': { opacity: 0.18 },
              '85%': { opacity: 0.08 },
              '100%': {
                transform: `translateY(-110vh) rotate(${120 + ((i * 45) % 180)}deg)`,
                opacity: 0,
              },
            },
          }}
        >
          {i % 4 === 0 ? '♥' : i % 4 === 1 ? '✿' : i % 4 === 2 ? '❀' : '♥'}
        </Box>
      ))}
    </Box>
  );
}

export default function Envelop({ guest }: { guest: Guest | null }) {
  const { handleOpenInvitation } = useWeddingInvitation();
  const guestPronoun = getGuestPronoun(guest);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${COLORS.envelopeGradientStart} 0%, ${COLORS.envelopeGradientMid} 50%, ${COLORS.envelopeGradientEnd} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FloatingParticles />

      <Container maxWidth='sm' sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '24px',
            padding: { xs: 4, sm: 6 },
            paddingBottom: 0,
            textAlign: 'center',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
          }}
        >
          {/* Header Text */}
          <Typography
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontFamily: FONTS.serif,
              fontWeight: 400,
              letterSpacing: '0.3em',
              color: 'rgba(255, 255, 255, 0.92)',
              mb: 4,
              textTransform: 'uppercase',
            }}
          >
            {guest?.name || ''}, {guestPronoun} nhận được thư của
          </Typography>

          {/* Couple Names */}
          <Typography
            sx={{
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              fontFamily: FONTS.display,
              color: COLORS.goldLight,
              mb: 6,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            {GROOM_NAME} & {BRIDE_NAME}
          </Typography>

          {/* Envelope with Open Text */}
          <Box
            sx={{
              position: 'relative',
              maxWidth: '400px',
              margin: '0 auto',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              marginTop: { xs: 2, sm: 3 },
              animation: 'envelopePulse 3s ease-in-out infinite',
              '@keyframes envelopePulse': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-5px)' },
              },
              '&:hover': {
                animationPlayState: 'paused',
                transform: 'translateY(-6px) scale(1.01)',
              },
            }}
            onClick={handleOpenInvitation}
          >
            {/* Envelope Image */}
            <Box
              component='img'
              src='/images/envelop.png'
              alt='Wedding Invitation Envelope'
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />

            {/* Open Envelop Text */}
            <Box
              sx={{
                position: 'absolute',
                bottom: '65%',
                left: '53%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  textTransform: 'none',
                  fontFamily: FONTS.serif,
                }}
              >
                Mở thư
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
