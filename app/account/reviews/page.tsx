"use client";

import AccountShell from "@/components/account/AccountShell";
import { EmptyState } from "@/components/account/ui";

/* دیدگاه‌های من — حالتِ خالی (فاز ۱). */

export default function MyReviewsPage() {
  return (
    <AccountShell title="دیدگاه‌های من">
      <EmptyState>هنوز دیدگاهی ثبت نکرده‌اید.</EmptyState>
    </AccountShell>
  );
}
