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
              <span>{language === 'en' ? 'Scientific Citation' : 'Sitasi Ilmiah Utama'}</span>
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
              <span>{language === 'en' ? 'Important Clinical Disclaimer' : 'Disclaimer Klinis Penting'}</span>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              {language === 'en'
                ? 'This assessment is provided for educational, self-exploration, and academic research purposes only. It is NOT a clinical diagnostic instrument or psychiatric evaluation tool. For psychological counseling or health concerns, please consult a licensed mental health professional.'
                : 'Tes ini disediakan murni untuk keperluan edukasi, eksplorasi diri, dan studi akademis anonim. Alat ini BUKAN alat diagnosis klinis psikologis/psikiatris. Jika membutuhkan konsultasi kesehatan mental, hubungi psikolog atau psikiater profesional terpapar.'}
            </p>
          </div>

          {/* Col 3: Research & Open Source */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100 text-sm">
              <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'en' ? 'Open Research & Ethics' : 'Riset Terbuka & Etika'}</span>
            </div>
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              {language === 'en'
                ? 'Data is collected anonymously with consent for psychometric analysis and test-retest reliability studies in accordance with APA ethical standards.'
                : 'Data disimpan secara anonim dengan persetujuan (consent) untuk analisis psikometrik dan studi reliabilitas test-retest sesuai standar etika ilmiah.'}
            </p>
            <div className="pt-2 flex items-center gap-4 text-slate-500">
              <Link to="/methodology" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline">
                {language === 'en' ? 'Methodology & Reliability' : 'Metodologi & Reliabilitas'}
              </Link>
              <span>·</span>
              <Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 underline">
                {language === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi'}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Unboxed Separator */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 dark:text-slate-400">
          <div>
            © {new Date().getFullYear()} IPIP-NEO-120 Free Personality Test · Public Domain Inventory (Lewis R. Goldberg / John A. Johnson)
          </div>
          <div className="flex items-center gap-3">
            <span>Production-Ready Cloudflare Workers & D1</span>
            <span>·</span>
            <span>Mobile-First Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
