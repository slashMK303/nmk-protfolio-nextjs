"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { journeyItems } from "@/data/journey";
import { techIcons as techIconsData } from "@/data/projects";
import { iconComponents } from "@/utils/techIcons";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const techIcons = Object.fromEntries(
    Object.entries(techIconsData).map(([key, data]) => [
        key,
        { ...data, icon: iconComponents[key] }
    ])
);

// Helper to generate S-curve SVG path dynamically based on item count N
const generatePath = (N, width, heightPerStep, leftApexX, rightApexX) => {
    let d = `M ${width / 2} 0`;
    let currentX = width / 2;
    let currentY = 0;

    for (let i = 0; i < N; i++) {
        const nextY = (i + 0.5) * heightPerStep;
        const nextX = (i % 2 === 0) ? leftApexX : rightApexX;

        const cp1Y = currentY + (nextY - currentY) * 0.6;
        const cp2Y = nextY - (nextY - currentY) * 0.6;

        d += ` C ${currentX},${cp1Y} ${nextX},${cp2Y} ${nextX},${nextY}`;

        currentX = nextX;
        currentY = nextY;
    }

    const endY = N * heightPerStep;
    const endX = width / 2;
    const cp1Y = currentY + (endY - currentY) * 0.6;
    const cp2Y = endY - (endY - currentY) * 0.6;
    d += ` C ${currentX},${cp1Y} ${endX},${cp2Y} ${endX},${endY}`;

    return d;
};

export default function Journey() {
    const containerRef = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [lightboxSrc, setLightboxSrc] = useState(null);

    const N = journeyItems.length;
    const heightPerStep = isMobile ? 450 : 550;
    const timelineHeight = N * heightPerStep;
    const firstAchievementIndex = journeyItems.findIndex(item => item.type === "achievement");

    useEffect(() => {
        setMounted(true);

        let gsapCtx;

        const initGSAP = () => {
            if (gsapCtx) gsapCtx.revert();

            const isMobileViewport = window.innerWidth < 768;
            setIsMobile(isMobileViewport);

            if (isMobileViewport) {
                // Jangan buat timeline GSAP apa pun di mobile.
                // Bersihkan properti inline dari sisa resizing layar desktop.
                gsapCtx = gsap.context(() => {
                    gsap.set(".journey-card", {
                        clearProps: "all"
                    });
                }, containerRef);
                return;
            }

            gsapCtx = gsap.context(() => {

                // Set status awal kartu pada desktop
                gsap.set(".journey-card", {
                    opacity: (i) => (i === 0 ? 1 : 0.15),
                    scale: (i) => (i === 0 ? 1 : 0.95),
                    y: (i) => (i === 0 ? 0 : 15),
                    pointerEvents: (i) => (i === 0 ? "auto" : "none")
                });

                // Timeline Animasi Desktop (S-Curve meliuk)
                const desktopTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".journey-timeline-container",
                        start: "top 55%",
                        end: "bottom 70%",
                        scrub: 1
                    }
                });

                // Jalankan logo pesawat/kustom menyusuri alur
                desktopTl.to(".desktop-airplane", {
                    motionPath: {
                        path: "#desktop-path",
                        align: "#desktop-path",
                        alignOrigin: [0.5, 0.5],
                        autoRotate: false
                    },
                    ease: "none",
                    duration: 1
                }, 0);

                // Putar logo kustom secara berkelanjutan sepanjang scroll
                desktopTl.to(".desktop-airplane .logo-spin", {
                    rotation: 1080,
                    ease: "none",
                    duration: 1
                }, 0);

                // Efek sorot kartu aktif secara dinamis untuk seluruh N item (termasuk card dan header)
                const stepDur = 1 / N;
                for (let i = 0; i < N; i++) {
                    const startPos = i / N;
                    const fadeOutPos = (i + 0.8) / N;

                    desktopTl.to(`.j-card-${i}`, {
                        opacity: 1,
                        scale: 1,
                        pointerEvents: "auto",
                        duration: stepDur * 0.2
                    }, startPos);

                    if (i < N - 1) {
                        desktopTl.to(`.j-card-${i}`, {
                            opacity: 0.15,
                            scale: 0.95,
                            pointerEvents: "none",
                            duration: stepDur * 0.2
                        }, fadeOutPos);
                    }
                }

            }, containerRef);
        };

        const timer = setTimeout(initGSAP, 250);

        const handleResize = () => {
            initGSAP();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("resize", handleResize);
            if (gsapCtx) gsapCtx.revert();
        };
    }, []);

    // Paths generated dynamically
    const desktopPathString = generatePath(N, 1000, 550, 80, 920);
    const mobilePathString = `M 25,0 L 25,${timelineHeight}`;

    return (
        <section
            id="journey"
            ref={containerRef}
            className="relative bg-[#121212] text-[#e8e8e3] md:py-32 py-12"
        >
            {/* Title - Padded and centered */}
            <div className="max-w-6xl mx-auto px-4 md:px-8 text-center md:mb-24 mb-12 z-20">
                <span className="text-xs uppercase tracking-widest text-[#e8e8e3]/60 font-semibold font-mono">
                    Experience & Recognition
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-2 text-white leading-tight">
                    My Journey
                </h2>
            </div>

            {/* Timeline container - Automatically scales in height based on item count, fluid width matching other sections */}
            <div
                className="relative journey-timeline-container w-full px-4 md:px-8 flex flex-col gap-8 md:block md:mx-auto"
                style={{
                    height: mounted && !isMobile ? `${timelineHeight}px` : "auto"
                }}
            >

                {/* DESKTOP PATH & PLANE */}
                <div className="absolute inset-0 w-full h-full hidden md:block pointer-events-none">
                    <svg className="w-full h-full" viewBox={`0 0 1000 ${timelineHeight}`} preserveAspectRatio="none">
                        <path
                            id="desktop-path"
                            d={desktopPathString}
                            fill="none"
                            stroke="rgba(232, 232, 227, 0.15)"
                            strokeWidth="3.5"
                            strokeDasharray="8 6"
                        />
                    </svg>
                    {/* GANTI LOGO ANDA DI SINI / REPLACE YOUR LOGO HERE: Menggunakan logo kustom logoscroll.svg */}
                    <div className="desktop-airplane absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-18 h-18 pointer-events-none z-0">
                        <img src="/img/scroll/logoscroll.svg" alt="Logo" className="w-full h-full logo-spin" />
                    </div>
                </div>

                {/* CARDS LIST WITH FLOATING SECTION HEADERS */}
                {journeyItems.map((item, index) => {
                    const isLeft = item.side === "left";
                    const exp = item.data;

                    // Center the card vertically around the S-curve apex
                    const cardTopOffset = (index + 0.5) * heightPerStep - 150;

                    // Conditionally render Experience Header above the first experience card (index 0)
                    const showExpHeader = index === 0;
                    // Conditionally render Achievement Header above the first achievement card
                    const showAchHeader = index === firstAchievementIndex;

                    return (
                        <Fragment key={item.id}>
                            {showExpHeader && (
                                <div
                                    className="relative w-full md:absolute md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-none text-center px-4 md:px-0 transition-all duration-300 z-10"
                                    style={{
                                        top: mounted && !isMobile ? "40px" : "auto"
                                    }}
                                >
                                    <div className="inline-block">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                                            Work Experience
                                        </h3>
                                    </div>
                                    <div className="w-12 h-[2px] bg-white/10 mx-auto mt-4 md:hidden"></div>
                                </div>
                            )}

                            {showAchHeader && (
                                <div
                                    className="relative w-full md:absolute md:left-1/2 md:-translate-x-1/2 md:w-auto md:max-w-none text-center px-4 md:px-0 transition-all duration-300 z-10 mt-4 md:mt-0"
                                    style={{
                                        top: mounted && !isMobile ? `${firstAchievementIndex * heightPerStep - 45}px` : "auto"
                                    }}
                                >
                                    <div className="inline-block">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                                            Achievements & Awards
                                        </h3>
                                    </div>
                                    <div className="w-12 h-[2px] bg-white/10 mx-auto mt-4 md:hidden"></div>
                                </div>
                            )}

                            <div
                                className={`journey-card j-card-${index} relative w-full md:absolute md:w-[48%] max-w-3xl p-6 md:p-10 rounded-2xl bg-[#181818]/90 backdrop-blur-md border border-gray-700/40 shadow-2xl transition-all duration-300 z-10 ${isLeft
                                    ? "md:left-[2%] md:right-auto"
                                    : "md:right-[2%] md:left-auto"
                                    }`}
                                style={{
                                    top: mounted && !isMobile ? `${cardTopOffset}px` : "auto"
                                }}
                            >
                                {/* Marker for reference */}
                                <div className="marker absolute inset-0 rounded-2xl pointer-events-none"></div>

                                {item.type === "experience" ? (
                                    // EXPERIENCE CARD CONTENT
                                    <>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                            <div>
                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase bg-white/10 text-[#e8e8e3] mb-2">
                                                    {exp.type}
                                                </span>
                                                <h3 className="text-xl md:text-3xl font-bold text-white leading-snug">
                                                    {exp.role}
                                                </h3>
                                                <p className="text-sm md:text-base font-semibold text-[#e8e8e3]/80 mt-0.5">
                                                    {exp.company}
                                                </p>
                                            </div>
                                            <div className="text-left sm:text-right text-xs font-mono text-[#e8e8e3]/50">
                                                {exp.period}
                                            </div>
                                        </div>

                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                                            {exp.description}
                                        </p>

                                        {/* Highlights */}
                                        {exp.highlights && exp.highlights.length > 0 && (
                                            <ul className="space-y-1.5 mb-5">
                                                {exp.highlights.map((highlight, idx) => (
                                                    <li key={idx} className="text-sm text-[#e8e8e3]/70 flex items-start gap-2">
                                                        <span className="text-[#e8e8e3]/40 mt-1">•</span>
                                                        <span className="leading-relaxed">{highlight}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Optional Certificate or Project Image */}
                                        {exp.image && (
                                            <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5 border border-white/10 group/img cursor-zoom-in" onClick={() => setLightboxSrc(exp.image)}>
                                                <img
                                                    src={exp.image}
                                                    alt={exp.role}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                                                />
                                            </div>
                                        )}

                                        {/* Tech Stack */}
                                        {exp.skills && exp.skills.length > 0 && (
                                            <div className="border-t border-white/5 pt-4">
                                                <div className="flex flex-wrap items-center gap-1.5">
                                                    <span className="text-[9px] text-gray-500 uppercase font-mono tracking-wider mr-1.5">
                                                        Skills:
                                                    </span>
                                                    {exp.skills.map((tech) => {
                                                        const techData = techIcons[tech];
                                                        if (!techData) return null;
                                                        const IconComponent = techData.icon;
                                                        return (
                                                            <div
                                                                key={tech}
                                                                className="flex items-center gap-1 bg-white/5 border border-white/5 rounded px-2 py-0.5"
                                                                title={techData.name}
                                                            >
                                                                <IconComponent className="w-3 h-3" style={{ color: techData.color }} />
                                                                <span className="text-[9px] text-gray-400 font-mono">
                                                                    {techData.name}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    // ACHIEVEMENT CARD CONTENT
                                    <>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm text-[#e8e8e3]/55 uppercase tracking-wider font-semibold font-mono">
                                                {exp.subtitle}
                                            </span>
                                            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase bg-white/10 text-[#e8e8e3]">
                                                {exp.category}
                                            </span>
                                        </div>

                                        <h3 className="text-xl md:text-3xl font-bold text-white mb-3 leading-snug">
                                            {exp.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
                                            {exp.description}
                                        </p>

                                        {/* Optional Certificate or Project Images */}
                                        {exp.images && exp.images.length > 0 ? (
                                            <div className={`grid ${exp.images.length > 1 ? 'grid-cols-2 gap-3' : 'grid-cols-1'} mb-4`}>
                                                {exp.images.map((img, imgIdx) => (
                                                    <div key={imgIdx} className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10 group/img cursor-zoom-in" onClick={() => setLightboxSrc(img)}>
                                                        <img
                                                            src={img}
                                                            alt={`${exp.title} - ${imgIdx + 1}`}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : exp.image && (
                                            <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 border border-white/10 group/img cursor-zoom-in" onClick={() => setLightboxSrc(exp.image)}>
                                                <img
                                                    src={exp.image}
                                                    alt={exp.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                                                />
                                            </div>
                                        )}

                                        {exp.highlight && (
                                            <div className="mt-4 pt-4 border-t border-white/5">
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                                    <span className="text-xs text-emerald-400/90 font-mono font-medium">
                                                        {exp.highlight}
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Tech Stack */}
                                        {exp.skills && exp.skills.length > 0 && (
                                            <div className="border-t border-white/5 pt-4 mt-4">
                                                <div className="flex flex-wrap items-center gap-1.5">
                                                    <span className="text-[9px] text-gray-500 uppercase font-mono tracking-wider mr-1.5">
                                                        Skills:
                                                    </span>
                                                    {exp.skills.map((tech) => {
                                                        const techData = techIcons[tech];
                                                        if (!techData) {
                                                            return (
                                                                <div
                                                                    key={tech}
                                                                    className="flex items-center gap-1 bg-white/5 border border-white/5 rounded px-2 py-0.5"
                                                                >
                                                                    <span className="text-[9px] text-gray-400 font-mono capitalize">
                                                                        {tech}
                                                                    </span>
                                                                </div>
                                                            );
                                                        }
                                                        const IconComponent = techData.icon;
                                                        return (
                                                            <div
                                                                key={tech}
                                                                className="flex items-center gap-1 bg-white/5 border border-white/5 rounded px-2 py-0.5"
                                                                title={techData.name}
                                                            >
                                                                <IconComponent className="w-3 h-3" style={{ color: techData.color }} />
                                                                <span className="text-[9px] text-gray-400 font-mono">
                                                                    {techData.name}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </Fragment>
                    );
                })}
            </div>

            {/* LIGHTBOX MODAL */}
            {lightboxSrc && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out animate-fade-in"
                    onClick={() => setLightboxSrc(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light transition-colors z-10"
                        onClick={() => setLightboxSrc(null)}
                        aria-label="Close lightbox"
                    >
                        ✕
                    </button>
                    <img
                        src={lightboxSrc}
                        alt="Preview"
                        className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </section>
    );
}
