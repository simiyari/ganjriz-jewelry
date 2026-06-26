import Image from "next/image";
import Link from "next/link";
import { PRODUCTS_PAGE } from "@/lib/site-data";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";

type HeroData = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

export default function ProductsHero({
  data = PRODUCTS_PAGE,
  crumbLabel = "جواهرات",
  parentCrumb,
}: {
  data?: HeroData;
  crumbLabel?: string;
  /** حلقهٔ میانیِ مسیرِ راهنما (مثلاً «مجموعه‌ها») — اگر داده شود، مسیر سه‌سطحی می‌شود */
  parentCrumb?: { label: string; href: string };
}) {
  return (
    <section>
      {/* مسیرِ راهنما — فاصلهٔ بالا/پایینِ یکسان */}
      <nav className="container-lux flex items-center justify-center gap-2 py-5 text-xs text-muted">
        <Link href="/" className="transition-colors hover:text-ink">
          خانه
        </Link>
        <span>/</span>
        {parentCrumb && (
          <>
            <Link href={parentCrumb.href} className="transition-colors hover:text-ink">
              {parentCrumb.label}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-muted">{crumbLabel}</span>
      </nav>

      {/* بنرِ دوتکه — در RTL: عکس سمتِ راست، متن سمتِ چپ؛ موبایل: عکس بالا، متن پایین.
          ترتیبِ DOM (عکس سپس متن) خودش در RTL عکس را راست و متن را چپ می‌چیند. */}
      <div className="grid md:grid-cols-2">
        <div className="relative h-[240px] md:h-[400px]">
          <Image
            src={asset(data.image)}
            alt={data.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex items-center bg-surface px-7 py-12 text-right md:h-[400px] md:px-14 md:py-8">
          <div className="flex w-full flex-col items-start">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h1 className="text-[30px] font-semibold leading-snug text-ink md:text-[42px]">
              {data.title}
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-8 text-muted">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
