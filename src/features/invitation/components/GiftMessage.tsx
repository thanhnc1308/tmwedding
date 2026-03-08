'use client';

import { Box, Typography } from '@mui/material';
import { COLORS, FONTS } from '../constants/design';
import OrnamentalDivider from './OrnamentalDivider';
import ScrollReveal from './ScrollReveal';

export default function GiftMessage() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 8, md: 10 },
        px: 3,
        backgroundColor: COLORS.bgWarm,
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
          Sự hiện diện và lời chúc của bạn là món quà quý giá nhất đối với chúng
          mình!
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem' },
            color: COLORS.textSecondary,
            lineHeight: 1.6,
            maxWidth: 500,
            mx: 'auto',
            fontFamily: FONTS.serif,
          }}
        >
          Nếu bạn muốn gửi gắm thêm tình cảm, có thể tìm thấy thông tin bên dưới
          đây. Chúng mình vô cùng trân trọng.
        </Typography>
        <OrnamentalDivider />
      </ScrollReveal>
    </Box>
  );
}
