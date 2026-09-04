const WordManager = require('./wordManager');
const ReviewManager = require('./reviewManager');
const StatsManager = require('./statsManager');
const PresetManager = require('./presetManager');
const IOManager = require('./ioManager');
const SyncManager = require('./syncManager');
const AnalyzeManager = require('./analyzeManager');
const ConfigManager = require('./configManager');

class WordBank {
  constructor(initialWords = []) {
    this.words = {};
    this.word = new WordManager(this);
    this.review = new ReviewManager(this);
    this.stats = new StatsManager(this);
    this.preset = new PresetManager(this);
    this.io = new IOManager(this);
    this.sync = new SyncManager(this);
    this.analyze = new AnalyzeManager(this);
    this.config = new ConfigManager(this);

    if (initialWords && initialWords.length) {
      initialWords.forEach(w => this.word.add(w));
    }
  }

  // 为了方便，保留 loadPreset 作为快捷方式
  loadPreset(name) {
    this.preset.load(name);
  }
}

module.exports = WordBank;