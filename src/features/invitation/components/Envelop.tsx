'use client';

import { Box, Typography, Container } from '@mui/material';
import { useWeddingInvitation } from '@/features/invitation/context/WeddingInvitationContext';
import { Guest } from '@/types/guest';
import { BRIDE_NAME, GROOM_NAME } from '@/constants/wedding';
import { getGuestPronoun } from '../helpers/guest';
import { COLORS, FONTS } from '../constants/design';

function FloatingParticles() {
  const particles = Array.from({ length: 10 });
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
            left: `${5 + ((i * 9.5) % 90)}%`,
            top: `${10 + ((i * 14) % 80)}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            borderRadius: '50%',
            backgroundColor: COLORS.accent,
            animation: `firefly ${8 + (i % 4) * 2}s ease-in-out infinite`,
            animationDelay: `${(i * 1.3) % 8}s`,
            boxShadow: `0 0 6px ${COLORS.accent}, 0 0 12px ${COLORS.accent}`,
          }}
        />
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
        background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 50%, ${COLORS.primaryLight} 100%)`,
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
            background: COLORS.bgCard,
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: { xs: 4, sm: 6 },
            textAlign: 'center',
            boxShadow: COLORS.glowAmber,
            border: `1px solid ${COLORS.borderGold}`,
            overflow: 'hidden',
          }}
        >
          {/* Small lantern icon */}
          <svg width='28' height='38' viewBox='0 0 28 38' fill='none' style={{ margin: '0 auto 20px', display: 'block' }}>
            <rect x='11' y='0' width='6' height='5' rx='3' fill={COLORS.accent} opacity='0.5' />
            <ellipse cx='14' cy='20' rx='10' ry='14' fill={COLORS.accent} opacity='0.1' />
            <ellipse cx='14' cy='20' rx='9' ry='13' stroke={COLORS.accent} strokeWidth='1' opacity='0.4' />
            <ellipse cx='14' cy='20' rx='5' ry='8' fill={COLORS.accent} opacity='0.15' />
            <line x1='14' y1='5' x2='14' y2='8' stroke={COLORS.accent} strokeWidth='1' opacity='0.4' />
          </svg>

          {/* Header Text */}
          <Typography
            sx={{
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontFamily: FONTS.body,
              fontWeight: 400,
              letterSpacing: '0.3em',
              color: COLORS.textSecondary,
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
              fontFamily: FONTS.script,
              color: COLORS.accent,
              mb: 6,
              textShadow: '0 0 40px rgba(232, 168, 56, 0.3), 0 0 80px rgba(232, 168, 56, 0.1)',
            }}
          >
            {GROOM_NAME} & {BRIDE_NAME}
          </Typography>

          {/* Open Envelope Button */}
          <Box
            sx={{
              cursor: 'pointer',
              display: 'inline-block',
              backgroundColor: COLORS.accent,
              color: COLORS.textOnPrimary,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontFamily: FONTS.body,
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '0.1em',
              boxShadow: '0 4px 20px rgba(232, 168, 56, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 30px rgba(232, 168, 56, 0.4)',
              },
              animation: 'lanternFloat 3s ease-in-out infinite',
            }}
            onClick={handleOpenInvitation}
          >
            Mở thư mời
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
