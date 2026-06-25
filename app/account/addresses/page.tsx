"use client";

import Link from "next/link";
import AccountShell from "@/components/account/AccountShell";
import { ACC_BTN, Panel, SectionTitle } from "@/components/account/ui";

/* دفترچهٔ نشانی — نشانی‌های پیش‌فرض + افزودنِ نشانیِ جدید. */

export default function AddressBookPage() {
  return (
    <AccountShell title="دفترچهٔ نشانی">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <SectionTitle>نشانی‌های پیش‌فرض</SectionTitle>
          <Link
            href="/account/addresses/new"
            className="inline-flex h-11 items-center justify-center border border-[#d0d0d0] px-6 text-[12px] font-semibold tracking-[0.08em] text-ink transition-colors duration-300 ease-out hover:border-[#2d2d2d]"
          >
            افزودنِ نشانیِ جدید
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Panel title="نشانیِ پیش‌فرضِ صورتحساب">
            <p className="text-muted">نشانیِ پیش‌فرضِ صورتحساب تنظیم نشده است.</p>
            <Link href="/account/addresses/new" className={`${ACC_BTN} mt-6`}>
              افزودنِ نشانی
            </Link>
          </Panel>
          <Panel title="نشانیِ پیش‌فرضِ ارسال">
            <p className="text-muted">نشانیِ پیش‌فرضِ ارسال تنظیم نشده است.</p>
            <Link href="/account/addresses/new" className={`${ACC_BTN} mt-6`}>
              افزودنِ نشانی
            </Link>
          </Panel>
        </div>

        <section className="flex flex-col gap-4">
          <SectionTitle>نشانی‌های دیگر</SectionTitle>
          <div className="border-t-2 border-ink">
            <div className="border border-t-0 border-line px-6 py-8 text-center text-[14px] text-muted">
              نشانیِ دیگری ثبت نشده است.
            </div>
          </div>
        </section>
      </div>
    </AccountShell>
  );
}
