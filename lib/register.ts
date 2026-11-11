import type { RegistrationData } from "./validation";

const URL_APPS_SCRIPT = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

export type RegisterError = "duplicate" | "closed" | "invalid" | "server" | "network";
export type RegisterResult = { ok: true } | { ok: false; error: RegisterError };
export type RegStatus = { status: "open" | "closed"; sisa?: number };

export const ERROR_MESSAGES: Record<RegisterError, string> = {
  duplicate: "Email ini sudah terdaftar. Gunakan email lain atau hubungi panitia.",
  closed: "Pendaftaran sudah ditutup atau kuota penuh.",
  invalid: "Data tidak valid. Periksa kembali isian Anda.",
  server: "Terjadi kesalahan pada server. Silakan coba lagi.",
  network: "Koneksi bermasalah. Periksa internet Anda lalu coba lagi.",
};

export async function submitRegistration(
  data: RegistrationData & { website?: string },
): Promise<RegisterResult> {
  if (!URL_APPS_SCRIPT) return { ok: false, error: "server" };
  try {
    const res = await fetch(URL_APPS_SCRIPT, {
      method: "POST",
      // text/plain agar tidak memicu preflight CORS; isi tetap JSON
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (json.ok) return { ok: true };
    return { ok: false, error: (json.error as RegisterError) ?? "server" };
  } catch {
    return { ok: false, error: "network" };
  }
}

let statusPromise: Promise<RegStatus | null> | null = null;

/** Status pendaftaran diambil sekali per muat halaman dan dipakai bersama semua tombol Daftar. */
export function getStatus(): Promise<RegStatus | null> {
  if (!URL_APPS_SCRIPT) return Promise.resolve(null);
  if (!statusPromise) {
    statusPromise = fetch(URL_APPS_SCRIPT)
      .then((r) => r.json() as Promise<RegStatus>)
      .catch(() => null);
  }
  return statusPromise;
}
