'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
            setToast({ message: 'Harap selesaikan verifikasi keamanan terlebih dahulu.', type: 'error' });
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
                setToast({ message: result.error || 'Gagal mengirim pesan.', type: 'error' });
                turnstileRef.current?.reset();
                setCaptchaToken(null);
            } else {
                setToast({ message: 'Pesan berhasil dikirim!', type: 'success' });
                setFormData({ name: '', email: '', message: '' });
                turnstileRef.current?.reset();
                setCaptchaToken(null);
            }
        } catch (err) {
            setToast({ message: 'Terjadi kesalahan saat mengirim pesan.', type: 'error' });
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-[#e8e8e8]">
            <Toast 
                message={toast.message} 
                type={toast.type} 
                onClose={() => setToast({ message: '', type: 'success' })} 
            />

            <div className="h-full text-center md:p-10 p-4 mx-4 md:mx-8 rounded-2xl bg-gradient-to-b from-[#121212] to-[#414141]">
                <h2 className="text-4xl lg:text-9xl font-extrabold text-[#e8e8e8] mb-16 uppercase text-center">
                    let's make<br /> it happen
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="bg-[#121212] max-w-xl p-8 rounded-xl shadow-lg border border-[#4d4d4d] stagger-item mx-auto"
                >
                    <h3 className="text-4xl font-semibold mb-6 text-[#e8e8e8]">Say Hello</h3>
                    <div className="mb-12 text-left">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-[#e8e8e8] border border-[#4d4d4d] rounded-lg outline-none"
                            required
                        />
                    </div>
                    <div className="mb-12 text-left">
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 text-[#e8e8e8] border border-[#4d4d4d] rounded-lg outline-none"
                            required
                        />
                    </div>
                    <div className="mb-12 text-left">
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="6"
                            className="w-full px-4 py-3 text-[#e8e8e8] border border-[#4d4d4d] rounded-lg outline-none resize-y"
                            required
                        ></textarea>
                    </div>

                    {/* Turnstile Security Check */}
                    <div className="mb-10 flex justify-center md:justify-start">
                        <div className="overflow-hidden rounded-xl">
                            <Turnstile
                                ref={turnstileRef}
                                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                                onSuccess={onCaptchaSuccess}
                                options={{ theme: 'dark' }}
                            />
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#e8e8e8] text-[#121212] px-8 py-4 rounded-xl text-lg font-semibold w-full md:w-auto hover:cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                </form>
            </div>
        </section>
    );
}
