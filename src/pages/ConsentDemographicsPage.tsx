import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, ArrowRight, Info, Key, FileText } from 'lucide-react';
import { useTestStore } from '../stores/testStore';

export const ConsentDemographicsPage: React.FC = () => {
  const navigate = useNavigate();
  const { uuid, demographics, setDemographics, language } = useTestStore();

  const [age, setAge] = useState<string>(demographics.age ? String(demographics.age) : '');
  const [gender, setGender] = useState<string>(demographics.gender || '');
  const [consent, setConsent] = useState<boolean>(demographics.consent !== false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setDemographics({
      age: age ? parseInt(age, 10) : undefined,
      gender: gender as any,
      consent,
    });

    navigate('/test');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      {/* Title Header */}
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          {language === 'en' ? 'Consent & Optional Demographics' : 'Persetujuan (Consent) & Demografi'}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {language === 'en'
            ? 'Before beginning the 120-item test, please review research consent guidelines.'
            : 'Sebelum memulai tes 120-item, silakan tinjau informasi persetujuan partisipasi.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* UUID Card */}
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Key className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {language === 'en' ? 'Your Anonymous Participant UUID:' : 'UUID Responden Anonim Anda:'}
              </span>
              <p className="font-mono text-indigo-700 dark:text-indigo-300 font-bold select-all">
                {uuid}
              </p>
            </div>
          </div>
          <span className="text-[10px] text-slate-500 hidden sm:inline">Auto-generated</span>
        </div>

        {/* Consent Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base border-b border-slate-100 dark:border-slate-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>{language === 'en' ? 'Research Data Consent' : 'Persetujuan Pengumpulan Data Anonim'}</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {language === 'en'
              ? 'By checking this box, you agree that your 120 item responses and optional demographic information will be stored anonymously in our Cloudflare D1 research database for psychometric evaluation and test-retest reliability studies based on Johnson (2014).'
              : 'Dengan mencentang opsi ini, Anda menyetujui bahwa jawaban 120 soal dan data demografi opsional Anda disimpan secara anonim di database Cloudflare D1 untuk riset psikometrik dan evaluasi reliabilitas test-retest.'}
          </p>

          <label className="flex items-start gap-3 pt-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-indigo-600 rounded border-slate-300 dark:border-slate-700 focus:ring-indigo-500"
            />
            <span className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {language === 'en'
                ? 'I consent to anonymous response data collection for research purposes.'
                : 'Saya setuju data jawaban disimpan secara anonim untuk keperluan penelitian.'}
            </span>
          </label>
        </div>

        {/* Optional Demographics */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
              <UserCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>{language === 'en' ? 'Demographic Information' : 'Informasi Demografi'}</span>
            </div>
            <span className="text-[11px] font-semibold text-slate-400">
              {language === 'en' ? 'Optional' : 'Opsional'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Age Field */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                {language === 'en' ? 'Age (Years)' : 'Usia (Tahun)'}
              </label>
              <input
                type="number"
                min="10"
                max="100"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g. 25"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Gender Field */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                {language === 'en' ? 'Gender' : 'Jenis Kelamin'}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">{language === 'en' ? '-- Select (Optional) --' : '-- Pilih (Opsional) --'}</option>
                <option value="male">{language === 'en' ? 'Male' : 'Laki-laki'}</option>
                <option value="female">{language === 'en' ? 'Female' : 'Perempuan'}</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer-not-to-say">{language === 'en' ? 'Prefer not to say' : 'Tidak ingin menyebutkan'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg transition-all active:scale-[0.99]"
          >
            <span>{language === 'en' ? 'Start 120-Item Assessment' : 'Mulai Pengerjaan 120 Soal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
