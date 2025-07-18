import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nanang Marvin Kurniawan',
  description: 'Portfolio of Nanang Marvin Kurniawan, a Web Developer focused on building innovative digital products.',
  keywords: 'web developer, web designer, frontend, backend, UI/UX, Next.js, React, Node.js, Tailwind CSS, full stack, Nanang Marvin Kurniawan, Nanang, Nanang Marvin',

  openGraph: {
    title: 'Nanang Marvin Kurniawan',
    description: 'Explore the portfolio of Nanang Marvin Kurniawan, a creative Web Developer with expertise in full-stack development.',
    url: 'https://nanangmarvin.my.id',
    siteName: 'Nanang Marvin Kurniawan',
    images: [
      {
        url: 'https://nanangmarvin.my.id/img/hero.jpg',
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
    description: 'Portfolio of Nanang Marvin Kurniawan, Web Developer focused on building impactful digital experiences.',
    images: ['https://nanangmarvin.my.id/img/hero.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}