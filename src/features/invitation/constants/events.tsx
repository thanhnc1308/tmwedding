import { GuestSource } from '@/types/guest';

export interface WeddingEvent {
  id: string;
  title: string;
  type: 'ceremony' | 'reception';
  date: string;
  time: string;
  venue: string;
  address: string;
  phone?: string;
  email?: string;
  description?: string;
  dresscode?: string;
  mapUrl?: string;
  embededIframe?: React.ReactNode;
}

const CEREMONY_EVENT: WeddingEvent = {
  id: '1',
  title: 'Nhà Trai',
  type: 'ceremony',
  date: '14.01.2024',
  time: '09:00 - 11:00',
  venue: 'Nhà Trai',
  address: 'Thôn Trà Bồ, xã Đoàn Đào, tỉnh Hưng Yên',
  embededIframe: (
    <iframe
      src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1758.7968663738109!2d106.16060564240412!3d20.74799579667959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1768564635080!5m2!1sen!2s'
      width='100%'
      height='100%'
      style={{ border: 0 }}
      allowFullScreen
      loading='lazy'
      referrerPolicy='no-referrer-when-downgrade'
    ></iframe>
  ),
  mapUrl:
    'https://www.google.com/maps/dir/?api=1&destination=20.747792,106.161506',
};

const GROOM_RECEPTION_EVENT: WeddingEvent = {
  id: '2',
  title: 'Nhà Trai',
  type: 'reception',
  date: '14.01.2024',
  time: '18:00 - 21:00',
  venue: 'Nhà Trai',
  address: 'Thôn Trà Bồ, xã Đoàn Đào, tỉnh Hưng Yên',
  embededIframe: (
    <iframe
      src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1758.7968663738109!2d106.16060564240412!3d20.74799579667959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1768564635080!5m2!1sen!2s'
      width='100%'
      height='100%'
      style={{ border: 0 }}
      allowFullScreen
      loading='lazy'
      referrerPolicy='no-referrer-when-downgrade'
    ></iframe>
  ),
  mapUrl:
    'https://www.google.com/maps/dir/?api=1&destination=20.747792,106.161506',
};

const BRIDE_RECEPTION_EVENT: WeddingEvent = {
  id: '2',
  title: 'Nhà Gái',
  type: 'reception',
  date: '14.01.2024',
  time: '18:00 - 21:00',
  venue: 'Nhà Gái',
  address: 'Thôn Trà Bồ, xã Đoàn Đào, tỉnh Hưng Yên',
  embededIframe: (
    <iframe
      src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1758.7968663738109!2d106.171451!3d20.661624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1768564635080!5m2!1sen!2s'
      width='100%'
      height='100%'
      style={{ border: 0 }}
      allowFullScreen
      loading='lazy'
      referrerPolicy='no-referrer-when-downgrade'
    ></iframe>
  ),
  mapUrl:
    'https://www.google.com/maps/dir/?api=1&destination=20.661624,106.171451',
};

export function getEventsForSide(side: GuestSource): WeddingEvent[] {
  return [
    CEREMONY_EVENT,
    side === GuestSource.Groom ? GROOM_RECEPTION_EVENT : BRIDE_RECEPTION_EVENT,
  ];
}
