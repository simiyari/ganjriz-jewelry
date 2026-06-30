import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Eyebrow } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "صفحه یافت نشد",
  description: "صفحه‌ای که دنبالش بودید پیدا نشد.",
};

// دکمه‌ها — هم‌شکلِ بقیهٔ سایت (Carrera): گوشه‌تیز، h-11
const BTN_BASE =
  "inline-flex h-11 items-center justify-center px-9 text-[13px] font-medium tracking-wide transition-colors duration-300 ease-out";
const BTN_SOLID = `${BTN_BASE} bg-ink text-white hover:bg-[#2d2d2d]`;
const BTN_OUTLINE = `${BTN_BASE} border border-[#d0d0d0] text-ink hover:border-[#2d2d2d]`;

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <section className="container-lux flex min-h-[58vh] flex-col items-center justify-center py-20 text-center md:py-28">
          <Eyebrow>Error 404</Eyebrow>
          <p className="font-display text-[64px] font-semibold leading-none tracking-tight text-ink md:text-[88px]">
            ۴۰۴
          </p>
          <h1 className="mt-6 text-[24px] font-semibold leading-snug text-ink md:text-[30px]">
            صفحه‌ای که دنبالش بودید پیدا نشد
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-8 text-muted">
            ممکن است نشانی را اشتباه وارد کرده باشید یا این صفحه جابه‌جا شده باشد.
            می‌توانید به صفحهٔ اصلی برگردید یا مجموعه‌های ما را ببینید.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Link href="/" className={BTN_SOLID}>
              بازگشت به خانه
            </Link>
            <Link href="/products" className={BTN_OUTLINE}>
              مشاهدهٔ محصولات
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
