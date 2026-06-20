/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Heart, ChevronUp, ShieldCheck, Sparkles, X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from './types';
import { translations } from './translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MissionImpact from './components/MissionImpact';
import Projects from './components/Projects';
import AiPlanner from './components/AiPlanner';
import SupportBoard from './components/SupportBoard';
import DonationHub from './components/DonationHub';
import VolunteerForm from './components/VolunteerForm';
import Footer from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(Language.PT);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAttentionModal, setShowAttentionModal] = useState(false);

  // Trigger attention popup after 5 seconds of browsing/reading
  useEffect(() => {
    const hasInteracted = sessionStorage.getItem('attention_banner_interacted');
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        setShowAttentionModal(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseAttention = () => {
    sessionStorage.setItem('attention_banner_interacted', 'true');
    setShowAttentionModal(false);
  };

  const handleAcceptAttention = () => {
    sessionStorage.setItem('attention_banner_interacted', 'true');
    setShowAttentionModal(false);
    handleScrollToDonate();
  };

  // Monitor scroll height to conditionally show floating triggers
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTopAction = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScrollToDonate = () => {
    const targetElement = document.querySelector('#donate');
    if (targetElement) {
      const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  const t = translations[currentLang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/20 to-white text-gray-800 antialiased" id="main-app-container">
      {/* Dynamic Header / Navigation */}
      <Navbar currentLang={currentLang} onLanguageChange={setCurrentLang} t={t} />

      <main id="app-content-sections">
        {/* Hero Segment */}
        <Hero t={t} />

        {/* Detailed Mission, Vision & Bento Impact Grid Segment */}
        <MissionImpact t={t} />

        {/* Campaign List with Progress Indicators */}
        <Projects currentLang={currentLang} t={t} />

        {/* AI Action Planner (Do-It-Yourself) */}
        <AiPlanner t={t} currentLang={currentLang} />

        {/* Global Support and Gratitude Letters Board/Wall */}
        <SupportBoard t={t} currentLang={currentLang} />

        {/* National/International Donation Central */}
        <DonationHub t={t} />

        {/* Interactive Volunteer Sign-up Form */}
        <VolunteerForm t={t} />
      </main>

      {/* Structured Multi-lingual Footer */}
      <Footer t={t} />

      {/* Floating Utilities Segment */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col gap-3"
            id="floating-action-buttons"
          >
            {/* Quick floating donate heart button */}
            <button
              onClick={handleScrollToDonate}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-orange-500/20 hover:scale-110 active:scale-95 transition-all cursor-pointer"
              aria-label="Doar Agora"
            >
              <Heart className="h-6 w-6 fill-current text-white animate-pulse" />
            </button>

            {/* Back to top button */}
            <button
              onClick={handleScrollTopAction}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-200 bg-white text-amber-600 shadow-md hover:bg-amber-50 hover:scale-105 active:scale-95 transition"
              aria-label="Voltar ao início"
            >
              <ChevronUp className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Attention-grabbing slide-out card */}
      <AnimatePresence>
        {showAttentionModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:justify-end p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              className="w-full max-w-sm bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl pointer-events-auto relative overflow-hidden text-left"
              id="attention-impact-card"
            >
              {/* Golden gradient spotlight background */}
              <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-rose-500/5 blur-xl pointer-events-none" />

              {/* Secure Connection top mini strip */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                  <Sparkles className="h-3 w-3 text-amber-300 animate-pulse" />
                  Ação Solidária Urgente
                </span>
                <span className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-mono tracking-wider font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  REPASSE AUTOMÁTICO
                </span>
                <button
                  onClick={handleCloseAttention}
                  className="text-white/40 hover:text-white transition-colors p-1 rounded-full hover:bg-white/5 cursor-pointer"
                  aria-label="Fechar aviso"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Main Content */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-300">
                    <Heart className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-black text-white tracking-wide">
                      {currentLang === Language.PT 
                        ? 'Transforme o hoje de uma família!' 
                        : currentLang === Language.ES 
                        ? '¡Transforma hoy la vida de una familia!' 
                        : 'Transform a family`s life today!'}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-amber-100/70 leading-relaxed font-sans">
                  {currentLang === Language.PT
                    ? 'Com apenas uma pequena contribuição, você ajuda a combater a fome extrema e entrega dignidade com cestas básicas de alimentos, kits escolares e cobertores.'
                    : currentLang === Language.ES
                    ? 'Con solo una pequeña contribución, ayudas a combatir el hambre extrema y entregas dignidad con canastas de alimentos, útiles escolares y mantas.'
                    : 'With just a small contribution, you help fight extreme hunger and deliver dignity with food baskets, school supplies, and blankets.'}
                </p>

                {/* Micro Live Stats badge */}
                <div className="rounded-xl bg-orange-500/10 border border-orange-500/20 p-2.5 flex items-center gap-2 text-[10px] text-amber-200 font-sans">
                  <Gift className="h-4 w-4 text-orange-400 animate-bounce" />
                  <span>
                    {currentLang === Language.PT
                      ? 'Nossa meta permanente é abastecer micro-mutirões nesta semana.'
                      : currentLang === Language.ES
                      ? 'Nuestra meta es abastecer micro-comunidades esta semana.'
                      : 'Our target is to support local communities this week.'}
                  </span>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={handleAcceptAttention}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F38020] to-amber-500 text-white font-sans text-xs font-bold hover:brightness-110 active:scale-[0.98] transition shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 cursor-pointer"
                  >
                    <span>
                      {currentLang === Language.PT
                        ? 'Quero Apoiar Agora ❤️'
                        : currentLang === Language.ES
                        ? 'Quiero Apoyar Ahora ❤️'
                        : 'I Want to Support Now ❤️'}
                    </span>
                  </button>
                  <button
                    onClick={handleCloseAttention}
                    className="w-full text-center py-2 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-white/60 hover:text-white font-sans text-[11px] transition cursor-pointer"
                  >
                    {currentLang === Language.PT
                      ? 'Talvez mais tarde, continuar lendo...'
                      : currentLang === Language.ES
                      ? 'Quizás más tarde, seguir leyendo...'
                      : 'Maybe later, continue reading...'}
                  </button>
                </div>

                {/* Guarded by Cloudflare footer strip inside the popup */}
                <div className="flex items-center justify-center gap-1.5 pt-2 border-t border-white/5 text-[9px] text-white/30 font-sans select-none">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Conexão Segura Cloudflare Turnstile</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

