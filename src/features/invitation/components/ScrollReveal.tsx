'use client';

import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  sx?: SxProps<Theme>;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  sx,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollAnimation();

  const getTransform = () => {
    const distance = '30px';
    switch (direction) {
      case 'up':
        return `translateY(${distance})`;
      case 'down':
        return `translateY(-${distance})`;
      case 'left':
        return `translateX(${distance})`;
      case 'right':
        return `translateX(-${distance})`;
    }
  };

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : getTransform(),
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
