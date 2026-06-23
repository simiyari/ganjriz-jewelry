import Link from "next/link";
import { CATEGORY_LINKS } from "@/lib/site-data";

export default function CategoryLinks() {
  return (
    <nav className="container-lux border-t border-line py-7">
      <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[13px] text-muted">
        {CATEGORY_LINKS.map((cat, i) => (
          <li key={cat.href} className="flex items-center gap-2">
            {i > 0 && <span className="text-line">·</span>}
            <Link
              href={cat.href}
              className="transition-colors duration-300 hover:text-[#9e9100]"
            >
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
