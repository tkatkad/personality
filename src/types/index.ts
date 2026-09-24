export type DomainKey = 'N' | 'E' | 'O' | 'A' | 'C';

export interface FacetDefinition {
  id: string; // e.g., 'N1'
  domain: DomainKey;
  nameEn: string;
  nameId: string;
  descriptionEn: string;
  descriptionId: string;
  highDescEn: string;
  lowDescEn: string;
}

export interface Item {
  id: number; // 1 to 120
  textEn: string;
  textId: string;
  domain: DomainKey;
  facet: string; // e.g., 'N1'
  keyed: '+' | '-';
}

export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export interface Demographics {
  age?: number;
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say' | '';
  consent: boolean;
  isRetest: boolean;
  retestOfId?: string;
  language: 'en' | 'id';
}

export interface FacetScore {
  facetKey: string;
  name: string;
  domainKey: DomainKey;
  score: number; // 4 - 20
  meanScore: number; // 1 - 5
  level: 'Low' | 'Average' | 'High';
  description: string;
}

export interface DomainScore {
  key: DomainKey;
  name: string;
  totalScore: number; // 24 - 120
  meanScore: number; // 1 - 5
  level: 'Low' | 'Average' | 'High';
  description: string;
  facets: Record<string, FacetScore>;
}

export interface TestResult {
  id: string; // UUID
  createdAt: string;
  demographics: Demographics;
  answers: Record<number, number>; // itemId -> score 1..5
  domains: Record<DomainKey, DomainScore>;
  userAgent?: string;
  country?: string;
  isRetest?: boolean;
  retestOf?: string;
}

export interface RetestComparison {
  originalResult: TestResult;
  retestResult: TestResult;
  domainCorrelations: Record<DomainKey, { orig: number; retest: number; diff: number }>;
}
