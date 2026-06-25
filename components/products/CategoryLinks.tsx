import Link from "next/link";
import { CATEGORY_LINKS } from "@/lib/site-data";

type CategoryLink = { label: string; href: string };

export default function CategoryLinks({
  links = CATEGORY_LINKS,
}: {
  links?: readonly CategoryLink[];
}) {
  return (
    <nav className="container-lux border-t border-line py-7">
      <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[13px] text-muted">
        {links.map((cat, i) => (
          <li key={cat.href} className="flex items-center gap-2">
            {i > 0 && <span className="text-line">·</span>}
            {/* هاور مثلِ کارت‌های دسته‌بندیِ صفحهٔ اصلی (CreationsGrid):
                رنگ به طلایی + یک خطِ زیرین که با انیمیشن از راست به چپ کشیده می‌شود. */}
            <Link
              href={cat.href}
              className="group relative inline-block pb-1 transition-colors duration-300 hover:text-[#9e9100]"
            >
              {cat.label}
              <span className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-[#9e9100] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
