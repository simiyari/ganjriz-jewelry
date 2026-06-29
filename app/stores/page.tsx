import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StoreLocator from "@/components/stores/StoreLocator";

export const metadata: Metadata = {
  title: "یافتن شعبه",
  description:
    "نشانی، تلفن، ایمیل و ساعاتِ کاری شعبه‌های گنج‌ریز در کرج — روی نقشه پیدا کنید و مسیریابی کنید.",
};

export default function StoresPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <StoreLocator />
      </main>
      <Footer
        breadcrumb={[
          { label: "خانه", href: "/" },
          { label: "یافتن شعبه" },
        ]}
      />
    </>
  );
}
