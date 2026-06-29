"use client";

import { useEffect, useMemo, useState } from "react";
import { STORES, STORE_LOCATOR, type Store } from "@/lib/site-data";
import {
  SearchIcon,
  LocateIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ChevronLeftIcon,
  ListIcon,
} from "@/components/ui/icons";
import StoreMap from "./StoreMap";
import StoreDetail from "./StoreDetail";

// منحنیِ حرکتِ یکدستِ سایت (همان نوارِ کناریِ صفحهٔ محصولات)
const EASE = "cubic-bezier(0.4,0,0.2,1)";

/* ──────────────────────────────────────────────
   یافتن شعبه (/stores) — RTL-آینهٔ Store Locator مرجع.
   دسکتاپ: سه ستون — فهرستِ شعبه‌ها (راست) | جزئیات (وسط، با انتخاب) | نقشه (چپ).
   موبایل: عنوان + جستجو + فیلتر + سوییچِ نقشه/فهرست؛ نقشه و فهرست زیرِ هم،
   و با لمسِ هر شعبه پوششِ تمام‌صفحهٔ جزئیات باز می‌شود.
   ────────────────────────────────────────────── */
export default function StoreLocator() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [mobileView, setMobileView] = useState<"map" | "list">("map");

  const filtered = useMemo(() => {
    const q = query.trim();
    return STORES.filter((s) => {
      if (filter !== "all" && s.type !== filter) return false;
      if (q && !`${s.name} ${s.address} ${s.city}`.includes(q)) return false;
      return true;
    });
  }, [query, filter]);

  const selected = useMemo(
    () => STORES.find((s) => s.id === selectedId) ?? null,
    [selectedId]
  );

  // شعبه‌ای که در پنلِ جزئیات «نمایش داده می‌شود» — حتی هنگامِ بسته‌شدن نگه داشته
  // می‌شود تا محتوا در طولِ انیمیشنِ جمع‌شدنِ پنل ناگهان ناپدید نشود (باز/بسته نرم).
  const [shownStore, setShownStore] = useState<Store | null>(null);
  useEffect(() => {
    if (selected) setShownStore(selected);
  }, [selected]);

  // اگر شعبهٔ انتخاب‌شده با فیلتر/جستجوی فعلی دیگر در فهرست نباشد، انتخاب پاک شود
  useEffect(() => {
    if (selectedId && !filtered.some((s) => s.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filtered, selectedId]);

  // قفلِ اسکرولِ پس‌زمینه فقط وقتی پوششِ تمام‌صفحهٔ جزئیات روی موبایل باز است
  useEffect(() => {
    if (!selected) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const clearSelection = () => setSelectedId(null);

  // ── جستجو (مشترکِ دسکتاپ/موبایل) ──
  const searchUI = (
    <div className="flex items-center gap-3 border-b border-line pb-3">
      <SearchIcon className="h-5 w-5 shrink-0 text-muted" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={STORE_LOCATOR.searchPlaceholder}
        aria-label="جستجوی شعبه"
        className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-faint"
      />
      <span className="h-5 w-px shrink-0 bg-line" aria-hidden />
      <button
        type="button"
        aria-label="نمایشِ همهٔ شعبه‌ها روی نقشه"
        onClick={clearSelection}
        className="grid h-6 w-6 shrink-0 place-items-center text-muted transition-colors duration-300 ease-out hover:text-ink"
      >
        <LocateIcon className="h-5 w-5" />
      </button>
    </div>
  );

  // ── تب‌های فیلتر (مشترک) — نشانگرِ جواهری سبز، بقیه تیره ──
  const filterTabsUI = (
    <div className="flex items-center gap-5">
      {STORE_LOCATOR.filters.map((f) => {
        const active = filter === f.value;
        const pinColor = f.value === "boutique" ? "text-accent" : "text-ink";
        return (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={active}
            className={`flex items-center gap-1.5 text-[12px] font-medium tracking-[0.02em] transition-colors duration-300 ease-out ${
              active ? "text-ink" : "text-muted hover:text-ink"
            }`}
          >
            <MapPinIcon weight="fill" className={`h-4 w-4 ${pinColor}`} />
            <span className={active ? "underline decoration-ink underline-offset-4" : ""}>
              {f.label}
            </span>
          </button>
        );
      })}
    </div>
  );

  // ── فهرستِ شعبه‌ها (مشترک) ──
  const listUI =
    filtered.length > 0 ? (
      <ul>
        {filtered.map((s) => (
          <li key={s.id}>
            <StoreListItem
              store={s}
              selected={s.id === selectedId}
              onSelect={() => setSelectedId(s.id)}
            />
          </li>
        ))}
      </ul>
    ) : (
      <p className="px-7 py-16 text-center text-[14px] text-muted">
        شعبه‌ای با این فیلتر یافت نشد.
      </p>
    );

  return (
    <>
      {/* ════════════ دسکتاپ — سه ستونِ هم‌ارتفاعِ نما ════════════
          ارتفاعِ ثابت (نه وابسته به var(--header-h)) تا با جمع‌شدنِ نوارِ لوگوی هدر
          هنگامِ اسکرول، نقشه دوباره اندازه‌گیری/بازچینش نشود و «نلرزد». ۸۶px ≈ ارتفاعِ
          هدرِ جمع‌شده (نوارِ بالا + ناوبری). */}
      <div className="hidden h-[calc(100vh-86px)] min-h-[640px] md:flex">
        {/* فهرست — راست (start در RTL) */}
        <div className="flex w-[360px] shrink-0 flex-col border-e border-line lg:w-[400px]">
          <div className="shrink-0 px-7 pb-5 pt-7">
            <h1 className="text-[26px] font-semibold tracking-tight text-ink">
              {STORE_LOCATOR.title}
            </h1>
            <div className="mt-5">{searchUI}</div>
            <div className="mt-5">{filterTabsUI}</div>
          </div>
          <h2 className="sr-only">فهرستِ شعبه‌ها</h2>
          <div data-lenis-prevent className="flex-1 overflow-y-auto">
            {listUI}
          </div>
        </div>

        {/* جزئیات — وسط. همیشه در DOM است و عرضش ۰↔W انیمیت می‌شود تا نرم باز/بسته
            شود (مثلِ نوارِ کناریِ صفحهٔ محصولات). محتوا = shownStore تا هنگامِ بسته‌شدن
            هم بماند. وقتی بسته است inert/aria-hidden می‌شود. */}
        <div
          aria-hidden={!selected}
          inert={!selected}
          className={`shrink-0 self-stretch overflow-hidden transition-[width,opacity] duration-500 ${
            selected
              ? "w-[360px] border-e border-line opacity-100 lg:w-[420px]"
              : "w-0 opacity-0"
          }`}
          style={{ transitionTimingFunction: EASE }}
        >
          <div data-lenis-prevent className="h-full w-[360px] overflow-y-auto lg:w-[420px]">
            {shownStore && <StoreDetail store={shownStore} onBack={clearSelection} />}
          </div>
        </div>

        {/* نقشه — چپ (end در RTL) */}
        <div className="flex-1">
          <StoreMap stores={filtered} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
      </div>

      {/* ════════════ موبایل ════════════ */}
      <div className="md:hidden">
        <div className="container-lux pb-4 pt-6">
          <h1 className="text-[26px] font-semibold tracking-tight text-ink">
            {STORE_LOCATOR.title}
          </h1>
          <div className="mt-5">{searchUI}</div>
          <div className="mt-5 flex items-center justify-between">
            {filterTabsUI}
            <button
              type="button"
              onClick={() => setMobileView((v) => (v === "map" ? "list" : "map"))}
              className="flex items-center gap-1.5 text-[12px] font-medium tracking-[0.02em] text-ink"
            >
              {mobileView === "map" ? (
                <>
                  <ListIcon className="h-[18px] w-[18px]" />
                  فهرست
                </>
              ) : (
                <>
                  <MapPinIcon className="h-[18px] w-[18px]" />
                  نقشه
                </>
              )}
            </button>
          </div>
        </div>

        {mobileView === "map" && (
          <div className="h-[55vh] w-full border-y border-line">
            <StoreMap stores={filtered} selectedId={selectedId} onSelect={setSelectedId} />
          </div>
        )}

        <h2 className="sr-only">فهرستِ شعبه‌ها</h2>
        <div className="border-t border-line">{listUI}</div>
      </div>

      {/* پوششِ تمام‌صفحهٔ جزئیات — فقط موبایل */}
      <div
        data-lenis-prevent
        aria-hidden={!selected}
        inert={!selected}
        className={`fixed inset-0 z-[60] overflow-y-auto bg-background transition-transform duration-500 md:hidden ${
          selected ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        style={{ transitionTimingFunction: EASE }}
      >
        {shownStore && <StoreDetail store={shownStore} onBack={clearSelection} />}
      </div>
    </>
  );
}

/* یک کارتِ شعبه در فهرست — نام (سبزِ برند)، نوع، نشانی، تلفن، ایمیل، فلشِ ادامه.
   عنوانِ نام به‌صورتِ <span> است نه هدینگ (داخلِ <button> مجاز نیست). */
function StoreListItem({
  store,
  selected,
  onSelect,
}: {
  store: Store;
  selected: boolean;
  onSelect: () => void;
}) {
  const typeLabel = STORE_LOCATOR.typeLabels[store.type];
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      className={`group block w-full border-b border-line px-7 py-6 text-start transition-colors duration-300 ease-out ${
        selected ? "bg-surface" : "hover:bg-surface/60"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="block text-[15px] font-semibold text-accent-dark">
            {store.name}
          </span>
          <span className="mt-0.5 block text-[12px] text-muted">{typeLabel}</span>
        </div>
        <ChevronLeftIcon className="mt-1 h-4 w-4 shrink-0 text-faint transition-all duration-300 ease-out group-hover:-translate-x-0.5 group-hover:text-ink" />
      </div>

      <div className="mt-3 space-y-2 text-[13px] leading-6 text-muted">
        <div className="flex items-start gap-2">
          <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink/70" />
          <span>{store.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon className="h-4 w-4 shrink-0 text-ink/70" />
          <span dir="ltr">{store.phone}</span>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <MailIcon className="h-4 w-4 shrink-0 text-ink/70" />
          <span dir="ltr" className="truncate">
            {store.email}
          </span>
        </div>
      </div>
    </button>
  );
}
