import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/site-data";
import SectionHeading from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";

export default function CreationsGrid() {
  return (
    <section className="container-lux py-8 md:py-[60px]">
      <SectionHeading
        eyebrow="Our Creations"
        title="گزیده‌ای از ساخته‌های ما"
        link={{ href: "/products", label: "مشاهدهٔ همهٔ محصولات" }}
        className="fx-reveal"
      />

      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/category/${cat.slug}`} className="fx-reveal group flex flex-col">
            <div className="relative aspect-square overflow-hidden bg-surface">
              <Image
                src={asset(cat.image)}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="img-zoom object-cover"
              />
            </div>
            <span className="mt-4 text-center text-sm font-medium text-ink transition-colors duration-300 group-hover:text-accent">
              <span className="relative inline-block pb-1">
                {cat.title}
                <span className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
