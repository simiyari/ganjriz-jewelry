"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { asset } from "@/lib/asset";

/**
 * صفحهٔ ورودیِ سایت (Intro Splash) — مینیمال و لوکس.
 *
 * یک پردهٔ سفیدِ تمام‌صفحه که هنگامِ ورود به سایت، روی صفحهٔ اصلی (هدر + هیرو)
 * می‌نشیند و فقط لوگو، وردمارک GANJRIZ JEWELLERY، شعار، و دو انتخابِ
 * «مردانه / زنانه» را نشان می‌دهد. با انتخاب هر کدام:
 *
 *   ۱) محتوای پرده کمی بالا می‌رود و محو می‌شود،
 *   ۲) خودِ پردهٔ سفید کمی «زوم» می‌شود و fade out می‌گردد،
 *   ۳) هم‌زمان صفحهٔ اصلی (که زیرِ پرده از قبل رندر شده) از scale 1.06 سرِ جای
 *      خود می‌نشیند — حسِ «وارد شدن به سایت با دوربین».
 *
 * چون صفحهٔ واقعی از همان ابتدا زیرِ پرده وجود دارد، با محو شدنِ پرده،
 * هدر و هیرو نرم از زیرش بیرون می‌آیند → ترنزیشنِ یکپارچه بین پرده و هدر.
 *
 * موتورِ انیمیشن GSAP است (از قبل در پروژه نصب) با easingِ نمایی برای نرمیِ لوکس.
 * با prefers-reduced-motion همهٔ حرکت‌ها حذف و فقط یک fadeِ کوتاه اجرا می‌شود.
 *
 * گیتِ نمایش: فقط وقتی «بارگذاریِ کاملِ صفحه» روی صفحهٔ اصلی (`/`) رخ دهد. یعنی
 * reload یا ورودِ مستقیم به خانه پرده را می‌آورد، اما ری‌لودِ صفحاتِ دیگر یا ناوبریِ
 * داخلیِ SPA به خانه آن را نمی‌آورد. چون کامپوننت در root layout می‌ماند، مسیرِ
 * لحظهٔ نخستین mount («صفحهٔ فرود») را ثبت می‌کنیم؛ این فقط با reload از نو محاسبه
 * می‌شود. انتخابِ جنسیت در sessionStorage (`gj_gender`) برای استفادهٔ بعدی ذخیره می‌شود.
 */

const GENDER_KEY = "gj_gender";

type Gender = "men" | "women";

export default function IntroSplash() {
  const pathname = usePathname();
  const lenis = useLenis();

  // «صفحهٔ فرود» — مسیرِ لحظهٔ نخستین mount. چون کامپوننت در root layout می‌ماند،
  // این فقط با یک reloadِ واقعی از نو محاسبه می‌شود؛ ناوبریِ داخلیِ SPA تغییرش نمی‌دهد.
  // پس پرده تنها وقتی می‌آید که صفحهٔ فرود خودِ خانه باشد.
  const landedOnHomeRef = useRef<boolean | null>(null);
  if (landedOnHomeRef.current === null) {
    landedOnHomeRef.current = pathname === "/";
  }
  const landedOnHome = landedOnHomeRef.current;

  // SSR و اولین رندرِ کلاینت هر دو پرده را «نمایان» می‌سازند تا hydration mismatch
  // پیش نیاید؛ سپس با انتخابِ کاربر، انیمیشن‌وار برداشته می‌شود.
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const chosenRef = useRef(false);

  // ── راه‌اندازی: قفلِ اسکرول + انیمیشنِ ورود (فقط وقتی پرده واقعاً نمایش داده می‌شود) ──
  useEffect(() => {
    if (!landedOnHome || !show) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // قفلِ اسکرول تا وقتی پرده روی صفحه است.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    // انیمیشنِ ورود — لوگو، وردمارک، شعار و انتخاب‌ها پلکانی و نرم بالا می‌آیند.
    let tl: gsap.core.Timeline | undefined;
    const items = contentRef.current?.querySelectorAll<HTMLElement>(".intro-item");
    if (!reduced && items && items.length) {
      gsap.set(items, { opacity: 0, y: 26 });
      tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(items, { opacity: 1, y: 0, duration: 1.05, stagger: 0.14 }, 0.12);
    }

    return () => {
      tl?.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, [landedOnHome, show, lenis]);

  if (!landedOnHome || !show) return null;

  // ── خروج: زومِ نرمِ پرده + نشستنِ صفحهٔ اصلی سرِ جا ──
  const handleChoose = (gender: Gender) => {
    if (chosenRef.current) return; // جلوگیری از دابل‌کلیک
    chosenRef.current = true;
    setLeaving(true);

    try {
      sessionStorage.setItem(GENDER_KEY, gender);
    } catch {
      /* حالتِ خصوصیِ مرورگر — بی‌خیال */
    }

    const overlay = overlayRef.current;
    const content = contentRef.current;
    const pageRoot = document.getElementById("page-root");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      if (pageRoot) gsap.set(pageRoot, { clearProps: "all" });
      document.body.style.overflow = "";
      // اسکرول را آزاد کن (هیرو دیگر قفل نمی‌کند) و به هیرو خبر بده که حالا — با
      // تأخیری مناسب — می‌تواند متنش را نرم ظاهر کند.
      lenis?.start();
      window.dispatchEvent(new Event("gj:intro-done"));
      setShow(false);
    };

    if (reduced) {
      gsap.to(overlay, { opacity: 0, duration: 0.35, ease: "power1.out", onComplete: finish });
      return;
    }

    // مرکزِ زوم باید دقیقاً مرکزِ ویوپورت باشد. چون صفحه در بالا قفل است (scrollY=0)،
    // مرکزِ عمودیِ دیده‌شده برابرِ نیمهٔ ارتفاعِ ویوپورت از بالای page-root است؛ وگرنه
    // transform-origin پیش‌فرض (۵۰٪ از ارتفاعِ کلِ صفحه) بسیار پایین‌ترِ صفحه می‌افتد
    // و زوم از وسطِ دیده‌شده حس نمی‌شود. (overlay چون fixed/تمام‌صفحه است، خودش
    // مرکزش مرکزِ ویوپورت است.)
    const originY = Math.round(window.innerHeight / 2);

    const tl = gsap.timeline({ onComplete: finish });

    // ۱) محتوای پرده کمی بالا می‌رود و محو می‌شود.
    tl.to(content, { opacity: 0, y: -30, scale: 1.06, duration: 0.6, ease: "power2.in" }, 0);

    // ۲) صفحهٔ اصلی از زیر، از scale 1.1 و از مرکزِ ویوپورت سرِ جای خود می‌نشیند (push-in نرم).
    //    هم‌زمان با محوِ پرده (۱.۳s) تمام می‌شود تا بازهٔ مرده/قفل پس از رفتنِ سفید نسازد.
    if (pageRoot) {
      gsap.set(pageRoot, {
        transformOrigin: `50% ${originY}px`,
        willChange: "transform, opacity",
      });
      tl.fromTo(
        pageRoot,
        { scale: 1.1, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "expo.out" },
        0.1,
      );
    }

    // ۳) خودِ پردهٔ سفید از مرکز کمی بیشتر زوم می‌شود و هم‌زمان محو می‌گردد و صفحه را
    //    آشکار می‌کند. زوم با power2.inOut (نرم)، اما محوْ «خطی» (ease none) است تا
    //    «محوِ دیده‌شده» دقیقاً با پایانِ تایم‌لاین یکی شود؛ وگرنه دُمِ کندِ ease-out
    //    باعث می‌شد سفید زودتر نامرئی شود ولی اسکرول ~۲۵۰ms دیرتر آزاد گردد (حسِ قفل).
    tl.to(overlay, { scale: 1.2, duration: 1.1, ease: "power2.inOut", transformOrigin: "50% 50%" }, 0.2);
    tl.to(overlay, { opacity: 0, duration: 1.1, ease: "none" }, 0.2);
  };

  return (
    <div
      id="intro-splash"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="ورود به گنج‌ریز"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-white ${
        leaving ? "pointer-events-none" : ""
      }`}
      style={{
        // عمقِ بسیار ظریف — سفیدِ خالص با هاله‌ای صدفی در مرکز
        backgroundImage:
          "radial-gradient(120% 90% at 50% 38%, #ffffff 0%, #ffffff 55%, #fafafa 100%)",
      }}
    >
      <div ref={contentRef} className="flex flex-col items-center px-6 text-center">
        {/* لوگو */}
        <img
          src={asset("/logo.png")}
          alt="گنج‌ریز"
          width={96}
          height={96}
          className="intro-item h-20 w-auto select-none sm:h-24"
          draggable={false}
        />

        {/* وردمارک — لوگوتایپِ تزئینیِ پردهٔ ورود، نه عنوانِ صفحه. عمداً <p> است (نه h1)
            تا با h1ِ واقعیِ Hero رقابت نکند و صفحه دو h1 نداشته باشد؛ نامِ این دیالوگ را
            aria-label («ورود به گنج‌ریز») می‌دهد. */}
        <p
          className="intro-item font-trajan mt-7 whitespace-nowrap font-bold uppercase leading-none tracking-[0.1em] sm:tracking-[0.18em]"
          style={{ color: "#2c2c2c", fontSize: "clamp(20px, 5.5vw, 36px)" }}
        >
          GANJRIZ JEWELLERY
        </p>

        {/* شعار */}
        <p className="intro-item font-en mt-3.5 text-[clamp(9px,2.6vw,12px)] font-medium uppercase tracking-[0.32em] text-ink/55">
          THE LAST STEP OF LUXURY
        </p>

        {/* انتخابِ مردانه / زنانه */}
        <div className="intro-item mt-12 flex items-stretch gap-7 sm:mt-14 sm:gap-10">
          <Choice en="MEN" fa="مردانه" onClick={() => handleChoose("men")} />
          <span aria-hidden="true" className="my-1 w-px bg-line" />
          <Choice en="WOMEN" fa="زنانه" onClick={() => handleChoose("women")} />
        </div>
      </div>
    </div>
  );
}

/** یک انتخابِ ورود — اعلانِ لاتینِ کوچک + واژهٔ فارسی، با هاورِ طلایی و خطِ زیرین.
 *  عمداً auto-focus ندارد تا تا وقتی موس روی گزینه نرفته، چیزی هایلایت نشود؛
 *  استایلِ طلایی فقط با hover (موس) یا focus-visible (کیبورد) ظاهر می‌شود. */
function Choice({
  en,
  fa,
  onClick,
}: {
  en: string;
  fa: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-28 flex-col items-center gap-2.5 py-2 outline-none sm:w-32"
    >
      <span className="font-en text-[10px] font-medium uppercase tracking-[0.28em] text-muted transition-colors duration-500 ease-out group-hover:text-[#b5a414] group-focus-visible:text-[#b5a414]">
        {en}
      </span>
      <span className="relative inline-block text-xl font-medium text-ink transition-colors duration-500 ease-out group-hover:text-[#b5a414] group-focus-visible:text-[#b5a414] sm:text-2xl">
        {fa}
        <span
          aria-hidden="true"
          className="absolute -bottom-2 inset-x-0 mx-auto h-px origin-center scale-x-0 bg-[#b5a414] transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </span>
    </button>
  );
}
