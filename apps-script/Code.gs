/**
 * Backend pendaftaran ESCO FKIP Unila (Google Apps Script Web App).
 * Deploy: Execute as "Me" (pemilik), Who has access "Anyone".
 * Sheet yang dibutuhkan di spreadsheet ini:
 *   - "Pendaftar"   : timestamp, nama, npm, email, wa, institusi, prodi, semester, kelas, motivasi
 *   - "Konfigurasi" : A2 = kuota total, B2 = tanggal penutupan (tanggal), C2 = status ("buka"/"tutup")
 * Jalankan setupSheets() sekali untuk membuat kedua sheet beserta header.
 */

var INFO_AKSES =
  "[Teks info akses Virtual Class Unila: akun, kode pendaftaran kelas, atau tautan. Isi dari panitia.]";
var NAMA_PENGIRIM = "Panitia ESCO FKIP Unila";

function setupSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var p = ss.getSheetByName("Pendaftar") || ss.insertSheet("Pendaftar");
  if (p.getLastRow() === 0) {
    p.appendRow(["timestamp", "nama", "npm", "email", "wa", "institusi", "prodi", "semester", "kelas", "motivasi"]);
  }
  var c = ss.getSheetByName("Konfigurasi") || ss.insertSheet("Konfigurasi");
  if (c.getLastRow() === 0) {
    c.appendRow(["kuota_total", "tanggal_penutupan", "status"]);
    c.appendRow([100, "", "buka"]);
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function ambilKonfigurasi_(ss) {
  var c = ss.getSheetByName("Konfigurasi");
  var v = c.getRange(2, 1, 1, 3).getValues()[0];
  return {
    kuota: Number(v[0]) || 0,
    tutup: v[1] ? new Date(v[1]) : null,
    status: String(v[2] || "buka").toLowerCase(),
  };
}

function jumlahPendaftar_(ss) {
  var p = ss.getSheetByName("Pendaftar");
  return Math.max(p.getLastRow() - 1, 0);
}

function statusBuka_(ss) {
  var cfg = ambilKonfigurasi_(ss);
  var sisa = cfg.kuota - jumlahPendaftar_(ss);
  var lewat = cfg.tutup && new Date() > new Date(cfg.tutup.getTime() + 24 * 3600 * 1000 - 1);
  var buka = cfg.status !== "tutup" && sisa > 0 && !lewat;
  return { buka: buka, sisa: Math.max(sisa, 0) };
}

function doGet() {
  var s = statusBuka_(SpreadsheetApp.getActiveSpreadsheet());
  return json_({ status: s.buka ? "open" : "closed", sisa: s.sisa });
}

function validasi_(d) {
  var str = function (x) { return typeof x === "string" ? x.trim() : ""; };
  if (str(d.nama).length < 3) return false;
  if (str(d.npm).length < 5) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(d.email))) return false;
  if (!/^(08|62)\d{8,12}$/.test(str(d.wa))) return false;
  if (str(d.institusi).length < 2) return false;
  if (str(d.prodi).length < 2) return false;
  if (!str(d.semester)) return false;
  if (!str(d.kelas)) return false;
  if (d.setuju !== true) return false;
  return true;
}

// Mencegah formula injection saat data dibuka di Sheets.
function aman_(x) {
  var s = String(x == null ? "" : x).trim().slice(0, 1000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var d;
    try {
      d = JSON.parse(e.postData.contents);
    } catch (err) {
      return json_({ ok: false, error: "invalid" });
    }
    // Honeypot: bot mengisi kolom ini. Balas sukses palsu tanpa menyimpan.
    if (d.website) return json_({ ok: true });
    if (!validasi_(d)) return json_({ ok: false, error: "invalid" });

    lock.waitLock(20000);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    var s = statusBuka_(ss);
    if (!s.buka) return json_({ ok: false, error: "closed" });

    var p = ss.getSheetByName("Pendaftar");
    var email = String(d.email).trim().toLowerCase();
    var last = p.getLastRow();
    if (last > 1) {
      var emails = p.getRange(2, 4, last - 1, 1).getValues();
      for (var i = 0; i < emails.length; i++) {
        if (String(emails[i][0]).trim().toLowerCase() === email) {
          return json_({ ok: false, error: "duplicate" });
        }
      }
    }

    p.appendRow([
      new Date(), aman_(d.nama), aman_(d.npm), email, "'" + aman_(d.wa), aman_(d.institusi),
      aman_(d.prodi), aman_(d.semester), aman_(d.kelas), aman_(d.motivasi),
    ]);
    SpreadsheetApp.flush();

    try {
      kirimEmail_(String(d.nama).trim(), String(d.kelas).trim(), email);
    } catch (mailErr) {
      // Data sudah tersimpan; kegagalan email tidak membatalkan pendaftaran.
      console.error("Email gagal: " + mailErr);
    }
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: "server" });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function kirimEmail_(nama, kelas, email) {
  var teks =
    "Halo " + nama + ",\n\n" +
    "Pendaftaran Anda di Education Summer Course Online (ESCO) FKIP Universitas Lampung berhasil.\n\n" +
    "Kelas: " + kelas + "\n\n" +
    "Info akses Virtual Class Unila:\n" + INFO_AKSES + "\n\n" +
    "Salam,\n" + NAMA_PENGIRIM;
  MailApp.sendEmail({
    to: email,
    subject: "Konfirmasi Pendaftaran ESCO FKIP Unila",
    body: teks,
    name: NAMA_PENGIRIM,
  });
}
