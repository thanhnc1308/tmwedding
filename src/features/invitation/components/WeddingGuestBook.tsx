'use client';

import type React from 'react';

import { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  Divider,
  Pagination,
  CircularProgress,
} from '@mui/material';
import { months } from '../constants';
import { trpc } from '@/utils/trpc';
import { COLORS, FONTS, sectionHeadingStyle } from '../constants/design';
import ScrollReveal from './ScrollReveal';

interface WeddingGuestBookProps {
  itemsPerPage?: number;
}

export default function WeddingGuestBook({
  itemsPerPage = 4,
}: WeddingGuestBookProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = trpc.invitation.getResponses.useQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setCurrentPage(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  const wishes = data?.data ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <Box
      id='guestbook'
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${COLORS.bgWarm} 0%, #E6DDD2 100%)`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, ${COLORS.primary}08 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${COLORS.primaryLight}08 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, ${COLORS.primaryDark}08 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth='md'>
        {/* Notebook Header */}
        <ScrollReveal>
          <Box
            sx={{ textAlign: 'center', mb: 6, position: 'relative', zIndex: 1 }}
          >
            <Typography variant='h2' component='h2' sx={sectionHeadingStyle}>
              Lời chúc
            </Typography>
          </Box>
        </ScrollReveal>

        {/* Notebook Pages */}
        <ScrollReveal delay={0.2}>
          <Paper
            elevation={8}
            sx={{
              position: 'relative',
              backgroundColor: '#FEFCF7',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
              minHeight: 200,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 60,
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: COLORS.heartRed,
                opacity: 0.4,
                zIndex: 1,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 50,
                backgroundColor: COLORS.bgCream,
                borderRight: `1px solid ${COLORS.bgWarm}`,
                zIndex: 0,
              },
            }}
          >
            {/* Spiral Binding */}
            <Box
              sx={{
                position: 'absolute',
                left: 15,
                top: 20,
                bottom: 20,
                width: 20,
                zIndex: 2,
              }}
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'absolute',
                    top: `${(index * 100) / 11}%`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: { xs: 10, md: 12 },
                    height: { xs: 10, md: 12 },
                    borderRadius: '50%',
                    backgroundColor: COLORS.gold,
                    border: `1px solid ${COLORS.accentDark}`,
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.15)',
                  }}
                />
              ))}
            </Box>

            {/* Notebook Lines Background */}
            <Box
              sx={{
                position: 'absolute',
                left: 80,
                right: 20,
                top: 0,
                bottom: 0,
                backgroundImage: `repeating-linear-gradient(
                  transparent,
                  transparent 31px,
                  ${COLORS.bgWarm} 31px,
                  ${COLORS.bgWarm} 32px
                )`,
                opacity: 0.6,
                zIndex: 0,
              }}
            />

            {/* Content */}
            <Box sx={{ pl: 10, pr: 4, py: 4, position: 'relative', zIndex: 2 }}>
              {isLoading && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 8,
                  }}
                >
                  <CircularProgress sx={{ color: COLORS.primary }} />
                </Box>
              )}

              {!isLoading && wishes.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography
                    sx={{
                      fontFamily: FONTS.handwritten,
                      color: COLORS.primaryLight,
                      fontSize: '1.1rem',
                    }}
                  >
                    ...
                  </Typography>
                </Box>
              )}

              {wishes.map((wish, index) => (
                <Box
                  key={wish.id}
                  sx={{
                    mb: 4,
                    animation: `slideInLeft 0.5s ease ${index * 0.1}s both`,
                    '@keyframes slideInLeft': {
                      '0%': { opacity: 0, transform: 'translateX(-20px)' },
                      '100%': { opacity: 1, transform: 'translateX(0)' },
                    },
                  }}
                >
                  {/* Wish Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2,
                      gap: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: COLORS.primary,
                        color: COLORS.textOnPrimary,
                        fontWeight: 600,
                        fontFamily: FONTS.serif,
                      }}
                    >
                      {wish.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant='h6'
                        sx={{
                          fontFamily: FONTS.handwritten,
                          color: COLORS.primaryDark,
                          fontWeight: 600,
                          fontSize: '1.1rem',
                        }}
                      >
                        {wish.name}
                      </Typography>
                      <Typography
                        variant='caption'
                        sx={{
                          color: COLORS.primaryLight,
                          fontSize: '0.75rem',
                          fontStyle: 'italic',
                          fontFamily: FONTS.serif,
                        }}
                      >
                        {formatDate(wish.createdAt)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Wish Message */}
                  <Box
                    sx={{
                      ml: 6,
                      p: 3,
                      backgroundColor: `${COLORS.bgCream}80`,
                      borderRadius: 2,
                      border: `1px dotted ${COLORS.goldLight}`,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: -8,
                        top: 20,
                        width: 0,
                        height: 0,
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        borderRight: `8px solid ${COLORS.bgCream}80`,
                      },
                    }}
                  >
                    <Typography
                      variant='body1'
                      sx={{
                        fontFamily: FONTS.handwritten,
                        color: COLORS.textPrimary,
                        lineHeight: 1.8,
                        fontSize: '1rem',
                        textAlign: 'justify',
                        letterSpacing: '0.3px',
                      }}
                    >
                      &quot;{wish.message}&quot;
                    </Typography>
                  </Box>

                  {/* Divider */}
                  {index < wishes.length - 1 && (
                    <Divider
                      sx={{
                        mt: 3,
                        borderColor: COLORS.bgWarm,
                        borderStyle: 'dashed',
                        opacity: 0.7,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Paper>
        </ScrollReveal>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color='primary'
              size='large'
              sx={{
                '& .MuiPaginationItem-root': {
                  backgroundColor: '#FEFCF7',
                  border: `1px solid ${COLORS.bgWarm}`,
                  color: COLORS.primary,
                  fontWeight: 600,
                  fontFamily: FONTS.serif,
                  '&:hover': {
                    backgroundColor: COLORS.bgWarm,
                  },
                  '&.Mui-selected': {
                    backgroundColor: COLORS.primary,
                    color: COLORS.textOnPrimary,
                    '&:hover': {
                      backgroundColor: COLORS.primaryDark,
                    },
                  },
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
