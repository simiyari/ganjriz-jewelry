import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const vazirmatn = localFont({
  variable: "--font-vazir",
  display: "swap",
  src: [
    { path: "../public/fonts/Vazirmatn-Thin.woff2", weight: "100", style: "normal" },
    { path: "../public/fonts/Vazirmatn-Light.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/Vazirmatn-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Vazirmatn-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Vazirmatn-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Vazirmatn-Bold.woff2", weight: "700", style: "normal" },
    { path: "../public/fonts/Vazirmatn-Black.woff2", weight: "900", style: "normal" },
  ],
});

// فونت نمایشی لاتین (مطابق فیگما — تیترها و لوگوتایپ)
const oswald = localFont({
  variable: "--font-oswald",
  display: "swap",
  src: [
    { path: "../public/fonts/oswald-300.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/oswald-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/oswald-500.woff2", weight: "500", style: "normal" },
  ],
});

// فونت بدنهٔ لاتین (مطابق فیگما)
const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "../public/fonts/poppins-300.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/poppins-400.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/poppins-600.woff2", weight: "600", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "گنج‌ریز | بوتیک طلا و جواهر",
    template: "%s | گنج‌ریز",
  },
  description:
    "گنج‌ریز، بوتیک آنلاین طلا و جواهرات لوکس با قیمت‌گذاری لحظه‌ای بر اساس نرخ روز طلا. انگشتر، گردنبند، دستبند، گوشواره و سکه.",
  keywords: ["طلا", "جواهر", "انگشتر", "گردنبند", "دستبند", "گوشواره", "سکه", "گنج‌ریز"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${oswald.variable} ${poppins.variable} h-full`}
    >
      <body className="min-h-full bg-background text-ink antialiased">{children}</body>
    </html>
  );
}
