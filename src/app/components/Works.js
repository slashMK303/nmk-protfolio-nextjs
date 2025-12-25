"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
    const sectionRef = useRef(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [cardRotations] = useState(() => {
        return Array.from({ length: 4 }, () => ({
            rotateX: (Math.random() - 0.5) * 24,
            rotateY: (Math.random() - 0.5) * 24,
        }));
    });

    const projects = [
        {
            id: "proj-01",
            number: "01",
            title: "Indo Dragonica",
            subtitle: "Private Server Website",
            description: "Indonesian community site for Dragonica Online, offering game guides, videos, and updates.",
            thumbnail: "/img/project/idgn.webp",
            demoLink: "https://www.indodragonica.com/",
            position: { top: "10%", left: "5%", rotate: -8 },
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
        },
    ];

    useEffect(() => {
        if (!sectionRef.current) return;

        // Determine if current viewport is mobile (tailwind md breakpoint ~768px)
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);

        // GSAP ScrollTrigger for smooth parallax on cards
        const cards = gsap.utils.toArray('.floating-card');

        cards.forEach((card, index) => {
            // Parallax effect on scroll
            if (!isMobile) {
                gsap.to(card, {
                    y: -50 + (index * 15),
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 1.5,
                    },
                });
            }

            // Initial fade-in animation
            gsap.from(card, {
                opacity: 0,
                scale: 0.8,
                y: 100,
                duration: 0.9,
                delay: index * 0.2,
                ease: 'power3.out',
            });

            // 3D tilt effect on mouse move (desktop only)
            let tiltTimeline = null;

            // Set initial random rotation
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
                const cardElement = card.querySelector('[data-card-inner]');
                if (!cardElement) return;

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -12;
                const rotateY = ((x - centerX) / centerX) * 12;

                if (tiltTimeline) tiltTimeline.kill();

                tiltTimeline = gsap.to(cardElement, {
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 1200,
                    duration: 0.3,
                    ease: 'power2.out',
                });
            };

            const handleMouseLeave = (e) => {
                const cardElement = card.querySelector('[data-card-inner]');
                if (!cardElement) return;

                if (tiltTimeline) tiltTimeline.kill();

                gsap.to(cardElement, {
                    rotationX: cardRotations[index]?.rotateX || 0,
                    rotationY: cardRotations[index]?.rotateY || 0,
                    duration: 0.6,
                    ease: 'power2.out',
                });
            };

            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        // Note: Avoid animating center-content with both Framer Motion and GSAP simultaneously
        // to prevent conflicting opacity transforms that can cause flicker.

        return () => {
            window.removeEventListener("resize", checkMobile);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

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
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
                            A curated collection of projects showcasing my expertise in web development, design, and creative problem-solving.
                        </p>
                    </motion.div>
                </div>

                {/* Projects Layout: Mobile list (stacked) and md+ floating cards */}
                {/* Mobile: stacked scroll-snap list */}
                <div className="w-full md:hidden mt-10 space-y-6 snap-y snap-mandatory overflow-x-hidden">
                    {projects.map((project, index) => (
                        <div key={project.id} className="snap-start">
                            <Link href={project.demoLink} target="_blank" rel="noopener noreferrer" className="block group">
                                <div className="relative bg-gradient-to-br from-[#1e1e1e] to-[#141414] border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl transition-shadow duration-300">
                                    <div className="absolute top-4 left-4 z-20 w-9 h-9 flex items-center justify-center bg-blue-600/20 border border-blue-500/30 rounded-lg backdrop-blur-sm">
                                        <span className="text-blue-300 font-bold text-xs">{project.number}</span>
                                    </div>
                                    <div className="relative w-full h-40 overflow-hidden bg-gray-900">
                                        <Image src={project.thumbnail} alt={project.title} fill sizes="(max-width: 768px) 100vw, 380px" className="object-cover transition-transform duration-700 group-hover:scale-105" priority={index === 0} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-70"></div>
                                    </div>
                                    <div className="p-4">
                                        <span className="text-[10px] text-blue-400 font-semibold uppercase tracking-wider">{project.subtitle}</span>
                                        <h3 className="text-lg font-bold text-white mt-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                        <p className="text-gray-400 text-sm mt-2">{project.description}</p>
                                        <div className="flex items-center gap-2 text-sm text-blue-400 font-semibold mt-4">
                                            <span>Explore</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* md+: restore previous floating absolute cards layout */}
                <div className="absolute inset-0 w-full h-full overflow-hidden hidden md:block">
                    {projects.map((project, index) => (
                        <div
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
                        >
                            <Link
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group h-full"
                            >
                                <div
                                    data-card-inner
                                    className="relative h-full"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="relative bg-gradient-to-br from-[#1e1e1e] to-[#141414] border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-900/20 h-full flex flex-col transition-shadow duration-300">
                                        <div className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center bg-blue-600/20 border border-blue-500/30 rounded-lg backdrop-blur-sm">
                                            <span className="text-blue-300 font-bold text-sm">{project.number}</span>
                                        </div>
                                        <div className="relative w-full h-44 md:h-52 overflow-hidden bg-gray-900 flex-shrink-0">
                                            <Image src={project.thumbnail} alt={project.title} fill sizes="(max-width: 768px) 100vw, 380px" className="object-cover transition-transform duration-700 group-hover:scale-110" priority={index === 0} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-70"></div>
                                        </div>
                                        <div className="p-5 md:p-6 relative z-10 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="inline-block mb-3">
                                                    <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">{project.subtitle}</span>
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
                                                <p className="text-gray-400 text-sm leading-relaxed">{project.description}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-blue-400 font-semibold group-hover:text-blue-300 transition-colors mt-4">
                                                <span>Explore</span>
                                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                            </div>
                                        </div>
                                        {hoveredCard === project.id && (
                                            <div className="absolute inset-0 pointer-events-none rounded-2xl">
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent rounded-2xl blur-2xl"></div>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

