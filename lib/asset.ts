// پیشوند زیرمسیر (basePath) برای دارایی‌های محلی مثل عکس‌های پوشهٔ public.
// در production روی GitHub Pages برابر "/ganjriz-jewelry" و در dev خالی است.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * مسیر یک دارایی محلی را با basePath پیشوند می‌زند تا روی GitHub Pages هم
 * درست بارگذاری شود. URLهای کامل (http/https) و data: دست‌نخورده می‌مانند.
 *
 * چرا لازم است؟ next/image با `unoptimized: true` در خروجی استاتیک،
 * basePath را به‌صورت خودکار به src عکس‌های محلی اضافه نمی‌کند.
 */
export function asset(path: string): string {
  if (!path || /^(https?:)?\/\//.test(path) || path.startsWith("data:")) {
    return path;
  }
  return `${BASE_PATH}${path}`;
}
