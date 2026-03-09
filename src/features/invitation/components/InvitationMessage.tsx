'use client';

import { Box, Typography } from '@mui/material';
import { COLORS, FONTS } from '../constants/design';
import OrnamentalDivider from './OrnamentalDivider';
import ScrollReveal from './ScrollReveal';

export default function InvitationMessage() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 8, md: 10 },
        px: 3,
        backgroundColor: COLORS.bgNavy,
      }}
    >
      <ScrollReveal>
        <OrnamentalDivider />
        <Typography
          sx={{
            fontFamily: FONTS.script,
            fontSize: { xs: '1.8rem', sm: '2.2rem' },
            color: COLORS.accent,
            lineHeight: 1.6,
            maxWidth: 600,
            mx: 'auto',
            mt: 3,
            mb: 2,
            textShadow: '0 0 30px rgba(232, 168, 56, 0.2)',
          }}
        >
          Trân trọng kính mời bạn đến tham dự lễ cưới và bữa tiệc thân mật cùng
          chúng mình!
        </Typography>
        <OrnamentalDivider />
      </ScrollReveal>
    </Box>
  );
}
