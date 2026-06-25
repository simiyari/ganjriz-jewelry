"use client";

import { useState } from "react";
import Link from "next/link";
import AccountShell from "@/components/account/AccountShell";
import { useAuth, normalizePhone } from "@/components/account/AuthContext";
import { Field, SelectField, PhoneField, TitleRadios, COUNTRIES } from "@/components/account/fields";
import { InfoIcon } from "@/components/ui/icons";

/* اطلاعاتِ حساب — فرمِ ویرایشِ پروفایل، پُرشده با حسابِ نمایشی (مطابقِ acc information.png). */

export default function AccountInformationPage() {
  return (
    <AccountShell title="اطلاعاتِ حساب">
      <InformationForm />
    </AccountShell>
  );
}

function CheckRow({ label, hint }: { label: string; hint?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[14px] text-ink">
      <input type="checkbox" className="h-4 w-4 accent-ink" />
      {label}
      {hint && (
        <span
          className="grid h-4 w-4 place-items-center text-muted"
          title="با فعال‌کردن این گزینه، پشتیبانی می‌تواند برای کمک به خریدِ شما به‌طورِ موقت حساب‌تان را ببیند."
        >
          <InfoIcon className="h-4 w-4" />
        </span>
      )}
    </label>
  );
}

function InformationForm() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  if (!user) return null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex max-w-xl flex-col gap-6">
      {saved && (
        <p className="border-s-2 border-success bg-success/5 px-4 py-3 text-[13px] leading-7 text-success">
          تغییراتِ شما ذخیره شد. (در نسخهٔ نمایشی به سامانه ارسال نمی‌شود.)
        </p>
      )}

      <TitleRadios idPrefix="acc" defaultValue={user.title} />

      <Field id="acc-fname" label="نام" required autoComplete="given-name" defaultValue={user.firstName} />
      <Field id="acc-lname" label="نام خانوادگی" required autoComplete="family-name" defaultValue={user.lastName} />

      <Field id="acc-dob" label="تاریخِ تولد (اختیاری)" />

      <SelectField id="acc-country" label="کشور" required defaultValue={user.country}>
        {COUNTRIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </SelectField>

      <PhoneField idPrefix="acc" label="شمارهٔ موبایل" defaultValue={normalizePhone(user.phone)} />

      {/* گزینه‌های امنیتی/پشتیبانی */}
      <div className="mt-1 flex flex-col gap-3">
        <CheckRow label="تغییرِ ایمیل" />
        <CheckRow label="تغییرِ رمزِ عبور" />
        <CheckRow label="اجازهٔ کمکِ خریدِ از راه دور" hint />
      </div>

      <div className="mt-2 flex items-center justify-between">
        <Link
          href="/account"
          className="text-[13px] text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
        >
          بازگشت
        </Link>
        <button
          type="submit"
          className="inline-flex bg-ink px-10 py-3.5 text-[12px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 ease-out hover:bg-[#2d2d2d]"
        >
          ذخیره
        </button>
      </div>
    </form>
  );
}
