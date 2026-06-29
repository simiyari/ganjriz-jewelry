"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { GOLD_COLORS } from "@/lib/site-data";
import { faNumber, faDigits } from "@/lib/format";
import { asset } from "@/lib/asset";
import { CloseIcon, InfoIcon } from "@/components/ui/icons";
import GoldColorDot from "@/components/ui/GoldColorDot";
import { useCart } from "./CartContext";

/* ──────────────────────────────────────────────
   کشوی سبد خرید — کلونِ RTLِ «Shopping Bag»ِ Carrera. از سمتِ چپ (پایانِ RTL،
   هم‌سمتِ آیکونِ سبد) سُر می‌خورد؛ عرض ۶۵۰px. استیت از useCart (سراسری + ذخیره‌شده).
   حالتِ پُر: عکس + «تعداد × نام» + کدِ محصول + رنگ + استپر + قیمت، و جمع‌بندیِ
   پایین. حالتِ خالی: فقط متن + دکمهٔ «ادامهٔ خرید» (مثلِ مرجع).
   ────────────────────────────────────────────── */

export default function CartDrawer() {
  const { items, subtotal, open, setOpen, removeItem, changeQty } = useCart();
  const close = () => setOpen(false);

  // قفلِ اسکرولِ صفحه + بستن با Esc، فقط وقتی باز است
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open} inert={!open}>
      {/* پوشش — کلیک برای بستن */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-ink/45 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* پنل — از سمتِ چپ سُر می‌خورد، عرضِ ۶۵۰px */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="سبد خرید"
        className={`absolute inset-y-0 left-0 flex w-full max-w-[650px] flex-col bg-background transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          open
            ? "translate-x-0 shadow-[0_0_80px_-20px_rgba(0,0,0,0.45)]"
            : "-translate-x-full"
        }`}
      >
        {/* سرتیتر */}
        <div className="flex items-center justify-between border-b border-line px-7 py-5">
          <h2 className="text-[15px] font-semibold tracking-[0.1em] text-ink">سبد خرید</h2>
          <button
            type="button"
            onClick={close}
            aria-label="بستنِ سبد خرید"
            className="-ml-2 grid h-9 w-9 place-items-center text-ink transition-colors duration-300 hover:text-accent-dark"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          /* حالتِ خالی — مثلِ مرجع: فقط متن + دکمه (بدونِ آیکون)، وسطِ پنل */
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-7 text-center">
            <p className="text-[15px] text-muted">سبد خرید شما خالی است</p>
            <button
              type="button"
              onClick={close}
              className="inline-flex h-11 items-center justify-center border border-[#d0d0d0] px-9 text-[13px] font-medium tracking-wide text-ink transition-colors duration-300 hover:border-[#2d2d2d]"
            >
              ادامهٔ خرید
            </button>
          </div>
        ) : (
          <>
            {/* آیتم‌ها — اسکرولِ داخلی (data-lenis-prevent تا با Lenis تداخل نکند) */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-7">
              {items.map((line) => (
                <div key={line.id} className="flex gap-5 border-b border-line py-6">
                  <Link
                    href={`/products/${line.product.slug}`}
                    onClick={close}
                    className="relative w-28 shrink-0 self-stretch overflow-hidden bg-surface"
                  >
                    <Image
                      src={asset(line.product.image)}
                      alt={line.product.title}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </Link>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${line.product.slug}`}
                        onClick={close}
                        className="text-[14px] font-medium leading-6 text-ink transition-colors duration-300 hover:text-accent-dark"
                      >
                        {faDigits(line.qty)} × {line.product.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(line.id)}
                        aria-label={`حذفِ ${line.product.title}`}
                        className="-mt-1 grid h-7 w-7 shrink-0 place-items-center text-muted transition-colors duration-300 hover:text-ink"
                      >
                        <CloseIcon className="h-4 w-4" />
                      </button>
                    </div>

                    {/* کدِ محصول */}
                    <span dir="ltr" className="mt-1 self-start text-[12px] tracking-wide text-muted">
                      GR-{line.product.id.toUpperCase()}
                    </span>

                    {/* رنگِ طلا */}
                    <div className="mt-2 flex items-center gap-2 text-[12px] text-muted">
                      <GoldColorDot color={line.color} size={20} decorative />
                      {GOLD_COLORS[line.color].label}
                    </div>

                    {/* سایزِ انتخابی — فقط برای محصولاتِ سایزدار */}
                    {line.size != null && (
                      <div className="mt-1 text-[12px] text-muted">
                        سایز: <span className="text-ink">{faDigits(line.size)}</span>
                      </div>
                    )}

                    {/* استپرِ تعداد + قیمت */}
                    <div className="mt-auto flex items-end justify-between pt-4">
                      <div className="flex items-center border border-line bg-surface">
                        <button
                          type="button"
                          onClick={() => changeQty(line.id, -1)}
                          aria-label="کاهشِ تعداد"
                          disabled={line.qty <= 1}
                          className="grid h-8 w-8 place-items-center text-[15px] text-ink transition-colors duration-200 hover:bg-line disabled:text-faint"
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-[13px] tabular-nums text-ink">
                          {faDigits(line.qty)}
                        </span>
                        <button
                          type="button"
                          onClick={() => changeQty(line.id, 1)}
                          aria-label="افزایشِ تعداد"
                          className="grid h-8 w-8 place-items-center text-[15px] text-ink transition-colors duration-200 hover:bg-line"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-[15px] font-semibold tabular-nums text-ink">
                        {faNumber(line.product.price * line.qty)}
                        <span className="mr-1 text-[11px] font-normal text-muted">تومان</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* جمع‌بندی */}
            <div className="border-t border-line px-7 py-6">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold tracking-[0.08em] text-ink">جمعِ کل</span>
                <span className="text-[18px] font-semibold tabular-nums text-ink">
                  {faNumber(subtotal)}
                  <span className="mr-1 text-[12px] font-normal text-muted">تومان</span>
                </span>
              </div>

              {/* مالیات — لحاظ‌شده در قیمت */}
              <div className="mt-3 flex items-center gap-2 border border-line bg-surface px-4 py-2.5 text-[12px] text-muted">
                <InfoIcon className="h-4 w-4 shrink-0" />
                مالیات بر ارزش افزوده در قیمت لحاظ شده است
              </div>

              {/* ارسال */}
              <div className="mt-3 flex items-center justify-between text-[13px]">
                <span className="text-muted">ارسالِ استاندارد (۱ تا ۳ روزِ کاری)</span>
                <span className="font-medium text-success">رایگان</span>
              </div>

              <Link
                href="/checkout"
                onClick={close}
                className="mt-5 flex h-11 w-full items-center justify-center bg-ink text-[13px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 hover:bg-[#2d2d2d]"
              >
                تسویه حساب
              </Link>
              <Link
                href="/cart"
                onClick={close}
                className="mt-3 flex h-11 w-full items-center justify-center border border-[#d0d0d0] text-[13px] font-medium tracking-wide text-ink transition-colors duration-300 hover:border-[#2d2d2d]"
              >
                مشاهدهٔ سبد خرید
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
