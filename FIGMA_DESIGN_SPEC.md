# FLOWSTATE — Complete Design Specification
## For Figma Design Generation

---

## APP OVERVIEW
**Name:** Flowstate
**Tagline:** "Find Your Flow"
**Platform:** iOS / Android (React Native + Expo)
**Target:** Disciplined, driven college students who train hard, eat smart, and move with intention
**Personality:** Confident, efficient, modern. No fluff. Structured for speed.
**Design Mode:** Light mode first (primary experience)

---

## BRAND IDENTITY

### Logo System
- **Primary mark:** "FLO" geometric wordmark (BARON font, distinctive O with line through it)
- **App icon:** Navy rounded square with L-shaped stacked pill bars
- **Script mark:** "Flowstate" in Yellowtail — merch/marketing/splash only, NOT in UI
- **Brand element:** 5-band gradient bars (navy → blue → sky → mint → light green) — used at key moments only: Welcome screen, health badges, headers

### Logo Colors for Gradient Bars
1. #00357a (navy)
2. #1f80ff (blue)
3. #99daff (sky)
4. #10bb82 (mint)
5. #e4ffc2 (light green)

---

## COLOR PALETTE

### Primary (Core Brand)
| Token | Hex | Usage |
|-------|-----|-------|
| primary | #00357a | Headers, primary actions, nav backgrounds |
| secondary | #0a714e | Secondary actions, success adjacent |
| accent | #1f80ff | Interactive elements, links, active states |

### Extended Brand (Lighter Tones)
| Token | Hex | Usage |
|-------|-----|-------|
| primaryLight | #99daff | Highlights, selected states |
| primaryLighter | #c2eff0 | Subtle backgrounds, card tints |
| primaryLightest | #e4ffc2 | Light mode card fills, soft accents |
| cream | #fff3c2 | Warm highlights, discount badges |

### Surfaces & Backgrounds
| Token | Hex | Usage |
|-------|-----|-------|
| background | #F8FAFC | App background |
| backgroundSecondary | #F3F4F6 | Section backgrounds, inactive states |
| surface | #FFFFFF | Card backgrounds |
| border | #E2E8F0 | Card borders, dividers |
| borderLight | #F1F5F9 | Subtle separators |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| textPrimary | #0F172A | Headlines, primary content |
| textSecondary | #64748B | Subtitles, descriptions |
| textTertiary | #94A3B8 | Placeholders, hints, captions |

### Health / Scan Colors
| Token | Hex | Label | Usage |
|-------|-----|-------|-------|
| healthGreen | #10bb82 | "Solid Pick" | Good ingredients, no bad |
| healthYellow | #f9f19c | "Not Bad" | Caution ingredients only |
| healthRed | #f07269 | "Be Honest" | Has bad ingredients |

### Status Colors
| Token | Hex | Usage |
|-------|-----|-------|
| success | #10bb82 | Success states |
| warning | #f9f19c | Warning states |
| error | #f07269 | Error states, destructive actions |
| info | #1f80ff | Informational |

### Gradients
- **Primary gradient:** #00357a → #0a714e (diagonal, top-left to bottom-right)
- **Gradient with accent:** #00357a → #1f80ff → #0a714e

### Shadows & Overlays
| Token | Value | Usage |
|-------|-------|-------|
| cardShadow | rgba(0, 53, 122, 0.06) | Card elevation |
| overlay | rgba(0, 53, 122, 0.4) | Modal overlays |

---

## TYPOGRAPHY

### Font Families
| Role | Font | Notes |
|------|------|-------|
| Logo | BARON | Geometric display, distinctive O. Logo/wordmark ONLY |
| Script/Merch | Yellowtail | Cursive. Merch and marketing ONLY |
| Headlines | Garet Bold | NEW — clean geometric sans, pairs with BARON |
| Subheadings | Garet SemiBold | NEW |
| Body/UI | Garet Regular | NEW — replaces Inter for body text |
| Buttons | Garet SemiBold | NEW |

### Font Weight Rules (MAX 3 WEIGHTS)
| Weight | Value | Usage |
|--------|-------|-------|
| Bold | 700 | Headers (hero, h1, h2) only |
| SemiBold | 600 | Subheadings (h3, h4), buttons, labels |
| Regular | 400 | Body text, descriptions, links |
| ~~Medium~~ | ~~500~~ | ~~REMOVED — too close to Regular~~ |

### Type Scale
| Name | Size/Line | Weight | Usage |
|------|-----------|--------|-------|
| Hero | 32px/40px | Bold 700 | Welcome screen title |
| H1 | 24px/32px | Bold 700 | Screen titles, major headers |
| H2 | 20px/28px | SemiBold 600 | Section headers |
| H3 | 18px/26px | SemiBold 600 | Card titles, sub-sections |
| H4 | 16px/24px | SemiBold 600 | Small headers, labels |
| Body | 16px/24px | Regular 400 | Main content text |
| Small | 14px/20px | Regular 400 | Secondary info, descriptions |
| Caption | 12px/16px | SemiBold 600 | Badges, tags, timestamps |
| Button | 16px/24px | SemiBold 600 | Button labels |

---

## SPACING SYSTEM

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight gaps, icon padding |
| sm | 8px | Small gaps, inline spacing |
| md | 12px | Medium gaps, card internal |
| lg | 16px | Standard padding, card gaps |
| xl | 20px | Section padding |
| 2xl | 24px | Large section gaps |
| 3xl | 32px | Major section breaks |
| 4xl | 40px | Screen-level spacing |
| 5xl | 48px | Hero spacing |

### Component Heights
| Component | Height |
|-----------|--------|
| Input field | 48px |
| Button | 52px |
| Tab bar | ~80px (including safe area) |
| Search bar | 52px |
| Category chip | 36px |

---

## BORDER RADIUS

| Token | Value | Usage |
|-------|-------|-------|
| xs | 8px | Small buttons, inputs |
| sm | 12px | Standard cards, buttons |
| md | 18px | Medium cards |
| lg | 24px | Large cards |
| xl | 30px | Feature cards |
| 2xl | 40px | Pill shapes, tab bar |
| full | 9999px | Circles, chips, badges |

---

## SHADOWS

| Level | Offset | Opacity | Radius | Usage |
|-------|--------|---------|--------|-------|
| Small | 0, 2 | 0.08 | 4px | Subtle cards |
| Medium | 0, 4 | 0.12 | 8px | Elevated cards, search bar |
| Large | 0, 8 | 0.15 | 16px | Modals, floating elements |
| FAB | 0, 4 | 0.15 | 8px | Scan button |

---

## ICON SYSTEM
- **Library:** Lucide (successor to Feather, bolder strokes) — SWITCHING from Feather
- **Default size:** 20px
- **Sizes:** 12px (badges), 16px (inline), 20px (standard), 24px (headers), 28px (hero)
- **Color:** textSecondary for inactive, primary for active states
- **Style:** Consistent 2px stroke weight, rounded caps

### Key Icons by Screen
| Context | Icon | Size |
|---------|------|------|
| Discover tab | compass | 24px |
| Scan tab (FAB) | camera | 24px |
| Profile tab | user | 24px |
| Search | search | 20px |
| Filter/Sort | sliders-horizontal | 20px |
| Back | chevron-left | 24px |
| Close | x | 24px |
| Save/Heart | heart | 20px |
| Star rating | star | 14px |
| Location | map-pin | 16px |
| Clock/Hours | clock | 16px |
| Navigation | navigation | 16px |
| Phone | phone | 20px |
| Website | globe | 20px |
| Directions | navigation-2 | 20px |
| Settings chevron | chevron-right | 20px |
| Logout | log-out | 20px |

---

## COMPONENT SPECIFICATIONS

### Floating Pill Tab Bar
- **Style:** Detached from bottom edge, centered horizontally
- **Shape:** Pill/rounded rectangle (BorderRadius.2xl = 40px)
- **Background:** Frosted glass (BlurView, intensity 80-100, light tint)
- **Border:** 1px rgba(255,255,255,0.2)
- **Margin bottom:** safe area + 8px
- **Margin horizontal:** 24px each side
- **Height:** 60px (content area, excluding safe area)
- **Tabs:** 3 — Discover (compass) | Scan FAB (camera) | Profile (user)
- **Active indicator:** Primary color icon + label below
- **Inactive:** textSecondary color icon, no label
- **Scan FAB button:** 56px diameter circle, gradient fill (primary → accent), elevated with FAB shadow, sits ABOVE the pill bar by ~12px

### Cards (Place & Food)
- **Background:** surface (#FFFFFF)
- **Border:** 1px solid border (#E2E8F0)
- **Border radius:** BorderRadius.sm (12px)
- **Padding:** Spacing.lg (16px)
- **Shadow:** Shadows.small

### PlaceCard (Compact List — NEW LAYOUT)
- **Height:** ~80px
- **Layout:** Horizontal row
- **Left:** Thumbnail image 60x60, border-radius 8px
- **Right:** Content stack
  - Row 1: Name (H4, textPrimary) + Heart icon (right aligned)
  - Row 2: Category badge + Price level ($-$$$$)
  - Row 3: Distance (map-pin icon + text) | Rating (star icon + number)
- **3-4 cards visible** on screen at once

### FoodCard (Compact)
- **Height:** ~90px
- **Layout:** Horizontal row
- **Left:** Product image 60x60, border-radius 8px
- **Right:** Content stack
  - Row 1: Name (H4) + Health score badge (28px circle, colored)
  - Row 2: Brand (Small, textSecondary)
  - Row 3: Calories + Protein (Caption)

### Health Score Badge
- **Shape:** Circle, 28px diameter (in cards), 70px diameter (in detail)
- **Background:** Health tier color at 20% opacity
- **Text:** Health score number, Bold, health tier color
- **Border:** 2px solid health tier color

### Category Chip
- **Shape:** Pill (BorderRadius.full)
- **Height:** 36px
- **Padding:** 16px horizontal
- **Unselected:** surface bg, 1.5px border, textSecondary text
- **Selected:** Gradient fill (primary → secondary), white text, shadow glow

### Button
- **Height:** 52px
- **Border radius:** 12px (BorderRadius.sm)
- **Primary:** primary (#00357a) bg, white text
- **Secondary:** secondary (#0a714e) bg, white text
- **Outline:** transparent bg, primary border, primary text
- **Text:** Garet SemiBold 16px
- **Press animation:** Scale to 0.98 with spring

### Search Bar
- **Height:** 52px
- **Background:** surface with medium shadow
- **Border radius:** BorderRadius.xl (30px)
- **Left icon:** search (textSecondary)
- **Right:** Optional filter button (52x52 square)
- **Placeholder:** textTertiary

### Glassmorphism Card (for overlays/headers)
- **Background:** BlurView, intensity 20, light tint
- **Border:** 1px rgba(255,255,255,0.2)
- **Border radius:** BorderRadius.xl (30px)
- **Usage:** Welcome screen features, scanner result overlay, Place Detail content area

### Quick-Glance Nutrition Bar (NEW)
- **Layout:** Single horizontal bar showing macro proportions
- **Height:** 12px bar + labels below
- **Segments:** Protein (green) | Carbs (blue) | Fat (orange/cream)
- **Width proportional** to calorie contribution of each macro
- **Labels below:** "P: 12g | C: 45g | F: 8g" in Caption style
- **Total calories** displayed above bar in H4

---

## SCREEN SPECIFICATIONS

### Device Frame
- **iPhone 15 Pro:** 393 x 852px
- **Status bar:** 54px from top
- **Safe area top:** 59px
- **Safe area bottom:** 34px

---

### Screen 1: Welcome Screen
**Purpose:** First impression, brand introduction
**Background:** Full-bleed LinearGradient (primary #00357a → accent #1f80ff → secondary #0a714e, diagonal)
**NO decorative circles** — clean gradient only

**Layout (top to bottom):**
1. **Logo** (top section, centered)
   - Glowing circle container: 110x110px, rgba(255,255,255,0.2) bg, 2px white border
   - FlowstateLogo icon inside: 52px, white
   - Glow shadow: secondary color, 30px radius
2. **Text** (center)
   - "Flowstate" — Hero type (42px, white, -1 letter spacing)
   - "Nail the essentials. Unlock your flow." — H3, white 90% opacity
3. **Feature cards** (3 stacked, glassmorphism)
   - Each: BlurView card, horizontal row
   - Left: 50px gradient circle with icon (white, 22px)
   - Right: Title (H4, white, bold) + Description (Small, white 75% opacity)
   - Cards: "Find Your Spots" (map-pin), "Scan & Know" (camera), "Lock In Daily" (zap)
4. **CTA** (bottom)
   - "Get Started" button — white bg, primary text color, full width, shadow
   - "Already have an account? Sign In" — white text, 70% opacity

**Animations:** Staggered FadeInDown/FadeInUp with spring

---

### Screen 2: Sign Up Screen
**Purpose:** Student email registration
**Background:** backgroundRoot (#FAFBFC)

**Layout:**
1. **Header** — "Create Account" (H1) + "Join your campus health community" (Body, textSecondary)
2. **Form fields** (3)
   - Email: mail icon, ".edu email required" hint
   - Password: lock icon, eye toggle, "Minimum 8 characters" hint
   - Confirm Password: lock icon, eye toggle
   - Each: 48px height, surface bg, border, sm radius, 16px icon left
3. **Continue button** — full width, primary
4. **Divider** — "or" with lines
5. **Social buttons** — Apple + Google, outline variant, icon + text
6. **Footer** — Terms of Service + Privacy Policy links (primary color)

---

### Screen 3: School Selection Screen
**Purpose:** Choose university for color branding
**Background:** backgroundRoot

**Layout:**
1. **Header** — "Choose Your School" (H1) + subtitle + SearchBar
2. **School cards** (scrollable FlatList)
   - Each card: Horizontal row
   - Left: Color preview circle (48px outer, 24px inner with secondary color)
   - Center: School name (H4) + Short name (Small)
   - Right: Checkmark (28px circle, school primary) when selected
   - Bottom: Color bar (4px) showing primary/secondary/accent
   - Coming soon schools: 55% opacity, "Coming Soon" badge
3. **Footer** — "Continue" button, disabled until selection

---

### Screen 4: Location Permission Screen
**Purpose:** Request location access
**Background:** backgroundRoot

**Layout:**
1. **Illustration** — 200x200px centered image
2. **Title** — "Find Healthy Spots Nearby" (H1)
3. **Description** — body text explaining benefits
4. **Benefit rows** (2)
   - Each: surface bg, border, row layout
   - Left: 48px circle with icon (primaryLighter bg)
   - Right: Title + description text
5. **Buttons** (bottom)
   - "Allow Location" — primary button, full width
   - "Maybe Later" — text link, textSecondary with underline

---

### Screen 5: Discover Screen (HOME TAB) — REDESIGNED
**Purpose:** Browse nearby healthy places
**Background:** backgroundRoot

**Layout:**
1. **Search bar** (TOP — no greeting, search-first for efficiency)
   - SearchBar component with filter icon
   - Sticky at top
2. **Category chips** (horizontal scroll)
   - All | Restaurants | Gyms | Groceries
   - Gradient fill when selected, outline when not
3. **Sort indicator** (when active sort applied)
   - Small badge showing current sort
4. **Compact place list** (FlatList — NEW COMPACT LAYOUT)
   - PlaceCard compact: 80px height, thumbnail left, info right
   - 3-4 visible at once
   - FadeInDown stagger animation (50ms per card)
5. **Empty state** — EmptyState component with illustration

**Bottom:** Floating pill tab bar with blur

---

### Screen 6: Scanner Screen (MODAL)
**Purpose:** Barcode scanning + food lookup
**Background:** Black (#000) when camera active

**Layout:**
1. **Camera view** — full screen
2. **Top controls** — Close (X) button top-left, "Scan" title center
3. **Scan frame** — Centered at 30% from top, corner brackets in secondary color, 30x30 corners
4. **Instructions** — "Point your camera at a food barcode" at bottom 35%

**States:**
- **Loading:** Pulse circle (64px) with loading text
- **Error:** Card at bottom with icon, title, description, retry + manual entry buttons
- **Result card** (bottom sheet, max 90% height):
  - Health color banner at top (full width, health tier color)
  - Icon + reaction text from coach (scan reactions only)
  - Product: image (60x60) + name + brand + save heart
  - NEW: Quick-glance nutrition bar (horizontal macro split)
  - Ingredient summary chips (good/caution/flagged counts)
  - Nutrition details (fiber, sugar, sodium) in list
  - Ingredients section with colored chips
  - "Scan Another" button at bottom

---

### Screen 7: Food Detail Screen (MODAL)
**Purpose:** Full nutrition + ingredient analysis
**Background:** backgroundRoot

**Layout:**
1. **Header bar** — Close (X), title, save heart button
2. **Product** — Image (140x140 centered), name (H1), brand (Body)
3. **Health score card** — 70px circle with score, colored border, tier label
4. **NEW: Quick-glance nutrition bar** — Horizontal macro proportions
5. **Nutrition grid** — 2x2 (Calories, Protein, Carbs, Fat), surface bg cards
6. **Extended nutrition** — Fiber, Sugar, Sodium in list format
7. **Ingredients section** — Flagged ingredient chips
   - Green border + bg: good ingredients
   - Red border + bg: bad ingredients
   - Yellow border + bg: caution ingredients
   - Each chip shows name + reason tooltip
8. **Save button** — full width, primary

---

### Screen 8: Place Detail Screen (MODAL)
**Purpose:** Full place information
**Background:** backgroundRoot

**Layout:**
1. **Hero image** — 280px height, full width
2. **Overlay buttons** — Back (top-left), Save heart (top-right), rgba overlay
3. **Content section** — Rounded top (negative margin overlapping hero), surface bg
4. **Category badge** — Pill with icon + text, primaryLight bg
5. **Title + rating** — Name (H1), star rating, review count
6. **Price level** — Dollar signs
7. **Student discount card** (if applicable) — cream bg, secondary border, tag icon
8. **Info items** (3 rows):
   - map-pin: Address/Nearest Location
   - clock: Hours
   - navigation: Distance
   - Each: 48px icon circle (primaryLighter bg) + text
9. **Description** — Body text
10. **Floating CTA bar** (bottom, sticky):
    - Phone button (52x52, outline)
    - Website button (52x52, outline)
    - "Get Directions" button (flex 1, primary)

---

### Screen 9: Profile Screen (TAB)
**Purpose:** User account, saved items, settings
**Background:** backgroundRoot

**Layout:**
1. **Avatar section** — 80x80 circle, school badge overlay
2. **User info** — Name (H2), email (Body, textSecondary)
3. **Stats row** — Saved Places count | divider | Saved Foods count
4. **Segmented control** — Foods / Places tabs
   - Active: surface bg, textPrimary
   - Inactive: backgroundSecondary, textSecondary
5. **Saved items list** — FoodCard or PlaceCard based on tab, or empty state
6. **School info card** — Shows school name + color preview circles
7. **Settings section** — List items with icon + label + chevron-right
   - Notifications, Location, Appearance
8. **About section** — Help & Support, Privacy Policy, Terms
9. **Logout button** — error color text, error 10% opacity bg
10. **Version** — "Flowstate v1.0.0" caption

---

### Screen 10: Saved Screen (used inside Profile)
**Purpose:** View bookmarked places and foods
**Background:** backgroundRoot

**Layout:**
1. **Segmented control** — Places (count) / Foods (count)
2. **Card list** — PlaceCard or FoodCard based on active tab
3. **Empty state** — Illustration + "Start exploring!" / "Scan your first food!"
4. **Pull to refresh**

---

## ANIMATION PATTERNS

| Animation | Usage | Config |
|-----------|-------|--------|
| FadeInDown | Cards entering list | delay: index * 50-100ms, duration: 300-400ms |
| FadeInUp | Bottom content, CTAs | delay: 500-900ms, duration: 600ms |
| FadeIn | Overlays, backgrounds | duration: 300ms |
| Spring scale | Press interactions | scale: 0.98, damping: 15, mass: 0.3, stiffness: 150 |
| Spring scale (chip) | Category chip press | scale: 0.95 |

---

## DESIGN DECISIONS SUMMARY

1. ✅ New color palette (#00357a navy system)
2. ✅ Full glassmorphism redesign (frosted glass on overlays/headers, NOT every card)
3. ✅ 3-tab navigation (Discover / Scan FAB / Profile)
4. ✅ Garet font (replaces Poppins + Inter)
5. ✅ BARON logo font (unchanged)
6. ✅ Floating pill tab bar with blur
7. ✅ Compact Discover list (3-4 items visible)
8. ✅ Light mode first
9. ✅ Gradient bars at key moments only (Welcome, health badges, headers)
10. ✅ Coach appears on scan reactions only
11. ✅ No decorative circles on Welcome — clean gradient
12. ✅ 3 font weights only (Bold, SemiBold, Regular — no Medium)
13. ✅ Scan FAB pops bigger, elevated, gradient fill
14. ✅ Quick-glance nutrition bar (horizontal macro split)
15. ✅ Discover: search-first, no greeting text
16. ✅ Lucide icons (bolder than Feather)
17. ✅ Health labels: "Solid Pick" / "Not Bad" / "Be Honest" (keeping originals)
18. ✅ Card borders kept (1px solid #E2E8F0)

---

## EXISTING DATA FOR MOCKUPS

### Sample Places (use in Discover mockup)
1. Crisp & Green — Restaurant, 4.7★, 1.2 mi, $$, Student discount: 15% off
2. FGCU Rec Center — Gym, 4.5★, 0.3 mi, Free
3. Publix — Grocery, 4.4★, 3.0 mi, $$
4. Chipotle — Restaurant, 4.3★, 2.1 mi, $
5. Planet Fitness — Gym, 4.1★, 4.5 mi, $

### Sample Foods (use in Scanner/Food Detail mockup)
1. Greek Yogurt (Chobani) — Score: 85, 150cal, 15g protein — "Solid Pick" GREEN
2. Frosted Flakes (Kellogg's) — Score: 35, 130cal, 1g protein — "Be Honest" RED
3. Protein Bar (RXBAR) — Score: 72, 210cal, 12g protein — "Not Bad" YELLOW

### School (FGCU)
- Full name: Florida Gulf Coast University
- Short: FGCU
- Mascot: Eagle
- Colors: #00357a / #0a714e / #1f80ff
