/**
 * داده‌های تکمیلیِ صفحهٔ تک‌محصول (فاز ۱ — فیک).
 * گالری، مشخصات، توضیحات و بخش‌های آکاردئونی از روی فیلدهای موجودِ محصول
 * ساخته می‌شوند؛ بعداً جای آن‌ها داده‌های واقعیِ محصول می‌نشیند.
 */
import { type Product, GOLD_COLORS, PRODUCTS, HIGH_JEWELRY } from "./site-data";
import { faNumber } from "./format";

/** یافتنِ محصول با اسلاگ */
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** یافتنِ قطعهٔ جواهرِ لوکس با اسلاگ (همان ساختار، فقط مجموعهٔ دادهٔ متفاوت) */
export function getHighJewelryBySlug(slug: string): Product | undefined {
  return HIGH_JEWELRY.find((p) => p.slug === slug);
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

/**
 * جدولِ سایزِ انگشتر — معادل‌سازیِ سایزِ گنج‌ریز با قطرِ داخلی/محیط (mm) و
 * استانداردهای اروپا و آمریکا/کانادا. اعداد لاتین‌اند و هنگامِ نمایش با
 * `faDigits` فارسی می‌شوند.
 */
export const RING_SIZES = [
  { size: 4, mm: "14.1 / 44.2", eu: "44", us: "3" },
  { size: 5, mm: "14.3 / 44.8", eu: "45", us: "3 1/4" },
  { size: 6, mm: "14.7 / 46.1", eu: "46", us: "3 3/4" },
  { size: 7, mm: "14.9 / 46.8", eu: "47", us: "4" },
  { size: 8, mm: "15.3 / 48.0", eu: "48", us: "4 1/2" },
  { size: 9, mm: "15.7 / 49.3", eu: "49", us: "5" },
  { size: 10, mm: "15.9 / 50.0", eu: "50", us: "5 1/4" },
  { size: 11, mm: "16.3 / 51.2", eu: "51", us: "5 3/4" },
  { size: 12, mm: "16.5 / 51.9", eu: "52", us: "6" },
  { size: 13, mm: "16.9 / 53.1", eu: "53", us: "6 1/2" },
  { size: 14, mm: "17.3 / 54.4", eu: "54", us: "7" },
  { size: 15, mm: "17.5 / 55.1", eu: "55", us: "7 1/4" },
  { size: 16, mm: "17.9 / 56.3", eu: "56", us: "7 3/4" },
  { size: 17, mm: "18.1 / 57.0", eu: "57", us: "8" },
  { size: 18, mm: "18.5 / 58.3", eu: "58", us: "8 1/2" },
  { size: 19, mm: "18.8 / 58.9", eu: "59", us: "8 3/4" },
  { size: 20, mm: "19.2 / 60.2", eu: "60", us: "9 1/4" },
  { size: 21, mm: "19.4 / 60.8", eu: "61", us: "9 1/2" },
  { size: 22, mm: "19.8 / 62.1", eu: "62", us: "10" },
] as const;

/** محتوای تبِ «راهنما و نکات» — مقدمه، دو روشِ اندازه‌گیری و نکاتِ کاربردی */
export const SIZE_GUIDE = {
  introTitle: "چطور سایزِ انگشترتان را پیدا کنید؟",
  intro:
    "برای یافتنِ دقیقِ سایز، انگشت‌تان را در انتهای روز — وقتی نه خیلی گرم است نه خیلی سرد — اندازه بگیرید. اندازه‌ها بینِ دو دست کمی فرق دارند؛ پس اگر قصد دارید انگشتر را روی دستِ راست بپوشید، همان دست را اندازه بگیرید.",
  downloadCta: "دانلودِ راهنمای سایز (PDF)",
  measure: {
    title: "اندازه‌گیریِ انگشت",
    steps: [
      "از نخ، روبان، نوارِ کاغذی یا متر استفاده کنید.",
      "آن را دورِ پایهٔ انگشت بپیچید و محلِ به‌هم‌رسیدنِ دو سر را علامت بزنید.",
      "نخ یا کاغذ را صاف کنید و طولش را به میلی‌متر (mm) بسنجید.",
      "با جدولِ بالا سایزِ خود را پیدا کنید.",
    ],
  },
  existingRing: {
    title: "استفاده از یک حلقهٔ موجود",
    steps: [
      "حلقه‌ای را انتخاب کنید که به‌خوبی اندازهٔ انگشت است.",
      "قطرِ داخلیِ آن را به میلی‌متر (mm) اندازه بگیرید.",
      "با جدولِ بالا سایزِ متناظر با همان میلی‌متر را بیابید.",
    ],
  },
  tipsTitle: "نکاتِ کاربردی",
  tips: [
    "انگشت‌تان را در انتهای روز اندازه بگیرید.",
    "هنگامِ گرما یا سرما انگشت را اندازه نگیرید.",
    "به‌یاد داشته باشید دو دست کمی با هم فرق دارند.",
    "مطمئن شوید سایزِ انتخابی فضای کافی دارد تا حلقه به‌راحتی از تمامِ طولِ انگشت عبور کند.",
  ],
} as const;

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
