// Kode negara ISO 3166-1 alpha-2. Nama negara dibuat otomatis oleh browser sesuai bahasa
// (Intl.DisplayNames), jadi tidak ada terjemahan yang perlu dipelihara.
export const KODE_NEGARA = [
  "AD","AE","AF","AG","AL","AM","AO","AR","AT","AU","AZ","BA","BB","BD","BE","BF","BG","BH","BI","BJ","BN","BO","BR","BS","BT","BW","BY","BZ",
  "CA","CD","CF","CG","CH","CI","CL","CM","CN","CO","CR","CU","CV","CY","CZ","DE","DJ","DK","DM","DO","DZ","EC","EE","EG","ER","ES","ET",
  "FI","FJ","FM","FR","GA","GB","GD","GE","GH","GM","GN","GQ","GR","GT","GW","GY","HK","HN","HR","HT","HU","ID","IE","IL","IN","IQ","IR","IS","IT",
  "JM","JO","JP","KE","KG","KH","KI","KM","KN","KP","KR","KW","KZ","LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY",
  "MA","MC","MD","ME","MG","MH","MK","ML","MM","MN","MO","MR","MT","MU","MV","MW","MX","MY","MZ","NA","NE","NG","NI","NL","NO","NP","NR","NZ","OM",
  "PA","PE","PG","PH","PK","PL","PS","PT","PW","PY","QA","RO","RS","RU","RW","SA","SB","SC","SD","SE","SG","SI","SK","SL","SM","SN","SO","SR","SS","ST","SV","SY","SZ",
  "TD","TG","TH","TJ","TL","TM","TN","TO","TR","TT","TV","TW","TZ","UA","UG","US","UY","UZ","VA","VC","VE","VN","VU","WS","XK","YE","ZA","ZM","ZW",
] as const;

export type Negara = { kode: string; nama: string };

/** Daftar negara terurut sesuai bahasa. Panggil di browser (hasil Intl bisa berbeda antar mesin). */
export function daftarNegara(bahasa: string): Negara[] {
  const nama = new Intl.DisplayNames([bahasa], { type: "region" });
  const urut = new Intl.Collator(bahasa);
  return KODE_NEGARA.map((kode) => ({ kode, nama: nama.of(kode) ?? kode })).sort((a, b) => urut.compare(a.nama, b.nama));
}
