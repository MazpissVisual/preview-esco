/** Menu navigasi versi 3. prefix "" di Beranda ("#tentang"), "/v3" di halaman lain ("/v3#tentang"). */
export const v3Menu = (prefix = "") => [
  { label: "Tentang", href: `${prefix}#tentang` },
  { label: "Kelas", href: `${prefix}#kelas` },
  { label: "Narasumber", href: `${prefix}#narasumber` },
  { label: "Pengumuman", href: `${prefix}#pengumuman` },
  { label: "FAQ", href: `${prefix}#faq` },
];
