"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { kelasList } from "@/data/kelas";
import { site } from "@/data/site";
import { ERROR_MESSAGES, submitRegistration, type RegisterError } from "@/lib/register";
import { FIELD_ORDER, registrationSchema } from "@/lib/validation";

type Values = {
  nama: string; npm: string; email: string; wa: string; institusi: string;
  prodi: string; semester: string; kelas: string; motivasi: string; setuju: boolean;
};
type Errors = Partial<Record<(typeof FIELD_ORDER)[number], string>>;
type Phase = "idle" | "sending" | "success" | "error";

const SEMESTER = ["1", "2", "3", "4", "5", "6", "7", "8", "Lainnya (guru / umum)"];

export default function RegistrationForm({ defaultKelas = "" }: { defaultKelas?: string }) {
  const valid = kelasList.some((k) => k.slug === defaultKelas) ? defaultKelas : "";
  const [v, setV] = useState<Values>({
    nama: "", npm: "", email: "", wa: "", institusi: "", prodi: "",
    semester: "", kelas: valid, motivasi: "", setuju: false,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [phase, setPhase] = useState<Phase>("idle");
  const [serverError, setServerError] = useState<RegisterError>("server");
  const honeypot = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phase === "sending") return;
    const kelasNama = kelasList.find((k) => k.slug === v.kelas)?.nama ?? "";
    const parsed = registrationSchema.safeParse({ ...v, kelas: v.kelas ? kelasNama : "" });
    if (!parsed.success) {
      const errs: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      const first = FIELD_ORDER.find((f) => errs[f]);
      if (first) document.getElementById(first)?.focus();
      return;
    }
    setErrors({});
    setPhase("sending");
    const res = await submitRegistration({ ...parsed.data, website: honeypot.current?.value ?? "" });
    if (res.ok) {
      setPhase("success");
    } else {
      setServerError(res.error);
      setPhase("error");
    }
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
  }

  const err = (k: keyof Errors) => errors[k];
  const common = (k: keyof Errors) => ({
    id: k,
    "aria-invalid": err(k) ? (true as const) : undefined,
    "aria-describedby": err(k) ? `${k}-err` : undefined,
    className: `field ${err(k) ? "field-error" : ""}`,
  });
  const Msg = ({ k }: { k: keyof Errors }) =>
    err(k) ? <p id={`${k}-err`} role="alert" className="m-0 text-sm text-red-700">{err(k)}</p> : null;
  const labelCls = "text-sm font-semibold text-[#2b1d3a]";
  const row = "flex flex-wrap gap-5";
  const col = "flex min-w-0 flex-[1_1_240px] flex-col gap-1.5";

  if (phase === "success") {
    return (
      <div ref={resultRef} role="status" className="min-w-0 flex-[2_1_560px] rounded-3xl border-2 border-esco-purple bg-white p-8">
        <div className="text-xl font-bold">Pendaftaran berhasil</div>
        <p className="mb-0 mt-2 text-sm text-[#444]">Terima kasih, {v.nama}. Cek email <strong>{v.email}</strong> untuk detail dan informasi akses Virtual Class Unila.</p>
        <Link href="/" className="btn-purple mt-5">Kembali ke beranda</Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex min-w-0 flex-[2_1_560px] flex-col gap-5 rounded-3xl border border-esco-line bg-white p-5 sm:p-9">
      <div className="text-xl font-bold">Data diri peserta</div>

      <div className={row}>
        <div className={col}>
          <label htmlFor="nama" className={labelCls}>Nama lengkap</label>
          <input {...common("nama")} type="text" autoComplete="name" placeholder="Sesuai identitas" value={v.nama} onChange={(e) => set("nama", e.target.value)} />
          <Msg k="nama" />
        </div>
        <div className={col}>
          <label htmlFor="npm" className={labelCls}>NPM / NIK</label>
          <input {...common("npm")} type="text" inputMode="numeric" placeholder="[Nomor identitas]" value={v.npm} onChange={(e) => set("npm", e.target.value)} />
          <Msg k="npm" />
        </div>
      </div>

      <div className={row}>
        <div className={col}>
          <label htmlFor="email" className={labelCls}>Email aktif</label>
          <input {...common("email")} type="email" autoComplete="email" placeholder="nama@email.com" value={v.email} onChange={(e) => set("email", e.target.value)} />
          <Msg k="email" />
        </div>
        <div className={col}>
          <label htmlFor="wa" className={labelCls}>Nomor WhatsApp</label>
          <input {...common("wa")} type="tel" autoComplete="tel" placeholder="08xxxxxxxxxx" value={v.wa} onChange={(e) => set("wa", e.target.value.replace(/[\s-]/g, ""))} />
          <Msg k="wa" />
        </div>
      </div>

      <div className={row}>
        <div className={col}>
          <label htmlFor="institusi" className={labelCls}>Asal institusi</label>
          <input {...common("institusi")} type="text" placeholder="[Nama universitas / sekolah]" value={v.institusi} onChange={(e) => set("institusi", e.target.value)} />
          <Msg k="institusi" />
        </div>
        <div className={col}>
          <label htmlFor="prodi" className={labelCls}>Program studi</label>
          <input {...common("prodi")} type="text" placeholder="[Program studi]" value={v.prodi} onChange={(e) => set("prodi", e.target.value)} />
          <Msg k="prodi" />
        </div>
      </div>

      <div className={row}>
        <div className={col}>
          <label htmlFor="semester" className={labelCls}>Semester</label>
          <select {...common("semester")} value={v.semester} onChange={(e) => set("semester", e.target.value)}>
            <option value="">Pilih semester</option>
            {SEMESTER.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <Msg k="semester" />
        </div>
        <div className={col}>
          <label htmlFor="kelas" className={labelCls}>Pilihan kelas / kegiatan</label>
          <select {...common("kelas")} value={v.kelas} onChange={(e) => set("kelas", e.target.value)}>
            <option value="">Pilih kelas</option>
            {kelasList.map((k) => <option key={k.slug} value={k.slug}>{k.nama}</option>)}
          </select>
          <Msg k="kelas" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="motivasi" className={labelCls}>Motivasi mengikuti ESCO <span className="font-normal text-[#777]">(opsional)</span></label>
        <textarea id="motivasi" rows={4} className="field" placeholder="[Tulis singkat alasan Anda mengikuti program]" value={v.motivasi} onChange={(e) => set("motivasi", e.target.value)} />
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
          <label htmlFor="setuju" className="min-h-[24px] text-sm font-normal text-[#444]">
            Saya menyatakan data di atas benar dan bersedia mengikuti program sampai selesai.
          </label>
        </div>
        <Msg k="setuju" />
      </div>

      <p className="m-0 text-xs text-[#555]">{site.privasi}</p>

      {phase === "error" && (
        <div ref={resultRef} role="alert" className="rounded-2xl border-2 border-dashed border-esco-purple bg-white p-5">
          <div className="text-lg font-bold">Pendaftaran gagal</div>
          <p className="mb-0 mt-1.5 text-sm text-[#444]">{ERROR_MESSAGES[serverError]} Data yang sudah diisi tidak hilang.</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={phase === "sending"} className="btn-purple min-h-[48px] !px-9 cursor-pointer">
          {phase === "sending" ? "Mengirim..." : phase === "error" ? "Coba lagi" : "Kirim Pendaftaran"}
        </button>
      </div>
    </form>
  );
}
