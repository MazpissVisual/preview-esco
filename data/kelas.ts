export type Sesi = { judul: string; ringkasan: string; tanggal: string };
export type Pengajar = { nama: string; instansi: string; foto?: string };
/**
 * Cover kartu kelas. Untuk memakai gambar asli: taruh file di public/kelas/ lalu isi
 * { src: "/kelas/ipa.jpg", pos: "50% 50%", zoom: 1, duotone: false }. Selama belum ada, dipakai
 * potongan ilustrasi hero (duotone ungu) sebagai cover sementara; pos = titik fokus, zoom = pembesaran.
 */
export type KelasCover = { src: string; pos: string; zoom: number; duotone: boolean };

export type Kelas = {
  slug: string;
  nomor: string;
  nama: string;
  kategori: string;
  cover: KelasCover;
  deskripsiSingkat: string;
  gambaran: string[];
  durasi: string;
  jumlahWebinar: string;
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

function buat(slug: string, nomor: string, nama: string, cover: KelasCover): Kelas {
  return {
    slug,
    nomor,
    nama,
    kategori: "[Kategori]",
    cover,
    deskripsiSingkat: "[Deskripsi singkat kelas dalam satu sampai dua kalimat.]",
    gambaran: gambaranDefault,
    durasi: "[Durasi]",
    jumlahWebinar: "[Jumlah webinar]",
    capaian: capaianDefault,
    sesi: sesiDefault(),
    pengajar: pengajarDefault(),
  };
}

// Sementara semua kelas memakai cover IPA. Untuk cover sendiri: taruh JPG di public/kelas/ lalu ganti `cover` kelas terkait,
// mis. { src: "/kelas/bahasa.jpg", pos: "50% 50%", zoom: 1, duotone: false }.
const coverIpa: KelasCover = { src: "/kelas/ipa.jpg", pos: "50% 50%", zoom: 1, duotone: false };

export const kelasList: Kelas[] = [
  buat("ipa", "01", "[Kelas IPA]", coverIpa),
  buat("bahasa", "02", "[Kelas Bahasa]", coverIpa),
  buat("kelas-3", "03", "[Nama kelas 3]", coverIpa),
  buat("kelas-4", "04", "[Nama kelas 4]", coverIpa),
  buat("kelas-5", "05", "[Nama kelas 5]", coverIpa),
  buat("kelas-6", "06", "[Nama kelas 6]", coverIpa),
  buat("kelas-7", "07", "[Nama kelas 7]", coverIpa),
  buat("kelas-8", "08", "[Nama kelas 8]", coverIpa),
];

export const getKelas = (slug: string) => kelasList.find((k) => k.slug === slug);
