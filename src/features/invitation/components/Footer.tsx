'use client';

import { Box, Typography, Container, Tooltip } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { COLORS, FONTS } from '../constants/design';

export default function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        position: 'relative',
        py: { xs: 8, md: 10 },
        mt: 0,
        backgroundImage: 'url(/images/wedding-bg.JPG)',
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
            Thank you!
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
              maxWidth: 500,
              mx: 'auto',
              mb: 4,
            }}
          >
            Cảm ơn bạn đã dành tình cảm cho chúng mình.
            <br />
            Sự hiện diện của bạn là món quà ý nghĩa nhất.
            <br />
            Chúng mình vô cùng trân quý khi được cùng bạn chia sẻ niềm hạnh
            phúc trong ngày.
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
            Made by{' '}
            <Tooltip title='and lots of help from AI :v' arrow placement='top'>
              <Box
                component='span'
                sx={{
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.6)',
                  cursor: 'help',
                  textDecoration: 'underline',
                  textDecorationStyle: 'dotted',
                  textUnderlineOffset: '3px',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    color: COLORS.heartRed,
                    textDecorationColor: COLORS.heartRed,
                  },
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
