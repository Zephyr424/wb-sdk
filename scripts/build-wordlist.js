const fs = require('fs');
const path = require('path');

const rawData = fs.readFileSync(path.join(__dirname, '../data/wordfreq-en-25000-log.json'), 'utf8');
const wordList = JSON.parse(rawData);

const top5000 = wordList.slice(0, 5000);

const vocab = top5000.map(([word, logFreq], index) => ({
  id: String(index + 1),
  word: word,
  frequency: Math.exp(logFreq),
  phonetic: null,
  definitions: [],
  repetitions: 0,
  interval: 0,
  easeFactor: 2.5,
  lastReviewed: null
}));

fs.writeFileSync(
  path.join(__dirname, '../data/top5000.json'),
  JSON.stringify(vocab, null, 2)
);

console.log(`✅ 已生成 ${vocab.length} 个高频词`);
