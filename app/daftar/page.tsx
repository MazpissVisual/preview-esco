import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VersionSwitch from "@/components/VersionSwitch";
import Eyebrow from "@/components/Eyebrow";
import RegistrationForm from "@/components/RegistrationForm";
import { site } from "@/data/site";
import { pendaftaranLangkah } from "@/data/konten";

export const metadata: Metadata = {
  title: "Pendaftaran Peserta",
  description: "Formulir pendaftaran peserta Education Summer Course Online (ESCO) FKIP Universitas Lampung.",
};

export default async function Pendaftaran({ searchParams }: { searchParams: Promise<{ kelas?: string }> }) {
  const { kelas } = await searchParams;
  return (
    <>
      <Navbar variant="back" />
      <main id="konten" className="bg-esco-soft">
        <section data-dark className="bg-esco-dark text-white">
          <div className="wrap flex flex-col gap-3.5 pb-12 pt-10 md:pb-14 md:pt-12">
            <Eyebrow light>Pendaftaran</Eyebrow>
            <h1 className="m-0 text-[32px] font-extrabold leading-[1.1] tracking-[-.02em] md:text-[44px]">Pendaftaran Peserta ESCO</h1>
            <p className="m-0 max-w-[640px] text-esco-muted">[Kalimat singkat: lengkapi data berikut. Konfirmasi dikirim ke email yang didaftarkan.]</p>
            <div className="mt-1 flex flex-wrap gap-3 text-sm">
              {[`Penutupan: ${site.tanggalPenutupan}`, `Kuota: ${site.kuota}`].map((c) => (
                <span key={c} className="rounded-full border border-[#8a5fb0] px-3.5 py-1.5">{c}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="wrap flex flex-col gap-8 pb-16 pt-10 md:pb-[72px] md:pt-12">
          <ol className="m-0 flex list-none flex-wrap gap-3 p-0">
            {pendaftaranLangkah.map((label, i) => (
              <li key={i} className="flex min-w-0 flex-[1_1_220px] items-center gap-3 rounded-2xl border border-esco-line bg-white px-4 py-3">
                <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-esco-purple text-[13px] font-semibold text-white">{i + 1}</span>
                <span className="text-sm">{label}</span>
              </li>
            ))}
          </ol>

          <div className="flex flex-wrap items-start gap-8">
            <RegistrationForm defaultKelas={kelas} />
            <aside className="flex min-w-0 flex-[1_1_300px] flex-col gap-5">
              <div className="flex flex-col gap-3 rounded-[20px] border border-esco-line bg-white p-6">
                <div className="font-bold">Informasi pendaftaran</div>
                <div className="border-t border-esco-line pt-3 text-sm text-[#444]">Penutupan: {site.tanggalPenutupan}</div>
                <div className="text-sm text-[#444]">Kuota: {site.kuota}</div>
                <div className="text-sm text-[#444]">Pelaksanaan: {site.tanggalMulai} – {site.tanggalSelesai}</div>
              </div>
              <div className="flex flex-col gap-3 rounded-[20px] border border-esco-line bg-white p-6">
                <div className="font-bold">Butuh bantuan?</div>
                <div className="text-sm text-[#444]">{site.kontak.email}</div>
                <div className="text-sm text-[#444]">{site.kontak.whatsapp}</div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <VersionSwitch />
    </>
  );
}
