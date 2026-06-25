"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState, type ReactNode } from "react";
import { asset } from "@/lib/asset";
import { faDigits } from "@/lib/format";
import { CalendarIcon, GoogleIcon } from "@/components/ui/icons";
import {
  Field,
  PasswordField,
  SelectField,
  Consent,
  PhoneField,
  TitleRadios,
  COUNTRIES,
} from "@/components/account/fields";
import { useAuth, normalizePhone, DEMO_PHONE, DEMO_OTP, DEMO_USER } from "@/components/account/AuthContext";

/* ──────────────────────────────────────────────
   صفحهٔ ورود/ثبت‌نام — کلونِ RTLِ صفحهٔ حسابِ Carrera با توکن‌های گنج‌ریز.
   دو تب: «قبلاً ثبت‌نام کرده‌اید؟» (ورود) و «ساختِ حسابِ جدید» (ثبت‌نام).
   ورود: گوگل (یک‌کلیک)، موبایل + کُدِ یک‌بارمصرف (پیش‌فرض)، یا ایمیل/موبایل + رمز.
   فاز ۱: تنها مسیرِ موبایل+OTP واقعاً وارد می‌کند (حسابِ نمایشی در AuthContext).
   ────────────────────────────────────────────── */

const BTN =
  "mt-2 flex h-11 w-full items-center justify-center bg-ink text-[13px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 ease-out hover:bg-[#2d2d2d]";

/** دکمهٔ ورود با گوگل — دکمهٔ سفیدِ خط‌دار با لوگوی گوگل (فاز ۱: نمایشی). */
function GoogleButton({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-full items-center justify-center gap-3 border border-line bg-white text-[14px] font-medium text-ink transition-colors duration-300 ease-out hover:bg-surface"
    >
      <GoogleIcon className="h-5 w-5" weight="bold" />
      {label}
    </button>
  );
}

/** جداکنندهٔ «یا» — خطِ افقی با برچسبِ وسط. */
function OrDivider({ label = "یا" }: { label?: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 bg-line" />
      <span className="shrink-0 text-[12px] text-muted">{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

/** لینکِ سوییچِ روشِ ورود — متنِ خط‌دارِ وسط‌چین (هماهنگ با لینک‌های متنیِ سایت). */
function SwitchLink({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto text-[13px] text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
    >
      {children}
    </button>
  );
}

/** اینپوتِ کُدِ یک‌بارمصرف — یک فیلدِ وسط‌چینِ LTR، هم‌سبکِ اینپوت‌های خط‌زیرِ صفحه. */
function CodeInput({ id }: { id: string }) {
  return (
    <input
      id={id}
      name={id}
      type="text"
      inputMode="numeric"
      autoComplete="one-time-code"
      maxLength={5}
      required
      dir="ltr"
      aria-label="کُدِ یک‌بارمصرف"
      placeholder="·····"
      className="h-14 w-full border-b border-line bg-transparent text-center text-[26px] tracking-[0.6em] text-ink outline-none transition-colors duration-300 placeholder:text-faint focus:border-ink"
    />
  );
}

/** شمارش معکوسِ ارسالِ دوبارهٔ کُد، به‌صورتِ m:ss با ارقامِ فارسی. */
function formatTime(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return faDigits(`${m}:${String(s).padStart(2, "0")}`);
}

/* اسکلتونِ پنلِ ورود — هم‌اندازهٔ پنلِ واقعی تا هنگامِ خواندنِ سشن یا ریدایرکتِ کاربرِ
   واردشده، جابه‌جاییِ چیدمان و فلَشِ فرم رخ ندهد. aria-hidden + motion-safe طبق بقیهٔ سایت. */
function AuthSkeleton() {
  return (
    <div className="mx-auto w-full max-w-xl" aria-hidden="true">
      <div className="mb-9 flex justify-center md:mb-11">
        <div className="h-16 w-16 bg-surface motion-safe:animate-pulse md:h-20 md:w-20" />
      </div>
      <div className="flex gap-6 border-b border-line pb-4">
        <div className="h-5 flex-1 bg-surface motion-safe:animate-pulse" />
        <div className="h-5 flex-1 bg-surface motion-safe:animate-pulse" />
      </div>
      <div className="mt-9 flex flex-col gap-5">
        <div className="h-12 bg-surface motion-safe:animate-pulse" />
        <div className="h-12 bg-surface motion-safe:animate-pulse" />
        <div className="h-11 bg-surface motion-safe:animate-pulse" />
      </div>
    </div>
  );
}

export default function AuthPanel() {
  const router = useRouter();
  const { user, login, ready } = useAuth();

  const [tab, setTab] = useState<"login" | "register">("login");
  // روشِ ورود: پیش‌فرض «موبایل + کُدِ یک‌بارمصرف»؛ با یک لینک به «رمزِ عبور» سوییچ می‌شود.
  const [loginMode, setLoginMode] = useState<"otp" | "password">("otp");
  const [otpStep, setOtpStep] = useState<"phone" | "code">("phone");
  const [otpPhone, setOtpPhone] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const uid = useId();

  // اگر از قبل وارد شده‌اید، مستقیم به پنلِ کاربری بروید.
  useEffect(() => {
    if (user) router.replace("/account");
  }, [user, router]);

  // شمارش معکوسِ «ارسالِ دوبارهٔ کُد» در مرحلهٔ واردکردنِ کُد.
  useEffect(() => {
    if (otpStep !== "code" || resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [otpStep, resendIn]);

  const clearMsgs = () => {
    setNotice("");
    setError("");
  };

  const onGoogle = () => setNotice("اتصال به حسابِ گوگل در مرحلهٔ بعدِ توسعه انجام می‌شود.");

  // مرحلهٔ ۱ OTP: شماره را می‌گیرد و به مرحلهٔ واردکردنِ کُد می‌رود.
  const onSendOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const num = String(new FormData(e.currentTarget).get(`${uid}-otp-phone`) ?? "");
    setOtpPhone(num);
    setResendIn(120);
    setOtpStep("code");
    clearMsgs();
  };

  // مرحلهٔ ۲ OTP: کُد را با حسابِ نمایشی می‌سنجد و در صورتِ درستی وارد می‌کند.
  const onVerifyOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = String(new FormData(e.currentTarget).get(`${uid}-otp-code`) ?? "");
    if (normalizePhone(otpPhone) === DEMO_PHONE && code === DEMO_OTP) {
      login(DEMO_USER); // افکتِ بالا به /account می‌برد
    } else {
      setError("کُد یا شماره نادرست است. در این نسخهٔ نمایشی با موبایلِ ۰۹۱۲۲۴۰۳۶۶۲ و کُدِ ۱۲۳۴۵۶ وارد شوید.");
    }
  };

  const onPasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice("ورود با رمزِ عبور در مرحلهٔ بعدِ توسعه فعال می‌شود؛ فعلاً با موبایل و کُدِ یک‌بارمصرف وارد شوید.");
  };

  const onRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice("اطلاعاتِ ثبت‌نام دریافت شد. اتصال به سامانهٔ کاربری در مرحلهٔ بعدِ توسعه انجام می‌شود.");
  };

  const switchMode = (mode: "otp" | "password") => {
    setLoginMode(mode);
    setOtpStep("phone");
    clearMsgs();
  };
  const resendOtp = () => setResendIn(120);

  const tabCls = (active: boolean) =>
    `flex-1 border-b-2 pb-4 text-center text-[15px] tracking-wide transition-colors duration-300 ${
      active ? "border-ink font-semibold text-ink" : "border-line text-muted hover:text-ink"
    }`;

  // تا وقتی سشن خوانده نشده (ready=false) یا کاربر از قبل وارد است، فرمِ ورود را نشان نده —
  // وگرنه کاربرِ واردشده یک لحظه فرم را می‌بیند و سپس افکتِ بالا به /account می‌بَرَد. اسکلتون
  // جای فرم را تا خواندنِ سشن/ریدایرکت پر می‌کند (بدونِ فلَش و بدونِ جابه‌جاییِ چیدمان).
  if (!ready || user) return <AuthSkeleton />;

  return (
    <div className="mx-auto w-full max-w-xl">
      {/* لوگوی برند — بالای پنلِ ورود/ثبت‌نام */}
      <Link href="/" aria-label="گنج‌ریز" className="mb-9 flex justify-center md:mb-11">
        <Image
          src={asset("/logo.png")}
          alt="گنج‌ریز"
          width={1000}
          height={842}
          priority
          className="h-16 w-auto md:h-20"
        />
      </Link>

      {/* تب‌ها */}
      <div className="flex">
        <button
          type="button"
          onClick={() => {
            setTab("login");
            clearMsgs();
          }}
          className={tabCls(tab === "login")}
        >
          قبلاً ثبت‌نام کرده‌اید؟
        </button>
        <button
          type="button"
          onClick={() => {
            setTab("register");
            clearMsgs();
          }}
          className={tabCls(tab === "register")}
        >
          ساختِ حسابِ جدید
        </button>
      </div>

      {error && (
        <p className="mt-7 border-s-2 border-danger bg-danger/5 px-4 py-3 text-[13px] leading-7 text-danger">
          {error}
        </p>
      )}
      {notice && (
        <p className="mt-7 border-s-2 border-success bg-success/5 px-4 py-3 text-[13px] leading-7 text-success">
          {notice}
        </p>
      )}

      {/* ── ورود ── گوگل + یک فرمِ ساده: «موبایل + کُدِ یک‌بارمصرف» (پیش‌فرض) یا
          «ایمیل/موبایل + رمز». همیشه فقط یک فرم دیده می‌شود تا شلوغ نشود. */}
      {tab === "login" && (
        <div className="mt-7 flex flex-col gap-6">
          <GoogleButton label="ورود با گوگل" onClick={onGoogle} />
          <OrDivider />

          {/* روشِ پیش‌فرض — مرحلهٔ ۱: گرفتنِ شماره */}
          {loginMode === "otp" && otpStep === "phone" && (
            <form onSubmit={onSendOtp} className="flex flex-col gap-6">
              <p className="text-[14px] leading-7 text-muted">
                شمارهٔ موبایلِ خود را وارد کنید؛ کُدِ ورود برایتان پیامک می‌شود.
              </p>
              <PhoneField idPrefix={`${uid}-otp`} label="شمارهٔ موبایل" />
              <button type="submit" className={BTN}>
                دریافتِ کُدِ ورود
              </button>
              <SwitchLink onClick={() => switchMode("password")}>ورود با رمزِ عبور</SwitchLink>
            </form>
          )}

          {/* روشِ پیش‌فرض — مرحلهٔ ۲: واردکردنِ کُد */}
          {loginMode === "otp" && otpStep === "code" && (
            <form onSubmit={onVerifyOtp} className="flex flex-col gap-6">
              <p className="text-[14px] leading-7 text-muted">
                کُدِ ۵ تا ۶ رقمیِ پیامک‌شده به شمارهٔ{" "}
                <bdi dir="ltr" className="font-medium text-ink">
                  {faDigits(otpPhone)}
                </bdi>{" "}
                را وارد کنید.
              </p>
              <CodeInput id={`${uid}-otp-code`} />
              <p className="text-[12px] text-faint">
                نسخهٔ نمایشی — کُد را <span className="font-medium text-muted">۱۲۳۴۵۶</span> وارد کنید.
              </p>
              <button type="submit" className={BTN}>
                ورود
              </button>
              <div className="flex items-center justify-between text-[13px]">
                <button
                  type="button"
                  onClick={() => setOtpStep("phone")}
                  className="text-muted transition-colors duration-300 hover:text-ink"
                >
                  ویرایشِ شماره
                </button>
                {resendIn > 0 ? (
                  <span className="text-faint">ارسالِ دوبارهٔ کُد تا {formatTime(resendIn)}</span>
                ) : (
                  <button
                    type="button"
                    onClick={resendOtp}
                    className="text-ink underline underline-offset-4 transition-colors duration-300 hover:text-accent-dark"
                  >
                    ارسالِ دوبارهٔ کُد
                  </button>
                )}
              </div>
            </form>
          )}

          {/* روشِ دوم — ایمیل یا موبایل + رمزِ عبور */}
          {loginMode === "password" && (
            <form onSubmit={onPasswordLogin} className="flex flex-col gap-6">
              <p className="text-[14px] leading-7 text-muted">
                با ایمیل یا شمارهٔ موبایل و رمزِ عبورِ خود وارد شوید.
              </p>
              <Field id={`${uid}-id`} label="ایمیل یا شمارهٔ موبایل" required autoComplete="username" />
              <PasswordField id={`${uid}-pass`} label="رمزِ عبور" autoComplete="current-password" />
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
              <SwitchLink onClick={() => switchMode("otp")}>ورود با کُدِ یک‌بارمصرف</SwitchLink>
            </form>
          )}
        </div>
      )}

      {/* ── فرمِ ثبت‌نام ── */}
      {tab === "register" && (
        <form onSubmit={onRegister} className="mt-7 flex flex-col gap-6">
          <p className="text-[14px] leading-7 text-muted">
            حساب کاربری بسازید و از خریدِ شخصی‌سازی‌شده، تسویهٔ سریع‌تر، ثبتِ چند نشانی و
            پیگیریِ سفارش‌ها بهره‌مند شوید. اگر ترجیح می‌دهید، می‌توانید از تبِ «ورود» با
            حسابِ گوگل واردِ سایت شوید.
          </p>
          <p className="text-[12px] text-muted">
            فیلدهای الزامی <span className="text-danger">*</span>
          </p>

          <TitleRadios idPrefix={uid} />

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
          <PhoneField idPrefix={uid} label="شمارهٔ تماس" />

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
