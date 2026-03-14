import type { TimeOfDay } from "./recommendations";

const KEY = "zr-time-override";

export function getTimeOverride(): TimeOfDay | null {
  return sessionStorage.getItem(KEY) as TimeOfDay | null;
}

export function setTimeOverride(time: TimeOfDay) {
  sessionStorage.setItem(KEY, time);
}

export function clearTimeOverride() {
  sessionStorage.removeItem(KEY);
}

export function getEffectiveTime(profileTime: string): TimeOfDay {
  const override = getTimeOverride();
  if (override) return override;
  return profileTime as TimeOfDay;
}
