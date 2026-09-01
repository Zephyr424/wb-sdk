# Designing wb.word API

The **API design** is the most important part of any library. A well-designed API makes developers want to use your library — and a bad one makes them run away.

## Design principles

1. **Intuitive**: Developers should guess how to use it without reading the docs.
2. **Chainable**: Group related methods under clear namespaces.
3. **Minimal**: Don't expose internal complexity.

## Why wb.word and wb.review?

I wanted developers to write code that reads like English:

```javascript
wb.word.add({ id: '1', word: 'apple', definition: 'a fruit' });
const due = wb.review.getDue();
```

This is **self-documenting code** — you don't need comments to understand what it does.

## What I learned

- **Simplicity wins**: Remove unnecessary options and configurations.
- **Document everything**: Even the most intuitive API needs examples.
- **Listen to users**: The first user feedback I got helped me improve the design.

---

*Written on September 1, 2026*
