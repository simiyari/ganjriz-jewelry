"use client";

import Link from "next/link";
import { type Product, GOLD_COLORS } from "@/lib/site-data";
import { productGallery } from "@/lib/product-detail";
import { faNumber } from "@/lib/format";
import { HeartIcon } from "@/components/ui/icons";
import GoldColorDot from "@/components/ui/GoldColorDot";
import { useWishlist } from "@/components/wishlist/WishlistContext";
import CardGallery from "./CardGallery";

const BADGE_LABEL: Record<string, string> = {
  new: "جدید",
  bestseller: "پرفروش",
};

export default function ProductCard({
  product,
  basePath = "/products",
  swapImages = true,
}: {
  product: Product;
  /** ریشهٔ مسیرِ صفحهٔ تک‌محصول — «/products» یا «/high-jewelry» */
  basePath?: string;
  /** سواپِ تصاویرِ کارت با فلش/موس. در کاروسل خاموش می‌شود تا فلشِ کارت با فلشِ کاروسل تداخل نکند. */
  swapImages?: boolean;
}) {
  // علاقه‌مندیِ سراسری و ماندگار — قلب همه‌جا همین لیست را می‌خواند و تغییر می‌دهد
  const wishlist = useWishlist();
  const liked = wishlist.has(product.slug);
  const toggleLike = () => wishlist.toggle(product.slug);
  // گالریِ تصاویرِ همین محصول — برای سواپِ نرمِ تصاویر با موس/فلش روی کارت.
  // در کاروسل تک‌تصویری می‌شود (فقط تصویرِ اول) تا فلشِ سواپ حذف شود.
  const gallery = swapImages ? productGallery(product) : [productGallery(product)[0]];

  return (
    <div
      className="group relative flex flex-col"
      // جلوگیری از کشیدنِ نیتیوِ عکس/لینک (ghostِ تصویر زیرِ موس) هنگامِ تلاش برای درگ
      onDragStart={(e) => e.preventDefault()}
    >
      {/* علاقه‌مندی — سمتِ پایانی (چپ در RTL)؛ روی هاور قرمز می‌شود */}
      <button
        type="button"
        aria-label={liked ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
        aria-pressed={liked}
        onClick={toggleLike}
        className={`absolute end-3 top-3 z-20 grid h-8 w-8 place-items-center transition-colors hover:text-danger ${
          liked ? "text-danger" : "text-ink/55"
        }`}
      >
        <HeartIcon weight={liked ? "fill" : "regular"} className="h-5 w-5" />
      </button>

      {/* نشانِ جدید/پرفروش — سمتِ آغازین (راست در RTL) */}
      {product.badge && (
        <span className="absolute start-3 top-3 z-20 bg-white/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] text-ink backdrop-blur-sm">
          {BADGE_LABEL[product.badge]}
        </span>
      )}

      {/* گالریِ تصویرِ کارت — سواپِ نرم با موس/فلش + نوارِ پیشرفت روی درزِ بالای کادر */}
      <Link href={`${basePath}/${product.slug}`} aria-label={product.title} className="block">
        <CardGallery images={gallery} alt={product.title} />
      </Link>

      {/* کادرِ طوسیِ روشن — نوشته‌های محصول؛ فاصلهٔ کناره‌ها و پایین ۲۴px.
          طوسیِ بک‌گراند = f5f5f5 (توکنِ surface) — تنها طوسیِ مجازِ سایت. */}
      <div className="bg-surface px-6 pt-4 pb-6">
        <Link href={`${basePath}/${product.slug}`} className="block">
          <h3 className="text-[13px] font-medium leading-6 text-ink transition-colors duration-300 group-hover:text-gold-dark">
            {product.title}
          </h3>
        </Link>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-[13px] font-semibold tabular-nums text-ink">
            {faNumber(product.price)}
            <span className="mr-1 text-[11px] font-normal text-muted">
              تومان
            </span>
          </span>
          {/* سواچ‌های رنگ — هرکدام لینکی به همان محصول با همان رنگِ طلا.
              روی هاور حلقه تیره می‌شود (آیکونِ hover) و نشانگر دستی است. */}
          <span className="flex items-center gap-1.5">
            {product.colors.map((c) => (
              <Link
                key={c}
                href={`${basePath}/${product.slug}?color=${c}`}
                aria-label={`نمایشِ ${product.title} در ${GOLD_COLORS[c].label}`}
                title={GOLD_COLORS[c].label}
                className="group/swatch block leading-none"
              >
                <GoldColorDot color={c} size={20} hover decorative />
              </Link>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
