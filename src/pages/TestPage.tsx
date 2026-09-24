import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle,
  X,
  ListFilter,
  Sparkles,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTestStore } from '../stores/testStore';
import { IPIP_120_ITEMS, DOMAIN_METADATA } from '../data/ipip-neo-120';
import { LikertScale } from '../components/LikertScale';
import { ProgressBar } from '../components/ProgressBar';
import { SEO } from '../components/SEO';

export const TestPage: React.FC = () => {
  const navigate = useNavigate();

  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      name: 'Kuesioner IPIP-NEO-120 Big Five Personality Test',
      url: 'https://personality-test.job.web.id/test',
      description: 'Kuesioner 120 item pertanyaan skala Likert untuk mengukur Neuroticism, Extraversion, Openness, Agreeableness, dan Conscientiousness.',
      educationalUse: 'Assessment',
      about: {
        '@type': 'Thing',
        name: 'Big Five personality traits',
      },
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
          name: 'Kuesioner Tes',
          item: 'https://personality-test.job.web.id/test',
        },
      ],
    },
  ];
  const {
    answers,
    setAnswer,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    nextQuestion,
    prevQuestion,
    pageSize,
    setPageSize,
    saveForLater,
    completeTest,
    language,
  } = useTestStore();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto detect viewport width to set page size if not manually set
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // Desktop can default to 3 items
      } else {
        setPageSize(1); // Mobile 1 item per view
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = 120;
  const currentItems = IPIP_120_ITEMS.slice(
    currentQuestionIndex,
    Math.min(totalItems, currentQuestionIndex + pageSize)
  );

  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === totalItems;

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {
      // Ignored
    }

    const result = await completeTest();
    setIsSubmitting(false);

    if (result) {
      navigate(`/result/${result.id}`);
    } else {
      alert(
        language === 'en'
          ? 'Please answer all 120 items before completing the test.'
          : 'Harap jawab seluruh 120 item sebelum menyelesaikan tes.'
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      <SEO
        title="Kuesioner Tes Kepribadian IPIP-NEO-120"
        description="Jawab 120 item pertanyaan tes kepribadian IPIP-NEO-120 secara online. Dilengkapi keyboard navigation, auto-save, dan progress bar."
        path="/test"
        jsonLd={jsonLdData}
      />
      {/* Top Header & Viewport Mode Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
        <div>
          <h1 className="font-display font-bold text-lg text-slate-900 dark:text-white">
            {language === 'en' ? 'IPIP-NEO-120 Assessment' : 'Tes Kepribadian IPIP-NEO-120'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'en'
              ? 'Rate how accurately each statement describes you.'
              : 'Pilih seberapa akurat setiap pernyataan menggambarkan diri Anda.'}
          </p>
        </div>

        {/* View mode toggle (1 item vs 3 items per view) */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden sm:inline">
            {language === 'en' ? 'View mode:' : 'Tampilan:'}
          </span>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setPageSize(1)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                pageSize === 1
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              1 {language === 'en' ? 'Item' : 'Soal'}
            </button>
            <button
              onClick={() => setPageSize(3)}
              className={`px-3 py-1 rounded-lg transition-colors hidden sm:block ${
                pageSize === 3
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              3 {language === 'en' ? 'Items' : 'Soal'}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar onOpenItemDrawer={() => setDrawerOpen(true)} />

      {/* Questions List */}
      <div className="space-y-6">
        {currentItems.map((item) => {
          const itemAnswer = answers[item.id];
          const domainMeta = DOMAIN_METADATA[item.domain];

          return (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-all"
            >
              {/* Question Item Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono font-bold text-xs flex items-center justify-center">
                    #{item.id}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Item {item.id} / 120
                  </span>
                </div>

                {itemAnswer && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {language === 'en' ? 'Answered' : 'Terjawab'}
                  </span>
                )}
              </div>

              {/* Question Text */}
              <div className="py-2 space-y-1">
                <p className="font-display font-semibold text-lg sm:text-xl text-slate-900 dark:text-white leading-relaxed">
                  "{language === 'en' ? item.textEn : item.textId}"
                </p>
                {language === 'en' && item.textId && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                    Indonesian: {item.textId}
                  </p>
                )}
              </div>

              {/* Likert Scale */}
              <LikertScale
                itemId={item.id}
                value={itemAnswer}
                onChange={(val) => setAnswer(item.id, val)}
                onAutoAdvance={() => {
                  if (pageSize === 1 && currentQuestionIndex < 119) {
                    nextQuestion();
                  }
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{language === 'en' ? 'Previous' : 'Sebelumnya'}</span>
          </button>

          <button
            onClick={nextQuestion}
            disabled={currentQuestionIndex + pageSize >= totalItems}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs transition-colors"
          >
            <span>{language === 'en' ? 'Next' : 'Selanjutnya'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              saveForLater();
              alert(
                language === 'en'
                  ? 'Your progress has been saved locally! You can return anytime.'
                  : 'Progres jawaban Anda telah tersimpan di browser! Anda dapat melanjutkan kapan saja.'
              );
            }}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs transition-colors"
          >
            <Save className="w-4 h-4 text-slate-500" />
            <span>{language === 'en' ? 'Save & Continue Later' : 'Simpan & Lanjut Nanti'}</span>
          </button>

          {/* Submit Button */}
          <button
            onClick={handleFinish}
            disabled={!isAllAnswered || isSubmitting}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs shadow-md transition-all ${
              isAllAnswered
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer ring-2 ring-emerald-400'
                : 'bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>
              {isSubmitting
                ? language === 'en'
                  ? 'Calculating Scores...'
                  : 'Menghitung Skor...'
                : language === 'en'
                ? 'Submit & View Report'
                : 'Selesaikan & Lihat Hasil'}
            </span>
          </button>
        </div>
      </div>

      {/* Item Drawer / Map Modal */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full p-6 space-y-4 overflow-y-auto shadow-2xl border-l border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 font-display font-bold text-slate-900 dark:text-white text-base">
                <ListFilter className="w-5 h-5 text-indigo-600" />
                <span>{language === 'en' ? 'Item Overview Map' : 'Peta Jawaban 120 Soal'}</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              {language === 'en'
                ? 'Click any item number to jump directly to that question.'
                : 'Klik nomor soal untuk melompat langsung ke pertanyaan tersebut.'}
            </p>

            <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 pt-2">
              {Array.from({ length: 120 }, (_, i) => i + 1).map((itemId) => {
                const isAns = answers[itemId] !== undefined;
                const isCurrent =
                  itemId >= currentQuestionIndex + 1 &&
                  itemId <= currentQuestionIndex + pageSize;

                return (
                  <button
                    key={itemId}
                    onClick={() => {
                      setCurrentQuestionIndex(itemId - 1);
                      setDrawerOpen(false);
                    }}
                    className={`h-9 rounded-lg font-mono text-xs font-bold transition-all border ${
                      isCurrent
                        ? 'ring-2 ring-indigo-500 bg-indigo-600 text-white border-indigo-600'
                        : isAns
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {itemId}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
