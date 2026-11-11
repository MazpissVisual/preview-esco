"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Tombol pembanding layout (sementara). Sadar halaman: berpindah versi tetap di halaman yang sama
 * (mis. /v2/daftar -> /v3/daftar). Hapus komponen ini beserta pemakaiannya setelah satu versi dipilih.
 */
export default function VersionSwitch({ current: _unused }: { current?: 1 | 2 | 3 } = {}) {
  const pathname = usePathname() || "/";
  const current = pathname === "/v3" || pathname.startsWith("/v3/") ? 3 : pathname === "/v2" || pathname.startsWith("/v2/") ? 2 : 1;
  const rest = current === 1 ? pathname : pathname.slice(3) || "/"; // halaman tanpa awalan versi
  const hrefFor = (n: 1 | 2 | 3) => (n === 1 ? rest : rest === "/" ? `/v${n}` : `/v${n}${rest}`);

  const base = "flex min-h-[40px] items-center rounded-full px-4 text-sm font-bold no-underline transition";
  return (
    <div className="fixed bottom-4 left-4 z-[60] flex items-center gap-1 rounded-full border border-white/20 bg-[#1d0732]/95 p-1 shadow-[0_8px_24px_rgba(0,0,0,.3)] backdrop-blur max-lg:bottom-24" role="navigation" aria-label="Pilih versi layout">
      {([1, 2, 3] as const).map((n) => (
        <Link
          key={n}
          href={hrefFor(n)}
          aria-current={current === n ? "page" : undefined}
          className={`${base} ${current === n ? "bg-[#FFD43B] text-[#3D1160]" : "text-white hover:bg-white/10"}`}
        >
          Versi {n}
        </Link>
      ))}
    </div>
  );
}
