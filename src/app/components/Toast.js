'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { HiCheckCircle, HiXCircle, HiInformationCircle } from 'react-icons/hi';

export default function Toast({ message, type = 'success', onClose, duration = 5000 }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, onClose, duration]);

    const icons = {
        success: <HiCheckCircle className="w-6 h-6 text-emerald-400" />,
        error: <HiXCircle className="w-6 h-6 text-rose-400" />,
        info: <HiInformationCircle className="w-6 h-6 text-blue-400" />,
    };

    const backgrounds = {
        success: 'bg-[#1a1a1a] border-emerald-500/20',
        error: 'bg-[#1a1a1a] border-rose-500/20',
        info: 'bg-[#1a1a1a] border-blue-500/20',
    };

    return (
        <AnimatePresence>
            {message && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-md px-4"
                >
                    <div className={`${backgrounds[type]} border rounded-2xl p-4 shadow-2xl flex items-center gap-4 backdrop-blur-xl`}>
                        <div className="flex-shrink-0">
                            {icons[type]}
                        </div>
                        <div className="flex-grow">
                            <p className="text-[#e8e8e8] font-medium text-sm">
                                {message}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/40 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
