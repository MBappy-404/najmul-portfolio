'use client';

import { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/navigation';
import Hero from '@/components/hero';
import About from '@/components/about';
import Skills from '@/components/skills';
import Portfolio from '@/components/portfolio';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import Philosophy from '@/components/philosophy';
import BikeSection from '@/components/bike-section';
import ScrollProgress from '@/components/scroll-progress';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const parallaxContainerRef = useRef<HTMLDivElement>(null);

  // Track scroll across a larger range to handle the taller About section
  const { scrollYProgress } = useScroll({
    target: parallaxContainerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001
  });

  // 1. Slow & Majestic Flip
  const rotateY = useTransform(smoothProgress, [0, 0.6], [0, 180]);

  // Decide which image to show based on progress
  const aboutImage = "/najmul-about.jpg";
  const heroImage = "/hero-profile.jpg";

  // Scale logic - Starts at original size, settles in About section
  const imageScale = useTransform(smoothProgress, [0, 1], [1.0, 0.95]);
  const imageGrayscale = "0%"; // Keep it colored for "actual image" feel

  // Continuous Visibility: No more handoff, traveler stays visible
  const travelerOpacity = 1;

  // Dynamic Docking: Tightened offsets to prevent clipping in taller 80vh container
  const imageY = useTransform(smoothProgress, [0, 1], ["-20px", "-60px"]);

  // Opacity swap: At 90° (halfway flip), swap hero for about image
  // Hero visible from 0-0.28, fades at 0.28-0.32 (the 90° crossing)
  // About fades in at 0.28-0.32, visible from 0.32-1  
  const heroImageOpacity = useTransform(smoothProgress, [0, 0.28, 0.32], [1, 1, 0]);
  const aboutImageOpacity = useTransform(smoothProgress, [0, 0.28, 0.32], [0, 0, 1]);

  return (
    <main className="relative bg-background text-foreground">
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navigation />

      {/* Parallax Wrapper for Hero + About */}
      <div
        ref={parallaxContainerRef}
        style={{ position: 'relative' }}
        className="relative min-h-[200vh]"
      >

        {/* === The Traveling Card (Smooth Flip & Handoff) === */}
        <div className="absolute inset-0 pointer-events-none z-50 hidden md:block">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
              <div className="md:col-start-8 md:col-span-5 relative h-[80vh] w-full perspective-1000">

                <div className="overflow-hidden w-full h-full rounded-2xl origin-bottom">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    className="w-full h-full"
                  >
                    <motion.div
                      style={{
                        y: imageY,
                        rotateY: rotateY,
                        scale: imageScale,
                        filter: `grayscale(${imageGrayscale})`,
                      }}
                      className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-2xl"
                    >
                      {/* Hero Image — visible before the flip crosses 90° */}
                      <motion.div
                        className="absolute inset-0"
                        style={{ opacity: heroImageOpacity }}
                      >
                        <Image
                          src={heroImage}
                          alt="Hero Version"
                          fill
                          className="object-cover object-top rounded-2xl border border-white/10"
                          priority
                        />
                      </motion.div>

                      {/* About Image — visible after the flip crosses 90° */}
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          opacity: aboutImageOpacity,
                          scaleX: -1,
                        }}
                      >
                        <Image
                          src={aboutImage}
                          alt="About Version"
                          fill
                          className="object-cover object-top rounded-2xl border border-white/10"
                        />
                      </motion.div>

                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Home Section - Synchronized height */}
        <section id="home" className="min-h-[100vh] relative flex items-center">
          <Hero isTraveling={true} />
        </section>

        {/* About Section - Synchronized height & Handoff target */}
        <section id="about" className="min-h-[100vh] relative flex items-center py-20">
          <About isTraveling={true} progress={smoothProgress} />
        </section>
      </div>

      {/* Remaining Sections */}
      <section id="skills" className="min-h-[80vh] flex items-center py-20 bg-muted/20">
        <Skills />
      </section>
      <BikeSection />
      <section id="portfolio" className="min-h-[80vh] flex items-center py-20">
        <Portfolio />
      </section>
      <section className="py-20 bg-muted/20">
        <Philosophy />
      </section>
      <section id="contact" className="min-h-[80vh] flex items-center py-20">
        <Contact />
      </section>
      <Footer />
    </main>
  );
}
