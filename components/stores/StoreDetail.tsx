"use client";

import { useState } from "react";
import Link from "next/link";
import { STORE_LOCATOR, type Store } from "@/lib/site-data";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  MapPinIcon,
  MailIcon,
  PhoneIcon,
  DirectionsIcon,
} from "@/components/ui/icons";

const EASE = "cubic-bezier(0.4,0,0.2,1)";

// دکمه‌های پنل — هم‌سبکِ مرجع: outline (فقط هاورِ مرز تیره) و پُرِ تیره (CTA).
const BTN_BASE =
  "flex h-11 w-full items-center justify-center gap-2.5 text-[13px] font-medium tracking-[0.03em] transition-colors duration-300 ease-out";
const BTN_OUTLINE = `${BTN_BASE} border border-[#d0d0d0] text-ink hover:border-[#2d2d2d]`;
const BTN_SOLID = `${BTN_BASE} bg-ink font-semibold tracking-[0.06em] text-white hover:bg-[#2d2d2d]`;

/**
 * پنلِ جزئیاتِ یک شعبه — هم در ستونِ میانیِ دسکتاپ و هم در پوششِ تمام‌صفحهٔ موبایل
 * به‌کار می‌رود. دکمهٔ بازگشت (onBack) انتخاب را پاک می‌کند.
 */
export default function StoreDetail({
  store,
  onBack,
}: {
  store: Store;
  onBack: () => void;
}) {
  const [hoursOpen, setHoursOpen] = useState(true);
  const typeLabel = STORE_LOCATOR.typeLabels[store.type];

  return (
    <div className="px-6 pb-12 pt-6 md:px-8">
      {/* بازگشت — در RTL فلش رو به راست = برگشت */}
      <button
        type="button"
        onClick={onBack}
        aria-label="بازگشت به فهرستِ شعبه‌ها"
        className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors duration-300 ease-out hover:border-ink"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>

      <h2 className="mt-6 text-[24px] font-semibold leading-snug text-ink md:text-[26px]">
        {store.name}
      </h2>
      <p className="mt-1.5 text-[13px] text-muted">{typeLabel}</p>

      {/* نشانی */}
      <div className="mt-5 flex items-start gap-2.5 text-[14px] leading-7 text-muted">
        <MapPinIcon className="mt-1 h-[18px] w-[18px] shrink-0 text-ink" />
        <span>{store.address}</span>
      </div>

      {/* ایمیل */}
      <div className="mt-3 flex items-center gap-2.5 text-[14px] text-muted">
        <MailIcon className="h-[18px] w-[18px] shrink-0 text-ink" />
        <a
          href={`mailto:${store.email}`}
          dir="ltr"
          className="underline decoration-line underline-offset-4 transition-colors duration-300 ease-out hover:text-accent-dark hover:decoration-accent-dark"
        >
          {store.email}
        </a>
      </div>

      {/* دکمه‌ها */}
      <div className="mt-7 space-y-3">
        <a href={`tel:${store.phoneLink}`} className={BTN_OUTLINE}>
          <PhoneIcon className="h-[18px] w-[18px]" />
          <span dir="ltr">{store.phone}</span>
        </a>
        <a
          href={store.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={BTN_OUTLINE}
        >
          <DirectionsIcon className="h-[18px] w-[18px]" />
          {STORE_LOCATOR.directionsCta}
        </a>
        <Link href={STORE_LOCATOR.appointmentHref} className={BTN_SOLID}>
          {STORE_LOCATOR.appointmentCta}
        </Link>
      </div>

      {/* ساعاتِ کاری — جمع‌شونده، پیش‌فرض باز */}
      <div className="mt-8 border-t border-line pt-6">
        <button
          type="button"
          onClick={() => setHoursOpen((v) => !v)}
          aria-expanded={hoursOpen}
          className="flex w-full items-center justify-between text-[12px] font-semibold uppercase tracking-[0.12em] text-ink"
        >
          {STORE_LOCATOR.hoursTitle}
          <ChevronDownIcon
            className={`h-4 w-4 text-muted transition-transform duration-500 ${
              hoursOpen ? "rotate-180" : ""
            }`}
            style={{ transitionTimingFunction: EASE }}
          />
        </button>
        <div
          className={`grid transition-all duration-500 ${
            hoursOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
          style={{ transitionTimingFunction: EASE }}
        >
          <div className="overflow-hidden">
            <ul className="pt-4">
              {store.hoursWeek.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between py-2 text-[14px]"
                >
                  <span className="text-ink">{h.day}</span>
                  <span className="text-muted">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
