'use client';
import { useState, useEffect } from 'react';
import { FONTS } from '../constants/design';
import { useTranslation } from '@/i18n';

const formatNumber = (num: number) => {
  return num.toString().padStart(2, '0');
};

export default function CountdownTimer({
  weddingDate,
}: {
  weddingDate: string;
}) {
  const { t } = useTranslation();

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
    { label: t.countdown.days, value: timeLeft.days },
    { label: t.countdown.hours, value: timeLeft.hours },
    { label: t.countdown.minutes, value: timeLeft.minutes },
    { label: t.countdown.seconds, value: timeLeft.seconds },
  ];

  return (
    <div className='mb-6'>
      <div className='flex items-center justify-center space-x-2'>
        {items.map((item, index) => (
          <div key={item.label} className='flex items-center'>
            <div className='text-center'>
              <p
                className='text-xs mb-2 tracking-wider'
                style={{
                  fontFamily: FONTS.serif,
                  color: 'rgba(255, 255, 255, 0.6)',
                  letterSpacing: '0.15em',
                  fontWeight: 500,
                }}
              >
                {item.label}
              </p>
              <div
                className='text-2xl font-bold px-3 py-2 rounded-lg min-w-[52px]'
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                  color: '#FAFAF8',
                  fontFamily: FONTS.serif,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                {formatNumber(item.value)}
              </div>
            </div>
            {index < items.length - 1 && (
              <span
                className='text-xl font-bold ml-2'
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
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
