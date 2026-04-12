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
                            "script-src 'self' https://challenges.cloudflare.com https://static.cloudflareinsights.com https://www.googletagmanager.com https://www.google-analytics.com https://cloud.umami.is 'unsafe-inline'; " +
                            "script-src-elem 'self' https://challenges.cloudflare.com https://static.cloudflareinsights.com https://www.googletagmanager.com https://www.google-analytics.com https://cloud.umami.is; " +
                            "connect-src 'self' https://challenges.cloudflare.com https://api.resend.com https://api.github.com https://www.google-analytics.com https://cloud.umami.is; " +
                            "frame-src https://challenges.cloudflare.com; " +
                            "img-src 'self' data: https://challenges.cloudflare.com https://www.google-analytics.com; " +
                            "style-src 'self' 'unsafe-inline';"
                    },
                    {
                        key: 'Permissions-Policy',
                        // Keep only recognized/necessary features to avoid browser warnings
                        value: 'xr-spatial-tracking=()'
                    }
                ]
            }
        ];
    }
};

export default nextConfig;
