import type { FlaggedIngredient } from "@/data/mockData";

// =============================================================================
// BAD INGREDIENTS (Red) — Unhealthy
// =============================================================================
export const BAD_INGREDIENTS: { pattern: string; reason: string; source?: string }[] = [
  // --- Artificial Sweeteners ---
  { pattern: "acesulfame potassium", reason: "Can mess with your gut bacteria and spike cravings later.", source: "FDA; NIH PMC4899993" },
  { pattern: "acesulfame k", reason: "Can mess with your gut bacteria and spike cravings later.", source: "FDA; NIH PMC4899993" },
  { pattern: "ace-k", reason: "Can mess with your gut bacteria and spike cravings later.", source: "FDA; NIH PMC4899993" },
  { pattern: "aspartame", reason: "Linked to headaches and energy crashes in some people.", source: "EFSA 2013; NIH PMC7817779" },
  { pattern: "sucralose", reason: "May throw off your gut bacteria and insulin response.", source: "NIH PMC6363527" },

  // --- Refined Sugars ---
  { pattern: "high fructose corn syrup", reason: "Spikes blood sugar fast — hello energy crash and brain fog.", source: "NIH PMC5133084" },
  { pattern: "hfcs", reason: "Spikes blood sugar fast — hello energy crash and brain fog.", source: "NIH PMC5133084" },
  { pattern: "corn syrup", reason: "Processed sugar that hits your bloodstream hard. Crash incoming.", source: "FDA; USDA" },
  { pattern: "beet sugar", reason: "Refined sugar, usually from GMO beets. Same crash as regular sugar.", source: "USDA" },
  { pattern: "brown sugar", reason: "Just white sugar with molasses added back. Still spikes blood sugar.", source: "USDA" },
  { pattern: "cane sugar", reason: "Refined sugar — quick energy, quicker crash.", source: "USDA" },
  { pattern: "cane juice", reason: "Sounds natural but it's still refined sugar.", source: "FDA" },
  { pattern: "evaporated cane", reason: "Fancy name for sugar. Your body processes it the same.", source: "FDA" },
  { pattern: "sucrose", reason: "Table sugar. Fast spike, fast crash, then you're hungry again.", source: "NIH" },
  { pattern: "dextrose", reason: "Hits your bloodstream faster than table sugar. Quick spike, quick crash.", source: "Glycemic Index Foundation" },
  { pattern: "dextrin", reason: "Processed starch filler — sneaks extra carbs into your food.", source: "FDA" },
  { pattern: "fructose", reason: "Your liver has to process all of this. Too much leads to fat storage.", source: "NIH PMC6088354" },
  { pattern: "glucose syrup", reason: "Liquid sugar from corn starch. Spikes blood sugar fast.", source: "FDA; USDA" },
  { pattern: "granulated sugar", reason: "Pure refined sugar. Energy spike then total crash.", source: "USDA" },
  { pattern: "invert sugar", reason: "Pre-broken-down sugar so it absorbs even faster.", source: "FDA" },
  { pattern: "liquid sugar", reason: "Dissolved sugar — absorbs quickly, crashes quickly.", source: "FDA" },
  { pattern: "malt extract", reason: "Concentrated barley sugar. More sugar than you'd think.", source: "USDA" },
  { pattern: "maltitol", reason: "Sugar alcohol that can wreck your stomach. Not ideal pre-workout.", source: "NIH PMC6363527" },
  { pattern: "powdered sugar", reason: "Refined sugar with cornstarch. Empty calories.", source: "USDA" },
  { pattern: "raw sugar", reason: "Barely less processed than white sugar. Still spikes blood sugar.", source: "USDA" },
  { pattern: "demerara sugar", reason: "Minimally refined but still hits your bloodstream the same way.", source: "USDA" },
  { pattern: "turbinado sugar", reason: "Looks healthier but your body treats it just like regular sugar.", source: "USDA" },
  { pattern: "tapioca maltodextrin", reason: "Processed starch that spikes blood sugar higher than table sugar.", source: "Glycemic Index Foundation" },
  { pattern: "tapioca syrup", reason: "Processed starch sweetener. Quick spike, quick crash.", source: "FDA" },
  { pattern: "sorbitol", reason: "Sugar alcohol — can cause bloating and stomach cramps.", source: "NIH" },

  // --- Processed Oils ---
  { pattern: "canola oil", reason: "High omega-6 = more inflammation. Bad for skin and recovery.", source: "NIH PMC3335257" },
  { pattern: "corn oil", reason: "Heavy in omega-6 fats that drive inflammation. Not helping your skin.", source: "NIH PMC3335257" },
  { pattern: "cottonseed oil", reason: "One of the most processed oils. Linked to inflammation.", source: "NIH PMC5946211" },
  { pattern: "palm oil", reason: "Raises bad cholesterol and drives inflammation. Slows recovery.", source: "WHO; NIH PMC5946211" },
  { pattern: "peanut oil", reason: "High omega-6 content. Contributes to inflammation over time.", source: "NIH PMC3335257" },
  { pattern: "rapeseed oil", reason: "Heavily processed seed oil. Drives omega-6 imbalance.", source: "NIH PMC3335257" },
  { pattern: "safflower oil", reason: "One of the highest omega-6 oils. Promotes inflammation.", source: "NIH PMC3335257" },
  { pattern: "soybean oil", reason: "In almost everything processed. Drives inflammation and bad skin.", source: "NIH PMC7059893" },
  { pattern: "sunflower oil", reason: "High omega-6 that promotes inflammation. Affects skin and joints.", source: "NIH PMC3335257" },
  { pattern: "vegetable oil", reason: "Mystery blend of processed oils. Inflammation in a bottle.", source: "NIH PMC3335257" },
  { pattern: "vegetable shortening", reason: "Heavily processed fat blend. May contain trans fats.", source: "FDA; AHA" },
  { pattern: "hydrogenated", reason: "Trans fats = breakouts, brain fog, and slower recovery.", source: "FDA 2018; AHA" },
  { pattern: "high oleic", reason: "Engineered for shelf life, not for your health.", source: "FDA" },
  { pattern: "lard", reason: "Rendered animal fat. Quality depends entirely on the source.", source: "USDA" },

  // --- Synthetic Dyes ---
  { pattern: "red 40", reason: "Most common US food dye. Linked to hyperactivity. Banned in some EU foods.", source: "FDA; EFSA; CSPI" },
  { pattern: "red no. 40", reason: "Most common US food dye. Linked to hyperactivity. Banned in some EU foods.", source: "FDA; EFSA; CSPI" },
  { pattern: "red no 40", reason: "Most common US food dye. Linked to hyperactivity. Banned in some EU foods.", source: "FDA; EFSA; CSPI" },
  { pattern: "red 3", reason: "Banned in cosmetics by the FDA but still allowed in your food.", source: "FDA; California AB 418" },
  { pattern: "red no. 3", reason: "Banned in cosmetics by the FDA but still allowed in your food.", source: "FDA; California AB 418" },
  { pattern: "red dye", reason: "Petroleum-based coloring. Zero nutritional value, just chemicals.", source: "CSPI; FDA" },
  { pattern: "red lake", reason: "Synthetic dye made to be insoluble. Your body can't break it down.", source: "FDA" },
  { pattern: "yellow 5", reason: "Linked to attention issues in kids. Requires warning labels in the EU.", source: "EFSA 2009; Southampton Study" },
  { pattern: "yellow no. 5", reason: "Linked to attention issues in kids. Requires warning labels in the EU.", source: "EFSA 2009; Southampton Study" },
  { pattern: "yellow 6", reason: "Petroleum-derived dye. Linked to hyperactivity and allergic reactions.", source: "EFSA; CSPI" },
  { pattern: "yellow no. 6", reason: "Petroleum-derived dye. Linked to hyperactivity and allergic reactions.", source: "EFSA; CSPI" },
  { pattern: "yellow dye", reason: "Synthetic coloring from petroleum. Your body doesn't need it.", source: "CSPI; FDA" },
  { pattern: "blue 1", reason: "Petroleum-derived dye. Poorly absorbed — your body just has to deal with it.", source: "CSPI; FDA" },
  { pattern: "blue no. 1", reason: "Petroleum-derived dye. Poorly absorbed — your body just has to deal with it.", source: "CSPI; FDA" },
  { pattern: "blue 2", reason: "Synthetic dye linked to brain tumors in animal studies.", source: "CSPI; NIH" },
  { pattern: "green 3", reason: "Rarely used synthetic dye. Linked to bladder tumors in animal studies.", source: "CSPI; FDA" },
  { pattern: "violet 2", reason: "Synthetic dye with limited safety data. Unnecessary additive.", source: "FDA" },
  { pattern: "acid violet 43", reason: "Cosmetic dye that shouldn't be anywhere near your food.", source: "FDA; EU Cosmetics Regulation" },
  { pattern: "caramel color", reason: "May contain 4-MEI, a compound flagged as a possible carcinogen.", source: "NIH; California Prop 65" },
  { pattern: "artificial color", reason: "Petroleum-based dyes with zero nutrition. Your body stores what it can't process.", source: "CSPI; EFSA" },
  { pattern: "artificial colour", reason: "Petroleum-based dyes with zero nutrition. Your body stores what it can't process.", source: "CSPI; EFSA" },
  { pattern: "yellow prussiate of soda", reason: "Sounds scary because it is. Anti-caking agent with cyanide compounds.", source: "FDA; EFSA" },

  // --- Preservatives ---
  { pattern: "sodium benzoate", reason: "Can form benzene (a carcinogen) when combined with vitamin C.", source: "FDA; NIH PMC3026131" },
  { pattern: "potassium benzoate", reason: "Same benzene risk as sodium benzoate. Avoid with citrus drinks.", source: "FDA; NIH PMC3026131" },
  { pattern: "potassium sorbate", reason: "Generally safe but can cause skin and gut irritation in some people.", source: "EFSA 2015" },
  { pattern: "potassium bromate", reason: "Banned in the EU, Canada, and Brazil. Still legal in US bread.", source: "IARC Group 2B; FDA" },
  { pattern: "tbhq", reason: "Synthetic preservative. High doses linked to immune and behavioral effects.", source: "NIH; EFSA" },
  { pattern: "bha", reason: "Classified as a possible carcinogen. Restricted in some countries.", source: "IARC Group 2B; NIH" },
  { pattern: "bht", reason: "Synthetic antioxidant linked to hormone disruption at high doses.", source: "NIH; EFSA" },
  { pattern: "sodium nitrate", reason: "In your deli meat. Forms cancer-linked compounds when heated.", source: "WHO IARC 2015; NIH PMC6466883" },
  { pattern: "sodium nitrite", reason: "In your deli meat. Forms cancer-linked compounds when heated.", source: "WHO IARC 2015; NIH PMC6466883" },
  { pattern: "nitrite", reason: "Preservative in processed meats. Linked to cancer when cooked at high heat.", source: "WHO IARC 2015" },
  { pattern: "natamycin", reason: "Antifungal used on cheese and sausage. Not great for gut bacteria.", source: "EFSA; NIH" },
  { pattern: "sulfite", reason: "Can trigger headaches, breathing issues, and crashes in sensitive people.", source: "FDA; NIH" },
  { pattern: "sulfur dioxide", reason: "Preservative that triggers headaches and asthma in sensitive people.", source: "FDA; WHO" },
  { pattern: "edta", reason: "Synthetic chelating agent. Strips minerals from your body along with the food.", source: "FDA; NIH" },
  { pattern: "ethoxyquin", reason: "Pesticide that doubles as a preservative. Banned in the EU for food.", source: "EFSA 2015; EPA" },
  { pattern: "erythorbic acid", reason: "Synthetic preservative. Generally safe but adds zero nutritional value.", source: "FDA" },
  { pattern: "benzoate", reason: "Can form benzene with vitamin C. Watch for this in fruit-flavored drinks.", source: "FDA; NIH PMC3026131" },
  { pattern: "bromate", reason: "Possible carcinogen banned in most countries. Still in some US bread.", source: "IARC Group 2B; FDA" },

  // --- Emulsifiers & Additives ---
  { pattern: "datem", reason: "Industrial dough conditioner. Fine for bread shelf life, not for your gut.", source: "EFSA; FDA" },
  { pattern: "monoglyceride", reason: "Can contain hidden trans fats that don't show up on the label.", source: "FDA labeling rules; AHA" },
  { pattern: "diglyceride", reason: "Can contain hidden trans fats that don't show up on the label.", source: "FDA labeling rules; AHA" },
  { pattern: "carrageenan", reason: "Can trigger gut inflammation. Not great before a workout or exam.", source: "NIH PMC1242073" },
  { pattern: "modified food starch", reason: "Chemically altered starch. Your body doesn't recognize it like real food.", source: "FDA" },
  { pattern: "maltodextrin", reason: "Spikes blood sugar higher than table sugar. Sneaky carb filler.", source: "Glycemic Index Foundation; NIH" },
  { pattern: "gellan gum", reason: "Processed thickener. Generally safe but adds nothing to your nutrition.", source: "FDA GRAS; EFSA" },
  { pattern: "polysorbate", reason: "Emulsifier linked to gut inflammation and barrier disruption.", source: "NIH PMC6899614" },
  { pattern: "dough conditioner", reason: "Industrial processing additive. Made for machines, not your body.", source: "FDA" },

  // --- Flavor Enhancers ---
  { pattern: "monosodium glutamate", reason: "Can trigger headaches and brain fog in sensitive people.", source: "NIH PMC5938543; FDA" },
  { pattern: "msg", reason: "Can trigger headaches and brain fog in sensitive people.", source: "NIH PMC5938543; FDA" },
  { pattern: "disodium inosinate", reason: "Flavor booster usually paired with MSG. Same sensitivity risks.", source: "FDA; EFSA" },
  { pattern: "disodium guanylate", reason: "Flavor booster usually paired with MSG. Same sensitivity risks.", source: "FDA; EFSA" },
  { pattern: "yeast extract", reason: "Hidden source of glutamates (MSG's cousin). Can trigger same reactions.", source: "NIH; FDA" },
  { pattern: "hydrolyzed soy protein", reason: "Processed flavor booster loaded with free glutamates.", source: "FDA; NIH" },
  { pattern: "tetrasodium glutamate", reason: "Another MSG variant. Same headache and sensitivity concerns.", source: "EFSA; FDA" },
  { pattern: "artificial flavor", reason: "Could be any of 3,000+ chemicals. You literally don't know what you're eating.", source: "FDA CFR 21.101.22" },
  { pattern: "vanillin", reason: "Synthetic vanilla made from wood pulp or petroleum. Not the real thing.", source: "FDA; NIH" },

  // --- Refined Flours ---
  { pattern: "bleached flour", reason: "Bleached with chemicals and stripped of nutrients. Empty carbs.", source: "NIH; USDA" },
  { pattern: "enriched flour", reason: "Stripped of nutrients then they add fake ones back. Your body knows the difference.", source: "NIH; USDA" },
  { pattern: "all purpose flour", reason: "Refined flour with the good stuff removed. Spikes blood sugar fast.", source: "USDA" },

  // --- Sodium & Phosphate Additives ---
  { pattern: "sodium phosphate", reason: "Too much phosphate stresses your kidneys and weakens bones over time.", source: "NIH PMC4676405" },
  { pattern: "sodium sulfite", reason: "Can trigger asthma and headaches in sensitive people.", source: "FDA; WHO" },
  { pattern: "sodium tripolyphosphate", reason: "Industrial preservative. Stresses kidneys at high intake.", source: "EFSA; NIH" },
  { pattern: "trisodium phosphate", reason: "Literally a cleaning agent that's also in your cereal.", source: "FDA; EWG" },
  { pattern: "phosphoric acid", reason: "In every soda. Pulls calcium from your bones over time.", source: "NIH PMC2532944" },

  // --- Other Food Additives ---
  { pattern: "propylene glycol", reason: "Also used in antifreeze. FDA says it's safe, but still.", source: "FDA; NIH" },
  { pattern: "silicon dioxide", reason: "Anti-caking agent (basically sand). Generally safe but adds nothing.", source: "FDA; EFSA" },
  { pattern: "bioengineered", reason: "GMO ingredient. Long-term independent studies are still limited.", source: "USDA NBFDS" },
  { pattern: "titanium dioxide", reason: "Banned in EU food since 2022. Nanoparticle safety still unknown.", source: "EFSA 2021; EU Regulation 2022/63" },
  { pattern: "ammonium chloride", reason: "Acidity regulator that can irritate your stomach at high doses.", source: "EFSA; FDA" },
  { pattern: "ammonium hydroxide", reason: "Used to kill bacteria in meat processing. Also used to clean floors.", source: "FDA; USDA" },
  { pattern: "copper sulfate", reason: "Antimicrobial that's toxic at higher doses. Used as a pesticide too.", source: "EPA; NIH" },

  // --- Processed Meats & Red Meats ---
  { pattern: "ham", reason: "Processed pork loaded with sodium and nitrates. Fine once in a while.", source: "WHO IARC 2015" },
  { pattern: "pork", reason: "Quality varies a lot by source. Go for pasture-raised when you can.", source: "USDA; NIH" },
  { pattern: "farm-raised", reason: "Usually means crowded conditions, antibiotics, and lower omega-3s.", source: "NIH PMC6835948; USDA" },

  // --- Flavor (natural included) ---
  { pattern: "natural flavor", reason: "Sounds healthy but it's a proprietary blend — could be anything.", source: "FDA CFR 21.101.22" },
  { pattern: "natural flavour", reason: "Sounds healthy but it's a proprietary blend — could be anything.", source: "FDA CFR 21.101.22" },

  // --- Non-food / Cosmetic (OFF sometimes returns these) ---
  { pattern: "fragrance", reason: "Undisclosed chemical mix. #1 cause of skin reactions and breakouts.", source: "AAD; NIH PMC5765853" },
  { pattern: "parfum", reason: "Undisclosed chemical mix. #1 cause of skin reactions and breakouts.", source: "AAD; NIH PMC5765853" },
  { pattern: "perfume", reason: "Undisclosed chemical mix. Can cause headaches and skin reactions.", source: "AAD; NIH PMC5765853" },
  { pattern: "paraben", reason: "Mimics estrogen in your body. Found in breast tumor tissue samples.", source: "NIH PMC5524753" },
  { pattern: "butylparaben", reason: "Strongest estrogen-mimicking paraben. Disrupts your hormones.", source: "NIH PMC5524753; EFSA" },
  { pattern: "isobutylparaben", reason: "Hormone disruptor. Banned in some EU products for a reason.", source: "EU Cosmetics Regulation; NIH" },
  { pattern: "isopropylparaben", reason: "Linked to hormone disruption. Your skin absorbs it directly.", source: "NIH PMC5524753" },
  { pattern: "methylparaben", reason: "Most common paraben. Mimics estrogen and penetrates your skin.", source: "NIH PMC5524753; EFSA" },
  { pattern: "ethylparaben", reason: "Hormone-disrupting preservative. Absorbed through your skin.", source: "NIH PMC5524753" },
  { pattern: "propylparaben", reason: "Stronger than methylparaben at disrupting hormones.", source: "NIH PMC5524753; EFSA" },
  { pattern: "peg-", reason: "Often contaminated with 1,4-dioxane, a known carcinogen.", source: "EWG; FDA Cosmetics Safety" },
  { pattern: "mineral oil", reason: "Petroleum byproduct that clogs pores and traps toxins in your skin.", source: "EWG; EFSA 2012" },
  { pattern: "petrolatum", reason: "Petroleum jelly. Seals in moisture but also seals in dirt and bacteria.", source: "EWG; EFSA 2012" },
  { pattern: "paraffin", reason: "Petroleum-derived wax. Sits on your skin and clogs pores.", source: "EWG; NIH" },
  { pattern: "oxybenzone", reason: "Absorbs into your bloodstream within hours. Linked to hormone disruption.", source: "FDA 2019; NIH PMC6926966" },
  { pattern: "avobenzone", reason: "Chemical sunscreen filter that breaks down in sunlight. Ironic.", source: "NIH; FDA 2019" },
  { pattern: "homosalate", reason: "Builds up in your body faster than you can flush it. Hormone disruptor.", source: "FDA 2019; EWG" },
  { pattern: "octinoxate", reason: "Banned in Hawaii for killing coral reefs. Also disrupts your hormones.", source: "Hawaii SB 2571; NIH" },
  { pattern: "octisalate", reason: "Chemical UV filter linked to hormone disruption at high exposure.", source: "FDA 2019; EWG" },
  { pattern: "octocrylene", reason: "Accumulates in your skin and may form cancer-linked compounds over time.", source: "NIH PMC8073490" },
  { pattern: "talc", reason: "Contamination risk with asbestos. Check your makeup ingredients.", source: "FDA; NIH PMC4164883" },
  { pattern: "laureth", reason: "Ethoxylated surfactant often contaminated with 1,4-dioxane.", source: "EWG; FDA" },
  { pattern: "methylisothiazolinone", reason: "Potent allergen. One of the top causes of contact dermatitis.", source: "AAD; NIH" },
  { pattern: "benzalkonium chloride", reason: "Preservative that can cause skin rashes and breathing irritation.", source: "NIH; FDA" },
  { pattern: "benzisothiazolinone", reason: "Strong allergen that can cause contact dermatitis.", source: "AAD; EFSA" },
  { pattern: "imidazolidinyl urea", reason: "Releases formaldehyde slowly on your skin. Yes, really.", source: "SCCS 2015; NIH" },
  { pattern: "triethanolamine", reason: "pH adjuster that can form cancer-linked nitrosamines over time.", source: "NIH; EFSA" },
  { pattern: "ethanolamine", reason: "Can irritate skin and lungs. Forms nitrosamines with other ingredients.", source: "NIH; SCCS" },
  { pattern: "salicylic acid", reason: "Good for acne in small doses, but can irritate and dry out your skin.", source: "AAD; FDA" },
  { pattern: "fluoride", reason: "Great for teeth in toothpaste. Toxic in larger amounts — don't swallow.", source: "ADA; NIH" },
  { pattern: "alumina", reason: "Aluminum compound. Overexposure linked to neurotoxicity concerns.", source: "NIH; EFSA" },
  { pattern: "aluminum", reason: "Linked to neurotoxicity. Found in antiperspirants — your skin absorbs it.", source: "NIH; EFSA" },

  // --- Chemical / Industrial ---
  { pattern: "bronopol", reason: "Releases formaldehyde on contact with your skin. Hard pass.", source: "SCCS 2015; NIH" },
  { pattern: "2-bromo-2-nitropropane", reason: "Formaldehyde releaser. Causes skin irritation and allergic reactions.", source: "SCCS 2015; NIH" },
  { pattern: "hydroxyquinoline", reason: "Antimicrobial with toxicity risks from prolonged skin contact.", source: "NIH; FDA" },
  { pattern: "alcohol ethoxylate", reason: "Synthetic surfactant often contaminated with carcinogenic byproducts.", source: "EWG; EPA" },
  { pattern: "ethoxylated", reason: "Processing creates 1,4-dioxane contamination. Known carcinogen risk.", source: "EWG; EPA" },
  { pattern: "ammonium lactate", reason: "Can cause stinging, peeling, and irritation on sensitive skin.", source: "NIH; FDA" },
  { pattern: "borax", reason: "Banned in EU food and cosmetics. Toxic to your reproductive system.", source: "EFSA; EU Cosmetics Regulation" },
  { pattern: "boric acid", reason: "Toxic if ingested. Banned in EU cosmetics for reproductive harm.", source: "EFSA; EU Cosmetics Regulation" },
  { pattern: "cetrimonium", reason: "Conditioning agent that can irritate skin and eyes at high concentrations.", source: "CIR; NIH" },
  { pattern: "chlorine bleach", reason: "Toxic disinfectant. Should not be in anything you put on your body.", source: "EPA; CDC" },
  { pattern: "chlorphenesin", reason: "Preservative that can cause skin irritation. Muscle relaxant in high doses.", source: "NIH; CIR" },
  { pattern: "colorant", reason: "Artificial dyes — zero nutrition, just synthetic chemicals for appearance.", source: "CSPI; FDA" },
  { pattern: "coumarin", reason: "Fragrance compound that's toxic to your liver at high exposure.", source: "EFSA; NIH" },
  { pattern: "crosspolymer", reason: "Synthetic plastic-based thickener. Microplastic concerns.", source: "ECHA; NIH" },
  { pattern: "cyclomethicone", reason: "Silicone that bioaccumulates in your body and the environment.", source: "EU REACH; ECHA" },
  { pattern: "cyclopentasiloxane", reason: "Silicone linked to hormone disruption. Restricted in the EU.", source: "ECHA; EU REACH" },
  { pattern: "dihydroxyacetone", reason: "Self-tanner chemical. Don't breathe it in — damages lung cells.", source: "FDA; NIH" },
  { pattern: "dipropylene glycol", reason: "Solvent that can irritate your skin and respiratory system.", source: "NIH; OSHA" },
  { pattern: "ethylene oxide", reason: "Classified carcinogen. Used to sterilize products — shouldn't be left behind.", source: "IARC Group 1; EPA" },
  { pattern: "iodopropynyl", reason: "Preservative that's toxic if inhaled. Banned in spray products in the EU.", source: "EU Cosmetics Regulation; NIH" },
  { pattern: "limonene", reason: "Fragrance allergen. Oxidizes on your skin and causes irritation.", source: "SCCS; NIH" },
  { pattern: "linalool", reason: "Common fragrance allergen. Breaks down into irritating compounds on skin.", source: "SCCS; NIH" },
  { pattern: "nonylphenol", reason: "Industrial surfactant that mimics estrogen. Banned in the EU.", source: "EU REACH; EPA" },
  { pattern: "quaternary ammonium", reason: "Disinfectant linked to respiratory issues and reproductive concerns.", source: "NIH PMC7785775; EPA" },
  { pattern: "quaternium", reason: "Some types release formaldehyde. Linked to skin irritation.", source: "SCCS; NIH" },
  { pattern: "teflon", reason: "Forever chemical (PFAS). Stays in your body and never breaks down.", source: "EPA; NIH PMC6380916" },
  { pattern: "ptfe", reason: "Forever chemical (PFAS). Builds up in your body over a lifetime.", source: "EPA; NIH PMC6380916" },
  { pattern: "zinc pyrithione", reason: "Anti-dandruff agent that's toxic to aquatic life. Irritates skin.", source: "EU Cosmetics Regulation; NIH" },
  { pattern: "nitromethane", reason: "Industrial solvent. Shouldn't be in any product you consume or apply.", source: "EPA; OSHA" },
  { pattern: "dimethyl ammonium", reason: "Disinfectant surfactant linked to skin and respiratory irritation.", source: "EPA; NIH" },
  { pattern: "decyl ammonium", reason: "Antimicrobial surfactant that irritates skin and lungs.", source: "EPA; NIH" },
];

// =============================================================================
// GOOD INGREDIENTS (Green) — Healthy
// =============================================================================
export const GOOD_INGREDIENTS: { pattern: string; reason: string; source?: string }[] = [
  // --- Proteins ---
  { pattern: "pea protein", reason: "Plant-based muscle fuel. Easy on your stomach too.", source: "NIH PMC6358922" },
  { pattern: "egg white", reason: "Pure protein with all essential amino acids. A gym staple.", source: "USDA; NIH" },
  { pattern: "collagen", reason: "Helps with skin, joints, and recovery. Your body uses it everywhere.", source: "NIH PMC6835901" },
  { pattern: "chicken", reason: "Lean protein king. Great for building muscle and staying full.", source: "USDA; NIH" },
  { pattern: "turkey", reason: "Lean protein with less fat than chicken. Keeps you full for hours.", source: "USDA" },
  { pattern: "duck", reason: "Rich protein source with iron. Good for energy and muscle repair.", source: "USDA" },
  { pattern: "hen", reason: "Solid poultry protein. Quality depends on how it was raised.", source: "USDA" },
  { pattern: "edamame", reason: "Complete plant protein with fiber. Great snack that actually fills you up.", source: "USDA; NIH" },
  { pattern: "chickpea", reason: "Protein + fiber combo. Keeps you full through long classes.", source: "USDA; NIH PMC6728155" },
  { pattern: "lentil", reason: "Protein and fiber powerhouse. Steady energy without the crash.", source: "USDA; NIH PMC6728155" },
  { pattern: "soy protein", reason: "Complete plant protein with all 9 essential amino acids.", source: "FDA; NIH" },
  { pattern: "soy flour", reason: "High-protein flour alternative. Adds protein to baked goods.", source: "USDA" },
  { pattern: "corn protein", reason: "Plant-based protein. Not complete on its own but still contributes.", source: "USDA" },
  { pattern: "eggs", reason: "Nature's multivitamin. Protein, healthy fats, and B vitamins in one.", source: "USDA; NIH" },
  { pattern: "salmon", reason: "Omega-3 powerhouse. Great for your brain, skin, and recovery.", source: "AHA; NIH PMC6835948" },

  // --- Whole Grains ---
  { pattern: "quinoa", reason: "Complete protein grain. All 9 amino acids your muscles need.", source: "FAO; NIH PMC6163738" },
  { pattern: "brown rice", reason: "Slow-burning carbs for steady energy through the day.", source: "USDA; NIH" },
  { pattern: "whole grain", reason: "Fiber-rich with nutrients intact. Keeps blood sugar stable.", source: "USDA; AHA" },
  { pattern: "grits", reason: "Southern comfort food. Better when made from whole-ground corn.", source: "USDA" },

  // --- Healthy Fats & Oils ---
  { pattern: "olive oil", reason: "Anti-inflammatory fats that protect your heart and brain.", source: "AHA; NIH PMC6770785" },
  { pattern: "avocado", reason: "Healthy fats + potassium. Great for skin and post-workout recovery.", source: "NIH PMC6567160" },
  { pattern: "coconut oil", reason: "Medium-chain fats your body can burn quickly for energy.", source: "NIH PMC5745680" },
  { pattern: "ghee", reason: "Clarified butter packed with fat-soluble vitamins. Easy to digest.", source: "NIH; Ayurvedic research" },
  { pattern: "sesame oil", reason: "Rich in antioxidants. Good for heart health and reducing inflammation.", source: "NIH PMC4127822" },
  { pattern: "grapeseed oil", reason: "Light oil with vitamin E. Decent option for cooking.", source: "USDA; NIH" },
  { pattern: "rice bran oil", reason: "Heart-healthy oil with natural antioxidants.", source: "NIH PMC3614039" },
  { pattern: "sunflower lecithin", reason: "Clean emulsifier. Better alternative to soy lecithin.", source: "FDA GRAS; NIH" },

  // --- Nuts & Seeds ---
  { pattern: "almond", reason: "Healthy fats, protein, and vitamin E. Great for skin and energy.", source: "USDA; NIH" },
  { pattern: "walnut", reason: "Highest omega-3 of any nut. Brain food that actually works.", source: "NIH PMC5748761" },
  { pattern: "chia seed", reason: "Tiny but loaded — omega-3s, fiber, and protein. Keeps you full.", source: "USDA; NIH" },
  { pattern: "flaxseed", reason: "One of the best plant sources of omega-3s. Great for inflammation.", source: "NIH PMC4152533" },
  { pattern: "flax seed", reason: "One of the best plant sources of omega-3s. Great for inflammation.", source: "NIH PMC4152533" },
  { pattern: "hemp seed", reason: "Complete protein with perfect omega-3 to omega-6 ratio.", source: "USDA; NIH" },

  // --- Superfoods & Vegetables ---
  { pattern: "kale", reason: "Nutrient-dense superfood. Vitamins A, C, K in one leaf.", source: "USDA; NIH" },
  { pattern: "blueberr", reason: "Antioxidant king. Protects your brain and helps with recovery.", source: "NIH PMC5187535" },
  { pattern: "sweet potato", reason: "Complex carbs + vitamin A. Steady energy without the spike.", source: "USDA; NIH" },
  { pattern: "nutritional yeast", reason: "Loaded with B vitamins. Gives you natural energy without caffeine.", source: "USDA; NIH" },

  // --- Anti-inflammatory ---
  { pattern: "turmeric", reason: "Nature's anti-inflammatory. Helps with recovery and joint pain.", source: "NIH PMC5664031" },
  { pattern: "ginger", reason: "Reduces inflammation and settles your stomach. Great post-workout.", source: "NIH PMC5920415" },
  { pattern: "green tea", reason: "Antioxidants + calm energy from L-theanine. Focus without jitters.", source: "NIH PMC6412948" },

  // --- Fermented Foods ---
  { pattern: "greek yogurt", reason: "High protein + probiotics. Builds muscle and feeds your gut.", source: "USDA; NIH PMC4854945" },
  { pattern: "tempeh", reason: "Fermented soy = better absorption. Complete protein your gut loves.", source: "NIH; USDA" },
  { pattern: "miso", reason: "Fermented and full of probiotics. Great for gut health and immunity.", source: "NIH PMC6567199" },

  // --- Natural Sweeteners ---
  { pattern: "honey", reason: "Natural sweetener with real antioxidants. Better than refined sugar.", source: "NIH PMC6225430" },
  { pattern: "agave", reason: "Low glycemic but high in fructose. Use sparingly.", source: "NIH; USDA" },
  { pattern: "brown rice syrup", reason: "Slow-release sweetener. Won't spike blood sugar as fast.", source: "USDA" },
  { pattern: "allulose", reason: "Rare sugar with almost zero calories. Doesn't spike blood sugar.", source: "FDA GRAS; NIH PMC7352125" },
  { pattern: "erythritol", reason: "Sugar alcohol your body barely absorbs. No blood sugar spike.", source: "NIH PMC6363527" },
  { pattern: "monk fruit", reason: "Zero calories, zero blood sugar spike. Sweet without the crash.", source: "FDA GRAS; NIH" },
  { pattern: "stevia", reason: "Plant-based sweetener with zero glycemic impact. Clean swap for sugar.", source: "FDA GRAS; EFSA" },
  { pattern: "xylitol", reason: "Sugar alcohol that actually helps prevent cavities. Bonus.", source: "NIH PMC4232036" },
  { pattern: "isomaltulose", reason: "Slow-digesting sugar. Steady energy instead of a spike.", source: "NIH PMC6266159" },
  { pattern: "mannitol", reason: "Low-calorie sugar alcohol. Gentle on blood sugar levels.", source: "FDA; NIH" },

  // --- Natural Thickeners & Stabilizers ---
  { pattern: "agar", reason: "Seaweed-based thickener. Natural, plant-based, and harmless.", source: "FDA GRAS; NIH" },
  { pattern: "acacia gum", reason: "Natural tree sap fiber. Actually good for your gut bacteria.", source: "NIH PMC6159072" },
  { pattern: "pectin", reason: "Fruit-derived fiber. Helps with digestion and blood sugar control.", source: "NIH PMC3614039; USDA" },
  { pattern: "guar gum", reason: "Plant-based thickener with soluble fiber. Helps you stay full.", source: "FDA GRAS; NIH" },
  { pattern: "locust bean gum", reason: "Natural thickener from carob seeds. Clean and harmless.", source: "FDA GRAS; EFSA" },
  { pattern: "xanthan gum", reason: "Fermented thickener. Safe and commonly used. No health concerns.", source: "FDA GRAS; EFSA" },
  { pattern: "carnauba wax", reason: "Natural plant wax coating. Safe and non-toxic.", source: "FDA GRAS" },
  { pattern: "tapioca starch", reason: "Clean carb source from cassava. Gluten-free and easy to digest.", source: "USDA" },
  { pattern: "potato flour", reason: "Ground potatoes. Natural carb source that's gluten-free.", source: "USDA" },

  // --- Vitamins & Minerals ---
  { pattern: "niacin", reason: "Vitamin B3. Helps turn food into energy for your workouts.", source: "NIH ODS" },
  { pattern: "thiamine", reason: "Vitamin B1. Essential for energy metabolism and brain function.", source: "NIH ODS" },
  { pattern: "cholecalciferol", reason: "Vitamin D3. Most college students are deficient — this helps.", source: "NIH ODS" },
  { pattern: "beta carotene", reason: "Your body turns this into vitamin A. Great for skin and eyes.", source: "NIH ODS" },
  { pattern: "alpha tocopheryl", reason: "Vitamin E. Protects your cells and helps with skin health.", source: "NIH ODS" },
  { pattern: "tocopherol", reason: "Vitamin E antioxidant. Protects your cells from damage.", source: "NIH ODS" },
  { pattern: "calcium carbonate", reason: "Calcium for strong bones. Important if you're active.", source: "NIH ODS" },
  { pattern: "calcium chloride", reason: "Electrolyte and calcium source. Helps with hydration.", source: "FDA GRAS; NIH" },
  { pattern: "calcium phosphate", reason: "Mineral that supports bone strength and teeth.", source: "NIH ODS" },
  { pattern: "calcium sulfate", reason: "Natural mineral used in food. Safe and adds calcium.", source: "FDA GRAS" },
  { pattern: "calcium stearate", reason: "Calcium-based flow agent. Safe in normal amounts.", source: "FDA GRAS" },
  { pattern: "dicalcium phosphate", reason: "Calcium and phosphorus supplement. Supports bone health.", source: "NIH ODS" },
  { pattern: "tricalcium phosphate", reason: "Calcium supplement. Helps keep bones strong during your active years.", source: "NIH ODS" },
  { pattern: "potassium chloride", reason: "Electrolyte your muscles need. Helps prevent cramps.", source: "NIH ODS; AHA" },
  { pattern: "dipotassium phosphate", reason: "Mineral salt that helps with hydration and electrolyte balance.", source: "FDA GRAS" },
  { pattern: "zinc citrate", reason: "Zinc for immune support and clear skin. Most people don't get enough.", source: "NIH ODS" },

  // --- Other Natural/Beneficial ---
  { pattern: "glycerin", reason: "Plant-derived moisturizer. Safe and commonly used.", source: "FDA GRAS; CIR" },
  { pattern: "glycine", reason: "Amino acid that helps with sleep quality and recovery.", source: "NIH PMC6562223" },
  { pattern: "enzyme", reason: "Natural biological catalysts. Help your body break down food better.", source: "NIH" },
  { pattern: "citric acid", reason: "Natural acid found in citrus fruits. Safe preservative.", source: "FDA GRAS" },
  { pattern: "malic acid", reason: "Natural acid from apples. Helps with energy production in your cells.", source: "NIH; USDA" },
  { pattern: "carbon dioxide", reason: "Just bubbles. Makes your drink fizzy. Totally harmless.", source: "FDA GRAS" },
  { pattern: "sodium bicarbonate", reason: "Baking soda. Natural leavening agent. Safe and simple.", source: "FDA GRAS" },
  { pattern: "annatto", reason: "Natural color from seeds. Safe plant-based alternative to synthetic dyes.", source: "FDA; EFSA" },
  { pattern: "coconut water", reason: "Nature's sports drink. Packed with electrolytes and potassium.", source: "USDA; NIH" },
  { pattern: "raw milk", reason: "Unpasteurized with natural enzymes intact. Quality depends on source.", source: "FDA; NIH" },
  { pattern: "refined olive oil", reason: "Less antioxidants than extra virgin but still a healthier oil choice.", source: "USDA; NIH" },
  { pattern: "behentrimonium", reason: "Hair conditioning agent. Generally safe for external use.", source: "CIR" },
];

// =============================================================================
// CAUTION INGREDIENTS (Yellow / Dual) — Context-dependent
// =============================================================================
export const CAUTION_INGREDIENTS: { pattern: string; reason: string; source?: string }[] = [
  // --- Dual Green/Red: Animal Products ---
  { pattern: "beef", reason: "Solid protein if grass-fed. Quality matters a lot here.", source: "NIH; AHA" },
  { pattern: "wagyu", reason: "Premium beef with more marbling. Great protein, but high in saturated fat.", source: "USDA; NIH" },
  { pattern: "kobe", reason: "High-quality beef. Good protein but watch the saturated fat content.", source: "USDA" },
  { pattern: "bison", reason: "Leaner than beef with more omega-3s. Great choice if you can find it.", source: "USDA; NIH" },

  // --- Dual Green/Red: Dairy ---
  { pattern: "butter", reason: "Real fat your body can use. Grass-fed is the move.", source: "NIH PMC5867544" },
  { pattern: "cream", reason: "Natural dairy fat. Fine in moderation — just don't overdo it.", source: "USDA; NIH" },
  { pattern: "whole milk", reason: "More nutrients than skim. The fat helps absorb vitamins A and D.", source: "NIH PMC6723869" },
  { pattern: "fat-free milk", reason: "Less calories but you lose the fat-soluble vitamins. Tradeoff.", source: "USDA; NIH" },
  { pattern: "skim milk", reason: "Lower calorie option but some nutrients need fat to absorb properly.", source: "USDA; NIH" },
  { pattern: "dry milk", reason: "Powdered dairy. Nutritionally fine but oxidized cholesterol is a concern.", source: "NIH; USDA" },
  { pattern: "milk powder", reason: "Convenient protein source but processing can oxidize the cholesterol.", source: "NIH; USDA" },
  { pattern: "pasteurized", reason: "Heat-treated for safety. Kills bad bacteria but also some beneficial ones.", source: "FDA; NIH" },

  // --- Dual Green/Red: Other ---
  { pattern: "whey", reason: "Fast-absorbing protein. Great post-workout. Quality varies by brand.", source: "NIH PMC6358922; USDA" },
  { pattern: "beer", reason: "Empty calories and gluten. Not doing your physique or sleep any favors.", source: "NIH; USDA" },
  { pattern: "cellulose", reason: "Plant fiber that's fine naturally. Heavily processed versions are filler.", source: "FDA; NIH" },

  // --- Dual Green/Yellow: Fruits (pesticide residue if non-organic) ---
  { pattern: "apple", reason: "Tons of nutrients but #1 on the Dirty Dozen. Go organic.", source: "EWG Dirty Dozen 2023; USDA" },
  { pattern: "strawberr", reason: "Packed with vitamin C but heavy pesticide residue. Buy organic.", source: "EWG Dirty Dozen 2023; USDA" },
  { pattern: "peach", reason: "Great vitamins but high pesticide risk. Organic is worth it here.", source: "EWG Dirty Dozen 2023; USDA" },
  { pattern: "nectarine", reason: "Similar to peaches — nutritious but spray-heavy. Go organic.", source: "EWG Dirty Dozen 2023; USDA" },
  { pattern: "cherry juice", reason: "Great for recovery and sleep. Watch the sugar content though.", source: "NIH PMC5579779; USDA" },
  { pattern: "grape juice", reason: "Antioxidants are real but so is the sugar. Don't overdo it.", source: "USDA; NIH" },
  { pattern: "raisin", reason: "Concentrated vitamins AND concentrated sugar. Portion control matters.", source: "USDA" },

  // --- Dual Green/Yellow: Grains with gluten/pesticide concerns ---
  { pattern: "barley", reason: "Great fiber and nutrients. Contains gluten and may have pesticide residue.", source: "EWG; USDA" },
  { pattern: "wheat", reason: "Fine if you're not gluten-sensitive. Go organic to dodge pesticide residue.", source: "EWG; NIH" },
  { pattern: "rye", reason: "Good fiber source but contains gluten. Not for everyone.", source: "USDA; NIH" },
  { pattern: "semolina", reason: "Wheat-based flour used in pasta. Contains gluten.", source: "USDA" },
  { pattern: "durum", reason: "Hard wheat for pasta. Higher protein than regular wheat but still has gluten.", source: "USDA" },

  // --- Dual Green/Yellow: Vegetables with concerns ---
  { pattern: "spinach", reason: "Nutrient powerhouse but #2 on the Dirty Dozen. Buy organic.", source: "EWG Dirty Dozen 2023; USDA" },
  { pattern: "corn", reason: "Decent whole grain but often GMO. Organic is a safer bet.", source: "USDA; NBFDS" },

  // --- Dual Green/Yellow: Grains with pesticide concerns ---
  { pattern: "oat", reason: "Amazing fiber source. Go organic to avoid glyphosate residue.", source: "EWG 2023; NIH" },
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
  patterns: { pattern: string; reason: string; source?: string }[],
): { pattern: string; reason: string; source?: string } | null {
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
