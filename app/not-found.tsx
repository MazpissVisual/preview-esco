import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar variant="back" />
      <main id="konten" className="bg-esco-soft">
        <div className="wrap flex flex-col items-start gap-5 py-24">
          <div className="text-sm font-bold uppercase tracking-[.14em] text-esco-accent">404</div>
          <h1 className="m-0 text-[32px] font-extrabold text-esco-dark md:text-[44px]">Halaman tidak ditemukan</h1>
          <p className="m-0 max-w-[520px] text-esco-text2">Halaman atau kelas yang Anda cari tidak ada atau sudah dipindahkan.</p>
          <Link href="/" className="btn-purple">Kembali ke Beranda</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
