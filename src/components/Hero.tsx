import React from 'react';
import { Heart, ChevronRight, Gift, Globe, ShieldCheck, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { TranslationSet } from '../types';

interface HeroProps {
  t: TranslationSet;
}

export default function Hero({ t }: HeroProps) {
  const handleScroll = (href: string) => {
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
    <section id="home" className="relative overflow-hidden bg-slate-950 py-20 lg:py-32" style={{ minHeight: '85vh' }}>
      {/* Elegant High-Credibility Dark Tech Gradient Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-amber-950/70 to-slate-900" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Mission Tagline & Trust Badge */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-400/20 px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-200"
              >
                <Heart className="h-3 w-3 text-amber-300 fill-current animate-pulse" />
                {t.missionImpactBadge}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/25 px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Instituição Registrada e Auditada</span>
              </motion.div>
            </div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-tight"
            >
              {t.heroTitle}
            </motion.h1>

            {/* Paragraph Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-6 text-lg text-amber-100/90 sm:text-xl max-w-2xl leading-relaxed font-sans"
            >
              {t.heroSubtitle}
            </motion.p>

            {/* Actions CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button
                onClick={() => handleScroll('#donate')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                <Heart className="h-5 w-5 fill-current text-white/90" />
                {t.heroCTA1}
              </button>

              <button
                onClick={() => handleScroll('#mission')}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-white/5 hover:bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 cursor-pointer"
              >
                {t.heroCTA2}
                <ChevronRight className="h-5 w-5" />
              </button>
            </motion.div>
          </div>

          {/* Quick Informative Right Panel (Visually dynamic element displaying immediate trust anchors) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative">
              <span className="absolute top-4 right-4 rounded-md bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[9px] font-black tracking-widest text-amber-300 select-none uppercase">
                Auditoria 2026 Ativa
              </span>

              <h3 className="font-sans text-base font-bold text-amber-200 mb-6 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amber-400" />
                Governança & Repasse Sem Custos
              </h3>

              <div className="space-y-5">
                {/* Point 1 */}
                <div className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 shadow-sm">
                    <CheckCircle className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-white">Chave Jurídica Oficial</h4>
                    <p className="text-xs text-amber-100/70 mt-1 leading-relaxed">
                      Todas as transações no Brasil ocorrem de forma segura pela chave oficial da instituição, vinculadas a uma conta jurídica auditada automaticamente.
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 shadow-sm">
                    <FileText className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-white">Prestação de Contas 100% Pública</h4>
                    <p className="text-xs text-amber-100/70 mt-1 leading-relaxed">
                      Notas fiscais, relatórios e fotos da entrega de brinquedos e cestas de alimentos são arquivados de forma pública para qualquer órgão de controle.
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 shadow-sm">
                    <Globe className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-white">Auditoria de Destinação Final</h4>
                    <p className="text-xs text-amber-100/70 mt-1 leading-relaxed">
                      Cobrimos custos operacionais exclusivamente via voluntariado puro. Absolutamente nenhum centavo das doações é utilizado para pagamento de salários a diretores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
