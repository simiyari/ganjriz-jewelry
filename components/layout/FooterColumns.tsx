"use client";

import { useState } from "react";
import Link from "next/link";
import { FOOTER_COLUMNS, SOCIAL_LINKS } from "@/lib/site-data";
import { SOCIAL_ICONS } from "@/components/ui/icons";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/** ستون لینک — در موبایل آکاردونی (کلیک روی تیتر باز/بسته می‌کند)،
 *  در دسکتاپ همیشه باز و چیدمان عادی ستونی. چیدمان همیشه start (راست در RTL). */
function AccordionItem({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/10 sm:border-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-start sm:pointer-events-none sm:py-0"
      >
        <h3 className="text-[13px] font-semibold text-white">{title}</h3>
        <Chevron
          className={`h-4 w-4 shrink-0 text-white/50 transition-transform duration-300 sm:hidden ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* محتوای جمع‌شونده — ترفند grid-rows برای انیمیشن نرم ارتفاع */}
      <div
        className={`grid transition-all duration-300 ease-out sm:grid-rows-[1fr] sm:opacity-100 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-5 pt-1 text-start sm:pb-0 sm:pt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function FooterColumns() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (key: string) =>
    setOpenKey((prev) => (prev === key ? null : key));

  return (
    <div className="container-lux py-10 sm:grid sm:grid-cols-2 sm:gap-10 sm:py-14 lg:grid-cols-4">
      {/* ستون‌های لینک — آکاردونی در موبایل */}
      {FOOTER_COLUMNS.map((col) => (
        <AccordionItem
          key={col.title}
          title={col.title}
          open={openKey === col.title}
          onToggle={() => toggle(col.title)}
        >
          <ul className="flex flex-col gap-3">
            {col.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="footer-link text-[13px] text-white/60 transition-colors duration-300 ease-out hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionItem>
      ))}

      {/* شبکه‌های اجتماعی + آدرس — همیشه باز (خارج از آکاردون) */}
      <div className="pt-8 sm:pt-0">
        <h3 className="mb-5 text-[13px] font-semibold text-white">ما را دنبال کنید</h3>
        <div className="mb-6 flex items-center gap-3">
          {SOCIAL_LINKS.map((s) => {
            const Icon = SOCIAL_ICONS[s.icon];
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors duration-300 ease-out hover:border-[#b5a414] hover:text-[#b5a414]"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
        <p className="text-[13px] leading-7 text-white/55">
          تهران، خیابان جواهری، پلاک ۱۸
          <br />
          <span dir="ltr" className="inline-block">
            ۰۲۱ ۱۲۳ ۴۵۶۷
          </span>
        </p>
      </div>
    </div>
  );
}
