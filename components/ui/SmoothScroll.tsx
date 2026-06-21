"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * اسکرولِ نرم (Smooth Scroll) با Lenis — پایهٔ حسِ «گران و حرفه‌ای» سایت.
 *
 * Lenis موقعیتِ اسکرولِ بومیِ مرورگر را هر فریم با درون‌یابی نرم تنظیم می‌کند،
 * پس `window.scrollY`، رویدادهای `scroll`، `IntersectionObserver` (مثل RevealInit)
 * و `position: sticky/fixed` همگی سرِ جای خود کار می‌کنند — نیازی به بازنویسیِ
 * منطقِ اسکرولِ هدر یا اسکرول-ریویل نیست.
 *
 * نکته‌ها:
 *   • با `root` به <html> وصل می‌شود و هیچ wrapper اضافه‌ای به DOM نمی‌افزاید.
 *   • روی لمسی (موبایل) عمداً smooth را روشن نمی‌کنیم (syncTouch=false، پیش‌فرض)
 *     تا momentum بومیِ موبایل حفظ شود و اسکرول کند/چسبنده حس نشود.
 *   • با `prefers-reduced-motion: reduce` کلاً Lenis سوار نمی‌شود و اسکرولِ بومی
 *     برمی‌گردد (globals.css: html:not(.lenis) { scroll-behavior: smooth }).
 *   • `anchors: true` تا لینک‌های داخل‌صفحه (#...) در آینده هم نرم اسکرول شوند.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // احترام به prefers-reduced-motion — بدون Lenis، اسکرولِ بومیِ مرورگر
  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        // گلایدِ نرمِ لوکس — ease-out نمایی (همان منحنیِ مرجعِ Lenis)
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        anchors: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
