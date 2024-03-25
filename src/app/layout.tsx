import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './favicon.ico';
import { StoreProvider } from '@/contexts/store-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Habit Tracker',
  description: 'Track your habits and achieve your goals!',
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
      <body className={inter.className}>
        <StoreProvider>
          <div className="p-3 container">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
