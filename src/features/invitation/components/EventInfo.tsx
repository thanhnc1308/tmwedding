'use client';

import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import {
  Directions,
  Event,
  Restaurant,
  AccessTime,
  LocationOn,
} from '@mui/icons-material';
import { months, weekdays } from '../constants';
import {
  COLORS,
  FONTS,
  cardStyle,
  primaryButtonStyle,
  sectionHeadingStyle,
} from '../constants/design';
import { getEventsForSide } from '../constants/events';
import ScrollReveal from './ScrollReveal';
import OrnamentalDivider from './OrnamentalDivider';
import { GuestSource } from '@/types/guest';

interface EventInfoProps {
  side?: GuestSource;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function EventInfo({
  side = GuestSource.Groom,
  title = 'Thông Tin Sự Kiện',
}: EventInfoProps) {
  const events = getEventsForSide(side);
  const handleDirections = (address: string, mapUrl?: string) => {
    if (mapUrl) {
      window.open(mapUrl, '_blank');
    } else {
      const encodedAddress = encodeURIComponent(address);
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
        '_blank',
      );
    }
  };

  const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split('.');
    const date = new Date(
      Number.parseInt(year),
      Number.parseInt(month) - 1,
      Number.parseInt(day),
    );

    const weekday = weekdays[date.getDay()];
    const dayNum = date.getDate();
    const monthName = months[date.getMonth()];
    const yearNum = date.getFullYear();

    return `${weekday}, ${dayNum} ${monthName}, ${yearNum}`;
  };

  return (
    <Box
      id='event'
      sx={{
        position: 'relative',
        backgroundColor: COLORS.bgNavy,
        py: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant='h2' component='h2' sx={sectionHeadingStyle}>
              {title}
            </Typography>
            <OrnamentalDivider />
          </Box>
        </ScrollReveal>

        {/* Events Grid */}
        <Grid container spacing={4}>
          {events.map((event, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={event.id}>
              <ScrollReveal delay={index * 0.2}>
                <Card
                  sx={{
                    height: '100%',
                    ...cardStyle,
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    {/* Event Type Badge */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 3,
                      }}
                    >
                      <Chip
                        icon={
                          event.type === 'ceremony' ? <Event /> : <Restaurant />
                        }
                        label={
                          event.type === 'ceremony'
                            ? 'LỄ THÀNH HÔN'
                            : 'TIỆC CƯỚI'
                        }
                        sx={{
                          backgroundColor:
                            event.type === 'ceremony'
                              ? 'rgba(232, 168, 56, 0.15)'
                              : 'rgba(224, 122, 95, 0.15)',
                          color:
                            event.type === 'ceremony'
                              ? COLORS.accent
                              : COLORS.coral,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          fontFamily: FONTS.body,
                          '& .MuiChip-icon': {
                            color: event.type === 'ceremony'
                              ? COLORS.accent
                              : COLORS.coral,
                          },
                        }}
                      />
                    </Box>

                    {/* Event Title */}
                    <Typography
                      variant='h4'
                      component='h3'
                      sx={{
                        fontFamily: FONTS.script,
                        color: COLORS.accent,
                        fontWeight: 400,
                        mb: 2,
                        fontSize: { xs: '2rem', md: '2.4rem' },
                        textShadow: '0 0 20px rgba(232, 168, 56, 0.2)',
                      }}
                    >
                      {event.title}
                    </Typography>

                    {/* Date and Time */}
                    <Box sx={{ mb: 3 }}>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      >
                        <Event
                          sx={{ color: COLORS.accent, mr: 1, fontSize: 20 }}
                        />
                        <Typography
                          variant='body1'
                          sx={{
                            color: COLORS.textPrimary,
                            fontWeight: 600,
                            fontFamily: FONTS.body,
                          }}
                        >
                          {formatDate(event.date)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', ml: 3 }}
                      >
                        <AccessTime
                          sx={{ color: COLORS.accent, mr: 1, fontSize: 18, opacity: 0.7 }}
                        />
                        <Typography
                          variant='body2'
                          sx={{
                            color: COLORS.textSecondary,
                            fontFamily: FONTS.body,
                          }}
                        >
                          {event.time}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2, borderColor: COLORS.borderGold }} />

                    {/* Venue Information */}
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant='h6'
                        sx={{
                          color: COLORS.textPrimary,
                          fontWeight: 600,
                          mb: 1,
                          fontSize: '1.05rem',
                          fontFamily: FONTS.body,
                        }}
                      >
                        {event.venue}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          mb: 2,
                        }}
                      >
                        <LocationOn
                          sx={{
                            color: COLORS.accent,
                            mr: 1,
                            fontSize: 20,
                            mt: 0.2,
                            opacity: 0.7,
                          }}
                        />
                        <Typography
                          variant='body2'
                          sx={{
                            color: COLORS.textSecondary,
                            lineHeight: 1.5,
                            flex: 1,
                            fontFamily: FONTS.body,
                          }}
                        >
                          {event.address}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Responsive Map */}
                    <Box
                      sx={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        borderRadius: 3,
                        overflow: 'hidden',
                        mb: 2,
                        border: `1px solid ${COLORS.borderGold}`,
                      }}
                    >
                      {event.embededIframe}
                    </Box>

                    {/* Directions Button */}
                    <Button
                      variant='contained'
                      startIcon={<Directions />}
                      onClick={() =>
                        handleDirections(event.address, event.mapUrl)
                      }
                      fullWidth
                      sx={primaryButtonStyle}
                    >
                      Xem đường đi
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
