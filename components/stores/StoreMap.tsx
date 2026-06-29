"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { Map as LeafletMap, Marker } from "leaflet";
import type { Store } from "@/lib/site-data";

/* ──────────────────────────────────────────────
   نقشهٔ شعبه‌ها — Leaflet با کاشی‌های OpenStreetMap (بدون کلید، در دسترسِ شبکهٔ
   داخل ایران). هر شعبه یک پینِ کلیک‌پذیر دارد: سبزِ برند = انتخاب‌شده، تیره = بقیه.

   • زوم فقط با Ctrl/⌘ + چرخِ موس (یا دکمه‌های +/−). بدونِ Ctrl، چرخِ موس نقشه را
     زوم نمی‌کند و فقط صفحه اسکرول می‌شود؛ پس نقشه «ثابت» می‌ماند و نمی‌لرزد.
   • invalidateSize با pan:false تا هنگامِ تغییرِ اندازه (باز/بسته‌شدنِ ستونِ جزئیات)
     نقشه پَن/پَرش نکند.
   • `isolate` روی ریشه: زمینهٔ چیدمانِ مستقل تا z-index‌های بالای Leaflet (کنترل ۱۰۰۰)
     روی هدرِ sticky (z-50) نیفتند.
   leaflet به‌صورتِ پویا (client-only) import می‌شود تا با خروجیِ استاتیک نسازد.
   ────────────────────────────────────────────── */
export default function StoreMap({
  stores,
  selectedId,
  onSelect,
}: {
  stores: readonly Store[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const leafletRef = useRef<typeof import("leaflet") | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  // ساختِ نقشه async است → افکتِ پین‌ها پس از آماده‌شدن اجرا می‌شود
  const [ready, setReady] = useState(false);
  // راهنمای «Ctrl را نگه دارید» وقتی بدونِ Ctrl روی نقشه چرخ می‌زنند
  const [hint, setHint] = useState(false);
  const hintTimer = useRef<number | null>(null);

  // ── ساختِ یک‌بارهٔ نقشه ──
  useEffect(() => {
    let cancelled = false;
    let ro: ResizeObserver | null = null;

    (async () => {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current || mapRef.current) return;
      leafletRef.current = L;

      const map = L.map(containerRef.current, {
        zoomControl: true,
        scrollWheelZoom: false, // پیش‌فرض خاموش؛ فقط هنگامِ نگه‌داشتنِ Ctrl روشن می‌شود
        attributionControl: true,
      });
      mapRef.current = map;
      map.setView([35.864, 50.968], 14); // نمای پیش‌فرض: مرکزِ گوهردشت

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap",
      }).addTo(map);

      // pan:false → هنگامِ تغییرِ اندازه نقشه پَرش/پَن نمی‌کند (محتوای دیده‌شده ثابت می‌ماند)
      ro = new ResizeObserver(() => map.invalidateSize({ pan: false, animate: false }));
      ro.observe(containerRef.current);
      setReady(true);
    })();

    return () => {
      cancelled = true;
      ro?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = {};
      if (hintTimer.current) window.clearTimeout(hintTimer.current);
    };
  }, []);

  // ── زومِ چرخِ موس فقط با Ctrl/⌘ ──
  useEffect(() => {
    const sync = (e: KeyboardEvent) => {
      const map = mapRef.current;
      if (!map) return;
      if (e.ctrlKey || e.metaKey) map.scrollWheelZoom.enable();
      else map.scrollWheelZoom.disable();
    };
    const off = () => mapRef.current?.scrollWheelZoom.disable();
    window.addEventListener("keydown", sync);
    window.addEventListener("keyup", sync);
    window.addEventListener("blur", off);
    return () => {
      window.removeEventListener("keydown", sync);
      window.removeEventListener("keyup", sync);
      window.removeEventListener("blur", off);
    };
  }, []);

  // ── پین‌ها + نمای نقشه با تغییرِ فهرست/انتخاب ──
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map) return;

    Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    markersRef.current = {};

    stores.forEach((s) => {
      const isSelected = s.id === selectedId;
      const marker = L.marker([s.coords.lat, s.coords.lng], {
        title: s.name,
        icon: L.divIcon({
          className: "gj-pin",
          html: pinSvg(isSelected),
          iconSize: [30, 40],
          iconAnchor: [15, 38],
        }),
        zIndexOffset: isSelected ? 1000 : 0,
      });
      marker.on("click", () => onSelectRef.current(s.id));
      marker.addTo(map);
      markersRef.current[s.id] = marker;
    });

    if (selectedId) {
      const s = stores.find((x) => x.id === selectedId);
      if (s) map.setView([s.coords.lat, s.coords.lng], 16, { animate: true });
    } else if (stores.length === 1) {
      map.setView([stores[0].coords.lat, stores[0].coords.lng], 15, { animate: true });
    } else if (stores.length > 1) {
      const bounds = L.latLngBounds(
        stores.map((s) => [s.coords.lat, s.coords.lng] as [number, number])
      );
      map.fitBounds(bounds, { padding: [70, 70], maxZoom: 16 });
    }
  }, [stores, selectedId, ready]);

  // چرخِ موس بدونِ Ctrl → فقط راهنما را نشان می‌دهد؛ صفحه آزادانه اسکرول می‌شود
  function handleWheel(e: React.WheelEvent) {
    if (e.ctrlKey || e.metaKey) return;
    setHint(true);
    if (hintTimer.current) window.clearTimeout(hintTimer.current);
    hintTimer.current = window.setTimeout(() => setHint(false), 1100);
  }

  return (
    <div onWheel={handleWheel} className="relative isolate h-full w-full bg-surface-alt">
      <div ref={containerRef} className="h-full w-full" />
      {/* راهنمای زوم — روی همهٔ لایه‌های Leaflet (z>۱۰۰۰)، اما کلیک‌ناپذیر */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1100] flex justify-center pt-4">
        <span
          className={`rounded-full bg-ink/85 px-4 py-2 text-[12px] font-medium text-white backdrop-blur-sm transition-opacity duration-300 ease-out ${
            hint ? "opacity-100" : "opacity-0"
          }`}
        >
          برای بزرگ‌نمایی، کلید Ctrl را نگه دارید و اسکرول کنید
        </span>
      </div>
    </div>
  );
}

// پینِ نقشه — قطره‌ایِ ساده با نقطهٔ سفید؛ سبزِ برند برای انتخاب‌شده، تیره برای بقیه
function pinSvg(selected: boolean): string {
  const color = selected ? "#008840" : "#131313";
  return `<svg width="30" height="40" viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 3px 4px rgba(0,0,0,0.35))">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 8.4 10.5 18.6 11.27 19.34a1 1 0 0 0 1.46 0C13.5 30.6 24 20.4 24 12 24 5.37 18.63 0 12 0z" fill="${color}"/>
    <circle cx="12" cy="12" r="4.6" fill="#fff"/>
  </svg>`;
}
