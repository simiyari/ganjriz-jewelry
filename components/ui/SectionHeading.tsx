import Link from "next/link";

export function DiscoverLink({
  href,
  children,
  className = "",
  tone = "ink",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** ink = پس‌زمینهٔ روشن (متن تیره، هاور آبی) | white = پس‌زمینهٔ تیره/آبی (متن سفید) */
  tone?: "ink" | "white";
}) {
  const color = tone === "white" ? "text-white" : "text-ink hover:text-[#9e9100]";
  return (
    <Link
      href={href}
      className={`link-underline text-[13px] font-medium transition-colors duration-300 ${color} ${className}`}
    >
      {children}
    </Link>
  );
}

/** نسخهٔ غیرلینکی DiscoverLink — وقتی کل کارت یک <Link> است،
 *  این فقط ظاهر CTA را می‌سازد و افکتش با هاور روی کارت (.group) فعال می‌شود. */
export function DiscoverCue({
  children,
  className = "",
  tone = "ink",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "ink" | "white";
}) {
  const color =
    tone === "white" ? "text-white" : "text-ink group-hover:text-[#9e9100]";
  return (
    <span
      className={`link-underline link-underline-cue text-[13px] font-medium transition-colors duration-300 ${color} ${className}`}
    >
      {children}
    </span>
  );
}

export function Eyebrow({
  children,
  onDark = false,
  className = "",
}: {
  children: React.ReactNode;
  /** روی پس‌زمینهٔ تیره/تصویر — رنگ روشن به‌جای خاکستری تیره */
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span dir="ltr" className={`${onDark ? "eyebrow-en-light" : "eyebrow-en"} mb-3.5 block ${className}`}>
      {children}
    </span>
  );
}

export default function SectionHeading({
  title,
  eyebrow,
  link,
  align = "center",
  className = "",
  reveal = false,
}: {
  title: string;
  /** لیبل لاتین کوتاه بالای تیتر (مثل OUR CREATIONS) */
  eyebrow?: string;
  link?: { href: string; label: string };
  align?: "center" | "start";
  className?: string;
  /** اگر true، دو-مرحله‌ای با fx-reveal می‌آید: اول ای‌برو+تیتر، بعد لینک. */
  reveal?: boolean;
}) {
  const alignCls =
    align === "center" ? "items-center text-center" : "items-start text-start";
  const fx = reveal ? "fx-reveal " : "";
  return (
    <div className={`flex flex-col ${alignCls} ${className}`}>
      {/* مرحلهٔ ۱: ای‌برو + تیتر */}
      <div className={`${fx}flex w-full flex-col ${alignCls}`}>
        {eyebrow && (
          <span dir="ltr" className="eyebrow-en mb-3.5">
            {eyebrow}
          </span>
        )}
        <h2 className="text-[26px] font-semibold leading-snug text-ink md:text-[32px]">{title}</h2>
      </div>
      {/* مرحلهٔ ۲: لینک (با چند استپ اسکرولِ بیشتر، بعد از تیتر) */}
      {link && (
        <div data-reveal-late className={`${fx}mt-4`}>
          <DiscoverLink href={link.href}>{link.label}</DiscoverLink>
        </div>
      )}
    </div>
  );
}
