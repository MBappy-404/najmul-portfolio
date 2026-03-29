'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function BikeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const customEase = [0.76, 0, 0.24, 1] as any;

  // Track screen size for responsive parallax
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 30,
    restDelta: 0.001,
  });

  // Enable parallax for all devices
  const imageY = useTransform(smoothProgress, [0, 1], ["-12%", "12%"]);

  const overlayOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0.8, 0.5, 0.5, 0.8]);
  const textY = useTransform(smoothProgress, [0, 1], ["20%", "-20%"]);
  const decorTextX = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);
  const statsY = useTransform(smoothProgress, [0, 1], ["40px", "-40px"]);

  // Scale effect — subtler, smoother
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 1.05, 1.1]);

  // Floating elements
  const float1Y = useTransform(smoothProgress, [0, 1], [60, -60]);
  const float2Y = useTransform(smoothProgress, [0, 1], [-30, 50]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-screen overflow-hidden bg-black"
    >
      {/* === Layer 1: Background Image === */}
      <motion.div
        style={{
          y: imageY,
          scale: imageScale,
          willChange: 'transform'
        }}
        className="absolute inset-0"
      >
        <div
          style={{
            position: 'absolute',
            top: isMobile ? '5%' : '0',
            left: 0,
            right: 0,
            bottom: isMobile ? '-15%' : '0',
          }}
        >
          <Image
            src="/inta-najmul.jpg"
            alt="Life on two wheels"
            fill
            className="object-cover object-center brightness-[0.8]"
            sizes="100vw"
            quality={90}
            priority
          />
        </div>
      </motion.div>

      {/* === Layer 2: Layers of Overlays for Depth === */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      <div className="absolute inset-0 bg-black/40" />

      {/* === Layer 3: Large Scrolling Text === */}
      <motion.div
        style={{ x: decorTextX }}
        className="absolute bottom-1/4 left-0 right-0 translate-y-20 md:translate-y-40  whitespace-nowrap pointer-events-none select-none opacity-40"
      >
        <span className=" text-[8vw] flex justify-center gap-x-10 md:text-[4vw] font-black uppercase tracking-tighter text-white leading-none">
          RIDER · FREEDOM · ADVENTURE · EXPLORER · RIDER <span className='hidden md:block'> · BEYOND HORIZONS · JOURNEY · ADVENTURE  · SPIRIT · ADVENTURE</span>
        </span>
      </motion.div>

      {/* === Layer 4: Main Content === */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

            {/* Text Side */}
            <motion.div
              style={{ y: textY }}
              className="md:col-span-8 lg:col-span-7 space-y-8"
            >
              {/* Overline */}
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.2, ease: customEase }}
                  className="text-[10px] sm:text-xs tracking-[0.4em] uppercase font-bold text-accent"
                >
                  Beyond Design
                </motion.p>
              </div>

              {/* Main Heading */}
              <div className="space-y-1">
                <div className="overflow-hidden">
                  <motion.h2
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.4, delay: 0.1, ease: customEase }}
                    className="text-5xl sm:text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.8]"
                  >
                    Life on
                  </motion.h2>
                </div>
                <div className="overflow-hidden flex items-center gap-6">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.5, delay: 0.4, ease: customEase }}
                    className="hidden sm:block w-24 h-[1px] bg-accent/30 origin-left"
                  />
                  <motion.h2
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.4, delay: 0.2, ease: customEase }}
                    className="text-5xl sm:text-6xl md:text-8xl font-black text-accent uppercase tracking-tighter leading-[0.8] font-serif italic"
                  >
                    Two Wheels
                  </motion.h2>
                </div>
              </div>

              {/* Description & Quote */}
              <div className="space-y-6 max-w-lg">
                <div className="overflow-hidden">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2, delay: 0.5, ease: customEase }}
                    className="text-base sm:text-lg text-white/70 leading-relaxed font-medium"
                  >
                    They say riding a bike is the closest you can get to flying while staying on the ground. For me, it&apos;s not just a hobby—it&apos;s a meditation, a way to disconnect from the digital noise and reconnect with my own soul.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.7, ease: customEase }}
                  className="flex items-center gap-4 origin-left"
                >
                  <div className="w-[2px] h-12 bg-white/20 rounded-full" />
                  <p className="text-white/80 text-base italic font-serif">
                    &ldquo;The road teaches what no classroom can.&rdquo;
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Side (Floating Cards) */}
            {/* <motion.div
              style={{ y: statsY }}
              className="md:col-span-4 lg:col-span-5 hidden md:flex flex-col items-end gap-6"
            >
              {[
                { label: 'Passion', value: 'Riding', icon: '🏍️' },
                { label: 'Feeling', value: 'Freedom', icon: '🌅' },
                // { label: 'Motto', value: 'Never Stop', icon: '🔥' },
                { label: 'Spirit', value: 'Unstoppable', icon: '⚡' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50, rotate: 5 }}
                  whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 + index * 0.2, ease: customEase }}
                  style={{ y: index === 1 ? float1Y : index === 2 ? float2Y : undefined }}
                  className="backdrop-blur-xl bg-white/[0.05] border border-white/10 rounded-3xl p-6 min-w-[200px] hover:bg-white/[0.12] transition-all duration-700 group cursor-default"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-accent font-black mb-1">{item.label}</p>
                      <p className="text-white font-bold text-lg tracking-tight group-hover:text-accent transition-colors duration-500">{item.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div> */}
          </div>
        </div>
      </div>

      {/* Aesthetic Edges */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-20" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-20" />
    </div>
  );
}
