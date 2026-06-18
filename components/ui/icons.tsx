import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20.5C5.5 16.5 3 12.5 3 8.8 3 6.1 5 4 7.6 4c1.7 0 3.2.9 4.4 2.4C13.2 4.9 14.7 4 16.4 4 19 4 21 6.1 21 8.8c0 3.7-2.5 7.7-9 11.7Z" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.4-3.6 4.4-5.5 8-5.5s6.6 1.9 8 5.5" />
    </svg>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 8h12l-.9 11.2a1.6 1.6 0 0 1-1.6 1.5H8.5a1.6 1.6 0 0 1-1.6-1.5L6 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function TrendUpIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 16.5 10 10l3.5 3.5L20 7" />
      <path d="M15 7h5v5" />
    </svg>
  );
}

export function TrendDownIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7.5 10 14l3.5-3.5L20 17" />
      <path d="M15 17h5v-5" />
    </svg>
  );
}

/** فلش — در RTL به‌صورت پیش‌فرض رو به چپ (ادامه) */
export function ArrowIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M19 12H5" />
      <path d="m12 5-7 7 7 7" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21 4 3 11l5 2 2 6 3-4 5 4 3-15Z" />
      <path d="m8 13 8-5-5 7" />
    </svg>
  );
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Z" />
      <path d="M9 9c0 4 2 6 6 6" />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsappIcon,
} as const;
