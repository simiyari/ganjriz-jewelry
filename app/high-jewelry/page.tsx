import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductsHero from "@/components/products/ProductsHero";
import ProductsBrowser from "@/components/products/ProductsBrowser";
import CategoryLinks from "@/components/products/CategoryLinks";
import RevealInit from "@/components/ui/RevealInit";
import {
  HIGH_JEWELRY,
  HIGH_JEWELRY_PAGE,
  HIGH_JEWELRY_FILTER_GROUPS,
  HIGH_JEWELRY_PRICE_RANGES,
  HIGH_JEWELRY_PROMO,
  HIGH_JEWELRY_CATEGORY_LINKS,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "جواهر لوکس",
  description:
    "جواهراتِ لوکسِ گنج‌ریز — قطعاتِ نگین‌دارِ دست‌ساز با سنگ‌های گران‌بها و طراحیِ اختصاصی، با عیارِ تضمین‌شده.",
};

// ساختار، شکل و نحوهٔ نمایش دقیقاً مثلِ صفحهٔ محصولات؛ تنها داده‌ها (قطعاتِ لوکس و
// فیلترهای متناسب) جایگزین شده‌اند.
export default function HighJewelryPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <ProductsHero data={HIGH_JEWELRY_PAGE} crumbLabel="جواهر لوکس" />
        <ProductsBrowser
          products={HIGH_JEWELRY}
          filterGroups={HIGH_JEWELRY_FILTER_GROUPS}
          priceRanges={HIGH_JEWELRY_PRICE_RANGES}
          promo={HIGH_JEWELRY_PROMO}
          basePath="/high-jewelry"
        />
        <CategoryLinks links={HIGH_JEWELRY_CATEGORY_LINKS} />
      </main>
      <Footer breadcrumb={[{ label: "خانه", href: "/" }, { label: "جواهر لوکس" }]} />
      <RevealInit />
    </>
  );
}
