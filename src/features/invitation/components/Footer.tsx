'use client';

import { Box, Typography, Container, Tooltip } from '@mui/material';
import { Favorite } from '@mui/icons-material';

interface FooterProps {
  backgroundColor?: string;
  textColor?: string;
  heartColor?: string;
  showBackground?: boolean;
}

export default function Footer({
  backgroundColor = 'rgba(255, 255, 255, 0.9)',
  textColor = '#6b7280',
  heartColor = '#ff6b6b',
  showBackground = true,
}: FooterProps) {
  return (
    <Box
      component='footer'
      sx={{
        py: 4,
        mt: 6,
        backgroundColor: showBackground ? backgroundColor : 'transparent',
        backdropFilter: showBackground ? 'blur(10px)' : 'none',
        borderTop: showBackground
          ? '1px solid rgba(107, 114, 128, 0.1)'
          : 'none',
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
              fontFamily: "'Dancing Script', cursive",
              color: textColor,
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
              color: textColor,
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              flexWrap: 'wrap',
              lineHeight: 1.6,
            }}
          >
            Made by{' '}
            <Tooltip
              title='and lots of help from AI :v'
              arrow
              placement='top'
              sx={{
                '& .MuiTooltip-tooltip': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  color: 'white',
                  fontSize: '0.75rem',
                  borderRadius: 1,
                  padding: '8px 12px',
                },
                '& .MuiTooltip-arrow': {
                  color: 'rgba(0, 0, 0, 0.8)',
                },
              }}
            >
              <Box
                component='span'
                sx={{
                  fontWeight: 600,
                  color: textColor,
                  cursor: 'help',
                  textDecoration: 'underline',
                  textDecorationStyle: 'dotted',
                  textUnderlineOffset: '3px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: heartColor,
                    textDecorationColor: heartColor,
                  },
                }}
              >
                Thành
              </Box>
            </Tooltip>{' '}
            with lots of{' '}
            <Favorite
              sx={{
                color: heartColor,
                fontSize: '1.2rem',
                animation: 'heartbeat 2s ease-in-out infinite',
                '@keyframes heartbeat': {
                  '0%': {
                    transform: 'scale(1)',
                  },
                  '14%': {
                    transform: 'scale(1.1)',
                  },
                  '28%': {
                    transform: 'scale(1)',
                  },
                  '42%': {
                    transform: 'scale(1.1)',
                  },
                  '70%': {
                    transform: 'scale(1)',
                  },
                },
              }}
            />{' '}
            for{' '}
            <Box
              component='span'
              sx={{
                fontWeight: 600,
                color: heartColor,
                fontFamily: "'Dancing Script', cursive",
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
              opacity: 0.6,
            }}
          >
            {[...Array(3)].map((_, index) => (
              <Favorite
                key={index}
                sx={{
                  color: heartColor,
                  fontSize: '0.8rem',
                  animation: `float ${2 + index * 0.5}s ease-in-out infinite`,
                  animationDelay: `${index * 0.3}s`,
                  '@keyframes float': {
                    '0%, 100%': {
                      transform: 'translateY(0px)',
                    },
                    '50%': {
                      transform: 'translateY(-5px)',
                    },
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
