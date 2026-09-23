**Sumber literasi dasar untuk programmer: membangun website tes personality IPIP-NEO-120 (gratis, tercatat, dan bertanggung jawab secara ilmiah)**

Berikut ringkasan yang sudah dipelajari dari sumber-sumber yang Anda berikan, plus desain praktis yang siap diimplementasikan.

### 1. Fondasi ilmiah & legal (wajib dipahami & dicantumkan di website)

**Apa itu IPIP & IPIP-NEO-120?**
- **International Personality Item Pool (IPIP)** adalah kolaboratori ilmiah publik domain yang dimulai oleh Lewis R. Goldberg (Oregon Research Institute). Berisi >3.000 item yang bebas digunakan, diedit, diterjemahkan, atau dipakai untuk tujuan apa pun (komersial maupun non-komersial) **tanpa izin dan tanpa biaya**.
- **IPIP-NEO-120** dikembangkan oleh John A. Johnson (2014) sebagai versi pendek (120 item) dari IPIP-NEO-300 yang merepresentasikan struktur **Five-Factor Model (FFM / Big Five / OCEAN)** + 30 facets yang setara dengan NEO PI-R (Costa & McCrae). Setiap domain punya 6 facets, setiap facet diukur oleh 4 item.

**Struktur lengkap (5 domain × 6 facets):**

| Domain              | Facets (4 item per facet) |
|---------------------|---------------------------|
| **Neuroticism (N)** | Anxiety, Anger, Depression, Self-Consciousness, Immoderation, Vulnerability |
| **Extraversion (E)**| Friendliness, Gregariousness, Assertiveness, Activity Level, Excitement-Seeking, Cheerfulness |
| **Openness (O)**    | Imagination, Artistic Interests, Emotionality, Adventurousness, Intellect, Liberalism |
| **Agreeableness (A)**| Trust, Morality, Altruism, Cooperation, Modesty, Sympathy |
| **Conscientiousness (C)** | Self-Efficacy, Orderliness, Dutifulness, Achievement-Striving, Self-Discipline, Cautiousness |

**Validitas & reliabilitas (dari Johnson, 2014 – *Journal of Research in Personality*)**:
- Dikembangkan dari sampel internet besar (N ≈ 21.588 untuk seleksi item), lalu divalidasi di beberapa sampel lain termasuk Eugene-Springfield community sample (N=481), internet samples (N=307.313 & 619.150), dan sampel lokal.
- Mean alpha facets ≈ 0.68–0.75 (masih acceptable untuk 4-item scales); domain lebih tinggi.
- Konvergen kuat dengan NEO PI-R (mean r ≈ 0.66–0.73 raw, lebih tinggi setelah koreksi attenuation).
- Struktur faktor hampir identik dengan NEO PI-R.
- Item public domain → tidak ada masalah copyright.

**Cara sitasi yang benar** (wajib di footer / halaman About / Results):
- Umum IPIP: Goldberg, L. R. (1999) atau Goldberg et al. (2006). *Journal of Research in Personality*.
- Khusus IPIP-NEO-120: **Johnson, J. A. (2014). Measuring thirty facets of the Five Factor Model with a 120-item public domain inventory: Development of the IPIP-NEO-120. *Journal of Research in Personality, 51*, 78–89.** https://doi.org/10.1016/j.jrp.2014.05.003
- Website IPIP: http://ipip.ori.org/

**Permission**: Tidak perlu minta izin. Cukup cantumkan sitasi.

**Scoring resmi** (harus diikuti tepat):
- Skala: Very Inaccurate = 1 … Very Accurate = 5.
- Item **+ keyed**: skor langsung (1–5).
- Item **– keyed**: reverse (5–1).
- Skor facet = jumlah 4 item (range 4–20).
- Skor domain = rata-rata 6 facet atau jumlah 24 item (biasanya mean facet atau total 24–120, lalu dinormalisasi).

Daftar lengkap 120 item + keying ada di: https://ipip.ori.org/30FacetNEO-PI-RItems.htm

**Norms & interpretasi**:
- Tidak ada “norma universal” resmi. Banyak implementasi memakai data Johnson (N ratusan ribu online self-selected) yang dipisah usia & jenis kelamin, lalu hitung percentile.
- Deskripsi teks domain & facet ditulis oleh Johnson sendiri (berdasarkan literatur). Banyak situs mereproduksi deskripsi tersebut dengan atribusi.
- Hindari klaim diagnostik. Selalu tulis: “ini bukan alat diagnosis klinis”, “hasil sebaiknya dibahas dengan orang yang mengenal Anda”, dll.

Sumber data mentah & scoring tool: OSF Johnson repository (https://osf.io/tbmh5/ dan komponen terkait seperti https://osf.io/wxvth/).

### 2. Desain arsitektur website (GitHub + Cloudflare Pages + Vite + D1)

**Stack yang direkomendasikan (gratis & scalable):**
- **Frontend**: Vite + React (atau Vue/Svelte) + TypeScript.
- **Hosting**: Cloudflare Pages (deploy langsung dari GitHub).
- **Backend / API**: Cloudflare Workers.
- **Database**: Cloudflare D1 (SQLite serverless) — untuk menyimpan hasil tes secara anonim/tercatat.
- **Opsional**: Cloudflare KV untuk cache norms, R2 untuk export data agregat.

**Alur user yang bertanggung jawab:**
1. Landing page → penjelasan singkat + sitasi ilmiah + disclaimer.
2. Form opsional: usia, gender (untuk percentile yang lebih akurat), consent checkbox (“Saya setuju data jawaban disimpan secara anonim untuk keperluan penelitian & peningkatan kualitas”).
3. Tes 120 item (bisa dipecah per halaman 10–20 item, progress bar, opsi “simpan sementara”).
4. Setelah selesai → hitung skor di client atau di Worker (lebih aman di Worker agar item keying tidak mudah di-reverse-engineer).
5. Halaman hasil: radar/bar chart 5 domain + 30 facets + percentile (jika ada data) + deskripsi teks Johnson + tombol unduh PDF/JSON + opsi “simpan hasil ke akun” (jika ada auth).
6. Data tersimpan di D1: `session_id` (UUID), timestamp, usia/gender (opsional), array 120 jawaban (atau hanya skor final + metadata), IP hash (opsional), consent flag.

**Schema D1 sederhana (contoh):**
```sql
CREATE TABLE responses (
  id TEXT PRIMARY KEY,               -- UUID
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  age INTEGER,
  gender TEXT,                       -- 'M' | 'F' | 'Other' | null
  consent INTEGER,                   -- 0/1
  answers TEXT,                      -- JSON array of 120 integers (1-5)
  scores TEXT,                       -- JSON {N: xx, E: xx, ... facets: {...}}
  user_agent TEXT,
  country TEXT                       -- dari CF request.cf
);
```

**Keamanan & etika:**
- Jangan simpan data pribadi yang bisa identify orang.
- Sediakan opsi “hapus data saya”.
- Rate-limit di Worker.
- Jangan klaim “hasil resmi” atau “diagnostik”.
- Link ke paper Johnson 2014 dan IPIP.ori.org di setiap halaman hasil.

### 3. Implementasi teknis inti (panduan programmer)

**A. Data item (simpan di `/src/data/ipip-neo-120.ts`)**
- Array 120 objek: `{ id: 1, text: "Worry about things.", facet: "N1", keyed: "+" }`
- Salin persis dari https://ipip.ori.org/30FacetNEO-PI-RItems.htm

**B. Scoring function (pure TypeScript, bisa dijalankan di client atau Worker)**
```ts
function scoreIPIP(answers: number[]) { // answers[0] = item 1 (1-5)
  // reverse keyed items
  // sum per facet (4 items)
  // average atau sum per domain
  return { domains: {...}, facets: {...} };
}
```

**C. Deploy flow**
1. Buat repo GitHub.
2. `npm create vite@latest` → pilih React + TS.
3. Tambah Cloudflare Pages adapter / Wrangler.
4. Bind D1 database di `wrangler.toml`.
5. Worker endpoint `/api/submit` menerima JSON jawaban → validasi → score → insert D1 → return hasil.
6. Pages otomatis deploy on push ke `main`.

**D. Fitur tambahan yang meningkatkan kredibilitas ilmiah**
- Halaman “Methodology” yang menjelaskan: item dari IPIP, scoring Johnson 2014, sitasi, link OSF data.
- Export data agregat (tanpa individual) untuk researcher (dengan consent).
- Open-source seluruh kode di GitHub (termasuk scoring) supaya bisa diaudit.
- Opsional: gunakan norms publik dari data Johnson (N≈600k) yang sudah di-filter (ada di beberapa repositori GitHub / OSF).

### 4. Checklist “dapat dipertanggungjawabkan secara ilmiah”

- [ ] Sitasi Johnson (2014) + Goldberg et al. di setiap halaman penting.
- [ ] Link langsung ke https://ipip.ori.org/ dan paper.
- [ ] Scoring 100% mengikuti instruksi resmi IPIP.
- [ ] Item teks sama persis (jangan ubah wording tanpa alasan kuat).
- [ ] Disclaimer jelas: bukan alat klinis, hasil relatif terhadap sampel online, dll.
- [ ] Data hanya disimpan dengan consent, anonim, dan bisa dihapus.
- [ ] Kode open-source.
- [ ] Tidak menjual data atau menampilkan iklan yang merusak kredibilitas.

Dengan mengikuti fondasi di atas, website Anda akan:
- **Gratis** untuk visitor.
- **Tercatat** (D1).
- **Bertanggung jawab secara ilmiah** karena memakai instrumen public-domain yang sudah divalidasi besar-besaran dan memberikan atribusi + transparansi penuh.

Jika Anda butuh template kode starter (Vite + Worker + D1 schema + scoring function), daftar item lengkap dalam JSON, atau contoh halaman Results dengan deskripsi Johnson, beri tahu saja.
