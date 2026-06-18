# GANJRIZ JEWELRY (گنج‌ریز) — راهنمای پروژه برای Claude Code

## معرفی پروژه

فروشگاه آنلاین طلا و جواهر «گنج‌ریز» (Ganjriz Jewelry) — فارسی‌زبان با قیمت‌گذاری لحظه‌ای بر اساس نرخ روز طلا.
کاربران محصولات را می‌بینند، به سبد اضافه می‌کنند و سفارش/پرداخت آنلاین انجام می‌دهند.
قیمت هر محصول به‌صورت خودکار از نرخ لحظه‌ای طلا + اجرت + سود محاسبه می‌شود.

### ویژگی‌های کلیدی
- نمایش محصولات با دسته‌بندی (انگشتر، گردنبند، دستبند، گوشواره، سکه)
- قیمت‌گذاری پویا بر اساس نرخ لحظه‌ای طلا
- نمایش نرخ روز طلا در هدر (آپدیت خودکار)
- سبد خرید و سفارش آنلاین
- پرداخت با درگاه ایرانی (زیبال)
- پنل کاربری (سفارش‌ها، علاقه‌مندی‌ها)
- پنل مدیریت (محصولات، سفارش‌ها، تنظیم اجرت/سود)

---

## استک فنی

| لایه | ابزار | نسخه |
|------|-------|-------|
| Framework | Next.js (App Router) + Turbopack | 16.2.x |
| Language | TypeScript | strict mode |
| Styling | Tailwind CSS + shadcn/ui | latest |
| Database | PostgreSQL + Drizzle ORM | latest |
| Auth | Better Auth | latest |
| Payment | زیبال (Zibal) | REST API |
| SMS / OTP | کاوه‌نگار یا ملی‌پیامک | REST API |
| نرخ طلا | BrsApi.ir یا nerkh.io | REST API |
| File Upload | Uploadthing | latest |
| Calendar | jalaali-js | latest |
| Deploy | لیارا (Liara) | — |

### چرا این استک؟
- **Next.js 16.2**: جدیدترین stable، Turbopack پیش‌فرض
- **Drizzle ORM**: با AI coding tools بهتر کار می‌کنه، TypeScript-native
- **Better Auth**: بدون vendor lock-in، داده در DB خودت
- **زیبال**: بهترین درگاه ایرانی برای استارتاپ‌ها
- **لیارا**: سرور داخل ایران، بدون قطعی اینترنت بین‌الملل
- **BrsApi.ir**: نرخ لحظه‌ای طلا رایگان تا ۱۵۰۰ درخواست روزانه، JSON استاندارد

---

## هویت بصری

### فلسفه طراحی
**روشن، مینیمال، لوکس** — سفید خالص با لهجه طلایی. حس یک بوتیک جواهر مدرن،
نه یک فروشگاه شلوغ. تصویرمحور، با تایپوگرافی ظریف و فضای تنفس زیاد.

### پالت رنگی
```css
--background: #FFFFFF;       /* پس‌زمینه اصلی — سفید خالص */
--surface: #FAF9F6;          /* سطوح ثانویه — سفید صدفی */
--surface-alt: #F2EFE9;      /* کارت‌ها و بخش‌بندی */
--text-primary: #1A1A1A;     /* متن اصلی — مشکی نرم */
--text-secondary: #6B6B6B;   /* متن فرعی */
--text-muted: #A8A8A8;       /* متن کم‌رنگ */
--gold: #C9A227;             /* طلایی اصلی — accent */
--gold-light: #E5C766;       /* طلایی روشن — hover */
--gold-dark: #9C7C1E;        /* طلایی تیره — متن روی طلایی */
--border: #ECE9E2;           /* خطوط جداکننده */
--success: #2D7D46;          /* سبز — قیمت/موجودی */
--danger: #C0392B;           /* قرمز — کاهش قیمت/ناموجود */
```

### تایپوگرافی
```css
--font-display: 'IRANYekan', 'Yekan Bakh', sans-serif;  /* تیترها */
--font-body: 'Vazirmatn', sans-serif;                   /* متن بدنه */
--font-mono: 'JetBrains Mono', monospace;               /* قیمت‌ها و اعداد */
```

### اصول بصری
- **RTL کامل** — `dir="rtl"` روی تمام صفحات
- تصاویر محصول مربعی، با پس‌زمینه روشن یکدست
- خطوط باریک طلایی برای جداسازی، نه shadow سنگین
- قیمت‌ها با فونت mono و رنگ طلایی تیره برجسته بشن
- نرخ روز طلا همیشه در هدر دیده بشه (با آیکون روند صعودی/نزولی)
- hover روی محصول: zoom ظریف تصویر + نمایش دکمه «افزودن به سبد»
- Motion حداقلی و ظریف

---

## ساختار پروژه

```
gold-shop/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (main)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # صفحه اصلی
│   │   ├── products/
│   │   │   ├── page.tsx                # لیست محصولات
│   │   │   └── [slug]/page.tsx         # صفحه محصول
│   │   ├── category/[cat]/page.tsx     # محصولات یک دسته
│   │   ├── cart/page.tsx               # سبد خرید
│   │   ├── checkout/page.tsx           # تسویه حساب
│   │   └── about/page.tsx              # درباره ما
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── page.tsx                # داشبورد کاربر
│   │       ├── orders/page.tsx         # سفارش‌های من
│   │       ├── favorites/page.tsx      # علاقه‌مندی‌ها
│   │       └── profile/page.tsx        # پروفایل
│   ├── (admin)/
│   │   └── admin/
│   │       ├── page.tsx                # داشبورد ادمین
│   │       ├── products/               # مدیریت محصولات
│   │       ├── orders/                 # مدیریت سفارش‌ها
│   │       └── settings/               # تنظیم اجرت و سود
│   └── api/
│       ├── auth/[...all]/route.ts      # Better Auth
│       ├── gold-price/route.ts         # دریافت و cache نرخ طلا
│       ├── payment/
│       │   ├── request/route.ts        # درخواست پرداخت زیبال
│       │   └── verify/route.ts         # تأیید پرداخت
│       └── upload/route.ts             # Uploadthing
├── components/
│   ├── ui/                             # shadcn/ui
│   ├── layout/
│   │   ├── header.tsx                  # هدر + نمایش نرخ طلا
│   │   ├── footer.tsx
│   │   └── gold-ticker.tsx             # نوار نرخ لحظه‌ای طلا
│   ├── products/
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── product-filter.tsx
│   │   └── add-to-cart.tsx
│   ├── cart/
│   │   ├── cart-item.tsx
│   │   └── cart-summary.tsx
│   └── shared/
│       ├── price-display.tsx           # نمایش قیمت تومانی
│       └── persian-date.tsx            # تاریخ شمسی
├── lib/
│   ├── db/
│   │   ├── index.ts                    # Drizzle client
│   │   └── schema.ts                   # جداول
│   ├── auth.ts                         # Better Auth config
│   ├── zibal.ts                        # پرداخت زیبال
│   ├── sms.ts                          # SMS
│   ├── gold-price.ts                   # دریافت نرخ طلا + cache
│   └── pricing.ts                      # محاسبه قیمت محصول
├── drizzle/migrations/
└── public/fonts/                       # فونت‌های local
```

---

## منطق قیمت‌گذاری (مهم‌ترین بخش)

قیمت هر محصول طلا به‌صورت پویا محاسبه می‌شود:

```
قیمت نهایی = (وزن × نرخ هر گرم طلا) + اجرت + سود فروشنده + مالیات

اجزا:
- وزن (gram): وزن طلای محصول
- نرخ هر گرم: از API لحظه‌ای (طلای ۱۸ عیار)
- اجرت (wage): درصد یا مبلغ ثابت — بابت ساخت
- سود (profit): درصد سود فروشنده
- مالیات (tax): ۹٪ مالیات بر ارزش افزوده روی اجرت+سود
```

```typescript
// lib/pricing.ts
export function calculatePrice(params: {
  weight: number          // گرم
  goldPricePerGram: number // ریال — از API
  wagePercent: number     // درصد اجرت
  profitPercent: number   // درصد سود
}): {
  goldValue: number
  wage: number
  profit: number
  tax: number
  total: number
} {}
```

### دریافت نرخ طلا
```typescript
// lib/gold-price.ts
// نرخ را از BrsApi.ir می‌گیرد و در DB/memory برای ۵ دقیقه cache می‌کند
// تا از مصرف بیش از حد سهمیه API جلوگیری شود

const GOLD_API = 'https://Api.BrsApi.ir/Market/Gold_Currency.php'

export async function getGoldPrice(): Promise<{
  pricePerGram18k: number  // ریال
  updatedAt: Date
  trend: 'up' | 'down' | 'stable'
}> {}
```

**نکته:** نرخ طلا را هرگز در هر request مستقیم از API نگیر — cache کن (۵ دقیقه).
API را فقط از سمت server صدا بزن، هرگز client-side (تا key لو نره).

---

## مدل داده (Drizzle Schema)

```typescript
// ── users ── (Better Auth)
// id, name, email, phone, role, createdAt
// role: 'customer' | 'admin'

// ── products ──
// id, title, slug, description
// category: 'ring' | 'necklace' | 'bracelet' | 'earring' | 'coin'
// weight: number              وزن به گرم
// karat: number               عیار (18, 24)
// wagePercent: number         درصد اجرت
// profitPercent: number       درصد سود
// images: string[]
// stock: number               موجودی
// isAvailable: boolean
// isFeatured: boolean
// tags: string[]
// (قیمت ذخیره نمی‌شود — لحظه‌ای محاسبه می‌شود)

// ── orders ──
// id, userId, status
// status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
// totalAmount: number         ریال — قیمت قطعی‌شده هنگام خرید
// goldPriceSnapshot: number   نرخ طلا در لحظه خرید (مهم!)
// shippingAddress: json
// createdAt, paidAt

// ── order_items ──
// id, orderId, productId
// quantity, weight, unitPrice (قیمت قطعی‌شده), title (snapshot)

// ── payments ──
// id, orderId, zibalTrackId, amount, status, createdAt, verifiedAt

// ── favorites ──
// id, userId, productId, createdAt

// ── settings ── (تنظیمات سراسری فروشگاه)
// id, defaultWagePercent, defaultProfitPercent, taxPercent
```

**نکته بحرانی:** هنگام ثبت سفارش، نرخ طلای آن لحظه باید snapshot شود
(`goldPriceSnapshot`) تا اگر نرخ بعداً تغییر کرد، قیمت سفارش ثابت بماند.

---

## احراز هویت — Better Auth

```typescript
// lib/auth.ts — OTP موبایل اصلی، ایمیل/رمز ثانویه
// نقش‌ها: customer، admin
```

جریان ورود: موبایل + OTP (SMS) یا ایمیل + رمز.

---

## سیستم پرداخت — زیبال

```
کاربر → checkout → تأیید سبد
  → snapshot نرخ طلا + محاسبه قیمت نهایی
  → POST /api/payment/request → Zibal → trackId
  → redirect به gateway.zibal.ir/start/{trackId}
  → پرداخت کاربر
  → Zibal redirect /api/payment/verify?trackId=xxx
  → verify → order = 'paid' → کسر موجودی → SMS تأیید
```

```typescript
// lib/zibal.ts
const ZIBAL_BASE = 'https://gateway.zibal.ir/v1'
export async function requestPayment(...) {}
export async function verifyPayment(trackId: string) {}
```

---

## صفحات اصلی

| مسیر | عنوان | توضیح |
|------|-------|-------|
| `/` | صفحه اصلی | hero، نرخ طلا، محصولات ویژه، دسته‌بندی‌ها |
| `/products` | محصولات | فیلتر دسته/عیار/قیمت، grid |
| `/products/[slug]` | محصول | تصاویر، وزن، عیار، قیمت لحظه‌ای، افزودن به سبد |
| `/category/[cat]` | دسته | محصولات یک دسته‌بندی |
| `/cart` | سبد خرید | آیتم‌ها، جمع کل، دکمه تسویه |
| `/checkout` | تسویه | آدرس، روش ارسال، پرداخت |
| `/about` | درباره ما | معرفی فروشگاه |
| `/dashboard` | داشبورد | سفارش‌ها، علاقه‌مندی، پروفایل |
| `/login` `/register` | ورود/ثبت‌نام | OTP موبایل |
| `/admin` | پنل مدیریت | فقط admin |

---

## قوانین کدنویسی

### الزامی
- همه فایل‌ها TypeScript strict
- Server Components پیش‌فرض — فقط در صورت نیاز `'use client'`
- همه query‌های DB با Drizzle
- اعداد مالی در DB به **ریال**، نمایش به **تومان** با `toLocaleString('fa-IR')`
- نرخ طلا فقط server-side و cache‌شده
- هیچ API key در client-side
- تاریخ‌ها با `jalaali-js` به شمسی

### نام‌گذاری
```
components/   → PascalCase    (ProductCard.tsx)
functions     → camelCase     (calculatePrice)
db tables     → snake_case    (order_items)
constants     → UPPER_CASE    (GOLD_API_KEY)
routes        → kebab-case    (/products/gold-ring)
```

### Error Handling
- همه Server Actions با try/catch
- پیام خطا به فارسی
- اگر API نرخ طلا در دسترس نبود → نمایش آخرین نرخ cache‌شده + هشدار

---

## نکات خاص ایران

```typescript
// قیمت تومانی
const price = (ri35000000).toLocaleString('fa-IR') // اعداد فارسی

// تاریخ شمسی
import jalaali from 'jalaali-js'

// validate موبایل ایرانی
const isValidPhone = /^09[0-9]{9}$/.test(phone)

// فونت‌ها LOCAL — هیچ CDN خارجی بلاک‌شده
// نرخ طلا از API ایرانی (BrsApi.ir)
```

---

## متغیرهای محیطی (.env)

```env
DATABASE_URL=postgresql://...

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=https://yoursite.ir

ZIBAL_MERCHANT=
ZIBAL_CALLBACK_URL=https://yoursite.ir/api/payment/verify

SMS_API_KEY=
SMS_SENDER=

GOLD_API_KEY=          # از brsapi.ir

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

---

## Deploy — لیارا

```json
// liara.json
{ "platform": "node", "app": "ganjriz-jewelry", "port": 3000 }
```

```bash
npm install -g @liara/cli
liara login
liara deploy
```

---

## اولویت توسعه (UI اول، بعد backend)

### فاز ۱ — UI با داده فیک
1. layout پایه: فونت، رنگ، هدر (با نوار نرخ طلای فیک)، فوتر
2. صفحه اصلی
3. لیست محصولات + فیلتر
4. صفحه محصول (با قیمت محاسبه‌شده فیک)
5. سبد خرید + تسویه (UI فیک)
6. ثبت‌نام/ورود/داشبورد (فیک)

### فاز ۲ — backend
7. دیتابیس + schema
8. API نرخ طلا + cache + منطق قیمت‌گذاری واقعی
9. وصل کردن محصولات واقعی
10. Better Auth + OTP

### فاز ۳ — سفارش و پرداخت
11. سبد خرید واقعی + snapshot نرخ
12. پرداخت زیبال
13. پنل مدیریت

### فاز ۴ — بهینه‌سازی
14. SEO فارسی، بهینه‌سازی تصاویر، تست
