# wb-sdk

> A developer-friendly spaced repetition engine for vocabulary building

[![npm version](https://img.shields.io/npm/v/wb-sdk.svg)](https://www.npmjs.com/package/wb-sdk)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Zephyr424/wb-sdk/blob/main/LICENSE)

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

---

## 🚀 Installation

```bash
npm install wb-sdk
```
### Or with Yarn:
```bash
yarn add wb-sdk
```

---

## 🏃 Quick Start
```javascripts
const { WordBank } = require('wb-sdk');

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