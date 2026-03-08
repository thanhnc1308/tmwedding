'use client';

import { WEDDING_DATE } from '@/constants/wedding';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { COLORS, FONTS } from '../constants/design';

interface SaveTheDateButtonProps {
  eventTitle?: string;
  eventDescription?: string;
  eventLocation?: string;
  startDate?: Date;
  endDate?: Date;
}

export default function SaveTheDateButton({
  eventTitle = 'Đám Cưới Thành Mến',
  eventDescription = '',
  eventLocation = '',
  startDate = new Date(WEDDING_DATE),
  endDate = new Date(WEDDING_DATE),
}: SaveTheDateButtonProps) {
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

  const handleAppleCalendar = () => {
    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${eventTitle}`,
      `DESCRIPTION:${eventDescription}`,
      `LOCATION:${eventLocation}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wedding-invitation.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <MenuButton
        className='inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium tracking-wider transition-all duration-300 cursor-pointer'
        style={{
          backgroundColor: `${COLORS.bgWhite}CC`,
          border: `1px solid ${COLORS.borderGold}`,
          color: COLORS.textPrimary,
          fontFamily: FONTS.serif,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.bgWhite;
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = `${COLORS.bgWhite}CC`;
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Thêm vào lịch
        <ChevronDownIcon className='h-5 w-5' />
      </MenuButton>

      <MenuItems
        transition
        className='absolute right-0 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in z-10'
        style={{ backgroundColor: COLORS.bgWhite }}
      >
        <div className='py-1'>
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={handleGoogleCalendar}
                className='group flex w-full items-center px-4 py-2 text-sm cursor-pointer'
                style={{
                  backgroundColor: focus ? COLORS.bgCream : 'transparent',
                  color: COLORS.textPrimary,
                  fontFamily: FONTS.serif,
                }}
              >
                <svg className='mr-3 h-5 w-5' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                    fill='#4285F4'
                  />
                  <path
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                    fill='#34A853'
                  />
                  <path
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                    fill='#FBBC05'
                  />
                  <path
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                    fill='#EA4335'
                  />
                </svg>
                Google Calendar
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                onClick={handleAppleCalendar}
                className='group flex w-full items-center px-4 py-2 text-sm cursor-pointer'
                style={{
                  backgroundColor: focus ? COLORS.bgCream : 'transparent',
                  color: COLORS.textPrimary,
                  fontFamily: FONTS.serif,
                }}
              >
                <svg
                  className='mr-3 h-5 w-5'
                  fill={COLORS.textSecondary}
                  viewBox='0 0 24 24'
                >
                  <path d='M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z' />
                </svg>
                Apple Calendar
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
