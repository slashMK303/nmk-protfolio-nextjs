export const allProjects = [
    {
        id: "proj-01",
        number: "01",
        title: "Vin POS",
        subtitle: "Offline-First Mobile POS",
        category: "mobile",
        featured: true,
        description: "Vin POS is a mobile cashier application built with an offline-first architecture, designed for MSMEs to manage transactions without requiring internet connectivity.",
        thumbnail: "/img/project/vinpos.webp",
        images: [
            "https://media.licdn.com/dms/image/v2/D5622AQE5VVr4GZatKQ/feedshare-shrink_480/B56Z99mSEyGcAk-/0/1784518615570?e=1785974400&v=beta&t=Hibzv3atxdgTGJsAeQsHfZBU7gEezoO5EvXynRcFG1E",
            "https://media.licdn.com/dms/image/v2/D5622AQFLl7UYLT2Haw/feedshare-shrink_1280/B56Z99mSE1GUAM-/0/1784518615600?e=1785974400&v=beta&t=Rn9MALzFfllR_PhVDW1lVfmTQmuKXrUcSAjpPKYzbZs",
            "https://media.licdn.com/dms/image/v2/D5622AQGMQY6LqeZVNw/feedshare-shrink_480/B56Z99mSKoGoAk-/0/1784518615987?e=1785974400&v=beta&t=RNQ7J9IqdHrA2HzPTNLJrRgJtmf3lN9jQeN8aN2MzX0",
            "https://media.licdn.com/dms/image/v2/D5622AQGt5YOM_r8SfQ/feedshare-shrink_480/B56Z99mSICG4Ag-/0/1784518615754?e=1785974400&v=beta&t=B7uEREe8noyv4XRWXMK6_jnGoJtsjG28qxdnCjPWD88",
            "https://media.licdn.com/dms/image/v2/D5622AQHcw1buYmdA1Q/feedshare-shrink_480/B56Z99mSLKIQAg-/0/1784518615996?e=1785974400&v=beta&t=62Fgn6Ppdm_zOyUbK2_RugznZCXnpYdd7c3DBQwoWVY",
            "https://media.licdn.com/dms/image/v2/D5622AQGr5F9l_ceVYA/feedshare-shrink_480/B56Z99mSIEKUAo-/0/1784518615826?e=1785974400&v=beta&t=dMZ8BKwtLBIV32SZpeHjxYDU2JAz5FBbw5k0Kf4MoAo",
            "https://media.licdn.com/dms/image/v2/D5622AQGRp9juDjh4pg/feedshare-shrink_480/B56Z99mSMPKgAg-/0/1784518616083?e=1785974400&v=beta&t=37_E_j1CE-5qcaIHIgrsYV_mbg5RhWnpvyzN9BKnvxs",
            "https://media.licdn.com/dms/image/v2/D5622AQGvxh6asoDt8Q/feedshare-shrink_480/B56Z99mSMEHIAg-/0/1784518616081?e=1785974400&v=beta&t=6yUFAu-djvs7e9zIxqgxo9JZ_cFQ9QumEHJc9qiKbAw",
            "https://media.licdn.com/dms/image/v2/D5622AQFCstNb2SypvQ/feedshare-shrink_480/B56Z99mSKkGUAg-/0/1784518615928?e=1785974400&v=beta&t=i9OmPQ2q0KuxP1f3o2bxRUhgywGSRU8LPZIFlb0NpIo"
        ],
        demoLink: "https://www.linkedin.com/posts/nanang-marvin-kurniawan-343a762a9_flutterdeveloper-mobileappdevelopment-dart-ugcPost-7484813577816567808-CqxM/",
        githubLink: null,
        techStack: ["flutter", "dart", "sqlite"],
        highlights: [
            "Offline-first SQLite local storage",
            "Bluetooth ESC/POS thermal printing (58mm/80mm)",
            "Sales reports export to PDF & XLSX"
        ],
        position: { top: "10%", left: "5%", rotate: -8 },
    },
    {
        id: "proj-02",
        number: "02",
        title: "Naraf Prem",
        subtitle: "Premium Digital Services",
        category: "web",
        featured: true,
        description: "A premium digital service provider with automated systems and instant transactions.",
        thumbnail: "/img/project/naraf.webp",
        demoLink: "https://naraf.nanangmarvin.my.id/",
        githubLink: null,
        techStack: ["php", "tailwind", "mysql", "qris"],
        highlights: [
            "Automated system",
            "Instant transactions",
            "Premium services"
        ],
        position: { top: "15%", right: "8%", rotate: 12 },
    },
    {
        id: "proj-03",
        number: "03",
        title: "ActivFlow",
        subtitle: "Smart UML Modeling SaaS",
        category: ["web", "generator"],
        featured: true,
        description: "ActivFlow is a smart UML modeling SaaS platform for designing use case and activity diagrams instantly. Simply type your business process and let our AI draw it for you.",
        thumbnail: "/img/project/activflow.webp",
        demoLink: "https://activflow.biz.id/",
        githubLink: null,
        techStack: ["nextjs", "typescript", "mysql", "midtrans", "tailwind", "shadcnui", "oauth", "groq", "gemini", "openai"],
        highlights: [
            "Instant use case & activity diagrams",
            "AI-powered diagram generation",
            "Effortless system modeling"
        ],
        position: { bottom: "20%", left: "10%", rotate: 6 },
    },
    {
        id: "proj-04",
        number: "04",
        title: "Vin Top Up",
        subtitle: "Vin Top Up",
        category: "web",
        featured: true,
        description: "Vin Top Up is a top-up website.",
        thumbnail: "/img/project/vin-topup.webp",
        demoLink: "https://vintopup.vercel.app/",
        githubLink: "https://github.com/slashMK303/vintopup",
        techStack: ["react", "laravel", "tailwind", "mysql"],
        highlights: [
            "Payment gateway integration",
            "Real-time transaction tracking",
            "Admin dashboard"
        ],
        position: { bottom: "15%", right: "5%", rotate: -10 },
    },
    {
        id: "proj-05",
        number: "05",
        title: "Marvin Towing",
        subtitle: "Marvin Towing",
        category: "web",
        featured: false,
        description: "Marvin Towing is a towing company website.",
        thumbnail: "/img/project/marvin-towing.webp",
        demoLink: "https://marvin-towing.vercel.app/",
        githubLink: "https://github.com/slashMK303/jaya-towing",
        techStack: ["nextjs", "tailwind", "postgresql", "vercel"],
        highlights: [
            "Full-stack Next.js with API routes",
            "PostgreSQL database integration",
            "Responsive booking system"
        ],
    },
    {
        id: "proj-06",
        number: "06",
        title: "Kotak Cerita",
        subtitle: "Kotak Cerita",
        category: "web",
        featured: false,
        description: "Kotak Cerita is a simple web application that allows users to share stories or vent anonymously. Built with Next.js and Firebase.",
        thumbnail: "/img/project/kotak-cerita.webp",
        demoLink: "https://kotak-cerita.vercel.app/",
        githubLink: "https://github.com/slashMK303/kotak-cerita",
        techStack: ["react", "tailwind", "firebase"],
        highlights: [
            "Anonymous posting system",
            "Real-time Firebase sync",
            "Responsive mobile-first design"
        ],
    },
    {
        id: "proj-07",
        number: "07",
        title: "Genocide Egg",
        subtitle: "Game Project",
        category: "game",
        featured: false,
        description: "A game project made during college studies.",
        thumbnail: "/img/project/genocideegg.webp",
        demoLink: "https://marvin195.itch.io/genocide-egg",
        githubLink: null,
        techStack: ["unity"],
        highlights: [
            "Unity 2D game development",
            "Custom game mechanics",
            "Published on itch.io"
        ],
    },
    {
        id: "proj-08",
        number: "08",
        title: "QR Code generator",
        subtitle: "Generator",
        category: ["web", "generator"],
        featured: false,
        description: "Generate and download QR codes for various purposes.",
        thumbnail: "/img/project/qrgenerator.webp",
        demoLink: "https://slashmk303.github.io/qr-code-generate-simple/",
        githubLink: "https://github.com/slashMK303/qr-code-generate-simple",
        techStack: ["html", "css", "javascript"],
        highlights: [
            "Pure vanilla JavaScript",
            "Instant QR generation",
            "Download as image"
        ],
    },
    {
        id: "proj-09",
        number: "09",
        title: "Granit Chat AI",
        subtitle: "Chat AI",
        category: "web",
        featured: false,
        description: "Granite Chat AI is a chatbot application implemented using Granite AI API.",
        thumbnail: "/img/project/granite-ai.webp",
        demoLink: "https://granite-chat-app.vercel.app/",
        githubLink: "https://github.com/slashMK303/granite-chat-app",
        techStack: ["react", "tailwind", "vercel"],
        highlights: [
            "AI API integration",
            "Real-time chat interface",
            "Context-aware responses"
        ],
    },
    {
        id: "proj-10",
        number: "10",
        title: "Personal Website",
        subtitle: "Personal Website",
        category: "web",
        featured: false,
        description: "Personal website for showcasing projects and skills.",
        thumbnail: "/img/project/personal-website.webp",
        demoLink: "https://nanangmarvin.my.id/",
        githubLink: "https://github.com/slashMK303/nmk-protfolio-nextjs",
        techStack: ["nextjs", "gsap", "tailwind", "vercel", "framer"],
        highlights: [
            "GSAP animations",
            "Smooth scroll with Lenis",
            "SEO optimized"
        ],
    },
];

export const featuredProjects = allProjects.filter(p => p.featured);

export const categories = [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
    { id: "game", label: "Game" },
    { id: "generator", label: "Generator" },
];

// Tech stack icon mapping (used in both components)
export const techIcons = {
    // Current
    react: { name: "React", color: "#61DAFB" },
    nextjs: { name: "Next.js", color: "#ffffff" },
    tailwind: { name: "Tailwind CSS", color: "#06B6D4" },
    gsap: { name: "GSAP", color: "#88CE02" },
    html: { name: "HTML5", color: "#E34F26" },
    css: { name: "CSS3", color: "#1572B6" },
    javascript: { name: "JavaScript", color: "#F7DF1E" },
    unity: { name: "Unity", color: "#ffffff" },
    csharp: { name: "C# / .NET", color: "#512BD4" },

    // Frontend Expanded
    typescript: { name: "TypeScript", color: "#3178C6" },
    vue: { name: "Vue.js", color: "#4FC08D" },
    angular: { name: "Angular", color: "#DD0031" },
    svelte: { name: "Svelte", color: "#FF3E00" },
    redux: { name: "Redux", color: "#764ABC" },
    jquery: { name: "jQuery", color: "#0769AD" },
    bootstrap: { name: "Bootstrap", color: "#7952B3" },
    mui: { name: "Material UI", color: "#007FFF" },
    chakra: { name: "Chakra UI", color: "#319795" },
    framer: { name: "Framer Motion", color: "#0055FF" },

    // Backend Expanded
    nodejs: { name: "Node.js", color: "#339933" },
    express: { name: "Express.js", color: "#ffffff" },
    nestjs: { name: "NestJS", color: "#E0234E" },
    django: { name: "Django", color: "#092E20" },
    laravel: { name: "Laravel", color: "#FF2D20" },
    spring: { name: "Spring Boot", color: "#6DB33F" },

    // Languages Expanded
    python: { name: "Python", color: "#3776AB" },
    php: { name: "PHP", color: "#777BB4" },
    ruby: { name: "Ruby on Rails", color: "#CC0000" },
    go: { name: "Go", color: "#00ADD8" },
    rust: { name: "Rust", color: "#000000" },
    dart: { name: "Dart", color: "#0175C2" },
    flutter: { name: "Flutter", color: "#02569B" },
    kotlin: { name: "Kotlin", color: "#7F52FF" },
    swift: { name: "Swift", color: "#F05138" },

    // Database Expanded
    postgresql: { name: "PostgreSQL", color: "#4169E1" },
    mongodb: { name: "MongoDB", color: "#47A248" },
    mysql: { name: "MySQL", color: "#4479A1" },
    firebase: { name: "Firebase", color: "#FFCA28" },
    supabase: { name: "Supabase", color: "#3ECF8E" },
    redis: { name: "Redis", color: "#DC382D" },
    sqlite: { name: "SQLite", color: "#003B57" },
    graphql: { name: "GraphQL", color: "#E10098" },

    // Payment Gateway
    qris: { name: "QRIS", color: "#ED2839" },

    // Tools & Platforms
    git: { name: "Git", color: "#F05032" },
    github: { name: "GitHub", color: "#ffffff" },
    docker: { name: "Docker", color: "#2496ED" },
    kubernetes: { name: "Kubernetes", color: "#326CE5" },
    aws: { name: "AWS", color: "#FF9900" },
    gcp: { name: "Google Cloud", color: "#4285F4" },
    vercel: { name: "Vercel", color: "#ffffff" },
    netlify: { name: "Netlify", color: "#00C7B7" },
    figma: { name: "Figma", color: "#F24E1E" },
    photoshop: { name: "Photoshop", color: "#31A8FF" },
    android: { name: "Android", color: "#3DDC84" },
    ios: { name: "iOS", color: "#ffffff" },
    unreal: { name: "Unreal Engine", color: "#ffffff" },

    // DevOps & Server
    cpanel: { name: "cPanel", color: "#FF6C2C" },
    aapanel: { name: "aaPanel", color: "#20a53a" },
    nginx: { name: "Nginx", color: "#009639" },
    linux: { name: "Linux", color: "#FCC624" },
    ubuntu: { name: "Ubuntu", color: "#E95420" },

    // AI & Payments
    midtrans: { name: "Midtrans", color: "#003087" },
    shadcnui: { name: "Shadcn UI", color: "#ffffff" },
    oauth: { name: "OAuth (Google)", color: "#4285F4" },
    groq: { name: "Groq API", color: "#F55036" },
    gemini: { name: "AI Gemini", color: "#8E75FF" },
    openai: { name: "AI GPT", color: "#10A37F" },
};
