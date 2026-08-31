const Scheduler = require('./scheduler');

class ReviewManager {
  constructor(parent) {
    this.parent = parent;
  }

  getDue(today = new Date()) {
    return this.parent.word.list().filter(w => w.isDue(today));
  }

  submit(id, quality) {
    const word = this.parent.word.get(id);
    if (!word) throw new Error(`Word with id ${id} not found`);
    return Scheduler.schedule(word, quality);
  }

  forecast(days = 7, from = new Date()) {
    const forecast = {};
    for (let i = 1; i <= days; i++) {
      const d = new Date(from);
      d.setDate(d.getDate() + i);
      const due = this.parent.word.list().filter(w => w.isDue(d)).length;
      forecast[d.toISOString().slice(0,10)] = due;
    }
    return forecast;
  }

  progress() {
    const words = this.parent.word.list();
    const total = words.length;
    const mastered = words.filter(w => w.interval >= 30).length;
    const remaining = total - mastered;
    const daysToMaster = Math.ceil(remaining / 5);
    return { total, mastered, remaining, daysToMaster };
  }
}

module.exports = ReviewManager;
