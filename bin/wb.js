const { program } = require('commander');
const { WordBank } = require('../index');
const fs = require('fs');
const path = require('path');

program
  .name('wb')
  .description('📚 wb-sdk CLI — 间隔重复背单词工具')
  .version('0.2.0');

// ---------- learn 命令 ----------
program
  .command('learn')
  .description('开始今天的学习')
  .option('-n, --limit <number>', '限制复习单词数量', 10)
  .action((options) => {
    const wb = new WordBank();
    wb.loadPreset('top5000');

    const due = wb.review.getDue().slice(0, parseInt(options.limit));
    if (due.length === 0) {
      console.log('🎉 今天没有需要复习的单词！');
      return;
    }

    console.log(`📚 今天有 ${due.length} 个单词需要复习：\n`);
    due.forEach((word, i) => {
      console.log(`  ${i + 1}. ${word.word}`);
      console.log(`     释义: ${word.definition}`);
      console.log(`     难度系数: ${word.easeFactor.toFixed(2)}`);
      console.log(`     复习间隔: ${word.interval} 天`);
      console.log('');
    });
  });

// ---------- stats 命令 ----------
program
  .command('stats')
  .description('查看学习进度统计')
  .action(() => {
    const wb = new WordBank();
    wb.loadPreset('top5000');
    const stats = wb.review.progress();

    console.log('📊 学习进度统计:');
    console.log(`  总词数: ${stats.total}`);
    console.log(`  已掌握（间隔≥30天）: ${stats.mastered}`);
    console.log(`  剩余: ${stats.remaining}`);
    console.log(`  预计全部掌握: ${stats.daysToMaster} 天`);
  });

// ---------- remind 命令（艾宾浩斯提醒） ----------
program
  .command('remind')
  .description('🔔 查看今天应复习的单词数量（艾宾浩斯提醒）')
  .option('-d, --detail', '显示详细单词列表')
  .action((options) => {
    const wb = new WordBank();
    wb.loadPreset('top5000');
    const due = wb.review.getDue();
    const today = new Date().toISOString().slice(0, 10);

    if (due.length === 0) {
      console.log(`📅 ${today} 没有需要复习的单词，继续保持！🎉`);
      return;
    }

    console.log(`📅 ${today} 艾宾浩斯复习提醒：`);
    console.log(`   今天有 ${due.length} 个单词需要复习`);

    if (options.detail) {
      console.log('\n📖 详细列表：');
      due.forEach((word, i) => {
        const last = word.lastReviewed ? new Date(word.lastReviewed).toISOString().slice(0, 10) : '从未';
        console.log(`   ${i + 1}. ${word.word}（上次复习: ${last}）`);
      });
    }

    console.log('\n💡 运行 `wb learn` 开始复习');
  });

program.parse();
