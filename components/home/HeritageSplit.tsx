import { HERITAGE } from "@/lib/site-data";
import { DiscoverLink, Eyebrow } from "@/components/ui/SectionHeading";

export default function HeritageSplit() {
  return (
    <section className="py-8 px-4 md:py-[60px] md:mx-auto md:max-w-[1536px] md:px-6">
      <div className="flex flex-col items-center bg-[#002511] px-7 py-16 text-center md:px-14 md:py-24">
        {/* دو-مرحله‌ای: اول ای‌برو + تیتر بالا می‌آیند، سپس (با کمی اسکرول/تأخیرِ
            ۲۵۰ms از RevealInit) بلوکِ متن + دکمه. */}
        <div className="fx-reveal flex w-full flex-col items-center">
          <Eyebrow onDark>{HERITAGE.eyebrow}</Eyebrow>
          <h2 className="max-w-2xl text-[26px] font-semibold leading-snug text-white md:text-[34px]">
            {HERITAGE.title}
          </h2>
        </div>
        <div data-reveal-late className="fx-reveal flex w-full flex-col items-center">
          <p className="mt-4 max-w-xl text-[15px] leading-8 text-white/70">{HERITAGE.body}</p>
          <div className="mt-7">
            <DiscoverLink href={HERITAGE.href} tone="white">{HERITAGE.cta}</DiscoverLink>
          </div>
        </div>
      </div>
    </section>
  );
}
