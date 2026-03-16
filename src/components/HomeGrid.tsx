import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Category } from "@/data/recommendations";
import BuildItCTA from "@/components/BuildItCTA";
import { loadFriends, type Friend } from "@/data/friends";
import { getTimeOverride } from "@/data/timeOverride";

const ALL_CATEGORIES: Record<Category, { label: string; emoji: string; bgClass: string }> = {
  watch: { label: "Watch something", emoji: "📺", bgClass: "bg-category-watch" },
  eat: { label: "Eat something", emoji: "🍽️", bgClass: "bg-category-eat" },
  read: { label: "Read something", emoji: "📖", bgClass: "bg-category-read" },
  listen: { label: "Listen to something", emoji: "🎧", bgClass: "bg-category-listen" },
};

type TimeSlot = "morning" | "afternoon" | "evening" | "night";

function getCurrentTimeSlot(): TimeSlot {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "evening";
  return "night";
}

const TIME_PRIMARY: Record<TimeSlot, Category[]> = {
  morning: ["listen", "eat"],
  afternoon: ["eat", "listen", "read"],
  evening: ["eat"],
  night: ["watch", "read"],
};

const TIME_GREETING: Record<TimeSlot, string> = {
  morning: "Good morning ☀️",
  afternoon: "Good afternoon 🌤️",
  evening: "Good evening 🌅",
  night: "Night owl? 🌙",
};

const transition = { duration: 0.4, ease: [0.2, 0, 0, 1] as [number, number, number, number] };

interface HomeGridProps {
  onSelect: (category: Category, friend?: Friend) => void;
}

export default function HomeGrid({ onSelect }: HomeGridProps) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const hasOverride = !!getTimeOverride();

  const timeSlot = getCurrentTimeSlot();
  const primaryIds = TIME_PRIMARY[timeSlot];
  const secondaryIds = (Object.keys(ALL_CATEGORIES) as Category[]).filter(c => !primaryIds.includes(c));

  useEffect(() => {
    setFriends(loadFriends());
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center max-w-md mx-auto px-6 pt-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <div className="flex items-center gap-2 mb-3">
          <p className="text-meta">Zero Regret</p>
          {hasOverride && (
            <span className="w-2 h-2 rounded-full bg-accent-eat" title="Time override active" />
          )}
        </div>
        <h1 className="text-headline mb-2">{TIME_GREETING[timeSlot]}</h1>
        <p className="text-sm text-muted-foreground mb-8">We believe you want to...</p>

        {/* Primary recommendations */}
        <div className={`grid ${primaryIds.length === 1 ? "grid-cols-1" : "grid-cols-2"} gap-4`}>
          {primaryIds.map(id => {
            const cat = ALL_CATEGORIES[id];
            return (
              <motion.button
                key={id}
                onClick={() => onSelect(id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`aspect-square rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-200 flex flex-col items-start justify-end p-5 ${cat.bgClass}`}
              >
                <span className="text-3xl mb-2">{cat.emoji}</span>
                <span className="text-sm font-medium text-foreground">{cat.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Secondary options */}
        {secondaryIds.length > 0 && (
          <div className="mt-6">
            <p className="text-xs text-muted-foreground mb-3">You could also do these</p>
            <div className="grid grid-cols-2 gap-3">
              {secondaryIds.map(id => {
                const cat = ALL_CATEGORIES[id];
                return (
                  <motion.button
                    key={id}
                    onClick={() => onSelect(id)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className={`rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-200 flex items-center gap-3 p-4 ${cat.bgClass} opacity-80`}
                  >
                    <span className="text-xl">{cat.emoji}</span>
                    <span className="text-xs font-medium text-foreground">{cat.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Friend pills */}
        {friends.length > 0 && (
          <div className="mt-8">
            <p className="text-xs text-muted-foreground mb-3">🤝 Surprise me like...</p>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
              {friends.map(friend => (
                <button
                  key={friend.id}
                  onClick={() => {
                    // Will pick a random category with friend influence
                    const cats: Category[] = ["watch", "eat", "read", "listen"];
                    const randomCat = cats[Math.floor(Math.random() * cats.length)];
                    onSelect(randomCat, friend);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-card hover:shadow-card-hover transition-all whitespace-nowrap text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-foreground">
                    {friend.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-foreground">{friend.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <BuildItCTA />
      </motion.div>
    </div>
  );
}
