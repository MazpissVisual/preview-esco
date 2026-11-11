import { z } from "zod";

export const registrationSchema = z.object({
  nama: z.string().trim().min(3, "Nama lengkap wajib diisi"),
  npm: z.string().trim().min(5, "NPM / NIK wajib diisi"),
  email: z.string().trim().min(1, "Email wajib diisi").email("Format email tidak valid"),
  wa: z
    .string()
    .trim()
    .min(1, "Nomor WhatsApp wajib diisi")
    .regex(/^(08|62)\d{8,12}$/, "Gunakan awalan 08 atau 62, total 10–14 digit"),
  institusi: z.string().trim().min(2, "Asal institusi wajib diisi"),
  prodi: z.string().trim().min(2, "Program studi wajib diisi"),
  semester: z.string().min(1, "Pilih semester"),
  kelas: z.string().min(1, "Pilih kelas"),
  motivasi: z.string().trim().optional().default(""),
  setuju: z.literal(true, { errorMap: () => ({ message: "Persetujuan wajib dicentang" }) }),
});

export type RegistrationData = z.output<typeof registrationSchema>;
export const FIELD_ORDER = [
  "nama", "npm", "email", "wa", "institusi", "prodi", "semester", "kelas", "motivasi", "setuju",
] as const;
