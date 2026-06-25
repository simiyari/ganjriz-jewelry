"use client";

import { useState, type ReactNode } from "react";
import { EyeIcon, EyeSlashIcon, ChevronDownIcon } from "@/components/ui/icons";

/* ──────────────────────────────────────────────
   فیلدهای مشترکِ فرم‌های حساب (ورود/ثبت‌نام و پنلِ کاربری) — اینپوتِ لیبل‌شناورِ
   خط‌زیر، سلکت، چک‌باکسِ رضایت و فیلدِ شمارهٔ موبایل. همگی هم‌سبکِ توکن‌های گنج‌ریز.
   ────────────────────────────────────────────── */

export const TITLES = ["خانم", "آقا", "ترجیح می‌دهم نگویم"] as const;

export const COUNTRIES = [
  "ایران",
  "امارات متحده عربی",
  "ترکیه",
  "آلمان",
  "کانادا",
  "ایالات متحده",
] as const;

// کدِ کشورها — مقدارْ لاتین (برای ولیدیشن/ارسال)، نمایشْ فارسی
export const DIAL_CODES = [
  { code: "+98", label: "+۹۸" },
  { code: "+971", label: "+۹۷۱" },
  { code: "+90", label: "+۹۰" },
  { code: "+49", label: "+۴۹" },
  { code: "+1", label: "+۱" },
] as const;

// نگاشتِ کشور → پیش‌شمارهٔ تلفن (برای تغییرِ خودکارِ کد با انتخابِ کشور)
export const COUNTRY_DIAL: Record<string, string> = {
  "ایران": "+98",
  "امارات متحده عربی": "+971",
  "ترکیه": "+90",
  "آلمان": "+49",
  "کانادا": "+1",
  "ایالات متحده": "+1",
};

/** اینپوتِ لیبل‌شناور — لیبل با خالی‌بودن پایین می‌نشیند و با فوکوس/پُرشدن بالا می‌رود */
export function Field({
  id,
  label,
  type = "text",
  required = false,
  autoComplete,
  defaultValue,
  trailing,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        placeholder=" "
        className="peer h-12 w-full border-b border-line bg-transparent pt-5 pe-8 text-[15px] text-ink outline-none transition-colors duration-300 focus:border-ink"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute start-0 top-1.5 text-[12px] text-muted transition-all duration-200 peer-placeholder-shown:top-[18px] peer-placeholder-shown:text-[15px] peer-focus:top-1.5 peer-focus:text-[12px] peer-focus:text-ink"
      >
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      {trailing}
    </div>
  );
}

/** اینپوتِ رمز با دکمهٔ نمایش/پنهان (چشم) — سمتِ پایان (چپ در RTL) */
export function PasswordField({
  id,
  label,
  autoComplete,
}: {
  id: string;
  label: string;
  autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <Field
      id={id}
      label={label}
      type={show ? "text" : "password"}
      required
      autoComplete={autoComplete}
      trailing={
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "پنهان‌کردنِ رمز" : "نمایشِ رمز"}
          className="absolute end-0 top-[18px] grid h-8 w-8 -translate-y-1/2 place-items-center text-muted transition-colors hover:text-ink"
        >
          {show ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>
      }
    />
  );
}

/** سلکتِ لیبل‌دار — لیبل همیشه بالا، فلشِ سفارشی سمتِ پایان */
export function SelectField({
  id,
  label,
  required = false,
  defaultValue = "",
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  /** حالتِ کنترل‌شده — اگر داده شود، از value/onChange استفاده می‌شود نه defaultValue */
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
}) {
  const controlled = value !== undefined;
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        required={required}
        {...(controlled
          ? { value, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onChange?.(e.target.value) }
          : { defaultValue })}
        className="peer h-12 w-full appearance-none border-b border-line bg-transparent pt-5 pe-7 text-[15px] text-ink outline-none transition-colors duration-300 focus:border-ink"
      >
        {children}
      </select>
      <label
        htmlFor={id}
        className="pointer-events-none absolute start-0 top-1.5 text-[12px] text-muted"
      >
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      <ChevronDownIcon className="pointer-events-none absolute end-0 top-[26px] h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}

/** چک‌باکسِ رضایت — مربعِ کوچک با رنگِ برند (accent-color)، متن در کنار */
export function Consent({
  required = false,
  defaultChecked = false,
  children,
}: {
  required?: boolean;
  defaultChecked?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-7 text-muted">
      <input
        type="checkbox"
        required={required}
        defaultChecked={defaultChecked}
        className="mt-1.5 h-4 w-4 shrink-0 accent-ink"
      />
      <span>{children}</span>
    </label>
  );
}

/** عنوان (خانم/آقا/…) — رادیوهای هم‌ردیف با لیبلِ بالا */
export function TitleRadios({ idPrefix, defaultValue }: { idPrefix: string; defaultValue?: string }) {
  return (
    <fieldset>
      <legend className="mb-3 text-[12px] text-muted">
        عنوان <span className="text-danger">*</span>
      </legend>
      <div className="flex flex-wrap gap-x-7 gap-y-3">
        {TITLES.map((t, i) => (
          <label key={t} className="flex cursor-pointer items-center gap-2 text-[14px] text-ink">
            <input
              type="radio"
              name={`${idPrefix}-title`}
              value={t}
              required
              defaultChecked={defaultValue ? defaultValue === t : i === 0}
              className="h-4 w-4 accent-ink"
            />
            {t}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** شمارهٔ تماس — سلکتِ کدِ کشور + اینپوتِ شماره (مشترکِ فرم‌های ورود/ثبت‌نام/حساب). */
export function PhoneField({
  idPrefix,
  label = "شمارهٔ موبایل",
  defaultValue,
  dial,
  onDialChange,
}: {
  idPrefix: string;
  label?: string;
  defaultValue?: string;
  /** حالتِ کنترل‌شدهٔ کدِ کشور — با انتخابِ کشور به‌صورتِ خودکار تغییر می‌کند */
  dial?: string;
  onDialChange?: (value: string) => void;
}) {
  const controlledDial = dial !== undefined;
  return (
    <div className="flex items-end gap-3">
      <div className="relative w-24 shrink-0">
        <select
          name={`${idPrefix}-dial`}
          {...(controlledDial
            ? { value: dial, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onDialChange?.(e.target.value) }
            : { defaultValue: "+98" })}
          aria-label="کدِ کشور"
          className="peer h-12 w-full appearance-none border-b border-line bg-transparent pt-5 pe-6 text-[15px] text-ink outline-none transition-colors duration-300 focus:border-ink"
        >
          {DIAL_CODES.map((d) => (
            <option key={d.code} value={d.code}>
              {d.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute end-0 top-[26px] h-4 w-4 -translate-y-1/2 text-muted" />
      </div>
      <div className="flex-1">
        <Field
          id={`${idPrefix}-phone`}
          label={label}
          type="tel"
          required
          autoComplete="tel"
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}
