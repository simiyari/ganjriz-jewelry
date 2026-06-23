import Image from "next/image";
import Link from "next/link";
import { FEATURE_DUO } from "@/lib/site-data";
import { DiscoverCue, Eyebrow } from "@/components/ui/SectionHeading";
import { asset } from "@/lib/asset";

export default function FeatureDuo() {
  return (
    <section className="container-lux pt-4 pb-8 md:pt-8 md:pb-[60px]">
      <div className="grid gap-3 md:grid-cols-2">
        {FEATURE_DUO.map((item, i) => {
          // در RTL، آیتمِ اولِ DOM سمتِ راست می‌نشیند. کاربر می‌خواهد پنلِ چپ
          // («۱» سرویس کامل) اول بیاید و پنلِ راست («۲» شعلهٔ طلایی) ۱ تا ۱.۵ پلهٔ
          // اسکرول بعدتر — کاملاً وابسته به اسکرول، نه تایمر. پس پایهٔ هر پنل با
          // «استپ» تعیین می‌شود: چپ پایه‌اش ۰ و راست پایه‌اش ۱. درونِ هر پنل هم
          // تیتر یک استپ زودتر از متن می‌آید (دو-مرحله‌ایِ آشنا).
          const baseStep = FEATURE_DUO.length - 1 - i; // چپ=۰، راست=۱
          return (
          <Link
            key={item.title}
            href={item.href}
            className="group relative block aspect-square overflow-hidden bg-surface"
          >
            <Image
              src={asset(item.image)}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="img-zoom object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* نوشته‌ها جدا از عکس و دو-مرحله‌ای می‌آیند: اول عکس، سپس با اسکرول
                ای‌برو + تیتر (مرحلهٔ ۱)، و کمی بعد متن + دکمه (مرحلهٔ ۲). */}
            <div
              className={`absolute inset-x-0 bottom-0 flex flex-col items-center p-7 text-center text-white md:p-9`}
            >
              <div
                className="fx-reveal flex w-full flex-col items-center"
                data-reveal-step={baseStep}
              >
                <Eyebrow onDark>{item.eyebrow}</Eyebrow>
                <h3 className="text-2xl font-semibold md:text-[30px]">{item.title}</h3>
              </div>
              <div
                data-reveal-step={baseStep + 1}
                className="fx-reveal flex w-full flex-col items-center"
              >
                <p className="mt-4 max-w-xs text-[15px] leading-8 text-white/85">{item.description}</p>
                <div className="mt-7">
                  <DiscoverCue tone="white">کشف کنید</DiscoverCue>
                </div>
              </div>
            </div>
          </Link>
          );
        })}
      </div>
    </section>
  );
}
