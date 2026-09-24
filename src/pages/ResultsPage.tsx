import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Download,
  Share2,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  FileText,
  Sparkles,
  BarChart3,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { useTestStore } from '../stores/testStore';
import { fetchResultById } from '../lib/api';
import { TestResult, DomainKey } from '../types';
import { DOMAIN_METADATA } from '../data/ipip-neo-120';
import { RadarChartComponent } from '../components/RadarChartComponent';
import { FacetBarChart } from '../components/FacetBarChart';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { downloadJSON, copyShareLink, formatDate } from '../lib/utils';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { currentResult, language, startRetest } = useTestStore();

  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedDomainTab, setSelectedDomainTab] = useState<DomainKey | 'ALL'>('ALL');
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      if (id) {
        const fetched = await fetchResultById(id);
        if (isMounted) {
          setResult(fetched);
          setLoading(false);
        }
      } else if (currentResult) {
        if (isMounted) {
          setResult(currentResult);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [id, currentResult]);

  const handleCopyLink = async () => {
    if (!result) return;
    const ok = await copyShareLink(result.id);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`IPIP-NEO-120-Result-${result?.id.slice(0, 8)}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      window.print();
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!result) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
          <h2 className="font-bold text-lg">Result Not Found</h2>
          <p className="text-xs pt-1">
            No assessment result found for UUID: <span className="font-mono">{id}</span>.
          </p>
        </div>
        <Link
          to="/consent"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs"
        >
          <span>Start New Test</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const domainKeys: DomainKey[] = ['N', 'E', 'O', 'A', 'C'];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Action Toolbar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-2xl shadow-sm">
        <div>
          <span className="text-[10px] font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
            {language === 'en' ? 'Psychometric Report' : 'Laporan Psikometrik'}
          </span>
          <h1 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
            IPIP-NEO-120 Personality Report
          </h1>
          <p className="text-xs text-slate-500 font-mono pt-0.5">
            UUID: {result.id} · Completed {formatDate(result.createdAt)}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopyLink}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-semibold text-xs hover:bg-indigo-100 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? (language === 'en' ? 'Link Copied!' : 'Link Tersalin!') : language === 'en' ? 'Share Link' : 'Bagikan Link'}</span>
          </button>

          <button
            onClick={() => downloadJSON(result, `ipip-neo-120-${result.id.slice(0, 8)}.json`)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>JSON</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>PDF Report</span>
          </button>
        </div>
      </div>

      {/* Printable Report Canvas Container */}
      <div ref={reportRef} className="space-y-8 bg-white dark:bg-slate-950 p-2 sm:p-4 rounded-3xl">
        {/* Retest Banner if retest */}
        {result.isRetest && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
            <RotateCcw className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              {language === 'en'
                ? `This is a test-retest session linked to original ID: ${result.retestOf}`
                : `Ini adalah sesi test-retest yang terhubung ke ID lama: ${result.retestOf}`}
            </span>
          </div>
        )}

        {/* Section 1: Radar Chart Summary */}
        <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                {language === 'en' ? 'Big Five Domain Radar Overview' : 'Radar Profil Big Five'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'en'
                  ? 'Raw domain totals range from 24 (min) to 120 (max).'
                  : 'Skor total domain berkisar dari 24 (min) hingga 120 (maks).'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                120 Items Keyed
              </span>
            </div>
          </div>

          <RadarChartComponent domains={result.domains} />
        </section>

        {/* Section 2: 5 Domain Cards Breakdown */}
        <section className="space-y-6">
          <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
            {language === 'en' ? 'Detailed Domain Trait Interpretations' : 'Interpretasi Detail 5 Domain Utama'}
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {domainKeys.map((key) => {
              const dom = result.domains[key];
              const meta = DOMAIN_METADATA[key];

              return (
                <div
                  key={key}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl font-display font-bold text-white text-base flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: meta.color }}
                      >
                        {key}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                          {language === 'en' ? meta.nameEn : meta.nameId}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {language === 'en' ? meta.taglineEn : meta.taglineId}
                        </p>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                        {dom.totalScore} <span className="text-xs text-slate-400 font-normal">/ 120</span>
                      </div>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                          dom.level === 'High'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                            : dom.level === 'Low'
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {dom.level} {language === 'en' ? 'Score' : 'Skor'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-100 dark:border-slate-800">
                    {dom.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: 30 Facets Breakdown */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                {language === 'en' ? '30 Facet Breakdown' : 'Rincian 30 Sub-Faset Kepribadian'}
              </h2>
              <p className="text-xs text-slate-500">
                {language === 'en'
                  ? 'Each facet is scored on a 4–20 scale based on 4 keyed items.'
                  : 'Setiap faset diukur pada skala 4–20 berdasarkan 4 item kunci.'}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
              <button
                onClick={() => setSelectedDomainTab('ALL')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedDomainTab === 'ALL'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                All 30
              </button>
              {domainKeys.map((k) => (
                <button
                  key={k}
                  onClick={() => setSelectedDomainTab(k)}
                  className={`px-2.5 py-1.5 rounded-lg transition-colors ${
                    selectedDomainTab === k
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          <FacetBarChart domains={result.domains} selectedDomain={selectedDomainTab} />
        </section>

        {/* Section 4: Methodology & Citations Summary */}
        <section className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>{language === 'en' ? 'Methodology & Citation Summary' : 'Ringkasan Metodologi & Sitasi'}</span>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            {language === 'en'
              ? 'This report was generated using the pure TypeScript scoring engine of IPIP-NEO-120. Item keyed responses (+/-) are mapped automatically to reverse scales, yielding 30 facet scores (range 4-20) and 5 domain totals (range 24-120).'
              : 'Laporan ini dihitung menggunakan scoring engine murni IPIP-NEO-120. Item berskor terbalik (+/-) dikonversi secara otomatis untuk menghasilkan 30 skor faset (skala 4-20) dan 5 total domain (skala 24-120).'}
          </p>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 font-mono text-[11px] text-slate-500">
            Citation: Johnson, J. A. (2014). Journal of Research in Personality, 51, 78–89.
          </div>
        </section>
      </div>

      {/* Retest CTA Card */}
      <div className="p-6 rounded-2xl bg-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-base">
            {language === 'en' ? 'Participate in Test-Retest Study' : 'Ikuti Sesi Test-Retest Ulang'}
          </h3>
          <p className="text-xs text-indigo-200">
            {language === 'en'
              ? 'Want to test your trait stability after 2 weeks or 1 month?'
              : 'Ingin menguji stabilitas hasil kepribadian Anda setelah beberapa minggu?'}
          </p>
        </div>

        <button
          onClick={() => {
            startRetest(result.id);
            navigate('/test');
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shrink-0 transition-colors shadow-md"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{language === 'en' ? 'Start Retest Session' : 'Mulai Sesi Retest'}</span>
        </button>
      </div>
    </div>
  );
};
