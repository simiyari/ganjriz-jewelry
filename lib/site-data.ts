/**
 * داده‌های محتوایی صفحه اصلی گنج‌ریز (فاز ۱ — داده فیک)
 * تصاویر از Unsplash بارگذاری می‌شوند و به‌راحتی با تصاویر واقعی محصولات قابل تعویض‌اند.
 */

/** ساخت آدرس تصویر Unsplash با کیفیت و عرض مشخص */
export function img(id: string, w = 1200): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;
}

export const SITE = {
  name: "گنج‌ریز",
  nameLatin: "GANJRIZ",
  tagline: "زیبایی، برای همیشه",
} as const;

/** منوی اصلی — راست‌چین (اولین آیتم سمت راست) */
export const NAV_LINKS = [
  { label: "خانه", href: "/" },
  { label: "مجموعه‌ها", href: "/collections" },
  { label: "دسته‌بندی‌ها", href: "/category" },
  { label: "محصولات", href: "/products" },
  { label: "جواهر لوکس", href: "/high-jewelry" },
  { label: "درباره گنج‌ریز", href: "/about" },
] as const;

/** دو بلوک ویژه بالای صفحه (مشابه Circulos / Angel Letters) */
export const FEATURE_DUO = [
  {
    eyebrow: "Featured Collection",
    title: "شعلهٔ طلایی",
    description: "درخششی از طلای ناب، الهام‌گرفته از رقص نور و آتش",
    href: "/collections/flame",
    image: "/shole-talayi.jpg",
    align: "end" as const,
  },
  {
    eyebrow: "Complete Set",
    title: "سرویسِ کامل",
    description: "گردنبند، گوشواره، دستبند و انگشترِ هماهنگ در یک سرویسِ کاملِ طلای ۱۸ عیار",
    href: "/collections/sets",
    image: "/pelak-nam.jpg",
    align: "center" as const,
  },
] as const;

/** شبکهٔ دسته‌بندی محصولات (یک ردیف ۴ ستونه — مطابق دیلامانی) */
export const CATEGORIES = [
  { title: "انگشتر", slug: "ring", image: "/categories/ring.jpg" },
  { title: "گردنبند", slug: "necklace", image: "/categories/necklace.jpg" },
  { title: "گوشواره", slug: "earring", image: "/categories/earring.jpg" },
  { title: "دستبند و النگو", slug: "bracelet", image: "/categories/bracelet.jpg" },
] as const;

/* ──────────────────────────────────────────────
   صفحهٔ محصولات (فاز ۱ — داده فیک)
   قیمت‌ها به تومان و فیک‌اند؛ بعداً جای آن‌ها قیمتِ لحظه‌ایِ محاسبه‌شده
   (نرخ روز طلا × وزن + اجرت + سود) می‌نشیند.
   ────────────────────────────────────────────── */

/** سربرگِ صفحهٔ محصولات — بنرِ دوتکه (عکسِ مدل + متنِ معرفی) */
export const PRODUCTS_PAGE = {
  eyebrow: "Jewelry",
  title: "جواهرات گنج‌ریز",
  description:
    "جواهراتِ شاخص و هنرِ ساختِ بی‌نظیر، گنج‌ریز را به نامی معتبر در دنیای طلا و جواهرِ ایران بدل کرده است؛ هر قطعه با عیارِ تضمین‌شده و وسواسِ کامل ساخته می‌شود.",
  image: "/shole-talayi.jpg",
} as const;

/** رنگ‌های طلا — برچسب، رنگِ پایه و گرادیانِ فلزی (سواچِ براقِ روی کارت).
 *  `metal` یک گرادیانِ شعاعی است که با هایلایتِ گوشهٔ بالا-چپ، حسِ فلزِ واقعی
 *  (نه یک دایرهٔ تخت) می‌دهد — مطابقِ سواچ‌های نمونهٔ خارجی. */
export const GOLD_COLORS = {
  yellow: {
    label: "طلای زرد",
    swatch: "#C9A227",
    metal:
      "radial-gradient(circle at 34% 28%, #f7e9ad 0%, #e0c25a 32%, #c39a2c 64%, #8f6e1c 100%)",
  },
  white: {
    label: "طلای سفید",
    swatch: "#D9D9D9",
    metal:
      "radial-gradient(circle at 34% 28%, #ffffff 0%, #ececec 34%, #cfcfcf 66%, #a9a9a9 100%)",
  },
  rose: {
    label: "طلای رُز",
    swatch: "#E2A38F",
    metal:
      "radial-gradient(circle at 34% 28%, #f8ddd1 0%, #e7b29c 34%, #d28d72 66%, #ab6953 100%)",
  },
} as const;
export type GoldColor = keyof typeof GOLD_COLORS;

/** بازه‌های قیمت (تومان) برای فیلتر */
export const PRICE_RANGES = [
  { label: "تا ۲۰ میلیون تومان", value: "0-20", min: 0, max: 20_000_000 },
  { label: "۲۰ تا ۳۰ میلیون تومان", value: "20-30", min: 20_000_000, max: 30_000_000 },
  { label: "۳۰ تا ۵۰ میلیون تومان", value: "30-50", min: 30_000_000, max: 50_000_000 },
  { label: "بالای ۵۰ میلیون تومان", value: "50+", min: 50_000_000, max: Infinity },
] as const;

/** گروه‌های فیلترِ نوارِ کناری (چک‌باکس‌های تاشو) */
export const FILTER_GROUPS = [
  {
    key: "category",
    title: "دسته‌بندی",
    options: [
      { label: "انگشتر", value: "ring" },
      { label: "گردنبند", value: "necklace" },
      { label: "دستبند و النگو", value: "bracelet" },
      { label: "گوشواره", value: "earring" },
      { label: "پلاک و آویز", value: "pendant" },
      { label: "سکه", value: "coin" },
    ],
  },
  {
    key: "color",
    title: "رنگ طلا",
    options: [
      { label: "طلای زرد", value: "yellow" },
      { label: "طلای سفید", value: "white" },
      { label: "طلای رُز", value: "rose" },
    ],
  },
  {
    key: "karat",
    title: "عیار",
    options: [
      { label: "۱۸ عیار", value: "18" },
      { label: "سکه (عیار ۹۰۰)", value: "900" },
    ],
  },
  {
    key: "price",
    title: "محدودهٔ قیمت",
    options: PRICE_RANGES.map((r) => ({ label: r.label, value: r.value })),
  },
] as const;

/** گزینه‌های مرتب‌سازی */
export const SORT_OPTIONS = [
  { label: "پیشنهادی", value: "newest" },
  { label: "ارزان‌ترین", value: "price-asc" },
  { label: "گران‌ترین", value: "price-desc" },
] as const;

/** کاشیِ تبلیغاتیِ میانِ شبکهٔ محصولات (دو ستون عرض) */
export const PRODUCTS_PROMO = {
  title: "حلقه‌های طلا",
  cta: "کشف کنید",
  href: "/category/ring",
  image: "/collection-banner.jpg",
} as const;

/** لینک‌های سریعِ دسته‌بندی (ردیفِ پایینِ صفحه) */
export const CATEGORY_LINKS = [
  { label: "انگشتر", href: "/category/ring" },
  { label: "گردنبند", href: "/category/necklace" },
  { label: "دستبند", href: "/category/bracelet" },
  { label: "النگو", href: "/category/bangle" },
  { label: "گوشواره", href: "/category/earring" },
  { label: "پلاک و آویز", href: "/category/pendant" },
  { label: "سکه", href: "/category/coin" },
] as const;

export type ProductBadge = "new" | "bestseller" | null;

export type Product = {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryLabel: string;
  /** وزن به گرم */
  weight: number;
  /** عیار (۱۸ برای جواهر، ۹۰۰ برای سکه) */
  karat: number;
  /** قیمتِ فیک به تومان */
  price: number;
  image: string;
  /** رنگ‌های موجودِ طلا — برای سواچ و فیلتر */
  colors: GoldColor[];
  badge: ProductBadge;
};

/** محصولاتِ فیک — مرتب از جدیدترین به قدیمی‌تر */
export const PRODUCTS: readonly Product[] = [
  { id: "p1", title: "انگشتر آرامیس", slug: "ring-aramis", category: "ring", categoryLabel: "انگشتر", weight: 4.2, karat: 18, price: 18_400_000, image: "/categories/ring.jpg", colors: ["yellow"], badge: "new" },
  { id: "p2", title: "پلاکِ اسمِ سفارشی", slug: "pendant-name", category: "pendant", categoryLabel: "پلاک و آویز", weight: 2.4, karat: 18, price: 11_900_000, image: "/pelak-nam.jpg", colors: ["yellow", "rose"], badge: "new" },
  { id: "p3", title: "گردنبندِ زنجیرِ ایتالیایی", slug: "necklace-italian", category: "necklace", categoryLabel: "گردنبند", weight: 6.8, karat: 18, price: 27_500_000, image: "/categories/necklace.jpg", colors: ["yellow"], badge: "bestseller" },
  { id: "p4", title: "النگوی طلای ساده", slug: "bangle-classic", category: "bracelet", categoryLabel: "دستبند و النگو", weight: 8.1, karat: 18, price: 36_700_000, image: "/categories/bangle.jpg", colors: ["yellow"], badge: "new" },
  { id: "p5", title: "گوشوارهٔ آویزِ مروارید", slug: "earring-pearl", category: "earring", categoryLabel: "گوشواره", weight: 5.1, karat: 18, price: 24_700_000, image: "/categories/earring.jpg", colors: ["white"], badge: "bestseller" },
  { id: "p6", title: "سکهٔ تمام بهار آزادی", slug: "coin-full", category: "coin", categoryLabel: "سکه", weight: 8.13, karat: 900, price: 94_800_000, image: "/categories/coin.jpg", colors: ["yellow"], badge: null },
  { id: "p7", title: "انگشترِ نگین‌دارِ سولیتر", slug: "ring-solitaire", category: "ring", categoryLabel: "انگشتر", weight: 5.6, karat: 18, price: 32_900_000, image: "/categories/ring.jpg", colors: ["white", "yellow"], badge: null },
  { id: "p8", title: "گردنبندِ طلای میناکاری", slug: "necklace-mina", category: "necklace", categoryLabel: "گردنبند", weight: 9.4, karat: 18, price: 41_200_000, image: "/categories/necklace.jpg", colors: ["yellow", "rose"], badge: null },
  { id: "p9", title: "دستبندِ طلای بافت", slug: "bracelet-weave", category: "bracelet", categoryLabel: "دستبند و النگو", weight: 7.3, karat: 18, price: 29_900_000, image: "/categories/bracelet.jpg", colors: ["yellow"], badge: null },
  { id: "p10", title: "گوشوارهٔ حلقه‌ای", slug: "earring-hoop", category: "earring", categoryLabel: "گوشواره", weight: 3.8, karat: 18, price: 16_900_000, image: "/categories/earring.jpg", colors: ["yellow"], badge: null },
  { id: "p11", title: "آویزِ قلبِ طلا", slug: "pendant-heart", category: "pendant", categoryLabel: "پلاک و آویز", weight: 3.2, karat: 18, price: 15_300_000, image: "/categories/pendant.jpg", colors: ["rose"], badge: null },
  { id: "p12", title: "نیم‌سکهٔ طلا", slug: "coin-half", category: "coin", categoryLabel: "سکه", weight: 4.06, karat: 900, price: 48_600_000, image: "/categories/coin.jpg", colors: ["yellow"], badge: null },
  { id: "p13", title: "انگشترِ حلقهٔ سادهٔ مات", slug: "ring-matte", category: "ring", categoryLabel: "انگشتر", weight: 3.1, karat: 18, price: 14_800_000, image: "/categories/ring.jpg", colors: ["white"], badge: null },
  { id: "p14", title: "گردنبندِ ظریفِ روزمره", slug: "necklace-delicate", category: "necklace", categoryLabel: "گردنبند", weight: 5.2, karat: 18, price: 22_300_000, image: "/categories/necklace.jpg", colors: ["yellow"], badge: null },
  { id: "p15", title: "دستبندِ چرم و طلا", slug: "bracelet-leather", category: "bracelet", categoryLabel: "دستبند و النگو", weight: 4.6, karat: 18, price: 19_600_000, image: "/categories/bracelet.jpg", colors: ["yellow"], badge: null },
  { id: "p16", title: "گوشوارهٔ میخیِ نگین", slug: "earring-stud", category: "earring", categoryLabel: "گوشواره", weight: 2.9, karat: 18, price: 13_500_000, image: "/categories/earring.jpg", colors: ["white", "yellow"], badge: null },
  { id: "p17", title: "پلاکِ آیه و دعا", slug: "pendant-verse", category: "pendant", categoryLabel: "پلاک و آویز", weight: 2.7, karat: 18, price: 12_700_000, image: "/categories/pendant.jpg", colors: ["yellow"], badge: null },
  { id: "p18", title: "ربع‌سکهٔ طلا", slug: "coin-quarter", category: "coin", categoryLabel: "سکه", weight: 2.03, karat: 900, price: 25_400_000, image: "/categories/coin.jpg", colors: ["yellow"], badge: null },
  { id: "p19", title: "انگشترِ طلای رُز", slug: "ring-rose", category: "ring", categoryLabel: "انگشتر", weight: 3.7, karat: 18, price: 17_200_000, image: "/categories/ring.jpg", colors: ["rose"], badge: null },
  { id: "p20", title: "گردنبندِ پروانه", slug: "necklace-butterfly", category: "necklace", categoryLabel: "گردنبند", weight: 4.9, karat: 18, price: 21_800_000, image: "/categories/necklace.jpg", colors: ["white", "yellow"], badge: null },
  { id: "p21", title: "گوشوارهٔ زنجیری", slug: "earring-chain", category: "earring", categoryLabel: "گوشواره", weight: 4.4, karat: 18, price: 20_300_000, image: "/categories/earring.jpg", colors: ["yellow", "rose"], badge: null },
  { id: "p22", title: "النگوی حصیری", slug: "bangle-woven", category: "bracelet", categoryLabel: "دستبند و النگو", weight: 9.8, karat: 18, price: 43_500_000, image: "/categories/bangle.jpg", colors: ["yellow"], badge: null },
] as const;

/** بخش میراث و اصالت */
export const HERITAGE = {
  eyebrow: "Heritage & Trust",
  title: "بیش از ۴۰ سال میراث جواهرسازی",
  body: "از کارگاه‌های سنتی بازار تا جواهری مدرن امروز؛ گنج‌ریز با تکیه بر هنر زرگران ایرانی و استانداردهای روز، هر قطعه را با وسواس می‌سازد. کیفیت بی‌نقص، عیار تضمین‌شده و طراحی ماندگار، امضای ماست.",
  href: "/about",
  cta: "آشنایی با تاریخچه",
  image: "/heritage.jpg",
} as const;

/** بنر تمام‌عرض مجموعه (مشابه Orquideas) */
export const COLLECTION_BANNER = {
  eyebrow: "Collection",
  title: "PANTER",
  description: "الهام‌گرفته از وقار و چابکیِ پلنگ؛ خطوطی جسور و درخششی بی‌باک در طلای ۱۸ عیار",
  href: "/collections/panther",
  cta: "کشف مجموعه",
  image: "/collection-banner.jpg",
} as const;

/** حلقه‌های نامزدی + جعبهٔ هدیه */
export const ENGAGEMENT = {
  eyebrow: "Forever Moments",
  title: "حلقه‌های نامزدی",
  body: "بله‌ی شما شایستهٔ درخششی ابدی است. حلقه‌های نامزدی گنج‌ریز با نگین‌های دست‌چین و طراحی اختصاصی، روایت‌گر آغاز یک زندگی تازه‌اند. امکان ساخت سفارشی و حکاکی نام فراهم است.",
  href: "/collections/engagement",
  cta: "مشاهدهٔ حلقه‌ها",
  image: "/engagement.jpg",
} as const;

/** بخش اینستاگرام / دنیای برند */
export const INSTAGRAM = {
  handle: "ganjriz.jewelry",
  title: "گنج‌ریز در اینستاگرام",
  description: "ما را در اینستاگرام دنبال کنید و از تازه‌ترین طرح‌ها باخبر شوید",
  href: "https://instagram.com",
  cta: "دنبال کنید",
  // عکس‌های فیک محلی برای نمایش؛ بعداً جای آن‌ها فید واقعی اینستاگرام می‌نشیند.
  tiles: [
    "/instagram/1.jpg",
    "/instagram/2.jpg",
    "/instagram/3.jpg",
    "/instagram/4.jpg",
    "/instagram/5.jpg",
  ],
} as const;

/** خدمات جواهری (۳ ستون) */
export const SERVICES = [
  {
    title: "رزرو وقت حضوری",
    description: "در فضایی خصوصی و آرام، با مشاورهٔ کارشناسان ما قطعهٔ دلخواه خود را انتخاب کنید.",
    cta: "رزرو وقت",
    href: "/appointment",
    image: "/services/appointment.jpg",
  },
  {
    title: "بسته‌بندی لوکس",
    description: "هر سفارش در جعبهٔ نفیس گنج‌ریز و با روبان طلایی به دست شما می‌رسد.",
    cta: "دربارهٔ بسته‌بندی",
    href: "/packaging",
    image: "/services/packaging.jpg",
  },
  {
    title: "شخصی‌سازی",
    description: "حکاکی نام، انتخاب عیار و طراحی اختصاصی برای ساخت قطعه‌ای یکتا.",
    cta: "بیشتر بدانید",
    href: "/personalization",
    image: "/services/personalization.jpg",
  },
] as const;

/** جواهری‌ها (شعبه‌ها) */
export const BOUTIQUE = {
  eyebrow: "Visit Us",
  title: "شعبه‌های گنج‌ریز",
  description: "دنیای گنج‌ریز را از نزدیک تجربه کنید؛ نشانی شعبه‌ها و نمایندگی‌های مجاز.",
  cta: "یافتن شعبه",
  href: "/stores",
  image: "/stores.jpg",
} as const;

/** ستون‌های فوتر */
export const FOOTER_COLUMNS = [
  {
    title: "خدمات مشتریان",
    links: [
      { label: "تماس با ما", href: "/contact" },
      { label: "سوالات متداول", href: "/faq" },
      { label: "شیوه‌های ارسال", href: "/shipping" },
      { label: "بازگشت و تعویض کالا", href: "/returns" },
      { label: "پیگیری سفارش", href: "/track" },
    ],
  },
  {
    title: "گنج‌ریز",
    links: [
      { label: "دربارهٔ ما", href: "/about" },
      { label: "تاریخچه", href: "/about#history" },
      { label: "شعبه‌ها", href: "/stores" },
      { label: "وبلاگ", href: "/blog" },
      { label: "فرصت‌های شغلی", href: "/careers" },
    ],
  },
  {
    title: "خدمات جواهری",
    links: [
      { label: "رزرو وقت حضوری", href: "/appointment" },
      { label: "بسته‌بندی هدیه", href: "/packaging" },
      { label: "شخصی‌سازی", href: "/personalization" },
      { label: "گارانتی و اصالت", href: "/warranty" },
    ],
  },
] as const;

/** لینک‌های شبکه‌های اجتماعی */
export const SOCIAL_LINKS = [
  { label: "اینستاگرام", href: "https://instagram.com", icon: "instagram" as const },
  { label: "تلگرام", href: "https://telegram.org", icon: "telegram" as const },
  { label: "واتساپ", href: "https://whatsapp.com", icon: "whatsapp" as const },
] as const;

/** لینک‌های حقوقی پایین فوتر */
export const LEGAL_LINKS = [
  { label: "حریم خصوصی", href: "/privacy" },
  { label: "شرایط استفاده", href: "/terms" },
  { label: "شرایط فروش", href: "/sales-terms" },
  { label: "سیاست کوکی", href: "/cookies" },
] as const;
