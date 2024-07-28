import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './favicon.ico';
import { StoreProvider } from '@/contexts/store-provider';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { DateTimeProvider } from '@/contexts/date-time';
import { NotificationManager } from '@/components/notificationManager';
import { ProgressManager } from '@/components/progressManager';

const inter = Inter({ subsets: ['latin'] });

const APP_NAME = 'Habit Tracker';
const APP_DESCRIPTION = 'Track your habits and achieve your goals!';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_NAME,
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: APP_NAME,
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={cn(inter.className)}>
        <StoreProvider>
          <div className="p-3 container">{children}</div>
          <DateTimeProvider />
          <NotificationManager />
          <ProgressManager />
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
