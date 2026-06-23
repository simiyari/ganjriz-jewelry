"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type Product, GOLD_COLORS } from "@/lib/site-data";
import { faNumber } from "@/lib/format";
import { asset } from "@/lib/asset";
import { HeartIcon } from "@/components/ui/icons";

const BADGE_LABEL: Record<string, string> = {
  new: "جدید",
  bestseller: "پرفروش",
};

export default function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group relative flex flex-col">
      {/* علاقه‌مندی — سمتِ پایانی (چپ در RTL)؛ روی هاور قرمز می‌شود */}
      <button
        type="button"
        aria-label="افزودن به علاقه‌مندی‌ها"
        aria-pressed={liked}
        onClick={() => setLiked((v) => !v)}
        className={`absolute end-3 top-3 z-10 grid h-8 w-8 place-items-center transition-colors hover:text-danger ${
          liked ? "text-danger" : "text-ink/55"
        }`}
      >
        <HeartIcon weight={liked ? "fill" : "regular"} className="h-5 w-5" />
      </button>

      {/* نشانِ جدید/پرفروش — سمتِ آغازین (راست در RTL) */}
      {product.badge && (
        <span className="absolute start-3 top-3 z-10 bg-white/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] text-ink backdrop-blur-sm">
          {BADGE_LABEL[product.badge]}
        </span>
      )}

      <Link href={`/products/${product.slug}`} className="flex flex-col">
        {/* تصویرِ مربعی */}
        <div className="relative aspect-square overflow-hidden bg-surface">
          <Image
            src={asset(product.image)}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="img-zoom object-cover"
          />
        </div>

        {/* کادرِ طوسیِ روشن — نوشته‌های محصول؛ فاصلهٔ کناره‌ها و پایین ۲۴px */}
        <div className="bg-[#eeeeee] px-6 pt-4 pb-6">
          <h3 className="text-[13px] font-medium leading-6 text-ink transition-colors duration-300 group-hover:text-gold-dark">
            {product.title}
          </h3>
          <div className="mt-2.5 flex items-center justify-between">
            <span className="text-[13px] font-semibold tabular-nums text-ink">
              {faNumber(product.price)}
              <span className="mr-1 text-[11px] font-normal text-muted">
                تومان
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              {product.colors.map((c) => (
                <span
                  key={c}
                  title={GOLD_COLORS[c].label}
                  aria-label={GOLD_COLORS[c].label}
                  className="h-[15px] w-[15px] rounded-full ring-1 ring-black/10"
                  style={{
                    background: GOLD_COLORS[c].metal,
                    boxShadow:
                      "inset 0 1px 1.5px rgba(255,255,255,0.55), inset 0 -1.5px 2px rgba(0,0,0,0.28)",
                  }}
                />
              ))}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
