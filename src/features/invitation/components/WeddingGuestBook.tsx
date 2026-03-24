'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Container,
  Avatar,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { trpc } from '@/utils/trpc';
import {
  COLORS,
  FONTS,
  TRANSITIONS,
  sectionHeadingStyle,
} from '../constants/design';
import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/i18n';

const AUTOPLAY_INTERVAL = 5000;

export default function WeddingGuestBook() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading } = trpc.invitation.getResponses.useQuery({
    page: 1,
    limit: 50,
  });

  const wishes = data?.data ?? [];

  const goTo = useCallback(
    (index: number) => {
      if (wishes.length === 0) return;
      setCurrentIndex(
        ((index % wishes.length) + wishes.length) % wishes.length,
      );
    },
    [wishes.length],
  );

  const goNext = useCallback(
    () => goTo(currentIndex + 1),
    [currentIndex, goTo],
  );
  const goPrev = useCallback(
    () => goTo(currentIndex - 1),
    [currentIndex, goTo],
  );

  // Autoplay
  useEffect(() => {
    if (isPaused || wishes.length <= 1) return;
    autoplayRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused, goNext, wishes.length]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTimeout(() => setIsPaused(false), 3000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = t.months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <Box
      id='guestbook'
      sx={{
        py: { xs: 4, md: 4 },
        backgroundColor: COLORS.bgCream,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth='md'>
        <ScrollReveal>
          <Box
            sx={{
              textAlign: 'center',
              mb: 6,
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Typography variant='h2' component='h2' sx={sectionHeadingStyle}>
              {t.guestBook.title}
            </Typography>
          </Box>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {isLoading && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                py: 8,
              }}
            >
              <CircularProgress sx={{ color: COLORS.primary }} />
            </Box>
          )}

          {!isLoading && wishes.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography
                sx={{
                  fontFamily: FONTS.handwritten,
                  color: COLORS.primaryLight,
                  fontSize: '1.1rem',
                }}
              >
                ...
              </Typography>
            </Box>
          )}

          {!isLoading && wishes.length > 0 && (
            <Box
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              sx={{ position: 'relative' }}
            >
              {/* Slider viewport */}
              <Box
                sx={{
                  overflow: 'hidden',
                  mx: { xs: 0, md: 5 },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    transition: `transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)`,
                    transform: `translateX(-${currentIndex * 100}%)`,
                  }}
                >
                  {wishes.map((wish) => (
                    <Box
                      key={wish.id}
                      sx={{
                        flex: '0 0 100%',
                        px: { xs: 2, md: 4 },
                        boxSizing: 'border-box',
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: COLORS.bgWhite,
                          borderRadius: 3,
                          border: `1px solid ${COLORS.borderGold}`,
                          p: { xs: 3, md: 5 },
                          textAlign: 'center',
                          minHeight: 200,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {/* Quote icon */}
                        <Typography
                          sx={{
                            fontSize: '3rem',
                            lineHeight: 1,
                            color: COLORS.accent,
                            opacity: 0.4,
                            fontFamily: 'Georgia, serif',
                            mb: 1,
                          }}
                        >
                          &ldquo;
                        </Typography>

                        {/* Message */}
                        <Typography
                          sx={{
                            fontFamily: FONTS.serif,
                            color: COLORS.textPrimary,
                            lineHeight: 1.8,
                            fontSize: { xs: '1rem', md: '1.15rem' },
                            fontStyle: 'italic',
                            maxWidth: 500,
                            mb: 3,
                          }}
                        >
                          {wish.message}
                        </Typography>

                        {/* Author */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: 36,
                              height: 36,
                              backgroundColor: COLORS.primary,
                              color: COLORS.textOnPrimary,
                              fontWeight: 600,
                              fontSize: '0.8rem',
                              fontFamily: FONTS.serif,
                            }}
                          >
                            {wish.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()}
                          </Avatar>
                          <Box sx={{ textAlign: 'left' }}>
                            <Typography
                              sx={{
                                fontFamily: FONTS.serif,
                                color: COLORS.textPrimary,
                                fontWeight: 600,
                                fontSize: '0.95rem',
                              }}
                            >
                              {wish.name}
                            </Typography>
                            <Typography
                              sx={{
                                color: COLORS.textSecondary,
                                fontSize: '0.75rem',
                                fontFamily: FONTS.serif,
                              }}
                            >
                              {formatDate(wish.createdAt)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Navigation arrows */}
              {wishes.length > 1 && (
                <>
                  <IconButton
                    onClick={goPrev}
                    aria-label='Previous wish'
                    sx={{
                      position: 'absolute',
                      left: { xs: -4, md: -8 },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: COLORS.primary,
                      backgroundColor: COLORS.bgWhite,
                      border: `1px solid ${COLORS.borderGold}`,
                      width: 40,
                      height: 40,
                      transition: `all ${TRANSITIONS.normal} ease`,
                      '&:hover': {
                        backgroundColor: COLORS.bgWarm,
                        borderColor: COLORS.borderGoldHover,
                      },
                    }}
                  >
                    <ArrowBackIos sx={{ fontSize: 16, ml: 0.5 }} />
                  </IconButton>
                  <IconButton
                    onClick={goNext}
                    aria-label='Next wish'
                    sx={{
                      position: 'absolute',
                      right: { xs: -4, md: -8 },
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: COLORS.primary,
                      backgroundColor: COLORS.bgWhite,
                      border: `1px solid ${COLORS.borderGold}`,
                      width: 40,
                      height: 40,
                      transition: `all ${TRANSITIONS.normal} ease`,
                      '&:hover': {
                        backgroundColor: COLORS.bgWarm,
                        borderColor: COLORS.borderGoldHover,
                      },
                    }}
                  >
                    <ArrowForwardIos sx={{ fontSize: 16 }} />
                  </IconButton>
                </>
              )}

              {/* Dot indicators */}
              {wishes.length > 1 && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                    mt: 4,
                  }}
                >
                  {wishes.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => {
                        goTo(index);
                        setIsPaused(true);
                        setTimeout(() => setIsPaused(false), 3000);
                      }}
                      sx={{
                        width: currentIndex === index ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor:
                          currentIndex === index
                            ? COLORS.accent
                            : COLORS.borderGoldHover,
                        cursor: 'pointer',
                        transition: `all ${TRANSITIONS.normal} ease`,
                        '&:hover': {
                          backgroundColor:
                            currentIndex === index
                              ? COLORS.accent
                              : COLORS.primaryLight,
                        },
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          )}
        </ScrollReveal>
      </Container>
    </Box>
  );
}
