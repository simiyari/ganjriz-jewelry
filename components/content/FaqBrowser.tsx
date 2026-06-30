"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@/components/ui/icons";
import HubSidebar from "./HubSidebar";
import type { FaqCategory } from "@/lib/faq";

// همان easing و الگوی آکاردئونِ صفحهٔ محصول (ProductDetail) — یکپارچه با کلِ سایت
const EASE = "cubic-bezier(0.4,0,0.2,1)";

/**
 * صفحهٔ سوالات متداول — چیدمانِ دو-پنل، RTL.
 * سایدبارِ دسته‌ها سمتِ راست (اولین ستونِ گرید در RTL)، آکاردئونِ پرسش‌ها سمتِ چپ.
 * موبایل: دسته‌ها به‌صورتِ ردیفِ افقیِ اسکرول‌شونده بالای محتوا می‌نشینند.
 */
export default function FaqBrowser({
  categories,
}: {
  categories: readonly FaqCategory[];
}) {
  const [activeId, setActiveId] = useState(categories[0].id);
  // اندیسِ پرسش‌های باز — هنگامِ ورود و تعویضِ دسته، همه بسته‌اند
  const [open, setOpen] = useState<number[]>([]);

  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  const selectCat = (id: string) => {
    setActiveId(id);
    setOpen([]);
  };
  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <div className="container-lux grid gap-10 pb-10 pt-0 lg:grid-cols-[240px_1fr] lg:gap-16 lg:py-[60px]">
      {/* ── سایدبار (در RTL سمتِ راست) ── */}
      {/* سایدبار — موبایل: آکاردئون؛ key با تغییرِ دسته آن را می‌بندد */}
      <HubSidebar key={activeId} title="سوالات متداول">
        <nav aria-label="دسته‌بندیِ پرسش‌ها" className="flex w-full flex-col gap-3.5">
          {categories.map((c) => {
            const isActive = c.id === activeId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => selectCat(c.id)}
                aria-current={isActive ? "true" : undefined}
                className={`text-start text-[14px] transition-colors duration-200 ${
                  isActive
                    ? "font-medium text-ink underline decoration-ink underline-offset-[6px]"
                    : "text-muted hover:text-ink"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="inline-flex h-11 w-fit items-center justify-center bg-ink px-8 text-[12px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 ease-out hover:bg-[#2d2d2d]"
        >
          تماس با ما
        </Link>
      </HubSidebar>

      {/* ── محتوا (در RTL سمتِ چپ) ── */}
      <div>
        <h2 className="text-[26px] font-semibold leading-snug text-ink md:text-[32px]">
          {active.label}
        </h2>

        <div className="mt-8">
          {active.items.map((item, i) => {
            const isOpen = open.includes(i);
            return (
              <div
                key={item.q}
                className={`group/acc border-b border-line transition-colors duration-300 ${isOpen ? "" : "hover:border-ink"}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className={`flex w-full items-center justify-between gap-5 py-4 text-start ${isOpen ? "border-b border-line transition-colors duration-300 group-hover/acc:border-ink" : ""}`}
                >
                  <h3 className="text-[16px] font-semibold leading-snug text-ink">{item.q}</h3>
                  <ChevronDownIcon
                    aria-hidden
                    className={`h-4 w-4 shrink-0 text-muted transition-transform duration-500 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    style={{ transitionTimingFunction: EASE }}
                  />
                </button>

                {/* پاسخ — انیمیشنِ نرمِ ارتفاع با grid-rows */}
                <div
                  inert={!isOpen}
                  className={`grid transition-all duration-500 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                  style={{ transitionTimingFunction: EASE }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pt-5 text-[15px] leading-8 text-muted">
                      {item.a}
                      {item.link && (
                        <Link
                          href={item.link.href}
                          className="mt-3 inline-block text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
                        >
                          {item.link.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
