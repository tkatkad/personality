import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { DomainScore, DomainKey } from '../types';
import { DOMAIN_METADATA, getDomainName, getShortDomainName, getScoreLevelLabel } from '../data/ipip-neo-120';
import { useTestStore } from '../stores/testStore';

interface RadarChartProps {
  domains: Record<DomainKey, DomainScore>;
}

export const RadarChartComponent: React.FC<RadarChartProps> = ({ domains }) => {
  const { language, theme } = useTestStore();

  const data = (['N', 'E', 'O', 'A', 'C'] as DomainKey[]).map((key) => {
    const d = domains[key];
    const shortName = getShortDomainName(key, language);
    const fullName = getDomainName(key, language);
    return {
      domainKey: key,
      subject: `${key} - ${shortName}`,
      fullSubject: fullName,
      score: d.totalScore, // 24-120
      meanScore: d.meanScore, // 1-5
      level: d.level,
      levelLabel: getScoreLevelLabel(d.level, language),
      fullMark: 120,
    };
  });

  const isDark = theme === 'dark';

  return (
    <div className="w-full h-80 sm:h-96 relative px-1 py-2">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="58%" margin={{ top: 10, right: 15, bottom: 10, left: 15 }} data={data}>
          <PolarGrid stroke={isDark ? '#334155' : '#e2e8f0'} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: isDark ? '#cbd5e1' : '#334155',
              fontSize: 11,
              fontWeight: 700,
            }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[20, 120]}
            tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 10 }}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.45}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload;
                return (
                  <div className="bg-slate-900 text-white dark:bg-slate-800 p-3 rounded-xl shadow-xl text-xs space-y-1 border border-slate-700">
                    <p className="font-bold text-sm text-indigo-300">{item.fullSubject}</p>
                    <p>
                      <span className="text-slate-400">{language === 'en' ? 'Raw Total:' : language === 'es' ? 'Total Bruto:' : 'Skor Total:'}</span>{' '}
                      <span className="font-mono font-bold text-emerald-400">{item.score} / 120</span>
                    </p>
                    <p>
                      <span className="text-slate-400">{language === 'en' ? 'Mean Scale (1-5):' : language === 'es' ? 'Escala Media (1-5):' : 'Skala Rata-rata (1-5):'}</span>{' '}
                      <span className="font-mono font-bold text-amber-300">{item.meanScore}</span>
                    </p>
                    <p>
                      <span className="text-slate-400">{language === 'en' ? 'Categorization:' : language === 'es' ? 'Categoría:' : 'Kategori:'}</span>{' '}
                      <span className="font-semibold text-white">{item.levelLabel}</span>
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
