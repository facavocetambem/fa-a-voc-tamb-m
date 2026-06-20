import React, { useState } from 'react';
import { Menu, X, Heart, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, TranslationSet } from '../types';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationSet;
}

export default function Navbar({ currentLang, onLanguageChange, t }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: t.navHome, href: '#home' },
    { label: t.navMission, href: '#mission' },
    { label: t.navProjects, href: '#campaigns' },
    { label: t.navAiPlanner, href: '#ai-planner' },
    { label: t.navSupportBoard, href: '#support-board' },
    { label: t.navDonate, href: '#donate' },
    { label: t.navVolunteer, href: '#volunteer' },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-100 bg-amber-50/80 backdrop-blur-md" id="app-navbar">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleScroll(e, '#home')}
            className="flex items-center gap-2 group"
            id="navbar-logo"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-md transition-transform group-hover:scale-105">
              <Heart className="h-5 w-5 fill-current" />
            </div>
            <span className="font-sans text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
              {t.navLogo}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" id="navbar-desktop-nav">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="font-sans text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Language Selector + CTA Buttons */}
          <div className="hidden md:flex items-center gap-4" id="navbar-actions">
            {/* Language Toggler */}
            <div className="flex items-center gap-1 rounded-full border border-orange-200 bg-amber-100/50 p-1">
              <Globe className="h-4 w-4 text-amber-600 mx-1.5" />
              {(Object.keys(Language) as Array<keyof typeof Language>).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(Language[lang])}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold transition-all duration-300 ${
                    currentLang === Language[lang]
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-orange-200/50 hover:text-gray-900'
                  }`}
                  id={`lang-btn-${lang.toLowerCase()}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {/* Quick Donate Button */}
            <a
              href="#donate"
              onClick={(e) => handleScroll(e, '#donate')}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:opacity-90 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              id="navbar-cta"
            >
              {t.heroCTA1}
            </a>
          </div>

          {/* Mobile menu toggle & Mobile Lang Toggle */}
          <div className="flex items-center gap-2 md:hidden" id="navbar-mobile-controls">
            {/* Mobile Lang */}
            <div className="flex items-center gap-1 rounded-full border border-orange-200 bg-amber-100/50 p-1 text-xs">
              {(Object.keys(Language) as Array<keyof typeof Language>).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(Language[lang])}
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                    currentLang === Language[lang]
                      ? 'bg-amber-500 text-white'
                      : 'text-gray-600'
                  }`}
                  id={`mobile-lang-btn-${lang.toLowerCase()}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full p-2 text-gray-700 hover:bg-amber-100/50 focus:outline-none"
              aria-label="Toggle menu"
              id="navbar-mobile-menu-btn"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-b border-orange-100 bg-amber-50 md:hidden"
            id="navbar-mobile-drawer"
          >
            <div className="space-y-1 px-4 pt-2 pb-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="block rounded-lg px-3 py-2 font-sans text-base font-semibold text-gray-800 hover:bg-amber-100/60 hover:text-amber-700 transition-all"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#donate"
                  onClick={(e) => handleScroll(e, '#donate')}
                  className="block w-full text-center rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-2.5 text-base font-semibold text-white shadow-md hover:opacity-95"
                >
                  {t.heroCTA1}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
