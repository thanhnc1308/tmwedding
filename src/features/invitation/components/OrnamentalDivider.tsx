'use client';

import { Box } from '@mui/material';
import { COLORS } from '../constants/design';

interface OrnamentalDividerProps {
  color?: string;
  width?: string | number;
}

export default function OrnamentalDivider({
  color = COLORS.accent,
  width = 200,
}: OrnamentalDividerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        width,
        mx: 'auto',
        my: 2,
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: '1px',
          background: `linear-gradient(to right, transparent, ${color})`,
          opacity: 0.4,
        }}
      />
      {/* Small lantern icon */}
      <svg width='16' height='22' viewBox='0 0 16 22' fill='none'>
        <rect x='6.5' y='0' width='3' height='3' rx='1.5' fill={color} opacity='0.5' />
        <ellipse cx='8' cy='13' rx='6' ry='8' fill={color} opacity='0.15' />
        <ellipse cx='8' cy='13' rx='5' ry='7' stroke={color} strokeWidth='0.8' opacity='0.5' />
        <line x1='8' y1='3' x2='8' y2='6' stroke={color} strokeWidth='0.8' opacity='0.4' />
      </svg>
      <Box
        sx={{
          flex: 1,
          height: '1px',
          background: `linear-gradient(to left, transparent, ${color})`,
          opacity: 0.4,
        }}
      />
    </Box>
  );
}
