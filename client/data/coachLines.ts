export const COACH_LINES = {
  greetings: {
    notStarted: [
      "Lock in today, {mascot}.",
      "New day, same mission. Let's go.",
      "The essentials don't hit themselves.",
      "You know the drill. Nourish. Move. Rest.",
      "Another day to be locked in.",
    ],
    oneDown: [
      "One down. Keep it moving.",
      "Good start. Two more to lock in.",
      "That's one. Don't stop now.",
      "One pillar standing. Stack 'em up.",
    ],
    twoDown: [
      "Almost there. One more.",
      "Two locked. Finish what you started.",
      "One pillar left. You got this.",
      "So close to flow. Don't coast.",
    ],
    inFlow: [
      "Locked in.",
      "You're in flow. Everything's sharper now.",
      "All three hit. This is what it looks like.",
      "Flow state: activated.",
      "The essentials are handled. You're free.",
    ],
  },

  pillarReactions: {
    nourish: [
      "Fuel in. Now your brain works.",
      "Fed the machine. Smart.",
      "Clean food, clear head.",
      "Nutrition: handled.",
    ],
    move: [
      "Body moved. Mind follows.",
      "You showed up. That's the hard part.",
      "Movement unlocks everything.",
      "Sweated it out. Respect.",
    ],
    rest: [
      "Recovery isn't optional. Good call.",
      "Rest is the secret weapon.",
      "Recharged and ready.",
      "Sleep builds what training breaks.",
    ],
  },

  streakMessages: {
    started: "Day 1. The streak starts now.",
    building: "Day {streak}. Building momentum.",
    solid: "Day {streak}. You're consistent. That's rare.",
    fire: "{streak}-day streak. You're on fire.",
    legend: "{streak} days locked in. Legend status.",
  },

  scanReactions: {
    green: [
      "Stay hot",
      "You're hitting flow",
      "Your golden",
      "Holy dialed",
    ],
    yellow: [
      "Pretty mid",
      "Good effort",
      "I guess bro",
      "Not bad kid",
    ],
    red: [
      "You're better than that",
      "Need you to dial in",
      "You might be cooked",
      "You're selling",
    ],
  },
};

export function getRandomLine(lines: string[]): string {
  return lines[Math.floor(Math.random() * lines.length)];
}

export function getCoachGreeting(pillarsComplete: number, mascot: string): string {
  let lines: string[];
  if (pillarsComplete === 0) lines = COACH_LINES.greetings.notStarted;
  else if (pillarsComplete === 1) lines = COACH_LINES.greetings.oneDown;
  else if (pillarsComplete === 2) lines = COACH_LINES.greetings.twoDown;
  else lines = COACH_LINES.greetings.inFlow;
  return getRandomLine(lines).replace("{mascot}", mascot);
}

export function getStreakMessage(streak: number): string {
  let template: string;
  if (streak <= 1) template = COACH_LINES.streakMessages.started;
  else if (streak <= 3) template = COACH_LINES.streakMessages.building;
  else if (streak <= 7) template = COACH_LINES.streakMessages.solid;
  else if (streak <= 14) template = COACH_LINES.streakMessages.fire;
  else template = COACH_LINES.streakMessages.legend;
  return template.replace("{streak}", String(streak));
}

export function getPillarReaction(pillar: "nourish" | "move" | "rest"): string {
  return getRandomLine(COACH_LINES.pillarReactions[pillar]);
}

const _lastReaction: Record<string, string> = {};

export function getScanReaction(tier: "green" | "yellow" | "red"): string {
  const lines = COACH_LINES.scanReactions[tier];
  const last = _lastReaction[tier];
  const filtered = lines.filter((l) => l !== last);
  const pick = filtered[Math.floor(Math.random() * filtered.length)];
  _lastReaction[tier] = pick;
  return pick;
}
