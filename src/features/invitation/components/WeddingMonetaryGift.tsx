'use client';

import { useState } from 'react';
import { Box, Typography, Card, Button } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import Image from 'next/image';
import { BANK_ACCOUNTS } from '@/constants/wedding';
import toast from 'react-hot-toast';
import { COLORS, FONTS, TRANSITIONS, cardStyle } from '../constants/design';
import ScrollReveal from './ScrollReveal';

interface WeddingMonetaryGiftProps {
  buttonVariant?: 'contained' | 'outlined' | 'text';
  buttonSize?: 'small' | 'medium' | 'large';
}

export default function WeddingMonetaryGift({}: WeddingMonetaryGiftProps) {
  const [showContent, setShowContent] = useState(false);

  const handleCopyAccount = (account: (typeof BANK_ACCOUNTS)[0]) => {
    navigator.clipboard.writeText(account.accountNumber);
    toast.success('Đã sao chép số tài khoản');
  };

  return (
    <Box sx={{ p: 3, backgroundColor: COLORS.bgWarm }}>
      {!showContent ? (
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant='contained'
            onClick={() => setShowContent(true)}
            sx={{
              backgroundColor: COLORS.primary,
              color: COLORS.textOnPrimary,
              fontFamily: FONTS.script,
              fontSize: '1.2rem',
              py: 2,
              px: 4,
              borderRadius: 3,
              textTransform: 'none',
              boxShadow: '0 4px 12px rgba(107, 76, 59, 0.25)',
              '&:hover': {
                backgroundColor: COLORS.primaryDark,
                boxShadow: '0 6px 16px rgba(107, 76, 59, 0.35)',
                transform: 'translateY(-2px)',
              },
              transition: `all ${TRANSITIONS.normal} ease`,
            }}
          >
            Nếu bạn muốn gửi quà mừng ...
          </Button>
        </Box>
      ) : (
        <ScrollReveal>
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              maxWidth: 900,
              mx: 'auto',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            {BANK_ACCOUNTS.map((account) => (
              <Card
                key={account.id}
                sx={{
                  flex: 1,
                  ...cardStyle,
                  p: 3,
                  '&:hover': {
                    ...cardStyle['&:hover'],
                  },
                }}
              >
                {/* Title */}
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: COLORS.textSecondary,
                    fontSize: '0.9rem',
                    mb: 1,
                    fontWeight: 500,
                    fontFamily: FONTS.serif,
                  }}
                >
                  {account.title}
                </Typography>

                {/* Name */}
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '1.3rem',
                    mb: 0.5,
                    color: COLORS.textPrimary,
                    fontFamily: FONTS.serif,
                  }}
                >
                  {account.name}
                </Typography>

                {/* QR Code */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Box
                    sx={{
                      width: 200,
                      height: 200,
                      position: 'relative',
                      border: `1px solid ${COLORS.borderGold}`,
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={account.qrCode}
                      alt={`QR ${account.name}`}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                </Box>

                {/* Account Details */}
                <Box sx={{ mb: 3 }}>
                  {[
                    { label: 'Tên tài khoản', value: account.accountName },
                    { label: 'Số tài khoản', value: account.accountNumber },
                    { label: 'Ngân hàng', value: account.bankName },
                  ].map((item) => (
                    <Box
                      key={item.label}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          color: COLORS.textSecondary,
                          fontWeight: 500,
                          fontFamily: FONTS.serif,
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.85rem',
                          color: COLORS.textPrimary,
                          fontWeight: 600,
                          textAlign: 'right',
                          fontFamily: FONTS.serif,
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Large Account Number Display */}
                <Box
                  sx={{
                    backgroundColor: COLORS.bgCream,
                    borderRadius: 2,
                    py: 2,
                    mb: 2,
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: COLORS.textPrimary,
                      letterSpacing: '2px',
                      fontFamily: 'monospace',
                    }}
                  >
                    {account.accountNumber}
                  </Typography>
                </Box>

                {/* Copy Button */}
                <Button
                  fullWidth
                  variant='outlined'
                  startIcon={<ContentCopy sx={{ fontSize: 18 }} />}
                  onClick={() => handleCopyAccount(account)}
                  sx={{
                    borderColor: COLORS.accent,
                    color: COLORS.accent,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    py: 1.2,
                    borderRadius: 2,
                    fontFamily: FONTS.serif,
                    transition: `all ${TRANSITIONS.normal} ease`,
                    '&:hover': {
                      borderColor: COLORS.accentDark,
                      backgroundColor: `${COLORS.accent}0A`,
                    },
                  }}
                >
                  Sao chép số tài khoản
                </Button>
              </Card>
            ))}
          </Box>
        </ScrollReveal>
      )}
    </Box>
  );
}
