import {
  Geist,
  Geist_Mono,
  Libre_Baskerville,
  Quicksand,
  Sacramento,
} from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { TRPCProvider } from '@/providers/TRPCProvider';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const libreBaskerville = Libre_Baskerville({
  variable: '--font-libre-baskerville',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const sacramento = Sacramento({
  variable: '--font-sacramento',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  weight: '400',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${libreBaskerville.variable} ${quicksand.variable} ${sacramento.variable} antialiased`}
        suppressHydrationWarning
      >
        <AppRouterCacheProvider>
          <TRPCProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </TRPCProvider>
        </AppRouterCacheProvider>
        <Toaster position='top-right' />
      </body>
    </html>
  );
}
