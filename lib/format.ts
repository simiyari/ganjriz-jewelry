/** تبدیل عدد به رشتهٔ فارسی با جداکنندهٔ هزارگان */
export function faNumber(value: number): string {
  return value.toLocaleString("fa-IR");
}

/** نمایش مبلغ ریالی به تومان فارسی (DB ریال است، نمایش تومان) */
export function toToman(rial: number): string {
  return faNumber(Math.round(rial / 10));
}
