const WordManager = require('./wordManager');
const ReviewManager = require('./reviewManager');
const fs = require('fs');
const path = require('path');

class WordBank {
  constructor(initialWords = []) {
    this.words = {};
    this.word = new WordManager(this);
    this.review = new ReviewManager(this);

    if (initialWords && initialWords.length) {
      initialWords.forEach(w => this.word.add(w));
    }
  }

  loadPreset(name) {
    const presets = {
      demo: [
        { id: '1', word: 'apple', definition: 'a fruit' },
        { id: '2', word: 'book', definition: 'a set of pages' },
        { id: '3', word: 'cat', definition: 'a small animal' }
      ]
    };

    // 加载 top5000 高频词
    if (name === 'top5000') {
      const dataPath = path.join(__dirname, '../data/top5000.json');
      try {
        const rawData = fs.readFileSync(dataPath, 'utf8');
        const words = JSON.parse(rawData);
        words.forEach(w => this.word.add(w));
        console.log(`✅ 已加载 ${words.length} 个高频词`);
        return;
      } catch (err) {
        console.error('❌ 加载 top5000 词库失败:', err.message);
        return;
      }
    }

    const words = presets[name];
    if (!words) throw new Error(`Preset ${name} not found`);
    words.forEach(w => this.word.add(w));
  }
}

module.exports = WordBank;