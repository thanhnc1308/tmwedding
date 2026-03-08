'use client';
import { useState, useEffect } from 'react';
import { COLORS, FONTS, TRANSITIONS } from '../constants/design';

const formatNumber = (num: number) => {
  return num.toString().padStart(2, '0');
};

export default function CountdownTimer({
  weddingDate,
}: {
  weddingDate: string;
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingDate);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const items = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ];

  return (
    <div className='mb-12'>
      <div className='flex items-center justify-center space-x-2 mb-4'>
        {items.map((item, index) => (
          <div key={item.label} className='flex items-center'>
            <div className='text-center'>
              <p
                className='text-xs mb-2 tracking-wider'
                style={{
                  fontFamily: FONTS.serif,
                  color: COLORS.textSecondary,
                  letterSpacing: '0.15em',
                  fontWeight: 500,
                }}
              >
                {item.label}
              </p>
              <div
                className='text-3xl font-bold px-4 py-3 rounded-xl min-w-[60px]'
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.textOnPrimary,
                  fontFamily: FONTS.serif,
                  boxShadow: '0 4px 16px rgba(107, 76, 59, 0.3)',
                  transition: `transform ${TRANSITIONS.fast} ease`,
                }}
              >
                {formatNumber(item.value)}
              </div>
            </div>
            {index < items.length - 1 && (
              <span
                className='text-2xl font-bold ml-2'
                style={{ color: COLORS.accent }}
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
