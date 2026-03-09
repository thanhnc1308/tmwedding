'use client';

import { Box, Typography, Container, Tooltip } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { COLORS, FONTS } from '../constants/design';

export default function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        py: 4,
        mt: 0,
        backgroundColor: COLORS.primaryDark,
        borderTop: `1px solid ${COLORS.borderGold}`,
        position: 'relative',
      }}
    >
      <Container maxWidth='lg'>
        <Box sx={{ textAlign: 'center' }}>
          {/* Main Thank You Message */}
          <Typography
            variant='h5'
            component='p'
            sx={{
              fontFamily: FONTS.script,
              color: COLORS.accent,
              mb: 3,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
              lineHeight: 1.4,
              textShadow: '0 0 20px rgba(232, 168, 56, 0.2)',
            }}
          >
            Thành & Mến cảm ơn mọi người!
          </Typography>

          {/* Made with Love Message */}
          <Typography
            variant='body1'
            component='p'
            sx={{
              color: COLORS.textSecondary,
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 400,
              fontFamily: FONTS.body,
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
                  color: COLORS.textSecondary,
                  cursor: 'help',
                  textDecoration: 'underline',
                  textDecorationStyle: 'dotted',
                  textUnderlineOffset: '3px',
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    color: COLORS.accent,
                    textDecorationColor: COLORS.accent,
                  },
                }}
              >
                Thành
              </Box>
            </Tooltip>{' '}
            with lots of{' '}
            <Favorite
              sx={{
                color: COLORS.coral,
                fontSize: '1.2rem',
                animation: 'heartbeat 3s ease-in-out infinite',
                filter: `drop-shadow(0 0 6px ${COLORS.coral})`,
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
                color: COLORS.coral,
                fontFamily: FONTS.script,
                fontSize: '1.2em',
                textShadow: `0 0 15px ${COLORS.coral}`,
              }}
            >
              Mến
            </Box>
          </Typography>

          {/* Decorative lantern dots */}
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            {[COLORS.accent, COLORS.coral, COLORS.lanternRed, COLORS.coral, COLORS.accent].map((color, index) => (
              <Box
                key={index}
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: color,
                  opacity: 0.5,
                  boxShadow: `0 0 8px ${color}`,
                  animation: `firefly ${3 + index * 0.5}s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`,
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
