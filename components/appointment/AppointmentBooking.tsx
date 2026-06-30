"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { STORES, STORE_LOCATOR } from "@/lib/site-data";
import { faDigits } from "@/lib/format";
import { useAuth } from "@/components/account/AuthContext";
import { Field, PhoneField, SelectField, TitleRadios, Consent } from "@/components/account/fields";
import { Eyebrow } from "@/components/ui/SectionHeading";
import {
  MapPinIcon,
  PhoneIcon,
  DirectionsIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@/components/ui/icons";

/* ──────────────────────────────────────────────
   رزرو وقتِ حضوری (/appointment) — ویزاردِ سه‌مرحله‌ای، RTL، با هویتِ گنج‌ریز.
   مرحله ۱: انتخابِ شعبه | ۲: تاریخ و ساعت | ۳: اطلاعاتِ فردی.
   فاز ۱: فقط UI؛ «ثبتِ درخواست» نمونهٔ نمایشی است (بدونِ بک‌اند).
   الگوها بازاستفاده شده‌اند: کارتِ شعبه و آکاردئونِ ساعت از StoreDetail،
   فیلدها از account/fields، استایلِ دکمه/بنرِ موفقیت از CheckoutPanel.
   ────────────────────────────────────────────── */

const EASE = "cubic-bezier(0.4,0,0.2,1)";

const BTN_BASE =
  "flex h-11 w-full items-center justify-center gap-2.5 text-[13px] font-medium tracking-[0.03em] transition-colors duration-300 ease-out";
const BTN_OUTLINE = `${BTN_BASE} border border-[#d0d0d0] text-ink hover:border-[#2d2d2d]`;
const BTN_SOLID = `${BTN_BASE} bg-ink font-semibold tracking-[0.06em] text-white hover:bg-[#2d2d2d]`;

// getDay(): 0=یک‌شنبه … 6=شنبه ؛ جمعه (۵) تعطیل است
const WEEKDAYS = ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
const TIME_SLOTS = ["۱۰:۰۰", "۱۱:۰۰", "۱۲:۰۰", "۱۳:۰۰", "۱۴:۰۰", "۱۵:۰۰", "۱۶:۰۰", "۱۷:۰۰", "۱۸:۰۰"];

type DayOpt = { key: string; weekday: string; rel: string | null };

/** چند روزِ بازِ پیشِ‌رو (جمعه‌ها حذف) — سمتِ کلاینت محاسبه می‌شود */
function nextOpenDays(count: number): DayOpt[] {
  const out: DayOpt[] = [];
  const base = new Date();
  for (let i = 0; out.length < count && i < 30; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    const wd = d.getDay();
    if (wd === 5) continue; // جمعه تعطیل
    out.push({
      key: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
      weekday: WEEKDAYS[wd],
      rel: i === 0 ? "امروز" : i === 1 ? "فردا" : null,
    });
  }
  return out;
}

/** آکاردئونِ ساعاتِ کاری — همان الگوی استانداردِ سایت (StoreDetail) */
function HoursAccordion({ store }: { store: (typeof STORES)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-6 border-t border-line pt-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-[12px] font-semibold tracking-[0.08em] text-ink"
      >
        {STORE_LOCATOR.hoursTitle}
        <ChevronDownIcon
          className={`h-4 w-4 text-muted transition-transform duration-500 ${open ? "rotate-180" : ""}`}
          style={{ transitionTimingFunction: EASE }}
        />
      </button>
      <div
        inert={!open}
        className={`grid transition-all duration-500 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        style={{ transitionTimingFunction: EASE }}
      >
        <div className="overflow-hidden">
          <ul className="pt-4">
            {store.hoursWeek.map((h) => (
              <li key={h.day} className="flex items-center justify-between py-2 text-[14px]">
                <span className="text-ink">{h.day}</span>
                <span className="text-muted">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

type StepState = "active" | "done" | "pending";

/** قابِ هر مرحله — دایرهٔ شماره + عنوان؛ محتوا فقط در حالتِ فعال باز می‌شود */
function Step({
  n,
  title,
  state,
  summary,
  onEdit,
  children,
}: {
  n: number;
  title: string;
  state: StepState;
  summary?: string;
  onEdit?: () => void;
  children?: ReactNode;
}) {
  const filled = state === "active" || state === "done";
  return (
    <section className="border border-line">
      <div className="flex items-center gap-3.5 px-6 py-5">
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[12px] font-semibold ${
            filled ? "bg-ink text-white" : "border border-line text-faint"
          }`}
        >
          {state === "done" ? <CheckIcon className="h-3.5 w-3.5" /> : faDigits(n)}
        </span>
        <h2 className={`text-[14px] font-semibold tracking-tight ${filled ? "text-ink" : "text-faint"}`}>
          {title}
        </h2>
        {state === "done" && onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="ms-auto text-[12px] text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
          >
            ویرایش
          </button>
        )}
      </div>

      {state === "done" && summary && (
        <p className="-mt-2 px-6 pb-5 ps-[3.875rem] text-[13px] leading-7 text-muted">{summary}</p>
      )}
      {state === "active" && <div className="border-t border-line px-6 py-7">{children}</div>}
    </section>
  );
}

export default function AppointmentBooking() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [storeId, setStoreId] = useState<string | null>(null);
  const [date, setDate] = useState<{ key: string; label: string } | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const store = STORES.find((s) => s.id === storeId) ?? null;
  const days = useMemo(() => nextOpenDays(8), []);
  const phoneDigits = user?.phone?.replace(/\D/g, "").replace(/^98/, "") ?? "";

  const stepState = (n: number): StepState =>
    step === n ? "active" : n < step ? "done" : "pending";

  // ── حالتِ تأییدِ نهایی (نمونهٔ نمایشی) ──
  if (booked) {
    return (
      <div className="container-lux py-16 md:py-24">
        <div className="mx-auto max-w-[560px] text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/10 text-success">
            <CheckIcon className="h-7 w-7" />
          </span>
          <h1 className="mt-6 text-[26px] font-semibold leading-snug text-ink md:text-[32px]">
            درخواستِ شما ثبت شد
          </h1>
          <p className="mt-4 text-[15px] leading-8 text-muted">
            از انتخابِ شما سپاسگزاریم. این نسخهٔ نمایشیِ فاز ۱ است؛ در مرحلهٔ بعد،
            تأییدیهٔ رزرو از طریقِ پیامک برایتان ارسال می‌شود.
          </p>
          <div className="mt-7 border border-line p-6 text-start text-[14px] leading-8 text-muted">
            <div className="flex items-center justify-between">
              <span className="text-muted">شعبه</span>
              <span className="text-ink">{store?.name}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-line pt-2">
              <span className="text-muted">تاریخ</span>
              <span className="text-ink">{date?.label}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-line pt-2">
              <span className="text-muted">ساعت</span>
              <span className="tabular-nums text-ink">{time}</span>
            </div>
          </div>
          <Link href="/" className={`${BTN_OUTLINE} mt-7`}>
            بازگشت به خانه
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-lux py-10 md:py-[60px]">
      <div className="mx-auto max-w-[640px]">
        {/* سرتیتر */}
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Book an Appointment</Eyebrow>
          <h1 className="text-[26px] font-semibold leading-snug text-ink md:text-[32px]">
            رزرو وقتِ حضوری
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-8 text-muted">
            برای بهره‌مندی از مشاورهٔ خصوصی، رویتِ نزدیکِ مجموعه‌ها و راهنماییِ
            کارشناسانِ گنج‌ریز، وقتِ حضوری در شعبه رزرو کنید.
          </p>
        </div>

        {/* مراحل */}
        <div className="mt-10 flex flex-col gap-4">
          {/* ── مرحله ۱: انتخابِ شعبه ── */}
          <Step
            n={1}
            title="انتخابِ شعبه"
            state={stepState(1)}
            summary={store ? `${store.name} — ${store.city}` : undefined}
            onEdit={() => setStep(1)}
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
              <SelectField id="country" label="کشور" required defaultValue="ایران">
                <option value="ایران">ایران</option>
              </SelectField>
              <SelectField id="city" label="شهر" required defaultValue="کرج">
                <option value="کرج">کرج</option>
              </SelectField>
            </div>

            <p className="mt-6 text-[12px] tracking-[0.04em] text-muted">
              {faDigits(STORES.length)} شعبه در کرج
            </p>

            <div className="mt-4 flex flex-col">
              {STORES.map((s) => (
                <div key={s.id} className="border-t border-line py-7 first:border-t-0 first:pt-0">
                  <h3 className="text-[15px] font-semibold text-ink">{s.name}</h3>
                  <p className="mt-1 text-[12px] text-muted">{STORE_LOCATOR.typeLabels[s.type]}</p>

                  <div className="mt-4 flex items-start gap-2.5 text-[14px] leading-7 text-muted">
                    <MapPinIcon className="mt-1 h-[18px] w-[18px] shrink-0 text-ink" />
                    <span>{s.address}</span>
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <a href={`tel:${s.phoneLink}`} className={BTN_OUTLINE}>
                      <PhoneIcon className="h-[18px] w-[18px]" />
                      <span dir="ltr">{s.phone}</span>
                    </a>
                    <a
                      href={s.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={BTN_OUTLINE}
                    >
                      <DirectionsIcon className="h-[18px] w-[18px]" />
                      {STORE_LOCATOR.directionsCta}
                    </a>
                  </div>

                  <HoursAccordion store={s} />

                  <button
                    type="button"
                    onClick={() => {
                      setStoreId(s.id);
                      setStep(2);
                    }}
                    className={`${BTN_SOLID} mt-6`}
                  >
                    انتخابِ این شعبه
                  </button>
                </div>
              ))}
            </div>
          </Step>

          {/* ── مرحله ۲: تاریخ و ساعت ── */}
          <Step
            n={2}
            title="تاریخ و ساعت"
            state={stepState(2)}
            summary={date && time ? `${date.label} — ساعتِ ${time}` : undefined}
            onEdit={() => setStep(2)}
          >
            <p className="text-[12px] font-semibold tracking-[0.08em] text-ink">تاریخ</p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {days.map((d) => {
                const active = date?.key === d.key;
                return (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() =>
                      setDate({ key: d.key, label: d.rel ? `${d.weekday} (${d.rel})` : d.weekday })
                    }
                    className={`flex min-w-[84px] flex-col items-center gap-0.5 border px-4 py-3 transition-colors duration-300 ${
                      active ? "border-ink" : "border-line hover:border-faint"
                    }`}
                  >
                    <span className={`text-[13px] font-medium ${active ? "text-ink" : "text-muted"}`}>
                      {d.rel ?? d.weekday}
                    </span>
                    {d.rel && <span className="text-[11px] text-muted">{d.weekday}</span>}
                  </button>
                );
              })}
            </div>

            <p className="mt-7 text-[12px] font-semibold tracking-[0.08em] text-ink">ساعت</p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {TIME_SLOTS.map((t) => {
                const active = time === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime(t)}
                    className={`border px-5 py-2.5 text-[13px] tabular-nums transition-colors duration-300 ${
                      active ? "border-ink text-ink" : "border-line text-muted hover:border-faint"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={!date || !time}
              onClick={() => setStep(3)}
              className="mt-8 flex h-11 w-full items-center justify-center bg-ink px-12 text-[13px] font-semibold tracking-[0.06em] text-white transition-colors duration-300 hover:bg-[#2d2d2d] disabled:cursor-not-allowed disabled:bg-faint disabled:hover:bg-faint sm:w-auto"
            >
              ادامه
            </button>
          </Step>

          {/* ── مرحله ۳: اطلاعاتِ فردی ── */}
          <Step n={3} title="اطلاعاتِ فردی" state={stepState(3)}>
            <form
              key={user?.email ?? "guest"}
              onSubmit={(e) => {
                e.preventDefault();
                setBooked(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <TitleRadios idPrefix="appt" defaultValue={user?.title} />

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                <Field id="firstName" label="نام" required autoComplete="given-name" defaultValue={user?.firstName} />
                <Field id="lastName" label="نام خانوادگی" required autoComplete="family-name" defaultValue={user?.lastName} />
              </div>

              <div className="mt-2">
                <PhoneField idPrefix="appt" label="شمارهٔ موبایل" defaultValue={phoneDigits} />
              </div>

              <div className="mt-2">
                <Field id="email" label="نشانیِ ایمیل" type="email" required autoComplete="email" defaultValue={user?.email} />
              </div>

              <div className="mt-2">
                <Field id="note" label="یادداشت (اختیاری)" autoComplete="off" />
              </div>

              <div className="mt-7">
                <Consent>
                  مایلم اطلاعاتِ مجموعه‌ها و پیشنهادهای ویژهٔ گنج‌ریز را از طریقِ پیامک و
                  ایمیل دریافت کنم.
                </Consent>
              </div>

              <button
                type="submit"
                className="mt-8 flex h-11 w-full items-center justify-center bg-ink px-12 text-[13px] font-semibold tracking-[0.06em] text-white transition-colors duration-300 hover:bg-[#2d2d2d] sm:w-auto"
              >
                ثبتِ درخواستِ رزرو
              </button>
            </form>
          </Step>
        </div>
      </div>
    </div>
  );
}
