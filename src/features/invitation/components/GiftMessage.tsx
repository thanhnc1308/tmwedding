'use client';

import { Box, Typography } from '@mui/material';
import { COLORS, FONTS } from '../constants/design';
import ScrollReveal from './ScrollReveal';
import { Guest, GuestAgeComparison } from '@/types/guest';
import { getGuestPronoun } from '@/utils/guest';
import { useTranslation, interpolate } from '@/i18n';

export default function GiftMessage({ guest }: { guest: Guest | null }) {
  const { t, locale } = useTranslation();
  const { guestPronoun, wePronoun } = getGuestPronoun(
    guest?.ageComparison ?? GuestAgeComparison.Same,
    guest?.gender,
    locale,
  );

  return (
    <Box
      sx={{
        textAlign: 'center',
        px: 3,
        backgroundColor: COLORS.bgCream,
      }}
    >
      <ScrollReveal>
        <Typography
          sx={{
            fontFamily: FONTS.script,
            fontSize: { xs: '1.5rem', sm: '1.8rem' },
            color: COLORS.primary,
            lineHeight: 1.6,
            maxWidth: 500,
            mx: 'auto',
          }}
        >
          {interpolate(t.gift.message1, { guestPronoun: guestPronoun.toLowerCase(), wePronoun: wePronoun.toLowerCase() })}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', sm: '1rem' },
            color: COLORS.textSecondary,
            lineHeight: 1.8,
            maxWidth: 450,
            mx: 'auto',
            fontFamily: FONTS.serif,
          }}
        >
          {interpolate(t.gift.message2, { guestPronoun: guestPronoun.toLowerCase(), wePronoun: wePronoun })}
        </Typography>
      </ScrollReveal>
    </Box>
  );
}
