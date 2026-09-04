// wb.sync
const fs = require('fs');
const path = require('path');

class SyncManager {
  constructor(parent, storagePath = null) {
    this.parent = parent;
    // 默认存储路径（可自定义）
    this.storagePath = storagePath || path.join(process.cwd(), 'wb-data.json');
  }

  // 保存当前状态到文件
  save() {
    const data = this.parent.word.list().map(w => w.toJSON());
    fs.writeFileSync(this.storagePath, JSON.stringify(data, null, 2), 'utf8');
  }

  // 从文件加载状态
  load() {
    if (!fs.existsSync(this.storagePath)) {
      throw new Error(`存储文件不存在: ${this.storagePath}`);
    }
    const content = fs.readFileSync(this.storagePath, 'utf8');
    const data = JSON.parse(content);
    // 清空当前词库
    this.parent.words = {};
    data.forEach(item => this.parent.word.add(item));
  }

  // 重置所有数据（清空词库）
  reset() {
    this.parent.words = {};
    if (fs.existsSync(this.storagePath)) {
      fs.unlinkSync(this.storagePath);
    }
  }

  // 获取存储路径
  getPath() {
    return this.storagePath;
  }
}

module.exports = SyncManager;