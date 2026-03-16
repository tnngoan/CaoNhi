"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingReactionsProps {
  articleId: number;
  initialViews: number;
  initialLikes: number;
}

const reactions = [
  {
    key: "like",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
      </svg>
    ),
    activeIcon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H7.493z" />
      </svg>
    ),
    label: "Thích",
    activeColor: "text-gold-500",
  },
  {
    key: "insightful",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    activeIcon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706 47.22 47.22 0 004.848 0 .75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75zM10.5 17.25a.75.75 0 00-1.5 0v.214a10.503 10.503 0 006 0V17.25a.75.75 0 00-1.5 0v.036a11.978 11.978 0 01-3 0v-.036z" />
      </svg>
    ),
    label: "Hữu ích",
    activeColor: "text-amber-500",
  },
  {
    key: "bullish",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    activeIcon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M15.22 6.268a.75.75 0 01.968-.432l5.942 2.28a.75.75 0 01.431.97l-2.28 5.94a.75.75 0 11-1.4-.537l1.63-4.251-1.086.484a12.195 12.195 0 00-5.45 5.173.75.75 0 01-1.199.19L9 12.312l-6.22 6.22a.75.75 0 01-1.06-1.061l6.75-6.75a.75.75 0 011.06 0l3.606 3.606a13.695 13.695 0 015.027-4.855l-2.513 1.118a.75.75 0 01-.968-.432z" clipRule="evenodd" />
      </svg>
    ),
    label: "Tăng",
    activeColor: "text-green-500",
  },
  {
    key: "bearish",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
      </svg>
    ),
    activeIcon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M1.72 5.47a.75.75 0 011.06 0L9 11.69l3.756-3.756a.75.75 0 01.985-.066 12.698 12.698 0 014.575 6.832l.308 1.149 2.277-3.943a.75.75 0 111.299.75l-3.182 5.51a.75.75 0 01-1.025.275l-5.511-3.181a.75.75 0 01.75-1.3l3.943 2.277-.308-1.149a11.194 11.194 0 00-3.528-5.617l-3.809 3.81a.75.75 0 01-1.06 0L1.72 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
      </svg>
    ),
    label: "Giảm",
    activeColor: "text-red-500",
  },
  {
    key: "bookmark",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
      </svg>
    ),
    activeIcon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
      </svg>
    ),
    label: "Lưu",
    activeColor: "text-blue-500",
  },
];

export default function FloatingReactions({
  articleId,
  initialViews,
  initialLikes,
}: FloatingReactionsProps) {
  const [activeReactions, setActiveReactions] = useState<Set<string>>(new Set());
  const [counts, setCounts] = useState<Record<string, number>>({
    like: initialLikes,
    insightful: Math.floor(initialLikes * 0.6),
    bullish: Math.floor(initialLikes * 0.4),
    bearish: Math.floor(initialLikes * 0.1),
    bookmark: Math.floor(initialLikes * 0.3),
  });
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  // Load saved reactions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`reactions-${articleId}`);
      if (saved) setActiveReactions(new Set(JSON.parse(saved)));
    } catch {
      // ignore
    }
  }, [articleId]);

  // Track scroll for visibility and read progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 400);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadProgress(Math.min(100, Math.round((scrollY / docHeight) * 100)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleReaction = (key: string) => {
    setActiveReactions((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
        setCounts((c) => ({ ...c, [key]: Math.max(0, c[key] - 1) }));
      } else {
        next.add(key);
        setCounts((c) => ({ ...c, [key]: c[key] + 1 }));
      }
      try {
        localStorage.setItem(`reactions-${articleId}`, JSON.stringify([...next]));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1 xl:flex"
        >
          {/* Read progress indicator */}
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 bg-white text-[10px] font-bold text-navy-600 shadow-sm">
            {readProgress}%
          </div>

          {/* Views counter */}
          <div className="flex flex-col items-center rounded-xl border border-navy-200 bg-white px-2 py-2.5 shadow-sm">
            <svg className="h-4 w-4 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="mt-0.5 text-[10px] font-medium text-navy-500">
              {initialViews}
            </span>
          </div>

          {/* Reaction buttons */}
          <div className="mt-1 flex flex-col items-center gap-0.5 rounded-xl border border-navy-200 bg-white py-1.5 shadow-sm">
            {reactions.map((r) => {
              const isActive = activeReactions.has(r.key);
              return (
                <div key={r.key} className="relative">
                  <button
                    onClick={() => toggleReaction(r.key)}
                    onMouseEnter={() => setShowTooltip(r.key)}
                    onMouseLeave={() => setShowTooltip(null)}
                    className={`flex flex-col items-center px-2.5 py-1.5 transition-all hover:scale-110 ${
                      isActive ? r.activeColor : "text-navy-400 hover:text-navy-600"
                    }`}
                  >
                    <motion.div
                      whileTap={{ scale: 1.4 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {isActive ? r.activeIcon : r.icon}
                    </motion.div>
                    <span className="mt-0.5 text-[10px] font-medium">
                      {counts[r.key]}
                    </span>
                  </button>

                  {/* Tooltip */}
                  <AnimatePresence>
                    {showTooltip === r.key && (
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -4 }}
                        className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-navy-800 px-2 py-1 text-xs text-white"
                      >
                        {r.label}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Share button */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: document.title,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 bg-white text-navy-400 shadow-sm transition-colors hover:border-gold-400 hover:text-gold-500"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          </button>
        </motion.div>
      )}

      {/* Mobile bottom bar */}
      {isVisible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-navy-200 bg-white/95 backdrop-blur-sm xl:hidden"
        >
          {/* Mobile progress bar */}
          <div className="h-0.5 bg-navy-100">
            <div
              className="h-full gold-gradient transition-all duration-300"
              style={{ width: `${readProgress}%` }}
            />
          </div>
          <div className="flex items-center justify-around px-2 py-2">
            {/* Views */}
            <div className="flex items-center gap-1 text-navy-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs font-medium">{initialViews}</span>
            </div>

            {/* Mobile reactions */}
            {reactions.slice(0, 4).map((r) => {
              const isActive = activeReactions.has(r.key);
              return (
                <button
                  key={r.key}
                  onClick={() => toggleReaction(r.key)}
                  className={`flex items-center gap-1 rounded-full px-2 py-1 transition-all ${
                    isActive
                      ? `${r.activeColor} bg-navy-50`
                      : "text-navy-400"
                  }`}
                >
                  <motion.div whileTap={{ scale: 1.3 }}>
                    {isActive ? r.activeIcon : r.icon}
                  </motion.div>
                  <span className="text-xs font-medium">{counts[r.key]}</span>
                </button>
              );
            })}

            {/* Share */}
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: document.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="text-navy-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
