import { DomainKey, DomainScore, FacetScore, TestResult, Demographics } from '../types';
import { IPIP_120_ITEMS, DOMAIN_METADATA, FACETS_METADATA } from '../data/ipip-neo-120';

/**
 * Validates whether all 120 items have valid answer values (1-5).
 */
export function validateAnswers(answers: Record<number, number>): { valid: boolean; missingItemIds: number[] } {
  const missingItemIds: number[] = [];
  for (let i = 1; i <= 120; i++) {
    const val = answers[i];
    if (typeof val !== 'number' || val < 1 || val > 5) {
      missingItemIds.push(i);
    }
  }
  return {
    valid: missingItemIds.length === 0,
    missingItemIds,
  };
}

/**
 * Categorizes a score level (Low, Average, High) based on Johnson (2014) norm distributions.
 * For facets (4-20): <11 Low, 11-15 Average, >15 High
 * For domains (24-120): <60 Low, 60-84 Average, >84 High
 */
export function getScoreLevel(score: number, type: 'facet' | 'domain'): 'Low' | 'Average' | 'High' {
  if (type === 'facet') {
    if (score <= 10) return 'Low';
    if (score <= 15) return 'Average';
    return 'High';
  } else {
    if (score <= 59) return 'Low';
    if (score <= 84) return 'Average';
    return 'High';
  }
}

/**
 * Pure scoring function for IPIP-NEO-120.
 * Calculates 5 domains and 30 facets with reverse scoring.
 */
export function scoreIPIP(answers: Record<number, number>): Record<DomainKey, DomainScore> {
  // Initialize facet scores
  const facetTotals: Record<string, number> = {};
  Object.keys(FACETS_METADATA).forEach((facetKey) => {
    facetTotals[facetKey] = 0;
  });

  // Calculate each item's keyed contribution
  IPIP_120_ITEMS.forEach((item) => {
    const rawVal = answers[item.id] || 3; // Default to neutral if somehow missing
    const keyedVal = item.keyed === '+' ? rawVal : 6 - rawVal;
    if (facetTotals[item.facet] !== undefined) {
      facetTotals[item.facet] += keyedVal;
    }
  });

  // Build facet scores object and domain totals
  const domainTotals: Record<DomainKey, number> = { N: 0, E: 0, O: 0, A: 0, C: 0 };
  const domainFacetsMap: Record<DomainKey, Record<string, FacetScore>> = {
    N: {}, E: {}, O: {}, A: {}, C: {}
  };

  Object.entries(FACETS_METADATA).forEach(([facetKey, meta]) => {
    const totalScore = facetTotals[facetKey] || 4; // Min 4
    const meanScore = Number((totalScore / 4).toFixed(2));
    const level = getScoreLevel(totalScore, 'facet');
    const desc = level === 'High' ? meta.highDescEn : meta.lowDescEn;

    const facetScore: FacetScore = {
      facetKey,
      name: meta.nameEn,
      domainKey: meta.domain,
      score: totalScore,
      meanScore,
      level,
      description: desc,
    };

    domainFacetsMap[meta.domain][facetKey] = facetScore;
    domainTotals[meta.domain] += totalScore;
  });

  // Build domain scores
  const domainKeys: DomainKey[] = ['N', 'E', 'O', 'A', 'C'];
  const results = {} as Record<DomainKey, DomainScore>;

  domainKeys.forEach((key) => {
    const totalScore = domainTotals[key]; // Range 24 - 120
    const meanScore = Number((totalScore / 24).toFixed(2)); // Range 1.0 - 5.0
    const level = getScoreLevel(totalScore, 'domain');
    const meta = DOMAIN_METADATA[key];

    results[key] = {
      key,
      name: meta.nameEn,
      totalScore,
      meanScore,
      level,
      description: meta.descriptionEn,
      facets: domainFacetsMap[key],
    };
  });

  return results;
}

/**
 * Creates a full TestResult object with UUID and timestamp.
 */
export function buildTestResult(
  id: string,
  answers: Record<number, number>,
  demographics: Demographics
): TestResult {
  const domains = scoreIPIP(answers);
  return {
    id,
    createdAt: new Date().toISOString(),
    demographics,
    answers,
    domains,
    isRetest: demographics.isRetest,
    retestOf: demographics.retestOfId,
  };
}
