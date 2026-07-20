"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { iconComponents } from "@/utils/techIcons";
import { featuredProjects, techIcons as techIconsData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

// Combine icon components with tech data
const techIcons = Object.fromEntries(
    Object.entries(techIconsData).map(([key, data]) => [
        key,
        { ...data, icon: iconComponents[key] }
    ])
);

export default function Works() {
    const sectionRef = useRef(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

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

    const [cardRotations] = useState(() => {
        return Array.from({ length: featuredProjects.length }, () => ({
            rotateX: (Math.random() - 0.5) * 24,
            rotateY: (Math.random() - 0.5) * 24,
        }));
    });

    // Use useLayoutEffect for GSAP animations to handle DOM correctly before paint
    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        // GSAP ScrollTrigger context for proper cleanup
        let ctx = gsap.context(() => {
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
                        overwrite: true // Ensure we override any existing tweens
                    });
                },
                onLeaveBack: (batch) => {
                    // Optional: Reset when scrolling back up?
                    // For now keep it simple to avoid jumping
                },
                once: false,
                start: 'top 85%' // Trigger slightly earlier
            });

            // 3D tilt effect on mouse move (desktop only)
            cards.forEach((card, index) => {
                let tiltTimeline = null;
                const cardElement = card.querySelector('[data-card-inner]');
                if (cardElement && cardRotations[index]) {
                    // Set initial rotation
                    gsap.set(cardElement, {
                        rotationX: cardRotations[index].rotateX,
                        rotationY: cardRotations[index].rotateY,
                        transformPerspective: 1200,
                    });

                    const handleMouseMove = (e) => {
                        if (window.innerWidth < 768) return; // Use dynamic check
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
                }
            });

        }, sectionRef); // Scope to sectionRef

        return () => {
            window.removeEventListener("resize", checkMobile);
            ctx.revert(); // Cleanup all GSAP animations/triggers created in this context
        };
    }, [cardRotations]);

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
                    {featuredProjects.map((project, index) => {
                        const projectImages = project.images ? [project.thumbnail, ...project.images] : [project.thumbnail];
                        return (
                            <article key={project.id} className="snap-start" aria-labelledby={`${project.id}-title`} aria-describedby={`${project.id}-desc`}>
                                <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#121212] border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300">
                                    <div className="absolute top-4 left-4 z-20 w-9 h-9 flex items-center justify-center bg-[#e8e8e3]/10 border border-[#e8e8e3]/20 rounded-lg backdrop-blur-sm">
                                        <span className="text-[#e8e8e3] font-bold text-xs">{project.number}</span>
                                    </div>
                                    {/* Mobile main image (zoomable) */}
                                    <div 
                                        className="relative w-full h-40 overflow-hidden bg-gray-900 cursor-zoom-in"
                                        onClick={() => {
                                            setLightboxImages(projectImages);
                                            setLightboxIndex(0);
                                            setIsLightboxOpen(true);
                                        }}
                                    >
                                        <Image src={project.thumbnail} alt={`${project.title} thumbnail`} fill sizes="(max-width: 768px) 100vw, 380px" className="object-cover transition-transform duration-700 group-hover:scale-105" priority={index === 0} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-70"></div>
                                    </div>
                                    <div className="p-4">
                                        <span className="text-[10px] text-[#e8e8e3]/70 font-semibold uppercase tracking-wider">{project.subtitle}</span>
                                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="block group/title mt-1">
                                            <h3 id={`${project.id}-title`} className="text-lg font-bold text-white group-hover/title:text-[#e8e8e3] transition-colors">{project.title}</h3>
                                        </a>
                                        <p id={`${project.id}-desc`} className="text-gray-400 text-sm mt-2">{project.description}</p>
                                        
                                        {/* Mobile screenshots thumbnail list */}
                                        {project.images && project.images.length > 0 && (
                                            <div className="flex gap-2 mt-3">
                                                {project.images.slice(0, 3).map((img, idx) => {
                                                    const isLast = idx === 2 && project.images.length > 3;
                                                    const remainingCount = project.images.length - 2;
                                                    return (
                                                        <button
                                                            key={idx}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                setLightboxImages(projectImages);
                                                                setLightboxIndex(idx + 1);
                                                                setIsLightboxOpen(true);
                                                            }}
                                                            className="relative w-14 h-10 rounded-lg overflow-hidden border border-white/10 active:border-white/40 transition-all flex-shrink-0 cursor-zoom-in shadow-md"
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
                                        )}

                                        {/* Tech Stack Icons */}
                                        <div className="flex items-center gap-2 mt-4">
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
                                        <div className="flex items-center gap-3 text-sm text-[#e8e8e3] font-semibold mt-4">
                                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                                                <span>Explore</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                            </a>
                                            {project.githubLink && (
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ml-auto text-white/50 hover:text-white transition-colors"
                                                    title="GitHub"
                                                >
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Desktop: floating cards */}
                <div className="absolute inset-0 w-full h-full overflow-hidden hidden md:block">
                    {featuredProjects.map((project, index) => {
                        const projectImages = project.images ? [project.thumbnail, ...project.images] : [project.thumbnail];
                        return (
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
                                <div
                                    data-card-inner
                                    className="relative h-full"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="relative bg-gradient-to-br from-[#1c1c1c] to-[#121212] border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-[#e8e8e3]/10 h-full flex flex-col transition-shadow duration-300">
                                        <div className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center bg-[#e8e8e3]/10 border border-[#e8e8e3]/20 rounded-lg backdrop-blur-sm">
                                            <span className="text-[#e8e8e3] font-bold text-sm">{project.number}</span>
                                        </div>
                                        {/* Desktop main image (zoomable) */}
                                        <div 
                                            className="relative w-full h-44 md:h-52 overflow-hidden bg-gray-900 flex-shrink-0 cursor-zoom-in"
                                            onClick={() => {
                                                setLightboxImages(projectImages);
                                                setLightboxIndex(0);
                                                setIsLightboxOpen(true);
                                            }}
                                        >
                                            <Image src={project.thumbnail} alt={`${project.title} thumbnail`} fill sizes="(max-width: 768px) 100vw, 380px" className="object-cover transition-transform duration-700 group-hover:scale-110" priority={index === 0} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-70"></div>
                                        </div>
                                        <div className="p-5 md:p-6 relative z-10 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="inline-block mb-2">
                                                    <span className="text-xs text-[#e8e8e3]/70 font-semibold uppercase tracking-wider">{project.subtitle}</span>
                                                </div>
                                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="block group/title">
                                                    <h3 id={`${project.id}-title`} className="text-xl md:text-2xl font-bold text-white mb-2 group-hover/title:text-[#e8e8e3] transition-colors duration-300">{project.title}</h3>
                                                </a>
                                                <p id={`${project.id}-desc`} className="text-gray-400 text-sm leading-relaxed mb-3">{project.description}</p>
                                                
                                                {/* Desktop screenshots thumbnail list */}
                                                {project.images && project.images.length > 0 && (
                                                    <div className="flex gap-2 py-1 px-1 mb-3">
                                                        {project.images.slice(0, 3).map((img, idx) => {
                                                            const isLast = idx === 2 && project.images.length > 3;
                                                            const remainingCount = project.images.length - 2;
                                                            return (
                                                                <button
                                                                    key={idx}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        setLightboxImages(projectImages);
                                                                        setLightboxIndex(idx + 1);
                                                                        setIsLightboxOpen(true);
                                                                    }}
                                                                    className="relative w-14 h-10 rounded-lg overflow-hidden border border-white/10 hover:border-white/40 hover:scale-105 transition-all flex-shrink-0 cursor-zoom-in shadow-md"
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
                                                )}

                                                {/* Tech Stack Icons */}
                                                <div className="flex items-center gap-2">
                                                    {project.techStack?.map((tech) => {
                                                        const techData = techIcons[tech];
                                                        if (!techData) return null;
                                                        const IconComponent = techData.icon;
                                                        return (
                                                            <div key={tech} className="group/icon relative" title={techData.name}>
                                                                <IconComponent className="w-6 h-6 transition-transform hover:scale-110" style={{ color: techData.color }} aria-label={techData.name} />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-[#e8e8e3] font-semibold mt-4">
                                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                                                    <span>Explore</span>
                                                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                                </a>
                                                {project.githubLink && (
                                                    <a
                                                        href={project.githubLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="ml-auto text-white/50 hover:text-white transition-colors"
                                                        title="GitHub"
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                        </svg>
                                                    </a>
                                                )}
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
                            </article>
                        );
                    })}
                </div>
            </div>

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
        </section>
    );
}
