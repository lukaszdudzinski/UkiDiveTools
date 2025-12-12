# ADR 001: ES6 Module Architecture & Logic Encapsulation

## Status
Accepted

## Context
The application was originally a monolithic `script.js` file (2000+ lines) containing mixed UI, data, and business logic. This made maintenance difficult, testing impossible, and violated SOLID principles.
The user requires a refactor that ensures:
1.  Separation of concerns (UI vs Logic).
2.  No code duplication (DRY).
3.  Encapsulation of domain logic.
4.  Use of standard JavaScript (ES6 Modules) without a build step if possible, or simple structure.

## Decision
We will refactor the application into a modular architecture using native ES6 Modules.

### 1. Structure
- `src/modules/core/`: Shared domain logic, physics constants, and math helpers (e.g., `DiveMath`).
- `src/modules/calculators/`: Specific domain domains (Nitrox, Planning) using `DiveMath`.
- `src/modules/data/`: Static data (Lectures) and data access (Quiz).
- `src/modules/ui/`: UI controllers that bind code to DOM events.
- `src/main.js`: Composition root.

### 2. Encapsulation Strategy
- **Calculators**: Will be stateless modules or classes that expose pure functions. They must NOT rely on DOM elements directly.
- **Shared Logic**: Common calculations (ATA from depth, freshwater conversion) MUST be centralized in `DiveMath` to avoid duplication.
- **UI Modules**: Responsible *only* for getting inputs from DOM, calling Calculators, and rendering results.

## Consequences
- **Positive**: Code is testable, reusable, and easier to read. "Spaghetti code" is eliminated.
- **Negative**: Requires a local server to run (CORS policy for modules).
- **Compliance**: This aligns with the C4 model (Component level) and SOLID principles (Single Responsibility).
