"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

/* ──────────────────────────────────────────────
   نوارِ کناریِ پنلِ کاربری — فهرستِ متنیِ ساده (مثلِ My Account مرجع). آیتمِ فعال
   خط‌زیر + پررنگ. «خروج» دکمه است: سشن را پاک و به صفحهٔ اصلی می‌برد.
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

  const isActive = (href: string) =>
    href === "/account" ? pathname === "/account" : pathname.startsWith(href);

  const onSignOut = () => {
    logout();
    // پس از خروج به صفحهٔ ورود می‌رویم (گیتِ پنل هم همین‌جا می‌برد، پس قطعی و بدونِ تداخل).
    router.replace("/login");
  };

  return (
    <nav aria-label="منوی حساب کاربری">
      <ul className="flex flex-col gap-px">
        {LINKS.map((l) => {
          const active = isActive(l.href);
          return (
            <li key={l.href}>
              <Link
                href={l.href}
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
    </nav>
  );
}
