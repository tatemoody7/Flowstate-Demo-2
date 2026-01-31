# Flowstate - Campus Health Companion

## Overview

Flowstate is a mobile-first application designed to help college students build healthy habits through location-based discovery of health spots, food scanning with nutritional information, and community features. The app targets Gen Z college students, starting with Florida Gulf Coast University (FGCU), and dynamically brands itself with school colors for personalization.

The application is built as a cross-platform React Native app using Expo, with a Node.js/Express backend. It supports iOS, Android, and web platforms from a single codebase.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React Native with Expo SDK 54 (New Architecture enabled)
- **Navigation**: React Navigation v7 with native stack and bottom tab navigators
- **State Management**: React Context API (`AppContext`) for global state, TanStack React Query for server state
- **Styling**: StyleSheet API with a custom theme system (`constants/theme.ts`)
- **Animations**: React Native Reanimated for performant animations
- **Storage**: AsyncStorage for persistent local data (user preferences, saved items)

### Navigation Structure
```
RootStackNavigator
├── AuthStackNavigator (pre-login flow)
│   ├── Welcome
│   ├── SignUp
│   ├── SchoolSelection
│   └── LocationPermission
└── MainTabNavigator (authenticated flow)
    ├── DiscoverTab (DiscoverStackNavigator)
    ├── SavedTab (SavedStackNavigator)
    └── ProfileTab (ProfileStackNavigator)
    + Modal Screens: Scanner, PlaceDetail, FoodDetail
```

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ESBuild for production bundling
- **API Pattern**: RESTful routes prefixed with `/api`
- **Storage**: In-memory storage implementation (`MemStorage`) with interface for future database migration

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect configured
- **Schema Validation**: Zod with drizzle-zod integration
- **Database**: PostgreSQL (configured via `DATABASE_URL` environment variable)
- **Current State**: Schema defined but using in-memory storage; ready for database migration

### Path Aliases
- `@/` → `./client/` (frontend code)
- `@shared/` → `./shared/` (shared types and schemas)

### Key Design Decisions
1. **Monorepo Structure**: Client and server code in single repository with shared types
2. **Mock Data First**: Development uses mock data (`client/data/mockData.ts`) while backend infrastructure is ready
3. **School Branding System**: Theme colors dynamically change based on selected university
4. **Expo Managed Workflow**: Leverages Expo's managed workflow for simplified native development

## External Dependencies

### Core Services
- **Database**: PostgreSQL (Drizzle ORM configured, requires `DATABASE_URL`)
- **Expo Services**: Over-the-air updates, build services

### Native Capabilities
- **Camera**: expo-camera for food barcode scanning
- **Location**: expo-location for nearby place discovery
- **Haptics**: expo-haptics for tactile feedback

### Third-Party Libraries
- **UI Components**: @expo/vector-icons (Feather icons), expo-blur, expo-linear-gradient
- **Image Handling**: expo-image for optimized image loading
- **Fonts**: Google Fonts (Poppins, Inter, Nunito) via expo-font

### Development Tools
- **Type Checking**: TypeScript with strict mode
- **Linting**: ESLint with Expo config + Prettier
- **Database Migrations**: drizzle-kit for schema management