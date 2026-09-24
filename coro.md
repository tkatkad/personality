# Dokumentasi Fitur Aplikasi Web IPIP-NEO-120 Free Personality Test

Dokumen ini berisi rincian seluruh fitur yang telah diimplementasikan pada aplikasi web **IPIP-NEO-120 Free Personality Test**, mencakup arsitektur **Frontend** maupun **Backend**.

---

## 🏗️ Teknologi Utama (Tech Stack)

- **Frontend**: Vite + React 18 + TypeScript (Strict) + Tailwind CSS v4
- **State Management**: Zustand (dengan persistensi `localStorage`)
- **Routing**: React Router v6
- **Visualisasi & Diagram**: Recharts (Radar Chart & Bar Chart)
- **Ekspor & Utilitas**: jsPDF, html2canvas, Canvas Confetti, Lucide Icons
- **Backend / API**: Cloudflare Workers (Serverless JavaScript/TypeScript Engine)
- **Database**: Cloudflare D1 (Serverless SQLite Database)
- **Deployment & Hosting**: Cloudflare Pages + Wrangler CLI

---

## 🎨 FITUR FRONTEND

### 1. Landing Page (`/`)
- **Header & Title**: Judul utama "IPIP-NEO-120 Free Personality Test".
- **Penjelasan Ilmiah Big Five**: Overview 5 domain utama (*Neuroticism, Extraversion, Openness to Experience, Agreeableness, Conscientiousness*) dan 30 sub-faset kepribadian.
- **Sitasi Akademik Terintegrasi**: Sitasi ilmiah resmi dari Dr. John A. Johnson (2014) *Journal of Research in Personality* dan Lewis R. Goldberg et al. (2006).
- **Link Sumber Resmi**: Tautan langsung ke repository resmi IPIP (`ipip.ori.org`) dan DOI paper jurnal.
- **Disclaimer Klinis Transparan**: Peringatan jelas bahwa tes ini adalah instrumen riset/eksplorasi diri dan **bukan** alat diagnosis klinis psikiatris.
- **Call-to-Action (CTA)**: Tombol utama "Mulai Tes Gratis (120 Soal)" dan opsi sekunder "Ikut Studi Test-Retest".

### 2. Consent & Data Demografi Opsional (`/consent`)
- **Persetujuan Etika (Consent Checkbox)**: Konfirmasi persetujuan penyimpanan jawaban secara anonim untuk penelitian psikometri.
- **Data Demografi Opsional**: Form pengisian usia dan jenis kelamin (*Male, Female, Non-binary, Prefer not to say*) untuk keperluan norma populasi.
- **Generasi UUID Otomatis**: Pembuatan v4 UUID unik crypto-secure untuk setiap responden.

### 3. Halaman Pengerjaan Tes 120 Soal (`/test`)
- **Desain Mobile-First**: Tampilan 1 item per layar pada perangkat seluler (opsi 3-5 item di layar desktop).
- **Skala Likert 5 Poin**:
  1. *Very Inaccurate* (Sangat Tidak Akurat)
  2. *Moderately Inaccurate* (Cukup Tidak Akurat)
  3. *Neither Accurate nor Inaccurate* (Netral)
  4. *Moderately Accurate* (Cukup Akurat)
  5. *Very Accurate* (Sangat Akurat)
- **Keyboard Shortcuts**: Dukungan penekanan tombol angka `1`–`5` pada keyboard untuk menjawab secara instan dan otomatis berpindah ke soal berikutnya.
- **Navigasi Lengkap**: Tombol *Previous*, *Next*, dan *"Simpan & Lanjutkan Nanti"*.
- **Peta Soal / Drawer Map**: Modal grid 120 nomor soal untuk melompat langsung ke nomor tertentu dan melihat status soal mana yang sudah/belum dijawab.
- **Visual Progress Bar**: Indikator persentase pengerjaan dan status tersimpan (*Auto-saved*).
- **Scoring Engine Client**: Penerapan *reverse scoring* otomatis untuk item berskor negatif (`-`) langsung di sisi client.

### 4. Halaman Hasil & Laporan Psikometrik (`/result/:id`)
- **Radar Chart 5 Domain**: Grafik spider/radar interaktif dari Recharts yang menampilkan profil 5 domain utama.
- **Horizontal Bar Chart 30 Faset**: Grafik batang horizontal untuk 30 sub-faset yang dikelompokkan per domain beserta kategori tingkatannya (*Low, Average, High*).
- **Deskripsi Trait Ilmiah**: Penjelasan naratif untuk setiap domain dan faset berdasarkan norma Johnson (2014).
- **Ekspor Laporan PDF**: Tombol unduh laporan hasil dalam bentuk dokumen PDF siap cetak (`jsPDF` + `html2canvas`).
- **Ekspor Data Mentah JSON**: Tombol unduh data mentah jawaban & skor dalam format `.json`.
- **Fitur Bagikan Hasil**: Generasi link unik berdasarkan UUID responden untuk dibagikan.
- **Picu Sesi Retest**: Tombol untuk langsung memulai sesi test-retest ulang terhubung.

### 5. Fitur Studi Test-Retest (`/retest`)
- **Protokol Ketahanan Waktu**: Halaman khusus untuk responden yang ingin menguji stabilitas hasil kepribadian mereka setelah selang waktu (misal 2 minggu atau 1 bulan).
- **Verifikasi UUID**: Form pencarian UUID lama untuk menghubungkan sesi tes baru dengan sesi tes sebelumnya.

### 6. Halaman Metodologi & Privasi (`/methodology` & `/privacy`)
- **Metodologi Psikometrik**: Rincian koefisien konsistensi internal Cronbach’s Alpha ($\alpha$), korelasi item-total, dan validitas konvergen dengan NEO PI-R.
- **Kebijakan Privasi & Etika**: Transparansi ketiadaan *Personally Identifiable Information* (PII), kebijakan penyimpanan `localStorage` & D1, serta etika riset psikologi.

### 7. Pengalaman Pengguna (UX) & Aksesibilitas
- **Dark Mode Toggle**: Dukungan mode gelap dan terang secara global.
- **Bilingual (EN / ID)**: Fitur beralih bahasa instan antara Bahasa Indonesia dan Bahasa Inggris di seluruh bagian aplikasi.
- **Skeleton Loading & Error Boundary**: Pengoperasian aplikasi yang mulus dengan penanganan error React graceful.
- **SEO & Open Graph**: Metadata SEO, Open Graph social share cards, dan Schema.org JSON-LD terintegrasi.

---

## ⚙️ FITUR BACKEND (Cloudflare Worker & D1 Database)

### 1. Database Cloudflare D1 (SQLite Schema)
Tabel `responses` terstruktur untuk menyimpan data riset secara efisien:
```sql
CREATE TABLE IF NOT EXISTS responses (
  id TEXT PRIMARY KEY,                -- v4 UUID
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  age INTEGER,
  gender TEXT,
  consent INTEGER DEFAULT 0,
  answers TEXT NOT NULL,              -- JSON Array 120 angka (1-5)
  scores TEXT,                        -- JSON Object domain + 30 facets
  user_agent TEXT,
  country TEXT,
  is_retest INTEGER DEFAULT 0,
  retest_of TEXT                      -- UUID asal jika sesi retest
);

CREATE INDEX IF NOT EXISTS idx_responses_retest ON responses(retest_of);
```

### 2. Endpoint API Serverless (Cloudflare Worker)
- **`POST /api/submit`**:
  - Menerima payload jawaban 120 item, skor terhitung, serta data demografi.
  - Memvalidasi kelengkapan data.
  - Merekam metadata koneksi (User-Agent dan Country jika tersedia dari Cloudflare edge).
  - Menyimpan data ke tabel D1 `responses`.
- **`GET /api/result/:id`**:
  - Mengambil data hasil tes dan profil skor berdasarkan UUID responden dari database D1.
  - Mengembalikan format JSON terstruktur untuk ditampilkan pada Halaman Hasil.
- **`POST /api/retest`**:
  - Menyimpan data pengerjaan ulang (retest) dan menghubungkannya dengan UUID asli (`retest_of`).

### 3. Ketahanan & Resiliensi API
- **Dukungan CORS**: Konfigurasi header CORS untuk interaksi aman.
- **Fallback Client-Side**: Jika backend D1 atau Worker tidak dapat diakses (misal saat mode luring), aplikasi secara otomatis membaca dan menyimpan hasil dari Zustand / `localStorage` tanpa mengganggu pengalaman pengguna.

---

## 🔍 METADATA & SCHEMA JSON-LD UNTUK SETIAP HALAMAN

Setiap halaman web diinjeksi secara dinamis dengan **Schema.org Structured Data (JSON-LD)** untuk mengoptimalkan SEO dan tampilan rich snippets pada mesin pencari (Google, Bing, dll.):

1. **Halaman Utam / Landing Page (`/`)**:
   - `WebApplication`: Menyebutkan nama aplikasi, kategori `EducationalApplication`, operasional gratis (`Offer`), serta pencipta Dr. John A. Johnson (2014).
   - `FAQPage`: Menjawab pertanyaan umum (IPIP-NEO-120, durasi tes 10-15 menit, gratis tanpa pendaftaran).
   - `BreadcrumbList`: Struktur navigasi hirarkis.

2. **Halaman Consent & Demografi (`/consent`)**:
   - `WebPage`: Deskripsi etika riset anonim dan demografi.
   - `BreadcrumbList`: Home > Persetujuan Etika.

3. **Halaman Kuesioner Tes 120 Soal (`/test`)**:
   - `Quiz` / `Assessment`: Properti tes evaluasi psikometri 120 item skala Likert.
   - `BreadcrumbList`: Home > Kuesioner Tes.

4. **Halaman Hasil Laporan Psikometri (`/result/:id`)**:
   - `ItemPage` & `MedicalWebPage`: Laporan analisis kepribadian Big Five & 30 sub-faset.
   - `BreadcrumbList`: Home > Hasil Laporan.

5. **Halaman Metodologi Ilmiah (`/methodology`)**:
   - `ScholarlyArticle`: Penjelasan validitas psikometri, Cronbach’s Alpha, korelasi item-total, dan sitasi DOI Johnson (2014).
   - `BreadcrumbList`: Home > Metodologi.

6. **Halaman Studi Test-Retest (`/retest`)**:
   - `MedicalWebPage`: Protokol pengujian stabilitas kepribadian dari waktu ke waktu.
   - `BreadcrumbList`: Home > Studi Test-Retest.

7. **Halaman Kebijakan Privasi (`/privacy`)**:
   - `WebPage`: Jaminan Zero PII & keamanan data anonim.
   - `BreadcrumbList`: Home > Kebijakan Privasi.

