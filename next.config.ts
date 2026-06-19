import type { NextConfig } from "next";

// زیرمسیر فقط در بیلد production (برای GitHub Pages) فعال می‌شود؛
// در حالت توسعه (next dev) سایت از ریشه روی http://localhost:3000/ کار می‌کند.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/ganjriz-jewelry" : "";

const nextConfig: NextConfig = {
  // خروجی استاتیک برای انتشار روی GitHub Pages
  output: "export",
  // ریپو زیرمسیر است: https://<user>.github.io/ganjriz-jewelry
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    // فاز ۱ — تصاویر نمونه از Unsplash مستقیماً در مرورگر بارگذاری می‌شوند.
    // بهینه‌ساز سمت‌سرور Next برای میزبان‌هایی که در شبکهٔ داخلی به IP خصوصی
    // resolve می‌شوند خطای ۴۰۰ می‌دهد؛ با unoptimized این مشکل دور زده می‌شود.
    // پس از جایگزینی با تصاویر واقعی محصولات (local / Uploadthing) دوباره فعال شود.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
