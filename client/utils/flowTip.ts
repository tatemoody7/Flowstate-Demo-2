import type { ScannedFood } from "@/data/mockData";
import type { HealthTier } from "@/utils/healthTier";

/**
 * Generates a contextual "Flow Tip" for a scanned food product.
 *
 * Examines the full ingredient profile + macros and returns ONE short paragraph
 * (1-2 sentences) with body/mood impact + practical advice.
 *
 * Priority chain: most specific conditions checked first, falling through to general.
 */
export function generateFlowTip(food: ScannedFood, tier: HealthTier): string {
  const ingredients = food.ingredients ?? [];

  // Count flags in a single pass
  let badCount = 0;
  let goodCount = 0;
  let cautionCount = 0;

  for (const ing of ingredients) {
    if (ing.flag === "bad") badCount++;
    else if (ing.flag === "good") goodCount++;
    else if (ing.flag === "caution") cautionCount++;
  }

  // Helper to check if any ingredient name contains a pattern
  const has = (pattern: string | RegExp) =>
    ingredients.some((i) =>
      typeof pattern === "string"
        ? i.name.toLowerCase().includes(pattern)
        : pattern.test(i.name.toLowerCase()),
    );

  const hasArtificialSweetener = has(/sucralose|aspartame|ace-k|acesulfame/);
  const hasDyes = has(/red 40|red 3|yellow 5|yellow 6|blue 1|blue 2|artificial color/);
  const hasSeedOils = [
    "canola oil", "soybean oil", "corn oil", "cottonseed oil",
    "vegetable oil", "safflower oil", "sunflower oil", "rapeseed oil",
  ].filter((oil) => has(oil)).length;
  const hasTransFat = has("hydrogenated");
  const hasNitrite = has(/nitrite|nitrate/);
  const hasCaffeine = has(/caffeine|guarana|coffee/);
  const hasCarrageenan = has("carrageenan");
  const hasMSG = has(/monosodium glutamate|msg|disodium inosinate|disodium guanylate/);
  const hasSyntheticPreservative = has(/tbhq|bha\b|bht\b/);
  const hasRefinedFlour = has(/bleached flour|enriched flour|all purpose flour/);
  const dyeCount = [
    "red 40", "red 3", "yellow 5", "yellow 6", "blue 1", "blue 2", "green 3",
  ].filter((dye) => has(dye)).length;

  // === PRIORITY CHAIN (most specific first) ===

  // 1. Sugar bomb + artificial sweeteners
  if (food.sugar >= 25 && hasArtificialSweetener) {
    return "Sugar and fake sweeteners together — major energy crash incoming. Grab water and a protein source instead.";
  }

  // 2. High sugar + synthetic dyes
  if (food.sugar >= 20 && hasDyes) {
    return "Sugar plus artificial dyes means a spike then a total crash. You'll feel it in about two hours.";
  }

  // 3. Artificial sweeteners + no protein
  if (hasArtificialSweetener && food.protein < 5) {
    return "Artificial sweeteners with barely any protein. Won't keep you full and may spike cravings later.";
  }

  // 4. High protein + low sugar + green tier (best case)
  if (food.protein >= 20 && food.sugar <= 5 && tier === "green") {
    return "High protein, low sugar, clean ingredients — this is gym fuel. Great for muscle recovery and keeping you full.";
  }

  // 5. High protein + green tier (general)
  if (food.protein >= 15 && tier === "green") {
    return "Solid protein content with clean ingredients. Good fuel for focus and recovery.";
  }

  // 6. Trans fats
  if (hasTransFat) {
    return "Contains trans fats — linked to brain fog, breakouts, and slower muscle recovery. Skip it if you can.";
  }

  // 7. Multiple seed oils
  if (hasSeedOils >= 2) {
    return "Multiple processed seed oils in here. That's a lot of inflammation packed into one product.";
  }

  // 8. Sodium nitrite/nitrate (processed meats)
  if (hasNitrite) {
    return "Processed meat preservatives that form harmful compounds when heated. Fine once in a while — not daily.";
  }

  // 9. High sodium
  if (food.sodium >= 800) {
    return "High sodium — you'll feel bloated after this. Drink extra water and balance with potassium-rich foods.";
  }

  // 10. Caffeine + high sugar
  if (hasCaffeine && food.sugar >= 20) {
    return "Caffeine plus all that sugar means a jittery spike then a hard crash. Try black coffee or a sugar-free option.";
  }

  // 11. Red 40 or Red 3 specifically
  if (has("red 40") || has("red 3")) {
    return "Contains Red dye — linked to hyperactivity and restricted in parts of Europe. Check for a cleaner alternative.";
  }

  // 12. Multiple dyes
  if (dyeCount >= 2) {
    return "Multiple artificial dyes in one product. Your body doesn't need any of them — just chemicals for color.";
  }

  // 13. MSG or glutamate enhancers
  if (hasMSG) {
    return "Contains flavor enhancers that can trigger headaches and brain fog in sensitive people. Listen to your body.";
  }

  // 14. High fiber + green tier
  if (food.fiber >= 5 && tier === "green") {
    return "Great fiber content with clean ingredients. Keeps you full longer and your gut happy between meals.";
  }

  // 15. Carrageenan
  if (hasCarrageenan) {
    return "Contains carrageenan — can irritate your gut and cause inflammation. Not ideal before a workout or exam.";
  }

  // 16. Low cal + high sugar (empty energy)
  if (food.calories < 100 && food.sugar >= 10) {
    return "Low calories but loaded with sugar. It's basically empty energy — won't keep you going.";
  }

  // 17. BHA / BHT / TBHQ
  if (hasSyntheticPreservative) {
    return "Contains synthetic preservatives that some countries have restricted. Your body doesn't need the extra chemicals.";
  }

  // 18. High cal + low protein
  if (food.calories > 500 && food.protein < 10) {
    return "Lots of calories but barely any protein. You'll be hungry again fast and won't have much to show for it.";
  }

  // 19. Well-balanced macros + green tier
  if (food.protein >= 10 && food.fat <= 15 && food.fiber >= 3 && tier === "green") {
    return "Well-balanced macros with clean ingredients. This is how you fuel a productive day.";
  }

  // 20. Refined flour
  if (hasRefinedFlour) {
    return "Made with refined flour — stripped of nutrients and spikes blood sugar fast. Whole grain is always better.";
  }

  // 21. Zero fiber + high carbs (crash setup)
  if (food.fiber === 0 && food.carbs >= 30) {
    return "Lots of carbs with no fiber to slow them down. You'll get a fast blood sugar spike then a crash.";
  }

  // 22. High protein but has bad stuff
  if (food.protein >= 15 && badCount > 0) {
    return "Good protein, but the processed ingredients hold it back. Look for a cleaner option with the same macros.";
  }

  // 23. Red tier + many bad ingredients
  if (tier === "red" && badCount >= 4) {
    return "Multiple red flags in the ingredients. Your body has to work overtime to process all of this.";
  }

  // 24. Yellow tier (general)
  if (tier === "yellow") {
    return "Not bad, not great. Fine in a pinch — just don't make it your go-to.";
  }

  // 25. Green tier (general)
  if (tier === "green") {
    return "Clean label with real ingredients. This is what fueling right looks like.";
  }

  // 26. Red tier (general)
  if (tier === "red") {
    return "A few things in here your body doesn't love. Check if there's a cleaner version.";
  }

  // Absolute fallback
  return "Scan the ingredients above to see what's working for you and what's not.";
}
