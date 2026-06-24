"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { preloadImage } from "../../lib/preloadImage";
import { useLoading } from "./LoadingContext";

export default function LoadingScreen() {
    const overlayRef = useRef(null);
    const textRef = useRef(null);
    const [done, setDone] = useState(false);
    const [percent, setPercent] = useState(0);
    const { setDone: setGlobalDone } = useLoading();

    useEffect(() => {
        const overlay = overlayRef.current;
        const text = textRef.current;

        if (!overlay || !text) return undefined;

        // Kunci scroll saat loading
        document.body.classList.add("loading-lock");

        // Set state awal animasi
        gsap.set(".loading-column", { y: 0 });
        gsap.set(text, { opacity: 1, y: 0 });

        const finish = () => {
            // Hindari double-call
            if (finish.called) return;
            finish.called = true;

            const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

            const tl = gsap.timeline({
                onComplete: () => {
                    document.body.classList.remove("loading-lock");
                    setDone(true);
                    setGlobalDone(true);
                }
            });

            if (isMobile) {
                // Efek satu section utuh bergeser ke atas untuk mobile (tanpa gap/lag)
                tl.to(text, { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" })
                  .to(
                      overlay,
                      {
                          y: "-100%",
                          duration: 0.5,
                          ease: "power2.inOut"
                      },
                      "-=0.1"
                  );
            } else {
                // Fade out text first, then stagger columns slide-up from right to left (untuk desktop)
                tl.to(text, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" })
                  .to(
                      ".loading-column",
                      {
                          y: "-100%",
                          duration: 0.8,
                          ease: "power3.inOut",
                          stagger: {
                              each: 0.1,
                              from: "end"
                          }
                      },
                      "-=0.2"
                  );
            }
        };

        // Preload hanya gambar hero agar loading lebih cepat
        const assets = ["/img/hero.webp"];
        let loadedCount = 0;
        const total = assets.length;

        // Use shared preload util to avoid duplicate loads across components

        // Start with small percent to show progress
        setPercent(5);

        let safetyTimer;
        Promise.all(
            assets.map((url) =>
                preloadImage(url).then(() => {
                    loadedCount += 1;
                    const p = Math.round((loadedCount / total) * 100);
                    gsap.to({}, { duration: 0.25, onUpdate: () => setPercent(p) });
                })
            )
        ).then(() => {
            // assets done; animate percent to 100 and finish immediately (no window load blocking)
            gsap.to({ val: percent }, {
                val: 100,
                duration: 0.5,
                ease: 'power2.out',
                onUpdate() {
                    const v = Math.round(this.targets()[0].val);
                    setPercent(v);
                },
                onComplete() {
                    finish();
                },
            });
        });
        // Fallback timeout agar tidak stuck
        safetyTimer = setTimeout(() => {
            if (!finish.called) {
                finish();
            }
        }, 9000);

        return () => {
            clearTimeout(safetyTimer);
        };
    }, []);

    if (done) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] text-white flex items-center justify-center pointer-events-auto"
        >
            {/* Background Columns */}
            <div className="absolute inset-0 flex overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div
                        key={i}
                        className={`loading-column h-full bg-[#0b0b0f] ${
                            i === 0 ? "w-full md:w-[20.5%]" : "hidden md:block md:w-[20.5%]"
                        }`}
                    />
                ))}
            </div>

            {/* Text Overlay */}
            <div className="relative z-10 w-full max-w-xl space-y-5 text-center">
                <div className="text-2xl font-semibold tracking-wide text-neutral-200" ref={textRef}>
                    Loading {percent}%
                </div>
            </div>
        </div>
    );
}
