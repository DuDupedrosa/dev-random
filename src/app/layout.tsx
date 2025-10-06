import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'DevRandom',
  description: 'Gerador de dados aleatórios',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-funnel-display">
        {children}
        <Toaster richColors={true} position="top-center" />
      </body>
    </html>
  );
}
