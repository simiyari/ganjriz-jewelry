import Image from "next/image";
import { asset } from "@/lib/asset";
import type { DiagramName } from "@/lib/content-pages";

/**
 * تصویرِ راهنمای سایز — جای‌نگه‌دار از پوشهٔ public/size-guide/.
 * فعلاً عکسِ موقت است؛ کافی است فایلِ هم‌نام را در public/size-guide/ جایگزین کنید
 * (ring-finger.jpg، ring-existing.jpg، bracelet-measure.jpg، necklace-length.jpg).
 */
const ALT: Record<DiagramName, string> = {
  "ring-finger": "اندازه‌گیریِ دورِ انگشت با نخ",
  "ring-existing": "اندازه‌گیریِ قطرِ داخلیِ انگشترِ موجود",
  "bracelet-measure": "اندازه‌گیریِ دورِ مچ",
  "necklace-length": "راهنمای طولِ گردنبند",
};

export default function SizeDiagram({ name }: { name: DiagramName }) {
  return (
    <figure className="relative aspect-[5/2] w-full overflow-hidden bg-surface md:w-1/2">
      <Image
        src={asset(`/size-guide/${name}.jpg`)}
        alt={ALT[name]}
        fill
        sizes="(max-width:1024px) 100vw, 450px"
        className="object-cover"
      />
    </figure>
  );
}
