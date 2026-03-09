import { FlaggedIngredient } from "@/data/mockData";
import { FlowstateColors } from "@/constants/theme";

// ─── Health Tier System ──────────────────────────────────────────────────────
// Banner color uses proportion-based grading when bad ingredients exist:
//   Green ("Solid Pick"):  No bad ingredients. Has good, or all neutral.
//   Yellow ("Not Bad"):    Only caution (no good/bad), OR has bad but ≤30% of flagged.
//   Red ("Be Honest"):     Has bad ingredients making up >30% of all flagged ingredients.
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
 * Determine health tier using proportion-based grading.
 *
 * Logic:
 *   - Zero bad ingredients:
 *       • Has good → green  (caution alongside good is still green)
 *       • Only caution (no good) → yellow
 *       • All neutral / no flagged → green
 *   - Has bad ingredients — use ratio of bad to total flagged:
 *       • badRatio > 30% → red  ("Be Honest")
 *       • badRatio ≤ 30% → yellow ("Not Bad")
 */
export function getHealthTier(
  ingredients?: FlaggedIngredient[],
): HealthTierResult {
  let badCount = 0;
  let goodCount = 0;
  let cautionCount = 0;

  if (ingredients && ingredients.length > 0) {
    for (const ing of ingredients) {
      if (ing.flag === "bad") badCount++;
      else if (ing.flag === "good") goodCount++;
      else if (ing.flag === "caution") cautionCount++;
    }
  }

  let tier: HealthTier;

  if (badCount === 0) {
    // No bad ingredients
    if (goodCount > 0) {
      tier = "green"; // Good + caution (no bad) = green
    } else if (cautionCount > 0) {
      tier = "yellow"; // Only caution, no good, no bad = yellow
    } else {
      tier = "green"; // All neutral / unrecognized = clean, grade green
    }
  } else {
    // Has bad ingredients — use ratio-based logic
    const totalFlagged = badCount + goodCount + cautionCount;
    const badRatio = badCount / totalFlagged;

    if (badRatio > 0.3) {
      tier = "red"; // >30% bad = Be Honest
    } else {
      tier = "yellow"; // ≤30% bad = Not Bad (e.g. 1 bad among 14 good)
    }
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
