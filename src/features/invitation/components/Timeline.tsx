'use client';

import { Box, Typography, Container, Divider } from '@mui/material';
import { COLORS, FONTS, sectionHeadingStyle } from '../constants/design';
import ScrollReveal from './ScrollReveal';
import { GuestSource } from '@/types/guest';
import { useTranslation } from '@/i18n';

export default function Timeline({ side }: { side: GuestSource }) {
  const { t } = useTranslation();
  const timelineItems = side === GuestSource.Groom ? t.timeline.groomEvents : t.timeline.brideEvents;

  return (
    <Box
      id='timeline'
      sx={{
        py: { xs: 4, md: 4 },
        px: 3,
        backgroundColor: COLORS.bgCream,
      }}
    >
      <Container maxWidth='sm'>
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Typography variant='h2' component='h2' sx={sectionHeadingStyle}>
              {t.timeline.title}
            </Typography>
          </Box>
        </ScrollReveal>

        <Box>
          {timelineItems.map((item, index) => (
            <ScrollReveal key={item.time} delay={index * 0.1}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: { xs: 4, sm: 6 },
                  py: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: FONTS.serif,
                    color: COLORS.textSecondary,
                    fontSize: { xs: '0.95rem', sm: '1.05rem' },
                    fontWeight: 500,
                    minWidth: 90,
                    textAlign: 'right',
                  }}
                >
                  {item.time}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: FONTS.serif,
                    color: COLORS.textPrimary,
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    fontWeight: 600,
                    minWidth: 160,
                    textAlign: 'left',
                  }}
                >
                  {item.title}
                </Typography>
              </Box>
              {index < timelineItems.length - 1 && (
                <Divider
                  sx={{
                    borderColor: COLORS.borderGold,
                    mx: 'auto',
                    maxWidth: 300,
                  }}
                />
              )}
            </ScrollReveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
