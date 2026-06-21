import Image from "next/image";
import Link from "next/link";
import { FEATURE_DUO } from "@/lib/site-data";
import { DiscoverCue, Eyebrow } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";

export default function FeatureDuo() {
  return (
    <section className="container-lux pt-4 pb-8 md:pt-8 md:pb-[60px]">
      <div className="grid gap-3 md:grid-cols-2">
        {FEATURE_DUO.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group relative block aspect-square overflow-hidden bg-surface"
          >
            <Image
              src={asset(item.image)}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="img-zoom object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* نوشته‌ها جدا از عکس ظاهر می‌شوند: اول عکس می‌آید، سپس با اسکرولِ
                پایین این بخش که به کفِ کادر چسبیده دیرتر وارد دید می‌شود و
                fx-reveal آن را محو-و-بالاآمدن می‌کند. */}
            <div
              className={`fx-reveal absolute inset-x-0 bottom-0 flex flex-col items-center p-7 text-center text-white md:p-9`}
            >
              <Eyebrow onDark>{item.eyebrow}</Eyebrow>
              <h3 className="text-2xl font-semibold md:text-[30px]">{item.title}</h3>
              <p className="mt-4 max-w-xs text-[15px] leading-8 text-white/85">{item.description}</p>
              <div className="mt-7">
                <DiscoverCue tone="white">کشف کنید</DiscoverCue>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
