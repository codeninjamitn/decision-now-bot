import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Onboarding from "@/components/Onboarding";
import HomeGrid from "@/components/HomeGrid";
import RecommendationCard from "@/components/RecommendationCard";
import { loadProfile, UserProfile } from "@/data/onboarding";
import type { Category } from "@/data/recommendations";

type View = "onboarding" | "home" | "recommendation";

const Index = () => {
  const [view, setView] = useState<View>("onboarding");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const saved = loadProfile();
    if (saved) {
      setProfile(saved);
      setView("home");
    }
  }, []);

  const handleOnboardingComplete = (p: UserProfile) => {
    setProfile(p);
    setView("home");
  };

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat);
    setView("recommendation");
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {view === "onboarding" && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
        {view === "home" && (
          <HomeGrid onSelect={handleCategorySelect} />
        )}
        {view === "recommendation" && profile && category && (
          <RecommendationCard
            category={category}
            profile={profile}
            onHome={() => setView("home")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
