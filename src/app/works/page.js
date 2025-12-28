"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { iconComponents } from "@/utils/techIcons";
import { allProjects, categories, techIcons as techIconsData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

// Combine icon components with tech data
const techIcons = Object.fromEntries(
    Object.entries(techIconsData).map(([key, data]) => [
        key,
        { ...data, icon: iconComponents[key] }
    ])
);

export default function WorksPage() {
    const sectionRef = useRef(null);
    const galleryRef = useRef(null);
    const trackRef = useRef(null);
    const progressRef = useRef(null);
    const progressFillRef = useRef(null);
    const triggerRef = useRef(null);
    const lenisRef = useRef(null);

    const [activeCategory, setActiveCategory] = useState("all");
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

    // Filter projects based on category
    const filteredProjects = activeCategory === "all"
        ? allProjects
        : allProjects.filter(p => p.category === activeCategory);

    // Check mobile viewport - runs after mount to prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Note: Lenis is handled by global LenisProvider, no need to initialize here

    // Horizontal scroll gallery with GSAP
    useEffect(() => {
        // Wait for mount and ensure not mobile
        if (!mounted || isMobile) return;
        if (!galleryRef.current || !trackRef.current) return;

        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            const ctx = gsap.context(() => {
                const track = trackRef.current;
                if (!track) return;

                const cards = track.querySelectorAll('.gallery-card');

                // Calculate total scroll distance
                const totalWidth = track.scrollWidth - window.innerWidth + 200;

                // Create horizontal scroll animation
                gsap.to(track, {
                    x: () => -totalWidth,
                    ease: "none",
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        start: "top top",
                        end: () => `+=${totalWidth}`,
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        id: "works-gallery",
                        // Snap removed for smoother scroll
                        onUpdate: (self) => {
                            const progress = self.progress;
                            const idx = Math.min(
                                filteredProjects.length - 1,
                                Math.floor(progress * filteredProjects.length)
                            );
                            setActiveIndex(idx);

                            // Update progress bar
                            if (progressFillRef.current) {
                                gsap.to(progressFillRef.current, {
                                    width: `${progress * 100}%`,
                                    duration: 0.1,
                                    ease: 'none'
                                });
                            }
                        },
                    },
                });

                triggerRef.current = ScrollTrigger.getById("works-gallery");

                // Animate cards on enter
                gsap.set(cards, { opacity: 1, y: 0, scale: 1 });

            }, galleryRef);

            return () => {
                ctx.revert();
                ScrollTrigger.getById("works-gallery")?.kill();
            };
        }, 100);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getById("works-gallery")?.kill();
        };
    }, [mounted, isMobile, filteredProjects.length, activeCategory]);

    // Handle category change
    const handleCategoryChange = (categoryId) => {
        setActiveCategory(categoryId);
        setActiveIndex(0);

        // Reset scroll position using native scroll (GSAP ScrollToPlugin not installed)
        if (galleryRef.current) {
            window.scrollTo({
                top: galleryRef.current.offsetTop || 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <main className="min-h-screen bg-[#121212]">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
                    >
                        <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Back to Home</span>
                    </Link>

                    {/* Filter Categories */}
                    <div className="hidden md:flex items-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat.id
                                    ? 'bg-[#e8e8e3] text-[#121212]'
                                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        All Works
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl text-white/60 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    >
                        Explore my complete collection of projects. Scroll horizontally to navigate through the gallery.
                    </motion.p>

                    {/* Scroll Hint - Desktop only */}
                    {mounted && !isMobile && (
                        <motion.div
                            className="hidden md:flex items-center gap-2 mt-6 text-white/40 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            <span>Scroll to explore</span>
                            <motion.svg
                                className="w-5 h-5"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </motion.svg>
                        </motion.div>
                    )}

                    {/* Mobile Filter */}
                    <div className="md:hidden flex flex-wrap gap-2 mt-8">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat.id
                                    ? 'bg-[#e8e8e3] text-[#121212]'
                                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Loading state while waiting for mount */}
            {!mounted && (
                <section className="min-h-screen flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl"></div>
                        <div className="w-32 h-4 bg-white/10 rounded"></div>
                    </div>
                </section>
            )}

            {/* Desktop: Horizontal Scroll Gallery */}
            {mounted && !isMobile && (
                <section ref={galleryRef} className="relative min-h-screen">
                    {/* Progress Bar */}
                    <div ref={progressRef} className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            ref={progressFillRef}
                            className="h-full bg-gradient-to-r from-[#e8e8e3] to-gray-400 rounded-full"
                            style={{ width: '0%' }}
                        />
                    </div>

                    {/* Current Project Indicator */}
                    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 text-white/50 text-sm font-medium">
                        <span className="text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
                        <span className="mx-2">/</span>
                        <span>{String(filteredProjects.length).padStart(2, '0')}</span>
                    </div>

                    {/* Gallery Track */}
                    <div
                        ref={trackRef}
                        className="flex items-center gap-8 pl-[10vw] pr-[50vw] py-20"
                        style={{ width: 'max-content' }}
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.article
                                key={project.id}
                                className="gallery-card flex-shrink-0 w-[70vw] max-w-[800px]"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                onMouseEnter={() => setHoveredCard(project.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <Link
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block group"
                                >
                                    <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#121212] border border-gray-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#e8e8e3]/30">
                                        {/* Project Number Badge */}
                                        <div className="absolute top-6 left-6 z-20 w-14 h-14 flex items-center justify-center bg-[#e8e8e3]/10 border border-[#e8e8e3]/20 rounded-2xl backdrop-blur-sm">
                                            <span className="text-[#e8e8e3] font-bold text-lg">{project.number}</span>
                                        </div>

                                        {/* Thumbnail */}
                                        <div className="relative w-full h-[50vh] max-h-[500px] overflow-hidden">
                                            <Image
                                                src={project.thumbnail}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 1200px) 70vw, 800px"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                priority={index < 2}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-8 md:p-10">
                                            <span className="text-xs text-[#e8e8e3]/70 font-semibold uppercase tracking-wider">
                                                {project.subtitle}
                                            </span>
                                            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4 group-hover:text-[#e8e8e3] transition-colors">
                                                {project.title}
                                            </h2>
                                            <p className="text-white/50 text-lg leading-relaxed mb-4">
                                                {project.description}
                                            </p>
                                            {/* Tech Stack Icons */}
                                            <div className="flex items-center gap-3 mb-6">
                                                {project.techStack?.map((tech) => {
                                                    const techData = techIcons[tech];
                                                    if (!techData) return null;
                                                    const IconComponent = techData.icon;
                                                    return (
                                                        <div key={tech} className="group/icon relative" title={techData.name}>
                                                            <IconComponent className="w-8 h-8 transition-transform hover:scale-110" style={{ color: techData.color }} />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="flex items-center gap-2 text-[#e8e8e3] font-semibold group-hover:text-white transition-colors">
                                                <span>View Project</span>
                                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        {hoveredCard === project.id && (
                                            <div className="absolute inset-0 pointer-events-none">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#e8e8e3]/5 via-gray-400/5 to-transparent" />
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>

                    {/* Side Progress Dots */}
                    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
                        {filteredProjects.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex
                                    ? 'bg-[#e8e8e3] scale-150'
                                    : 'bg-white/20 hover:bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Mobile: Vertical Scroll Gallery */}
            {mounted && isMobile && (
                <section className="px-6 pb-20 space-y-6">
                    {filteredProjects.map((project, index) => (
                        <motion.article
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group"
                            >
                                <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#121212] border border-gray-700/50 rounded-2xl overflow-hidden">
                                    <div className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center bg-[#e8e8e3]/10 border border-[#e8e8e3]/20 rounded-xl backdrop-blur-sm">
                                        <span className="text-[#e8e8e3] font-bold text-sm">{project.number}</span>
                                    </div>
                                    <div className="relative w-full h-48 overflow-hidden">
                                        <Image
                                            src={project.thumbnail}
                                            alt={project.title}
                                            fill
                                            sizes="100vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-80" />
                                    </div>
                                    <div className="p-5">
                                        <span className="text-[10px] text-[#e8e8e3]/70 font-semibold uppercase tracking-wider">
                                            {project.subtitle}
                                        </span>
                                        <h2 className="text-xl font-bold text-white mt-2 mb-2 group-hover:text-[#e8e8e3] transition-colors">
                                            {project.title}
                                        </h2>
                                        <p className="text-white/50 text-sm leading-relaxed mb-3">
                                            {project.description}
                                        </p>
                                        {/* Tech Stack Icons */}
                                        <div className="flex items-center gap-2 mb-3">
                                            {project.techStack?.map((tech) => {
                                                const techData = techIcons[tech];
                                                if (!techData) return null;
                                                const IconComponent = techData.icon;
                                                return (
                                                    <div key={tech} title={techData.name}>
                                                        <IconComponent className="w-8 h-8" style={{ color: techData.color }} />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-[#e8e8e3] font-semibold">
                                            <span>View Project</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </section>
            )}

        </main>
    );
}
