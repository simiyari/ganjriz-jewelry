"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { SITE } from "@/lib/site-data";
import { DiscoverLink } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";

/**
 * هیروی «یک‌اسکرول» (scroll-jacked reveal).
 *
 * فایل ویدیو: public/hero.mp4 (poster: hero.jpg).
 *
 * رفتار:
 *   • هنگامِ ورود به صفحه هیچ متنی دیده نمی‌شود و اسکرولِ صفحه موقتاً «قفل»
 *     می‌شود (Lenis pause + GSAP Observer).
 *   • با «اولین حرکتِ اسکرول» همهٔ خط‌ها با یک اسکرول، پشت‌سرهم (پلکانی) و با
 *     همان افکتِ بقیهٔ سایت ظاهر می‌شوند — نه چند اسکرولِ جدا برای هر خط.
 *   • به‌محضِ کامل‌شدنِ ظهورِ آخرین خط، Observer رها و Lenis دوباره فعال می‌شود؛
 *     از آن‌جا به بعد صفحه عادی اسکرول می‌شود و کاربر به پایینِ سایت می‌رود.
 *   • ویدیو بدونِ زوم، در اندازهٔ طبیعی پخش می‌شود (object-cover).
 *
 * انیمیشنِ هر خط «زمان‌محور» است (CSS transition, globals.css) با همان مقادیرِ
 * بقیهٔ سایت (.fx-reveal: 0.99s). با prefers-reduced-motion یا ورود از وسطِ صفحه:
 * بدونِ قفل، همه‌چیز نمایش داده می‌شود.
 */
const HERO_VIDEO = "/hero.mp4";
const HERO_POSTER = "/hero.jpg";

// مدتِ انیمیشنِ ظهورِ یک خط (≈ .fx-reveal: ۰٫۹۹s).
const LINE_ANIM_MS = 1050;
// فاصلهٔ پلکانیِ ظهورِ هر خط نسبت به خطِ قبل (همه با یک اسکرول، ولی یکی‌یکی).
const STEP_STAGGER_MS = 200;

// بازخوانیِ صفحه همیشه از بالا شروع شود (نه بازگردانیِ موقعیتِ قبلی مرورگر) تا
// هیرو درست از حالتِ «بدونِ متن» آغاز شود.
if (typeof window !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const lines = Array.from(content.querySelectorAll<HTMLElement>(".hero-line"));
    if (lines.length === 0) return;

    const showAll = () => lines.forEach((el) => el.classList.add("is-in"));

    // reduced-motion → بدونِ قفل، همه دیده شوند
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      showAll();
      return;
    }

    // برای قفلِ اسکرول حین ظهور به نمونهٔ Lenis نیاز است؛ تا آماده نشده، صبر کن
    // (افکت با تغییرِ lenis دوباره اجرا می‌شود).
    if (!lenis) return;

    gsap.registerPlugin(Observer);

    const N = lines.length;
    let triggered = false; // اولین اسکرول، رشتهٔ ظهور را شروع کرده؟
    let observer: Observer | undefined;
    const timers: number[] = [];

    const release = () => {
      observer?.kill();
      lenis.start(); // اسکرولِ عادی برمی‌گردد → کاربر به پایینِ سایت می‌رود
    };

    // اولین حرکتِ اسکرول: همهٔ خط‌ها را با یک اسکرول، پلکانی ظاهر کن و سپس
    // درست بعد از کامل‌شدنِ آخرین خط اسکرول را آزاد کن.
    const reveal = () => {
      if (triggered) return;
      triggered = true;
      lines.forEach((el, i) => {
        timers.push(window.setTimeout(() => el.classList.add("is-in"), i * STEP_STAGGER_MS));
      });
      const total = (N - 1) * STEP_STAGGER_MS + LINE_ANIM_MS;
      timers.push(window.setTimeout(release, total));
    };

    // قطعی از بالای صفحه شروع کن و اسکرول را تا پایانِ ظهورِ متن قفل کن
    lenis.scrollTo(0, { immediate: true });
    lenis.stop();

    observer = Observer.create({
      target: window,
      type: "wheel,touch",
      tolerance: 10,
      preventDefault: true,
      onUp: reveal, // هر حرکتِ اسکرول → شروعِ ظهورِ همهٔ خط‌ها (فقط بارِ اول اثر دارد)
      onDown: reveal,
    });

    // دسترس‌پذیریِ صفحه‌کلید — هر کلیدِ ناوبری همان رشتهٔ ظهور را آغاز می‌کند
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Spacebar", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        reveal();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener("keydown", onKey);
      observer?.kill();
      lenis.start(); // مبادا اسکرول قفل بماند
    };
  }, [lenis]);

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
