"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { GOLD_COLORS } from "@/lib/site-data";
import { faNumber, faDigits } from "@/lib/format";
import { asset } from "@/lib/asset";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CloseIcon,
  InfoIcon,
  LockIcon,
  PhoneIcon,
  MailIcon,
} from "@/components/ui/icons";
import GoldColorDot from "@/components/ui/GoldColorDot";
import { useCart } from "./CartContext";
import { useWishlist } from "@/components/wishlist/WishlistContext";

/* ──────────────────────────────────────────────
   صفحهٔ سبد خرید — کلونِ RTLِ صفحهٔ «Your Selections»ِ Carrera با هویتِ گنج‌ریز.
   چیدمان (آینهٔ RTL): فهرستِ اقلام سمتِ راست روی زمینهٔ طوسی، خلاصهٔ سفارش سمتِ چپ
   روی زمینهٔ سفید با خطِ جداکنندهٔ نازک. هر دو ستون به لبهٔ صفحه فول‌بلید می‌شوند و
   لبه‌های محتوا با گاترِ container-lux (۱۵۳۶) تراز می‌مانند تا با هدر هم‌خط بمانند.
   استیت از useCart (سراسری + ذخیره‌شده). فاز ۱: «تسویه حساب» به /checkout می‌رود.
   ────────────────────────────────────────────── */

/** آکاردئونِ خلاصه (ارسال/پرداخت) — هم‌سبکِ آکاردئونِ کانونیِ سایت ([[reuse-existing-patterns]]
   / ProductDetail): خطِ پایینِ نازک که فقط روی هاور به مشکی پررنگ می‌شود؛ رنگِ متن ثابت. */
function SummaryAccordion({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line transition-colors duration-300 hover:border-ink">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-[13px] font-semibold text-ink"
      >
        {title}
        <ChevronDownIcon
          className={`h-4 w-4 text-muted transition-transform duration-500 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-[13px] leading-7 text-muted">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default function CartView() {
  const { items, subtotal, removeItem, changeQty } = useCart();
  const { add: addToWishlist } = useWishlist();

  // مبالغ — قیمت‌ها شاملِ مالیات‌اند؛ مالیاتِ لحاظ‌شده فقط برای نمایش جدا می‌شود
  const vatIncluded = Math.round(subtotal - subtotal / 1.09);
  const grandTotal = subtotal;

  // انتقال به علاقه‌مندی‌ها — افزودنِ اسلاگ به ویش‌لیست و حذف از سبد
  const moveToWishlist = (slug: string, lineId: string) => {
    addToWishlist(slug);
    removeItem(lineId);
  };

  // سبدِ خالی — مثلِ صفحهٔ تسویه
  if (items.length === 0) {
    return (
      <div className="container-lux flex flex-col items-center justify-center gap-6 py-24 text-center md:py-32">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">سبد خرید شما خالی است</h1>
        <p className="max-w-sm text-[15px] leading-8 text-muted">
          هنوز قطعه‌ای به سبد نیفزوده‌اید. مجموعه‌های گنج‌ریز را ببینید و دلخواهتان را برگزینید.
        </p>
        <Link
          href="/products"
          className="inline-flex h-11 items-center justify-center border border-[#d0d0d0] px-9 text-[13px] font-medium tracking-wide text-ink transition-colors duration-300 hover:border-[#2d2d2d]"
        >
          مشاهدهٔ محصولات
        </Link>
      </div>
    );
  }

  return (
    // در RTL: ستونِ راست = اقلام (طوسی)، ستونِ چپ = خلاصهٔ سفارش (سفید با خطِ جداکننده).
    // موبایل: فلکس تا با order، خلاصه پایین و اقلام بالا قرار گیرند.
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_minmax(340px,34%)]">
      {/* ── ستونِ اقلام — راست در RTL، زمینهٔ طوسیِ فول‌بلید ── */}
      <div className="bg-surface px-4 py-10 md:px-6 md:py-14 lg:py-16 lg:pe-12 lg:ps-[max(1.5rem,calc((100vw_-_1536px)/2_+_1.5rem))]">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] text-ink transition-colors duration-300 hover:text-accent-dark"
        >
          <ChevronRightIcon className="h-4 w-4" />
          بازگشت به فروشگاه
        </Link>

        <h1 className="mt-8 text-[26px] font-semibold tracking-tight text-ink md:text-[32px]">
          انتخاب‌های شما
        </h1>

        {/* فهرستِ اقلام — کارت‌های سفید روی زمینهٔ طوسی */}
        <ul className="mt-8 flex flex-col gap-5">
          {items.map((line) => (
            <li key={line.id} className="flex gap-5 bg-background p-4 sm:gap-6 sm:p-5">
              <Link
                href={`/products/${line.product.slug}`}
                className="relative aspect-square w-28 shrink-0 self-start overflow-hidden bg-surface sm:w-44 lg:w-52"
              >
                <Image
                  src={asset(line.product.image)}
                  alt={line.product.title}
                  fill
                  sizes="(min-width: 1024px) 208px, (min-width: 640px) 176px, 112px"
                  className="object-cover"
                />
              </Link>

              <div className="flex min-w-0 flex-1 flex-col">
                {/* تیتر + دکمهٔ حذف */}
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={`/products/${line.product.slug}`}
                    className="text-[15px] font-semibold leading-7 text-ink transition-colors duration-300 hover:text-accent-dark"
                  >
                    {line.product.title}
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeItem(line.id)}
                    aria-label={`حذفِ ${line.product.title}`}
                    className="-mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-[#2d2d2d] hover:text-ink"
                  >
                    <CloseIcon className="h-4 w-4" />
                  </button>
                </div>

                {/* اکشن‌ها — انتقال به علاقه‌مندی‌ها / ویرایش */}
                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] tracking-wide">
                  <button
                    type="button"
                    onClick={() => moveToWishlist(line.product.slug, line.id)}
                    className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
                  >
                    انتقال به علاقه‌مندی‌ها
                  </button>
                  <Link
                    href={`/products/${line.product.slug}`}
                    className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
                  >
                    ویرایش
                  </Link>
                </div>

                {/* کدِ محصول + رنگ + سایز */}
                <span dir="ltr" className="mt-4 self-start text-[12px] tracking-wide text-muted">
                  GR-{line.product.id.toUpperCase()}
                </span>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-muted">
                  <span className="flex items-center gap-1.5">
                    <GoldColorDot color={line.color} size={20} decorative />
                    {GOLD_COLORS[line.color].label}
                  </span>
                  {line.size != null && (
                    <span>
                      سایز: <span className="text-ink">{faDigits(line.size)}</span>
                    </span>
                  )}
                </div>

                {/* استپرِ تعداد + قیمت */}
                <div className="mt-auto flex items-end justify-between pt-5">
                  <div className="flex items-center border border-line bg-surface">
                    <button
                      type="button"
                      onClick={() => changeQty(line.id, -1)}
                      aria-label="کاهشِ تعداد"
                      disabled={line.qty <= 1}
                      className="grid h-9 w-9 place-items-center text-[15px] text-ink transition-colors duration-200 hover:bg-line disabled:text-faint"
                    >
                      −
                    </button>
                    <span className="min-w-9 text-center text-[13px] tabular-nums text-ink">
                      {faDigits(line.qty)}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQty(line.id, 1)}
                      aria-label="افزایشِ تعداد"
                      className="grid h-9 w-9 place-items-center text-[15px] text-ink transition-colors duration-200 hover:bg-line"
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
            </li>
          ))}
        </ul>
      </div>

      {/* ── خلاصهٔ سفارش — چپ در RTL، زمینهٔ سفید با خطِ جداکنندهٔ آغازین (آینهٔ مرجع) ── */}
      <aside className="bg-background px-4 py-10 md:px-6 md:py-14 lg:border-s lg:border-line lg:py-16 lg:ps-10 lg:pe-[max(1.5rem,calc((100vw_-_1536px)/2_+_1.5rem))]">
        <div className="lg:sticky" style={{ top: "calc(var(--header-h, 96px) + 16px)" }}>
          <div className="flex items-baseline justify-between">
            <h2 className="text-[18px] font-semibold tracking-tight text-ink">خلاصهٔ سفارش</h2>
            <span className="text-[12px] text-muted">{faDigits(items.length)} محصول</span>
          </div>

          {/* جمعِ جزء */}
          <div className="mt-5 flex items-center justify-between border-t border-line pt-5 text-[13px]">
            <span className="text-muted">جمعِ جزء</span>
            <span className="tabular-nums text-ink">{faNumber(subtotal)} تومان</span>
          </div>

          {/* مالیات لحاظ‌شده */}
          <div className="mt-4 flex items-center gap-2 border border-line bg-surface px-4 py-2.5 text-[12px] text-muted">
            <InfoIcon className="h-4 w-4 shrink-0" />
            مالیات بر ارزش افزوده در قیمت لحاظ شده است
          </div>

          {/* مالیات */}
          <div className="mt-4 flex items-center justify-between text-[13px]">
            <span className="text-muted">مالیات</span>
            <span className="tabular-nums text-muted">{faNumber(vatIncluded)} تومان</span>
          </div>

          {/* مبلغِ نهایی */}
          <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
            <span className="text-[14px] font-semibold tracking-[0.04em] text-ink">مبلغِ نهایی</span>
            <span className="text-[18px] font-semibold tabular-nums text-ink">
              {faNumber(grandTotal)}
              <span className="mr-1 text-[12px] font-normal text-muted">تومان</span>
            </span>
          </div>

          {/* تسویه حساب */}
          <Link
            href="/checkout"
            className="mt-6 flex h-11 w-full items-center justify-center gap-2 bg-ink text-[13px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 hover:bg-[#2d2d2d]"
          >
            <LockIcon className="h-4 w-4" />
            تسویه حساب
          </Link>

          {/* به کمک نیاز دارید؟ */}
          <div className="mt-10 border-t border-line pt-6">
            <p className="text-[14px] font-semibold tracking-tight text-ink">به کمک نیاز دارید؟</p>
            <p className="mt-3 text-[13px] leading-7 text-muted">
              می‌توانید پاسخ پرسش‌هایتان را در بخشِ{" "}
              <Link
                href="/faq"
                className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
              >
                پرسش‌های متداول
              </Link>{" "}
              بیابید.
            </p>
          </div>

          {/* تماس با ما */}
          <div className="mt-8">
            <p className="text-[14px] font-semibold tracking-tight text-ink">تماس با ما</p>
            <a
              href="tel:02112345678"
              dir="ltr"
              className="mt-4 flex items-center justify-end gap-2.5 text-[13px] text-muted transition-colors duration-300 hover:text-ink"
            >
              <span>۰۲۱ - ۱۲۳۴۵۶۷۸</span>
              <PhoneIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="mailto:sales@ganjriz.ir"
              dir="ltr"
              className="mt-3 flex items-center justify-end gap-2.5 text-[13px] text-muted transition-colors duration-300 hover:text-ink"
            >
              <span>sales@ganjriz.ir</span>
              <MailIcon className="h-[18px] w-[18px]" />
            </a>
            <p className="mt-4 text-[13px] leading-7 text-muted">
              پشتیبانیِ مشتریان در دسترس است:
              <br />
              شنبه تا پنجشنبه، ۱۰:۳۰ تا ۲۰:۰۰
            </p>
          </div>

          {/* آکاردئون‌ها — خطِ بالای فهرست ثابت، خطِ پایینِ هر آکاردئون روی هاور مشکی */}
          <div className="mt-8 border-t border-line">
            <SummaryAccordion title="ارسال و مرجوعی">
              ارسالِ امن و بیمه‌شده به سراسرِ کشور طیِ ۲ تا ۵ روزِ کاری انجام می‌شود. امکانِ بازگشتِ
              کالا تا ۷ روز پس از دریافت، مطابقِ شرایطِ مرجوعیِ گنج‌ریز فراهم است.
            </SummaryAccordion>
            <SummaryAccordion title="روش‌های پرداخت">
              پرداختِ امن از طریقِ درگاهِ بانکیِ معتبر و با تمامِ کارت‌های عضوِ شتاب، کارت‌به‌کارت، یا
              پرداختِ حضوری هنگامِ دریافت از شعبه.
            </SummaryAccordion>
          </div>
        </div>
      </aside>
    </div>
  );
}
