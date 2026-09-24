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
    <div className="max-w-4xl mx-auto py-8 space-y-8">
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
      <div className="space-y-2">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          {language === 'es'
            ? 'Metodología Psicométrica y Confiabilidad'
            : language === 'en'
            ? 'Psychometric Methodology & Reliability'
            : 'Metodologi Psikometrik & Reliabilitas'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          IPIP-NEO-120 Public Domain Inventory · Johnson (2014) Journal of Research in Personality
        </p>
      </div>

      {/* Section 1: Instrument Architecture */}
      <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span>
            {language === 'es'
              ? '1. Arquitectura del Instrumento y Puntuación'
              : language === 'en'
              ? '1. Instrument Architecture & Keying'
              : '1. Arsitektur & Kunci Skor Instrumen'}
          </span>
        </h2>

        <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 space-y-3">
          <p>
            {language === 'es'
              ? 'El IPIP-NEO-120 consta de 120 ítems de autoinforme evaluados en una escala Likert de 5 puntos, desde 1 (Muy Inexacto) hasta 5 (Muy Exacto). El inventario mide los 5 dominios principales del Modelo de los Cinco Factores (FFM) y 30 sub-facetas específicas.'
              : language === 'en'
              ? 'The IPIP-NEO-120 consists of 120 self-report items evaluated on a 5-point Likert scale ranging from 1 (Very Inaccurate) to 5 (Very Accurate). The inventory measures the 5 major domains of the Five-Factor Model (FFM) and 30 specific sub-facets.'
              : 'IPIP-NEO-120 terdiri dari 120 item self-report yang dievaluasi pada skala Likert 5 poin mulai dari 1 (Sangat Tidak Akurat) hingga 5 (Sangat Akurat). Instrumen mengukur 5 domain utama Five-Factor Model (FFM) dan 30 sub-faset spesifik.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 font-mono text-[11px]">
            <div>
              <span className="font-bold text-slate-900 dark:text-white">
                {language === 'es' ? 'Rango de Puntuación por Faceta:' : language === 'en' ? 'Facet Score Range:' : 'Rango Skor Faset:'}
              </span>{' '}
              4 to 20
              <p className="text-slate-500 font-sans text-[11px]">
                {language === 'es' ? 'Suma de 4 ítems por faceta.' : language === 'en' ? 'Sum of 4 keyed items per facet.' : 'Suma dari 4 item per faset.'}
              </p>
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white">
                {language === 'es' ? 'Rango de Puntuación por Dominio:' : language === 'en' ? 'Domain Score Range:' : 'Rango Skor Domain:'}
              </span>{' '}
              24 to 120
              <p className="text-slate-500 font-sans text-[11px]">
                {language === 'es' ? 'Suma de 24 ítems (6 facetas × 4 ítems).' : language === 'en' ? 'Sum of 24 items (6 facets × 4 items).' : 'Suma dari 24 item (6 faset × 4 item).'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Reliability Metrics Table */}
      <section className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-indigo-600" />
          <span>
            {language === 'es'
              ? '2. Propiedades Psicométricas (Johnson, 2014)'
              : language === 'en'
              ? '2. Psychometric Properties (Johnson, 2014)'
              : '2. Properti Psikometrik (Johnson, 2014)'}
          </span>
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
