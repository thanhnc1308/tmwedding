'use client';

import { Avatar, Box, Typography } from '@mui/material';
import { useWeddingInvitation } from '@/features/invitation/context/WeddingInvitationContext';
import { Guest } from '@/types/guest';
import { BRIDE_NAME, GROOM_NAME } from '@/constants/wedding';
import { COLORS, FONTS } from '../constants/design';

export default function Envelop({ guest }: { guest: Guest | null }) {
  const { handleOpenInvitation } = useWeddingInvitation();

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        backgroundImage: 'url(/images/bg-envelop-page.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        px: 3,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '480px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Guest greeting */}
        {guest?.name && (
          <>
            <Typography
              sx={{
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                fontFamily: FONTS.serif,
                fontWeight: 500,
                letterSpacing: '0.15em',
                color: COLORS.textSecondary,
                mb: 2,
                textAlign: 'center',
                opacity: 0,
                animation: 'fadeInDown 1s ease forwards',
                animationDelay: '0.2s',
                '@keyframes fadeInDown': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(-16px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              Trân trọng kính mời
            </Typography>
            <Avatar
              sx={{
                width: { xs: 64, sm: 80 },
                height: { xs: 64, sm: 80 },
                mb: 1.5,
                bgcolor: COLORS.primary,
                color: '#fff',
                fontSize: { xs: '1.5rem', sm: '1.8rem' },
                fontFamily: FONTS.display,
                opacity: 0,
                animation: 'fadeInDown 1s ease forwards',
                animationDelay: '0.2s',
                '@keyframes fadeInDown': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(-16px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
              alt={guest?.name || ''}
              src='/images/wax-seal.webp'
            >
              {guest?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Typography
              sx={{
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                fontFamily: FONTS.serif,
                fontWeight: 500,
                letterSpacing: '0.15em',
                color: COLORS.textSecondary,
                mb: 2,
                textAlign: 'center',
                opacity: 0,
                animation: 'fadeInDown 1s ease forwards',
                animationDelay: '0.2s',
              }}
            >
              {guest?.name}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                fontFamily: FONTS.serif,
                fontWeight: 500,
                letterSpacing: '0.15em',
                color: COLORS.textSecondary,
                mb: 2,
                textAlign: 'center',
                opacity: 0,
                animation: 'fadeInDown 1s ease forwards',
                animationDelay: '0.2s',
                '@keyframes fadeInDown': {
                  from: {
                    opacity: 0,
                    transform: 'translateY(-16px)',
                  },
                  to: {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
              }}
            >
              đến dự lễ thành hôn của
            </Typography>
          </>
        )}

        {/* Couple names */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 0,
            opacity: 0,
            animation: 'fadeIn 1.2s ease forwards',
            animationDelay: '0.5s',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '2.8rem', sm: '3.5rem', md: '4rem' },
              fontFamily: FONTS.display,
              color: COLORS.primary,
              lineHeight: 1.1,
            }}
          >
            {GROOM_NAME}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.2rem' },
              fontFamily: FONTS.display,
              color: COLORS.accent,
              lineHeight: 1,
              my: { xs: -0.5, sm: 0 },
            }}
          >
            &
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '2.8rem', sm: '3.5rem', md: '4rem' },
              fontFamily: FONTS.display,
              color: COLORS.primary,
              lineHeight: 1.1,
            }}
          >
            {BRIDE_NAME}
          </Typography>
        </Box>

        <Box
          sx={{
            position: 'relative',
            mt: { xs: '-20%', sm: '-30%' },
            width: { xs: '450px', sm: '600px' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Envelope with wax seal */}
          <Box
            onClick={handleOpenInvitation}
            sx={{
              position: 'relative',
              width: '100%',
              cursor: 'pointer',
              opacity: 0,
              animation: 'envelopeReveal 1s ease forwards',
              animationDelay: '1s',
              '@keyframes envelopeReveal': {
                from: {
                  opacity: 0,
                  transform: 'translateY(24px) scale(0.95)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0) scale(1)',
                },
              },
              '&:hover .envelope-img': {
                filter:
                  'drop-shadow(0 12px 28px rgba(58, 74, 58, 0.25)) brightness(1.03)',
                transform: 'translateY(-3px)',
              },
              '&:hover .pointer-icon': {
                opacity: 1,
              },
            }}
          >
            {/* Envelope image */}
            <Box
              className='envelope-img'
              component='img'
              src='/images/envelop.webp'
              alt='Wedding Invitation Envelope'
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 8px 24px rgba(58, 74, 58, 0.18))',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />

            {/* Wax seal overlay */}
            <Box
              className='wax-seal'
              component='img'
              src='/images/wax-seal.webp'
              alt='Wax Seal'
              sx={{
                position: 'absolute',
                zIndex: 2,
                top: '60%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: '21%', sm: '20%' },
                height: 'auto',
                pointerEvents: 'none',
              }}
            />

            {/* Pointer click icon on the seal */}
            <Box
              component='img'
              src='/images/pointer.webp'
              alt=''
              sx={{
                position: 'absolute',
                zIndex: 3,
                top: '66%',
                left: '58%',
                transform: 'translate(-50%, -50%)',
                width: '40px',
                height: '40px',
                pointerEvents: 'none',
                filter:
                  'drop-shadow(0 0 1px rgba(58,74,58,0.6)) drop-shadow(0 0 0.5px rgba(58,74,58,0.4))',
                animation: 'pointerBounce 2s ease-in-out 2s infinite',
                '@keyframes pointerBounce': {
                  '0%, 100%': { transform: 'translate(-50%, -50%)' },
                  '50%': { transform: 'translate(-50%, calc(-50% - 6px))' },
                },
              }}
            />
          </Box>

          {/* Call to action */}
          <Typography
            sx={{
              position: 'absolute',
              bottom: '10%',
              mt: 2,
              whiteSpace: 'nowrap',
              fontSize: { xs: '1.3rem', sm: '1.5rem' },
              fontFamily: FONTS.display,
              fontStyle: 'italic',
              color: COLORS.textSecondary,
              letterSpacing: '0.05em',
              opacity: 0,
              animation: 'fadeIn 1s ease forwards',
              animationDelay: '1.3s',
            }}
          >
            Nhấn vào đây để mở phong bì
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
