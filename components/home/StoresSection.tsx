import Image from "next/image";
import { BOUTIQUE } from "@/lib/site-data";
import { DiscoverLink } from "@/components/ui/SectionHeading";
import { MapPinIcon } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

export default function StoresSection() {
  return (
    <section className="container-lux pt-12 md:pt-16">
      <div className="fx-reveal relative aspect-[3/4] w-full overflow-hidden bg-ink-deep sm:aspect-[1488/605]">
        <Image
          src={asset(BOUTIQUE.image)}
          alt={BOUTIQUE.title}
          fill
          sizes="(max-width: 1536px) 100vw, 1488px"
          className="object-cover object-center"
        />
      </div>

      <div className="flex flex-col items-center py-12 text-center md:py-16">
        <span dir="ltr" className="fx-reveal eyebrow-en mb-3.5 inline-flex items-center gap-1.5">
          <MapPinIcon className="h-4 w-4" />
          {BOUTIQUE.eyebrow}
        </span>
        <h2 className="fx-reveal text-2xl font-semibold leading-snug text-ink sm:text-[28px]">{BOUTIQUE.title}</h2>
        <p className="fx-reveal mt-3 max-w-lg text-[15px] leading-8 text-muted">{BOUTIQUE.description}</p>
        <div className="fx-reveal mt-6">
          <DiscoverLink href={BOUTIQUE.href}>{BOUTIQUE.cta}</DiscoverLink>
        </div>
      </div>
    </section>
  );
}
