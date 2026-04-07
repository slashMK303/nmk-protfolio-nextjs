'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Turnstile } from '@marsidev/react-turnstile';
import Toast from './Toast';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null);
    const [toast, setToast] = useState({ message: '', type: 'success' });
    const turnstileRef = useRef(null);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onCaptchaSuccess = (token) => {
        setCaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!captchaToken) {
            setToast({ message: 'Mohon selesaikan verifikasi keamanan (Turnstile) terlebih dahulu.', type: 'error' });
            return;
        }

        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, captchaToken }),
            });

            const result = await res.json();

            if (!res.ok) {
                setToast({ message: result.error || 'Gagal mengirim pesan. Silakan coba lagi.', type: 'error' });
                // Reset Turnstile on error
                turnstileRef.current?.reset();
                setCaptchaToken(null);
            } else {
                setToast({ message: 'Pesan Anda berhasil dikirim! Saya akan segera membalasnya.', type: 'success' });
                setFormData({ name: '', email: '', message: '' });
                // Reset Turnstile on success
                turnstileRef.current?.reset();
                setCaptchaToken(null);
            }
        } catch (err) {
            setToast({ message: 'Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.', type: 'error' });
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-[#e8e8e8] py-24 relative overflow-hidden">
            {/* Elegant Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] pointer-events-none -z-0"></div>

            <Toast 
                message={toast.message} 
                type={toast.type} 
                onClose={() => setToast({ message: '', type: 'success' })} 
            />

            <div className="relative z-10 h-full text-center md:p-14 p-6 mx-4 md:mx-12 rounded-[3rem] bg-[#121212] shadow-[0_0_80px_rgba(0,0,0,0.4)] border border-white/5">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl lg:text-9xl font-black text-[#e8e8e8] mb-20 uppercase tracking-tighter leading-none"
                >
                    let's make<br /> it happen
                </motion.h2>
                
                <form
                    onSubmit={handleSubmit}
                    className="bg-white/[0.02] backdrop-blur-3xl max-w-2xl p-10 md:p-16 rounded-[2.5rem] shadow-2xl border border-white/10 stagger-item mx-auto"
                >
                    <h3 className="text-4xl font-bold mb-10 text-[#e8e8e8] text-left leading-tight">Send me a message.</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="text-left">
                            <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3 ml-1">Your Identity</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-6 py-5 bg-white/5 text-[#e8e8e8] border border-white/10 rounded-2xl outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                                required
                            />
                        </div>
                        <div className="text-left">
                            <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3 ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="name@domain.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-6 py-5 bg-white/5 text-[#e8e8e8] border border-white/10 rounded-2xl outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-12 text-left">
                        <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-3 ml-1">Your Narrative</label>
                        <textarea
                            name="message"
                            placeholder="How can I help you bring your ideas to life?"
                            value={formData.message}
                            onChange={handleChange}
                            rows="5"
                            className="w-full px-6 py-5 bg-white/5 text-[#e8e8e8] border border-white/10 rounded-2xl outline-none resize-none focus:border-white/30 focus:bg-white/10 transition-all duration-300"
                            required
                        ></textarea>
                    </div>

                    {/* Cloudflare Turnstile (Full Free for Life) */}
                    <div className="mb-12 flex justify-center md:justify-start">
                        <div className="overflow-hidden rounded-xl">
                            <Turnstile
                                ref={turnstileRef}
                                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"} // Use placeholder or standard test key
                                onSuccess={onCaptchaSuccess}
                                options={{ theme: 'dark' }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-12 py-6 rounded-[1.5rem] text-lg font-black w-full md:w-auto transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ${
                                isSubmitting 
                                ? 'bg-white/10 text-white/20 cursor-not-allowed' 
                                : 'bg-[#e8e8e3] text-[#121212] hover:bg-white hover:shadow-white/10 active:scale-95'
                            }`}
                            whileHover={!isSubmitting ? { scale: 1.05, y: -5 } : {}}
                            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-3">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    TRANSMITTING...
                                </span>
                            ) : 'SEND INQUIRY'}
                        </motion.button>
                        
                        <p className="text-white/20 text-[11px] font-medium tracking-wide uppercase md:text-left text-center leading-relaxed">
                            Protected by Cloudflare ecosystem.<br className="hidden md:block"/> No data tracking involved.
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}
