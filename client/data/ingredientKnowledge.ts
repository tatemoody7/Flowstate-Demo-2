import type { FlaggedIngredient } from "@/data/mockData";

// =============================================================================
// BAD INGREDIENTS (Red) — Unhealthy
// =============================================================================
export const BAD_INGREDIENTS: { pattern: string; reason: string }[] = [
  // --- Artificial Sweeteners ---
  { pattern: "acesulfame potassium", reason: "Artificial sweetener; may impact gut health and metabolic function." },
  { pattern: "acesulfame k", reason: "Artificial sweetener; may impact gut health and metabolic function." },
  { pattern: "ace-k", reason: "Artificial sweetener; may impact gut health and metabolic function." },
  { pattern: "aspartame", reason: "Artificial sweetener; controversial neurological and metabolic concerns." },
  { pattern: "sucralose", reason: "Artificial sweetener." },

  // --- Refined Sugars ---
  { pattern: "high fructose corn syrup", reason: "Refined sweetener." },
  { pattern: "hfcs", reason: "Refined sweetener." },
  { pattern: "corn syrup", reason: "Refined sweetener." },
  { pattern: "beet sugar", reason: "Refined sugar; often genetically modified." },
  { pattern: "brown sugar", reason: "Refined sugar with molasses added back." },
  { pattern: "cane sugar", reason: "Refined sweetener." },
  { pattern: "cane juice", reason: "Refined sugar source." },
  { pattern: "evaporated cane", reason: "Refined sugar source." },
  { pattern: "sucrose", reason: "Refined sweetener." },
  { pattern: "dextrose", reason: "Simple sugar derived from starch; rapidly raises blood sugar." },
  { pattern: "dextrin", reason: "Processed starch derivative used as thickener or filler." },
  { pattern: "fructose", reason: "Simple sugar; high intake linked to metabolic concerns." },
  { pattern: "glucose syrup", reason: "Refined starch-derived sweetener." },
  { pattern: "granulated sugar", reason: "Refined sucrose sweetener." },
  { pattern: "invert sugar", reason: "Processed sweetener mixture of glucose and fructose." },
  { pattern: "liquid sugar", reason: "Refined dissolved sugar solution." },
  { pattern: "malt extract", reason: "Concentrated barley extract; sugar-dense." },
  { pattern: "maltitol", reason: "Sugar alcohol; may cause digestive upset." },
  { pattern: "powdered sugar", reason: "Refined sugar blended with starch." },
  { pattern: "raw sugar", reason: "Partially refined sugar." },
  { pattern: "demerara sugar", reason: "Minimally refined cane sugar; still a concentrated sweetener." },
  { pattern: "turbinado sugar", reason: "Partially refined cane sugar." },
  { pattern: "tapioca maltodextrin", reason: "Processed starch-derived sweetener." },
  { pattern: "tapioca syrup", reason: "Processed starch-derived sweetener." },
  { pattern: "sorbitol", reason: "Sugar alcohol; digestive upset concerns." },

  // --- Processed Oils ---
  { pattern: "canola oil", reason: "Highly processed seed oil." },
  { pattern: "corn oil", reason: "Refined seed oil." },
  { pattern: "cottonseed oil", reason: "Highly processed seed oil." },
  { pattern: "palm oil", reason: "Highly processed tropical oil; environmental and health concerns." },
  { pattern: "peanut oil", reason: "Refined seed oil." },
  { pattern: "rapeseed oil", reason: "Highly processed seed oil." },
  { pattern: "safflower oil", reason: "Highly processed seed oil." },
  { pattern: "soybean oil", reason: "Highly processed seed oil." },
  { pattern: "sunflower oil", reason: "Highly processed seed oil." },
  { pattern: "vegetable oil", reason: "Highly processed blended oils." },
  { pattern: "vegetable shortening", reason: "Highly processed blended oils." },
  { pattern: "hydrogenated", reason: "Processed fats; may contain trans fats." },
  { pattern: "high oleic", reason: "Modified oils engineered for shelf stability." },
  { pattern: "lard", reason: "Rendered pork fat; quality varies by source." },

  // --- Synthetic Dyes ---
  { pattern: "red 40", reason: "Synthetic color additives." },
  { pattern: "red no. 40", reason: "Synthetic color additives." },
  { pattern: "red no 40", reason: "Synthetic color additives." },
  { pattern: "red 3", reason: "Synthetic color additives." },
  { pattern: "red no. 3", reason: "Synthetic color additives." },
  { pattern: "red dye", reason: "Synthetic color additives." },
  { pattern: "red lake", reason: "Synthetic color additives." },
  { pattern: "yellow 5", reason: "Synthetic color additives." },
  { pattern: "yellow no. 5", reason: "Synthetic color additives." },
  { pattern: "yellow 6", reason: "Synthetic color additives." },
  { pattern: "yellow no. 6", reason: "Synthetic color additives." },
  { pattern: "yellow dye", reason: "Synthetic color additives." },
  { pattern: "blue 1", reason: "Synthetic food dye." },
  { pattern: "blue no. 1", reason: "Synthetic food dye." },
  { pattern: "blue 2", reason: "Synthetic food dye." },
  { pattern: "green 3", reason: "Synthetic food dye." },
  { pattern: "violet 2", reason: "Synthetic color additive." },
  { pattern: "acid violet 43", reason: "Synthetic dye used in cosmetics and personal care products." },
  { pattern: "caramel color", reason: "Processed coloring; may contain contaminants." },
  { pattern: "artificial color", reason: "Artificial dyes associated with health concerns." },
  { pattern: "artificial colour", reason: "Artificial dyes associated with health concerns." },
  { pattern: "yellow prussiate of soda", reason: "Anti-caking agent; ferrocyanide compound." },

  // --- Preservatives ---
  { pattern: "sodium benzoate", reason: "Synthetic preservatives; may contribute to inflammation." },
  { pattern: "potassium benzoate", reason: "Synthetic preservative." },
  { pattern: "potassium sorbate", reason: "Preservative; irritation concerns." },
  { pattern: "potassium bromate", reason: "Dough conditioner; possible carcinogen." },
  { pattern: "tbhq", reason: "Synthetic preservative; toxicity concerns." },
  { pattern: "bha", reason: "Synthetic preservative; toxicity concerns." },
  { pattern: "bht", reason: "Synthetic preservative; toxicity concerns." },
  { pattern: "sodium nitrate", reason: "Preservatives used in processed meats; carcinogenic concerns." },
  { pattern: "sodium nitrite", reason: "Preservatives used in processed meats; carcinogenic concerns." },
  { pattern: "nitrite", reason: "Preservatives used in processed meats; carcinogenic concerns." },
  { pattern: "natamycin", reason: "Antifungal preservative." },
  { pattern: "sulfite", reason: "Preservatives; sensitivity reactions possible." },
  { pattern: "sulfur dioxide", reason: "Preservatives; sensitivity reactions possible." },
  { pattern: "edta", reason: "Synthetic chelating agent used to preserve flavor and color." },
  { pattern: "ethoxyquin", reason: "Preservative; toxicity concerns." },
  { pattern: "erythorbic acid", reason: "Synthetic preservative derived from glucose." },
  { pattern: "benzoate", reason: "Synthetic preservatives; may contribute to inflammation." },
  { pattern: "bromate", reason: "Dough conditioners; possible carcinogen." },

  // --- Emulsifiers & Additives ---
  { pattern: "datem", reason: "Dough conditioner and emulsifier used in commercial baked goods." },
  { pattern: "monoglyceride", reason: "Emulsifiers; may contain trace trans fats depending on processing." },
  { pattern: "diglyceride", reason: "Emulsifiers; may contain trace trans fats depending on processing." },
  { pattern: "carrageenan", reason: "Seaweed-derived thickener; linked to gut inflammation in some studies." },
  { pattern: "modified food starch", reason: "Chemically altered starch." },
  { pattern: "maltodextrin", reason: "Highly processed starch derivative; high glycemic impact." },
  { pattern: "gellan gum", reason: "Processed thickener produced by bacterial fermentation." },
  { pattern: "polysorbate", reason: "Emulsifiers; contamination concerns." },
  { pattern: "dough conditioner", reason: "Processing additive used to improve texture and shelf life." },

  // --- Flavor Enhancers ---
  { pattern: "monosodium glutamate", reason: "Flavor enhancer; sensitivity concerns." },
  { pattern: "msg", reason: "Flavor enhancer; sensitivity concerns." },
  { pattern: "disodium inosinate", reason: "Flavor enhancers often paired with MSG." },
  { pattern: "disodium guanylate", reason: "Flavor enhancers often paired with MSG." },
  { pattern: "yeast extract", reason: "Flavor enhancer; natural source of glutamates." },
  { pattern: "hydrolyzed soy protein", reason: "Flavor enhancer often contains added glutamates." },
  { pattern: "tetrasodium glutamate", reason: "Flavor enhancer and preservative." },
  { pattern: "artificial flavor", reason: "Broad term covering proprietary chemical flavor blends." },
  { pattern: "vanillin", reason: "Synthetic vanilla flavor compound." },

  // --- Refined Flours ---
  { pattern: "bleached flour", reason: "Refined grain treated and fortified with synthetic nutrients." },
  { pattern: "enriched flour", reason: "Refined grain treated and fortified with synthetic nutrients." },
  { pattern: "all purpose flour", reason: "Refined wheat flour stripped of nutrients." },

  // --- Sodium & Phosphate Additives ---
  { pattern: "sodium phosphate", reason: "Synthetic preservatives and stabilizers." },
  { pattern: "sodium sulfite", reason: "Synthetic preservatives and stabilizers." },
  { pattern: "sodium tripolyphosphate", reason: "Synthetic preservatives and stabilizers." },
  { pattern: "trisodium phosphate", reason: "Cleaning and processing agent." },
  { pattern: "phosphoric acid", reason: "Acidulant used in sodas." },

  // --- Other Food Additives ---
  { pattern: "propylene glycol", reason: "Synthetic solvent; irritation concerns." },
  { pattern: "silicon dioxide", reason: "Anti-caking agent; inhalation concerns." },
  { pattern: "bioengineered", reason: "Genetically modified origin." },
  { pattern: "titanium dioxide", reason: "White pigment; nanoparticle safety concerns." },
  { pattern: "ammonium chloride", reason: "Acidity regulator; excessive intake may cause irritation." },
  { pattern: "ammonium hydroxide", reason: "pH adjuster; corrosive in concentrated forms." },
  { pattern: "copper sulfate", reason: "Antimicrobial; toxic in excess." },

  // --- Processed Meats & Red Meats ---
  { pattern: "ham", reason: "Processed pork product; often contains preservatives." },
  { pattern: "pork", reason: "Red meat; quality varies by sourcing." },
  { pattern: "farm-raised", reason: "Refers to conventionally raised animals; quality varies significantly by production method." },

  // --- Flavor (natural included) ---
  { pattern: "natural flavor", reason: "Broad term covering proprietary chemical flavor blends." },
  { pattern: "natural flavour", reason: "Broad term covering proprietary chemical flavor blends." },

  // --- Non-food / Cosmetic (OFF sometimes returns these) ---
  { pattern: "fragrance", reason: "Synthetic or undisclosed scent mixtures; potential allergen and endocrine concerns." },
  { pattern: "parfum", reason: "Synthetic or undisclosed scent mixtures; potential allergen and endocrine concerns." },
  { pattern: "perfume", reason: "Synthetic or undisclosed scent mixtures; potential allergen and endocrine concerns." },
  { pattern: "paraben", reason: "Preservatives; hormone disruption concerns." },
  { pattern: "butylparaben", reason: "Preservative; endocrine disruption concerns." },
  { pattern: "isobutylparaben", reason: "Preservative; endocrine disruption concerns." },
  { pattern: "isopropylparaben", reason: "Preservative; hormone-related concerns." },
  { pattern: "methylparaben", reason: "Preservative; endocrine concerns." },
  { pattern: "ethylparaben", reason: "Preservative; endocrine disruption concerns." },
  { pattern: "propylparaben", reason: "Preservative; endocrine concerns." },
  { pattern: "peg-", reason: "Ethoxylated compounds; contamination concerns." },
  { pattern: "mineral oil", reason: "Petroleum-derived ingredient." },
  { pattern: "petrolatum", reason: "Petroleum-derived occlusive agent." },
  { pattern: "paraffin", reason: "Petroleum-derived wax." },
  { pattern: "oxybenzone", reason: "Chemical UV filter; endocrine disruption concerns." },
  { pattern: "avobenzone", reason: "Chemical sunscreen filter; potential hormone disruption concerns." },
  { pattern: "homosalate", reason: "Chemical sunscreen filter; hormone disruption concerns." },
  { pattern: "octinoxate", reason: "Chemical sunscreen filters; hormone disruption concerns." },
  { pattern: "octisalate", reason: "Chemical sunscreen filters; hormone disruption concerns." },
  { pattern: "octocrylene", reason: "Chemical sunscreen filters; hormone disruption concerns." },
  { pattern: "talc", reason: "Mineral powder; contamination concerns." },
  { pattern: "laureth", reason: "Ethoxylated surfactants; contamination concerns." },
  { pattern: "methylisothiazolinone", reason: "Preservative; strong allergen concerns." },
  { pattern: "benzalkonium chloride", reason: "Antimicrobial preservative; linked to skin and respiratory irritation." },
  { pattern: "benzisothiazolinone", reason: "Preservative; potential allergen." },
  { pattern: "imidazolidinyl urea", reason: "Preservative; formaldehyde-releasing compound." },
  { pattern: "triethanolamine", reason: "pH adjuster; irritation concerns." },
  { pattern: "ethanolamine", reason: "pH adjuster and emulsifier; linked to irritation concerns." },
  { pattern: "salicylic acid", reason: "Chemical exfoliant; irritation concerns." },
  { pattern: "fluoride", reason: "Mineral added for dental health; overexposure concerns." },
  { pattern: "alumina", reason: "Aluminum compound used as an abrasive or opacifier; toxicity concerns." },
  { pattern: "aluminum", reason: "Aluminum-based compounds; potential neurotoxicity concerns." },

  // --- Chemical / Industrial ---
  { pattern: "bronopol", reason: "Preservative; formaldehyde-releasing antimicrobial linked to skin irritation and toxicity concerns." },
  { pattern: "2-bromo-2-nitropropane", reason: "Preservative; formaldehyde-releasing antimicrobial linked to skin irritation and toxicity concerns." },
  { pattern: "hydroxyquinoline", reason: "Antimicrobial and preservative; potential toxicity with prolonged exposure." },
  { pattern: "alcohol ethoxylate", reason: "Synthetic surfactants; may contain carcinogenic contaminants." },
  { pattern: "ethoxylated", reason: "Synthetic surfactants; may contain carcinogenic contaminants." },
  { pattern: "ammonium lactate", reason: "Skin-conditioning agent; may cause irritation." },
  { pattern: "borax", reason: "Cleaning agents; toxic if ingested." },
  { pattern: "boric acid", reason: "Cleaning agents; toxic if ingested." },
  { pattern: "cetrimonium", reason: "Antistatic conditioning agents; irritation concerns." },
  { pattern: "chlorine bleach", reason: "Disinfectant; toxic chemical exposure risk." },
  { pattern: "chlorphenesin", reason: "Preservative; potential irritant." },
  { pattern: "colorant", reason: "Artificial dyes associated with health concerns." },
  { pattern: "coumarin", reason: "Fragrance compound; liver toxicity concerns." },
  { pattern: "crosspolymer", reason: "Synthetic thickening agents." },
  { pattern: "cyclomethicone", reason: "Silicone-based compounds; bioaccumulation concerns." },
  { pattern: "cyclopentasiloxane", reason: "Silicone-based compounds; bioaccumulation concerns." },
  { pattern: "dihydroxyacetone", reason: "Self-tanning agent; inhalation exposure concerns." },
  { pattern: "dipropylene glycol", reason: "Solvent; potential skin and respiratory irritation." },
  { pattern: "ethylene oxide", reason: "Sterilizing agent; classified carcinogenic risk." },
  { pattern: "iodopropynyl", reason: "Preservative; toxicity concerns." },
  { pattern: "limonene", reason: "Fragrance compound; potential allergen." },
  { pattern: "linalool", reason: "Fragrance compound; oxidation may cause irritation." },
  { pattern: "nonylphenol", reason: "Industrial surfactant; endocrine disruption concerns." },
  { pattern: "quaternary ammonium", reason: "Disinfectant surfactants; respiratory and reproductive concerns." },
  { pattern: "quaternium", reason: "Disinfectant surfactants; respiratory and reproductive concerns." },
  { pattern: "teflon", reason: "Non-stick coating; PFAS-related concerns." },
  { pattern: "ptfe", reason: "Non-stick coating; PFAS-related concerns." },
  { pattern: "zinc pyrithione", reason: "Antimicrobial agent; toxicity concerns." },
  { pattern: "nitromethane", reason: "Preservatives used in processed meats; carcinogenic concerns." },
  { pattern: "dimethyl ammonium", reason: "Disinfectant agents; irritation and toxicity concerns." },
  { pattern: "decyl ammonium", reason: "Disinfectant surfactants; associated with respiratory and skin irritation." },
];

// =============================================================================
// GOOD INGREDIENTS (Green) — Healthy
// =============================================================================
export const GOOD_INGREDIENTS: { pattern: string; reason: string }[] = [
  // --- Proteins ---
  { pattern: "pea protein", reason: "Plant-based protein source." },
  { pattern: "egg white", reason: "Nutrient-dense protein; quality varies by farming practices." },
  { pattern: "collagen", reason: "Protein source." },
  { pattern: "chicken", reason: "Lean protein; sourcing affects nutritional quality." },
  { pattern: "turkey", reason: "Lean poultry protein." },
  { pattern: "duck", reason: "Protein source; nutrient density varies by sourcing." },
  { pattern: "hen", reason: "Poultry protein source." },
  { pattern: "edamame", reason: "Young soybeans; plant-based protein source." },
  { pattern: "chickpea", reason: "Plant-based protein and fiber source." },
  { pattern: "lentil", reason: "Plant-based protein and fiber source." },
  { pattern: "soy protein", reason: "Plant-based protein source." },
  { pattern: "soy flour", reason: "Plant-based protein source." },
  { pattern: "corn protein", reason: "Plant-based protein derivative." },
  { pattern: "eggs", reason: "Nutrient-dense protein; quality varies by farming practices." },
  { pattern: "salmon", reason: "Protein source; rich in omega-3 fatty acids." },

  // --- Whole Grains ---
  { pattern: "quinoa", reason: "Complete protein whole grain." },
  { pattern: "brown rice", reason: "Whole grain carbohydrate source." },
  { pattern: "whole grain", reason: "Fiber and nutrient-rich grain." },
  { pattern: "grits", reason: "Ground corn product; nutrient density varies by refinement." },

  // --- Healthy Fats & Oils ---
  { pattern: "olive oil", reason: "Heart-healthy plant-based oil." },
  { pattern: "avocado", reason: "Healthy fats and potassium source." },
  { pattern: "coconut oil", reason: "Medium-chain fat source." },
  { pattern: "ghee", reason: "Clarified butter; concentrated dairy fat." },
  { pattern: "sesame oil", reason: "Plant-derived oil." },
  { pattern: "grapeseed oil", reason: "Seed-derived oil; moderately processed." },
  { pattern: "rice bran oil", reason: "Oil extracted from rice bran." },
  { pattern: "sunflower lecithin", reason: "Emulsifier derived from sunflower." },

  // --- Nuts & Seeds ---
  { pattern: "almond", reason: "Healthy fats and protein source." },
  { pattern: "walnut", reason: "Rich in omega-3 fatty acids." },
  { pattern: "chia seed", reason: "Rich in omega-3s, fiber, and protein." },
  { pattern: "flaxseed", reason: "Rich in omega-3s and fiber." },
  { pattern: "flax seed", reason: "Rich in omega-3s and fiber." },
  { pattern: "hemp seed", reason: "Complete protein with omega fatty acids." },

  // --- Superfoods & Vegetables ---
  { pattern: "kale", reason: "Leafy green vegetable rich in nutrients." },
  { pattern: "blueberr", reason: "Antioxidant-rich fruit." },
  { pattern: "sweet potato", reason: "Complex carbohydrate with vitamin A." },
  { pattern: "nutritional yeast", reason: "Inactive yeast; source of B vitamins." },

  // --- Anti-inflammatory ---
  { pattern: "turmeric", reason: "Anti-inflammatory spice." },
  { pattern: "ginger", reason: "Anti-inflammatory; aids digestion." },
  { pattern: "green tea", reason: "Antioxidant-rich beverage." },

  // --- Fermented Foods ---
  { pattern: "greek yogurt", reason: "High-protein dairy with probiotics." },
  { pattern: "tempeh", reason: "Fermented soy protein source." },
  { pattern: "miso", reason: "Fermented soy; supports gut health." },

  // --- Natural Sweeteners ---
  { pattern: "honey", reason: "Natural sweetener with antioxidants." },
  { pattern: "agave", reason: "Plant-derived sweetener; high in fructose." },
  { pattern: "brown rice syrup", reason: "Rice-derived sweetener." },
  { pattern: "allulose", reason: "Low-calorie rare sugar alternative." },
  { pattern: "erythritol", reason: "Sugar alcohol sweetener; low glycemic impact." },
  { pattern: "monk fruit", reason: "Natural non-caloric sweetener." },
  { pattern: "stevia", reason: "Plant-derived non-caloric sweetener." },
  { pattern: "xylitol", reason: "Sugar alcohol sweetener; dental benefits." },
  { pattern: "isomaltulose", reason: "Slow-digesting carbohydrate sweetener." },
  { pattern: "mannitol", reason: "Sugar alcohol used as sweetener or stabilizer." },

  // --- Natural Thickeners & Stabilizers ---
  { pattern: "agar", reason: "Seaweed-derived thickener and gelling agent." },
  { pattern: "acacia gum", reason: "Natural plant-derived gum used as a stabilizer and thickener." },
  { pattern: "pectin", reason: "Fruit-derived thickener." },
  { pattern: "guar gum", reason: "Plant-derived thickener." },
  { pattern: "locust bean gum", reason: "Plant-derived thickener." },
  { pattern: "xanthan gum", reason: "Fermented thickener and stabilizer." },
  { pattern: "carnauba wax", reason: "Natural wax used as coating." },
  { pattern: "tapioca starch", reason: "Starch extracted from cassava root." },
  { pattern: "potato flour", reason: "Ground dried potatoes." },

  // --- Vitamins & Minerals ---
  { pattern: "niacin", reason: "Vitamin B3." },
  { pattern: "thiamine", reason: "Vitamin B1." },
  { pattern: "cholecalciferol", reason: "Vitamin D3." },
  { pattern: "beta carotene", reason: "Vitamin A precursor and antioxidant." },
  { pattern: "alpha tocopheryl", reason: "Synthetic form of vitamin E used as an antioxidant." },
  { pattern: "tocopherol", reason: "Vitamin E compounds; antioxidants." },
  { pattern: "calcium carbonate", reason: "Mineral supplement and anti-caking agent." },
  { pattern: "calcium chloride", reason: "Firming agent and electrolyte." },
  { pattern: "calcium phosphate", reason: "Mineral salts used for leavening or fortification." },
  { pattern: "calcium sulfate", reason: "Firming and dough conditioning agent." },
  { pattern: "calcium stearate", reason: "Anti-caking and flow agent." },
  { pattern: "dicalcium phosphate", reason: "Mineral supplement and leavening agent." },
  { pattern: "tricalcium phosphate", reason: "Mineral supplement and anti-caking agent." },
  { pattern: "potassium chloride", reason: "Mineral salt substitute." },
  { pattern: "dipotassium phosphate", reason: "Mineral salt used as a buffering and stabilizing agent." },
  { pattern: "zinc citrate", reason: "Mineral supplement; oral health use." },

  // --- Other Natural/Beneficial ---
  { pattern: "glycerin", reason: "Humectant derived from plant or animal fats." },
  { pattern: "glycine", reason: "Amino acid used as stabilizer or nutrient." },
  { pattern: "enzyme", reason: "Biological catalysts used in food processing." },
  { pattern: "citric acid", reason: "Natural acid; often fermentation-derived." },
  { pattern: "malic acid", reason: "Organic acid found in fruits; flavor enhancer." },
  { pattern: "carbon dioxide", reason: "Carbonation agent." },
  { pattern: "sodium bicarbonate", reason: "Baking soda; leavening agent." },
  { pattern: "annatto", reason: "Natural color derived from seeds." },
  { pattern: "coconut water", reason: "Natural electrolyte source." },
  { pattern: "raw milk", reason: "Unpasteurized dairy; natural enzyme content retained." },
  { pattern: "refined olive oil", reason: "Processed olive oil; lower antioxidant content than extra virgin." },
  { pattern: "behentrimonium", reason: "Conditioning agents used in hair care." },
];

// =============================================================================
// CAUTION INGREDIENTS (Yellow / Dual) — Context-dependent
// =============================================================================
export const CAUTION_INGREDIENTS: { pattern: string; reason: string }[] = [
  // --- Dual Green/Red: Animal Products ---
  { pattern: "beef", reason: "Protein source; quality depends on sourcing and fat profile." },
  { pattern: "wagyu", reason: "Protein source; quality depends on sourcing and fat profile." },
  { pattern: "kobe", reason: "Protein source; quality depends on sourcing and fat profile." },
  { pattern: "bison", reason: "Lean red meat; sourcing determines nutritional quality." },

  // --- Dual Green/Red: Dairy ---
  { pattern: "butter", reason: "Natural dairy fat; quality varies by sourcing and processing." },
  { pattern: "cream", reason: "Dairy fat; sourcing and processing matter." },
  { pattern: "whole milk", reason: "Full-fat dairy; nutrient profile varies by sourcing." },
  { pattern: "fat-free milk", reason: "Dairy product with fat removed; nutrient profile altered." },
  { pattern: "skim milk", reason: "Dairy product with fat removed; nutrient profile altered." },
  { pattern: "dry milk", reason: "Dehydrated dairy; nutritional quality depends on processing." },
  { pattern: "milk powder", reason: "Dehydrated dairy; nutritional quality depends on processing." },
  { pattern: "pasteurized", reason: "Heat-treated dairy; processing alters nutrient profile." },

  // --- Dual Green/Red: Other ---
  { pattern: "whey", reason: "Milk protein; processing affects quality." },
  { pattern: "beer", reason: "Fermented beverage; contains alcohol and gluten." },
  { pattern: "cellulose", reason: "Plant fiber; may be natural or highly processed." },

  // --- Dual Green/Yellow: Fruits (pesticide residue if non-organic) ---
  { pattern: "apple", reason: "Nutritious fruit; may carry pesticide residue if non-organic." },
  { pattern: "strawberr", reason: "Fruit; often high pesticide residue if non-organic." },
  { pattern: "peach", reason: "Fruit; pesticide residue risk if non-organic." },
  { pattern: "nectarine", reason: "Fruit; may carry pesticide residue if non-organic." },
  { pattern: "cherry juice", reason: "Fruit juice; natural sugars present." },
  { pattern: "grape juice", reason: "Fruit juice; natural sugars present." },
  { pattern: "raisin", reason: "Dried grapes; concentrated natural sugars." },

  // --- Dual Green/Yellow: Grains with gluten/pesticide concerns ---
  { pattern: "barley", reason: "Whole grain; beneficial but contains gluten and may carry pesticide residue." },
  { pattern: "wheat", reason: "Whole grain; contains gluten and may carry pesticide residues." },
  { pattern: "rye", reason: "Whole grain; contains gluten." },
  { pattern: "semolina", reason: "Coarse wheat flour; contains gluten." },
  { pattern: "durum", reason: "Wheat variety used in pasta; contains gluten." },

  // --- Dual Green/Yellow: Vegetables with concerns ---
  { pattern: "spinach", reason: "Leafy green; pesticide residue risk if non-organic." },
  { pattern: "corn", reason: "Whole grain; often genetically modified." },

  // --- Dual Green/Yellow: Grains with pesticide concerns ---
  { pattern: "oat", reason: "Whole grain; may contain pesticide residues." },
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
    if (ing.flag === "caution") modifier -= 0.5; // very minor penalty
  }

  // Expanded caps for larger ingredient database
  return Math.max(-25, Math.min(15, Math.round(modifier)));
}
