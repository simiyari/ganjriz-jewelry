"use client";

import { useState } from "react";
import Link from "next/link";
import AccountShell from "@/components/account/AccountShell";
import { PRODUCTS, HIGH_JEWELRY, type Product } from "@/lib/site-data";
import { faDigits } from "@/lib/format";
import { useCart } from "@/components/cart/CartContext";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import ProductCard from "@/components/products/ProductCard";
import { ChevronDownIcon } from "@/components/ui/icons";

/* علاقه‌مندی‌ها — لیستِ واقعی و ماندگار از WishlistContext (localStorage).
   هر کارت همان کارتِ صفحهٔ محصولات است؛ قلبِ قرمزِ روی تصویر، آیتم را واقعاً حذف
   می‌کند و حذف با ریلود برنمی‌گردد (مطابقِ my wish list.png). */

// نگاشتِ اسلاگ → {محصول، مسیرِ پایه} از هر دو مجموعه (محصولات + جواهرِ لوکس)
const BY_SLUG = new Map<string, { product: Product; basePath: string }>();
for (const p of HIGH_JEWELRY) BY_SLUG.set(p.slug, { product: p, basePath: "/high-jewelry" });
for (const p of PRODUCTS) BY_SLUG.set(p.slug, { product: p, basePath: "/products" });

export default function WishlistPage() {
  return (
    <AccountShell title="علاقه‌مندی‌ها">
      <WishlistContent />
    </AccountShell>
  );
}

function WishlistContent() {
  const cart = useCart();
  const wishlist = useWishlist();
  const [note, setNote] = useState("");

  // اسلاگ‌های ذخیره‌شده را به محصولِ واقعی تبدیل می‌کنیم (ناشناخته‌ها نادیده)
  const items = wishlist.slugs
    .map((slug) => BY_SLUG.get(slug))
    .filter((x): x is { product: Product; basePath: string } => Boolean(x));

  const addAll = () => {
    items.forEach(({ product }) => cart.addItem(product, product.colors[0], 1));
    cart.setOpen(true);
  };

  // تا خوانده‌شدنِ localStorage چیزی نشان نده تا حالتِ خالی الکی فلش نزند
  if (!wishlist.ready) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <div className="border-t-2 border-ink">
          <div className="border border-t-0 border-line px-6 py-10 text-center text-[14px] text-muted">
            لیستِ علاقه‌مندی‌های شما خالی است.
          </div>
        </div>
        <div>
          <Link
            href="/products"
            className="inline-flex h-11 items-center justify-center border border-[#d0d0d0] px-7 text-[12px] font-semibold tracking-[0.08em] text-ink transition-colors duration-300 ease-out hover:border-[#2d2d2d]"
          >
            مشاهدهٔ محصولات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <ListBar count={items.length} />

      {/* همان کارت و چینشِ صفحهٔ محصولات؛ قلبِ قرمز = حذفِ واقعی از علاقه‌مندی‌ها */}
      <div className="grid grid-cols-2 items-start gap-3 lg:grid-cols-3">
        {items.map(({ product, basePath }) => (
          <ProductCard key={product.slug} product={product} basePath={basePath} />
        ))}
      </div>

      {/* اقدام‌ها */}
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <Link
          href="/account"
          className="text-[13px] text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
        >
          بازگشت
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setNote("پیوندِ اشتراک‌گذاریِ علاقه‌مندی‌ها در نسخهٔ نمایشی فعال نیست.")}
            className="inline-flex h-11 items-center justify-center border border-[#d0d0d0] px-5 text-[12px] font-semibold tracking-[0.08em] text-ink transition-colors duration-300 ease-out hover:border-[#2d2d2d]"
          >
            اشتراک‌گذاری
          </button>
          <button
            type="button"
            onClick={addAll}
            className="inline-flex h-11 items-center justify-center bg-ink px-6 text-[12px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 ease-out hover:bg-[#2d2d2d]"
          >
            افزودنِ همه به سبد
          </button>
        </div>
      </div>

      {note && <p className="text-[13px] text-muted">{note}</p>}
    </div>
  );
}

/** نوارِ شمارش + سلکتِ «نمایش» (بالا و پایینِ شبکه) */
function ListBar({ count }: { count: number }) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-3">
      <span className="text-[13px] text-muted">{faDigits(count)} مورد</span>
      <label className="flex items-center gap-2 text-[13px] text-muted">
        نمایش
        <span className="relative">
          <select
            aria-label="تعدادِ نمایش"
            className="appearance-none border border-line bg-transparent py-1.5 pe-7 ps-3 text-[13px] text-ink outline-none transition-colors hover:border-ink"
          >
            <option>۱۰</option>
            <option>۲۰</option>
            <option>۵۰</option>
          </select>
          <ChevronDownIcon className="pointer-events-none absolute end-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
        </span>
      </label>
    </div>
  );
}
