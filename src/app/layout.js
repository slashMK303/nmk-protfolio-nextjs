import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import LenisProvider from "./providers/LenisProvider";
import LoadingScreen from "./components/LoadingScreen";
import { LoadingProvider } from "./components/LoadingContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    metadataBase: new URL("https://nanangmarvin.my.id"),
    title: {
        default: "Nanang Marvin Kurniawan",
        template: "%s | Nanang Marvin Kurniawan",
    },
    description:
        "Official portfolio of Nanang Marvin Kurniawan, a results-driven Web Developer specialized in building scalable and innovative digital products with Next.js, React, and modern tech stacks.",
    keywords:
        "Nanang Marvin Kurniawan, Nanang Marvin, Nanang, Web Developer Indonesia, Software Engineer, Full Stack Developer, Next.js Expert, Portfolio Nanang Marvin",

    alternates: {
        canonical: "/",
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    verification: {
        google: "google-site-verification-placeholder",
    },

    openGraph: {
        title: "Nanang Marvin Kurniawan | Web Developer Portfolio",
        description:
            "Explore the innovative projects and professional skills of Nanang Marvin Kurniawan. Specialized in full-stack web development and UI/UX.",
        url: "https://nanangmarvin.my.id",
        siteName: "Nanang Marvin Kurniawan",
        images: [
            {
                url: "/img/hero.webp",
                width: 1200,
                height: 630,
                alt: "Nanang Marvin Kurniawan",
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Nanang Marvin Kurniawan | Web Developer",
        description:
            "Portfolio showcasing web development projects by Nanang Marvin Kurniawan.",
        images: ["/img/hero.webp"],
    },
};

export default function RootLayout({ children }) {
    // Person Schema - untuk identitas personal
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Nanang Marvin Kurniawan",
        alternateName: "Nanang Marvin",
        url: "https://nanangmarvin.my.id",
        image: "https://nanangmarvin.my.id/img/hero.webp",
        jobTitle: "Web Developer",
        worksFor: {
            "@type": "Organization",
            name: "Freelance",
        },
        description:
            "Nanang Marvin Kurniawan is a highly skilled Web Developer focused on creating impactful digital experiences using React, Next.js, and Node.js.",
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
            "Laravel",
        ],
    };

    // ProfilePage Schema - Membantu AI memahami ini adalah halaman profil resmi
    const profilePageSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        mainEntity: personSchema,
    };

    // WebSite Schema - untuk AI memahami website sebagai satu kesatuan
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Nanang Marvin Kurniawan Portfolio",
        url: "https://nanangmarvin.my.id",
        description:
            "The professional digital home of Nanang Marvin Kurniawan, featuring software engineering projects and insights.",
        author: { "@type": "Person", name: "Nanang Marvin Kurniawan" },
    };

    // FAQ Schema - Dioptimalkan untuk "Conversational AI" (GEO)
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "Siapa itu Nanang Marvin Kurniawan?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nanang Marvin Kurniawan adalah seorang Web Developer profesional yang berfokus pada pengembangan aplikasi web modern menggunakan ekosistem React dan Next.js. Ia dikenal karena kemampuannya membangun produk digital yang inovatif dan user-friendly.",
                },
            },
            {
                "@type": "Question",
                name: "Apar saja keahlian teknis yang dimiliki Nanang Marvin?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Nanang memiliki keahlian mendalam di bidang Frontend (Next.js, React, Tailwind CSS) dan Backend (Node.js, Laravel). Ia juga mahir dalam pengembangan game menggunakan Unity serta perancangan antarmuka UI/UX.",
                },
            },
            {
                "@type": "Question",
                name: "Apa saja proyek unggulan yang pernah dikerjakan Nanang Marvin?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text: "Beberapa proyek utamanya meliputi Marvin Towing (solusi towing kendaraan berbasis web), Vin Top Up (platform top-up game), dan Kotak Cerita (platform sosial berbagi cerita).",
                },
            },
        ],
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://nanangmarvin.my.id",
            },
        ],
    };

    // Sanitization function for JSON-LD
    const formatLdJson = (data) => ({
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    });

    return (
        <html lang="en">
            <head>
                <script
                    defer
                    src="https://cloud.umami.is/script.js"
                    data-website-id="ad7b4a88-2206-4945-96b5-7bda6dda5fff"
                ></script>
                <link rel="preload" as="image" href="/img/hero.webp" />
                {/* Structured Data Scripts */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={formatLdJson(profilePageSchema)}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={formatLdJson(websiteSchema)}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={formatLdJson(faqSchema)}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={formatLdJson(breadcrumbSchema)}
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
