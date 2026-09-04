// wb.stats
class StatsManager {
  constructor(parent) {
    this.parent = parent;
  }

  // 总词数
  total() {
    return this.parent.word.list().length;
  }

  // 已掌握（间隔 ≥ 30 天）
  mastered() {
    return this.parent.word.list().filter(w => w.interval >= 30).length;
  }

  // 学习中（间隔 1-29 天）
  learning() {
    return this.parent.word.list().filter(w => w.interval > 0 && w.interval < 30).length;
  }

  // 新词（从未复习）
  new() {
    return this.parent.word.list().filter(w => w.repetitions === 0).length;
  }

  // 回忆成功率（最近7天内提交的复习中，质量≥3的占比）
  retentionRate() {
    const words = this.parent.word.list();
    let total = 0;
    let success = 0;
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    for (const w of words) {
      if (w.lastReviewed && w.lastReviewed.getTime() >= sevenDaysAgo) {
        total++;
        // 我们无法直接获取历史质量，只能通过当前状态推测
        // 简化：认为 interval 增长的算成功，否则失败
        // 更好的方式：存储历史记录，这里暂时用 interval > 0 表示至少复习过一次
        if (w.interval > 0) success++;
      }
    }
    return total === 0 ? 0 : success / total;
  }

  // 最需要复习的 N 个词（按 interval 最小且已到期）
  weakest(n = 10) {
    const now = new Date();
    const due = this.parent.word.list().filter(w => w.isDue(now));
    due.sort((a, b) => a.interval - b.interval);
    return due.slice(0, n);
  }
}

module.exports = StatsManager;