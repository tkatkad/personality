import React, { useEffect } from 'react';
import { useTestStore } from '../stores/testStore';

interface LikertScaleProps {
  itemId: number;
  value?: number;
  onChange: (val: number) => void;
  autoAdvance?: boolean;
  onAutoAdvance?: () => void;
}

export const LikertScale: React.FC<LikertScaleProps> = ({
  itemId,
  value,
  onChange,
  onAutoAdvance,
}) => {
  const { language } = useTestStore();

  const options = [
    { val: 1, labelEn: 'Very Inaccurate', labelId: 'Sangat Tidak Akurat', labelEs: 'Muy Inexacto', short: '1' },
    { val: 2, labelEn: 'Moderately Inaccurate', labelId: 'Cukup Tidak Akurat', labelEs: 'Moderadamente Inexacto', short: '2' },
    { val: 3, labelEn: 'Neither', labelId: 'Netral', labelEs: 'Ni de acuerdo ni en desacuerdo', short: '3' },
    { val: 4, labelEn: 'Moderately Accurate', labelId: 'Cukup Akurat', labelEs: 'Moderadamente Exacto', short: '4' },
    { val: 5, labelEn: 'Very Accurate', labelId: 'Sangat Akurat', labelEs: 'Muy Exacto', short: '5' },
  ];

  const handleSelect = (val: number) => {
    onChange(val);
    if (onAutoAdvance) {
      setTimeout(() => {
        onAutoAdvance();
      }, 150);
    }
  };

  // Keyboard shortcut listener (1-5 keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const val = parseInt(e.key, 10);
        handleSelect(val);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [itemId]);

  return (
    <div className="w-full space-y-2 pt-2">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {options.map((opt) => {
          const isSelected = value === opt.val;
          return (
            <button
              key={opt.val}
              type="button"
              onClick={() => handleSelect(opt.val)}
              className={`group relative flex sm:flex-col items-center justify-between sm:justify-center p-3 sm:py-3.5 sm:px-2 rounded-xl text-left sm:text-center transition-all duration-150 border active:scale-[0.98] ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-400 dark:ring-indigo-500'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3 sm:flex-col sm:gap-1.5 w-full">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-white text-indigo-700'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                  }`}
                >
                  {opt.val}
                </span>
                <span className="text-xs sm:text-xs md:text-sm font-semibold leading-tight text-center break-words max-w-full px-0.5">
                  {language === 'es' ? opt.labelEs : language === 'en' ? opt.labelEn : opt.labelId}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      <div className="text-xs sm:text-sm text-center text-slate-500 dark:text-slate-400 pt-1.5 hidden sm:block">
        {language === 'es'
          ? 'Consejo: Presione los números '
          : language === 'en'
          ? 'Tip: Press numbers '
          : 'Petunjuk: Tekan angka '}
        <kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border text-xs">1</kbd>–<kbd className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border text-xs">5</kbd>
        {language === 'es'
          ? ' en su teclado para responder rápidamente.'
          : language === 'en'
          ? ' on your keyboard to quickly answer.'
          : ' pada keyboard Anda untuk menjawab dengan cepat.'}
      </div>
    </div>
  );
};
