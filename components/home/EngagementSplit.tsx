import Image from "next/image";
import { ENGAGEMENT } from "@/lib/site-data";
import { DiscoverLink, Eyebrow } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";

export default function EngagementSplit() {
  return (
    <section className="container-lux py-12 md:py-16">
      <div className="grid items-start overflow-hidden md:grid-cols-2 md:items-stretch">
        {/* پنل متن */}
        <div className="order-2 flex flex-col items-center justify-center bg-royal text-white px-7 py-12 text-center md:order-1 md:px-14 md:py-16">
          <Eyebrow onDark>{ENGAGEMENT.eyebrow}</Eyebrow>
          <h2 className="text-[26px] font-semibold leading-snug text-white md:text-[34px]">{ENGAGEMENT.title}</h2>
          <p className="mt-5 max-w-md text-[15px] leading-8 text-white/75">{ENGAGEMENT.body}</p>
          <div className="mt-7">
            <DiscoverLink href={ENGAGEMENT.href} tone="white">{ENGAGEMENT.cta}</DiscoverLink>
          </div>
        </div>
        {/* تصویر جعبهٔ هدیه */}
        <div className="relative order-1 aspect-[4/3] md:order-2 md:aspect-auto md:min-h-[540px]">
          <Image
            src={asset(ENGAGEMENT.image)}
            alt={ENGAGEMENT.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
