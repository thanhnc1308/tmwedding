'use client';

import { CEREMONY_DATE } from '@/constants/wedding';
import { FONTS } from '../constants/design';
import { useTranslation } from '@/i18n';

interface SaveTheDateButtonProps {
  eventDescription?: string;
  eventLocation?: string;
  startDate?: Date;
  endDate?: Date;
}

export default function SaveTheDateButton({
  eventDescription = '',
  eventLocation = '',
  startDate = new Date(CEREMONY_DATE),
  endDate = new Date(CEREMONY_DATE),
}: SaveTheDateButtonProps) {
  const { t } = useTranslation();
  const eventTitle = t.saveTheDate.eventTitle;
  const formatDateForCalendar = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const handleGoogleCalendar = () => {
    const startDateStr = formatDateForCalendar(startDate);
    const endDateStr = formatDateForCalendar(endDate);

    const googleCalendarUrl = new URL(
      'https://calendar.google.com/calendar/render',
    );
    googleCalendarUrl.searchParams.append('action', 'TEMPLATE');
    googleCalendarUrl.searchParams.append('text', eventTitle);
    googleCalendarUrl.searchParams.append('details', eventDescription);
    googleCalendarUrl.searchParams.append('location', eventLocation);
    googleCalendarUrl.searchParams.append(
      'dates',
      `${startDateStr}/${endDateStr}`,
    );

    window.open(googleCalendarUrl.toString(), '_blank');
  };

  return (
    <button
      onClick={handleGoogleCalendar}
      className='inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium tracking-wider transition-all duration-300 cursor-pointer'
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        color: '#FAFAF8',
        fontFamily: FONTS.serif,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {t.saveTheDate.button}
    </button>
  );
}
