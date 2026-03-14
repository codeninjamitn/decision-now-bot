import { motion } from "framer-motion";
import type { Category } from "@/data/recommendations";

const CATEGORIES: { id: Category; label: string; emoji: string; colorClass: string; bgClass: string }[] = [
  { id: "watch", label: "Watch something", emoji: "📺", colorClass: "category-watch", bgClass: "bg-category-watch" },
  { id: "eat", label: "Eat something", emoji: "🍽️", colorClass: "category-eat", bgClass: "bg-category-eat" },
  { id: "read", label: "Read something", emoji: "📖", colorClass: "category-read", bgClass: "bg-category-read" },
  { id: "listen", label: "Listen to something", emoji: "🎧", colorClass: "category-listen", bgClass: "bg-category-listen" },
];

const transition = { duration: 0.4, ease: [0.2, 0, 0, 1] as [number, number, number, number] };

interface HomeGridProps {
  onSelect: (category: Category) => void;
}

export default function HomeGrid({ onSelect }: HomeGridProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center max-w-md mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <p className="text-meta mb-3">Zero Regret</p>
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
      </motion.div>
    </div>
  );
}
