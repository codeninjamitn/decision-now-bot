import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

type Step = "hidden" | "question" | "form" | "thanks" | "dismissed";

const DISMISS_KEY = "zr-cta-dismissed";
const JOINED_KEY = "zr-cta-joined";

// Country codes with flags
const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "US" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
];

function getFingerprint(): string {
  let fp = localStorage.getItem("zr-fp");
  if (!fp) {
    fp = crypto.randomUUID();
    localStorage.setItem("zr-fp", fp);
  }
  return fp;
}

function wasDismissedToday(): boolean {
  const raw = localStorage.getItem(DISMISS_KEY);
  if (!raw) return false;
  const dismissedDate = new Date(raw).toDateString();
  return dismissedDate === new Date().toDateString();
}

function detectCountryFromInput(val: string): typeof COUNTRY_CODES[number] | null {
  if (!val.startsWith("+")) return null;
  // Try longest match first
  const sorted = [...COUNTRY_CODES].sort((a, b) => b.code.length - a.code.length);
  for (const c of sorted) {
    if (val.startsWith(c.code)) return c;
  }
  return null;
}

const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());
const isValidPhone = (countryCode: string, number: string) => {
  const digits = number.replace(/[\s-]/g, "");
  return /^\d{6,14}$/.test(digits) && countryCode.length >= 2;
};

const transition = { duration: 0.3, ease: [0.2, 0, 0, 1] as [number, number, number, number] };

export default function BuildItCTA() {
  const alreadyJoined = localStorage.getItem(JOINED_KEY) === "true";
  const [step, setStep] = useState<Step>(
    alreadyJoined ? "hidden" : wasDismissedToday() ? "hidden" : "question"
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedCountry = useMemo(
    () => COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0],
    [countryCode]
  );

  const emailValid = isValidEmail(email);
  const phoneValid = isValidPhone(countryCode, phoneNumber);
  const formValid = fullName.trim().length > 0 && emailValid && phoneValid;

  if (step === "hidden" || step === "dismissed") return null;

  if (step === "thanks") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className="mt-8 bg-card rounded-2xl shadow-card p-5 text-center"
      >
        <p className="text-sm text-foreground font-medium">Thanks for your support — it means a lot to us 🙏</p>
        <p className="text-xs text-muted-foreground mt-1">We'll only reach out when something great is ready.</p>
      </motion.div>
    );
  }

  const handleDismiss = async () => {
    localStorage.setItem(DISMISS_KEY, new Date().toISOString());
    setStep("dismissed");

    const fp = getFingerprint();
    const { data } = await supabase
      .from("waitlist_dismissals")
      .select("id, dismiss_count")
      .eq("fingerprint", fp)
      .maybeSingle();

    if (data) {
      await supabase
        .from("waitlist_dismissals")
        .update({ dismiss_count: data.dismiss_count + 1, last_dismissed_at: new Date().toISOString() })
        .eq("id", data.id);
    } else {
      await supabase
        .from("waitlist_dismissals")
        .insert({ fingerprint: fp, dismiss_count: 1 });
    }
  };

  const handleSubmit = async () => {
    if (!formValid) return;

    setError("");
    setSubmitting(true);
    const fullWhatsapp = `${countryCode}${phoneNumber.replace(/[\s-]/g, "")}`;
    const { error: dbError } = await supabase.from("waitlist").insert({
      full_name: fullName.trim(),
      email: email.trim(),
      whatsapp_number: fullWhatsapp,
    });
    setSubmitting(false);

    if (dbError) {
      setError("Something went wrong. Try again.");
      return;
    }
    localStorage.setItem(JOINED_KEY, "true");
    setStep("thanks");
  };

  const handlePhoneInput = (val: string) => {
    // If user pastes a full number with +, detect country and split
    if (val.startsWith("+")) {
      const detected = detectCountryFromInput(val);
      if (detected) {
        setCountryCode(detected.code);
        setPhoneNumber(val.slice(detected.code.length).replace(/[\s-]/g, ""));
        return;
      }
    }
    // Only allow digits, spaces, dashes
    setPhoneNumber(val.replace(/[^\d\s-]/g, ""));
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
            <p className="text-sm font-medium text-foreground mb-1">Should we build this — hyper-personal, just for you?</p>
            <p className="text-xs text-muted-foreground mb-4">
              A full product experience, tailored to your taste, secured behind login. Your data stays yours — we'll never sell it or spam you. We'll only reach out when something great is ready.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("form")}
                className="flex-1 h-11 rounded-xl bg-foreground text-background text-sm font-medium transition-transform active:scale-[0.97]"
              >
                Yes, I'm in 🙌
              </button>
              <button
                onClick={handleDismiss}
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
            <p className="text-sm font-medium text-foreground mb-1">Thanks for your trust & support ✨</p>
            <p className="text-xs text-muted-foreground mb-4">Drop your details — we'll only reach out when we're ready with something great for you. No spam, no data selling, ever.</p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full h-11 rounded-xl bg-background border border-border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />

              {/* Email with inline validation */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full h-11 rounded-xl bg-background border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring ${
                    email && !emailValid ? "border-destructive" : "border-border"
                  }`}
                />
                {email && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs">
                    {emailValid ? "✓" : "✗"}
                  </span>
                )}
              </div>

              {/* WhatsApp with country code selector and flag */}
              <div className="flex gap-2">
                <div className="relative">
                  <select
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                    className="h-11 rounded-xl bg-background border border-border pl-3 pr-8 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring appearance-none cursor-pointer"
                    style={{ minWidth: "5.5rem" }}
                  >
                    {COUNTRY_CODES.map(c => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground pointer-events-none">▼</span>
                </div>
                <div className="relative flex-1">
                  <input
                    type="tel"
                    placeholder="WhatsApp number"
                    value={phoneNumber}
                    onChange={e => handlePhoneInput(e.target.value)}
                    className={`w-full h-11 rounded-xl bg-background border px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring ${
                      phoneNumber && !phoneValid ? "border-destructive" : "border-border"
                    }`}
                  />
                  {phoneNumber && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs">
                      {phoneValid ? "✓" : "✗"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {error && <p className="text-xs text-destructive mt-2">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={submitting || !formValid}
              className="mt-4 w-full h-11 rounded-xl bg-foreground text-background text-sm font-medium transition-transform active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed"
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