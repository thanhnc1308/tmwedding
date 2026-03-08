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
        backgroundColor: COLORS.bgCream,
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
              color: COLORS.primary,
              fontWeight: 600,
              mb: 3,
              fontSize: { xs: '1.5rem', md: '2rem' },
              lineHeight: 1.4,
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
                  color: COLORS.textSecondary,
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

          {/* Decorative Hearts */}
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              opacity: 0.5,
            }}
          >
            {[...Array(3)].map((_, index) => (
              <Favorite
                key={index}
                sx={{
                  color: COLORS.heartRed,
                  fontSize: '0.8rem',
                  animation: `float ${3 + index * 0.8}s ease-in-out infinite`,
                  animationDelay: `${index * 0.5}s`,
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-4px)' },
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
