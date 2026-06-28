import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CheckoutPanel from "@/components/checkout/CheckoutPanel";

export const metadata: Metadata = {
  title: "تسویه حساب",
  description:
    "تسویه‌حسابِ امنِ گنج‌ریز؛ انتخابِ روشِ ارسال یا دریافتِ حضوری، ثبتِ آدرس و پرداختِ آنلاین.",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <CheckoutPanel />
      </main>
      <Footer
        breadcrumb={[
          { label: "خانه", href: "/" },
          { label: "تسویه حساب" },
        ]}
      />
    </>
  );
}
