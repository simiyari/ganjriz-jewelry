import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/ui/RevealInit";
import ProductDetail from "@/components/products/ProductDetail";
import ProductPiece from "@/components/products/ProductPiece";
import ProductCarousel from "@/components/products/ProductCarousel";
import StoresSection from "@/components/home/StoresSection";
import { PRODUCTS, COLLECTIONS } from "@/lib/site-data";
import {
  getCollectionMeta,
  getCollectionProducts,
  getCollectionProduct,
} from "@/lib/collections";

// خروجی استاتیک — همهٔ ترکیب‌های (مجموعه × محصول) از پیش ساخته می‌شوند
export function generateStaticParams() {
  return COLLECTIONS.flatMap((c) =>
    getCollectionProducts(c.slug).map((p) => ({ slug: c.slug, product: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; product: string }>;
}): Promise<Metadata> {
  const { slug, product: productSlug } = await params;
  const product = getCollectionProduct(slug, productSlug);
  const meta = getCollectionMeta(slug);
  if (!product || !meta) return { title: "محصول یافت نشد" };
  return {
    title: product.title,
    description: `${product.title} از مجموعهٔ ${meta.title}ِ گنج‌ریز با عیارِ تضمین‌شده و قیمت‌گذاری بر اساسِ نرخِ روزِ طلا.`,
  };
}

export default async function CollectionProductPage({
  params,
}: {
  params: Promise<{ slug: string; product: string }>;
}) {
  const { slug, product: productSlug } = await params;
  const meta = getCollectionMeta(slug);
  const product = getCollectionProduct(slug, productSlug);
  if (!meta || !product) notFound();

  const basePath = `/collections/${slug}`;

  // «از این مجموعه» — بقیهٔ قطعاتِ همین مجموعه (هم‌دسته اول)
  const collectionItems = getCollectionProducts(slug).filter((p) => p.id !== product.id);
  const sameCat = collectionItems.filter((p) => p.category === product.category);
  const others = collectionItems.filter((p) => p.category !== product.category);
  const fromCollection = [...sameCat, ...others].slice(0, 6);
  // «اخیراً دیده‌شده» — از کاتالوگِ عمومی (مسیرِ /products)
  const recent = PRODUCTS.filter((p) => p.category !== product.category).slice(0, 6);

  return (
    <>
      <Header />
      <main className="bg-background">
        <ProductDetail
          product={product}
          crumb={{ href: basePath, label: meta.title }}
        />
        <ProductPiece product={product} />
        {fromCollection.length > 0 && (
          <ProductCarousel
            eyebrow="From this Collection"
            title={`از مجموعهٔ ${meta.title}`}
            products={fromCollection}
            basePath={basePath}
          />
        )}
        <ProductCarousel
          eyebrow="Recently Viewed"
          title="اخیراً دیده‌شده"
          products={recent}
        />
        <StoresSection />
      </main>
      <Footer
        breadcrumb={[
          { label: "خانه", href: "/" },
          { label: "مجموعه‌ها", href: "/collections" },
          { label: meta.title, href: basePath },
          { label: product.title },
        ]}
      />
      <RevealInit />
    </>
  );
}
