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

    // Lightbox states
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    // Close lightbox on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setIsLightboxOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Filter projects based on category
    const filteredProjects = activeCategory === "all"
        ? allProjects
        : allProjects.filter(p => 
            Array.isArray(p.category) 
                ? p.category.includes(activeCategory) 
                : p.category === activeCategory
        );

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
                <section key="loading" className="min-h-screen flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl"></div>
                        <div className="w-32 h-4 bg-white/10 rounded"></div>
                    </div>
                </section>
            )}

            {/* Desktop: Horizontal Scroll Gallery */}
            {mounted && !isMobile && (
                <section key="desktop" ref={galleryRef} className="relative min-h-screen">
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
                        {filteredProjects.map((project, index) => {
                            const projectImages = project.images ? [project.thumbnail, ...project.images] : [project.thumbnail];
                            return (
                                <motion.article
                                    key={project.id}
                                    className="gallery-card flex-shrink-0 w-[70vw] max-w-[800px]"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    onMouseEnter={() => setHoveredCard(project.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                >
                                    <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#121212] border border-gray-700/50 rounded-3xl overflow-hidden transition-all duration-500 hover:border-[#e8e8e3]/30 h-full flex flex-col">
                                        {/* Project Number Badge */}
                                        <div className="absolute top-6 left-6 z-20 w-14 h-14 flex items-center justify-center bg-[#e8e8e3]/10 border border-[#e8e8e3]/20 rounded-2xl backdrop-blur-sm">
                                            <span className="text-[#e8e8e3] font-bold text-lg">{project.number}</span>
                                        </div>

                                        {/* Thumbnail (Clickable to zoom) */}
                                        <div 
                                            className="relative w-full h-[45vh] max-h-[450px] overflow-hidden cursor-zoom-in group-hover:opacity-90 transition-opacity"
                                            onClick={() => {
                                                setLightboxImages(projectImages);
                                                setLightboxIndex(0);
                                                setIsLightboxOpen(true);
                                            }}
                                        >
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
                                        <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                                            <div>
                                                <span className="text-xs text-[#e8e8e3]/70 font-semibold uppercase tracking-wider block">
                                                    {project.subtitle}
                                                </span>
                                                <a 
                                                    href={project.demoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block group/title mt-3 mb-4"
                                                >
                                                    <h2 className="text-3xl md:text-4xl font-bold text-white group-hover/title:text-[#e8e8e3] transition-colors flex items-center gap-3">
                                                        <span>{project.title}</span>
                                                        <svg className="w-6 h-6 opacity-0 group-hover/title:opacity-100 transition-opacity translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </h2>
                                                </a>
                                                <p className="text-white/50 text-lg leading-relaxed mb-6">
                                                    {project.description}
                                                </p>

                                                {/* Screenshots Row */}
                                                {project.images && project.images.length > 0 && (
                                                    <div className="mb-6">
                                                        <span className="text-xs text-white/40 block mb-2 uppercase tracking-wider font-semibold">Screenshots ({project.images.length})</span>
                                                        <div className="flex gap-3 py-1 px-1">
                                                            {project.images.slice(0, 5).map((img, idx) => {
                                                                const isLast = idx === 4 && project.images.length > 5;
                                                                const remainingCount = project.images.length - 4;
                                                                return (
                                                                    <button
                                                                        key={idx}
                                                                        onClick={() => {
                                                                            setLightboxImages(projectImages);
                                                                            setLightboxIndex(idx + 1);
                                                                            setIsLightboxOpen(true);
                                                                        }}
                                                                        className="relative w-20 h-14 rounded-xl overflow-hidden border border-white/10 hover:border-white/50 hover:scale-105 active:scale-95 transition-all flex-shrink-0 shadow-lg cursor-zoom-in"
                                                                    >
                                                                        <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                                                                        {isLast && (
                                                                            <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-white text-sm font-bold">
                                                                                +{remainingCount}
                                                                            </div>
                                                                        )}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Technical Highlights */}
                                                {project.highlights && project.highlights.length > 0 && (
                                                    <ul className="mb-6 space-y-1">
                                                        {project.highlights.map((highlight, idx) => (
                                                            <li key={idx} className="text-sm text-emerald-400/80 flex items-start gap-2">
                                                                <span className="text-emerald-400">•</span>
                                                                <span>{highlight}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>

                                            <div>
                                                {/* Tech Stack Icons */}
                                                <div className="flex items-center gap-3 mb-6">
                                                    {project.techStack?.map((tech) => {
                                                        const techData = techIcons[tech];
                                                        if (!techData) return null;
                                                        const IconComponent = techData.icon;
                                                        return (
                                                            <div key={tech} className="group/icon relative" title={techData.name}>
                                                                <IconComponent className="w-8 h-8 transition-transform hover:scale-110" style={{ color: techData.color }} aria-label={techData.name} />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-4">
                                                    <a
                                                        href={project.demoLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-[#e8e8e3] font-semibold hover:text-white transition-colors"
                                                    >
                                                        <span>View Project</span>
                                                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                        </svg>
                                                    </a>
                                                    {project.githubLink && (
                                                        <a
                                                            href={project.githubLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
                                                            title="View on GitHub"
                                                        >
                                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                            </svg>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        {hoveredCard === project.id && (
                                            <div className="absolute inset-0 pointer-events-none">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#e8e8e3]/5 via-gray-400/5 to-transparent" />
                                            </div>
                                        )}
                                    </div>
                                </motion.article>
                            );
                        })}
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
                <section key="mobile" className="px-6 pb-20 space-y-6">
                    {filteredProjects.map((project, index) => {
                        const projectImages = project.images ? [project.thumbnail, ...project.images] : [project.thumbnail];
                        return (
                            <motion.article
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#121212] border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl">
                                    <div className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center bg-[#e8e8e3]/10 border border-[#e8e8e3]/20 rounded-xl backdrop-blur-sm">
                                        <span className="text-[#e8e8e3] font-bold text-sm">{project.number}</span>
                                    </div>

                                    {/* Mobile Thumbnail */}
                                    <div 
                                        className="relative w-full h-48 overflow-hidden cursor-zoom-in"
                                        onClick={() => {
                                            setLightboxImages(projectImages);
                                            setLightboxIndex(0);
                                            setIsLightboxOpen(true);
                                        }}
                                    >
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
                                        <a 
                                            href={project.demoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block group/title mt-2 mb-2"
                                        >
                                            <h2 className="text-xl font-bold text-white group-hover/title:text-[#e8e8e3] transition-colors flex items-center gap-2">
                                                <span>{project.title}</span>
                                                <svg className="w-4 h-4 translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </h2>
                                        </a>
                                        <p className="text-white/50 text-sm leading-relaxed mb-3">
                                            {project.description}
                                        </p>

                                        {/* Mobile Screenshots Row */}
                                        {project.images && project.images.length > 0 && (
                                            <div className="mb-4">
                                                <span className="text-[10px] text-white/40 block mb-1.5 uppercase tracking-wider font-semibold">Screenshots ({project.images.length})</span>
                                                <div className="flex gap-2 py-1 px-1">
                                                    {project.images.slice(0, 4).map((img, idx) => {
                                                        const isLast = idx === 3 && project.images.length > 4;
                                                        const remainingCount = project.images.length - 3;
                                                        return (
                                                            <button
                                                                key={idx}
                                                                onClick={() => {
                                                                    setLightboxImages(projectImages);
                                                                    setLightboxIndex(idx + 1);
                                                                    setIsLightboxOpen(true);
                                                                }}
                                                                className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10 active:border-white/50 transition-all flex-shrink-0 cursor-zoom-in shadow-md"
                                                            >
                                                                <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                                                                {isLast && (
                                                                    <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-white text-xs font-bold">
                                                                        +{remainingCount}
                                                                    </div>
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Technical Highlights (mobile) */}
                                        {project.highlights && project.highlights.length > 0 && (
                                            <ul className="mb-3 space-y-0.5">
                                                {project.highlights.slice(0, 2).map((highlight, idx) => (
                                                    <li key={idx} className="text-xs text-emerald-400/80 flex items-start gap-1">
                                                        <span className="text-emerald-400">•</span>
                                                        <span>{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
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
                                        {/* Action Buttons (mobile) */}
                                        <div className="flex items-center gap-3">
                                            <a
                                                href={project.demoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm text-[#e8e8e3] font-semibold hover:text-white transition-colors"
                                            >
                                                <span>View Project</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </a>
                                            {project.githubLink && (
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white/50 hover:text-white transition-colors"
                                                    title="View on GitHub"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}
                </section>
            )}

            {/* Lightbox Modal */}
            {isLightboxOpen && lightboxImages.length > 0 && (
                <div 
                    className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 transition-all duration-300"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    {/* Close Button */}
                    <button 
                        className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all duration-200"
                        onClick={() => setIsLightboxOpen(false)}
                        title="Close (Esc)"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Navigation Buttons */}
                    {lightboxImages.length > 1 && (
                        <>
                            {/* Prev Button */}
                            <button 
                                className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all duration-200 z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex((prev) => (prev === 0 ? lightboxImages.length - 1 : prev - 1));
                                }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Next Button */}
                            <button 
                                className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all duration-200 z-10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex((prev) => (prev === lightboxImages.length - 1 ? 0 : prev + 1));
                                }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Large Image Box */}
                    <div 
                        className="relative w-full max-w-[90vw] h-[70vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image 
                            src={lightboxImages[lightboxIndex]} 
                            alt="Project snapshot" 
                            fill 
                            className="object-contain transition-all duration-300"
                            sizes="90vw"
                            priority
                        />
                    </div>

                    {/* Bottom Status & Thumbnails */}
                    <div 
                        className="mt-6 flex flex-col items-center gap-3 z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-white/60 text-sm font-medium">
                            {lightboxIndex + 1} / {lightboxImages.length}
                        </div>
                        {lightboxImages.length > 1 && (
                            <div className="flex gap-2 max-w-[85vw] overflow-x-auto py-2 px-2 no-scrollbar bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5">
                                {lightboxImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setLightboxIndex(idx)}
                                        className={`relative w-14 h-10 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                                            idx === lightboxIndex ? 'border-white scale-105 shadow-md shadow-white/10' : 'border-transparent opacity-50 hover:opacity-100'
                                        }`}
                                    >
                                        <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

        </main>
    );
}
