"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhatIDo() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const serviceRef = useRef(null);
    const panelsContainerRef = useRef(null);
    const indicatorFillRef = useRef(null);
    const indicatorDotsRef = useRef([]);
    const triggerRef = useRef(null);
    const keyHandlerRef = useRef(null);
    const contentRef = useRef(null);
    const prevContentRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    // Lacak ukuran viewport untuk fallback mobile
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Set initial state for all content on mount
    useEffect(() => {
        // Set initial state for all skills at once
        skills.forEach((_, idx) => {
            const skillElement = document.querySelector(`[data-skill-index="${idx}"]`);
            if (!skillElement) return;

            const number = skillElement.querySelector('.skill-number');
            const title = skillElement.querySelector('.skill-title');
            const descLines = skillElement.querySelectorAll('.skill-desc-line');
            const pills = skillElement.querySelectorAll('.skill-pill');

            if (idx === 0) {
                // First content visible
                gsap.set([number, title], { clipPath: 'inset(0% 0% 0% 0%)' });
                gsap.set(descLines, { clipPath: 'inset(0% 0% 0% 0%)' });
                gsap.set(pills, { opacity: 1, scale: 1 });
            } else {
                // Other content hidden
                gsap.set([number, title], { clipPath: 'inset(100% 0% 0% 0%)' });
                gsap.set(descLines, { clipPath: 'inset(100% 0% 0% 0%)' });
                gsap.set(pills, { opacity: 0, scale: 0.9 });
            }
        });
    }, []);

    // Animate content with text masking when activeIndex changes
    useEffect(() => {
        if (activeIndex === prevIndex) return;


        // Exit animation for previous content (if exists)
        if (prevIndex !== null && prevContentRef.current) {
            const prevNumber = prevContentRef.current.querySelector('.skill-number');
            const prevTitle = prevContentRef.current.querySelector('.skill-title');
            const prevDescLines = prevContentRef.current.querySelectorAll('.skill-desc-line');
            const prevPills = prevContentRef.current.querySelectorAll('.skill-pill');

            // Exit with clip-path reveal upward only (no slide)
            gsap.to(prevNumber, {
                clipPath: 'inset(0% 0% 100% 0%)',
                duration: 1.3,
                ease: 'power2.in',
            });

            gsap.to(prevTitle, {
                clipPath: 'inset(0% 0% 100% 0%)',
                duration: 1.3,
                delay: 0.1,
                ease: 'power2.in',
            });

            gsap.to(prevDescLines, {
                clipPath: 'inset(0% 0% 100% 0%)',
                duration: 1.1,
                stagger: 0.08,
                delay: 0.2,
                ease: 'power2.in',
            });

            // no aside lines in this version

            gsap.to(prevPills, {
                opacity: 0,
                scale: 0.95,
                duration: 0.9,
                stagger: 0.05,
                ease: 'power2.in',
            });
        }

        // Enter animation for current content
        if (contentRef.current) {
            const number = contentRef.current.querySelector('.skill-number');
            const title = contentRef.current.querySelector('.skill-title');
            const descLines = contentRef.current.querySelectorAll('.skill-desc-line');
            const pills = contentRef.current.querySelectorAll('.skill-pill');

            // Set initial state - only clip-path masking (no slide)
            gsap.set([number, title], {
                clipPath: 'inset(100% 0% 0% 0%)',
            });

            gsap.set(descLines, {
                clipPath: 'inset(100% 0% 0% 0%)',
            });

            // no aside lines in this version

            gsap.set(pills, {
                opacity: 0,
                scale: 0.9,
            });

            // Enter with clip-path reveal from bottom - DELAYED MORE
            gsap.to(number, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1,
                delay: 0.7,
                ease: 'power3.out',
            });

            gsap.to(title, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.1,
                delay: 0.85,
                ease: 'power3.out',
            });

            // Enter desc lines with stagger
            descLines.forEach((line, idx) => {
                gsap.to(line, {
                    clipPath: 'inset(0% 0% 0% 0%)',
                    duration: 0.9,
                    delay: 1.0 + idx * 0.1,
                    ease: 'power2.out',
                });
            });

            // no aside lines in this version

            gsap.to(pills, {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                stagger: 0.08,
                delay: 1.4,
                ease: 'back.out(1.7)',
            });
        }

        setPrevIndex(activeIndex);
    }, [activeIndex]);

    useEffect(() => {
        if (isMobile) {
            // Matikan trigger desktop saat mobile
            ScrollTrigger.getById('horizontal-gallery')?.kill();
            if (typeof window !== 'undefined' && keyHandlerRef.current) {
                window.removeEventListener('keydown', keyHandlerRef.current);
                keyHandlerRef.current = null;
            }
            return undefined;
        }

        // Initialize Lenis smooth scroll
        let lenis;
        const initLenis = async () => {
            try {
                const Lenis = (await import('@studio-freight/lenis')).default;
                lenis = new Lenis({
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smooth: true,
                });

                function raf(time) {
                    lenis.raf(time);
                    requestAnimationFrame(raf);
                }
                requestAnimationFrame(raf);
            } catch (error) {
                console.warn('Lenis not available, using default scroll');
            }
        };

        if (typeof window !== 'undefined') {
            initLenis();
        }

        const ctx = gsap.context(() => {
            // Horizontal scrolling gallery: pin section, translate track on scroll
            if (panelsContainerRef.current) {
                const track = panelsContainerRef.current;

                gsap.to(track, {
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: () => `+=${Math.max(track.scrollWidth, window.innerWidth * 2)}`,
                        scrub: true,
                        pin: true,
                        invalidateOnRefresh: true,
                        id: 'horizontal-gallery',
                        snap: (value) => {
                            // snap progress to nearest panel index
                            const steps = skills.length - 1;
                            if (steps <= 0) return value;
                            const snapped = Math.round(value * steps) / steps;
                            return snapped;
                        },
                        onUpdate: (self) => {
                            const progress = self.progress;
                            const idx = Math.min(skills.length - 1, Math.floor(progress * (skills.length - 0.0001)));
                            setActiveIndex(idx);
                            // Update lateral indicator fill height smoothly based on scroll progress
                            if (indicatorFillRef.current) {
                                gsap.to(indicatorFillRef.current, { height: `${progress * 100}%`, duration: 0.1, ease: 'none' });
                            }
                            // Pulse active dot (only if ref exists and has valid element)
                            const dotElement = indicatorDotsRef.current?.[idx];
                            if (dotElement) {
                                gsap.fromTo(dotElement, { scale: 1 }, { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: 'power1.out' });
                            }
                        },
                    },
                });

                // store trigger for programmatic control
                triggerRef.current = ScrollTrigger.getById('horizontal-gallery');

                // keyboard navigation: left/right arrows
                const handleKey = (e) => {
                    if (!triggerRef.current) return;
                    const steps = skills.length - 1;
                    if (steps <= 0) return;
                    if (e.key === 'ArrowRight') {
                        const next = Math.min(steps, activeIndex + 1);
                        const targetProgress = next / steps;
                        gsap.to(triggerRef.current, { progress: targetProgress, duration: 0.5, ease: 'power2.out' });
                    } else if (e.key === 'ArrowLeft') {
                        const prev = Math.max(0, activeIndex - 1);
                        const targetProgress = prev / steps;
                        gsap.to(triggerRef.current, { progress: targetProgress, duration: 0.5, ease: 'power2.out' });
                    }
                };
                keyHandlerRef.current = handleKey;
                window.addEventListener('keydown', keyHandlerRef.current);
                // removal handled in useEffect cleanup below
            }
        }, sectionRef);

        return () => {
            ctx.revert();
            // remove keyboard listener
            if (typeof window !== 'undefined' && keyHandlerRef.current) {
                window.removeEventListener('keydown', keyHandlerRef.current);
                keyHandlerRef.current = null;
            }
            lenis?.destroy();
        };
    }, [isMobile]);

    // Helper function to split description into lines with CSS variable delay
    const createDescriptionLines = (text) => {
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        const WORDS_PER_LINE = 8;

        words.forEach((word, idx) => {
            currentLine += word + ' ';
            if ((idx + 1) % WORDS_PER_LINE === 0 || idx === words.length - 1) {
                lines.push(currentLine.trim());
                currentLine = '';
            }
        });

        return lines.map((line, idx) => ({
            text: line,
            delay: idx * 0.1,
        }));
    };

    const skills = [
        {
            id: "01",
            title: "Full-Stack Development",
            desc:
                "From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.",
            descLines: createDescriptionLines("From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users."),
            stack: ["React, Node.js, Express.js", "REST APIs, Firebase, Docker", "Git, GitHub, Postman"],
        },
        {
            id: "02",
            title: "Frontend",
            desc:
                "Design is more than looks — it's about clarity and connection. I design and develop clean, responsive interfaces that feel intuitive across devices. My focus is on clarity, accessibility, and seamless user experiences.",
            descLines: createDescriptionLines("Design is more than looks — it's about clarity and connection. I design and develop clean, responsive interfaces that feel intuitive across devices. My focus is on clarity, accessibility, and seamless user experiences."),
            stack: ["NextJs, TailwindCSS, GSAP", "Figma to Code"],
        },
        {
            id: "03",
            title: "DevOps & Deployment",
            desc:
                "Streamlining development workflows and ensuring reliable deployments. I set up CI/CD pipelines, containerize applications, and manage cloud infrastructure for optimal performance and scalability.",
            descLines: createDescriptionLines("Streamlining development workflows and ensuring reliable deployments. I set up CI/CD pipelines, containerize applications, and manage cloud infrastructure for optimal performance and scalability."),
            stack: ["Docker & Containerization", "CI/CD Pipelines", "Cloud Platforms (AWS, Vercel)", "Monitoring & Performance"],
        },
    ];

    return (
        <section ref={sectionRef} id="what-i-do" className="relative bg-[#121212] text-neutral-200 overflow-hidden">
            <div className="sticky top-0 z-50 flex flex-col gap-4 bg-gradient-to-b from-[#121212] via-[#121212] to-[#121212]/95 px-6 pb-8 pt-12 md:px-12 lg:px-16">
                <h2 ref={titleRef} className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tight text-white">
                    What I Do
                </h2>
                <p ref={serviceRef} className="text-neutral-400 text-lg sm:text-xl md:text-2xl max-w-4xl leading-relaxed">
                    I specialize in building full-stack web applications
                    that are fast, reliable, and user-friendly. With a
                    solid foundation in both frontend and backend
                    technologies, I help bring ideas to life whether
                    it's for a business, a startup, or a product team.
                </p>
            </div>

            <div className="relative md:h-screen h-auto">
                <div className="md:absolute md:inset-0 md:overflow-hidden">
                    {/* Lateral Pin Indicator (desktop only) */}
                    <div className="hidden md:flex absolute left-0 top-0 h-full px-4 md:px-8 lg:px-10 pointer-events-none items-center -mt-20 md:-mt-24">
                        <div className="w-full">
                            <div className="flex items-center gap-3">
                                <div className="relative h-[22vh] md:h-[20vh] lg:h-[18vh] w-[2px] bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        ref={indicatorFillRef}
                                        className="absolute left-0 top-0 w-full bg-neutral-400/70"
                                        style={{ height: `${(activeIndex + 1) / skills.length * 100}%` }}
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    {skills.map((s, i) => (
                                        <div key={s.id} className="flex items-center gap-2">
                                            <div
                                                ref={(el) => (indicatorDotsRef.current[i] = el)}
                                                className={`w-2.5 h-2.5 rounded-full ${i === activeIndex ? 'bg-white' : 'bg-white/30'}`}
                                            ></div>
                                            <span className={`text-xs md:text-sm ${i === activeIndex ? 'text-white' : 'text-white/60'}`}>{s.id}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div ref={panelsContainerRef} className="hidden md:flex h-full items-center justify-center px-16 md:px-24 lg:px-32 -mt-20 md:-mt-24">
                        <div className="relative w-full max-w-6xl min-h-[600px]">
                            {/* Render ALL skills with absolute positioning - visibility controlled by z-index and opacity */}
                            {skills.map((skill, idx) => (
                                <div
                                    key={skill.id}
                                    data-skill-index={idx}
                                    ref={(el) => {
                                        if (idx === activeIndex) {
                                            contentRef.current = el;
                                        }
                                        if (idx === prevIndex) {
                                            prevContentRef.current = el;
                                        }
                                    }}
                                    className="absolute inset-0 w-full"
                                    style={{
                                        zIndex: idx === prevIndex ? 20 : idx === activeIndex ? 10 : 0,
                                    }}
                                >
                                    <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8">
                                        <div className="skill-number text-8xl md:text-9xl lg:text-[12rem] font-black text-white/90 leading-none">{skill.id}</div>
                                        <h3 className="skill-title text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">{skill.title}</h3>
                                    </div>
                                    <div className="mt-8 text-neutral-200 text-xl md:text-2xl lg:text-3xl leading-relaxed max-w-4xl">
                                        {skill.descLines.map((line, i) => (
                                            <div key={i} className="skill-desc-line block">
                                                {line.text}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-10 flex flex-wrap gap-4">
                                        {skill.stack.map((item, i) => (
                                            <span key={i} className="skill-pill px-6 py-3 rounded-full bg-white/5 text-white/90 text-lg md:text-xl font-medium border border-white/10 hover:bg-white/10 transition-colors">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Mobile fallback: stack vertikal, tanpa pinning */}
                <div className="md:hidden px-6 pb-12 space-y-10">
                    {skills.map((skill) => (
                        <div key={skill.id} className="bg-white/5 rounded-2xl border border-white/10 p-6 space-y-4 shadow-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-black text-white/90">{skill.id}</span>
                                <h3 className="text-2xl font-bold text-white leading-tight">{skill.title}</h3>
                            </div>
                            <div className="text-neutral-200 text-base leading-relaxed space-y-2">
                                {skill.descLines.map((line, i) => (
                                    <p key={i}>{line.text}</p>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-3 pt-2">
                                {skill.stack.map((item, i) => (
                                    <span key={i} className="px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm font-medium border border-white/10">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
