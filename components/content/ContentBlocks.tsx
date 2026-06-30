import Image from "next/image";
import SizeDiagram from "./SizeDiagram";
import PrintButton from "./PrintButton";
import { asset } from "@/lib/asset";
import type { ContentBlock, SectionImage, SectionTable } from "@/lib/content-pages";

const faNum = (n: number) => n.toLocaleString("fa-IR");

/**
 * سیستمِ فاصلهٔ یکدستِ صفحاتِ محتوا (هم‌سو با CustomerServiceHub):
 *   متن/لیست = mt-2.5 (۱۰px) — با ~۶px هوای leading-8 بصری ~۱۶px می‌شود
 *   عکس/دیاگرام/جدول/دکمه = mt-4 (۱۶px کاملِ باکس، چون هوای leading ندارند)
 *   بین‌بلوک = ۳۲ (mt-8) · فوتر = ۴۸ (mt-12)
 * تایپ: تیترِ آیتم ۱۶-سمی‌بولد · زیرعنوان ۱۵-سمی‌بولد · متن ۱۵/leading-8
 */

/** گریدِ تصویرِ یک سکشن — یک/دو/سه‌تایی (سه‌تایی: دوتا بالا، یکی پهنِ پایین). بدونِ مارجین؛ فاصله را والد می‌دهد. */
export function SectionImages({ images }: { images: SectionImage[] }) {
  if (images.length === 1) {
    const img = images[0];
    // تک‌عکس = نصفِ عرضِ ستون در دسکتاپ (موبایل تمام‌عرض تا کوچک نشود)
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface md:w-1/2">
        <Image src={asset(img.src)} alt={img.alt} fill sizes="(max-width:1024px) 100vw, 450px" className="object-cover" />
      </div>
    );
  }
  if (images.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {images.map((img, i) => (
          <div key={i} className={`relative overflow-hidden bg-surface ${i === 2 ? "col-span-2 aspect-[16/7]" : "aspect-[4/3]"}`}>
            <Image src={asset(img.src)} alt={img.alt} fill sizes="(max-width:1024px) 50vw, 450px" className="object-cover" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {images.map((img, i) => (
        <div key={i} className="relative aspect-[4/3] overflow-hidden bg-surface">
          <Image src={asset(img.src)} alt={img.alt} fill sizes="(max-width:1024px) 50vw, 450px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

/** جدولِ داده (مثلِ جدولِ سایز) — RTL، سرستونِ روشن. بدونِ مارجین؛ فاصله را والد می‌دهد. */
export function SectionTableView({ table }: { table: SectionTable }) {
  return (
    <div>
      {table.caption && <p className="mb-3 text-[15px] leading-8 text-muted">{table.caption}</p>}
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[420px] border-collapse text-[14px]">
          <thead>
            <tr className="bg-surface">
              {table.columns.map((c) => (
                <th key={c} scope="col" className="border-b border-line px-4 py-3 text-start font-semibold text-ink">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className={`px-4 py-3 text-start ${j === 0 ? "font-medium text-ink" : "text-muted"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * یک بلوکِ محتوا داخلِ آکاردئونِ راهنمای سایز.
 * بین‌بلوک = ۳۲px (mt-8)؛ درونِ بلوک همهٔ عناصر با ۱۶px (space-y-4) فاصله می‌گیرند.
 */
export function ContentBlockView({ block, first }: { block: ContentBlock; first?: boolean }) {
  return (
    <div className={first ? "" : "mt-8"}>
      {block.heading && (
        <h4 className="text-[15px] font-semibold leading-snug text-ink">{block.heading}</h4>
      )}

      {block.paragraphs?.map((p, j) => (
        <p key={j} className="mt-2.5 text-[15px] leading-8 text-muted">
          {p}
        </p>
      ))}

      {block.diagram && (
        <div className="mt-4">
          <SizeDiagram name={block.diagram} />
        </div>
      )}

      {block.steps && (
        <ol className="mt-2.5 space-y-2.5">
          {block.steps.map((s, j) => (
            <li key={j} className="relative ps-7 text-[15px] leading-8 text-muted">
              <span className="absolute start-0 top-0 font-medium text-ink">{faNum(j + 1)}.</span>
              {s}
            </li>
          ))}
        </ol>
      )}

      {block.bullets && (
        <ul className="mt-2.5 space-y-2.5">
          {block.bullets.map((b, j) => (
            <li key={j} className="relative ps-5 text-[15px] leading-8 text-muted">
              <span aria-hidden className="absolute start-0 top-[14px] h-1.5 w-1.5 rounded-full bg-gold" />
              {b}
            </li>
          ))}
        </ul>
      )}

      {block.images && block.images.length > 0 && (
        <div className="mt-4">
          <SectionImages images={block.images} />
        </div>
      )}
      {block.table && (
        <div className="mt-4">
          <SectionTableView table={block.table} />
        </div>
      )}
      {block.button && (
        <div className="mt-4">
          <PrintButton label={block.button.label} href={block.button.href} />
        </div>
      )}
    </div>
  );
}
