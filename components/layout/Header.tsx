"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import GoldTicker from "./GoldTicker";
import SearchDrawer from "./SearchDrawer";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/site-data";
import { faDigits } from "@/lib/format";
import { useAuth } from "@/components/account/AuthContext";
import { useCart } from "@/components/cart/CartContext";
import { SOCIAL_ICONS } from "@/components/ui/icons";
import {
  BagIcon,
  ChevronLeftIcon,
  CloseIcon,
  HeartIcon,
  MapPinIcon,
  MenuIcon,
  PhoneIcon,
  SearchIcon,
  UserIcon,
} from "@/components/ui/icons";

function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="گنج‌ریز — صفحهٔ اصلی"
      className={`group inline-flex flex-col items-center ${className}`}
    >
      {/* وردمارکِ لوگو = لوگوتایپِ برند (نه متنِ محتوایی). نامِ دسترس‌پذیر را aria-label روی
          لینک می‌دهد و این دو span از درختِ a11y پنهان‌اند: لوگوتایپ از الزامِ کنتراستِ
          WCAG مستثناست و این کار تکرارِ نام/عدم‌تطابقِ Label-in-Name را هم برطرف می‌کند. */}
      <span aria-hidden="true" className="font-trajan whitespace-nowrap text-[clamp(15px,4.2vw,22px)] font-bold uppercase leading-none tracking-[0.06em] text-gold-dark sm:tracking-[0.15em]">
        GANJRIZ JEWELLERY
      </span>
      <span aria-hidden="true" className="font-en mt-1.5 whitespace-nowrap text-[clamp(8px,2.3vw,11px)] font-medium uppercase tracking-[0.2em] text-ink/60">
        THE LAST STEP OF LUXURY
      </span>
    </Link>
  );
}

function IconButton({
  label,
  children,
  badge,
  className = "",
  href,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  badge?: string;
  className?: string;
  /** اگر داده شود، به‌جای دکمه یک لینک می‌سازد (مثلِ آیکونِ حساب کاربری → /login) */
  href?: string;
  onClick?: () => void;
}) {
  const cls = `relative grid h-9 w-9 place-items-center text-ink transition-colors duration-300 ease-out hover:text-accent-dark ${className}`;
  const inner = (
    <>
      {children}
      {badge && (
        <span className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 pt-px text-[9px] font-bold leading-none text-white">
          {badge}
        </span>
      )}
    </>
  );
  return href ? (
    <Link href={href} aria-label={label} className={cls}>
      {inner}
    </Link>
  ) : (
    <button type="button" aria-label={label} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  // فقط نوار لوگو/آیکون‌ها هنگام اسکرول به پایین جمع می‌شود و با اسکرول به بالا برمی‌گردد
  const [hideLogoBar, setHideLogoBar] = useState(false);
  const lastScrollY = useRef(0);
  const hideRef = useRef(false);
  const headerRef = useRef<HTMLElement>(null);

  // سبد خرید — از استیتِ سراسری (CartProvider) تا نشانِ روی آیکون با محتوای سبد یکی بماند
  const cart = useCart();
  // اگر کاربر وارد شده باشد، آیکونِ حساب به پنلِ کاربری می‌رود؛ وگرنه به صفحهٔ ورود.
  const { user } = useAuth();
  const accountHref = user ? "/account" : "/login";

  // ارتفاعِ زندهٔ هدر را به‌صورتِ متغیرِ CSS (`--header-h`) منتشر می‌کند تا
  // عناصرِ استیکیِ صفحات (مثلِ نوارِ ابزار و فیلترِ صفحهٔ محصولات) درست زیرِ هدر
  // بنشینند و هنگامِ جمع/بازشدنِ نوارِ لوگو هم‌گام با آن بالا/پایین بروند.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const set = () =>
      document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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
      // نزدیکِ بالای صفحه (شاملِ هیرو که اسکرولش هنگام ظهورِ متن قفل است) باز بماند
      if (y < 100) {
        apply(false);
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
    <header ref={headerRef} className="sticky top-0 z-50">
      {/* نوار بالایی — نرخ طلا + زبان + شعبه */}
      <div className="hidden border-b border-line bg-surface md:block">
        <div className="container-lux grid h-9 grid-cols-3 items-center">
          <div className="flex justify-start">
            <GoldTicker />
          </div>
          <p className="text-center text-[11px] text-muted">ارسال امن و بیمه‌شده به سراسر کشور</p>
          <div className="flex items-center justify-end gap-4 text-[11px] text-muted">
            <Link href="/stores" className="flex items-center gap-1.5 transition-colors duration-300 ease-out hover:text-ink">
              <MapPinIcon className="h-3.5 w-3.5" />
              یافتن شعبه
            </Link>
            <span className="text-line">|</span>
            <button type="button" className="transition-colors duration-300 ease-out hover:text-ink">
              فارسی
            </button>
          </div>
        </div>
      </div>

      {/* نوار اصلی — لوگو و آیکون‌ها */}
      <div
        className={`bg-background/95 backdrop-blur border-b border-line transition-shadow duration-300 ${
          scrolled ? "shadow-[0_12px_28px_-24px_rgba(0,0,0,0.35)]" : ""
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
          <div className="container-lux grid h-16 shrink-0 grid-cols-3 items-center md:h-20">
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
            <div className="hidden md:block -mr-2">
              <IconButton label="جستجو" onClick={() => setSearchOpen(true)}>
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
              <IconButton label="جستجو" onClick={() => setSearchOpen(true)}>
                <SearchIcon className="h-5 w-5" />
              </IconButton>
            </div>
            <div className="hidden sm:block">
              <IconButton label="علاقه‌مندی‌ها" href="/account/wishlist">
                <HeartIcon className="h-5 w-5" />
              </IconButton>
            </div>
            <div className="hidden sm:block">
              <IconButton label="حساب کاربری" href={accountHref}>
                <UserIcon className="h-5 w-5" />
              </IconButton>
            </div>
            <IconButton
              label="سبد خرید"
              badge={cart.count > 0 ? faDigits(cart.count) : undefined}
              className="-ml-2"
              onClick={() => cart.setOpen(true)}
            >
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
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="nav-link text-[13px] font-medium text-ink transition-colors duration-300 ease-out hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* کشوی جستجو */}
      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* کشوی موبایل */}
      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}

// فهرستِ «امکانات» در بخشِ تیرهٔ منوی موبایل (مثل My Account / Wishlist مرجع)
const DRAWER_ACCOUNT_LINKS = [
  { label: "حساب کاربری", href: "/account", icon: UserIcon },
  { label: "علاقه‌مندی‌ها", href: "/account/wishlist", icon: HeartIcon },
  { label: "یافتن شعبه", href: "/stores", icon: MapPinIcon },
  { label: "تماس با ما", href: "/contact", icon: PhoneIcon },
] as const;

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      {/* پنلِ تمام‌صفحه — از سمت راست سُر می‌خورد */}
      <aside
        className={`fixed inset-0 z-50 flex w-full flex-col overflow-y-auto bg-background transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* سرتیتر — نام برند وسط، دکمهٔ بستن */}
        <div className="relative flex h-16 shrink-0 items-center justify-center border-b border-line px-5">
          <span className="text-lg font-semibold text-ink">{SITE.name}</span>
          <button
            type="button"
            aria-label="بستن منو"
            onClick={onClose}
            className="absolute left-4 grid h-9 w-9 place-items-center text-ink"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>

        {/* نرخ طلا — بدونِ تغییر */}
        <div className="shrink-0 border-b border-line bg-surface px-5 py-3">
          <GoldTicker />
        </div>

        {/* لینک‌های اصلی — روی سفید، با فلش و خطِ جداکننده */}
        <nav className="shrink-0 px-5">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between py-4 text-[15px] font-medium tracking-wide text-ink transition-colors duration-300 ease-out hover:text-accent-dark"
                >
                  {link.label}
                  <ChevronLeftIcon className="h-4 w-4 text-muted transition-colors duration-300 group-hover:text-accent-dark" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* بخشِ تیره — امکانات (حساب کاربری، علاقه‌مندی‌ها، …) و زبان و شبکه‌ها */}
        <div className="flex flex-1 flex-col bg-ink text-white">
          <ul className="flex flex-col px-5 py-3">
            {DRAWER_ACCOUNT_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-3.5 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 ease-out hover:text-accent-light"
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* زبان */}
          <div className="border-t border-white/10 px-5 py-5">
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/40">
              زبان
            </span>
            <div className="mt-2 flex items-center justify-between border-b border-white/25 pb-2">
              <span className="text-sm font-medium text-white">فارسی</span>
            </div>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div className="mt-auto border-t border-white/10 px-5 py-5">
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white transition-colors duration-300 ease-out hover:border-accent-light hover:text-accent-light"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
