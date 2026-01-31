# Flowstate - Campus Health Companion Design Guidelines

## Brand Identity

**Purpose**: Flowstate empowers college students to make healthier lifestyle choices through location-based discovery, food scanning, and community. It bridges the gap between student budgets and healthy living.

**Aesthetic Direction**: **Bold/Energetic with Trust** - Vibrant gradients and dynamic animations that appeal to Gen Z, balanced with clean information architecture that builds credibility. Think "Instagram meets health tracker" - modern, youth-focused, but not frivolous.

**Memorable Element**: Dynamic school color integration. The entire app rebrands to match your university's colors, creating instant school pride and personalization.

## Navigation Architecture

**Root Navigation**: Tab Navigation (4 tabs + Floating Action Button)
- **Discover** (Home) - Location-based health spots
- **Scanner** (FAB - Floating Action Button) - Food scanner
- **Saved** - Bookmarked places/foods
- **Profile** - Account settings, school selection

**Pre-Auth Flow**: Stack-only (Splash → Sign Up → School Selection → Location Permission)

## Screen-by-Screen Specifications

### 1. Splash Screen
- **Purpose**: App launch, brand introduction
- **Layout**: 
  - Centered logo with school colors gradient
  - Tagline: "Your Campus Health Companion"
  - No header, full screen
- **Components**: Logo illustration, animated gradient background

### 2. Sign Up Screen
- **Purpose**: Student email verification
- **Layout**:
  - Transparent header, back button (left)
  - Form: Email input (@eagle.fgcu.edu validation), Password input, Confirm Password, Submit button below form
  - Safe area: top = insets.top + 16px, bottom = insets.bottom + 16px
- **Components**: Text inputs, primary button, SSO options (Apple, Google)

### 3. School Selection Screen
- **Purpose**: Choose university for color branding
- **Layout**:
  - Default header: "Choose Your School"
  - Scrollable list of university cards with logo, name, colors preview
  - Safe area: top = 16px, bottom = insets.bottom + 16px
- **Components**: Searchable list, university cards (show school colors)

### 4. Location Permission Screen
- **Purpose**: Request location access
- **Layout**:
  - Centered illustration showing map with health icons
  - Heading: "Find Healthy Spots Nearby"
  - Body: Benefits of location access
  - Two buttons: "Allow Location" (primary), "Enter Manually" (secondary)
- **Components**: Illustration, buttons, skip option

### 5. Discover Tab (Home)
- **Purpose**: Browse healthy restaurants, gyms, grocery stores
- **Layout**:
  - Custom header: gradient background with school colors, search bar, filter icon (right)
  - Scrollable content: Category chips (Restaurants, Gyms, Groceries), location cards in grid
  - Safe area: top = 16px, bottom = tabBarHeight + 16px
- **Components**: Search bar, horizontal scroll chips, location cards (image, name, distance, student discount badge, star rating)
- **Empty State**: "empty-discover.png" - illustration of magnifying glass over campus map

### 6. Scanner Tab (Modal)
- **Purpose**: Scan food items for nutrition/price info
- **Layout**:
  - Camera view full screen
  - Overlay: scanning frame, close button (top left), gallery icon (bottom right)
  - Post-scan: Card overlay with nutrition facts, price comparison, health score
- **Components**: Camera view, scanning animation, result card
- **Empty State**: "camera-prompt.png" - illustration of phone scanning barcode

### 7. Saved Tab
- **Purpose**: View bookmarked locations and scanned foods
- **Layout**:
  - Default header: "Saved", segmented control (Places/Foods)
  - Scrollable list of saved items
  - Safe area: top = 16px, bottom = tabBarHeight + 16px
- **Components**: Segmented control, list cards
- **Empty State**: "empty-saved.png" - illustration of bookmark icon with heart

### 8. Profile Tab
- **Purpose**: Account settings, school switching, preferences
- **Layout**:
  - Custom header: gradient background, edit button (right)
  - Avatar, name, school badge
  - Scrollable settings sections: Account, School, Preferences, About
  - Safe area: top = 16px, bottom = tabBarHeight + 16px
- **Components**: Avatar, settings list items, logout button (bottom)

### 9. Location Detail Screen (Modal)
- **Purpose**: View full info for a restaurant/gym/store
- **Layout**:
  - Hero image header, back button (top left), bookmark button (top right)
  - Scrollable content: Name, distance, hours, student discount details, reviews, map
  - Floating CTA: "Get Directions"
- **Components**: Image carousel, info sections, map embed, CTA button with shadow

### 10. Food Detail Screen (Modal)
- **Purpose**: View scanned food nutrition and price comparison
- **Layout**:
  - Product image header, close button (top left)
  - Scrollable content: Nutrition facts chart, health score, price comparison table, save button
- **Components**: Nutrition visualization, price comparison cards

## Color Palette

**Primary Colors** (FGCU, adaptable per school):
- Primary: `#0A3D62` (FGCU Blue)
- Secondary: `#00A651` (FGCU Green)
- Accent: `#FFB81C` (FGCU Gold)

**Base Colors**:
- Background: `#FAFBFC`
- Surface: `#FFFFFF`
- Border: `#E5E7EB`

**Text Colors**:
- Primary: `#1F2937`
- Secondary: `#6B7280`
- Tertiary: `#9CA3AF`

**Semantic Colors**:
- Success: `#10B981`
- Warning: `#F59E0B`
- Error: `#EF4444`
- Info: `#3B82F6`

**Health Score Gradient**: Green (#10B981) to Yellow (#F59E0B) to Red (#EF4444)

## Typography

**Font Families**:
- Headlines: Poppins Bold (Google Font)
- Subheadings: Poppins SemiBold
- Body/UI: Inter Regular/Medium (Google Font)

**Type Scale**:
- Hero: 32px/40px, Poppins Bold
- H1: 24px/32px, Poppins Bold
- H2: 20px/28px, Poppins SemiBold
- H3: 18px/26px, Poppins SemiBold
- Body: 16px/24px, Inter Regular
- Body Small: 14px/20px, Inter Regular
- Caption: 12px/16px, Inter Medium
- Button: 16px/24px, Inter SemiBold

## Visual Design

- **Gradients**: Use school primary + secondary colors for headers, hero sections
- **Cards**: 12px border radius, 1px solid border (#E5E7EB), no shadow
- **Buttons**: 8px border radius, pressed state darkens 10%
- **Icons**: Lucide React, 20px default, use secondary color for active states
- **Animations**: Subtle fade-ins (200ms), smooth transitions (300ms ease-in-out)
- **Floating Action Button**: 56px diameter, accent color, shadow (0px 4px 8px rgba(0,0,0,0.15))

## Assets to Generate

1. **icon.png** - App icon: Stylized "F" with gradient (primary → secondary), eagle wing motif
2. **splash-icon.png** - Same as icon.png but larger for splash screen
3. **empty-discover.png** - Magnifying glass over campus map with health icons | WHERE USED: Discover tab empty state
4. **camera-prompt.png** - Hand holding phone scanning barcode | WHERE USED: Scanner tab initial state
5. **empty-saved.png** - Bookmark with heart, soft gradient background | WHERE USED: Saved tab empty state
6. **location-permission.png** - Isometric campus map with location pin and health icons | WHERE USED: Location permission screen
7. **avatar-default.png** - Friendly abstract avatar in school colors | WHERE USED: Profile tab, default user avatar
8. **fgcu-logo.png** - FGCU eagle logo | WHERE USED: School selection screen
9. **health-score-badge.png** - Shield icon with checkmark | WHERE USED: Food detail cards