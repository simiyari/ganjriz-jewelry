import Image from "next/image";
import { img, SITE } from "@/lib/site-data";
import { DiscoverLink } from "@/components/ui/SectionHeading";

export default function Hero() {
  return (
    <section className="relative h-[78vh] min-h-[480px] w-full overflow-hidden bg-ink-deep md:h-[88vh]">
      <Image
        src={img("1611601322175-ef8ec8c85f01", 1920)}
        alt="جواهرات لوکس گنج‌ریز"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* پوشش گرادیانی برای خوانایی متن */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40" />

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
          <DiscoverLink href="/products" className="text-white">
            مشاهدهٔ مجموعه
          </DiscoverLink>
        </div>
      </div>
    </section>
  );
}
