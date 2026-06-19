import Image from "next/image";
import { BOUTIQUE } from "@/lib/site-data";
import { DiscoverLink } from "@/components/ui/SectionHeading";
import { MapPinIcon } from "@/components/ui/icons";

export default function StoresSection() {
  return (
    <div className="relative w-full overflow-hidden bg-ink-deep">
      <Image
        src={BOUTIQUE.image}
        alt={BOUTIQUE.title}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative flex flex-col items-center px-6 py-12 text-center text-white md:py-16">
        <span dir="ltr" className="eyebrow-en-light mb-3.5 inline-flex items-center gap-1.5">
          <MapPinIcon className="h-4 w-4" />
          {BOUTIQUE.eyebrow}
        </span>
        <h2 className="text-2xl font-semibold leading-snug text-white sm:text-[28px]">{BOUTIQUE.title}</h2>
        <p className="mt-3 max-w-lg text-[15px] leading-8 text-white/85">{BOUTIQUE.description}</p>
        <div className="mt-6">
          <DiscoverLink href={BOUTIQUE.href} tone="white">{BOUTIQUE.cta}</DiscoverLink>
        </div>
      </div>
    </div>
  );
}
