/** تبدیل عدد به رشتهٔ فارسی با جداکنندهٔ هزارگان */
export function faNumber(value: number): string {
  return value.toLocaleString("fa-IR");
}

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** فقط ارقامِ لاتینِ یک رشته را فارسی می‌کند (سایر نویسه‌ها مثل «/» و «.» دست‌نخورده) */
export function faDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => FA_DIGITS[+d]);
}

/** نمایش مبلغ ریالی به تومان فارسی (DB ریال است، نمایش تومان) */
export function toToman(rial: number): string {
  return faNumber(Math.round(rial / 10));
}
