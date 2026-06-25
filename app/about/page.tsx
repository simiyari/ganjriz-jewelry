import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/ui/RevealInit";
import KarajMap from "@/components/about/KarajMap";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { MapPinIcon, ChevronLeftIcon } from "@/components/ui/icons";
import { ABOUT_PAGE, SITE } from "@/lib/site-data";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "درباره گنج‌ریز",
  description:
    "گنج‌ریز؛ بیش از چهل سال هنرِ طلا و جواهر با دو شعبه در کرج. داستانِ ما، هنرِ ساخت، نشانیِ شعبه‌ها و رزرو وقتِ حضوری.",
};

// دکمه‌ها — هم‌شکلِ مرجع: پُرِ تیره (مثلِ GET DIRECTIONS) / روشن روی پس‌زمینهٔ تیره
const BTN_BASE =
  "inline-flex items-center justify-center gap-2 px-9 py-3.5 text-[13px] font-medium tracking-wide transition-colors duration-300 ease-out";
const BTN_SOLID = `${BTN_BASE} bg-ink text-white hover:bg-[#2d2d2d]`;
const BTN_LIGHT = `${BTN_BASE} bg-white text-ink hover:bg-[#f5f5f5]`;

/* ──────────────────────────────────────────────
   ریتمِ عمودی — دقیقاً مطابقِ صفحهٔ اصلی:
   • هر سکشن: py-8 md:py-[60px]  → فاصلهٔ هر دو سکشن = ۶۴ موبایل / ۱۲۰ دسکتاپ (یکدست)
   • فاصلهٔ بالای صفحه تا نوبار = یک واحد (۳۲/۶۰)
   • فاصلهٔ درون‌گروهی (تیتر→محتوا، عکس↔متن) = mt-8/mt-10 md:mt-12 (۳۲–۴۰ / ۴۸)
   • فاصلهٔ متن: تیتر→بدنه mt-4، بدنه→دکمه mt-7  (مثلِ HeritageSplit/Engagement)
   ────────────────────────────────────────────── */
export default function AboutPage() {
  const a = ABOUT_PAGE;
  return (
    <>
      <Header />
      <main className="bg-background">
        {/* ── سربرگ: عنوان + هیرو + معرفی (یک گروه) ── */}
        <section className="container-lux py-8 md:py-[60px]">
          <div className="flex flex-col items-center text-center">
            <div className="fx-reveal flex w-full flex-col items-center">
              <Eyebrow>{a.eyebrow}</Eyebrow>
              <h1 className="max-w-3xl text-[30px] font-semibold leading-snug text-ink md:text-[42px]">
                {a.title}
              </h1>
            </div>
            <p data-reveal-late className="fx-reveal mt-4 text-[15px] text-muted">
              {a.subtitle}
            </p>
          </div>

          <div className="fx-reveal relative mt-8 aspect-[3/4] w-full overflow-hidden bg-ink-deep sm:aspect-[1488/620] md:mt-12">
            <Image
              src={asset(a.heroImage)}
              alt={a.title}
              fill
              priority
              sizes="(max-width: 1536px) 100vw, 1488px"
              className="object-cover object-center"
            />
          </div>

          <p className="fx-reveal mx-auto mt-8 max-w-3xl text-center text-[15px] leading-8 text-muted md:mt-12">
            {a.intro}
          </p>
        </section>

        {/* ── میراث — کادرِ روشنِ وسط‌چین (بدونِ عکس) ── */}
        <section className="px-4 py-8 md:mx-auto md:max-w-[1536px] md:px-6 md:py-[60px]">
          <div className="flex flex-col items-center bg-[#002511] px-7 py-16 text-center md:px-14 md:py-24">
            <div className="fx-reveal flex w-full flex-col items-center">
              <Eyebrow onDark>{a.heritage.eyebrow}</Eyebrow>
              <h2 className="max-w-2xl text-[26px] font-semibold leading-snug text-white md:text-[32px]">
                {a.heritage.title}
              </h2>
            </div>
            <div data-reveal-late className="fx-reveal flex w-full flex-col items-center">
              <p className="mt-4 max-w-xl text-[15px] leading-8 text-white/70">{a.heritage.body}</p>
            </div>
          </div>
        </section>

        {/* ── بخش‌های عکس + متن — عکس‌ها یکی‌درمیان (شروع از چپ) ── */}
        {a.story.map((item, i) => {
          const imageFirst = i % 2 === 1; // i=0 ⇒ عکس سمتِ چپ
          return (
            <section
              key={item.title}
              className="px-4 py-8 md:mx-auto md:max-w-[1536px] md:px-6 md:py-[60px]"
            >
              <div className="grid items-start overflow-hidden md:grid-cols-2 md:items-stretch">
                {/* تصویر */}
                <div
                  className={`relative aspect-[4/3] md:aspect-auto md:min-h-[460px] ${
                    imageFirst ? "order-1" : "order-1 md:order-2"
                  }`}
                >
                  <Image
                    src={asset(item.image)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                {/* متن — وسط‌چین */}
                <div
                  className={`flex flex-col items-center justify-center bg-surface px-7 py-12 text-center md:px-14 md:py-16 ${
                    imageFirst ? "order-2" : "order-2 md:order-1"
                  }`}
                >
                  <div className="fx-reveal flex w-full flex-col items-center">
                    <Eyebrow>{item.eyebrow}</Eyebrow>
                    <h2 className="text-[26px] font-semibold leading-snug text-ink md:text-[32px]">
                      {item.title}
                    </h2>
                  </div>
                  <p
                    data-reveal-late
                    className="fx-reveal mt-4 max-w-md text-[15px] leading-8 text-muted"
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </section>
          );
        })}

        {/* ── شعبه‌ها در کرج — سرتیتر + دو بلوک، در یک سکشن (گروهِ هم‌بسته) ── */}
        <section className="py-8 md:py-[60px]">
          <div className="container-lux flex flex-col items-center text-center">
            <div className="fx-reveal flex flex-col items-center">
              <Eyebrow>Our Boutiques</Eyebrow>
              <h2 className="text-[26px] font-semibold leading-snug text-ink md:text-[32px]">
                شعبه‌های گنج‌ریز در کرج
              </h2>
            </div>
          </div>

          {a.branches.map((b, i) => {
            const imageFirst = i % 2 === 0; // در RTL: عکس سمتِ راست
            return (
              <div
                key={b.name}
                className={`px-4 md:mx-auto md:max-w-[1536px] md:px-6 ${
                  i === 0 ? "mt-10 md:mt-12" : ""
                }`}
              >
                <div className="grid items-stretch overflow-hidden md:grid-cols-2">
                  {/* تصویرِ شعبه */}
                  <div
                    className={`relative aspect-[4/3] bg-ink-deep md:aspect-auto md:min-h-[520px] ${
                      imageFirst ? "order-1" : "order-1 md:order-2"
                    }`}
                  >
                    <Image
                      src={asset(b.image)}
                      alt={b.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  {/* پنلِ اطلاعات — وسط‌چین */}
                  <div
                    className={`flex flex-col items-center justify-center bg-surface px-7 py-12 text-center md:px-14 md:py-16 ${
                      imageFirst ? "order-2" : "order-2 md:order-1"
                    }`}
                  >
                    <div className="fx-reveal flex w-full flex-col items-center">
                      <h3 className="text-[26px] font-semibold leading-snug text-ink md:text-[32px]">
                        {b.name}
                      </h3>
                    </div>

                    <div data-reveal-late className="fx-reveal flex w-full flex-col items-center">
                      <ul className="mt-5 space-y-1.5 text-[15px] leading-8 text-muted">
                        {b.hours.map((h) => (
                          <li key={h.day}>
                            {h.day}، {h.time}
                          </li>
                        ))}
                      </ul>

                      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink">
                        نشانی
                      </p>
                      <p className="mt-2 max-w-xs text-[15px] leading-8 text-muted">{b.address}</p>
                      <p className="mt-1 text-[15px] text-muted" dir="ltr">
                        {b.phone}
                      </p>

                      <a
                        href={b.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${BTN_SOLID} mt-7`}
                      >
                        <MapPinIcon className="h-4 w-4" />
                        مسیریابی
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* ── رزرو وقتِ حضوری (متن + عکسِ راست) ── */}
        <section className="px-4 py-8 md:mx-auto md:max-w-[1536px] md:px-6 md:py-[60px]">
          <div className="grid items-start overflow-hidden bg-[#002511] md:grid-cols-2 md:items-stretch">
            <div className="order-2 flex flex-col items-center justify-center px-7 py-12 text-center md:px-14 md:py-16">
              <div className="fx-reveal flex w-full flex-col items-center">
                <Eyebrow onDark>{a.appointment.eyebrow}</Eyebrow>
                <h2 className="text-[26px] font-semibold leading-snug text-white md:text-[32px]">
                  {a.appointment.title}
                </h2>
              </div>
              <div data-reveal-late className="fx-reveal flex w-full flex-col items-center">
                <p className="mt-4 max-w-md text-[15px] leading-8 text-white/70">
                  {a.appointment.body}
                </p>
                <div className="mt-7">
                  <Link href={a.appointment.href} className={BTN_LIGHT}>
                    {a.appointment.cta}
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative order-1 aspect-[4/3] md:aspect-auto md:min-h-[480px]">
              <Image
                src={asset(a.appointment.image)}
                alt={a.appointment.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ── نقشهٔ کرج با کارتِ نشانی (تمام‌عرض، چسبیده به فوتر) ── */}
        <section className="pt-8 md:pt-[60px]">
          <KarajMap src={a.mapEmbed} title="نقشهٔ شعبه‌های گنج‌ریز در کرج">
            {/* کارتِ نشانی — روی نقشه، سمتِ راست (start در RTL)، بالای پوششِ نگهبان */}
            <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center px-4 md:px-10">
              <div className="pointer-events-auto w-[280px] max-w-[80vw] bg-background p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.4)]">
                <span className="mb-3 block h-0.5 w-10 bg-gold" aria-hidden />
                <h3 className="text-base font-semibold text-ink">{SITE.name} در کرج</h3>
                <ul className="mt-4 space-y-3">
                  {a.branches.map((b) => (
                    <li key={b.name} className="text-[13px] leading-6 text-muted">
                      <span className="block font-medium text-ink">{b.name}</span>
                      {b.address}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/stores"
                  className="group/loc mt-5 inline-flex w-fit items-center gap-1.5 whitespace-nowrap text-[13px] font-medium text-ink transition-colors duration-300 ease-out hover:text-accent-dark"
                >
                  مشاهدهٔ همهٔ شعبه‌ها
                  <ChevronLeftIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover/loc:-translate-x-1" />
                </Link>
              </div>
            </div>
          </KarajMap>
        </section>
      </main>
      <Footer
        breadcrumb={[
          { label: "خانه", href: "/" },
          { label: "درباره گنج‌ریز" },
        ]}
      />
      <RevealInit />
    </>
  );
}
