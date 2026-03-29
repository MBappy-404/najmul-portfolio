'use client';

import { useRef } from 'react';
import { Calendar, MapPin, Briefcase, Award } from 'lucide-react';
import { motion, MotionValue, useTransform, useMotionValue, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function About({
  isTraveling = false,
  progress
}: {
  isTraveling?: boolean;
  progress?: MotionValue<number>;
}) {
  const defaultProgress = useMotionValue(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Self-contained scroll tracking for the image container
  const { scrollYProgress: imageScrollProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"] // Track from when section enters bottom to when it exits top
  });

  // Smooth spring for buttery motion
  const smoothImageProgress = useSpring(imageScrollProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001
  });

  // The core parallax: image starts 200px above and slides down to 50px below
  // This creates the "coming down from the top" effect
  const imageParallaxY = useTransform(smoothImageProgress, [0, 1], [-200, 50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as any },
    },
  };

  // Local Opacity Handoff (only used when traveling card is active)
  const localImageOpacity = useTransform(progress || defaultProgress, [0.85, 0.95], [0, 1]);

  const info = [
    { icon: Calendar, label: 'Born', value: '4 March 2004', color: 'text-accent' },
    { icon: MapPin, label: 'Location', value: 'Savar, Dhaka, Bangladesh', color: 'text-accent' },
    { icon: Briefcase, label: 'Motto', value: 'Stay Colorful ✨', color: 'text-accent' },
    { icon: Award, label: 'Age', value: '21 Years Old', color: 'text-accent' },
  ];

  const customEase = [0.76, 0, 0.24, 1] as any;

  return (
    <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12">
      <div className="space-y-8 md:space-y-12">
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
              About Me
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
              Colorful <span className="text-accent">Soul</span>
            </motion.h2>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-center">
          {/* Text Content */}
          <div className="md:col-span-7 space-y-5 md:space-y-6 text-base md:text-lg text-foreground/70 leading-relaxed font-medium order-2 md:order-1">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: customEase }}
              >
                I&apos;m a 21-year-old creative soul from Savar, Dhaka, Bangladesh — someone who finds beauty in the smallest details and believes that achieving starts with believing. My journey is about staying colorful while never changing who I am.
              </motion.p>
            </div>
            <div className="overflow-hidden font-normal">
              <motion.p
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: customEase }}
              >
                I never look back — only forward. As a student and freelancer, I pour my heart into designs that feel alive. Whether it&apos;s fashion concepts, branding, or digital art, I take time to do what makes my soul happy, and that passion shows in every project I touch.
              </motion.p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
              {info.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1.2, delay: 0.2 + (index * 0.1), ease: customEase }}
                    whileHover={{ y: -5 }}
                    className="p-4 sm:p-5 bg-card rounded-xl border border-border hover:border-accent/40 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg group-hover:bg-accent/10 transition-colors">
                        <Icon className={`w-4 h-4 ${item.color}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{item.label}</p>
                        <p className="text-sm font-bold text-foreground mt-0.5">{item.value}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Image Container — scroll-driven parallax */}
          <div
            ref={imageContainerRef}
            className="md:col-start-8 md:col-span-5 h-[55vh] sm:h-[60vh] md:h-[70vh] relative rounded-2xl overflow-hidden order-1 md:order-2"
          >
            {/* Mobile: always show static image regardless of traveling state */}
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: customEase }}
              className="block md:hidden absolute inset-0"
            >
              <Image
                src="/najmul-about.jpg"
                alt="About portrait"
                fill
                className="object-cover object-top rounded-2xl"
                sizes="100vw"
              />
              {/* Subtle gradient overlay for polish */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl" />
            </motion.div>

            {/* Desktop: show parallax image only when NOT traveling */}
            {!isTraveling && (
              <motion.div
                style={{ y: imageParallaxY }}
                className="hidden md:block absolute inset-0 will-change-transform"
              >
                <div
                  style={{
                    top: '-30%',
                    left: 0,
                    right: 0,
                    bottom: '-30%',
                    position: 'absolute' as const,
                  }}
                >
                  <Image
                    src="/najmul-about.jpg"
                    alt="About portrait"
                    fill
                    className="object-cover object-top rounded-2xl"
                    sizes="50vw"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Roles Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 md:pt-12">
          {[
            { title: 'Fashion Dreamer', icon: '✨' },
            { title: 'Creative Student', icon: '🎓' },
            { title: 'Confident Freelancer', icon: '💼' },
          ].map((role, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.4, delay: 0.1 * index, ease: customEase }}
              whileHover={{ y: -5 }}
              className="p-5 sm:p-6 bg-card rounded-xl border border-border hover:border-accent/40 transition-all duration-300 flex items-center gap-3 sm:gap-4"
            >
              <div className="text-xl sm:text-2xl">{role.icon}</div>
              <h3 className="font-bold text-sm sm:text-base text-primary tracking-tight">{role.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
