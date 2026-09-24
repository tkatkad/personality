import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Globe, Menu, X, BrainCircuit, ExternalLink } from 'lucide-react';
import { useTestStore } from '../stores/testStore';

export const Header: React.FC = () => {
  const { theme, toggleDarkMode, language, setLanguage } = useTestStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', labelEn: 'Home', labelId: 'Beranda', labelEs: 'Inicio' },
    { href: '/consent', labelEn: 'Take Test', labelId: 'Mulai Tes', labelEs: 'Tomar Test' },
    { href: '/retest', labelEn: 'Retest Study', labelId: 'Studi Retest', labelEs: 'Estudio Retest' },
    { href: '/methodology', labelEn: 'Methodology', labelId: 'Metodologi', labelEs: 'Metodología' },
    { href: '/privacy', labelEn: 'Privacy', labelId: 'Privasi', labelEs: 'Privacidad' },
  ];

  const getNavLinkLabel = (link: typeof navLinks[0]) => {
    if (language === 'es') return link.labelEs;
    if (language === 'en') return link.labelEn;
    return link.labelId;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 h-16 flex items-center justify-between">
        {/* Zone 1: Co-branded Boxed Logo Lockup */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://job.web.id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:opacity-90 transition-opacity"
            title="Job.Web.ID - Portal Kerja Indonesia"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex flex-col items-center justify-center shadow-md font-black leading-none shrink-0">
              <span className="text-[11px] font-black tracking-tight leading-none text-white">JOB</span>
              <span className="text-[7.5px] font-extrabold tracking-wider text-amber-300 leading-none mt-0.5">WEB</span>
            </div>
          </a>
          <span className="text-slate-300 dark:text-slate-700 font-light text-lg">/</span>
          <Link
            to="/"
            className="flex items-center gap-1.5 font-display font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <BrainCircuit className="w-4 h-4 text-indigo-500" />
            <span className="hidden xs:inline">IPIP-NEO-120</span>
          </Link>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {getNavLinkLabel(link)}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Preferences */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Prominent Segmented Language Switcher Pill */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-inner">
            <button
              onClick={() => setLanguage('id')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                language === 'id'
                  ? 'bg-indigo-600 text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Bahasa Indonesia"
              aria-label="Bahasa Indonesia"
            >
              <span className="hidden sm:inline">🇮🇩</span>
              <span>ID</span>
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-indigo-600 text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="English Language"
              aria-label="English Language"
            >
              <span className="hidden sm:inline">🇬🇧</span>
              <span>EN</span>
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                language === 'es'
                  ? 'bg-indigo-600 text-white shadow-sm scale-[1.02]'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Idioma Español"
              aria-label="Idioma Español"
            >
              <span className="hidden sm:inline">🇪🇸</span>
              <span>ES</span>
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Toggle theme"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Quick Start CTA */}
          <Link
            to="/consent"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm"
          >
            {language === 'es' ? 'Tomar Test' : language === 'en' ? 'Take Test' : 'Mulai Tes'}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown with distinct background color */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b-2 border-indigo-500/60 bg-slate-900 text-slate-100 px-4 py-4 space-y-3.5 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Theme Toggle Row */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-800/90 border border-slate-700/80">
            <span className="text-xs font-bold text-slate-300">
              {language === 'es' ? 'Modo de Tema' : language === 'en' ? 'Theme Mode' : 'Mode Tampilan'}
            </span>
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 text-slate-100 hover:bg-slate-600 text-xs font-bold transition-colors"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'es' ? 'Claro' : language === 'en' ? 'Light' : 'Terang'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-300" />
                  <span>{language === 'es' ? 'Oscuro' : language === 'en' ? 'Dark' : 'Gelap'}</span>
                </>
              )}
            </button>
          </div>

          {/* Streamlined Language Selector for Mobile Menu */}
          <div className="p-2.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 space-y-2">
            <div className="text-[11px] font-bold text-slate-300 flex items-center justify-between px-1">
              <span>{language === 'es' ? 'Idioma' : language === 'en' ? 'Language' : 'Bahasa'}</span>
              <Globe className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => {
                  setLanguage('id');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-2 rounded-xl text-xs font-black flex items-center justify-center transition-all ${
                  language === 'id'
                    ? 'bg-indigo-600 text-white shadow-md ring-1 ring-indigo-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => {
                  setLanguage('en');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-2 rounded-xl text-xs font-black flex items-center justify-center transition-all ${
                  language === 'en'
                    ? 'bg-indigo-600 text-white shadow-md ring-1 ring-indigo-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  setLanguage('es');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-2 rounded-xl text-xs font-black flex items-center justify-center transition-all ${
                  language === 'es'
                    ? 'bg-indigo-600 text-white shadow-md ring-1 ring-indigo-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                ES
              </button>
            </div>
          </div>

          {/* Parent Portal Link */}
          <a
            href="https://job.web.id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 font-bold text-sm text-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex flex-col items-center justify-center font-black leading-none shrink-0 shadow-sm">
                <span className="text-[8.5px] font-black tracking-tight leading-none">JOB</span>
                <span className="text-[6px] font-extrabold tracking-wider text-amber-300 leading-none mt-0.5">WEB</span>
              </div>
              <span className="text-xs font-bold text-slate-200">
                {language === 'es'
                  ? 'Portal Principal Job.Web.ID'
                  : language === 'en'
                  ? 'Job.Web.ID Main Portal'
                  : 'Portal Kerja Utama Job.Web.ID'}
              </span>
            </div>
            <ExternalLink className="w-4 h-4 text-indigo-400" />
          </a>

          <div className="space-y-1 pt-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-xl text-sm font-semibold text-slate-200 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                {getNavLinkLabel(link)}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <Link
              to="/consent"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex justify-center items-center py-3 text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all"
            >
              {language === 'es'
                ? 'Iniciar Test de 120 Ítems'
                : language === 'en'
                ? 'Start 120-Item Test'
                : 'Mulai Tes 120 Soal'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
