import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/ui/RevealInit";
import ProductDetail from "@/components/products/ProductDetail";
import ProductPiece from "@/components/products/ProductPiece";
import ProductCarousel from "@/components/products/ProductCarousel";
import StoresSection from "@/components/home/StoresSection";
import { HIGH_JEWELRY } from "@/lib/site-data";
import { getHighJewelryBySlug } from "@/lib/product-detail";

const BASE = "/high-jewelry";

// خروجی استاتیک — همهٔ اسلاگ‌های جواهرِ لوکس از پیش ساخته می‌شوند
export function generateStaticParams() {
  return HIGH_JEWELRY.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getHighJewelryBySlug(slug);
  if (!product) return { title: "محصول یافت نشد" };
  return {
    title: product.title,
    description: `${product.title} — ${product.categoryLabel}ِ لوکسِ گنج‌ریز با عیارِ تضمین‌شده و قیمت‌گذاری بر اساسِ نرخِ روزِ طلا.`,
  };
}

export default async function HighJewelryProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getHighJewelryBySlug(slug);
  if (!product) notFound();

  // «از این مجموعه» — هم‌دسته (به‌جز خودش)، سپس تکمیل با بقیهٔ قطعاتِ لوکس
  const sameCat = HIGH_JEWELRY.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const others = HIGH_JEWELRY.filter(
    (p) => p.category !== product.category && p.id !== product.id
  );
  const collection = [...sameCat, ...others].slice(0, 6);
  const recent = others.slice(0, 6);

  return (
    <>
      <Header />
      <main className="bg-background">
        <ProductDetail product={product} crumb={{ href: BASE, label: "جواهر لوکس" }} />
        <ProductPiece product={product} />
        <ProductCarousel
          eyebrow="From this Collection"
          title="از این مجموعه"
          products={collection}
          basePath={BASE}
        />
        <ProductCarousel
          eyebrow="Recently Viewed"
          title="اخیراً دیده‌شده"
          products={recent}
          basePath={BASE}
        />
        <StoresSection />
      </main>
      <Footer
        breadcrumb={[
          { label: "خانه", href: "/" },
          { label: "جواهر لوکس", href: BASE },
          { label: product.title },
        ]}
      />
      {/* انیمیشنِ اسکرولِ تیترهای بخش‌های پایینی */}
      <RevealInit />
    </>
  );
}
