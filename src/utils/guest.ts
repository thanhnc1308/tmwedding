import { GuestAgeComparison, GuestGender } from '@/types/guest';
import type { Locale } from '@/i18n/config';

/**
 * Returns the appropriate pronoun pair based on guest's age comparison, gender, and locale.
 * In English, always returns "you"/"we".
 * In Vietnamese, returns culturally-appropriate honorifics.
 */
export function getGuestPronoun(
  ageComparison: GuestAgeComparison,
  gender?: GuestGender,
  locale: Locale = 'vi',
): { guestPronoun: string; wePronoun: string } {
  if (locale === 'en') {
    return { guestPronoun: 'you', wePronoun: 'we' };
  }

  if (ageComparison === GuestAgeComparison.Same) {
    return { guestPronoun: 'Bạn', wePronoun: 'Chúng mình' };
  }

  if (ageComparison === GuestAgeComparison.Teacher) {
    const guestPronoun = gender === GuestGender.Female ? 'Cô' : 'Thầy';
    return { guestPronoun, wePronoun: 'Chúng em' };
  }

  if (ageComparison === GuestAgeComparison.Older) {
    const guestPronoun = gender === GuestGender.Female ? 'Chị' : 'Anh';
    return { guestPronoun, wePronoun: 'Chúng em' };
  }

  // Younger
  return { guestPronoun: 'Em', wePronoun: 'Chúng mình' };
}
