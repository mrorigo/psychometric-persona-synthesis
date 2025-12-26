import type { BFI2Item } from "../lib/types.ts";

export const INTENSITY_MAP: Record<number, string> = {
  1: "not at all",
  2: "rarely",
  3: "sometimes",
  4: "fairly",
  5: "very",
};

export const BFI2_ITEMS: BFI2Item[] = [
  // Extraversion
  { id: 1, domain: 'Extraversion', isReverse: false, description: "sociable" },
  { id: 6, domain: 'Extraversion', isReverse: false, description: "assertive" },
  { id: 11, domain: 'Extraversion', isReverse: false, description: "energetic" },
  { id: 16, domain: 'Extraversion', isReverse: true, description: "quiet" },
  { id: 21, domain: 'Extraversion', isReverse: false, description: "dominant" },
  { id: 26, domain: 'Extraversion', isReverse: false, description: "active" },
  { id: 31, domain: 'Extraversion', isReverse: true, description: "shy" },
  { id: 36, domain: 'Extraversion', isReverse: false, description: "influential" },
  { id: 41, domain: 'Extraversion', isReverse: false, description: "enthusiastic" },
  { id: 46, domain: 'Extraversion', isReverse: false, description: "talkative" },
  { id: 51, domain: 'Extraversion', isReverse: true, description: "passive" },
  { id: 56, domain: 'Extraversion', isReverse: false, description: "eager" },

  // Agreeableness
  { id: 2, domain: 'Agreeableness', isReverse: false, description: "compassionate" },
  { id: 7, domain: 'Agreeableness', isReverse: false, description: "respectful" },
  { id: 12, domain: 'Agreeableness', isReverse: true, description: "critical" },
  { id: 17, domain: 'Agreeableness', isReverse: false, description: "sympathetic" },
  { id: 22, domain: 'Agreeableness', isReverse: true, description: "argumentative" },
  { id: 27, domain: 'Agreeableness', isReverse: false, description: "forgiving" },
  { id: 32, domain: 'Agreeableness', isReverse: false, description: "helpful" },
  { id: 37, domain: 'Agreeableness', isReverse: true, description: "rude" },
  { id: 42, domain: 'Agreeableness', isReverse: false, description: "trusting" },
  { id: 47, domain: 'Agreeableness', isReverse: true, description: "aloof" },
  { id: 52, domain: 'Agreeableness', isReverse: false, description: "polite" },
  { id: 57, domain: 'Agreeableness', isReverse: false, description: "optimistic about others" },


  // Conscientiousness
  { id: 3, domain: 'Conscientiousness', isReverse: true, description: "disorganized" },
  { id: 8, domain: 'Conscientiousness', isReverse: true, description: "distractible" },
  { id: 13, domain: 'Conscientiousness', isReverse: false, description: "dependable" },
  { id: 18, domain: 'Conscientiousness', isReverse: false, description: "orderly" },
  { id: 23, domain: 'Conscientiousness', isReverse: true, description: "procrastinating" },
  { id: 28, domain: 'Conscientiousness', isReverse: false, description: "thorough" },
  { id: 33, domain: 'Conscientiousness', isReverse: false, description: "tidy" },
  { id: 38, domain: 'Conscientiousness', isReverse: false, description: "efficient" },
  { id: 43, domain: 'Conscientiousness', isReverse: false, description: "reliable" },
  { id: 48, domain: 'Conscientiousness', isReverse: true, description: "careless" },
  { id: 53, domain: 'Conscientiousness', isReverse: false, description: "persistent" },
  { id: 58, domain: 'Conscientiousness', isReverse: false, description: "responsible" },

  // Negative Emotionality (Neuroticism)
  { id: 4, domain: 'Neuroticism', isReverse: true, description: "relaxed" },
  { id: 9, domain: 'Neuroticism', isReverse: true, description: "optimistic" },
  { id: 14, domain: 'Neuroticism', isReverse: false, description: "moody" },
  { id: 19, domain: 'Neuroticism', isReverse: false, description: "tense" },
  { id: 24, domain: 'Neuroticism', isReverse: true, description: "secure" },
  { id: 29, domain: 'Neuroticism', isReverse: true, description: "stable" },
  { id: 34, domain: 'Neuroticism', isReverse: false, description: "anxious" },
  { id: 39, domain: 'Neuroticism', isReverse: false, description: "sad" },
  { id: 44, domain: 'Neuroticism', isReverse: true, description: "composed" },
  { id: 49, domain: 'Neuroticism', isReverse: false, description: "worried" },
  { id: 54, domain: 'Neuroticism', isReverse: false, description: "depressed" },
  { id: 59, domain: 'Neuroticism', isReverse: false, description: "temperamental" },

  // Open-Mindedness
  { id: 5, domain: 'Openness', isReverse: false, description: "original" },
  { id: 10, domain: 'Openness', isReverse: false, description: "curious" },
  { id: 15, domain: 'Openness', isReverse: false, description: "inventive" },
  { id: 20, domain: 'Openness', isReverse: false, description: "imaginative" },
  { id: 25, domain: 'Openness', isReverse: true, description: "conventional" },
  { id: 30, domain: 'Openness', isReverse: true, description: "routine-oriented" },
  { id: 35, domain: 'Openness', isReverse: false, description: "artistic" },
  { id: 40, domain: 'Openness', isReverse: false, description: "complex" },
  { id: 45, domain: 'Openness', isReverse: true, description: "literal-minded" },
  { id: 50, domain: 'Openness', isReverse: true, description: "practical" },
  { id: 55, domain: 'Openness', isReverse: true, description: "anti-intellectual" },
  { id: 60, domain: 'Openness', isReverse: false, description: "creative" },


];

export const BFI2_ITEM_MAP: Record<number, BFI2Item> = BFI2_ITEMS.reduce((map, item) => {
  map[item.id] = item;
  return map;
}, {} as Record<number, BFI2Item>);
