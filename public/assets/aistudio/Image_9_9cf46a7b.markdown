---
name: Cultivated Architectural Marketplace
colors:
  surface: '#f8faf6'
  surface-dim: '#d9dad7'
  surface-bright: '#f8faf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f0'
  surface-container: '#edeeeb'
  surface-container-high: '#e7e9e5'
  surface-container-highest: '#e1e3df'
  on-surface: '#191c1a'
  on-surface-variant: '#404944'
  inverse-surface: '#2e312f'
  inverse-on-surface: '#f0f1ed'
  outline: '#707974'
  outline-variant: '#c0c9c2'
  surface-tint: '#316853'
  primary: '#003626'
  on-primary: '#ffffff'
  primary-container: '#134e3a'
  on-primary-container: '#85bea4'
  inverse-primary: '#99d3b8'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#4a2500'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b3700'
  on-tertiary-container: '#ff993b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b5efd3'
  primary-fixed-dim: '#99d3b8'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#16503c'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8faf6'
  on-background: '#191c1a'
  surface-variant: '#e1e3df'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.005em
  title-md:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  caption:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system articulates an architectural, high-trust marketplace aesthetic. It balances the warm, hospitable spatial restraint of premium hospitality platforms with the utilitarian typographic rigor of modern productivity suites. It is conceived for discovery, commerce, and human craftsmanship.

Visual tone:
- **Restrained & Editorial:** Generous whitespace, razor-thin structural dividers, and deliberate information pacing replace visual clutter and aggressive sales prompts.
- **Trustworthy & Grounded:** Rich forest tones establish immediate institutional authority, grounded against warm, tactile architectural neutrals.
- **Human & Tangible:** Metric-driven badges, verifiable qualitative reviews, and contextual craft cards prioritize authenticity without relying on generic gamification or star-rating tropes.

## Colors
The palette relies on high-contrast foundational ink balanced against warm limestone surfaces and focused evergreen accents.

- **Primary (`#134E3A`):** Deep Forest Green. Reserved for high-intent interactive states, verified partner markers, primary affordances, and focused active indicators.
- **Secondary (`#059669`):** Bright Emerald. Used strictly for positive validation badges, completed steps, and trust metrics.
- **Tertiary (`#D97706`):** Warm Ochre/Amber. Used for alerts, attention flags, and conditional statuses without inducing alarm.
- **Critical (`#DC2626`):** Calm Rose. Reserved for destructive interactions and validation errors.
- **Surfaces & Grounds:**
  - Base Ground: `#FAFAF9` (warm calcified canvas)
  - Card/Modal Surface: `#FFFFFF` (pure white for elevation contrast)
  - Secondary Container: `#F5F5F3` (low-contrast structural grouping)
- **Typographic Neutral Hierarchy:**
  - Headline Ink: `#1C1F1D` (deep charcoal, near-black)
  - Body Text: `#3F4541` (graphite slate)
  - Supporting/Metadata: `#717974` (neutral stone gray)
- **Boundaries:** `#E5E7EB` hairline stroke for architectural framing.

## Typography
Typographic scale balances geometric structure with high editorial readability. `Manrope` delivers refined weight balance and proportion in headings, while `Hanken Grotesk` guarantees maximum scanning clarity in dense product specs, bios, and pricing tables.

- Maintain strict vertical rhythm: bodies sit on comfortable 1.5x leading ratios to prevent visual fatigue.
- Numerals in prices, ratings, and quantitative trust indexes must leverage tabular lining figures (`font-variant-numeric: tabular-nums`) to align cleanly within financial summaries and listings.

## Layout & Spacing
The layout model employs a responsive 12-column grid pinned to a maximum content container of 1280px, flanked by adaptive margins.

- **Desktop (≥1024px):** 12 columns, 24px (`1.5rem`) gutters, 48px (`3rem`) margins. Content sections alternate between open-air card modules and single-column centered editorial tracks.
- **Tablet (768px – 1023px):** 8 columns, 20px gutters, 32px margins. Two-up grid collapse for marketplace items.
- **Mobile (<768px):** 4 columns, 16px (`1rem`) gutters, 20px (`1.25rem`) page edge inset. Dense horizontally-scrollable chip navigation strips and stacked single-column listing layouts.

Component internal padding relies strictly on geometric multiples: cards utilize `space-lg` (24px) on desktop, shifting down to `space-md` (16px) on compact handheld viewports.

## Elevation & Depth
Depth is expressed through physical surface stratification paired with soft ambient diffusion, avoiding harsh drop shadows or synthetic gloss.

- **Level 0 (Canvas):** Ground layer `#FAFAF9`, completely flat.
- **Level 1 (Card/Container Resting):** Solid `#FFFFFF` backed by a 1px solid border (`#E5E7EB`) and an ultra-subtle tinted ground shadow: `0 1px 3px rgba(28, 31, 29, 0.04), 0 1px 2px rgba(28, 31, 29, 0.02)`.
- **Level 2 (Interactive Hover / Floating Nav):** `0 8px 24px -4px rgba(28, 31, 29, 0.06), 0 4px 8px -2px rgba(28, 31, 29, 0.03)` with a hairline stroke lightened to `#E2E8F0`.
- **Level 3 (Modals / Flyouts):** `0 20px 32px -8px rgba(28, 31, 29, 0.12), 0 8px 16px -4px rgba(28, 31, 29, 0.04)`.
- **Glass Overlays:** Filter bars and sticky headers utilize high-translucency frosted backing (`rgba(250, 250, 249, 0.85)` with `backdrop-filter: blur(12px)`) bound by an understated 1px bottom edge (`#E5E7EB`).

## Shapes
The spatial form language is balanced: modern, tailored, and calm.

- **Standard Base (`rounded-md`, 8px / 0.5rem):** Used for micro-elements, inputs, dropdown menus, and utility buttons.
- **Component Medium (`rounded-lg`, 16px / 1rem):** The foundational radius for standard marketplace cards, modal dialogs, and segmented view containers.
- **Container Large (`rounded-xl`, 24px / 1.5rem):** Applied to hero banners, visual presentation modules, media preview blocks, and master container panels.
- Full pills (`rounded-full`) are strictly preserved for filter chips and small numeric trust badges to distinguish them from actionable layout cards and inputs.

## Components

### Buttons
- **Primary:** Background `#134E3A`, text `#FFFFFF`, radius 8px (`space-sm`), padding `10px 18px`. Hover: `#0F3F2E`. Active: Scale `0.99`.
- **Secondary / Subtle:** Surface `#FFFFFF`, border 1px solid `#E5E7EB`, text `#1C1F1D`. Hover: `#F5F5F3` with `#3F4541` border tone.
- **Ghost:** Background transparent, text `#3F4541`. Hover: `#F5F5F3`, text `#1C1F1D`.

### Filter Chips
- Pill geometry (`rounded-full`). 
- **Inactive:** `#FFFFFF` fill, 1px `#E5E7EB` border, typography `label-sm` in `#3F4541`.
- **Active:** `#134E3A` solid fill with `#FFFFFF` text, no outer border.

### Input Fields & Search Bars
- Background `#FFFFFF`, 1px solid `#E5E7EB` boundary, radius 8px.
- Focus state: Hairline ring `0 0 0 2px rgba(19, 78, 58, 0.2)` accompanied by stroke shift to `#134E3A`.
- Placeholder color: `#717974`. Input label styled with `label-md`.

### Selection Controls (Checkboxes & Radios)
- Square (checkbox) 4px radius; circle (radio).
- Default stroke `#E5E7EB` on white background.
- Selected state: Solid `#134E3A` with sharp white tick icon.

### Listing & Marketplace Cards
- Background `#FFFFFF`, radius 16px (`rounded-lg`), 1px solid `#E5E7EB`, padding 0 with nested image containers maintaining 16px top border radii.
- Media ratio 4:3 with subtle corner overflow clipping.
- Card footers feature concise quantitative tags (e.g., "Verified 98% On-Time" badge in `#ECFDF5` emerald tint with `#059669` text) rather than visual star ratings.

### Trust & Reputation Badges
- No star ratings permitted across listing cards or seller headers.
- Reputation communicated via structured metric tokens:
  - **Certified Marker:** Pill badge, `#ECFDF5` background, `#059669` ink, accompanied by an architectural shield or check emblem.
  - **Experience Quantifiers:** Monospace-aligned numerical counters (e.g., `420+ Orders`, `99.4% Fulfill Rate`) set in `caption` weight.