import {
    // Frameworks & Libraries
    SiReact, SiNextdotjs, SiTailwindcss, SiGreensock, SiVuedotjs, SiAngular, SiSvelte, SiBootstrap, SiMui, SiChakraui, SiFramer, SiRedux, SiJquery,
    // Languages
    SiJavascript, SiTypescript, SiHtml5, SiCss3, SiPython, SiPhp, SiRubyonrails, SiGo, SiRust, SiCsharp, SiDotnet, SiDart, SiKotlin, SiSwift,
    // Backend & Database
    SiNodedotjs, SiExpress, SiNestjs, SiDjango, SiLaravel, SiSpringboot, SiPostgresql, SiMongodb, SiMysql, SiFirebase, SiSupabase, SiRedis, SiSqlite, SiGraphql,
    // Tools & Platforms
    SiGit, SiGithub, SiDocker, SiKubernetes, SiAmazon, SiGooglecloud, SiVercel, SiNetlify, SiHeroku, SiFigma, SiAdobephotoshop, SiUnity, SiUnrealengine, SiFlutter, SiAndroid, SiIos
} from "react-icons/si";

// Shared mapping for all tech icons
// Usage: import { iconComponents } from "@/utils/techIcons";
export const iconComponents = {
    // Current
    react: SiReact,
    nextjs: SiNextdotjs,
    tailwind: SiTailwindcss,
    gsap: SiGreensock,
    html: SiHtml5,
    css: SiCss3,
    javascript: SiJavascript,
    unity: SiUnity,
    csharp: SiDotnet, // Using .NET icon for C# as requested previously

    // Frontend Expanded
    typescript: SiTypescript,
    vue: SiVuedotjs,
    angular: SiAngular,
    svelte: SiSvelte,
    redux: SiRedux,
    jquery: SiJquery,
    bootstrap: SiBootstrap,
    mui: SiMui,
    chakra: SiChakraui,
    framer: SiFramer,

    // Backend Expanded
    nodejs: SiNodedotjs,
    express: SiExpress,
    nestjs: SiNestjs,
    django: SiDjango,
    laravel: SiLaravel,
    spring: SiSpringboot,

    // Languages Expanded
    python: SiPython,
    php: SiPhp,
    ruby: SiRubyonrails,
    go: SiGo,
    rust: SiRust,
    dart: SiDart,
    kotlin: SiKotlin,
    swift: SiSwift,

    // Database Expanded
    postgresql: SiPostgresql,
    mongodb: SiMongodb,
    mysql: SiMysql,
    firebase: SiFirebase,
    supabase: SiSupabase,
    redis: SiRedis,
    sqlite: SiSqlite,
    graphql: SiGraphql,

    // Tools & Mobile
    git: SiGit,
    github: SiGithub,
    docker: SiDocker,
    kubernetes: SiKubernetes,
    aws: SiAmazon,
    gcp: SiGooglecloud,
    vercel: SiVercel,
    netlify: SiNetlify,
    figma: SiFigma,
    photoshop: SiAdobephotoshop,
    flutter: SiFlutter,
    android: SiAndroid,
    ios: SiIos,
    unreal: SiUnrealengine
};
