import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Faq from "@/components/Faq";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/Reveal";
import RegisterButton from "@/components/RegisterButton";
import Footer from "@/components/Footer";
import TopStrip from "@/components/TopStrip";
import Person from "@/components/Person";
import HScroll from "@/components/HScroll";
import FadeImage from "@/components/FadeImage";
import KelasCoverImage from "@/components/KelasCover";
import { BackToTop, ParallaxBg, ScrollProgress } from "@/components/Extras";
import { site } from "@/data/site";
import { kelasList } from "@/data/kelas";
import { about, benefits, speakers, flow, news, faqs } from "@/data/konten";

// Kartu info yang menumpuk di tepi bawah hero
const strip = [
  { label: "Pelaksanaan", value: site.pelaksanaan },
  { label: "Format", value: site.format },
  { label: "Pendaftaran", value: site.tanggalPenutupan },
  { label: "Peserta", value: site.sasaranPeserta },
];

/** Garis lengkung konsentris tipis untuk sudut kartu CTA. */
function CtaArcs({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 250 250" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className={`pointer-events-none -z-10 opacity-[.28] ${className}`}>
      {[70, 92, 114, 136, 158].map((r) => (
        <circle key={r} cx="0" cy="0" r={r} />
      ))}
      <circle cx="40" cy="-10" r="190" />
    </svg>
  );
}

export default function Beranda() {
  return (
    <>
      <TopStrip />

      <ScrollProgress />
      <Navbar shrink />

      <main id="konten" className="fx">
        {/* HERO: foto Gedung Rektorat Unila + overlay ungu */}
        <section data-dark className="relative isolate min-h-[600px] overflow-hidden bg-esco-dark text-white md:min-h-0">
          <ParallaxBg>
            <Image
              src="/bg-hero.jpg"
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-[50%_45%]"
            />
          </ParallaxBg>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-esco-dark/95 via-esco-dark/80 to-esco-dark/50 md:via-esco-dark/70" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-esco-dark/90 via-transparent to-transparent" />
          <div className="wrap flex flex-wrap items-center gap-14 pb-36 pt-14 md:pb-[150px] md:pt-[88px]">
            <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-6">
              <div className="hero-in hero-in-1 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-esco-yellow px-4 py-[7px] text-[13px] font-bold text-esco-purple">{site.penyelenggara}</span>
              </div>
              <h1 className="hero-in hero-in-2 m-0 text-[38px] font-extrabold leading-[1.08] tracking-[-.02em] md:text-[56px]">{site.namaLengkap}</h1>
              <p className="hero-in hero-in-3 m-0 max-w-[520px] text-base text-esco-muted md:text-lg">{site.tagline}</p>
              <div className="hero-in hero-in-4 mt-2 flex flex-wrap gap-3.5">
                <RegisterButton className="!px-8 !py-4" />
                <a href="#kelas" className="btn-outline !px-8">Lihat Program</a>
              </div>
            </div>
          </div>
        </section>

        {/* KARTU INFO: menumpuk di tepi bawah hero (2x2 di mobile, 4 kolom di desktop) */}
        <div className="bg-white">
          <div className="wrap relative -top-16 -mb-16">
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
              {strip.map((s, i) => (
                <Reveal key={s.label} delay={i * 80}>
                  <div className="h-full min-w-0 rounded-[18px] border border-esco-line bg-white px-4 py-4 shadow-float md:px-6 md:py-[22px]">
                    <div className="text-[11px] font-bold uppercase tracking-[.1em] text-[#6b4a86] md:text-xs">{s.label}</div>
                    <div className="mt-1 text-sm font-bold text-esco-purple md:text-base">{s.value}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* TENTANG */}
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
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-esco-soft"><Image src="/kegiatan.jpg" alt="Peserta mengikuti kelas daring ESCO lewat video konferensi" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover object-[70%_50%]" /></div>
            </Reveal>
          </div>
        </section>

        {/* KELAS: 8 kelas (4 per tampilan di layar lebar), geser untuk melihat sisanya */}
        <section id="kelas" className="overflow-x-clip bg-esco-soft">
          <div className="wrap section-y flex flex-col gap-10">
            <HScroll
              label="Daftar kelas"
              step={300}
              header={
                <Reveal className="flex max-w-2xl flex-col gap-3">
                  <Eyebrow>Kelas</Eyebrow>
                  <h2 className="h2 m-0">Delapan kelas, satu program</h2>
                  <p className="m-0 text-base text-esco-text2">[Kelas diikuti lewat Virtual Class FKIP Unila setelah Anda mendaftar dan menerima NPM.]</p>
                </Reveal>
              }
            >
              {kelasList.map((k, i) => (
                <li key={k.slug} className="flex w-[82%] flex-none snap-start sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-3.75rem)/4)]">
                  <Reveal delay={Math.min(i, 3) * 80} className="flex w-full">
                    <Link href={`/kelas/${k.slug}`} className="group card card-hover relative flex w-full flex-col overflow-hidden !rounded-2xl text-esco-darker no-underline">
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 z-20 h-[3px] origin-left scale-x-0 bg-esco-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
                      <KelasCoverImage cover={k.cover} nomor={k.nomor} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 82vw" />
                      <div className="flex flex-1 flex-col gap-3 p-6">
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
                  </Reveal>
                </li>
              ))}
            </HScroll>
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

        {/* NARASUMBER: 8 pengajar (4 per tampilan di layar lebar), geser untuk melihat sisanya */}
        <section id="narasumber" className="overflow-x-clip bg-white">
          <div className="wrap section-y flex flex-col gap-10">
            <HScroll
              label="Daftar pengajar dan narasumber"
              autoScroll
              header={
                <Reveal className="flex max-w-2xl flex-col gap-3">
                  <Eyebrow>Narasumber</Eyebrow>
                  <h2 className="h2 m-0">Pengajar dan narasumber</h2>
                </Reveal>
              }
            >
              {speakers.map((s, i) => (
                <li key={i} className="flex w-[82%] flex-none snap-start sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] xl:w-[calc((100%-3.75rem)/4)]">
                  <Reveal delay={Math.min(i, 3) * 80} className="flex w-full">
                    <div className="group card card-hover relative flex h-full w-full flex-col gap-1.5 overflow-hidden !rounded-2xl p-5">
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-esco-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
                      {s.foto ? (
                        <span className="mb-3 block h-[88px] w-[88px] overflow-hidden rounded-full bg-esco-soft transition-transform duration-300 group-hover:scale-105">
                          <FadeImage src={s.foto} alt={s.name} width={88} height={88} className="h-full w-full object-cover mix-blend-multiply" />
                        </span>
                      ) : (
                        <div className="mb-3 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-esco-soft text-esco-accent transition-transform duration-300 group-hover:scale-105">
                          <Person className="h-9 w-9" />
                        </div>
                      )}
                      <h3 title={s.name} className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-extrabold leading-snug text-esco-dark">{s.name}</h3>
                      <p className="m-0 text-sm text-[#5a4a6c]">{s.org}</p>
                      <p className="m-0 mt-3 border-t border-esco-line pt-3 text-sm text-esco-darker">{s.topic}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </HScroll>
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

        {/* CTA: pita penuh bergradasi, teks di tengah, dua tombol pil, garis lengkung di sudut */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#FFD43B] via-[#FFCB2E] to-[#F5B82E] text-center text-esco-purple">
          <CtaArcs className="absolute left-0 top-0 h-[190px] w-[190px] md:h-[340px] md:w-[340px]" />
          <CtaArcs className="absolute bottom-0 right-0 h-[190px] w-[190px] rotate-180 md:h-[340px] md:w-[340px]" />
          <div className="wrap py-16 md:py-24">
            <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4">
              <h2 className="m-0 text-[30px] font-bold leading-[1.1] tracking-[-.01em] md:text-[48px]">Siap bergabung di ESCO?</h2>
              <p className="m-0 max-w-xl text-base font-medium leading-relaxed md:text-lg">[Satu kalimat alasan atau manfaat bergabung dengan program ini.]</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <RegisterButton variant="purple" className="!px-8 !py-4">
                  Daftar Sekarang <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </RegisterButton>
                <a href="#alur" className="group btn border-[1.5px] border-esco-purple !px-8 !py-4 text-esco-purple hover:bg-esco-purple/10">
                  Lihat alur <span aria-hidden="true" className="ml-2 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
