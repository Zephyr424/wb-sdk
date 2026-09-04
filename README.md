# wb-sdk

> A developer-friendly spaced repetition engine for vocabulary building

[![npm version](https://img.shields.io/npm/v/@zephyr424/wb-sdk.svg)](https://www.npmjs.com/package/@zephyr424/wb-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![GitHub Repo stars](https://img.shields.io/github/stars/Zephyr424/wb-sdk?style=social)

**wb-sdk** is a lightweight, plug-and-play spaced repetition engine designed for developers who want to integrate intelligent vocabulary review into their applications.

Stop reinventing the wheel — just `npm install wb-sdk` and start building.

---

## ✨ Features

- 🧠 **SM-2 Algorithm** — Industry-standard spaced repetition, proven to optimize memory retention
- 📚 **Built-in Word Management** — Add, search, remove, and organize words effortlessly
- 🔁 **Review Scheduling** — Automatically calculates what to review and when
- 📊 **Progress Tracking** — Get stats on mastered words, retention rate, and future review forecasts
- 🧩 **Minimal API** — Intuitive `wb.word` and `wb.review` interfaces
- 📦 **Zero Dependencies** — Lightweight and fast, no bloat
- 📊 **Data Statistics** — Total, mastered, learning, new words, retention rate, and weakest words
- 💾 **Import / Export** — JSON, CSV, and Anki-compatible formats
- ⚙️ **Configurable** — Daily limits, algorithm selection, and more
- 🔄 **Data Persistence** — Save and load your progress
- 🧠 **Smart Analysis** — Difficulty prediction, mistake tracking, and hot words

---

## 🚀 Installation

```bash
npm install @zephyr424/wb-sdk
```
### Or with Yarn:
```bash
yarn add @zephyr424/wb-sdk
```

---

## CLI Usage

Install globally:

```bash
npm install -g @zephyr424/wb-sdk
```
### Then:
```bash
wb learn          # Start today's review
wb stats          # View learning progress
wb remind         # Check how many words are due today
wb remind --detail # Show detailed list
```

---

## 🏃 Quick Start
```javascript
const { WordBank } = require('@zephyr424/wb-sdk');

// Create a new word bank
const wb = new WordBank();

// Add some words
wb.word.add({ id: '1', word: 'apple', definition: 'a fruit' });
wb.word.add({ id: '2', word: 'benevolent', definition: 'kind and generous' });
wb.word.add({ id: '3', word: 'ephemeral', definition: 'lasting for a short time' });

// See all words
console.log(wb.word.list());

// Get today's review queue
const due = wb.review.getDue();
console.log(`📚 ${due.length} words due for review today:`);
due.forEach(w => console.log(`  - ${w.word}: ${w.definition}`));

// Submit a review (quality: 0 = forgot, 5 = perfect recall)
wb.review.submit('1', 4);  // "apple" reviewed with quality 4/5

// Check your progress
console.log(wb.review.progress());
// { total: 3, mastered: 0, remaining: 3, daysToMaster: 1 }
```

---

## 📖 API Documentation

### `wb.word` — Word Management

| Method | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `list()` | — | `Word[]` | Returns all words in the bank |
| `get(id)` | `id: string` | `Word \| null` | Retrieves a word by ID, returns `null` if not found |
| `add(data)` | `data: WordData` | `Word` | Adds a new word to the bank |
| `remove(id)` | `id: string` | `void` | Deletes a word from the bank |
| `search(keyword)` | `keyword: string` | `Word[]` | Searches words by word or definition (case‑insensitive) |
| `top(n)` | `n: number` | `Word[]` | Returns the top `n` words with the most review repetitions |

**Usage Examples:**

```javascript
// List all words
wb.word.list();

// Get by ID
wb.word.get('apple');

// Add a new word
wb.word.add({ id: 'grok', word: 'grok', definition: 'to understand intuitively' });

// Remove by ID
wb.word.remove('grok');

// Search
wb.word.search('bene');  // Returns ["benevolent", "beneficial", ...]

// Top 10 most practiced
wb.word.top(10);
```
---

### `wb.review` — Review Scheduling

| Method | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `getDue([today])` | `today?: Date` | `Word[]` | Returns all words due for review today (or on a custom date) |
| `submit(id, quality)` | `id: string, quality: number` | `Word` | Records your review performance and updates SM‑2 state |
| `forecast([days])` | `days?: number` | `Object` | Predicts how many words will be due each day for the next N days |
| `progress()` | — | `Object` | Returns an overview of your learning progress |

**Usage Examples:**

```javascript
// Get today's review queue
const due = wb.review.getDue();
console.log(`📚 ${due.length} words due today`);

// Get due words on a specific date
const dueOnChristmas = wb.review.getDue(new Date('2026-12-25'));

// Submit a review with quality 4/5
const updated = wb.review.submit('apple', 4);
console.log(`Next review in ${updated.interval} days`);

// Forecast review load for the next 7 days
const forecast = wb.review.forecast(7);
console.log(forecast);
// { "2026-09-01": 5, "2026-09-02": 8, "2026-09-03": 3, ... }

// Get overall progress stats
const stats = wb.review.progress();
console.log(stats);
// { total: 5000, mastered: 1200, remaining: 3800, daysToMaster: 760 }
```
**`quality` — Review Quality Scale:**

| Score | Meaning |
| :--- | :--- |
| `5` | Perfect recall |
| `4` | Good recall, slight hesitation |
| `3` | Recalled with difficulty |
| `2` | Forgot, but recognized |
| `1` | Almost forgot |
| `0` | Completely forgot |

**`progress()` — Return Fields:**

| Field | Type | Description |
| :--- | :--- | :--- |
| `total` | `number` | Total words in the bank |
| `mastered` | `number` | Words with interval ≥ 30 days |
| `remaining` | `number` | Words not yet mastered |
| `daysToMaster` | `number` | Estimated days until all words are mastered |

### `wb.stats` — Data Statistics

The `wb.stats` module provides detailed analytics about your learning progress.

| Method | Returns | Description |
| :--- | :--- | :--- |
| `total()` | `number` | Total words in the bank |
| `mastered()` | `number` | Words with interval ≥ 30 days |
| `learning()` | `number` | Words with interval between 1 and 29 days |
| `new()` | `number` | Words never reviewed |
| `retentionRate()` | `number` | Success rate in the last 7 days (0–1) |
| `weakest(n)` | `Word[]` | The `n` words that need the most review |

**Usage Examples:**

```javascript
console.log(wb.stats.total());        // 5000
console.log(wb.stats.mastered());     // 1200
console.log(wb.stats.learning());     // 1800
console.log(wb.stats.new());          // 2000
console.log(wb.stats.retentionRate()); // 0.82

const weakest = wb.stats.weakest(10);
console.log('Words you struggle with:', weakest.map(w => w.word));
```

### `wb.preset` — Built-in Word Lists

The `wb.preset` module provides access to built-in word lists and allows you to add custom presets.

| Method | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `list()` | — | `string[]` | Lists all available presets |
| `load(name, merge?)` | `name: string, merge?: boolean` | `void` | Loads a preset (default: merge = true) |
| `addPreset(name, words)` | `name: string, words: WordData[]` | `void` | Adds a custom preset |

**Available Presets:**

| Name | Description |
| :--- | :--- |
| `demo` | 3 example words: apple, book, cat |
| `top5000` | 5000 most frequent English words |

**Usage Examples:**

```javascript
// Load the 5000高频词库
wb.preset.load('top5000');

// Load and replace (not merge)
wb.preset.load('demo', false);

// List all available presets
console.log(wb.preset.list());
```

### `wb.io` — Import / Export

The `wb.io` module provides import and export capabilities for your word data in various formats.

| Method | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `exportJSON()` | — | `string` | Exports all words as JSON string |
| `exportCSV()` | — | `string` | Exports all words as CSV string |
| `importJSON(jsonStr)` | `jsonStr: string` | `void` | Imports words from JSON string |
| `importCSV(csvStr)` | `csvStr: string` | `void` | Imports words from CSV string |
| `exportAnki()` | — | `string` | Exports in Anki-compatible CSV format |
| `saveToFile(filePath)` | `filePath: string` | `void` | Saves to a JSON file (Node.js only) |
| `loadFromFile(filePath)` | `filePath: string` | `void` | Loads from a JSON file (Node.js only) |

**Usage Examples:**

```javascript
// Export as JSON
const jsonData = wb.io.exportJSON();
console.log(jsonData);

// Export as CSV
const csvData = wb.io.exportCSV();
console.log(csvData);

// Import from JSON
const imported = '[{"id":"1","word":"hello","definition":"你好"}]';
wb.io.importJSON(imported);

// Save to file (Node.js)
wb.io.saveToFile('./my-vocab.json');

// Load from file (Node.js)
wb.io.loadFromFile('./my-vocab.json');
```

### `wb.sync` — Data Persistence

The `wb.sync` module allows you to save, load, and reset your learning data to disk (Node.js only).

| Method | Description |
| :--- | :--- |
| `save()` | Saves current state to disk |
| `load()` | Loads state from disk |
| `reset()` | Resets all data |
| `getPath()` | Returns the current storage path |

**Usage Examples:**

```javascript
// Save progress
wb.sync.save();

// Load saved progress
wb.sync.load();

// Reset everything
wb.sync.reset();

console.log(wb.sync.getPath()); // ./wb-data.json
```

### `wb.analyze` — Smart Analysis

The `wb.analyze` module provides intelligent analysis of your learning data.

| Method | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `difficulty(wordId)` | `wordId: string` | `number \| null` | Returns ease factor (1.3–2.5) for a word |
| `mistakes()` | — | `Word[]` | Returns words likely to be challenging |
| `prediction()` | — | `number` | Estimated days to master all words |
| `hotWords(n)` | `n: number` | `Word[]` | The `n` most urgent words to review |

**Usage Examples:**

```javascript
// Check difficulty of a specific word
const diff = wb.analyze.difficulty('apple');
console.log('Difficulty factor:', diff);

// Get words you often get wrong
const mistakes = wb.analyze.mistakes();
console.log('Tricky words:', mistakes.map(w => w.word));

// How long until you finish?
const days = wb.analyze.prediction();
console.log(`预计 ${days} 天后掌握所有单词`);

// Get top 5 words to review now
const hot = wb.analyze.hotWords(5);
console.log('Urgent review:', hot.map(w => w.word));
```

### `wb.config` — Global Configuration

The `wb.config` module allows you to read and write global settings for the word bank engine.

| Method | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `get(key)` | `key: string` | `any` | Gets a configuration value |
| `set(key, value)` | `key: string, value: any` | `void` | Sets a configuration value |
| `reset()` | — | `void` | Resets to defaults |
| `getAll()` | — | `Object` | Returns all configuration |

**Available Settings:**

| Key | Default | Description |
| :--- | :--- | :--- |
| `dailyLimit` | `20` | Maximum new words per day |
| `algorithm` | `SM-2` | Review algorithm (SM-2 / FSRS) |

**Usage Examples:**

```javascript
// Get current daily limit
const limit = wb.config.get('dailyLimit');
console.log(limit); // 20

// Set new daily limit
wb.config.set('dailyLimit', 30);

// Reset all settings
wb.config.reset();

// Get all config
console.log(wb.config.getAll());
```

### 📋 Summary Table — All Methods

| Module | Method | Brief |
| :--- | :--- | :--- |
| `wb.word` | `list()` | Get all words |
| `wb.word` | `get(id)` | Get word by ID |
| `wb.word` | `add(data)` | Add a new word |
| `wb.word` | `remove(id)` | Delete a word |
| `wb.word` | `search(keyword)` | Search words |
| `wb.word` | `top(n)` | Get most practiced words |
| `wb.review` | `getDue([today])` | Get review queue |
| `wb.review` | `submit(id, quality)` | Submit review |
| `wb.review` | `forecast([days])` | Predict review load |
| `wb.review` | `progress()` | Get learning stats |
| `wb.stats` | `total()` | Total words |
| `wb.stats` | `mastered()` | Mastered words |
| `wb.stats` | `learning()` | Learning words |
| `wb.stats` | `new()` | Never reviewed |
| `wb.stats` | `retentionRate()` | Success rate |
| `wb.stats` | `weakest(n)` | Need review most |
| `wb.preset` | `list()` | Available presets |
| `wb.preset` | `load(name, merge)` | Load a preset |
| `wb.preset` | `addPreset(name, words)` | Add custom preset |
| `wb.io` | `exportJSON()` | Export as JSON |
| `wb.io` | `exportCSV()` | Export as CSV |
| `wb.io` | `importJSON(json)` | Import from JSON |
| `wb.io` | `importCSV(csv)` | Import from CSV |
| `wb.io` | `exportAnki()` | Export for Anki |
| `wb.io` | `saveToFile(path)` | Save to file |
| `wb.io` | `loadFromFile(path)` | Load from file |
| `wb.sync` | `save()` | Save progress |
| `wb.sync` | `load()` | Load progress |
| `wb.sync` | `reset()` | Reset all data |
| `wb.sync` | `getPath()` | Get storage path |
| `wb.analyze` | `difficulty(id)` | Difficulty factor |
| `wb.analyze` | `mistakes()` | Tricky words |
| `wb.analyze` | `prediction()` | Days to master |
| `wb.analyze` | `hotWords(n)` | Urgent words |
| `wb.config` | `get(key)` | Get config value |
| `wb.config` | `set(key, value)` | Set config value |
| `wb.config` | `reset()` | Reset config |
| `wb.config` | `getAll()` | All config |
| `—` | `loadPreset(name)` | Load built-in word list |

---

## 🧠 How It Works

wb-sdk implements the **SM-2 algorithm**, the same one used by Anki and other popular flashcard apps. Each time you review a word and rate your recall (0–5), the engine:

- Adjusts the word's **ease factor** based on your performance
- Calculates the optimal **next review interval**
- Tracks your **progress** and predicts future review workload

This ensures you spend time on words you're about to forget — maximizing efficiency.

---

## 📦 Built-in Example

The package includes an example script that demonstrates the core features of `wb-sdk` in action.

### Run the example

Make sure you are in the project root directory, then execute:

```bash
node example.js
```

### What it does

The example:

- Creates a new `WordBank` instance
- Loads a built-in preset of 3 demo words (`apple`, `book`, `cat`)
- Lists all words
- Retrieves today's due words (initially all words are due)
- Submits a review for the first word with quality `4` (good recall)
- Shows learning progress stats
- Prints a 7‑day forecast of review load

### Expected output (sample)

```text
All words: [
  Word { id: '1', word: 'apple', definition: 'a fruit', ... },
  Word { id: '2', word: 'book', definition: 'a set of pages', ... },
  Word { id: '3', word: 'cat', definition: 'a small animal', ... }
]

Words due for review today:
- apple: a fruit
- book: a set of pages
- cat: a small animal

Submitted review for apple (quality 4/5)

Learning progress: { total: 3, mastered: 0, remaining: 3, daysToMaster: 1 }

7-day review forecast: {
  '2026-09-01': 0,
  '2026-09-02': 0,
  '2026-09-03': 1,
  '2026-09-04': 0,
  '2026-09-05': 0,
  '2026-09-06': 0,
  '2026-09-07': 0
}
```

**Note**: The actual output may vary slightly depending on the current date and your review history.

---

## 🤝 Contributing

Contributions are welcome! If you have ideas, bug fixes, or improvements, feel free to:

- Open an [issue](https://github.com/Zephyr424/wb-sdk/issues) to report bugs or suggest features
- Submit a [pull request](https://github.com/Zephyr424/wb-sdk/pulls) with your changes

Please make sure your code follows the existing style and includes appropriate tests if applicable.

Thank you for helping make `wb-sdk` better!

---

## 📄 License

MIT © [Zephyr424](https://github.com/Zephyr424)

See the [LICENSE](./LICENSE) file for details.；

---

## ⭐ Show Your Support

If you find `wb-sdk` useful, please consider giving it a star ⭐ on GitHub — it means a lot and helps others discover the project.

Thank you for using `wb-sdk`!

---

> Built with ❤️ by a developer who believes learning should be smart, not hard.
---
