'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

const skillCategories = [
  {
    category: 'Fashion & Design',
    icon: '🧥',
    color: '#D4A574',
    description: 'Where my soul lives — turning fabric into feelings and threads into stories.',
    skills: [
      { name: 'Fashion Illustration', level: 90 },
      { name: 'Textile Design', level: 85 },
      { name: 'Concept Development', level: 88 },
      { name: 'Color Theory', level: 92 },
    ],
  },
  {
    category: 'Digital Design',
    icon: '🎨',
    color: '#7C9CBF',
    description: 'Pixels and palettes — crafting visual stories that make screens come alive.',
    skills: [
      { name: 'Adobe Creative Suite', level: 85 },
      { name: 'Figma & UI Design', level: 80 },
      { name: 'Branding', level: 87 },
      { name: 'Visual Design', level: 89 },
    ],
  },
  {
    category: 'Technical Skills',
    icon: '💻',
    color: '#8B9DC3',
    description: 'The builder in me — bringing ideas from imagination to the real world.',
    skills: [
      { name: 'Web Design', level: 82 },
      { name: 'HTML & CSS', level: 78 },
      { name: 'Responsive Design', level: 84 },
      { name: 'Design Systems', level: 75 },
    ],
  },
  {
    category: 'Professional',
    icon: '⭐',
    color: '#D4A574',
    description: 'The human side — communication, confidence, and attention to the little things.',
    skills: [
      { name: 'Project Management', level: 83 },
      { name: 'Client Communication', level: 90 },
      { name: 'Creative Problem Solving', level: 88 },
      { name: 'Attention to Detail', level: 95 },
    ],
  },
];

// Circular progress ring component
function SkillRing({ level, color, size = 56, strokeWidth = 3 }: { level: number; color: string; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border/50"
        />
        {/* Progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold text-foreground/70">{level}%</span>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const customEase = [0.76, 0, 0.24, 1] as any;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  // Floating number parallax
  const floatY = useTransform(smoothProgress, [0, 1], [60, -60]);

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
      <div className="space-y-10 md:space-y-16">
        {/* Section Header */}
        <div className="space-y-3 md:space-y-4">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: customEase }}
              className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-muted rounded-full text-xs sm:text-sm font-medium text-accent border border-accent/20"
            >
              Skills & Expertise
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
              What I <span className="text-accent">Can Do</span>
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
              Every skill I&apos;ve built comes from believing in the process and enjoying the journey. Here&apos;s what I bring to the table — with passion and confidence.
            </motion.p>
          </div>
        </div>

        {/* === Interactive Skills Showcase === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left: Category Selector */}
          <div className="lg:col-span-4 space-y-3">
            {skillCategories.map((cat, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: 0.1 * index, ease: customEase }}
                onClick={() => setActiveCategory(index)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-500 cursor-pointer group ${
                  activeCategory === index
                    ? 'bg-card border-accent/40 shadow-lg shadow-accent/10'
                    : 'bg-card/50 border-border hover:border-accent/20 hover:bg-card'
                }`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl transition-all duration-500 ${
                    activeCategory === index
                      ? 'bg-accent/15 scale-110'
                      : 'bg-muted group-hover:bg-accent/5'
                  }`}>
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-sm sm:text-base transition-colors duration-300 ${
                      activeCategory === index ? 'text-accent' : 'text-primary'
                    }`}>
                      {cat.category}
                    </h3>
                    <p className={`text-xs text-foreground/40 mt-0.5 line-clamp-1 transition-opacity duration-300 ${
                      activeCategory === index ? 'opacity-100' : 'opacity-60'
                    }`}>
                      {cat.skills.length} skills
                    </p>
                  </div>
                  {/* Active indicator */}
                  <motion.div
                    animate={{
                      width: activeCategory === index ? 3 : 0,
                      opacity: activeCategory === index ? 1 : 0,
                    }}
                    className="h-8 rounded-full bg-accent shrink-0"
                  />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right: Active Category Details */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.5, ease: customEase }}
                className="h-full"
              >
                <div className="p-6 sm:p-8 md:p-10 bg-card rounded-2xl sm:rounded-3xl border border-border h-full relative overflow-hidden">
                  {/* Decorative background icon */}
                  <div className="absolute -top-4 -right-4 opacity-[0.04] pointer-events-none select-none">
                    <span className="text-[180px] sm:text-[220px] font-bold">{skillCategories[activeCategory].icon}</span>
                  </div>

                  <div className="relative z-10 space-y-8">
                    {/* Category header */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl sm:text-4xl">{skillCategories[activeCategory].icon}</span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                          {skillCategories[activeCategory].category}
                        </h3>
                      </div>
                      <p className="text-foreground/50 text-sm sm:text-base italic leading-relaxed max-w-lg">
                        {skillCategories[activeCategory].description}
                      </p>
                    </div>

                    {/* Skills with progress rings */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {skillCategories[activeCategory].skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 * index, ease: customEase }}
                          className="flex items-center gap-4 p-3 sm:p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-accent/20 hover:bg-muted/50 transition-all duration-300 group"
                        >
                          <SkillRing
                            level={skill.level}
                            color={skillCategories[activeCategory].color}
                            size={52}
                            strokeWidth={3}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-primary group-hover:text-accent transition-colors">
                              {skill.name}
                            </p>
                            {/* Mini progress bar */}
                            <div className="mt-2 w-full h-1 bg-border/50 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: skillCategories[activeCategory].color }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 1.2, delay: 0.3 + 0.1 * index, ease: customEase }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Average score */}
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 font-bold">Overall Proficiency</p>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-1.5 bg-border/50 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ backgroundColor: skillCategories[activeCategory].color }}
                              initial={{ width: 0 }}
                              whileInView={{
                                width: `${Math.round(
                                  skillCategories[activeCategory].skills.reduce((a, b) => a + b.level, 0) /
                                    skillCategories[activeCategory].skills.length
                                )}%`,
                              }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, ease: customEase }}
                            />
                          </div>
                          <span className="text-sm font-bold" style={{ color: skillCategories[activeCategory].color }}>
                            {Math.round(
                              skillCategories[activeCategory].skills.reduce((a, b) => a + b.level, 0) /
                                skillCategories[activeCategory].skills.length
                            )}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* === Dynamic Stats Row === */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {[
            { number: '100+', label: 'Projects Completed', color: 'text-accent' },
            { number: '50+', label: 'Satisfied Clients', color: 'text-primary' },
            { number: '2+', label: 'Years Experience', color: 'text-accent' },
          ].map((stat, index) => (
            <div key={index} className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.4, delay: 0.3 + (index * 0.15), ease: customEase }}
                className="p-5 sm:p-8 bg-muted/30 border border-border/50 rounded-2xl sm:rounded-3xl text-center space-y-2 group hover:bg-muted/50 transition-colors relative overflow-hidden"
              >
                {/* Decorative floating number in background */}
                <motion.div
                  style={{ y: floatY }}
                  className="absolute -top-2 -right-2 opacity-[0.03] pointer-events-none select-none"
                >
                  <span className="text-[120px] font-black">{stat.number}</span>
                </motion.div>
                
                <div className="relative z-10 inline-block">
                  <p className={`text-4xl font-bold ${stat.color} group-hover:scale-110 transition-transform`}>{stat.number}</p>
                  <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </div>
                <p className="relative z-10 text-foreground/60 font-medium uppercase tracking-widest text-xs">{stat.label}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
