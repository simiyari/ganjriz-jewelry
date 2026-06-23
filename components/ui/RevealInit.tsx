"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal الهام‌گرفته از Carrera y Carrera (carreraycarrera.com).
 *
 * عناصرِ `.fx-reveal` با IntersectionObserver زیر نظر گرفته می‌شوند و وقتی وارد دید
 * می‌شوند با گامِ پلکانی یکی‌یکی از پایین به بالا ظاهر می‌شوند. چند عنصرِ هم‌ردیف
 * (مثل ۴ کارتِ یک سطر) در یک batch «دونه‌دونه» بالا می‌آیند.
 *
 * ── «استپِ» اسکرول (data-reveal-step) ──────────────────────────────────────
 * هر عنصر یک «استپ» دارد: عددی که می‌گوید چند پلهٔ اسکرول دیرتر از پایه ظاهر شود.
 * برای هر استپ یک observerِ جدا با rootMarginِ پایینیِ عمیق‌تر ساخته می‌شود؛ پس
 * هرچه استپ بزرگ‌تر، کاربر باید بیشتر اسکرول کند تا آن عنصر بیاید. این کاملاً
 * وابسته به اسکرول است (نه تایمر) و برای پنل‌های کنارِ هم که در یک ارتفاعِ عمودی
 * نشسته‌اند هم درست کار می‌کند:
 *   • FeatureDuo: تیترِ پنلِ چپ استپ ۰، و تیترِ پنلِ راست استپ ۱ → پنلِ راست
 *     ۱ تا ۱.۵ پله اسکرول بعد از تیترِ چپ ظاهر می‌شود (بدونِ هیچ تأخیرِ زمانی).
 *
 * منبعِ استپِ هر عنصر:
 *   • data-reveal-step="N" صریح → همان N
 *   • وگرنه data-reveal-late داشته باشد → استپ ۱ (مرحلهٔ دومِ سرتیترها)
 *   • وگرنه → استپ ۰
 *
 * فاصلهٔ هر استپ:
 *   • حالت اولیه/transition : globals.css (opacity 0 + translateY(24px))
 *   • استپ ۰ : rootMargin '-120px'                      → زود
 *   • استپ ۱ : rootMargin پایین '-190px' (۱۲۰+۷۰)        → ≈۱ تا ۱.۵ پله بعد
 *   • استپ ۲ : rootMargin پایین '-260px' (۱۲۰+۱۴۰)       → ≈۱ تا ۱.۵ پله بعدتر
 */

const RATIO = 0.1;
const STAGGER_MS = 250;
// مبنای مرزِ بالایی/پایینی و افزایشِ هر استپ (px). هرچه عمیق‌تر، دیرتر ظاهر می‌شود.
const ROOT_BASE = 120;
const STEP_PX = 70;

/** rootMargin برای یک استپ — استپ ۰ همان '-120px'؛ استپ‌های بعدی پایینِ عمیق‌تر. */
const rootMarginForStep = (step: number) =>
  step <= 0
    ? `-${ROOT_BASE}px`
    : `-${ROOT_BASE}px 0px -${ROOT_BASE + STEP_PX * step}px 0px`;

/** استپِ یک عنصر: data-reveal-step صریح، وگرنه data-reveal-late=۱، وگرنه ۰. */
const stepOf = (el: HTMLElement) => {
  const explicit = el.dataset.revealStep;
  if (explicit != null && explicit !== "") return Number(explicit);
  return el.hasAttribute("data-reveal-late") ? 1 : 0;
};

/**
 * ترتیبِ نمایش در یک batch: بر اساسِ ترتیبِ DOM. عناصرِ یک گرید (که همگی یک استپ
 * دارند) دقیقاً به ترتیبِ DOM دونه‌دونه می‌آیند.
 */
const compareDom = (a: IntersectionObserverEntry, b: IntersectionObserverEntry) => {
  const pos = a.target.compareDocumentPosition(b.target);
  if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
  if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
  return 0;
};

/** عناصرِ یک batch را با گامِ پلکانیِ STAGGER_MS×index یکی‌یکی نمایش می‌دهد. */
const revealBatch = (
  entries: IntersectionObserverEntry[],
  obs: IntersectionObserver
) => {
  const shown = entries
    .filter((e) => e.intersectionRatio > RATIO)
    .sort(compareDom);
  shown.forEach((entry, index) => {
    const el = entry.target as HTMLElement;
    setTimeout(() => {
      el.classList.add("fx-reveal-visible");
    }, STAGGER_MS * index);
    obs.unobserve(el);
  });
};

export default function RevealInit() {
  useEffect(() => {
    const all = Array.from(
      document.querySelectorAll<HTMLElement>(".fx-reveal")
    );
    if (all.length === 0) return;

    // احترام به prefers-reduced-motion — همه را بی‌انیمیشن نمایش بده
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      all.forEach((el) => el.classList.add("fx-reveal-visible"));
      return;
    }

    // گروه‌بندیِ عناصر بر اساسِ استپ — برای هر استپ یک observerِ مستقل.
    const byStep = new Map<number, HTMLElement[]>();
    all.forEach((el) => {
      const step = stepOf(el);
      const bucket = byStep.get(step);
      if (bucket) bucket.push(el);
      else byStep.set(step, [el]);
    });

    const observers: IntersectionObserver[] = [];
    byStep.forEach((els, step) => {
      const obs = new IntersectionObserver(
        (entries, o) => revealBatch(entries, o),
        { root: null, rootMargin: rootMarginForStep(step), threshold: RATIO }
      );
      els.forEach((el) => obs.observe(el));
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
