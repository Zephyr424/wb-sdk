# Word Management API

The `wb.word` module provides methods for managing your word bank — adding, retrieving, searching, and deleting words.

---

## `wb.word.list()`

Returns all words currently stored in the bank.

**Returns:** `Word[]` — an array of `Word` objects.

**Example:**

```javascript
const allWords = wb.word.list();
console.log(allWords);
// [
//   Word { id: '1', word: 'apple', definition: 'a fruit', ... },
//   Word { id: '2', word: 'book', definition: 'a set of pages', ... }
// ]
```

---

## `wb.word.get(id)`

Retrieves a single word by its unique identifier.

**Parameters:**

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | ✅ Yes | The unique ID of the word |

**Returns:** `Word | null` — the word object if found, otherwise `null`.

**Example:**

```javascript
const word = wb.word.get('apple');
if (word) {
  console.log(word.definition); // "a fruit"
} else {
  console.log('Word not found');
}
```

---

## `wb.word.add(data)`

Adds a new word to the bank. If a word with the same ID already exists, it will be overwritten.

**Parameters:**

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `data.id` | `string` | ✅ Yes | Unique identifier |
| `data.word` | `string` | ✅ Yes | The word itself |
| `data.definition` | `string` | ✅ Yes | Meaning or translation |
| `data.repetitions` | `number` | ❌ No | Default: `0` |
| `data.interval` | `number` | ❌ No | Default: `0` (days) |
| `data.easeFactor` | `number` | ❌ No | Default: `2.5` (range 1.3–2.5) |
| `data.lastReviewed` | `string \| Date \| null` | ❌ No | Default: `null` (ISO string or Date object) |

**Returns:** `Word` — the newly created (or updated) word object.

**Example:**

```javascript
// Add a simple word
wb.word.add({
  id: 'grok',
  word: 'grok',
  definition: 'to understand intuitively'
});

// Add a word with explicit SM‑2 state (e.g., when importing data)
wb.word.add({
  id: 'serendipity',
  word: 'serendipity',
  definition: 'the occurrence of events by chance in a happy way',
  repetitions: 3,
  interval: 15,
  easeFactor: 2.3,
  lastReviewed: '2026-08-15T10:00:00.000Z'
});
```

---

## `wb.word.remove(id)`

Permanently deletes a word from the bank by its ID.

**Parameters:**

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | ✅ Yes | The unique ID of the word to remove |

**Returns:** `void`

**Example:**

```javascript
wb.word.remove('grok');
// Now 'grok' is no longer in the bank
```

---

## `wb.word.search(keyword)`

Searches for words whose **word** or **definition** contains the given keyword (case‑insensitive).

**Parameters:**

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `keyword` | `string` | ✅ Yes | The search term (case‑insensitive) |

**Returns:** `Word[]` — an array of matching words (empty if none found).

**Example:**

```javascript
const results = wb.word.search('bene');
// Returns words like "benevolent", "beneficial", "benefit"
results.forEach(w => console.log(`${w.word}: ${w.definition}`));
```

---

## `wb.word.top(n)`

Returns the top `n` words with the **highest repetition count** — i.e., the words you have reviewed most often.

**Parameters:**

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `n` | `number` | ✅ Yes | Number of top words to return |

**Returns:** `Word[]` — an array of the top `n` words (sorted descending by repetitions).

**Example:**

```javascript
const mostPracticed = wb.word.top(10);
console.log('Your top 10 most practiced words:');
mostPracticed.forEach(w => console.log(`${w.word} (${w.repetitions} reviews)`));
```

---

## Data Type: `Word`

The `Word` object contains the following fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique identifier |
| `word` | `string` | The word itself |
| `definition` | `string` | Meaning or translation |
| `repetitions` | `number` | Number of successful reviews |
| `interval` | `number` | Current interval in days |
| `easeFactor` | `number` | Difficulty factor (1.3 – 2.5) |
| `lastReviewed` | `Date \| null` | Timestamp of the last review (Date object or null) |
| `isDue(today?: Date)` | `function` | Returns `true` if the word is due for review on the given date (default: today) |
| `toJSON()` | `function` | Returns a plain object suitable for serialization (e.g., to store in JSON) |

---

## Summary of `wb.word` Methods

| Method | Description |
| :--- | :--- |
| `list()` | Get all words |
| `get(id)` | Get a word by ID |
| `add(data)` | Add or update a word |
| `remove(id)` | Delete a word |
| `search(keyword)` | Search words by word or definition |
| `top(n)` | Get the most frequently reviewed words |

For the review‑scheduling methods, see the [Review Scheduling API](/api/review).

---