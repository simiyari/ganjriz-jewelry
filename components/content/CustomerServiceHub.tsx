import Link from "next/link";
import HubSidebar from "./HubSidebar";
import SizeGuideAccordion from "./SizeGuideAccordion";
import { SectionImages, SectionTableView } from "./ContentBlocks";
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
          <p className="mt-4 text-[15px] leading-8 text-muted">{active.intro}</p>
        )}

        <div className="mt-8">
          {active.groups ? (
            // راهنمای سایز — آکاردئونی (انگشترها / دستبندها / گردنبندها)
            <SizeGuideAccordion groups={active.groups} />
          ) : (
            (active.sections ?? []).map((s, i) => {
              // بریکِ بین‌بخشی = ۳۲ (mt-8)؛ ولی اگر بخشِ قبلی با عکس تمام شده،
              // یک پله بیشتر (۴۸/mt-12) تا تیتر از تصویرِ سنگینِ بالا جدا بماند.
              const prev = (active.sections ?? [])[i - 1];
              const afterImage = !!prev?.images?.length && !prev?.table;
              const gap = i === 0 ? "" : afterImage ? "mt-12" : "mt-8";
              return (
              <div key={s.heading} className={gap}>
                {/*
                  فاصله‌ها صریح‌اند چون انواعِ عنصر هوا/leading متفاوت دارند:
                  · متن/لیست با mt-2.5 (۱۰px) — با ~۶px هوای leading-8 بصری ~۱۶px می‌شود
                  · عکس/جدول با mt-4 (۱۶px) — هوای leading ندارند، پس باکس باید کامل ۱۶px باشد
                */}
                <h3 className="text-[16px] font-semibold leading-snug text-ink">{s.heading}</h3>
                {s.paragraphs?.map((p, j) => (
                  <p key={j} className="mt-2.5 text-[15px] leading-8 text-muted">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-2.5 space-y-2.5">
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
                {s.images && s.images.length > 0 && (
                  <div className="mt-4">
                    <SectionImages images={s.images} />
                  </div>
                )}
                {s.table && (
                  <div className="mt-4">
                    <SectionTableView table={s.table} />
                  </div>
                )}
              </div>
              );
            })
          )}

          {/* ── به کمک نیاز دارید؟ (مثلِ رفرنس، در پایانِ هر صفحه) ── */}
          <div className="mt-12">
            <h3 className="text-[16px] font-semibold leading-snug text-ink">به کمک نیاز دارید؟</h3>
            <p className="mt-4 text-[15px] leading-8 text-muted">
              پاسخِ پرسش‌های پرتکرار را در صفحهٔ{" "}
              <Link
                href="/faq"
                className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
              >
                سوالات متداول
              </Link>{" "}
              بیابید، یا با ما تماس بگیرید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
