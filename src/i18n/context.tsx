'use client';

import { createContext, useContext } from 'react';
import type { Locale } from './config';
import type { TranslationDict } from './locales/vi';

interface LocaleContextValue {
  locale: Locale;
  t: TranslationDict;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  locale: Locale;
  translations: TranslationDict;
  children: React.ReactNode;
}

export function LocaleProvider({
  locale,
  translations,
  children,
}: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={{ locale, t: translations }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LocaleProvider');
  }
  return context;
}
