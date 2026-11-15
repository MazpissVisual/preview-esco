# Website ESCO FKIP Unila

Situs resmi Education Summer Course Online (ESCO) FKIP Universitas Lampung. Next.js (App Router) + TypeScript + Tailwind CSS. Pendaftaran ditulis ke Google Sheets lewat Google Apps Script.

## Menjalankan lokal

```bash
npm install
cp .env.example .env.local   # isi NEXT_PUBLIC_APPS_SCRIPT_URL setelah langkah di bawah
npm run dev                  # http://localhost:3000
npm run build
```

Tanpa `NEXT_PUBLIC_APPS_SCRIPT_URL`, situs tetap tampil, tetapi pengiriman formulir akan menampilkan "Pendaftaran gagal".

## 1. Membuat Google Sheet dan deploy Apps Script

1. Buat Google Spreadsheet baru (mis. "Pendaftar ESCO").
2. Buka **Extensions > Apps Script**, hapus isi bawaan, tempel isi `apps-script/Code.gs`.
3. Isi konstanta `INFO_AKSES` dengan teks info akses Virtual Class Unila dari panitia.
4. Pilih fungsi `setupSheets` lalu **Run** (setujui izin). Ini membuat sheet `Pendaftar` dan `Konfigurasi`.
5. Di sheet `Konfigurasi`, isi baris 2: kuota total, tanggal penutupan, dan status (`buka` / `tutup`). Ubah status ke `tutup` untuk menutup pendaftaran secara manual.
6. **Deploy > New deployment > Web app**: *Execute as* **Me**, *Who has access* **Anyone**. Salin URL Web App (berakhiran `/exec`).
7. Setiap kali `Code.gs` diubah, buat **New version** pada deployment agar perubahan berlaku.

Uji cepat: buka URL `/exec` di browser; hasilnya `{"status":"open","sisa":100}`.

## 2. Mengisi variabel lingkungan

- Lokal: `.env.local` berisi `NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec`
- Opsional `NEXT_PUBLIC_SITE_URL` = alamat situs (untuk tag Open Graph).
- Jangan commit `.env.local`. Tidak ada rahasia di kode klien.

## 3. Deploy ke Vercel

1. Push repositori ke GitHub, lalu **Import Project** di Vercel.
2. Tambahkan variabel lingkungan di atas pada **Settings > Environment Variables**.
3. Deploy. Alternatif statis (GitHub Pages / Netlify): di `next.config.mjs` aktifkan `output: 'export'` dan `images: { unoptimized: true }`, lalu `npm run build` menghasilkan folder `out/`.

## 4. Mengganti konten

Semua teks ada di folder `data/`; komponen tidak perlu disentuh. Teks `[dalam kurung siku]` adalah placeholder.

| Berkas | Isi |
| --- | --- |
| `data/site.ts` | tanggal, kuota, kontak, tagline, menu, hak cipta, pernyataan privasi |
| `data/kelas.ts` | 8 kelas: nama, deskripsi, durasi, capaian, sesi webinar, pengajar |
| `data/konten.ts` | Tentang, benefit, narasumber, alur, pengumuman, FAQ |
| `public/esco-logo.png` | logo (navbar, footer, favicon, Open Graph) |

Menambah kelas: tambahkan satu entri di `kelasList` pada `data/kelas.ts`; halaman `/kelas/[slug]` ikut menyesuaikan (formulir tidak memilih kelas). Token warna ada di `tailwind.config.ts`.

## 5. Foto dosen dan cover kelas

| Folder | Isi | Ukuran yang disarankan |
| --- | --- | --- |
| `public/dosen/` | foto dosen dan narasumber | kotak 600×600 px, wajah di tengah, JPG |
| `public/kelas/` | cover kartu kelas | 16:9, sekitar 1600×900 px, JPG |
| `public/` | logo dan foto latar hero (`bg-hero.jpg`, 16:9, 2400×1350) | |

**Foto dosen.** Simpan file, mis. `public/dosen/nama-dosen.jpg`, lalu isi `foto: "/dosen/nama-dosen.jpg"` pada dosen terkait di `data/konten.ts` (bagian `speakers`). Untuk dosen di halaman kelas, isi `foto` pada `pengajar` di `data/kelas.ts`. Tanpa `foto`, kartu menampilkan ikon orang.

**Cover kelas.** Simpan file, mis. `public/kelas/ipa.jpg`, lalu ubah `cover` kelas tersebut di `data/kelas.ts` menjadi `{ src: "/kelas/ipa.jpg", pos: "50% 50%", zoom: 1, duotone: false }`. Selama belum diubah, dipakai potongan ilustrasi sebagai cover sementara.

Gunakan JPG atau PNG (bukan SVG berisi foto): `next/image` mengubahnya otomatis ke WebP/AVIF sehingga jauh lebih ringan.

## 6. Formulir pendaftaran (peserta internasional)

Peserta tidak memilih kelas: setelah mendaftar, bagian TIK Unila mengirim NPM dan info akses Virtual Class FKIP Unila ke email peserta.

- **Teks formulir** ada di `data/form.ts` (satu berkas, mudah diganti ke bahasa Inggris; ubah juga `BAHASA`).
- **Data yang dikumpulkan:** nama, email, telepon (format internasional, mis. `+60 12 345 6789`), negara asal, universitas asal, program studi, jenjang, tahun studi (opsional), nomor paspor (opsional), tanggal lahir (opsional), motivasi (opsional), persetujuan. Paspor dan tanggal lahir opsional sampai bagian TIK memutuskan data yang dibutuhkan; untuk mewajibkannya ubah `lib/validation.ts` dan `validasi_` di `apps-script/Code.gs`.
- **Kolom sheet `Pendaftar`:** timestamp, nama, email, telepon, negara_kode, negara, paspor, tanggal_lahir, institusi, prodi, jenjang, tahun_studi, motivasi.
- **Jika sheet sudah dibuat dengan versi lama:** ganti nama sheet `Pendaftar` lama (mis. `Pendaftar-lama`), tempel `Code.gs` terbaru, jalankan `setupSheets` lagi, lalu buat **New version** pada deployment. Data lama tidak ikut dipindahkan otomatis.
- **Email konfirmasi** dwibahasa (Indonesia dan Inggris) dan mengarahkan peserta menunggu NPM dari bagian TIK.

## 7. Kebijakan Privasi dan Syarat & Ketentuan

Halaman `/privasi` dan `/syarat` (tautan ada di footer dan di bawah formulir pendaftaran) berisi **draf** dengan teks dalam `[kurung siku]` yang harus ditinjau FKIP Unila sebelum situs dipublikasikan. Seluruh isinya ada di satu berkas: `data/hukum.ts` (judul bagian, paragraf, dan daftar). Tahun pada baris hak cipta di footer otomatis mengikuti tahun saat situs di-build.
