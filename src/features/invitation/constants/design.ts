// Hội An Lanterns — Warm & Whimsical wedding invitation design tokens
// Palette: Deep navy night sky + warm amber/coral lantern glow
export const COLORS = {
  // Primary - deep navy
  primary: '#1A1A2E',
  primaryLight: '#2D2D4E',
  primaryDark: '#0F0F1E',

  // Accent - warm amber
  accent: '#E8A838',
  accentLight: '#F0C060',
  accentDark: '#C88A20',

  // Secondary - soft coral
  coral: '#E07A5F',
  coralLight: '#E89A85',
  coralDark: '#C45D42',

  // Text
  textPrimary: '#FFF8ED',
  textSecondary: 'rgba(255, 248, 237, 0.7)',
  textOnPrimary: '#1A1A2E',
  textDark: '#2D2D2D',

  // Backgrounds
  bgCream: '#FFF8ED',
  bgWarm: '#1A1A2E',
  bgWhite: '#FEFDFB',
  bgNavy: '#1A1A2E',
  bgNavyLight: '#232342',
  bgCard: 'rgba(255, 248, 237, 0.06)',

  // Envelope - warm lantern tones
  envelopeGradientStart: '#1A1A2E',
  envelopeGradientMid: '#2D2D4E',
  envelopeGradientEnd: '#0F0F1E',

  // Decorative
  gold: '#E8A838',
  goldLight: '#F0C060',
  heartRed: '#E07A5F',
  lanternRed: '#D64545',

  // Borders & overlays
  borderGold: 'rgba(232, 168, 56, 0.2)',
  borderGoldHover: 'rgba(232, 168, 56, 0.4)',
  overlayLight: 'rgba(26, 26, 46, 0.85)',
  overlayDark: 'rgba(0, 0, 0, 0.3)',

  // Glow effects
  glowAmber: '0 0 30px rgba(232, 168, 56, 0.15), 0 0 60px rgba(232, 168, 56, 0.05)',
  glowCoral: '0 0 30px rgba(224, 122, 95, 0.15), 0 0 60px rgba(224, 122, 95, 0.05)',
  glowWarm: '0 4px 30px rgba(232, 168, 56, 0.12)',
} as const;

export const FONTS = {
  script: "'Sacramento', cursive",
  serif: "'Libre Baskerville', serif",
  body: "'Quicksand', sans-serif",
  handwritten: "'Sacramento', cursive",
  display: "'Sacramento', cursive",
} as const;

// Shared animation durations
export const TRANSITIONS = {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  reveal: '800ms',
} as const;

// Shared section styles — dark background with warm glow
export const sectionStyle = (bg: string = COLORS.bgNavy) =>
  ({
    py: { xs: 8, md: 12 },
    px: 3,
    backgroundColor: bg,
    position: 'relative' as const,
  }) as const;

// Shared card styles — lantern card with warm inner glow
export const cardStyle = {
  backgroundColor: COLORS.bgCard,
  backdropFilter: 'blur(12px)',
  borderRadius: 4,
  boxShadow: COLORS.glowAmber,
  border: `1px solid ${COLORS.borderGold}`,
  transition: `all ${TRANSITIONS.normal} ease`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 40px rgba(232, 168, 56, 0.2), 0 0 80px rgba(232, 168, 56, 0.08)',
    borderColor: COLORS.borderGoldHover,
  },
} as const;

// Shared button styles — warm amber
export const primaryButtonStyle = {
  backgroundColor: COLORS.accent,
  color: COLORS.textOnPrimary,
  borderRadius: 3,
  py: 1.5,
  fontWeight: 600,
  textTransform: 'none' as const,
  fontSize: '0.9rem',
  fontFamily: FONTS.body,
  boxShadow: '0 4px 16px rgba(232, 168, 56, 0.3)',
  '&:hover': {
    backgroundColor: COLORS.accentDark,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 24px rgba(232, 168, 56, 0.4)',
  },
  transition: `all ${TRANSITIONS.normal} ease`,
} as const;

// Section heading style — warm glowing script
export const sectionHeadingStyle = {
  fontFamily: FONTS.script,
  color: COLORS.accent,
  fontWeight: 400,
  mb: 2,
  fontSize: { xs: '2.8rem', md: '3.8rem' },
  textShadow: '0 0 40px rgba(232, 168, 56, 0.3)',
} as const;
