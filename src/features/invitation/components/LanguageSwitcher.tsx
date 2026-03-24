'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { useTranslation } from '@/i18n';
import { locales, type Locale } from '@/i18n/config';
import { COLORS, FONTS } from '../constants/design';

export default function LanguageSwitcher() {
  const { locale } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Check if pathname starts with current locale prefix
    let newPath: string;
    const localePrefix = locales.find((l) =>
      pathname.startsWith(`/${l}/`) || pathname === `/${l}`,
    );

    if (localePrefix) {
      // Replace existing locale prefix
      newPath = pathname.replace(`/${localePrefix}`, `/${newLocale}`);
    } else {
      // No locale prefix — add one
      newPath = `/${newLocale}${pathname}`;
    }

    router.push(newPath);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        bgcolor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(8px)',
        borderRadius: '22px',
        boxShadow: '0 2px 12px rgba(58, 74, 58, 0.15)',
        border: `1px solid ${COLORS.accent}33`,
        overflow: 'hidden',
        animation: 'fadeInUp 0.5s ease forwards',
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {(['vi', 'en'] as const).map((l) => (
        <Typography
          key={l}
          component="button"
          onClick={() => switchLocale(l)}
          sx={{
            all: 'unset',
            cursor: 'pointer',
            px: 1.5,
            py: 0.8,
            fontFamily: FONTS.serif,
            fontSize: '0.8rem',
            fontWeight: locale === l ? 700 : 400,
            color: locale === l ? '#fff' : COLORS.textSecondary,
            bgcolor: locale === l ? COLORS.accent : 'transparent',
            transition: 'all 0.2s ease',
            letterSpacing: '0.05em',
            minWidth: 36,
            textAlign: 'center',
            '&:hover': {
              color: locale === l ? '#fff' : COLORS.accent,
            },
          }}
        >
          {l.toUpperCase()}
        </Typography>
      ))}
    </Box>
  );
}
