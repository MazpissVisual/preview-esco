import Link from "next/link";
import Navbar from "@/components/Navbar";
import VersionSwitch from "@/components/VersionSwitch";
import V3Footer from "@/components/v3/V3Footer";
import V3TopStrip from "@/components/v3/V3TopStrip";
import { v3Menu } from "@/components/v3/menu";

export default function NotFoundV3() {
  return (
    <>
      <V3TopStrip prefix="/v3" />
      <Navbar menu={v3Menu("/v3")} homeHref="/v3" registerBase="/v3" shrink />
      <main id="konten" className="v3 bg-esco-soft">
        <div className="wrap flex flex-col items-start gap-5 py-24 md:py-32">
          <p className="m-0 text-sm font-bold uppercase tracking-[.14em] text-esco-accent">404</p>
          <h1 className="m-0 text-[32px] font-extrabold text-esco-dark md:text-[46px]">Halaman tidak ditemukan</h1>
          <p className="m-0 max-w-lg text-esco-text2">Halaman atau kelas yang Anda cari tidak ada atau sudah dipindahkan.</p>
          <Link href="/v3" className="btn-purple">Kembali ke Beranda</Link>
        </div>
      </main>
      <V3Footer prefix="/v3" />
      <VersionSwitch />
    </>
  );
}
