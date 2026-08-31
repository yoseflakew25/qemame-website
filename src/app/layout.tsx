import type { Metadata, Viewport } from 'next';
import ClientInit from '@/components/ui/ClientInit';
import '@/styles/globals.css';

export const viewport: Viewport = {
  themeColor: '#0B1210',
};

export const metadata: Metadata = {
  title: 'QEMAME TRADING PLC | Ethiopian green coffee exporter, Addis Ababa',
  description:
    'QEMAME TRADING PLC is a green coffee exporter in Addis Ababa, Ethiopia, supplying specialty and commercial arabica from Yirgacheffe, Sidama, Guji, Limmu and the Bench Maji region, home of Geisha. Taste the World.',
  openGraph: {
    title: 'QEMAME TRADING PLC | Taste the World',
    description:
      'Ethiopian green coffee, specialty and commercial, sourced from the highlands and exported from Addis Ababa with traceability and care.',
    type: 'website',
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230B1210'/%3E%3Cg transform='translate(32 32) rotate(-24)'%3E%3Cellipse rx='24' ry='16.5' fill='%23D9A441'/%3E%3Cpath d='M-17 0C-9-7 9 7 17 0' stroke='%231B1210' stroke-width='4.6' fill='none' stroke-linecap='round'/%3E%3C/g%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/img/cherries-in-hands.jpg" as="image" fetchPriority="high" />
        <link rel="preload" href="/assets/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/notoserifethiopic-ethiopic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <ClientInit />
        {children}
      </body>
    </html>
  );
}
