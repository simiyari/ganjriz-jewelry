"use client";

import { useEffect, useState } from "react";
import { RING_SIZES, SIZE_GUIDE } from "@/lib/product-detail";
import { faDigits } from "@/lib/format";
import { CloseIcon, CheckIcon } from "@/components/ui/icons";

const EASE = "cubic-bezier(0.4,0,0.2,1)";

const TABS = [
  { key: "select", label: "انتخاب سایز" },
  { key: "tips", label: "راهنما و نکات" },
] as const;

/** دیاگرامِ ساده — اندازه‌گیریِ انگشت با نوار/متر (لهجهٔ طلایی) */
function FingerDiagram() {
  return (
    <svg viewBox="0 0 200 150" className="h-28 w-auto" fill="none" aria-hidden="true">
      <path
        d="M82 145 L82 58 a18 18 0 0 1 36 0 L118 145"
        className="stroke-ink"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M88 54 a12 11 0 0 1 24 0" className="stroke-ink" strokeWidth="1.2" />
      {/* نوارِ اندازه‌گیری دورِ پایهٔ انگشت */}
      <ellipse cx="100" cy="116" rx="22" ry="7.5" className="stroke-gold" strokeWidth="2.2" />
      <path d="M120 113 l16 -4 l-3 9 z" className="fill-gold" />
    </svg>
  );
}

/** دیاگرامِ ساده — قطرِ داخلیِ یک حلقهٔ موجود (لهجهٔ طلایی) */
function RingDiagram() {
  return (
    <svg viewBox="0 0 200 150" className="h-28 w-auto" fill="none" aria-hidden="true">
      {/* نگین روی حلقه */}
      <path d="M86 52 L114 52 L100 31 Z" className="stroke-ink" strokeWidth="1.6" strokeLinejoin="round" />
      {/* بدنهٔ حلقه — دو دایرهٔ هم‌مرکز */}
      <circle cx="100" cy="98" r="46" className="stroke-ink" strokeWidth="1.6" />
      <circle cx="100" cy="98" r="34" className="stroke-ink" strokeWidth="1.6" />
      {/* فلشِ قطرِ داخلی */}
      <line x1="70" y1="98" x2="130" y2="98" className="stroke-gold" strokeWidth="2" />
      <path d="M70 98 l9 -5 v10 z" className="fill-gold" />
      <path d="M130 98 l-9 -5 v10 z" className="fill-gold" />
    </svg>
  );
}

/** فهرستِ مرحله‌ای با شماره‌های فارسی */
function StepList({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="mt-4 space-y-2.5 text-[13px] leading-7 text-muted">
      {steps.map((s, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="shrink-0 font-medium text-ink">{faDigits(i + 1)}.</span>
          <span>{s}</span>
        </li>
      ))}
    </ol>
  );
}

/**
 * کشوی «انتخاب سایز» — مثلِ مرجعِ Carrera ولی RTL و با لهجهٔ طلاییِ گنج‌ریز
 * (خطِ تبِ فعال طلایی، نه قرمز). در RTL از سمتِ چپ سُر می‌خورد. کاربر می‌تواند
 * سایزِ دلخواهش را انتخاب کند؛ سایزِ انتخابی به والد (`onSelect`) برمی‌گردد.
 */
export default function SizeGuide({
  open,
  onClose,
  selected,
  onSelect,
  confirmLabel,
  onConfirm,
}: {
  open: boolean;
  onClose: () => void;
  selected: number | null;
  onSelect: (size: number) => void;
  /** متنِ دکمهٔ تأییدِ پایین (اگر داده شود، نوارِ تأیید نمایش داده می‌شود) */
  confirmLabel?: string;
  /** کنشِ تأیید — مثلاً «افزودن به سبدِ خرید» پس از انتخابِ سایز */
  onConfirm?: () => void;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("select");

  // هر بار که کشو باز می‌شود، روی تبِ «انتخاب سایز» شروع شود (نه تبِ راهنما)
  useEffect(() => {
    if (open) setTab("select");
  }, [open]);

  // قفلِ اسکرولِ پس‌زمینه + بستن با Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[90] ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
      inert={!open}
    >
      {/* بک‌دراپِ تیره */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* پنل — در RTL از سمتِ چپ */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="انتخاب سایز"
        className={`absolute inset-y-0 left-0 flex w-full max-w-2xl flex-col bg-background shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)] transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ transitionTimingFunction: EASE }}
      >
        {/* سرتیتر */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <h2 className="text-[15px] font-semibold tracking-[0.04em] text-ink">
            انتخاب سایز
          </h2>
          <button
            type="button"
            aria-label="بستن"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center text-ink transition-colors duration-300 hover:text-accent-dark"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {/* تب‌ها — خطِ تبِ فعال طلایی */}
        <div className="flex shrink-0 border-b border-line">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex-1 border-b-2 py-3.5 text-[13px] font-medium transition-colors duration-300 ${
                tab === t.key
                  ? "border-gold text-ink"
                  : "border-transparent text-muted hover:text-ink"
              }`}
              style={{ transitionTimingFunction: EASE }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* بدنه */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {tab === "select" ? (
            <table className="mx-10 w-[calc(100%_-_5rem)] table-fixed text-[12.5px]">
              <thead>
                {/* هر عنوان دقیقاً با همان padding ستونِ خودش، تا عدد زیرِ عنوان بنشیند
                    (نه جلوتر از آن). خطِ نازکِ زیرِ سرستون هنگامِ اسکرول جدا می‌ماند. */}
                <tr className="text-[11px] text-muted">
                  <th className="sticky top-0 w-1/4 border-b border-line bg-background py-3 ps-3 text-start font-medium">
                    سایزِ گنج‌ریز
                  </th>
                  <th className="sticky top-0 w-1/4 border-b border-line bg-background py-3 pe-3 text-end font-medium">
                    قطر / محیط (mm)
                  </th>
                  <th className="sticky top-0 w-1/4 border-b border-line bg-background py-3 pe-3 text-end font-medium">
                    اروپا
                  </th>
                  <th className="sticky top-0 w-1/4 border-b border-line bg-background py-3 pe-3 text-end font-medium">
                    آمریکا/کانادا
                  </th>
                </tr>
              </thead>
              <tbody>
                {RING_SIZES.map((r) => {
                  const active = selected === r.size;
                  return (
                    <tr
                      key={r.size}
                      onClick={() => onSelect(r.size)}
                      className={`size-row-divider cursor-pointer transition-colors duration-200 ${
                        active ? "bg-surface-alt" : "hover:bg-surface"
                      }`}
                    >
                      <td className="py-3 ps-3">
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`grid h-4 w-4 shrink-0 place-items-center border transition-colors duration-200 ${
                              active
                                ? "border-gold bg-gold text-white"
                                : "border-faint"
                            }`}
                          >
                            {active && <CheckIcon className="h-3 w-3" />}
                          </span>
                          <span className="font-medium text-ink">
                            {faDigits(r.size)}
                          </span>
                        </span>
                      </td>
                      <td className="py-3 pe-3 text-end text-muted">{faDigits(r.mm)}</td>
                      <td className="py-3 pe-3 text-end text-muted">{faDigits(r.eu)}</td>
                      <td className="py-3 pe-3 text-end text-muted">{faDigits(r.us)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="space-y-9 px-10 py-6">
              {/* مقدمه + دانلود */}
              <section>
                <h3 className="text-[13px] font-semibold tracking-[0.04em] text-ink">
                  {SIZE_GUIDE.introTitle}
                </h3>
                <p className="mt-3 text-[13px] leading-7 text-muted">
                  {SIZE_GUIDE.intro}
                </p>
                <a
                  href="#"
                  className="mt-5 inline-flex h-11 items-center justify-center bg-ink px-6 text-[12px] font-medium tracking-[0.04em] text-white transition-colors duration-300 hover:bg-[#2d2d2d]"
                  style={{ transitionTimingFunction: EASE }}
                >
                  {SIZE_GUIDE.downloadCta}
                </a>
              </section>

              {/* اندازه‌گیریِ انگشت */}
              <section>
                <h3 className="text-[13px] font-semibold tracking-[0.04em] text-ink">
                  {SIZE_GUIDE.measure.title}
                </h3>
                <div className="mt-4 grid place-items-center bg-surface py-7 text-ink">
                  <FingerDiagram />
                </div>
                <StepList steps={SIZE_GUIDE.measure.steps} />
              </section>

              {/* استفاده از حلقهٔ موجود */}
              <section>
                <h3 className="text-[13px] font-semibold tracking-[0.04em] text-ink">
                  {SIZE_GUIDE.existingRing.title}
                </h3>
                <div className="mt-4 grid place-items-center bg-surface py-7 text-ink">
                  <RingDiagram />
                </div>
                <StepList steps={SIZE_GUIDE.existingRing.steps} />
              </section>

              {/* نکاتِ کاربردی */}
              <section>
                <h3 className="text-[13px] font-semibold tracking-[0.04em] text-ink">
                  {SIZE_GUIDE.tipsTitle}
                </h3>
                <ul className="mt-3 list-disc space-y-2.5 ps-5 text-[13px] leading-7 text-muted marker:text-gold">
                  {SIZE_GUIDE.tips.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </section>
            </div>
          )}
        </div>

        {/* نوارِ تأیید — وقتی از مسیرِ «افزودن به سبد» باز شده باشد؛ تا سایز انتخاب نشود غیرفعال است */}
        {confirmLabel && onConfirm && (
          <div className="shrink-0 border-t border-line bg-background px-10 py-5">
            <button
              type="button"
              onClick={onConfirm}
              disabled={selected === null}
              className="flex h-11 w-full items-center justify-center bg-ink text-[13px] font-semibold tracking-[0.06em] text-white transition-colors duration-300 hover:bg-[#2d2d2d] disabled:bg-faint disabled:text-white"
              style={{ transitionTimingFunction: EASE }}
            >
              {selected === null
                ? "ابتدا سایز را انتخاب کنید"
                : confirmLabel}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
