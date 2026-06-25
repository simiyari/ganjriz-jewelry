"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/* ──────────────────────────────────────────────
   استیتِ سراسریِ علاقه‌مندی‌ها — مثلِ سبد خرید ([[cart-drawer]] / CartContext) در سطحِ
   layout زندگی می‌کند و در localStorage ذخیره می‌شود؛ پس افزودن/حذف واقعاً می‌ماند و
   با ریلود یا جابه‌جاییِ صفحه برنمی‌گردد. کلیدِ ذخیره‌سازی: اسلاگِ محصول‌ها.
   ────────────────────────────────────────────── */

const STORAGE_KEY = "gj-wishlist-v1";
// فقط بارِ نخست (وقتی هنوز چیزی ذخیره نشده) چند قلمِ نمونه نشان داده می‌شود؛
// پس از آن، لیست کاملاً واقعی است و با حذف/افزودنِ کاربر تغییر می‌کند.
const SEED = ["pendant-name", "pendant-heart", "pendant-verse"];

type WishlistValue = {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  count: number;
  /** پس از خواندنِ localStorage true می‌شود (برای جلوگیری از فلشِ حالتِ خالی) */
  ready: boolean;
};

const WishlistContext = createContext<WishlistValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // بارگذاری از localStorage (یک‌بار پس از mount)؛ نبودِ کلید = بارِ نخست → دانهٔ نمونه
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) {
        setSlugs(SEED);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
      } else {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setSlugs(parsed.filter((s) => typeof s === "string"));
      }
    } catch {
      /* نادیده */
    }
    setHydrated(true);
  }, []);

  // ذخیره با هر تغییر (فقط پس از هیدریشن تا مقدارِ خالیِ اولیه روی دادهٔ ذخیره‌شده ننشیند)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
    } catch {
      /* نادیده */
    }
  }, [slugs, hydrated]);

  const has = (slug: string) => slugs.includes(slug);
  const add = (slug: string) => setSlugs((p) => (p.includes(slug) ? p : [...p, slug]));
  const remove = (slug: string) => setSlugs((p) => p.filter((s) => s !== slug));
  const toggle = (slug: string) =>
    setSlugs((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug]));

  return (
    <WishlistContext.Provider
      value={{ slugs, has, toggle, add, remove, count: slugs.length, ready: hydrated }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist باید درونِ <WishlistProvider> استفاده شود");
  return ctx;
}
