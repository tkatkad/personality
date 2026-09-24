import React from 'react';
import { BookOpen, ShieldCheck, ExternalLink, BarChart2, Layers, CheckCircle2 } from 'lucide-react';
import { useTestStore } from '../stores/testStore';
import { SEO } from '../components/SEO';

export const MethodologyPage: React.FC = () => {
  const { language } = useTestStore();

  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ScholarlyArticle',
      headline:
        language === 'es'
          ? 'Metodología Psicométrica y Validación IPIP-NEO-120'
          : language === 'en'
          ? 'IPIP-NEO-120 Psychometric Methodology & Validation'
          : 'Metodologi Psikometrik & Validasi IPIP-NEO-120',
      url: 'https://personality-test.job.web.id/methodology',
      description:
        language === 'es'
          ? 'Documentación científica de la confiabilidad Alfa de Cronbach, correlaciones ítem-total y validez del modelo IPIP-NEO-120 de Johnson (2014).'
          : language === 'en'
          ? 'Scientific documentation of Cronbach’s alpha reliability, item-total correlation analysis, and validity of Johnson (2014) IPIP-NEO-120.'
          : 'Dokumentasi ilmiah reliabilitas Cronbach’s alpha, analisis korelasi item-total, dan validitas konvergen model IPIP-NEO-120 berdasarkan Johnson (2014).',
      author: {
        '@type': 'Person',
        name: 'Dr. John A. Johnson',
      },
      sameAs: 'https://doi.org/10.1016/j.jrp.2014.05.003',
      about: [
        'Psychometrics',
        'Big Five personality traits',
        'IPIP-NEO-120',
        'Cronbach\'s Alpha',
        'Item-Total Correlation',
      ],
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
          name: language === 'es' ? 'Metodología' : language === 'en' ? 'Methodology' : 'Metodologi',
          item: 'https://personality-test.job.web.id/methodology',
        },
      ],
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 md:py-20 space-y-10">
      <SEO
        title={
          language === 'es'
            ? 'Metodología Psicométrica y Confiabilidad – IPIP-NEO-120'
            : language === 'en'
            ? 'Psychometric Methodology & Reliability – IPIP-NEO-120'
            : 'Metodologi Psikometrik & Reliabilitas – IPIP-NEO-120'
        }
        description={
          language === 'es'
            ? 'Documentación científica de confiabilidad Alfa de Cronbach, correlaciones ítem-total y validez del IPIP-NEO-120 de Johnson (2014).'
            : language === 'en'
            ? 'Scientific documentation of Cronbach’s Alpha reliability, item-total correlations, and validity of Johnson (2014) IPIP-NEO-120.'
            : 'Dokumentasi ilmiah reliabilitas Cronbach’s Alpha (0.78 - 0.89), korelasi item-total, dan validitas konvergen instrumen IPIP-NEO-120 Johnson (2014).'
        }
        path="/methodology"
        jsonLd={jsonLdData}
      />
      {/* Title Header */}
      <div className="space-y-3">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white leading-tight">
          {language === 'es'
            ? 'Metodología Psicométrica y Confiabilidad'
            : language === 'en'
            ? 'Psychometric Methodology & Reliability'
            : 'Metodologi Psikometrik & Reliabilitas'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          IPIP-NEO-120 Public Domain Inventory · Johnson (2014) Journal of Research in Personality
        </p>
      </div>

      {/* Section 1: Instrument Architecture */}
      <section className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-5">
        <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>
            {language === 'es'
              ? '1. Arquitectura del Instrumento y Puntuación'
              : language === 'en'
              ? '1. Instrument Architecture & Keying'
              : '1. Arsitektur & Kunci Skor Instrumen'}
          </span>
        </h2>

        <div className="text-xs sm:text-sm leading-relaxed sm:leading-loose text-slate-600 dark:text-slate-300 space-y-4">
          <p>
            {language === 'es'
              ? 'El IPIP-NEO-120 consta de 120 ítems de autoinforme evaluados en una escala Likert de 5 puntos, desde 1 (Muy Inexacto) hasta 5 (Muy Exacto). El inventario mide los 5 dominios principales del Modelo de los Cinco Factores (FFM) y 30 sub-facetas específicas.'
              : language === 'en'
              ? 'The IPIP-NEO-120 consists of 120 self-report items evaluated on a 5-point Likert scale ranging from 1 (Very Inaccurate) to 5 (Very Accurate). The inventory measures the 5 major domains of the Five-Factor Model (FFM) and 30 specific sub-facets.'
              : 'IPIP-NEO-120 terdiri dari 120 item self-report yang dievaluasi pada skala Likert 5 poin mulai dari 1 (Sangat Tidak Akurat) hingga 5 (Sangat Akurat). Instrumen mengukur 5 domain utama Five-Factor Model (FFM) dan 30 sub-faset spesifik.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 font-mono text-xs">
            <div>
              <span className="font-bold text-slate-900 dark:text-white block mb-1">
                {language === 'es' ? 'Rango de Puntuación por Faceta:' : language === 'en' ? 'Facet Score Range:' : 'Rango Skor Faset:'}
              </span>{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">4 to 20</span>
              <p className="text-slate-500 font-sans text-xs mt-1">
                {language === 'es' ? 'Suma de 4 ítems por faceta.' : language === 'en' ? 'Sum of 4 keyed items per facet.' : 'Suma dari 4 item per faset.'}
              </p>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white block mb-1">
                {language === 'es' ? 'Rango de Puntuación por Dominio:' : language === 'en' ? 'Domain Score Range:' : 'Rango Skor Domain:'}
              </span>{' '}
              <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">24 to 120</span>
              <p className="text-slate-500 font-sans text-xs mt-1">
                {language === 'es' ? 'Suma de 24 ítems (6 facetas × 4 ítems).' : language === 'en' ? 'Sum of 24 items (6 facets × 4 items).' : 'Suma dari 24 item (6 faset × 4 item).'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Reliability Metrics Table */}
      <section className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-5">
        <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2.5">
          <BarChart2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>
            {language === 'es'
              ? '2. Propiedades Psicométricas (Johnson, 2014)'
              : language === 'en'
              ? '2. Psychometric Properties (Johnson, 2014)'
              : '2. Properti Psikometrik (Johnson, 2014)'}
          </span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Internal consistency coefficients (Cronbach’s $\alpha$) and convergent correlations with NEO PI-R across validation samples:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200">
                <th className="p-3">Domain Trait</th>
                <th className="p-3">Domain $\alpha$</th>
                <th className="p-3">Facet Mean $\alpha$</th>
                <th className="p-3">NEO PI-R Convergent $r$</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-white">Neuroticism (N)</td>
                <td className="p-3">0.89</td>
                <td className="p-3">0.73</td>
                <td className="p-3">0.73</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-white">Extraversion (E)</td>
                <td className="p-3">0.86</td>
                <td className="p-3">0.71</td>
                <td className="p-3">0.70</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-white">Openness (O)</td>
                <td className="p-3">0.81</td>
                <td className="p-3">0.68</td>
                <td className="p-3">0.66</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-white">Agreeableness (A)</td>
                <td className="p-3">0.82</td>
                <td className="p-3">0.69</td>
                <td className="p-3">0.67</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-slate-900 dark:text-white">Conscientiousness (C)</td>
                <td className="p-3">0.87</td>
                <td className="p-3">0.72</td>
                <td className="p-3">0.71</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Academic Citations */}
      <section className="p-7 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-5">
        <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span>{language === 'en' ? '3. Academic Citations & Public Domain' : '3. Sitasi Akademik & Lisensi Publik'}</span>
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-mono">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block">Primary IPIP-NEO-120 Paper:</span>
            <p className="text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
              Johnson, J. A. (2014). Measuring thirty facets of the Five Factor Model with a 120-item public domain inventory: Development of the IPIP-NEO-120. <span className="underline italic">Journal of Research in Personality</span>, 51, 78–89.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <span className="font-bold text-indigo-600 dark:text-indigo-400 block">International Personality Item Pool Foundations:</span>
            <p className="text-slate-800 dark:text-slate-200 font-sans leading-relaxed">
              Goldberg, L. R., Johnson, J. A., Eber, H. W., Hogan, R., Ashton, M. C., Cloninger, C. R., & Gough, H. G. (2006). The international personality item pool and the future of public-domain personality measures. <span className="underline italic">Journal of Research in Personality</span>, 40(1), 84–96.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
