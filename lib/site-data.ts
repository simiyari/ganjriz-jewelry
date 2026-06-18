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
  tagline: "جواهری که قصه می‌گوید",
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
    title: "شعلهٔ زر",
    description: "درخششی از طلای ناب، الهام‌گرفته از رقص نور و آتش",
    href: "/collections/flame",
    image: img("1490481651871-ab68de25d43d", 1100),
    align: "end" as const,
  },
  {
    eyebrow: "Made to Order",
    title: "پلاک حروف من",
    description: "نام و حرف دلخواهت را با طلای ۱۸ عیار جاودانه کن",
    href: "/collections/letters",
    image: img("1605100804763-247f67b3557e", 1100),
    align: "center" as const,
  },
] as const;

/** شبکهٔ دسته‌بندی محصولات (۲ ردیف × ۴ ستون) */
export const CATEGORIES = [
  { title: "انگشتر", slug: "ring", image: img("1611652022419-a9419f74343d", 700) },
  { title: "دستبند", slug: "bracelet", image: img("1611591437281-460bfbe1220a", 700) },
  { title: "گردنبند", slug: "necklace", image: img("1573408301185-9146fe634ad0", 700) },
  { title: "النگو", slug: "bangle", image: img("1599643478518-a784e5dc4c8f", 700) },
  { title: "گوشواره", slug: "earring", image: img("1599459183200-59c7687a0275", 700) },
  { title: "سکه و شمش", slug: "coin", image: img("1610375461246-83df859d849d", 700) },
  { title: "آویز", slug: "pendant", image: img("1626784215021-2e39ccf971cd", 700) },
  { title: "سرویس کامل", slug: "set", image: img("1633934542430-0905ccb5f050", 700) },
] as const;

/** بخش میراث و اصالت */
export const HERITAGE = {
  eyebrow: "Heritage & Trust",
  title: "بیش از ۴۰ سال میراث جواهرسازی",
  body: "از کارگاه‌های سنتی بازار تا جواهری مدرن امروز؛ گنج‌ریز با تکیه بر هنر زرگران ایرانی و استانداردهای روز، هر قطعه را با وسواس می‌سازد. کیفیت بی‌نقص، عیار تضمین‌شده و طراحی ماندگار، امضای ماست.",
  href: "/about",
  cta: "آشنایی با تاریخچه",
  image: img("1515562141207-7a88fb7ce338", 1100),
} as const;

/** بنر تمام‌عرض مجموعه (مشابه Orquideas) */
export const COLLECTION_BANNER = {
  eyebrow: "Collection",
  title: "ارکیده",
  description: "ظرافت گل‌های شرقی در جواهراتی که با هر حرکت می‌درخشند",
  href: "/collections/orchid",
  cta: "کشف مجموعه",
  image: img("1524504388940-b1c1722653e1", 1800),
} as const;

/** حلقه‌های نامزدی + جعبهٔ هدیه */
export const ENGAGEMENT = {
  eyebrow: "Forever Moments",
  title: "حلقه‌های نامزدی",
  body: "بله‌ی شما شایستهٔ درخششی ابدی است. حلقه‌های نامزدی گنج‌ریز با نگین‌های دست‌چین و طراحی اختصاصی، روایت‌گر آغاز یک زندگی تازه‌اند. امکان ساخت سفارشی و حکاکی نام فراهم است.",
  href: "/collections/engagement",
  cta: "مشاهدهٔ حلقه‌ها",
  image: img("1601121141461-9d6647bca1ed", 1100),
} as const;

/** بخش اینستاگرام / دنیای برند */
export const INSTAGRAM = {
  handle: "ganjriz.jewelry",
  title: "جهان گنج‌ریز",
  description: "ما را در اینستاگرام دنبال کنید و از تازه‌ترین طرح‌ها باخبر شوید",
  href: "https://instagram.com",
  cta: "دنبال کنید",
  tiles: [
    img("1617038220319-276d3cfab638", 500),
    img("1602173574767-37ac01994b2a", 500),
    img("1556905055-8f358a7a47b2", 500),
    img("1611085583191-a3b181a88401", 500),
    img("1596944924616-7b38e7cfac36", 500),
    img("1600950207944-0d63e8edbc3f", 500),
    img("1611652022419-a9419f74343d", 500),
    img("1626784215021-2e39ccf971cd", 500),
  ],
} as const;

/** خدمات جواهری (۳ ستون) */
export const SERVICES = [
  {
    title: "رزرو وقت حضوری",
    description: "در فضایی خصوصی و آرام، با مشاورهٔ کارشناسان ما قطعهٔ دلخواهت را انتخاب کن.",
    cta: "رزرو وقت",
    href: "/appointment",
    image: img("1583292650898-7d22cd27ca6f", 800),
  },
  {
    title: "بسته‌بندی لوکس",
    description: "هر سفارش در جعبهٔ نفیس گنج‌ریز و با روبان طلایی به دستت می‌رسد.",
    cta: "دربارهٔ بسته‌بندی",
    href: "/packaging",
    image: img("1513885535751-8b9238bd345a", 800),
  },
  {
    title: "شخصی‌سازی",
    description: "حکاکی نام، انتخاب عیار و طراحی اختصاصی برای ساخت قطعه‌ای یکتا.",
    cta: "بیشتر بدانید",
    href: "/personalization",
    image: img("1611955167811-4711904bb9f8", 800),
  },
] as const;

/** جواهری‌ها (شعبه‌ها) */
export const BOUTIQUE = {
  eyebrow: "Visit Us",
  title: "جواهری‌های گنج‌ریز",
  description: "دنیای گنج‌ریز را از نزدیک تجربه کنید؛ نشانی شعبه‌ها و نمایندگی‌های مجاز.",
  cta: "یافتن شعبه",
  href: "/stores",
  image: img("1441986300917-64674bd600d8", 1800),
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
