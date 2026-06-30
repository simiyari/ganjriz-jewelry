"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";

// همان easing نرمِ آکاردئون‌های سایت (ProductDetail/FAQ)
const EASE = "cubic-bezier(0.4,0,0.2,1)";

/**
 * سایدبارِ مشترکِ هاب‌ها (سوالات متداول و خدمات مشتریان) — یکسان در هر دو.
 *
 * موبایل (< lg): نوارِ full-bleed با خطِ جداکننده. با تپ، پنل **سرِجا و روی صفحه**
 * باز می‌شود؛ انیمیشن فقط ارتفاعی است (grid-rows، نرم مثلِ بقیهٔ آکاردئون‌ها،
 * duration-500 + همان easing) — بدونِ فِید و بدونِ سایه. پشتش با bg-ink/45 تیره
 * می‌شود (تپ روی تیرگی می‌بندد).
 *
 * دسکتاپ (lg): همیشه باز و ستونی، بدونِ overlay/تیرگی/انیمیشن.
 */
export default function HubSidebar({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // قفلِ اسکرولِ صفحه وقتی باز است تا پنل و تیرگی هم‌تراز بمانند (مثلِ drawerها)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <aside className="relative flex flex-col">
      {/* تریگر — موبایل: نوارِ full-bleed با خطِ جداکننده؛ دسکتاپ: عنوانِ ثابت */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="relative z-40 -mx-4 flex items-center justify-between border-b border-line bg-background px-4 py-5 text-start md:-mx-6 md:px-6 lg:z-auto lg:mx-0 lg:border-0 lg:bg-transparent lg:p-0 lg:pointer-events-none"
      >
        <h1 className="text-[18px] font-semibold tracking-tight text-ink">{title}</h1>
        <ChevronDownIcon
          aria-hidden
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-500 lg:hidden ${
            open ? "rotate-180" : ""
          }`}
          style={{ transitionTimingFunction: EASE }}
        />
      </button>

      {/* تیرگیِ پس‌زمینه — فقط موبایل، مثلِ drawerهای سایت (bg-ink/45) */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-30 bg-ink/45 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* پنل — سرِجا روی صفحه؛ فقط ارتفاع باز می‌شود (نرم، بدونِ فِید و سایه) */}
      <div
        className={`absolute inset-x-0 top-full z-40 -mx-4 grid transition-[grid-template-rows] duration-500 md:-mx-6 lg:static lg:z-auto lg:mx-0 lg:grid-rows-[1fr] ${
          open ? "grid-rows-[1fr]" : "pointer-events-none grid-rows-[0fr] lg:pointer-events-auto"
        }`}
        style={{ transitionTimingFunction: EASE }}
      >
        <div className="overflow-hidden lg:overflow-visible">
          <div className="bg-background px-4 pb-7 pt-6 md:px-6 lg:bg-transparent lg:p-0 lg:pt-6">
            <div className="flex flex-col items-start gap-6">{children}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
