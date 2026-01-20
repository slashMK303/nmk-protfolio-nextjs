import { allProjects } from "@/data/projects";

export const metadata = {
    title: "Works | Nanang Marvin Kurniawan",
    description:
        "Explore my complete portfolio of web development projects, games, and creative works. View project details, tech stacks, and live demos.",
    keywords:
        "portfolio, projects, web development, games, Nanang Marvin Kurniawan, React, Next.js, Unity",

    openGraph: {
        title: "Works | Nanang Marvin Kurniawan",
        description:
            "Explore my complete portfolio of web development projects, games, and creative works.",
        url: "https://nanangmarvin.my.id/works",
        siteName: "Nanang Marvin Kurniawan",
        images: [
            {
                url: "https://nanangmarvin.my.id/img/hero.webp",
                width: 1200,
                height: 630,
                alt: "Portfolio of Nanang Marvin Kurniawan",
            },
        ],
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Works | Nanang Marvin Kurniawan",
        description:
            "Explore my complete portfolio of web development projects, games, and creative works.",
        images: ["https://nanangmarvin.my.id/img/hero.webp"],
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
        name: "Portfolio Projects by Nanang Marvin Kurniawan",
        description:
            "A collection of web development projects, games, and creative works.",
        itemListElement: allProjects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "SoftwareSourceCode",
                name: project.title,
                description: project.description,
                url: project.demoLink,
                codeRepository: project.githubLink || undefined,
                author: { "@type": "Person", name: "Nanang Marvin Kurniawan" },
                programmingLanguage:
                    project.techStack
                        ?.map((tech) => techToLanguage[tech])
                        .filter(
                            (lang, i, arr) => lang && arr.indexOf(lang) === i,
                        ) || [],
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(projectsSchema),
                }}
            />
            {children}
        </>
    );
}
