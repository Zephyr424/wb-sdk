class Scheduler {
  static schedule(word, quality) {
    const now = new Date();
    if (quality < 3) {
      word.repetitions = 0;
      word.interval = 1;
    } else {
      if (word.repetitions === 0) {
        word.interval = 1;
      } else if (word.repetitions === 1) {
        word.interval = 6;
      } else {
        word.interval = Math.round(word.interval * word.easeFactor);
      }
      word.repetitions += 1;
      let ease = word.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      ease = Math.min(2.5, Math.max(1.3, ease));
      word.easeFactor = ease;
    }
    word.lastReviewed = now;
    return word;
  }
}

module.exports = Scheduler;
