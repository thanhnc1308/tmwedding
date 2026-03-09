'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Container,
} from '@mui/material';
import { Close, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Image from 'next/image';
import {
  COLORS,
  FONTS,
  TRANSITIONS,
  sectionHeadingStyle,
} from '../constants/design';
import ScrollReveal from './ScrollReveal';
import OrnamentalDivider from './OrnamentalDivider';

interface WeddingPhoto {
  id: string;
  title: string;
  thumbnailUrl: string;
  fullImageUrl: string;
  alt: string;
  description?: string;
}

interface PhotoGalleryProps {
  photos?: WeddingPhoto[];
}

export default function PhotoGallery({
  photos = [
    {
      id: '1',
      title: 'Getting Ready',
      thumbnailUrl: '/images/wedding-bg.JPG',
      fullImageUrl: '/images/wedding-bg.JPG',
      alt: 'Bride getting ready',
      description: 'Beautiful moments of preparation before the ceremony',
    },
    {
      id: '2',
      title: 'First Look',
      thumbnailUrl: '/images/envelop.png',
      fullImageUrl: '/images/envelop.png',
      alt: 'First look moment',
      description: 'The magical first look between bride and groom',
    },
    {
      id: '3',
      title: 'Walking Down the Aisle',
      thumbnailUrl: '/images/qr-groom.jpg',
      fullImageUrl: '/images/qr-groom.jpg',
      alt: 'Walking down the aisle',
      description: "The bride's grand entrance",
    },
  ],
}: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<WeddingPhoto | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePhotoClick = (photo: WeddingPhoto, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
  };

  const handleCloseDialog = () => {
    setSelectedPhoto(null);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedPhoto(photos[newIndex]);
  };

  return (
    <Box
      id='gallery'
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: COLORS.bgNavyLight,
      }}
    >
      <Container maxWidth='lg'>
        {/* Header */}
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant='h2' component='h2' sx={sectionHeadingStyle}>
              Khoảnh Khắc Của Chúng Mình
            </Typography>
            <OrnamentalDivider />
          </Box>
        </ScrollReveal>

        {/* Polaroid-style Grid */}
        <ScrollReveal delay={0.2}>
          <Box
            sx={{
              columnCount: { xs: 1, sm: 2, md: 3 },
              columnGap: '20px',
            }}
          >
            {photos.map((photo, index) => (
              <Box
                key={photo.id}
                sx={{
                  breakInside: 'avoid',
                  mb: 2.5,
                  cursor: 'pointer',
                  position: 'relative',
                  // Polaroid frame
                  backgroundColor: COLORS.bgCream,
                  p: 1.5,
                  pb: 5,
                  borderRadius: 1,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  transition: `all ${TRANSITIONS.normal} ease`,
                  transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)`,
                  '&:hover': {
                    transform: 'rotate(0deg) translateY(-6px)',
                    boxShadow: `0 8px 30px rgba(0,0,0,0.4), ${COLORS.glowAmber}`,
                  },
                }}
                onClick={() => handlePhotoClick(photo, index)}
              >
                <Box sx={{ overflow: 'hidden', borderRadius: 0.5 }}>
                  <Image
                    src={photo.thumbnailUrl}
                    alt={photo.alt}
                    width={600}
                    height={index % 3 === 0 ? 700 : index % 3 === 1 ? 500 : 600}
                    loading='lazy'
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                </Box>

                {/* Polaroid caption */}
                <Typography
                  sx={{
                    textAlign: 'center',
                    mt: 1.5,
                    fontFamily: FONTS.script,
                    color: COLORS.textDark,
                    fontSize: '1.1rem',
                  }}
                >
                  {photo.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </ScrollReveal>

        {/* Lightbox Dialog */}
        <Dialog
          open={!!selectedPhoto}
          onClose={handleCloseDialog}
          maxWidth={false}
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              backgroundColor: 'rgba(0,0,0,0.95)',
              backdropFilter: 'blur(10px)',
              margin: 0,
              maxHeight: '100vh',
              maxWidth: '100vw',
            },
          }}
        >
          <DialogContent
            sx={{
              p: 0,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {selectedPhoto && (
              <>
                <IconButton
                  onClick={handleCloseDialog}
                  aria-label='Close photo viewer'
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    zIndex: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  <Close />
                </IconButton>

                <IconButton
                  onClick={handlePrevious}
                  aria-label='Previous photo'
                  sx={{
                    position: 'absolute',
                    left: 20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    zIndex: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  <ArrowBackIos />
                </IconButton>

                <IconButton
                  onClick={handleNext}
                  aria-label='Next photo'
                  sx={{
                    position: 'absolute',
                    right: 20,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    zIndex: 2,
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  <ArrowForwardIos />
                </IconButton>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxHeight: '100vh',
                    width: '100%',
                  }}
                >
                  <Image
                    src={selectedPhoto.fullImageUrl || '/images/wedding-bg.JPG'}
                    alt={selectedPhoto.alt}
                    width={800}
                    height={800}
                    style={{
                      maxWidth: '90vw',
                      maxHeight: '80vh',
                      objectFit: 'contain',
                      borderRadius: '8px',
                    }}
                  />

                  <Box
                    sx={{
                      mt: 2,
                      textAlign: 'center',
                      color: 'white',
                      maxWidth: 600,
                      px: 3,
                    }}
                  >
                    <Typography
                      variant='h5'
                      sx={{
                        fontFamily: FONTS.script,
                        color: COLORS.accent,
                        fontWeight: 400,
                        mb: 1,
                      }}
                    >
                      {selectedPhoto.title}
                    </Typography>
                    {selectedPhoto.description && (
                      <Typography
                        variant='body1'
                        sx={{
                          color: 'rgba(255,255,255,0.7)',
                          mb: 2,
                          lineHeight: 1.6,
                          fontFamily: FONTS.body,
                        }}
                      >
                        {selectedPhoto.description}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
