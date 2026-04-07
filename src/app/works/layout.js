import { allProjects } from "@/data/projects";

export const metadata = {
    title: "Works",
    description:
        "Detailed portfolio of web development projects, including Next.js applications, Laravel systems, and Unity games by Nanang Marvin Kurniawan.",
    alternates: {
        canonical: "/works",
    },
    openGraph: {
        title: "Works | Nanang Marvin Kurniawan Projects",
        description:
            "Explore the collection of digital products and experiments built by Nanang Marvin Kurniawan. From full-stack apps to game dev.",
        url: "https://nanangmarvin.my.id/works",
        siteName: "Nanang Marvin Kurniawan",
        images: [
            {
                url: "/img/hero.webp",
                width: 1200,
                height: 630,
                alt: "Portfolio of Nanang Marvin Kurniawan",
            },
        ],
        type: "website",
    },
};

// Map tech stack keys to programming language names
const techToLanguage = {
    react: "JavaScript",
    nextjs: "JavaScript",
    javascript: "JavaScript",
    typescript: "TypeScript",
    html: "HTML",
    css: "CSS",
    unity: "C#",
    csharp: "C#",
    python: "Python",
    php: "PHP",
    nodejs: "JavaScript",
};

export default function WorksLayout({ children }) {
    // Generate SoftwareSourceCode schema for each project
    const projectsSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Professional Portfolio Projects by Nanang Marvin Kurniawan",
        description:
            "A curated collection of web development projects, game development, and software engineering works.",
        itemListElement: allProjects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "SoftwareSourceCode",
                name: project.title,
                description: project.description,
                url: project.demoLink,
                codeRepository: project.githubLink || undefined,
                author: {
                    "@type": "Person",
                    name: "Nanang Marvin Kurniawan",
                    url: "https://nanangmarvin.my.id",
                },
                programmingLanguage:
                    project.techStack
                        ?.map((tech) => techToLanguage[tech])
                        .filter(
                            (lang, i, arr) => lang && arr.indexOf(lang) === i,
                        ) || [],
            },
        })),
    };

    // Breadcrumb Schema for /works
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
            {
                "@type": "ListItem",
                position: 2,
                name: "Works",
                item: "https://nanangmarvin.my.id/works",
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(projectsSchema).replace(
                        /</g,
                        "\\u003c",
                    ),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema).replace(
                        /</g,
                        "\\u003c",
                    ),
                }}
            />
            {children}
        </>
    );
}
