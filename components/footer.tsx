'use client';

import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = [
    {
      title: 'Menu',
      links: [
        { label: 'Home', href: '#home', isNav: true },
        { label: 'About', href: '#about', isNav: true },
        { label: 'Portfolio', href: '#portfolio', isNav: true },
        { label: 'Contact', href: '#contact', isNav: true },
      ],
    },
    {
      title: 'Social',
      links: [
        { label: 'Facebook', href: 'https://www.facebook.com/Najmul.Here.7', isNav: false },
        { label: 'Instagram', href: 'https://www.instagram.com/najmul_did/', isNav: false },
        { label: 'Threads', href: 'https://www.threads.net/@najmul_did', isNav: false },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/najmuldid', isNav: false },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Portfolio', href: 'https://najmul-hossain.netlify.app', isNav: false },
        { label: 'Blog', href: '#', isNav: false },
        { label: 'Services', href: '#', isNav: false },
        { label: 'FAQ', href: '#', isNav: false },
      ],
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-20">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8">
            {/* Brand Column */}
            <div className="col-span-2 lg:col-span-2 space-y-6">
              <div className="space-y-3">
                <h3 className="text-3xl font-black tracking-tighter">Najmul <span className="text-accent">Hossain</span></h3>
                <p className="text-base font-medium opacity-70 max-w-sm leading-relaxed">
                  Be colorful, but don&apos;t change the color. Fashion dreamer, creative student &amp; freelancer making designs that make my soul happy.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold opacity-80 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Based in Savar, Dhaka, Bangladesh
              </div>
            </div>

            {/* Links Columns */}
            {footerLinks.map((column, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-[0.2em] opacity-50">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.isNav ? (
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className="text-sm font-semibold opacity-70 hover:opacity-100 hover:text-accent transition-all text-left cursor-pointer"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm font-semibold opacity-70 hover:opacity-100 hover:text-accent transition-all cursor-pointer"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>


        </div>

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-sm font-medium opacity-50 tracking-wide">
              &copy; {currentYear} Najmul Hossain. All rights reserved.
            </p>

          </div>

          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest opacity-50">
            <a href="#" className="hover:opacity-100 hover:text-accent transition-all cursor-pointer">
              Enjoy the little things ❤️
            </a>

          </div>
        </div>

        {/* <p className="text-xs text-center font-semibold pb-2 uppercase tracking-[0.2em] opacity-70">
          Developed by <a
            href="https://dev-bappy.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent underline transition-all underline decoration-accent/30 underline-offset-4"
          >Bappy</a>
        </p> */}
      </div>
    </footer>
  );
}
