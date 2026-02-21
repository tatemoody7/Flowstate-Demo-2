import { Platform } from "react-native";

export const SchoolColors = {
  fgcu: {
    primary: "#00357a",
    secondary: "#0a714e",
    accent: "#1f80ff",
    name: "Florida Gulf Coast University",
    shortName: "FGCU",
    mascot: "Eagle",
    mascotGreeting: "Eagle",
    mascotEmoji: "eagle",
    emailDomain: "@eagle.fgcu.edu",
  },
};

export const FlowstateColors = {
  // ─── Core Brand (Primary Palette) ─────────────────────────────
  primary: "#00357a",
  secondary: "#0a714e",
  accent: "#1f80ff",

  // ─── Extended Brand (Primary Palette - lighter tones) ─────────
  primaryLight: "#99daff",
  primaryLighter: "#c2eff0",
  primaryLightest: "#e4ffc2",
  cream: "#fff3c2",

  // ─── Surfaces & Backgrounds ───────────────────────────────────
  background: "#F8FAFC",
  backgroundSecondary: "#F3F4F6",
  surface: "#FFFFFF",
  surfaceElevated: "#FFFFFF",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",

  // ─── Text ─────────────────────────────────────────────────────
  textPrimary: "#0F172A",
  textSecondary: "#64748B",
  textTertiary: "#94A3B8",

  // ─── Status / Scan Colors ─────────────────────────────────────
  success: "#10bb82",
  warning: "#f9f19c",
  error: "#f07269",
  info: "#1f80ff",
  healthGreen: "#10bb82",
  healthYellow: "#f9f19c",
  healthRed: "#f07269",

  // ─── Gradients ────────────────────────────────────────────────
  gradientStart: "#00357a",
  gradientEnd: "#0a714e",
  gradientAccent: "#10bb82",

  // ─── Shadows & Overlays ───────────────────────────────────────
  cardShadow: "rgba(0, 53, 122, 0.06)",
  overlay: "rgba(0, 53, 122, 0.4)",
};

const tintColorLight = "#00357a";
const tintColorDark = "#0a714e";

export const Colors = {
  light: {
    text: "#1F2937",
    buttonText: "#FFFFFF",
    tabIconDefault: "#6B7280",
    tabIconSelected: tintColorLight,
    link: "#00357a",
    backgroundRoot: "#FAFBFC",
    backgroundDefault: "#FFFFFF",
    backgroundSecondary: "#F3F4F6",
    backgroundTertiary: "#E5E7EB",
  },
  dark: {
    text: "#ECEDEE",
    buttonText: "#FFFFFF",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    link: "#0a714e",
    backgroundRoot: "#1F2123",
    backgroundDefault: "#2A2C2E",
    backgroundSecondary: "#353739",
    backgroundTertiary: "#404244",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  hero: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700" as const,
    fontFamily: "Poppins_700Bold",
  },
  h1: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700" as const,
    fontFamily: "Poppins_700Bold",
  },
  h2: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600" as const,
    fontFamily: "Poppins_600SemiBold",
  },
  h3: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600" as const,
    fontFamily: "Poppins_600SemiBold",
  },
  h4: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600" as const,
    fontFamily: "Poppins_600SemiBold",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
    fontFamily: "Inter_400Regular",
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400" as const,
    fontFamily: "Inter_400Regular",
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500" as const,
    fontFamily: "Inter_500Medium",
  },
  button: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600" as const,
    fontFamily: "Inter_600SemiBold",
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
    fontFamily: "Inter_400Regular",
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Shadows = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  fab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
};
