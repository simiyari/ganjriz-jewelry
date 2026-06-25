import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import IntroSplash from "@/components/ui/IntroSplash";
import { CartProvider } from "@/components/cart/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

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

// فونت وردمارک لوگو — Trajan Pro (لاتین، تمام‌حروفِ بزرگِ کتیبه‌ای)
const trajan = localFont({
  variable: "--font-trajan",
  display: "swap",
  src: [
    { path: "../public/fonts/trajan-pro/TrajanPro-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/trajan-pro/TrajanPro-Bold.otf", weight: "700", style: "normal" },
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
      className={`${iranYekan.variable} ${inter.variable} ${trajan.variable} h-full`}
    >
      <body className="min-h-full bg-background text-ink antialiased">
        {/* بدونِ جاوااسکریپت اصلاً پرده نمایش داده نشود تا سایت قابل‌استفاده بماند. */}
        <noscript>
          <style>{"#intro-splash{display:none!important}"}</style>
        </noscript>
        <CartProvider>
          <SmoothScroll>
            <div id="page-root">{children}</div>
            <IntroSplash />
          </SmoothScroll>
          {/* کشوی سبد خرید — یک‌بار، سراسری (استیتش در CartProvider می‌ماند) */}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
