# Review Scheduling API

The `wb.review` module handles all spaced repetition logic — determining which words are due, recording review performance, and forecasting future workload.

---

## `wb.review.getDue([today])`

Returns all words that are due for review on a given date.

**Parameters:**

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `today` | `Date` | ❌ No | The date to check (defaults to `new Date()`). |

**Returns:** `Word[]` — an array of `Word` objects that are due.

**Example:**

```javascript
// Get words due today
const dueToday = wb.review.getDue();
console.log(`📚 ${dueToday.length} words due today`);

// Get words due on a specific date
const christmasDue = wb.review.getDue(new Date('2026-12-25'));
```

---

## `wb.review.submit(id, quality)`

Records a review attempt for a specific word and updates its SM‑2 state (interval, repetitions, ease factor, and last reviewed date).

**Parameters:**

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string` | ✅ Yes | The ID of the word being reviewed. |
| `quality` | `number` | ✅ Yes | Self‑rated recall quality from `0` (completely forgot) to `5` (perfect recall). |

**Returns:** `Word` — the updated `Word` object.

**Quality Scale:**

| Score | Meaning |
| :--- | :--- |
| `5` | Perfect recall |
| `4` | Good recall, slight hesitation |
| `3` | Recalled with difficulty |
| `2` | Forgot, but recognized |
| `1` | Almost forgot |
| `0` | Completely forgot |

**Example:**

```javascript
// Review the word with ID 'apple' and rate it as 4/5
const updated = wb.review.submit('apple', 4);
console.log(`Next review in ${updated.interval} days`);
```

---

## `wb.review.forecast([days])`

Predicts how many words will become due for each day over the next N days, based on current word states.

**Parameters:**

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `days` | `number` | ❌ No | Number of days to forecast (default: `7`). |

**Returns:** `Object` — a dictionary where keys are date strings (`YYYY-MM-DD`) and values are the number of words due on that day.

**Example:**

```javascript
const forecast = wb.review.forecast(7);
console.log(forecast);
// {
//   '2026-09-01': 5,
//   '2026-09-02': 8,
//   '2026-09-03': 3,
//   '2026-09-04': 0,
//   '2026-09-05': 2,
//   '2026-09-06': 4,
//   '2026-09-07': 1
// }
```

---

## `wb.review.progress()`

Returns an overview of your overall learning status — total words, mastered, remaining, and estimated days to mastery.

**Returns:** `Object` with the following fields:

| Field | Type | Description |
| :--- | :--- | :--- |
| `total` | `number` | Total number of words in the bank. |
| `mastered` | `number` | Number of words with an interval ≥ 30 days. |
| `remaining` | `number` | Words not yet mastered (`total - mastered`). |
| `daysToMaster` | `number` | Estimated days until all words are mastered (based on an assumed rate of 5 new words mastered per day). |

**Example:**

```javascript
const stats = wb.review.progress();
console.log(stats);
// { total: 5000, mastered: 1200, remaining: 3800, daysToMaster: 760 }
```

---

## Understanding the SM‑2 Algorithm

The `submit` method implements the **SM‑2** algorithm, which works as follows:

- If `quality < 3` (failed recall):
  - The word's `repetitions` counter is reset to `0`.
  - The `interval` is set to `1` day (review again tomorrow).
  - The `easeFactor` remains unchanged.

- If `quality >= 3` (successful recall):
  - The `interval` is updated based on the current `repetitions` count:
    - `repetitions == 0` → interval = `1` day
    - `repetitions == 1` → interval = `6` days
    - `repetitions >= 2` → interval = `round(interval * easeFactor)`
  - The `repetitions` count is incremented.
  - The `easeFactor` is adjusted using the formula:
    ```
    ease += 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
    ```
    The result is clamped between `1.3` and `2.5`.

This dynamic adjustment ensures that words you find difficult appear more frequently, while easy words are spaced out over longer intervals.

---

## Summary of `wb.review` Methods

| Method | Description |
| :--- | :--- |
| `getDue([today])` | Get words due for review today (or on a custom date). |
| `submit(id, quality)` | Record a review and update the word's SM‑2 state. |
| `forecast([days])` | Predict how many words will be due each day for the next N days. |
| `progress()` | Get overall learning statistics (total, mastered, remaining, days to mastery). |

For word management methods (`list`, `get`, `add`, `remove`, `search`, `top`), see the [Word Management API](/api/word).

---