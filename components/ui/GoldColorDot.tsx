import Image from "next/image";
import { GOLD_COLORS, type GoldColor } from "@/lib/site-data";
import { asset } from "@/lib/asset";

/**
 * سواچِ رنگِ طلا — آیکونِ بافت‌دارِ فلز (SVG) که حلقهٔ کناریِ خودش را هم دارد.
 * جایگزینِ دایره‌های گرادیانیِ قبلی روی کارتِ محصول، سبد و تسویه.
 *
 * `decorative`=true وقتی برچسبِ متنیِ رنگ کنارش نوشته شده (سبد/تسویه) تا
 * صفحه‌خوان رنگ را دوبار نخواند؛ پیش‌فرض رنگ را اعلام می‌کند.
 *
 * `hover`=true نسخهٔ تعاملی (روی کارت): آیکونِ حلقه‌تیره را روی هاورِ والدی که
 * کلاسِ `group/swatch` دارد جایگزینِ آیکونِ عادی می‌کند (سواپِ نرم با opacity).
 */
export default function GoldColorDot({
  color,
  size = 16,
  decorative = false,
  hover = false,
  className = "",
}: {
  color: GoldColor;
  size?: number;
  decorative?: boolean;
  hover?: boolean;
  className?: string;
}) {
  const { label, icon, iconHover } = GOLD_COLORS[color];

  if (!hover) {
    return (
      <Image
        src={asset(icon)}
        alt={decorative ? "" : label}
        title={label}
        aria-hidden={decorative || undefined}
        width={size}
        height={size}
        className={`inline-block shrink-0 select-none ${className}`}
      />
    );
  }

  // حالتِ کارت — دو لایهٔ روی‌هم؛ روی هاورِ سواچ، عادی محو و هاور ظاهر می‌شود.
  return (
    <span
      className={`relative inline-block shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      title={label}
    >
      <Image
        src={asset(icon)}
        alt=""
        aria-hidden
        width={size}
        height={size}
        className="block transition-opacity duration-200 group-hover/swatch:opacity-0"
      />
      <Image
        src={asset(iconHover)}
        alt=""
        aria-hidden
        width={size}
        height={size}
        className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100"
      />
    </span>
  );
}
