'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { BRIDE_NAME, GROOM_NAME, CEREMONY_DATE } from '@/constants/wedding';
import { FONTS } from '../constants/design';
import CountdownTimer from './CountdownTimer';
import SaveTheDateButton from './SaveTheDateButton';

interface WeddingBannerProps {
  backgroundImage?: string;
  groomPhoto?: string;
  bridePhoto?: string;
}

export default function WeddingBanner({
  backgroundImage = '/images/banner-bg-1.JPG',
  groomPhoto = '/images/wedding-bg.JPG',
  bridePhoto = '/images/wedding-bg.JPG',
}: WeddingBannerProps) {
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      {/* Dark background section with photo */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pb: 12,
          pt: 6,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.45)',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* "Wedding" script title */}
          <Typography
            sx={{
              fontFamily: FONTS.script,
              color: '#FAFAF8',
              fontSize: { xs: '2.5rem', sm: '3rem' },
              fontWeight: 400,
              mb: 6,
            }}
          >
            Lễ thành hôn
          </Typography>

          {/* Couple photos */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 3, sm: 5 },
              mb: 4,
              px: 2,
            }}
          >
            {/* Groom photo */}
            <Box
              sx={{
                position: 'relative',
                width: { xs: 130, sm: 160 },
                height: { xs: 170, sm: 210 },
                borderRadius: '50% 50% 50% 50% / 55% 55% 45% 45%',
                overflow: 'hidden',
                border: '3px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Image
                src={groomPhoto}
                alt={GROOM_NAME}
                fill
                sizes='(max-width: 600px) 130px, 160px'
                style={{ objectFit: 'cover', objectPosition: '30% center' }}
                priority
              />
            </Box>

            {/* Bride photo */}
            <Box
              sx={{
                position: 'relative',
                width: { xs: 130, sm: 160 },
                height: { xs: 170, sm: 210 },
                borderRadius: '50% 50% 50% 50% / 55% 55% 45% 45%',
                overflow: 'hidden',
                border: '3px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            >
              <Image
                src={bridePhoto}
                alt={BRIDE_NAME}
                fill
                sizes='(max-width: 600px) 130px, 160px'
                style={{ objectFit: 'cover', objectPosition: '70% center' }}
                priority
              />
            </Box>
          </Box>

          {/* Names */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: { xs: 6, sm: 6 },
              px: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: FONTS.script,
                color: '#FAFAF8',
                fontSize: { xs: '1.5rem', sm: '3.5rem' },
                fontWeight: 500,
              }}
            >
              {GROOM_NAME}
            </Typography>
            <Typography
              sx={{
                fontFamily: FONTS.script,
                color: 'rgba(250, 250, 248, 0.6)',
                fontSize: { xs: '1.5rem', sm: '3.5rem' },
                fontWeight: 400,
                alignSelf: 'center',
              }}
            >
              &amp;
            </Typography>
            <Typography
              sx={{
                fontFamily: FONTS.script,
                color: '#FAFAF8',
                fontSize: { xs: '1.5rem', sm: '3.5rem' },
                fontWeight: 500,
              }}
            >
              {BRIDE_NAME}
            </Typography>
          </Box>

          {/* Date and time info */}
          <Box sx={{ mt: 4 }}>
            <Typography
              sx={{
                fontFamily: FONTS.serif,
                fontSize: { xs: '0.85rem', sm: '0.95rem' },
                color: 'rgba(250, 250, 248, 0.75)',
                lineHeight: 1.8,
                mb: 1,
                letterSpacing: '0.02em',
              }}
            >
              VÀO LÚC
            </Typography>
            <Typography
              sx={{
                fontFamily: FONTS.serif,
                fontSize: { xs: '1rem', sm: '1.5rem' },
                color: '#FAFAF8',
                lineHeight: 2.5,
                fontWeight: 800,
                mb: 0.5,
              }}
            >
              15:00 CHỦ NHẬT, NGÀY 05 THÁNG 04 NĂM 2026
            </Typography>
          </Box>

          {/* Countdown Timer */}
          <Box sx={{ mt: 4 }}>
            <CountdownTimer weddingDate={CEREMONY_DATE} />
          </Box>

          {/* Save the Date Button */}
          <SaveTheDateButton />
        </Box>
      </Box>
    </Box>
  );
}
