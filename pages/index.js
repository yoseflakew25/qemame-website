import fs from 'fs';
import path from 'path';
import { useEffect, useRef } from 'react';
import Head from 'next/head';

export async function getStaticProps() {
  const bodyPath = path.join(process.cwd(), 'public', 'body.html');
  const bodyHtml = fs.readFileSync(bodyPath, 'utf8');
  return {
    props: { bodyHtml },
  };
}

export default function Home({ bodyHtml }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Add the .js class for CSS hooks (loader, reveals, etc.)
    document.documentElement.classList.add('js');

    // Import the vanilla JS interactions
    import('../public/assets/js/site.js');
  }, []);

  return (
    <>
      <Head>
        <title>QEMAME TRADING PLC | Ethiopian green coffee exporter, Addis Ababa</title>
        <meta name="description" content="QEMAME TRADING PLC is a green coffee exporter in Addis Ababa, Ethiopia, supplying specialty and commercial arabica from Yirgacheffe, Sidama, Guji, Limmu and the Bench Maji region, home of Geisha. Taste the World." />
        <meta name="theme-color" content="#1B1210" />
        <meta property="og:title" content="QEMAME TRADING PLC | Taste the World" />
        <meta property="og:description" content="Ethiopian green coffee, specialty and commercial, sourced from the highlands and exported from Addis Ababa with traceability and care." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%231B1210'/%3E%3Cg transform='translate(32 32) rotate(-24)'%3E%3Cellipse rx='24' ry='16.5' fill='%23D9A441'/%3E%3Cpath d='M-17 0C-9-7 9 7 17 0' stroke='%231B1210' stroke-width='4.6' fill='none' stroke-linecap='round'/%3E%3C/g%3E%3C/svg%3E" />
        <link rel="preload" href="/assets/img/cherries-in-hands.jpg" as="image" fetchPriority="high" />
        <link rel="preload" href="/assets/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/assets/css/site.css?v=38" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
