"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "./AccountSidebar";
import { useAuth } from "./AuthContext";

/* ──────────────────────────────────────────────
   پوستهٔ پنلِ کاربری — هدر + تیترِ بزرگِ صفحه + نوارِ کناری (راست در RTL) + محتوا +
   فوتر. گیتِ ورود: فقط *پس از* خواندنِ سشن (ready) تصمیم می‌گیرد — اگر کاربر وارد نشده
   باشد به /login می‌برد. (احرازِ سمتِ کلاینت، چون خروجی استاتیک است.)

   چرا اسکلتون به‌جای «در حالِ بارگذاری…»؟ سشن در localStorage است و فقط پس از اجرای JS
   خوانده می‌شود؛ پس در رفرشِ کاربرِ واردشده یک لحظه ready=false است. به‌جای متنِ خالی که
   حسِ «پرت‌شدن/خطا» می‌دهد، همان چارچوبِ صفحه (تیتر + نوارِ کناری) فوراً نشان داده می‌شود و
   فقط ناحیهٔ محتوا اسکلتون می‌خورد تا محتوا سرِ جا پر شود (بدونِ جابه‌جاییِ چیدمان و بدونِ
   ریدایرکتِ کاذب). نوارِ کناری به user وابسته نیست، پس امن است. */

function ContentSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-hidden="true">
      <div className="h-5 w-40 bg-surface motion-safe:animate-pulse" />
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="h-40 border border-line bg-surface motion-safe:animate-pulse" />
        <div className="h-40 border border-line bg-surface motion-safe:animate-pulse" />
      </div>
      <div className="h-32 border border-line bg-surface motion-safe:animate-pulse" />
    </div>
  );
}

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
        <section className="container-lux py-10 md:py-14">
          <h1 className="text-[26px] font-semibold tracking-tight text-ink md:text-[30px]">
            {title}
          </h1>
          <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-[210px_1fr] md:gap-14">
            <AccountSidebar />
            <div className="min-w-0">
              {/* تا وقتی سشن خوانده و کاربر تأیید نشده، اسکلتون؛ سپس محتوای واقعی.
                  حالتِ «خوانده‌شده ولی بدونِ کاربر» هم اسکلتون می‌مانَد تا افکتِ بالا به
                  /login ببرد (بدونِ فلَشِ محتوا). */}
              {ready && user ? children : <ContentSkeleton />}
            </div>
          </div>
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
