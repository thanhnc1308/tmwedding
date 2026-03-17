import {
  Geist,
  Geist_Mono,
  Allison,
  Cormorant_Garamond,
  Dancing_Script,
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

const allison = Allison({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-allison',
});

const dancingScript = Dancing_Script({
  variable: '--font-dancing-script',
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${allison.variable} ${cormorantGaramond.variable} ${dancingScript.variable} antialiased`}
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
