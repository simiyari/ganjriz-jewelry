import Link from "next/link";
import HubSidebar from "./HubSidebar";
import { CS_SECTIONS, getCSSection } from "@/lib/customer-service";

/**
 * هابِ «خدمات مشتریان» — چیدمانِ دو-پنل، RTL (هم‌سبکِ صفحهٔ FAQ).
 * سایدبارِ بخش‌ها سمتِ راست (لینک به /customer-service/<id>)، محتوای متنیِ بخشِ فعال سمتِ چپ.
 * سرور-کامپوننت است؛ جابه‌جایی بینِ بخش‌ها با ناوبریِ Next انجام می‌شود.
 */
export default function CustomerServiceHub({ activeId }: { activeId: string }) {
  const active = getCSSection(activeId) ?? CS_SECTIONS[0];

  return (
    <div className="container-lux grid gap-10 pb-10 pt-0 lg:grid-cols-[240px_1fr] lg:gap-16 lg:py-[60px]">
      {/* ── سایدبار (در RTL سمتِ راست؛ موبایل: آکاردئون) ── */}
      <HubSidebar title="خدمات مشتریان">
        <nav aria-label="بخش‌های خدمات مشتریان" className="flex w-full flex-col gap-3.5">
          {CS_SECTIONS.map((s) => {
            const isActive = s.id === active.id;
            return (
              <Link
                key={s.id}
                href={`/customer-service/${s.id}`}
                aria-current={isActive ? "page" : undefined}
                className={`text-start text-[14px] transition-colors duration-200 ${
                  isActive
                    ? "font-medium text-ink underline decoration-ink underline-offset-[6px]"
                    : "text-muted hover:text-ink"
                }`}
              >
                {s.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="inline-flex h-11 w-fit items-center justify-center bg-ink px-8 text-[12px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 ease-out hover:bg-[#2d2d2d]"
        >
          تماس با ما
        </Link>
      </HubSidebar>

      {/* ── محتوا (در RTL سمتِ چپ) ── */}
      <div>
        <h2 className="text-[26px] font-semibold leading-snug text-ink md:text-[32px]">
          {active.title}
        </h2>
        {active.intro && (
          <p className="mt-4 max-w-3xl text-[15px] leading-8 text-muted">{active.intro}</p>
        )}

        <div className="mt-8 max-w-3xl md:mt-10">
          {active.sections.map((s, i) => (
            <div key={s.heading} className={i === 0 ? "" : "mt-10 md:mt-12"}>
              <h3 className="text-[18px] font-semibold leading-snug text-ink md:text-[20px]">
                {s.heading}
              </h3>
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="mt-3 text-[15px] leading-8 text-muted">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-3 space-y-2.5">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="relative ps-5 text-[15px] leading-8 text-muted">
                      <span
                        aria-hidden
                        className="absolute start-0 top-[14px] h-1.5 w-1.5 rounded-full bg-gold"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
