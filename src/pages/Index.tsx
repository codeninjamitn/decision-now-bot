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

interface SharedRec {
  title: string;
  category: Category;
  from: string;
}

const Index = () => {
  const [view, setView] = useState<View>("onboarding");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tab, setTab] = useState<Tab>("home");
  const [category, setCategory] = useState<Category | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [sharedRec, setSharedRec] = useState<SharedRec | null>(null);
  const [pendingSharedRec, setPendingSharedRec] = useState<SharedRec | null>(null);

  useEffect(() => {
    const saved = loadProfile();
    const params = new URLSearchParams(window.location.search);

    // Check for shared recommendation link
    const recTitle = params.get("rec");
    const recCat = params.get("cat") as Category | null;
    const recFrom = params.get("from");

    if (recTitle && recCat && recFrom) {
      const rec: SharedRec = { title: recTitle, category: recCat, from: recFrom };
      if (saved) {
        setProfile(saved);
        setView("main");
        setCategory(recCat);
        setSharedRec(rec);
        setShowRecommendation(true);
      } else {
        // Store pending, go to onboarding first
        setPendingSharedRec(rec);
      }
      // Clean URL
      window.history.replaceState({}, "", window.location.pathname);
      return;
    }

    // Check for taste share link
    const tasteCode = params.get("taste");
    if (tasteCode) {
      window.history.replaceState({}, "", window.location.pathname);
    }

    if (saved) {
      setProfile(saved);
      setView("main");
    }
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("zr-theme");
    if (theme === "dark") document.documentElement.classList.add("dark");
  }, []);

  const handleOnboardingComplete = (p: UserProfile) => {
    setProfile(p);
    setView("main");

    // If there's a pending shared recommendation, show it now
    if (pendingSharedRec) {
      setCategory(pendingSharedRec.category);
      setSharedRec(pendingSharedRec);
      setShowRecommendation(true);
      setPendingSharedRec(null);
    }
  };

  const handleCategorySelect = (cat: Category, friend?: Friend) => {
    setCategory(cat);
    setSelectedFriend(friend || null);
    setSharedRec(null);
    setShowRecommendation(true);
  };

  const handleHome = () => {
    setShowRecommendation(false);
    setCategory(null);
    setSelectedFriend(null);
    setSharedRec(null);
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
            sharedRec={sharedRec}
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
