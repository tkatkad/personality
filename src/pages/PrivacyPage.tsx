import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2 } from 'lucide-react';
import { useTestStore } from '../stores/testStore';
import { SEO } from '../components/SEO';
import { AdSenseSlot } from '../components/AdSenseSlot';

export const PrivacyPage: React.FC = () => {
  const { language } = useTestStore();

  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name:
        language === 'es'
          ? 'Política de Privacidad y Ética de Datos – IPIP-NEO-120'
          : language === 'en'
          ? 'Privacy Policy & Data Ethics – IPIP-NEO-120'
          : 'Kebijakan Privasi & Etika Data – IPIP-NEO-120',
      url: 'https://personality-test.job.web.id/privacy',
      description:
        language === 'es'
          ? 'Política de privacidad transparente: Cero datos PII (información de identificación personal), anonimización y ética de investigación psicométrica.'
          : language === 'en'
          ? 'Transparent privacy policy: Zero PII (Personally Identifiable Information), anonymous encryption, and psychometric research ethics.'
          : 'Kebijakan privasi transparan: Zero PII (Personally Identifiable Information), enkripsi anonimitas data, dan etika riset psikometri.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: language === 'es' ? 'Inicio' : language === 'en' ? 'Home' : 'Beranda',
          item: 'https://personality-test.job.web.id/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: language === 'es' ? 'Política de Privacidad' : language === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi',
          item: 'https://personality-test.job.web.id/privacy',
        },
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 md:py-20 space-y-10">
      <SEO
        title={
          language === 'es'
            ? 'Política de Privacidad y Ética – IPIP-NEO-120'
            : language === 'en'
            ? 'Privacy Policy & Data Ethics – IPIP-NEO-120'
            : 'Kebijakan Privasi & Etika Data – IPIP-NEO-120'
        }
        description={
          language === 'es'
            ? 'Garantía de privacidad anónima sin recopilación de PII (Cero PII). Almacenamiento seguro y ético para evaluaciones de personalidad.'
            : language === 'en'
            ? 'Anonymous privacy guarantee without PII data collection (Zero PII). Full details on secure storage and psychometric data standards.'
            : 'Jaminan privasi anonim tanpa pengumpulan data PII (Zero PII). Penjelasan lengkap penyimpanan data lokal & enkripsi aman.'
        }
        path="/privacy"
        jsonLd={jsonLdData}
      />
      {/* Title Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>{language === 'en' ? 'Anonymous & Ethical Data Standard' : 'Standar Etika Data Anonim'}</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
          {language === 'en' ? 'Privacy Policy & Data Ethics' : 'Kebijakan Privasi & Etika Penggunaan Data'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Last updated: September 2024 · IPIP-NEO-120 Assessment Engine
        </p>
      </div>

      <div className="space-y-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed sm:leading-loose">
        {/* Section 1 */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2.5">
            <EyeOff className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>1. Zero Personally Identifiable Information (PII)</span>
          </h2>
          <p>
            {language === 'en'
              ? 'We do NOT collect names, email addresses, phone numbers, IP addresses, or account credentials. Every assessment session is assigned an automatically generated v4 UUID.'
              : 'Kami TIDAK mengumpulkan nama, alamat email, nomor telepon, alamat IP, maupun kredensial akun. Setiap sesi tes diidentifikasi dengan v4 UUID yang digenerate secara otomatis.'}
          </p>
        </div>

        {/* Section 2 */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>2. Local Storage & Database Storage</span>
          </h2>
          <p>
            {language === 'en'
              ? 'Test answers are stored directly in your browser\'s local storage for real-time progress saving. When you complete a test with consent, anonymized numeric score vectors are transmitted securely to our encrypted cloud database.'
              : 'Jawaban tes disimpan secara otomatis di local storage browser Anda untuk fitur save-progress. Saat menyelesaikan tes dengan persetujuan (consent), vektor skor numerik anonim dikirimkan secara aman ke database cloud terenkripsi.'}
          </p>
        </div>

        {/* Ad Placement: Between Section 2 & Section 3 */}
        <AdSenseSlot slot="4001" className="my-6" />

        {/* Section 3 */}
        <div className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
          <h2 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>3. Clinical Disclaimer</span>
          </h2>
          <p className="text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/60 text-xs sm:text-sm leading-relaxed">
            {language === 'en'
              ? 'This tool is NOT a clinical diagnostic instrument. It is designed solely for self-exploration and academic psychometric research. If you need clinical assessment or mental health support, please consult a licensed professional.'
              : 'Alat ini BUKAN instrumen diagnosis medis/klinis. Tes ini dirancang murni untuk eksplorasi diri dan riset akademis psikometri. Jika Anda membutuhkan dukungan kesehatan mental, silakan berkonsultasi dengan profesional lisensi.'}
          </p>
        </div>
      </div>
    </div>
  );
};
