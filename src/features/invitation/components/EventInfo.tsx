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
          width='600'
          height='450'
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
          src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1758.7968663738109!2d106.16060564240412!3d20.74799579667959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1768564635080!5m2!1sen!2s'
          width='600'
          height='450'
          style={{ border: 0 }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      ),
      mapUrl:
        'https://www.google.com/maps/dir/?api=1&destination=20.747792,106.161506',
    },
  ],
  title = 'THÔNG TIN TIỆC CƯỚI',
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

    // Use consistent formatting to avoid hydration issues

    const weekday = weekdays[date.getDay()];
    const dayNum = date.getDate();
    const monthName = months[date.getMonth()];
    const yearNum = date.getFullYear();

    return `${weekday}, ${dayNum} ${monthName}, ${yearNum}`;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        py: 8,
      }}
    >
      {/* Background Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(2px)',
        }}
      />

      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant='h2'
            component='h1'
            sx={{
              fontFamily: "'Dancing Script', cursive",
              color: '#8b4513',
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Events Grid */}
        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid size={{ xs: 12, md: 6 }} key={event.id}>
              <Card
                sx={{
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.15)',
                  },
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
                        event.type === 'ceremony' ? 'LỄ THÀNH HÔN' : 'TIỆC CƯỚI'
                      }
                      sx={{
                        backgroundColor:
                          event.type === 'ceremony' ? '#e8f5e8' : '#fff3e0',
                        color:
                          event.type === 'ceremony' ? '#2e7d32' : '#f57c00',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  </Box>

                  {/* Event Title */}
                  <Typography
                    variant='h4'
                    component='h3'
                    sx={{
                      fontFamily: "'Dancing Script', cursive",
                      color: '#8b4513',
                      fontWeight: 700,
                      mb: 2,
                      fontSize: { xs: '1.8rem', md: '2.2rem' },
                    }}
                  >
                    {event.title}
                  </Typography>

                  {/* Date and Time */}
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Event sx={{ color: '#8b4513', mr: 1, fontSize: 20 }} />
                      <Typography
                        variant='body1'
                        sx={{ color: '#5d4037', fontWeight: 600 }}
                      >
                        {formatDate(event.date)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
                      <AccessTime
                        sx={{ color: '#8b4513', mr: 1, fontSize: 18 }}
                      />
                      <Typography variant='body2' sx={{ color: '#6b4423' }}>
                        {event.time}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider
                    sx={{ my: 2, borderColor: 'rgba(139, 69, 19, 0.2)' }}
                  />

                  {/* Venue Information */}
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant='h6'
                      sx={{
                        color: '#8b4513',
                        fontWeight: 600,
                        mb: 1,
                        fontSize: '1.1rem',
                      }}
                    >
                      {event.venue}
                    </Typography>
                    <Box
                      sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}
                    >
                      <LocationOn
                        sx={{ color: '#8b4513', mr: 1, fontSize: 20, mt: 0.2 }}
                      />
                      <Typography
                        variant='body2'
                        sx={{
                          color: '#6b4423',
                          lineHeight: 1.5,
                          flex: 1,
                        }}
                      >
                        {event.address}
                      </Typography>
                    </Box>
                  </Box>

                  {event.embededIframe}

                  {/* Directions Button */}
                  <Button
                    variant='contained'
                    startIcon={<Directions />}
                    onClick={() =>
                      handleDirections(event.address, event.mapUrl)
                    }
                    fullWidth
                    sx={{
                      backgroundColor: '#8b4513',
                      color: 'white',
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      '&:hover': {
                        backgroundColor: '#6b4423',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(139, 69, 19, 0.3)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Xem đường đi
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
