import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Pencil, Copy, UserPlus, Trash2, Clock } from "lucide-react";
import { ONBOARDING_QUESTIONS, CUISINE_GROUPS, UserProfile, saveProfile, loadProfile } from "@/data/onboarding";
import type { FoodType, FoodMood, FoodPlatform } from "@/data/onboarding";
import { loadFriends, removeFriend, addFriend, generateShareCode, type Friend } from "@/data/friends";
import { getTimeOverride, setTimeOverride, clearTimeOverride } from "@/data/timeOverride";
import type { TimeOfDay } from "@/data/recommendations";
import { useTheme } from "@/hooks/useTheme";
import qrcode from "qrcode-generator";

const transition = { duration: 0.3, ease: [0.2, 0, 0, 1] as [number, number, number, number] };

const TIME_OPTIONS: { id: TimeOfDay; label: string }[] = [
  { id: "morning", label: "Morning" },
  { id: "afternoon", label: "Afternoon" },
  { id: "evening", label: "Evening" },
  { id: "night", label: "Night" },
];

const FOOD_TYPES: FoodType[] = ['Veg', 'Non-Veg', 'Both'];
const FOOD_MOODS: FoodMood[] = ['Healthy', 'Indulge', 'Comfort'];
const FOOD_PLATFORM_OPTIONS: { id: FoodPlatform; label: string }[] = [
  { id: 'swiggy', label: 'Swiggy' },
  { id: 'zomato', label: 'Zomato' },
  { id: 'any', label: "Doesn't matter" },
];

interface ProfileTabProps {
  onResetProfile: () => void;
}

export default function ProfileTab({ onResetProfile }: ProfileTabProps) {
  const { theme, toggle: toggleTheme } = useTheme();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editSelected, setEditSelected] = useState<string[]>([]);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [friendCode, setFriendCode] = useState("");
  const [friendError, setFriendError] = useState("");
  const [showShareCode, setShowShareCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeOverride, setTimeOverrideState] = useState<TimeOfDay | null>(null);
  const [resetStep, setResetStep] = useState(0);
  // Food editing state
  const [editFoodType, setEditFoodType] = useState<FoodType>('Both');
  const [editFoodMood, setEditFoodMood] = useState<FoodMood>('Comfort');
  const [editFoodPlatform, setEditFoodPlatform] = useState<FoodPlatform>('any');

  useEffect(() => {
    setProfile(loadProfile());
    setFriends(loadFriends());
    setTimeOverrideState(getTimeOverride());
  }, []);

  if (!profile) return null;

  const shareCode = generateShareCode(profile);

  const handleEditStart = (fieldId: string) => {
    if (fieldId === 'foodPreference') {
      setEditFoodType(profile.foodType);
      setEditFoodMood(profile.foodMood);
      setEditFoodPlatform(profile.foodPlatform || 'any');
      setEditingField(fieldId);
      return;
    }
    if (fieldId === 'cuisines') {
      setEditSelected(profile.cuisines || []);
      setEditingField(fieldId);
      return;
    }
    const question = ONBOARDING_QUESTIONS.find(q => q.id === fieldId);
    if (!question) return;
    const current = (profile as any)[fieldId];
    setEditSelected(Array.isArray(current) ? current : [current]);
    setEditingField(fieldId);
  };

  const handleEditSelect = (option: string) => {
    const question = ONBOARDING_QUESTIONS.find(q => q.id === editingField);
    if (!question) return;

    if (!question.multiSelect) {
      const updated = { ...profile, [editingField!]: option.toLowerCase() };
      setProfile(updated);
      saveProfile(updated);
      setEditingField(null);
      return;
    }

    setEditSelected(prev => {
      if (prev.includes(option)) return prev.filter(o => o !== option);
      if (question.maxSelections && prev.length >= question.maxSelections) return prev;
      return [...prev, option];
    });
  };

  const handleEditSave = () => {
    if (!editingField) return;
    if (editingField === 'foodPreference') {
      const updated = { ...profile, foodType: editFoodType, foodMood: editFoodMood, foodPlatform: editFoodPlatform };
      setProfile(updated);
      saveProfile(updated);
      setEditingField(null);
      return;
    }
    const updated = { ...profile, [editingField]: editSelected };
    setProfile(updated);
    saveProfile(updated);
    setEditingField(null);
  };

  const handleAddFriend = () => {
    setFriendError("");
    if (!friendName.trim()) { setFriendError("Enter a name"); return; }
    if (!friendCode.trim()) { setFriendError("Paste a share code"); return; }
    const result = addFriend(friendName.trim(), friendCode.trim());
    if (!result) { setFriendError("Invalid code or max friends reached"); return; }
    setFriends(loadFriends());
    setShowAddFriend(false);
    setFriendName("");
    setFriendCode("");
  };

  const handleRemoveFriend = (id: string) => {
    removeFriend(id);
    setFriends(loadFriends());
  };

  const handleTimeOverride = (time: TimeOfDay) => {
    setTimeOverride(time);
    setTimeOverrideState(time);
  };

  const handleClearOverride = () => {
    clearTimeOverride();
    setTimeOverrideState(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFullReset = () => {
    if (resetStep === 0) {
      setResetStep(1);
      setTimeout(() => setResetStep(0), 4000);
      return;
    }
    localStorage.clear();
    sessionStorage.clear();
    onResetProfile();
  };

  const generateQR = () => {
    const qr = qrcode(0, "M");
    qr.addData(shareCode);
    qr.make();
    return qr.createDataURL(4, 0);
  };

  // Get display value for each field
  const getFieldDisplay = (fieldId: string): string => {
    if (fieldId === 'foodPreference') {
      return `${profile.foodType} · ${profile.foodMood}`;
    }
    if (fieldId === 'cuisines') {
      return (profile.cuisines || []).join(', ');
    }
    const value = (profile as any)[fieldId];
    return Array.isArray(value) ? value.join(', ') : value;
  };

  return (
    <div className="min-h-screen max-w-md mx-auto px-6 pt-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-headline">Profile</h1>
          <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-muted transition-colors">
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Time Override */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <p className="text-meta">Time of day</p>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            {timeOverride
              ? `Override active: ${timeOverride}`
              : `Using onboarding default: ${profile.timeOfDay}`}
          </p>
          <div className="flex gap-2">
            {TIME_OPTIONS.map(t => (
              <button
                key={t.id}
                onClick={() => handleTimeOverride(t.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  (timeOverride || profile.timeOfDay) === t.id
                    ? "bg-foreground text-background"
                    : "bg-card shadow-card text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {timeOverride && (
            <button onClick={handleClearOverride} className="text-xs text-muted-foreground mt-2 hover:text-foreground transition-colors">
              Reset to default
            </button>
          )}
        </section>

        {/* Taste Preferences */}
        <section className="mb-8">
          <p className="text-meta mb-4">My Taste</p>
          {ONBOARDING_QUESTIONS.map(q => {
            const display = getFieldDisplay(q.id);
            const isEditing = editingField === q.id;

            return (
              <div key={q.id} className="mb-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-foreground">{q.question}</p>
                  <button onClick={() => isEditing ? setEditingField(null) : handleEditStart(q.id)} className="p-1">
                    <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
                {!isEditing && (
                  <p className="text-xs text-muted-foreground mt-1">{display}</p>
                )}
                {isEditing && q.id === 'foodPreference' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2">
                    <p className="text-xs text-muted-foreground mb-2">Diet type</p>
                    <div className="flex gap-2 mb-3">
                      {FOOD_TYPES.map(ft => (
                        <button key={ft} onClick={() => setEditFoodType(ft)}
                          className={`px-3 py-1.5 rounded-lg text-xs transition-all ${editFoodType === ft ? "bg-foreground text-background" : "bg-card shadow-card text-foreground"}`}
                        >{ft}</button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">Mood</p>
                    <div className="flex gap-2 mb-2">
                      {FOOD_MOODS.map(fm => (
                        <button key={fm} onClick={() => setEditFoodMood(fm)}
                          className={`px-3 py-1.5 rounded-lg text-xs transition-all ${editFoodMood === fm ? "bg-foreground text-background" : "bg-card shadow-card text-foreground"}`}
                        >{fm}</button>
                      ))}
                    </div>
                    <button onClick={handleEditSave} className="mt-1 text-xs text-foreground font-medium hover:underline">Save</button>
                  </motion.div>
                )}
                {isEditing && q.id === 'cuisines' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2">
                    {CUISINE_GROUPS.map(group => (
                      <div key={group.label} className="mb-3">
                        <p className="text-xs font-medium text-foreground mb-1">{group.label}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {group.options.map(opt => (
                            <button key={opt}
                              onClick={() => setEditSelected(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt])}
                              className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${editSelected.includes(opt) ? "bg-foreground text-background" : "bg-card shadow-card text-foreground"}`}
                            >{opt}</button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <button onClick={handleEditSave} className="mt-1 text-xs text-foreground font-medium hover:underline">Save</button>
                  </motion.div>
                )}
                {isEditing && q.id !== 'foodPreference' && q.id !== 'cuisines' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2">
                    <div className="flex flex-wrap gap-2">
                      {q.options.map(opt => (
                        <button key={opt} onClick={() => handleEditSelect(opt)}
                          className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                            editSelected.includes(opt) || editSelected.includes(opt.toLowerCase())
                              ? "bg-foreground text-background" : "bg-card shadow-card text-foreground"
                          }`}
                        >{opt}</button>
                      ))}
                    </div>
                    {q.multiSelect && (
                      <button onClick={handleEditSave} className="mt-2 text-xs text-foreground font-medium hover:underline">Save</button>
                    )}
                  </motion.div>
                )}
              </div>
            );
          })}
        </section>

        {/* Friends */}
        <section className="mb-8">
          <p className="text-meta mb-4">Friends</p>
          {friends.map(f => (
            <div key={f.id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                  {f.name.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm text-foreground">{f.name}</span>
              </div>
              <button onClick={() => handleRemoveFriend(f.id)} className="p-1">
                <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive transition-colors" />
              </button>
            </div>
          ))}
          {friends.length < 5 && !showAddFriend && (
            <button onClick={() => setShowAddFriend(true)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-2">
              <UserPlus className="w-4 h-4" /> Add a Friend
            </button>
          )}
          {showAddFriend && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-4 bg-card rounded-xl shadow-card">
              <input value={friendName} onChange={e => setFriendName(e.target.value)} placeholder="Friend's name"
                className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground mb-2 focus:outline-none focus:ring-1 focus:ring-ring" />
              <textarea value={friendCode} onChange={e => setFriendCode(e.target.value)} placeholder="Paste their share code"
                className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none h-16 mb-2 focus:outline-none focus:ring-1 focus:ring-ring" />
              {friendError && <p className="text-xs text-destructive mb-2">{friendError}</p>}
              <div className="flex gap-2">
                <button onClick={handleAddFriend} className="flex-1 py-2 bg-foreground text-background rounded-lg text-sm font-medium">Add</button>
                <button onClick={() => { setShowAddFriend(false); setFriendError(""); }} className="flex-1 py-2 text-muted-foreground text-sm">Cancel</button>
              </div>
            </motion.div>
          )}
          <div className="mt-4">
            <button onClick={() => setShowShareCode(!showShareCode)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Copy className="w-4 h-4" /> Share my taste
            </button>
            {showShareCode && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 p-4 bg-card rounded-xl shadow-card">
                <p className="text-xs text-muted-foreground mb-2">Your share code:</p>
                <div className="bg-muted rounded-lg p-2 mb-3 break-all text-xs text-foreground font-mono-app max-h-20 overflow-y-auto">{shareCode}</div>
                <button onClick={handleCopy} className="w-full py-2 bg-foreground text-background rounded-lg text-sm font-medium mb-3">
                  {copied ? "Copied!" : "Copy code"}
                </button>
                <div className="flex justify-center">
                  <img src={generateQR()} alt="QR Code" className="w-32 h-32 rounded-lg" />
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Danger Zone */}
        <section className="border-t border-border pt-6">
          <p className="text-meta mb-4 text-destructive">Danger Zone</p>
          {timeOverride && (
            <button onClick={handleClearOverride} className="w-full text-left text-sm text-muted-foreground hover:text-foreground py-2 transition-colors">
              Clear session override
            </button>
          )}
          <button onClick={handleFullReset}
            className={`w-full text-left text-sm py-2 transition-colors ${resetStep === 1 ? "text-destructive font-medium" : "text-muted-foreground hover:text-foreground"}`}>
            {resetStep === 1 ? "This will delete everything. Tap again to confirm." : "Reset my entire profile"}
          </button>
        </section>
      </motion.div>
    </div>
  );
}
