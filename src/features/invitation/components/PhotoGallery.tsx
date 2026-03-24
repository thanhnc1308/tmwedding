'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Image from 'next/image';
import { COLORS, TRANSITIONS, sectionHeadingStyle } from '../constants/design';
import ScrollReveal from './ScrollReveal';
import { Guest, GuestAgeComparison } from '@/types/guest';
import { getGuestPronoun } from '@/utils/guest';
import { useTranslation, interpolate } from '@/i18n';

interface WeddingPhoto {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface PhotoGalleryProps {
  guest?: Guest | null;
  photos?: WeddingPhoto[];
}

const AUTOPLAY_INTERVAL = 3000;

const PHOTOS: WeddingPhoto[] = [
  {
    id: '1',
    src: '/images/gallery/1-chibi.jpg',
    alt: '1 chibi',
    width: 842,
    height: 1264,
  },
  {
    id: '2',
    src: '/images/gallery/2-proposal.JPG',
    alt: '2 proposal',
    width: 4032,
    height: 3024,
  },
  {
    id: '3',
    src: '/images/gallery/3.1-engagement-ceremony.JPG',
    alt: '3.1 engagement ceremony',
    width: 1206,
    height: 801,
  },
  {
    id: '4',
    src: '/images/gallery/3.3-engagement-ceremony.JPG',
    alt: '3.3 engagement ceremony',
    width: 1206,
    height: 801,
  },
  {
    id: '5',
    src: '/images/gallery/4-marriage-registration.JPG',
    alt: '4 marriage registration',
    width: 1920,
    height: 2560,
  },
  {
    id: '6',
    src: '/images/gallery/5.1-BIL00196.JPG',
    alt: '5.1 BIL00196',
    width: 1333,
    height: 2000,
  },
  {
    id: '7',
    src: '/images/gallery/5.2-BIL00573.JPG',
    alt: '5.2 BIL00573',
    width: 1333,
    height: 2000,
  },
  {
    id: '8',
    src: '/images/gallery/6.1-BIL07734.JPG',
    alt: '6.1 BIL07734',
    width: 1333,
    height: 2000,
  },
  {
    id: '9',
    src: '/images/gallery/6.2-BIL08229.JPG',
    alt: '6.2 BIL08229',
    width: 1333,
    height: 2000,
  },
  {
    id: '10',
    src: '/images/gallery/6.3-BIL08541.JPG',
    alt: '6.3 BIL08541',
    width: 1333,
    height: 2000,
  },
  {
    id: '11',
    src: '/images/gallery/7.1-BIL09147.JPG',
    alt: '7.1 BIL09147',
    width: 1333,
    height: 2000,
  },
  {
    id: '12',
    src: '/images/gallery/7.2-BIL09050.JPG',
    alt: '7.2 BIL09050',
    width: 1333,
    height: 2000,
  },
  {
    id: '13',
    src: '/images/gallery/7.3-BIL09391.JPG',
    alt: '7.3 BIL09391',
    width: 1333,
    height: 2000,
  },
];

export default function PhotoGallery({
  guest,
  photos = PHOTOS,
}: PhotoGalleryProps) {
  const { t, locale } = useTranslation();
  const { wePronoun } = getGuestPronoun(
    guest?.ageComparison ?? GuestAgeComparison.Same,
    guest?.gender,
    locale,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
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
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isInView || photos.length <= 1) return;
    autoplayRef.current = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused, isInView, goNext, photos.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
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
      ref={sectionRef}
      id='gallery'
      sx={{
        py: { xs: 3, md: 3 },
        pt: { xs: 1, md: 1 },
        backgroundColor: COLORS.bgCream,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <ScrollReveal>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant='h2' component='h2' sx={sectionHeadingStyle}>
            {interpolate(t.gallery.title, {
              wePronoun: wePronoun.toLowerCase(),
            })}
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
              aspectRatio: `${photos[currentIndex].width} / ${photos[currentIndex].height}`,
              transition: 'aspect-ratio 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                height: '100%',
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {photos.map((photo, index) => {
                const distance = Math.min(
                  Math.abs(index - currentIndex),
                  photos.length - Math.abs(index - currentIndex),
                );
                const isNear = distance <= 1;
                return (
                  <Box
                    key={photo.id}
                    sx={{
                      flex: '0 0 100%',
                      position: 'relative',
                    }}
                  >
                    {isNear && (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes='(max-width: 600px) 100vw, 600px'
                        style={{ objectFit: 'cover' }}
                        priority={index === 0}
                      />
                    )}
                  </Box>
                );
              })}
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
