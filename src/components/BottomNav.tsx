import { motion } from "framer-motion";
import { Home, User, BarChart3 } from "lucide-react";

export type Tab = "home" | "profile" | "history";

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string; Icon: typeof Home }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "profile", label: "Profile", Icon: User },
  { id: "history", label: "Patterns", Icon: BarChart3 },
];

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-t border-border">
      <div className="max-w-md mx-auto flex">
        {TABS.map(tab => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex-1 flex flex-col items-center py-3 gap-1 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-foreground rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <tab.Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-[10px] font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
      <div className="max-w-md mx-auto text-center pb-2 pt-1 space-y-0.5">
        <p className="text-[9px] text-muted-foreground">No login · No credit card · Free forever</p>
        <p className="text-[9px] text-muted-foreground">Made with ❤️ from Bangalore for the world</p>
      </div>
    </nav>
  );
}
