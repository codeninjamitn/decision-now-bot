import type { Category, TimeOfDay } from "./recommendations";

export interface HistoryEntry {
  id: string;
  category: Category;
  itemTitle: string;
  timeOfDay: TimeOfDay;
  timestamp: number;
  feedback: "no-regret" | "regret" | null;
  regretNote?: string;
  friendId?: string;
  friendName?: string;
}

const STORAGE_KEY = "zr-history";

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveHistory(history: HistoryEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function addHistoryEntry(entry: Omit<HistoryEntry, "id" | "timestamp">): HistoryEntry {
  const history = loadHistory();
  const full: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  history.unshift(full);
  saveHistory(history);
  return full;
}

export function updateHistoryFeedback(id: string, feedback: "no-regret" | "regret", regretNote?: string) {
  const history = loadHistory();
  const entry = history.find(h => h.id === id);
  if (entry) {
    entry.feedback = feedback;
    if (regretNote) entry.regretNote = regretNote;
    saveHistory(history);
  }
}

export function getStats() {
  const history = loadHistory();
  const total = history.length;
  const byCategory = { watch: 0, eat: 0, read: 0, listen: 0 };
  const regretByCategory = { watch: 0, eat: 0, read: 0, listen: 0 };
  const noRegretByCategory = { watch: 0, eat: 0, read: 0, listen: 0 };
  const byTimeAndCategory: Record<string, Record<string, number>> = {
    morning: { watch: 0, eat: 0, read: 0, listen: 0 },
    afternoon: { watch: 0, eat: 0, read: 0, listen: 0 },
    evening: { watch: 0, eat: 0, read: 0, listen: 0 },
    night: { watch: 0, eat: 0, read: 0, listen: 0 },
  };

  history.forEach(h => {
    byCategory[h.category]++;
    if (h.feedback === "regret") regretByCategory[h.category]++;
    if (h.feedback === "no-regret") noRegretByCategory[h.category]++;
    byTimeAndCategory[h.timeOfDay][h.category]++;
  });

  return { total, byCategory, regretByCategory, noRegretByCategory, byTimeAndCategory, history };
}
