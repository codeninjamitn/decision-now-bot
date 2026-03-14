import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import type { Category, WatchItem, EatItem, ReadItem, ListenItem, TimeOfDay } from "@/data/recommendations";
import { WATCH_DATA, EAT_DATA, READ_DATA, LISTEN_DATA, getRecommendation } from "@/data/recommendations";
import type { UserProfile } from "@/data/onboarding";
import { addHistoryEntry, updateHistoryFeedback } from "@/data/history";
import { getTimeOverride } from "@/data/timeOverride";
import type { Friend } from "@/data/friends";
import { blendProfiles } from "@/data/friends";

const transition = { duration: 0.4, ease: [0.2, 0, 0, 1] as [number, number, number, number] };

interface RecommendationCardProps {
  category: Category;
  profile: UserProfile;
  onHome: () => void;
  friend?: Friend | null;
}

type AnyItem = WatchItem | EatItem | ReadItem | ListenItem;

const CATEGORY_META: Record<Category, { label: string; actionLabel: string; colorClass: string }> = {
  watch: { label: "Watch", actionLabel: "Let's go →", colorClass: "category-watch" },
  eat: { label: "Eat", actionLabel: "Let's go →", colorClass: "category-eat" },
  read: { label: "Read", actionLabel: "Let's go →", colorClass: "category-read" },
  listen: { label: "Listen", actionLabel: "Let's go →", colorClass: "category-listen" },
};

function getItem(category: Category, profile: UserProfile): AnyItem {
  const override = getTimeOverride();
  const time = (override || profile.timeOfDay) as TimeOfDay;
  switch (category) {
    case "watch": return getRecommendation(WATCH_DATA, profile.watchTags, time);
    case "eat": return getRecommendation(EAT_DATA, profile.eatTags, time);
    case "read": return getRecommendation(READ_DATA, profile.readTags, time);
    case "listen": return getRecommendation(LISTEN_DATA, profile.listenTags, time);
  }
}

function getUrl(category: Category, item: AnyItem): string {
  if (category === "watch" && "url" in item) return (item as WatchItem).url;
  if (category === "eat") {
    const e = item as EatItem;
    return `https://www.swiggy.com/search?query=${encodeURIComponent(e.name)}`;
  }
  if (category === "read" && "url" in item) return (item as ReadItem).url;
  if (category === "listen" && "url" in item) return (item as ListenItem).url;
  return "#";
}

function getItemTitle(category: Category, item: AnyItem): string {
  if ("title" in item) return (item as { title: string }).title;
  if ("name" in item) return (item as { name: string }).name;
  return "Unknown";
}

export default function RecommendationCard({ category, profile, onHome, friend }: RecommendationCardProps) {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<AnyItem | null>(null);
  const [rerolled, setRerolled] = useState(false);
  const [historyId, setHistoryId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<"none" | "regret-form" | "done">("none");
  const [regretNote, setRegretNote] = useState("");

  const meta = CATEGORY_META[category];

  const effectiveProfile = friend ? blendProfiles(profile, friend.profile) : profile;

  const generate = (useOwnProfile = false) => {
    setLoading(true);
    setFeedbackState("none");
    setRegretNote("");
    const p = useOwnProfile ? profile : effectiveProfile;
    setTimeout(() => {
      const newItem = getItem(category, p);
      setItem(newItem);
      const override = getTimeOverride();
      const time = (override || profile.timeOfDay) as TimeOfDay;
      const entry = addHistoryEntry({
        category,
        itemTitle: getItemTitle(category, newItem),
        timeOfDay: time,
        feedback: null,
        friendId: useOwnProfile ? undefined : friend?.id,
        friendName: useOwnProfile ? undefined : friend?.name,
      });
      setHistoryId(entry.id);
      setLoading(false);
    }, 1200);
  };

  useState(() => { generate(); });

  const handleReroll = () => {
    setRerolled(true);
    generate();
  };

  const handleNoRegret = () => {
    if (historyId) updateHistoryFeedback(historyId, "no-regret");
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#4dd0e1", "#ffb74d", "#7c6bc4", "#e57373"],
    });
    setFeedbackState("done");
    setTimeout(onHome, 1500);
  };

  const handleRegretSubmit = () => {
    if (historyId) updateHistoryFeedback(historyId, "regret", regretNote);
    setFeedbackState("done");
    setTimeout(onHome, 2000);
  };

  const handleUseOwnTaste = () => {
    setRerolled(false);
    generate(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center max-w-md mx-auto px-6 pb-20">
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

            {friend && (
              <p className="text-xs text-muted-foreground mb-4">
                Picked for you, {friend.name}'s style 👀
              </p>
            )}

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

            {feedbackState === "none" && (
              <>
                {/* CTA */}
                <motion.a
                  href={getUrl(category, item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  className="block h-14 w-full rounded-xl bg-foreground text-background font-medium text-sm flex items-center justify-center shadow-card active:scale-[0.97] transition-transform"
                >
                  {meta.actionLabel}
                </motion.a>

                {/* Feedback buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setFeedbackState("regret-form")}
                    className="flex-1 py-3 text-xs text-muted-foreground hover:text-foreground border border-border rounded-xl transition-colors"
                  >
                    Yes, regret this
                  </button>
                  <button
                    onClick={handleNoRegret}
                    className="flex-1 py-3 text-xs text-foreground bg-card shadow-card rounded-xl hover:shadow-card-hover transition-all"
                  >
                    No regrets ✓
                  </button>
                </div>

                {/* Re-roll */}
                {!rerolled && (
                  <button
                    onClick={handleReroll}
                    className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Not this time.
                  </button>
                )}

                {/* Use own taste when friend-influenced */}
                {friend && (
                  <button
                    onClick={handleUseOwnTaste}
                    className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Use my own taste instead
                  </button>
                )}
              </>
            )}

            {feedbackState === "regret-form" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2"
              >
                <p className="text-sm text-foreground mb-3">What would have been better?</p>
                <textarea
                  value={regretNote}
                  onChange={e => setRegretNote(e.target.value)}
                  placeholder="Tell us..."
                  className="w-full bg-card border border-border rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground resize-none h-20 focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <button
                  onClick={handleRegretSubmit}
                  className="mt-3 w-full h-12 rounded-xl bg-foreground text-background text-sm font-medium"
                >
                  Submit
                </button>
              </motion.div>
            )}

            {feedbackState === "done" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-muted-foreground mt-6"
              >
                {historyId && regretNote ? "Got it. I'll do better next time." : "🎉"}
              </motion.p>
            )}

            {/* Back home */}
            {feedbackState !== "done" && (
              <button
                onClick={onHome}
                className="mt-6 w-full text-center text-meta hover:text-foreground transition-colors"
              >
                ← Start over
              </button>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
