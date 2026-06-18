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

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 block text-[11px] font-semibold text-accent-dark">{children}</span>
  );
}

export default function SectionHeading({
  title,
  link,
  align = "center",
}: {
  title: string;
  link?: { href: string; label: string };
  align?: "center" | "start";
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start text-start"
      }`}
    >
      <h2 className="text-2xl font-semibold leading-snug text-ink sm:text-[28px]">{title}</h2>
      {link && <DiscoverLink href={link.href}>{link.label}</DiscoverLink>}
    </div>
  );
}
