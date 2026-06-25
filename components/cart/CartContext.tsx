"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Product, type GoldColor } from "@/lib/site-data";

/* ──────────────────────────────────────────────
   استیتِ سراسریِ سبد خرید — در <CartProvider> (سطحِ layout) زندگی می‌کند تا با
   جابه‌جایی بینِ صفحات از بین نرود، و در localStorage ذخیره می‌شود تا با ریلود هم
   بماند. پیش‌فرض: خالی. فقط با addItem پر می‌شود و تا حذف‌نشدن می‌ماند.
   ────────────────────────────────────────────── */

export type CartLine = { id: string; product: Product; color: GoldColor; qty: number };

type CartContextValue = {
  items: CartLine[];
  count: number;
  subtotal: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  addItem: (product: Product, color: GoldColor, qty?: number) => void;
  removeItem: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "gj-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // بارگذاری از localStorage (یک‌بار پس از mount)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) setItems(parsed);
    } catch {
      /* نادیده */
    }
    setHydrated(true);
  }, []);

  // ذخیره با هر تغییر (فقط پس از هیدریشن تا مقدارِ خالیِ اولیه روی دادهٔ ذخیره‌شده ننشیند)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* نادیده */
    }
  }, [items, hydrated]);

  const addItem = (product: Product, color: GoldColor, qty = 1) =>
    setItems((prev) => {
      const id = `${product.id}-${color}`;
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, product, color, qty }];
    });

  const removeItem = (id: string) => setItems((prev) => prev.filter((l) => l.id !== id));

  const changeQty = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, l.qty + delta) } : l))
    );

  const clear = () => setItems([]);

  const count = items.reduce((n, l) => n + l.qty, 0);
  const subtotal = items.reduce((s, l) => s + l.product.price * l.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, open, setOpen, addItem, removeItem, changeQty, clear }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart باید درونِ <CartProvider> استفاده شود");
  return ctx;
}
