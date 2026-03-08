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
        backgroundColor: COLORS.bgCream,
      }}
    >
      <ScrollReveal>
        <OrnamentalDivider />
        <Typography
          sx={{
            fontFamily: FONTS.script,
            fontSize: { xs: '1.6rem', sm: '2rem' },
            color: COLORS.primary,
            lineHeight: 1.6,
            maxWidth: 600,
            mx: 'auto',
            mt: 3,
            mb: 2,
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
