import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  BarChart3,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useTestStore } from '../stores/testStore';
import { DOMAIN_METADATA } from '../data/ipip-neo-120';
import { DomainKey } from '../types';

export const LandingPage: React.FC = () => {
  const { language } = useTestStore();

  const domainKeys: DomainKey[] = ['N', 'E', 'O', 'A', 'C'];

  return (
    <div className="space-y-16 py-8">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white p-8 sm:p-12 md:p-16 shadow-xl border border-indigo-900/50">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-6 relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'en' ? 'Validated Public Domain Psychometrics' : 'Psikometri Validasi Ilmiah Domain Publik'}</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {language === 'en' ? 'IPIP-NEO-120 Free Personality Test' : 'Tes Kepribadian Bebas IPIP-NEO-120'}
          </h1>

          {/* Description */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            {language === 'en'
              ? 'Discover your unique Five-Factor personality profile with the official 120-item IPIP inventory developed by Dr. John A. Johnson (2014). Measures 5 major domains and 30 distinct personality facets with instantaneous report generation.'
              : 'Ungkap profil kepribadian Five-Factor Model (Big Five) Anda menggunakan instrumen resmi 120-item dari Dr. John A. Johnson (2014). Mengukur 5 domain utama dan 30 faset kepribadian secara ilmiah dan instan.'}
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              to="/consent"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-[0.99]"
            >
              <span>{language === 'en' ? 'Start Free Test (120 Items)' : 'Mulai Tes Gratis (120 Soal)'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/retest"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>{language === 'en' ? 'Join Test-Retest Reliability Study' : 'Ikut Studi Test-Retest (Opsional)'}</span>
            </Link>
          </div>

          {/* Key Trust Signals */}
          <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{language === 'en' ? '100% Free & Anonymous' : '100% Gratis & Anonim'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{language === 'en' ? 'No Registration Needed' : 'Tanpa Perlu Pendaftaran'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{language === 'en' ? 'Instant PDF & Link Share' : 'Hasil PDF & Share Link'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Foundation Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
              {language === 'en' ? 'Scientific Grounding & Open Science' : 'Landasan Ilmiah & Open Science'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              International Personality Item Pool (IPIP) · Johnson (2014)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              {language === 'en' ? 'What is the IPIP-NEO-120?' : 'Apa itu IPIP-NEO-120?'}
            </h3>
            <p>
              {language === 'en'
                ? 'The IPIP-NEO-120 is a 120-item public domain questionnaire designed by Dr. John A. Johnson (Penn State University) to measure the 30 facets of the Five-Factor Model (FFM) of personality. It provides identical structural fidelity to commercial 240-item inventories while reducing completion time by 50%.'
                : 'IPIP-NEO-120 adalah kuesioner domain publik 120-item yang dikembangkan oleh Dr. John A. Johnson (Penn State University) untuk mengukur 30 faset dari Five-Factor Model (FFM) kepribadian. Instrumen ini menyajikan akurasi struktur setara kuesioner komersial 240-item dengan efisiensi waktu 50% lebih cepat.'}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              {language === 'en' ? 'Psychometric Reliability' : 'Validitas & Reliabilitas Psikometrik'}
            </h3>
            <p>
              {language === 'en'
                ? 'Validated across massive sample sizes (N > 300,000 online participants and community samples), the inventory demonstrates strong internal consistency (mean facet α ≈ 0.68–0.75) and high convergent validity with the NEO PI-R.'
                : 'Divalidasi pada sampel penelitian besar (N > 300.000 responden online dan sampel komunitas Eugene-Springfield), instrumen ini terbukti memiliki konsistensi internal yang tinggi (rata-rata α faset ≈ 0.68–0.75) serta validitas konvergen tinggi terhadap NEO PI-R.'}
            </p>
          </div>
        </div>

        {/* Paper Citation Block */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-2">
          <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
            <span>Primary Literature Citation:</span>
            <div className="flex gap-2">
              <a
                href="https://ipip.ori.org/30FacetNEO-PI-RItems.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
              >
                ipip.ori.org <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <p className="font-mono text-slate-700 dark:text-slate-300">
            Johnson, J. A. (2014). Measuring thirty facets of the Five Factor Model with a 120-item public domain inventory: Development of the IPIP-NEO-120. <span className="underline">Journal of Research in Personality</span>, 51, 78–89. https://doi.org/10.1016/j.jrp.2014.05.003
          </p>
        </div>
      </section>

      {/* The Big Five Domains & 30 Facets Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {language === 'en' ? 'The 5 Big Five Domains & 30 Facets' : '5 Domain Big Five & 30 Faset Kepribadian'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {language === 'en'
              ? 'Every domain is evaluated through 6 sub-facets (4 items per facet = 24 items per domain).'
              : 'Setiap domain dievaluasi melalui 6 sub-faset (4 item per faset = 24 item per domain).'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domainKeys.map((key) => {
            const meta = DOMAIN_METADATA[key];
            return (
              <div
                key={key}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-white shadow-sm"
                    style={{ backgroundColor: meta.color }}
                  >
                    {key}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                      {language === 'en' ? meta.nameEn : meta.nameId}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {language === 'en' ? meta.taglineEn : meta.taglineId}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">6 Sub-Facets:</span>{' '}
                  {key === 'N' && 'Anxiety, Anger, Depression, Self-Consciousness, Immoderation, Vulnerability'}
                  {key === 'E' && 'Friendliness, Gregariousness, Assertiveness, Activity, Excitement, Cheerfulness'}
                  {key === 'O' && 'Imagination, Artistic Interests, Emotionality, Adventurousness, Intellect, Liberalism'}
                  {key === 'A' && 'Trust, Morality, Altruism, Cooperation, Modesty, Sympathy'}
                  {key === 'C' && 'Self-Efficacy, Orderliness, Dutifulness, Achievement, Discipline, Cautiousness'}
                </div>
              </div>
            );
          })}

          {/* Card 6: Test-Retest Protocol */}
          <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-base">
                <RotateCcw className="w-5 h-5" />
                <span>{language === 'en' ? 'Test-Retest Research' : 'Studi Reliabilitas Retest'}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'en'
                  ? 'Have you previously completed this assessment? Participate in our test-retest study to help evaluate temporal stability across sessions.'
                  : 'Pernah mengerjakan tes ini sebelumnya? Masukkan ID hasil lama Anda untuk mengikuti studi reliabilitas ketahanan waktu (test-retest).'}
              </p>
            </div>
            <Link
              to="/retest"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors"
            >
              <span>{language === 'en' ? 'Enter Retest Protocol' : 'Masuk Protokol Retest'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Ready to Start Card */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900 dark:bg-slate-900 text-white text-center space-y-5 shadow-lg border border-slate-800">
        <h2 className="font-display font-bold text-2xl sm:text-3xl">
          {language === 'en' ? 'Ready to Begin Your Assessment?' : 'Siap Memulai Tes Kepribadian Anda?'}
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          {language === 'en'
            ? 'The test takes approximately 10–15 minutes. Answers auto-save continuously so you can pause and resume at any time.'
            : 'Tes ini membutuhkan waktu sekitar 10–15 menit. Jawaban tersimpan otomatis secara real-time sehingga Anda dapat menyimpan dan melanjutkan kapan saja.'}
        </p>
        <div>
          <Link
            to="/consent"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-all shadow-lg active:scale-[0.99]"
          >
            <span>{language === 'en' ? 'Proceed to Consent & Demographics' : 'Lanjut ke Consent & Demografi'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
