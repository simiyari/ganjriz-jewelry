import Image from "next/image";
import { BOUTIQUE } from "@/lib/site-data";
import { DiscoverLink } from "@/components/ui/SectionHeading";
import { MapPinIcon } from "@/components/ui/icons";

export default function BoutiqueSection() {
  return (
    <section className="container-lux pt-12 md:pt-16">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink-deep sm:aspect-[1488/605]">
        <Image
          src={BOUTIQUE.image}
          alt={BOUTIQUE.title}
          fill
          sizes="(max-width: 1536px) 100vw, 1488px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="flex flex-col items-center py-12 text-center md:py-16">
        <span className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-accent-dark">
          <MapPinIcon className="h-4 w-4" />
          {BOUTIQUE.eyebrow}
        </span>
        <h2 className="text-2xl font-semibold leading-snug text-ink sm:text-[28px]">{BOUTIQUE.title}</h2>
        <p className="mt-3 max-w-lg text-[15px] leading-8 text-muted">{BOUTIQUE.description}</p>
        <div className="mt-6">
          <DiscoverLink href={BOUTIQUE.href}>{BOUTIQUE.cta}</DiscoverLink>
        </div>
      </div>
    </section>
  );
}
