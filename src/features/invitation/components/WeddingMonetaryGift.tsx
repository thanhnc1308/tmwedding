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
    <Box sx={{ p: 3, backgroundColor: COLORS.bgNavy }}>
      {!showContent ? (
        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant='contained'
            onClick={() => setShowContent(true)}
            sx={{
              backgroundColor: COLORS.accent,
              color: COLORS.textOnPrimary,
              fontFamily: FONTS.body,
              fontSize: '1rem',
              py: 2,
              px: 4,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(232, 168, 56, 0.3)',
              '&:hover': {
                backgroundColor: COLORS.accentDark,
                boxShadow: '0 6px 24px rgba(232, 168, 56, 0.4)',
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
                    fontFamily: FONTS.body,
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
                    color: COLORS.accent,
                    fontFamily: FONTS.script,
                    textShadow: '0 0 15px rgba(232, 168, 56, 0.2)',
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
                      backgroundColor: 'white',
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
                          fontFamily: FONTS.body,
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
                          fontFamily: FONTS.body,
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
                    backgroundColor: 'rgba(232, 168, 56, 0.1)',
                    borderRadius: 2,
                    py: 2,
                    mb: 2,
                    textAlign: 'center',
                    border: `1px solid ${COLORS.borderGold}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: COLORS.accent,
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
                    fontFamily: FONTS.body,
                    transition: `all ${TRANSITIONS.normal} ease`,
                    '&:hover': {
                      borderColor: COLORS.accentLight,
                      backgroundColor: 'rgba(232, 168, 56, 0.08)',
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
