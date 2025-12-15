# ADR 002: Semantic Versioning Strategy

## Status
Accepted

## Context
The project requires a meaningful versioning scheme to track releases, refactoring milestones, and content updates. Standard SemVer (Major.Minor.Patch) was deemed insufficient for capturing the specific "yearly/milestone" context the user desired.

## Decision
We adopted a custom Semantic Versioning scheme format: **`vYYYY.M.K.P`**

### Format Definition
1.  **YYYY** (Year): The 4-digit year of the release (e.g., `2025`).
2.  **M** (Milestone): Represents major development phases or milestones.
    *   `1`: Initial Legacy Version
    *   `2`: Refactoring & Module System (Current)
    *   `3`: PWA / Offline Capability (Future)
3.  **K** (Components): The count of major functional modules active in the app. current count **6**:
    *   Calculators (Nitrox, Blending, Planning, Ballast)
    *   Knowledge Base (Lectures)
    *   Quiz System
4.  **P** (Patch): A sequential number or date-based identifier for minor fixes and deployments within the month/cycle.

## Consequences
- Versions clearly indicate the "freshness" (Year) and "maturity" (Milestone) of the code.
- Ensure `index.html` footer is updated with every release.
- Git tags should follow this format.
