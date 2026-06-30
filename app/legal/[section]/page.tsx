import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import LegalHub from "@/components/content/LegalHub";
import { CONTENT_PAGES, LEGAL_ORDER } from "@/lib/content-pages";

// خروجی استاتیک — صفحهٔ هر سند از پیش ساخته می‌شود
export function generateStaticParams() {
  return LEGAL_ORDER.map((section) => ({ section }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const data = CONTENT_PAGES[section];
  if (!data) return { title: "حقوقی و حریم خصوصی" };
  return { title: `${data.title} — حقوقی و حریم خصوصی`, description: data.intro };
}

export default async function LegalSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const data = CONTENT_PAGES[section];
  if (!data) notFound();

  return (
    <>
      <Header />
      <main className="bg-background">
        <LegalHub activeId={section} />
      </main>
      <Footer
        breadcrumb={[
          { label: "خانه", href: "/" },
          { label: "حقوقی و حریم خصوصی", href: "/legal/privacy" },
          { label: data.crumb },
        ]}
      />
    </>
  );
}
