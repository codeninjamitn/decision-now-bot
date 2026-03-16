import { useState } from "react";
import { motion } from "framer-motion";
import { Share2, X } from "lucide-react";
import QRCode from "react-qr-code";
import type { Category } from "@/data/recommendations";

const APP_URL = "https://decision-now-bot.lovable.app";

interface ShareRecommendationProps {
  category: Category;
  itemTitle: string;
  senderName: string;
}

export default function ShareRecommendation({ category, itemTitle, senderName }: ShareRecommendationProps) {
  const [showShare, setShowShare] = useState(false);

  const shareUrl = `${APP_URL}?rec=${encodeURIComponent(itemTitle)}&cat=${encodeURIComponent(category)}&from=${encodeURIComponent(senderName)}`;

  if (!showShare) {
    return (
      <button
        onClick={() => setShowShare(true)}
        className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 text-xs text-muted-foreground hover:text-foreground border border-border rounded-xl transition-colors"
      >
        <Share2 className="w-3.5 h-3.5" />
        Share this with a friend
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 p-4 bg-card rounded-xl shadow-card"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-foreground">Share with a friend</p>
        <button onClick={() => setShowShare(false)} className="p-1">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Your friend scans this QR — if they're new they'll set up their taste profile first, then see your pick!
      </p>
      <div className="flex justify-center bg-white p-3 rounded-lg mb-3">
        <QRCode value={shareUrl} size={160} level="M" />
      </div>
      <p className="text-[10px] text-muted-foreground text-center">
        From {senderName} · {itemTitle}
      </p>
    </motion.div>
  );
}
