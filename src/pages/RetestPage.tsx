import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, ArrowRight, ShieldCheck, Key, Search, AlertCircle } from 'lucide-react';
import { useTestStore } from '../stores/testStore';
import { fetchResultById } from '../lib/api';
import { SEO } from '../components/SEO';

export const RetestPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, startRetest } = useTestStore();

  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name:
        language === 'es'
          ? 'Estudio Test-Retest de Estabilidad de Personalidad IPIP-NEO-120'
          : language === 'en'
          ? 'IPIP-NEO-120 Personality Stability Test-Retest Study'
          : 'Studi Test-Retest Stabilitas Kepribadian IPIP-NEO-120',
      url: 'https://personality-test.job.web.id/retest',
      description:
        language === 'es'
          ? 'Protocolo de investigación psicométrica para evaluar la estabilidad temporal de los perfiles de personalidad Big Five.'
          : language === 'en'
          ? 'Psychometric research protocol measuring temporal stability and test-retest reliability of Big Five profiles.'
          : 'Protokol riset psikometri untuk mengukur stabilitas dan ketahanan profil kepribadian dari waktu ke waktu berbasis UUID terikat.',
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
          name: language === 'es' ? 'Estudio Test-Retest' : language === 'en' ? 'Test-Retest Study' : 'Studi Test-Retest',
          item: 'https://personality-test.job.web.id/retest',
        },
      ],
    },
  ];

  const [originalIdInput, setOriginalIdInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartRetest = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = originalIdInput.trim();
    if (!cleanId) return;

    setLoading(true);
    setError(null);

    // Verify if original ID exists locally or on Cloudflare worker
    const originalResult = await fetchResultById(cleanId);

    if (originalResult) {
      startRetest(originalResult.id);
      navigate('/test');
    } else {
      // Allow proceeding even if original result is not found in server DB (client offline fallback)
      if (
        confirm(
          language === 'en'
            ? `Original result for UUID "${cleanId}" was not found on server DB. Do you still want to proceed with this ID for retest matching?`
            : `Hasil asli dengan UUID "${cleanId}" tidak ditemukan di database server. Tetap lanjutkan retest dengan ID ini?`
        )
      ) {
        startRetest(cleanId);
        navigate('/test');
      } else {
        setError(
          language === 'en'
            ? 'Original UUID not found. Please double-check your UUID string.'
            : 'UUID lama tidak ditemukan. Harap periksa kembali string UUID Anda.'
        );
      }
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 md:py-20 space-y-10">
      <SEO
        title={
          language === 'es'
            ? 'Estudio Test-Retest – Test de Personalidad IPIP-NEO-120'
            : language === 'en'
            ? 'Test-Retest Reliability Study – IPIP-NEO-120 Assessment'
            : 'Studi Test-Retest – IPIP-NEO-120 Personality Test'
        }
        description={
          language === 'es'
            ? 'Protocolo de investigación psicométrica para medir la estabilidad de los perfiles Big Five a lo largo del tiempo.'
            : language === 'en'
            ? 'Psychometric research protocol evaluating Big Five personality temporal stability based on linked participant UUIDs.'
            : 'Protokol riset psikometri untuk mengukur stabilitas dan ketahanan profil kepribadian Big Five dari waktu ke waktu berbasis UUID terikat.'
        }
        path="/retest"
        jsonLd={jsonLdData}
      />
      {/* Title Header */}
      <div className="space-y-3 text-center sm:text-left max-w-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-900/60 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <RotateCcw className="w-4 h-4" />
          <span>{language === 'en' ? 'Psychometric Reliability Trial' : 'Uji Reliabilitas Psikometrik'}</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
          {language === 'en' ? 'IPIP-NEO-120 Test-Retest Study' : 'Studi Test-Retest IPIP-NEO-120'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {language === 'en'
            ? 'Participate in research evaluating temporal stability and test-retest reliability coefficients ($r_{tt}$) across time intervals.'
            : 'Ikuti riset evaluasi stabilitas waktu dan koefisien reliabilitas test-retest ($r_{tt}$) antar interval waktu.'}
        </p>
      </div>

      {/* Rationale Card */}
      <div className="p-7 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3 text-xs sm:text-sm leading-relaxed sm:leading-loose text-slate-600 dark:text-slate-300">
        <h2 className="font-bold text-slate-900 dark:text-white text-base">
          {language === 'en' ? 'Why Participate in Test-Retest?' : 'Mengapa Perlu Mengikuti Test-Retest?'}
        </h2>
        <p>
          {language === 'en'
            ? 'In psychometrics, test-retest reliability measures the consistency of test scores over time. High-quality personality inventories like the IPIP-NEO-120 expect strong temporal stability (typically $r \\ge 0.75$–$0.85$ across 2–4 weeks).'
            : 'Dalam psikometri, reliabilitas test-retest mengukur konsistensi skor tes dari waktu ke waktu. Inventori kepribadian standar seperti IPIP-NEO-120 menuntut stabilitas waktu yang kuat (umumnya $r \\ge 0,75$–$0,85$ antar 2–4 minggu).'}
        </p>
      </div>

      {/* UUID Search Form */}
      <form onSubmit={handleStartRetest} className="p-7 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2.5">
            <Key className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span>{language === 'en' ? 'Original Participant UUID' : 'UUID Responden Sesi Pertama'}</span>
          </label>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {language === 'en'
              ? 'Enter the UUID from your previous assessment report.'
              : 'Masukkan UUID dari laporan tes pertama Anda.'}
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            required
            value={originalIdInput}
            onChange={(e) => setOriginalIdInput(e.target.value)}
            placeholder="e.g. 85a6b44c-d8cd-41e2-a788-7849ad018261"
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 text-red-700 dark:text-red-300 text-xs sm:text-sm flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !originalIdInput.trim()}
          className="w-full flex items-center justify-center gap-2.5 py-4 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-sm sm:text-base shadow-md transition-all"
        >
          <span>{loading ? 'Verifying UUID...' : language === 'en' ? 'Begin Retest Session' : 'Mulai Sesi Retest'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
