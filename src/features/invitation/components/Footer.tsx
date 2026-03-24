'use client';

import { Box, Typography, Container, Tooltip } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { COLORS, FONTS } from '../constants/design';
import { Guest, GuestAgeComparison } from '@/types/guest';
import { getGuestPronoun } from '@/utils/guest';
import { useTranslation, interpolate } from '@/i18n';

export default function Footer({ guest }: { guest: Guest | null }) {
  const { t, locale } = useTranslation();
  const { guestPronoun, wePronoun } = getGuestPronoun(
    guest?.ageComparison ?? GuestAgeComparison.Same,
    guest?.gender,
    locale,
  );
  return (
    <Box
      component='footer'
      sx={{
        position: 'relative',
        py: { xs: 8, md: 10 },
        mt: 0,
        backgroundImage: 'url(/images/thankyou.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
        }}
      />

      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          {/* Thank You Script */}
          <Typography
            variant='h3'
            component='p'
            sx={{
              fontFamily: FONTS.script,
              color: '#FAFAF8',
              fontWeight: 600,
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
            }}
          >
            {t.footer.thankYou}
          </Typography>

          {/* Gratitude Message */}
          <Typography
            variant='body1'
            component='p'
            sx={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 400,
              fontFamily: FONTS.serif,
              lineHeight: 1.8,
              maxWidth: 550,
              mx: 'auto',
              mb: 4,
            }}
          >
            {interpolate(t.footer.message, {
              guestPronoun: guestPronoun.toLowerCase(),
              wePronoun: wePronoun,
              wePronounLowerCase: wePronoun.toLowerCase(),
            })
              .split('\n')
              .map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 ? <br /> : null}
                </span>
              ))}
          </Typography>

          {/* Made with Love Message */}
          <Typography
            variant='body2'
            component='p'
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: { xs: '0.85rem', md: '0.9rem' },
              fontWeight: 400,
              fontFamily: FONTS.serif,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              flexWrap: 'wrap',
              lineHeight: 1.6,
            }}
          >
            Crafted by{' '}
            <Tooltip title='and lots of help from AI :v' arrow placement='top'>
              <Box
                component='span'
                sx={{
                  cursor: 'help',
                  textDecoration: 'underline',
                  fontWeight: 600,
                  color: COLORS.heartRed,
                  fontFamily: FONTS.script,
                  fontSize: '1.1em',
                }}
              >
                Thành
              </Box>
            </Tooltip>{' '}
            with lots of{' '}
            <Favorite
              sx={{
                color: COLORS.heartRed,
                fontSize: '1.2rem',
                animation: 'heartbeat 3s ease-in-out infinite',
                '@keyframes heartbeat': {
                  '0%': { transform: 'scale(1)' },
                  '14%': { transform: 'scale(1.08)' },
                  '28%': { transform: 'scale(1)' },
                  '42%': { transform: 'scale(1.08)' },
                  '70%': { transform: 'scale(1)' },
                },
              }}
            />{' '}
            for{' '}
            <Box
              component='span'
              sx={{
                fontWeight: 600,
                color: COLORS.heartRed,
                fontFamily: FONTS.script,
                fontSize: '1.1em',
              }}
            >
              Mến
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
