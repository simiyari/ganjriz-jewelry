import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartView from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "سبد خرید",
  description:
    "سبد خریدِ گنج‌ریز؛ بازبینیِ انتخاب‌ها، تغییرِ تعداد و رفتن به تسویه‌حساب.",
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <CartView />
      </main>
      <Footer
        breadcrumb={[
          { label: "خانه", href: "/" },
          { label: "سبد خرید" },
        ]}
      />
    </>
  );
}
