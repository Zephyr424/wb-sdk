// wb.io
const fs = require('fs');
const path = require('path');

class IOManager {
  constructor(parent) {
    this.parent = parent;
  }

  // 导出为 JSON 字符串
  exportJSON() {
    const words = this.parent.word.list();
    return JSON.stringify(words.map(w => w.toJSON()), null, 2);
  }

  // 导出为 CSV
  exportCSV() {
    const words = this.parent.word.list();
    if (words.length === 0) return '';
    const headers = ['id', 'word', 'definition', 'repetitions', 'interval', 'easeFactor', 'lastReviewed'];
    const rows = words.map(w => [
      w.id,
      w.word,
      w.definition,
      w.repetitions,
      w.interval,
      w.easeFactor,
      w.lastReviewed ? w.lastReviewed.toISOString() : ''
    ]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  // 从 JSON 字符串导入（追加）
  importJSON(jsonStr) {
    const data = JSON.parse(jsonStr);
    data.forEach(item => this.parent.word.add(item));
  }

  // 从 CSV 字符串导入（追加）
  importCSV(csvStr) {
    const lines = csvStr.trim().split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1).map(line => line.split(','));
    for (const row of rows) {
      const obj = {};
      headers.forEach((h, i) => {
        obj[h] = row[i];
        if (h === 'lastReviewed' && obj[h]) obj[h] = new Date(obj[h]);
        if (h === 'repetitions' || h === 'interval' || h === 'easeFactor') {
          obj[h] = parseFloat(obj[h]);
        }
      });
      this.parent.word.add(obj);
    }
  }

  // 导出为 Anki 牌组格式（简化，CSV 格式，可导入 Anki）
  exportAnki() {
    return this.exportCSV(); // 目前直接用 CSV
  }

  // 保存到文件（仅 Node.js）
  saveToFile(filePath) {
    fs.writeFileSync(filePath, this.exportJSON(), 'utf8');
  }

  // 从文件加载
  loadFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    this.importJSON(content);
  }
}

module.exports = IOManager;