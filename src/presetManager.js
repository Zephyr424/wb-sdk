// wb.preset
const fs = require('fs');
const path = require('path');

class PresetManager {
  constructor(parent) {
    this.parent = parent;
    // 内置词库定义（仅演示，实际可扩展）
    this.availablePresets = {
      demo: [
        { id: 'demo1', word: 'apple', definition: 'a fruit' },
        { id: 'demo2', word: 'book', definition: 'a set of pages' },
        { id: 'demo3', word: 'cat', definition: 'a small animal' }
      ]
    };
  }

  // 列出所有可用词库
  list() {
    return Object.keys(this.availablePresets);
  }

  // 加载指定词库（合并到当前词库中）
  load(name, merge = true) {
    const words = this.availablePresets[name];
    if (!words) {
      // 尝试从 data/ 目录加载自定义词库
      const dataPath = path.join(__dirname, '../data', `${name}.json`);
      if (fs.existsSync(dataPath)) {
        const raw = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(raw);
        data.forEach(w => this.parent.word.add(w));
        return;
      }
      throw new Error(`词库 "${name}" 不存在`);
    }
    if (merge) {
      words.forEach(w => this.parent.word.add(w));
    } else {
      // 不合并则清空再加载
      this.parent.words = {};
      words.forEach(w => this.parent.word.add(w));
    }
  }

  // 添加自定义词库（用于扩展）
  addPreset(name, wordArray) {
    this.availablePresets[name] = wordArray;
  }
}

module.exports = PresetManager;