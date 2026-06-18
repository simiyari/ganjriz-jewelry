import Image from "next/image";
import { INSTAGRAM } from "@/lib/site-data";
import { InstagramIcon } from "@/components/ui/icons";

export default function InstagramSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container-lux flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold leading-snug text-ink sm:text-[28px]">{INSTAGRAM.title}</h2>
        <p className="mt-3 max-w-md text-[15px] leading-8 text-muted">{INSTAGRAM.description}</p>
      </div>

      {/* نوار تایل‌ها — تمام‌عرض روی دسکتاپ، اسکرول افقی روی موبایل */}
      <div className="container-lux mt-8">
        <div className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:overflow-visible md:px-0 [scrollbar-width:none]">
          {INSTAGRAM.tiles.map((tile, i) => (
            <a
              key={i}
              href={INSTAGRAM.href}
              aria-label={`اینستاگرام گنج‌ریز ${i + 1}`}
              className="group relative aspect-square w-[130px] shrink-0 overflow-hidden bg-surface md:w-auto md:flex-1"
            >
              <Image
                src={tile}
                alt=""
                fill
                sizes="(max-width: 768px) 130px, 200px"
                className="img-zoom object-cover"
              />
              <span className="absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/35 group-hover:opacity-100">
                <InstagramIcon className="h-5 w-5" />
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-9 flex justify-center">
        <a
          href={INSTAGRAM.href}
          className="inline-flex items-center gap-2 bg-ink px-9 py-3.5 text-[12px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-[#2a2a2a]"
        >
          <InstagramIcon className="h-4 w-4" />
          <span dir="ltr">@{INSTAGRAM.handle}</span>
        </a>
      </div>
    </section>
  );
}
