"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────
   نقشهٔ کرج با کنترلِ زوم — فقط با نگه‌داشتنِ Ctrl + اسکرول زوم می‌شود.
   چرا؟ نقشهٔ امبدِ OpenStreetMap به‌صورتِ پیش‌فرض با چرخِ موس زوم می‌کند؛ پس
   هنگامِ اسکرولِ صفحه، اگر موس روی نقشه باشد به‌اشتباه زوم می‌شد. یک «پوششِ نگهبان»
   روی نقشه می‌گذاریم که چرخِ موس را می‌گیرد (اسکرول به خودِ صفحه می‌رسد، نه نقشه).
   وقتی کاربر Ctrl را نگه دارد، پوشش pointer-events:none می‌شود تا چرخِ موس به iframe
   برسد و نقشه زوم کند. کارتِ نشانی (children) بالای پوشش می‌نشیند و همیشه کلیک‌پذیر است.
   ────────────────────────────────────────────── */
export default function KarajMap({
  src,
  title,
  children,
}: {
  src: string;
  title: string;
  children?: React.ReactNode;
}) {
  // active = Ctrl نگه‌داشته شده → نقشه تعاملی (زوم با اسکرول)
  const [active, setActive] = useState(false);
  // hint = راهنمای کوتاهِ «Ctrl را نگه دارید» وقتی بدونِ Ctrl روی نقشه اسکرول شد
  const [hint, setHint] = useState(false);
  const hintTimer = useRef<number | null>(null);

  useEffect(() => {
    const sync = (e: KeyboardEvent) => setActive(e.ctrlKey || e.metaKey);
    const reset = () => setActive(false);
    window.addEventListener("keydown", sync);
    window.addEventListener("keyup", sync);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("keydown", sync);
      window.removeEventListener("keyup", sync);
      window.removeEventListener("blur", reset);
      if (hintTimer.current) window.clearTimeout(hintTimer.current);
    };
  }, []);

  function handleWheel(e: React.WheelEvent) {
    // با Ctrl، پوشش غیرفعال است و این هرگز فراخوانی نمی‌شود؛ این فقط برای اسکرولِ ساده است.
    if (e.ctrlKey || e.metaKey) return;
    setHint(true);
    if (hintTimer.current) window.clearTimeout(hintTimer.current);
    hintTimer.current = window.setTimeout(() => setHint(false), 1100);
  }

  return (
    <div className="relative h-[360px] w-full overflow-hidden bg-surface-alt md:h-[460px]">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="h-full w-full border-0 grayscale-[0.2]"
      />

      {/* پوششِ نگهبانِ زوم */}
      <div
        onWheel={handleWheel}
        aria-hidden
        className={`absolute inset-0 z-10 ${
          active ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-4 transition-opacity duration-300 ease-out ${
            hint ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="rounded-full bg-ink/85 px-4 py-2 text-[12px] font-medium text-white backdrop-blur-sm">
            برای بزرگ‌نمایی، کلید Ctrl را نگه دارید و اسکرول کنید
          </span>
        </div>
      </div>

      {children}
    </div>
  );
}
