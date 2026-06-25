"use client";

import Image from "next/image";
import { useCallback, useState, type MouseEvent } from "react";
import { asset } from "@/lib/asset";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

/**
 * گالریِ تصویرِ کارتِ محصول — جابه‌جاییِ نرمِ تصاویر با فلشِ چپ/راست.
 * یک تراکِ سادهٔ translateX با ترنزیشنِ CSS (بدونِ کتابخانه و بدونِ درگ، طبق خواستهٔ
 * کاربر) تا رفتار کاملاً یکدست و قابلِ‌کنترل باشد و عکس همیشه با نوارِ پیشرفت هم‌گام بماند.
 * RTL: فلشِ راست = قبلی، فلشِ چپ = بعدی؛ translateX مثبت یعنی رفتن به تصویرِ بعدی.
 */
export default function CardGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const n = images.length;
  const hasGallery = n > 1;
  const [index, setIndex] = useState(0);

  // جابه‌جایی بدونِ بازشدنِ لینکِ کارت (دکمه درونِ <Link> است)، با چرخش (wrap)
  const go = useCallback(
    (e: MouseEvent, dir: 1 | -1) => {
      e.preventDefault();
      e.stopPropagation();
      setIndex((i) => (i + dir + n) % n);
    },
    [n]
  );

  const sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

  // تک‌تصویری: بدونِ تراک/فلش
  if (!hasGallery) {
    return (
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={asset(images[0])}
          alt={alt}
          fill
          sizes={sizes}
          draggable={false}
          className="img-zoom object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-square overflow-hidden bg-surface">
      {/* تراکِ افقیِ تصاویر — با translateX به‌اندازهٔ index و ترنزیشنِ نرم اسلاید می‌شود */}
      <div
        className="flex h-full transition-transform duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{ transform: `translateX(${index * 100}%)` }}
      >
        {images.map((src, i) => (
          // overflow-hidden روی هر اسلاید تا zoomِ هاورِ اسلایدِ کناری از لبه بیرون نزند
          <div
            key={i}
            className="relative h-full w-full shrink-0 overflow-hidden"
          >
            <Image
              src={asset(src)}
              alt={alt}
              fill
              sizes={sizes}
              draggable={false}
              className="img-zoom object-cover"
            />
          </div>
        ))}
      </div>

      {/* فلش‌ها — دکمه «هدفِ لمسیِ ثابت» است: ۴۴px (h-11 w-11)، همیشه درونِ کادر و
          بدونِ ترنزفورم، تا الزامِ اندازهٔ تارگتِ a11y (حداقل ۲۴×۲۴) پاس بماند و کلیپ نشود.
          خودِ حرکتِ نرم روی آیکونِ داخل است: از بیرونِ لبه (translateX ۴۰px) با همان منحنیِ
          easeOutExpo به جای خود سُر می‌خورد و با overflow-hidden کادر کلیپ می‌شود — فقط
          transform (بدونِ opacity) تا کاملاً روان و بی‌تیک‌تیک بماند، مثلِ قبل.
          در حالتِ عادی pointer-events-none؛ روی هاورِ کارت فعال می‌شود.
          در RTL: راست=قبلی، چپ=بعدی. */}
      <button
        type="button"
        aria-label="تصویرِ قبلی"
        onClick={(e) => go(e, -1)}
        className="absolute start-2 inset-y-0 my-auto z-10 grid h-11 w-11 place-items-center text-ink pointer-events-none group-hover:pointer-events-auto"
      >
        <ChevronRightIcon className="h-5 w-5 translate-x-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
      </button>
      <button
        type="button"
        aria-label="تصویرِ بعدی"
        onClick={(e) => go(e, 1)}
        className="absolute end-2 inset-y-0 my-auto z-10 grid h-11 w-11 place-items-center text-ink pointer-events-none group-hover:pointer-events-auto"
      >
        <ChevronLeftIcon className="h-5 w-5 -translate-x-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
      </button>

      {/* نوارِ پیشرفت — تنها بخشِ فعال (۲px مشکیِ #131313) که نرم و هم‌زمان با اسلایدِ
          عکس بینِ جای‌گاهِ تصاویر سُر می‌خورد (نه پرشِ ناگهانی). بقیه نامرئی. روی درزِ
          پایینِ عکس، چسبیده به بالای کادر. فقط روی هاور. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span
          className="absolute bottom-0 h-[2px] bg-ink transition-[right] duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
          style={{ width: `${100 / n}%`, right: `${index * (100 / n)}%` }}
        />
      </div>
    </div>
  );
}
