"use client";

import AccountShell from "@/components/account/AccountShell";
import { EmptyState } from "@/components/account/ui";

/* روش‌های پرداختِ ذخیره‌شده — حالتِ خالی (فاز ۱). */

export default function PaymentMethodsPage() {
  return (
    <AccountShell title="روش‌های پرداخت">
      <EmptyState>روشِ پرداختِ ذخیره‌شده‌ای ندارید.</EmptyState>
    </AccountShell>
  );
}
