import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductsHero from "@/components/products/ProductsHero";
import ProductsBrowser from "@/components/products/ProductsBrowser";
import CategoryLinks from "@/components/products/CategoryLinks";
import RevealInit from "@/components/ui/RevealInit";
import { COLLECTIONS, COLLECTION_QUICK_LINKS } from "@/lib/site-data";
import {
  collectionHero,
  getCollectionMeta,
  getCollectionProducts,
  buildCollectionFilterGroups,
  collectionPriceRanges,
} from "@/lib/collections";

// خروجی استاتیک — صفحهٔ هر مجموعه از پیش ساخته می‌شود
export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getCollectionMeta(slug);
  if (!meta) return { title: "مجموعه یافت نشد" };
  return {
    title: `مجموعهٔ ${meta.title}`,
    description: meta.description,
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hero = collectionHero(slug);
  if (!hero) notFound();

  const products = getCollectionProducts(slug);
  const filterGroups = buildCollectionFilterGroups(products);
  const priceRanges = collectionPriceRanges(products);
  const basePath = `/collections/${slug}`;

  return (
    <>
      <Header />
      <main className="bg-background">
        <ProductsHero
          data={hero}
          crumbLabel={hero.title}
          parentCrumb={{ label: "مجموعه‌ها", href: "/collections" }}
        />
        <ProductsBrowser
          products={products}
          filterGroups={filterGroups}
          priceRanges={priceRanges}
          promo={null}
          basePath={basePath}
          gridHeading={`مجموعهٔ ${hero.title}`}
        />
        <CategoryLinks links={COLLECTION_QUICK_LINKS} />
      </main>
      <Footer
        breadcrumb={[
          { label: "خانه", href: "/" },
          { label: "مجموعه‌ها", href: "/collections" },
          { label: hero.title },
        ]}
      />
      <RevealInit />
    </>
  );
}
