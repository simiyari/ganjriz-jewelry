"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AccountShell from "@/components/account/AccountShell";
import { PRODUCTS, type Product } from "@/lib/site-data";
import { asset } from "@/lib/asset";
import { faNumber, faDigits } from "@/lib/format";
import { useCart } from "@/components/cart/CartContext";
import { CloseIcon, ChevronDownIcon } from "@/components/ui/icons";

/* علاقه‌مندی‌ها — شبکهٔ محصولاتِ ذخیره‌شده با حذف و اقدام‌ها (مطابقِ my wish list.png). */

// سه قلمِ نمونه برای لیستِ علاقه‌مندی (پلاک/آویزها).
const WISHLIST_SLUGS = ["pendant-name", "pendant-heart", "pendant-verse"] as const;
const INITIAL = PRODUCTS.filter((p) => (WISHLIST_SLUGS as readonly string[]).includes(p.slug));

export default function WishlistPage() {
  return (
    <AccountShell title="علاقه‌مندی‌ها">
      <WishlistContent />
    </AccountShell>
  );
}

function WishlistContent() {
  const cart = useCart();
  const [items, setItems] = useState<Product[]>(INITIAL);
  const [note, setNote] = useState("");

  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));

  const addAll = () => {
    items.forEach((p) => cart.addItem(p, p.colors[0], 1));
    cart.setOpen(true);
  };

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
            className="inline-flex border border-ink px-7 py-3 text-[12px] font-semibold tracking-[0.08em] text-ink transition-colors duration-300 ease-out hover:bg-ink hover:text-white"
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

      <div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-3">
        {items.map((p) => (
          <div key={p.id} className="group flex flex-col">
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => remove(p.id)}
                aria-label={`حذفِ ${p.title} از علاقه‌مندی‌ها`}
                className="grid h-7 w-7 place-items-center text-muted transition-colors duration-300 hover:text-ink"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <Link
              href={`/products/${p.slug}`}
              className="relative block aspect-square overflow-hidden bg-surface"
            >
              <Image
                src={asset(p.image)}
                alt={p.title}
                fill
                sizes="(max-width:1024px) 45vw, 280px"
                className="img-zoom object-cover"
              />
            </Link>
            <Link
              href={`/products/${p.slug}`}
              className="mt-4 text-[14px] font-medium leading-6 text-ink transition-colors duration-300 hover:text-accent-dark"
            >
              {p.title}
            </Link>
            <span className="mt-1 text-[14px] tabular-nums text-muted">
              {faNumber(p.price)}
              <span className="ms-1 text-[11px]">تومان</span>
            </span>
          </div>
        ))}
      </div>

      {/* اقدام‌ها */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/account"
          className="text-[13px] text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
        >
          بازگشت
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setNote("لیستِ علاقه‌مندی‌ها به‌روز شد.")}
            className="inline-flex border border-ink px-5 py-3 text-[12px] font-semibold tracking-[0.08em] text-ink transition-colors duration-300 ease-out hover:bg-ink hover:text-white"
          >
            به‌روزرسانی
          </button>
          <button
            type="button"
            onClick={() => setNote("پیوندِ اشتراک‌گذاریِ علاقه‌مندی‌ها در نسخهٔ نمایشی فعال نیست.")}
            className="inline-flex border border-ink px-5 py-3 text-[12px] font-semibold tracking-[0.08em] text-ink transition-colors duration-300 ease-out hover:bg-ink hover:text-white"
          >
            اشتراک‌گذاری
          </button>
          <button
            type="button"
            onClick={addAll}
            className="inline-flex bg-ink px-6 py-3 text-[12px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 ease-out hover:bg-[#2d2d2d]"
          >
            افزودنِ همه به سبد
          </button>
        </div>
      </div>

      {note && <p className="text-[13px] text-muted">{note}</p>}

      <ListBar count={items.length} />
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
