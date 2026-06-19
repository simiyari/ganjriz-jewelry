import Link from "next/link";
import { LEGAL_LINKS, SITE } from "@/lib/site-data";
import FooterColumns from "./FooterColumns";

export default function Footer() {
  return (
    <footer className="bg-ink-deep text-white/70">
      {/* ستون‌ها — در موبایل آکاردونی، در دسکتاپ گرید */}
      <FooterColumns />

      {/* نوار پایین */}
      <div className="border-t border-white/10">
        <div className="container-lux flex flex-col items-center justify-between gap-4 py-6 text-center md:flex-row md:text-start">
          <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4">
            <span className="text-lg font-medium text-white">{SITE.name}</span>
            <span className="text-xs text-white/40">
              © {new Date().getFullYear()} — تمامی حقوق محفوظ است.
            </span>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-xs text-white/50 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
