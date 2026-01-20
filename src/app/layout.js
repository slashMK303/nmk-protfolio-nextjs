import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import LenisProvider from "./providers/LenisProvider";
import LoadingScreen from "./components/LoadingScreen";
import { LoadingProvider } from "./components/LoadingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Nanang Marvin Kurniawan",
    description:
        "Portfolio of Nanang Marvin Kurniawan, a Web Developer focused on building innovative digital products.",
    keywords:
        "web developer, web designer, frontend, backend, UI/UX, Next.js, React, Node.js, Tailwind CSS, full stack, Nanang Marvin Kurniawan, Nanang, Nanang Marvin",

    openGraph: {
        title: "Nanang Marvin Kurniawan",
        description:
            "Explore the portfolio of Nanang Marvin Kurniawan, a creative Web Developer with expertise in full-stack development.",
        url: "https://nanangmarvin.my.id",
        siteName: "Nanang Marvin Kurniawan",
        images: [
            {
                url: "https://nanangmarvin.my.id/img/hero.webp",
                width: 1200,
                height: 630,
                alt: "Nanang Marvin Kurniawan",
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Nanang Marvin Kurniawan",
        description:
            "Portfolio of Nanang Marvin Kurniawan, Web Developer focused on building impactful digital experiences.",
        images: ["https://nanangmarvin.my.id/img/hero.webp"],
    },
};

export default function RootLayout({ children }) {
    // Person Schema - untuk identitas personal
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Nanang Marvin Kurniawan",
        url: "https://nanangmarvin.my.id",
        image: "https://nanangmarvin.my.id/img/hero.webp",
        jobTitle: "Web Developer",
        description:
            "Web Developer focused on building innovative digital products using React, Next.js, and modern web technologies.",
        sameAs: [
            "https://github.com/slashMK303",
            "https://www.linkedin.com/in/nanang-marvin-kurniawan-343a762a9/",
        ],
        knowsAbout: [
            "Web Development",
            "React",
            "Next.js",
            "JavaScript",
            "TypeScript",
            "Node.js",
            "UI/UX Design",
            "Full Stack Development",
        ],
    };

    // WebSite Schema - untuk AI memahami website sebagai satu kesatuan
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Nanang Marvin Kurniawan Portfolio",
        url: "https://nanangmarvin.my.id",
        description:
            "Portfolio website of Nanang Marvin Kurniawan, showcasing web development projects and skills.",
        author: { "@type": "Person", name: "Nanang Marvin Kurniawan" },
    };

    // FAQ Schema - untuk AI menjawab pertanyaan langsung
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Apa keahlian utama Nanang Marvin Kurniawan?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nanang adalah Web Developer dengan keahlian di React, Next.js, TypeScript, Node.js, dan Tailwind CSS. Ia juga memiliki pengalaman dalam Full Stack Development, UI/UX Design, dan Game Development menggunakan Unity.",
                },
            },
            {
                "@type": "Question",
                name: "Bagaimana cara menghubungi Nanang Marvin Kurniawan?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Anda dapat menghubungi Nanang melalui website portfolionya di nanangmarvin.my.id pada bagian Contact, atau melalui LinkedIn dan GitHub.",
                },
            },
            {
                "@type": "Question",
                name: "Apa project terbaik Nanang Marvin Kurniawan?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Beberapa project terbaik Nanang termasuk Marvin Towing (full-stack Next.js), Vin Top Up (payment gateway integration), Indo Dragonica (komunitas gaming), dan Kotak Cerita (platform anonymous sharing).",
                },
            },
            {
                "@type": "Question",
                name: "Apakah Nanang Marvin tersedia untuk pekerjaan freelance atau full-time?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ya, Nanang terbuka untuk peluang pekerjaan baik freelance maupun full-time. Silakan hubungi melalui website portfolionya untuk diskusi lebih lanjut.",
                },
            },
        ],
    };

    return (
        <html lang="en">
            <head>
                <script
                    defer
                    src="https://cloud.umami.is/script.js"
                    data-website-id="ad7b4a88-2206-4945-96b5-7bda6dda5fff"
                ></script>
                <link rel="preload" as="image" href="/img/hero.webp" />
                {/* Person Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(personSchema),
                    }}
                />
                {/* WebSite Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(websiteSchema),
                    }}
                />
                {/* FAQ Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqSchema),
                    }}
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
