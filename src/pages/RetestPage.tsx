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
      name: 'Studi Test-Retest Stabilitas Kepribadian IPIP-NEO-120',
      url: 'https://personality-test.job.web.id/retest',
      description: 'Protokol riset psikometri untuk mengukur stabilitas dan ketahanan profil kepribadian dari waktu ke waktu berbasis UUID terikat.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://personality-test.job.web.id/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Studi Test-Retest',
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
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      <SEO
        title="Studi Test-Retest – IPIP-NEO-120 Personality Test"
        description="Protokol riset psikometri untuk mengukur stabilitas dan ketahanan profil kepribadian Big Five dari waktu ke waktu berbasis UUID terikat."
        path="/retest"
        jsonLd={jsonLdData}
      />
      {/* Title Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Psychometric Reliability Trial' : 'Uji Reliabilitas Psikometrik'}</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          {language === 'en' ? 'IPIP-NEO-120 Test-Retest Study' : 'Studi Test-Retest IPIP-NEO-120'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {language === 'en'
            ? 'Participate in research evaluating temporal stability and test-retest reliability coefficients ($r_{tt}$) across time intervals.'
            : 'Ikuti riset evaluasi stabilitas waktu dan koefisien reliabilitas test-retest ($r_{tt}$) antar interval waktu.'}
        </p>
      </div>

      {/* Rationale Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
        <h2 className="font-bold text-slate-900 dark:text-white text-sm">
          {language === 'en' ? 'Why Participate in Test-Retest?' : 'Mengapa Perlu Mengikuti Test-Retest?'}
        </h2>
        <p>
          {language === 'en'
            ? 'In psychometrics, test-retest reliability measures the consistency of test scores over time. High-quality personality inventories like the IPIP-NEO-120 expect strong temporal stability (typically $r \ge 0.75$–$0.85$ across 2–4 weeks).'
            : 'Dalam psikometri, reliabilitas test-retest mengukur konsistensi skor tes dari waktu ke waktu. Inventori kepribadian standar seperti IPIP-NEO-120 menuntut stabilitas waktu yang kuat (umumnya $r \ge 0,75$–$0,85$ antar 2–4 minggu).'}
        </p>
      </div>

      {/* UUID Search Form */}
      <form onSubmit={handleStartRetest} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="space-y-1">
          <label className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Key className="w-4 h-4 text-indigo-600" />
            <span>{language === 'en' ? 'Original Participant UUID' : 'UUID Responden Sesi Pertama'}</span>
          </label>
          <p className="text-xs text-slate-500">
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
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !originalIdInput.trim()}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all"
        >
          <span>{loading ? 'Verifying UUID...' : language === 'en' ? 'Begin Retest Session' : 'Mulai Sesi Retest'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
