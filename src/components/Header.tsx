import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Globe, Menu, X, BrainCircuit, RotateCcw } from 'lucide-react';
import { useTestStore } from '../stores/testStore';

export const Header: React.FC = () => {
  const { theme, toggleDarkMode, language, setLanguage } = useTestStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', labelEn: 'Home', labelId: 'Beranda' },
    { href: '/consent', labelEn: 'Take Test', labelId: 'Mulai Tes' },
    { href: '/retest', labelEn: 'Retest Study', labelId: 'Studi Retest' },
    { href: '/methodology', labelEn: 'Methodology', labelId: 'Metodologi' },
    { href: '/privacy', labelEn: 'Privacy', labelId: 'Privasi' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single-element Wordmark */}
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight hover:opacity-90 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shadow-sm">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <span>IPIP-NEO-120</span>
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
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
                {language === 'en' ? link.labelEn : link.labelId}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Actions & Preferences */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Switch Language"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>{language.toUpperCase()}</span>
          </button>

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
            {language === 'en' ? 'Take Test' : 'Mulai Tes'}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {language === 'en' ? link.labelEn : link.labelId}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              to="/consent"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex justify-center items-center py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white"
            >
              {language === 'en' ? 'Start 120-Item Test' : 'Mulai Tes 120-Item'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
