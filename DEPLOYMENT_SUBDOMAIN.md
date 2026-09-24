# Panduan Deployment Custom Subdomain: `personality-test.job.web.id`

Dokumen ini menjelaskan langkah demi langkah untuk menghubungkan repository GitHub [`tkatkad/personality`](https://github.com/tkatkad/personality) (milik `mbaktutuk@gmail.com`) ke subdomain **`personality-test.job.web.id`** yang dikelola di akun Cloudflare **`roy.wikan@gmail.com`**.

---

## 📌 Skenario & Arsitektur

- **Repository GitHub**: `https://github.com/tkatkad/personality` (Pemilik: `mbaktutuk@gmail.com`)
- **DNS Domain Utama**: `job.web.id` (Dikelola di Cloudflare DNS milik `roy.wikan@gmail.com`)
- **Target Subdomain**: `personality-test.job.web.id`

Terdapat **2 Metode** yang dapat dipilih sesuai preferensi akses akun Anda:

---

## 🟢 METODE 1 (Paling Mudah & Direkomendasikan)
> **Menghubungkan Pages langsung di Akun Cloudflare `roy.wikan@gmail.com`**

Sebab Cloudflare Pages dapat menarik repository dari akun GitHub mana saja selama diberi izin akses, metode ini paling cepat karena pembuatan DNS dan Sertifikat SSL dilakukan otomatis 100%.

### Langkah-langkah:

1. **Beri Izin Akses Repo GitHub ke Cloudflare**:
   - Buka GitHub [`tkatkad/personality`](https://github.com/tkatkad/personality) dari akun `mbaktutuk@gmail.com`.
   - Masuk ke **Settings** -> **Collaborators** -> Klik **Add people** -> Undang akun GitHub milik `roy.wikan` (atau saat setup Cloudflare Pages, otorisasikan akses Cloudflare GitHub App ke repo tersebut).

2. **Deploy Cloudflare Pages di Akun `roy.wikan@gmail.com`**:
   - Login ke [Dashboard Cloudflare](https://dash.cloudflare.com) menggunakan akun `roy.wikan@gmail.com`.
   - Pilih menu **Workers & Pages** -> Klik **Create application** -> Tab **Pages** -> Klik **Connect to Git**.
   - Pilih akun GitHub dan pilih repository `tkatkad/personality`.
   - Konfigurasi Build Settings:
     - **Project Name**: `personality-test` (atau nama lain yang diinginkan)
     - **Framework preset**: `Vite`
     - **Build command**: `pnpm run build` (atau `npm run build`)
     - **Build output directory**: `dist`
   - Klik **Save and Deploy**.

3. **Binding Database Cloudflare D1**:
   - Di dashboard proyek Pages Anda (`roy.wikan@gmail.com`), buka **Settings** -> **Functions** -> **D1 Database Bindings**.
   - Klik **Add binding**:
     - **Variable name**: `DB`
     - **D1 database**: Pilih database `psikotest-db` (ID: `80fc899c-d6c6-47e8-8be9-0db0ee513671`).
   - Eksekusi tabel SQL jika belum:
     ```bash
     npx wrangler d1 execute psikotest-db --remote --file=./schema.sql
     ```

4. **Pasang Custom Subdomain `personality-test.job.web.id`**:
   - Di proyek Cloudflare Pages tadi, buka tab **Custom Domains**.
   - Klik **Set up a custom domain**.
   - Ketik nama subdomain: `personality-test.job.web.id`.
   - Klik **Continue**.
   - Karena domain `job.web.id` dikelola di akun Cloudflare yang sama (`roy.wikan@gmail.com`), Cloudflare akan **otomatis menambahkan CNAME record** ke DNS dan menerbitkan sertifikat SSL/TLS HTTPS tanpa perlu mengedit DNS manual!

---

## 🔵 METODE 2 (Jika Pages & DNS Dipisah)
> **Cloudflare Pages diisi dari Akun `mbaktutuk@gmail.com`, sedangkan DNS dikelola di Akun `roy.wikan@gmail.com`**

Jika proyek Cloudflare Pages tetap di-deploy di akun Cloudflare milik `mbaktutuk@gmail.com`:

### Langkah 1: Setup di Akun Cloudflare `mbaktutuk@gmail.com`
1. Deploy proyek di Cloudflare Pages `mbaktutuk@gmail.com` dari repository `tkatkad/personality`.
2. Setelah ter-deploy, masuk ke proyek Pages -> Tab **Custom Domains** -> **Set up a custom domain**.
3. Masukkan `personality-test.job.web.id`.
4. Catat URL default `.pages.dev` yang diberikan Cloudflare, misalnya:
   `personality-test-xyz.pages.dev`

### Langkah 2: Setup DNS CNAME di Akun Cloudflare `roy.wikan@gmail.com`
1. Login ke [Dashboard Cloudflare](https://dash.cloudflare.com) dengan akun `roy.wikan@gmail.com`.
2. Buka zona domain **`job.web.id`** -> Pilih menu **DNS** -> **Records**.
3. Klik **Add record**:
   - **Type**: `CNAME`
   - **Name**: `personality-test`
   - **Target**: `personality-test-xyz.pages.dev` (URL `.pages.dev` dari Langkah 1)
   - **Proxy status**: `Proxied` (Awan Oranye / Orange Cloud)
   - **TTL**: `Auto`
4. Klik **Save**.

### Langkah 3: Verifikasi Aktivasi Domain
1. Kembali ke Cloudflare Pages milik `mbaktutuk@gmail.com`.
2. Klik **Check CNAME** / **Activate Domain**.
3. Tunggu 1–3 menit hingga status berubah menjadi **Active** (Sertifikat SSL HTTPS terbit otomatis).

---

## 🔍 Pengujian & Checklist
Setelah langkah di atas selesai, buka browser Anda dan akses:
👉 **`https://personality-test.job.web.id`**

- ✅ Sertifikat SSL/TLS HTTPS aktif (Ikon gembok hijau/aman).
- ✅ Aplikasi IPIP-NEO-120 berjalan dengan mulus.
- ✅ API Worker `/api/submit` dan D1 Database `psikotest-db` terhubung dengan baik.
