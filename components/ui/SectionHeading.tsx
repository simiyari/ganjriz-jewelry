import Link from "next/link";

export function DiscoverLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`link-underline text-[13px] font-medium text-ink ${className}`}
    >
      {children}
    </Link>
  );
}

export function Eyebrow({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  /** روی پس‌زمینهٔ تیره/تصویر — رنگ روشن به‌جای خاکستری تیره */
  onDark?: boolean;
}) {
  return (
    <span dir="ltr" className={`${onDark ? "eyebrow-en-light" : "eyebrow-en"} mb-3.5 block`}>
      {children}
    </span>
  );
}

export default function SectionHeading({
  title,
  eyebrow,
  link,
  align = "center",
}: {
  title: string;
  /** لیبل لاتین کوتاه بالای تیتر (مثل OUR CREATIONS) */
  eyebrow?: string;
  link?: { href: string; label: string };
  align?: "center" | "start";
}) {
  return (
    <div
      className={`flex flex-col ${
        align === "center" ? "items-center text-center" : "items-start text-start"
      }`}
    >
      {eyebrow && (
        <span dir="ltr" className="eyebrow-en mb-3.5">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-semibold leading-snug text-ink sm:text-[28px]">{title}</h2>
      {link && (
        <div className="mt-4">
          <DiscoverLink href={link.href}>{link.label}</DiscoverLink>
        </div>
      )}
    </div>
  );
}
