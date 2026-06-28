"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { type Product } from "@/lib/site-data";
import ProductCard from "./ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

/**
 * ردیفِ افقیِ محصولات با Embla Carousel («از این مجموعه» و «اخیراً دیده‌شده»).
 * درگِ نرم با اینرسی روی موس و لمس، نشستنِ نرم روی نزدیک‌ترین کارت (بدونِ «تیک»زدنِ
 * ناگهانی)، RTL کامل، و فلش‌هایی که در ابتدا/انتها غیرفعال می‌شوند.
 *
 * فلش‌ها فقط روی هاورِ کاروسل دیده می‌شوند (گروهِ نام‌دارِ group/carousel تا با
 * سلکتورِ عمومیِ `.group:hover .img-zoom` تداخل نکند)، وسطِ خودِ عکسِ کارت.
 * RTL: فلشِ راست = قبلی، فلشِ چپ = بعدی.
 */
export default function ProductCarousel({
  eyebrow,
  title,
  products,
  basePath = "/products",
}: {
  eyebrow?: string;
  title: string;
  products: Product[];
  /** ریشهٔ مسیرِ تک‌محصول برای کارت‌ها — «/products» یا «/high-jewelry» */
  basePath?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    direction: "rtl",
    containScroll: "trimSnaps",
    dragFree: false, // درگ آزاد ولی موقعِ رها نرم روی نزدیک‌ترین کارت می‌نشیند
  });

  const firstSlideRef = useRef<HTMLDivElement>(null);
  const [imgCenter, setImgCenter] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // فعال/غیرفعالیِ فلش‌ها بر اساسِ امکانِ اسکرول به جلو/عقب
  const onSelect = useCallback((api: NonNullable<typeof emblaApi>) => {
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // مرکزِ عمودیِ فلش‌ها = وسطِ خودِ عکسِ کارت (باکسِ نوشتهٔ زیرِ عکس حساب نمی‌شود)
  useEffect(() => {
    const el = firstSlideRef.current;
    if (!el) return;
    const update = () => {
      const img = el.querySelector("img");
      if (img) setImgCenter(img.getBoundingClientRect().height / 2);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [products]);

  // جلوگیری از بازشدنِ کارت پس از درگ — Embla v8 دیگر متدِ clickAllowed ندارد،
  // پس خودمان جابه‌جاییِ افقیِ اشاره‌گر را می‌سنجیم: اگر از آستانه (۸px) بیشتر
  // حرکت کرد، درگ بوده و کلیکِ ناشی از رهاکردن نباید لینکِ کارت را باز کند.
  const pointerStartX = useRef<number | null>(null);
  const dragged = useRef(false);

  const onPointerDownCapture = useCallback((e: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = e.clientX;
    dragged.current = false;
  }, []);

  const onPointerMoveCapture = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    if (Math.abs(e.clientX - pointerStartX.current) > 8) dragged.current = true;
  }, []);

  const endPointer = useCallback(() => {
    pointerStartX.current = null;
  }, []);

  const onClickCapture = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (dragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  const arrowBase =
    "absolute z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/40 text-ink shadow-[0_10px_30px_-16px_rgba(0,0,0,0.55)] ring-1 ring-black/5 backdrop-blur-md transition-all duration-300 hover:bg-white/65 md:grid";

  return (
    <section className="mx-auto w-full max-w-[1536px] px-4 py-8 md:px-6 md:py-[60px] lg:px-36">
      <SectionHeading eyebrow={eyebrow} title={title} reveal />

      {/* group/carousel نام‌دار است تا با سلکتورِ عمومیِ `.group:hover .img-zoom`
          تداخل نکند؛ zoom و رنگِ عنوان مالِ خودِ کارت می‌مانند، فلش‌ها مالِ کاروسل. */}
      <div className="group/carousel relative mt-10">
        {/* فلشِ قبلی (راست در RTL) — در ابتدای لیست غیرفعال و پنهان */}
        <button
          type="button"
          aria-label="قبلی"
          onClick={scrollPrev}
          disabled={!canPrev}
          style={{ top: imgCenter || "50%" }}
          className={`${arrowBase} start-0 -translate-x-1/2 ${
            canPrev
              ? "opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
        {/* فلشِ بعدی (چپ در RTL) — در انتهای لیست غیرفعال و پنهان */}
        <button
          type="button"
          aria-label="بعدی"
          onClick={scrollNext}
          disabled={!canNext}
          style={{ top: imgCenter || "50%" }}
          className={`${arrowBase} end-0 translate-x-1/2 ${
            canNext
              ? "opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {/* viewportِ Embla — کرسرِ grab؛ کلیکِ پس از درگ مهار می‌شود */}
        <div
          ref={emblaRef}
          onPointerDownCapture={onPointerDownCapture}
          onPointerMoveCapture={onPointerMoveCapture}
          onPointerUpCapture={endPointer}
          onPointerLeave={endPointer}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
          className="cursor-grab overflow-hidden active:cursor-grabbing"
        >
          {/* containerِ Embla — فاصلهٔ ۱۲px با روشِ رسمیِ Embla (padding/margin، نه gap،
              چون gap با containScroll در RTL کاروسل را در انتهای اشتباه پارک می‌کند).
              touch-pan-y تا اسکرولِ عمودیِ صفحه روی موبایل حفظ شود. */}
          <div className="-ms-3 flex touch-pan-y select-none pb-2">
            {products.map((p, i) => (
              <div
                key={p.id}
                ref={i === 0 ? firstSlideRef : undefined}
                className="min-w-0 ps-3 flex-[0_0_44.444%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <ProductCard product={p} basePath={basePath} swapImages={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
