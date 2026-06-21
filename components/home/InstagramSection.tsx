import Image from "next/image";
import { INSTAGRAM } from "@/lib/site-data";
import { InstagramIcon } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

export default function InstagramSection() {
  return (
    <section className="py-8 md:py-[60px]">
      <div className="fx-reveal container-lux flex flex-col items-center text-center">
        <span dir="ltr" className="eyebrow-en mb-3.5">Follow Us</span>
        <h2 className="text-2xl font-semibold leading-snug text-ink sm:text-[28px]">{INSTAGRAM.title}</h2>
        <p className="mt-4 max-w-md text-[15px] leading-8 text-muted">{INSTAGRAM.description}</p>
      </div>

      {/* نوار تایل‌ها — تمام‌عرض روی دسکتاپ، اسکرول افقی روی موبایل */}
      <div className="container-lux mt-10">
        <div className="-mx-4 flex gap-3 overflow-x-auto overflow-y-hidden px-4 [touch-action:pan-x] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:px-0">
          {INSTAGRAM.tiles.map((tile, i) => (
            <a
              key={i}
              href={INSTAGRAM.href}
              aria-label={`اینستاگرام گنج‌ریز ${i + 1}`}
              className="group relative aspect-square w-[calc((100vw-44px)/2.25)] shrink-0 overflow-hidden bg-surface md:w-auto md:flex-1"
            >
              <Image
                src={asset(tile)}
                alt=""
                fill
                sizes="(max-width: 768px) 45vw, 200px"
                className="img-zoom object-cover"
              />
              <span className="absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/35 group-hover:opacity-100">
                <InstagramIcon className="h-5 w-5" />
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="fx-reveal mt-9 flex justify-center">
        <a
          href={INSTAGRAM.href}
          dir="ltr"
          className="font-en inline-flex items-center gap-2 bg-ink px-9 py-3.5 text-[12px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[#2a2a2a]"
        >
          <InstagramIcon className="h-4 w-4" />
          <span>{INSTAGRAM.handle}</span>
        </a>
      </div>
    </section>
  );
}
