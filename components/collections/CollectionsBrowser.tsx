"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS } from "@/lib/site-data";
import { faNumber } from "@/lib/format";
import { asset } from "@/lib/asset";
import { GridOneIcon, GridFourIcon } from "@/components/ui/icons";
import { DiscoverCue } from "@/components/ui/SectionHeading";

// همان منحنیِ حرکتِ بقیهٔ سایت
const EASE = "cubic-bezier(0.4,0,0.2,1)";

/**
 * شبکهٔ مجموعه‌ها + نوارِ شمارش و سوییچِ نما (مثلِ صفحهٔ Collectionsِ مرجع).
 * دو نما: «بزرگ» = یک/دو ستونه (پیش‌فرض) و «شبکه» = دو/چهار ستونه.
 * هر کارت یک کادرِ روشن است: عکس (با zoomِ ظریفِ هاور) + نام + «کشف کنید»
 * که خطِ زیرش با هاورِ کلِ کارت کشیده می‌شود (DiscoverCue روی .group).
 */
export default function CollectionsBrowser() {
  const [columns, setColumns] = useState<"2" | "4">("2");
  const dense = columns === "4";

  return (
    <div className="container-lux pb-16 md:pb-24">
      {/* نوارِ شمارش + سوییچِ نما */}
      <div className="flex items-center justify-between gap-2 py-5 text-[13px]">
        <span className="text-faint">{faNumber(COLLECTIONS.length)} مجموعه</span>
        <nav className="flex items-center gap-2.5 md:gap-5" aria-label="حالتِ نمایش">
          <button
            type="button"
            onClick={() => setColumns("2")}
            aria-pressed={!dense}
            aria-label="نمای بزرگ"
            className={`flex items-center gap-2 transition-colors duration-300 ${
              !dense ? "text-ink" : "text-faint hover:text-ink"
            }`}
            style={{ transitionTimingFunction: EASE }}
          >
            <GridOneIcon className="h-[18px] w-[18px]" />
            <span className="hidden uppercase tracking-[0.04em] md:inline">نمای بزرگ</span>
          </button>
          <button
            type="button"
            onClick={() => setColumns("4")}
            aria-pressed={dense}
            aria-label="نمای شبکه"
            className={`flex items-center gap-2 transition-colors duration-300 ${
              dense ? "text-ink" : "text-faint hover:text-ink"
            }`}
            style={{ transitionTimingFunction: EASE }}
          >
            {/* GridFour ذاتاً ۱۷۶/۲۵۶ پُر می‌کند و Square ۱۹۲/۲۵۶؛ پس باکسِ کمی
                بزرگ‌ترِ این یکی (۱۹٫۵px) باعث می‌شود گلیفِ هر دو دقیقاً هم‌اندازه دیده شود
                (هر دو ≈۱۳٫۵px رنگ‌آمیزی می‌شوند). */}
            <GridFourIcon className="h-[19.5px] w-[19.5px]" />
            <span className="hidden uppercase tracking-[0.04em] md:inline">شبکه</span>
          </button>
        </nav>
      </div>

      {/* شبکهٔ مجموعه‌ها — با تغییرِ نما کارت‌ها دوباره نرم ظاهر می‌شوند (key=columns).
          بدونِ margin-top: فاصلهٔ بالای کارت‌ها را padding-bottomِ نوار (py-5 = ۲۰px) می‌سازد. */}
      <div
        key={columns}
        className={`grid gap-3 ${
          dense ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1 md:grid-cols-2"
        }`}
      >
        {COLLECTIONS.map((col, i) => (
          <Link
            key={col.slug}
            href={`/collections/${col.slug}`}
            className="fx-card-in group relative flex flex-col items-center justify-center gap-5 overflow-hidden bg-surface px-4 py-8"
            style={{ animationDelay: `${Math.min(i, 6) * 30}ms` }}
          >
            <div
              className={`relative w-full overflow-hidden bg-surface ${
                dense ? "aspect-square" : "aspect-[714/420]"
              }`}
            >
              <Image
                src={asset(col.image)}
                alt={col.title}
                fill
                sizes={dense ? "(max-width: 768px) 50vw, 25vw" : "(max-width: 768px) 100vw, 50vw"}
                className="img-zoom object-cover"
              />
            </div>
            <div className="flex flex-col items-center gap-2.5 text-center">
              <h2 className="text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-[#9e9100] xl:text-2xl">
                {col.title}
              </h2>
              <DiscoverCue>کشف کنید</DiscoverCue>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
