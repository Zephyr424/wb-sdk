const Word = require('./models');

class WordManager {
  constructor(parent) {
    this.parent = parent;
  }

  list() {
    return Object.values(this.parent.words);
  }

  get(id) {
    return this.parent.words[id] || null;
  }

  add(wordData) {
    const word = new Word(wordData);
    this.parent.words[word.id] = word;
    return word;
  }

  remove(id) {
    delete this.parent.words[id];
  }

  search(keyword) {
    const lower = keyword.toLowerCase();
    return this.list().filter(w =>
      w.word.toLowerCase().includes(lower) ||
      w.definition.toLowerCase().includes(lower)
    );
  }

  top(n) {
    return this.list().sort((a, b) => b.repetitions - a.repetitions).slice(0, n);
  }
}

module.exports = WordManager;
