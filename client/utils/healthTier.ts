import { FlaggedIngredient } from "@/data/mockData";
import { FlowstateColors } from "@/constants/theme";

// ─── Health Tier System ──────────────────────────────────────────────────────
// Banner color is determined by WHICH ingredient flags are present:
//   Green ("Solid Pick"):  Has good ingredients, NO bad ones (caution is fine)
//   Yellow ("Not Bad"):    Has only caution ingredients (no good, no bad)
//   Red ("Be Honest"):     Has ANY bad ingredients
//   Default:               No flagged ingredients / all neutral → green ("Solid Pick")

export type HealthTier = "green" | "yellow" | "red";

export interface HealthTierResult {
  tier: HealthTier;
  color: string;
  label: string;
  subtitle: string;
  icon: "check-circle" | "alert-circle" | "x-circle";
}

const TIER_CONFIG: Record<HealthTier, Omit<HealthTierResult, "tier">> = {
  green: {
    color: FlowstateColors.healthGreen,
    label: "Solid Pick",
    subtitle: "Clean ingredients. You're fueling right.",
    icon: "check-circle",
  },
  yellow: {
    color: FlowstateColors.healthYellow,
    label: "Not Bad",
    subtitle: "A few things to keep in mind.",
    icon: "alert-circle",
  },
  red: {
    color: FlowstateColors.healthRed,
    label: "Be Honest",
    subtitle: "Your future self would pick something else.",
    icon: "x-circle",
  },
};

/**
 * Determine health tier based on ingredient flags only.
 *
 * Logic:
 *   - Has ANY bad → red
 *   - Has good (no bad) → green  (caution alongside good is still green)
 *   - Has only caution (no good, no bad) → yellow
 *   - All neutral / no flagged ingredients → green ("Solid Pick")
 */
export function getHealthTier(
  ingredients?: FlaggedIngredient[],
): HealthTierResult {
  let hasBad = false;
  let hasGood = false;
  let hasCaution = false;

  if (ingredients && ingredients.length > 0) {
    for (const ing of ingredients) {
      if (ing.flag === "bad") hasBad = true;
      else if (ing.flag === "good") hasGood = true;
      else if (ing.flag === "caution") hasCaution = true;
    }
  }

  let tier: HealthTier;

  if (hasBad) {
    tier = "red";
  } else if (hasGood) {
    // Good + caution (no bad) = still green
    tier = "green";
  } else if (hasCaution) {
    // Only caution, no good, no bad = yellow
    tier = "yellow";
  } else {
    // All neutral / unrecognized ingredients — clean product, grade green
    tier = "green";
  }

  return { tier, ...TIER_CONFIG[tier] };
}

/**
 * Get just the color for a food item (used by FoodCard, ScannerScreen).
 */
export function getHealthTierColor(
  ingredients?: FlaggedIngredient[],
): string {
  return getHealthTier(ingredients).color;
}
