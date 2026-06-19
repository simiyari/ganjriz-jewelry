import Image from "next/image";
import Link from "next/link";
import { FEATURE_DUO } from "@/lib/site-data";
import { DiscoverCue, Eyebrow } from "@/components/ui/SectionHeading";

export default function FeatureDuo() {
  return (
    <section className="container-lux py-12 md:py-16">
      <div className="grid gap-3 md:grid-cols-2">
        {FEATURE_DUO.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group relative block aspect-[4/5] overflow-hidden bg-surface sm:aspect-[27/25]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="img-zoom object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div
              className={`absolute inset-x-0 bottom-0 flex flex-col items-center p-7 text-center text-white md:p-9`}
            >
              <Eyebrow onDark>{item.eyebrow}</Eyebrow>
              <h3 className="text-2xl font-semibold md:text-[30px]">{item.title}</h3>
              <p className="mt-2.5 max-w-xs text-[15px] leading-7 text-white/85">{item.description}</p>
              <div className="mt-5">
                <DiscoverCue tone="white">کشف کنید</DiscoverCue>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
