import React from 'react';
import { Save, CheckCircle2, ListFilter } from 'lucide-react';
import { useTestStore } from '../stores/testStore';

interface ProgressBarProps {
  onOpenItemDrawer?: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ onOpenItemDrawer }) => {
  const { answers, currentQuestionIndex, lastSavedAt, language } = useTestStore();

  const totalItems = 120;
  const answeredCount = Object.keys(answers).length;
  const percentage = Math.round((answeredCount / totalItems) * 100);

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900 dark:text-white">
            {language === 'en' ? 'Item Progress' : 'Progres Pengerjaan'}
          </span>
          <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full text-[11px]">
            {answeredCount} / {totalItems} ({percentage}%)
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Auto-save status indicator */}
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
            {lastSavedAt ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden sm:inline">
                  {language === 'en' ? 'Auto-saved' : 'Tersimpan otomatis'}
                </span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">
                  {language === 'en' ? 'Local storage sync' : 'Sinkronisasi lokal'}
                </span>
              </>
            )}
          </div>

          {/* Drawer trigger button */}
          {onOpenItemDrawer && (
            <button
              onClick={onOpenItemDrawer}
              className="flex items-center gap-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg transition-colors"
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Item Map' : 'Daftar Soal'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Track */}
      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
