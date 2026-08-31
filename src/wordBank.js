const WordManager = require('./wordManager');
const ReviewManager = require('./reviewManager');

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
    const words = presets[name];
    if (!words) throw new Error(`Preset ${name} not found`);
    words.forEach(w => this.word.add(w));
  }
}

module.exports = WordBank;
