'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Image from 'next/image';
import { COLORS, TRANSITIONS, sectionHeadingStyle } from '../constants/design';
import ScrollReveal from './ScrollReveal';

interface WeddingPhoto {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface PhotoGalleryProps {
  photos?: WeddingPhoto[];
}

const AUTOPLAY_INTERVAL = 4000;

export default function PhotoGallery({
  photos = [
    {
      id: '1',
      src: '/images/wedding-bg.JPG',
      alt: 'Wedding photo 1',
      width: 4032,
      height: 3024,
    },
    {
      id: '2',
      src: '/images/envelop.png',
      alt: 'Wedding photo 2',
      width: 1080,
      height: 1080,
    },
    {
      id: '3',
      src: '/images/qr-groom.jpg',
      alt: 'Wedding photo 3',
      width: 1018,
      height: 1116,
    },
  ],
}: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (photos.length === 0) return;
      setCurrentIndex(
        ((index % photos.length) + photos.length) % photos.length,
      );
    },
    [photos.length],
  );

  const goNext = useCallback(
    () => goTo(currentIndex + 1),
    [currentIndex, goTo],
  );
  const goPrev = useCallback(
    () => goTo(currentIndex - 1),
    [currentIndex, goTo],
  );

  useEffect(() => {
    if (isPaused || photos.length <= 1) return;
    autoplayRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused, goNext, photos.length]);

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

  if (photos.length === 0) return null;

  return (
    <Box
      id='gallery'
      sx={{
        py: { xs: 4, md: 4 },
        backgroundColor: COLORS.bgCream,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <ScrollReveal>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant='h2' component='h2' sx={sectionHeadingStyle}>
            Một số khoảnh khắc của chúng mình
          </Typography>
        </Box>
      </ScrollReveal>

      {/* Slider */}
      <ScrollReveal delay={0.2}>
        <Box
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          sx={{ position: 'relative', maxWidth: 600, mx: 'auto', px: 2 }}
        >
          {/* Slides */}
          <Box
            sx={{
              overflow: 'hidden',
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {photos.map((photo, index) => (
                <Box
                  key={photo.id}
                  sx={{
                    flex: '0 0 100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes='(max-width: 600px) 100vw, 600px'
                    style={{ width: '100%', height: 'auto' }}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    priority={index === 0}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Navigation arrows */}
          {photos.length > 1 && (
            <>
              <IconButton
                onClick={goPrev}
                aria-label='Previous photo'
                sx={{
                  position: 'absolute',
                  left: { xs: 12, sm: -20 },
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
                aria-label='Next photo'
                sx={{
                  position: 'absolute',
                  right: { xs: 12, sm: -20 },
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
          {photos.length > 1 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1,
                mt: 3,
              }}
            >
              {photos.map((_, index) => (
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
      </ScrollReveal>
    </Box>
  );
}
