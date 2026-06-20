"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal دقیقاً مطابق Carrera y Carrera (carreraycarrera.com).
 *
 * مثل اسکریپت سراسری خودِ Carrera عمل می‌کند: یک IntersectionObserver واحد
 * تمام عناصری که کلاس `.fx-reveal` دارند را زیر نظر می‌گیرد و وقتی وارد دید
 * می‌شوند، با گامِ پلکانی ۲۵۰ms یکی‌یکی از پایین به بالا ظاهرشان می‌کند.
 *
 * چون چند عنصرِ هم‌ردیف (مثل ۴ کارتِ یک سطر) هم‌زمان از مرز عبور می‌کنند،
 * در یک callback دسته (batch) می‌شوند و «دونه‌دونه» بالا می‌آیند — همان حسی
 * که کاربر از Carrera می‌خواهد.
 *
 * مقادیر عیناً برابر Carrera:
 *   • حالت اولیه : opacity 0 + translateY(30px)            (globals.css)
 *   • transition: 0.99s cubic-bezier(0.5, 0, 0, 1)         (globals.css)
 *   • options   : { rootMargin: '-120px', threshold: 0.1 }
 *   • stagger   : setTimeout(..., 250 * index)
 */

const RATIO = 0.1;

export default function RevealInit() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".fx-reveal")
    );
    if (els.length === 0) return;

    // احترام به prefers-reduced-motion — همه را بی‌انیمیشن نمایش بده
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("fx-reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        // فقط آن‌هایی که واقعاً وارد دید شده‌اند، مرتب‌شده به ترتیب DOM
        // (تا گامِ پلکانی همیشه از ابتدای سطر/صفحه شروع شود)
        const shown = entries
          .filter((e) => e.intersectionRatio > RATIO)
          .sort((a, b) => {
            const pos = a.target.compareDocumentPosition(b.target);
            if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
            if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
            return 0;
          });

        shown.forEach((entry, index) => {
          setTimeout(() => {
            entry.target.classList.add("fx-reveal-visible");
          }, 250 * index);
          obs.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: "-120px", threshold: RATIO }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
