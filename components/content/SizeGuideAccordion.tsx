"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import { ContentBlockView } from "./ContentBlocks";
import type { SizeGroup } from "@/lib/content-pages";

// همان easing و الگوی آکاردئونِ صفحهٔ محصول/FAQ — یکپارچه با کلِ سایت
const EASE = "cubic-bezier(0.4,0,0.2,1)";

/**
 * آکاردئون‌های راهنمای سایز (انگشترها / دستبندها / گردنبندها) — مطابقِ رفرنس.
 * همه در ابتدا بسته‌اند؛ هر گروه با تپ باز می‌شود و بلوک‌های محتوای داخلش
 * (متن، دیاگرام، مراحل، نکات، جدول، دکمه) نمایش داده می‌شوند.
 */
export default function SizeGuideAccordion({ groups }: { groups: readonly SizeGroup[] }) {
  const [open, setOpen] = useState<string[]>([]);
  const toggle = (id: string) =>
    setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div>
      {groups.map((g) => {
        const isOpen = open.includes(g.id);
        // ساختار دقیقاً مثلِ آکاردئونِ FAQ/حقوقی: خطِ پایین روی wrapper (هاور تیره‌اش می‌کند)، دکمه py-4، محتوا pb-6
        return (
          <div
            key={g.id}
            className={`group/acc border-b border-line transition-colors duration-300 ${isOpen ? "" : "hover:border-ink"}`}
          >
            <button
              type="button"
              onClick={() => toggle(g.id)}
              aria-expanded={isOpen}
              className={`flex w-full items-center justify-between gap-5 py-4 text-start ${isOpen ? "border-b border-line transition-colors duration-300 group-hover/acc:border-ink" : ""}`}
            >
              <h3 className="text-[16px] font-semibold leading-snug text-ink">{g.label}</h3>
              <ChevronDownIcon
                aria-hidden
                className={`h-4 w-4 shrink-0 text-muted transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                style={{ transitionTimingFunction: EASE }}
              />
            </button>

            <div
              inert={!isOpen}
              className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              style={{ transitionTimingFunction: EASE }}
            >
              <div className="overflow-hidden">
                <div className="pb-6 pt-5">
                  {g.blocks.map((b, i) => (
                    <ContentBlockView key={i} block={b} first={i === 0} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
