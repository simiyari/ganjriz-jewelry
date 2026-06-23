import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/site-data";
import { DiscoverCue } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";

export default function ServicesSection() {
  return (
    <section className="container-lux py-8 md:py-[60px]">
      <div className="fx-reveal mb-10 flex flex-col items-center text-center">
        <span dir="ltr" className="eyebrow-en mb-3.5">Our Services</span>
        <h2 className="text-2xl font-semibold leading-snug text-ink sm:text-[28px]">خدمات گنج‌ریز</h2>
      </div>

      <div className="grid gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service) => (
          // اول عکس می‌آید (استپ ۰، دونه‌دونه بینِ سه کارت)، و با کمی اسکرولِ
          // بیشتر نوشته‌ها (استپ ۱) — آن‌ها هم دونه‌دونه مثلِ عکس‌ها.
          <Link key={service.title} href={service.href} className="group flex flex-col text-center">
            <div className="fx-reveal relative aspect-[4/3] overflow-hidden bg-surface">
              <Image
                src={asset(service.image)}
                alt={service.title}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="img-zoom object-cover"
              />
            </div>
            <div className="fx-reveal" data-reveal-step={1}>
              <h3 className="mt-4 text-lg font-semibold text-ink">{service.title}</h3>
              <p className="mx-auto mt-3 max-w-xs text-[15px] leading-8 text-muted">
                {service.description}
              </p>
              <div className="mt-5">
                <DiscoverCue>{service.cta}</DiscoverCue>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
