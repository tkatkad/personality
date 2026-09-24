import React from 'react';
import { DomainKey, DomainScore } from '../types';
import { DOMAIN_METADATA, FACETS_METADATA } from '../data/ipip-neo-120';
import { useTestStore } from '../stores/testStore';

interface FacetBarChartProps {
  domains: Record<DomainKey, DomainScore>;
  selectedDomain?: DomainKey | 'ALL';
}

export const FacetBarChart: React.FC<FacetBarChartProps> = ({ domains, selectedDomain = 'ALL' }) => {
  const { language } = useTestStore();

  const domainList: DomainKey[] =
    selectedDomain === 'ALL' ? ['N', 'E', 'O', 'A', 'C'] : [selectedDomain];

  return (
    <div className="space-y-8">
      {domainList.map((domainKey) => {
        const domain = domains[domainKey];
        const meta = DOMAIN_METADATA[domainKey];
        const facets = Object.values(domain.facets);

        return (
          <div
            key={domainKey}
            className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  {language === 'en' ? meta.nameEn : meta.nameId}
                </h3>
              </div>
              <div className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Total: {domain.totalScore} / 120 ({domain.level})
              </div>
            </div>

            {/* Facets Grid */}
            <div className="space-y-3.5 pt-1">
              {facets.map((facet) => {
                const facetMeta = FACETS_METADATA[facet.facetKey];
                const facetName = language === 'en' ? facetMeta.nameEn : facetMeta.nameId;
                // Range 4 to 20 -> percentage = ((score - 4) / 16) * 100
                const percent = Math.round(((facet.score - 4) / 16) * 100);

                return (
                  <div key={facet.facetKey} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-800 dark:text-slate-200">
                        <span className="font-mono text-slate-400 dark:text-slate-500 mr-1.5">
                          {facet.facetKey}
                        </span>
                        {facetName}
                      </span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-slate-500 dark:text-slate-400">
                          {facet.score} / 20
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            facet.level === 'High'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                              : facet.level === 'Low'
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {facet.level}
                        </span>
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500 ease-out rounded-full"
                        style={{
                          width: `${Math.max(5, percent)}%`,
                          backgroundColor: meta.color,
                        }}
                      />
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight pt-0.5">
                      {facet.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
