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
  // 新增接口
interface StatsManager {
  total(): number;
  mastered(): number;
  learning(): number;
  new(): number;
  retentionRate(): number;
  weakest(n: number): Word[];
}

interface PresetManager {
  list(): string[];
  load(name: string, merge?: boolean): void;
  addPreset(name: string, wordArray: WordData[]): void;
}

interface IOManager {
  exportJSON(): string;
  exportCSV(): string;
  importJSON(jsonStr: string): void;
  importCSV(csvStr: string): void;
  exportAnki(): string;
  saveToFile(filePath: string): void;
  loadFromFile(filePath: string): void;
}

interface SyncManager {
  save(): void;
  load(): void;
  reset(): void;
  getPath(): string;
}

interface AnalyzeManager {
  difficulty(wordId: string): number | null;
  mistakes(): Word[];
  prediction(): number;
  hotWords(n: number): Word[];
}

interface ConfigManager {
  get(key: string): any;
  set(key: string, value: any): void;
  reset(): void;
  getAll(): Record<string, any>;
}

// 扩展 WordBank 接口
interface WordBank {
  stats: StatsManager;
  preset: PresetManager;
  io: IOManager;
  sync: SyncManager;
  analyze: AnalyzeManager;
  config: ConfigManager;
}

  export const WordBank: new (initialWords?: WordData[]) => WordBank;
}
