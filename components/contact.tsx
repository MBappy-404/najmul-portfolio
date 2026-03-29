'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
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

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'najmul4785@gmail.com',
      link: 'mailto:najmul4785@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+880 1828-430983',
      link: 'tel:+8801828430983',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Savar, Dhaka, Bangladesh',
      link: '#',
    },
  ]; 

  const customEase = [0.76, 0, 0.24, 1] as any;

  return (
    <div className="w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
      <div className="space-y-8 md:space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 md:space-y-4 max-w-2xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: customEase }}
              className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-muted rounded-full text-xs sm:text-sm font-medium text-accent border border-accent/20"
            >
              Get In Touch
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
              Let&apos;s Work <span className="text-accent">Together</span>
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: customEase }}
              className="text-base sm:text-lg text-foreground/60"
            >
              Got a vision? Let&apos;s bring it to life together. I believe the best work comes from genuine connection — so don&apos;t hesitate, let&apos;s talk.
            </motion.p>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.a
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.2, delay: 0.1 * index, ease: customEase }}
                whileHover={{ y: -5 }}
                href={info.link}
                className="group block p-4 sm:p-6 bg-card rounded-xl border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-muted rounded-lg mb-4 group-hover:bg-accent/10 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                <p className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                  {info.value}
                </p>
              </motion.a>
            );
          })}
        </div>

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="space-y-6">
            <div className="overflow-hidden">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, ease: customEase }}
                className="text-2xl font-bold text-primary"
              >
                Send me a Message
              </motion.h3>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-accent/10 border border-accent/20 rounded-xl"
              >
                <div className="text-center space-y-3">
                  <div className="text-4xl">✓</div>
                  <h4 className="text-lg font-semibold text-accent">Thank You!</h4>
                  <p className="text-foreground/60">
                    Your message has been received. I&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 1, delay: 0.1, ease: customEase }}
                      className="space-y-2"
                    >
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-colors text-foreground placeholder:text-muted-foreground"
                      />
                    </motion.div>
                  </div>
                  <div className="space-y-2 overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
                      className="space-y-2"
                    >
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-colors text-foreground placeholder:text-muted-foreground"
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="space-y-2 overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
                    className="space-y-2"
                  >
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      required
                      className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-colors text-foreground placeholder:text-muted-foreground"
                    />
                  </motion.div>
                </div>

                <div className="space-y-2 overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 1, delay: 0.4, ease: customEase }}
                    className="space-y-2"
                  >
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-colors text-foreground placeholder:text-muted-foreground resize-none"
                    />
                  </motion.div>
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border border-primary/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </div>

          {/* Info Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">Let&apos;s Connect</h3>
              <p className="text-foreground/60 leading-relaxed">
                Whether you have a creative idea, want to discuss a project, or simply want to say hello — I&apos;m here. I believe good things happen when like-minded souls connect.
              </p>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Connect With Me</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'LinkedIn', icon: '💼', link: '#' },
                  { label: 'Instagram', icon: '📸', link: '#' },
                  { label: 'Dribbble', icon: '🎨', link: '#' },
                  { label: 'GitHub', icon: '💻', link: '#' },
                ].map((social, index) => (
                  <motion.a
                    whileHover={{ y: -3, scale: 1.05 }}
                    key={index}
                    href={social.link}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-accent/10 transition-colors text-foreground hover:text-accent font-medium cursor-pointer"
                  >
                    <span>{social.icon}</span>
                    <span className="text-sm">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-accent/10 border border-accent/20 rounded-xl space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                <span className="font-semibold text-accent">Available Now</span>
              </div>
              <p className="text-sm text-foreground/60">
                I&apos;m open to new projects and collaborations. Achieving starts with believing — let&apos;s create something beautiful together!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
