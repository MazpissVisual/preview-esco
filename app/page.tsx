import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import ClassCard from "@/components/ClassCard";
import SpeakerCard from "@/components/SpeakerCard";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import VersionSwitch from "@/components/VersionSwitch";
import RegisterButton from "@/components/RegisterButton";
import { site } from "@/data/site";
import { kelasList } from "@/data/kelas";
import { about, benefits, speakers, flow, news, faqs } from "@/data/konten";

const strip = [
  { label: "Pelaksanaan", value: `${site.tanggalMulai} – ${site.tanggalSelesai}` },
  { label: "Format", value: "Webinar (Virtual Class Unila)" },
  { label: "Pendaftaran", value: `Sampai ${site.tanggalPenutupan}` },
  { label: "Peserta", value: site.sasaranPeserta },
];

function Check({ color = "#3D1160", size = 22, w = 3 }: { color?: string; size?: number; w?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="5 12 10 17 19 7" />
    </svg>
  );
}

export default function Beranda() {
  return (
    <>
      <Navbar />
      <main id="konten">
        {/* HERO: gambar dijadikan duotone ungu (blend luminosity di atas ungu gelap) + gradasi untuk teks */}
        <section data-dark className="relative isolate min-h-[600px] overflow-hidden bg-esco-dark text-white md:min-h-0">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-[72%_20%] opacity-[.55] mix-blend-luminosity md:object-[70%_center]"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-esco-dark via-esco-dark/80 to-esco-dark/20 md:via-esco-dark/70" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-esco-dark/90 via-transparent to-transparent" />
          <div aria-hidden="true" className="absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-esco-yellow/20 blur-3xl" />
          <div className="wrap flex flex-wrap items-center gap-14 pb-36 pt-14 md:pb-[150px] md:pt-[88px]">
            <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-6">
              <div className="hero-in hero-in-1 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-esco-yellow px-4 py-[7px] text-[13px] font-bold text-esco-purple">{site.penyelenggara}</span>
              </div>
              <h1 className="hero-in hero-in-2 m-0 text-[38px] font-extrabold leading-[1.08] tracking-[-.02em] md:text-[56px]">{site.namaLengkap}</h1>
              <p className="hero-in hero-in-3 m-0 max-w-[520px] text-base text-esco-muted md:text-lg">{site.tagline}</p>
              <div className="hero-in hero-in-4 mt-2 flex flex-wrap gap-3.5">
                <RegisterButton className="!px-8 !py-4" />
                <a href="#program" className="btn-outline !px-8">Lihat Program</a>
              </div>
            </div>
          </div>
        </section>

        {/* INFO CARDS: 2×2 di mobile, 4 kolom di desktop */}
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
          <div className="wrap flex flex-wrap items-center gap-14 pb-20 pt-14 md:pb-24">
            <Reveal className="relative min-w-0 flex-[1_1_440px]">
              <div className="placeholder-img h-[300px] rounded-3xl md:h-[380px]">[Foto kegiatan / ilustrasi]</div>
              <div className="absolute -bottom-7 right-3 rounded-[20px] bg-esco-purple px-6 py-5 text-white shadow-float md:-right-3">
                <div className="text-[40px] font-extrabold leading-none text-esco-yellow">{about.angka}</div>
                <div className="text-[13px] text-[#e6d9f0]">{about.angkaKet}</div>
              </div>
            </Reveal>
            <Reveal delay={120} className="flex min-w-0 flex-[1_1_440px] flex-col gap-[18px]">
              <Eyebrow>Tentang ESCO</Eyebrow>
              <h2 className="h2 m-0">Kelas musim panas daring pertama FKIP Unila</h2>
              {about.paragraf.map((p, i) => (
                <p key={i} className="m-0 text-esco-text2">{p}</p>
              ))}
              <div className="mt-1.5 flex flex-wrap gap-4">
                {about.poin.map((a) => (
                  <div key={a.title} className="min-w-0 flex-[1_1_150px] border-l-[3px] border-esco-gold pl-3.5">
                    <div className="font-bold">{a.title}</div>
                    <div className="text-[15px] text-[#5a4a6c]">{a.text}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* PROGRAM: carousel geser di mobile, grid di layar lebar */}
        <section id="program" className="bg-esco-soft">
          <div className="wrap section-y flex flex-col gap-10">
            <Reveal className="flex max-w-[640px] flex-col gap-3">
              <Eyebrow>Program dan kegiatan</Eyebrow>
              <h2 className="h2 m-0">Kelas yang tersedia di ESCO</h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
                {kelasList.map((k) => (
                  <ClassCard key={k.slug} k={k} />
                ))}
              </div>
              <p className="m-0 mt-1 text-center text-xs text-[#6f5a85] sm:hidden" aria-hidden="true">Geser untuk melihat kelas lainnya →</p>
            </Reveal>
          </div>
        </section>

        {/* BENEFIT */}
        <section id="benefit" data-dark className="bg-esco-dark text-white">
          <div className="wrap section-y flex flex-col gap-10">
            <Reveal className="flex max-w-[640px] flex-col gap-3">
              <Eyebrow light>Benefit program</Eyebrow>
              <h2 className="m-0 text-[28px] font-extrabold leading-[1.15] md:text-[38px]">Yang Anda dapatkan di ESCO</h2>
            </Reveal>
            <div className="flex flex-wrap gap-5">
              {benefits.map((b, i) => (
                <Reveal key={i} delay={(i % 3) * 90} className="flex min-w-0 flex-[1_1_320px]">
                  <div className="card-hover flex w-full flex-col gap-3 rounded-[22px] border border-esco-cardline bg-esco-card p-7 hover:border-[#8a5fb0]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-esco-yellow"><Check /></div>
                    <div className="text-lg font-extrabold">{b.title}</div>
                    <div className="text-[15px] text-[#e6d9f0]">{b.text}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* NARASUMBER */}
        <section id="narasumber" className="bg-white">
          <div className="wrap section-y flex flex-col gap-10">
            <Reveal className="flex max-w-[640px] flex-col gap-3">
              <Eyebrow>Dosen dan narasumber</Eyebrow>
              <h2 className="h2 m-0">Belajar langsung dari para pengajar</h2>
            </Reveal>
            <div className="flex flex-wrap gap-5">
              {speakers.map((s, i) => (
                <Reveal key={i} delay={i * 90} className="flex min-w-0 flex-[1_1_240px]">
                  <SpeakerCard s={s} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ALUR: timeline dengan garis penghubung */}
        <section id="alur" className="bg-esco-soft">
          <div className="wrap section-y flex flex-col gap-12">
            <Reveal className="flex max-w-[640px] flex-col gap-3">
              <Eyebrow>Alur mengikuti ESCO</Eyebrow>
              <h2 className="h2 m-0">Empat langkah mudah</h2>
            </Reveal>
            <ol className="relative m-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-4 md:gap-6">
              {/* garis penghubung: vertikal di mobile, horizontal di desktop */}
              <span aria-hidden="true" className="absolute bottom-6 left-6 top-6 w-0.5 bg-[repeating-linear-gradient(to_bottom,#cdbbdc_0_6px,transparent_6px_12px)] md:bottom-auto md:left-[12%] md:right-[12%] md:top-6 md:h-0.5 md:w-auto md:bg-[repeating-linear-gradient(to_right,#cdbbdc_0_6px,transparent_6px_12px)]" />
              {flow.map((f, i) => (
                <li key={f.n} className="relative md:text-center">
                  <Reveal delay={i * 120} className="flex gap-5 md:h-full md:flex-col md:items-center md:gap-4">
                    <div className="relative z-10 flex h-12 w-12 flex-none items-center justify-center rounded-full border-4 border-esco-soft bg-esco-purple text-lg font-extrabold text-esco-yellow shadow-float">{f.n}</div>
                    <div className="card card-hover min-w-0 flex-1 p-5 md:w-full md:flex-none">
                      <div className="text-lg font-extrabold text-esco-dark">{f.title}</div>
                      <div className="mt-1.5 text-[15px] text-[#5a4a6c]">{f.text}</div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PENGUMUMAN + KONTAK */}
        <section id="pengumuman" className="bg-white">
          <div className="wrap section-y flex flex-wrap items-start gap-10">
            <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-7">
              <Reveal className="flex flex-col gap-3">
                <Eyebrow>Pengumuman</Eyebrow>
                <h2 className="h2 m-0">Kabar terbaru ESCO</h2>
              </Reveal>
              <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                {news.map((n, i) => (
                  <li key={i}>
                    <Reveal delay={i * 90}>
                      <div className="card-hover group flex flex-wrap items-center gap-[18px] rounded-[18px] border border-esco-line px-6 py-5 hover:border-[#cdbbdc]">
                        <div className="flex-[0_0_96px] rounded-[14px] bg-esco-soft p-2.5 text-center text-[13px] font-bold text-esco-purple">{n.date}</div>
                        <div className="min-w-0 flex-[1_1_220px]">
                          <div className="font-bold text-esco-dark">{n.title}</div>
                          <div className="text-[15px] text-[#5a4a6c]">{n.text}</div>
                        </div>
                        <div aria-hidden="true" className="text-sm font-bold text-esco-purple transition-transform duration-200 group-hover:translate-x-1">→</div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
            <Reveal delay={150} className="min-w-0 flex-[1_1_300px]">
              <div data-dark className="flex flex-col gap-3.5 rounded-3xl bg-esco-purple p-8 text-white">
                <div className="text-[22px] font-extrabold">Ada pertanyaan seputar ESCO?</div>
                <div className="text-[15px] text-[#e6d9f0]">[Hubungi panitia lewat WhatsApp atau email.]</div>
                <div className="font-bold text-esco-yellow">{site.kontak.whatsapp}</div>
                <div className="font-bold text-esco-yellow">{site.kontak.email}</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" data-dark className="bg-esco-dark text-white">
          <div className="wrap section-y flex flex-wrap items-start gap-14">
            <Reveal className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
              <Eyebrow light>FAQ</Eyebrow>
              <h2 className="m-0 text-[28px] font-extrabold leading-[1.15] md:text-[38px]">Pertanyaan yang sering diajukan</h2>
              <p className="m-0 text-esco-muted">[Tidak menemukan jawabannya? Hubungi panitia.]</p>
            </Reveal>
            <Reveal delay={120} className="min-w-0 flex-[2_1_520px]">
              <Faq items={faqs} />
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-esco-yellow text-esco-purple">
          <Reveal>
            <div className="wrap flex flex-wrap items-center justify-between gap-7 py-14 md:py-16">
              <div className="min-w-0 flex-[1_1_440px]">
                <div className="text-[26px] font-extrabold leading-[1.15] md:text-[34px]">Jadilah bagian dari ESCO FKIP Unila</div>
                <div className="mt-2 text-base font-medium">Pendaftaran ditutup pada {site.tanggalPenutupan}. Kuota terbatas.</div>
              </div>
              <RegisterButton variant="purple" className="!px-9 !py-[18px] !text-base" />
            </div>
          </Reveal>
        </section>
      </main>
      <Footer showAddress />
      <VersionSwitch current={1} />
    </>
  );
}
