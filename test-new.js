const { WordBank } = require('./index');

const wb = new WordBank();
wb.preset.load('demo');

console.log('总词数:', wb.stats.total());
console.log('已掌握:', wb.stats.mastered());
console.log('最弱词:', wb.stats.weakest(2).map(w => w.word));

wb.io.saveToFile('./backup.json');
console.log('已备份');

// 测试 config
wb.config.set('dailyLimit', 30);
console.log('每日上限:', wb.config.get('dailyLimit'));

console.log('预测掌握时间:', wb.analyze.prediction(), '天');