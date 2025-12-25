"use client";

import Image from "next/image";
// import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback } from "react";
import { useLoading } from "./LoadingContext";

export default function Hero() {
    // const { done } = useLoading();
    return (
        <section className="min-h-screen flex flex-col justify-center items-center bg-[#e8e8e3] text-gray-800 px-4 md:px-8 py-16">
            <div className="w-full flex items-center justify-center text-center mb-16 md:mb-24">
                <svg
                    viewBox="0 0 1430 200"
                    className="w-screen h-auto"
                >
                    <text
                        x="50%"
                        y="70%"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="fill-gray-800"
                        fontSize="clamp(10rem, 10vw, 10.5rem)"
                        fontFamily="sans-serif"
                        fontWeight="750"
                    >
                        NANANG MARVIN
                    </text>
                </svg>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
                <div className="md:col-span-1 text-center md:text-left">
                    <p className="text-lg md:text-4xl text-gray-800 leading-relaxed">
                        Open to job opportunities worldwide.
                        Passionate about building polished,
                        intuitive, and thoughtful digital
                        experiences that leave a mark.
                    </p>
                    <button
                        className="mt-8 bg-gray-800 text-lg text-[#e8e8e3] uppercase font-bold px-6 py-3 rounded-full shadow-md hover:shadow-xl hover:cursor-pointer transition"
                        onClick={useCallback(() => {
                            const contactSection = document.getElementById("contact");
                            if (contactSection) {
                                contactSection.scrollIntoView({ behavior: "smooth" });
                            }
                        }, [])}
                    >
                        Contact
                    </button>
                </div>

                <div className="flex justify-center items-center">
                    <div className="flex justify-center items-center mt-8">
                        <div className="max-w-md w-full">
                            <Image
                                src="/img/hero.webp"
                                alt="Nanang Marvin Portrait"
                                width={300}
                                height={300}
                                className="rounded-lg object-cover w-full h-auto"
                                style={{ width: "100%", height: "auto" }}
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1 text-center md:text-right">
                    <p className="text-lg md:text-2xl font-semibold text-primary mb-2">
                        Currently Available
                    </p>
                    <p className="text-lg md:text-xl text-gray-800">
                        For Freelance Projects & Collaborations
                    </p>
                </div>
            </div>
        </section>
    );
}
