import Image from "next/image";
import { HERITAGE } from "@/lib/site-data";
import { DiscoverLink, Eyebrow } from "@/components/ui/SectionHeading";

export default function HeritageSplit() {
  return (
    <section className="container-lux py-12 md:py-16">
      <div className="grid items-stretch overflow-hidden bg-royal text-white md:grid-cols-2">
        <div className="relative aspect-[3/2] md:aspect-auto md:min-h-[500px]">
          <Image
            src={HERITAGE.image}
            alt={HERITAGE.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center px-7 py-12 text-center md:px-14 md:py-16">
          <Eyebrow onDark>{HERITAGE.eyebrow}</Eyebrow>
          <h2 className="max-w-md text-[26px] font-semibold leading-snug text-white md:text-[34px]">
            {HERITAGE.title}
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-8 text-white/75">{HERITAGE.body}</p>
          <div className="mt-7">
            <DiscoverLink href={HERITAGE.href} tone="white">{HERITAGE.cta}</DiscoverLink>
          </div>
        </div>
      </div>
    </section>
  );
}
