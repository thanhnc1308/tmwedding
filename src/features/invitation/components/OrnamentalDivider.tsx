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
        }}
      />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z"
          fill={color}
          opacity="0.8"
        />
      </svg>
      <Box
        sx={{
          flex: 1,
          height: '1px',
          background: `linear-gradient(to left, transparent, ${color})`,
        }}
      />
    </Box>
  );
}
