import Image from "next/image";
import { SERVICES } from "@/lib/site-data";
import { DiscoverLink } from "@/components/ui/SectionHeading";

export default function ServicesSection() {
  return (
    <section className="container-lux py-12 md:py-16">
      <div className="mb-10 flex flex-col items-center text-center">
        <span dir="ltr" className="eyebrow-en mb-3.5">Our Services</span>
        <h2 className="text-2xl font-semibold leading-snug text-ink sm:text-[28px]">خدمات گنج‌ریز</h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 md:gap-7 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <article key={service.title} className="group flex flex-col text-center">
            <div className="relative aspect-[4/3] overflow-hidden bg-surface">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="img-zoom object-cover"
              />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-ink">{service.title}</h3>
            <p className="mx-auto mt-2.5 max-w-xs text-[15px] leading-8 text-muted">
              {service.description}
            </p>
            <div className="mt-5">
              <DiscoverLink href={service.href}>{service.cta}</DiscoverLink>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
