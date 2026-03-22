'use client';

import { Box, Typography, Button } from '@mui/material';
import { COLORS, FONTS } from '../constants/design';
import { getEventsForSide } from '../constants/events';
import ScrollReveal from './ScrollReveal';
import { GuestSource } from '@/types/guest';
import { CEREMONY_DATE } from '@/constants/wedding';

interface EventInfoProps {
  side?: GuestSource;
  backgroundImage?: string;
}

function MiniCalendar() {
  const date = new Date(CEREMONY_DATE);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed
  const highlightDay = date.getDate();
  const monthName = `Tháng ${month + 1}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <Box sx={{ maxWidth: 320, mx: 'auto', mt: 3 }}>
      <Typography
        sx={{
          fontFamily: FONTS.serif,
          fontSize: '1.1rem',
          color: COLORS.textPrimary,
          fontWeight: 600,
          textAlign: 'center',
          mb: 2,
          letterSpacing: '0.05em',
        }}
      >
        {monthName}
      </Typography>

      {/* Weekday headers */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 0.5,
          mb: 1,
        }}
      >
        {weekDays.map((day) => (
          <Typography
            key={day}
            sx={{
              fontFamily: FONTS.serif,
              fontSize: '0.7rem',
              color: COLORS.textSecondary,
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            {day}
          </Typography>
        ))}
      </Box>

      {/* Days grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 0.5,
        }}
      >
        {cells.map((day, index) => (
          <Box
            key={index}
            sx={{
              textAlign: 'center',
              py: 0.5,
              borderRadius: '50%',
              ...(day === highlightDay && {
                backgroundColor: COLORS.accent,
                color: '#fff',
              }),
            }}
          >
            <Typography
              sx={{
                fontFamily: FONTS.serif,
                fontSize: '0.75rem',
                color: day === highlightDay ? '#fff' : COLORS.textPrimary,
                fontWeight: day === highlightDay ? 700 : 400,
              }}
            >
              {day ?? ''}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default function EventInfo({
  side = GuestSource.Groom,
}: EventInfoProps) {
  const events = getEventsForSide(side);
  const event = events[0];

  const handleDirections = () => {
    if (event.mapUrl) {
      window.open(event.mapUrl, '_blank');
    } else {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.address)}`,
        '_blank',
      );
    }
  };

  return (
    <Box id='event'>
      {/* Time and Calendar section */}
      <Box
        sx={{
          py: 0,
          px: 3,
          backgroundColor: COLORS.bgCream,
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          {/* Event time */}
          <Typography
            sx={{
              fontFamily: FONTS.serif,
              fontSize: { xs: '3.5rem', sm: '4.5rem' },
              color: COLORS.textPrimary,
              fontWeight: 700,
              lineHeight: 0.85,
            }}
          >
            {event.time}
          </Typography>

          {/* Date */}
          <Typography
            sx={{
              fontFamily: FONTS.serif,
              fontSize: { xs: '1rem', sm: '1.15rem' },
              color: COLORS.textPrimary,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Chủ Nhật, ngày 05 tháng 04 năm 2026
          </Typography>

          {/* Lunar date */}
          <Typography
            sx={{
              fontFamily: FONTS.serif,
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              fontStyle: 'italic',
              color: COLORS.textSecondary,
              mt: 0.5,
            }}
          >
            (Tức ngày 18 tháng 02 năm Bính Ngọ)
          </Typography>

          <MiniCalendar />
        </ScrollReveal>
      </Box>

      {/* Venue section */}
      <Box
        sx={{
          py: { xs: 1, md: 2 },
          px: 3,
          backgroundColor: COLORS.bgCream,
          textAlign: 'center',
        }}
      >
        <ScrollReveal>
          {/* "Tại" script */}
          <Typography
            sx={{
              fontFamily: FONTS.script,
              fontSize: { xs: '1.8rem', sm: '2.2rem' },
              color: COLORS.accent,
              fontWeight: 400,
              mb: 1.5,
            }}
          >
            Tại
          </Typography>

          {/* Venue name */}
          <Typography
            sx={{
              fontFamily: FONTS.serif,
              fontSize: { xs: '1.6rem', sm: '2rem' },
              color: COLORS.textPrimary,
              fontWeight: 700,
              mb: 1.5,
              letterSpacing: '0.02em',
            }}
          >
            {event.venue}
          </Typography>

          {/* Address */}
          <Typography
            sx={{
              fontFamily: FONTS.serif,
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              color: COLORS.textSecondary,
              lineHeight: 1.6,
              maxWidth: 400,
              mx: 'auto',
              mb: 1.5,
            }}
          >
            {event.address}
          </Typography>

          {/* Responsive Map */}
          <Box
            sx={{
              width: '100%',
              maxWidth: { md: 800 },
              mx: 'auto',
              aspectRatio: '4 / 3',
              overflow: 'hidden',
              mb: 1.5,
            }}
          >
            {event.embededIframe}
          </Box>

          {/* Map button */}
          <Button
            onClick={handleDirections}
            sx={{
              backgroundColor: COLORS.accent,
              color: '#fff',
              fontFamily: FONTS.serif,
              fontSize: '0.85rem',
              fontWeight: 600,
              px: 4,
              py: 1.2,
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(107, 127, 94, 0.25)',
              '&:hover': {
                backgroundColor: COLORS.accentDark,
                boxShadow: '0 6px 16px rgba(107, 127, 94, 0.35)',
              },
            }}
          >
            Xem đường đi
          </Button>
        </ScrollReveal>
      </Box>
    </Box>
  );
}
