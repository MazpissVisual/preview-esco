import Link from "next/link";
import type { Kelas } from "@/data/kelas";

export default function ClassCard({ k }: { k: Kelas }) {
  return (
    <div className="card card-hover group flex min-w-0 flex-[0_0_82%] snap-start flex-col overflow-hidden sm:flex-[1_1_240px]">
      <div className="placeholder-img relative h-[170px] overflow-hidden">
        <span className="transition-transform duration-500 group-hover:scale-105">[Gambar kegiatan]</span>
        <span className="absolute left-[18px] top-[18px] flex h-11 w-11 items-center justify-center rounded-full bg-esco-yellow font-extrabold text-esco-purple">{k.nomor}</span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <div className="text-xl font-extrabold text-esco-dark">{k.nama}</div>
        <div className="text-[15px] text-[#5a4a6c]">{k.deskripsiSingkat}</div>
        <div className="mt-1 flex flex-wrap gap-2">
          {[k.durasi, k.jumlahWebinar].map((t, i) => (
            <span key={i} className="rounded-full border border-[#cdbbdc] px-3 py-1 text-xs text-[#4f3566]">{t}</span>
          ))}
        </div>
        <Link href={`/kelas/${k.slug}`} className="mt-auto flex min-h-[44px] items-center gap-1 pt-1.5 text-sm font-bold text-esco-purple no-underline">
          Selengkapnya <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
