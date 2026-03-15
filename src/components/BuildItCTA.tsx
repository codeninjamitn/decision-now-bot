import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

type Step = "question" | "form" | "thanks" | "dismissed";

const transition = { duration: 0.3, ease: [0.2, 0, 0, 1] as [number, number, number, number] };

export default function BuildItCTA() {
  const [step, setStep] = useState<Step>("question");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (step === "dismissed" || step === "thanks") {
    return (
      <AnimatePresence>
        {step === "thanks" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="mt-10 text-center"
          >
            <p className="text-sm text-foreground font-medium">🎉 You're on the list!</p>
            <p className="text-xs text-muted-foreground mt-1">We'll reach out when it's ready.</p>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const handleSubmit = async () => {
    if (!fullName.trim() || !email.trim() || !whatsapp.trim()) {
      setError("All fields are required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!/^\+?\d{10,15}$/.test(whatsapp.replace(/[\s-]/g, ""))) {
      setError("Please enter a valid WhatsApp number");
      return;
    }

    setError("");
    setSubmitting(true);
    const { error: dbError } = await supabase.from("waitlist").insert({
      full_name: fullName.trim(),
      email: email.trim(),
      whatsapp_number: whatsapp.trim(),
    });
    setSubmitting(false);

    if (dbError) {
      setError("Something went wrong. Try again.");
      return;
    }
    setStep("thanks");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...transition, delay: 0.3 }}
      className="mt-10"
    >
      <AnimatePresence mode="wait">
        {step === "question" && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={transition}
            className="bg-card rounded-2xl shadow-card p-5"
          >
            <p className="text-sm font-medium text-foreground mb-1">Should we build this for real?</p>
            <p className="text-xs text-muted-foreground mb-4">
              A full-fledged version, personal to you, behind login.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("form")}
                className="flex-1 h-11 rounded-xl bg-foreground text-background text-sm font-medium transition-transform active:scale-[0.97]"
              >
                Yes, I'm in 🙌
              </button>
              <button
                onClick={() => setStep("dismissed")}
                className="flex-1 h-11 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Not now
              </button>
            </div>
          </motion.div>
        )}

        {step === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="bg-card rounded-2xl shadow-card p-5"
          >
            <p className="text-sm font-medium text-foreground mb-1">We'll let you know when it's ready ✨</p>
            <p className="text-xs text-muted-foreground mb-4">Drop your details below.</p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full h-11 rounded-xl bg-background border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full h-11 rounded-xl bg-background border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <input
                type="tel"
                placeholder="WhatsApp number (e.g. +91...)"
                value={whatsapp}
                onChange={e => setWhatsapp(e.target.value)}
                className="w-full h-11 rounded-xl bg-background border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>

            {error && <p className="text-xs text-destructive mt-2">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-4 w-full h-11 rounded-xl bg-foreground text-background text-sm font-medium transition-transform active:scale-[0.97] disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Count me in →"}
            </button>

            <button
              onClick={() => setStep("question")}
              className="mt-2 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Go back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
