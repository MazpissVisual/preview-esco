// Semua teks formulir pendaftaran ada di sini. Saat situs berpindah ke bahasa Inggris,
// cukup ganti isi berkas ini (dan BAHASA) tanpa menyentuh komponen.
export const BAHASA = "id"; // kode bahasa untuk nama negara dan pengurutan daftar ("en" nanti)

export const JENJANG = ["bachelor", "master", "doctoral", "other"] as const;
export type Jenjang = (typeof JENJANG)[number];

export const teksForm = {
  judul: "Data diri peserta",
  opsional: "opsional",
  field: {
    nama: { label: "Nama lengkap", placeholder: "Sesuai paspor" },
    email: { label: "Email aktif", placeholder: "nama@email.com", hint: "NPM dan info akses akan dikirim ke email ini." },
    telepon: { label: "Telepon / WhatsApp", placeholder: "+60 12 345 6789", hint: "Awali dengan kode negara, mis. +60." },
    negara: { label: "Negara asal", placeholder: "Pilih negara" },
    institusi: { label: "Universitas asal", placeholder: "Nama universitas" },
    prodi: { label: "Program studi", placeholder: "Program studi" },
    jenjang: { label: "Jenjang pendidikan", placeholder: "Pilih jenjang" },
    tahun: { label: "Tahun studi", placeholder: "Pilih tahun" },
    paspor: { label: "Nomor paspor", placeholder: "Mis. A1234567", hint: "Diisi bila diminta untuk pembuatan NPM." },
    tanggalLahir: { label: "Tanggal lahir", hint: "Diisi bila diminta untuk pembuatan NPM." },
    motivasi: { label: "Motivasi mengikuti ESCO", placeholder: "[Tulis singkat alasan Anda mengikuti program]" },
  },
  jenjangOpsi: [
    { nilai: "bachelor", label: "Sarjana (S1)" },
    { nilai: "master", label: "Magister (S2)" },
    { nilai: "doctoral", label: "Doktoral (S3)" },
    { nilai: "other", label: "Lainnya" },
  ] as { nilai: Jenjang; label: string }[],
  tahunOpsi: ["1", "2", "3", "4", "5", "6+"],
  setuju: "Saya menyatakan data di atas benar dan bersedia mengikuti program sampai selesai.",
  kirim: "Kirim Pendaftaran",
  mengirim: "Mengirim...",
  cobaLagi: "Coba lagi",
  berhasil: {
    judul: "Pendaftaran berhasil",
    sebelumEmail: "Bagian TIK Unila akan mengirim NPM dan info akses Virtual Class FKIP Unila ke email",
    kembali: "Kembali ke beranda",
  },
  gagal: { judul: "Pendaftaran gagal", tambahan: "Data yang sudah diisi tidak hilang." },
  galat: {
    nama: "Nama lengkap wajib diisi",
    emailKosong: "Email wajib diisi",
    email: "Format email tidak valid",
    teleponKosong: "Nomor telepon wajib diisi",
    telepon: "Awali dengan kode negara, mis. +60 12 345 6789",
    negara: "Pilih negara asal",
    institusi: "Universitas asal wajib diisi",
    prodi: "Program studi wajib diisi",
    jenjang: "Pilih jenjang pendidikan",
    paspor: "Nomor paspor hanya huruf dan angka (5–20 karakter)",
    tanggalLahir: "Tanggal lahir tidak valid",
    setuju: "Persetujuan wajib dicentang",
  },
} as const;
