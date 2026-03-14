import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Category, TimeOfDay, WatchItem, EatItem, ReadItem, ListenItem } from "@/data/recommendations";
import { WATCH_DATA, EAT_DATA, READ_DATA, LISTEN_DATA, getRecommendation } from "@/data/recommendations";
import type { UserProfile } from "@/data/onboarding";

const transition = { duration: 0.4, ease: [0.2, 0, 0, 1] as [number, number, number, number] };

interface RecommendationCardProps {
  category: Category;
  profile: UserProfile;
  onHome: () => void;
}

type AnyItem = WatchItem | EatItem | ReadItem | ListenItem;

const CATEGORY_META: Record<Category, { label: string; actionLabel: string; colorClass: string }> = {
  watch: { label: "Watch", actionLabel: "Open on YouTube", colorClass: "category-watch" },
  eat: { label: "Eat", actionLabel: "Order on Swiggy", colorClass: "category-eat" },
  read: { label: "Read", actionLabel: "Read Now", colorClass: "category-read" },
  listen: { label: "Listen", actionLabel: "Play on Spotify", colorClass: "category-listen" },
};

function getItem(category: Category, profile: UserProfile): AnyItem {
  const time = profile.timeOfDay as TimeOfDay;
  switch (category) {
    case "watch": return getRecommendation(WATCH_DATA, profile.watchTags, time);
    case "eat": return getRecommendation(EAT_DATA, profile.eatTags, time);
    case "read": return getRecommendation(READ_DATA, profile.readTags, time);
    case "listen": return getRecommendation(LISTEN_DATA, profile.listenTags, time);
  }
}

function getUrl(category: Category, item: AnyItem): string {
  if ("url" in item) return (item as { url: string }).url;
  return "https://www.swiggy.com";
}

export default function RecommendationCard({ category, profile, onHome }: RecommendationCardProps) {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<AnyItem | null>(null);
  const [rerolled, setRerolled] = useState(false);

  const meta = CATEGORY_META[category];

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setItem(getItem(category, profile));
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    generate();
  }, [category]);

  const handleReroll = () => {
    setRerolled(true);
    generate();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center max-w-md mx-auto px-6">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="flex flex-col items-center"
          >
            <div className="w-full max-w-xs">
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-foreground rounded-full"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  style={{ width: "40%" }}
                />
              </div>
              <p className="text-meta text-center mt-6">Finding the best for you...</p>
            </div>
          </motion.div>
        ) : item ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={transition}
          >
            <p className={`text-meta mb-3 ${meta.colorClass}`}>{meta.label}</p>
            <p className="text-sm text-muted-foreground mb-6">We found this for you.</p>

            <div className="shadow-card rounded-2xl bg-card p-6 mb-6">
              {category === "watch" && (() => {
                const w = item as WatchItem;
                return (
                  <>
                    <h2 className="text-recommendation mb-2">{w.title}</h2>
                    <p className="text-meta mb-1">{w.channel}</p>
                    <p className="text-meta">{w.duration}</p>
                  </>
                );
              })()}

              {category === "eat" && (() => {
                const e = item as EatItem;
                return (
                  <>
                    <span className="text-4xl mb-3 block">{e.emoji}</span>
                    <h2 className="text-recommendation mb-1">{e.name}</h2>
                    <p className="text-meta mb-1">{e.cuisine}</p>
                    <p className="text-meta">{e.price}</p>
                  </>
                );
              })()}

              {category === "read" && (() => {
                const r = item as ReadItem;
                return (
                  <>
                    <span className="text-3xl mb-3 block">{r.emoji}</span>
                    <h2 className="text-recommendation mb-2">{r.title}</h2>
                    <p className="text-meta mb-1">{r.source}</p>
                    <div className="flex gap-3 items-center">
                      <span className="text-meta">{r.topic}</span>
                      <span className="text-meta">·</span>
                      <span className="text-meta">{r.readTime}</span>
                    </div>
                  </>
                );
              })()}

              {category === "listen" && (() => {
                const l = item as ListenItem;
                return (
                  <>
                    <span className="text-3xl mb-3 block">{l.emoji}</span>
                    <h2 className="text-recommendation mb-2">{l.title}</h2>
                    <p className="text-meta mb-1">{l.creator}</p>
                    <p className="text-meta">{l.duration}</p>
                  </>
                );
              })()}
            </div>

            {/* Action button */}
            <motion.a
              href={getUrl(category, item)}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
              className="block h-14 w-full rounded-xl bg-foreground text-background font-medium text-sm flex items-center justify-center shadow-card active:scale-[0.97] transition-transform"
            >
              {meta.actionLabel}
            </motion.a>

            {/* Re-roll */}
            {!rerolled && (
              <button
                onClick={handleReroll}
                className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Not this time.
              </button>
            )}

            {/* Back home */}
            <button
              onClick={onHome}
              className="mt-6 w-full text-center text-meta hover:text-foreground transition-colors"
            >
              ← Start over
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
