"use client";

import { useState } from "react";
import Link from "next/link";
import AccountShell from "@/components/account/AccountShell";
import { useAuth, normalizePhone } from "@/components/account/AuthContext";
import {
  Field,
  PasswordField,
  SelectField,
  PhoneField,
  TitleRadios,
  COUNTRIES,
  COUNTRY_DIAL,
} from "@/components/account/fields";
import { InfoIcon } from "@/components/ui/icons";

/* اطلاعاتِ حساب — فرمِ ویرایشِ پروفایل، پُرشده با حسابِ نمایشی (مطابقِ acc information.png). */

export default function AccountInformationPage() {
  return (
    <AccountShell title="اطلاعاتِ حساب">
      <InformationForm />
    </AccountShell>
  );
}

/** ردیفِ تیک — می‌تواند کنترل‌شده باشد (برای باز/بستنِ بخش‌های تغییرِ ایمیل/رمز) */
function CheckRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  const controlled = onChange !== undefined;
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[14px] text-ink">
      <input
        type="checkbox"
        {...(controlled
          ? { checked, onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked) }
          : {})}
        className="h-4 w-4 accent-ink"
      />
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
  // کشور و پیش‌شماره — با تغییرِ کشور، کدِ تلفن خودکار به کشورِ تازه می‌رود
  const [country, setCountry] = useState(user?.country ?? COUNTRIES[0]);
  const [dial, setDial] = useState(COUNTRY_DIAL[user?.country ?? ""] ?? "+98");
  // بخش‌های قابلِ‌بازشدنِ تغییرِ ایمیل/رمزِ عبور (به‌جای تیکِ بی‌عمل)
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  if (!user) return null;

  const onCountryChange = (next: string) => {
    setCountry(next);
    const code = COUNTRY_DIAL[next];
    if (code) setDial(code);
  };

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

      <SelectField id="acc-country" label="کشور" required value={country} onChange={onCountryChange}>
        {COUNTRIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </SelectField>

      <PhoneField
        idPrefix="acc"
        label="شمارهٔ موبایل"
        defaultValue={normalizePhone(user.phone)}
        dial={dial}
        onDialChange={setDial}
      />

      {/* تغییرِ ایمیل/رمز — تیک که بزنی، باکسِ واقعیِ تغییر باز می‌شود */}
      <div className="mt-1 flex flex-col gap-4">
        <CheckRow label="تغییرِ ایمیل" checked={changeEmail} onChange={setChangeEmail} />
        {changeEmail && (
          <div className="flex flex-col gap-5 border-s-2 border-line ps-5">
            <Field id="acc-current-email" label="ایمیلِ فعلی" type="email" defaultValue={user.email} />
            <Field id="acc-new-email" label="ایمیلِ جدید" type="email" required autoComplete="email" />
          </div>
        )}

        <CheckRow label="تغییرِ رمزِ عبور" checked={changePassword} onChange={setChangePassword} />
        {changePassword && (
          <div className="flex flex-col gap-5 border-s-2 border-line ps-5">
            <PasswordField id="acc-current-pw" label="رمزِ عبورِ فعلی" autoComplete="current-password" />
            <PasswordField id="acc-new-pw" label="رمزِ عبورِ جدید" autoComplete="new-password" />
            <PasswordField id="acc-confirm-pw" label="تکرارِ رمزِ عبورِ جدید" autoComplete="new-password" />
          </div>
        )}

        <CheckRow label="اجازهٔ کمکِ خریدِ از راه دور" hint />
      </div>

      <div className="mt-2 flex items-end justify-between">
        <Link
          href="/account"
          className="text-[13px] text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
        >
          بازگشت
        </Link>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center bg-ink px-10 text-[12px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 ease-out hover:bg-[#2d2d2d]"
        >
          ذخیره
        </button>
      </div>
    </form>
  );
}
