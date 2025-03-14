import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pay_ToDO App',
  description: 'Created with Pay_ToDO',
  generator: 'Pay_ToDO.dev'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
