import { Dancing_Script } from 'next/font/google';
import CountdownTimer from './CountdownTimer';
import { formatDisplayDate } from '@/utils/date';
import SaveTheDateButton from './SaveTheDateButton';
import { BRIDE_NAME, GROOM_NAME, WEDDING_DATE } from '@/constants/wedding';
import { COLORS, FONTS } from '../constants/design';

const dancingScript = Dancing_Script({
  variable: '--font-dancing-script',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
});

interface WeddingBannerProps {
  quote?: string;
  backgroundImage?: string;
  showCountdown?: boolean;
}

export default function WeddingBanner({
  quote = '',
  backgroundImage = '/images/wedding-bg.JPG',
}: WeddingBannerProps) {
  return (
    <div className='relative min-h-screen overflow-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      >
        <div
          className='absolute inset-0'
          style={{
            background: `linear-gradient(to bottom, ${COLORS.bgCream}33 0%, ${COLORS.bgCream}4D 50%, ${COLORS.bgCream}80 100%)`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4'>
        {/* Script Title */}
        <p
          className='text-3xl md:text-4xl mb-8'
          style={{
            fontFamily: dancingScript.style.fontFamily,
            color: COLORS.textSecondary,
            fontWeight: 400,
          }}
        >
          Dám cưới
        </p>

        {/* Names */}
        <div className='text-center mb-6'>
          <h1
            className='text-6xl md:text-7xl lg:text-8xl mb-4'
            style={{
              fontFamily: dancingScript.style.fontFamily,
              color: COLORS.primary,
            }}
          >
            {GROOM_NAME}
            <span
              style={{
                color: COLORS.accent,
                margin: '0 0.3em',
                fontSize: '0.6em',
                fontWeight: 400,
              }}
            >
              &amp;
            </span>
            {BRIDE_NAME}
          </h1>

          {/* Ornamental line */}
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div
              className='h-px w-16'
              style={{
                background: `linear-gradient(to right, transparent, ${COLORS.accent})`,
              }}
            />
            <svg
              width='12'
              height='12'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z'
                fill={COLORS.accent}
                opacity='0.7'
              />
            </svg>
            <div
              className='h-px w-16'
              style={{
                background: `linear-gradient(to left, transparent, ${COLORS.accent})`,
              }}
            />
          </div>
        </div>

        {/* Date */}
        <div className='text-center mb-8'>
          <p
            style={{
              fontFamily: FONTS.serif,
              color: COLORS.textPrimary,
              fontWeight: 500,
              letterSpacing: '0.2em',
              fontSize: '1.15rem',
            }}
          >
            {formatDisplayDate(WEDDING_DATE)}
          </p>
        </div>

        {/* Quote */}
        {quote && (
          <div className='text-center mb-12 max-w-md'>
            <p
              style={{
                fontFamily: FONTS.serif,
                color: COLORS.textSecondary,
                fontStyle: 'italic',
                fontSize: '1.05rem',
                lineHeight: 1.7,
              }}
            >
              &quot;{quote}&quot;
            </p>
          </div>
        )}

        {/* Countdown Timer */}
        <CountdownTimer weddingDate={WEDDING_DATE} />

        {/* Save the Date Button */}
        <SaveTheDateButton />
      </div>
    </div>
  );
}
