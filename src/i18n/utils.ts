import type { Locale } from './config';
import { vi } from './locales/vi';
import { en } from './locales/en';
import type { TranslationDict } from './locales/vi';

export function getTranslations(locale: Locale): TranslationDict {
  switch (locale) {
    case 'en':
      return en;
    case 'vi':
    default:
      return vi;
  }
}

export function interpolate(
  template: string,
  vars: Record<string, string>,
): string {
  return template.replace(/{(\w+)}/g, (_, key: string) => vars[key] ?? `{${key}}`);
}
