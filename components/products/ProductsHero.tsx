import Image from "next/image";
import Link from "next/link";
import { PRODUCTS_PAGE } from "@/lib/site-data";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";

export default function ProductsHero() {
  return (
    <section>
      {/* مسیرِ راهنما — فاصلهٔ بالا/پایینِ یکسان */}
      <nav className="container-lux flex items-center justify-center gap-2 py-5 text-xs text-faint">
        <Link href="/" className="transition-colors hover:text-ink">
          خانه
        </Link>
        <span>/</span>
        <span className="text-muted">جواهرات</span>
      </nav>

      {/* بنرِ دوتکه — در RTL: عکس سمتِ راست، متن سمتِ چپ؛ موبایل: عکس بالا، متن پایین.
          ترتیبِ DOM (عکس سپس متن) خودش در RTL عکس را راست و متن را چپ می‌چیند. */}
      <div className="grid md:grid-cols-2">
        <div className="relative h-[240px] md:h-[400px]">
          <Image
            src={asset(PRODUCTS_PAGE.image)}
            alt={PRODUCTS_PAGE.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex items-center bg-surface px-7 py-12 text-right md:h-[400px] md:px-14 md:py-8">
          <div className="flex w-full flex-col items-start">
            <Eyebrow>{PRODUCTS_PAGE.eyebrow}</Eyebrow>
            <h1 className="text-[30px] font-semibold leading-snug text-ink md:text-[42px]">
              {PRODUCTS_PAGE.title}
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-8 text-muted">
              {PRODUCTS_PAGE.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
