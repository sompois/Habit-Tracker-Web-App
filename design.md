# Habit / System — Design Rules

## 1. Design intent

This redesign translates the supplied GSAP visual reference into a habit-tracking product rather than copying a marketing page literally.

The interface should feel like a dark editorial workspace: near-black canvas, warm cream typography, thin hairline dividers, oversized display type, and restrained accent colors. Color is functional taxonomy, not decoration. Existing habit-tracking behavior must remain intact.

The product direction is now **Commitment Planner**: users maintain a library of habits but select only 1–3 promises for the current day. The interface should reward realistic commitments and deliberate adjustment rather than maximum task volume.

## 2. Color system

### Core surfaces
- Canvas: #0e100f
- Nested surface: #191919
- Primary text / outline: #fffce1
- Muted text: #7c7c6f
- Hairline border: #42433d

### Functional taxonomy
- Habits / commitment / completion: #0ae448
- Minimum-version adjustment / progress / streaks / destructive warning: #ff8709
- Calendar: #fec5fb
- Statistics: #9d95ff
- Data / backup: #00bae2
- Soft green highlight: #abff84

Rules:
- Keep the page dark from top to bottom.
- Use accent colors for labels, state, charts, and small highlights only.
- Do not use accent colors as large filled card backgrounds.
- Do not introduce additional brand colors unless a new functional category requires one.
- Avoid pure white and pure black.

## 3. Typography

Preferred family: Mori.
Practical fallback stack: Avenir Next, Segoe UI, Helvetica Neue, Arial, sans-serif.

Weights:
- Regular: 400
- Semibold: 600

Type roles:
- Display hero: clamp(4rem, 12vw, 11rem), weight 600, line-height 0.84–0.92, tracking -0.04em
- Section heading: clamp(2rem, 5vw, 4.25rem), weight 600, line-height 1
- Subheading: 1.5–2rem, weight 600
- Body: 1rem–1.2rem, line-height 1.4
- Caption / annotation: 0.82–0.95rem, uppercase or curly-bracket notation

Rules:
- Hero typography is the primary visual object.
- Use warm cream for most text and muted gray for supporting copy.
- Avoid more than two font weights.
- Avoid tiny UI text below 13px.

## 4. Spacing and shape

Base spacing unit: 4px.

Preferred spacing steps:
- 8px
- 12px
- 16px
- 20px
- 24px
- 32px
- 48px
- 76px
- 96px

Layout:
- Page max-width: 1280px
- Page gutters: 24px desktop, 18px tablet, 14px mobile
- Major section gap: 72–108px
- Panel padding: 24–32px
- Component gap: 12–20px

Radii:
- Cards / panels: 8px
- Small tags: 8px
- Buttons: 100px
- Circular controls: 50%

## 5. Product behavior rules

### Habit library
- A habit is a reusable behavior definition, not automatically a commitment for every day.
- Each habit can define a **Full version** and a **Minimum version**.
- Minimum versions should be specific enough to count as a real action on overloaded days.

### Today's promises
- Users may select at most three habits as today's commitments.
- Selection should feel consequential but reversible.
- A selected promise starts as **Full**.
- Users may deliberately adjust a promise to **Minimum** and optionally record why.
- Minimum is not visually framed as failure; use orange as an adjustment state, not a warning state.
- Completion remains the existing habit completion action, so the planner does not duplicate check-off behavior.

### Reliability metric
- When at least one daily commitment exists, today's primary percentage is based on committed habits only.
- When none exists, fall back to the existing all-habits completion percentage.
- Copy should emphasize promises kept rather than productivity volume.

## 6. Component rules

### Navigation
- Compact outlined pill tabs.
- Active state is indicated by accent color, border, and a small taxonomy label.
- Do not fill active tabs with solid color.

### Buttons
- Default: transparent background, 1px cream or muted border, cream text, pill radius.
- Primary creation action: transparent with green emphasis on the border only.
- Destructive action: orange border/text rather than a filled red button.
- Hover: modest opacity, border-color, or 1–2px translation; no large scale jumps.

### Commitment picker
- Show every habit as a compact outlined selection control.
- Selected habits use green border/text.
- At the 3-item limit, unselected options become visibly unavailable without disappearing.
- Selected promises expose a Full / Minimum segmented outline control.
- Adjustment reason appears only when Minimum is selected.

### Panels and cards
- Use the canvas or #191919 nested surface.
- Separate content with #42433d hairlines.
- No box shadows.
- Use 8px radius and generous internal spacing.

### Form fields
- Dark transparent field with hairline border.
- Cream input text and muted placeholder.
- Focus state uses the functional accent for that form.

### Habit item
- Completion control remains circular and obvious.
- Completed habits use green border/text state rather than a filled success card.
- Preserve edit, delete, streak, name, description, icon, and minimum-version behavior.
- Today's selected habits show a compact Full or Minimum badge.

### Progress
- Thin, long progress track.
- Progress color moves through orange to green as completion rises.
- Percentage is editorial type, not a badge.

### Calendar
- Dark grid with hairline separators.
- Today uses an outlined box.
- Completion is expressed by small colored dots:
  - Green = all completed
  - Orange = partial
  - Muted gray = none

### Statistics
- Metrics are border-separated editorial blocks rather than dashboard tiles with shadows.
- Use lilac for section identity and green/orange/blue only when encoding data.

### Data management
- Blue is the section identity.
- Export and import remain ghost pills.
- Export should include daily commitment data.
- Clear data removes habits, completions, and daily commitments.
- Clear data uses orange warning styling, not a red fill.

## 7. Layout rules

Desktop:
- Large edge-aware hero followed by a compact tab row.
- Today's promises appear before habit creation and the habit library.
- Main tool area sits within a 1280px centered frame.
- Habit cards and analytics use full-width editorial rows.

Tablet:
- Reduce hero size and metadata width.
- Allow tab row to wrap.
- Commitment picker reduces columns.
- Statistics metrics become a 2-column grid.

Mobile:
- Hero becomes 2–3 lines with responsive display size.
- Navigation becomes a 2-column grid.
- Commitment picker and commitment detail rows become 1 column.
- Panels use 18–20px padding.
- Forms stack vertically.
- Habit actions wrap below primary habit information.
- Calendar retains seven columns but reduces cell typography and legend density.
- Statistics metrics and data actions become 1 column.

## 8. Motion

- Motion should confirm state, not decorate every element.
- Keep fade/translate entry animations under 600ms.
- Completion may use a subtle pulse or border flash.
- Respect prefers-reduced-motion.
- Do not use large bounce, spin, or continuous floating UI animations.

## 9. Do

- Keep the entire experience on the near-black canvas.
- Use cream text instead of pure white.
- Use hairline dividers to structure information.
- Use curly-bracket annotations as recurring section markers.
- Keep accent colors tied to product areas.
- Let typography create hierarchy before adding decoration.
- Keep daily promises visibly limited to three.
- Treat reduction from Full to Minimum as deliberate adaptation, not failure.
- Maintain all existing localStorage, habit CRUD, completion, streak, calendar, statistics, export/import, and clear-data behavior.

## 10. Do not

- Do not add solid filled CTA buttons.
- Do not add card drop shadows.
- Do not introduce arbitrary gradients behind whole sections.
- Do not use pure #ffffff or #000000 as primary surfaces.
- Do not replace functional labels with icon-only controls.
- Do not remove or hide existing features for visual simplicity.
- Do not use a different accent color for the same functional category.
- Do not turn the interface into a literal GSAP clone; preserve the habit-tracking product hierarchy.
- Do not imply that selecting more commitments is better.
- Do not visually punish Minimum commitments.
