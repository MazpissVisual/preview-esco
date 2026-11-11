import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import RegisterButton from "@/components/RegisterButton";
import StickyCta from "@/components/StickyCta";
import VersionSwitch from "@/components/VersionSwitch";
import { getKelas, kelasList } from "@/data/kelas";
import { site } from "@/data/site";

export function generateStaticParams() {
  return kelasList.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const k = getKelas((await params).slug);
  if (!k) return { title: "Kelas tidak ditemukan" };
  return { title: k.nama, description: k.deskripsiSingkat };
}

export default async function DetailKelas({ params }: { params: Promise<{ slug: string }> }) {
  const k = getKelas((await params).slug);
  if (!k) notFound();
  const lain = kelasList.filter((x) => x.slug !== k.slug);
  const fakta = [
    { label: "Durasi", value: k.durasi },
    { label: "Jumlah pertemuan", value: k.jumlahWebinar },
    { label: "Format", value: "Webinar daring" },
    { label: "Platform", value: "Virtual Class Unila" },
    { label: "Kuota", value: k.kuota },
    { label: "Pendaftaran s.d.", value: site.tanggalPenutupan },
  ];
  return (
    <>
      <Navbar variant="back" cta />
      <main id="konten" className="pb-20 lg:pb-0">
        <section data-dark className="bg-esco-dark text-white">
          <div className="wrap flex flex-col gap-[18px] pb-12 pt-10 md:pb-14 md:pt-12">
            <nav aria-label="Breadcrumb" className="text-[13px] text-esco-muted">
              <Link href="/" className="text-esco-muted no-underline">Beranda</Link> /{" "}
              <Link href="/#program" className="text-esco-muted no-underline">Program</Link> / {k.nama}
            </nav>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-esco-yellow px-3.5 py-1.5 text-[13px] font-bold text-esco-purple">Kelas {k.nomor}</span>            </div>
            <h1 className="m-0 max-w-[820px] text-[32px] font-extrabold leading-[1.1] tracking-[-.02em] md:text-[46px]">{k.nama}</h1>
            <p className="m-0 max-w-[680px] text-base text-esco-muted md:text-lg">{k.deskripsiSingkat}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              {[k.durasi, k.jumlahWebinar, "Webinar di Virtual Class Unila"].map((c, i) => (
                <span key={i} className="rounded-full border border-[#8a5fb0] px-3.5 py-1.5">{c}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="wrap flex flex-wrap items-start gap-12 py-12 md:py-[72px]">
            <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-14">
              <div className="flex flex-col gap-3.5">
                <Eyebrow>Tentang kelas</Eyebrow>
                <h2 className="m-0 text-[26px] font-extrabold leading-tight text-esco-dark md:text-[30px]">Gambaran kelas</h2>
                {k.gambaran.map((p, i) => (
                  <p key={i} className="m-0 text-esco-text2">{p}</p>
                ))}
              </div>

              <div className="flex flex-col gap-[18px]">
                <Eyebrow>Capaian belajar</Eyebrow>
                <h2 className="m-0 text-[26px] font-extrabold leading-tight text-esco-dark md:text-[30px]">Yang akan Anda pelajari</h2>
                <ul className="m-0 flex list-none flex-wrap gap-3.5 p-0">
                  {k.capaian.map((c, i) => (
                    <li key={i} className="flex min-w-0 flex-[1_1_260px] items-start gap-3 rounded-2xl bg-esco-soft px-[18px] py-4">
                      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-esco-purple">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFD43B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="5 12 10 17 19 7" /></svg>
                      </span>
                      <span className="text-sm text-[#3a2150]">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-[18px]">
                <Eyebrow>Jadwal webinar</Eyebrow>
                <h2 className="m-0 text-[26px] font-extrabold leading-tight text-esco-dark md:text-[30px]">Sesi webinar kelas ini</h2>
                <ol className="m-0 flex list-none flex-col gap-3 p-0">
                  {k.sesi.map((s, i) => (
                    <li key={i} className="flex flex-wrap items-center gap-4 rounded-[18px] border border-esco-line px-[22px] py-[18px]">
                      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-esco-purple font-extrabold text-esco-yellow">{i + 1}</span>
                      <div className="min-w-0 flex-[1_1_240px]">
                        <div className="font-bold text-esco-dark">{s.judul}</div>
                        <div className="text-sm text-[#5a4a6c]">{s.ringkasan}</div>
                      </div>
                      <span className="text-[13px] font-bold text-esco-accent">{s.tanggal}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex flex-col gap-[18px]">
                <Eyebrow>Pengajar</Eyebrow>
                <h2 className="m-0 text-[26px] font-extrabold leading-tight text-esco-dark md:text-[30px]">Dosen dan narasumber kelas ini</h2>
                <div className="flex flex-wrap gap-4">
                  {k.pengajar.map((t, i) => (
                    <div key={i} className="flex min-w-0 flex-[1_1_260px] items-center gap-4 rounded-[20px] border border-esco-line bg-esco-soft p-[18px]">
                      <div className="flex h-[72px] w-[72px] flex-none items-center justify-center rounded-full bg-[#ebe2f3] text-[11px] text-[#4f3566]">Foto</div>
                      <div className="min-w-0">
                        <div className="font-extrabold">{t.nama}</div>
                        <div className="text-sm text-[#5a4a6c]">{t.instansi}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-4 rounded-3xl border border-esco-line bg-white p-7 shadow-side lg:sticky lg:top-24">
              <div className="placeholder-img h-[150px] rounded-2xl text-[13px]">[Gambar kelas]</div>
              <div className="text-lg font-extrabold text-esco-dark">Ringkasan kelas</div>
              <dl className="m-0 flex flex-col">
                {fakta.map((f) => (
                  <div key={f.label} className="flex justify-between gap-3 border-b border-[#eadff2] py-2.5 text-sm">
                    <dt className="text-[#5a4a6c]">{f.label}</dt>
                    <dd className="m-0 text-right font-bold text-esco-purple">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="rounded-[14px] bg-esco-soft px-4 py-3.5 text-[13px] text-esco-text2">
                Kelas diikuti lewat Virtual Class Unila. [Info akses dikirim ke email peserta terdaftar.]
              </div>
              <RegisterButton variant="purple" kelas={k.slug} className="w-full">Daftar Kelas Ini</RegisterButton>
              <div className="text-center text-sm text-[#5a4a6c]">Butuh bantuan? {site.kontak.whatsapp}</div>
            </aside>
          </div>
        </section>

        <section className="bg-esco-soft">
          <div className="wrap flex flex-col gap-8 py-16 md:py-20">
            <div className="flex flex-col gap-3">
              <Eyebrow>Kelas lainnya</Eyebrow>
              <h2 className="m-0 text-[26px] font-extrabold leading-tight text-esco-dark md:text-[30px]">Jelajahi kelas ESCO lainnya</h2>
            </div>
            <div className="flex flex-wrap gap-5">
              {lain.map((o) => (
                <Link key={o.slug} href={`/kelas/${o.slug}`} className="card-hover group flex min-h-[44px] min-w-0 flex-[1_1_320px] items-center gap-[18px] rounded-[20px] border border-esco-line bg-white p-[22px] text-esco-darker no-underline hover:border-[#cdbbdc]">
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-esco-yellow font-extrabold text-esco-purple">{o.nomor}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-extrabold text-esco-dark">{o.nama}</span>
                    <span className="block text-sm text-[#5a4a6c]">{o.durasi} · {o.jumlahWebinar}</span>
                  </span>
                  <span aria-hidden="true" className="font-bold text-esco-purple transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <StickyCta kelas={k.slug} nama={k.nama} info={`${k.durasi} · ${k.jumlahWebinar}`} />
      <Footer />
      <VersionSwitch />
    </>
  );
}
