export const metadata = {
    title: 'Works | Nanang Marvin Kurniawan',
    description: 'Explore my complete portfolio of web development projects, games, and creative works. View project details, tech stacks, and live demos.',
    keywords: 'portfolio, projects, web development, games, Nanang Marvin Kurniawan, React, Next.js, Unity',

    openGraph: {
        title: 'Works | Nanang Marvin Kurniawan',
        description: 'Explore my complete portfolio of web development projects, games, and creative works.',
        url: 'https://nanangmarvin.my.id/works',
        siteName: 'Nanang Marvin Kurniawan',
        images: [
            {
                url: 'https://nanangmarvin.my.id/img/hero.webp',
                width: 1200,
                height: 630,
                alt: 'Portfolio of Nanang Marvin Kurniawan',
            },
        ],
        type: 'website',
    },

    twitter: {
        card: 'summary_large_image',
        title: 'Works | Nanang Marvin Kurniawan',
        description: 'Explore my complete portfolio of web development projects, games, and creative works.',
        images: ['https://nanangmarvin.my.id/img/hero.webp'],
    },
};

export default function WorksLayout({ children }) {
    return children;
}
