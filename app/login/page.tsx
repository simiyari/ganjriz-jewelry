import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthPanel from "@/components/account/AuthPanel";

export const metadata: Metadata = {
  title: "ورود / ثبت‌نام",
  description:
    "وارد حساب کاربریِ گنج‌ریز شوید یا حسابِ جدید بسازید؛ خریدِ شخصی‌سازی‌شده، تسویهٔ سریع‌تر و پیگیریِ سفارش‌ها.",
};

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <section className="container-lux py-10 md:py-16">
          <AuthPanel />
        </section>
      </main>
      <Footer
        breadcrumb={[
          { label: "خانه", href: "/" },
          { label: "حساب کاربری" },
        ]}
      />
    </>
  );
}
