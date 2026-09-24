import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Download,
  Share2,
  Check,
  RotateCcw,
  BookOpen,
  FileText,
  ArrowRight,
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { useTestStore } from '../stores/testStore';
import { fetchResultById } from '../lib/api';
import { TestResult, DomainKey } from '../types';
import {
  DOMAIN_METADATA,
  getDomainName,
  getDomainTagline,
  getDomainDescription,
  getScoreLevelLabel,
} from '../data/ipip-neo-120';
import { RadarChartComponent } from '../components/RadarChartComponent';
import { FacetBarChart } from '../components/FacetBarChart';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { downloadJSON, copyShareLink, formatDate } from '../lib/utils';
import { SEO } from '../components/SEO';
import { PdfReportTemplate } from '../components/PdfReportTemplate';
import { AdSenseSlot } from '../components/AdSenseSlot';
import { ShopeeAffiliateCard } from '../components/ShopeeAffiliateCard';
import { getCareerDevelopmentGuides, getFutureCareerProjections } from '../lib/recommendations';

export const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { currentResult, language, startRetest } = useTestStore();
  const pdfTemplateRef = useRef<HTMLDivElement>(null);

  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemPage',
      name:
        language === 'es'
          ? 'Informe de Resultados Psicométricos IPIP-NEO-120'
          : language === 'en'
          ? 'IPIP-NEO-120 Psychometric Assessment Report'
          : 'Laporan Hasil Psikometrik IPIP-NEO-120',
      description:
        language === 'es'
          ? 'Informe del perfil de personalidad Big Five (5 dominios y 30 subfacetas) basado en las normas de Johnson (2014).'
          : language === 'en'
          ? 'Big Five personality profile report (5 main domains & 30 sub-facets) based on Johnson (2014) norming data.'
          : 'Laporan profil kepribadian Big Five (5 domain utama & 30 sub-faset) berdasarkan normasi Johnson (2014).',
      url: `https://personality-test.job.web.id/result/${id || ''}`,
      mainEntity: {
        '@type': 'MedicalWebPage',
        name:
          language === 'es'
            ? 'Informe Psicométrico de Evaluación de Personalidad Big Five'
            : language === 'en'
            ? 'Big Five Personality Assessment Psychometric Report'
            : 'Laporan Psikometri Big Five Personality Assessment',
        aspect: 'Psychometric Results',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: language === 'es' ? 'Inicio' : language === 'en' ? 'Home' : 'Beranda',
          item: 'https://personality-test.job.web.id/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: language === 'es' ? 'Resultados' : language === 'en' ? 'Report Results' : 'Hasil Laporan',
          item: `https://personality-test.job.web.id/result/${id || ''}`,
        },
      ],
    },
  ];

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
    const ok = await copyShareLink(result);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPDF = async () => {
    const targetEl = pdfTemplateRef.current || reportRef.current;
    if (!targetEl) return;
    try {
      const canvas = await html2canvas(targetEl, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: 750,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth(); // 210 mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297 mm

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Page 1
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Subsequent pages if long
      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

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
          <h2 className="font-bold text-lg">
            {language === 'es' ? 'Resultado no encontrado' : language === 'en' ? 'Result Not Found' : 'Hasil Tidak Ditemukan'}
          </h2>
          <p className="text-xs pt-1">
            {language === 'es'
              ? 'No se encontraron resultados para UUID:'
              : language === 'en'
              ? 'No assessment result found for UUID:'
              : 'Hasil tes tidak ditemukan untuk UUID:'}{' '}
            <span className="font-mono">{id}</span>.
          </p>
        </div>
        <Link
          to="/consent"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs"
        >
          <span>{language === 'es' ? 'Iniciar Nuevo Test' : language === 'en' ? 'Start New Test' : 'Mulai Tes Baru'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const domainKeys: DomainKey[] = ['N', 'E', 'O', 'A', 'C'];

  // Top 2 domains sorted by highest score
  const sortedDomains = ([...domainKeys]).sort(
    (a, b) => result.domains[b].totalScore - result.domains[a].totalScore
  );
  const topDomain1 = sortedDomains[0];
  const topDomain2 = sortedDomains[1];
  const topName1 = getDomainName(topDomain1, language);
  const topName2 = getDomainName(topDomain2, language);

  return (
    <div className="max-w-4xl mx-auto py-12 md:py-20 space-y-10">
      <SEO
        title={
          language === 'es'
            ? `Informe Psicométrico IPIP-NEO-120 – ${result?.id ? result.id.slice(0, 8) : 'Informe'}`
            : language === 'en'
            ? `IPIP-NEO-120 Psychometric Report – ${result?.id ? result.id.slice(0, 8) : 'Report'}`
            : `Laporan Hasil Psikometri IPIP-NEO-120 – ${result?.id ? result.id.slice(0, 8) : 'Laporan'}`
        }
        description={
          language === 'es'
            ? 'Resultados del análisis psicométrico de personalidad Big Five (5 dominios principales y 30 subfacetas) basados en las normas de Johnson (2014).'
            : language === 'en'
            ? 'Big Five psychometric personality analysis results (5 core domains & 30 sub-facets) based on Johnson (2014) scientific norming.'
            : 'Hasil analisis psikometri kepribadian Big Five (5 domain utama & 30 sub-faset) berdasarkan normasi ilmiah Johnson (2014).'
        }
        path={`/result/${id || ''}`}
        jsonLd={jsonLdData}
      />
      {/* Action Toolbar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-7 rounded-3xl shadow-sm">
        <div>
          <span className="text-[10px] font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400">
            {language === 'es' ? 'Informe Psicométrico' : language === 'en' ? 'Psychometric Report' : 'Laporan Psikometrik'}
          </span>
          <h1 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white leading-tight">
            {language === 'es'
              ? 'Informe de Personalidad IPIP-NEO-120'
              : language === 'en'
              ? 'IPIP-NEO-120 Personality Report'
              : 'Laporan Hasil Kepribadian IPIP-NEO-120'}
          </h1>
          <p className="text-xs text-slate-500 font-mono pt-0.5">
            UUID: {result.id} · {language === 'es' ? 'Completado el' : language === 'en' ? 'Completed' : 'Selesai pada'} {formatDate(result.createdAt, language)}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={handleCopyLink}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 font-semibold text-xs sm:text-sm hover:bg-indigo-100 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            <span>
              {copied
                ? language === 'es'
                  ? '¡Enlace Copiado!'
                  : language === 'en'
                  ? 'Link Copied!'
                  : 'Link Tersalin!'
                : language === 'es'
                ? 'Compartir'
                : language === 'en'
                ? 'Share Link'
                : 'Bagikan Link'}
            </span>
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
            <span>{language === 'es' ? 'Informe PDF' : language === 'en' ? 'PDF Report' : 'Laporan PDF'}</span>
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
              {language === 'es'
                ? `Esta es una sesión de test-retest vinculada al ID original: ${result.retestOf}`
                : language === 'en'
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
                {language === 'es'
                  ? 'Visión General del Radar Big Five'
                  : language === 'en'
                  ? 'Big Five Domain Radar Overview'
                  : 'Radar Profil Big Five'}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {language === 'es'
                  ? 'Las puntuaciones brutas de cada dominio varían de 24 (mín) a 120 (máx).'
                  : language === 'en'
                  ? 'Raw domain totals range from 24 (min) to 120 (max).'
                  : 'Skor total domain berkisar dari 24 (min) hingga 120 (maks).'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                {language === 'es' ? '120 Ítems Evaluados' : language === 'en' ? '120 Items Keyed' : '120 Item Diukur'}
              </span>
            </div>
          </div>

          <RadarChartComponent domains={result.domains} />
        </section>

        {/* Ad Placement 1: Between Overview Radar & Career Guidance */}
        <AdSenseSlot slot="2001" className="my-6" />

        {/* Section 1.5: Job Seeker Career & Interview Insights */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white shadow-md border border-indigo-900/60 space-y-5">
          <div className="flex items-center gap-3 border-b border-indigo-800/60 pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-amber-300 flex items-center justify-center font-bold text-xl">
              💡
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-white">
                {language === 'es'
                  ? 'Estrategia de Carrera y Entrevistas para Solicitantes'
                  : language === 'en'
                  ? 'Job Seeker Career & Interview Strategy'
                  : 'Panduan Karir & Tips Wawancara Kerja'}
              </h2>
              <p className="text-sm text-indigo-100">
                {language === 'es'
                  ? 'Consejos personalizados para la redacción del CV, entrevistas y cultura laboral.'
                  : language === 'en'
                  ? 'Tailored advice for CV writing, HR interviews, and workplace environment fit.'
                  : 'Rekomendasi khusus untuk deskripsi CV, jawaban interview HRD, dan kecocokan lingkungan kerja.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm sm:text-base leading-relaxed">
            {/* Box 1: Highlights for CV */}
            <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-2">
              <span className="font-bold text-indigo-300 text-base flex items-center gap-1.5">
                <span>🎯</span>{' '}
                {language === 'es'
                  ? 'Fortalezas clave para el perfil de tu CV'
                  : language === 'en'
                  ? 'Key Strengths for Your CV Profile'
                  : 'Kekuatan Utama Untuk Ditulis di CV'}
              </span>
              <p className="text-slate-200 leading-relaxed">
                {language === 'es'
                  ? `Tu perfil muestra las mayores puntuaciones en ${topName1} (${result.domains[topDomain1].totalScore}/120) y ${topName2} (${result.domains[topDomain2].totalScore}/120). Destaca tu confiabilidad, atención al detalle y trabajo en equipo en el resumen de tu CV.`
                  : language === 'en'
                  ? `Your highest Big Five scores are in ${topName1} (${result.domains[topDomain1].totalScore}/120) and ${topName2} (${result.domains[topDomain2].totalScore}/120). Highlight your reliability, attention to detail, and team collaboration in your CV summary.`
                  : `Profilmu menunjukkan kekuatan tertinggi pada domain ${topName1} (${result.domains[topDomain1].totalScore}/120) & ${topName2} (${result.domains[topDomain2].totalScore}/120). Tonjolkan keandalan, ketelitian, kerja sama tim, dan kepatuhan pada standar kualitas di ringkasan CV Anda.`}
              </p>
            </div>

            {/* Box 2: Interview Tips */}
            <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-2">
              <span className="font-bold text-emerald-300 text-base flex items-center gap-1.5">
                <span>💬</span>{' '}
                {language === 'es'
                  ? 'Estrategia para Responder en Entrevistas de RRHH'
                  : language === 'en'
                  ? 'HR Interview Answering Strategy'
                  : 'Tips Menjawab Pertanyaan Interview HRD'}
              </span>
              <p className="text-slate-200 leading-relaxed">
                {language === 'es'
                  ? 'Cuando te pregunten sobre tu estilo de trabajo, proporciona ejemplos concretos de cómo priorizas tareas, te comunicas con el equipo bajo presión y aprendes nuevas herramientas.'
                  : language === 'en'
                  ? 'When asked about your working style, provide concrete examples of how you prioritize tasks, communicate with colleagues under pressure, and learn new industry tools quickly.'
                  : 'Saat ditanya "Bagaimana gaya kerjamu?", jelaskan contoh nyata cara kamu mengorganisir tugas harian, berkomunikasi secara terbuka dengan tim, serta semangatmu untuk terus belajar hal baru.'}
              </p>
            </div>

            {/* Box 3: Ideal Work Culture */}
            <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-2">
              <span className="font-bold text-amber-300 text-base flex items-center gap-1.5">
                <span>🏢</span>{' '}
                {language === 'es'
                  ? 'Entorno de Trabajo Ideal'
                  : language === 'en'
                  ? 'Ideal Workplace Environment'
                  : 'Lingkungan Kerja Yang Cocok'}
              </span>
              <p className="text-slate-200 leading-relaxed">
                {language === 'es'
                  ? 'Prosperas mejor en entornos con objetivos claros, comunicación de equipo constructiva y oportunidades para tomar la iniciativa.'
                  : language === 'en'
                  ? 'You flourish best in environments with clear goals, supportive team communication, and opportunities to take initiative while receiving constructive feedback.'
                  : 'Kamu tumbuh paling optimal di perusahaan yang memiliki tujuan kerja jelas, budaya saling mendukung antar rekan kerja, serta memberikan ruang untuk berinisiatif dan belajar.'}
              </p>
            </div>

            {/* Box 4: Self Growth Note */}
            <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-2">
              <span className="font-bold text-purple-300 text-base flex items-center gap-1.5">
                <span>📈</span>{' '}
                {language === 'es'
                  ? 'Consejo de Desarrollo Personal'
                  : language === 'en'
                  ? 'Personal Development Tip'
                  : 'Area Pengembangan Diri'}
              </span>
              <p className="text-slate-200 leading-relaxed">
                {language === 'es'
                  ? 'Mantén un equilibrio saludable entre el trabajo y la vida personal, y practica técnicas de resiliencia ante plazos ajustados.'
                  : language === 'en'
                  ? 'Maintain a healthy work-life balance and practice stress resilience techniques when handling fast-paced workplace deadlines or unexpected role changes.'
                  : 'Latih manajemen beban kerja dan teknik relaksasi saat menghadapi tenggat waktu (deadline) yang padat agar performa kerja tetap konsisten dan terjaga.'}
              </p>
            </div>
          </div>
        </section>

        {/* Section 1.8: Personal & Career Development Roadmap */}
        {(() => {
          const guides = getCareerDevelopmentGuides(result.domains, language);
          return (
            <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                    <span>🚀</span>
                    <span>
                      {language === 'es'
                        ? 'Hoja de Ruta de Desarrollo Personal y Profesional'
                        : language === 'en'
                        ? 'Personal & Career Development Roadmap'
                        : 'Rencana Pengembangan Diri, Studi Lanjutan & Rekomendasi Buku'}
                    </span>
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 pt-1">
                    {language === 'es'
                      ? 'Recomendaciones personalizadas basadas en tus rasgos de personalidad dominantes.'
                      : language === 'en'
                      ? 'Tailored actionable recommendations calculated from your unique Big Five trait profile.'
                      : 'Rekomendasi tindakan nyata yang disesuaikan secara khusus dengan profil kepribadian Big Five Anda.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Box A: Further Studies */}
                <div className="p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 space-y-3">
                  <h3 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-indigo-600 text-white text-xs">🎓</span>
                    <span>
                      {language === 'es'
                        ? 'Estudios Avanzados y Certificaciones'
                        : language === 'en'
                        ? 'Further Studies & Certifications'
                        : 'Rekomendasi Studi Lanjutan & Sertifikasi'}
                    </span>
                  </h3>
                  <ul className="space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-200 list-disc list-inside leading-relaxed font-medium">
                    {guides.furtherStudies.map((study, idx) => (
                      <li key={idx}>{study}</li>
                    ))}
                  </ul>
                </div>

                {/* Box B: Recommended Courses */}
                <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-3">
                  <h3 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-600 text-white text-xs">💻</span>
                    <span>
                      {language === 'es'
                        ? 'Cursos y Capacitación'
                        : language === 'en'
                        ? 'Recommended Courses & Training'
                        : 'Kursus & Pelatihan Keahlian'}
                    </span>
                  </h3>
                  <ul className="space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-200 list-disc list-inside leading-relaxed font-medium">
                    {guides.recommendedCourses.map((course, idx) => (
                      <li key={idx}>{course}</li>
                    ))}
                  </ul>
                </div>

                {/* Box C: Recommended Books */}
                <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 space-y-3">
                  <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-amber-600 text-white text-xs">📚</span>
                    <span>
                      {language === 'es'
                        ? 'Lista de Lecturas Recomendadas'
                        : language === 'en'
                        ? 'Recommended Reading List'
                        : 'Daftar Buku Wajib Baca'}
                    </span>
                  </h3>
                  <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    {guides.recommendedBooks.map((book, idx) => (
                      <div key={idx} className="border-b border-amber-200/60 dark:border-amber-900/60 pb-2 last:border-none">
                        <p className="font-bold text-slate-900 dark:text-slate-100">
                          "{book.title}" <span className="font-normal text-slate-500">— {book.author}</span>
                        </p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 italic mt-0.5">{book.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Box D: Daily Exercises */}
                <div className="p-5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 space-y-3">
                  <h3 className="font-bold text-purple-900 dark:text-purple-200 text-sm flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-purple-600 text-white text-xs">🏋️‍♂️</span>
                    <span>
                      {language === 'es'
                        ? 'Ejercicios y Hábitos Diarios'
                        : language === 'en'
                        ? 'Daily Practice Exercises & Habits'
                        : 'Latihan Harian & Kebiasaan Praktis'}
                    </span>
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside leading-relaxed font-medium">
                    {guides.dailyExercises.map((exercise, idx) => (
                      <li key={idx}>{exercise}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Shopee Affiliate Recommended Product Banner */}
              <ShopeeAffiliateCard className="mt-4" />
            </section>
          );
        })()}

        {/* Section 1.9: Future Emerging Professions & Roles (2026-2036) */}
        {(() => {
          const futureRoles = getFutureCareerProjections(result.domains, language);
          return (
            <section className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30 mb-1">
                    <span>🔮</span> 2026–2036 Career Horizon
                  </div>
                  <h2 className="font-display font-bold text-xl text-white">
                    {language === 'es'
                      ? 'Proyección de Profesiones Futuras y Roles de Carrera (Horizonte a 10 Años)'
                      : language === 'en'
                      ? 'Emerging Future Professions & Career Roles (10-Year Horizon)'
                      : 'Proyeksi Profesi Masa Depan & Lapangan Kerja (10 Tahun Ke Depan)'}
                  </h2>
                  <p className="text-sm text-slate-300 pt-1">
                    {language === 'es'
                      ? 'Nuevas profesiones emergentes impulsadas por la adopción de IA, la sostenibilidad y la economía digital adaptadas a tu perfil Big Five.'
                      : language === 'en'
                      ? 'Concrete emerging jobs driven by AI adoption, sustainability, and digital economy tailored to your Big Five profile.'
                      : 'Contoh konkret profesi masa depan yang akan tumbuh pesat akibat perkembangan AI, otomatisasi, dan transformasi digital yang sangat cocok dengan karakteristik kepribadian Anda.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {futureRoles.map((role, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2.5 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/80 border border-indigo-800/80 px-2.5 py-0.5 rounded-full">
                          {role.field}
                        </span>
                        <span className="text-xs font-extrabold text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 px-2.5 py-0.5 rounded-full">
                          {role.growthTag}
                        </span>
                      </div>

                      <h3 className="font-bold text-base sm:text-lg text-white">{role.title}</h3>
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed">{role.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-700/60 flex items-center gap-2 flex-wrap">
                      <span className="text-xs sm:text-sm font-bold text-indigo-300 shrink-0">
                        {language === 'es' ? 'Habilidades Clave:' : language === 'en' ? 'Key Skills:' : 'Keahlian Kunci:'}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {role.keySkills.map((sk, skIdx) => (
                          <span key={skIdx} className="text-xs font-mono font-semibold bg-slate-900 text-slate-200 px-2 py-0.5 rounded border border-slate-700">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })()}

        {/* Section 2: 5 Domain Cards Breakdown */}
        <section className="space-y-6">
          <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
            {language === 'es'
              ? 'Interpretación Detallada de Dominios'
              : language === 'en'
              ? 'Detailed Domain Trait Interpretations'
              : 'Interpretasi Detail 5 Domain Utama'}
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {domainKeys.map((key) => {
              const dom = result.domains[key];
              const meta = DOMAIN_METADATA[key];
              const domName = getDomainName(key, language);
              const domTagline = getDomainTagline(key, language);
              const domDesc = getDomainDescription(key, language);
              const levelLabel = getScoreLevelLabel(dom.level, language);

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
                          {domName}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {domTagline}
                        </p>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                        {dom.totalScore} <span className="text-xs text-slate-400 font-normal">/ 120</span>
                      </div>
                      <span
                        className={`inline-block px-2.5 py-1 rounded text-xs font-semibold ${
                          dom.level === 'High'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                            : dom.level === 'Low'
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {levelLabel} {language === 'es' ? 'Nivel' : language === 'en' ? 'Score' : 'Skor'}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-200 pt-1 border-t border-slate-100 dark:border-slate-800">
                    {domDesc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Ad Placement 2: Before 30 Facets Breakdown */}
        <AdSenseSlot slot="2002" className="my-6" />

        {/* Section 3: 30 Facets Breakdown */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                {language === 'es'
                  ? 'Desglose de 30 Subfacetas'
                  : language === 'en'
                  ? '30 Facet Breakdown'
                  : 'Rincian 30 Sub-Faset Kepribadian'}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {language === 'es'
                  ? 'Cada faceta se evalúa en una escala de 4 a 20 basada en 4 ítems.'
                  : language === 'en'
                  ? 'Each facet is scored on a 4–20 scale based on 4 keyed items.'
                  : 'Setiap faset diukur pada skala 4–20 berdasarkan 4 item kunci.'}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs sm:text-sm font-medium">
              <button
                onClick={() => setSelectedDomainTab('ALL')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  selectedDomainTab === 'ALL'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {language === 'es' ? 'Todos 30' : language === 'en' ? 'All 30' : 'Semua 30'}
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
        <section className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm sm:text-base space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span>
              {language === 'es'
                ? 'Resumen de Metodología y Citas'
                : language === 'en'
                ? 'Methodology & Citation Summary'
                : 'Ringkasan Metodologi & Sitasi'}
            </span>
          </div>

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {language === 'es'
              ? 'Este informe fue generado utilizando el motor de puntuación puro en TypeScript de IPIP-NEO-120. Las respuestas ponderadas (+/-) se mapean automáticamente a escalas invertidas, produciendo 30 puntuaciones de facetas (rango 4-20) y 5 totales de dominio (rango 24-120).'
              : language === 'en'
              ? 'This report was generated using the pure TypeScript scoring engine of IPIP-NEO-120. Item keyed responses (+/-) are mapped automatically to reverse scales, yielding 30 facet scores (range 4-20) and 5 domain totals (range 24-120).'
              : 'Laporan ini dihitung menggunakan scoring engine murni IPIP-NEO-120. Item berskor terbalik (+/-) dikonversi secara otomatis untuk menghasilkan 30 skor faset (skala 4-20) dan 5 total domain (skala 24-120).'}
          </p>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 font-mono text-xs sm:text-sm text-slate-500">
            Citation: Johnson, J. A. (2014). Journal of Research in Personality, 51, 78–89.
          </div>
        </section>
      </div>

      {/* Retest CTA Card */}
      <div className="p-6 rounded-2xl bg-indigo-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-base sm:text-lg">
            {language === 'es'
              ? 'Participar en la Sesión de Test-Retest'
              : language === 'en'
              ? 'Participate in Test-Retest Study'
              : 'Ikuti Sesi Test-Retest Ulang'}
          </h3>
          <p className="text-sm text-indigo-100">
            {language === 'es'
              ? '¿Deseas probar la estabilidad de tus rasgos después de 2 semanas o 1 mes?'
              : language === 'en'
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
          <span>
            {language === 'es'
              ? 'Iniciar Sesión Retest'
              : language === 'en'
              ? 'Start Retest Session'
              : 'Mulai Sesi Retest'}
          </span>
        </button>
      </div>

      {/* Off-screen High-Legibility PDF Template Container */}
      <div style={{ position: 'absolute', left: '-9999px', top: '0', pointerEvents: 'none' }}>
        <div ref={pdfTemplateRef}>
          <PdfReportTemplate result={result} language={language} />
        </div>
      </div>
    </div>
  );
};
