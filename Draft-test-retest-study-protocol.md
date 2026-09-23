**Draft Protocol: Test-Retest Reliability Study of the IPIP-NEO-120**

**Judul Studi**  
Test-Retest Reliability of the IPIP-NEO-120: A Short-Interval Dependability Study

**Versi**  
1.0 – September 2026  
**Penyusun**  
[Nama Anda / Tim Website]

---

### 1. Latar Belakang & Tujuan

IPIP-NEO-120 (Johnson, 2014) memiliki internal consistency yang baik (domain α ≈ .81–.90; facet median α ≈ .75). Namun, data **test-retest reliability** belum tersedia dalam literatur utama.

**Tujuan utama**:
- Mengestimasi koefisien test-retest (Pearson *r* dan ICC) untuk 5 domain dan 30 facets.
- Membandingkan stabilitas domain vs facets.
- Menyediakan data yang dapat dipublikasikan di website (halaman Methodology) dan/atau sebagai preprint.

**Hipotesis**:
- Domain scores akan menunjukkan *r* ≥ .80 (interval 2–4 minggu).
- Facet scores akan menunjukkan *r* ≈ .70–.85.

---

### 2. Desain Studi

| Aspek                    | Spesifikasi                          |
|--------------------------|--------------------------------------|
| Desain                   | Repeated-measures (satu kelompok)   |
| Interval retest          | 14–28 hari (target: 21 hari)        |
| Jumlah administrasi      | 2 kali (Time 1 & Time 2)            |
| Tipe reliabilitas        | Short-interval dependability        |
| Analisis utama           | Pearson *r*, ICC (2,1), SEM         |

---

### 3. Partisipan

**Target sampel**:
- Minimum N = 150 yang menyelesaikan kedua sesi (untuk power yang memadai).
- Ideal N = 200–300.

**Kriteria inklusi**:
- Usia ≥ 16 tahun
- Mampu membaca bahasa Indonesia / Inggris (sesuai versi yang digunakan)
- Memberikan informed consent

**Kriteria eksklusi**:
- Tidak menyelesaikan minimal 90% item di salah satu sesi
- Pola jawaban invalid (misalnya straight-lining ekstrem)

**Rekrutmen** (gratis & realistis):
- Pengunjung website Anda (opsional “Ikut studi reliabilitas”)
- Media sosial, kampus, komunitas psikologi
- Insentif: hasil profil detail + laporan studi (setelah selesai)

---

### 4. Instrumen

- **IPIP-NEO-120** versi resmi (120 item, 5-point Likert)
- Urutan item **identik** di Time 1 dan Time 2
- Instruksi standar Johnson / IPIP
- Data tambahan: usia, gender, pendidikan, tanggal pengisian

---

### 5. Prosedur

1. **Time 1**  
   - Partisipan mengisi IPIP-NEO-120 + data demografis  
   - Diberi kode unik (UUID) dan diingatkan akan dihubungi lagi  

2. **Interval**  
   - 14–28 hari (kirim pengingat otomatis di hari ke-18–21)

3. **Time 2**  
   - Partisipan mengisi ulang IPIP-NEO-120 dengan kode yang sama  
   - Pertanyaan tambahan: “Apakah ada peristiwa hidup besar dalam 3 minggu terakhir?” (opsional)

4. **Data linking**  
   - Menggunakan UUID / email hash (anonim)

---

### 6. Analisis Statistik

**Software**: R (psych, irr, lme4) atau Python (pingouin, scipy)

**Langkah analisis**:
1. Screening data (missing, outliers, straight-lining)
2. Hitung skor domain & facet (sesuai scoring key Johnson)
3. **Pearson correlation** (Time 1 – Time 2) untuk setiap skala
4. **ICC (2,1)** – absolute agreement, single rater
5. Standard Error of Measurement (SEM) = SD × √(1 – r)
6. Bandingkan domain vs facets
7. Analisis sensitivitas: dengan/tanpa partisipan yang melaporkan peristiwa besar

**Output yang dilaporkan**:
- Tabel *r* dan ICC untuk 5 domain + 30 facets
- Mean *r* domain vs mean *r* facets
- 95% CI

---

### 7. Etika & Privasi

- Informed consent jelas (tujuan, durasi, kerahasiaan)
- Data disimpan anonim (hanya UUID + skor)
- Hak mengundurkan diri kapan saja
- Jika menggunakan website: tampilkan kebijakan privasi
- Idealnya lolos review etika (kampus / lembaga independen) jika ingin publikasi formal

---

### 8. Timeline Estimasi

| Minggu | Aktivitas                          |
|--------|------------------------------------|
| 1–2    | Finalisasi form & sistem tracking |
| 3–8    | Rekrutmen & pengumpulan Time 1    |
| 6–11   | Pengumpulan Time 2                |
| 12     | Analisis data                     |
| 13     | Penulisan laporan & update website|

---

### 9. Output yang Diharapkan untuk Website

Setelah selesai, Anda bisa menampilkan di halaman Methodology:

> “Dalam studi test-retest yang kami lakukan (N = xxx, interval rata-rata 21 hari), koefisien reliabilitas domain berkisar antara .xx – .xx (mean = .xx). Facets menunjukkan stabilitas yang sedikit lebih rendah (mean = .xx). Data lengkap tersedia di [link OSF / GitHub].”

---

### 10. Checklist Praktis untuk Programmer

- [ ] Sistem generate & simpan UUID
- [ ] Form Time 1 & Time 2 terpisah tapi scoring sama
- [ ] Pengingat otomatis (email / WhatsApp / notifikasi)
- [ ] Dashboard admin untuk monitor completion rate
- [ ] Export data dalam format siap analisis (CSV/JSON)
- [ ] Halaman hasil sementara untuk partisipan (agar tetap termotivasi)

---

**Catatan akhir**  
Protocol ini dirancang agar **realistis**, murah, dan dapat dilakukan oleh tim kecil (bahkan satu orang + website). Hasilnya akan sangat meningkatkan kredibilitas ilmiah website Anda karena mengisi celah data yang selama ini belum ada.

Jika Anda ingin versi yang lebih detail (termasuk template informed consent, syntax R, atau desain database D1), beri tahu saja.
