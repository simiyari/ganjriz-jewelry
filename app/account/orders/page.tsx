"use client";

import Link from "next/link";
import AccountShell from "@/components/account/AccountShell";
import { EmptyState } from "@/components/account/ui";

/* سفارش‌های من — حالتِ خالی (مطابقِ my order.png). */

export default function MyOrdersPage() {
  return (
    <AccountShell title="سفارش‌های من">
      <div className="flex flex-col gap-6">
        <EmptyState>هنوز سفارشی ثبت نکرده‌اید.</EmptyState>
        <div className="text-start">
          <Link
            href="/account"
            className="text-[13px] text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
          >
            بازگشت
          </Link>
        </div>
      </div>
    </AccountShell>
  );
}
