import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealInit from "@/components/ui/RevealInit";
import ProductsHero from "@/components/products/ProductsHero";
import { DiscoverLink } from "@/components/ui/SectionHeading";
import {
  PhoneIcon,
  MailIcon,
  CalendarIcon,
  StoreIcon,
  UserIcon,
  InfoIcon,
  HeartIcon,
  SOCIAL_ICONS,
} from "@/components/ui/icons";
import { CONTACT_PAGE, STORES, SOCIAL_LINKS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "تماس با ما",
  description: CONTACT_PAGE.hero.description,
};

// نگاشتِ آیکونِ کارت‌ها (داده در site-data فقط نامِ آیکون را نگه می‌دارد)
const CARD_ICONS = {
  calendar: CalendarIcon,
  store: StoreIcon,
  care: UserIcon,
  faq: InfoIcon,
} as const;

const c = CONTACT_PAGE;

/** سلولِ شبکه — قابِ موییِ هم‌بسته با border-e/border-b */
function Cell({ children }: { children: React.ReactNode }) {
  return (
    <div className="fx-reveal border-e border-b border-line p-7 md:p-9">{children}</div>
  );
}

/** سرتیترِ کارت — آیکون + عنوان */
function CardHead({
  Icon,
  title,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2.5 text-ink">
      <Icon className="h-[18px] w-[18px] shrink-0" />
      <h3 className="text-[13px] font-semibold tracking-[0.04em]">{title}</h3>
    </div>
  );
}

// لینکِ بیرونی (mailto / tel) با ظاهرِ یکسانِ DiscoverLink
const EXT_LINK =
  "link-underline text-[13px] font-medium text-ink transition-colors duration-300 hover:text-[#9e9100]";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-background">
        <ProductsHero data={c.hero} crumbLabel="تماس با ما" />

        <section className="container-lux py-12 md:py-[60px]">
          {/* خطِ معرفی + لینکِ پرسش‌های متداول */}
          <p className="fx-reveal max-w-3xl text-[15px] leading-8 text-muted">
            {c.introLead}
            <Link
              href={c.faqHref}
              className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent-dark hover:decoration-accent-dark"
            >
              {c.introFaqLabel}
            </Link>
            {c.introTail}
          </p>

          {/* شبکهٔ روش‌های ارتباط — ۲ ستونه با خطوطِ مویی */}
          <h2 className="sr-only">روش‌های ارتباط با گنج‌ریز</h2>
          <div className="mt-6 grid grid-cols-1 border-s border-t border-line md:grid-cols-2">
            {/* ۱) تماسِ تلفنی */}
            <Cell>
              <CardHead Icon={PhoneIcon} title={c.callTitle} />
              <p className="mt-4 text-[14px] leading-7 text-muted">{c.callHoursLabel}</p>
              <ul className="mt-1 space-y-1 text-[14px] leading-7 text-muted">
                {c.callHours.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <ul className="mt-4 space-y-2">
                {STORES.map((s) => (
                  <li key={s.id} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <span className="text-[13px] text-muted">{s.name}</span>
                    <a href={`tel:${s.phoneLink}`} dir="ltr" className={EXT_LINK}>
                      {s.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </Cell>

            {/* ۲) ایمیل */}
            <Cell>
              <CardHead Icon={MailIcon} title={c.emailTitle} />
              <p className="mt-4 text-[14px] leading-7 text-muted">{c.emailBody}</p>
              <div className="mt-4">
                <a href={`mailto:${c.email}`} className={EXT_LINK}>
                  {c.emailCta}
                </a>
              </div>
            </Cell>

            {/* ۳ تا ۶) رزرو وقت، شعبه‌ها، خدمات پس از فروش، سوالات متداول */}
            {c.cards.map((card) => {
              const Icon = CARD_ICONS[card.icon];
              return (
                <Cell key={card.title}>
                  <CardHead Icon={Icon} title={card.title} />
                  <p className="mt-4 text-[14px] leading-7 text-muted">{card.body}</p>
                  <div className="mt-4">
                    <DiscoverLink href={card.href}>{card.ctaLabel}</DiscoverLink>
                  </div>
                </Cell>
              );
            })}
          </div>

          {/* نوارِ شبکه‌های اجتماعی */}
          <div className="fx-reveal mt-10 flex flex-col items-center justify-center gap-4 border border-line px-6 py-6 sm:flex-row sm:gap-7 md:mt-12">
            <p className="flex items-center gap-2.5 text-[13px] font-semibold tracking-[0.04em] text-ink">
              <HeartIcon className="h-4 w-4 text-accent-dark" aria-hidden />
              {c.socialTitle}
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => {
                const Icon = SOCIAL_ICONS[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors duration-300 ease-out hover:border-accent-dark hover:text-accent-dark"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer breadcrumb={[{ label: "خانه", href: "/" }, { label: "تماس با ما" }]} />
      <RevealInit />
    </>
  );
}
