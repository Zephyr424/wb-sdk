const { WordBank } = require('./index');

// 创建一个词库实例
const wb = new WordBank();

// 加载内置演示词库
wb.loadPreset('demo');

console.log('所有单词:', wb.word.list());

// 模拟复习
console.log('\n今天需要复习的单词:');
const due = wb.review.getDue();
due.forEach(w => console.log(`- ${w.word}: ${w.definition}`));

// 模拟提交复习反馈（假设对第一个词评价为4分）
if (due.length > 0) {
  const first = due[0];
  wb.review.submit(first.id, 4);
  console.log(`\n已提交复习: ${first.word} (质量4/5)`);
}

// 查看进度
console.log('\n学习进度:', wb.review.progress());

// 显示预测未来7天复习量
console.log('\n未来7天预测复习量:', wb.review.forecast(7));
