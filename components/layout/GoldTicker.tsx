"use client";

import { useEffect, useState } from "react";
import { faNumber } from "@/lib/format";
import { TrendDownIcon, TrendUpIcon } from "@/components/ui/icons";

/**
 * نوار نرخ لحظه‌ای طلا (فاز ۱ — داده فیک).
 * در فاز بعد با API نرخ طلا (BrsApi.ir) و cache سمت سرور جایگزین می‌شود.
 */

type Variant = "light" | "dark";

const BASE_PRICE = 7_842_000; // تومان — هر گرم طلای ۱۸ عیار (نمونه)

export default function GoldTicker({ variant = "light" }: { variant?: Variant }) {
  const [price, setPrice] = useState(BASE_PRICE);
  const [trend, setTrend] = useState<"up" | "down">("up");

  useEffect(() => {
    const id = setInterval(() => {
      setPrice((prev) => {
        const delta = Math.round((Math.random() - 0.45) * 12_000);
        const next = Math.max(BASE_PRICE - 120_000, prev + delta);
        setTrend(delta >= 0 ? "up" : "down");
        return next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const isUp = trend === "up";
  const TrendIcon = isUp ? TrendUpIcon : TrendDownIcon;
  const muted = variant === "dark" ? "text-white/55" : "text-muted";
  const trendColor = isUp ? "text-success" : "text-danger";

  return (
    <div className="flex items-center gap-2 whitespace-nowrap text-[11px] sm:text-xs">
      <span className={`flex h-1.5 w-1.5 shrink-0 rounded-full bg-success`}>
        <span className="h-full w-full animate-ping rounded-full bg-success/70" />
      </span>
      <span className={muted}>طلای ۱۸ عیار</span>
      <span
        className={`font-semibold tabular-nums ${variant === "dark" ? "text-white" : "text-ink"}`}
      >
        {faNumber(price)}
      </span>
      <span className={muted}>تومان</span>
      <TrendIcon className={`h-3.5 w-3.5 ${trendColor}`} />
    </div>
  );
}
