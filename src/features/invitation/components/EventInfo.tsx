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
  LocationOn,
  AccessTime,
  Directions,
  Event,
  Restaurant,
} from '@mui/icons-material';
import { months, weekdays } from '../constants';
import {
  COLORS,
  FONTS,
  cardStyle,
  primaryButtonStyle,
  sectionHeadingStyle,
} from '../constants/design';
import ScrollReveal from './ScrollReveal';

interface WeddingEvent {
  id: string;
  title: string;
  type: 'ceremony' | 'reception';
  date: string;
  time: string;
  venue: string;
  address: string;
  phone?: string;
  email?: string;
  description?: string;
  dresscode?: string;
  mapUrl?: string;
  embededIframe?: React.ReactNode;
}

interface EventInfoProps {
  events?: WeddingEvent[];
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function EventInfo({
  events = [
    {
      id: '1',
      title: 'Nhà Trai',
      type: 'ceremony',
      date: '14.01.2024',
      time: '09:00 - 11:00',
      venue: 'Nhà Trai',
      address: 'Thôn Trà Bồ, xã Đoàn Đào, tỉnh Hưng Yên',
      embededIframe: (
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1758.7968663738109!2d106.16060564240412!3d20.74799579667959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1768564635080!5m2!1sen!2s'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      ),
      mapUrl:
        'https://www.google.com/maps/dir/?api=1&destination=20.747792,106.161506',
    },
    {
      id: '2',
      title: 'Nhà Gái',
      type: 'reception',
      date: '14.01.2024',
      time: '18:00 - 21:00',
      venue: 'Nhà Gái',
      address: 'Thôn Trà Bồ, xã Đoàn Đào, tỉnh Hưng Yên',
      embededIframe: (
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1758.7968663738109!2d106.171451!3d20.661624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1768564635080!5m2!1sen!2s'
          width='100%'
          height='100%'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      ),
      mapUrl:
        'https://www.google.com/maps/dir/?api=1&destination=20.661624,106.171451',
    },
  ],
  title = 'Thông Tin Sự Kiện',
  backgroundImage = '/images/wedding-bg.JPG',
}: EventInfoProps) {
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
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 12 },
      }}
    >
      {/* Background Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: COLORS.overlayLight,
          backdropFilter: 'blur(2px)',
        }}
      />

      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <ScrollReveal>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant='h2' component='h2' sx={sectionHeadingStyle}>
              {title}
            </Typography>
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
                              ? `${COLORS.primary}14`
                              : `${COLORS.accent}1A`,
                          color:
                            event.type === 'ceremony'
                              ? COLORS.primary
                              : COLORS.accentDark,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          fontFamily: FONTS.serif,
                        }}
                      />
                    </Box>

                    {/* Event Title */}
                    <Typography
                      variant='h4'
                      component='h3'
                      sx={{
                        fontFamily: FONTS.script,
                        color: COLORS.primary,
                        fontWeight: 700,
                        mb: 2,
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
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
                          sx={{ color: COLORS.primary, mr: 1, fontSize: 20 }}
                        />
                        <Typography
                          variant='body1'
                          sx={{
                            color: COLORS.textPrimary,
                            fontWeight: 600,
                            fontFamily: FONTS.serif,
                          }}
                        >
                          {formatDate(event.date)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', ml: 3 }}
                      >
                        <AccessTime
                          sx={{ color: COLORS.primary, mr: 1, fontSize: 18 }}
                        />
                        <Typography
                          variant='body2'
                          sx={{
                            color: COLORS.textSecondary,
                            fontFamily: FONTS.serif,
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
                          color: COLORS.primary,
                          fontWeight: 600,
                          mb: 1,
                          fontSize: '1.1rem',
                          fontFamily: FONTS.serif,
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
                            color: COLORS.primary,
                            mr: 1,
                            fontSize: 20,
                            mt: 0.2,
                          }}
                        />
                        <Typography
                          variant='body2'
                          sx={{
                            color: COLORS.textSecondary,
                            lineHeight: 1.5,
                            flex: 1,
                            fontFamily: FONTS.serif,
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
                        borderRadius: 2,
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
