# Repository Governance & Execution Rules (`GEMINI.md`)

## 1. Communication Mode: Caveman Style (Token & Context Optimization)
- Respond in terse, telegraphic fragments. Omit conversational filler, pleasantries, and unnecessary articles.
- Do not repeat the prompt. Get straight to technical observation and action.
- Code syntax, terminal commands, file paths, JSX structures, and error traces must remain 100% verbatim and accurate (NEVER compress code or paths).
- Auto-Clarity trigger: Switch to complete technical sentences ONLY when reporting fatal runtime exceptions, build errors, or React state/infinite loop bugs.
- Keep total reasoning output under 4-5 lines before taking tool actions.

## 2. Tech Stack & Environment Specification
- **Framework & Tooling:** React with Vite using Vanilla JavaScript (ES6+ / JSX). Do NOT use TypeScript or `.ts`/`.tsx` extensions.
- **File Extensions:** Use `.jsx` for React components and `.js` for standalone utilities or helper functions.
- **Testing Framework:** Vitest with React Testing Library.
- **Package Manager:** `npm`. Standard scripts: `npm run dev`, `npm run build`, `npm test` (or `npx vitest run`).

## 3. ReAct Planning & Execution Protocol
- **Inspect Before Edit:** Inspect targeted JSX/JS files and output a concise implementation plan before modifying any code.
- **Explicit Sequence:** Outline targeted component paths, hook state changes, and line numbers to be modified.
- **Approval Gate:** Wait for user confirmation of the plan before editing project files.

## 4. Prompt Intent & Context Scoping (Explicit Sourcing)
- **Explicit Sourcing:** Treat all feature and bugfix requests as "Explicit with Source". Target component paths or file locations must be defined.
- **Early-Halt Disambiguation:** If target component paths or stack traces are omitted, STOP and request explicit coordinates before running speculative workspace-wide searches (`ripgrep`).
- **No Unbounded Scans:** Do not execute broad codebase searches unless explicitly authorized by the user.

## 5. Scope Preservation & Contract Boundaries
- **Minimal Changes:** Modify ONLY the JSX/JS components and CSS files required for the task.
- **Preserve Component Interfaces:** Do NOT alter component props, export signatures, or DOM output structures unless instructed.
- **Forbidden Actions:** Do NOT convert JS to TypeScript, install unapproved third-party UI libraries (e.g., Tailwind, MUI, AntD), reformat untouched files, or refactor working hooks without explicit permission.

## 6. Performance Benchmarking & Empirical Evidence (Jõudlus)
- **Empirical Benchmarks:** Optimizations (e.g., memoization, re-render fixes, search/sorting algorithms) MUST include measurable verification.
- **Resource Metrics:** Measure and report:
  1. Unit test execution time (Vitest ms).
  2. Production build output size and compilation validation (`npm run build`).
  3. Re-render count or component state lifecycle efficiency where applicable.
- **Evidence Over Claims:** Never claim a component or algorithm is "optimized" without presenting comparative execution/build data.

## 7. Verification, Testing & Git Review
- **Test Cycle:** Follow the Red-Green-Regression cycle. Run unit tests via `npx vitest run` and build verification via `npm run build` after changes.
- **Regression Check:** Ensure existing component test suites pass alongside newly added scenario tests.
- **Git Review:** Display `git status --short` and `git diff` to inspect untracked files (`??`) and staged changes before committing.
