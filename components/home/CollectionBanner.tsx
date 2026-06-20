import Image from "next/image";
import { COLLECTION_BANNER } from "@/lib/site-data";
import { DiscoverLink } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";

export default function CollectionBanner() {
  return (
    <section className="container-lux py-12 md:py-16">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-deep sm:aspect-[16/7]">
        <Image
          src={asset(COLLECTION_BANNER.image)}
          alt={COLLECTION_BANNER.title}
          fill
          sizes="(max-width: 1536px) 100vw, 1536px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <span dir="ltr" className="fx-reveal eyebrow-en-light mb-3.5 block">
            {COLLECTION_BANNER.eyebrow}
          </span>
          <h2 className="fx-reveal text-4xl font-medium sm:text-5xl md:text-6xl">
            {COLLECTION_BANNER.title}
          </h2>
          <p className="fx-reveal mt-4 max-w-md text-[15px] leading-8 text-white/85 sm:text-base">
            {COLLECTION_BANNER.description}
          </p>
          <div className="fx-reveal mt-7">
            <DiscoverLink href={COLLECTION_BANNER.href} tone="white">
              {COLLECTION_BANNER.cta}
            </DiscoverLink>
          </div>
        </div>
      </div>
    </section>
  );
}
