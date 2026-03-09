'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  styled,
  CircularProgress,
} from '@mui/material';
import { Guest } from '@/types/guest';
import { getGuestPronoun } from '../helpers/guest';
import { capitalizeFirstLetter } from '@/utils';
import { trpc } from '@/utils/trpc';
import toast from 'react-hot-toast';
import { COLORS, FONTS, TRANSITIONS } from '../constants/design';
import OrnamentalDivider from './OrnamentalDivider';
import ScrollReveal from './ScrollReveal';

const FormContainer = styled(Box)(() => ({
  backgroundColor: COLORS.bgCard,
  backdropFilter: 'blur(12px)',
  padding: '40px 32px',
  maxWidth: '600px',
  margin: '0 auto',
  borderRadius: '20px',
  border: `1px solid ${COLORS.borderGold}`,
  boxShadow: COLORS.glowAmber,
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 248, 237, 0.06)',
    borderRadius: '12px',
    fontFamily: FONTS.body,
    color: COLORS.textPrimary,
    '& fieldset': {
      borderColor: COLORS.borderGold,
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: COLORS.borderGoldHover,
    },
    '&.Mui-focused fieldset': {
      borderColor: COLORS.accent,
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    color: COLORS.textPrimary,
    fontFamily: FONTS.body,
    '&::placeholder': {
      color: COLORS.textSecondary,
      opacity: 1,
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: FONTS.body,
    color: COLORS.textSecondary,
  },
}));

const SubmitButton = styled(Button)(() => ({
  backgroundColor: COLORS.accent,
  color: COLORS.textOnPrimary,
  fontWeight: 600,
  fontSize: '14px',
  padding: '14px 24px',
  borderRadius: '12px',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  fontFamily: FONTS.body,
  boxShadow: '0 4px 20px rgba(232, 168, 56, 0.3)',
  '&:hover': {
    backgroundColor: COLORS.accentDark,
    boxShadow: '0 6px 24px rgba(232, 168, 56, 0.4)',
    transform: 'translateY(-1px)',
  },
  transition: `all ${TRANSITIONS.normal} ease`,
}));

interface InvitationResponseProps {
  guest: Guest | null;
  onSuccess?: () => void;
}

export default function InvitationResponse({
  guest,
  onSuccess,
}: InvitationResponseProps) {
  const [name, setName] = useState(guest?.name || '');
  const [numberOfGuests, setNumberOfGuests] = useState(
    guest?.memberCount?.toString() || '',
  );
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isKnownGuest = guest !== null;
  const guestPronoun = getGuestPronoun(guest);

  const utils = trpc.useUtils();

  const submitMutation = trpc.invitation.submitResponse.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success('Cảm ơn bạn đã phản hồi!');
      utils.invitation.getResponses.invalidate();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({
      guestId: guest?._id,
      name,
      numberOfGuests: parseInt(numberOfGuests) || 1,
      message: message || undefined,
    });
  };

  if (isSubmitted) {
    return (
      <Box id='rsvp' sx={{ backgroundColor: COLORS.bgNavy, py: { xs: 2, md: 4 } }}>
        <FormContainer>
          <ScrollReveal>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(232, 168, 56, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  boxShadow: '0 0 20px rgba(232, 168, 56, 0.2)',
                }}
              >
                <svg width='28' height='28' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                    fill={COLORS.coral}
                  />
                </svg>
              </Box>
              <Typography
                sx={{
                  fontFamily: FONTS.script,
                  fontSize: '2.2rem',
                  color: COLORS.accent,
                  mb: 2,
                  lineHeight: 1.4,
                  textShadow: '0 0 20px rgba(232, 168, 56, 0.2)',
                }}
              >
                Cảm ơn bạn đã phản hồi!
              </Typography>
              <Typography
                sx={{
                  color: COLORS.textSecondary,
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  fontFamily: FONTS.body,
                }}
              >
                Chúng mình rất vui khi nhận được phản hồi của bạn.
                <br />
                Hẹn gặp bạn trong ngày vui của chúng mình nhé!
              </Typography>
            </Box>
          </ScrollReveal>
        </FormContainer>
      </Box>
    );
  }

  return (
    <Box id='rsvp' sx={{ backgroundColor: COLORS.bgNavy, py: { xs: 2, md: 4 } }}>
      <FormContainer>
        <ScrollReveal>
          {/* Header */}
          {!isKnownGuest && (
            <Typography
              sx={{
                textAlign: 'center',
                fontFamily: FONTS.script,
                fontSize: '2.2rem',
                color: COLORS.accent,
                mb: 1,
                lineHeight: 1.3,
                textShadow: '0 0 20px rgba(232, 168, 56, 0.2)',
              }}
            >
              Cho chúng mình biết bạn có tham
              <br />
              dự được không nha.
            </Typography>
          )}

          {isKnownGuest && (
            <Typography
              sx={{
                textAlign: 'center',
                fontFamily: FONTS.script,
                fontSize: '2.2rem',
                color: COLORS.accent,
                mb: 1,
                lineHeight: 1.3,
                textShadow: '0 0 20px rgba(232, 168, 56, 0.2)',
              }}
            >
              {capitalizeFirstLetter(guestPronoun)} {name} cho chúng mình biết
              bạn có tham
              <br />
              dự được không nha.
            </Typography>
          )}

          {/* Divider */}
          <Box sx={{ mb: 4 }}>
            <OrnamentalDivider width={180} />
          </Box>

          <Box component='form' onSubmit={handleSubmit}>
            {/* Name Field */}
            {!isKnownGuest && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontWeight: 500,
                    color: COLORS.textSecondary,
                    fontSize: '14px',
                    fontFamily: FONTS.body,
                  }}
                >
                  Cho chúng mình xin tên của bạn nhé?*
                </Typography>
                <StyledTextField
                  fullWidth
                  variant='outlined'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Nhập họ và tên'
                  size='medium'
                  required
                />
              </Box>
            )}

            {/* Number of Guests Field */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: COLORS.textSecondary,
                  fontSize: '14px',
                  fontFamily: FONTS.body,
                }}
              >
                Số lượng người tham gia?*
              </Typography>
              <StyledTextField
                fullWidth
                variant='outlined'
                value={numberOfGuests}
                onChange={(e) => setNumberOfGuests(e.target.value)}
                placeholder='Ví dụ: 1'
                size='medium'
                type='number'
                required
                slotProps={{ htmlInput: { min: 1 } }}
              />
            </Box>

            {/* Message Field */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: COLORS.textSecondary,
                  fontSize: '14px',
                  fontFamily: FONTS.body,
                }}
              >
                Bạn có muốn để lại lời nhắn, hay lời chúc gì cho tụi mình không
                ^^?
              </Typography>
              <StyledTextField
                fullWidth
                variant='outlined'
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Lời chúc...'
                size='medium'
              />
            </Box>

            {/* Submit Button */}
            <Box sx={{ textAlign: 'center' }}>
              <SubmitButton
                type='submit'
                variant='contained'
                fullWidth
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? (
                  <CircularProgress
                    size={24}
                    sx={{ color: COLORS.textOnPrimary }}
                  />
                ) : (
                  'Gửi phản hồi'
                )}
              </SubmitButton>
            </Box>
          </Box>
        </ScrollReveal>
      </FormContainer>
    </Box>
  );
}
