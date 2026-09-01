# Getting Started

## Introduction

**wb-sdk** is a lightweight, zero‑dependency JavaScript library that implements the **SM‑2 spaced repetition algorithm** — the same engine behind Anki and many other flashcard apps. It provides a clean, intuitive API (`wb.word` and `wb.review`) so you can easily add intelligent vocabulary review to your own applications without reinventing the wheel.

## Installation

Install the package via npm:

```bash
npm install @zephyr424/wb-sdk
```

Or using yarn:

```bash
yarn add @zephyr424/wb-sdk
```

## Quick Start

Here’s a minimal example to get you up and running in seconds:

```javascript
// 1. Import the library
const { WordBank } = require('@zephyr424/wb-sdk');

// 2. Create a word bank instance
const wb = new WordBank();

// 3. Add some words
wb.word.add({ id: '1', word: 'apple', definition: 'a fruit' });
wb.word.add({ id: '2', word: 'benevolent', definition: 'kind and generous' });
wb.word.add({ id: '3', word: 'ephemeral', definition: 'lasting for a short time' });

// 4. Get today's review queue (all words are due initially)
const due = wb.review.getDue();
console.log(`📚 ${due.length} words due for review today:`);
due.forEach(w => console.log(`  - ${w.word}: ${w.definition}`));

// 5. Simulate a review (quality from 0 = forgot to 5 = perfect)
wb.review.submit('1', 4); // "apple" with quality 4/5

// 6. Check progress
console.log(wb.review.progress());
// { total: 3, mastered: 0, remaining: 3, daysToMaster: 1 }
```

## Core Concepts

### The SM‑2 Algorithm

SM‑2 is a **spaced repetition** algorithm that optimizes the interval between reviews based on your performance. Each time you review a word and rate your recall (0–5), the engine:

- Adjusts the word’s **ease factor** (difficulty) dynamically
- Calculates the **next review interval** (in days)
- Tracks **repetition count** to determine when a word is “mastered”

This ensures you spend time on the words you’re most likely to forget — maximizing learning efficiency.

### Data Structure

Each word is stored as a `Word` object with the following fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique identifier (required) |
| `word` | `string` | The word itself (required) |
| `definition` | `string` | Meaning or translation (required) |
| `repetitions` | `number` | Number of successful reviews (default `0`) |
| `interval` | `number` | Current interval in days (default `0`) |
| `easeFactor` | `number` | Difficulty factor between `1.3` and `2.5` (default `2.5`) |
| `lastReviewed` | `Date \| null` | Timestamp of the last review (default `null`) |

### Workflow

1. **Add** words to the bank using `wb.word.add()`.
2. Each day, call `wb.review.getDue()` to get the words that need review.
3. For each reviewed word, call `wb.review.submit(id, quality)` with your self‑rated quality score.
4. The engine updates the word’s state automatically — the next review date is calculated for you.
5. Track overall progress with `wb.review.progress()`.

## API Overview

The library exposes two main sub‑modules:

- **`wb.word`** – manage your word list (`list`, `get`, `add`, `remove`, `search`, `top`)
- **`wb.review`** – handle review scheduling (`getDue`, `submit`, `forecast`, `progress`)

For detailed method signatures and examples, visit the [API Reference](/api/word).

## Next Steps

- 📖 Read the full [API Documentation](/api/word) to explore every method.
- 🧪 Run the built‑in example: `node example.js` (in the project root).
- 💡 Check the [GitHub repository](https://github.com/Zephyr424/wb-sdk) for source code and contributing guidelines.
- 🌟 If you find this library useful, please give it a star ⭐ on GitHub!

---