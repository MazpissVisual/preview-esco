import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Eyebrow from "@/components/Eyebrow";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";
import TopStrip from "@/components/TopStrip";
import { BackToTop, ScrollProgress } from "@/components/Extras";
import { site } from "@/data/site";
import { pendaftaranLangkah } from "@/data/konten";

export const metadata: Metadata = {
  title: "Pendaftaran Peserta",
  description: "Formulir pendaftaran peserta Education Summer Course Online (ESCO) FKIP Universitas Lampung.",
};

export default async function Pendaftaran({ searchParams }: { searchParams: Promise<{ kelas?: string }> }) {
  const { kelas } = await searchParams;
  const info = [
    { label: "Penutupan", value: site.tanggalPenutupan },
    { label: "Kuota", value: site.kuota },
    { label: "Pelaksanaan", value: `${site.tanggalMulai} – ${site.tanggalSelesai}` },
  ];

  return (
    <>
      <TopStrip />
      <ScrollProgress />
      <Navbar shrink />

      <main id="konten" className="fx bg-esco-soft">
        <section data-dark className="pattern-dots bg-esco-dark text-white">
          <div className="wrap flex flex-col gap-4 pb-12 pt-10 md:pb-14 md:pt-14">
            <Eyebrow light>Pendaftaran</Eyebrow>
            <h1 className="hero-in hero-in-1 m-0 text-[32px] font-extrabold leading-[1.1] tracking-[-.02em] md:text-[46px]">Pendaftaran Peserta ESCO</h1>
            <p className="hero-in hero-in-2 m-0 max-w-2xl text-base text-esco-muted md:text-lg">[Kalimat singkat: lengkapi data berikut. Konfirmasi dikirim ke email yang didaftarkan.]</p>
          </div>
        </section>

        <div className="wrap flex flex-col gap-10 pb-16 pt-10 md:pb-20 md:pt-12">
          {/* Langkah: daftar bernomor berpembatas, bukan kartu */}
          <ol className="m-0 grid list-none gap-x-8 p-0 sm:grid-cols-3">
            {pendaftaranLangkah.map((label, i) => (
              <li key={i} className="flex items-baseline gap-3 border-t border-[#cdbbdc] py-4">
                <span className="font-display text-sm font-extrabold text-esco-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[15px] text-[#3a2150]">{label}</span>
              </li>
            ))}
          </ol>

          <div className="flex flex-wrap items-start gap-8">
            <RegistrationForm defaultKelas={kelas} />
            <aside className="flex min-w-0 flex-[1_1_300px] flex-col gap-5 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-esco-line bg-white p-6">
                <h2 className="m-0 text-lg font-extrabold text-esco-dark">Informasi pendaftaran</h2>
                <dl className="m-0 mt-3 border-t border-esco-line">
                  {info.map((x) => (
                    <div key={x.label} className="grid gap-0.5 border-b border-esco-line py-3 sm:grid-cols-[110px_1fr] sm:gap-4">
                      <dt className="text-sm text-[#5a4a6c]">{x.label}</dt>
                      <dd className="m-0 text-sm font-bold text-esco-purple">{x.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rounded-2xl border border-esco-line bg-white p-6">
                <h2 className="m-0 text-lg font-extrabold text-esco-dark">Butuh bantuan?</h2>
                <p className="m-0 mt-3 text-sm text-esco-text2">{site.kontak.email}</p>
                <p className="m-0 mt-1 text-sm text-esco-text2">{site.kontak.whatsapp}</p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
