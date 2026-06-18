"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import GoldTicker from "./GoldTicker";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/site-data";
import { SOCIAL_ICONS } from "@/components/ui/icons";
import {
  BagIcon,
  CloseIcon,
  HeartIcon,
  MapPinIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/icons";

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex flex-col items-center ${className}`}>
      <span className="text-[26px] font-semibold leading-none text-accent sm:text-[30px]">
        {SITE.name}
      </span>
      <span className="font-en mt-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-ink/65">
        {SITE.nameLatin} fine jewelry
      </span>
    </Link>
  );
}

function IconButton({
  label,
  children,
  badge,
}: {
  label: string;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="relative grid h-9 w-9 place-items-center text-ink transition-colors hover:text-accent-dark"
    >
      {children}
      {badge && (
        <span className="absolute -top-0.5 -left-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // فقط نوار لوگو/آیکون‌ها هنگام اسکرول به پایین جمع می‌شود و با اسکرول به بالا برمی‌گردد
  const [hideLogoBar, setHideLogoBar] = useState(false);
  const lastScrollY = useRef(0);
  const hideRef = useRef(false);

  useEffect(() => {
    let ticking = false;
    // پس از هر تغییر وضعیت، چیدمان جابه‌جا می‌شود و scroll-anchoring مرورگر
    // اسکرول را کمی تکان می‌دهد؛ تا پایان انیمیشن آن را نادیده می‌گیریم تا نوار نلرزد.
    let cooldownUntil = 0;
    const apply = (hide: boolean) => {
      if (hideRef.current === hide) return;
      hideRef.current = hide;
      setHideLogoBar(hide);
      cooldownUntil = performance.now() + 650;
    };
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setScrolled(y > 8);
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;
      if (performance.now() < cooldownUntil) return;
      if (y < 100) {
        apply(false); // نزدیک بالای صفحه همیشه نمایش داده شود
      } else if (delta > 3) {
        apply(true); // اسکرول به پایین → جمع شود
      } else if (delta < -3) {
        apply(false); // اسکرول به بالا → ظاهر شود
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* نوار بالایی — نرخ طلا + زبان + شعبه */}
      <div className="hidden border-b border-line bg-surface md:block">
        <div className="container-lux grid h-9 grid-cols-3 items-center">
          <div className="flex justify-start">
            <GoldTicker />
          </div>
          <p className="text-center text-[11px] text-muted">ارسال امن و بیمه‌شده به سراسر کشور</p>
          <div className="flex items-center justify-end gap-4 text-[11px] text-muted">
            <Link href="/stores" className="flex items-center gap-1.5 transition-colors hover:text-ink">
              <MapPinIcon className="h-3.5 w-3.5" />
              یافتن شعبه
            </Link>
            <span className="text-line">|</span>
            <button type="button" className="transition-colors hover:text-ink">
              فارسی
            </button>
          </div>
        </div>
      </div>

      {/* نوار اصلی — لوگو و آیکون‌ها */}
      <div
        className={`bg-background/95 backdrop-blur transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_0_0_var(--color-line),0_12px_28px_-24px_rgba(0,0,0,0.35)]" : "border-b border-line"
        }`}
      >
        {/* نوار لوگو/آیکون‌ها — هنگام جمع‌شدن کل بلوک نرم به سمت بالا سُر می‌خورد
            (هماهنگ با اسکرول)، نه له‌شدن از وسط. justify-end بلوک را به لبهٔ پایین
            می‌چسباند تا با کم‌شدن ارتفاع به بالا حرکت کند و از بالا برش بخورد. */}
        <div
          className={`flex flex-col justify-end overflow-hidden transition-[height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] h-16 ${
            hideLogoBar ? "md:h-0" : "md:h-20"
          }`}
        >
          <div className="container-lux grid h-16 grid-cols-3 items-center md:h-20">
          {/* راست: منوی موبایل / جستجو دسکتاپ */}
          <div className="flex items-center justify-start gap-1">
            <button
              type="button"
              aria-label="باز کردن منو"
              onClick={() => setMenuOpen(true)}
              className="grid h-9 w-9 place-items-center text-ink md:hidden"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <div className="hidden md:block">
              <IconButton label="جستجو">
                <SearchIcon className="h-5 w-5" />
              </IconButton>
            </div>
          </div>

          {/* وسط: لوگو */}
          <div className="flex justify-center">
            <Logo />
          </div>

          {/* چپ: آیکون‌های کاربری */}
          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <div className="md:hidden">
              <IconButton label="جستجو">
                <SearchIcon className="h-5 w-5" />
              </IconButton>
            </div>
            <div className="hidden sm:block">
              <IconButton label="علاقه‌مندی‌ها">
                <HeartIcon className="h-5 w-5" />
              </IconButton>
            </div>
            <div className="hidden sm:block">
              <IconButton label="حساب کاربری">
                <UserIcon className="h-5 w-5" />
              </IconButton>
            </div>
            <IconButton label="سبد خرید" badge="۲">
              <BagIcon className="h-5 w-5" />
            </IconButton>
          </div>
          </div>
        </div>

        {/* نوار ناوبری — دسکتاپ. مرز بالایی فقط وقتی نوار لوگو باز است؛
            هنگام جمع‌شدن حذف می‌شود تا با مرز پایینی نوار بالایی خط دوبل/ضخیم نسازد */}
        <nav
          className={`hidden md:block ${hideLogoBar ? "" : "border-t border-line"}`}
        >
          <ul className="container-lux flex h-12 items-center justify-center gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link text-[13px] font-medium text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* کشوی موبایل */}
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* پوشش تیره */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* پنل کشویی از سمت راست */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[82%] max-w-sm flex-col bg-background shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="text-lg font-medium">{SITE.name}</span>
          <button
            type="button"
            aria-label="بستن منو"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center text-ink"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="border-b border-line bg-surface px-5 py-3">
          <GoldTicker />
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-2">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-lg px-3 py-3.5 text-[15px] text-ink transition-colors hover:bg-surface"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line px-5 py-4">
          <Link
            href="/stores"
            onClick={onClose}
            className="mb-4 flex items-center gap-2 text-sm text-muted"
          >
            <MapPinIcon className="h-4 w-4" />
            یافتن شعبه
          </Link>
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent-dark"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
