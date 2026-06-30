"use client";

import Link from "next/link";

/**
 * دکمهٔ سیاهِ رفرنس («دانلود/چاپِ جدول»). با href یک لینک است؛ بدونِ href
 * پنجرهٔ چاپ را باز می‌کند تا کاربر بتواند راهنما را چاپ/ذخیره کند.
 */
const CLS =
  "inline-flex h-11 w-fit items-center justify-center bg-ink px-7 text-[12px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 ease-out hover:bg-[#2d2d2d]";

export default function PrintButton({ label, href }: { label: string; href?: string }) {
  if (href) {
    return (
      <Link href={href} className={CLS}>
        {label}
      </Link>
    );
  }
  return (
    <button type="button" onClick={() => window.print()} className={CLS}>
      {label}
    </button>
  );
}
