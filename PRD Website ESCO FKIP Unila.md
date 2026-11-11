# PRD Website ESCO FKIP Unila

Nov 10, 2026 · @ica

## Ringkasan Produk

Website resmi ESCO (Education Summer Course Online) FKIP Universitas Lampung adalah situs informasi satu pintu untuk angkatan perdana, dengan tombol pendaftaran yang menulis data ke Google Sheets lewat Apps Script. Kegiatan belajar berlangsung sebagai webinar di Virtual Class Unila, bukan di website ini.

Hasil akhir versi pertama: situs statis responsif dengan tiga jenis halaman (Beranda, Detail Kelas, Pendaftaran) dan identitas visual ungu-emas dari logo ESCO.

## Latar Belakang dan Tujuan

FKIP Universitas Lampung menyelenggarakan Education Summer Course Online (ESCO) untuk pertama kalinya. Panitia membutuhkan satu situs resmi yang menjadi sumber informasi program dan pintu pendaftaran peserta, tanpa membangun sistem pembelajaran sendiri karena kegiatan belajar memakai Virtual Class Unila.

**Tujuan**

- Menyajikan informasi program, kelas, pengajar, benefit, pengumuman, dan FAQ dalam satu tempat.
- Mengumpulkan data pendaftar secara rapi ke Google Sheets lewat formulir di situs.
- Mengarahkan peserta terdaftar ke Virtual Class Unila melalui informasi akses yang dikirim panitia.
- Tampil konsisten dengan logo ESCO dan nyaman dibuka dari ponsel.

**Indikator keberhasilan**

- Calon peserta menemukan jadwal, kelas, dan tombol Daftar dalam kurang dari satu menit.
- Formulir berhasil menulis satu baris per pendaftar ke Sheets tanpa duplikat.
- Panitia dapat mengganti teks dan tanggal tanpa mengubah struktur halaman.

## Pengguna dan Kebutuhan

| Pengguna | Kebutuhan utama | Dilayani oleh |
| --- | --- | --- |
| Calon peserta (mahasiswa, guru, umum; target final menunggu panitia) | Memahami program, memilih kelas, mendaftar dari ponsel | Beranda, Detail Kelas, Pendaftaran |
| Peserta terdaftar | Tahu jadwal webinar dan cara masuk Virtual Class Unila | Email konfirmasi, Detail Kelas, FAQ |
| Panitia ESCO | Menerima data pendaftar rapi, mengubah konten, menutup pendaftaran saat kuota penuh | Google Sheets, Apps Script, berkas konten |
| Dosen dan narasumber | Profil mereka tampil benar | Section Narasumber dan Detail Kelas |

**Perjalanan utama peserta**

1. Membuka beranda, membaca tentang program dan benefit.
2. Melihat kartu kelas, membuka Detail Kelas lewat Selengkapnya.
3. Menekan Daftar Sekarang, mengisi formulir, dan melihat pesan berhasil.
4. Menerima email konfirmasi berisi info akses Virtual Class Unila.
5. Mengikuti webinar sesuai jadwal di Virtual Class Unila.

## Ruang Lingkup

**Termasuk (versi 1)**

- Beranda dengan section: hero, strip info, Tentang, Benefit, Program (4 kelas), Narasumber, Alur belajar, Pengumuman, FAQ, footer.
- Satu template Detail Kelas yang dipakai untuk 4 kelas dengan data berbeda.
- Halaman Pendaftaran dengan formulir, langkah, info pendaftaran, dan state berhasil atau gagal.
- Versi desktop dan mobile untuk semua halaman.
- Backend Google Apps Script yang menyimpan data ke Google Sheets dan mengirim email konfirmasi.

**Tidak termasuk**

- Sistem pembelajaran, login peserta, atau unggah materi: semuanya di Virtual Class Unila.
- Section Jadwal dan Materi per sesi di beranda (dihapus dari desain); jadwal webinar tampil di Detail Kelas.
- Section Dokumentasi: ditambahkan setelah acara berlangsung.
- Pembayaran online, sertifikat otomatis, dan dashboard admin.
- Multi-bahasa.

## Sitemap dan Struktur Halaman

| Halaman | Rute | Keterangan |
| --- | --- | --- |
| Beranda | `/` | Satu halaman dengan section berurutan; semua tombol Daftar menuju Pendaftaran |
| Detail Kelas | `/kelas/[slug]` | Satu template, isi diambil dari data 4 kelas |
| Pendaftaran | `/daftar` | Formulir, langkah, info kuota, state berhasil dan gagal |

Setiap halaman responsif: desktop 1280 px dan mobile 390 px, dengan navbar berlogo dan footer yang sama.

&#91;embedded content: sitemap · 3 halaman + 2 layanan eksternal\]

Beranda menuju Detail Kelas lewat Selengkapnya dan menuju Pendaftaran lewat Daftar Sekarang; kelas sendiri berjalan di Virtual Class Unila.

## Kebutuhan Fungsional per Halaman

Teks dalam \[kurung siku\] adalah placeholder yang diisi panitia; letakkan semua teks di satu berkas data agar mudah diganti.

**Beranda (`/`)**

- Navbar: logo ESCO, menu anchor ke section, tombol kuning Daftar Sekarang; di mobile menjadi menu hamburger.
- Hero gelap: judul, deskripsi singkat, tombol Daftar dan tombol lihat program, label Angkatan Perdana.
- Strip info: tanggal pelaksanaan, format webinar, platform Virtual Class Unila, batas pendaftaran.
- Tentang, Benefit program (kartu ikon), Program (4 kartu kelas dengan tombol Selengkapnya ke Detail Kelas).
- Narasumber (kartu foto, nama, instansi; kartu pertama gelap), Alur belajar (daftar, terima info akses, webinar), Pengumuman (daftar kartu berita).
- FAQ berbentuk akordeon: satu item terbuka pada satu waktu, bisa dioperasikan keyboard dan memakai atribut aria-expanded.
- Footer gelap: logo, kontak, media sosial, hak cipta.
- Section Jadwal dan Materi tidak ada; Dokumentasi menyusul setelah acara.

**Detail Kelas (`/kelas/[slug]`)**

- Header gelap dengan lencana Kelas 0N, nama, deskripsi, dan chip durasi, jumlah webinar, platform.
- Konten: Gambaran kelas, Yang akan dipelajari (kartu centang), Jadwal webinar (daftar sesi bernomor dengan tanggal), Dosen dan narasumber.
- Kartu samping lengket: gambar, ringkasan (durasi, pertemuan, format, platform, kuota, batas daftar), catatan akses Virtual Class, tombol Daftar Kelas Ini, kontak bantuan.
- Bagian Kelas lainnya menampilkan tiga kelas selain yang dibuka.
- Satu berkas data (`data/kelas.ts`) memuat 4 kelas; parameter rute `[slug]` memilih kelas, dan slug tak dikenal menampilkan halaman not-found dengan tautan ke Beranda.

**Pendaftaran (`/daftar`)**

- Tiga langkah: isi formulir, terima info akses Virtual Class Unila, ikuti webinar.
- Kolom: nama lengkap, NPM atau NIK, email aktif, nomor WhatsApp, asal institusi, program studi, semester, pilihan kelas, motivasi, persetujuan.
- Kartu samping: penutupan, kuota, tanggal pelaksanaan, kontak bantuan.
- State setelah kirim: tombol menjadi Mengirim dan dinonaktifkan, lalu muncul kartu Pendaftaran berhasil atau Pendaftaran gagal dengan tombol Coba lagi; data isian tidak hilang saat gagal.
- Parameter `?kelas=` pada URL memilih kelas di dropdown otomatis.

## Alur Pendaftaran dan Integrasi Apps Script

&#91;embedded content: alur pendaftaran · 7 langkah, 1 keputusan\]

Data divalidasi dua kali, di browser dan di server; hanya yang lolos cek duplikat dan kuota ditulis ke Sheets.

**Payload (JSON) dari formulir**

`nama`, `npm`, `email`, `wa`, `institusi`, `prodi`, `semester`, `kelas`, `motivasi`, `setuju`, ditambah `timestamp` yang diisi server.

**Validasi di browser**

- Semua kolom wajib kecuali motivasi; email berformat valid; nomor WhatsApp diawali 08 atau 62 dengan 10 sampai 14 digit; persetujuan dicentang.
- Pesan galat muncul di bawah kolom terkait dan fokus pindah ke kolom pertama yang salah.
- Tombol kirim dinonaktifkan selama permintaan berjalan untuk mencegah kirim ganda.

**Web App Apps Script**

- Deploy sebagai Web App: eksekusi sebagai pemilik, akses siapa saja.
- `doPost(e)` mem-parse `e.postData.contents`, memvalidasi ulang di server, mengunci dengan `LockService`, lalu menambah baris ke sheet Pendaftar.
- Browser memakai `fetch` dengan `Content-Type: text/plain;charset=utf-8` agar tidak memicu preflight CORS; body tetap berisi JSON.
- Cek duplikat berdasarkan email (tidak peka huruf besar). Jika ada, balas galat `duplicate`.
- Cek kuota dan tanggal penutupan dari sheet Konfigurasi. Jika penuh atau lewat, balas `closed`.
- Kirim email konfirmasi lewat `MailApp` berisi nama, kelas, dan info akses Virtual Class Unila.
- Respons selalu JSON: `{"ok":true}` atau `{"ok":false,"error":"duplicate|closed|invalid|server"}`.
- `doGet` mengembalikan status pendaftaran (`open` atau `closed` dan sisa kuota) agar situs bisa menonaktifkan tombol Daftar.

**Struktur Google Sheets**

- Sheet `Pendaftar`: timestamp, nama, npm, email, wa, institusi, prodi, semester, kelas, motivasi.
- Sheet `Konfigurasi`: kuota total, tanggal penutupan, status buka atau tutup.

## Desain dan Identitas Visual

Acuan visual adalah desain wireframe ESCO (kanvas Design milik panitia, privat). Karena Antigravity tidak bisa membuka tautan privat, semua nilai penting ada di bawah ini; logo harus dilampirkan sebagai berkas.

| Token | Nilai |
| --- | --- |
| Ungu utama (tombol, ikon) | `#3D1160` |
| Ungu gelap (hero, header) | `#25093b` |
| Ungu paling gelap (footer) | `#1d0732` |
| Ungu aksen (label eyebrow) | `#6b3a96` |
| Kuning CTA | `#FFD43B` |
| Emas garis eyebrow | `#F5B82E` |
| Latar lembut | `#f4eef8` |
| Garis kartu | `#e1d6ea` |
| Teks | `#1d0732`, sekunder `#4a3a5c` |
| Font | Plus Jakarta Sans 400 sampai 800 (Google Fonts) |

**Pola desain**

- Ritme band terang dan gelap bergantian: navbar putih, hero ungu gelap, section putih atau lembut, footer paling gelap.
- Label eyebrow: huruf kapital 12 px, jarak huruf lebar, didahului garis emas 28 x 3 px.
- Kartu membulat (radius 16 sampai 24 px), garis tipis, bayangan lembut hanya pada kartu samping.
- Tombol berbentuk pil; CTA utama kuning dengan teks ungu, tombol sekunder ungu dengan teks putih.
- Lebar konten maksimum 1160 px dengan gutter 32 px di desktop dan 16 sampai 20 px di mobile.
- Logo: tampil di navbar (tinggi 52 px desktop, 44 px mobile) dan di footer di atas pelat putih bersudut membulat.

## Kebutuhan Non-Fungsional

- **Responsif:** tata letak benar pada 390 px sampai 1280 px tanpa gulir horizontal; mobile-first.
- **Performa:** gambar lewat `next/image` (WebP otomatis, lazy load kecuali hero); Lighthouse performa mobile target 85 ke atas; font lewat `next/font` tanpa layout shift.
- **Aksesibilitas:** target sentuh minimal 44 px; semua kolom punya `label`; kontras teks memenuhi WCAG AA; fokus keyboard terlihat; ikon dekoratif memakai `aria-hidden`; FAQ memakai `aria-expanded`.
- **SEO dan berbagi:** `title` dan `meta description` per halaman, tag Open Graph dengan logo ESCO, `lang="id"`, favicon dari logo.
- **Keamanan:** tidak ada kunci atau rahasia di kode klien; URL Web App dibaca dari variabel lingkungan; validasi diulang di server; honeypot tersembunyi dan pembatasan satu email per pendaftaran untuk menekan spam; data pribadi hanya dibaca panitia lewat Sheets.
- **Privasi:** formulir menampilkan pernyataan penggunaan data; data tidak dikirim ke pihak ketiga selain Google.
- **Kompatibilitas:** dua versi terbaru Chrome, Safari, Firefox, Edge, dan browser ponsel umum.
- **Pemeliharaan:** teks, tanggal, kelas, dan narasumber ada di folder `data/` sehingga panitia tidak perlu menyentuh komponen.

## Tech Stack dan Struktur Proyek

| Lapisan | Pilihan |
| --- | --- |
| Framework | Next.js (App Router) dengan TypeScript |
| Gaya | Tailwind CSS; token warna pada bagian Desain didefinisikan di konfigurasi Tailwind |
| Font | Plus Jakarta Sans lewat `next/font/google` |
| Gambar | `next/image` |
| Formulir | Komponen klien dengan validasi Zod (react-hook-form boleh dipakai) |
| Backend | Google Apps Script Web App (`doPost`, `doGet`) |
| Penyimpanan | Google Sheets (sheet `Pendaftar` dan `Konfigurasi`) |
| Hosting | Vercel (disarankan); alternatif static export (`output: 'export'`) ke GitHub Pages atau Netlify |
| Pembelajaran | Virtual Class Unila, di luar proyek ini |

**Struktur berkas yang diharapkan**

```
esco/
  app/
    layout.tsx            (font, navbar, footer, metadata)
    page.tsx              (Beranda)
    kelas/[slug]/page.tsx (Detail Kelas, generateStaticParams)
    daftar/page.tsx       (Pendaftaran)
    not-found.tsx
  components/
    Navbar.tsx, Footer.tsx, Faq.tsx, ClassCard.tsx,
    SpeakerCard.tsx, Eyebrow.tsx, RegistrationForm.tsx
  data/
    kelas.ts              (4 kelas, sesi, pengajar)
    konten.ts             (teks, narasumber, pengumuman, FAQ)
    site.ts               (tanggal, kuota, kontak)
  lib/
    validation.ts         (skema Zod)
    register.ts           (fetch ke Apps Script)
  public/
    esco-logo.png
  apps-script/
    Code.gs               (doPost, doGet, email)
  .env.example            (NEXT_PUBLIC_APPS_SCRIPT_URL)
  README.md               (cara deploy dan cara ganti konten)
```

Token warna dan jarak pada bagian Desain dipusatkan di `tailwind.config.ts`. URL Web App Apps Script dibaca dari variabel lingkungan `NEXT_PUBLIC_APPS_SCRIPT_URL`, bukan ditulis di kode.

## Konten dan Aset dari Panitia

Selama belum lengkap, situs dibangun dengan placeholder dalam \[kurung siku\] persis seperti di desain.

| Item | Status | Dipakai di |
| --- | --- | --- |
| Berkas logo ESCO (PNG transparan atau SVG) | Wajib dilampirkan | Navbar, footer, favicon, Open Graph |
| Tanggal pelaksanaan dan penutupan pendaftaran | Belum ada | Strip info, Pendaftaran |
| Nama, deskripsi, durasi, dan jadwal sesi 4 kelas (baru IPA dan Bahasa yang diketahui) | Belum lengkap | Program, Detail Kelas |
| Dosen dan narasumber: nama, gelar, instansi, foto | Belum ada | Narasumber, Detail Kelas |
| Kuota total dan per kelas | Belum ada | Pendaftaran, Apps Script |
| Kontak panitia: email, WhatsApp, Instagram, YouTube | Belum ada | Footer, bantuan |
| Pengumuman awal dan daftar FAQ | Belum ada | Beranda |
| Teks info akses Virtual Class Unila untuk email | Belum ada | Email konfirmasi |
| Teks hak cipta dan pernyataan privasi | Belum ada | Footer, formulir |

## Kriteria Penerimaan

- [ ] Tiga halaman tampil sesuai desain pada 1280 px dan 390 px tanpa gulir horizontal.
- [ ] Semua tombol Daftar menuju `/daftar`; Selengkapnya membuka `/kelas/[slug]` dengan kelas yang benar.
- [ ] Detail Kelas menampilkan data dari `data/kelas.ts` dan menampilkan 3 kelas lain di bagian Kelas lainnya.
- [ ] FAQ bisa dibuka dan ditutup dengan mouse, sentuh, dan keyboard.
- [ ] Mengirim formulir valid menambah satu baris ke sheet Pendaftar dan menampilkan pesan berhasil.
- [ ] Email yang sama dua kali menghasilkan pesan gagal duplikat dan tidak menambah baris.
- [ ] Saat kuota penuh atau tanggal penutupan lewat, pendaftaran ditolak dan tombol Daftar menampilkan status tutup.
- [ ] Kolom kosong atau format salah menampilkan galat per kolom; data isian tetap ada saat pengiriman gagal.
- [ ] Email konfirmasi diterima dengan nama, kelas, dan info akses.
- [ ] Lighthouse mobile: performa 85+, aksesibilitas 90+, SEO 90+.
- [ ] Tidak ada kunci rahasia di repositori; `README.md` menjelaskan deploy Apps Script dan penggantian konten.

## Asumsi dan Pertanyaan Terbuka

**Asumsi**

- Peserta mendapat akses Virtual Class Unila lewat email dari panitia setelah mendaftar, bukan lewat situs.
- Satu peserta memilih satu kelas saat mendaftar.
- Pendaftaran gratis dan tanpa unggahan berkas.
- Satu email hanya boleh mendaftar sekali.

**Perlu dijawab panitia**

1. Apa nama kelas ketiga dan keempat selain IPA dan Bahasa?
2. Apakah peserta boleh mengikuti lebih dari satu kelas, dan kapan kelas dipilih: saat daftar atau di Virtual Class?
3. Bagaimana akses Virtual Class Unila diberikan: akun otomatis, kode pendaftaran kelas, atau tautan?
4. Siapa target peserta (mahasiswa Unila, mahasiswa luar, guru)? Ini menentukan kolom institusi dan semester.
5. Apakah ada biaya, seleksi, atau sertifikat?
6. Berapa kuota total dan per kelas?
7. Apakah ada alamat domain atau subdomain resmi Unila untuk hosting?

## Prompt Awal untuk Antigravity

Tempel dokumen PRD ini beserta berkas logo ke Antigravity, lalu kirim prompt berikut.

```
Bangun situs resmi Education Summer Course Online (ESCO) FKIP Universitas Lampung, angkatan perdana, berdasarkan PRD terlampir.

Aturan:
- Next.js (App Router) + TypeScript + Tailwind CSS. Struktur proyek seperti bagian Tech Stack dan Struktur Proyek.
- Tiga rute: / (Beranda), /kelas/[slug] (template untuk 4 kelas dari data/kelas.ts, pakai generateStaticParams dan notFound untuk slug tak dikenal), /daftar.
- Ikuti token warna, font, dan pola desain pada bagian Desain dan Identitas Visual; token dimasukkan ke tailwind.config.ts. Pakai logo terlampir sebagai public/esco-logo.png lewat next/image.
- Mobile-first, benar pada 390 px sampai 1280 px. Komponen dipakai ulang (Navbar, Footer, Faq, ClassCard, SpeakerCard, Eyebrow).
- Hanya komponen yang perlu interaksi (menu mobile, FAQ, formulir) yang berupa client component; sisanya server component.
- Semua teks yang belum diketahui ditulis sebagai placeholder [dalam kurung siku] di folder data, bukan di markup.
- Tulis apps-script/Code.gs sesuai bagian Alur Pendaftaran dan Integrasi Apps Script: doPost dengan validasi, LockService, cek duplikat email, cek kuota dan tanggal penutupan, email konfirmasi, respons JSON; doGet untuk status buka atau tutup.
- Di browser, kirim dengan fetch POST bertipe text/plain agar tanpa preflight CORS. URL Web App dibaca dari NEXT_PUBLIC_APPS_SCRIPT_URL; sediakan .env.example.
- Tulis README.md berisi cara membuat Google Sheet, deploy Apps Script, mengisi env, deploy ke Vercel, dan mengganti konten.

Kerjakan bertahap: (1) kerangka, layout, dan token gaya, (2) Beranda, (3) Detail Kelas, (4) Pendaftaran dan Apps Script, (5) uji terhadap Kriteria Penerimaan. Tanyakan hanya bila ada keputusan yang tidak bisa diambil dari PRD.
```

Catatan: tautan kanvas desain bersifat privat, jadi spesifikasi di atas sengaja ditulis lengkap. Jika ingin Antigravity melihat tampilan, ekspor tangkapan layar tiap papan dari kanvas dan lampirkan.
