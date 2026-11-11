import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import V2Header from "@/components/v2/V2Header";
import V2Faq from "@/components/v2/V2Faq";
import VersionSwitch from "@/components/VersionSwitch";

export const metadata: Metadata = {
  title: "Versi 2 (perbandingan layout)",
  robots: { index: false },
};

/* Layout versi 2. Isi teks masih contoh/placeholder, fokus perbandingan tata letak. */

const chip = "text-xs font-extrabold uppercase tracking-widest text-brand-purple bg-brand-lightPurple px-3 py-1 rounded-md border border-purple-200";

const ticker = [
  { l: "Pelaksanaan", v: "15 Juli – 10 Agustus 2025", s: "Sesi Daring Sinkronus & Asinkronus", sc: "text-brand-muted" },
  { l: "Format Kegiatan", v: "Webinar & Virtual Class", s: "LMS Resmi FKIP Unila + Zoom", sc: "text-brand-muted" },
  { l: "Batas Pendaftaran", v: "30 Juni 2025", s: "Early Bird Kuota Terbatas", sc: "text-amber-600 font-semibold" },
  { l: "Sasaran Peserta", v: "Mahasiswa, Guru & Praktisi", s: "Terbuka Nasional & Internasional", sc: "text-brand-muted" },
];

const pillars = [
  { t: "Tujuan Pembelajaran", d: "Penguasaan pedagogi digital, integrasi AI secara etis dalam evaluasi pembelajaran, dan perancangan materi ajar multimodal.", bg: "bg-brand-lightPurple text-brand-purple", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { t: "Manfaat Langsung", d: "Sertifikat kelulusan 32 JP bernomor resmi, e-modul eksklusif, serta jejaring kolaborasi penelitian dan pengabdian institusi.", bg: "bg-amber-50 text-amber-700", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { t: "Penyelenggara Resmi", d: "Dikelola oleh Fakultas Keguruan dan Ilmu Pendidikan (FKIP), Universitas Lampung, dengan dukungan mitra akademisi global.", bg: "bg-purple-50 text-brand-purple", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
];

const kelas = [
  { slug: "ipa", n: "01", cat: "Sains & Matematika", t: "Inovasi Pembelajaran Sains & STEAM", d: "Pendekatan kurikulum sains terintegrasi, praktikum virtual berbasis simulasi komputer, dan asesmen berpikir kritis tingkat tinggi (HOTS)." },
  { slug: "bahasa", n: "02", cat: "Bahasa & Sastra", t: "Pengajaran Bahasa & Literasi Digital", d: "Metode komunikatif global, media multimodal untuk kelas bahasa Inggris dan Indonesia, serta strategi peningkatan daya baca kritis siswa." },
  { slug: "kelas-3", n: "03", cat: "Teknologi & EdTech", t: "Teknologi Edukasi & AI Terapan", d: "Pemanfaatan kecerdasan artifisial etis dalam otomatisasi evaluasi, perancangan modul interaktif, dan gamifikasi ruang belajar modern." },
  { slug: "kelas-4", n: "04", cat: "Manajemen Kurikulum", t: "Manajemen & Kepemimpinan Pendidikan", d: "Pengembangan kurikulum adaptif, tata kelola sekolah inklusif berbasis data, serta supervisi klinis untuk peningkatan mutu pengajaran." },
];

const benefits = [
  { t: "Belajar 100% Daring Fleksibel", d: "Akses materi, rekaman video, forum interaktif, dan kuis melalui LMS Virtual Class FKIP Unila yang responsif dari gawai apapun." },
  { t: "Sertifikat Resmi Bernomor", d: "Sertifikat kelulusan 32 JP resmi dengan verifikasi QR-Code yang ditandatangani oleh Dekan FKIP Universitas Lampung." },
  { t: "Narasumber & Pakar Ahli", d: "Belajar langsung dari guru besar, peneliti bereputasi internasional, serta praktisi senior yang berpengalaman di bidangnya." },
  { t: "Materi Pembelajaran Lengkap", d: "Paket bahan ajar, presentasi, panduan praktik (handout), dan e-book yang dapat diunduh untuk referensi jangka panjang." },
  { t: "Jejaring Peserta Lintas Wilayah", d: "Membangun relasi kolegial bersama ratusan mahasiswa dan pendidik dari berbagai perguruan tinggi negeri maupun swasta." },
  { t: "Mentoring Proyek & Publikasi", d: "Fasilitasi konsultasi penulisan artikel ilmiah serta bimbingan bagi karya proyek pendidikan yang berpotensi dipublikasikan." },
];

const speakers = [
  { i: "PS", tag: "KEYNOTE SPEAKER", n: "Prof. Dr. [Nama Narasumber], M.Si.", r: "Guru Besar FKIP Universitas Lampung", q: "\"[Topik yang dibawakan narasumber utama]\"", key: true, tagCls: "" },
  { i: "DR", tag: "NARASUMBER UTAMA", n: "Dr. [Nama Narasumber], M.Pd.", r: "Pakar Kurikulum & Kebijakan Pendidikan", q: "\"[Topik yang dibawakan]\"", key: false, tagCls: "bg-purple-50 text-brand-purple" },
  { i: "DA", tag: "NARASUMBER TEKNOLOGI", n: "Dr. [Nama Narasumber], M.Pd.", r: "Ketua Inovasi Pembelajaran Digital FKIP", q: "\"[Topik yang dibawakan]\"", key: false, tagCls: "bg-purple-50 text-brand-purple" },
  { i: "SJ", tag: "VISITING FELLOW", n: "[Nama Narasumber], Ph.D.", r: "Education Technology Specialist", q: "\"[Topik yang dibawakan]\"", key: false, tagCls: "bg-amber-50 text-amber-800" },
];

const steps = [
  { t: "Daftar Formulir", d: "Isi formulir online sebelum 30 Juni 2025 dan tentukan kelas peminatan sesuai fokus keahlian." },
  { t: "Terima Info Akses", d: "Dapatkan akun LMS Virtual Class Unila dan tautan ruang webinar melalui email terverifikasi." },
  { t: "Ikuti Sesi Webinar", d: "Hadir pada webinar terjadwal, pelajari modul asinkronus, serta berpartisipasi aktif dalam diskusi." },
  { t: "Dapatkan Sertifikat", d: "Selesaikan asesmen akhir dan unduh sertifikat bernomor 32 JP langsung dari akun Virtual Class." },
];

const news = [
  { d: "10 Juni 2025", t: "Pendaftaran Gelombang I Resmi Dibuka", x: "Pendaftaran peserta kategori mahasiswa S1/S2 dan pendidik telah dibuka secara daring dengan kuota khusus early bird." },
  { d: "05 Juni 2025", t: "Sosialisasi Teknis Penggunaan Platform Virtual Class", x: "Simak panduan video aktivasi kredensial LMS Unila dan tata cara presensi kehadiran webinar otomatis." },
  { d: "28 Mei 2025", t: "Jadwal Lengkap Webinar & Buku Panduan Program Rilis", x: "Unduh silabus terperinci masing-masing 4 kelas peminatan beserta biodata instruktur tamu." },
];

const faqs = [
  { q: "Siapa yang boleh mengikuti ESCO?", a: "Program ini terbuka untuk mahasiswa aktif jenjang S1/S2/S3, guru sekolah dasar hingga menengah, dosen muda, serta praktisi dan pegiat pendidikan yang ingin memperdalam pedagogi digital abad 21." },
  { q: "Apakah ada biaya pendaftaran kursus?", a: "[Jawaban tentang biaya pendaftaran. Menunggu keputusan panitia.]" },
  { q: "Apakah peserta akan mendapat sertifikat resmi?", a: "[Jawaban tentang sertifikat, syarat kehadiran, dan tugas. Menunggu keputusan panitia.]" },
  { q: "Bagaimana cara masuk ke Virtual Class Unila?", a: "[Jawaban tentang akses akun Virtual Class Unila. Menunggu keputusan panitia.]" },
  { q: "Bagaimana jika saya berhalangan hadir di suatu sesi webinar?", a: "[Jawaban tentang rekaman atau sesi pengganti. Menunggu keputusan panitia.]" },
];

const Check = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path clipRule="evenodd" fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
  </svg>
);

export default function Versi2() {
  return (
    <>
      <aside className="border-b border-purple-900/40 bg-brand-deep px-4 py-2 text-xs font-medium text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="flex items-center space-x-2">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-brand-yellow" aria-hidden="true" />
            <span>Fakultas Keguruan dan Ilmu Pendidikan • Universitas Lampung</span>
            <span className="hidden text-purple-300 md:inline">|</span>
            <span className="hidden text-purple-200 md:inline">Pendaftaran Gelombang I Dibuka Hingga 30 Juli 2025</span>
          </div>
          <a href="#alur" className="flex items-center gap-1 font-semibold text-brand-yellow hover:underline">
            <span>Panduan Pendaftaran</span>
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
          </a>
        </div>
      </aside>

      <V2Header />

      <main id="konten" className="bg-white text-brand-dark">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-bgLight via-white to-white pb-20 pt-12 lg:pb-24 lg:pt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
              <div className="flex flex-col space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 self-start rounded-full border border-purple-200 bg-brand-lightPurple px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-purple">
                  <span className="h-2 w-2 rounded-full bg-brand-purple" aria-hidden="true" />
                  FKIP UNIVERSITAS LAMPUNG • SUMMER COURSE 2025
                </div>
                <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-brand-deep sm:text-5xl lg:text-6xl">Education Summer Course Online</h1>
                <p className="max-w-2xl text-base leading-relaxed text-brand-muted sm:text-lg">
                  Program kursus musim panas dari FKIP Unila. Dirancang bagi mahasiswa, guru, dan praktisi pendidikan untuk mendalami inovasi pedagogi digital, literasi sains, dan pengajaran bahasa interaktif.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/daftar" className="flex items-center justify-center gap-2 rounded-lg bg-brand-yellow px-7 py-3.5 text-base font-bold text-brand-deep shadow-md transition-all duration-200 hover:bg-brand-yellowHover hover:shadow-lg">
                    <span>Daftar Sekarang</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg>
                  </Link>
                  <a href="#kelas" className="flex items-center justify-center gap-2 rounded-lg border border-brand-border bg-white px-6 py-3.5 text-base font-semibold text-brand-deep transition-colors hover:bg-purple-50">
                    <svg className="h-4 w-4 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                    <span>Lihat Silabus &amp; Program</span>
                  </a>
                </div>
                <div className="border-t border-brand-border pt-6">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-brand-muted sm:text-sm">
                    {["100% Daring Fleksibel", "32 JP Bersertifikat Resmi", "4 Topik Unggulan"].map((x, i) => (
                      <span key={x} className="flex items-center gap-x-6">
                        {i > 0 && <span className="hidden text-gray-300 sm:inline" aria-hidden="true">•</span>}
                        <span className="flex items-center gap-1.5 text-brand-deep">
                          <svg className="h-4 w-4 text-brand-purple" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path clipRule="evenodd" fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                          {x}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative lg:col-span-5">
                <div className="group relative overflow-hidden rounded-2xl border border-brand-border bg-white shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/v2-hero.jpg" alt="Mahasiswa berdiskusi dengan laptop di perpustakaan kampus" className="h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[460px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/60 bg-white/95 p-4 shadow-lg backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-xs font-bold uppercase tracking-wider text-brand-purple">LMS Interaktif Terpadu</span>
                        <p className="m-0 text-sm font-bold text-brand-dark">Virtual Class FKIP Unila</p>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                        <span className="text-[11px] font-bold text-emerald-800">Pendaftaran Dibuka</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 -top-4 -z-10 h-48 w-48 rounded-2xl bg-purple-100" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <section className="border-y border-brand-border bg-brand-bgLight py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 divide-y divide-brand-border sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4 lg:gap-8">
              {ticker.map((t) => (
                <div key={t.l} className="flex flex-col pt-3 sm:px-4 sm:pt-0 first:pl-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">{t.l}</span>
                  <p className="m-0 mt-1 text-base font-bold text-brand-deep">{t.v}</p>
                  <span className={`mt-0.5 text-xs ${t.sc}`}>{t.s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROGRAM UTAMA */}
        <section id="program" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-gradient-to-br from-brand-lightPurple to-white p-8 lg:p-12">
              <div className="max-w-3xl">
                <span className="rounded-md border border-purple-200 bg-white px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-brand-purple">PROGRAM UTAMA</span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-brand-deep sm:text-4xl">Transformasi Pendidikan &amp; Pedagogi Digital Abad 21</h2>
                <p className="mt-3 text-base leading-relaxed text-brand-muted sm:text-lg">
                  Mempersiapkan pendidik masa depan yang responsif terhadap dinamika kecerdasan buatan, teknologi interaktif, dan keberagaman gaya belajar global. Menghadirkan wawasan praktis yang siap diterapkan di ruang kelas.
                </p>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                {pillars.map((p) => (
                  <div key={p.t} className="academic-card rounded-xl border border-brand-border bg-white p-6">
                    <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${p.bg}`}>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d={p.icon} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                    </div>
                    <h3 className="text-base font-bold text-brand-dark">{p.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-muted">{p.d}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-purple-200/60 pt-6 text-xs font-semibold text-brand-muted">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  {["12 Sesi Webinar Sinkronus", "4 Workshop Interaktif Mandiri", "Bimbingan Intensif Dosen Pakar"].map((x) => (
                    <span key={x} className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-yellow" aria-hidden="true" /> {x}</span>
                  ))}
                </div>
                <span className="font-bold tracking-wide text-brand-purple">Batch I - Tahun Ajaran 2024/2025</span>
              </div>
            </div>
          </div>
        </section>

        {/* KELAS */}
        <section id="kelas" className="bg-brand-bgLight py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className={chip}>KURIKULUM &amp; PEMINATAN</span>
              <h2 className="mt-3 text-3xl font-extrabold text-brand-deep sm:text-4xl">Kelas yang Tersedia di ESCO</h2>
              <p className="mt-2 text-base text-brand-muted">Pilih konsentrasi kelas kursus sesuai bidang minat, kebutuhan pengembangan profesi, dan kepakaran akademik Anda.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {kelas.map((k) => (
                <article key={k.slug} className="academic-card relative flex flex-col rounded-xl border border-brand-border bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-md bg-brand-yellow px-2.5 py-1 text-xs font-black text-brand-deep">{k.n}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">{k.cat}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold leading-snug text-brand-dark">{k.t}</h3>
                  <p className="mb-6 flex-grow text-xs leading-relaxed text-brand-muted">{k.d}</p>
                  <div className="mt-auto border-t border-brand-border pt-4">
                    <div className="mb-3 flex items-center justify-between text-xs text-brand-muted">
                      <span>Beban: <strong>16 JP</strong></span>
                      <span>4 Webinar</span>
                    </div>
                    <Link href={`/kelas/${k.slug}`} className="group inline-flex items-center gap-1 text-xs font-bold text-brand-purple hover:text-brand-deep">
                      <span>Selengkapnya</span>
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFIT */}
        <section className="bg-brand-deep py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 max-w-3xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-yellow">BENEFIT PROGRAM</span>
              <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Yang Anda Dapatkan di ESCO</h2>
              <p className="mt-2 text-base text-purple-200">Standar keunggulan akademik FKIP Universitas Lampung dikemas secara komprehensif untuk menunjang portofolio profesional Anda.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((b) => (
                <div key={b.t} className="rounded-xl border border-purple-800/70 bg-purple-950/60 p-6 transition-colors hover:border-brand-yellow/60">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-yellow font-black text-brand-deep"><Check /></div>
                  <h3 className="mb-2 text-lg font-bold text-white">{b.t}</h3>
                  <p className="text-sm leading-relaxed text-purple-200">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NARASUMBER */}
        <section id="narasumber" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <span className={chip}>DOSEN DAN NARASUMBER</span>
              <h2 className="mt-3 text-3xl font-extrabold text-brand-deep sm:text-4xl">Belajar Langsung dari Para Pengajar</h2>
              <p className="mt-2 text-base text-brand-muted">Didampingi oleh akademisi senior dan pakar pendidikan bereputasi tinggi dengan pengalaman riset komprehensif.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {speakers.map((s) =>
                s.key ? (
                  <div key={s.i} className="relative flex flex-col items-center overflow-hidden rounded-xl bg-brand-deep p-6 text-center text-white shadow-md">
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-brand-yellow/80 bg-brand-purple text-2xl font-bold text-brand-yellow shadow">{s.i}</div>
                    <span className="mb-2 rounded-full bg-brand-yellow px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-brand-deep">{s.tag}</span>
                    <h3 className="mt-1 text-base font-bold text-white">{s.n}</h3>
                    <p className="mt-1 text-xs text-purple-200">{s.r}</p>
                    <p className="mt-3 border-t border-purple-800/80 pt-3 text-xs italic text-purple-300">{s.q}</p>
                  </div>
                ) : (
                  <div key={s.i} className="academic-card flex flex-col items-center rounded-xl border border-brand-border bg-white p-6 text-center">
                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-purple-200 bg-brand-lightPurple text-2xl font-bold text-brand-purple">{s.i}</div>
                    <span className={`mb-2 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${s.tagCls}`}>{s.tag}</span>
                    <h3 className="mt-1 text-base font-bold text-brand-dark">{s.n}</h3>
                    <p className="mt-1 text-xs text-brand-muted">{s.r}</p>
                    <p className="mt-3 border-t border-brand-border pt-3 text-xs italic text-brand-muted">{s.q}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ALUR */}
        <section id="alur" className="border-t border-brand-border bg-brand-bgLight py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className={chip}>ALUR MENGIKUTI ESCO</span>
              <h2 className="mt-3 text-3xl font-extrabold text-brand-deep sm:text-4xl">Empat Langkah Mudah</h2>
              <p className="mt-2 text-base text-brand-muted">Tahapan pendaftaran hingga perolehan sertifikat kelulusan kursus musim panas resmi.</p>
            </div>
            <ol className="relative m-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.t} className="relative z-10 flex flex-col items-center text-center">
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full text-xl font-extrabold shadow ${i === 3 ? "bg-brand-yellow text-brand-deep ring-4 ring-purple-100" : "bg-brand-deep text-brand-yellow"}`}>{i + 1}</div>
                  <h3 className="text-base font-bold text-brand-dark">{s.t}</h3>
                  <p className="mt-2 max-w-xs text-xs leading-relaxed text-brand-muted">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* PENGUMUMAN + KONTAK */}
        <section id="pengumuman" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <div className="mb-8">
                  <span className={chip}>PENGUMUMAN</span>
                  <h2 className="mt-3 text-3xl font-extrabold text-brand-deep">Kabar Terbaru ESCO</h2>
                  <p className="mt-1 text-sm text-brand-muted">Informasi penting terkait jadwal seleksi, platform, dan silabus kegiatan.</p>
                </div>
                <div className="space-y-4">
                  {news.map((n) => (
                    <a key={n.t} href="#" className="group block rounded-xl border border-brand-border p-5 transition-all hover:border-brand-purple hover:bg-brand-bgLight">
                      <div className="mb-1.5 flex items-center justify-between text-xs text-brand-muted">
                        <span className="font-bold text-brand-purple">{n.d}</span>
                        <span className="inline-flex items-center font-semibold text-brand-deep transition-transform group-hover:translate-x-1">Baca rincian →</span>
                      </div>
                      <h3 className="text-base font-bold text-brand-dark transition-colors group-hover:text-brand-purple">{n.t}</h3>
                      <p className="mt-1 text-xs text-brand-muted">{n.x}</p>
                    </a>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-purple-800 bg-brand-deep p-8 text-white shadow-xl">
                  <div>
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple text-brand-yellow">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                    </div>
                    <h3 className="text-2xl font-black text-white">Ada Pertanyaan Seputar ESCO?</h3>
                    <p className="mt-3 text-sm leading-relaxed text-purple-200">Tim kesekretariatan panitia siap membantu kebutuhan pendaftaran, surat tugas delegasi kampus, hingga kolaborasi institusi.</p>
                    <div className="mt-8 space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-brand-purple/70 text-brand-yellow">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z" /></svg>
                        </div>
                        <div>
                          <span className="block text-xs font-semibold uppercase text-purple-300">Nomor WhatsApp Panitia</span>
                          <span className="text-sm font-bold text-brand-yellow">[Nomor WhatsApp panitia]</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded bg-brand-purple/70 text-brand-yellow">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                        </div>
                        <div>
                          <span className="block text-xs font-semibold uppercase text-purple-300">Email Resmi Helpdesk</span>
                          <span className="text-sm font-bold text-white">[Email panitia]</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-purple-800 pt-4 text-[11px] text-purple-300">Layanan respons aktif: Senin – Jumat (08.00 – 16.00 WIB)</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-brand-deep py-20 text-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-yellow">FAQ</span>
              <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Pertanyaan yang Sering Diajukan</h2>
              <p className="mt-2 text-sm text-purple-200">Temukan jawaban cepat seputar penyelenggaraan, syarat peserta, dan platform belajar ESCO.</p>
            </div>
            <V2Faq items={faqs} />
            <div className="mt-8 text-center">
              <p className="text-xs text-purple-300">Tidak menemukan jawaban yang Anda cari? Hubungi helpdesk kami melalui <span className="font-bold text-brand-yellow underline">[Email panitia]</span></p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-brand-yellow py-14 text-brand-deep">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div className="max-w-2xl text-center lg:text-left">
                <h2 className="text-3xl font-black tracking-tight text-brand-deep sm:text-4xl">Jadilah Bagian dari ESCO FKIP Unila</h2>
                <p className="mt-2 text-base font-medium text-brand-deep/85">Perluas wawasan pedagogi global dan bangun jejaring akademik bersama ratusan pendidik lainnya. Pendaftaran ditutup pada <strong className="underline">[TANGGAL PENUTUPAN]</strong>. Kuota terbatas!</p>
              </div>
              <Link href="/daftar" className="inline-flex flex-shrink-0 items-center justify-center rounded-xl bg-brand-deep px-8 py-4 text-base font-extrabold text-brand-yellow shadow-lg transition-all duration-200 hover:bg-brand-purple hover:shadow-xl active:scale-95">
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-purple-900 bg-[#270B38] pb-12 pt-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 border-b border-purple-900/60 pb-12 md:grid-cols-2 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-4">
              <div className="self-start rounded-[14px] bg-white px-3.5 py-2.5 inline-block">
                <Image src="/esco-logo.png" alt="ESCO Unila" width={157} height={52} className="h-[44px] w-auto" />
              </div>
              <p className="pr-4 text-xs leading-relaxed text-purple-300">Program kursus musim panas daring yang diselenggarakan oleh Fakultas Keguruan dan Ilmu Pendidikan, Universitas Lampung.</p>
            </div>
            <div className="space-y-3 lg:col-span-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Sekretariat</h4>
              <address className="space-y-1 text-xs not-italic leading-relaxed text-purple-200">
                <p>[Alamat lengkap FKIP Unila]</p>
              </address>
            </div>
            <div className="space-y-3 lg:col-span-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Link Cepat</h4>
              <ul className="m-0 list-none space-y-2 p-0 text-xs text-purple-300">
                <li><Link href="/v2" className="hover:text-brand-yellow">Beranda</Link></li>
                <li><a href="#alur" className="hover:text-brand-yellow">Panduan Pendaftaran</a></li>
                <li><a href="#kelas" className="hover:text-brand-yellow">Silabus &amp; Topik</a></li>
                <li><a href="#faq" className="hover:text-brand-yellow">FAQ</a></li>
              </ul>
            </div>
            <div className="space-y-3 lg:col-span-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Media Sosial &amp; Kontak</h4>
              <ul className="m-0 list-none space-y-2 p-0 text-xs text-purple-300">
                <li><span className="block text-[10px] font-bold uppercase text-purple-400">Email Informasi:</span><span className="text-white">[Email panitia]</span></li>
                <li><span className="block text-[10px] font-bold uppercase text-purple-400">Instagram:</span><span className="text-white">[Instagram]</span></li>
                <li><span className="block text-[10px] font-bold uppercase text-purple-400">YouTube:</span><span className="text-white">[YouTube]</span></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-purple-400 sm:flex-row">
            <p>[Hak cipta ESCO FKIP Universitas Lampung]</p>
            <div className="flex items-center space-x-6 text-[11px]">
              <span>Kebijakan Privasi</span>
              <span>Syarat &amp; Ketentuan</span>
            </div>
          </div>
        </div>
      </footer>

      <VersionSwitch current={2} />
    </>
  );
}
