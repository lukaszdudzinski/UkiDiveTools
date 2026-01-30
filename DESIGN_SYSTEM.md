# Design System – Uki's Dive Tools

## 1. Color Palette

### Primary Colors
*   **Teal (Pulse)**: `#00d1b2`
    *   *Usage*: Active tabs, accent, primary buttons, "Postaw Kawę".
    *   *CSS Variable*: `--primary-color`

### Functional Colors
*   **Danger (Red)**: `#ff3860`
    *   *Usage*: Alert buttons, error messages, emergency sections.
    *   *CSS Variable*: `--danger-color`
*   **Warning (Yellow/Orange)**: `#ffdd57`
    *   *Usage*: Warning icons, alerts.
*   **Success (Green)**: `#48c774`
    *   *Usage*: Success notifications, safe limits.

### Backgrounds
*   **Dark Base**: `#121212`
    *   *Usage*: Main application background.
*   **Panel Background**: `rgba(20, 20, 20, 0.95)`
    *   *Usage*: Modals, high-contrast sections.

## 2. Typography
*   **Font Family**: 'Outfit', sans-serif.
*   **Headings**:
    *   `h2`: Section titles (e.g., "Wybierz wykład").
    *   `h3`: Tab titles.
    *   `h4`: Subsection headers inside calculators/lectures.

## 3. UI Effects

### Glassmorphism (Default Style)
Used for cards, panels, and overlays to create depth.
*   **Background**: `rgba(255, 255, 255, 0.05)` to `rgba(255, 255, 255, 0.1)`
*   **Blur**: `backdrop-filter: blur(10px)`
*   **Border**: `1px solid rgba(255, 255, 255, 0.1)`
*   **Shadow**: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`

### Neomorphism (Buttons)
Soft shadows providing a tactile feel.
*   **Shadows**: `5px 5px 10px #0b0b0b, -5px -5px 10px #191919`

## 4. Components

### Buttons
*   `.action-button`: Main call-to-action (Teal).
    *   Properties: Full width, bold, uppercase.
*   `.icon-btn`: Small, circular buttons for tools/settings.

### Cards
*   `.card`: Used for lectures, menu tiles.
*   **Hover Effect**: Slight lift (`transform: translateY(-5px)`) and glow (`box-shadow: 0 0 15px var(--primary-color)`).

### Inputs
*   `.input-field`: Dark background, light text, teal border on focus.

## 5. Layout (Grid)
*   `.cards` / `.lectures-grid`: Responsively adjusts columns based on width using `grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))`.
