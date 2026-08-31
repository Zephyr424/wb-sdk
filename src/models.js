class Word {
  constructor({ id, word, definition, repetitions = 0, interval = 0, easeFactor = 2.5, lastReviewed = null }) {
    this.id = id;
    this.word = word;
    this.definition = definition;
    this.repetitions = repetitions;
    this.interval = interval;
    this.easeFactor = easeFactor;
    this.lastReviewed = lastReviewed ? new Date(lastReviewed) : null;
  }

  isDue(today = new Date()) {
    if (!this.lastReviewed) return true;
    const dueDate = new Date(this.lastReviewed);
    dueDate.setDate(dueDate.getDate() + this.interval);
    return today >= dueDate;
  }

  toJSON() {
    return {
      id: this.id,
      word: this.word,
      definition: this.definition,
      repetitions: this.repetitions,
      interval: this.interval,
      easeFactor: this.easeFactor,
      lastReviewed: this.lastReviewed ? this.lastReviewed.toISOString() : null
    };
  }
}

module.exports = Word;
