"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { type Product, type GoldColor, GOLD_COLORS } from "@/lib/site-data";
import {
  productGallery,
  productSpecs,
  productDescription,
  productRef,
  colorLabels,
  karatLabel,
  hasSize,
  PRODUCT_SECTIONS,
} from "@/lib/product-detail";
import { faNumber } from "@/lib/format";
import { useCart } from "@/components/cart/CartContext";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import { asset } from "@/lib/asset";
import {
  HeartIcon,
  MapPinIcon,
  PhoneIcon,
  CalendarIcon,
  MailIcon,
  InfoIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@/components/ui/icons";
import SizeGuide from "./SizeGuide";

// تایمینگِ حرکت‌ها — همان منحنیِ بقیهٔ سایت (جمع/بازشدنِ نوارِ هدر و آکاردئونِ فیلتر)
const EASE = "cubic-bezier(0.4,0,0.2,1)";

// فیلترِ رنگ روی تصویرِ نمونه — چون فعلاً برای هر رنگِ طلا عکسِ جدا نداریم،
// همان عکسِ محصول با کمی تغییرِ ته‌رنگ نمایِ «طلای سفید/رُز» می‌گیرد (فاز ۱).
const COLOR_FILTER: Record<GoldColor, string> = {
  yellow: "none",
  white: "grayscale(0.7) brightness(1.12)",
  rose: "sepia(0.45) saturate(1.5) hue-rotate(-12deg) brightness(1.02)",
};

/** یک بخشِ آکاردئونی — خطِ پایینش (متعلق به همین آکاردئون) روی هاور نرم مشکی می‌شود */
function Accordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-line transition-colors duration-300 hover:border-ink">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-[13px] font-semibold text-ink"
      >
        {title}
        <ChevronDownIcon
          className={`h-4 w-4 text-muted transition-transform duration-500 ${
            open ? "rotate-180" : ""
          }`}
          style={{ transitionTimingFunction: EASE }}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        style={{ transitionTimingFunction: EASE }}
      >
        <div className="overflow-hidden">
          <div className="pb-5 text-[13px] leading-7 text-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}

/**
 * گالریِ موبایل — کاروسلِ افقیِ Embla با نقطه‌های نشانگر. عکسِ اصلی اول است و
 * بقیهٔ نماها با کشیدنِ چپ/راست دیده می‌شوند؛ نقطهٔ پایین تصویرِ فعال را نشان می‌دهد.
 * فقط زیرِ md دیده می‌شود — تبلت و دسکتاپ همان عکسِ بزرگ + شبکهٔ پیش‌نماها را دارند.
 */
function MobileGallery({
  images,
  alt,
  liked,
  onToggleLike,
  onZoom,
}: {
  images: string[];
  alt: string;
  liked: boolean;
  onToggleLike: () => void;
  onZoom: (i: number) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: "rtl",
    align: "start",
    loop: false,
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      setSnaps(emblaApi.scrollSnapList());
      setSelected(emblaApi.selectedScrollSnap());
    };
    sync();
    emblaApi.on("select", sync).on("reInit", sync);
    return () => {
      emblaApi.off("select", sync).off("reInit", sync);
    };
  }, [emblaApi]);

  // مهارِ کلیکِ ناشی از کشیدن — تا سواین، پاپ‌آپِ بزرگ‌نمایی را باز نکند (مثلِ کاروسلِ محصولات).
  const pointerStartX = useRef<number | null>(null);
  const dragged = useRef(false);
  const onPointerDownCapture = (e: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = e.clientX;
    dragged.current = false;
  };
  const onPointerMoveCapture = (e: PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    if (Math.abs(e.clientX - pointerStartX.current) > 8) dragged.current = true;
  };
  const endPointer = () => {
    pointerStartX.current = null;
  };
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (dragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="md:hidden">
      <div className="relative">
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
          <div className="flex touch-pan-y">
            {images.map((img, i) => (
              <div key={i} className="relative min-w-0 flex-[0_0_100%]">
                <div className="relative aspect-square overflow-hidden bg-surface">
                  <Image
                    src={asset(img)}
                    alt={i === 0 ? alt : ""}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                  <button
                    type="button"
                    aria-label="بزرگ‌نماییِ تصویر"
                    onClick={() => onZoom(i)}
                    className="absolute inset-0 cursor-zoom-in"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* علاقه‌مندی — ثابت روی گوشهٔ گالری */}
        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          aria-pressed={liked}
          onClick={onToggleLike}
          className={`absolute end-4 top-4 z-10 grid h-9 w-9 place-items-center transition-colors duration-300 hover:text-danger ${
            liked ? "text-danger" : "text-ink/55"
          }`}
        >
          <HeartIcon
            weight={liked ? "fill" : "regular"}
            className="h-[22px] w-[22px]"
          />
        </button>

        {/* نقطه‌های نشانگر — روی خودِ عکس با فاصله از پایین؛ نقطهٔ فعال کمی بزرگ‌تر */}
        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`نمایشِ تصویرِ ${faNumber(i + 1)}`}
              aria-current={i === selected}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === selected ? "h-2 w-2 bg-ink" : "h-1.5 w-1.5 bg-[#d3d3d3]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail({
  product,
  crumb = { href: "/products", label: "جواهرات" },
}: {
  product: Product;
  /** حلقهٔ میانیِ مسیرِ راهنما — «جواهرات» برای محصولات، «جواهر لوکس» برای صفحهٔ لوکس */
  crumb?: { href: string; label: string };
}) {
  const gallery = productGallery(product);
  const specs = productSpecs(product);
  const cart = useCart();
  // علاقه‌مندیِ سراسری و ماندگار — همان لیستِ کارت‌ها و صفحهٔ علاقه‌مندی‌ها
  const wishlist = useWishlist();
  const liked = wishlist.has(product.slug);
  const toggleLike = () => wishlist.toggle(product.slug);
  const [color, setColor] = useState<GoldColor>(product.colors[0]);
  const [open, setOpen] = useState<Record<string, boolean>>({ details: true });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [ringSize, setRingSize] = useState<number | null>(null);
  const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }));

  // پاپ‌آپِ بزرگ‌نمایی — قفلِ اسکرول + بستن با Escape
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    // عرضِ صفحه = ۱۲۸۰ → عکس ۷۲۰ (چسبیده به بالا و راست)، گپِ ۶۰، محتوا ۴۲۰، حاشیهٔ چپ ۸۰.
    // عکس از container بیرون می‌زند تا به لبهٔ راست و زیرِ نوبار بچسبد؛ بخش‌های پایین‌تر باز هم container-lux‌اند.
    <section className="mx-auto max-w-[1536px] pb-8 md:pb-[60px]">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-[60px]">
        {/* ── گالری — در RTL سمتِ راست؛ چسبیده به بالا و لبهٔ راست، عرضِ باقی‌مانده ── */}
        <div className="lg:min-w-0 lg:flex-1">
          {/* موبایل: کاروسلِ سواینده با نقطه‌های نشانگر (عکسِ اصلی اول) */}
          <MobileGallery
            images={gallery}
            alt={product.title}
            liked={liked}
            onToggleLike={toggleLike}
            onZoom={(i) => setLightbox(i)}
          />

          {/* تبلت و دسکتاپ: عکسِ بزرگ + شبکهٔ پیش‌نماها */}
          <div className="hidden flex-col gap-3 md:flex">
            <div className="group relative aspect-square overflow-hidden bg-surface">
              <Image
                src={asset(gallery[0])}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="img-zoom object-cover"
                priority
              />
              {/* کلیک روی عکس → پاپ‌آپِ بزرگ‌نمایی (عکسِ اصلی جابه‌جا نمی‌شود) */}
              <button
                type="button"
                aria-label="بزرگ‌نماییِ تصویر"
                onClick={() => setLightbox(0)}
                className="absolute inset-0 z-[1] cursor-zoom-in"
              />
              {/* علاقه‌مندی روی عکس — مثلِ صفحهٔ محصولات، بدونِ کادر */}
              <button
                type="button"
                aria-label="افزودن به علاقه‌مندی‌ها"
                aria-pressed={liked}
                onClick={toggleLike}
                className={`absolute end-4 top-4 z-10 grid h-9 w-9 place-items-center transition-colors duration-300 hover:text-danger ${
                  liked ? "text-danger" : "text-ink/55"
                }`}
              >
                <HeartIcon
                  weight={liked ? "fill" : "regular"}
                  className="h-[22px] w-[22px]"
                />
              </button>
            </div>
            {/* پیش‌نماها — فقط نماهای پشتیبان (عکسِ اصلی بالا بزرگ است، اینجا تکرار نمی‌شود) */}
            <div className="grid grid-cols-2 gap-3">
              {gallery.slice(1).map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightbox(i + 1)}
                  aria-label={`بزرگ‌نماییِ نمای ${faNumber(i + 1)}`}
                  className="relative aspect-square cursor-zoom-in overflow-hidden bg-surface ring-1 ring-line"
                >
                  <Image
                    src={asset(img)}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 28vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── اطلاعات — در RTL سمتِ چپ؛ ۴۲۰px، استیکی تا انتهای ستونِ عکس ── */}
        <div
          className="flex flex-col px-4 pt-6 md:px-6 lg:w-[420px] lg:shrink-0 lg:self-start lg:px-0 lg:pe-0 lg:me-20 lg:sticky"
          style={{ top: "calc(var(--header-h, 96px) + 16px)" }}
        >
          {/* مسیرِ راهنما — بالای نامِ محصول */}
          <nav className="flex items-center gap-2 text-xs text-muted">
            <Link href="/" className="transition-colors duration-300 hover:text-ink">
              خانه
            </Link>
            <span>/</span>
            <Link href={crumb.href} className="transition-colors duration-300 hover:text-ink">
              {crumb.label}
            </Link>
            <span>/</span>
            <span className="text-muted">{product.title}</span>
          </nav>

          <h1 className="mt-5 text-2xl font-semibold leading-tight text-ink md:text-[30px]">
            {product.title}
          </h1>
          <p className="mt-3 text-[13px] text-muted">
            {colorLabels(product)} · {karatLabel(product.karat)}
          </p>
          <p className="mt-1 text-[11px] tracking-[0.12em] text-muted">
            کد {productRef(product)}
          </p>

          {/* انتخابِ رنگِ طلا — فقط اگر چند رنگ موجود باشد (پیش‌نماهای کوچک) */}
          {product.colors.length > 1 && (
            <div className="mt-5 flex items-center gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  title={GOLD_COLORS[c].label}
                  aria-label={GOLD_COLORS[c].label}
                  aria-pressed={color === c}
                  className={`relative h-16 w-16 overflow-hidden bg-surface ring-1 transition-colors duration-300 ${
                    color === c ? "ring-ink" : "ring-line hover:ring-faint"
                  }`}
                >
                  <Image
                    src={asset(product.image)}
                    alt={GOLD_COLORS[c].label}
                    fill
                    sizes="64px"
                    className="object-cover"
                    style={{ filter: COLOR_FILTER[c] }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* قیمت */}
          <div className="mt-7 flex items-baseline gap-2">
            <span className="text-[26px] font-semibold tabular-nums text-ink">
              {faNumber(product.price)}
            </span>
            <span className="text-[14px] text-muted">تومان</span>
          </div>

          {/* باکسِ انتخاب سایز (شرطی) + باکسِ مالیات */}
          <div className="mt-5 space-y-2.5">
            {hasSize(product) && (
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="flex w-full items-center justify-between border border-line px-4 py-3.5 text-[13px] font-medium text-ink transition-colors duration-300 hover:border-ink"
              >
                <span className="flex items-center gap-2">
                  انتخاب سایز
                  {ringSize !== null && (
                    <span className="text-muted">· سایزِ {faNumber(ringSize)}</span>
                  )}
                </span>
                <ChevronLeftIcon className="h-4 w-4 text-muted" />
              </button>
            )}
            <div className="flex items-center gap-2 border border-line bg-surface px-4 py-3 text-[12px] text-muted">
              <InfoIcon className="h-4 w-4 shrink-0" />
              قیمت با احتسابِ مالیات
            </div>
          </div>

          {/* افزودن به سبد — به سبدِ سراسری اضافه می‌کند و کشوی سبد را باز می‌کند */}
          <button
            type="button"
            onClick={() => {
              cart.addItem(product, color);
              cart.setOpen(true);
            }}
            className="mt-5 flex h-11 w-full items-center justify-center bg-ink text-[13px] font-medium tracking-[0.06em] text-white transition-colors duration-300 hover:bg-[#2d2d2d]"
            style={{ transitionTimingFunction: EASE }}
          >
            افزودن به سبدِ خرید
          </button>

          {/* لینک‌های کنش */}
          <ul className="mt-7 flex flex-col gap-4 text-[13px] text-muted">
            <li>
              <Link
                href="/appointment"
                className="flex items-center gap-2.5 transition-colors duration-300 hover:text-ink"
              >
                <CalendarIcon className="h-[18px] w-[18px]" />
                رزرو وقتِ حضوری
              </Link>
            </li>
            <li>
              <Link
                href="/stores"
                className="flex items-center gap-2.5 transition-colors duration-300 hover:text-ink"
              >
                <MapPinIcon className="h-[18px] w-[18px]" />
                یافتنِ نزدیک‌ترین شعبه
              </Link>
            </li>
            <li>
              <a
                href="tel:02112345678"
                dir="ltr"
                className="flex items-center justify-end gap-2.5 transition-colors duration-300 hover:text-ink"
              >
                <span>۰۲۱ - ۱۲۳۴۵۶۷۸</span>
                <PhoneIcon className="h-[18px] w-[18px]" />
              </a>
            </li>
            <li>
              <a
                href="mailto:sales@ganjriz.ir"
                dir="ltr"
                className="flex items-center justify-end gap-2.5 transition-colors duration-300 hover:text-ink"
              >
                <span>sales@ganjriz.ir</span>
                <MailIcon className="h-[18px] w-[18px]" />
              </a>
            </li>
          </ul>

          {/* آکاردئون‌ها — خطِ بالای فهرست ثابت، خطِ پایینِ هر آکاردئون روی هاور مشکی */}
          <div className="mt-9 border-t border-line">
            <Accordion
              title="جزئیاتِ محصول"
              open={!!open.details}
              onToggle={() => toggle("details")}
            >
              <p>{productDescription(product)}</p>
              <ul className="mt-4 list-disc space-y-2.5 ps-5 marker:text-ink">
                {specs.map((s) => (
                  <li key={s.label}>
                    <span className="font-medium text-ink">{s.label}:</span>{" "}
                    <span className="text-muted">{s.value}</span>
                  </li>
                ))}
              </ul>
            </Accordion>
            {PRODUCT_SECTIONS.map((s) => (
              <Accordion
                key={s.key}
                title={s.title}
                open={!!open[s.key]}
                onToggle={() => toggle(s.key)}
              >
                {s.body}
              </Accordion>
            ))}
          </div>

        </div>
      </div>

      {/* ── پاپ‌آپِ بزرگ‌نماییِ تصویر ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="بستن"
            onClick={() => setLightbox(null)}
            className="absolute end-5 top-5 z-10 grid h-11 w-11 place-items-center text-white/80 transition-colors duration-300 hover:text-white"
          >
            <CloseIcon className="h-7 w-7" />
          </button>
          <div
            className="relative h-[82vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={asset(gallery[lightbox])}
              alt={product.title}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* ── کشوی انتخاب سایز ── */}
      {hasSize(product) && (
        <SizeGuide
          open={sizeGuideOpen}
          onClose={() => setSizeGuideOpen(false)}
          selected={ringSize}
          onSelect={setRingSize}
        />
      )}
    </section>
  );
}
