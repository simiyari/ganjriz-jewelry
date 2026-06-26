/**
 * دادهٔ صفحاتِ تک‌مجموعه (/collections/[slug]) — فاز ۱.
 *
 * هر مجموعه فهرستی از محصولاتِ خود را دارد. «شعلهٔ طلایی» (flame) محصولاتِ
 * واقعی‌اش را از پوشهٔ public/collections/flame/ می‌گیرد؛ بقیهٔ مجموعه‌ها فعلاً
 * با گزیده‌ای از محصولاتِ موجود پر می‌شوند تا صفحه‌شان مثلِ هم کار کند، و بعداً
 * با افزودنِ پوشهٔ public/collections/<slug>/ جای آن‌ها داده‌های واقعی می‌نشیند.
 *
 * هر صفحهٔ مجموعه دقیقاً ساختارِ صفحهٔ «محصولات» را دارد (همان هیرو، مرورگر و
 * شبکه)؛ تنها داده فرق می‌کند. کلیکِ روی هر محصول → صفحهٔ تک‌محصول در همان مسیرِ
 * مجموعه: /collections/<slug>/<product-slug>.
 */
import {
  type Product,
  GOLD_COLORS,
  PRODUCTS,
  HIGH_JEWELRY,
  PRICE_RANGES,
  HIGH_JEWELRY_PRICE_RANGES,
  COLLECTIONS,
} from "./site-data";
import { karatLabel } from "./product-detail";

/** محصولاتِ واقعیِ مجموعهٔ «شعلهٔ طلایی» — عکس‌ها در public/collections/flame/ */
const FLAME_PRODUCTS: readonly Product[] = [
  { id: "f1", title: "انگشترِ پیچشِ شعله — طلای زرد", slug: "twist-ring-yellow", category: "ring", categoryLabel: "انگشتر", weight: 5.4, karat: 18, price: 28_500_000, image: "/collections/flame/ring-yellow.webp", colors: ["yellow"], badge: "new" },
  { id: "f2", title: "انگشترِ پیچشِ شعله — طلای سفید", slug: "twist-ring-white", category: "ring", categoryLabel: "انگشتر", weight: 5.6, karat: 18, price: 29_200_000, image: "/collections/flame/ring-white.webp", colors: ["white"], badge: null },
  { id: "f3", title: "گردنبندِ پگاسوسِ توپازِ آبی", slug: "pegasus-necklace", category: "necklace", categoryLabel: "گردنبند", weight: 9.2, karat: 18, price: 92_000_000, image: "/collections/flame/pegasus-necklace.webp", colors: ["white"], badge: "bestseller" },
  { id: "f4", title: "دکمه‌سردستِ بیضیِ مینا — طلای زرد", slug: "oval-cufflinks-yellow", category: "cufflinks", categoryLabel: "دکمه‌سردست", weight: 11.4, karat: 18, price: 38_000_000, image: "/collections/flame/cufflinks-oval-yellow.webp", colors: ["yellow"], badge: null },
  { id: "f5", title: "دکمه‌سردستِ بیضیِ مینا — طلای سفید", slug: "oval-cufflinks-white", category: "cufflinks", categoryLabel: "دکمه‌سردست", weight: 11.6, karat: 18, price: 39_500_000, image: "/collections/flame/cufflinks-oval-white.webp", colors: ["white"], badge: null },
  { id: "f6", title: "دکمه‌سردستِ چهارپرِ مینا — طلای زرد", slug: "quatrefoil-cufflinks-yellow", category: "cufflinks", categoryLabel: "دکمه‌سردست", weight: 12.1, karat: 18, price: 41_000_000, image: "/collections/flame/cufflinks-square-yellow.webp", colors: ["yellow"], badge: null },
  { id: "f7", title: "دکمه‌سردستِ چهارپرِ مینا — طلای سفید", slug: "quatrefoil-cufflinks-white", category: "cufflinks", categoryLabel: "دکمه‌سردست", weight: 12.3, karat: 18, price: 42_500_000, image: "/collections/flame/cufflinks-square-white.webp", colors: ["white"], badge: null },
  { id: "f8", title: "انگشترِ توپازِ آبی", slug: "topaz-ring", category: "ring", categoryLabel: "انگشتر", weight: 6.0, karat: 18, price: 56_000_000, image: "/collections/flame/topaz-ring.webp", colors: ["white"], badge: "new" },
  { id: "f9", title: "آویزِ توپازِ آبی", slug: "topaz-pendant", category: "pendant", categoryLabel: "پلاک و آویز", weight: 6.8, karat: 18, price: 48_000_000, image: "/collections/flame/topaz-pendant.webp", colors: ["white"], badge: null },
] as const;

/** گزینشِ چند محصول از یک فهرست بر اساسِ id (با حفظِ ترتیبِ id‌های داده‌شده) */
function pick(list: readonly Product[], ids: readonly string[]): Product[] {
  return ids
    .map((id) => list.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
}

/**
 * محصولاتِ هر مجموعه. «flame» واقعی است؛ بقیه گزیده‌ای از محصولاتِ موجود
 * (تا افزودنِ پوشهٔ عکسِ اختصاصیِ هر مجموعه در فازِ بعد).
 */
export const COLLECTION_PRODUCTS: Record<string, readonly Product[]> = {
  flame: FLAME_PRODUCTS,
  panther: pick(HIGH_JEWELRY, ["h9", "h2", "h5", "h8", "h4", "h1"]),
  engagement: [
    ...pick(HIGH_JEWELRY, ["h5", "h1", "h10"]),
    ...pick(PRODUCTS, ["p7", "p1", "p19"]),
  ],
  name: pick(PRODUCTS, ["p2", "p11", "p17"]),
  heritage: pick(PRODUCTS, ["p3", "p8", "p4", "p13", "p6"]),
  orchid: [
    ...pick(PRODUCTS, ["p20", "p5", "p21"]),
    ...pick(HIGH_JEWELRY, ["h12", "h3"]),
  ],
  eden: pick(PRODUCTS, ["p14", "p10", "p15", "p9", "p7"]),
  moonlight: [
    ...pick(PRODUCTS, ["p16", "p13", "p5"]),
    ...pick(HIGH_JEWELRY, ["h3", "h6"]),
  ],
};

/** توضیحِ کوتاهِ هیروی هر مجموعه (eyebrow انگلیسی + متنِ فارسی) */
const COLLECTION_META: Record<string, { eyebrow: string; description: string }> = {
  flame: {
    eyebrow: "Golden Flame",
    description:
      "الهام‌گرفته از رقصِ نور و آتش؛ قطعاتی با خطوطِ پیچان و درخششِ گرم، از انگشتر و آویزِ نگین‌دار تا دکمه‌سردستِ مینا‌کاری‌شده در طلای ۱۸ عیار.",
  },
  panther: {
    eyebrow: "Panther",
    description:
      "وقار و چابکیِ پلنگ در جواهراتی جسور و نگین‌نشان؛ خطوطی بی‌باک و درخششی ماندگار برای لحظه‌های خاص.",
  },
  engagement: {
    eyebrow: "Forever Moments",
    description:
      "حلقه‌ها و قطعاتِ نامزدی با نگین‌های دست‌چین و طراحیِ اختصاصی؛ روایت‌گرِ آغازِ یک زندگیِ تازه.",
  },
  name: {
    eyebrow: "My Name",
    description:
      "پلاک و آویزِ نام و حروف؛ قطعه‌ای شخصی و یکتا که داستانِ شما را همراهی می‌کند.",
  },
  heritage: {
    eyebrow: "Heritage",
    description:
      "ریشه در اصالت و هنرِ زرگریِ ایرانی؛ قطعاتی کلاسیک و ماندگار که نسل به نسل می‌مانند.",
  },
  orchid: {
    eyebrow: "Orchid",
    description:
      "ظرافتِ گل‌ها در جواهراتی لطیف و رنگین؛ گوشواره و گردنبندهایی که طبیعت را به دستانِ شما می‌آورند.",
  },
  eden: {
    eyebrow: "Garden of Eden",
    description:
      "باغی از زیبایی؛ قطعاتی سبک و روزمره با حسی از آرامش و سرزندگیِ طبیعت.",
  },
  moonlight: {
    eyebrow: "Moonlight",
    description:
      "درخششِ مهتاب در طلای سفید و نگین‌های روشن؛ قطعاتی آرام و درخشان برای شب‌های خاص.",
  },
};

const DEFAULT_DESCRIPTION =
  "گزیده‌ای از قطعاتِ این مجموعهٔ گنج‌ریز؛ هر قطعه با عیارِ تضمین‌شده و وسواسِ کاملِ استادکارانِ ما ساخته شده است.";

/** ابرداده‌ی مجموعه از روی COLLECTIONS (عنوان/عکسِ کاور) + توضیح/eyebrow */
export function getCollectionMeta(slug: string) {
  const base = COLLECTIONS.find((c) => c.slug === slug);
  if (!base) return undefined;
  const meta = COLLECTION_META[slug];
  return {
    title: base.title,
    image: base.image,
    eyebrow: meta?.eyebrow ?? "Collection",
    description: meta?.description ?? DEFAULT_DESCRIPTION,
  };
}

/** دادهٔ هیروی صفحهٔ مجموعه — هم‌شکلِ ورودیِ ProductsHero */
export function collectionHero(slug: string) {
  const meta = getCollectionMeta(slug);
  if (!meta) return undefined;
  return {
    eyebrow: meta.eyebrow,
    title: meta.title,
    description: meta.description,
    image: meta.image,
  };
}

/** محصولاتِ یک مجموعه */
export function getCollectionProducts(slug: string): readonly Product[] {
  return COLLECTION_PRODUCTS[slug] ?? [];
}

/** یک محصولِ مشخص درونِ یک مجموعه (برای صفحهٔ تک‌محصولِ مسیرِ مجموعه) */
export function getCollectionProduct(
  slug: string,
  productSlug: string
): Product | undefined {
  return getCollectionProducts(slug).find((p) => p.slug === productSlug);
}

type FilterGroupDef = {
  key: string;
  title: string;
  options: { label: string; value: string }[];
};

// ترتیبِ ثابتِ رنگ‌ها برای نمایشِ یکدست در فیلتر
const COLOR_ORDER = ["yellow", "white", "rose"] as const;

/**
 * گروه‌های فیلترِ یک مجموعه را از روی محصولاتش می‌سازد (دسته‌بندی/رنگ/عیار)،
 * تا فیلتر فقط گزینه‌هایی را نشان دهد که در همین مجموعه وجود دارند.
 * بازهٔ قیمت بسته به گران‌ترین قطعه از بازه‌های معمولی یا لوکس انتخاب می‌شود.
 */
export function buildCollectionFilterGroups(
  products: readonly Product[]
): FilterGroupDef[] {
  // دسته‌بندی — یکتا بر اساسِ category، با برچسبِ همان محصول، به ترتیبِ ظهور
  const catMap = new Map<string, string>();
  for (const p of products) if (!catMap.has(p.category)) catMap.set(p.category, p.categoryLabel);
  const categoryOptions = [...catMap].map(([value, label]) => ({ label, value }));

  // رنگ — یکتا، به ترتیبِ ثابتِ زرد/سفید/رُز
  const presentColors = new Set(products.flatMap((p) => p.colors));
  const colorOptions = COLOR_ORDER.filter((c) => presentColors.has(c)).map((c) => ({
    label: GOLD_COLORS[c].label,
    value: c,
  }));

  // عیار — یکتا، صعودی
  const karats = [...new Set(products.map((p) => p.karat))].sort((a, b) => a - b);
  const karatOptions = karats.map((k) => ({ label: karatLabel(k), value: String(k) }));

  const priceRanges = collectionPriceRanges(products);

  const groups: FilterGroupDef[] = [];
  if (categoryOptions.length > 1)
    groups.push({ key: "category", title: "دسته‌بندی", options: categoryOptions });
  if (colorOptions.length > 1)
    groups.push({ key: "color", title: "رنگ طلا", options: colorOptions });
  if (karatOptions.length > 1)
    groups.push({ key: "karat", title: "عیار", options: karatOptions });
  groups.push({
    key: "price",
    title: "محدودهٔ قیمت",
    options: priceRanges.map((r) => ({ label: r.label, value: r.value })),
  });
  return groups;
}

/** بازه‌های قیمتِ مناسبِ مجموعه — لوکس اگر گران‌ترین قطعه از ۱۰۰ میلیون بیشتر باشد */
export function collectionPriceRanges(products: readonly Product[]) {
  const max = products.reduce((m, p) => Math.max(m, p.price), 0);
  return max > 100_000_000 ? HIGH_JEWELRY_PRICE_RANGES : PRICE_RANGES;
}
