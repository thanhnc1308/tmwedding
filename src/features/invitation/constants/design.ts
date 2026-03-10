// Consolidated wedding invitation design tokens
// Palette: Dark olive green + sage — elegant Vietnamese wedding
export const COLORS = {
  // Primary - dark forest green
  primary: '#3A4A3A',
  primaryLight: '#5A6A5A',
  primaryDark: '#2A352A',

  // Accent - muted sage green
  accent: '#6B7F5E',
  accentLight: '#8BA07B',
  accentDark: '#536648',

  // Text
  textPrimary: '#2D352D',
  textSecondary: '#6B7568',
  textOnPrimary: '#FAFAF8',

  // Backgrounds
  bgCream: '#F5F2ED',
  bgWarm: '#EDE9E3',
  bgWhite: '#FAFAF8',

  // Envelope
  envelopeGradientStart: '#B44040',
  envelopeGradientMid: '#C85050',
  envelopeGradientEnd: '#A63636',

  // Decorative
  gold: '#7A8B6F',
  goldLight: '#9AAD8D',
  heartRed: '#D45B68',

  // Borders & overlays
  borderGold: 'rgba(107, 127, 94, 0.15)',
  borderGoldHover: 'rgba(107, 127, 94, 0.3)',
  overlayLight: 'rgba(245, 242, 237, 0.88)',
  overlayDark: 'rgba(42, 53, 42, 0.06)',
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
  backgroundColor: COLORS.accent,
  color: COLORS.textOnPrimary,
  borderRadius: 2,
  py: 1.5,
  fontWeight: 600,
  textTransform: 'none' as const,
  fontSize: '0.9rem',
  fontFamily: FONTS.serif,
  boxShadow: '0 4px 12px rgba(107, 127, 94, 0.25)',
  '&:hover': {
    backgroundColor: COLORS.accentDark,
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(107, 127, 94, 0.35)',
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
