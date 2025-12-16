import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialize GSAP ScrollTrigger with Lenis optimization
 * This should be called once in your layout or root component
 */
export const initializeScrollTrigger = () => {
    // Ensure ScrollTrigger is updated with Lenis scroll events
    ScrollTrigger.defaults({
        // Increase responsiveness for better Lenis integration
        scroller: window,
        markers: false,
        // Better animation timing with Lenis
        ease: 'power3.inOut',
    });

    // Refresh ScrollTrigger on window resize
    const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
    });

    resizeObserver.observe(document.documentElement);

    return () => {
        resizeObserver.disconnect();
    };
};

/**
 * Utility to add scroll trigger with Lenis
 */
export const createScrollTrigger = (selector, options = {}) => {
    return ScrollTrigger.create({
        trigger: selector,
        ...options,
    });
};
