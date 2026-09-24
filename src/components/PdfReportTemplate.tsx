import React from 'react';
import { TestResult, DomainKey } from '../types';
import {
  DOMAIN_METADATA,
  FACETS_METADATA,
  getDomainName,
  getDomainTagline,
  getDomainDescription,
  getScoreLevelLabel,
} from '../data/ipip-neo-120';
import { formatDate } from '../lib/utils';
import { getCareerDevelopmentGuides, getFutureCareerProjections } from '../lib/recommendations';
import { RadarChartComponent } from './RadarChartComponent';

interface PdfReportTemplateProps {
  result: TestResult;
  language: string;
}

export const PdfReportTemplate: React.FC<PdfReportTemplateProps> = ({ result, language }) => {
  const domainKeys: DomainKey[] = ['N', 'E', 'O', 'A', 'C'];

  const guides = getCareerDevelopmentGuides(result.domains, language);
  const futureRoles = getFutureCareerProjections(result.domains, language);

  // Top 2 domains sorted by highest score
  const sortedDomains = [...domainKeys].sort(
    (a, b) => result.domains[b].totalScore - result.domains[a].totalScore
  );
  const topDomain1 = sortedDomains[0];
  const topDomain2 = sortedDomains[1];
  const topName1 = getDomainName(topDomain1, language);
  const topName2 = getDomainName(topDomain2, language);

  return (
    <div
      id="pdf-report-template"
      className="w-[750px] bg-white text-slate-900 p-8 font-sans space-y-6 leading-relaxed"
      style={{ fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" }}
    >
      {/* PDF Header Lockup */}
      <div className="border-b-2 border-indigo-600 pb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex flex-col items-center justify-center font-black leading-none shrink-0 shadow-md">
            <span className="text-[13px] font-black tracking-tight leading-none">JOB</span>
            <span className="text-[9px] font-extrabold tracking-wider text-amber-300 leading-none mt-1">
              WEB
            </span>
          </div>
          <div>
            <h1 className="font-extrabold text-2xl text-slate-900 tracking-tight leading-none">
              Job.Web.ID <span className="text-indigo-600 font-bold text-lg">/ IPIP-NEO-120</span>
            </h1>
            <p className="text-xs text-slate-600 font-bold pt-1">
              {language === 'es'
                ? 'Informe Psicométrico de Evaluación de Personalidad'
                : language === 'en'
                ? 'Psychometric Personality Assessment Report'
                : 'Laporan Psikometrik Hasil Tes Kepribadian Big Five'}
            </p>
          </div>
        </div>

        <div className="text-right text-xs font-mono text-slate-600 space-y-1">
          <p className="font-bold text-indigo-900">ID: {result.id}</p>
          <p>{formatDate(result.createdAt, language)}</p>
          <p className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold border border-indigo-200">
            A4 Portrait · High Legibility
          </p>
        </div>
      </div>

      {/* Title & Overview Badge */}
      <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-indigo-900">
            {language === 'es'
              ? 'Resumen del Perfil de Personalidad'
              : language === 'en'
              ? 'Personality Profile Summary'
              : 'Ringkasan Profil Kepribadian Big Five'}
          </h2>
          <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            120 Item Assessment
          </span>
        </div>
        <p className="text-sm text-slate-700 font-medium">
          {language === 'es'
            ? 'Este informe presenta la distribución de los 5 dominios principales y 30 subfacetas de personalidad basados en el inventario internacional IPIP-NEO-120 (Johnson, 2014).'
            : language === 'en'
            ? 'This report displays your 5 main domain scores and 30 sub-facet trait breakdown based on the international IPIP-NEO-120 inventory (Johnson, 2014).'
            : 'Laporan ini menampilkan distribusi 5 domain utama dan 30 faset kepribadian berdasarkan inventoris internasional IPIP-NEO-120 (normasi Johnson, 2014).'}
        </p>
      </div>

      {/* Big Five Domain Summary Table & Radar Chart */}
      <div className="grid grid-cols-12 gap-5 items-center bg-white border-2 border-slate-200 rounded-2xl p-5">
        <div className="col-span-7 space-y-3">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2">
            {language === 'es'
              ? 'Puntuación por Dominio Principal'
              : language === 'en'
              ? 'Main Domain Scores'
              : 'Skor Total 5 Domain Utama'}
          </h3>
          <div className="space-y-2">
            {domainKeys.map((key) => {
              const dom = result.domains[key];
              const domName = getDomainName(key, language);
              const levelLabel = getScoreLevelLabel(dom.level, language);
              return (
                <div
                  key={key}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                      {key}
                    </span>
                    <span className="text-sm font-bold text-slate-800">{domName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-extrabold text-slate-900">
                      {dom.totalScore} / 120
                    </span>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-900 border border-indigo-300">
                      {levelLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Radar Chart Column */}
        <div className="col-span-5 flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-xl p-3 h-[280px]">
          <RadarChartComponent domains={result.domains} />
        </div>
      </div>

      {/* Career Strategy & Interview Tips Box - Large Font */}
      <div className="bg-indigo-950 text-white rounded-2xl p-6 space-y-4 border-2 border-indigo-900">
        <h2 className="text-xl font-extrabold text-amber-300 flex items-center gap-2">
          <span>🎯</span>
          <span>
            {language === 'es'
              ? 'Estrategia de Carrera y Entrevistas'
              : language === 'en'
              ? 'Career & Interview Strategy'
              : 'Rekomendasi Karir & Tips Wawancara HRD'}
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="bg-indigo-900/80 p-3.5 rounded-xl border border-indigo-800 space-y-1">
            <p className="font-bold text-indigo-200 text-base">
              1.{' '}
              {language === 'es'
                ? 'Fortalezas Clave para el CV'
                : language === 'en'
                ? 'Key Strengths for CV'
                : 'Kekuatan Utama Untuk Deskripsi CV'}
            </p>
            <p className="text-slate-200 text-sm leading-relaxed">
              {language === 'es'
                ? `Tu perfil destaca en ${topName1} (${result.domains[topDomain1].totalScore}/120) y ${topName2} (${result.domains[topDomain2].totalScore}/120). Destaca tu confiabilidad, precisión y trabajo en equipo en el perfil de tu CV.`
                : language === 'en'
                ? `Your top strengths are in ${topName1} (${result.domains[topDomain1].totalScore}/120) and ${topName2} (${result.domains[topDomain2].totalScore}/120). Highlight your reliability, attention to detail, and team collaboration in your CV.`
                : `Kekuatan terbesarmu ada di domain ${topName1} (${result.domains[topDomain1].totalScore}/120) & ${topName2} (${result.domains[topDomain2].totalScore}/120). Cantumkan ketelitian, keandalan, dan kemampuan kerja sama tim di ringkasan CV Anda.`}
            </p>
          </div>

          <div className="bg-indigo-900/80 p-3.5 rounded-xl border border-indigo-800 space-y-1">
            <p className="font-bold text-emerald-300 text-base">
              2.{' '}
              {language === 'es'
                ? 'Estrategia para Entrevistas'
                : language === 'en'
                ? 'HR Interview Answering Tip'
                : 'Tips Menjawab Wawancara Kerja'}
            </p>
            <p className="text-slate-200 text-sm leading-relaxed">
              {language === 'es'
                ? 'Al responder sobre tu estilo de trabajo, proporciona ejemplos concretos de organización, aprendizaje continuo y manejo constructive de la comunicación.'
                : language === 'en'
                ? 'When asked about working style, provide concrete examples of task prioritization, continuous learning, and supportive team communication.'
                : 'Berikan contoh konkret cara Anda mengatur prioritas tugas, menjaga komunikasi positif dengan tim, serta semangat belajar teknologi baru.'}
            </p>
          </div>

          <div className="bg-indigo-900/80 p-3.5 rounded-xl border border-indigo-800 space-y-1">
            <p className="font-bold text-amber-300 text-base">
              3.{' '}
              {language === 'es'
                ? 'Entorno de Trabajo Ideal'
                : language === 'en'
                ? 'Ideal Workplace Culture'
                : 'Lingkungan Kerja Terbaik'}
            </p>
            <p className="text-slate-200 text-sm leading-relaxed">
              {language === 'es'
                ? 'Prosperas en entornos estructurados con objetivos claros, colaboración respetuosa y oportunidades para tomar la iniciativa.'
                : language === 'en'
                ? 'You thrive best in environments with clear performance goals, collaborative team culture, and room for proactive initiative.'
                : 'Anda paling berkembang di perusahaan dengan target kerja jelas, budaya tim yang saling menghargai, serta kesempatan mengambil inisiatif.'}
            </p>
          </div>
        </div>
      </div>

      {/* Actionable Self-Development & Career Roadmap */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-extrabold text-slate-900 border-b-2 border-indigo-600 pb-2 flex items-center gap-2">
          <span>🚀</span>
          <span>
            {language === 'es'
              ? 'Hoja de Ruta de Desarrollo Personal y Profesional'
              : language === 'en'
              ? 'Personal & Career Development Roadmap'
              : 'Rencana Pengembangan Diri, Studi Lanjutan & Buku Rekomendasi'}
          </span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Box A: Further Studies & Certifications */}
          <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 space-y-2">
            <h3 className="font-extrabold text-sm text-indigo-900 flex items-center gap-1.5">
              <span>🎓</span>
              <span>
                {language === 'es'
                  ? 'Estudios Avanzados y Certificaciones'
                  : language === 'en'
                  ? 'Further Studies & Certifications'
                  : 'Rekomendasi Studi Lanjutan & Sertifikasi'}
              </span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-800 list-disc list-inside leading-relaxed font-medium">
              {guides.furtherStudies.map((study, idx) => (
                <li key={idx}>{study}</li>
              ))}
            </ul>
          </div>

          {/* Box B: Recommended Courses */}
          <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 space-y-2">
            <h3 className="font-extrabold text-sm text-indigo-900 flex items-center gap-1.5">
              <span>💻</span>
              <span>
                {language === 'es'
                  ? 'Cursos y Capacitación Recomendada'
                  : language === 'en'
                  ? 'Recommended Courses & Training'
                  : 'Kursus & Pelatihan Keahlian'}
              </span>
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-800 list-disc list-inside leading-relaxed font-medium">
              {guides.recommendedCourses.map((course, idx) => (
                <li key={idx}>{course}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Box C: Recommended Books */}
          <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 space-y-2">
            <h3 className="font-extrabold text-sm text-indigo-900 flex items-center gap-1.5">
              <span>📚</span>
              <span>
                {language === 'es'
                  ? 'Lecturas Clave Recomendadas'
                  : language === 'en'
                  ? 'Recommended Book Reading List'
                  : 'Daftar Buku Wajib Baca'}
              </span>
            </h3>
            <div className="space-y-2 text-xs text-slate-800">
              {guides.recommendedBooks.map((book, idx) => (
                <div key={idx} className="border-b border-slate-200 pb-1.5 last:border-none">
                  <p className="font-extrabold text-slate-900">
                    "{book.title}" <span className="font-normal text-slate-600">— {book.author}</span>
                  </p>
                  <p className="text-[11px] text-slate-600 italic mt-0.5">{book.reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Box D: Daily Practice Exercises */}
          <div className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 space-y-2">
            <h3 className="font-extrabold text-sm text-indigo-900 flex items-center gap-1.5">
              <span>🏋️‍♂️</span>
              <span>
                {language === 'es'
                  ? 'Ejercicios y Hábitos Diarios'
                  : language === 'en'
                  ? 'Daily Practice Exercises & Habits'
                  : 'Latihan Harian & Kebiasaan Praktis'}
              </span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-800 list-disc list-inside leading-relaxed font-medium">
              {guides.dailyExercises.map((exercise, idx) => (
                <li key={idx}>{exercise}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 10-Year Horizon Emerging Professions & Future Jobs */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-extrabold text-slate-900 border-b-2 border-indigo-600 pb-2 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>🔮</span>
            <span>
              {language === 'es'
                ? 'Proyección de Profesiones del Futuro (2026–2036)'
                : language === 'en'
                ? 'Future Emerging Professions & Roles (2026–2036)'
                : 'Proyeksi Profesi & Lapangan Kerja Masa Depan (10 Tahun Ke Depan)'}
            </span>
          </span>
          <span className="text-xs font-mono font-extrabold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
            2026–2036 Outlook
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {futureRoles.map((role, idx) => (
            <div key={idx} className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 mr-2">
                    {role.field}
                  </span>
                  <h3 className="inline font-extrabold text-base text-slate-900">{role.title}</h3>
                </div>
                <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                  {role.growthTag}
                </span>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">{role.description}</p>

              <div className="flex items-center gap-2 pt-1 border-t border-slate-200">
                <span className="text-[11px] font-bold text-slate-600">
                  {language === 'es' ? 'Habilidades Clave:' : language === 'en' ? 'Key Skills:' : 'Keahlian Utama:'}
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {role.keySkills.map((sk, skIdx) => (
                    <span key={skIdx} className="text-[10px] font-mono font-bold bg-white text-slate-800 px-2 py-0.5 rounded border border-slate-300">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Domain Interpretations */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-extrabold text-slate-900 border-b-2 border-indigo-600 pb-2">
          {language === 'es'
            ? 'Interpretación Detallada de Dominios'
            : language === 'en'
            ? 'Detailed Domain Interpretations'
            : 'Interpretasi Detail 5 Domain Utama'}
        </h2>

        <div className="space-y-4">
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
                className="p-4 rounded-xl border-2 border-slate-200 bg-slate-50 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl text-white flex items-center justify-center font-black text-lg shadow"
                      style={{ backgroundColor: meta.color }}
                    >
                      {key}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">{domName}</h3>
                      <p className="text-xs text-slate-600 font-semibold">{domTagline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-mono font-extrabold text-indigo-900 block">
                      {dom.totalScore} / 120
                    </span>
                    <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 border border-indigo-300">
                      {levelLabel}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-800 leading-relaxed pt-2 border-t border-slate-200">
                  {domDesc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 30 Sub-Facets Breakdown */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-extrabold text-slate-900 border-b-2 border-indigo-600 pb-2">
          {language === 'es'
            ? 'Desglose de 30 Subfacetas de Personalidad'
            : language === 'en'
            ? '30 Personality Sub-Facets Breakdown'
            : 'Rincian 30 Sub-Faset Kepribadian'}
        </h2>

        <div className="space-y-5">
          {domainKeys.map((domainKey) => {
            const domain = result.domains[domainKey];
            const facets = Object.values(domain.facets);
            const domName = getDomainName(domainKey, language);

            return (
              <div key={domainKey} className="border-2 border-slate-200 rounded-xl p-4 bg-white space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <h3 className="font-extrabold text-base text-indigo-900">
                    {domainKey} - {domName}
                  </h3>
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded">
                    Total Domain: {domain.totalScore} / 120
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {facets.map((facet) => {
                    const facetMeta = FACETS_METADATA[facet.facetKey];
                    const facetName =
                      language === 'en'
                        ? facetMeta.nameEn
                        : language === 'es'
                        ? facetMeta.nameEs || facetMeta.nameEn
                        : facetMeta.nameId;

                    const percent = Math.round(((facet.score - 4) / 16) * 100);

                    return (
                      <div
                        key={facet.facetKey}
                        className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold text-slate-900">
                            {facet.facetKey}: {facetName}
                          </span>
                          <span className="font-mono font-extrabold text-indigo-900">
                            {facet.score} / 20 ({getScoreLevelLabel(facet.level, language)})
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-indigo-600 h-2.5 rounded-full"
                            style={{ width: `${Math.max(8, percent)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PDF Footer */}
      <div className="border-t-2 border-slate-300 pt-4 text-center text-xs text-slate-600 space-y-1">
        <p className="font-bold text-slate-800">
          {language === 'es'
            ? 'Job.Web.ID — Evaluación Psicométrica y de Carrera IPIP-NEO-120'
            : language === 'en'
            ? 'Job.Web.ID — IPIP-NEO-120 Psychometric & Career Assessment'
            : 'Job.Web.ID — Portal Kerja Indonesia & Psychometric Career Assessment'}
        </p>
        <p className="font-mono text-[11px] text-indigo-700">
          https://personality-test.job.web.id/result/{result.id}
        </p>
        <p className="text-[10px] text-slate-500">
          {language === 'es'
            ? 'Formato de alta legibilidad optimizado para impresión clara en A4.'
            : language === 'en'
            ? 'High-legibility layout optimized for clear A4 printing.'
            : 'Format keterbacaan tinggi dioptimalkan untuk cetak jelas pada A4.'}
        </p>
      </div>
    </div>
  );
};
