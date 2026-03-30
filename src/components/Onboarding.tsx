import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ONBOARDING_QUESTIONS, CUISINE_GROUPS, UserProfile, saveProfile } from "@/data/onboarding";
import type { FoodType, FoodMood, FoodPlatform } from "@/data/onboarding";

const transition = { duration: 0.4, ease: [0.2, 0, 0, 1] as [number, number, number, number] };

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const FOOD_TYPES = ['Veg', 'Non-Veg', 'Both'] as const;
const FOOD_MOODS = ['Healthy', 'Indulge', 'Comfort'] as const;
const FOOD_PLATFORMS = [
  { id: 'swiggy' as const, label: 'Swiggy', emoji: '🟠' },
  { id: 'zomato' as const, label: 'Zomato', emoji: '🔴' },
  { id: 'any' as const, label: "Doesn't matter", emoji: '🟠🔴' },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [textInput, setTextInput] = useState('');
  // Food compound step state
  const [foodType, setFoodType] = useState<FoodType | null>(null);
  const [foodMood, setFoodMood] = useState<FoodMood | null>(null);
  const [foodPlatform, setFoodPlatform] = useState<FoodPlatform | null>(null);

  const question = ONBOARDING_QUESTIONS[step];
  const isLast = step === ONBOARDING_QUESTIONS.length - 1;
  const isFoodStep = question.id === 'foodPreference';
  const isCuisineStep = question.id === 'cuisines';
  const isTextStep = !!question.isTextInput;

  const handleSelect = (option: string) => {
    if (isFoodStep) return; // Handled separately
    if (!question.multiSelect) {
      const newAnswers = { ...answers, [question.id]: option };
      setAnswers(newAnswers);
      setTimeout(() => advance(newAnswers), 500);
      return;
    }

    setSelected(prev => {
      if (prev.includes(option)) return prev.filter(o => o !== option);
      if (question.maxSelections && prev.length >= question.maxSelections) return prev;
      return [...prev, option];
    });
  };

  const advance = (currentAnswers: Record<string, string | string[]>) => {
    if (isLast) {
      const profile: UserProfile = {
        fullName: (currentAnswers.fullName as string) || '',
        timeOfDay: (currentAnswers.timeOfDay as string || 'evening').toLowerCase(),
        languages: (currentAnswers.languages as string[]) || ['English'],
        watchTags: (currentAnswers.watchTags as string[]) || [],
        readTags: (currentAnswers.readTags as string[]) || [],
        listenTags: (currentAnswers.listenTags as string[]) || [],
        foodType: (currentAnswers.foodType as FoodType) || 'Both',
        foodMood: (currentAnswers.foodMood as FoodMood) || 'Comfort',
        foodPlatform: (currentAnswers.foodPlatform as FoodPlatform) || 'any',
        cuisines: (currentAnswers.cuisines as string[]) || [],
      };
      saveProfile(profile);
      onComplete(profile);
    } else {
      setStep(s => s + 1);
      setSelected([]);
      setTextInput('');
      setFoodType(null);
      setFoodMood(null);
      setFoodPlatform(null);
    }
  };

  const handleBack = () => {
    if (step === 0) return;
    const prevStep = step - 1;
    const prevQuestion = ONBOARDING_QUESTIONS[prevStep];
    setStep(prevStep);
    setSelected(Array.isArray(answers[prevQuestion.id]) ? (answers[prevQuestion.id] as string[]) : []);
    setTextInput(prevQuestion.isTextInput && answers[prevQuestion.id] ? String(answers[prevQuestion.id]) : '');
    if (prevQuestion.id === 'foodPreference') {
      setFoodType((answers.foodType as FoodType) || null);
      setFoodMood((answers.foodMood as FoodMood) || null);
      setFoodPlatform((answers.foodPlatform as FoodPlatform) || null);
    }
  };

  const handleContinue = () => {
    if (isTextStep) {
      const newAnswers = { ...answers, [question.id]: textInput.trim() };
      setAnswers(newAnswers);
      advance(newAnswers);
      return;
    }
    if (isFoodStep) {
      const newAnswers = { ...answers, foodType: foodType!, foodMood: foodMood!, foodPlatform: foodPlatform! };
      setAnswers(newAnswers);
      advance(newAnswers);
      return;
    }
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    advance(newAnswers);
  };

  const canContinue = (() => {
    if (isTextStep) return textInput.trim().length >= 3;
    if (isFoodStep) return !!foodType && !!foodMood && !!foodPlatform;
    if (question.multiSelect) {
      if (question.minSelections) return selected.length >= question.minSelections;
      return selected.length >= (question.maxSelections || 1);
    }
    return false;
  })();

  return (
    <div className="min-h-screen flex flex-col justify-center max-w-md mx-auto px-6">
      {/* Progress */}
      <div className="flex gap-1.5 mb-12">
        {ONBOARDING_QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i <= step ? "bg-foreground" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {step > 0 && (
        <button
          onClick={handleBack}
          className="mb-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>
      )}


        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={transition}
        >
          <p className="text-meta mb-3">
            {step + 1} of {ONBOARDING_QUESTIONS.length}
          </p>
          <h2 className="text-headline mb-8">{question.question}</h2>

          {/* Text input step */}
          {isTextStep && (
            <div>
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Full name with space between first and last name"
                className="w-full px-4 py-3.5 rounded-lg text-sm font-medium bg-card shadow-card border border-border focus:outline-none focus:ring-2 focus:ring-foreground/20 text-foreground placeholder:text-muted-foreground"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && canContinue) handleContinue();
                }}
              />
            </div>
          )}

          {/* Food compound step */}
          {isFoodStep && (
            <div>
              <p className="text-sm text-muted-foreground mb-3">Are you...</p>
              <div className="flex gap-3 mb-6">
                {FOOD_TYPES.map(ft => (
                  <button
                    key={ft}
                    onClick={() => setFoodType(ft)}
                    className={`flex-1 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      foodType === ft
                        ? "bg-foreground text-background shadow-card"
                        : "bg-card shadow-card hover:shadow-card-hover"
                    }`}
                  >
                    {ft}
                  </button>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-3">What's your mood for food?</p>
              <div className="flex gap-3">
                {FOOD_MOODS.map(fm => (
                  <button
                    key={fm}
                    onClick={() => setFoodMood(fm)}
                    className={`flex-1 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      foodMood === fm
                        ? "bg-foreground text-background shadow-card"
                        : "bg-card shadow-card hover:shadow-card-hover"
                    }`}
                  >
                    {fm === 'Healthy' && '🥗 '}
                    {fm === 'Indulge' && '🍕 '}
                    {fm === 'Comfort' && '🍲 '}
                    {fm}
                  </button>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-3 mt-5">Where do you usually order from?</p>
              <div className="flex gap-3">
                {FOOD_PLATFORMS.map(fp => (
                  <button
                    key={fp.id}
                    onClick={() => setFoodPlatform(fp.id)}
                    className={`flex-1 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      foodPlatform === fp.id
                        ? "bg-foreground text-background shadow-card"
                        : "bg-card shadow-card hover:shadow-card-hover"
                    }`}
                  >
                    {fp.emoji} {fp.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cuisine step with groups */}
          {isCuisineStep && question.groups && (
            <div>
              {question.groups.map(group => (
                <div key={group.label} className="mb-5">
                  <p className="text-sm font-medium text-foreground mb-2">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.options.map(option => (
                      <button
                        key={option}
                        onClick={() => handleSelect(option)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                          selected.includes(option)
                            ? "bg-foreground text-background shadow-card"
                            : "bg-card shadow-card hover:shadow-card-hover"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Standard options grid */}
          {!isFoodStep && !isCuisineStep && (
            <div className="grid grid-cols-2 gap-3">
              {question.options.map(option => {
                const isSelected = question.multiSelect
                  ? selected.includes(option)
                  : answers[question.id] === option;

                return (
                  <motion.button
                    key={option}
                    onClick={() => handleSelect(option)}
                    whileTap={{ scale: 0.97 }}
                    className={`px-4 py-3.5 rounded-lg text-sm font-medium text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-foreground text-background shadow-card"
                        : "bg-card shadow-card hover:shadow-card-hover"
                    }`}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Continue button for multi-select, food step & text input */}
          {(question.multiSelect || isFoodStep || isTextStep) && (
            <motion.button
              onClick={handleContinue}
              disabled={!canContinue}
              className={`mt-8 h-14 w-full rounded-xl font-medium text-sm transition-all duration-200 ${
                canContinue
                  ? "bg-foreground text-background active:scale-[0.97]"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
              whileTap={canContinue ? { scale: 0.97 } : undefined}
            >
              Continue
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
