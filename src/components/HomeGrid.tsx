import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Category } from "@/data/recommendations";
import BuildItCTA from "@/components/BuildItCTA";
import { loadFriends, type Friend } from "@/data/friends";
import { getTimeOverride } from "@/data/timeOverride";

const CATEGORIES: { id: Category; label: string; emoji: string; colorClass: string; bgClass: string }[] = [
  { id: "watch", label: "Watch something", emoji: "📺", colorClass: "category-watch", bgClass: "bg-category-watch" },
  { id: "eat", label: "Eat something", emoji: "🍽️", colorClass: "category-eat", bgClass: "bg-category-eat" },
  { id: "read", label: "Read something", emoji: "📖", colorClass: "category-read", bgClass: "bg-category-read" },
  { id: "listen", label: "Listen to something", emoji: "🎧", colorClass: "category-listen", bgClass: "bg-category-listen" },
];

const transition = { duration: 0.4, ease: [0.2, 0, 0, 1] as [number, number, number, number] };

interface HomeGridProps {
  onSelect: (category: Category, friend?: Friend) => void;
}

export default function HomeGrid({ onSelect }: HomeGridProps) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const hasOverride = !!getTimeOverride();

  useEffect(() => {
    setFriends(loadFriends());
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center max-w-md mx-auto px-6 pb-20">
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
        <h1 className="text-headline mb-10">What do you need right now?</h1>

        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`aspect-square rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-200 flex flex-col items-start justify-end p-5 ${cat.bgClass}`}
            >
              <span className="text-3xl mb-2">{cat.emoji}</span>
              <span className="text-sm font-medium text-foreground">{cat.label}</span>
            </motion.button>
          ))}
        </div>

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
      </motion.div>
    </div>
  );
}
