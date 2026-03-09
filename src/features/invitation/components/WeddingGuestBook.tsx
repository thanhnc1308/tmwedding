'use client';

import type React from 'react';

import { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Pagination,
  CircularProgress,
} from '@mui/material';
import { months } from '../constants';
import { trpc } from '@/utils/trpc';
import { COLORS, FONTS, sectionHeadingStyle } from '../constants/design';
import ScrollReveal from './ScrollReveal';
import OrnamentalDivider from './OrnamentalDivider';

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
        backgroundColor: COLORS.bgNavy,
        position: 'relative',
      }}
    >
      <Container maxWidth='md'>
        {/* Header */}
        <ScrollReveal>
          <Box
            sx={{ textAlign: 'center', mb: 6, position: 'relative', zIndex: 1 }}
          >
            <Typography variant='h2' component='h2' sx={sectionHeadingStyle}>
              Lời Chúc
            </Typography>
            <OrnamentalDivider />
          </Box>
        </ScrollReveal>

        {/* Wishes as glowing cards */}
        <ScrollReveal delay={0.2}>
          <Box sx={{ minHeight: 200 }}>
            {isLoading && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  py: 8,
                }}
              >
                <CircularProgress sx={{ color: COLORS.accent }} />
              </Box>
            )}

            {!isLoading && wishes.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography
                  sx={{
                    fontFamily: FONTS.body,
                    color: COLORS.textSecondary,
                    fontSize: '1.1rem',
                  }}
                >
                  ...
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: 3,
              }}
            >
              {wishes.map((wish, index) => (
                <Box
                  key={wish.id}
                  sx={{
                    backgroundColor: COLORS.bgCard,
                    backdropFilter: 'blur(8px)',
                    borderRadius: 3,
                    border: `1px solid ${COLORS.borderGold}`,
                    p: 3,
                    boxShadow: index % 2 === 0 ? COLORS.glowAmber : COLORS.glowCoral,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 40px rgba(232, 168, 56, 0.2)',
                    },
                  }}
                >
                  {/* Wish Message */}
                  <Typography
                    sx={{
                      fontFamily: FONTS.serif,
                      color: COLORS.textPrimary,
                      lineHeight: 1.8,
                      fontSize: '1rem',
                      fontStyle: 'italic',
                      mb: 2,
                    }}
                  >
                    &ldquo;{wish.message}&rdquo;
                  </Typography>

                  {/* Author & Date */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {/* Avatar circle */}
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.coral})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Typography
                        sx={{
                          color: COLORS.textOnPrimary,
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          fontFamily: FONTS.body,
                        }}
                      >
                        {wish.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontFamily: FONTS.body,
                          color: COLORS.accent,
                          fontWeight: 600,
                          fontSize: '0.9rem',
                        }}
                      >
                        {wish.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: COLORS.textSecondary,
                          fontSize: '0.75rem',
                          fontFamily: FONTS.body,
                        }}
                      >
                        {formatDate(wish.createdAt)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </ScrollReveal>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              size='large'
              sx={{
                '& .MuiPaginationItem-root': {
                  backgroundColor: COLORS.bgCard,
                  border: `1px solid ${COLORS.borderGold}`,
                  color: COLORS.textSecondary,
                  fontWeight: 600,
                  fontFamily: FONTS.body,
                  '&:hover': {
                    backgroundColor: 'rgba(232, 168, 56, 0.1)',
                  },
                  '&.Mui-selected': {
                    backgroundColor: COLORS.accent,
                    color: COLORS.textOnPrimary,
                    '&:hover': {
                      backgroundColor: COLORS.accentDark,
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
