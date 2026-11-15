// Konten halaman Kebijakan Privasi dan Syarat & Ketentuan.
// Semua teks dalam [kurung siku] adalah DRAF yang harus ditinjau pihak yang berwenang (FKIP Unila)
// sebelum situs dipublikasikan. Bagian yang menjelaskan cara kerja sistem (Google Sheets, email) adalah fakta teknis.

export type Bagian = { judul: string; paragraf?: string[]; daftar?: string[] };
export type Dokumen = { judul: string; deskripsi: string; diperbarui: string; bagian: Bagian[] };

export const privasi: Dokumen = {
  judul: "Kebijakan Privasi",
  deskripsi: "Penjelasan tentang data pribadi yang kami kumpulkan lewat formulir pendaftaran ESCO, untuk apa digunakan, dan bagaimana dijaga.",
  diperbarui: "[Tanggal pembaruan]",
  bagian: [
    {
      judul: "Ringkasan",
      paragraf: [
        "[Dokumen ini menjelaskan bagaimana panitia Education Summer Course Online (ESCO) FKIP Universitas Lampung mengumpulkan, menggunakan, dan melindungi data pribadi peserta.]",
      ],
    },
    {
      judul: "Data yang kami kumpulkan",
      paragraf: ["Saat mendaftar, Anda mengisi data berikut:"],
      daftar: [
        "Nama lengkap, alamat email, dan nomor telepon/WhatsApp",
        "Negara asal, universitas asal, program studi, jenjang pendidikan, dan tahun studi",
        "Motivasi mengikuti program (opsional)",
        "Nomor paspor dan tanggal lahir (opsional; diisi hanya bila diminta untuk pembuatan NPM)",
      ],
    },
    {
      judul: "Untuk apa data digunakan",
      daftar: [
        "[Memproses pendaftaran dan memverifikasi peserta.]",
        "[Membuat NPM Unila dan akses Virtual Class FKIP Unila oleh bagian TIK Unila.]",
        "[Mengirim informasi penting tentang program lewat email atau WhatsApp.]",
        "[Menyusun statistik peserta dalam bentuk anonim.]",
      ],
    },
    {
      judul: "Siapa yang dapat mengakses data",
      paragraf: [
        "[Data dapat dibaca oleh panitia ESCO dan bagian TIK Unila untuk keperluan di atas. Data tidak dijual dan tidak dibagikan kepada pihak lain di luar keperluan program.]",
      ],
    },
    {
      judul: "Penyimpanan dan keamanan",
      paragraf: [
        "Data pendaftaran dikirim lewat formulir ini ke Google Sheets milik panitia melalui Google Apps Script, dan email konfirmasi dikirim lewat layanan email Google. Artinya data diproses di server Google, yang dapat berada di luar Indonesia.",
        "[Akses ke spreadsheet dibatasi untuk panitia yang berwenang. Data disimpan selama [lama penyimpanan] dan kemudian dihapus.]",
      ],
    },
    {
      judul: "Hak Anda",
      paragraf: [
        "[Anda dapat meminta akses, perbaikan, atau penghapusan data pribadi Anda dengan menghubungi panitia lewat kontak di bawah.]",
      ],
    },
    {
      judul: "Kontak",
      paragraf: ["[Email panitia] · [Nomor WhatsApp panitia]"],
    },
  ],
};

export const syarat: Dokumen = {
  judul: "Syarat dan Ketentuan",
  deskripsi: "Ketentuan yang berlaku bagi peserta Education Summer Course Online (ESCO) FKIP Universitas Lampung.",
  diperbarui: "[Tanggal pembaruan]",
  bagian: [
    {
      judul: "Ketentuan umum",
      paragraf: [
        "[Dengan mendaftar, peserta menyatakan telah membaca dan menyetujui ketentuan berikut serta Kebijakan Privasi.]",
      ],
    },
    {
      judul: "Pendaftaran dan kelayakan peserta",
      daftar: [
        "[Program terbuka untuk mahasiswa internasional. Kriteria lengkap peserta: [kriteria].]",
        "[Satu alamat email hanya dapat digunakan untuk satu pendaftaran.]",
        "[Panitia berhak menolak pendaftaran yang tidak lengkap atau tidak memenuhi kriteria.]",
      ],
    },
    {
      judul: "Kebenaran data",
      paragraf: ["[Peserta wajib mengisi data yang benar dan terkini. Data yang tidak benar dapat membatalkan pendaftaran.]"],
    },
    {
      judul: "NPM dan akses Virtual Class",
      paragraf: [
        "[Setelah pendaftaran diterima, bagian TIK Unila mengirimkan NPM dan informasi akses Virtual Class FKIP Unila ke email peserta. NPM dan akun bersifat pribadi dan tidak boleh dipindahtangankan.]",
      ],
    },
    {
      judul: "Kehadiran dan integritas akademik",
      paragraf: ["[Peserta mengikuti webinar dan tugas sesuai jadwal serta menjunjung tinggi kejujuran akademik.]"],
    },
    {
      judul: "Sertifikat",
      paragraf: ["[Syarat memperoleh sertifikat: [syarat kehadiran dan tugas].]"],
    },
    {
      judul: "Perubahan jadwal dan pembatalan",
      paragraf: ["[Panitia dapat mengubah jadwal atau membatalkan kegiatan dengan pemberitahuan lewat email.]"],
    },
    {
      judul: "Hak kekayaan intelektual",
      paragraf: ["[Materi pembelajaran dan rekaman adalah milik penyelenggara dan pengajar, dan hanya boleh digunakan untuk keperluan belajar peserta.]"],
    },
    {
      judul: "Perubahan ketentuan",
      paragraf: ["[Ketentuan ini dapat diperbarui sewaktu-waktu. Versi terbaru selalu tersedia di halaman ini.]"],
    },
    {
      judul: "Kontak",
      paragraf: ["[Email panitia] · [Nomor WhatsApp panitia]"],
    },
  ],
};
