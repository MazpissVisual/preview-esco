export const about = {
  paragraf: [
    "[Paragraf latar belakang: mengapa ESCO diadakan, dan bahwa ini penyelenggaraan pertama.]",
    "[Paragraf tujuan dan sasaran peserta.]",
  ],
  angka: "[00]",
  angkaKet: "[Keterangan: jumlah sesi atau kuota]",
  poin: [
    { title: "Tujuan", text: "[Tujuan program dalam satu kalimat.]" },
    { title: "Manfaat", text: "[Manfaat bagi peserta.]" },
    { title: "Penyelenggara", text: "FKIP Universitas Lampung" },
  ],
};

export const benefits = [
  { title: "Belajar 100% daring", text: "[Ikuti webinar dari mana saja lewat Virtual Class Unila.]" },
  { title: "[Sertifikat kegiatan]", text: "[Bentuk dan syarat memperoleh sertifikat.]" },
  { title: "[Narasumber ahli]", text: "[Belajar dari dosen dan praktisi.]" },
  { title: "[Materi pembelajaran]", text: "[Materi diakses lewat Virtual Class Unila.]" },
  { title: "[Jejaring peserta]", text: "[Berkenalan dengan peserta dari berbagai kampus.]" },
  { title: "[Benefit lain]", text: "[Misalnya konsultasi atau tugas akhir.]" },
];

/** foto: path di public/dosen/ (mis. "/dosen/nama-dosen.jpg"). Kosong = ikon orang. */
export type Pembicara = { name: string; org: string; topic: string; foto?: string };

export const speakers: Pembicara[] = [
  {
    name: "Dr. Sheren Dwi Oktaria, M.Pd.",
    org: "Universitas Lampung",
    topic: "Media Pembelajaran",
    foto: "/dosen/sheren-dwi-oktaria.jpg",
  },
  { name: "[Nama lengkap, gelar]", org: "[Instansi]", topic: "[Topik yang dibawakan]" },
  { name: "[Nama lengkap, gelar]", org: "[Instansi]", topic: "[Topik yang dibawakan]" },
  { name: "[Nama lengkap, gelar]", org: "[Instansi]", topic: "[Topik yang dibawakan]" },
  { name: "[Nama lengkap, gelar]", org: "[Instansi]", topic: "[Topik yang dibawakan]" },
  { name: "[Nama lengkap, gelar]", org: "[Instansi]", topic: "[Topik yang dibawakan]" },
  { name: "[Nama lengkap, gelar]", org: "[Instansi]", topic: "[Topik yang dibawakan]" },
  { name: "[Nama lengkap, gelar]", org: "[Instansi]", topic: "[Topik yang dibawakan]" },
];

export const flow = [
  { n: "1", title: "Daftar", text: "Isi formulir pendaftaran sebelum Desember." },
  { n: "2", title: "Terima NPM dan info akses", text: "Bagian TIK Unila mengirim NPM dan info akses Virtual Class ke email Anda." },
  { n: "3", title: "Ikuti webinar", text: "Masuk ke Virtual Class Unila dan hadir sesuai jadwal." },
  { n: "4", title: "Dapatkan sertifikat", text: "[Syarat kehadiran / tugas untuk sertifikat.]" },
];

export const news = [
  { date: "[Tanggal]", title: "Pendaftaran ESCO dibuka", text: "[Ringkasan satu kalimat.]" },
  { date: "[Tanggal]", title: "[Judul pengumuman]", text: "[Ringkasan satu kalimat.]" },
  { date: "[Tanggal]", title: "[Judul pengumuman]", text: "[Ringkasan satu kalimat.]" },
];

export const faqs = [
  { q: "[Siapa yang boleh mengikuti ESCO?]", a: "[Jawaban singkat tentang sasaran peserta.]" },
  { q: "[Apakah ada biaya pendaftaran?]", a: "[Jawaban tentang biaya.]" },
  { q: "[Apakah peserta mendapat sertifikat?]", a: "[Jawaban tentang sertifikat dan syaratnya.]" },
  { q: "[Bagaimana cara masuk ke Virtual Class Unila?]", a: "[Jawaban tentang akun dan akses Virtual Class Unila.]" },
  { q: "[Bagaimana jika berhalangan hadir di suatu sesi?]", a: "[Jawaban tentang rekaman atau sesi pengganti.]" },
];

export const pendaftaranLangkah = [
  "Isi formulir pendaftaran",
  "Terima NPM Unila dan info akses dari TIK",
  "Masuk ke Virtual Class dan ikuti webinar",
];
