import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// فونت فارسی — ایران‌یکان (variable font، اعداد فارسی)
const iranYekan = localFont({
  variable: "--font-fa",
  display: "swap",
  src: [
    { path: "../public/fonts/iran-yekan/IRANYekanXVFaNumVF.woff2", weight: "100 900", style: "normal" },
  ],
});

// فونت انگلیسی/لاتین — Inter (variable font)
const inter = localFont({
  variable: "--font-en",
  display: "swap",
  src: [
    { path: "../public/fonts/inter/InterVariable.woff2", weight: "100 900", style: "normal" },
    { path: "../public/fonts/inter/InterVariable-Italic.woff2", weight: "100 900", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "گنج‌ریز | جواهری آنلاین طلا و جواهر",
    template: "%s | گنج‌ریز",
  },
  description:
    "گنج‌ریز، جواهری آنلاین طلا و جواهرات لوکس با قیمت‌گذاری لحظه‌ای بر اساس نرخ روز طلا. انگشتر، گردنبند، دستبند، گوشواره و سکه.",
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
      className={`${iranYekan.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full bg-background text-ink antialiased">{children}</body>
    </html>
  );
}
