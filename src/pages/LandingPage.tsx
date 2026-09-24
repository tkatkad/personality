import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  FileText,
  Copy,
  Check,
  HelpCircle,
  Briefcase,
  UserCheck,
  Compass,
  Globe,
} from 'lucide-react';
import { useTestStore } from '../stores/testStore';
import { DOMAIN_METADATA, getDomainName, getDomainTagline, getShortDomainName } from '../data/ipip-neo-120';
import { DomainKey } from '../types';
import { SEO } from '../components/SEO';

export const LandingPage: React.FC = () => {
  const { language, setLanguage } = useTestStore();
  const [activeSample, setActiveSample] = useState<'profile1' | 'profile2'>('profile1');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const domainKeys: DomainKey[] = ['N', 'E', 'O', 'A', 'C'];

  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name:
        language === 'es'
          ? 'Test de Personalidad Gratis IPIP-NEO-120'
          : language === 'en'
          ? 'IPIP-NEO-120 Free Personality Test'
          : 'Tes Kepribadian Ilmiah 120 Soal IPIP-NEO-120',
      url: 'https://personality-test.job.web.id/',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      inLanguage: ['es', 'en', 'id'],
      description:
        language === 'es'
          ? 'Prueba científica de personalidad de 120 preguntas basada en IPIP-NEO Johnson (2014) para medir Neuroticismo, Extraversión, Apertura, Amabilidad y Responsabilidad.'
          : language === 'en'
          ? 'Scientific 120-item IPIP-NEO personality test based on Johnson (2014) Big Five model measuring Neuroticism, Extraversion, Openness, Agreeableness, and Conscientiousness.'
          : 'Tes Kepribadian Ilmiah 120 Soal IPIP-NEO berbasis model Big Five Johnson (2014) untuk mengukur Neuroticism, Extraversion, Openness, Agreeableness, dan Conscientiousness.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      author: {
        '@type': 'Person',
        name: 'Dr. John A. Johnson',
        sameAs: 'https://doi.org/10.1016/j.jrp.2014.05.003',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name:
            language === 'es'
              ? '¿Qué es el Test de Personalidad IPIP-NEO-120?'
              : language === 'en'
              ? 'What is the IPIP-NEO-120 Personality Test?'
              : 'Apa itu Tes Kepribadian IPIP-NEO-120?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              language === 'es'
                ? 'El IPIP-NEO-120 es un instrumento psicométrico científico de 120 ítems desarrollado por el Dr. John A. Johnson (2014) para medir con precisión los 5 dominios principales de la personalidad (Big Five/OCEAN) y 30 subfacetas.'
                : language === 'en'
                ? 'The IPIP-NEO-120 is a scientific 120-item psychometric instrument developed by Dr. John A. Johnson (2014) to measure the 5 major personality domains (Big Five/OCEAN) and 30 sub-facets.'
                : 'IPIP-NEO-120 adalah instrumen psikometri ilmiah 120 item yang dikembangkan oleh Dr. John A. Johnson (2014) untuk mengukur 5 domain utama kepribadian (Big Five/OCEAN) dan 30 sub-faset kepribadian secara akurat.',
          },
        },
        {
          '@type': 'Question',
          name:
            language === 'es'
              ? '¿Cuánto tiempo lleva completar la prueba?'
              : language === 'en'
              ? 'How long does it take to complete the test?'
              : 'Berapa lama waktu yang dibutuhkan untuk menyelesaikan tes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              language === 'es'
                ? 'Responder a las 120 preguntas en escala Likert toma aproximadamente de 10 a 15 minutos.'
                : language === 'en'
                ? 'Completing the 120 Likert-scale items typically takes about 10 to 15 minutes.'
                : 'Pengisian 120 pertanyaan skala Likert biasanya membutuhkan waktu sekitar 10 hingga 15 menit.',
          },
        },
        {
          '@type': 'Question',
          name:
            language === 'es'
              ? '¿Es gratuito este test de personalidad IPIP-NEO-120?'
              : language === 'en'
              ? 'Is this IPIP-NEO-120 personality test free?'
              : 'Apakah tes kepribadian IPIP-NEO-120 ini gratis?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              language === 'es'
                ? 'Sí, esta prueba es 100% gratuita, sin registro obligatorio, y proporciona un informe de análisis psicométrico instantáneo descargable en PDF.'
                : language === 'en'
                ? 'Yes, this test is 100% free, requires no sign-up, and provides an instant psychometric analysis report downloadable as PDF.'
                : 'Ya, tes ini 100% gratis, tanpa pendaftaran wajib, dan memberikan laporan analisis psikometri instan yang dapat diunduh dalam format PDF.',
          },
        },
      ],
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
      ],
    },
  ];

  return (
    <div className="space-y-16 py-8">
      <SEO
        title={
          language === 'es'
            ? 'Test de Personalidad Gratis IPIP-NEO-120 – Evaluación Psicométrica Big Five'
            : language === 'en'
            ? 'IPIP-NEO-120 Free Personality Test – Big Five Psychometric Assessment'
            : 'Tes Kepribadian Ilmiah 120 Soal IPIP-NEO-120 – Evaluasi Psikometri Big Five'
        }
        description={
          language === 'es'
            ? 'Prueba científica de personalidad de 120 preguntas basada en IPIP-NEO Johnson (2014). Mide 5 dominios y 30 subfacetas gratis.'
            : language === 'en'
            ? 'Scientific 120-item personality test based on Johnson (2014) IPIP-NEO. Measure 5 core domains and 30 facets for free.'
            : 'Tes Kepribadian Ilmiah 120 Soal berbasis IPIP-NEO Johnson (2014). Ukur 5 domain utama (Big Five) dan 30 sub-faset kepribadian secara gratis dan transparan.'
        }
        path="/"
        jsonLd={jsonLdData}
      />
      {/* Hero Banner Section tailored for Job Seekers */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white p-8 sm:p-12 md:p-16 shadow-xl border border-indigo-900/50">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl space-y-6 relative z-10">
          {/* Header Row: Badge */}
          <div className="flex items-center justify-between gap-3">
            {/* Friendly Job Seeker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {language === 'es'
                  ? 'Autoevaluación de Carrera para Solicitantes de Empleo'
                  : language === 'en'
                  ? 'Job Seeker Self-Assessment'
                  : 'Self-Assessment Karir Pencari Kerja Online'}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {language === 'es'
              ? 'Descubre tus fortalezas y tu estilo de trabajo ideal'
              : language === 'en'
              ? 'Discover Your Core Strengths & Ideal Work Style'
              : 'Kenali Potensi Kepribadian & Kekuatan Karir Terbaikmu'}
          </h1>

          {/* Description stating explicit reasons */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
            {language === 'es'
              ? 'A través del mapeo psicométrico validado de 5 dominios y 30 sub-facetas Big Five (IPIP-NEO-120), esta evaluación proporciona datos objetivos sobre tus tendencias conductuales. Un perfil preciso te permite estructurar tu estilo de trabajo, elegir palabras clave para tu CV y responder entrevistas con confianza.'
              : language === 'en'
              ? 'Through psychometrically validated mapping of 5 major domains and 30 Big Five sub-facets (IPIP-NEO-120), this assessment provides objective data on your behavioral tendencies. Precise profiling empowers you to articulate your primary working style, select impactful strength keywords for your CV profile, and deliver confident, authentic answers during recruiter interviews.'
              : 'Melalui pemetaan 5 domain utama dan 30 faset kepribadian Big Five (IPIP-NEO-120) yang tervalidasi secara psikometri, tes ini memberikan analisis obyektif tentang kecenderungan perilakumu. Hasil skor yang presisi mempermudahmu mengidentifikasi gaya kerja dominan, memilih kata kunci karakter yang tepat untuk deskripsi CV profesional, serta menyusun jawaban wawancara HRD yang otentik dan percaya diri.'}
          </p>

          {/* Primary Action & Friendly CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              to="/consent"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-[0.99]"
            >
              <span>
                {language === 'es'
                  ? 'Iniciar Test Gratis (10–15 Mins)'
                  : language === 'en'
                  ? 'Start Free Career Test (10–15 Mins)'
                  : 'Mulai Tes Karir Sekarang (10–15 Menit)'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/retest"
              className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium text-xs transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>
                {language === 'es'
                  ? 'Código de Retest'
                  : language === 'en'
                  ? 'Retest Code Login'
                  : 'Masuk Kode Retest'}
              </span>
            </Link>
          </div>

          {/* Key Trust Signals */}
          <div className="pt-4 flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs text-slate-300 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {language === 'es'
                  ? 'Sin Respuestas Correctas o Incorrectas'
                  : language === 'en'
                  ? 'No Right or Wrong Answers'
                  : 'Tidak Ada Jawaban Salah / Benar'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {language === 'es'
                  ? '100% Gratis y Sin Registro'
                  : language === 'en'
                  ? '100% Free & No Signup'
                  : '100% Gratis & Tanpa Perlu Login'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                {language === 'es'
                  ? 'Informe de Carrera en PDF Inmediato'
                  : language === 'en'
                  ? 'Instant Career PDF Report'
                  : 'Laporan Karir & PDF Instan'}
              </span>
            </div>
          </div>

          {/* Hero Bottom Language Switcher Row */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {language === 'es'
                  ? 'Seleccionar idioma de la evaluación:'
                  : language === 'en'
                  ? 'Select assessment language:'
                  : 'Pilihan bahasa pengerjaan tes:'}
              </span>
            </div>
            <div className="inline-flex flex-wrap items-center p-1 rounded-2xl bg-slate-800/90 border border-indigo-400/40 shadow-lg backdrop-blur-md gap-1">
              <button
                onClick={() => setLanguage('id')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 ${
                  language === 'id'
                    ? 'bg-indigo-500 text-white shadow-md ring-2 ring-indigo-300'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                <span className="hidden sm:inline">🇮🇩</span>
                <span>ID</span>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 ${
                  language === 'en'
                    ? 'bg-indigo-500 text-white shadow-md ring-2 ring-indigo-300'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                <span className="hidden sm:inline">🇬🇧</span>
                <span>EN</span>
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1 ${
                  language === 'es'
                    ? 'bg-indigo-500 text-white shadow-md ring-2 ring-indigo-300'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                <span className="hidden sm:inline">🇪🇸</span>
                <span className="sm:hidden">ES</span>
                <span className="hidden sm:inline">Español</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars for Job Seekers */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {language === 'es'
                ? 'Diseñado para Solicitantes de Empleo'
                : language === 'en'
                ? 'Made for Job Seekers'
                : 'Manfaat Langsung Untuk Pencari Kerja'}
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {language === 'es'
              ? '¿Cómo impulsa esta evaluación tu búsqueda de empleo?'
              : language === 'en'
              ? 'How This Assessment Helps Your Job Search'
              : 'Bagaimana Tes Ini Membantu Karir & Lamaran Kerjamu?'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {language === 'es'
              ? 'Obtén información objetiva para destacar en tu CV, preparar entrevistas de RRHH y ganar confianza laboral.'
              : language === 'en'
              ? 'Get clear, non-judgmental insights to level up your CV, interview preparation, and workplace confidence.'
              : 'Dapatkan gambaran obyektif tanpa stigma untuk meningkatkan kualitas CV, persiapan interview, dan kepercayaan diri saat melamar kerja.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
              🎯
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {language === 'es'
                ? '1. Refuerza tu Perfil de CV'
                : language === 'en'
                ? '1. Strengthen Your CV Profile'
                : '1. Menonjolkan Kekuatan di CV'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'es'
                ? 'Identifica tus rasgos de personalidad clave (p. ej. orientada a los detalles, alta adaptabilidad) para redactar un resumen profesional auténtico.'
                : language === 'en'
                ? 'Identify your top personality traits (e.g., Detail-Oriented, High Adaptability) to craft an authentic professional summary.'
                : 'Temukan karakter menonjolmu (seperti ketelitian, daya adaptasi, atau kepemimpinan) untuk ditulis di deskripsi profil CV.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
              💬
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {language === 'es'
                ? '2. Preparación para Entrevistas'
                : language === 'en'
                ? '2. HR Interview Preparation'
                : '2. Siap Pertanyaan Interview'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'es'
                ? 'Aprende a describir tu estilo de trabajo y enfoque de resolución de problemas con soltura ante reclutadores.'
                : language === 'en'
                ? 'Learn how to describe your working style and problem-solving approach clearly when interviewed by recruiters.'
                : 'Bisa menjelaskan kelebihan dan gaya komunikasimu dengan jawaban yang matang saat ditanya oleh HRD/Perekrut.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-amber-300 dark:hover:border-amber-800 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
              🏢
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {language === 'es'
                ? '3. Cultura de Trabajo Ideal'
                : language === 'en'
                ? '3. Ideal Work Culture Fit'
                : '3. Menemukan Budaya Kerja Cocok'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'es'
                ? 'Descubre si rindes mejor en startups ágiles, corporaciones estructuradas o entornos colaborativos.'
                : language === 'en'
                ? 'Understand whether you thrive best in fast-paced startups, structured corporate roles, or collaborative team setups.'
                : 'Ketahui apakah kamu lebih produktif di lingkungan startup cepat, perusahaan terstruktur, atau tim kerja remote.'}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-purple-300 dark:hover:border-purple-800 transition-all">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-lg">
              📈
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {language === 'es'
                ? '4. Plan de Desarrollo Personal'
                : language === 'en'
                ? '4. Personal Growth Plan'
                : '4. Rencana Pengembangan Diri'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'es'
                ? 'Anticipa pequeñas áreas de mejora para fortalecer tu resiliencia y hábitos profesionales.'
                : language === 'en'
                ? 'Discover minor blind spots in advance so you can build stress resilience and professional habits early on.'
                : 'Pahami area yang perlu terus dikembangkan secara bijak agar makin siap menghadapi tantangan karir dunia kerja.'}
            </p>
          </div>
        </div>
      </section>

      {/* Scientific Foundation Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
              {language === 'es'
                ? 'Fundamento Científico y Ciencia Abierta'
                : language === 'en'
                ? 'Scientific Grounding & Open Science'
                : 'Landasan Ilmiah & Open Science'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              International Personality Item Pool (IPIP) · Johnson (2014)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              {language === 'es'
                ? '¿Qué es el IPIP-NEO-120?'
                : language === 'en'
                ? 'What is the IPIP-NEO-120?'
                : 'Apa itu IPIP-NEO-120?'}
            </h3>
            <p>
              {language === 'es'
                ? 'El IPIP-NEO-120 es un cuestionario de dominio público de 120 ítems desarrollado por el Dr. John A. Johnson (Universidad Estatal de Pensilvania) para medir las 30 facetas del Modelo de los Cinco Factores (FFM) de la personalidad. Ofrece una fidelidad estructural idéntica a los inventarios comerciales de 240 ítems reduciendo el tiempo de realización en un 50%.'
                : language === 'en'
                ? 'The IPIP-NEO-120 is a 120-item public domain questionnaire designed by Dr. John A. Johnson (Penn State University) to measure the 30 facets of the Five-Factor Model (FFM) of personality. It provides identical structural fidelity to commercial 240-item inventories while reducing completion time by 50%.'
                : 'IPIP-NEO-120 adalah kuesioner domain publik 120-item yang dikembangkan oleh Dr. John A. Johnson (Penn State University) untuk mengukur 30 faset dari Five-Factor Model (FFM) kepribadian. Instrumen ini menyajikan akurasi struktur setara kuesioner komersial 240-item dengan efisiensi waktu 50% lebih cepat.'}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              {language === 'es'
                ? 'Validez y Confiabilidad Psicométrica'
                : language === 'en'
                ? 'Psychometric Reliability'
                : 'Validitas & Reliabilitas Psikometrik'}
            </h3>
            <p>
              {language === 'es'
                ? 'Validado en grandes muestras de investigación (N > 300,000 participantes en línea y muestras comunitarias de Eugene-Springfield), el inventario demuestra una alta consistencia interna (α promedio por faceta ≈ 0.68–0.75) y alta validez convergente con el NEO PI-R.'
                : language === 'en'
                ? 'Validated across massive sample sizes (N > 300,000 online participants and community samples), the inventory demonstrates strong internal consistency (mean facet α ≈ 0.68–0.75) and high convergent validity with the NEO PI-R.'
                : 'Divalidasi pada sampel penelitian besar (N > 300.000 responden online dan sampel komunitas Eugene-Springfield), instrumen ini terbukti memiliki konsistensi internal yang tinggi (rata-rata α faset ≈ 0.68–0.75) serta validitas konvergen tinggi terhadap NEO PI-R.'}
            </p>
          </div>
        </div>

        {/* Paper Citation Block */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-2">
          <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center justify-between">
            <span>
              {language === 'es'
                ? 'Cita de Literatura Primaria:'
                : language === 'en'
                ? 'Primary Literature Citation:'
                : 'Cita de Literatura Primaria / Referensi Utama:'}
            </span>
            <div className="flex gap-2">
              <a
                href="https://ipip.ori.org/30FacetNEO-PI-RItems.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
              >
                ipip.ori.org <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <p className="font-mono text-slate-700 dark:text-slate-300">
            Johnson, J. A. (2014). Measuring thirty facets of the Five Factor Model with a 120-item public domain inventory: Development of the IPIP-NEO-120. <span className="underline">Journal of Research in Personality</span>, 51, 78–89. https://doi.org/10.1016/j.jrp.2014.05.003
          </p>
        </div>
      </section>

      {/* The Big Five Domains & 30 Facets Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {language === 'es'
              ? 'Los 5 Dominios Big Five y 30 Facetas'
              : language === 'en'
              ? 'The 5 Big Five Domains & 30 Facets'
              : '5 Domain Big Five & 30 Faset Kepribadian'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {language === 'es'
              ? 'Cada dominio se evalúa a través de 6 sub-facetas (4 ítems por faceta = 24 ítems por dominio).'
              : language === 'en'
              ? 'Every domain is evaluated through 6 sub-facets (4 items per facet = 24 items per domain).'
              : 'Setiap domain dievaluasi melalui 6 sub-faset (4 item per faset = 24 item per domain).'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domainKeys.map((key) => {
            const meta = DOMAIN_METADATA[key];
            return (
              <div
                key={key}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-white shadow-sm"
                    style={{ backgroundColor: meta.color }}
                  >
                    {key}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                      {getDomainName(key, language)}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {getDomainTagline(key, language)}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {language === 'es' ? '6 Sub-facetas:' : language === 'en' ? '6 Sub-Facets:' : '6 Sub-Faset:'}
                  </span>{' '}
                  {key === 'N' && (language === 'es' ? 'Ansiedad, Ira, Depresión, Timidez, Inmoderación, Vulnerabilidad' : 'Anxiety, Anger, Depression, Self-Consciousness, Immoderation, Vulnerability')}
                  {key === 'E' && (language === 'es' ? 'Amabilidad, Gregarismo, Asertividad, Actividad, Búsqueda de Emoción, Alegría' : 'Friendliness, Gregariousness, Assertiveness, Activity, Excitement, Cheerfulness')}
                  {key === 'O' && (language === 'es' ? 'Imaginación, Interés Artístico, Emocionalidad, Aventura, Intelecto, Liberalismo' : 'Imagination, Artistic Interests, Emotionality, Adventurousness, Intellect, Liberalism')}
                  {key === 'A' && (language === 'es' ? 'Confianza, Moralidad, Altruismo, Cooperación, Modestia, Empatía' : 'Trust, Morality, Altruism, Cooperation, Modesty, Sympathy')}
                  {key === 'C' && (language === 'es' ? 'Autoeficacia, Orden, Deber, Logro, Disciplina, Cautela' : 'Self-Efficacy, Orderliness, Dutifulness, Achievement, Discipline, Cautiousness')}
                </div>
              </div>
            );
          })}

          {/* Card 6: Test-Retest Protocol */}
          <div className="p-6 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-bold text-base">
                <RotateCcw className="w-5 h-5" />
                <span>
                  {language === 'es'
                    ? 'Estudio de Confiabilidad Test-Retest'
                    : language === 'en'
                    ? 'Test-Retest Research'
                    : 'Studi Reliabilitas Retest'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'es'
                  ? '¿Has realizado esta evaluación anteriormente? Ingresa tu código de resultado anterior para participar en nuestro estudio de estabilidad temporal.'
                  : language === 'en'
                  ? 'Have you previously completed this assessment? Participate in our test-retest study to help evaluate temporal stability across sessions.'
                  : 'Pernah mengerjakan tes ini sebelumnya? Masukkan ID hasil lama Anda untuk mengikuti studi reliabilitas ketahanan waktu (test-retest).'}
              </p>
            </div>
            <Link
              to="/retest"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors"
            >
              <span>
                {language === 'es'
                  ? 'Ingresar a Protocolo Retest'
                  : language === 'en'
                  ? 'Enter Retest Protocol'
                  : 'Masuk Protokol Retest'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Test Result Showcase Section for Job Seekers */}
      <section className="space-y-6 pt-4">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>
              {language === 'es'
                ? 'Muestra del Informe Psicométrico en Vivo'
                : language === 'en'
                ? 'Live Sample Assessment Report'
                : 'Contoh Nyata Hasil Laporan Psikometri'}
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {language === 'es'
              ? 'Vista Previa: Cómo tu Informe Acelera tu Búsqueda de Empleo'
              : language === 'en'
              ? 'Preview How Your Report Accelerates Your Job Hunt'
              : 'Gambaran Hasil Tes Yang Akan Anda Dapatkan'}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {language === 'es'
              ? 'A continuación se muestra un ejemplo real de cómo tus puntuaciones Big Five se traducen en un resumen para tu CV, respuestas para entrevistas de RRHH y un análisis de estilo de trabajo.'
              : language === 'en'
              ? 'Below is a real preview of how your Big Five scores translate directly into CV summary text, HR interview answers, and work style insights.'
              : 'Berikut contoh konkret bagaimana skor 120 soal Anda langsung diterjemahkan menjadi teks deskripsi CV, panduan wawancara HRD, dan analisis gaya kerja.'}
          </p>
        </div>

        {/* Profile Selector Tabs */}
        <div className="flex justify-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl max-w-md mx-auto">
          <button
            onClick={() => setActiveSample('profile1')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
              activeSample === 'profile1'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {language === 'es'
              ? 'Perfil A: Detallista y Analítico'
              : language === 'en'
              ? 'Profile A: Detail & Analytical'
              : 'Profil A: Terstruktur & Analitis'}
          </button>
          <button
            onClick={() => setActiveSample('profile2')}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
              activeSample === 'profile2'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {language === 'es'
              ? 'Perfil B: Colaborativo y Comunicativo'
              : language === 'en'
              ? 'Profile B: Collaborative & Communicative'
              : 'Profil B: Komunikatif & Kolaboratif'}
          </button>
        </div>

        {/* Sample Report Details Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
          {/* Sample Profile Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {activeSample === 'profile1'
                  ? (language === 'es' ? 'Perfil de Muestra 01' : 'Sample Profile 01')
                  : (language === 'es' ? 'Perfil de Muestra 02' : 'Sample Profile 02')}
              </span>
              <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                {activeSample === 'profile1'
                  ? (language === 'es'
                      ? 'Alta Responsabilidad y Apertura (Organizado)'
                      : language === 'en'
                      ? 'High Conscientiousness & Openness'
                      : 'Tipe High Conscientiousness (Detail & Teratur)')
                  : (language === 'es'
                      ? 'Alta Extraversión y Amabilidad (Colaborativo)'
                      : language === 'en'
                      ? 'High Extraversion & Agreeableness'
                      : 'Tipe High Extraversion & Agreeableness (Kolaboratif)')}
              </h3>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-900">
                {language === 'es'
                  ? 'Precisión de Puntuación: Alta'
                  : language === 'en'
                  ? 'Score Accuracy: High'
                  : 'Validitas Skor: Tinggi'}
              </span>
            </div>
          </div>

          {/* Mini Domain Score Preview */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-4 text-center w-full max-w-full overflow-hidden">
            {domainKeys.map((key) => {
              const colorClass =
                key === 'N'
                  ? 'text-rose-500'
                  : key === 'E'
                  ? 'text-amber-500'
                  : key === 'O'
                  ? 'text-indigo-500'
                  : key === 'A'
                  ? 'text-emerald-500'
                  : 'text-cyan-500';

              const score =
                key === 'N'
                  ? activeSample === 'profile1' ? '42' : '38'
                  : key === 'E'
                  ? activeSample === 'profile1' ? '65' : '92'
                  : key === 'O'
                  ? activeSample === 'profile1' ? '88' : '80'
                  : key === 'A'
                  ? activeSample === 'profile1' ? '78' : '88'
                  : activeSample === 'profile1' ? '94' : '76';

              return (
                <div
                  key={key}
                  className="p-1.5 sm:p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 min-w-0 overflow-hidden space-y-0.5"
                >
                  <span className={`text-xs sm:text-sm font-extrabold block ${colorClass}`}>
                    {key}
                  </span>
                  <span
                    className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-300 font-semibold block truncate px-0.5"
                    title={getDomainName(key, language)}
                  >
                    {getShortDomainName(key, language)}
                  </span>
                  <span className="text-xs sm:text-base font-extrabold text-slate-800 dark:text-slate-100 block">
                    {score}
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-normal">/120</span>
                  </span>
                </div>
              );
            })}
          </div>

          {/* 3 Career Impact Demonstration Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Box 1: CV Summary Sample */}
            <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-700 dark:text-indigo-300 text-xs flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  <span>
                    1.{' '}
                    {language === 'es'
                      ? 'Texto de Resumen para CV'
                      : language === 'en'
                      ? 'CV Profile Summary Text'
                      : 'Teks Ringkasan Profil CV'}
                  </span>
                </span>
                <button
                  onClick={() =>
                    handleCopy(
                      activeSample === 'profile1'
                        ? language === 'es'
                          ? 'Profesional analítico y estructurado con alta puntuación en Responsabilidad (94/120). Orientado al detalle, gestión de proyectos con plazos rigurosos y altos estándares de calidad.'
                          : language === 'en'
                          ? 'Analytical and structured professional with high Conscientiousness (94/120). Proven track record in detailed task management, systematic scheduling, and delivering error-free output on deadline.'
                          : 'Profesional yang analitis dan terstruktur dengan skor Conscientiousness tinggi (94/120). Terbiasa bekerja dengan ketelitian tinggi, mengelola jadwal proyek secara teratur, dan memastikan kepatuhan pada standar kualitas tanpa mengorbankan kecepatan.'
                        : language === 'es'
                        ? 'Profesional dinámico y comunicativo con alta Extraversión (92/120) y Amabilidad (88/120). Hábil en trabajo en equipo, colaboración multifuncional y relaciones con clientes.'
                        : language === 'en'
                        ? 'Dynamic and communicative professional with high Extraversion (92/120) and Agreeableness (88/120). Skilled in stakeholder relationship building, cross-team collaboration, and maintaining high team morale.'
                        : 'Profesional dinamis dan komunikatif dengan skor Extraversion (92/120) dan Agreeableness (88/120). Memiliki keahlian interpersonal mumpuni dalam membangun hubungan dengan klien, memfasilitasi kerja sama lintas tim, dan menciptakan suasana kerja yang ramah.',
                      'cvText'
                    )
                  }
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border text-slate-600 dark:text-slate-300 hover:text-indigo-600 text-[11px] flex items-center gap-1"
                >
                  {copiedText === 'cvText' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>
                    {copiedText === 'cvText'
                      ? language === 'es' ? 'Copiado' : language === 'en' ? 'Copied' : 'Tersalin'
                      : language === 'es' ? 'Copiar' : language === 'en' ? 'Copy' : 'Salin Teks'}
                  </span>
                </button>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/40 italic">
                {activeSample === 'profile1'
                  ? (language === 'es'
                      ? '"Profesional analítico y estructurado con alta puntuación en Responsabilidad (94/120). Orientado al detalle, gestión de proyectos con plazos rigurosos y altos estándares de calidad."'
                      : language === 'en'
                      ? '"An analytical and structured professional with high Conscientiousness (94/120). Proven track record in detailed task management, systematic scheduling, and delivering error-free output on deadline."'
                      : '"Profesional yang analitis dan terstruktur dengan skor Conscientiousness tinggi (94/120). Terbiasa bekerja dengan ketelitian tinggi, mengelola jadwal proyek secara teratur, dan memastikan kepatuhan pada standar kualitas tanpa mengorbankan kecepatan."')
                  : (language === 'es'
                      ? '"Profesional dinámico y comunicativo con alta Extraversión (92/120) y Amabilidad (88/120). Hábil en trabajo en equipo, colaboración multifuncional y relaciones con clientes."'
                      : language === 'en'
                      ? '"A dynamic and communicative professional with high Extraversion (92/120) and Agreeableness (88/120). Skilled in stakeholder relationship building, cross-team collaboration, and maintaining high team morale."'
                      : '"Profesional dinamis dan komunikatif dengan skor Extraversion (92/120) dan Agreeableness (88/120). Memiliki keahlian interpersonal mumpuni dalam membangun hubungan dengan klien, memfasilitasi kerja sama lintas tim, dan menciptakan suasana kerja yang ramah."')}
              </p>
            </div>

            {/* Box 2: Interview Q&A Sample */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
              <span className="font-bold text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-1.5">
                <UserCheck className="w-4 h-4" />
                <span>
                  2.{' '}
                  {language === 'es'
                    ? 'Guía de Respuestas para Entrevistas de RRHH'
                    : language === 'en'
                    ? 'HR Interview Answering Guide'
                    : 'Panduan Jawaban Wawancara HRD'}
                </span>
              </span>
              <div className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/40 space-y-2">
                <p className="font-semibold text-emerald-800 dark:text-emerald-300">
                  {language === 'es'
                    ? 'Pregunta RRHH: "¿Cómo manejas los plazos ajustados?"'
                    : language === 'en'
                    ? 'Tanya HRD: "How do you handle tight deadlines?"'
                    : 'Tanya HRD: "Bagaimana Anda memastikan akurasi kerja di bawah tekanan deadline?"'}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  {activeSample === 'profile1'
                    ? (language === 'es'
                        ? '"Uso una matriz de prioridades harian y lista de verificación. Dado mi alto nivel de Responsabilidad, verifico los datos al inicio para evitar correcciones de último momento."'
                        : language === 'en'
                        ? '"I use a daily priority matrix and verification checklist. Because my personality profile shows high Conscientiousness, I verify data points early to eliminate rework late in the project."'
                        : '"Saya menggunakan matriks prioritas harian dan checklist verifikasi. Berdasarkan profil kepribadian saya yang berorientasi detail (Conscientiousness tinggi), saya mengecek data di awal sehingga mencegah revisi berulang di akhir."')
                    : (language === 'es'
                        ? '"Mantenimiento una comunicación directa y entusiasta con el equipo. Clarifico los requisitos temprano para coordinar las prioridades sin estrés."'
                        : language === 'en'
                        ? '"I maintain open, energetic communication with my team. I proactively clarify requirements early and align everyone on key priorities to meet the deadline smoothly."'
                        : '"Saya menjaga komunikasi terbuka dan energik dengan tim. Saya aktif menyelaraskan ekspektasi di awal dan mengoordinasikan pembagian tugas agar target tercapai secara efisien."')}
                </p>
              </div>
            </div>

            {/* Box 3: Work Style & Environment Sample */}
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-3">
              <span className="font-bold text-amber-700 dark:text-amber-300 text-xs flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>
                  3.{' '}
                  {language === 'es'
                    ? 'Cultura de Trabajo Ideal'
                    : language === 'en'
                    ? 'Ideal Workplace Culture'
                    : 'Analisis Gaya & Budaya Kerja'}
                </span>
              </span>
              <div className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-amber-100 dark:border-amber-900/40 space-y-2">
                <p>
                  <strong className="text-slate-900 dark:text-white">
                    {language === 'es' ? 'Estilo de Trabajo:' : language === 'en' ? 'Work Style:' : 'Gaya Kerja:'}
                  </strong>{' '}
                  {activeSample === 'profile1'
                    ? (language === 'es'
                        ? 'Metódico, organizado y centrado en ejecuciones de alta calidad.'
                        : language === 'en'
                        ? 'Methodical, organized, and focused on quality execution.'
                        : 'Metodis, terorganisir, dan berfokus pada eksekusi berkualiatas tinggi.')
                    : (language === 'es'
                        ? 'Interactivo, orientado al trabajo en equipo y adaptativo.'
                        : language === 'en'
                        ? 'Interactive, team-oriented, and client-centric.'
                        : 'Interaktif, berorientasi tim, dan mudah beradaptasi dengan klien.')}
                </p>
                <p>
                  <strong className="text-slate-900 dark:text-white">
                    {language === 'es' ? 'Cultura Ideal:' : language === 'en' ? 'Ideal Culture:' : 'Budaya Ideal:'}
                  </strong>{' '}
                  {activeSample === 'profile1'
                    ? (language === 'es'
                        ? 'Empresas con procesos claros, manuales de procedimientos explícitos y evaluación basada en méritos.'
                        : language === 'en'
                        ? 'Companies with clear workflows, explicit SOPs, and meritocratic feedback.'
                        : 'Lingkungan kerja terstruktur dengan SOP jelas dan penilaian berbasis kriteria objektif.')
                    : (language === 'es'
                        ? 'Startups colaborativas, agencias o equipos de atención directa a clientes.'
                        : language === 'en'
                        ? 'Collaborative startups, agencies, or client-facing team setups.'
                        : 'Lingkungan dinamis seperti startup kolaboratif, agensi, atau tim client-facing.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start Card */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-900 dark:bg-slate-900 text-white text-center space-y-5 shadow-lg border border-slate-800">
        <h2 className="font-display font-bold text-2xl sm:text-3xl">
          {language === 'es'
            ? '¿Listo para Comenzar tu Evaluación?'
            : language === 'en'
            ? 'Ready to Begin Your Assessment?'
            : 'Siap Memulai Tes Kepribadian Anda?'}
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          {language === 'es'
            ? 'La prueba toma aproximadamente 10–15 minutos. Las respuestas se guardan automáticamente para que puedas pausar y reanudar en cualquier momento.'
            : language === 'en'
            ? 'The test takes approximately 10–15 minutes. Answers auto-save continuously so you can pause and resume at any time.'
            : 'Tes ini membutuhkan waktu sekitar 10–15 menit. Jawaban tersimpan otomatis secara real-time sehingga Anda dapat menyimpan dan melanjutkan kapan saja.'}
        </p>
        <div>
          <Link
            to="/consent"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-sm transition-all shadow-lg active:scale-[0.99]"
          >
            <span>
              {language === 'es'
                ? 'Continuar a Consentimiento y Demografía'
                : language === 'en'
                ? 'Proceed to Consent & Demographics'
                : 'Lanjut ke Consent & Demografi'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};
