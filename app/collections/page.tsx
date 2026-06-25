import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductsHero from "@/components/products/ProductsHero";
import CollectionsBrowser from "@/components/collections/CollectionsBrowser";
import CategoryLinks from "@/components/products/CategoryLinks";
import RevealInit from "@/components/ui/RevealInit";
import { COLLECTIONS_PAGE, COLLECTION_QUICK_LINKS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "مجموعه‌ها",
  description:
    "مجموعه‌های گنج‌ریز — قطعاتی الهام‌گرفته از ظرافت، شکوه و هنرِ زرگری، برای دوست‌دارانِ لوکس و هنرِ ناب.",
};

// همان ساختار، شکل و نحوهٔ نمایشِ صفحهٔ محصولات؛ فقط محتوا «مجموعه‌ها» است.
export default function CollectionsPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <ProductsHero data={COLLECTIONS_PAGE} crumbLabel="مجموعه‌ها" />
        <CollectionsBrowser />
        <CategoryLinks links={COLLECTION_QUICK_LINKS} />
      </main>
      <Footer breadcrumb={[{ label: "خانه", href: "/" }, { label: "مجموعه‌ها" }]} />
      <RevealInit />
    </>
  );
}
