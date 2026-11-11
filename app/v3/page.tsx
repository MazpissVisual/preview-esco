import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Faq from "@/components/Faq";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import RegisterButton from "@/components/RegisterButton";
import VersionSwitch from "@/components/VersionSwitch";
import V3Footer from "@/components/v3/V3Footer";
import V3TopStrip from "@/components/v3/V3TopStrip";
import Person from "@/components/v3/Person";
import { v3Menu } from "@/components/v3/menu";
import { BackToTop, ParallaxBg, ScrollProgress } from "@/components/v3/V3Extras";
import { site } from "@/data/site";
import { kelasList } from "@/data/kelas";
import { about, benefits, speakers, flow, news, faqs } from "@/data/konten";

export const metadata: Metadata = {
  title: "Versi 3 (perbandingan layout)",
  robots: { index: false },
};

const menu = v3Menu();

// Satu informasi, satu tempat: strip ini satu-satunya yang memuat tanggal dan format.
const strip = [
  { label: "Pelaksanaan", value: `${site.tanggalMulai} – ${site.tanggalSelesai}`, sub: "[Sesi sinkronus dan asinkronus]" },
  { label: "Format", value: "Webinar", sub: "Virtual Class Unila" },
  { label: "Pendaftaran", value: `Sampai ${site.tanggalPenutupan}`, sub: "[Keterangan kuota]" },
  { label: "Peserta", value: site.sasaranPeserta, sub: "[Cakupan peserta]" },
];

export default function Versi3() {
  return (
    <>
      <V3TopStrip />

      <ScrollProgress />
      <Navbar menu={menu} homeHref="/v3" registerBase="/v3" shrink />

      <main id="konten" className="v3">
        {/* HERO: sama dengan hero versi 1 (gambar latar duotone + overlay) */}
        <section data-dark className="relative isolate min-h-[600px] overflow-hidden bg-esco-dark text-white md:min-h-0">
          <ParallaxBg>
            <Image
              src="/hero-bg.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[72%_20%] opacity-[.55] mix-blend-luminosity md:object-[70%_center]"
            />
          </ParallaxBg>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-esco-dark via-esco-dark/80 to-esco-dark/20 md:via-esco-dark/70" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-esco-dark/90 via-transparent to-transparent" />
          <div className="wrap flex flex-wrap items-center gap-14 pb-20 pt-14 md:pb-24 md:pt-[88px]">
            <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-6">
              <div className="hero-in hero-in-1 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-esco-yellow px-4 py-[7px] text-[13px] font-bold text-esco-purple">{site.penyelenggara}</span>
              </div>
              <h1 className="hero-in hero-in-2 m-0 text-[38px] font-extrabold leading-[1.08] tracking-[-.02em] md:text-[56px]">{site.namaLengkap}</h1>
              <p className="hero-in hero-in-3 m-0 max-w-[520px] text-base text-esco-muted md:text-lg">{site.tagline}</p>
              <div className="hero-in hero-in-4 mt-2 flex flex-wrap gap-3.5">
                <RegisterButton base="/v3" className="!px-8 !py-4" />
                <a href="#kelas" className="btn-outline !px-8">Lihat Program</a>
              </div>
            </div>
          </div>
        </section>

        {/* STRIP INFO: pita datar di bawah hero */}
        <section data-dark className="pattern-dots border-t border-white/15 bg-esco-darker text-white">
          <dl className="wrap m-0 lg:grid lg:grid-cols-4">
            {strip.map((s, i) => (
              <div
                key={s.label}
                className={`grid min-w-0 grid-cols-[104px_1fr] items-baseline gap-x-4 gap-y-0.5 py-4 sm:grid-cols-[140px_1fr] lg:block lg:py-6 lg:pr-4 ${i > 0 ? "border-t border-white/15 lg:border-t-0 lg:border-l lg:pl-6" : ""}`}
              >
                <dt className="row-span-2 text-xs font-semibold uppercase tracking-[.1em] text-esco-muted">{s.label}</dt>
                <dd className="m-0 font-display text-base font-bold lg:mt-1.5 md:text-[17px]">{s.value}</dd>
                <dd className="m-0 text-sm text-esco-muted lg:mt-0.5">{s.sub}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* TENTANG: gabungan "Tentang" v1 + "Program Utama" v2 */}
        <section id="tentang" className="bg-white">
          <div className="wrap section-y grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal className="flex flex-col gap-5">
              <Eyebrow>Tentang ESCO</Eyebrow>
              <h2 className="h2 m-0">Kelas musim panas daring pertama FKIP Unila</h2>
              {about.paragraf.map((p, i) => (
                <p key={i} className="m-0 text-base leading-relaxed text-esco-text2">{p}</p>
              ))}
              <dl className="m-0 mt-2 border-t border-esco-line">
                {about.poin.map((a) => (
                  <div key={a.title} className="grid gap-1 border-b border-esco-line py-4 sm:grid-cols-[150px_1fr] sm:gap-6">
                    <dt className="font-display font-bold text-esco-dark">{a.title}</dt>
                    <dd className="m-0 text-[15px] text-esco-text2">{a.text}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={120}>
              <div className="placeholder-img aspect-[4/3] rounded-2xl">[Foto kegiatan / ilustrasi]</div>
            </Reveal>
          </div>
        </section>

        {/* KELAS: kartu v2 (informatif, tanpa gambar kosong) + tautan dan carousel v1 */}
        <section id="kelas" className="bg-esco-soft">
          <div className="wrap section-y flex flex-col gap-10">
            <Reveal className="flex max-w-2xl flex-col gap-3">
              <Eyebrow>Kelas</Eyebrow>
              <h2 className="h2 m-0">Empat kelas, satu program</h2>
              <p className="m-0 text-base text-esco-text2">[Pilih kelas sesuai bidang dan kebutuhan Anda. Satu peserta memilih satu kelas.]</p>
            </Reveal>
            <Reveal delay={100}>
              <ul className="-mx-5 m-0 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
                {kelasList.map((k) => (
                  <li key={k.slug} className="flex min-w-0 flex-[0_0_82%] snap-start sm:flex-none">
                    <Link href={`/v3/kelas/${k.slug}`} className="group card card-hover relative flex w-full flex-col overflow-hidden !rounded-2xl p-6 text-esco-darker no-underline">
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-esco-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
                      <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1 select-none font-display text-[60px] font-extrabold leading-none text-esco-purple/[.06] transition duration-500 group-hover:-translate-y-1 group-hover:text-esco-purple/[.11]">{k.nomor}</span>
                      <div className="relative z-10 flex flex-1 flex-col gap-3">
                        <span className="text-xs text-[#6f5a85]">{k.kategori}</span>
                        <h3 className="m-0 text-xl font-extrabold leading-snug text-esco-dark">{k.nama}</h3>
                        <p className="m-0 flex-1 text-[15px] leading-relaxed text-[#5a4a6c]">{k.deskripsiSingkat}</p>
                        <div className="flex items-center justify-between border-t border-esco-line pt-4 text-sm">
                          <span className="text-[#5a4a6c]">{k.durasi} · {k.jumlahWebinar}</span>
                          <span className="flex items-center gap-1 font-bold text-esco-purple">
                            Detail <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* BENEFIT: daftar bernomor, bukan kartu berikon */}
        <section id="benefit" data-dark className="pattern-dots bg-esco-dark text-white">
          <div className="wrap section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="flex flex-col gap-4 lg:col-span-4">
              <Eyebrow light>Benefit</Eyebrow>
              <h2 className="m-0 text-[28px] font-extrabold leading-[1.15] md:text-[38px]">Yang Anda dapatkan di ESCO</h2>
              <p className="m-0 text-esco-muted">[Satu kalimat ringkas tentang nilai program bagi peserta.]</p>
            </Reveal>
            <ol className="m-0 grid list-none gap-x-12 p-0 sm:grid-cols-2 lg:col-span-8">
              {benefits.map((b, i) => (
                <li key={i}>
                  <Reveal delay={(i % 2) * 90} className="rule-draw group flex gap-4 py-6">
                    <span className="mt-[3px] font-display text-sm font-extrabold text-esco-yellow transition-transform duration-300 group-hover:translate-x-1">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="m-0 text-lg font-extrabold">{b.title}</h3>
                      <p className="m-0 mt-1.5 text-[15px] leading-relaxed text-[#e6d9f0]">{b.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* NARASUMBER */}
        <section id="narasumber" className="bg-white">
          <div className="wrap section-y flex flex-col gap-10">
            <Reveal className="flex max-w-2xl flex-col gap-3">
              <Eyebrow>Narasumber</Eyebrow>
              <h2 className="h2 m-0">Pengajar dan narasumber</h2>
            </Reveal>
            <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {speakers.map((s, i) => (
                <li key={i}>
                  <Reveal delay={i * 80} className="h-full">
                    <div className={`flex h-full flex-col gap-1.5 rounded-2xl border p-6 ${s.keynote ? "border-esco-purple bg-esco-purple text-white" : "border-esco-line bg-white text-esco-darker"}`}>
                      <div className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full ${s.keynote ? "bg-white/15 text-esco-yellow" : "bg-esco-soft text-esco-accent"}`}>
                        <Person className="h-8 w-8" />
                      </div>
                      {s.keynote && <span className="text-xs font-bold uppercase tracking-[.1em] text-esco-yellow">Keynote</span>}
                      <h3 className="m-0 text-[17px] font-extrabold leading-snug">{s.name}</h3>
                      <p className={`m-0 text-sm ${s.keynote ? "text-esco-muted" : "text-[#5a4a6c]"}`}>{s.org}</p>
                      <p className={`m-0 mt-3 border-t pt-3 text-sm ${s.keynote ? "border-white/20" : "border-esco-line"}`}>{s.topic}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ALUR */}
        <section id="alur" className="bg-esco-soft">
          <div className="wrap section-y flex flex-col gap-12">
            <Reveal className="flex max-w-2xl flex-col gap-3">
              <Eyebrow>Alur</Eyebrow>
              <h2 className="h2 m-0">Dari mendaftar sampai selesai</h2>
            </Reveal>
            <Reveal>
            <ol className="relative m-0 grid list-none gap-8 p-0 md:grid-cols-4 md:gap-6">
              <span aria-hidden="true" className="tl-line absolute bottom-6 left-6 top-6 w-px bg-[#cdbbdc] md:bottom-auto md:left-6 md:top-6 md:h-px md:w-[calc(75%+18px)]" />
              {flow.map((f, i) => (
                <li key={f.n} className="relative">
                  <Reveal delay={i * 110} className="flex gap-5 md:flex-col md:gap-5">
                    <div className="relative z-10 flex h-12 w-12 flex-none items-center justify-center rounded-full border-4 border-esco-soft bg-esco-purple font-display text-lg font-extrabold text-esco-yellow">{f.n}</div>
                    <div className="min-w-0">
                      <h3 className="m-0 text-lg font-extrabold text-esco-dark">{f.title}</h3>
                      <p className="m-0 mt-1.5 text-[15px] leading-relaxed text-[#5a4a6c]">{f.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
            </Reveal>
          </div>
        </section>

        {/* PENGUMUMAN + KONTAK */}
        <section id="pengumuman" className="bg-white">
          <div className="wrap section-y grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col gap-7 lg:col-span-7">
              <Reveal className="flex flex-col gap-3">
                <Eyebrow>Pengumuman</Eyebrow>
                <h2 className="h2 m-0">Kabar terbaru</h2>
              </Reveal>
              <ul className="m-0 list-none border-t border-esco-line p-0">
                {news.map((n, i) => (
                  <li key={i} className="border-b border-esco-line">
                    <a href="#" className="group grid min-h-[44px] gap-1 py-5 text-esco-darker no-underline sm:grid-cols-[110px_1fr_auto] sm:items-baseline sm:gap-6">
                      <span className="text-sm font-bold text-esco-accent">{n.date}</span>
                      <span>
                        <span className="block font-display text-lg font-extrabold text-esco-dark transition-colors group-hover:text-esco-accent">{n.title}</span>
                        <span className="mt-1 block text-[15px] text-[#5a4a6c]">{n.text}</span>
                      </span>
                      <span aria-hidden="true" className="hidden font-bold text-esco-purple transition-transform duration-200 group-hover:translate-x-1 sm:block">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <Reveal delay={120} className="lg:col-span-5">
              <div data-dark className="flex flex-col gap-4 rounded-2xl bg-esco-purple p-8 text-white">
                <h3 className="m-0 text-2xl font-extrabold">Ada pertanyaan?</h3>
                <p className="m-0 text-[15px] text-[#e6d9f0]">[Hubungi panitia lewat WhatsApp atau email.]</p>
                <dl className="m-0 flex flex-col gap-3 border-t border-white/20 pt-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[.1em] text-esco-muted">WhatsApp</dt>
                    <dd className="m-0 font-bold text-esco-yellow">{site.kontak.whatsapp}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[.1em] text-esco-muted">Email</dt>
                    <dd className="m-0 font-bold text-esco-yellow">{site.kontak.email}</dd>
                  </div>
                </dl>
                <p className="m-0 text-sm text-esco-muted">[Jam layanan: hari dan jam kerja]</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" data-dark className="pattern-dots bg-esco-dark text-white">
          <div className="wrap section-y grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="flex flex-col gap-4 lg:col-span-4">
              <Eyebrow light>FAQ</Eyebrow>
              <h2 className="m-0 text-[28px] font-extrabold leading-[1.15] md:text-[38px]">Pertanyaan yang sering diajukan</h2>
              <p className="m-0 text-esco-muted">[Tidak menemukan jawabannya? Hubungi panitia.]</p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-8">
              <Faq items={faqs} />
            </Reveal>
          </div>
        </section>

        {/* CTA: judul di kiri, fakta penentu keputusan + tombol di kanan */}
        <section className="bg-[linear-gradient(to_bottom,#25093b_50%,#1d0732_50%)]">
          <div className="wrap pb-8 md:pb-10">
            <div className="grid items-center gap-10 rounded-[28px] bg-esco-yellow p-8 text-esco-purple shadow-[0_24px_60px_rgba(0,0,0,.35)] md:rounded-[36px] md:p-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="flex flex-col gap-4 lg:col-span-7">
              <h2 className="m-0 text-[30px] font-extrabold leading-[1.1] tracking-[-.01em] md:text-[46px]">Siap bergabung di ESCO?</h2>
              <p className="m-0 max-w-xl text-base font-medium leading-relaxed md:text-lg">[Satu kalimat alasan atau manfaat bergabung dengan program ini.]</p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5">
              <dl className="m-0 border-t border-esco-purple/25">
                {[
                  { l: "Penutupan", v: site.tanggalPenutupan },
                  { l: "Kuota", v: site.kuota },
                  { l: "Pelaksanaan", v: `${site.tanggalMulai} – ${site.tanggalSelesai}` },
                ].map((f) => (
                  <div key={f.l} className="grid gap-0.5 border-b border-esco-purple/25 py-3.5 sm:grid-cols-[120px_1fr] sm:gap-4">
                    <dt className="text-sm font-medium text-esco-purple/75">{f.l}</dt>
                    <dd className="m-0 font-display font-bold">{f.v}</dd>
                  </div>
                ))}
              </dl>
              <RegisterButton variant="purple" base="/v3" className="mt-6 w-full !py-[18px] !text-base" />
            </Reveal>
            </div>
          </div>
        </section>
      </main>

      <V3Footer />
      <BackToTop />
      <VersionSwitch current={3} />
    </>
  );
}
