'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }) {
    useEffect(() => {
        // Initialize Lenis for smooth scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        // Update ScrollTrigger when Lenis scrolls
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis to GSAP ticker for better performance
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable default GSAP scroll behavior
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(ScrollTrigger.update);
        };
    }, []);

    return <>{children}</>;
}
