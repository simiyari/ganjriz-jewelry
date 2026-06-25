import Image from "next/image";
import { BOUTIQUE } from "@/lib/site-data";
import { DiscoverLink } from "@/components/ui/SectionHeading";
import { MapPinIcon } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

export default function StoresSection() {
  return (
    <section className="container-lux pt-8 md:pt-[60px]">
      <div className="fx-reveal relative aspect-[3/4] w-full overflow-hidden bg-ink-deep sm:aspect-[1488/605]">
        <Image
          src={asset(BOUTIQUE.image)}
          alt={BOUTIQUE.title}
          fill
          sizes="(max-width: 1536px) 100vw, 1488px"
          className="object-cover object-center"
        />
      </div>

      {/* دو-مرحله‌ای: اول ای‌برو + تیتر، بعد متن + دکمه. */}
      <div className="flex flex-col items-center pt-10 pb-12 text-center md:pb-24">
        <div className="fx-reveal flex w-full flex-col items-center">
          <span dir="ltr" className="eyebrow-en mb-3.5 inline-flex items-center gap-1.5">
            <MapPinIcon className="h-4 w-4" />
            {BOUTIQUE.eyebrow}
          </span>
          <h2 className="text-[26px] font-semibold leading-snug text-ink md:text-[32px]">{BOUTIQUE.title}</h2>
        </div>
        <div data-reveal-late className="fx-reveal flex w-full flex-col items-center">
          <p className="mt-4 max-w-lg text-[15px] leading-8 text-muted">{BOUTIQUE.description}</p>
          <div className="mt-7">
            <DiscoverLink href={BOUTIQUE.href}>{BOUTIQUE.cta}</DiscoverLink>
          </div>
        </div>
      </div>
    </section>
  );
}
