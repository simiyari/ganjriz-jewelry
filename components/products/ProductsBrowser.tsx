"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PRODUCTS,
  FILTER_GROUPS,
  SORT_OPTIONS,
  PRICE_RANGES,
  PRODUCTS_PROMO,
  type Product,
} from "@/lib/site-data";
import { faNumber } from "@/lib/format";
import { asset } from "@/lib/asset";
import {
  CloseIcon,
  FilterIcon,
  ChevronDownIcon,
  GridTwoIcon,
  GridOneIcon,
  CheckIcon,
} from "@/components/ui/icons";
import ProductCard from "./ProductCard";

// شمارش بر اساسِ «خانهٔ شبکه» (نه تعدادِ محصول). چون کاشیِ تبلیغاتی ۲ خانه می‌گیرد،
// با مضربِ ۶ گرفتنِ خانه‌ها (مضربِ ۱/۲/۳ ستون) ردیف‌ها همیشه کامل‌اند: در نمایِ
// بدونِ فیلتر = ۱۰ محصول + کاشی(۲)=۱۲؛ در نمایِ فیلترشده همان ۲ خانه با محصول پر می‌شود.
const CELLS_PER_PAGE = 12;
const CELLS_STEP = 12;
const PROMO_AFTER = 4; // کاشیِ تبلیغاتی بعد از چهارمین محصول
const PROMO_CELLS = 2; // عرضِ کاشی = ۲ ستون

// تایمینگِ حرکت‌ها — هماهنگ با خودِ سایت (همان منحنیِ جمع/بازشدنِ نوارِ هدر).
const EASE = "cubic-bezier(0.4,0,0.2,1)";

const FILTER_KEYS = ["category", "color", "karat", "price"] as const;
type FilterKey = (typeof FILTER_KEYS)[number];
type FilterState = Record<FilterKey, Set<string>>;

// شکلِ عمومیِ داده‌ها — تا همین مرورگر هم برای صفحهٔ «محصولات» و هم «جواهر لوکس»
// به‌کار رود؛ فقط محتوا (محصولات/فیلترها/کاشیِ تبلیغاتی) فرق می‌کند، نه ساختار.
type FilterGroupDef = {
  key: string;
  title: string;
  options: readonly { label: string; value: string }[];
};
type PriceRangeDef = {
  label: string;
  value: string;
  min: number;
  max: number;
};
type PromoDef = { title: string; cta: string; href: string; image: string };

const emptyFilters = (): FilterState => ({
  category: new Set(),
  color: new Set(),
  karat: new Set(),
  price: new Set(),
});

export default function ProductsBrowser({
  products = PRODUCTS,
  filterGroups = FILTER_GROUPS,
  priceRanges = PRICE_RANGES,
  promo = PRODUCTS_PROMO,
  basePath = "/products",
}: {
  products?: readonly Product[];
  filterGroups?: readonly FilterGroupDef[];
  priceRanges?: readonly PriceRangeDef[];
  promo?: PromoDef | null;
  /** ریشهٔ مسیرِ تک‌محصول برای کارت‌ها — «/products» یا «/high-jewelry» */
  basePath?: string;
} = {}) {
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<string>("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [loadedCells, setLoadedCells] = useState<number>(CELLS_PER_PAGE);
  const [showFilters, setShowFilters] = useState<boolean>(true); // فقط دسکتاپ
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false); // کشوی موبایل
  const [mobileCols, setMobileCols] = useState<1 | 2>(2); // نمای موبایل: ۱ یا ۲ ستون
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(filterGroups.map((g) => g.key))
  );
  const toolbarRef = useRef<HTMLDivElement>(null);

  // ارتفاعِ نوارِ ابزارِ دسکتاپ را منتشر می‌کند تا فیلترِ استیکی زیرِ آن بنشیند.
  useEffect(() => {
    const el = toolbarRef.current;
    if (!el) return;
    const set = () =>
      document.documentElement.style.setProperty("--ptoolbar-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--ptoolbar-h");
    };
  }, []);

  // بستنِ منوی مرتب‌سازی با کلیکِ بیرون یا Escape (هم دسکتاپ هم موبایل، با [data-sort])
  useEffect(() => {
    if (!sortOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-sort]")) setSortOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSortOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [sortOpen]);

  // قفلِ اسکرولِ پس‌زمینه هنگامِ بازبودنِ کشوی فیلترِ موبایل
  useEffect(() => {
    document.body.style.overflow = mobileFilterOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFilterOpen]);

  const filtered = useMemo(() => {
    const list = products.filter((p) => {
      if (filters.category.size && !filters.category.has(p.category)) return false;
      if (filters.color.size && !p.colors.some((c) => filters.color.has(c)))
        return false;
      if (filters.karat.size && !filters.karat.has(String(p.karat))) return false;
      if (filters.price.size) {
        const inRange = priceRanges.some(
          (r) => filters.price.has(r.value) && p.price >= r.min && p.price < r.max
        );
        if (!inRange) return false;
      }
      return true;
    });
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [filters, sort, products, priceRanges]);

  const activeCount = FILTER_KEYS.reduce((n, k) => n + filters[k].size, 0);
  const promoVisible = !!promo && activeCount === 0 && filtered.length >= PROMO_AFTER;
  const visible = loadedCells - (promoVisible ? PROMO_CELLS : 0);
  const shown = filtered.slice(0, visible);
  const showPromo = promoVisible && shown.length >= PROMO_AFTER;
  const currentSort = SORT_OPTIONS.find((o) => o.value === sort) ?? SORT_OPTIONS[0];
  const reflowKey =
    FILTER_KEYS.map((k) => [...filters[k]].sort().join(",")).join("|") + "::" + sort;

  function toggleFilter(key: FilterKey, value: string) {
    setFilters((prev) => {
      const next = new Set(prev[key]);
      next.has(value) ? next.delete(value) : next.add(value);
      return { ...prev, [key]: next };
    });
    setLoadedCells(CELLS_PER_PAGE);
  }
  function clearFilters() {
    setFilters(emptyFilters());
    setLoadedCells(CELLS_PER_PAGE);
  }
  function toggleGroup(key: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  // ── محتوای مشترکِ فیلتر (هم در نوارِ کناریِ دسکتاپ، هم در کشوی موبایل) ──
  const filterGroupsUI = (
    <>
      {activeCount > 0 && (
        <div className="mb-1 flex items-center justify-between pt-1">
          <span className="text-xs text-faint">
            {faNumber(activeCount)} فیلترِ فعال
          </span>
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs text-muted underline-offset-2 transition-colors duration-300 hover:text-gold-dark hover:underline"
          >
            حذفِ همه
          </button>
        </div>
      )}
      {filterGroups.map((group) => {
        const open = openGroups.has(group.key);
        return (
          <div key={group.key} className="border-b border-line py-5 first:pt-0 last:border-b-0">
            <button
              type="button"
              onClick={() => toggleGroup(group.key)}
              className="flex w-full items-center justify-between text-[13px] font-semibold text-ink"
            >
              {group.title}
              <ChevronDownIcon
                className={`h-4 w-4 text-muted transition-transform duration-500 ${
                  open ? "" : "-rotate-90"
                }`}
                style={{ transitionTimingFunction: EASE }}
              />
            </button>
            <div
              className={`grid transition-all duration-500 ${
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
              style={{ transitionTimingFunction: EASE }}
            >
              <div className="overflow-hidden">
                <ul className="space-y-3.5 pt-4">
                  {group.options.map((opt) => {
                    const checked = filters[group.key as FilterKey].has(opt.value);
                    return (
                      <li key={opt.value}>
                        <label className="group flex cursor-pointer items-center gap-3 text-[13.5px]">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={checked}
                            onChange={() =>
                              toggleFilter(group.key as FilterKey, opt.value)
                            }
                          />
                          <span className="grid h-[18px] w-[18px] shrink-0 place-items-center border border-faint bg-white text-white transition-colors duration-300 group-hover:border-ink peer-checked:border-ink peer-checked:bg-ink peer-checked:[&>svg]:opacity-100">
                            <CheckIcon
                              weight="bold"
                              className="h-3 w-3 opacity-0 transition-opacity duration-300"
                            />
                          </span>
                          <span className="text-ink/90 transition-colors duration-300 peer-checked:font-medium peer-checked:text-ink">
                            {opt.label}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );

  // ── گزینه‌های مرتب‌سازی (مشترکِ منوی دسکتاپ و موبایل) ──
  const sortOptionsUI = (
    <ul
      role="listbox"
      className="overflow-hidden border border-line bg-white py-1.5 shadow-[0_12px_22px_-18px_rgba(0,0,0,0.4)]"
    >
      {SORT_OPTIONS.map((o) => {
        const active = o.value === sort;
        return (
          <li key={o.value} role="option" aria-selected={active}>
            <button
              type="button"
              data-sort
              onClick={() => {
                setSort(o.value);
                setLoadedCells(CELLS_PER_PAGE);
                setSortOpen(false);
              }}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[13px] text-ink hover:font-semibold"
            >
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  active ? "bg-gold" : "bg-transparent"
                }`}
              />
              <span>{o.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="container-lux pb-16 md:pb-24">
      {/* ════ نوارِ موبایل: فیلترها | مرتب‌سازی + شمارش و سوییچِ نما ════ */}
      <div className="md:hidden">
        <div className="-mx-4 grid grid-cols-2 border-y border-line">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center justify-center gap-2 border-e border-line py-4 text-[13px] font-medium tracking-[0.04em] text-ink"
          >
            <FilterIcon className="h-[18px] w-[18px]" />
            فیلترها
          </button>
          <div data-sort className="relative">
            <button
              type="button"
              data-sort
              onClick={() => setSortOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
              className="flex w-full items-center justify-center gap-2 py-4 text-[13px] font-medium tracking-[0.04em] text-ink"
            >
              مرتب‌سازی
              <ChevronDownIcon
                className={`h-3.5 w-3.5 transition-transform duration-300 ${
                  sortOpen ? "rotate-180" : ""
                }`}
                style={{ transitionTimingFunction: EASE }}
              />
            </button>
            <div
              className={`absolute end-0 top-full z-40 w-full transition-all duration-300 ${
                sortOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0"
              }`}
              style={{ transitionTimingFunction: EASE }}
            >
              {sortOptionsUI}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between py-4 text-[13px]">
          <span className="text-faint">{faNumber(filtered.length)} محصول</span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-label="نمای دوستونه"
              aria-pressed={mobileCols === 2}
              onClick={() => setMobileCols(2)}
              className={mobileCols === 2 ? "text-ink" : "text-faint"}
            >
              <GridTwoIcon className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              aria-label="نمای تک‌ستونه"
              aria-pressed={mobileCols === 1}
              onClick={() => setMobileCols(1)}
              className={mobileCols === 1 ? "text-ink" : "text-faint"}
            >
              <GridOneIcon className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </div>

      {/* ════ نوارِ ابزارِ دسکتاپ — استیکی زیرِ هدر ════ */}
      <div
        ref={toolbarRef}
        className="z-30 mt-6 hidden items-center justify-between bg-background pt-2 pb-4 text-[13px] md:flex md:sticky"
        style={{ top: "var(--header-h, 86px)" }}
      >
        <div className="flex items-center gap-4 md:gap-6">
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center gap-2 font-medium text-ink transition-colors duration-300 hover:text-gold-dark"
            style={{ transitionTimingFunction: EASE }}
          >
            <FilterIcon className="h-[18px] w-[18px]" />
            {showFilters ? "پنهان‌کردنِ فیلترها" : "نمایشِ فیلترها"}
          </button>
          <span className="text-faint">{faNumber(filtered.length)} محصول</span>
        </div>

        <div data-sort className="relative">
          <button
            type="button"
            data-sort
            onClick={() => setSortOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            className="flex items-center gap-2 text-muted"
          >
            <span>مرتب‌سازی:</span>
            <span className="font-medium text-ink">{currentSort.label}</span>
            <ChevronDownIcon
              className={`h-3.5 w-3.5 text-ink transition-transform duration-300 ${
                sortOpen ? "rotate-180" : ""
              }`}
              style={{ transitionTimingFunction: EASE }}
            />
          </button>
          <div
            className={`absolute inset-x-0 top-full z-40 mt-2 transition-all duration-300 ${
              sortOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-1 opacity-0"
            }`}
            style={{ transitionTimingFunction: EASE }}
          >
            {sortOptionsUI}
          </div>
        </div>
      </div>

      {/* ════ محتوا: نوارِ کناریِ فیلتر (دسکتاپ) + شبکهٔ محصولات ════
          موبایل: pt-0 — فاصلهٔ بالای شبکه را خودِ نوارِ شمارش (py-4) می‌سازد تا بالا/پایینش میزان شود */}
      <div className="flex flex-col pt-0 md:flex-row md:pt-6">
        <aside
          className={`hidden self-start overflow-hidden transition-[width,margin] md:sticky md:block ${
            showFilters ? "md:me-8 md:w-60" : "md:me-0 md:w-0"
          }`}
          style={{
            transitionDuration: "500ms",
            transitionTimingFunction: EASE,
            top: "calc(var(--header-h, 86px) + var(--ptoolbar-h, 60px) + 8px)",
          }}
          aria-hidden={!showFilters}
        >
          <div className="w-full md:w-60">{filterGroupsUI}</div>
        </aside>

        <div className="flex-1">
          {shown.length > 0 ? (
            <div
              key={reflowKey}
              className={`grid items-start gap-3 lg:grid-cols-3 ${
                mobileCols === 1 ? "grid-cols-1" : "grid-cols-2"
              }`}
            >
              {shown.map((product, i) => (
                <Fragment key={product.id}>
                  <div
                    className="fx-card-in"
                    style={{ animationDelay: `${Math.min(i, 6) * 30}ms` }}
                  >
                    <ProductCard product={product} basePath={basePath} />
                  </div>

                  {showPromo && promo && i === PROMO_AFTER - 1 && (
                    <Link
                      href={promo.href}
                      // در نمای تک‌ستونهٔ موبایل باید یک ستون را بگیرد (نه ۲)؛
                      // وگرنه ستونِ دومِ ضمنی می‌سازد و چینش بهم می‌ریزد.
                      // موبایل: فول‌بلید (-mx-4 = پدینگِ ۱۶px کانتینر) تا کاشی به لبه‌ها بچسبد؛
                      // از md به بعد داخلِ کانتینر می‌ماند (md:mx-0).
                      className={`fx-card-in relative -mx-4 block aspect-[5/4] overflow-hidden md:mx-0 lg:col-span-2 lg:aspect-auto lg:self-stretch ${
                        mobileCols === 1 ? "col-span-1" : "col-span-2"
                      }`}
                      style={{ animationDelay: `${Math.min(i, 6) * 30}ms` }}
                    >
                      <Image
                        src={asset(promo.image)}
                        alt={promo.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 p-6 text-center text-white md:p-9">
                        <h3 className="text-[26px] font-semibold [text-shadow:0_1px_14px_rgba(0,0,0,0.35)] md:text-[32px]">
                          {promo.title}
                        </h3>
                        <span className="bg-white px-7 py-3 text-[12px] font-medium tracking-[0.04em] text-ink transition-colors duration-300 hover:bg-[#f5f5f5]">
                          {promo.cta}
                        </span>
                      </div>
                    </Link>
                  )}
                </Fragment>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-24 text-center">
              <p className="text-muted">محصولی با این فیلترها یافت نشد.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="text-[13px] font-medium text-gold-dark underline-offset-4 hover:underline"
              >
                حذفِ فیلترها
              </button>
            </div>
          )}

          {visible < filtered.length && (
            <div className="mt-14 flex flex-col items-center gap-3">
              <span className="text-xs text-faint">
                نمایشِ {faNumber(shown.length)} از {faNumber(filtered.length)} محصول
              </span>
              <button
                type="button"
                onClick={() => setLoadedCells((c) => c + CELLS_STEP)}
                className="bg-ink px-12 py-3.5 text-[13px] font-medium tracking-[0.04em] text-white transition-colors duration-300 hover:bg-[#2d2d2d]"
                style={{ transitionTimingFunction: EASE }}
              >
                نمایشِ بیشتر
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ════ کشوی فیلترِ موبایل — تمام‌صفحه، از کنار ════ */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-background transition-transform duration-300 md:hidden ${
          mobileFilterOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        style={{ transitionTimingFunction: EASE }}
        aria-hidden={!mobileFilterOpen}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <span className="text-[15px] font-semibold text-ink">فیلترها</span>
          <button
            type="button"
            aria-label="بستنِ فیلترها"
            onClick={() => setMobileFilterOpen(false)}
            className="grid h-9 w-9 place-items-center text-ink"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <div data-lenis-prevent className="flex-1 overflow-y-auto px-5 pt-5 pb-5">
          {filterGroupsUI}
        </div>
        <div className="shrink-0 border-t border-line px-5 py-4">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(false)}
            className="w-full bg-ink py-3.5 text-[13px] font-medium tracking-[0.04em] text-white transition-colors duration-300 hover:bg-[#2d2d2d]"
          >
            نمایشِ {faNumber(filtered.length)} محصول
          </button>
        </div>
      </div>
    </div>
  );
}
