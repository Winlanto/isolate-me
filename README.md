# Isolation Game

🎮 **Live Demo:** [isolate-me.vercel.app](https://isolate-me.vercel.app/)

A web-based implementation of the mathematical strategy board game **Isolation**, built with React and Vite. Features a custom game engine powered by the Minimax algorithm with Alpha-Beta pruning.

---

## Preview

![Isolation Game Screenshot](./docs/screenshot.png)

---

## Rules

The game is played on a **3x3 grid** with a single shared token:

1. **Start:** The token starts at position **1** (top-center). The starting tile is burned immediately.
2. **Turns:** Players take turns moving the token one step orthogonally (**up, down, left, right**).
3. **Burning Tiles:** Every tile vacated by the token becomes permanently blocked.
4. **Endgame:** The first player with no legal moves left on their turn loses.

---

## Features & Implementation

- **Minimax Decision Engine:** Explores game states to calculate optimal moves for the computer opponent.
- **Alpha-Beta Pruning:** Cuts off redundant branches in the search tree to minimize compute time.
- **Depth-Weighted Scoring:** Prioritizes faster victories and delays loss scenarios based on distance to terminal state.
- **Separation of Concerns:** Core game and search logic (`src/utils/minimax.js`) is decoupled from React UI components.

---

### 📊 Benchmark & Complexity Analysis

Measurements evaluated across all unique board symmetries (corners, edges, center) using `npm run benchmark`:

| Metric                       | Plain Minimax   | Minimax + Alpha-Beta | Optimization                   |
| :--------------------------- | :-------------- | :------------------- | :----------------------------- |
| **Explored States (Nodes)**  | 61 – 79         | 40 – 59              | **Up to 44.3% tree reduction** |
| **Execution Time (Node.js)** | ~0.23 – 0.24 ms | ~0.11 – 0.15 ms      | **Up to ~45% speedup**         |

- The search space adheres to $\mathcal{O}(b^d)$ complexity ($b \le 4, d \le 9$). Alpha-Beta dynamically prunes redundant subtrees, guaranteeing mathematically optimal moves in under $0.2\text{ ms}$ on Node.js runtimes.

---

## Tech Stack

- **Frontend:** React, Vite
- **Styling:** CSS (Grid, Flexbox)
- **Core Logic:** JavaScript (ES6 Modules)
- **Tooling:** Oxlint, Git

---

## Project Structure

```text
isolate-me/
├── index.html
├── package.json
├── docs/
│   └── screenshot.png
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── components/
    │   ├── Header.jsx
    │   ├── Rules.jsx
    │   ├── Board.jsx
    │   └── Game.jsx
    └── utils/
        └── minimax.js
```

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation & Run

1. Clone repository:
   git clone https://github.com/Winlanto/isolate-me.git
   cd isolate-me

2. Install dependencies:
   npm install

3. Start dev server:
   npm run dev

4. Build production bundle:
   npm run build

5. Run benchmark suite:
   npm run benchmark
