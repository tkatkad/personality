import { TestResult } from '../types';
import { useTestStore } from '../stores/testStore';

export async function fetchResultById(id: string): Promise<TestResult | null> {
  // First check local Zustand store saved results
  const store = useTestStore.getState();
  if (store.savedResults[id]) {
    return store.savedResults[id];
  }
  if (store.currentResult?.id === id) {
    return store.currentResult;
  }

  // Next try Cloudflare Worker endpoint
  try {
    const res = await fetch(`/api/result/${id}`);
    if (res.ok) {
      const data = await res.json();
      store.saveResultLocally(data);
      return data;
    }
  } catch (err) {
    console.warn('API fetch offline, using local store:', err);
  }

  return null;
}
