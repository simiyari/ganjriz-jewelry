"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { EyeIcon, EyeSlashIcon, CalendarIcon, ChevronDownIcon } from "@/components/ui/icons";

/* ──────────────────────────────────────────────
   صفحهٔ ورود/ثبت‌نام — کلونِ RTLِ صفحهٔ حسابِ Carrera با توکن‌های گنج‌ریز.
   دو تب: «قبلاً ثبت‌نام کرده‌اید؟» (ورود) و «ساختِ حسابِ جدید» (ثبت‌نام).
   فاز ۱ (UIِ فیک): فرم‌ها اعتبارسنجیِ مرورگری دارند ولی هنوز به سامانه وصل نیستند.
   ────────────────────────────────────────────── */

/** اینپوتِ لیبل‌شناور — لیبل با خالی‌بودن پایین می‌نشیند و با فوکوس/پُرشدن بالا می‌رود */
function Field({
  id,
  label,
  type = "text",
  required = false,
  autoComplete,
  trailing,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
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
function PasswordField({
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

/** سلکتِ لیبل‌دار (کشور) — لیبل همیشه بالا، فلشِ سفارشی سمتِ پایان */
function SelectField({
  id,
  label,
  required = false,
  defaultValue = "",
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        required={required}
        defaultValue={defaultValue}
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
function Consent({
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

const BTN =
  "mt-2 w-full bg-ink py-4 text-[13px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 ease-out hover:bg-[#2d2d2d]";

const TITLES = ["خانم", "آقا", "ترجیح می‌دهم نگویم"] as const;

const COUNTRIES = ["ایران", "امارات متحده عربی", "ترکیه", "آلمان", "کانادا", "ایالات متحده"] as const;

// کدِ کشورها — مقدارْ لاتین (برای ولیدیشن/ارسال)، نمایشْ فارسی
const DIAL_CODES = [
  { code: "+98", label: "+۹۸" },
  { code: "+971", label: "+۹۷۱" },
  { code: "+90", label: "+۹۰" },
  { code: "+49", label: "+۴۹" },
  { code: "+1", label: "+۱" },
] as const;

export default function AuthPanel() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [notice, setNotice] = useState("");
  const uid = useId();

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice("ورودِ شما ثبت شد. اتصال به سامانهٔ کاربری در مرحلهٔ بعدِ توسعه انجام می‌شود.");
  };
  const onRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice("اطلاعاتِ ثبت‌نام دریافت شد. اتصال به سامانهٔ کاربری در مرحلهٔ بعدِ توسعه انجام می‌شود.");
  };

  const tabCls = (active: boolean) =>
    `flex-1 border-b-2 pb-4 text-center text-[15px] tracking-wide transition-colors duration-300 ${
      active
        ? "border-ink font-semibold text-ink"
        : "border-line text-muted hover:text-ink"
    }`;

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* تب‌ها */}
      <div className="flex">
        <button
          type="button"
          onClick={() => {
            setTab("login");
            setNotice("");
          }}
          className={tabCls(tab === "login")}
        >
          قبلاً ثبت‌نام کرده‌اید؟
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("register");
            setNotice("");
          }}
          className={tabCls(tab === "register")}
        >
          ساختِ حسابِ جدید
        </button>
      </div>

      {notice && (
        <p className="mt-7 border-s-2 border-success bg-success/5 px-4 py-3 text-[13px] leading-7 text-success">
          {notice}
        </p>
      )}

      {/* ── فرمِ ورود ── */}
      {tab === "login" && (
        <form onSubmit={onLogin} className="mt-7 flex flex-col gap-6">
          <p className="text-[14px] leading-7 text-muted">
            اگر حساب کاربری دارید، با ایمیلِ خود وارد شوید.
          </p>
          <p className="text-[12px] text-muted">
            فیلدهای الزامی <span className="text-danger">*</span>
          </p>

          <Field id={`${uid}-l-email`} label="ایمیل" type="email" required autoComplete="email" />
          <PasswordField id={`${uid}-l-pass`} label="رمزِ عبور" autoComplete="current-password" />

          <div className="flex items-center justify-between gap-3">
            <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-muted">
              <input type="checkbox" className="h-4 w-4 accent-ink" />
              مرا به خاطر بسپار <span className="text-faint">(اختیاری)</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-[13px] text-ink transition-colors duration-300 hover:text-accent-dark"
            >
              رمزِ عبور را فراموش کرده‌اید؟
            </Link>
          </div>

          <button type="submit" className={BTN}>
            ورود
          </button>
        </form>
      )}

      {/* ── فرمِ ثبت‌نام ── */}
      {tab === "register" && (
        <form onSubmit={onRegister} className="mt-7 flex flex-col gap-6">
          <p className="text-[14px] leading-7 text-muted">
            حساب کاربری بسازید و از خریدِ شخصی‌سازی‌شده، تسویهٔ سریع‌تر، ثبتِ چند نشانی و
            پیگیریِ سفارش‌ها بهره‌مند شوید.
          </p>
          <p className="text-[12px] text-muted">
            فیلدهای الزامی <span className="text-danger">*</span>
          </p>

          {/* عنوان */}
          <fieldset>
            <legend className="mb-3 text-[12px] text-muted">
              عنوان <span className="text-danger">*</span>
            </legend>
            <div className="flex flex-wrap gap-x-7 gap-y-3">
              {TITLES.map((t, i) => (
                <label key={t} className="flex cursor-pointer items-center gap-2 text-[14px] text-ink">
                  <input
                    type="radio"
                    name={`${uid}-title`}
                    value={t}
                    required
                    defaultChecked={i === 0}
                    className="h-4 w-4 accent-ink"
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>

          <Field id={`${uid}-fname`} label="نام" required autoComplete="given-name" />
          <Field id={`${uid}-lname`} label="نام خانوادگی" required autoComplete="family-name" />
          <Field id={`${uid}-email`} label="ایمیل" type="email" required autoComplete="email" />

          {/* تاریخ تولد — اختیاری، با آیکونِ تقویم */}
          <Field
            id={`${uid}-dob`}
            label="تاریخِ تولد (اختیاری)"
            trailing={
              <CalendarIcon className="pointer-events-none absolute end-0 top-[18px] h-5 w-5 -translate-y-1/2 text-muted" />
            }
          />

          <SelectField id={`${uid}-country`} label="کشور" required>
            <option value="" disabled hidden></option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </SelectField>

          {/* شمارهٔ تماس — کدِ کشور + شماره */}
          <div className="flex items-end gap-3">
            <div className="relative w-24 shrink-0">
              <select
                name={`${uid}-dial`}
                defaultValue="+98"
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
              <Field id={`${uid}-phone`} label="شمارهٔ تماس" type="tel" required autoComplete="tel" />
            </div>
          </div>

          {/* رمز + الزامات */}
          <div className="flex flex-col gap-3">
            <PasswordField id={`${uid}-pass`} label="رمزِ عبور" autoComplete="new-password" />
            <div className="text-[12px] leading-6 text-muted">
              <p className="mb-1.5">رمزِ عبور باید شامل موارد زیر باشد:</p>
              <ul className="grid grid-cols-1 gap-x-6 gap-y-0.5 ps-1 sm:grid-cols-2">
                {[
                  "حداقل ۸ کاراکتر",
                  "یک حرفِ کوچکِ انگلیسی",
                  "یک حرفِ بزرگِ انگلیسی",
                  "یک عدد",
                  "یک نویسهٔ خاص (مثل !@#$)",
                ].map((r) => (
                  <li key={r} className="flex items-center gap-2">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-faint" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <PasswordField id={`${uid}-pass2`} label="تکرارِ رمزِ عبور" autoComplete="new-password" />

          {/* رضایت‌ها */}
          <div className="mt-1 flex flex-col gap-4">
            <Consent defaultChecked>
              مایلم اطلاعاتِ تبلیغاتی دربارهٔ محصولات و خدماتِ گنج‌ریز را از طریقِ ایمیل، پیامک یا
              تماس دریافت کنم. هر زمان می‌توانم از بخشِ حساب کاربری این رضایت را لغو کنم.
            </Consent>
            <Consent required>
              ​<Link href="/sales-terms" className="text-ink underline underline-offset-2 hover:text-accent-dark">
                شرایطِ فروش
              </Link>{" "}
              و{" "}
              <Link href="/privacy" className="text-ink underline underline-offset-2 hover:text-accent-dark">
                حریمِ خصوصی
              </Link>{" "}
              گنج‌ریز را خوانده‌ام و می‌پذیرم.
            </Consent>
          </div>

          <button type="submit" className={BTN}>
            ساختِ حساب
          </button>
        </form>
      )}
    </div>
  );
}
