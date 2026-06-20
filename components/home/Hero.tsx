import { SITE } from "@/lib/site-data";
import { DiscoverLink } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";

/**
 * ویدیوی پس‌زمینهٔ هیرو.
 * فایل ویدیو را با همین نام داخل پوشهٔ public بگذار: public/hero.mp4
 * (اختیاری: public/hero.webm هم بگذاری، مرورگرها نسخهٔ سبک‌تر را انتخاب می‌کنند)
 * تا وقتی ویدیو لود شود یا اگر اصلاً وجود نداشته باشد، عکس poster (hero.jpg) نمایش داده می‌شود.
 */
const HERO_VIDEO = "/hero.mp4";
const HERO_POSTER = "/hero.jpg";

export default function Hero() {
  return (
    <section className="relative h-[78vh] min-h-[480px] w-full overflow-hidden bg-ink-deep md:h-[88vh]">
      {/* ویدیوی پس‌زمینه — بی‌صدا، خودکار، تکرارشونده (سازگار با iOS) */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={asset(HERO_POSTER)}
        aria-hidden="true"
      >
        <source src={asset(HERO_VIDEO)} type="video/mp4" />
      </video>

      {/* پوشش گرادیانی فقط از پایین تا محدودهٔ متن — بالای تصویر شفاف می‌ماند */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="container-lux relative flex h-full flex-col items-center justify-end pb-16 text-center md:pb-24">
        <span className="font-en mb-4 text-[12px] font-medium uppercase tracking-[0.3em] text-white/85">
          {SITE.nameLatin} FINE JEWELRY
        </span>
        <h1 className="max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
          {SITE.tagline}
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-8 text-white/80 sm:text-base">
          مجموعه‌ای از طلا و جواهرات دست‌ساز، با قیمت‌گذاری شفاف بر اساس نرخ روز طلا
        </p>
        <div className="mt-8 text-white">
          <DiscoverLink href="/products" tone="white">
            مشاهدهٔ مجموعه
          </DiscoverLink>
        </div>
      </div>
    </section>
  );
}
