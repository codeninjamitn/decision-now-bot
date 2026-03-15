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

export function generateShareCode(profile: UserProfile): string {
  return btoa(JSON.stringify(profile));
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
