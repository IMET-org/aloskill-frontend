import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  typedRoutes: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties:
      process.env.NODE_ENV === "production"
        ? {
            properties: ["^data-testid$"], // Remove test attributes in prod
          }
        : false,
  },

  // === Image Optimizations ===
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],

    unoptimized: false,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: `default-src 'self'; script-src 'none'; sandbox;`,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },

  // === Development & Tooling ===
  eslint: {
    dirs: ["src", "app", "pages", "components", "lib", "hooks", "utils"],
  },
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: "./tsconfig.json",
  },

  // === Experimental Features ===
  experimental: {
    optimizePackageImports: [],
    // optimizePackageImports: ['lucide-react', '@headlessui/react', '@heroicons/react'],
  },

  // === Security Headers ===
  async headers() {
    return [
      // {
      //   source: '/api/:path*',
      //   headers: [
      //     { key: 'Access-Control-Allow-Credentials', value: 'true' },
      //     { key: 'Access-Control-Allow-Origin', value: process.env["NEXT_PUBLIC_BACKEND_API_URL"] },
      //   ],
      // },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/api/(.*)",
        headers: apiSecurityHeaders,
      },
      {
        source: "/_next/static/(.*)",
        headers: staticSecurityHeaders,
      },
      {
        source: "/learn/:path*/video/:path*",
        headers: videoSecurityHeaders,
      },
      // === COURSE MATERIAL PROTECTION ===
      {
        source: "/learn/:path*/content/:path*",
        headers: contentSecurityHeaders,
      },
      // === PDF/DOCUMENT PROTECTION ===
      {
        source: "/learn/:path*/documents/:path*",
        headers: documentSecurityHeaders,
      },
      // === ASSESSMENT/QUIZ PROTECTION ===
      {
        source: "/learn/:path*/assessments/:path*",
        headers: assessmentSecurityHeaders,
      },
    ];
  },

  // === Redirects (Example) ===
  // Disable redirects in production unless explicitly defined
  async redirects() {
    const productionRedirects =
      process.env.NODE_ENV === "production"
        ? []
        : [
            {
              source: "/home",
              destination: "/",
              permanent: true,
            },
          ];

    return productionRedirects;
  },

  // === API Security ===
  async rewrites() {
    // No rewrites to external domains in production
    if (process.env.NODE_ENV === "production") {
      return [];
    }

    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },

  // === Environment Variables ===
  env: {
    APP_VERSION: process.env["npm_package_version"],
    BUILD_TIME: new Date().toISOString(),
    BACKEND_URL: process.env["BACKEND_URL"] || "http://localhost:3001",
  },

  // === Webpack Optimizations ===
  // webpack: config => {
  //   // Optimize package imports
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     "@/components": "./src/components",
  //     "@/lib": "./src/lib",
  //     "@/hooks": "./src/hooks",
  //     "@/utils": "./src/utils",
  //     "@/types": "./src/types",
  //     "@/styles": "./src/styles",
  //   };

  //   return config;
  // },
};

const securityHeaders = [
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' ${
        process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""
      };
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      img-src 'self' data: https: blob:;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' http://localhost:5000/;
      frame-ancestors 'none';
      frame-src 'none',
      object-src 'none',
      base-uri 'self';
      form-action 'self';
      upgrade-insecure-requests;
    `
      .replace(/\s{2,}/g, " ")
      .trim(),
  },
  // "connect-src 'self' https://your-api.com https://checkout.sslcommerz.com wss://your-websocket.com",
  // XSS Protection
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // MIME Type Sniffing Protection
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Frame Options
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // Referrer Policy
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Permissions Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

if (process.env.NODE_ENV === "production") {
  securityHeaders.push({
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  });
}

const apiSecurityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Robots-Tag",
    value: "noindex, nofollow",
  },
];

const staticSecurityHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

// Video-specific security
const videoSecurityHeaders = [
  {
    key: "Cache-Control",
    value: "private, no-cache, no-store, must-revalidate, max-age=0",
  },
  { key: "Pragma", value: "no-cache" },
  { key: "Expires", value: "0" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Accept-Ranges", value: "bytes" }, // Allow video seeking
];

// Document security (PDFs, PPT, Word docs, etc.)
const documentSecurityHeaders = [
  {
    key: "Cache-Control",
    value: "private, no-cache, no-store, must-revalidate, max-age=0",
  },
  { key: "Pragma", value: "no-cache" },
  { key: "Expires", value: "0" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Content-Disposition", value: "inline" }, // or 'attachment' to force download
  {
    key: "Content-Security-Policy",
    value: "object-src 'none'; plugin-types 'none';", // Block plugins that might open docs
  },
];

// Course content security (HTML, text content)
const contentSecurityHeaders = [
  {
    key: "Cache-Control",
    value: "private, no-cache, must-revalidate, max-age=300", // 5 min cache for content
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
];

// Assessment/Quiz security
const assessmentSecurityHeaders = [
  {
    key: "Cache-Control",
    value: "private, no-cache, no-store, must-revalidate, max-age=0",
  },
  { key: "Pragma", value: "no-cache" },
  { key: "Expires", value: "0" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Content-Security-Policy",
    value: "script-src 'self'; object-src 'none'", // Strict CSP for assessments
  },
];

export default nextConfig;
