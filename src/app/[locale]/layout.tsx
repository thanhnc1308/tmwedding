import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n/utils';
import { LocaleProvider } from '@/i18n/context';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const translations = getTranslations(locale as Locale);

  return (
    <LocaleProvider locale={locale as Locale} translations={translations}>
      {children}
    </LocaleProvider>
  );
}
