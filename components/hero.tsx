'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MoveRight } from 'lucide-react';

export default function PremiumHero({ isTraveling = false }: { isTraveling?: boolean }) {
  const containerRef = useRef<HTMLElement>(null);

  // Track scroll progress for this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 1. Pro Tip: Use Spring for buttery smooth parallax, even on clunky mouse wheels
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 2. Subtle, calculated Parallax Movements
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "-10%"]);

  // Premium Easing Curve (Cinematic feel)
  const customEase = [0.76, 0, 0.24, 1] as any;

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#FAFAFA] text-[#1A1A1A] overflow-hidden flex items-center pt-24 md:pt-0"
    >
      {/* Standard Agency Grid Layout */}
      <div className="w-full max-w-[1400px] mx-auto px-5 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center h-full">

        {/* === Text Content - Left Side === */}
        <motion.div
          style={{ y: textY }}
          className="md:col-span-7 z-10 flex flex-col justify-center py-8 md:py-0"
        >
          {/* Overline Text Reveal */}
          <div className="overflow-hidden mb-4 md:mb-6 text-center md:text-left">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              className="text-[10px] sm:text-xs md:text-sm tracking-[0.2em] md:tracking-[0.25em] uppercase font-semibold text-gray-500"
            >
              Creative Soul · Fashion · Design
            </motion.p>
          </div>

          {/* Massive Typography with Masking Effect */}
          <h1 className="text-[15vw] sm:text-[13vw] md:text-[8vw] leading-[0.85] tracking-tighter uppercase text-center md:text-left">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: customEase }}
                className="block font-black text-primary"
              >
                Najmul
              </motion.span>
            </div>

            {/* Mixed Typography (Sans-serif + Serif Italic) */}
            <div className="overflow-hidden flex items-center justify-center md:justify-start gap-3 sm:gap-4 md:gap-8 ml-0 md:ml-24">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: customEase }}
                className="hidden md:block w-24 h-[2px] bg-accent origin-left"
              />
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: customEase }}
                className="block font-serif italic text-accent font-light tracking-normal lowercase text-[13vw] sm:text-[11vw] md:text-[7vw]"
              >
                hossain
              </motion.span>
            </div>
          </h1>

          {/* === Mobile Image — Visible only on Mobile/Tablet === */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: customEase }}
            className="block md:hidden relative w-full aspect-[4/5] my-8 rounded-2xl overflow-hidden shadow-2xl shadow-black/10"
          >
            <Image
              src="/hero-profile.jpg"
              alt="Najmul Hossain"
              fill
              className="object-cover object-top"
              sizes="100vw"
              priority
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>

          {/* Meaningful Bio Info */}
          <div className="md:mt-8 max-w-md overflow-hidden text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: customEase }}
              className="text-sm md:text-base text-foreground/70 leading-relaxed"
            >
              I believe in the beauty of little things — colors that speak, designs that feel alive, and the kind of work that makes your soul happy. Based in Bangladesh, creating globally.
            </motion.p>
          </div>

          {/* Minimal Call to Action */}
          <div className="mt-8 md:mt-16 overflow-hidden flex justify-center md:justify-start">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.6, ease: customEase }}
              className="flex items-center gap-4 sm:gap-6"
            >
              <a
                href="#about"
                className="group flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase"
              >
                Know More
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500 ease-out">
                  <MoveRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </span>
              </a>

              <div className="w-[1px] h-8 sm:h-12 bg-border" />

              <a
                href="#contact"
                className="text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase py-2 sm:py-3 border-b border-black/10 hover:border-black transition-colors"
              >
                Hire Me
              </a>
            </motion.div>
          </div>

          {/* Mobile: Decorative accent line */}
          {/* <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.8, ease: customEase }}
            className="md:hidden mt-10 w-16 h-[2px] bg-accent/40 origin-left"
          /> */}
        </motion.div>

        {/* === Image Container — Only when NOT traveling (Desktop fallback) === */}
        {!isTraveling && (
          <div className="hidden md:block md:col-span-5 relative h-[40vh] md:h-[65vh] w-full">
            <div className="overflow-hidden w-full h-full rounded-2xl">
              <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: customEase }}
                className="w-full h-full"
              >
                <div className="relative w-full h-full overflow-hidden bg-gray-200">
                  <motion.div
                    style={{ y: imageY }}
                    className="absolute inset-0"
                  >
                    <Image
                      src="/hero-profile.jpg"
                      alt="Fashion Portrait"
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-1000 ease-out"
                      priority
                      sizes="50vw"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Floating Aesthetic Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute -right-8 bottom-16 origin-bottom-right -rotate-90 hidden lg:block"
        >
          <p className="text-[10px] tracking-[0.4em] text-gray-400 uppercase font-semibold">
            Based in Savar, Dhaka
          </p>
        </motion.div>

      </div>
    </section>
  );
}