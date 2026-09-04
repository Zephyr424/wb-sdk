// wb.analyze
class AnalyzeManager {
  constructor(parent) {
    this.parent = parent;
  }

  // 单词难度系数（基于 easeFactor，越高越难）
  difficulty(wordId) {
    const word = this.parent.word.get(wordId);
    if (!word) return null;
    return word.easeFactor;
  }

  // 常错的词（假设复习质量低于 3 则算错）
  // 注意：需要额外存储历史，这里我们通过 interval 和 repetitions 简单推断
  mistakes() {
    const words = this.parent.word.list();
    // 我们认为 interval 小且 repetitions 多的词可能容易错
    return words.filter(w => w.repetitions > 2 && w.interval < 5)
                .sort((a, b) => a.interval - b.interval)
                .slice(0, 10);
  }

  // 预测全部掌握所需天数（假设每天掌握 5 个新词）
  prediction() {
    const remaining = this.parent.word.list().filter(w => w.interval < 30).length;
    return Math.ceil(remaining / 5);
  }

  // 当前最需要复习的词（按间隔从小到大排列，且已到期）
  hotWords(n = 10) {
    const now = new Date();
    const due = this.parent.word.list().filter(w => w.isDue(now));
    due.sort((a, b) => a.interval - b.interval);
    return due.slice(0, n);
  }
}

module.exports = AnalyzeManager;