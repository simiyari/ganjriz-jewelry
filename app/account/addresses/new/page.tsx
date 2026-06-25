"use client";

import { useState } from "react";
import Link from "next/link";
import AccountShell from "@/components/account/AccountShell";
import { useAuth, normalizePhone } from "@/components/account/AuthContext";
import { Field, SelectField, PhoneField, TitleRadios, COUNTRIES } from "@/components/account/fields";

/* افزودنِ نشانیِ جدید — فرمِ نشانی (مطابقِ add book.png). */

// استان‌های ایران (نمونه‌ای از پرکاربردها برای سلکتِ استان)
const IRAN_PROVINCES = [
  "تهران",
  "البرز",
  "اصفهان",
  "فارس",
  "خراسان رضوی",
  "آذربایجان شرقی",
  "مازندران",
  "گیلان",
  "خوزستان",
  "کرمان",
  "یزد",
  "قم",
] as const;

export default function AddAddressPage() {
  return (
    <AccountShell title="افزودنِ نشانیِ جدید">
      <AddressForm />
    </AccountShell>
  );
}

function AddressForm() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  if (!user) return null;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <form onSubmit={onSubmit} className="flex max-w-xl flex-col gap-8">
      {saved && (
        <p className="border-s-2 border-success bg-success/5 px-4 py-3 text-[13px] leading-7 text-success">
          نشانیِ شما ذخیره شد. (در نسخهٔ نمایشی به سامانه ارسال نمی‌شود.)
        </p>
      )}

      {/* اطلاعاتِ تماس */}
      <fieldset className="flex flex-col gap-6">
        <legend className="mb-2 text-[16px] font-semibold text-ink">اطلاعاتِ تماس</legend>
        <TitleRadios idPrefix="addr" defaultValue={user.title} />
        <Field id="addr-fname" label="نام" required autoComplete="given-name" defaultValue={user.firstName} />
        <Field id="addr-lname" label="نام خانوادگی" required autoComplete="family-name" defaultValue={user.lastName} />
        <PhoneField idPrefix="addr" label="شمارهٔ موبایل" defaultValue={normalizePhone(user.phone)} />
      </fieldset>

      {/* نشانی */}
      <fieldset className="flex flex-col gap-6">
        <legend className="mb-2 text-[16px] font-semibold text-ink">نشانی</legend>
        <Field id="addr-street1" label="نشانیِ پستی (خیابان، کوچه، پلاک)" required />
        <Field id="addr-street2" label="ادامهٔ نشانی (واحد، طبقه)" />
        <Field id="addr-zip" label="کدِ پستی" required />
        <Field id="addr-city" label="شهر" required />
        <SelectField id="addr-country" label="کشور" required defaultValue="ایران">
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </SelectField>
        <SelectField id="addr-province" label="استان" required defaultValue="">
          <option value="" disabled hidden></option>
          {IRAN_PROVINCES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </SelectField>
      </fieldset>

      <div className="flex items-end justify-between">
        <Link
          href="/account/addresses"
          className="text-[13px] text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
        >
          بازگشت
        </Link>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center bg-ink px-10 text-[12px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 ease-out hover:bg-[#2d2d2d]"
        >
          ذخیرهٔ نشانی
        </button>
      </div>
    </form>
  );
}
