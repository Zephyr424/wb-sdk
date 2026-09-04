// wb.config
const fs = require('fs');
const path = require('path');

class ConfigManager {
  constructor(parent) {
    this.parent = parent;
    this.defaults = {
      dailyLimit: 20,
      algorithm: 'SM-2'
    };
    this.config = { ...this.defaults };
    // 尝试加载配置文件
    this.configPath = path.join(process.cwd(), 'wb-config.json');
    if (fs.existsSync(this.configPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
        this.config = { ...this.defaults, ...data };
      } catch (e) {}
    }
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    this.config[key] = value;
    // 保存到文件
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2), 'utf8');
  }

  reset() {
    this.config = { ...this.defaults };
    if (fs.existsSync(this.configPath)) {
      fs.unlinkSync(this.configPath);
    }
  }

  getAll() {
    return { ...this.config };
  }
}

module.exports = ConfigManager;