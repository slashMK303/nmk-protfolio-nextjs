import './globals.css';
import { Inter } from 'next/font/google';
import { GoogleTagManager } from '@next/third-parties/google';
import LenisProvider from './providers/LenisProvider';
import LoadingScreen from './components/LoadingScreen';
import { LoadingProvider } from './components/LoadingContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nanang Marvin Kurniawan',
  description:
    'Portfolio of Nanang Marvin Kurniawan, a Web Developer focused on building innovative digital products.',
  keywords:
    'web developer, web designer, frontend, backend, UI/UX, Next.js, React, Node.js, Tailwind CSS, full stack, Nanang Marvin Kurniawan, Nanang, Nanang Marvin',

  openGraph: {
    title: 'Nanang Marvin Kurniawan',
    description:
      'Explore the portfolio of Nanang Marvin Kurniawan, a creative Web Developer with expertise in full-stack development.',
    url: 'https://nanangmarvin.my.id',
    siteName: 'Nanang Marvin Kurniawan',
    images: [
      {
        url: 'https://nanangmarvin.my.id/img/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Nanang Marvin Kurniawan',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Nanang Marvin Kurniawan',
    description:
      'Portfolio of Nanang Marvin Kurniawan, Web Developer focused on building impactful digital experiences.',
    images: ['https://nanangmarvin.my.id/img/hero.webp'],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nanang Marvin Kurniawan',
    url: 'https://nanangmarvin.my.id',
    image: 'https://nanangmarvin.my.id/img/hero.webp',
    jobTitle: 'Web Developer',
    description: 'Web Developer focused on building innovative digital products using React, Next.js, and modern web technologies.',
    sameAs: [
      'https://github.com/slashMK303',
    ],
    knowsAbout: ['Web Development', 'React', 'Next.js', 'JavaScript', 'TypeScript', 'Node.js', 'UI/UX Design'],
  };

  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/img/hero.webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <LoadingProvider>
          <LenisProvider>
            <LoadingScreen />
            <GoogleTagManager gtmId="GTM-T3RQ6HCR" />
            {children}
          </LenisProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}