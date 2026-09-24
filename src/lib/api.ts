import { TestResult } from '../types';
import { useTestStore } from '../stores/testStore';
import { decodeResultFromUrlParam } from './utils';

export async function fetchResultById(id: string): Promise<TestResult | null> {
  const store = useTestStore.getState();

  // 1. First check local Zustand store saved results
  if (store.savedResults[id]) {
    return store.savedResults[id];
  }
  if (store.currentResult?.id === id) {
    return store.currentResult;
  }

  // 2. Check URL query string for self-contained encoded data (?res=...)
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const resParam = params.get('res');
    if (resParam) {
      const decoded = decodeResultFromUrlParam(resParam);
      if (decoded && (decoded.id === id || id === 'latest')) {
        store.saveResultLocally(decoded);
        return decoded;
      }
    }
  }

  // 3. Fallback try server endpoint if available
  try {
    const res = await fetch(`/api/result/${id}`);
    if (res.ok) {
      const data = await res.json();
      store.saveResultLocally(data);
      return data;
    }
  } catch (err) {
    console.warn('API fetch offline, using URL fallback:', err);
  }

  return null;
}
