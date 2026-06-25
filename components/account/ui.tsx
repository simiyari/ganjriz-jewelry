import Link from "next/link";
import { type ReactNode } from "react";

/* ──────────────────────────────────────────────
   اجزای کوچکِ مشترکِ پنلِ کاربری — جعبهٔ خط‌دار، تیترِ بخش، دکمه‌ها و حالتِ خالی.
   دکمه‌های پُر مشکی می‌مانند؛ دکمه‌های سفید پُر نمی‌شوند — فقط خطِ دورشان در هاور
   تیره می‌شود (#d0d0d0 → #2d2d2d).
   ────────────────────────────────────────────── */

/** دکمهٔ پُرِ مشکی (تمام‌عرض) — ارتفاعِ استانداردِ ۴۴px (h-11) مثلِ همهٔ دکمه‌ها */
export const ACC_BTN =
  "flex h-11 w-full items-center justify-center bg-ink text-[12px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 ease-out hover:bg-[#2d2d2d]";

/** دکمهٔ خط‌دارِ سفید — پس‌زمینه ثابت؛ فقط خطِ دور در هاور تیره می‌شود؛ ارتفاعِ ۴۴px */
export const ACC_BTN_OUTLINE =
  "inline-flex h-11 items-center justify-center border border-[#d0d0d0] px-7 text-[12px] font-semibold tracking-[0.08em] text-ink transition-colors duration-300 ease-out hover:border-[#2d2d2d]";

/** تیترِ بخش (مثلِ «اطلاعاتِ حساب»، «دفترچهٔ نشانی») */
export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[19px] font-semibold tracking-tight text-ink md:text-[22px]">{children}</h2>
  );
}

/** جعبهٔ خط‌دار با سرتیترِ کوچک و خطِ جداکننده (مثلِ کارت‌های مرجع) */
export function Panel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col border border-[#2d2d2d]">
      <div className="border-b border-[#2d2d2d] px-6 py-4">
        <h3 className="text-[13px] font-semibold tracking-[0.06em] text-ink">{title}</h3>
      </div>
      <div className="flex flex-1 flex-col px-6 py-6 text-[14px] leading-7 text-ink">{children}</div>
    </div>
  );
}

/** لینکِ متنیِ کوچک (مثلِ «تغییرِ رمزِ عبور»، «بازگشت») */
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[13px] text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
    >
      {children}
    </Link>
  );
}

/** حالتِ خالی — کادرِ تمام‌عرض با خطِ بالا و متنِ وسط (مثلِ «هیچ سفارشی ندارید») */
export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="border-t-2 border-ink">
      <div className="border border-t-0 border-line px-6 py-8 text-center text-[14px] text-muted">
        {children}
      </div>
    </div>
  );
}
