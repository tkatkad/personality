import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2 } from 'lucide-react';
import { useTestStore } from '../stores/testStore';

export const PrivacyPage: React.FC = () => {
  const { language } = useTestStore();

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      {/* Title Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Anonymous & Ethical Data Standard' : 'Standar Etika Data Anonim'}</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          {language === 'en' ? 'Privacy Policy & Data Ethics' : 'Kebijakan Privasi & Etika Penggunaan Data'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Last updated: September 2024 · IPIP-NEO-120 Assessment Engine
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        {/* Section 1 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h2 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-indigo-600" />
            <span>1. Zero Personally Identifiable Information (PII)</span>
          </h2>
          <p>
            {language === 'en'
              ? 'We do NOT collect names, email addresses, phone numbers, IP addresses, or account credentials. Every assessment session is assigned an automatically generated v4 UUID.'
              : 'Kami TIDAK mengumpulkan nama, alamat email, nomor telepon, alamat IP, maupun kredensial akun. Setiap sesi tes diidentifikasi dengan v4 UUID yang digenerate secara otomatis.'}
          </p>
        </div>

        {/* Section 2 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h2 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-600" />
            <span>2. Local Storage & Database Storage</span>
          </h2>
          <p>
            {language === 'en'
              ? 'Test answers are stored directly in your browser\'s local storage for real-time progress saving. When you complete a test with consent, anonymized numeric score vectors are transmitted securely to our Cloudflare D1 database.'
              : 'Jawaban tes disimpan secara otomatis di local storage browser Anda untuk fitur save-progress. Saat menyelesaikan tes dengan persetujuan (consent), vektor skor numerik anonim dikirimkan ke database Cloudflare D1.'}
          </p>
        </div>

        {/* Section 3 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h2 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600" />
            <span>3. Clinical Disclaimer</span>
          </h2>
          <p className="text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-3.5 rounded-xl border border-amber-200 dark:border-amber-900 text-xs">
            {language === 'en'
              ? 'This tool is NOT a clinical diagnostic instrument. It is designed solely for self-exploration and academic psychometric research. If you need clinical assessment or mental health support, please consult a licensed professional.'
              : 'Alat ini BUKAN instrumen diagnosis medis/klinis. Tes ini dirancang murni untuk eksplorasi diri dan riset akademis psikometri. Jika Anda membutuhkan dukungan kesehatan mental, silakan berkonsultasi dengan profesional lisensi.'}
          </p>
        </div>
      </div>
    </div>
  );
};
