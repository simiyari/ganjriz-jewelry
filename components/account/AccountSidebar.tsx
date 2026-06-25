"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { ChevronDownIcon } from "@/components/ui/icons";

/* ──────────────────────────────────────────────
   نوارِ کناریِ پنلِ کاربری — فهرستِ متنیِ ساده (مثلِ My Account مرجع). آیتمِ فعال
   خط‌زیر + پررنگ. «خروج» دکمه است: سشن را پاک و به صفحهٔ اصلی می‌برد.
   روی موبایل آکاردونی است (بسته، با کلیک باز می‌شود)؛ روی دسکتاپ همیشه نوارِ کناری.
   ────────────────────────────────────────────── */

const LINKS = [
  { label: "داشبورد", href: "/account" },
  { label: "اطلاعاتِ حساب", href: "/account/information" },
  { label: "دفترچهٔ نشانی", href: "/account/addresses" },
  { label: "سفارش‌های من", href: "/account/orders" },
  { label: "علاقه‌مندی‌ها", href: "/account/wishlist" },
  { label: "روش‌های پرداخت", href: "/account/payment-methods" },
  { label: "دیدگاه‌های من", href: "/account/reviews" },
  { label: "اشتراکِ خبرنامه", href: "/account/newsletter" },
] as const;

export default function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/account" ? pathname === "/account" : pathname.startsWith(href);

  // برچسبِ صفحهٔ فعال — روی موبایل در سرِ آکاردونی نشان داده می‌شود
  const activeLabel = LINKS.find((l) => isActive(l.href))?.label ?? "منوی حساب کاربری";

  const onSignOut = () => {
    logout();
    // پس از خروج به صفحهٔ ورود می‌رویم (گیتِ پنل هم همین‌جا می‌برد، پس قطعی و بدونِ تداخل).
    router.replace("/login");
  };

  return (
    <nav aria-label="منوی حساب کاربری">
      {/* روی موبایل: یک باکسِ واحد با خطِ جداکننده (سرِ آکاردونی + فهرست)؛
          روی دسکتاپ: بدونِ کادر، فهرست همیشه باز. کادرِ موبایل هم‌رنگِ پنل‌ها (#2d2d2d). */}
      <div className="border border-[#2d2d2d] md:border-0">
        {/* سرِ آکاردونی — فقط موبایل؛ هنگامِ باز، خطِ جداکنندهٔ پایین می‌گیرد */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className={`flex w-full items-center justify-between px-4 py-3 text-[13px] font-semibold text-ink md:hidden ${
            open ? "border-b border-[#2d2d2d]" : ""
          }`}
        >
          <span>{activeLabel}</span>
          <ChevronDownIcon
            className={`h-4 w-4 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* محفظهٔ انیمیشن — گرید 0fr→1fr برای بازشدنِ نرمِ بالا‌به‌پایین (و بستنِ نرم).
            روی دسکتاپ همیشه باز و بدونِ بریدگی. */}
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[1fr] ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden md:overflow-visible">
            <ul className="flex flex-col gap-px px-4 py-2 md:p-0">
              {LINKS.map((l) => {
                const active = isActive(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`block py-3 text-[13px] tracking-wide transition-colors duration-300 ${
                        active
                          ? "font-semibold text-ink underline decoration-ink decoration-1 underline-offset-[6px]"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <button
                  type="button"
                  onClick={onSignOut}
                  className="block py-3 text-[13px] tracking-wide text-muted transition-colors duration-300 hover:text-ink"
                >
                  خروج از حساب
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
