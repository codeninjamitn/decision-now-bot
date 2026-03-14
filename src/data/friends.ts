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
    if (decoded.timeOfDay && decoded.watchTags && decoded.eatTags && decoded.readTags && decoded.listenTags) {
      return decoded as UserProfile;
    }
    return null;
  } catch {
    return null;
  }
}

export function blendProfiles(userProfile: UserProfile, friendProfile: UserProfile): UserProfile {
  // Friend 60%, User 40% — we blend by combining tags with friend tags prioritized
  const blend = (userTags: string[], friendTags: string[]): string[] => {
    const combined = [...new Set([...friendTags, ...userTags])];
    return combined;
  };

  return {
    timeOfDay: userProfile.timeOfDay,
    watchTags: blend(userProfile.watchTags, friendProfile.watchTags),
    eatTags: blend(userProfile.eatTags, friendProfile.eatTags),
    readTags: blend(userProfile.readTags, friendProfile.readTags),
    listenTags: blend(userProfile.listenTags, friendProfile.listenTags),
  };
}
