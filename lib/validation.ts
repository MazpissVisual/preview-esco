import { z } from "zod";
import { JENJANG, teksForm } from "../data/form";

const g = teksForm.galat;

/** Dipakai saat keluar dari kolom: buang karakter aneh, "00" di awal jadi "+", rapikan spasi. */
export const rapikanTelepon = (s: string) =>
  s.replace(/[^\d+\s().-]/g, "").replace(/^\s*00\s*/, "+").replace(/\s+/g, " ").trim();

/** Hapus spasi, tanda hubung, dan kurung agar format telepon internasional seragam: +60123456789 */
export const normalisasiTelepon = (s: string) => s.replace(/[\s().-]/g, "");

const tanggalValid = (s: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== s) return false;
  return Number(s.slice(0, 4)) >= 1930 && d.getTime() <= Date.now();
};

export const registrationSchema = z.object({
  nama: z.string().trim().min(2, g.nama),
  email: z.string().trim().min(1, g.emailKosong).email(g.email),
  telepon: z
    .string()
    .trim()
    .min(1, g.teleponKosong)
    .transform(normalisasiTelepon)
    .pipe(z.string().regex(/^\+[1-9]\d{6,14}$/, g.telepon)),
  negara: z.string().regex(/^[A-Z]{2}$/, g.negara),
  institusi: z.string().trim().min(2, g.institusi),
  prodi: z.string().trim().min(2, g.prodi),
  jenjang: z.enum(JENJANG, { errorMap: () => ({ message: g.jenjang }) }),
  tahun: z.string().trim().optional().default(""),
  paspor: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine((v) => v === "" || /^[A-Za-z0-9]{5,20}$/.test(v), g.paspor),
  tanggalLahir: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine((v) => v === "" || tanggalValid(v), g.tanggalLahir),
  motivasi: z.string().trim().optional().default(""),
  setuju: z.literal(true, { errorMap: () => ({ message: g.setuju }) }),
});

export type RegistrationData = z.output<typeof registrationSchema>;
export const FIELD_ORDER = [
  "nama", "email", "telepon", "negara", "institusi", "prodi", "jenjang", "tahun", "paspor", "tanggalLahir", "motivasi", "setuju",
] as const;
