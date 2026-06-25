import { Fragment } from "react";
import Link from "next/link";
import { LEGAL_LINKS, SITE } from "@/lib/site-data";
import FooterColumns from "./FooterColumns";
import NewsletterForm from "./NewsletterForm";

// یک حلقهٔ مسیرِ راهنما — اگر href داشته باشد لینک می‌شود، وگرنه صفحهٔ جاری است
export type Crumb = { label: string; href?: string };

export default function Footer({ breadcrumb }: { breadcrumb?: Crumb[] }) {
  return (
    <footer className="bg-ink text-white/70">
      {/* نوار خبرنامه — هم‌رنگ فوتر، با خط جداکننده از ستون‌ها */}
      <div className="border-b border-white/10">
        <div className="container-lux flex flex-col items-center gap-5 py-12 text-center">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">عضویت در خبرنامهٔ گنج‌ریز</h2>
          <p className="max-w-md text-[15px] leading-8 text-white/60">
            از مجموعه‌های تازه، رویدادها و پیشنهادهای ویژه پیش از همه باخبر شوید.
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* مسیرِ راهنما — هم‌شکلِ بالای صفحه، نوارِ باریکِ وسط‌چین (فقط در صفحاتِ داخلی) */}
      {breadcrumb && breadcrumb.length > 0 && (
        <div className="border-b border-white/10">
          <nav className="container-lux flex items-center justify-center gap-2.5 py-6 text-[13px] tracking-wide text-white/45">
            {breadcrumb.map((crumb, i) => (
              <Fragment key={`${crumb.label}-${i}`}>
                {i > 0 && <span className="text-white/25">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="transition-colors duration-300 ease-out hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/80">{crumb.label}</span>
                )}
              </Fragment>
            ))}
          </nav>
        </div>
      )}

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
                  className="footer-link text-xs text-white/50 transition-colors duration-300 ease-out hover:text-white"
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
