import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import {
  FOOTER_COLUMNS,
  LEGAL_LINKS,
  SITE,
  SOCIAL_LINKS,
} from "@/lib/site-data";
import { SOCIAL_ICONS } from "@/components/ui/icons";

export default function Footer() {
  return (
    <footer className="bg-ink-deep text-white/70">
      {/* خبرنامه */}
      <div className="border-b border-white/10">
        <div className="container-lux flex flex-col items-center gap-5 py-12 text-center">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">عضویت در خبرنامهٔ گنج‌ریز</h2>
          <p className="max-w-md text-[15px] leading-8 text-white/60">
            از مجموعه‌های تازه، رویدادها و پیشنهادهای ویژه پیش از همه باخبر شوید.
          </p>
          <NewsletterForm />
        </div>
      </div>

      {/* ستون‌ها */}
      <div className="container-lux grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-5 text-[13px] font-semibold text-white">{col.title}</h3>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* شبکه‌های اجتماعی */}
        <div>
          <h3 className="mb-5 text-[13px] font-semibold text-white">ما را دنبال کنید</h3>
          <div className="mb-6 flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-accent hover:text-accent-light"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
          <p className="text-[13px] leading-7 text-white/55">
            تهران، خیابان جواهری، پلاک ۱۸
            <br />
            <span dir="ltr" className="inline-block">۰۲۱ ۱۲۳ ۴۵۶۷</span>
          </p>
        </div>
      </div>

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
