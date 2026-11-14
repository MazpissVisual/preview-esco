"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ZodTypeAny } from "zod";
import { BAHASA, teksForm as T } from "@/data/form";
import { daftarNegara, type Negara } from "@/data/negara";
import { site } from "@/data/site";
import { ERROR_MESSAGES, submitRegistration, type RegisterError } from "@/lib/register";
import { FIELD_ORDER, rapikanTelepon, registrationSchema } from "@/lib/validation";

type Values = {
  nama: string; email: string; telepon: string; negara: string; institusi: string; prodi: string;
  jenjang: string; tahun: string; paspor: string; tanggalLahir: string; motivasi: string; setuju: boolean;
};
type Key = (typeof FIELD_ORDER)[number];
type Errors = Partial<Record<Key, string>>;
type Phase = "idle" | "sending" | "success" | "error";

const labelCls = "text-sm font-semibold text-[#2b1d3a]";
const hintCls = "m-0 text-[13px] text-[#6f5a85]";
const row = "flex flex-wrap gap-5";
const col = "flex min-w-0 flex-[1_1_240px] flex-col gap-1.5";
// kolom pilihan divalidasi langsung saat dipilih (tidak ada "keluar kolom" yang jelas)
const LANGSUNG: Key[] = ["negara", "jenjang"];

export default function RegistrationForm() {
  const [v, setV] = useState<Values>({
    nama: "", email: "", telepon: "", negara: "", institusi: "", prodi: "",
    jenjang: "", tahun: "", paspor: "", tanggalLahir: "", motivasi: "", setuju: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [serverError, setServerError] = useState<RegisterError>("server");
  const [negara, setNegara] = useState<Negara[]>([]);
  const [hariIni, setHariIni] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const dirty = useRef<Set<Key>>(new Set()); // kolom yang sudah diisi/diubah pengguna

  // Daftar negara dibuat di browser (Intl.DisplayNames) agar tidak berbeda dengan hasil server
  useEffect(() => {
    setNegara(daftarNegara(BAHASA));
    setHariIni(new Date().toISOString().slice(0, 10));
  }, []);

  /** Validasi satu kolom memakai aturan yang sama dengan skema penuh. */
  const cek = (k: Key, val: unknown) => {
    const aturan = (registrationSchema.shape as Record<string, ZodTypeAny>)[k];
    if (!aturan) return;
    const r = aturan.safeParse(val);
    setErrors((p) => ({ ...p, [k]: r.success ? undefined : r.error.issues[0]?.message }));
  };

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    dirty.current.add(k as Key);
    // galat yang sedang tampil diperbarui langsung begitu pengguna mengetik; pilihan divalidasi saat dipilih
    if (errors[k as Key] || LANGSUNG.includes(k as Key)) cek(k as Key, val);
  };

  /** Saat keluar dari kolom: validasi hanya jika kolom itu sudah diisi/diubah. */
  const keluar = (k: Key) => {
    if (!dirty.current.has(k)) return;
    if (k === "telepon") {
      const rapi = rapikanTelepon(v.telepon);
      if (rapi !== v.telepon) setV((p) => ({ ...p, telepon: rapi }));
      cek(k, rapi);
      return;
    }
    cek(k, v[k]);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phase === "sending") return;
    const parsed = registrationSchema.safeParse(v);
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as Key;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      const first = FIELD_ORDER.find((f) => errs[f]);
      if (first) document.getElementById(first)?.focus();
      return;
    }
    setErrors({});
    setPhase("sending");
    const negaraNama = negara.find((n) => n.kode === parsed.data.negara)?.nama ?? parsed.data.negara;
    const res = await submitRegistration({ ...parsed.data, negaraNama, website: honeypot.current?.value ?? "" });
    if (res.ok) {
      setPhase("success");
    } else {
      setServerError(res.error);
      setPhase("error");
    }
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  }

  const err = (k: Key) => errors[k];
  const common = (k: Key, hint = false) => ({
    id: k,
    "aria-invalid": err(k) ? (true as const) : undefined,
    "aria-describedby": [hint ? `${k}-hint` : "", err(k) ? `${k}-err` : ""].filter(Boolean).join(" ") || undefined,
    className: `field ${err(k) ? "field-error" : ""}`,
    onBlur: () => keluar(k),
  });
  // Fungsi biasa (bukan komponen) agar elemen tidak dibuat ulang tiap ketikan dan animasi hanya berjalan sekali
  const msg = (k: Key) =>
    err(k) ? <p key={err(k)} id={`${k}-err`} role="alert" className="msg-in m-0 text-sm text-red-700">{err(k)}</p> : null;
  const opsional = <span className="font-normal text-[#777]"> ({T.opsional})</span>;

  if (phase === "success") {
    return (
      <div ref={resultRef} role="status" className="min-w-0 flex-[2_1_560px] rounded-3xl border-2 border-esco-purple bg-white p-8">
        <div className="flex items-center gap-3">
          <svg className="check-ring flex-none" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <circle cx="20" cy="20" r="20" fill="#3D1160" />
            <path className="check-draw" d="M12 20.5l5.5 5.5L28 15" stroke="#FFD43B" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="text-xl font-bold">{T.berhasil.judul}</div>
        </div>
        <p className="mb-0 mt-3 text-sm text-[#444]">
          Terima kasih, {v.nama}. {T.berhasil.sebelumEmail} <strong>{v.email}</strong>.
        </p>
        <Link href="/" className="btn-purple mt-5">{T.berhasil.kembali}</Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex min-w-0 flex-[2_1_560px] flex-col gap-5 rounded-3xl border border-esco-line bg-white p-5 sm:p-9">
      <div className="text-xl font-bold">{T.judul}</div>

      <div className={row}>
        <div className={col}>
          <label htmlFor="nama" className={labelCls}>{T.field.nama.label}</label>
          <input {...common("nama")} type="text" autoComplete="name" placeholder={T.field.nama.placeholder} value={v.nama} onChange={(e) => set("nama", e.target.value)} />
          {msg("nama")}
        </div>
        <div className={col}>
          <label htmlFor="email" className={labelCls}>{T.field.email.label}</label>
          <input {...common("email", true)} type="email" autoComplete="email" placeholder={T.field.email.placeholder} value={v.email} onChange={(e) => set("email", e.target.value)} />
          <p id="email-hint" className={hintCls}>{T.field.email.hint}</p>
          {msg("email")}
        </div>
      </div>

      <div className={row}>
        <div className={col}>
          <label htmlFor="telepon" className={labelCls}>{T.field.telepon.label}</label>
          <input {...common("telepon", true)} type="tel" inputMode="tel" autoComplete="tel" placeholder={T.field.telepon.placeholder} value={v.telepon} onChange={(e) => set("telepon", e.target.value)} />
          <p id="telepon-hint" className={hintCls}>{T.field.telepon.hint}</p>
          {msg("telepon")}
        </div>
        <div className={col}>
          <label htmlFor="negara" className={labelCls}>{T.field.negara.label}</label>
          <select {...common("negara")} autoComplete="country" value={v.negara} onChange={(e) => set("negara", e.target.value)}>
            <option value="">{T.field.negara.placeholder}</option>
            {negara.map((n) => <option key={n.kode} value={n.kode}>{n.nama}</option>)}
          </select>
          {msg("negara")}
        </div>
      </div>

      <div className={row}>
        <div className={col}>
          <label htmlFor="institusi" className={labelCls}>{T.field.institusi.label}</label>
          <input {...common("institusi")} type="text" placeholder={T.field.institusi.placeholder} value={v.institusi} onChange={(e) => set("institusi", e.target.value)} />
          {msg("institusi")}
        </div>
        <div className={col}>
          <label htmlFor="prodi" className={labelCls}>{T.field.prodi.label}</label>
          <input {...common("prodi")} type="text" placeholder={T.field.prodi.placeholder} value={v.prodi} onChange={(e) => set("prodi", e.target.value)} />
          {msg("prodi")}
        </div>
      </div>

      <div className={row}>
        <div className={col}>
          <label htmlFor="jenjang" className={labelCls}>{T.field.jenjang.label}</label>
          <select {...common("jenjang")} value={v.jenjang} onChange={(e) => set("jenjang", e.target.value)}>
            <option value="">{T.field.jenjang.placeholder}</option>
            {T.jenjangOpsi.map((o) => <option key={o.nilai} value={o.nilai}>{o.label}</option>)}
          </select>
          {msg("jenjang")}
        </div>
        <div className={col}>
          <label htmlFor="tahun" className={labelCls}>{T.field.tahun.label}{opsional}</label>
          <select {...common("tahun")} value={v.tahun} onChange={(e) => set("tahun", e.target.value)}>
            <option value="">{T.field.tahun.placeholder}</option>
            {T.tahunOpsi.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className={row}>
        <div className={col}>
          <label htmlFor="paspor" className={labelCls}>{T.field.paspor.label}{opsional}</label>
          <input {...common("paspor", true)} type="text" autoComplete="off" autoCapitalize="characters" placeholder={T.field.paspor.placeholder} value={v.paspor} onChange={(e) => set("paspor", e.target.value)} />
          <p id="paspor-hint" className={hintCls}>{T.field.paspor.hint}</p>
          {msg("paspor")}
        </div>
        <div className={col}>
          <label htmlFor="tanggalLahir" className={labelCls}>{T.field.tanggalLahir.label}{opsional}</label>
          <input {...common("tanggalLahir", true)} type="date" autoComplete="bday" min="1930-01-01" max={hariIni || undefined} value={v.tanggalLahir} onChange={(e) => set("tanggalLahir", e.target.value)} />
          <p id="tanggalLahir-hint" className={hintCls}>{T.field.tanggalLahir.hint}</p>
          {msg("tanggalLahir")}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="motivasi" className={labelCls}>{T.field.motivasi.label}{opsional}</label>
        <textarea id="motivasi" rows={4} className="field" placeholder={T.field.motivasi.placeholder} value={v.motivasi} onChange={(e) => set("motivasi", e.target.value)} />
      </div>

      {/* honeypot: disembunyikan dari pengguna, diisi bot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input ref={honeypot} id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-start gap-3">
          <input id="setuju" type="checkbox" checked={v.setuju} onChange={(e) => set("setuju", e.target.checked)}
            aria-invalid={err("setuju") ? true : undefined} aria-describedby={err("setuju") ? "setuju-err" : undefined}
            className="mt-0.5 h-5 w-5 flex-none accent-[#3D1160]" />
          <label htmlFor="setuju" className="min-h-[24px] text-sm font-normal text-[#444]">{T.setuju}</label>
        </div>
        {msg("setuju")}
      </div>

      <p className="m-0 text-xs text-[#555]">{site.privasi}</p>

      {phase === "error" && (
        <div ref={resultRef} role="alert" className="msg-in rounded-2xl border-2 border-dashed border-esco-purple bg-white p-5">
          <div className="text-lg font-bold">{T.gagal.judul}</div>
          <p className="mb-0 mt-1.5 text-sm text-[#444]">{ERROR_MESSAGES[serverError]} {T.gagal.tambahan}</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={phase === "sending"} aria-busy={phase === "sending"} className="btn-purple min-h-[48px] !px-9 cursor-pointer">
          {phase === "sending" && (
            <svg className="mr-2.5 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".3" strokeWidth="3" />
              <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
          {phase === "sending" ? T.mengirim : phase === "error" ? T.cobaLagi : T.kirim}
        </button>
      </div>
    </form>
  );
}
