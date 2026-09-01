# Why SM-2 Algorithm

The **SM-2** algorithm, developed by Piotr Woźniak in the 1980s, is the foundation of **spaced repetition** — a technique that optimizes memory retention by scheduling reviews at increasing intervals.

## Why I chose SM-2

1. **Proven track record**: SM-2 is the algorithm behind Anki, the most popular flashcard app.
2. **Simple implementation**: The algorithm is elegant and easy to code.
3. **Highly effective**: Research shows spaced repetition can boost retention by over 200%.

## How it works

When you rate your recall quality from 0 to 5:

- **Quality < 3**: You forgot the word → reset interval to 1 day.
- **Quality ≥ 3**: You remembered it → increase the interval and adjust the ease factor.

This dynamic adjustment ensures you spend time on words you're about to forget.

## Future plans

I'm planning to add **FSRS** support in a future version — a more advanced algorithm that uses machine learning to optimize intervals.

---

*Written on September 1, 2026*