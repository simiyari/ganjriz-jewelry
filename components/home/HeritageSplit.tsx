import { HERITAGE } from "@/lib/site-data";
import { DiscoverLink, Eyebrow } from "@/components/ui/SectionHeading";

export default function HeritageSplit() {
  return (
    <section className="container-lux py-12 md:py-16">
      <div className="flex flex-col items-center bg-[#002511] px-7 py-16 text-center md:px-14 md:py-24">
        <Eyebrow onDark className="fx-reveal">{HERITAGE.eyebrow}</Eyebrow>
        <h2 className="fx-reveal max-w-2xl text-[26px] font-semibold leading-snug text-white md:text-[34px]">
          {HERITAGE.title}
        </h2>
        <p className="fx-reveal mt-5 max-w-xl text-[15px] leading-8 text-white/70">{HERITAGE.body}</p>
        <div className="fx-reveal mt-7">
          <DiscoverLink href={HERITAGE.href} tone="white">{HERITAGE.cta}</DiscoverLink>
        </div>
      </div>
    </section>
  );
}
