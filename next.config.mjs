/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // Apply these headers to all routes to allow Turnstile/Cloudflare widgets
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value:
                            "default-src 'self'; " +
                            "script-src 'self' https://challenges.cloudflare.com https://static.cloudflareinsights.com 'unsafe-inline'; " +
                            "connect-src 'self' https://challenges.cloudflare.com https://api.resend.com https://api.github.com; " +
                            "frame-src https://challenges.cloudflare.com; " +
                            "img-src 'self' data: https://challenges.cloudflare.com; " +
                            "style-src 'self' 'unsafe-inline';"
                    },
                    {
                        key: 'Permissions-Policy',
                        // Disable WebXR spatial tracking to silence related warnings
                        value: 'xr-spatial-tracking=()'
                    }
                ]
            }
        ];
    }
};

export default nextConfig;
