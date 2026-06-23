import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/ui/RevealInit";
import ProductDetail from "@/components/products/ProductDetail";
import ProductPiece from "@/components/products/ProductPiece";
import ProductCarousel from "@/components/products/ProductCarousel";
import StoresSection from "@/components/home/StoresSection";
import { PRODUCTS } from "@/lib/site-data";
import { getProductBySlug } from "@/lib/product-detail";

// خروجی استاتیک — همهٔ اسلاگ‌ها از پیش ساخته می‌شوند
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "محصول یافت نشد" };
  return {
    title: product.title,
    description: `${product.title} — ${product.categoryLabel} از گنج‌ریز با عیارِ تضمین‌شده و قیمت‌گذاری بر اساسِ نرخِ روزِ طلا.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  // «از این مجموعه» — هم‌دسته (به‌جز خودش)، سپس تکمیل با بقیه
  const sameCat = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  );
  const others = PRODUCTS.filter(
    (p) => p.category !== product.category && p.id !== product.id
  );
  const collection = [...sameCat, ...others].slice(0, 6);
  const recent = others.slice(0, 6);

  return (
    <>
      <Header />
      <main className="bg-background">
        <ProductDetail product={product} />
        <ProductPiece product={product} />
        <ProductCarousel
          eyebrow="From this Collection"
          title="از این مجموعه"
          products={collection}
        />
        <ProductCarousel
          eyebrow="Recently Viewed"
          title="اخیراً دیده‌شده"
          products={recent}
        />
        <StoresSection />
      </main>
      <Footer />
      {/* انیمیشنِ اسکرولِ تیترهای بخش‌های پایینی */}
      <RevealInit />
    </>
  );
}
