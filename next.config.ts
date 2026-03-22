import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security Headers for XSS Protection
  headers: async () => {
    // Check if we're in development mode
    const isDev = process.env.NODE_ENV === 'development';
    
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Content-Security-Policy',
            value: isDev 
              ? "default-src 'self' 'unsafe-eval' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.canva.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: www.canva.com blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'self' https://www.canva.com; form-action 'self'; frame-src 'self' https://www.canva.com;"
              : "default-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.canva.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: www.canva.com blob:; font-src 'self'; connect-src 'self'; frame-ancestors 'self' https://www.canva.com; form-action 'self'; frame-src 'self' https://www.canva.com;"
          }
        ]
      }
    ];
  },
};

export default nextConfig;
