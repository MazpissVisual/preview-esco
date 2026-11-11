import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import RegisterButton from "@/components/RegisterButton";
import StickyCta from "@/components/StickyCta";
import VersionSwitch from "@/components/VersionSwitch";
import V3Footer from "@/components/v3/V3Footer";
import V3TopStrip from "@/components/v3/V3TopStrip";
import Person from "@/components/v3/Person";
import { BackToTop, ScrollProgress } from "@/components/v3/V3Extras";
import { v3Menu } from "@/components/v3/menu";
import { getKelas, kelasList } from "@/data/kelas";
import { site } from "@/data/site";

export function generateStaticParams() {
  return kelasList.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const k = getKelas((await params).slug);
  if (!k) return { title: "Kelas tidak ditemukan" };
  return { title: `${k.nama} (versi 3)`, description: k.deskripsiSingkat, robots: { index: false } };
}

const num = (i: number) => String(i + 1).padStart(2, "0");
const h2 = "m-0 text-[26px] font-extrabold leading-tight text-esco-dark md:text-[30px]";

export default async function DetailKelasV3({ params }: { params: Promise<{ slug: string }> }) {
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
      <V3TopStrip prefix="/v3" />
      <ScrollProgress />
      <Navbar menu={v3Menu("/v3")} homeHref="/v3" registerBase="/v3" shrink />

      <main id="konten" className="v3 pb-20 lg:pb-0">
        {/* HEADER */}
        <section data-dark className="pattern-dots bg-esco-dark text-white">
          <div className="wrap flex flex-col gap-5 pb-12 pt-10 md:pb-16 md:pt-14">
            <nav aria-label="Breadcrumb" className="text-[13px] text-esco-muted">
              <Link href="/v3" className="text-esco-muted no-underline hover:text-white">Beranda</Link> /{" "}
              <Link href="/v3#kelas" className="text-esco-muted no-underline hover:text-white">Kelas</Link> / {k.nama}
            </nav>
            <span className="self-start rounded-full bg-esco-yellow px-3.5 py-1.5 text-[13px] font-bold text-esco-purple">Kelas {k.nomor}</span>
            <h1 className="hero-in hero-in-1 m-0 max-w-3xl text-[34px] font-extrabold leading-[1.08] tracking-[-.02em] md:text-[50px]">{k.nama}</h1>
            <p className="hero-in hero-in-2 m-0 max-w-2xl text-base leading-relaxed text-esco-muted md:text-lg">{k.deskripsiSingkat}</p>
            <ul className="m-0 mt-1 flex list-none flex-wrap gap-y-2 p-0 text-sm text-esco-muted">
              {[k.durasi, k.jumlahWebinar, "Webinar di Virtual Class Unila"].map((c, i) => (
                <li key={i} className={`px-4 ${i === 0 ? "pl-0" : "border-l border-white/20"}`}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ISI */}
        <section className="bg-white">
          <div className="wrap grid items-start gap-12 py-12 md:py-20 lg:grid-cols-12 lg:gap-14">
            <div className="flex min-w-0 flex-col gap-14 lg:col-span-8">
              <Reveal className="flex flex-col gap-4">
                <Eyebrow>Tentang kelas</Eyebrow>
                <h2 className={h2}>Gambaran kelas</h2>
                {k.gambaran.map((p, i) => (
                  <p key={i} className="m-0 text-base leading-relaxed text-esco-text2">{p}</p>
                ))}
              </Reveal>

              <Reveal className="flex flex-col gap-5">
                <Eyebrow>Capaian belajar</Eyebrow>
                <h2 className={h2}>Yang akan Anda pelajari</h2>
                <ol className="m-0 grid list-none gap-x-10 p-0 sm:grid-cols-2">
                  {k.capaian.map((c, i) => (
                    <li key={i} className="flex gap-3 border-t border-esco-line py-4">
                      <span className="mt-[2px] font-display text-sm font-extrabold text-esco-accent">{num(i)}</span>
                      <span className="text-[15px] text-[#3a2150]">{c}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal className="flex flex-col gap-5">
                <Eyebrow>Jadwal webinar</Eyebrow>
                <h2 className={h2}>Sesi webinar kelas ini</h2>
                <ol className="m-0 list-none border-b border-esco-line p-0">
                  {k.sesi.map((s, i) => (
                    <li key={i} className="grid gap-1 border-t border-esco-line py-5 sm:grid-cols-[56px_1fr_auto] sm:items-baseline sm:gap-6">
                      <span className="font-display text-lg font-extrabold text-esco-accent">{num(i)}</span>
                      <span>
                        <span className="block font-display text-lg font-extrabold text-esco-dark">{s.judul}</span>
                        <span className="mt-0.5 block text-[15px] text-[#5a4a6c]">{s.ringkasan}</span>
                      </span>
                      <span className="text-sm font-bold text-esco-accent">{s.tanggal}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal className="flex flex-col gap-5">
                <Eyebrow>Pengajar</Eyebrow>
                <h2 className={h2}>Dosen dan narasumber kelas ini</h2>
                <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
                  {k.pengajar.map((t, i) => (
                    <li key={i} className="flex items-center gap-4 rounded-2xl border border-esco-line p-4">
                      <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-esco-soft text-esco-accent">
                        <Person className="h-7 w-7" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-display font-extrabold text-esco-dark">{t.nama}</span>
                        <span className="block text-sm text-[#5a4a6c]">{t.instansi}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <aside className="flex min-w-0 flex-col gap-5 rounded-2xl border border-esco-line bg-white p-6 shadow-side lg:sticky lg:top-24 lg:col-span-4">
              <h2 className="m-0 text-lg font-extrabold text-esco-dark">Ringkasan kelas</h2>
              <dl className="m-0 border-t border-esco-line">
                {fakta.map((f) => (
                  <div key={f.label} className="flex justify-between gap-4 border-b border-esco-line py-3 text-sm">
                    <dt className="text-[#5a4a6c]">{f.label}</dt>
                    <dd className="m-0 text-right font-bold text-esco-purple">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="m-0 text-sm leading-relaxed text-esco-text2">
                Kelas diikuti lewat Virtual Class Unila. [Info akses dikirim ke email peserta terdaftar.]
              </p>
              <RegisterButton variant="purple" kelas={k.slug} base="/v3" className="w-full">Daftar kelas ini</RegisterButton>
              <p className="m-0 text-center text-sm text-[#5a4a6c]">Butuh bantuan? {site.kontak.whatsapp}</p>
            </aside>
          </div>
        </section>

        {/* KELAS LAINNYA */}
        <section className="bg-esco-soft">
          <div className="wrap flex flex-col gap-8 py-14 md:py-20">
            <Reveal className="flex flex-col gap-3">
              <Eyebrow>Kelas lainnya</Eyebrow>
              <h2 className={h2}>Jelajahi kelas ESCO lainnya</h2>
            </Reveal>
            <ul className="m-0 list-none border-b border-[#cdbbdc] p-0">
              {lain.map((o) => (
                <li key={o.slug} className="border-t border-[#cdbbdc]">
                  <Link href={`/v3/kelas/${o.slug}`} className="group grid min-h-[44px] grid-cols-[44px_1fr_auto] items-center gap-4 py-5 text-esco-darker no-underline">
                    <span className="font-display text-sm font-extrabold text-esco-accent">{o.nomor}</span>
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-extrabold text-esco-dark transition-colors group-hover:text-esco-accent">{o.nama}</span>
                      <span className="block text-sm text-[#5a4a6c]">{o.durasi} · {o.jumlahWebinar}</span>
                    </span>
                    <span aria-hidden="true" className="font-bold text-esco-purple transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <StickyCta kelas={k.slug} nama={k.nama} info={`${k.durasi} · ${k.jumlahWebinar}`} base="/v3" />
      <V3Footer prefix="/v3" />
      <BackToTop />
      <VersionSwitch />
    </>
  );
}
