# Reactronx AGENTS.md

This file contains crucial context for AI coding agents working on the Reactronx monorepo.

## Project Overview

Reactronx is a suite for building Electron applications where the UI/resource tree is reconciled from React in the Main
Process via a custom reconciler.

## Code Conventions & Constraints

- **Strict Typing:** `any` is forbidden. Use `unknown`, `Record<string, unknown>`, or exact interfaces.
- **Unused Variables:** Prefix intentionally unused identifiers with `_`.
- **JSX Intrinsic Elements:** Use lowercase intrinsic names for built-in Electron resources (`<webcontents>`, not
  `<WebContents>`).
- **Renderer Package:** Keep `@reactronx/renderer` framework-agnostic; do not introduce React into that package unless
  explicitly requested.
- **Testing:** Integration tests are Playwright-based. For Electron windows managed by reconciler updates, always
  `await electronApp.firstWindow()` before assertions. Results are written to `tests/integration/results`.
