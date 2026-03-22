'use client';

import { Box, Typography, Container, Divider } from '@mui/material';
import { COLORS, FONTS, sectionHeadingStyle } from '../constants/design';
import ScrollReveal from './ScrollReveal';
import { GuestSource } from '@/types/guest';

interface TimelineItem {
  time: string;
  title: string;
}

const groomTimelineItems: TimelineItem[] = [
  { time: '10h', title: 'Đón khách' },
  { time: '11h', title: 'Bữa trưa vui vẻ' },
  { time: '13h30', title: 'Lễ vu quy' },
  { time: '15h', title: 'Lễ thành hôn' },
];

const brideTimelineItems: TimelineItem[] = [
  { time: '9h30', title: 'Đón khách' },
  { time: '10h', title: 'Bữa trưa vui vẻ' },
  { time: '13h30', title: 'Lễ vu quy' },
  { time: '15h', title: 'Lễ thành hôn' },
];

function getTimelineItems(side: GuestSource): TimelineItem[] {
  return side === GuestSource.Groom ? groomTimelineItems : brideTimelineItems;
}

export default function Timeline({ side }: { side: GuestSource }) {
  const timelineItems = getTimelineItems(side);

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
              Lịch trình nghi lễ
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
