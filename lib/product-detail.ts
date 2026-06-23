/**
 * داده‌های تکمیلیِ صفحهٔ تک‌محصول (فاز ۱ — فیک).
 * گالری، مشخصات، توضیحات و بخش‌های آکاردئونی از روی فیلدهای موجودِ محصول
 * ساخته می‌شوند؛ بعداً جای آن‌ها داده‌های واقعیِ محصول می‌نشیند.
 */
import { type Product, GOLD_COLORS, PRODUCTS } from "./site-data";
import { faNumber } from "./format";

/** یافتنِ محصول با اسلاگ */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** برچسبِ عیار — «۱۸ عیار» برای جواهر، «عیارِ ۹۰۰» برای سکه */
export function karatLabel(karat: number): string {
  return karat === 900 ? "عیارِ ۹۰۰" : "۱۸ عیار";
}

/** فهرستِ برچسبِ رنگ‌های طلا با «، » جدا شده */
export function colorLabels(p: Product): string {
  return p.colors.map((c) => GOLD_COLORS[c].label).join("، ");
}

/** کدِ محصول (نمایشی) */
export function productRef(p: Product): string {
  return `GR-${p.id.toUpperCase()}`;
}

/** آیا محصول «سایز» دارد؟ (انگشتر و دستبند) — برای نمایشِ راهنمای سایز */
export function hasSize(p: Product): boolean {
  return p.category === "ring" || p.category === "bracelet";
}

// تصاویرِ سبک‌زندگی/مدل — فاز ۱: از تصاویرِ موجودِ سایت استفاده می‌شود.
const LIFESTYLE = [
  "/shole-talayi.jpg",
  "/pelak-nam.jpg",
  "/engagement.jpg",
  "/heritage.jpg",
];

/**
 * گالریِ تصویر — تصویرِ اصلی + ۴ نمای پشتیبان (متغیر بر اساسِ id).
 * عکسِ اصلی فقط بالا بزرگ نمایش داده می‌شود؛ پیش‌نماهای پایین = همین ۴ نمای پشتیبان
 * (بدونِ تکرارِ عکسِ اصلی)، پس ۴ تا می‌شوند تا شبکهٔ ۲×۲ مرتب بماند.
 */
export function productGallery(p: Product): string[] {
  const n = parseInt(p.id.slice(1), 10) || 0;
  const L = LIFESTYLE.length;
  return [
    p.image,
    LIFESTYLE[n % L],
    LIFESTYLE[(n + 1) % L],
    LIFESTYLE[(n + 2) % L],
    LIFESTYLE[(n + 3) % L],
  ];
}

/** مشخصاتِ فنیِ محصول (لیستِ برچسب/مقدار) */
export function productSpecs(p: Product): { label: string; value: string }[] {
  return [
    { label: "متریال", value: `طلا، ${colorLabels(p)}` },
    { label: "عیار", value: karatLabel(p.karat) },
    { label: "وزنِ تقریبی", value: `${faNumber(p.weight)} گرم` },
    { label: "دسته‌بندی", value: p.categoryLabel },
    { label: "کدِ محصول", value: productRef(p) },
  ];
}

/** توضیحاتِ محصول — قالبِ ساخته‌شده از فیلدها */
export function productDescription(p: Product): string {
  return `${p.title} از مجموعهٔ گنج‌ریز، با ${karatLabel(
    p.karat
  )} و در رنگِ ${colorLabels(p)}، وزنی حدودِ ${faNumber(
    p.weight
  )} گرم دارد. هر قطعه با عیارِ تضمین‌شده و وسواسِ کاملِ استادکارانِ ما پرداخت می‌شود و همراه با شناسنامهٔ اصالت و ضمانتِ گنج‌ریز به دستِ شما می‌رسد.`;
}

/** بخش‌های آکاردئونیِ مشترک (ارسال، پرداخت، بسته‌بندی) */
export const PRODUCT_SECTIONS = [
  {
    key: "shipping",
    title: "ارسال و مرجوعی",
    body: "ارسالِ امن و بیمه‌شده به سراسرِ کشور طیِ ۲ تا ۵ روزِ کاری انجام می‌شود. امکانِ بازگشتِ کالا تا ۷ روز پس از دریافت، مطابقِ شرایطِ مرجوعیِ گنج‌ریز فراهم است.",
  },
  {
    key: "payment",
    title: "پرداخت",
    body: "پرداختِ امن از طریقِ درگاهِ بانکیِ معتبر و با تمامِ کارت‌های عضوِ شتاب. قیمتِ نهایی بر اساسِ نرخِ روزِ طلا در لحظهٔ ثبتِ سفارش قطعی می‌شود.",
  },
  {
    key: "packaging",
    title: "بسته‌بندی",
    body: "هر سفارش در جعبهٔ نفیسِ گنج‌ریز و با روبانِ طلایی، آمادهٔ هدیه به دستِ شما می‌رسد.",
  },
] as const;

/** محتوای بخشِ «جزئیاتِ قطعه» */
export function productPiece(p: Product) {
  return {
    eyebrow: "Details of the Piece",
    title: "جزئیاتِ قطعه",
    body: `زیباییِ ${p.title} در جزئیاتِ آن نهفته است؛ از انتخابِ موادِ اولیه با ${karatLabel(
      p.karat
    )} تا پرداختِ نهاییِ سطح، هر مرحله با دقت و ظرافت انجام شده تا قطعه‌ای ماندگار برای لحظه‌های خاصِ شما باشد.`,
    careCta: "راهنمای نگهداری",
    careHref: "/care",
    blocks: [
      {
        caption: "ساخت و پرداخت",
        title: "کارِ دستِ استادکارانِ گنج‌ریز",
        image: "/services/personalization.jpg",
      },
      {
        caption: "متریال",
        title: `طلا، ${colorLabels(p)} — ${karatLabel(p.karat)}`,
        image: p.image,
      },
      {
        caption: "اصالت و ضمانت",
        title: "همراه با شناسنامهٔ اصالت گنج‌ریز",
        image: "/services/packaging.jpg",
      },
    ],
  };
}
