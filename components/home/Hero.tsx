"use client";

import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site-data";
import { DiscoverLink } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";

/**
 * هیروی صفحهٔ اصلی — متنِ روی ویدیو خودش (بدونِ نیاز به اسکرول) با تایمینگِ نرم
 * ظاهر می‌شود و صفحه آزادانه اسکرول می‌شود (نه scroll-jack و نه قفلِ اسکرول).
 *
 * هماهنگی با پردهٔ ورودی (IntroSplash):
 *   • تا وقتی پردهٔ سفید روی صفحه است، تایمرِ ظهورِ متن «شروع نمی‌شود» تا متن پشتِ
 *     پرده از قبل ظاهر نشده باشد. پرده در پایانِ خروج رویدادِ `gj:intro-done` را
 *     می‌فرستد؛ هیرو با شنیدنِ آن و یک تأخیرِ مناسب، خط‌ها را پلکانی نرم می‌آورد.
 *   • اگر اصلاً پرده‌ای در کار نباشد (مثلاً ورود از طریقِ ناوبریِ داخلیِ SPA به خانه)،
 *     هیرو خودش با تأخیری کوتاه پس از mount متن را می‌آورد.
 *
 * انیمیشنِ هر خط «زمان‌محور» است (CSS transition در globals.css، کلاسِ .hero-line)
 * با مقادیرِ یکسان با بقیهٔ سایت. با prefers-reduced-motion خط‌ها از طریقِ CSS
 * همیشه نمایان‌اند و هیچ تایمری اجرا نمی‌شود.
 */
const HERO_VIDEO = "/hero.mp4";
const HERO_POSTER = "/hero.jpg";

// فاصلهٔ پلکانیِ ظهورِ هر خط نسبت به خطِ قبل.
const STEP_STAGGER_MS = 200;
// تأخیرِ مناسب پس از «اتمامِ ورود» (محو شدنِ پرده) تا متن نرم بیاید.
const AFTER_INTRO_DELAY_MS = 200;
// تأخیرِ کوتاه وقتی پرده‌ای در کار نیست (ورود مستقیم بدونِ پرده).
const NO_INTRO_DELAY_MS = 350;

// بازخوانیِ صفحه همیشه از بالا شروع شود (نه بازگردانیِ موقعیتِ قبلیِ مرورگر).
if (typeof window !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const lines = Array.from(content.querySelectorAll<HTMLElement>(".hero-line"));
    if (lines.length === 0) return;

    // با prefers-reduced-motion خط‌ها از طریقِ CSS همیشه نمایان‌اند — کاری لازم نیست.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timers: number[] = [];

    // خط‌ها را یکی‌یکی (پلکانی) نرم ظاهر کن.
    const revealStagger = () => {
      lines.forEach((el, i) => {
        timers.push(window.setTimeout(() => el.classList.add("is-in"), i * STEP_STAGGER_MS));
      });
    };

    // اگر پردهٔ ورودی روی صفحه است، تا «اتمامِ ورود» صبر کن؛ وگرنه مستقیم شروع کن.
    const splashPresent = !!document.getElementById("intro-splash");
    const onIntroDone = () => {
      timers.push(window.setTimeout(revealStagger, AFTER_INTRO_DELAY_MS));
    };

    if (splashPresent) {
      window.addEventListener("gj:intro-done", onIntroDone, { once: true });
    } else {
      timers.push(window.setTimeout(revealStagger, NO_INTRO_DELAY_MS));
    }

    return () => {
      window.removeEventListener("gj:intro-done", onIntroDone);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <section className="hero-shell w-full bg-ink-deep">
      {/* ویدیوی پس‌زمینه — بی‌صدا، خودکار، تکرارشونده (سازگار با iOS)؛ بدونِ زوم */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={asset(HERO_POSTER)}
        aria-hidden="true"
      >
        <source src={asset(HERO_VIDEO)} type="video/mp4" />
      </video>

      {/* پوشش گرادیانی فقط از پایین تا محدودهٔ متن — بالای تصویر شفاف می‌ماند */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div
        ref={contentRef}
        className="container-lux relative flex h-full flex-col items-center justify-end pb-16 text-center md:pb-24"
      >
        <span dir="ltr" className="hero-line eyebrow-en-light mb-3.5">
          {SITE.nameLatin} FINE JEWELRY
        </span>
        <h1 className="hero-line max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
          {SITE.tagline}
        </h1>
        <p className="hero-line mt-4 max-w-md text-[15px] leading-8 text-white/80">
          مجموعه‌ای از طلا و جواهرات دست‌ساز، با قیمت‌گذاری شفاف بر اساس نرخ روز طلا
        </p>
        <div className="hero-line mt-7 text-white">
          <DiscoverLink href="/products" tone="white">
            مشاهدهٔ مجموعه
          </DiscoverLink>
        </div>
      </div>
    </section>
  );
}
