# Getting Started

## Installation

\\\ash
npm install @zephyr424/wb-sdk
\\\

## Quick Start

\\\javascript
const { WordBank } = require('@zephyr424/wb-sdk');

const wb = new WordBank();

// Add words
wb.word.add({ id: '1', word: 'apple', definition: 'a fruit' });
wb.word.add({ id: '2', word: 'benevolent', definition: 'kind' });

// Get today's review queue
const due = wb.review.getDue();
console.log(\📚 \ words due today\);
\\\

## Next Steps

- [API Documentation](/en/api/word) — Explore all methods
- [Blog](/en/blog/) — Read about design decisions
