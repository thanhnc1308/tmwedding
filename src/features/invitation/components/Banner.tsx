'use client';

import CountdownTimer from './CountdownTimer';
import { formatDisplayDate } from '@/utils/date';
import SaveTheDateButton from './SaveTheDateButton';
import { BRIDE_NAME, GROOM_NAME, WEDDING_DATE } from '@/constants/wedding';
import { COLORS, FONTS } from '../constants/design';

function FloatingLantern({ delay, left, size, color }: { delay: number; left: string; size: number; color: string }) {
  return (
    <div
      className='absolute'
      style={{
        left,
        bottom: '15%',
        animation: `lanternFloat ${6 + delay}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <svg width={size} height={size * 1.4} viewBox='0 0 40 56' fill='none'>
        {/* Lantern body */}
        <ellipse cx='20' cy='28' rx='16' ry='20' fill={color} opacity='0.15' />
        <ellipse cx='20' cy='28' rx='14' ry='18' fill={color} opacity='0.2' />
        <ellipse cx='20' cy='28' rx='10' ry='14' fill={color} opacity='0.25' />
        {/* Glow */}
        <ellipse cx='20' cy='28' rx='18' ry='22' fill={color} opacity='0.05' />
        {/* Top hook */}
        <rect x='18' y='6' width='4' height='6' rx='2' fill={color} opacity='0.3' />
        {/* String */}
        <line x1='20' y1='0' x2='20' y2='8' stroke={color} strokeWidth='1' opacity='0.2' />
      </svg>
    </div>
  );
}

function Fireflies() {
  const flies = Array.from({ length: 12 });
  return (
    <div className='absolute inset-0 overflow-hidden pointer-events-none'>
      {flies.map((_, i) => (
        <div
          key={i}
          className='absolute rounded-full'
          style={{
            left: `${5 + ((i * 8.3) % 90)}%`,
            top: `${10 + ((i * 13.7) % 80)}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            backgroundColor: COLORS.accent,
            animation: `firefly ${8 + (i % 5) * 2}s ease-in-out infinite`,
            animationDelay: `${(i * 1.5) % 10}s`,
            boxShadow: `0 0 6px ${COLORS.accent}, 0 0 12px ${COLORS.accent}`,
          }}
        />
      ))}
    </div>
  );
}

export default function WeddingBanner() {
  return (
    <div
      className='relative min-h-screen overflow-hidden'
      style={{
        background: `linear-gradient(180deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 40%, ${COLORS.primaryLight} 100%)`,
      }}
    >
      <Fireflies />

      {/* Floating lanterns */}
      <FloatingLantern delay={0} left='8%' size={35} color={COLORS.accent} />
      <FloatingLantern delay={1.5} left='25%' size={28} color={COLORS.coral} />
      <FloatingLantern delay={0.8} left='70%' size={32} color={COLORS.accent} />
      <FloatingLantern delay={2.2} left='85%' size={25} color={COLORS.lanternRed} />
      <FloatingLantern delay={1} left='50%' size={30} color={COLORS.coral} />

      {/* Main Content */}
      <div className='relative z-10 flex flex-col items-center justify-center min-h-screen px-4'>
        {/* Small lantern icon */}
        <svg width='32' height='44' viewBox='0 0 32 44' fill='none' className='mb-6'>
          <rect x='14' y='0' width='4' height='5' rx='2' fill={COLORS.accent} opacity='0.6' />
          <ellipse cx='16' cy='24' rx='12' ry='16' fill={COLORS.accent} opacity='0.1' />
          <ellipse cx='16' cy='24' rx='10' ry='14' stroke={COLORS.accent} strokeWidth='1' opacity='0.4' />
          <ellipse cx='16' cy='24' rx='6' ry='9' fill={COLORS.accent} opacity='0.15' />
          <line x1='16' y1='5' x2='16' y2='10' stroke={COLORS.accent} strokeWidth='1' opacity='0.4' />
        </svg>

        {/* Subtitle */}
        <p
          className='text-sm tracking-[0.3em] uppercase mb-6'
          style={{
            fontFamily: FONTS.body,
            color: COLORS.textSecondary,
            fontWeight: 500,
          }}
        >
          Chúng mình sắp cưới
        </p>

        {/* Names */}
        <div className='text-center mb-6'>
          <h1
            className='text-6xl md:text-7xl lg:text-8xl mb-4'
            style={{
              fontFamily: FONTS.script,
              color: COLORS.accent,
              textShadow: '0 0 40px rgba(232, 168, 56, 0.3), 0 0 80px rgba(232, 168, 56, 0.1)',
            }}
          >
            {GROOM_NAME}
            <span
              style={{
                color: COLORS.coral,
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
                opacity: 0.4,
              }}
            />
            <svg width='12' height='12' viewBox='0 0 16 16' fill='none'>
              <path
                d='M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2L8 0Z'
                fill={COLORS.accent}
                opacity='0.6'
              />
            </svg>
            <div
              className='h-px w-16'
              style={{
                background: `linear-gradient(to left, transparent, ${COLORS.accent})`,
                opacity: 0.4,
              }}
            />
          </div>
        </div>

        {/* Date */}
        <div className='text-center mb-8'>
          <p
            style={{
              fontFamily: FONTS.body,
              color: COLORS.textPrimary,
              fontWeight: 500,
              letterSpacing: '0.2em',
              fontSize: '1.05rem',
            }}
          >
            {formatDisplayDate(WEDDING_DATE)}
          </p>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer weddingDate={WEDDING_DATE} />

        {/* Save the Date Button */}
        <SaveTheDateButton />
      </div>
    </div>
  );
}
