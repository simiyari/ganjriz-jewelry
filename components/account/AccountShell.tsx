"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "./AccountSidebar";
import { useAuth } from "./AuthContext";

/* ──────────────────────────────────────────────
   پوستهٔ پنلِ کاربری — هدر + تیترِ بزرگِ صفحه + نوارِ کناری (راست در RTL) + محتوا +
   فوتر. گیتِ ورود: تا وقتی سشن خوانده نشده چیزی نشان نمی‌دهد؛ اگر کاربر وارد نشده
   باشد به /login می‌برد. (احرازِ سمتِ کلاینت، چون خروجی استاتیک است.)
   ────────────────────────────────────────────── */

export default function AccountShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const { user, ready } = useAuth();

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  return (
    <>
      <Header />
      <main className="min-h-[60vh] bg-background">
        {!ready || !user ? (
          <div className="container-lux py-28 text-center text-[14px] text-muted">
            در حالِ بارگذاری…
          </div>
        ) : (
          <section className="container-lux py-10 md:py-14">
            <h1 className="text-[26px] font-semibold tracking-tight text-ink md:text-[30px]">
              {title}
            </h1>
            <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-[210px_1fr] md:gap-14">
              <AccountSidebar />
              <div className="min-w-0">{children}</div>
            </div>
          </section>
        )}
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
