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
| `data/kelas.ts` | 4 kelas: nama, deskripsi, durasi, capaian, sesi webinar, pengajar |
| `data/konten.ts` | Tentang, benefit, narasumber, alur, pengumuman, FAQ |
| `public/esco-logo.png` | logo (navbar, footer, favicon, Open Graph) |

Menambah kelas: tambahkan satu entri di `kelasList` pada `data/kelas.ts`; halaman `/kelas/[slug]` dan dropdown formulir ikut menyesuaikan. Token warna ada di `tailwind.config.ts`.
