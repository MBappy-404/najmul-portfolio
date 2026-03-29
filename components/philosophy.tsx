'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const beliefs = [
  {
    quote: "Enjoy the little things — in the end, they might be the only things that matter.",
    icon: "✨",
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    quote: "Achieving starts with believing.",
    icon: "💫",
    accent: "from-blue-500/20 to-purple-500/10",
  },
  {
    quote: "Be colorful, but never change your color.",
    icon: "🎨",
    accent: "from-pink-500/20 to-rose-500/10",
  },
  {
    quote: "Take time to do what makes your soul happy.",
    icon: "🌿",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    quote: "Never look back — only forward.",
    icon: "🔥",
    accent: "from-red-500/20 to-amber-500/10",
  },
];

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const customEase = [0.76, 0, 0.24, 1] as any;

  // Scroll-linked parallax for the large decorative text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  // Decorative text scrolls at different speed
  const marqueeX = useTransform(smoothProgress, [0, 1], ["10%", "-30%"]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden py-24 md:py-32">
      
      {/* === Large Decorative Scrolling Text (Background) === */}
      <motion.div
        style={{ x: marqueeX, opacity: bgOpacity }}
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
      >
        <span className="text-[15vw] md:text-[12vw] font-black uppercase tracking-tighter text-primary/[0.03]">
          Believe · Create · Inspire · Dream · Believe · Create · Inspire ·
        </span>
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 md:space-y-4 mb-12 md:mb-16">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: customEase }}
              className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-muted rounded-full text-xs sm:text-sm font-medium text-accent border border-accent/20"
            >
              My Philosophy
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: customEase }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary"
            >
              Things I <span className="text-accent">Believe In</span>
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: customEase }}
              className="text-base sm:text-lg text-foreground/60 max-w-xl"
            >
              Words that shape my journey, fuel my creativity, and remind me to stay true to who I am.
            </motion.p>
          </div>
        </div>

        {/* === Beliefs Grid — Staggered Bento Layout === */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
          
          {/* Large featured quote */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease: customEase }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="md:col-span-7 relative group cursor-default"
          >
            <div className={`p-8 sm:p-10 rounded-2xl sm:rounded-3xl border border-border bg-card hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 h-full`}>
              {/* Gradient accent */}
              <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${beliefs[0].accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">{beliefs[0].icon}</span>
                  <div className="w-12 h-[2px] bg-accent/30 group-hover:w-20 transition-all duration-500" />
                </div>
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-bold text-primary leading-snug tracking-tight">
                  &ldquo;{beliefs[0].quote}&rdquo;
                </blockquote>
                <p className="text-xs uppercase tracking-[0.25em] text-foreground/40 font-semibold">Life Philosophy</p>
              </div>
            </div>
          </motion.div>

          {/* Right column — two stacked quotes */}
          <div className="md:col-span-5 flex flex-col gap-4 sm:gap-5">
            {beliefs.slice(1, 3).map((belief, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, delay: 0.15 * (index + 1), ease: customEase }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="relative group cursor-default flex-1"
              >
                <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-border bg-card hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 h-full`}>
                  <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${belief.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10 space-y-4">
                    <span className="text-2xl">{belief.icon}</span>
                    <blockquote className="text-base sm:text-lg font-bold text-primary leading-relaxed">
                      &ldquo;{belief.quote}&rdquo;
                    </blockquote>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom row — two wide quotes */}
          {beliefs.slice(3).map((belief, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, delay: 0.15 * (index + 3), ease: customEase }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="md:col-span-6 relative group cursor-default"
            >
              <div className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-border bg-card hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 h-full`}>
                <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${belief.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10 flex items-center gap-5 sm:gap-6">
                  <span className="text-3xl sm:text-4xl shrink-0">{belief.icon}</span>
                  <div className="space-y-2">
                    <blockquote className="text-base sm:text-lg font-bold text-primary leading-relaxed">
                      &ldquo;{belief.quote}&rdquo;
                    </blockquote>
                    <div className="w-8 h-[2px] bg-accent/20 group-hover:w-16 group-hover:bg-accent/40 transition-all duration-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* === Decorative Divider with Personal Touch === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: customEase }}
          className="mt-16 md:mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4">
            <div className="w-12 h-[1px] bg-border" />
            <p className="text-xl sm:text-2xl md:text-3xl text-foreground/60 font-black italic tracking-tighter leading-none">
              &ldquo;Don&apos;t look back—you aren&apos;t going that way anymore.&rdquo; 💫
            </p>
            <div className="w-12 h-[1px] bg-border" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
