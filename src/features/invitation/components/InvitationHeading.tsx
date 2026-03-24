'use client';

import { Box, Typography } from '@mui/material';
import { COLORS, FONTS } from '../constants/design';
import ScrollReveal from './ScrollReveal';
import { Guest, GuestAgeComparison } from '@/types/guest';
import { getGuestPronoun } from '@/utils/guest';
import { useTranslation, interpolate } from '@/i18n';

export default function InvitationHeading({ guest }: { guest: Guest | null }) {
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
        py: { xs: 2, md: 2 },
        pb: '0 !important',
        px: 3,
        backgroundColor: COLORS.bgCream,
      }}
    >
      <ScrollReveal>
        <Typography
          sx={{
            fontFamily: FONTS.serif,
            fontSize: { xs: '0.8rem', sm: '1rem' },
            color: COLORS.textSecondary,
            lineHeight: 1.8,
            maxWidth: 550,
            mx: 'auto',
            letterSpacing: '0.02em',
          }}
        >
          {interpolate(t.heading.invitationLine1, {
            guestPronoun: guestPronoun.toUpperCase(),
          })}
          <br />
          {t.heading.invitationLine2 && (
            <>
              {interpolate(t.heading.invitationLine2, {
                wePronoun: wePronoun.toUpperCase(),
              })}
              <br />
            </>
          )}
          {t.heading.atTime}
        </Typography>
      </ScrollReveal>
    </Box>
  );
}
