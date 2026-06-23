import Image from "next/image";
import { type Product } from "@/lib/site-data";
import { productPiece } from "@/lib/product-detail";
import { asset } from "@/lib/asset";
import { Eyebrow, DiscoverLink } from "@/components/ui/SectionHeading";

/** «جزئیاتِ قطعه» — تیترِ مرکزی + توضیح + لینکِ نگهداری + دو تصویرِ جزئیات */
export default function ProductPiece({ product }: { product: Product }) {
  const piece = productPiece(product);
  return (
    <section className="mx-auto w-full max-w-[1536px] px-10 py-8 md:px-6 md:py-[60px] lg:px-36">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="fx-reveal flex flex-col items-center">
          <Eyebrow>{piece.eyebrow}</Eyebrow>
          <h2 className="text-2xl font-semibold leading-snug text-ink sm:text-[28px]">
            {piece.title}
          </h2>
          <p className="mt-5 text-[15px] leading-8 text-muted">{piece.body}</p>
        </div>
        <div data-reveal-late className="fx-reveal mt-5">
          <DiscoverLink href={piece.careHref}>{piece.careCta}</DiscoverLink>
        </div>
      </div>

      {/* سه قاب، تمام‌عرضِ سایت و هم‌راستا با بقیه؛ گپِ ۱۲px استانداردِ کاشی‌ها.
          عکس و نوشته جدا از هم reveal می‌شوند: عکس بالاتر است پس اول می‌آید، و نوشته
          هم در همان مرزِ پایهٔ ۱۲۰px (مرحلهٔ ۰) دقیقاً وقتی واردِ پایینِ نما می‌شود
          ظاهر می‌گردد — هماهنگ با اسکرول، بدونِ تأخیرِ مصنوعیِ data-reveal-late. */}
      <div className="mt-10 grid grid-cols-1 gap-x-3 gap-y-12 sm:grid-cols-3 sm:gap-y-3">
        {piece.blocks.map((b, i) => (
          <figure key={i} className="flex flex-col">
            <div className="fx-reveal relative aspect-[4/3] overflow-hidden bg-surface">
              <Image
                src={asset(b.image)}
                alt={b.title}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <figcaption className="fx-reveal mt-4 text-center">
              <h3 className="text-[13px] font-semibold tracking-[0.03em] text-ink">
                {b.caption}
              </h3>
              <p className="mt-1.5 text-[13px] leading-7 text-muted">{b.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
