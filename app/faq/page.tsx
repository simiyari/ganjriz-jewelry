import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FaqBrowser from "@/components/content/FaqBrowser";
import { FAQ_CATEGORIES } from "@/lib/faq";

export const metadata: Metadata = {
  title: "سوالات متداول",
  description:
    "پاسخِ پرسش‌های پرتکرار دربارهٔ محصولات، قیمت‌گذاریِ طلا، ارسال، پرداخت، سفارش‌ها و خدماتِ پس از فروشِ گنج‌ریز.",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <FaqBrowser categories={FAQ_CATEGORIES} />
      </main>
      <Footer breadcrumb={[{ label: "خانه", href: "/" }, { label: "سوالات متداول" }]} />
    </>
  );
}
