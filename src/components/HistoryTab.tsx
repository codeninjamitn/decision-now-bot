import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getStats } from "@/data/history";
import type { Category } from "@/data/recommendations";

const transition = { duration: 0.3, ease: [0.2, 0, 0, 1] as [number, number, number, number] };

const CATEGORY_LABELS: Record<Category, { emoji: string; label: string; colorClass: string }> = {
  watch: { emoji: "📺", label: "Watch", colorClass: "category-watch" },
  eat: { emoji: "🍽️", label: "Eat", colorClass: "category-eat" },
  read: { emoji: "📖", label: "Read", colorClass: "category-read" },
  listen: { emoji: "🎧", label: "Listen", colorClass: "category-listen" },
};

const MOOD_COLORS: Record<string, string> = {
  Healthy: 'text-green-600 dark:text-green-400',
  Indulge: 'text-amber-600 dark:text-amber-400',
  Comfort: 'text-orange-600 dark:text-orange-400',
};

export default function HistoryTab() {
  const [stats, setStats] = useState(getStats());

  useEffect(() => {
    setStats(getStats());
  }, []);

  const categories: Category[] = ["watch", "eat", "read", "listen"];

  if (stats.total === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center max-w-md mx-auto px-6 pb-20">
        <p className="text-muted-foreground text-sm">No recommendations yet.</p>
        <p className="text-xs text-muted-foreground mt-1">Start by picking a category from Home.</p>
      </div>
    );
  }

  const topLanguages = Object.entries(stats.byLanguage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const foodMoods = Object.entries(stats.byFoodMood)
    .sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen max-w-md mx-auto px-6 pt-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <h1 className="text-headline mb-2">My Patterns</h1>
        <p className="text-xs text-muted-foreground mb-8">{stats.total} total recommendations</p>

        {/* Category breakdown */}
        <section className="mb-8">
          <p className="text-meta mb-4">By Category</p>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(cat => {
              const meta = CATEGORY_LABELS[cat];
              const count = stats.byCategory[cat];
              const noRegret = stats.noRegretByCategory[cat];
              const regret = stats.regretByCategory[cat];
              const total = noRegret + regret;
              const regretRate = total > 0 ? Math.round((regret / total) * 100) : 0;

              return (
                <div key={cat} className="bg-card shadow-card rounded-xl p-4">
                  <p className="text-lg mb-1">{meta.emoji}</p>
                  <p className={`text-xs font-medium ${meta.colorClass} mb-1`}>{meta.label}</p>
                  <p className="text-2xl font-semibold text-foreground">{count}</p>
                  {total > 0 && (
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {regretRate}% regret rate
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Language breakdown */}
        {topLanguages.length > 0 && (
          <section className="mb-8">
            <p className="text-meta mb-4">Top Languages</p>
            {topLanguages.map(([lang, count]) => (
              <div key={lang} className="flex items-center justify-between py-1.5">
                <span className="text-sm text-foreground">{lang}</span>
                <span className="text-xs text-muted-foreground">{count} picks</span>
              </div>
            ))}
          </section>
        )}

        {/* Food mood breakdown */}
        {foodMoods.length > 0 && (
          <section className="mb-8">
            <p className="text-meta mb-4">Food Mood</p>
            {foodMoods.map(([mood, count]) => (
              <div key={mood} className="flex items-center justify-between py-1.5">
                <span className={`text-sm font-medium ${MOOD_COLORS[mood] || 'text-foreground'}`}>{mood}</span>
                <span className="text-xs text-muted-foreground">{count} picks</span>
              </div>
            ))}
          </section>
        )}

        {/* Best performing */}
        <section className="mb-8">
          <p className="text-meta mb-4">Best Performing</p>
          {categories
            .filter(c => stats.noRegretByCategory[c] > 0)
            .sort((a, b) => stats.noRegretByCategory[b] - stats.noRegretByCategory[a])
            .slice(0, 2)
            .map(cat => (
              <div key={cat} className="flex items-center gap-3 mb-2">
                <span>{CATEGORY_LABELS[cat].emoji}</span>
                <span className="text-sm text-foreground">{CATEGORY_LABELS[cat].label}</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {stats.noRegretByCategory[cat]} no-regrets
                </span>
              </div>
            ))}
        </section>

        {/* Vibe by time */}
        <section className="mb-8">
          <p className="text-meta mb-4">Your Vibe by Time</p>
          {(["morning", "afternoon", "evening", "night"] as const).map(time => {
            const timeData = stats.byTimeAndCategory[time];
            const topCat = categories.reduce((a, b) =>
              timeData[a] >= timeData[b] ? a : b
            );
            const count = timeData[topCat];
            if (count === 0) return null;

            return (
              <div key={time} className="flex items-center justify-between py-1.5">
                <span className="text-sm text-foreground capitalize">{time}</span>
                <span className="text-xs text-muted-foreground">
                  {CATEGORY_LABELS[topCat].emoji} {CATEGORY_LABELS[topCat].label} ({count})
                </span>
              </div>
            );
          })}
        </section>

        {/* Recent history */}
        <section>
          <p className="text-meta mb-4">Recent</p>
          {stats.history.slice(0, 10).map(entry => (
            <div key={entry.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-2">
                <span className="text-sm">{CATEGORY_LABELS[entry.category].emoji}</span>
                <div>
                  <p className="text-sm text-foreground line-clamp-1">
                    {entry.itemTitle}
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </span>
                    {entry.friendName && (
                      <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-[9px] font-medium text-primary">
                        🤝 via {entry.friendName}
                      </span>
                    )}
                    {entry.language && (
                      <span className="text-[10px] text-muted-foreground">· {entry.language}</span>
                    )}
                  </div>
                </div>
              </div>
              <span className="text-xs">
                {entry.feedback === "no-regret" && "✓"}
                {entry.feedback === "regret" && "😬"}
                {!entry.feedback && "—"}
              </span>
            </div>
          ))}
        </section>
      </motion.div>
    </div>
  );
}
