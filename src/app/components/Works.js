"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiReact, SiNextdotjs, SiTailwindcss, SiGreensock, SiHtml5, SiCss3, SiJavascript, SiUnity } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

// Tech stack icon mapping
const techIcons = {
    react: { icon: SiReact, name: "React", color: "#61DAFB" },
    nextjs: { icon: SiNextdotjs, name: "Next.js", color: "#ffffff" },
    tailwind: { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
    gsap: { icon: SiGreensock, name: "GSAP", color: "#88CE02" },
    html: { icon: SiHtml5, name: "HTML5", color: "#E34F26" },
    css: { icon: SiCss3, name: "CSS3", color: "#1572B6" },
    javascript: { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
    unity: { icon: SiUnity, name: "Unity", color: "#ffffff" },
};

export default function Works() {
    const sectionRef = useRef(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Featured projects only (4 items)
    const featuredProjects = [
        {
            id: "proj-01",
            number: "01",
            title: "Indo Dragonica",
            subtitle: "Private Server Website",
            description: "Indonesian community site for Dragonica Online, offering game guides, videos, and updates.",
            thumbnail: "/img/project/idgn.webp",
            demoLink: "https://www.indodragonica.com/",
            position: { top: "10%", left: "5%", rotate: -8 },
            techStack: ["nextjs", "tailwind", "gsap"],
        },
        {
            id: "proj-02",
            number: "02",
            title: "Portfolio",
            subtitle: "Website v1",
            description: "Personal portfolio website showcasing skills and projects.",
            thumbnail: "/img/project/personalweb.webp",
            demoLink: "https://nanangmarvin-8ko8wl5tz-vinnns-projects.vercel.app/",
            position: { top: "15%", right: "8%", rotate: 12 },
            techStack: ["react", "tailwind", "javascript"],
        },
        {
            id: "proj-03",
            number: "03",
            title: "QR Code",
            subtitle: "Generator",
            description: "Generate and download QR codes for various purposes.",
            thumbnail: "/img/project/qrgenerator.webp",
            demoLink: "https://slashmk303.github.io/qr-code-generate-simple/",
            position: { bottom: "20%", left: "10%", rotate: 6 },
            techStack: ["html", "css", "javascript"],
        },
        {
            id: "proj-04",
            number: "04",
            title: "Genocide Egg",
            subtitle: "Game Project",
            description: "A game project made during college studies.",
            thumbnail: "/img/project/genocideegg.webp",
            demoLink: "https://marvin195.itch.io/genocide-egg",
            position: { bottom: "15%", right: "5%", rotate: -10 },
            techStack: ["unity", "csharp"],
        },
    ];

    const [cardRotations] = useState(() => {
        return Array.from({ length: featuredProjects.length }, () => ({
            rotateX: (Math.random() - 0.5) * 24,
            rotateY: (Math.random() - 0.5) * 24,
        }));
    });

    useEffect(() => {
        if (!sectionRef.current) return;

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        // GSAP ScrollTrigger for floating cards
        const cards = gsap.utils.toArray('.floating-card');
        gsap.set(cards, { opacity: 0, y: 80, scale: 0.95 });

        ScrollTrigger.batch(cards, {
            interval: 0.1,
            batchMax: 4,
            onEnter: (batch) => {
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    stagger: 0.06,
                    duration: 0.8,
                    ease: 'power3.out',
                });
            },
            once: false,
            start: 'top 80%'
        });

        // 3D tilt effect on mouse move (desktop only)
        cards.forEach((card, index) => {
            let tiltTimeline = null;
            const cardElement = card.querySelector('[data-card-inner]');
            if (cardElement && cardRotations[index]) {
                gsap.set(cardElement, {
                    rotationX: cardRotations[index].rotateX,
                    rotationY: cardRotations[index].rotateY,
                    transformPerspective: 1200,
                });
            }

            const handleMouseMove = (e) => {
                if (isMobile) return;
                const el = card.querySelector('[data-card-inner]');
                if (!el) return;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -12;
                const rotateY = ((x - centerX) / centerX) * 12;
                if (tiltTimeline) tiltTimeline.kill();
                tiltTimeline = gsap.to(el, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 1200,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            };

            const handleMouseLeave = () => {
                const el = card.querySelector('[data-card-inner]');
                if (!el) return;
                if (tiltTimeline) tiltTimeline.kill();
                gsap.to(el, {
                    rotationX: cardRotations[index]?.rotateX || 0,
                    rotationY: cardRotations[index]?.rotateY || 0,
                    duration: 0.6,
                    ease: 'power2.out',
                });
            };

            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener("resize", checkMobile);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [cardRotations, isMobile]);

    return (
        <section
            id="works"
            ref={sectionRef}
            className="relative min-h-screen bg-[#121212] overflow-hidden"
            style={{ perspective: '1500px' }}
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a]/20 to-transparent pointer-events-none"></div>

            {/* Main Content Container */}
            <div className="relative w-full px-4 py-16 md:h-screen md:flex md:items-center md:justify-center">
                {/* Center Content - Text Only (desktop: centered, mobile: top flow) */}
                <div className="center-content max-w-3xl text-center z-30 md:absolute">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 text-white leading-tight">
                            Selected Works
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
                            A curated collection of projects showcasing my expertise in web development, design, and creative problem-solving.
                        </p>
                        {/* View All Works Button - Centered below description */}
                        <Link
                            href="/works"
                            className="inline-flex items-center gap-3 bg-[#e8e8e3] text-[#121212] px-6 py-3 rounded-full shadow-lg hover:shadow-[#e8e8e3]/30 transition-all duration-300 hover:scale-105 font-semibold text-lg"
                        >
                            <span>View All Works</span>
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        </Link>
                    </motion.div>
                </div>

                {/* Mobile: stacked scroll list */}
                <div className="w-full md:hidden mt-10 space-y-6 snap-y snap-mandatory overflow-x-hidden">
                    {featuredProjects.map((project, index) => (
                        <article key={project.id} className="snap-start" aria-labelledby={`${project.id}-title`} aria-describedby={`${project.id}-desc`}>
                            <Link href={project.demoLink} target="_blank" rel="noopener noreferrer" className="block group" aria-label={`Buka ${project.title} (buka di tab baru)`}>
                                <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#121212] border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300">
                                    <div className="absolute top-4 left-4 z-20 w-9 h-9 flex items-center justify-center bg-[#e8e8e3]/10 border border-[#e8e8e3]/20 rounded-lg backdrop-blur-sm">
                                        <span className="text-[#e8e8e3] font-bold text-xs">{project.number}</span>
                                    </div>
                                    <div className="relative w-full h-40 overflow-hidden bg-gray-900">
                                        <Image src={project.thumbnail} alt={`${project.title} thumbnail`} fill sizes="(max-width: 768px) 100vw, 380px" className="object-cover transition-transform duration-700 group-hover:scale-105" priority={index === 0} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-70"></div>
                                    </div>
                                    <div className="p-4">
                                        <span className="text-[10px] text-[#e8e8e3]/70 font-semibold uppercase tracking-wider">{project.subtitle}</span>
                                        <h3 id={`${project.id}-title`} className="text-lg font-bold text-white mt-2 group-hover:text-[#e8e8e3] transition-colors">{project.title}</h3>
                                        <p id={`${project.id}-desc`} className="text-gray-400 text-sm mt-2">{project.description}</p>
                                        {/* Tech Stack Icons */}
                                        <div className="flex items-center gap-2 mt-3">
                                            {project.techStack?.map((tech) => {
                                                const techData = techIcons[tech];
                                                if (!techData) return null;
                                                const IconComponent = techData.icon;
                                                return (
                                                    <div key={tech} className="group/icon relative" title={techData.name}>
                                                        <IconComponent className="w-8 h-8" style={{ color: techData.color }} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-[#e8e8e3] font-semibold mt-3">
                                            <span>Explore</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                            <span className="sr-only">Buka {project.title}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Desktop: floating cards */}
                <div className="absolute inset-0 w-full h-full overflow-hidden hidden md:block">
                    {featuredProjects.map((project, index) => (
                        <article
                            key={project.id}
                            className="floating-card absolute w-[300px] md:w-[340px] lg:w-[380px]"
                            style={{
                                top: project.position.top,
                                bottom: project.position.bottom,
                                left: project.position.left,
                                right: project.position.right,
                                transformStyle: 'preserve-3d',
                            }}
                            onMouseEnter={() => setHoveredCard(project.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                            aria-labelledby={`${project.id}-title`}
                            aria-describedby={`${project.id}-desc`}
                            role="article"
                        >
                            <Link
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group h-full"
                                aria-label={`Buka ${project.title} (buka di tab baru)`}
                            >
                                <div
                                    data-card-inner
                                    className="relative h-full"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#121212] border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#e8e8e3]/10 h-full flex flex-col transition-shadow duration-300">
                                        <div className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center bg-[#e8e8e3]/10 border border-[#e8e8e3]/20 rounded-lg backdrop-blur-sm">
                                            <span className="text-[#e8e8e3] font-bold text-sm">{project.number}</span>
                                        </div>
                                        <div className="relative w-full h-44 md:h-52 overflow-hidden bg-gray-900 flex-shrink-0">
                                            <Image src={project.thumbnail} alt={`${project.title} thumbnail`} fill sizes="(max-width: 768px) 100vw, 380px" className="object-cover transition-transform duration-700 group-hover:scale-110" priority={index === 0} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-70"></div>
                                        </div>
                                        <div className="p-5 md:p-6 relative z-10 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="inline-block mb-3">
                                                    <span className="text-xs text-[#e8e8e3]/70 font-semibold uppercase tracking-wider">{project.subtitle}</span>
                                                </div>
                                                <h3 id={`${project.id}-title`} className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[#e8e8e3] transition-colors duration-300">{project.title}</h3>
                                                <p id={`${project.id}-desc`} className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                                                {/* Tech Stack Icons */}
                                                <div className="flex items-center gap-2 mt-3">
                                                    {project.techStack?.map((tech) => {
                                                        const techData = techIcons[tech];
                                                        if (!techData) return null;
                                                        const IconComponent = techData.icon;
                                                        return (
                                                            <div key={tech} className="group/icon relative" title={techData.name}>
                                                                <IconComponent className="w-6 h-6 transition-transform hover:scale-110" style={{ color: techData.color }} />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-[#e8e8e3] font-semibold group-hover:text-white transition-colors mt-4">
                                                <span>Explore</span>
                                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                                <span className="sr-only">Buka {project.title}</span>
                                            </div>
                                        </div>
                                        {hoveredCard === project.id && (
                                            <div className="absolute inset-0 pointer-events-none rounded-2xl">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#e8e8e3]/10 via-gray-400/5 to-transparent rounded-2xl blur-2xl"></div>
                                            </div>
                                        )}
                                        <div
                                            className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${hoveredCard === project.id ? 'opacity-100' : 'opacity-0'}`}
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(59,130,246,0.3) 0%, transparent 50%)',
                                                borderRadius: '1rem',
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
