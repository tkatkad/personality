# Panduan Menghubungkan `personality-test-job.pages.dev` ke `personality-test.job.web.id`

Berikut adalah panduan praktis untuk menghubungkan proyek Cloudflare Pages **`personality-test-job.pages.dev`** (di akun `mbaktutuk@gmail.com`) ke custom subdomain **`personality-test.job.web.id`** (di DNS Cloudflare `roy.wikan@gmail.com`).

---

## 📍 Rincian Domain
- **URL Cloudflare Pages Default**: `personality-test-job.pages.dev`
- **Target Custom Subdomain**: `personality-test.job.web.id`

---

## 🛠️ Langkah Demi Langkah

### Langkah 1: Tambahkan Custom Domain di Akun `mbaktutuk@gmail.com`
1. Login ke [Dashboard Cloudflare](https://dash.cloudflare.com) dengan akun `mbaktutuk@gmail.com`.
2. Buka menu **Workers & Pages** $\rightarrow$ pilih proyek **`personality-test-job`**.
3. Buka tab **Custom Domains** $\rightarrow$ klik tombol **Set up a custom domain**.
4. Ketik nama domain: **`personality-test.job.web.id`**
5. Klik **Continue**.

---

### Langkah 2: Tambahkan Record CNAME DNS di Akun `roy.wikan@gmail.com`
1. Login ke [Dashboard Cloudflare](https://dash.cloudflare.com) dengan akun `roy.wikan@gmail.com`.
2. Buka zona domain **`job.web.id`** $\rightarrow$ pilih menu **DNS** $\rightarrow$ **Records**.
3. Klik tombol **Add record**:
   - **Type**: `CNAME`
   - **Name**: `personality-test`
   - **Target**: `personality-test-job.pages.dev`
   - **Proxy status**: `Proxied` (Awan Oranye / Orange Cloud ON)
   - **TTL**: `Auto`
4. Klik **Save**.

---

### Langkah 3: Verifikasi Aktivasi Domain & SSL
1. Kembali ke Dashboard Cloudflare Pages milik `mbaktutuk@gmail.com`.
2. Klik tombol **Check CNAME** / **Activate Domain**.
3. Tunggu 1–3 menit hingga status domain berubah menjadi **Active**.
4. Sertifikat SSL/TLS HTTPS akan diterbitkan secara otomatis oleh Cloudflare.

---

## ✅ Selesai!
Situs Anda kini dapat diakses secara publik dan aman di:
👉 **`https://personality-test.job.web.id`**
