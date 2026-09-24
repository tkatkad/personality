import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldAlert, BookOpen, HeartHandshake } from 'lucide-react';
import { useTestStore } from '../stores/testStore';

export const Footer: React.FC = () => {
  const { language } = useTestStore();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs py-10 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: Scientific Citation */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 text-sm">
              <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>
                {language === 'es'
                  ? 'Citación Científica Principal'
                  : language === 'en'
                  ? 'Scientific Citation'
                  : 'Sitasi Ilmiah Utama'}
              </span>
            </div>
            <p className="leading-relaxed text-slate-500 dark:text-slate-400 italic">
              Johnson, J. A. (2014). Measuring thirty facets of the Five Factor Model with a 120-item public domain inventory: Development of the IPIP-NEO-120. 
              <span className="font-semibold text-slate-700 dark:text-slate-300"> Journal of Research in Personality</span>, 51, 78–89.
            </p>
            <div className="pt-1 flex flex-wrap gap-3">
              <a
                href="https://ipip.ori.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                IPIP Repository (ipip.ori.org) <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://doi.org/10.1016/j.jrp.2014.05.003"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                DOI Paper <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 2: Clinical Disclaimer */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-amber-700 dark:text-amber-400 text-sm">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>
                {language === 'es'
                  ? 'Aviso Clínico Importante'
                  : language === 'en'
                  ? 'Important Clinical Disclaimer'
                  : 'Disclaimer Klinis Penting'}
              </span>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              {language === 'es'
                ? 'Esta evaluación se proporciona únicamente con fines educativos, de autoexploración y de investigación académica. NO es un instrumento de diagnóstico clínico ni una herramienta de evaluación psiquiátrica. Para asesoramiento psicológico, consulte a un profesional de la salud mental.'
                : language === 'en'
                ? 'This assessment is provided for educational, self-exploration, and academic research purposes only. It is NOT a clinical diagnostic instrument or psychiatric evaluation tool. For psychological counseling or health concerns, please consult a licensed mental health professional.'
                : 'Tes ini disediakan murni untuk keperluan edukasi, eksplorasi diri, dan studi akademis anonim. Alat ini BUKAN alat diagnosis klinis psikologis/psikiatris. Jika membutuhkan konsultasi kesehatan mental, hubungi psikolog atau psikiater profesional terpapar.'}
            </p>
          </div>

          {/* Col 3: Research & Open Source */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 text-sm">
              <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                {language === 'es'
                  ? 'Investigación Abierta y Ética'
                  : language === 'en'
                  ? 'Open Research & Ethics'
                  : 'Riset Terbuka & Etika'}
              </span>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              {language === 'es'
                ? 'Los datos se recopilan de forma anónima con consentimiento para análisis psicométricos y estudios de fiabilidad test-retest de acuerdo con los estándares éticos de la APA.'
                : language === 'en'
                ? 'Data is collected anonymously with consent for psychometric analysis and test-retest reliability studies in accordance with APA ethical standards.'
                : 'Data disimpan secara anonim dengan persetujuan (consent) untuk analisis psikometrik dan studi reliabilitas test-retest sesuai standar etika ilmiah.'}
            </p>
            <div className="pt-2 flex items-center gap-4 text-slate-500">
              <Link to="/methodology" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline">
                {language === 'es'
                  ? 'Metodología y Fiabilidad'
                  : language === 'en'
                  ? 'Methodology & Reliability'
                  : 'Metodologi & Reliabilitas'}
              </Link>
              <span>·</span>
              <Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline">
                {language === 'es'
                  ? 'Política de Privacidad'
                  : language === 'en'
                  ? 'Privacy Policy'
                  : 'Kebijakan Privasi'}
              </Link>
            </div>
          </div>
        </div>

        {/* Parent Website Co-branding Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-xs shrink-0 shadow-sm">
              JOB
            </div>
            <div>
              <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                {language === 'es'
                  ? 'Job.Web.ID — Portal de Empleo y Desarrollo Profesional'
                  : language === 'en'
                  ? 'Job.Web.ID — Job Vacancy & Career Development Portal'
                  : 'Job.Web.ID — Portal Lowongan Kerja & Pengembangan Karir Indonesia'}
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                {language === 'es'
                  ? 'Plataforma principal para ofertas de trabajo, herramientas de evaluación de carrera y orientación profesional.'
                  : language === 'en'
                  ? 'Main platform for job vacancies, career assessment tools, and professional resume guidance.'
                  : 'Website utama untuk pencarian lowongan kerja, alat asesmen karir, dan panduan CV profesional.'}
              </p>
            </div>
          </div>
          <a
            href="https://job.web.id"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
          >
            <span>
              {language === 'es'
                ? 'Visitar Job.Web.ID'
                : language === 'en'
                ? 'Visit Job.Web.ID'
                : 'Kunjungi Job.Web.ID'}
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bottom Unboxed Separator */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} <a href="https://job.web.id" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-700 dark:text-slate-300 hover:underline">Job.Web.ID</a> · IPIP-NEO-120 Assessment Engine (Johnson, 2014)
          </div>
          <div className="flex items-center gap-3">
            <a href="https://job.web.id" target="_blank" rel="noopener noreferrer" className="hover:underline text-indigo-600 dark:text-indigo-400 font-medium">
              Job.Web.ID Portal
            </a>
            <span>·</span>
            <span>
              {language === 'es'
                ? 'Seguro, Cifrado e Informe Inmediato'
                : language === 'en'
                ? 'Secure, Encrypted & Instant Report'
                : 'Aman, Terenkripsi & Instant Report'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
