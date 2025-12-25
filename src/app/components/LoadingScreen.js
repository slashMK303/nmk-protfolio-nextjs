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
        gsap.set(overlay, { y: 0 });
        gsap.set(text, { opacity: 1, y: 0 });

        const finish = () => {
            // Hindari double-call
            if (finish.called) return;
            finish.called = true;

            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
            tl.to(text, { opacity: 0.6, y: -6, duration: 0.6 })
                .to(
                    overlay,
                    {
                        y: "-100%",
                        duration: 0.9,
                        ease: "power3.inOut",
                        delay: 0.2,
                        onComplete: () => {
                            document.body.classList.remove("loading-lock");
                            setDone(true);
                            setGlobalDone(true);
                        },
                    },
                    "<"
                );
        };

        // Preload hanya gambar hero agar loading lebih cepat
        const assets = ["/img/hero.webp"];
        let loadedCount = 0;
        const total = assets.length;

        // Use shared preload util to avoid duplicate loads across components

        const pageLoadPromise = new Promise((resolve) => {
            if (document.readyState === "complete") {
                resolve();
            } else {
                window.addEventListener("load", resolve, { once: true });
            }
        });

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
            // assets done; wait for page load as final step
            pageLoadPromise.then(() => {
                // ensure percent reaches 100 before finish, animate increase
                gsap.to({ val: percent }, {
                    val: 100,
                    duration: 0.8,
                    ease: 'power2.out',
                    onUpdate() {
                        // round current value
                        const v = Math.round(this.targets()[0].val);
                        setPercent(v);
                    },
                    onComplete() {
                        finish();
                    },
                });
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
            className="fixed inset-0 z-[9999] bg-[#0b0b0f] text-white flex items-center justify-center px-6"
        >
            <div className="w-full max-w-xl space-y-5 text-center">
                <div className="text-2xl font-semibold tracking-wide text-neutral-200" ref={textRef}>
                    Loading {percent}%
                </div>
            </div>
        </div>
    );
}
