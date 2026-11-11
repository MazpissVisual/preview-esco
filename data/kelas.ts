export type Sesi = { judul: string; ringkasan: string; tanggal: string };
export type Pengajar = { nama: string; instansi: string };
export type Kelas = {
  slug: string;
  nomor: string;
  nama: string;
  kategori: string;
  deskripsiSingkat: string;
  gambaran: string[];
  durasi: string;
  jumlahWebinar: string;
  kuota: string;
  capaian: string[];
  sesi: Sesi[];
  pengajar: Pengajar[];
};

const capaianDefault = [1, 2, 3, 4, 5, 6].map((n) => `[Capaian belajar ${n}]`);
const sesiDefault = (): Sesi[] =>
  [1, 2, 3, 4, 5].map((n) => ({
    judul: `[Judul sesi ${n}]`,
    ringkasan: "[Ringkasan satu kalimat.]",
    tanggal: "[Hari, tanggal]",
  }));
const pengajarDefault = (): Pengajar[] => [
  { nama: "[Nama lengkap, gelar]", instansi: "[Instansi]" },
  { nama: "[Nama lengkap, gelar]", instansi: "[Instansi]" },
];
const gambaranDefault = [
  "[Paragraf penjelasan kelas: apa yang dibahas dan untuk siapa kelas ini.]",
  "[Paragraf tentang metode belajar: webinar lewat Virtual Class Unila, tugas, dan diskusi.]",
];

function buat(slug: string, nomor: string, nama: string): Kelas {
  return {
    slug,
    nomor,
    nama,
    kategori: "[Kategori]",
    deskripsiSingkat: "[Deskripsi singkat kelas dalam satu sampai dua kalimat.]",
    gambaran: gambaranDefault,
    durasi: "[Durasi]",
    jumlahWebinar: "[Jumlah webinar]",
    kuota: "[Kuota]",
    capaian: capaianDefault,
    sesi: sesiDefault(),
    pengajar: pengajarDefault(),
  };
}

export const kelasList: Kelas[] = [
  buat("ipa", "01", "[Kelas IPA]"),
  buat("bahasa", "02", "[Kelas Bahasa]"),
  buat("kelas-3", "03", "[Nama kelas 3]"),
  buat("kelas-4", "04", "[Nama kelas 4]"),
];

export const getKelas = (slug: string) => kelasList.find((k) => k.slug === slug);
