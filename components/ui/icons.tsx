/**
 * آیکون‌های سایت — همگی از Phosphor Icons (phosphoricons.com) برای یک‌دستیِ کامل.
 * از مسیرِ `/ssr` وارد می‌شوند تا در Server Components هم بدونِ مرزِ client کار کنند.
 * وزنِ پیش‌فرضِ Phosphor «regular» است (خطِ تمیز و ظریف، هماهنگ با حسِ مینیمالِ برند)؛
 * برای حالتِ پُر (مثلِ قلبِ علاقه‌مندی) از prop‌ِ `weight="fill"` استفاده کنید.
 *
 * ⚠️ هر آیکونِ تازه در سایت هم باید از همین‌جا و از Phosphor بیاید تا یک‌دست بماند.
 * نام‌های ما به نامِ Phosphor نگاشت شده‌اند؛ تغییرِ نگاشت فقط همین‌جا انجام می‌شود.
 */
import {
  MagnifyingGlassIcon as PhSearch,
  HeartIcon as PhHeart,
  UserIcon as PhUser,
  HandbagIcon as PhBag,
  ListIcon as PhMenu,
  XIcon as PhClose,
  MapPinIcon as PhMapPin,
  TrendUpIcon as PhTrendUp,
  TrendDownIcon as PhTrendDown,
  ArrowLeftIcon as PhArrow,
  CaretLeftIcon as PhCaretLeft,
  CaretRightIcon as PhCaretRight,
  CaretDownIcon as PhCaretDown,
  PhoneIcon as PhPhone,
  CalendarBlankIcon as PhCalendar,
  EyeIcon as PhEye,
  EyeSlashIcon as PhEyeSlash,
  EnvelopeSimpleIcon as PhMail,
  FileTextIcon as PhDocument,
  InfoIcon as PhInfo,
  FadersHorizontalIcon as PhFilter,
  SquaresFourIcon as PhGridTwo,
  SquareIcon as PhGridOne,
  GridFourIcon as PhGridFour,
  CheckIcon as PhCheck,
  InstagramLogoIcon as PhInstagram,
  TelegramLogoIcon as PhTelegram,
  WhatsappLogoIcon as PhWhatsapp,
} from "@phosphor-icons/react/ssr";

// ── هدر / ناوبری ──
export const SearchIcon = PhSearch;
export const HeartIcon = PhHeart;
export const UserIcon = PhUser;
export const BagIcon = PhBag;
export const MenuIcon = PhMenu;
export const CloseIcon = PhClose;

// ── عمومی ──
export const MapPinIcon = PhMapPin;
export const TrendUpIcon = PhTrendUp;
export const TrendDownIcon = PhTrendDown;
export const ArrowIcon = PhArrow; // RTL: رو به چپ = ادامه
export const ChevronLeftIcon = PhCaretLeft;
export const ChevronRightIcon = PhCaretRight;
export const ChevronDownIcon = PhCaretDown;
export const PhoneIcon = PhPhone;
export const CalendarIcon = PhCalendar;
export const EyeIcon = PhEye;
export const EyeSlashIcon = PhEyeSlash;
export const MailIcon = PhMail;
export const DocumentIcon = PhDocument;
export const InfoIcon = PhInfo;

// ── صفحهٔ محصولات ──
export const FilterIcon = PhFilter;
export const GridTwoIcon = PhGridTwo;
export const GridOneIcon = PhGridOne;
// GridFour = مربعِ تقسیم‌شده به ۴ خانه؛ هم‌اندازهٔ SquareIcon (هر دو ۱۹۲ از ۲۵۶)
// تا در سوییچِ صفحهٔ مجموعه‌ها دو آیکون دقیقاً یک‌سایز دیده شوند.
export const GridFourIcon = PhGridFour;
export const CheckIcon = PhCheck;

// ── شبکه‌های اجتماعی ──
export const InstagramIcon = PhInstagram;
export const TelegramIcon = PhTelegram;
export const WhatsappIcon = PhWhatsapp;

export const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsappIcon,
} as const;
