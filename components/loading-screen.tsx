'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          <div className="relative w-64 space-y-8">
            {/* Logo/Name Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold tracking-tighter text-primary">
                Najmul <span className="text-accent">Hossain</span>
              </h2>
              <p className="text-sm text-muted-foreground mt-2 font-medium uppercase tracking-[0.2em]">
                Portfolio is Loading...
              </p>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="h-[1px] w-full bg-muted overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }}
              />
            </div>

            {/* Percentage Indicator */}
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              <span>Initializing</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
             <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]" />
             <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
