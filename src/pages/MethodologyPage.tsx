import React from 'react';
import { BookOpen, ShieldCheck, ExternalLink, BarChart2, Layers, CheckCircle2 } from 'lucide-react';
import { useTestStore } from '../stores/testStore';

export const MethodologyPage: React.FC = () => {
  const { language } = useTestStore();

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Title Header */}
      <div className="space-y-2">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          {language === 'en' ? 'Psychometric Methodology & Reliability' : 'Metodologi Psikometrik & Reliabilitas'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          IPIP-NEO-120 Public Domain Inventory · Johnson (2014) Journal of Research in Personality
        </p>
      </div>

      {/* Section 1: Instrument Architecture */}
      <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span>{language === 'en' ? '1. Instrument Architecture & Keying' : '1. Arsitektur & Kunci Skor Instrumen'}</span>
        </h2>

        <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
          <p>
            {language === 'en'
              ? 'The IPIP-NEO-120 consists of 120 self-report items evaluated on a 5-point Likert scale ranging from 1 (Very Inaccurate) to 5 (Very Accurate). The inventory measures the 5 major domains of the Five-Factor Model (FFM) and 30 specific sub-facets.'
              : 'IPIP-NEO-120 terdiri dari 120 item self-report yang dievaluasi pada skala Likert 5 poin mulai dari 1 (Sangat Tidak Akurat) hingga 5 (Sangat Akurat). Instrumen mengukur 5 domain utama Five-Factor Model (FFM) dan 30 sub-faset spesifik.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-[11px]">
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Facet Score Range:</span> 4 to 20
              <p className="text-slate-500 font-sans text-[11px]">Sum of 4 keyed items per facet.</p>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Domain Score Range:</span> 24 to 120
              <p className="text-slate-500 font-sans text-[11px]">Sum of 24 items (6 facets × 4 items).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Reliability Metrics Table */}
      <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-indigo-600" />
          <span>{language === 'en' ? '2. Psychometric Properties (Johnson, 2014)' : '2. Properti Psikometrik (Johnson, 2014)'}</span>
        </h2>

        <p className="text-xs text-slate-600 dark:text-slate-300">
          Internal consistency coefficients (Cronbach’s $\alpha$) and convergent correlations with NEO PI-R across validation samples:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200">
                <th className="p-2.5">Domain Trait</th>
                <th className="p-2.5">Domain $\alpha$</th>
                <th className="p-2.5">Facet Mean $\alpha$</th>
                <th className="p-2.5">NEO PI-R Convergent $r$</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <td className="p-2.5 font-bold">Neuroticism (N)</td>
                <td className="p-2.5">0.89</td>
                <td className="p-2.5">0.73</td>
                <td className="p-2.5">0.73</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Extraversion (E)</td>
                <td className="p-2.5">0.86</td>
                <td className="p-2.5">0.71</td>
                <td className="p-2.5">0.70</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Openness (O)</td>
                <td className="p-2.5">0.81</td>
                <td className="p-2.5">0.68</td>
                <td className="p-2.5">0.66</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Agreeableness (A)</td>
                <td className="p-2.5">0.82</td>
                <td className="p-2.5">0.69</td>
                <td className="p-2.5">0.67</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">Conscientiousness (C)</td>
                <td className="p-2.5">0.87</td>
                <td className="p-2.5">0.72</td>
                <td className="p-2.5">0.71</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Academic Citations */}
      <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>{language === 'en' ? '3. Academic Citations & Public Domain' : '3. Sitasi Akademik & Lisensi Publik'}</span>
        </h2>

        <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 font-mono">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">Primary IPIP-NEO-120 Paper:</span>
            <p className="text-slate-800 dark:text-slate-200">
              Johnson, J. A. (2014). Measuring thirty facets of the Five Factor Model with a 120-item public domain inventory: Development of the IPIP-NEO-120. <span className="underline">Journal of Research in Personality</span>, 51, 78–89.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">International Personality Item Pool Foundations:</span>
            <p className="text-slate-800 dark:text-slate-200">
              Goldberg, L. R., Johnson, J. A., Eber, H. W., Hogan, R., Ashton, M. C., Cloninger, C. R., & Gough, H. G. (2006). The international personality item pool and the future of public-domain personality measures. <span className="underline">Journal of Research in Personality</span>, 40(1), 84–96.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
