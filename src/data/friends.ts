import type { UserProfile } from "./onboarding";

export interface Friend {
  id: string;
  name: string;
  profile: UserProfile;
  addedAt: number;
}

const STORAGE_KEY = "zr-friends";
const MAX_FRIENDS = 5;

export function loadFriends(): Friend[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFriends(friends: Friend[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(friends));
}

export function addFriend(name: string, code: string): Friend | null {
  const friends = loadFriends();
  if (friends.length >= MAX_FRIENDS) return null;

  const profile = decodeShareCode(code);
  if (!profile) return null;

  const friend: Friend = {
    id: crypto.randomUUID(),
    name,
    profile,
    addedAt: Date.now(),
  };

  friends.push(friend);
  saveFriends(friends);
  return friend;
}

export function removeFriend(id: string) {
  const friends = loadFriends().filter(f => f.id !== id);
  saveFriends(friends);
}

// Compact encoding: t=timeOfDay(0-3), l=lang indices, w=watch indices, r=read indices, s=listen indices, f=foodType(0-2), m=foodMood(0-2), p=platform(0-2), c=cuisine indices
// Uses short delimited format instead of full JSON to keep QR scannable

const TIME_KEYS = ['morning', 'afternoon', 'evening', 'night'];
const LANG_KEYS = ['Assamese','Bengali','English','Gujarati','Hindi','Kannada','Kashmiri','Malayalam','Marathi','Oriya','Punjabi','Tamil','Telugu'];
const WATCH_KEYS = ['Chill/ASMR','Comedy','Fitness','Food','Gaming','Learning','News','Tech'];
const READ_KEYS = ['Culture','Design','Fiction/Stories','Finance','Philosophy','Science','Self-improvement','Technology'];
const LISTEN_KEYS = ['Audiobooks','Chill Music','Comedy Podcasts','Focus/Lo-fi','Interviews','Motivational','News Briefings','True Crime'];
const FOOD_TYPE_KEYS = ['Veg','Non-Veg','Both'];
const FOOD_MOOD_KEYS = ['Healthy','Indulge','Comfort'];
const PLATFORM_KEYS = ['swiggy','zomato','any'];
const CUISINE_KEYS = ['Assamese','Bengali','Gujarati','Kashmiri','Maharashtrian','North Indian','Oriya','Punjabi','Rajasthani','South Indian','American','Burmese','Chinese','Continental','Greek','Italian','Malay','Mediterranean','Spanish','Thai','Vietnamese'];

function indicesToStr(items: string[], keys: string[]): string {
  return items.map(i => keys.indexOf(i)).filter(i => i >= 0).join('.');
}

function strToItems(s: string, keys: string[]): string[] {
  if (!s) return [];
  return s.split('.').map(Number).filter(i => i >= 0 && i < keys.length).map(i => keys[i]);
}

export function generateShareCode(profile: UserProfile): string {
  const parts = [
    TIME_KEYS.indexOf(profile.timeOfDay),
    indicesToStr(profile.languages, LANG_KEYS),
    indicesToStr(profile.watchTags, WATCH_KEYS),
    indicesToStr(profile.readTags, READ_KEYS),
    indicesToStr(profile.listenTags, LISTEN_KEYS),
    FOOD_TYPE_KEYS.indexOf(profile.foodType),
    FOOD_MOOD_KEYS.indexOf(profile.foodMood),
    PLATFORM_KEYS.indexOf(profile.foodPlatform || 'any'),
    indicesToStr(profile.cuisines, CUISINE_KEYS),
  ];
  return btoa(parts.join(','));
}

export function decodeShareCode(code: string): UserProfile | null {
  try {
    const decoded = JSON.parse(atob(code));
    // Check for required fields (support both old and new profiles)
    if (decoded.timeOfDay && (decoded.watchTags || decoded.languages)) {
      // Ensure new fields have defaults
      if (!decoded.languages) decoded.languages = ['English'];
      if (!decoded.foodType) {
        decoded.foodType = 'Both';
        decoded.foodMood = 'Comfort';
        decoded.cuisines = decoded.eatTags || ['North Indian', 'Chinese'];
      }
      return decoded as UserProfile;
    }
    return null;
  } catch {
    return null;
  }
}

export function blendProfiles(userProfile: UserProfile, friendProfile: UserProfile): UserProfile {
  const blend = (userTags: string[], friendTags: string[]): string[] => {
    return [...new Set([...friendTags, ...userTags])];
  };

  return {
    timeOfDay: userProfile.timeOfDay,
    languages: [...new Set([...userProfile.languages, ...friendProfile.languages])],
    watchTags: blend(userProfile.watchTags, friendProfile.watchTags),
    readTags: blend(userProfile.readTags, friendProfile.readTags),
    listenTags: blend(userProfile.listenTags, friendProfile.listenTags),
    foodType: userProfile.foodType,
    foodMood: friendProfile.foodMood,
    foodPlatform: userProfile.foodPlatform,
    cuisines: blend(userProfile.cuisines, friendProfile.cuisines),
  };
}
