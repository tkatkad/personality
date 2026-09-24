# Panduan Pemasangan Iklan Google AdSense & Shopee Affiliate
**Aplikasi Tes Kepribadian IPIP-NEO-120 (Job.Web.ID)**

Panduan ini berisi langkah-langkah lengkap untuk mengaktifkan dan mengelola iklan **Google AdSense** serta **Shopee Affiliate** pada aplikasi web ini agar menghasilkan pendapatan secara optimal tanpa mengganggu kenyamanan pengguna (*User Experience*).

---

## 📌 Bagian 1: Pemasangan Google AdSense

Aplikasi telah dilengkapi dengan komponen khusus `AdSenseSlot.tsx` yang dirancang untuk mencegah *Cumulative Layout Shift* (CLS) dan mematuhi Kebijakan Publisher Google AdSense.

### Langkah 1: Memasang Skrip Utama AdSense
1. Buka file `/index.html`.
2. Tambahkan tag skrip resmi Google AdSense di dalam bagian `<head>`:
```html
<script 
  async 
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" 
  crossorigin="anonymous">
</script>
```
*(Ganti `ca-pub-XXXXXXXXXXXXXXXX` dengan Publisher ID Google AdSense Anda)*.

### Langkah 2: Mengonfigurasi ID Publisher di `.env`
Buka file `.env` (atau `.env.example`) dan masukkan ID publisher Anda:
```env
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

### Langkah 3: Menyesuaikan Slot Iklan (Optional)
Komponen iklan diintegrasikan di beberapa halaman utama:
* **`LandingPage.tsx`**: Dipasang di antara seksi "Metodologi Penilaian" dan "5 Domain Big Five".
* **`ResultsPage.tsx`**:
  * Slot 1: Di antara Radar Chart & Panduan Karir.
  * Slot 2: Di antara Panduan Karir & Rincian 30 Sub-Faset Kepribadian.
* **`MethodologyPage.tsx`**: Di antara Tabel Reliabilitas Cronbach's $\alpha$ & Citasi Akademis.
* **`PrivacyPage.tsx`**: Di antara Seksi Kebijakan Keamanan Data.

> ⚠️ **PENTING (Aturan UX)**: Halaman pengerjaan soal tes (`TestPage.tsx`) **SAMA SEKALI TIDAK DIPASANG IKLAN** untuk menjaga fokus pengguna menjawab 120 pertanyaan dan mencegah kecelakaan klik (*accidental clicks*).

---

## 🛍️ Bagian 2: Pemasangan Shopee Affiliate

Shopee Affiliate dipasang dalam bentuk kartu rekomendasi produk (*Native Product Card*) yang menyatu secara estetis dengan hasil laporan tes pengguna.

### Lokasi Pemasangan Utama
* **Halaman**: `ResultsPage.tsx` (Halaman Hasil Tes)
* **Posisi**: Di bagian **Rencana Pengembangan Diri, Studi Lanjutan & Rekomendasi Buku Wajib Baca**.

### Langkah Mengubah Produk & Link Afiliasi Shopee Anda:
1. Buka file `/src/components/ShopeeAffiliateCard.tsx`.
2. Sesuaikan atribut default berikut dengan produk yang ingin Anda promosikan:

```tsx
export const ShopeeAffiliateCard: React.FC<ShopeeAffiliateCardProps> = ({
  // 1. Masukkan Link Afiliasi Shopee Anda di sini:
  shopeeUrl = 'https://shope.ee/YOUR_AFFILIATE_CODE', 

  // 2. Judul Buku / Produk:
  title = 'Atomic Habits / Psychology of Money (Original)', 

  // 3. Deskripsi Singkat:
  description = 'Buku fisik original cetakan terbaru untuk melejitkan potensi kepribadian dan disiplin kerja Anda.',

  // 4. URL Gambar Produk:
  imageUrl = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',

  // 5. Harga Promo & Harga Coret:
  price = 'Rp 85.000',
  originalPrice = 'Rp 115.000',

  // 6. Rating Produk:
  rating = 4.9,
  badgeText = 'Shopee Official Store / Original',
  ...
})
```

---

## 🛡️ Praktik Terbaik & Etika Pemeliharaan

1. **Gunakan Produk Relevan**:
   Promosikan buku-buku pengembangan diri (*self-development*), psikotes karir, planner harian, atau perlengkapan kerja kantor agar tingkat konversi (*Click-Through Rate / CTR*) tinggi.
2. **Kepatuhan Keterbukaan (*Affiliate Disclosure*)**:
   Komponen `ShopeeAffiliateCard` telah dilengkapi dengan label "Link Afiliasi Resmi" untuk memenuhi standar transparansi konsumen dan aturan hukum e-commerce.
3. **Responsive Design**:
   Seluruh slot iklan AdSense dan Shopee telah diuji dan menyesuaikan tampilan secara responsif di layar Smartphone, Tablet, maupun Komputer Desktop.
