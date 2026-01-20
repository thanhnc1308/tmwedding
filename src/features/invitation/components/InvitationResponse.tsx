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

const FormContainer = styled(Box)(() => ({
  backgroundColor: '#fef9e7',
  padding: '40px 32px',
  maxWidth: '600px',
  margin: '0 auto',
  borderRadius: '16px',
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    '& fieldset': {
      borderColor: '#e8dfc9',
      borderWidth: '1px',
    },
    '&:hover fieldset': {
      borderColor: '#d4c9a8',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#c9a227',
      borderWidth: '2px',
    },
  },
  '& .MuiInputBase-input': {
    color: '#666',
    '&::placeholder': {
      color: '#aaa',
      opacity: 1,
    },
  },
}));

const SubmitButton = styled(Button)(() => ({
  backgroundColor: '#c9a227',
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '14px',
  padding: '14px 24px',
  borderRadius: '8px',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  boxShadow: '0 4px 12px rgba(201, 162, 39, 0.3)',
  '&:hover': {
    backgroundColor: '#b8931f',
    boxShadow: '0 6px 16px rgba(201, 162, 39, 0.4)',
  },
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
      <FormContainer>
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography sx={{ fontSize: '3rem', mb: 2 }}>💝</Typography>
          <Typography
            sx={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: '2rem',
              color: '#c9a227',
              fontWeight: 600,
              mb: 2,
              lineHeight: 1.4,
            }}
          >
            Cảm ơn bạn đã phản hồi!
          </Typography>
          <Typography
            sx={{
              color: '#5a5a5a',
              fontSize: '1rem',
              lineHeight: 1.6,
            }}
          >
            Chúng mình rất vui khi nhận được phản hồi của bạn.
            <br />
            Hẹn gặp bạn trong ngày vui của chúng mình nhé!
          </Typography>
        </Box>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      {/* Header */}
      {!isKnownGuest && (
        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: "'Dancing Script', cursive",
            fontSize: '2rem',
            color: '#c9a227',
            fontWeight: 600,
            mb: 1,
            lineHeight: 1.3,
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
            fontFamily: "'Dancing Script', cursive",
            fontSize: '2rem',
            color: '#c9a227',
            fontWeight: 600,
            mb: 1,
            lineHeight: 1.3,
          }}
        >
          {capitalizeFirstLetter(guestPronoun)} {name} cho chúng mình biết bạn
          có tham
          <br />
          dự được không nha.
        </Typography>
      )}

      {/* Divider with bow */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Box
          sx={{
            display: 'inline-block',
            width: '200px',
            height: '1px',
            backgroundColor: '#c9a227',
            position: 'relative',
          }}
        />
        <Typography sx={{ fontSize: '1.2rem', mt: 1 }}>🎀</Typography>
      </Box>

      <Box component='form' onSubmit={handleSubmit}>
        {/* Name Field */}
        {!isKnownGuest && (
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                mb: 1,
                fontWeight: 500,
                color: '#5a5a5a',
                fontSize: '14px',
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
              color: '#5a5a5a',
              fontSize: '14px',
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
              color: '#5a5a5a',
              fontSize: '14px',
            }}
          >
            Bạn có muốn để lại lời nhắn, hay lời chúc gì cho tụi mình không ^^?
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
              <CircularProgress size={24} sx={{ color: '#ffffff' }} />
            ) : (
              'Gửi phản hồi'
            )}
          </SubmitButton>
        </Box>
      </Box>
    </FormContainer>
  );
}
