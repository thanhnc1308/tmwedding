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
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { Guest, GuestAgeComparison } from '@/types/guest';
import { trpc } from '@/utils/trpc';
import { getGuestPronoun } from '@/utils/guest';
import toast from 'react-hot-toast';
import { COLORS, FONTS, TRANSITIONS } from '../constants/design';
import ScrollReveal from './ScrollReveal';

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: COLORS.bgWhite,
    borderRadius: '4px',
    fontFamily: FONTS.serif,
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
    fontFamily: FONTS.serif,
    '&::placeholder': {
      color: COLORS.textSecondary,
      opacity: 1,
    },
  },
}));

const SubmitButton = styled(Button)(() => ({
  backgroundColor: COLORS.accent,
  color: COLORS.textOnPrimary,
  fontWeight: 600,
  fontSize: '0.9rem',
  padding: '14px 24px',
  borderRadius: '8px',
  textTransform: 'none',
  letterSpacing: '0.05em',
  fontFamily: FONTS.serif,
  boxShadow: '0 4px 12px rgba(107, 127, 94, 0.25)',
  '&:hover': {
    backgroundColor: COLORS.accentDark,
    boxShadow: '0 6px 16px rgba(107, 127, 94, 0.35)',
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
  const { guestPronoun, wePronoun } = getGuestPronoun(
    guest?.ageComparison ?? GuestAgeComparison.Same,
    guest?.gender,
  );

  const [name, setName] = useState(guest?.name || '');
  const [numberOfGuests, setNumberOfGuests] = useState(
    guest?.memberCount?.toString() || '',
  );
  const [attendance, setAttendance] = useState<string>('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isKnownGuest = guest !== null;

  const utils = trpc.useUtils();

  const submitMutation = trpc.invitation.submitResponse.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success(`Cảm ơn ${guestPronoun.toLowerCase()} đã phản hồi!`);
      utils.invitation.getResponses.invalidate();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendance) {
      toast.error('Vui lòng chọn xác nhận tham dự.');
      return;
    }
    submitMutation.mutate({
      guestId: guest?._id,
      name,
      numberOfGuests:
        attendance === 'accept' ? parseInt(numberOfGuests) || 1 : 0,
      message: message || undefined,
    });
  };

  if (isSubmitted) {
    return (
      <Box id='rsvp' sx={{ backgroundColor: COLORS.bgCream }}>
        <Box sx={{ maxWidth: 500, mx: 'auto', px: 3, py: 8 }}>
          <ScrollReveal>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  fontFamily: FONTS.script,
                  fontSize: '2rem',
                  color: COLORS.accent,
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                Cảm ơn {guestPronoun.toLowerCase()} đã phản hồi!
              </Typography>
              <Typography
                sx={{
                  color: COLORS.textSecondary,
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  fontFamily: FONTS.serif,
                }}
              >
                {wePronoun} rất vui khi nhận được phản hồi của{' '}
                {guestPronoun.toLowerCase()}.
                <br />
                Hẹn gặp {guestPronoun.toLowerCase()} trong ngày vui của{' '}
                {wePronoun.toLowerCase()} nhé!
              </Typography>
            </Box>
          </ScrollReveal>
        </Box>
      </Box>
    );
  }

  return (
    <Box id='rsvp' sx={{ backgroundColor: COLORS.bgCream }}>
      <Box sx={{ maxWidth: 500, mx: 'auto', px: 3, py: { xs: 1, md: 2 } }}>
        <ScrollReveal>
          {/* Intro text */}
          <Typography
            sx={{
              fontFamily: FONTS.serif,
              fontSize: { xs: '1rem', sm: '1rem' },
              color: COLORS.textSecondary,
              textAlign: 'center',
              lineHeight: 1.8,
              mb: 1,
            }}
          >
            Để {wePronoun.toLowerCase()} có thể đón tiếp{' '}
            {guestPronoun.toLowerCase()} một cách trọn vẹn nhất, hãy xác nhận sự
            có mặt của {guestPronoun.toLowerCase()} nhé.
            <br />
          </Typography>

          <Box component='form' onSubmit={handleSubmit}>
            {/* Name Field - only for unknown guests */}
            {!isKnownGuest && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontWeight: 500,
                    color: COLORS.textPrimary,
                    fontSize: '0.85rem',
                    fontFamily: FONTS.serif,
                  }}
                >
                  Tên của {guestPronoun.toLowerCase()}
                </Typography>
                <StyledTextField
                  fullWidth
                  variant='outlined'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size='medium'
                  required
                />
              </Box>
            )}

            {/* Attendance options */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  mb: 1.5,
                  fontWeight: 500,
                  color: COLORS.textPrimary,
                  fontSize: '0.85rem',
                  fontFamily: FONTS.serif,
                }}
              >
                {isKnownGuest ? `${name}` : `${guestPronoun.toLowerCase()}`} sẽ
                đến chia vui trong tiệc cưới của {wePronoun.toLowerCase()} chứ?
              </Typography>
              <RadioGroup
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
              >
                <FormControlLabel
                  value='accept'
                  control={
                    <Radio
                      sx={{
                        color: COLORS.borderGoldHover,
                        '&.Mui-checked': { color: COLORS.accent },
                      }}
                    />
                  }
                  label='Rất sẵn lòng có mặt'
                  sx={{
                    border: `1px solid ${COLORS.borderGold}`,
                    borderRadius: 1,
                    mx: 0,
                    mb: 1,
                    py: 0.5,
                    px: 1,
                    backgroundColor: COLORS.bgWhite,
                    '& .MuiFormControlLabel-label': {
                      fontFamily: FONTS.serif,
                      fontSize: '0.9rem',
                      color: COLORS.textPrimary,
                    },
                  }}
                />
                <FormControlLabel
                  value='decline'
                  control={
                    <Radio
                      sx={{
                        color: COLORS.borderGoldHover,
                        '&.Mui-checked': { color: COLORS.accent },
                      }}
                    />
                  }
                  label='Rất tiếc phải từ chối'
                  sx={{
                    border: `1px solid ${COLORS.borderGold}`,
                    borderRadius: 1,
                    mx: 0,
                    py: 0.5,
                    px: 1,
                    backgroundColor: COLORS.bgWhite,
                    '& .MuiFormControlLabel-label': {
                      fontFamily: FONTS.serif,
                      fontSize: '0.9rem',
                      color: COLORS.textPrimary,
                    },
                  }}
                />
              </RadioGroup>
            </Box>

            {/* Number of Guests Field */}
            {attendance === 'accept' && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    mb: 1,
                    fontWeight: 500,
                    color: COLORS.textPrimary,
                    fontSize: '0.85rem',
                    fontFamily: FONTS.serif,
                  }}
                >
                  Và số lượng người tham gia
                </Typography>
                <StyledTextField
                  fullWidth
                  variant='outlined'
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                  placeholder='Ví dụ: 1'
                  size='medium'
                  type='number'
                  slotProps={{ htmlInput: { min: 1 } }}
                />
              </Box>
            )}

            {/* Message Field */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  mb: 1,
                  fontWeight: 500,
                  color: COLORS.textPrimary,
                  fontSize: '0.85rem',
                  fontFamily: FONTS.serif,
                }}
              >
                {guestPronoun} có muốn để lại lời nhắn, hay lời chúc gì cho{' '}
                {wePronoun.toLowerCase()} không ^^?
              </Typography>
              <StyledTextField
                fullWidth
                variant='outlined'
                multiline
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Lời chúc...'
                size='medium'
              />
            </Box>

            {/* Submit Button */}
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
        </ScrollReveal>
      </Box>
    </Box>
  );
}
