# Liquid Glass Components

Use the 21st.dev liquid glass button prompt as the styling direction for portfolio controls and panels.

## Intent

- Use pill-shaped glass buttons with blur, saturation, inset highlights, shine sweeps, and tactile press states.
- Use liquid-glass surfaces for navigation, CTAs, theme controls, contact links, and project actions.
- Keep the static portfolio dependency-free by translating React/Tailwind component behavior into CSS classes.
- Preserve keyboard focus states, hover states, active states, and readable text contrast in dark and light themes.
- Use SVG filter-backed glass distortion where practical, with standard `backdrop-filter` and inset shadows as fallback.

## Static Class Mapping

- Use `.liquid-button` for text buttons and links.
- Use `.liquid-icon` for compact icon-only controls such as the theme toggle and modal close button.
- Use `.glass-panel` for larger glass content surfaces.
- Use `.project-card` for clickable work cards with glass styling and motion.

## Interaction Rules

- Buttons should lift on hover and compress on press.
- Buttons should include a subtle moving shine on hover.
- Cards can tilt gently toward the pointer.
- Project cards should open a full-screen glass detail panel instead of navigating away until real case-study pages exist.
