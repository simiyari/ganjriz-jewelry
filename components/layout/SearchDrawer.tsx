"use client";

import { useEffect, useRef } from "react";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";

/* ──────────────────────────────────────────────
   کشوی جستجو — با کلیک روی آیکونِ جستجو از سمتِ راست (هم‌سمتِ آیکون) سُر می‌خورد.
   عرض ۶۵۰px مثلِ بقیهٔ کشوها (سبد خرید) و حاشیهٔ کناریِ محتوا ۴۰px (px-10).
   فاز ۱ — فقط UI؛ ارسالِ فرم فعلاً جستجوی واقعی انجام نمی‌دهد.
   ────────────────────────────────────────────── */

export default function SearchDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  // قفلِ اسکرولِ صفحه + بستن با Esc + فوکوس روی ورودی، فقط وقتی باز است
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => inputRef.current?.focus(), 300);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
      inert={!open}
    >
      {/* پوشش — کلیک برای بستن */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-ink/45 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* پنل — از سمتِ راست سُر می‌خورد، عرضِ ۶۵۰px، حاشیهٔ کناریِ ۴۰px */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="جستجو"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[650px] flex-col bg-background px-10 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open
            ? "translate-x-0 shadow-[0_0_80px_-20px_rgba(0,0,0,0.45)]"
            : "translate-x-full"
        }`}
      >
        {/* بستن — بالای پنل، سمتِ راست (لبهٔ بیرونی) */}
        <div className="flex justify-start pt-5">
          <button
            type="button"
            onClick={onClose}
            aria-label="بستنِ جستجو"
            className="-ms-2 grid h-9 w-9 place-items-center text-ink transition-colors duration-300 hover:text-accent-dark"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* فیلدِ جستجو — خطِ زیرین، با آیکونِ ذره‌بین */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-5 flex items-center gap-3 border-b border-[#d0d0d0] pb-2 transition-colors duration-300 hover:border-[#2d2d2d] focus-within:border-[#2d2d2d]"
        >
          <input
            ref={inputRef}
            type="search"
            placeholder="دنبالِ چه می‌گردید؟"
            className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            type="submit"
            aria-label="جستجو"
            className="grid h-9 w-9 shrink-0 place-items-center text-ink transition-colors duration-300 hover:text-accent-dark"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
        </form>
      </aside>
    </div>
  );
}
