export interface OnboardingQuestion {
  id: string;
  question: string;
  options: string[];
  multiSelect: boolean;
  maxSelections?: number;
  minSelections?: number;
  groups?: { label: string; options: string[] }[];
}

export const LANGUAGE_OPTIONS = [
  'Assamese', 'Bengali', 'English', 'Gujarati', 'Hindi', 'Kannada', 'Kashmiri',
  'Malayalam', 'Marathi', 'Oriya', 'Punjabi', 'Tamil', 'Telugu',
];

export const CUISINE_GROUPS = [
  {
    label: '🇮🇳 Indian',
    options: ['Assamese', 'Bengali', 'Gujarati', 'Kashmiri', 'Maharashtrian', 'North Indian', 'Oriya', 'Punjabi', 'Rajasthani', 'South Indian'],
  },
  {
    label: '🌍 International',
    options: ['American', 'Burmese', 'Chinese', 'Continental', 'Greek', 'Italian', 'Malay', 'Mediterranean', 'Spanish', 'Thai', 'Vietnamese'],
  },
];

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: 'timeOfDay',
    question: 'When do you usually use this?',
    options: ['Morning', 'Afternoon', 'Evening', 'Night'],
    multiSelect: false,
  },
  {
    id: 'languages',
    question: 'Which languages do you enjoy consuming content in?',
    options: LANGUAGE_OPTIONS,
    multiSelect: true,
    minSelections: 1,
  },
  {
    id: 'watchTags',
    question: 'Pick 3 YouTube categories you enjoy',
    options: ['Chill/ASMR', 'Comedy', 'Fitness', 'Food', 'Gaming', 'Learning', 'News', 'Tech'],
    multiSelect: true,
    maxSelections: 3,
  },
  {
    id: 'readTags',
    question: 'Pick 3 reading interests',
    options: ['Culture', 'Design', 'Fiction/Stories', 'Finance', 'Philosophy', 'Science', 'Self-improvement', 'Technology'],
    multiSelect: true,
    maxSelections: 3,
  },
  {
    id: 'listenTags',
    question: 'Pick 3 listening preferences',
    options: ['Audiobooks', 'Chill Music', 'Comedy Podcasts', 'Focus/Lo-fi', 'Interviews', 'Motivational', 'News Briefings', 'True Crime'],
    multiSelect: true,
    maxSelections: 3,
  },
  {
    id: 'foodPreference',
    question: 'Your food preference',
    options: [], // Handled as compound step
    multiSelect: false,
  },
  {
    id: 'cuisines',
    question: 'Pick your cuisine preferences',
    options: [...CUISINE_GROUPS[0].options, ...CUISINE_GROUPS[1].options],
    multiSelect: true,
    minSelections: 2,
    groups: CUISINE_GROUPS,
  },
];

export type FoodType = 'Veg' | 'Non-Veg' | 'Both';
export type FoodMood = 'Healthy' | 'Indulge' | 'Comfort';
export type FoodPlatform = 'swiggy' | 'zomato' | 'any';

export interface UserProfile {
  timeOfDay: string;
  languages: string[];
  watchTags: string[];
  readTags: string[];
  listenTags: string[];
  foodType: FoodType;
  foodMood: FoodMood;
  foodPlatform: FoodPlatform;
  cuisines: string[];
  // Legacy compat
  eatTags?: string[];
}

export function saveProfile(profile: UserProfile) {
  localStorage.setItem('zr-profile', JSON.stringify(profile));
}

export function loadProfile(): UserProfile | null {
  const raw = localStorage.getItem('zr-profile');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    // Migration: old profiles without languages
    if (!parsed.languages) {
      parsed.languages = ['English'];
    }
    if (!parsed.foodType) {
      parsed.foodType = 'Both';
      parsed.foodMood = 'Comfort';
      parsed.cuisines = parsed.eatTags || ['North Indian', 'Chinese'];
    }
    if (!parsed.foodPlatform) {
      parsed.foodPlatform = 'any';
    }
    return parsed;
  } catch {
    return null;
  }
}
