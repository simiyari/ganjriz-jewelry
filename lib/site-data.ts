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
  { label: "دسته‌بندی‌ها", href: "/products" },
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
    image: "/content/shole-talayi.jpg",
    align: "end" as const,
  },
  {
    eyebrow: "Complete Set",
    title: "سرویسِ کامل",
    description: "گردنبند، گوشواره، دستبند و انگشترِ هماهنگ در یک سرویسِ کاملِ طلای ۱۸ عیار",
    href: "/collections",
    image: "/content/pelak-nam.jpg",
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
  image: "/content/shole-talayi.jpg",
} as const;

/** رنگ‌های طلا — برچسب، رنگِ پایه، آیکونِ سواچ و گرادیانِ فلزیِ پشتیبان.
 *  `icon` سواچِ تصویریِ بافت‌دارِ فلز است (SVG در public/icons/gold-color) که
 *  روی کارت/سبد به‌جای دایرهٔ گرادیانی نشان داده می‌شود.
 *  `iconHover` همان سواچ با حلقهٔ تیره (#131313) — حالتِ هاورِ سواچِ کارت.
 *  `metal` گرادیانِ شعاعیِ پشتیبان است (هایلایتِ گوشهٔ بالا-چپ، حسِ فلزِ واقعی). */
export const GOLD_COLORS = {
  yellow: {
    label: "طلای زرد",
    swatch: "#C9A227",
    icon: "/icons/gold-color/yellow-gold.svg",
    iconHover: "/icons/gold-color/yellow-gold-hover.svg",
    metal:
      "radial-gradient(circle at 34% 28%, #f7e9ad 0%, #e0c25a 32%, #c39a2c 64%, #8f6e1c 100%)",
  },
  white: {
    label: "طلای سفید",
    swatch: "#D9D9D9",
    icon: "/icons/gold-color/white-gold.svg",
    iconHover: "/icons/gold-color/white-gold-hover.svg",
    metal:
      "radial-gradient(circle at 34% 28%, #ffffff 0%, #ececec 34%, #cfcfcf 66%, #a9a9a9 100%)",
  },
  rose: {
    label: "طلای رُز",
    swatch: "#E2A38F",
    icon: "/icons/gold-color/rose-gold.svg",
    iconHover: "/icons/gold-color/rose-gold-hover.svg",
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
  href: "/products?category=ring",
  image: "/content/collection-banner.jpg",
} as const;

/** لینک‌های سریعِ دسته‌بندی (ردیفِ پایینِ صفحه) */
export const CATEGORY_LINKS = [
  { label: "انگشتر", href: "/products?category=ring" },
  { label: "گردنبند", href: "/products?category=necklace" },
  { label: "دستبند", href: "/products?category=bracelet" },
  { label: "النگو", href: "/products?category=bracelet" },
  { label: "گوشواره", href: "/products?category=earring" },
  { label: "پلاک و آویز", href: "/products?category=pendant" },
  { label: "سکه", href: "/products?category=coin" },
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
  { id: "p2", title: "پلاکِ اسمِ سفارشی", slug: "pendant-name", category: "pendant", categoryLabel: "پلاک و آویز", weight: 2.4, karat: 18, price: 11_900_000, image: "/content/pelak-nam.jpg", colors: ["yellow", "rose"], badge: "new" },
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

/* ──────────────────────────────────────────────
   صفحهٔ «جواهر لوکس» (/high-jewelry)
   ساختار/چیدمان دقیقاً مثلِ صفحهٔ محصولات است (همان هیرو، مرورگر و لینک‌های پایین)؛
   فقط محتوا فرق می‌کند: تنها قطعاتِ لوکسِ نگین‌دار + فیلترهای متناسب با همین قطعات.
   ────────────────────────────────────────────── */

/** سربرگِ صفحهٔ جواهر لوکس */
export const HIGH_JEWELRY_PAGE = {
  eyebrow: "High Jewelry",
  title: "جواهرات لوکس گنج‌ریز",
  description:
    "گزیده‌ای از نفیس‌ترین قطعاتِ گنج‌ریز؛ جواهراتِ نگین‌دارِ دست‌ساز با سنگ‌های گران‌بها و طراحیِ اختصاصی، برای لحظه‌هایی که برای همیشه ماندگار می‌شوند.",
  image: "/content/collection-banner.jpg",
} as const;

/** بازه‌های قیمتِ متناسب با جواهرِ لوکس (تومان) */
export const HIGH_JEWELRY_PRICE_RANGES = [
  { label: "تا ۲۰۰ میلیون تومان", value: "0-200", min: 0, max: 200_000_000 },
  { label: "۲۰۰ تا ۴۰۰ میلیون تومان", value: "200-400", min: 200_000_000, max: 400_000_000 },
  { label: "۴۰۰ تا ۷۰۰ میلیون تومان", value: "400-700", min: 400_000_000, max: 700_000_000 },
  { label: "بالای ۷۰۰ میلیون تومان", value: "700+", min: 700_000_000, max: Infinity },
] as const;

/** گروه‌های فیلترِ صفحهٔ جواهر لوکس — تنظیم‌شده بر اساسِ همین قطعات
 *  (بدونِ سکه؛ همگی ۱۸ عیار؛ بازه‌های قیمتِ بالاتر) */
export const HIGH_JEWELRY_FILTER_GROUPS = [
  {
    key: "category",
    title: "دسته‌بندی",
    options: [
      { label: "انگشتر", value: "ring" },
      { label: "گردنبند", value: "necklace" },
      { label: "گوشواره", value: "earring" },
      { label: "دستبند و النگو", value: "bracelet" },
      { label: "پلاک و آویز", value: "pendant" },
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
    options: [{ label: "۱۸ عیار", value: "18" }],
  },
  {
    key: "price",
    title: "محدودهٔ قیمت",
    options: HIGH_JEWELRY_PRICE_RANGES.map((r) => ({ label: r.label, value: r.value })),
  },
] as const;

/** کاشیِ تبلیغاتیِ صفحهٔ جواهر لوکس */
export const HIGH_JEWELRY_PROMO = {
  title: "مجموعهٔ پلنگ",
  cta: "کشف مجموعه",
  href: "/collections",
  image: "/content/shole-talayi.jpg",
} as const;

/** لینک‌های سریعِ پایینِ صفحهٔ جواهر لوکس */
export const HIGH_JEWELRY_CATEGORY_LINKS = [
  { label: "انگشترِ جواهر", href: "/high-jewelry?category=ring" },
  { label: "گردنبندِ جواهر", href: "/high-jewelry?category=necklace" },
  { label: "گوشوارهٔ جواهر", href: "/high-jewelry?category=earring" },
  { label: "دستبندِ جواهر", href: "/high-jewelry?category=bracelet" },
  { label: "آویزِ جواهر", href: "/high-jewelry?category=pendant" },
] as const;

/** قطعاتِ جواهرِ لوکس (فیک) — نگین‌دار و گران‌بها، مرتب از جدیدتر */
export const HIGH_JEWELRY: readonly Product[] = [
  { id: "h1", title: "انگشترِ زمردِ کلمبیا", slug: "hj-emerald-ring", category: "ring", categoryLabel: "انگشتر", weight: 7.4, karat: 18, price: 285_000_000, image: "/categories/ring.jpg", colors: ["white"], badge: "new" },
  { id: "h2", title: "گردنبندِ یاقوتِ سرخ", slug: "hj-ruby-necklace", category: "necklace", categoryLabel: "گردنبند", weight: 14.2, karat: 18, price: 540_000_000, image: "/categories/necklace.jpg", colors: ["yellow"], badge: "bestseller" },
  { id: "h3", title: "گوشوارهٔ برلیانِ آویز", slug: "hj-diamond-earring", category: "earring", categoryLabel: "گوشواره", weight: 9.1, karat: 18, price: 320_000_000, image: "/categories/earring.jpg", colors: ["white"], badge: null },
  { id: "h4", title: "دستبندِ جواهرنشانِ ریور", slug: "hj-river-bracelet", category: "bracelet", categoryLabel: "دستبند و النگو", weight: 16.8, karat: 18, price: 410_000_000, image: "/categories/bracelet.jpg", colors: ["white", "yellow"], badge: null },
  { id: "h5", title: "انگشترِ سولیترِ برلیان", slug: "hj-solitaire-ring", category: "ring", categoryLabel: "انگشتر", weight: 6.2, karat: 18, price: 670_000_000, image: "/content/engagement.jpg", colors: ["white"], badge: "bestseller" },
  { id: "h6", title: "آویزِ الماسِ قطره‌ای", slug: "hj-drop-pendant", category: "pendant", categoryLabel: "پلاک و آویز", weight: 5.3, karat: 18, price: 198_000_000, image: "/categories/pendant.jpg", colors: ["white", "rose"], badge: null },
  { id: "h7", title: "گردنبندِ مرواریدِ جنوب", slug: "hj-pearl-necklace", category: "necklace", categoryLabel: "گردنبند", weight: 11.5, karat: 18, price: 245_000_000, image: "/categories/necklace.jpg", colors: ["white"], badge: null },
  { id: "h8", title: "گوشوارهٔ یاقوتِ کبود", slug: "hj-sapphire-earring", category: "earring", categoryLabel: "گوشواره", weight: 8.0, karat: 18, price: 460_000_000, image: "/categories/earring.jpg", colors: ["white", "yellow"], badge: null },
  { id: "h9", title: "دستبندِ پلنگِ جواهر", slug: "hj-panther-bracelet", category: "bracelet", categoryLabel: "دستبند و النگو", weight: 22.4, karat: 18, price: 880_000_000, image: "/content/collection-banner.jpg", colors: ["yellow"], badge: "new" },
  { id: "h10", title: "انگشترِ نگینِ آبیِ سلطنتی", slug: "hj-royal-ring", category: "ring", categoryLabel: "انگشتر", weight: 5.9, karat: 18, price: 150_000_000, image: "/categories/ring.jpg", colors: ["white"], badge: null },
  { id: "h11", title: "سرویسِ کاملِ عروسِ جواهر", slug: "hj-bridal-set", category: "necklace", categoryLabel: "گردنبند", weight: 38.6, karat: 18, price: 1_200_000_000, image: "/categories/necklace.jpg", colors: ["yellow", "white"], badge: "bestseller" },
  { id: "h12", title: "گوشوارهٔ آویزِ زمرد", slug: "hj-emerald-earring", category: "earring", categoryLabel: "گوشواره", weight: 7.7, karat: 18, price: 390_000_000, image: "/categories/earring.jpg", colors: ["white", "rose"], badge: null },
] as const;

/* ──────────────────────────────────────────────
   صفحهٔ «مجموعه‌ها» (/collections)
   چیدمان مثلِ صفحهٔ Collectionsِ کارررا: هیروی دوتکه → نوارِ شمارش + سوییچِ نما
   (نمای بزرگِ دوستونه / شبکهٔ چهارستونه) → کارت‌های مجموعه (کادرِ روشن: عکس + نام +
   «کشف کنید») → لینک‌های سریعِ پایین. RTL با توکن‌های ما.
   ────────────────────────────────────────────── */

/** سربرگِ صفحهٔ مجموعه‌ها (همان هیروی دوتکهٔ صفحهٔ محصولات) */
export const COLLECTIONS_PAGE = {
  eyebrow: "Collections",
  title: "مجموعه‌ها",
  description:
    "زیبایی و اصالت در ناب‌ترین شکل؛ مجموعه‌هایی که از ظرافت، شکوه و هنرِ زرگری الهام گرفته‌اند. هر قطعه سرشار از زندگی و حرکت است و با وسواسِ کامل، برای دوست‌دارانِ لوکس و هنرِ ناب آفریده شده است.",
  image: "/content/engagement.jpg",
} as const;

export type Collection = {
  title: string;
  slug: string;
  image: string;
};

/** مجموعه‌های گنج‌ریز (فیک — فاز ۱؛ تصاویرِ کاورِ ۷۱۴×۴۲۰ از public/collections) */
export const COLLECTIONS: readonly Collection[] = [
  { title: "پلنگ", slug: "panther", image: "/collections/INSTINTO_1.png" },
  { title: "شعلهٔ طلایی", slug: "flame", image: "/collections/VITRAL_1.png" },
  { title: "حلقه‌های نامزدی", slug: "engagement", image: "/collections/INFINITO_-_Collection_Cover_-_714x420px_-_v1-2.png" },
  { title: "پلاکِ نام", slug: "name", image: "/collections/MY_ANGEL_LETTERS_-_Collection_Cover_-_714x420px_-_v1-2.png" },
  { title: "میراث", slug: "heritage", image: "/collections/ORIGEN_-_Collection_Cover_-_TYPE_4_714x420px_-_v1-2.png" },
  { title: "ارکیده", slug: "orchid", image: "/collections/JARDIN_DE_ROSAS_1.png" },
  { title: "باغِ بهشت", slug: "eden", image: "/collections/MY_ANGEL_-_Collection_Cover_-_TYPE_4_714x420px_-_v1-2.png" },
  { title: "مهتاب", slug: "moonlight", image: "/collections/BLACK_LINE_1.png" },
] as const;

/** لینک‌های سریعِ پایینِ صفحهٔ مجموعه‌ها */
export const COLLECTION_QUICK_LINKS = [
  { label: "پلنگ", href: "/collections/panther" },
  { label: "شعلهٔ طلایی", href: "/collections/flame" },
  { label: "حلقه‌های نامزدی", href: "/collections/engagement" },
  { label: "میراث", href: "/collections/heritage" },
  { label: "ارکیده", href: "/collections/orchid" },
  { label: "باغِ بهشت", href: "/collections/eden" },
  { label: "مهتاب", href: "/collections/moonlight" },
  { label: "پلاکِ نام", href: "/collections/name" },
] as const;

/** بخش میراث و اصالت */
export const HERITAGE = {
  eyebrow: "Heritage & Trust",
  title: "بیش از ۴۰ سال میراث جواهرسازی",
  body: "از کارگاه‌های سنتی بازار تا جواهری مدرن امروز؛ گنج‌ریز با تکیه بر هنر زرگران ایرانی و استانداردهای روز، هر قطعه را با وسواس می‌سازد. کیفیت بی‌نقص، عیار تضمین‌شده و طراحی ماندگار، امضای ماست.",
  href: "/about",
  cta: "آشنایی با تاریخچه",
  image: "/content/heritage.jpg",
} as const;

/** بنر تمام‌عرض مجموعه (مشابه Orquideas) */
export const COLLECTION_BANNER = {
  eyebrow: "Collection",
  title: "PANTER",
  description: "الهام‌گرفته از وقار و چابکیِ پلنگ؛ خطوطی جسور و درخششی بی‌باک در طلای ۱۸ عیار",
  href: "/collections/panther",
  cta: "کشف مجموعه",
  image: "/content/collection-banner.jpg",
} as const;

/** حلقه‌های نامزدی + جعبهٔ هدیه */
export const ENGAGEMENT = {
  eyebrow: "Forever Moments",
  title: "حلقه‌های نامزدی",
  body: "بله‌ی شما شایستهٔ درخششی ابدی است. حلقه‌های نامزدی گنج‌ریز با نگین‌های دست‌چین و طراحی اختصاصی، روایت‌گر آغاز یک زندگی تازه‌اند. امکان ساخت سفارشی و حکاکی نام فراهم است.",
  href: "/collections/engagement",
  cta: "مشاهدهٔ حلقه‌ها",
  image: "/content/engagement.jpg",
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
    href: "/about",
    image: "/services/appointment.jpg",
  },
  {
    title: "بسته‌بندی لوکس",
    description: "هر سفارش در جعبهٔ نفیس گنج‌ریز و با روبان طلایی به دست شما می‌رسد.",
    cta: "دربارهٔ بسته‌بندی",
    href: "/about",
    image: "/services/packaging.jpg",
  },
  {
    title: "شخصی‌سازی",
    description: "حکاکی نام، انتخاب عیار و طراحی اختصاصی برای ساخت قطعه‌ای یکتا.",
    cta: "بیشتر بدانید",
    href: "/about",
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
  image: "/content/stores.jpg",
} as const;

/* ──────────────────────────────────────────────
   صفحهٔ «درباره گنج‌ریز» (/about)
   چیدمان الهام‌گرفته از صفحهٔ بوتیکِ Carrera y Carrera، با هویتِ گنج‌ریز:
   عنوان → هیرو → معرفی → میراث (وسط‌چین) → بخش‌های عکس+متن → شعبه‌ها → رزرو وقت → نقشه.
   ────────────────────────────────────────────── */
export const ABOUT_PAGE = {
  eyebrow: "About Ganjriz",
  title: "درباره گنج‌ریز",
  subtitle: "بیش از چهار دهه اعتماد و درخشش در کرج",
  heroImage: "/content/stores.jpg",
  intro:
    "گنج‌ریز نامی آشنا در دنیای طلا و جواهرِ کرج است؛ خانواده‌ای که بیش از چهل سال با عشق به هنرِ زرگری، زیبایی را به دستانِ شما سپرده است. از نخستین کارگاهِ کوچک تا دو شعبهٔ امروز در کرج، اصلِ ما تغییر نکرده است: عیارِ تضمین‌شده، ساختِ بی‌نقص و احترام به اعتمادی که سال‌ها میانِ ما و مشتریان‌مان ساخته شده است.",
  // بلوکِ میراث — متنِ وسط‌چینِ بدونِ عکس (کادرِ روشن)
  heritage: {
    eyebrow: "Our Heritage",
    title: "ریشه در اعتماد، بالیده در زمان",
    body: "گنج‌ریز کارش را بیش از چهار دهه پیش در کرج آغاز کرد؛ روزگاری که نامِ خوب، تنها سرمایهٔ یک زرگر بود. همان نام را امروز هم سرمایهٔ اصلیِ خود می‌دانیم. هر قطعه‌ای که از گنج‌ریز بیرون می‌آید، حاملِ تجربهٔ نسلی از استادکارانِ این خانواده است.",
  },
  // بخش‌های عکس+متن — عکس‌ها یکی‌درمیان چپ/راست
  story: [
    {
      eyebrow: "Craftsmanship",
      title: "هنرِ زرگریِ ایرانی، با دقتِ امروز",
      body: "از طراحی تا پرداختِ نهایی، هر مرحله با وسواس و به‌دستِ استادکارانِ مجرب انجام می‌شود. تلفیقِ نقش‌مایه‌های اصیلِ ایرانی با ابزارِ دقیقِ امروزی، به جواهراتِ گنج‌ریز ظرافت و دوامی می‌بخشد که نسل به نسل ماندگار می‌ماند.",
      image: "/services/personalization.jpg",
    },
  ],
  branches: [
    {
      name: "شعبهٔ گوهردشت",
      image: "/hero/content/stores.jpg",
      address: "کرج، گوهردشت، بلوار انقلاب، نبشِ خیابانِ دهم — طلا و جواهرِ گنج‌ریز",
      phone: "۰۲۶ ۳۴۲۲ ۳۳۴۴",
      hours: [
        { day: "شنبه تا چهارشنبه", time: "۱۰:۰۰ تا ۲۰:۳۰" },
        { day: "پنجشنبه", time: "۱۰:۰۰ تا ۱۸:۰۰" },
        { day: "جمعه", time: "تعطیل" },
      ],
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Gohardasht+Karaj",
    },
    {
      name: "شعبهٔ مرکزی (میدان شهدا)",
      image: "/content/stores.jpg",
      address: "کرج، میدان شهدا، خیابانِ شهید بهشتی، پاساژِ طلا، طبقهٔ همکف",
      phone: "۰۲۶ ۳۲۲۱ ۵۵۶۶",
      hours: [
        { day: "شنبه تا چهارشنبه", time: "۱۰:۰۰ تا ۲۰:۳۰" },
        { day: "پنجشنبه", time: "۱۰:۰۰ تا ۱۸:۰۰" },
        { day: "جمعه", time: "تعطیل" },
      ],
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Meydan+Shohada+Karaj",
    },
  ],
  appointment: {
    eyebrow: "Visit Us",
    title: "از نزدیک به دیدنِ گنج‌ریز بیایید",
    body: "برای انتخابی آسوده و مشاوره‌ای تخصصی، وقتِ حضوری رزرو کنید. کارشناسانِ ما در فضایی خصوصی و آرام همراهِ شما خواهند بود.",
    cta: "رزرو وقت حضوری",
    href: "/appointment",
    image: "/services/appointment.jpg",
  },
  // نقشهٔ کرج (OpenStreetMap — بدون نیاز به کلید و در دسترسِ شبکهٔ داخل ایران)
  mapEmbed:
    "https://www.openstreetmap.org/export/embed.html?bbox=50.9000%2C35.7900%2C51.0600%2C35.8700&layer=mapnik&marker=35.8327%2C50.9916",
} as const;

/* ──────────────────────────────────────────────
   صفحهٔ «یافتن شعبه» (/stores)
   چیدمان الهام‌گرفته از Store Locator مرجع، RTL-آینه‌شده:
   فهرستِ شعبه‌ها سمتِ راست، پنلِ جزئیات وسط، نقشه سمتِ چپ.
   همان دو شعبهٔ ABOUT_PAGE.branches‌اند، با میدان‌های بیشتر (ایمیل، مختصات،
   ساعاتِ هفتگی، امبدِ نقشهٔ اختصاصی) که این صفحه به آن‌ها نیاز دارد.
   نقشه = امبدِ OpenStreetMap (بدون کلید، در دسترسِ شبکهٔ داخل ایران).
   ────────────────────────────────────────────── */
export type StoreType = "boutique" | "retailer";

export type Store = {
  id: string;
  name: string;
  type: StoreType;
  city: string;
  address: string;
  /** نمایش با ارقامِ فارسی */
  phone: string;
  /** برای لینکِ tel: — قالبِ بین‌المللیِ لاتین */
  phoneLink: string;
  email: string;
  /** مختصاتِ واقعیِ شعبه — برای پینِ نقشهٔ Leaflet */
  coords: { lat: number; lng: number };
  /** لینکِ مسیریابیِ بیرونی (گوگل‌مپ) */
  directionsUrl: string;
  /** ساعاتِ کاری — هفت روزِ هفته (شنبه تا جمعه) */
  hoursWeek: readonly { day: string; time: string }[];
};

const WORK_WEEK: readonly { day: string; time: string }[] = [
  { day: "شنبه", time: "۱۰:۰۰ تا ۲۰:۳۰" },
  { day: "یک‌شنبه", time: "۱۰:۰۰ تا ۲۰:۳۰" },
  { day: "دوشنبه", time: "۱۰:۰۰ تا ۲۰:۳۰" },
  { day: "سه‌شنبه", time: "۱۰:۰۰ تا ۲۰:۳۰" },
  { day: "چهارشنبه", time: "۱۰:۰۰ تا ۲۰:۳۰" },
  { day: "پنج‌شنبه", time: "۱۰:۰۰ تا ۱۸:۰۰" },
  { day: "جمعه", time: "تعطیل" },
];

export const STORES: readonly Store[] = [
  {
    id: "gohardasht",
    name: "شعبهٔ گوهردشت",
    type: "boutique",
    city: "کرج",
    address: "کرج، گوهردشت، بلوار انقلاب، نبشِ خیابانِ دهم — طلا و جواهرِ گنج‌ریز",
    phone: "۰۲۶ ۳۴۲۲ ۳۳۴۴",
    phoneLink: "+982634223344",
    email: "gohardasht@ganjriz.ir",
    // نبشِ بلوار انقلاب × خیابانِ دهمِ گوهردشت (مختصاتِ واقعی از OpenStreetMap)
    coords: { lat: 35.8624, lng: 50.967 },
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=35.8624,50.967",
    hoursWeek: WORK_WEEK,
  },
  {
    id: "chahardahom",
    name: "شعبهٔ چهاردهمِ گوهردشت",
    type: "boutique",
    city: "کرج",
    address: "کرج، گوهردشت، بلوار انقلاب، نبشِ خیابانِ چهاردهم — طلا و جواهرِ گنج‌ریز",
    phone: "۰۲۶ ۳۲۲۱ ۵۵۶۶",
    phoneLink: "+982632215566",
    email: "chahardahom@ganjriz.ir",
    // نبشِ بلوار انقلاب × خیابانِ چهاردهمِ گوهردشت (مختصاتِ واقعی از OpenStreetMap)
    coords: { lat: 35.8657, lng: 50.9691 },
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=35.8657,50.9691",
    hoursWeek: WORK_WEEK,
  },
];

export const STORE_LOCATOR = {
  title: "یافتن شعبه",
  searchPlaceholder: "جستجوی شهر یا نشانی…",
  filters: [
    { value: "all", label: "همه" },
    { value: "boutique", label: "جواهری" },
    { value: "retailer", label: "نمایندگی" },
  ],
  typeLabels: { boutique: "جواهری", retailer: "نمایندگی" },
  appointmentHref: "/appointment",
  appointmentCta: "رزرو وقت حضوری",
  directionsCta: "مسیریابی",
  hoursTitle: "ساعاتِ کاری",
} as const;

/** صفحهٔ «تماس با ما» (/contact) — هیرو + شبکهٔ روش‌های ارتباط */
export const CONTACT_PAGE = {
  hero: {
    eyebrow: "Contact Us",
    title: "تماس با ما",
    description:
      "به خدماتِ مشتریانِ گنج‌ریز خوش آمدید؛ از راهنماییِ انتخاب و خرید تا پیگیریِ سفارش، رزرو وقتِ حضوری و خدماتِ پس از فروش. برای هر پرسشی، با کمالِ میل همراهِ شما هستیم.",
    image: "/content/stores.jpg",
  },
  introLead:
    "روشِ دلخواهِ خود را برای ارتباط با تیمِ پشتیبانیِ ما انتخاب کنید، یا پاسخِ پرسش‌های پرتکرار را در ",
  introFaqLabel: "پرسش‌های متداول",
  introTail: " ببینید.",
  faqHref: "/faq",
  // کارتِ تماسِ تلفنی (شماره‌ها از STORES خوانده می‌شود)
  callTitle: "تماسِ تلفنی",
  callHoursLabel: "ساعاتِ پاسخگویی، به وقتِ ایران",
  callHours: ["شنبه تا پنج‌شنبه: ۱۰:۰۰ تا ۲۰:۳۰", "جمعه: تعطیل"],
  // کارتِ ایمیل
  email: "info@ganjriz.ir",
  emailTitle: "ایمیل",
  emailBody:
    "کارشناسانِ ما حداکثر ظرفِ دو روزِ کاری به پیامِ شما پاسخ می‌دهند.",
  emailCta: "ارسالِ ایمیل",
  // چهار کارتِ دیگر — به‌ترتیبِ چیدمانِ شبکه پس از «تماس» و «ایمیل»
  cards: [
    {
      icon: "calendar",
      title: "رزرو وقتِ حضوری",
      body: "برای دیدنِ نزدیکِ مجموعه‌ها و دریافتِ مشاورهٔ تخصصی، وقتِ حضوری در شعبه رزرو کنید.",
      ctaLabel: "رزرو وقت",
      href: "/appointment",
    },
    {
      icon: "store",
      title: "شعبه‌های ما",
      body: "در فضایی آرام و لوکس، از خدماتِ اختصاصی و مشاورهٔ کارشناسانِ ما بهره‌مند شوید.",
      ctaLabel: "یافتنِ شعبه",
      href: "/stores",
    },
    {
      icon: "care",
      title: "خدماتِ پس از فروش",
      body: "همراهیِ ما پس از خرید هم ادامه دارد؛ از مراقبت و تعمیرِ قطعه تا گارانتیِ اصالت.",
      ctaLabel: "بیشتر بدانید",
      href: "/customer-service/warranty",
    },
    {
      icon: "faq",
      title: "سوالاتِ متداول",
      body: "پاسخِ پرسش‌های پرتکرار دربارهٔ جواهرات، مجموعه‌ها و خدمات را اینجا بیابید.",
      ctaLabel: "مشاهدهٔ پرسش‌ها",
      href: "/faq",
    },
  ],
  socialTitle: "ما را در شبکه‌های اجتماعی دنبال کنید",
} as const;

/** ستون‌های فوتر */
export const FOOTER_COLUMNS = [
  {
    title: "خدمات مشتریان",
    links: [
      { label: "تماس با ما", href: "/contact" },
      { label: "سوالات متداول", href: "/faq" },
      { label: "شیوه‌های ارسال", href: "/customer-service/shipping" },
      { label: "بازگشت و تعویض کالا", href: "/customer-service/returns" },
      { label: "پیگیری سفارش", href: "/track" },
    ],
  },
  {
    title: "گنج‌ریز",
    links: [
      { label: "دربارهٔ ما", href: "/about" },
      { label: "تاریخچه", href: "/about#history" },
      { label: "شعبه‌ها", href: "/about" },
      { label: "وبلاگ", href: "/blog" },
      { label: "فرصت‌های شغلی", href: "/careers" },
    ],
  },
  {
    title: "خدمات جواهری",
    links: [
      { label: "رزرو وقت حضوری", href: "/appointment" },
      { label: "بسته‌بندی هدیه", href: "/customer-service/packaging" },
      { label: "شخصی‌سازی", href: "/personalization" },
      { label: "گارانتی و اصالت", href: "/customer-service/warranty" },
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
  { label: "حریم خصوصی", href: "/legal/privacy" },
  { label: "شرایط استفاده", href: "/legal/terms" },
  { label: "شرایط فروش", href: "/legal/sales-terms" },
  { label: "سیاست کوکی", href: "/legal/cookies" },
] as const;
