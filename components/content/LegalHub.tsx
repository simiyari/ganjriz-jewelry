"use client";

import { useState } from "react";
import Link from "next/link";
import HubSidebar from "./HubSidebar";
import { ChevronDownIcon } from "@/components/ui/icons";
import { CONTENT_PAGES, LEGAL_ORDER } from "@/lib/content-pages";
import { faDigits } from "@/lib/format";

// همان easing نرمِ آکاردئون‌های سایت
const EASE = "cubic-bezier(0.4,0,0.2,1)";

/**
 * هابِ «حقوقی و حریم خصوصی» (/legal/[section]) — چیدمانِ دو-پنل، RTL.
 * سایدبارِ صفحاتِ حقوقی سمتِ راست (لینک به /legal/<id>)، محتوای صفحهٔ فعال سمتِ چپ:
 * عنوان + مقدمه + بخش‌ها به‌صورتِ آکاردئونِ شماره‌دار (عیناً الگوی FAQ — همه بسته،
 * هاور فقط خطِ زیر را تیره می‌کند).
 */
export default function LegalHub({ activeId }: { activeId: string }) {
  const data = CONTENT_PAGES[activeId] ?? CONTENT_PAGES.privacy;
  const [open, setOpen] = useState<number[]>([]);
  const toggle = (i: number) =>
    setOpen((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  return (
    <div className="container-lux grid gap-10 pb-10 pt-0 lg:grid-cols-[240px_1fr] lg:gap-16 lg:py-[60px]">
      {/* سایدبار */}
      <HubSidebar title="حقوقی و حریم خصوصی">
        <nav aria-label="صفحاتِ حقوقی" className="flex w-full flex-col gap-3.5">
          {LEGAL_ORDER.map((id) => {
            const isActive = id === activeId;
            return (
              <Link
                key={id}
                href={`/legal/${id}`}
                aria-current={isActive ? "page" : undefined}
                className={`text-start text-[14px] transition-colors duration-200 ${
                  isActive
                    ? "font-medium text-ink underline decoration-ink underline-offset-[6px]"
                    : "text-muted hover:text-ink"
                }`}
              >
                {CONTENT_PAGES[id].crumb}
              </Link>
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

      {/* محتوا */}
      <div>
        <h2 className="text-[26px] font-semibold leading-snug text-ink md:text-[32px]">
          {data.title}
        </h2>
        {data.intro && (
          <p className="mt-4 text-[15px] leading-8 text-muted">{data.intro}</p>
        )}
        {data.updated && (
          <p className="mt-3 text-[12px] tracking-wide text-muted">
            آخرین به‌روزرسانی: {data.updated}
          </p>
        )}

        {/* بخش‌ها — آکاردئونِ شماره‌دار */}
        <div className="mt-8">
          {data.sections.map((s, i) => {
            const isOpen = open.includes(i);
            return (
              <div
                key={s.heading}
                className={`group/acc border-b border-line transition-colors duration-300 ${isOpen ? "" : "hover:border-ink"}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className={`flex w-full items-center justify-between gap-5 py-4 text-start ${isOpen ? "border-b border-line transition-colors duration-300 group-hover/acc:border-ink" : ""}`}
                >
                  <h3 className="text-[16px] font-semibold leading-snug text-ink">
                    {faDigits(i + 1)}. {s.heading}
                  </h3>
                  <ChevronDownIcon
                    aria-hidden
                    className={`h-4 w-4 shrink-0 text-muted transition-transform duration-500 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    style={{ transitionTimingFunction: EASE }}
                  />
                </button>

                <div
                  inert={!isOpen}
                  className={`grid transition-all duration-500 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                  style={{ transitionTimingFunction: EASE }}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-4 pb-6 pt-5 text-[15px] leading-8 text-muted">
                      {s.paragraphs?.map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                      {s.bullets && (
                        <ul className="space-y-2.5">
                          {s.bullets.map((b, j) => (
                            <li key={j} className="relative ps-5">
                              <span
                                aria-hidden
                                className="absolute start-0 top-[14px] h-1.5 w-1.5 rounded-full bg-gold"
                              />
                              {b}
                            </li>
                          ))}
                        </ul>
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
