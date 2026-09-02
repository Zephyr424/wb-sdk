declare module '@zephyr424/wb-sdk' {
  interface WordData {
    id: string;
    word: string;
    definition: string;
    repetitions?: number;
    interval?: number;
    easeFactor?: number;
    lastReviewed?: string | null;
  }

  interface Word extends WordData {
    isDue(today?: Date): boolean;
    toJSON(): WordData;
  }

  interface ProgressStats {
    total: number;
    mastered: number;
    remaining: number;
    daysToMaster: number;
  }

  interface ReviewManager {
    getDue(today?: Date): Word[];
    submit(id: string, quality: number): Word;
    forecast(days?: number): Record<string, number>;
    progress(): ProgressStats;
  }

  interface WordManager {
    list(): Word[];
    get(id: string): Word | null;
    add(data: WordData): Word;
    remove(id: string): void;
    search(keyword: string): Word[];
    top(n: number): Word[];
  }

  interface WordBank {
    words: Record<string, Word>;
    word: WordManager;
    review: ReviewManager;
    loadPreset(name: string): void;
  }

  export const WordBank: new (initialWords?: WordData[]) => WordBank;
}
