// Consolidated wedding invitation design tokens
// Palette: Refined warm brown + antique gold — elegant Vietnamese wedding
export const COLORS = {
  // Primary - rich walnut brown
  primary: '#6B4C3B',
  primaryLight: '#8D6E5D',
  primaryDark: '#4E3629',

  // Accent - antique gold
  accent: '#B8963B',
  accentLight: '#D4B262',
  accentDark: '#967726',

  // Text
  textPrimary: '#3B2E26',
  textSecondary: '#857468',
  textOnPrimary: '#FFFDF9',

  // Backgrounds
  bgCream: '#FAF7F2',
  bgWarm: '#F0EAE0',
  bgWhite: '#FEFDFB',

  // Envelope
  envelopeGradientStart: '#B44040',
  envelopeGradientMid: '#C85050',
  envelopeGradientEnd: '#A63636',

  // Decorative
  gold: '#C9A84C',
  goldLight: '#E0C878',
  heartRed: '#D45B68',

  // Borders & overlays
  borderGold: 'rgba(184, 150, 59, 0.15)',
  borderGoldHover: 'rgba(184, 150, 59, 0.3)',
  overlayLight: 'rgba(250, 247, 242, 0.88)',
  overlayDark: 'rgba(59, 46, 38, 0.06)',
} as const;

export const FONTS = {
  script: "'Dancing Script', cursive",
  serif: "'Cormorant Garamond', serif",
  body: "'Cormorant Garamond', serif",
  handwritten: "'Kalam', cursive",
  display: "'Allison', cursive",
} as const;

// Shared animation durations
export const TRANSITIONS = {
  fast: '150ms',
  normal: '250ms',
  slow: '500ms',
  reveal: '800ms',
} as const;

// Shared section styles
export const sectionStyle = (bg: string = COLORS.bgCream) =>
  ({
    py: { xs: 8, md: 12 },
    px: 3,
    backgroundColor: bg,
    position: 'relative' as const,
  }) as const;

// Shared card styles
export const cardStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  borderRadius: 3,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
  border: `1px solid ${COLORS.borderGold}`,
  transition: `all ${TRANSITIONS.normal} ease`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.1)',
    borderColor: COLORS.borderGoldHover,
  },
} as const;

// Shared button styles
export const primaryButtonStyle = {
  backgroundColor: COLORS.primary,
  color: COLORS.textOnPrimary,
  borderRadius: 2,
  py: 1.5,
  fontWeight: 600,
  textTransform: 'none' as const,
  fontSize: '0.9rem',
  fontFamily: FONTS.serif,
  boxShadow: '0 4px 12px rgba(107, 76, 59, 0.25)',
  '&:hover': {
    backgroundColor: COLORS.primaryDark,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(107, 76, 59, 0.35)',
  },
  transition: `all ${TRANSITIONS.normal} ease`,
} as const;

// Section heading style
export const sectionHeadingStyle = {
  fontFamily: FONTS.script,
  color: COLORS.primary,
  fontWeight: 700,
  mb: 2,
  fontSize: { xs: '2.5rem', md: '3.5rem' },
} as const;
