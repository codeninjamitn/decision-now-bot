import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Onboarding from "@/components/Onboarding";
import HomeGrid from "@/components/HomeGrid";
import RecommendationCard from "@/components/RecommendationCard";
import ProfileTab from "@/components/ProfileTab";
import HistoryTab from "@/components/HistoryTab";
import BottomNav, { type Tab } from "@/components/BottomNav";
import { loadProfile, UserProfile } from "@/data/onboarding";
import type { Category } from "@/data/recommendations";
import type { Friend } from "@/data/friends";

type View = "onboarding" | "main";

const Index = () => {
  const [view, setView] = useState<View>("onboarding");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tab, setTab] = useState<Tab>("home");
  const [category, setCategory] = useState<Category | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  useEffect(() => {
    const saved = loadProfile();
    if (saved) {
      setProfile(saved);
      setView("main");
    }
  }, []);

  // Re-init theme class on mount
  useEffect(() => {
    const theme = localStorage.getItem("zr-theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
  }, []);

  const handleOnboardingComplete = (p: UserProfile) => {
    setProfile(p);
    setView("main");
  };

  const handleCategorySelect = (cat: Category, friend?: Friend) => {
    setCategory(cat);
    setSelectedFriend(friend || null);
    setShowRecommendation(true);
  };

  const handleHome = () => {
    setShowRecommendation(false);
    setCategory(null);
    setSelectedFriend(null);
  };

  const handleResetProfile = () => {
    setProfile(null);
    setView("onboarding");
    setTab("home");
    setShowRecommendation(false);
  };

  if (view === "onboarding") {
    return (
      <div className="min-h-screen bg-background">
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {showRecommendation && profile && category ? (
          <RecommendationCard
            key="recommendation"
            category={category}
            profile={profile}
            onHome={handleHome}
            friend={selectedFriend}
          />
        ) : tab === "home" ? (
          <HomeGrid key="home" onSelect={handleCategorySelect} />
        ) : tab === "profile" ? (
          <ProfileTab key="profile" onResetProfile={handleResetProfile} />
        ) : tab === "history" ? (
          <HistoryTab key="history" />
        ) : null}
      </AnimatePresence>

      {!showRecommendation && <BottomNav active={tab} onChange={setTab} />}
    </div>
  );
};

export default Index;
