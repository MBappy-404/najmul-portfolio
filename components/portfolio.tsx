import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');

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

  const projects = [
    {
      id: 1,
      title: 'Fashion Line Collection',
      category: 'fashion',
      description: 'A complete fashion collection concept featuring modern sustainable fabrics and innovative designs.',
      image: '🎨',
      tags: ['Design', 'Fashion', 'Concept'],
      link: '#',
    },
    {
      id: 2,
      title: 'Digital Portfolio Website',
      category: 'digital',
      description: 'Personal branding and portfolio website showcasing creative work with modern UI/UX design.',
      image: '💻',
      tags: ['Web Design', 'UI/UX', 'Branding'],
      link: '#',
    },
    {
      id: 3,
      title: 'Textile Pattern Design',
      category: 'fashion',
      description: 'Original textile patterns inspired by traditional art with contemporary aesthetic appeal.',
      image: '🧵',
      tags: ['Textile', 'Pattern', 'Design'],
      link: '#',
    },
    {
      id: 4,
      title: 'Brand Identity System',
      category: 'digital',
      description: 'Complete branding solution including logo, colors, typography, and visual guidelines.',
      image: '🎭',
      tags: ['Branding', 'Identity', 'Design System'],
      link: '#',
    },
    {
      id: 5,
      title: 'Fashion Photography Direction',
      category: 'fashion',
      description: 'Creative direction and styling for fashion photography campaigns and lookbooks.',
      image: '📸',
      tags: ['Photography', 'Styling', 'Direction'],
      link: '#',
    },
    {
      id: 6,
      title: 'Interactive Design System',
      category: 'digital',
      description: 'Comprehensive component library and design tokens for scalable digital products.',
      image: '⚙️',
      tags: ['Components', 'Design System', 'Frontend'],
      link: '#',
    },
  ];

  const filters = [
    { value: 'all', label: 'All Projects' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'digital', label: 'Digital Design' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  const customEase = [0.76, 0, 0.24, 1] as any;

  return (
    <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
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
              Latest Work
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
              Featured <span className="text-accent">Projects</span>
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: customEase }}
              className="text-base sm:text-lg text-foreground/60 max-w-2xl"
            >
              A collection of work I&apos;m truly proud of — each project reflects my belief that the little things matter most, and every color tells a story.
            </motion.p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          {filters.map((filter, index) => (
            <div key={index} className="overflow-hidden rounded-full">
              <motion.button
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.2 + (index * 0.05), ease: customEase }}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${activeFilter === filter.value
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'bg-card border border-border hover:border-accent/40 text-foreground'
                  }`}
              >
                {filter.label}
              </motion.button>
            </div>
          ))}
        </div>

        {/* Projects Grid — Fixed Transition Glitch */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 shadow-none min-h-[500px]">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full group bg-card rounded-xl border border-border overflow-hidden hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 cursor-pointer"
              >
                {/* Image Area */}
                <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden relative">
                  <span className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
                    {project.image}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3 pt-2 border-t border-border">
                    <a
                      href={project.link}
                      className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium text-accent hover:text-primary transition-colors py-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View
                    </a>
                    <a
                      href="#"
                      className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium text-accent hover:text-primary transition-colors py-2"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All CTA */}
        <motion.div variants={itemVariants} className="text-center pt-8">
          <p className="text-foreground/60 mb-4 font-medium uppercase tracking-widest text-xs">Want to see more?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
}