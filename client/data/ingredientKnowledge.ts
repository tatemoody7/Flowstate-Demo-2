import type { FlaggedIngredient } from "@/data/mockData";

// =============================================================================
// BAD INGREDIENTS (Red) — Unhealthy
// =============================================================================
export const BAD_INGREDIENTS: { pattern: string; reason: string }[] = [
  // --- Artificial Sweeteners ---
  { pattern: "acesulfame potassium", reason: "Fake sweetener — can mess with your gut" },
  { pattern: "acesulfame k", reason: "Fake sweetener — can mess with your gut" },
  { pattern: "ace-k", reason: "Fake sweetener — can mess with your gut" },
  { pattern: "aspartame", reason: "Artificial sweetener — controversial for a reason" },
  { pattern: "sucralose", reason: "Fake sweetener — may throw off your gut bacteria" },

  // --- Refined Sugars ---
  { pattern: "high fructose corn syrup", reason: "Liquid sugar bomb — spikes blood sugar fast" },
  { pattern: "hfcs", reason: "High fructose corn syrup — major red flag" },
  { pattern: "corn syrup", reason: "Cheap refined sugar — spikes your blood sugar" },
  { pattern: "beet sugar", reason: "Refined sugar — usually GMO too" },
  { pattern: "brown sugar", reason: "Just white sugar with molasses sprinkled back" },
  { pattern: "cane sugar", reason: "Still refined sugar at the end of the day" },
  { pattern: "cane juice", reason: "Fancy name for sugar" },
  { pattern: "evaporated cane", reason: "Fancy name for sugar" },
  { pattern: "sucrose", reason: "Plain table sugar" },
  { pattern: "dextrose", reason: "Fast-acting sugar — spikes blood sugar quick" },
  { pattern: "dextrin", reason: "Processed starch filler" },
  { pattern: "fructose", reason: "Simple sugar — too much isn't great for your liver" },
  { pattern: "glucose syrup", reason: "Processed liquid sugar" },
  { pattern: "granulated sugar", reason: "Straight-up refined sugar" },
  { pattern: "invert sugar", reason: "Processed sugar mix — no better than regular" },
  { pattern: "liquid sugar", reason: "Sugar in liquid form — absorbs fast" },
  { pattern: "malt extract", reason: "Sugar-heavy barley extract" },
  { pattern: "maltitol", reason: "Sugar alcohol — can wreck your stomach" },
  { pattern: "powdered sugar", reason: "Refined sugar with starch mixed in" },
  { pattern: "raw sugar", reason: "Still sugar — barely less processed" },
  { pattern: "demerara sugar", reason: "Slightly less refined — still sugar though" },
  { pattern: "turbinado sugar", reason: "Barely less refined than white sugar" },
  { pattern: "tapioca maltodextrin", reason: "Processed starch sweetener" },
  { pattern: "tapioca syrup", reason: "Processed starch sweetener" },
  { pattern: "sorbitol", reason: "Sugar alcohol — can cause bloating" },

  // --- Processed Oils ---
  { pattern: "canola oil", reason: "Ultra-processed seed oil — not great for you" },
  { pattern: "corn oil", reason: "Processed seed oil — skip if you can" },
  { pattern: "cottonseed oil", reason: "Ultra-processed oil — often from GMO cotton" },
  { pattern: "palm oil", reason: "Processed oil — bad for health and the planet" },
  { pattern: "peanut oil", reason: "Refined oil — loses nutrients in processing" },
  { pattern: "rapeseed oil", reason: "Ultra-processed seed oil" },
  { pattern: "safflower oil", reason: "Ultra-processed seed oil" },
  { pattern: "soybean oil", reason: "Ultra-processed oil — in everything unfortunately" },
  { pattern: "sunflower oil", reason: "Processed seed oil — high in omega-6" },
  { pattern: "vegetable oil", reason: "Mystery blend of processed oils" },
  { pattern: "vegetable shortening", reason: "Heavily processed oil blend" },
  { pattern: "hydrogenated", reason: "Processed fat — may contain trans fats" },
  { pattern: "high oleic", reason: "Modified oil engineered for shelf life" },
  { pattern: "lard", reason: "Rendered animal fat — quality depends on source" },

  // --- Synthetic Dyes ---
  { pattern: "red 40", reason: "Artificial dye — banned in some countries" },
  { pattern: "red no. 40", reason: "Artificial dye — banned in some countries" },
  { pattern: "red no 40", reason: "Artificial dye — banned in some countries" },
  { pattern: "red 3", reason: "Artificial dye — linked to health concerns" },
  { pattern: "red no. 3", reason: "Artificial dye — linked to health concerns" },
  { pattern: "red dye", reason: "Synthetic color — your food doesn't need this" },
  { pattern: "red lake", reason: "Synthetic color additive" },
  { pattern: "yellow 5", reason: "Artificial dye — banned in some countries" },
  { pattern: "yellow no. 5", reason: "Artificial dye — banned in some countries" },
  { pattern: "yellow 6", reason: "Artificial dye — banned in some countries" },
  { pattern: "yellow no. 6", reason: "Artificial dye — banned in some countries" },
  { pattern: "yellow dye", reason: "Synthetic color — your food doesn't need this" },
  { pattern: "blue 1", reason: "Artificial dye — unnecessary chemical" },
  { pattern: "blue no. 1", reason: "Artificial dye — unnecessary chemical" },
  { pattern: "blue 2", reason: "Artificial dye — unnecessary chemical" },
  { pattern: "green 3", reason: "Artificial dye — unnecessary chemical" },
  { pattern: "violet 2", reason: "Synthetic color additive" },
  { pattern: "acid violet 43", reason: "Synthetic dye — shouldn't be in food" },
  { pattern: "caramel color", reason: "Processed coloring — may have contaminants" },
  { pattern: "artificial color", reason: "Synthetic dyes — skip these" },
  { pattern: "artificial colour", reason: "Synthetic dyes — skip these" },
  { pattern: "yellow prussiate of soda", reason: "Chemical anti-caking agent" },

  // --- Preservatives ---
  { pattern: "sodium benzoate", reason: "Chemical preservative — your body doesn't need this" },
  { pattern: "potassium benzoate", reason: "Chemical preservative — your body doesn't need this" },
  { pattern: "potassium sorbate", reason: "Preservative — can cause irritation" },
  { pattern: "potassium bromate", reason: "Dough additive — possible carcinogen" },
  { pattern: "tbhq", reason: "Synthetic preservative — toxicity concerns" },
  { pattern: "bha", reason: "Chemical preservative — questionable safety" },
  { pattern: "bht", reason: "Chemical preservative — questionable safety" },
  { pattern: "sodium nitrate", reason: "Preservative — linked to cancer risk" },
  { pattern: "sodium nitrite", reason: "Preservative — linked to cancer risk" },
  { pattern: "nitrite", reason: "Common in processed meats — cancer risk" },
  { pattern: "natamycin", reason: "Antifungal chemical — not ideal in food" },
  { pattern: "sulfite", reason: "Preservative — can trigger reactions" },
  { pattern: "sulfur dioxide", reason: "Preservative — can trigger reactions" },
  { pattern: "edta", reason: "Synthetic chemical to preserve color/flavor" },
  { pattern: "ethoxyquin", reason: "Preservative — toxic at high levels" },
  { pattern: "erythorbic acid", reason: "Synthetic preservative" },
  { pattern: "benzoate", reason: "Chemical preservative — linked to inflammation" },
  { pattern: "bromate", reason: "Dough additive — possible carcinogen" },

  // --- Emulsifiers & Additives ---
  { pattern: "datem", reason: "Dough conditioner — ultra-processed additive" },
  { pattern: "monoglyceride", reason: "Emulsifier — may have hidden trans fats" },
  { pattern: "diglyceride", reason: "Emulsifier — may have hidden trans fats" },
  { pattern: "carrageenan", reason: "Thickener — linked to gut inflammation" },
  { pattern: "modified food starch", reason: "Chemically altered starch — not natural" },
  { pattern: "maltodextrin", reason: "Processed filler — spikes blood sugar like candy" },
  { pattern: "gellan gum", reason: "Processed thickener — not the worst but not great" },
  { pattern: "polysorbate", reason: "Emulsifier — contamination concerns" },
  { pattern: "dough conditioner", reason: "Processing additive — unnecessary chemical" },

  // --- Flavor Enhancers ---
  { pattern: "monosodium glutamate", reason: "MSG — flavor trick, some people react badly" },
  { pattern: "msg", reason: "Flavor enhancer — some people get headaches" },
  { pattern: "disodium inosinate", reason: "MSG's sidekick — flavor enhancer" },
  { pattern: "disodium guanylate", reason: "MSG's sidekick — flavor enhancer" },
  { pattern: "yeast extract", reason: "Hidden MSG source — sneaky flavor enhancer" },
  { pattern: "hydrolyzed soy protein", reason: "Flavor booster — often has hidden MSG" },
  { pattern: "tetrasodium glutamate", reason: "Flavor enhancer chemical" },
  { pattern: "artificial flavor", reason: "Lab-made flavoring — who knows what's in it" },
  { pattern: "vanillin", reason: "Fake vanilla — made in a lab" },

  // --- Refined Flours ---
  { pattern: "bleached flour", reason: "Stripped of nutrients — basically empty carbs" },
  { pattern: "enriched flour", reason: "Nutrients removed then synthetic ones added back" },
  { pattern: "all purpose flour", reason: "Refined flour — nutrients stripped out" },

  // --- Sodium & Phosphate Additives ---
  { pattern: "sodium phosphate", reason: "Phosphate additive — hard on your kidneys" },
  { pattern: "sodium sulfite", reason: "Preservative — sensitivity risk" },
  { pattern: "sodium tripolyphosphate", reason: "Processing chemical" },
  { pattern: "trisodium phosphate", reason: "Industrial cleaner used in food — yep, really" },
  { pattern: "phosphoric acid", reason: "The acid in soda — not great for bones" },

  // --- Other Food Additives ---
  { pattern: "propylene glycol", reason: "Synthetic solvent — also used in antifreeze" },
  { pattern: "silicon dioxide", reason: "Anti-caking agent — basically sand" },
  { pattern: "bioengineered", reason: "Genetically modified — your call on this one" },
  { pattern: "titanium dioxide", reason: "White pigment — nanoparticle safety concerns" },
  { pattern: "ammonium chloride", reason: "Chemical additive — can irritate in excess" },
  { pattern: "ammonium hydroxide", reason: "pH adjuster — it's literally ammonia" },
  { pattern: "copper sulfate", reason: "Antimicrobial — toxic in large amounts" },

  // --- Processed Meats & Red Meats ---
  { pattern: "ham", reason: "Processed meat — usually loaded with preservatives" },
  { pattern: "pork", reason: "Quality varies a lot — sourcing matters" },
  { pattern: "farm-raised", reason: "Conventionally raised — quality varies" },

  // --- Flavor (natural included) ---
  { pattern: "natural flavor", reason: "\"Natural\" is misleading — it's a chemical blend" },
  { pattern: "natural flavour", reason: "\"Natural\" is misleading — it's a chemical blend" },

  // --- Non-food / Cosmetic (OFF sometimes returns these) ---
  { pattern: "fragrance", reason: "Synthetic scent mix — potential hormone disruptor" },
  { pattern: "parfum", reason: "Undisclosed scent chemicals" },
  { pattern: "perfume", reason: "Undisclosed scent chemicals" },
  { pattern: "paraben", reason: "Preservative — hormone disruption concerns" },
  { pattern: "butylparaben", reason: "Preservative — hormone disruptor" },
  { pattern: "isobutylparaben", reason: "Preservative — hormone disruptor" },
  { pattern: "isopropylparaben", reason: "Preservative — hormone concerns" },
  { pattern: "methylparaben", reason: "Preservative — hormone concerns" },
  { pattern: "ethylparaben", reason: "Preservative — hormone disruptor" },
  { pattern: "propylparaben", reason: "Preservative — hormone concerns" },
  { pattern: "peg-", reason: "Chemical compound — contamination risk" },
  { pattern: "mineral oil", reason: "Petroleum-derived — not food grade" },
  { pattern: "petrolatum", reason: "Petroleum-based — doesn't belong in food" },
  { pattern: "paraffin", reason: "Petroleum wax — not food" },
  { pattern: "oxybenzone", reason: "Chemical UV filter — hormone disruptor" },
  { pattern: "avobenzone", reason: "Chemical sunscreen — hormone concerns" },
  { pattern: "homosalate", reason: "Chemical sunscreen — hormone concerns" },
  { pattern: "octinoxate", reason: "Chemical sunscreen — hormone concerns" },
  { pattern: "octisalate", reason: "Chemical sunscreen — hormone concerns" },
  { pattern: "octocrylene", reason: "Chemical sunscreen — hormone concerns" },
  { pattern: "talc", reason: "Mineral powder — contamination risk" },
  { pattern: "laureth", reason: "Chemical surfactant — contamination risk" },
  { pattern: "methylisothiazolinone", reason: "Preservative — strong allergen" },
  { pattern: "benzalkonium chloride", reason: "Antimicrobial — can irritate skin and lungs" },
  { pattern: "benzisothiazolinone", reason: "Preservative — potential allergen" },
  { pattern: "imidazolidinyl urea", reason: "Releases formaldehyde — not great" },
  { pattern: "triethanolamine", reason: "pH adjuster — irritation risk" },
  { pattern: "ethanolamine", reason: "Chemical emulsifier — irritation risk" },
  { pattern: "salicylic acid", reason: "Chemical exfoliant — can irritate" },
  { pattern: "fluoride", reason: "Mineral additive — overexposure is a thing" },
  { pattern: "alumina", reason: "Aluminum compound — toxicity concerns" },
  { pattern: "aluminum", reason: "Aluminum — potential neurotoxin" },

  // --- Chemical / Industrial ---
  { pattern: "bronopol", reason: "Releases formaldehyde — avoid" },
  { pattern: "2-bromo-2-nitropropane", reason: "Releases formaldehyde — avoid" },
  { pattern: "hydroxyquinoline", reason: "Antimicrobial — potential toxin" },
  { pattern: "alcohol ethoxylate", reason: "Synthetic surfactant — carcinogen risk" },
  { pattern: "ethoxylated", reason: "Synthetic surfactant — carcinogen risk" },
  { pattern: "ammonium lactate", reason: "Conditioning agent — can irritate" },
  { pattern: "borax", reason: "Cleaning agent — toxic if ingested" },
  { pattern: "boric acid", reason: "Cleaning agent — toxic if ingested" },
  { pattern: "cetrimonium", reason: "Conditioning chemical — irritation risk" },
  { pattern: "chlorine bleach", reason: "Toxic disinfectant — shouldn't be near food" },
  { pattern: "chlorphenesin", reason: "Preservative — potential irritant" },
  { pattern: "colorant", reason: "Synthetic dye — unnecessary in food" },
  { pattern: "coumarin", reason: "Fragrance chemical — liver toxicity risk" },
  { pattern: "crosspolymer", reason: "Synthetic thickening agent" },
  { pattern: "cyclomethicone", reason: "Silicone compound — builds up in environment" },
  { pattern: "cyclopentasiloxane", reason: "Silicone compound — builds up in environment" },
  { pattern: "dihydroxyacetone", reason: "Self-tanner chemical — inhalation risk" },
  { pattern: "dipropylene glycol", reason: "Solvent — can irritate skin and lungs" },
  { pattern: "ethylene oxide", reason: "Sterilizing agent — classified carcinogen" },
  { pattern: "iodopropynyl", reason: "Preservative — toxic at high levels" },
  { pattern: "limonene", reason: "Fragrance compound — potential allergen" },
  { pattern: "linalool", reason: "Fragrance compound — can irritate over time" },
  { pattern: "nonylphenol", reason: "Industrial chemical — hormone disruptor" },
  { pattern: "quaternary ammonium", reason: "Disinfectant — respiratory concerns" },
  { pattern: "quaternium", reason: "Disinfectant chemical — respiratory concerns" },
  { pattern: "teflon", reason: "Non-stick chemical — PFAS forever chemical" },
  { pattern: "ptfe", reason: "Non-stick chemical — PFAS forever chemical" },
  { pattern: "zinc pyrithione", reason: "Antimicrobial — toxicity concerns" },
  { pattern: "nitromethane", reason: "Industrial solvent — toxic" },
  { pattern: "dimethyl ammonium", reason: "Disinfectant — irritation and toxicity risk" },
  { pattern: "decyl ammonium", reason: "Disinfectant — irritation risk" },
];

// =============================================================================
// GOOD INGREDIENTS (Green) — Healthy
// =============================================================================
export const GOOD_INGREDIENTS: { pattern: string; reason: string }[] = [
  // --- Proteins ---
  { pattern: "pea protein", reason: "Solid plant protein source" },
  { pattern: "egg white", reason: "Pure protein — great for gains" },
  { pattern: "collagen", reason: "Great for joints and skin" },
  { pattern: "chicken", reason: "Lean protein — solid choice" },
  { pattern: "turkey", reason: "Lean protein — even lower fat than chicken" },
  { pattern: "duck", reason: "Good protein source" },
  { pattern: "hen", reason: "Poultry protein — solid" },
  { pattern: "edamame", reason: "Plant protein powerhouse" },
  { pattern: "chickpea", reason: "Protein + fiber combo — great snack base" },
  { pattern: "lentil", reason: "Protein + fiber — underrated superfood" },
  { pattern: "soy protein", reason: "Plant-based protein — does the job" },
  { pattern: "soy flour", reason: "Plant protein source" },
  { pattern: "corn protein", reason: "Plant-based protein" },
  { pattern: "eggs", reason: "Nature's multivitamin — packed with nutrients" },
  { pattern: "salmon", reason: "Omega-3s + protein — brain and muscle fuel" },

  // --- Whole Grains ---
  { pattern: "quinoa", reason: "Complete protein + whole grain — elite combo" },
  { pattern: "brown rice", reason: "Whole grain — solid carb source" },
  { pattern: "whole grain", reason: "Fiber and nutrients still intact" },
  { pattern: "grits", reason: "Ground corn — comfort food staple" },

  // --- Healthy Fats & Oils ---
  { pattern: "olive oil", reason: "Healthy fat — your heart loves this" },
  { pattern: "avocado", reason: "Healthy fats + potassium — nature's butter" },
  { pattern: "coconut oil", reason: "Medium-chain fats — quick energy source" },
  { pattern: "ghee", reason: "Clarified butter — concentrated good fats" },
  { pattern: "sesame oil", reason: "Plant oil — adds flavor and nutrients" },
  { pattern: "grapeseed oil", reason: "Light plant-based oil" },
  { pattern: "rice bran oil", reason: "Mild plant oil — decent choice" },
  { pattern: "sunflower lecithin", reason: "Natural emulsifier — better than soy lecithin" },

  // --- Nuts & Seeds ---
  { pattern: "almond", reason: "Healthy fats + protein — great snack" },
  { pattern: "walnut", reason: "Omega-3s — great for your brain" },
  { pattern: "chia seed", reason: "Omega-3s + fiber + protein — tiny but mighty" },
  { pattern: "flaxseed", reason: "Omega-3s + fiber — add to everything" },
  { pattern: "flax seed", reason: "Omega-3s + fiber — add to everything" },
  { pattern: "hemp seed", reason: "Complete protein + omegas — underrated" },

  // --- Superfoods & Vegetables ---
  { pattern: "kale", reason: "Nutrient-dense green — one of the best" },
  { pattern: "blueberr", reason: "Antioxidant powerhouse" },
  { pattern: "sweet potato", reason: "Complex carbs + vitamin A — great fuel" },
  { pattern: "nutritional yeast", reason: "B vitamins — vegan's best friend" },

  // --- Anti-inflammatory ---
  { pattern: "turmeric", reason: "Anti-inflammatory — great for recovery" },
  { pattern: "ginger", reason: "Anti-inflammatory + helps digestion" },
  { pattern: "green tea", reason: "Antioxidants — clean energy boost" },

  // --- Fermented Foods ---
  { pattern: "greek yogurt", reason: "High protein + probiotics — gut health MVP" },
  { pattern: "tempeh", reason: "Fermented soy — protein + probiotics" },
  { pattern: "miso", reason: "Fermented — great for gut health" },

  // --- Natural Sweeteners ---
  { pattern: "honey", reason: "Natural sweetener — has antioxidants too" },
  { pattern: "agave", reason: "Plant sweetener — use sparingly though" },
  { pattern: "brown rice syrup", reason: "Rice-based sweetener — gentler option" },
  { pattern: "allulose", reason: "Low-cal sweetener — doesn't spike blood sugar" },
  { pattern: "erythritol", reason: "Sugar alcohol — low glycemic, easy on stomach" },
  { pattern: "monk fruit", reason: "Natural zero-cal sweetener — solid swap" },
  { pattern: "stevia", reason: "Plant-based zero-cal sweetener" },
  { pattern: "xylitol", reason: "Sugar alcohol — actually good for teeth" },
  { pattern: "isomaltulose", reason: "Slow-release sugar — steadier energy" },
  { pattern: "mannitol", reason: "Sugar alcohol — low glycemic option" },

  // --- Natural Thickeners & Stabilizers ---
  { pattern: "agar", reason: "Seaweed-based thickener — natural" },
  { pattern: "acacia gum", reason: "Natural plant stabilizer — totally fine" },
  { pattern: "pectin", reason: "Fruit-derived thickener — natural" },
  { pattern: "guar gum", reason: "Plant-based thickener — harmless" },
  { pattern: "locust bean gum", reason: "Plant thickener — all good" },
  { pattern: "xanthan gum", reason: "Fermented thickener — safe and common" },
  { pattern: "carnauba wax", reason: "Natural plant wax coating" },
  { pattern: "tapioca starch", reason: "Cassava root starch — natural thickener" },
  { pattern: "potato flour", reason: "Ground potatoes — simple ingredient" },

  // --- Vitamins & Minerals ---
  { pattern: "niacin", reason: "Vitamin B3 — essential nutrient" },
  { pattern: "thiamine", reason: "Vitamin B1 — your body needs this" },
  { pattern: "cholecalciferol", reason: "Vitamin D3 — sunshine vitamin" },
  { pattern: "beta carotene", reason: "Vitamin A precursor — antioxidant" },
  { pattern: "alpha tocopheryl", reason: "Vitamin E — antioxidant boost" },
  { pattern: "tocopherol", reason: "Vitamin E — good antioxidant" },
  { pattern: "calcium carbonate", reason: "Calcium supplement — bones need this" },
  { pattern: "calcium chloride", reason: "Mineral — electrolyte source" },
  { pattern: "calcium phosphate", reason: "Mineral fortification — good for bones" },
  { pattern: "calcium sulfate", reason: "Mineral — used in tofu making" },
  { pattern: "calcium stearate", reason: "Anti-caking mineral — harmless" },
  { pattern: "dicalcium phosphate", reason: "Mineral supplement — common and safe" },
  { pattern: "tricalcium phosphate", reason: "Mineral supplement — common and safe" },
  { pattern: "potassium chloride", reason: "Salt substitute — better than sodium" },
  { pattern: "dipotassium phosphate", reason: "Mineral salt — buffering agent" },
  { pattern: "zinc citrate", reason: "Zinc supplement — immune support" },

  // --- Other Natural/Beneficial ---
  { pattern: "glycerin", reason: "Plant-based moisture agent — safe" },
  { pattern: "glycine", reason: "Amino acid — your body makes this too" },
  { pattern: "enzyme", reason: "Natural catalyst — helps processing" },
  { pattern: "citric acid", reason: "Natural acid — found in citrus fruits" },
  { pattern: "malic acid", reason: "Natural fruit acid — totally fine" },
  { pattern: "carbon dioxide", reason: "Just carbonation — makes it fizzy" },
  { pattern: "sodium bicarbonate", reason: "Baking soda — completely safe" },
  { pattern: "annatto", reason: "Natural plant-based coloring — the good kind" },
  { pattern: "coconut water", reason: "Natural electrolytes — nature's sports drink" },
  { pattern: "raw milk", reason: "Unpasteurized dairy — natural enzymes intact" },
  { pattern: "refined olive oil", reason: "Less antioxidants than extra virgin but still okay" },
  { pattern: "behentrimonium", reason: "Hair conditioning agent" },
];

// =============================================================================
// CAUTION INGREDIENTS (Yellow / Dual) — Context-dependent
// =============================================================================
export const CAUTION_INGREDIENTS: { pattern: string; reason: string }[] = [
  // --- Dual Green/Red: Animal Products ---
  { pattern: "beef", reason: "Depends on quality — grass-fed > conventional" },
  { pattern: "wagyu", reason: "Premium beef — tastes amazing but high in saturated fat" },
  { pattern: "kobe", reason: "Premium beef — high in saturated fat" },
  { pattern: "bison", reason: "Lean red meat — better if grass-fed" },

  // --- Dual Green/Red: Dairy ---
  { pattern: "butter", reason: "Natural dairy fat — grass-fed is best" },
  { pattern: "cream", reason: "Dairy fat — fine in moderation" },
  { pattern: "whole milk", reason: "Full-fat dairy — not bad, sourcing matters" },
  { pattern: "fat-free milk", reason: "Fat removed — nutrients altered" },
  { pattern: "skim milk", reason: "Fat removed — nutrients altered" },
  { pattern: "dry milk", reason: "Powdered dairy — quality depends on processing" },
  { pattern: "milk powder", reason: "Powdered dairy — quality depends on processing" },
  { pattern: "pasteurized", reason: "Heat-treated — some nutrients lost in processing" },

  // --- Dual Green/Red: Other ---
  { pattern: "whey", reason: "Milk protein — quality varies by processing" },
  { pattern: "beer", reason: "Alcohol + gluten — not exactly health food" },
  { pattern: "cellulose", reason: "Plant fiber — could be natural or ultra-processed" },

  // --- Dual Green/Yellow: Fruits (pesticide residue if non-organic) ---
  { pattern: "apple", reason: "Great fruit — go organic if you can" },
  { pattern: "strawberr", reason: "Tasty but often high in pesticides — go organic" },
  { pattern: "peach", reason: "Good fruit — pesticide risk if not organic" },
  { pattern: "nectarine", reason: "Good fruit — go organic if possible" },
  { pattern: "cherry juice", reason: "Fruit juice — natural sugars add up" },
  { pattern: "grape juice", reason: "Fruit juice — natural sugars add up" },
  { pattern: "raisin", reason: "Dried fruit — concentrated sugar, easy to overdo" },

  // --- Dual Green/Yellow: Grains with gluten/pesticide concerns ---
  { pattern: "barley", reason: "Whole grain — good but has gluten" },
  { pattern: "wheat", reason: "Whole grain — has gluten, often sprayed with pesticides" },
  { pattern: "rye", reason: "Whole grain — contains gluten" },
  { pattern: "semolina", reason: "Wheat flour — contains gluten" },
  { pattern: "durum", reason: "Wheat variety — contains gluten" },

  // --- Dual Green/Yellow: Vegetables with concerns ---
  { pattern: "spinach", reason: "Super nutritious — go organic to avoid pesticides" },
  { pattern: "corn", reason: "Whole grain — often GMO though" },

  // --- Dual Green/Yellow: Grains with pesticide concerns ---
  { pattern: "oat", reason: "Great grain — may have pesticide residues" },
];

// =============================================================================
// Pre-compiled Lookup Structures (built once at module load)
// =============================================================================

// Pre-compile regex for removing parenthetical content
const PAREN_REGEX = /\([^)]*\)/g;

// Escape special regex characters in patterns
const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Build combined alternation regexes per category for fast first-pass filtering
const BAD_REGEX = new RegExp(
  BAD_INGREDIENTS.map((b) => escapeRegex(b.pattern)).join("|"),
  "i",
);
const CAUTION_REGEX = new RegExp(
  CAUTION_INGREDIENTS.map((c) => escapeRegex(c.pattern)).join("|"),
  "i",
);
const GOOD_REGEX = new RegExp(
  GOOD_INGREDIENTS.map((g) => escapeRegex(g.pattern)).join("|"),
  "i",
);

// Helper: find the specific matching pattern after regex confirms a hit
function findMatchingPattern(
  lower: string,
  patterns: { pattern: string; reason: string }[],
): { pattern: string; reason: string } | null {
  for (const p of patterns) {
    if (lower.includes(p.pattern)) return p;
  }
  return null;
}

// =============================================================================
// Parser & Scoring Functions
// =============================================================================

export function parseAndFlagIngredients(ingredientsText: string): FlaggedIngredient[] {
  if (!ingredientsText || ingredientsText.trim().length === 0) return [];

  // Split on commas, handling parenthetical sub-ingredients
  // Remove parenthetical content for cleaner matching but keep the text for display
  const raw = ingredientsText
    .replace(PAREN_REGEX, "") // remove parenthetical sub-ingredients
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return raw.map((ingredient) => {
    const lower = ingredient.toLowerCase();

    // Fast regex test first, then find specific pattern only on confirmed match
    if (BAD_REGEX.test(lower)) {
      const match = findMatchingPattern(lower, BAD_INGREDIENTS);
      if (match) return { name: ingredient, flag: "bad" as const, reason: match.reason };
    }

    if (CAUTION_REGEX.test(lower)) {
      const match = findMatchingPattern(lower, CAUTION_INGREDIENTS);
      if (match) return { name: ingredient, flag: "caution" as const, reason: match.reason };
    }

    if (GOOD_REGEX.test(lower)) {
      const match = findMatchingPattern(lower, GOOD_INGREDIENTS);
      if (match) return { name: ingredient, flag: "good" as const, reason: match.reason };
    }

    return { name: ingredient, flag: "neutral" as const };
  });
}

export function calculateIngredientScoreModifier(flagged: FlaggedIngredient[]): number {
  let modifier = 0;

  for (const ing of flagged) {
    if (ing.flag === "bad") modifier -= 3;
    if (ing.flag === "good") modifier += 2;
    // caution: 0 (neutral impact on health score)
  }

  // Expanded caps for larger ingredient database
  return Math.max(-25, Math.min(15, modifier));
}
