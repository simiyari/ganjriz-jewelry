import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductsHero from "@/components/products/ProductsHero";
import ProductsBrowser from "@/components/products/ProductsBrowser";
import CategoryLinks from "@/components/products/CategoryLinks";
import RevealInit from "@/components/ui/RevealInit";

export const metadata: Metadata = {
  title: "محصولات",
  description:
    "گزیدهٔ طلا و جواهرات گنج‌ریز — انگشتر، گردنبند، دستبند، گوشواره، پلاک و سکه با قیمت‌گذاری لحظه‌ای بر اساس نرخ روز طلا.",
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <ProductsHero />
        <ProductsBrowser />
        <CategoryLinks />
      </main>
      <Footer />
      {/* انیمیشن اسکرولِ بخش‌های ثابت (سربرگ) — کارت‌ها رِویلِ مستقلِ خود را دارند */}
      <RevealInit />
    </>
  );
}
