import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

import { LandingPage } from './pages/LandingPage';
import { ConsentDemographicsPage } from './pages/ConsentDemographicsPage';
import { TestPage } from './pages/TestPage';
import { ResultsPage } from './pages/ResultsPage';
import { RetestPage } from './pages/RetestPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { PrivacyPage } from './pages/PrivacyPage';

import { useTestStore } from './stores/testStore';

export const App: React.FC = () => {
  const { theme, language, setLanguage } = useTestStore();

  useEffect(() => {
    // Check URL query param for ?lang= (es, en, id)
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang && (urlLang === 'es' || urlLang === 'en' || urlLang === 'id')) {
      if (urlLang !== language) {
        setLanguage(urlLang);
      }
    }
  }, [language, setLanguage]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-200 selection:bg-indigo-500 selection:text-white">
        <Header />
        
        <main className="flex-1 max-w-6xl w-full mx-auto px-6 sm:px-8 md:px-12">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/consent" element={<ConsentDemographicsPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/result/:id" element={<ResultsPage />} />
              <Route path="/retest" element={<RetestPage />} />
              <Route path="/methodology" element={<MethodologyPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </ErrorBoundary>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
