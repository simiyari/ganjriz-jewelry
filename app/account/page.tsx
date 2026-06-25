"use client";

import Link from "next/link";
import { useState } from "react";
import AccountShell from "@/components/account/AccountShell";
import { useAuth } from "@/components/account/AuthContext";
import { ACC_BTN, ACC_BTN_OUTLINE, Panel, SectionTitle, TextLink } from "@/components/account/ui";

/* داشبوردِ پنلِ کاربری — خلاصهٔ اطلاعاتِ حساب و نشانی‌ها (مطابقِ dashboard.png). */

export default function AccountDashboardPage() {
  return (
    <AccountShell title="حسابِ کاربریِ من">
      <DashboardContent />
    </AccountShell>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  const [note, setNote] = useState("");
  if (!user) return null;

  return (
    <div className="flex flex-col gap-10">
      {/* اطلاعاتِ حساب */}
      <section className="flex flex-col gap-5">
        <SectionTitle>اطلاعاتِ حساب</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <Panel title="اطلاعاتِ تماس">
            <p className="font-medium text-ink">
              {user.firstName} {user.lastName}
            </p>
            <p dir="ltr" className="mt-1 text-start text-muted">
              {user.email}
            </p>
            <Link href="/account/information" className={`${ACC_BTN} mt-auto`}>
              ویرایشِ پروفایل
            </Link>
            <div className="mt-3">
              <TextLink href="/account/information">تغییرِ رمزِ عبور</TextLink>
            </div>
          </Panel>

          <Panel title="خبرنامه">
            <p className="text-muted">شما هنوز مشترکِ خبرنامهٔ گنج‌ریز نیستید.</p>
            <Link href="/account/newsletter" className={`${ACC_BTN} mt-auto`}>
              ویرایشِ اشتراک
            </Link>
          </Panel>
        </div>
      </section>

      {/* دفترچهٔ نشانی */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <SectionTitle>دفترچهٔ نشانی</SectionTitle>
          <Link
            href="/account/addresses"
            className="text-[13px] text-muted transition-colors duration-300 hover:text-ink"
          >
            مدیریتِ نشانی‌ها
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Panel title="نشانیِ پیش‌فرضِ صورتحساب">
            <p className="text-muted">نشانیِ پیش‌فرضِ صورتحساب تنظیم نشده است.</p>
            <Link href="/account/addresses/new" className={`${ACC_BTN} mt-auto`}>
              افزودنِ نشانی
            </Link>
          </Panel>
          <Panel title="نشانیِ پیش‌فرضِ ارسال">
            <p className="text-muted">نشانیِ پیش‌فرضِ ارسال تنظیم نشده است.</p>
            <Link href="/account/addresses/new" className={`${ACC_BTN} mt-auto`}>
              افزودنِ نشانی
            </Link>
          </Panel>
        </div>
      </section>

      <div className="flex flex-col items-start gap-3">
        <button type="button" onClick={() => setNote("حذفِ حساب در این نسخهٔ نمایشی فعال نیست.")} className={ACC_BTN_OUTLINE}>
          حذفِ حسابِ کاربری
        </button>
        {note && <p className="text-[13px] text-muted">{note}</p>}
      </div>
    </div>
  );
}
