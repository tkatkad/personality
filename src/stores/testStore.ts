import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Demographics, TestResult } from '../types';
import { generateUUID } from '../lib/utils';
import { buildTestResult, validateAnswers } from '../lib/scoring';

interface TestState {
  // Test Session Identifiers & Preferences
  uuid: string;
  theme: 'dark' | 'light';
  language: 'en' | 'id';
  pageSize: number; // 1 for mobile, 3-5 for desktop

  // User Demographics & Session State
  demographics: Demographics;
  answers: Record<number, number>;
  currentQuestionIndex: number;
  isCompleted: boolean;
  currentResult: TestResult | null;
  savedResults: Record<string, TestResult>;
  lastSavedAt: string | null;

  // Actions
  setTheme: (theme: 'dark' | 'light') => void;
  toggleDarkMode: () => void;
  setLanguage: (lang: 'en' | 'id') => void;
  setPageSize: (size: number) => void;
  setDemographics: (demographics: Partial<Demographics>) => void;
  setAnswer: (itemId: number, value: number) => void;
  setBulkAnswers: (answers: Record<number, number>) => void;
  setCurrentQuestionIndex: (idx: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  saveForLater: () => void;
  resetTest: (keepDemographics?: boolean) => void;
  startRetest: (originalResultId: string) => void;
  completeTest: () => Promise<TestResult | null>;
  loadResult: (result: TestResult) => void;
  saveResultLocally: (result: TestResult) => void;
}

const DEFAULT_DEMOGRAPHICS: Demographics = {
  age: undefined,
  gender: '',
  consent: true,
  isRetest: false,
  retestOfId: '',
  language: 'en',
};

export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      uuid: generateUUID(),
      theme: 'light',
      language: 'en',
      pageSize: 1, // Default mobile-first 1 item per view

      demographics: DEFAULT_DEMOGRAPHICS,
      answers: {},
      currentQuestionIndex: 0,
      isCompleted: false,
      currentResult: null,
      savedResults: {},
      lastSavedAt: null,

      setTheme: (theme) => {
        set({ theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      toggleDarkMode: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark';
        get().setTheme(next);
      },

      setLanguage: (language) => {
        set({ language });
        set((state) => ({
          demographics: { ...state.demographics, language },
        }));
      },

      setPageSize: (pageSize) => set({ pageSize }),

      setDemographics: (demographics) =>
        set((state) => ({
          demographics: { ...state.demographics, ...demographics },
        })),

      setAnswer: (itemId, value) => {
        set((state) => {
          const newAnswers = { ...state.answers, [itemId]: value };
          return {
            answers: newAnswers,
            lastSavedAt: new Date().toISOString(),
          };
        });
      },

      setBulkAnswers: (answers) =>
        set({ answers, lastSavedAt: new Date().toISOString() }),

      setCurrentQuestionIndex: (currentQuestionIndex) =>
        set({ currentQuestionIndex: Math.max(0, Math.min(119, currentQuestionIndex)) }),

      nextQuestion: () => {
        const { currentQuestionIndex, pageSize } = get();
        const nextIdx = Math.min(119, currentQuestionIndex + pageSize);
        set({ currentQuestionIndex: nextIdx });
      },

      prevQuestion: () => {
        const { currentQuestionIndex, pageSize } = get();
        const prevIdx = Math.max(0, currentQuestionIndex - pageSize);
        set({ currentQuestionIndex: prevIdx });
      },

      saveForLater: () => {
        set({ lastSavedAt: new Date().toISOString() });
      },

      resetTest: (keepDemographics = false) => {
        const newUUID = generateUUID();
        set((state) => ({
          uuid: newUUID,
          answers: {},
          currentQuestionIndex: 0,
          isCompleted: false,
          currentResult: null,
          lastSavedAt: null,
          demographics: keepDemographics
            ? { ...state.demographics, isRetest: false, retestOfId: '' }
            : DEFAULT_DEMOGRAPHICS,
        }));
      },

      startRetest: (originalResultId) => {
        const newUUID = generateUUID();
        set((state) => ({
          uuid: newUUID,
          answers: {},
          currentQuestionIndex: 0,
          isCompleted: false,
          currentResult: null,
          demographics: {
            ...state.demographics,
            isRetest: true,
            retestOfId: originalResultId,
          },
        }));
      },

      completeTest: async () => {
        const { uuid, answers, demographics, saveResultLocally } = get();
        const validation = validateAnswers(answers);

        if (!validation.valid) {
          console.warn('Cannot complete test, missing answers:', validation.missingItemIds);
          return null;
        }

        const result = buildTestResult(uuid, answers, demographics);
        set({ isCompleted: true, currentResult: result });
        saveResultLocally(result);

        // Try syncing to API endpoint / D1 Worker if consent given
        try {
          await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: result.id,
              age: demographics.age,
              gender: demographics.gender,
              consent: demographics.consent ? 1 : 0,
              answers: Object.values(answers), // Array of 120 numbers
              scores: result.domains,
              is_retest: demographics.isRetest ? 1 : 0,
              retest_of: demographics.retestOfId,
            }),
          });
        } catch (err) {
          console.log('Worker API sync offline or mock mode, saved locally:', err);
        }

        return result;
      },

      loadResult: (result) => set({ currentResult: result, isCompleted: true }),

      saveResultLocally: (result) =>
        set((state) => ({
          savedResults: { ...state.savedResults, [result.id]: result },
        })),
    }),
    {
      name: 'ipip_neo_120_session_state',
      partialize: (state) => ({
        uuid: state.uuid,
        theme: state.theme,
        language: state.language,
        pageSize: state.pageSize,
        demographics: state.demographics,
        answers: state.answers,
        currentQuestionIndex: state.currentQuestionIndex,
        isCompleted: state.isCompleted,
        currentResult: state.currentResult,
        savedResults: state.savedResults,
        lastSavedAt: state.lastSavedAt,
      }),
    }
  )
);
