export interface OnboardingQuestion {
  id: string;
  question: string;
  options: string[];
  multiSelect: boolean;
  maxSelections?: number;
}

export const ONBOARDING_QUESTIONS: OnboardingQuestion[] = [
  {
    id: 'timeOfDay',
    question: 'When do you usually use this?',
    options: ['Morning', 'Afternoon', 'Evening', 'Night'],
    multiSelect: false,
  },
  {
    id: 'watchTags',
    question: 'Pick 3 YouTube categories you enjoy',
    options: ['Tech', 'Comedy', 'Learning', 'Chill/ASMR', 'Fitness', 'Food', 'News', 'Gaming'],
    multiSelect: true,
    maxSelections: 3,
  },
  {
    id: 'eatTags',
    question: 'Pick your food preferences',
    options: ['Veg', 'Non-Veg', 'Both', 'Indian', 'Chinese', 'Italian', 'Thai'],
    multiSelect: true,
    maxSelections: 4,
  },
  {
    id: 'readTags',
    question: 'Pick 3 reading interests',
    options: ['Technology', 'Philosophy', 'Science', 'Self-improvement', 'Fiction/Stories', 'Finance', 'Design', 'Culture'],
    multiSelect: true,
    maxSelections: 3,
  },
  {
    id: 'listenTags',
    question: 'Pick 3 listening preferences',
    options: ['True Crime', 'Comedy Podcasts', 'News Briefings', 'Chill Music', 'Focus/Lo-fi', 'Interviews', 'Motivational', 'Audiobooks'],
    multiSelect: true,
    maxSelections: 3,
  },
];

export interface UserProfile {
  timeOfDay: string;
  watchTags: string[];
  eatTags: string[];
  readTags: string[];
  listenTags: string[];
}

export function saveProfile(profile: UserProfile) {
  localStorage.setItem('zr-profile', JSON.stringify(profile));
}

export function loadProfile(): UserProfile | null {
  const raw = localStorage.getItem('zr-profile');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
