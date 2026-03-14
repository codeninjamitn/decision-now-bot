import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ONBOARDING_QUESTIONS, UserProfile, saveProfile } from "@/data/onboarding";

const transition = { duration: 0.4, ease: [0.2, 0, 0, 1] };

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [selected, setSelected] = useState<string[]>([]);

  const question = ONBOARDING_QUESTIONS[step];
  const isLast = step === ONBOARDING_QUESTIONS.length - 1;

  const handleSelect = (option: string) => {
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
        timeOfDay: (currentAnswers.timeOfDay as string || 'evening').toLowerCase(),
        watchTags: (currentAnswers.watchTags as string[]) || [],
        eatTags: (currentAnswers.eatTags as string[]) || [],
        readTags: (currentAnswers.readTags as string[]) || [],
        listenTags: (currentAnswers.listenTags as string[]) || [],
      };
      saveProfile(profile);
      onComplete(profile);
    } else {
      setStep(s => s + 1);
      setSelected([]);
    }
  };

  const handleContinue = () => {
    const newAnswers = { ...answers, [question.id]: selected };
    setAnswers(newAnswers);
    advance(newAnswers);
  };

  const canContinue = question.multiSelect
    ? selected.length >= (question.maxSelections || 1)
    : false;

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

      <AnimatePresence mode="wait">
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

          {question.multiSelect && (
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
