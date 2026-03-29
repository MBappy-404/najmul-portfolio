'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'portfolio', 'contact'];
      let current = 'home';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const customEase = [0.76, 0, 0.24, 1] as any;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled
          ? 'py-2'
          : 'py-5'
      }`}
    >
      {/* Glassmorphic pill navbar — centered on desktop */}
      <nav className={`max-w-5xl mx-auto px-4 sm:px-6 transition-all duration-700 ${
        scrolled ? 'px-4' : ''
      }`}>
        <div className={`flex items-center justify-between transition-all duration-700 ${
          scrolled
            ? 'bg-background/70 backdrop-blur-2xl border border-border/40 rounded-full px-6 py-2.5 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]'
            : 'px-6 py-2'
        }`}>
          {/* Logo — Monogram */}
          <button
            onClick={() => handleNavClick('home')}
            className="relative text-xl font-black tracking-tighter text-primary hover:text-accent transition-colors cursor-pointer group"
          >
            <span className="relative z-10">
              NJ<span className="text-accent group-hover:text-primary transition-colors duration-300">.</span>
            </span>
          </button>

          {/* Desktop Menu — Minimal pill links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative text-[13px] font-medium tracking-wide transition-all duration-300 cursor-pointer px-4 py-2 rounded-full ${
                  activeSection === item.id
                    ? 'text-primary'
                    : 'text-foreground/50 hover:text-foreground/80'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-muted/80 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA Button — Desktop */}
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden md:flex items-center gap-2 text-[12px] font-semibold tracking-wider uppercase px-5 py-2.5 bg-primary text-primary-foreground rounded-full hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 cursor-pointer group"
          >
            Let's Talk
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-primary hover:text-accent transition-colors cursor-pointer rounded-full bg-muted/50"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={18} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu — Full-width overlay with staggered items */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: customEase }}
            className="md:hidden absolute top-full left-4 right-4 mt-2 bg-background/95 backdrop-blur-2xl border border-border/40 rounded-2xl shadow-[0_16px_64px_-12px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: customEase }}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between w-full text-left px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-primary bg-muted/80'
                      : 'text-foreground/50 hover:text-foreground hover:bg-muted/40'
                  }`}
                >
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  )}
                </motion.button>
              ))}

              {/* Mobile CTA */}
              <div className="pt-2 border-t border-border/30 mt-2">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full flex items-center justify-center gap-2 text-[12px] font-semibold tracking-wider uppercase px-5 py-3 bg-primary text-primary-foreground rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  Let's Talk
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
