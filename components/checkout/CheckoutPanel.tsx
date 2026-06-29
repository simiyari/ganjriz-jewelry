"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartContext";
import { useAuth } from "@/components/account/AuthContext";
import { GOLD_COLORS } from "@/lib/site-data";
import { faNumber, faDigits } from "@/lib/format";
import { asset } from "@/lib/asset";
import GoldColorDot from "@/components/ui/GoldColorDot";
import {
  Field,
  SelectField,
  TitleRadios,
  PhoneField,
  Consent,
} from "@/components/account/fields";
import {
  TruckIcon,
  StoreIcon,
  CardIcon,
  LockIcon,
  InfoIcon,
  ChevronDownIcon,
  PhoneIcon,
  MailIcon,
  CheckIcon,
} from "@/components/ui/icons";

/* ──────────────────────────────────────────────
   صفحهٔ تسویه‌حساب — کلونِ RTLِ صفحهٔ Checkoutِ Carrera با هویتِ گنج‌ریز.
   چیدمان: در RTL فرم سمتِ راست (محتوای اصلی)، خلاصهٔ سفارش سمتِ چپ (استیکی).
   فاز ۱: فقط UI؛ «ثبتِ سفارش» نمونهٔ نمایشی است و در فازِ بعد به درگاهِ زیبال وصل می‌شود.
   ────────────────────────────────────────────── */

/** استان‌های ایران — برای سلکتِ آدرس */
const IRAN_PROVINCES = [
  "البرز",
  "تهران",
  "اصفهان",
  "فارس",
  "خراسان رضوی",
  "آذربایجان شرقی",
  "آذربایجان غربی",
  "مازندران",
  "گیلان",
  "خوزستان",
  "کرمان",
  "قم",
  "یزد",
  "گلستان",
  "همدان",
  "کرمانشاه",
  "قزوین",
  "مرکزی",
  "اردبیل",
  "زنجان",
  "سمنان",
  "لرستان",
  "کردستان",
  "هرمزگان",
  "بوشهر",
  "سیستان و بلوچستان",
  "چهارمحال و بختیاری",
  "کهگیلویه و بویراحمد",
  "ایلام",
  "خراسان شمالی",
  "خراسان جنوبی",
] as const;

/** روش‌های ارسال/دریافت — «ارسال به آدرس» + دو شعبهٔ کرج (مطابقِ صفحهٔ درباره) */
const DELIVERY_METHODS = [
  {
    id: "address",
    label: "ارسال به آدرس",
    sub: "ارسالِ امن و بیمه‌شده به سراسرِ کشور",
    eta: "۲ تا ۵ روزِ کاری",
    icon: TruckIcon,
  },
  {
    id: "gohardasht",
    label: "دریافت از شعبهٔ گوهردشت",
    sub: "کرج، گوهردشت، بلوار انقلاب، نبشِ خیابانِ دهم",
    eta: "همین امروز",
    icon: StoreIcon,
  },
  {
    id: "markazi",
    label: "دریافت از شعبهٔ مرکزی",
    sub: "کرج، میدان شهدا، خیابانِ شهید بهشتی، پاساژِ طلا",
    eta: "همین امروز",
    icon: StoreIcon,
  },
] as const;

/** روش‌های پرداخت */
const PAYMENT_METHODS = [
  {
    id: "online",
    label: "پرداختِ اینترنتی (درگاهِ بانکی)",
    note: "پس از ثبتِ سفارش به درگاهِ امنِ بانکی منتقل می‌شوید.",
    icon: CardIcon,
  },
  {
    id: "transfer",
    label: "کارت‌به‌کارت",
    note: "مبلغ را واریز کرده و رسید را ثبت کنید.",
    icon: CardIcon,
  },
  {
    id: "onsite",
    label: "پرداخت در محل",
    note: "هنگامِ دریافتِ حضوری از شعبه پرداخت می‌کنید.",
    icon: StoreIcon,
  },
] as const;

/** ردیفِ رادیویی قابل‌انتخاب — کادری که با انتخاب، خطش مشکی می‌شود (سبکِ مرجع) */
function RadioRow({
  name,
  value,
  checked,
  onChange,
  children,
  trailing,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
  trailing?: ReactNode;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3.5 border px-4 py-4 transition-colors duration-300 ${
        checked ? "border-ink" : "border-line hover:border-faint"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 accent-ink"
      />
      <span className="min-w-0 flex-1">{children}</span>
      {trailing}
    </label>
  );
}

/** عنوانِ بخش — تیترِ کوچک با خطِ نازکِ زیرین (سبکِ مرجع) */
function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[16px] font-semibold tracking-tight text-ink">
      {children}
    </h2>
  );
}

/** آکاردئونِ خلاصه (ارسال/پرداخت) */
function SummaryAccordion({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-line">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-[12px] font-semibold tracking-[0.08em] text-ink"
      >
        {title}
        <ChevronDownIcon
          className={`h-4 w-4 text-muted transition-transform duration-500 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-500 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-[13px] leading-7 text-muted">{children}</p>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPanel() {
  const cart = useCart();
  const { user } = useAuth();

  // استیتِ تعاملی
  const [delivery, setDelivery] = useState<string>("address");
  const [payment, setPayment] = useState<string>("online");
  const [billingNew, setBillingNew] = useState(false);
  const [anotherReceiver, setAnotherReceiver] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [placed, setPlaced] = useState(false);

  const isPickup = delivery !== "address";

  // شمارهٔ موبایلِ حسابِ نمونه را به رقمِ خالص تبدیل کن (برای پیش‌پرکردنِ فیلد)
  const phoneDigits = user?.phone?.replace(/\D/g, "").replace(/^98/, "") ?? "";

  // مبالغ — قیمت‌ها شاملِ مالیات‌اند؛ ارسال رایگان
  const subtotal = cart.subtotal;
  const vatIncluded = Math.round(subtotal - subtotal / 1.09);
  const grandTotal = subtotal;

  // سبدِ خالی — اجازهٔ تسویه نیست
  if (cart.items.length === 0 && !placed) {
    return (
      <div className="container-lux flex flex-col items-center justify-center gap-6 py-24 text-center md:py-32">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">سبدِ خریدِ شما خالی است</h1>
        <p className="max-w-sm text-[15px] leading-8 text-muted">
          برای تسویه‌حساب ابتدا قطعه‌ای را به سبد بیفزایید.
        </p>
        <Link
          href="/products"
          className="inline-flex h-11 items-center justify-center border border-[#d0d0d0] px-9 text-[13px] font-medium tracking-wide text-ink transition-colors duration-300 hover:border-[#2d2d2d]"
        >
          مشاهدهٔ محصولات
        </Link>
      </div>
    );
  }

  return (
    // در RTL: ستونِ راست = فرم، ستونِ چپ = خلاصهٔ سفارش. گرید تمام‌عرض است تا پنلِ
    // طوسیِ خلاصه به لبهٔ چپِ صفحه فول‌بلید شود. لبه‌های محتوا (راستِ فرم و چپِ خلاصه)
    // با گاترِ هم‌اندازهٔ container-lux (۱۵۳۶) تراز می‌شوند تا با هدر هم‌خط بمانند و با
    // عریض‌ترشدنِ صفحه نه پهن‌تر شوند نه فاصلهٔ اضافی بیفتد. موبایل: فلکس تا با order،
    // خلاصهٔ سفارش بالا و فرم پایین قرار گیرد.
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_minmax(360px,42%)]">
      {/* ── ستونِ فرم — راست در RTL؛ موبایل: دوم (زیرِ خلاصه) ── */}
      <div className="order-2 px-4 py-10 md:px-6 md:py-14 lg:order-1 lg:py-16 lg:pe-12 lg:ps-[max(1.5rem,calc((100vw_-_1536px)/2_+_1.5rem))]">
        <div>
          <h1 className="sr-only">تسویه حساب</h1>

          {/* بنرِ تأییدِ ثبتِ سفارش (نمونهٔ نمایشی) */}
          {placed && (
            <div className="mb-8 flex items-start gap-3 border border-success/40 bg-success/5 px-5 py-4 text-[14px] leading-7 text-ink">
              <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              <span>
                سفارشِ شما ثبت شد. این نسخهٔ نمایشیِ فاز ۱ است؛ اتصال به درگاهِ پرداختِ
                زیبال در مرحلهٔ بعد فعال می‌شود.
              </span>
            </div>
          )}

          <form
            key={user?.email ?? "guest"}
            onSubmit={(e) => {
              e.preventDefault();
              setPlaced(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="min-w-0"
          >
          {/* حساب کاربری */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="text-[16px] font-semibold tracking-tight text-ink">حساب کاربری</h2>
              {!user && (
                <Link
                  href="/login"
                  className="text-[12px] tracking-wide text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
                >
                  ورود
                </Link>
              )}
            </div>
            <div className="mt-5">
              <Field
                id="email"
                label="نشانیِ ایمیل"
                type="email"
                required
                autoComplete="email"
                defaultValue={user?.email}
              />
            </div>
          </section>

          {/* ارسال */}
          <section className="mt-12">
            <SectionTitle>ارسال</SectionTitle>
            <p className="mt-3 text-[12px] text-muted">فیلدهای ستاره‌دار الزامی هستند.</p>

            {/* روش‌های ارسال/دریافت */}
            <div className="mt-4 flex flex-col gap-3">
              {DELIVERY_METHODS.map((m) => {
                const Icon = m.icon;
                return (
                  <RadioRow
                    key={m.id}
                    name="delivery"
                    value={m.id}
                    checked={delivery === m.id}
                    onChange={() => setDelivery(m.id)}
                    trailing={
                      <span className="shrink-0 text-[12px] text-muted">{m.eta}</span>
                    }
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5 shrink-0 text-ink" />
                      <span className="min-w-0">
                        <span className="block text-[13px] font-semibold text-ink">{m.label}</span>
                        <span className="mt-0.5 block truncate text-[12px] text-muted">{m.sub}</span>
                      </span>
                    </span>
                  </RadioRow>
                );
              })}
            </div>

            {/* مشخصاتِ گیرنده */}
            <div className="mt-8">
              <TitleRadios idPrefix="ship" defaultValue={user?.title} />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              <Field id="firstName" label="نام" required autoComplete="given-name" defaultValue={user?.firstName} />
              <Field id="lastName" label="نام خانوادگی" required autoComplete="family-name" defaultValue={user?.lastName} />
            </div>

            <div className="mt-2">
              <PhoneField idPrefix="ship" label="شمارهٔ موبایل" defaultValue={phoneDigits} />
            </div>

            <div className="mt-2">
              <Field id="nationalId" label="کدِ ملی" autoComplete="off" />
            </div>

            {/* گیرندهٔ دیگر */}
            <label className="mt-6 flex cursor-pointer items-start gap-3 text-[13px] leading-7 text-muted">
              <input
                type="checkbox"
                checked={anotherReceiver}
                onChange={(e) => setAnotherReceiver(e.target.checked)}
                className="mt-1.5 h-4 w-4 shrink-0 accent-ink"
              />
              <span>
                <span className="font-medium text-ink">گیرندهٔ دیگری دارد</span>
                <span className="mt-0.5 block text-muted">
                  اگر می‌خواهید سفارش هدیه باشد، نام و شمارهٔ گیرنده را وارد کنید.
                </span>
              </span>
            </label>

            {anotherReceiver && (
              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                <Field id="receiverName" label="نامِ گیرنده" required />
                <PhoneField idPrefix="receiver" label="شمارهٔ گیرنده" />
              </div>
            )}

            {/* آدرس — فقط برای ارسال به آدرس. چیدمانِ دوستونه مثلِ نمونهٔ اصلی:
                کشور|استان، شهر|کدِ پستی، سپس خطوطِ نشانی تمام‌عرض. */}
            {!isPickup && (
              <div className="mt-6 flex flex-col gap-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  <SelectField id="country" label="کشور" required defaultValue="ایران">
                    <option value="ایران">ایران</option>
                  </SelectField>
                  <SelectField id="province" label="استان" required defaultValue="">
                    <option value="" disabled>
                      انتخابِ استان
                    </option>
                    {IRAN_PROVINCES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </SelectField>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  <Field id="city" label="شهر" required autoComplete="address-level2" />
                  <Field id="postalCode" label="کدِ پستی" required autoComplete="postal-code" />
                </div>
                <Field id="address1" label="نشانیِ کامل (خیابان، کوچه، پلاک)" required autoComplete="address-line1" />
                <Field id="address2" label="واحد / طبقه (اختیاری)" autoComplete="address-line2" />
              </div>
            )}

            {isPickup && (
              <div className="mt-6 flex items-start gap-3 border border-line bg-surface px-4 py-3.5 text-[13px] leading-7 text-muted">
                <StoreIcon className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                سفارشِ شما برای دریافتِ حضوری آماده می‌شود؛ زمانِ آماده‌شدن از طریقِ پیامک
                به شما اطلاع داده خواهد شد.
              </div>
            )}
          </section>

          {/* پرداخت */}
          <section className="mt-12">
            <SectionTitle>پرداخت</SectionTitle>

            {/* آدرسِ صورتحساب */}
            <p className="mt-5 text-[12px] text-muted">آدرسِ صورتحساب</p>
            <div className="mt-3 flex flex-col gap-3">
              <RadioRow
                name="billing"
                value="same"
                checked={!billingNew}
                onChange={() => setBillingNew(false)}
              >
                <span className="text-[13px] font-medium text-ink">
                  آدرسِ صورتحساب و ارسال یکسان است
                </span>
              </RadioRow>
              <RadioRow
                name="billing"
                value="new"
                checked={billingNew}
                onChange={() => setBillingNew(true)}
              >
                <span className="text-[13px] font-medium text-ink">افزودنِ آدرسِ جدید</span>
              </RadioRow>
            </div>

            {/* افزودنِ آدرسِ صورتحسابِ جدید — فرمِ کاملِ آدرس مثلِ نمونهٔ اصلی */}
            {billingNew && (
              <div className="mt-5 flex flex-col gap-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  <Field id="billingFirstName" label="نام" required autoComplete="billing given-name" />
                  <Field id="billingLastName" label="نام خانوادگی" required autoComplete="billing family-name" />
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  <SelectField id="billingCountry" label="کشور" required defaultValue="ایران">
                    <option value="ایران">ایران</option>
                  </SelectField>
                  <SelectField id="billingProvince" label="استان" required defaultValue="">
                    <option value="" disabled>
                      انتخابِ استان
                    </option>
                    {IRAN_PROVINCES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </SelectField>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  <Field id="billingCity" label="شهر" required />
                  <Field id="billingPostalCode" label="کدِ پستی" required />
                </div>
                <Field id="billingAddress1" label="نشانیِ کامل (خیابان، کوچه، پلاک)" required />
                <Field id="billingAddress2" label="واحد / طبقه (اختیاری)" />
              </div>
            )}

            {/* روشِ پرداخت */}
            <p className="mt-8 text-[12px] text-muted">روشِ پرداخت</p>
            <div className="mt-3 flex flex-col gap-3">
              {PAYMENT_METHODS.map((m) => {
                const Icon = m.icon;
                const active = payment === m.id;
                return (
                  <div key={m.id}>
                    <RadioRow
                      name="payment"
                      value={m.id}
                      checked={active}
                      onChange={() => setPayment(m.id)}
                      trailing={<Icon className="h-5 w-5 shrink-0 text-ink" />}
                    >
                      <span className="text-[13px] font-medium text-ink">{m.label}</span>
                    </RadioRow>
                    {active && (
                      <p className="mt-2 px-1 text-[12px] leading-6 text-muted">{m.note}</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* رضایت‌ها */}
            <div className="mt-8 flex flex-col gap-4">
              <Consent>
                می‌خواهم برای ذخیرهٔ اطلاعاتم و تسویهٔ سریع‌تر، حسابِ کاربری بسازم.
              </Consent>
              <Consent>
                مایلم اطلاعاتِ مجموعه‌ها و پیشنهادهای ویژهٔ گنج‌ریز را از طریقِ ایمیل و
                پیامک دریافت کنم.
              </Consent>
              <label className="flex cursor-pointer items-start gap-3 text-[13px] leading-7 text-muted">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1.5 h-4 w-4 shrink-0 accent-ink"
                />
                <span>
                  <Link
                    href="/sales-terms"
                    className="text-ink underline decoration-line underline-offset-4 hover:text-accent-dark hover:decoration-accent-dark"
                  >
                    شرایطِ فروش
                  </Link>{" "}
                  و{" "}
                  <Link
                    href="/privacy"
                    className="text-ink underline decoration-line underline-offset-4 hover:text-accent-dark hover:decoration-accent-dark"
                  >
                    حریمِ خصوصی
                  </Link>{" "}
                  گنج‌ریز را خوانده‌ام و می‌پذیرم.
                </span>
              </label>
            </div>

            {/* ثبتِ سفارش */}
            <button
              type="submit"
              className="mt-8 flex h-11 w-full items-center justify-center gap-2 bg-ink text-[13px] font-semibold tracking-[0.08em] text-white transition-colors duration-300 hover:bg-[#2d2d2d] md:w-auto md:px-16"
            >
              <LockIcon className="h-4 w-4" />
              ثبتِ سفارش
            </button>
          </section>
          </form>
        </div>
      </div>

      {/* ── خلاصهٔ سفارش — ستونِ چپ در RTL؛ پنلِ طوسیِ تمام‌قد که به لبهٔ چپِ صفحه
          فول‌بلید می‌شود (بدونِ کادر و باکس). لبهٔ چپِ محتوا با گاترِ container هم‌تراز و
          سمتِ راست (نزدیکِ فرم) فقط ۴۰px فاصله تا فرم بدونِ شکافِ بزرگ بچسبد. موبایل:
          اول (بالای فرم) ── */}
      <aside className="order-1 bg-surface px-4 py-10 md:px-6 md:py-14 lg:order-2 lg:py-16 lg:ps-10 lg:pe-[max(1.5rem,calc((100vw_-_1536px)/2_+_1.5rem))]">
        <div
          className="lg:sticky"
          style={{ top: "calc(var(--header-h, 96px) + 16px)" }}
        >
            <div className="flex items-baseline justify-between">
              <h2 className="text-[16px] font-semibold tracking-tight text-ink">خلاصهٔ سفارش</h2>
              <span className="text-[12px] text-muted">
                {faDigits(cart.items.length)} محصول
              </span>
            </div>

            {/* اقلام */}
            <ul className="mt-5 flex flex-col">
              {cart.items.map((line) => (
                <li key={line.id} className="flex gap-4 border-b border-line py-4 first:pt-0">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-background">
                    <Image
                      src={asset(line.product.image)}
                      alt={line.product.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[13px] font-medium leading-6 text-ink">
                      {line.product.title}
                    </span>
                    <span dir="ltr" className="mt-0.5 self-start text-[11px] tracking-wide text-muted">
                      GR-{line.product.id.toUpperCase()}
                    </span>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted">
                      <span className="flex items-center gap-1.5">
                        <GoldColorDot color={line.color} size={20} decorative />
                        {GOLD_COLORS[line.color].label}
                      </span>
                      {line.size != null && <span>سایز: {faDigits(line.size)}</span>}
                      <span>تعداد: {faDigits(line.qty)}</span>
                    </div>
                    <span className="mt-2 text-[13px] font-semibold tabular-nums text-ink">
                      {faNumber(line.product.price * line.qty)}
                      <span className="mr-1 text-[11px] font-normal text-muted">تومان</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* جمع‌بندیِ مبالغ */}
            <div className="mt-4 flex flex-col gap-2.5 text-[13px]">
              <div className="flex items-center justify-between">
                <span className="text-muted">جمعِ کل</span>
                <span className="tabular-nums text-ink">{faNumber(subtotal)} تومان</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">هزینهٔ ارسال</span>
                <span className="font-medium text-success">رایگان</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted">مالیات بر ارزش افزوده (لحاظ‌شده)</span>
                <span className="tabular-nums text-muted">{faNumber(vatIncluded)} تومان</span>
              </div>
            </div>

            {/* مبلغِ نهایی */}
            <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
              <span className="text-[14px] font-semibold tracking-[0.04em] text-ink">
                مبلغِ قابلِ پرداخت
              </span>
              <span className="text-[18px] font-semibold tabular-nums text-ink">
                {faNumber(grandTotal)}
                <span className="mr-1 text-[12px] font-normal text-muted">تومان</span>
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 border border-line bg-background px-4 py-2.5 text-[12px] text-muted">
              <InfoIcon className="h-4 w-4 shrink-0" />
              مالیات بر ارزش افزوده در قیمت لحاظ شده است.
            </div>

            {/* تماس و راهنما */}
            <div className="mt-6 border-t border-line pt-5">
              <p className="text-[12px] font-semibold tracking-[0.08em] text-ink">نیاز به کمک دارید؟</p>
              <a
                href="tel:02112345678"
                dir="ltr"
                className="mt-3 flex items-center justify-end gap-2.5 text-[13px] text-muted transition-colors duration-300 hover:text-ink"
              >
                <span>۰۲۱ - ۱۲۳۴۵۶۷۸</span>
                <PhoneIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="mailto:sales@ganjriz.ir"
                dir="ltr"
                className="mt-2.5 flex items-center justify-end gap-2.5 text-[13px] text-muted transition-colors duration-300 hover:text-ink"
              >
                <span>sales@ganjriz.ir</span>
                <MailIcon className="h-[18px] w-[18px]" />
              </a>
            </div>

            {/* آکاردئون‌ها */}
            <div className="mt-5">
              <SummaryAccordion title="ارسال و مرجوعی">
                ارسالِ امن و بیمه‌شده به سراسرِ کشور طیِ ۲ تا ۵ روزِ کاری انجام می‌شود.
                امکانِ بازگشتِ کالا تا ۷ روز پس از دریافت، مطابقِ شرایطِ مرجوعیِ گنج‌ریز فراهم است.
              </SummaryAccordion>
              <SummaryAccordion title="روش‌های پرداخت">
                پرداختِ امن از طریقِ درگاهِ بانکیِ معتبر و با تمامِ کارت‌های عضوِ شتاب،
                کارت‌به‌کارت، یا پرداختِ حضوری هنگامِ دریافت از شعبه.
              </SummaryAccordion>
            </div>
          </div>
        </aside>
      </div>
  );
}
