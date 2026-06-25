"use client";

import { useState } from "react";
import AccountShell from "@/components/account/AccountShell";

/* اشتراکِ خبرنامه — یک گزینهٔ سادهٔ عضویت (فاز ۱). */

export default function NewsletterPage() {
  return (
    <AccountShell title="اشتراکِ خبرنامه">
      <NewsletterForm />
    </AccountShell>
  );
}

function NewsletterForm() {
  const [saved, setSaved] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex max-w-xl flex-col gap-6">
      {saved && (
        <p className="border-s-2 border-success bg-success/5 px-4 py-3 text-[13px] leading-7 text-success">
          تنظیماتِ اشتراکِ شما ذخیره شد. (نسخهٔ نمایشی)
        </p>
      )}

      <p className="text-[14px] leading-7 text-muted">
        با عضویت در خبرنامهٔ گنج‌ریز، از مجموعه‌های تازه، رویدادها و پیشنهادهای ویژه پیش از همه باخبر شوید.
      </p>

      <label className="flex cursor-pointer items-center gap-3 text-[14px] text-ink">
        <input type="checkbox" className="h-4 w-4 accent-ink" />
        عضویت در خبرنامهٔ عمومیِ گنج‌ریز
      </label>

      <div>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center bg-ink px-10 text-[12px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 ease-out hover:bg-[#2d2d2d]"
        >
          ذخیرهٔ تنظیمات
        </button>
      </div>
    </form>
  );
}
