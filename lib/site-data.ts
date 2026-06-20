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
