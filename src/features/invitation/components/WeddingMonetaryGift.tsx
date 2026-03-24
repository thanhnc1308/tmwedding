'use client';

import { useState } from 'react';
import { Box, Typography, Card, Button } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import Image from 'next/image';
import { BANK_ACCOUNTS } from '@/constants/wedding';
import toast from 'react-hot-toast';
import { COLORS, FONTS, TRANSITIONS } from '../constants/design';
import ScrollReveal from './ScrollReveal';
import { useTranslation } from '@/i18n';

export default function WeddingMonetaryGift() {
  const { t } = useTranslation();
  const [showContent, setShowContent] = useState(false);

  const handleCopyAccount = (account: (typeof BANK_ACCOUNTS)[0]) => {
    navigator.clipboard.writeText(account.accountNumber);
    toast.success(t.gift.copiedToast);
  };

  return (
    <Box sx={{ pb: { xs: 1, md: 2 }, backgroundColor: COLORS.bgCream }}>
      {!showContent ? (
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            onClick={() => setShowContent(true)}
            sx={{
              cursor: 'pointer',
              transition: `all ${TRANSITIONS.normal} ease`,
              '&:hover': {
                transform: 'scale(1.05)',
              },
              '&:active': {
                transform: 'scale(0.98)',
              },
              width: 250,
              height: 300,
              position: 'relative',
            }}
          >
            <Image
              src='/images/gift-box.png'
              alt={t.gift.giftBoxAlt}
              fill
              sizes='250px'
              style={{ objectFit: 'contain' }}
            />
          </Box>
        </Box>
      ) : (
        <ScrollReveal>
          <Box
            sx={{
              pt: 4,
              px: 3,
              display: 'flex',
              gap: 3,
              maxWidth: 800,
              mx: 'auto',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            {BANK_ACCOUNTS.map((account) => (
              <Card
                key={account.id}
                sx={{
                  flex: 1,
                  backgroundColor: COLORS.bgWhite,
                  borderRadius: 3,
                  border: `1px solid ${COLORS.borderGold}`,
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                  p: 3,
                }}
              >
                {/* Title */}
                <Typography
                  sx={{
                    textAlign: 'center',
                    color: COLORS.textSecondary,
                    fontSize: '0.8rem',
                    mb: 0.5,
                    fontWeight: 500,
                    fontFamily: FONTS.serif,
                    letterSpacing: '0.1em',
                  }}
                >
                  {account.id === 'bride' ? t.gift.brideTitle : t.gift.groomTitle}
                </Typography>

                {/* Name */}
                <Typography
                  sx={{
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    mb: 2,
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
                    mb: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 180,
                      height: 180,
                      position: 'relative',
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
                <Box sx={{ mb: 2.5 }}>
                  {[
                    { label: t.gift.accountName, value: account.accountName },
                    { label: t.gift.accountNumber, value: account.accountNumber },
                    { label: t.gift.bankName, value: account.bankName },
                  ].map((item) => (
                    <Box
                      key={item.label}
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '0.8rem',
                          color: COLORS.textSecondary,
                          fontWeight: 500,
                          fontFamily: FONTS.serif,
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '0.8rem',
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

                {/* Copy Button */}
                <Button
                  fullWidth
                  variant='outlined'
                  startIcon={<ContentCopy sx={{ fontSize: 16 }} />}
                  onClick={() => handleCopyAccount(account)}
                  sx={{
                    borderColor: COLORS.borderGold,
                    color: COLORS.accent,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    py: 1,
                    borderRadius: 2,
                    fontFamily: FONTS.serif,
                    transition: `all ${TRANSITIONS.normal} ease`,
                    '&:hover': {
                      borderColor: COLORS.accent,
                      backgroundColor: `${COLORS.accent}08`,
                    },
                  }}
                >
                  {t.gift.copyAccount}
                </Button>
              </Card>
            ))}
          </Box>
        </ScrollReveal>
      )}
    </Box>
  );
}
