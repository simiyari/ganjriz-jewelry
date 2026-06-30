import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomerServiceHub from "@/components/content/CustomerServiceHub";
import { CS_SECTIONS, getCSSection } from "@/lib/customer-service";

// خروجی استاتیک — صفحهٔ هر بخش از پیش ساخته می‌شود
export function generateStaticParams() {
  return CS_SECTIONS.map((s) => ({ section: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const s = getCSSection(section);
  if (!s) return { title: "خدمات مشتریان" };
  return { title: `${s.title} — خدمات مشتریان`, description: s.intro };
}

export default async function CustomerServiceSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const s = getCSSection(section);
  if (!s) notFound();

  return (
    <>
      <Header />
      <main className="bg-background">
        <CustomerServiceHub activeId={section} />
      </main>
      <Footer
        breadcrumb={[
          { label: "خانه", href: "/" },
          { label: "خدمات مشتریان", href: "/customer-service/care" },
          { label: s.label },
        ]}
      />
    </>
  );
}
