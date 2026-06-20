import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Heart, Calendar, ArrowRight, ShieldCheck, Tag, Globe, Sparkles } from 'lucide-react';
import { Campaign, Language, TranslationSet } from '../types';

interface ProjectsProps {
  currentLang: Language;
  t: TranslationSet;
}

// Visual metadata map to replace stock pictures with clean, trustworthy audit shields
const campaignMetadata: Record<string, { icon: React.ComponentType<any>; color: string; badge: string; bg: string }> = {
  'dia-das-criancas': {
    icon: Gift,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    badge: 'FVT-BR-01',
    bg: 'from-slate-950 via-amber-950/90 to-slate-900',
  },
  'natal-sem-fome': {
    icon: ShieldCheck,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    badge: 'FVT-BR-02',
    bg: 'from-slate-950 via-emerald-950/90 to-slate-900',
  },
  'global-children-care': {
    icon: Globe,
    color: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    badge: 'FVT-GL-01',
    bg: 'from-slate-950 via-blue-950/90 to-slate-900',
  },
  'pascoa-solidaria': {
    icon: Sparkles,
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    badge: 'FVT-GL-02',
    bg: 'from-slate-950 via-rose-950/90 to-slate-900',
  },
};

export default function Projects({ currentLang, t }: ProjectsProps) {
  const [filter, setFilter] = useState<'all' | 'brazil' | 'global'>('all');

  // Hardcoded highly detailed campaigns
  const campaigns: Campaign[] = [
    {
      id: 'dia-das-criancas',
      title: {
        [Language.PT]: 'Campanha Solidária Permanente',
        [Language.EN]: 'Permanent Solidarity Campaign',
        [Language.ES]: 'Campaña Solidaria Permanente'
      },
      description: {
        [Language.PT]: 'Nossa principal ação permanente durante todo o ano, garantindo alimentos, kits de higiene, brinquedos e apoio essencial para famílias vulneráveis.',
        [Language.EN]: 'Our main year-round activity, providing food, hygiene kits, toys, and essential support to low-income vulnerable families.',
        [Language.ES]: 'Nuestra principal acción permanente durante todo el año, garantizando alimentos, kits de higiene, juguetes y apoyo esencial para familias vulnerables.'
      },
      category: 'brazil',
      goal: 25000,
      raised: 18250,
      daysLeft: 14,
      image: 'https://picsum.photos/seed/toys/600/400'
    },
    {
      id: 'natal-sem-fome',
      title: {
        [Language.PT]: 'Natal Solidário Sem Fome',
        [Language.EN]: 'Christmas Hunger Relieve',
        [Language.ES]: 'Navidad Solidaria Sin Hambre'
      },
      description: {
        [Language.PT]: 'Arrecadação de cestas básicas fartas de natal com alimentos nutritivos e proteínas para famílias de extrema pobreza.',
        [Language.EN]: 'Collection of rich Christmas food hampers filled with nutritional items and proteins for families in extreme poverty.',
        [Language.ES]: 'Recolección de copiosas cestas de navidad con alimentos nutritivos y carnes de primera para familias vulnerables.'
      },
      category: 'brazil',
      goal: 40000,
      raised: 31200,
      daysLeft: 28,
      image: 'https://picsum.photos/seed/christmas/600/400'
    },
    {
      id: 'global-children-care',
      title: {
        [Language.PT]: 'Suporte Infantil Global',
        [Language.EN]: 'Global Children Care Alliance',
        [Language.ES]: 'Alianza Global Cuidado Infantil'
      },
      description: {
        [Language.PT]: 'Envio de kits escolares completos e agasalhos para orfanatos comunitários parceiros na América Latina e África.',
        [Language.EN]: 'Shipping complete scholastic kits and warm winter clothes to partnered community orphanages in Latin America and Africa.',
        [Language.ES]: 'Despacho de útiles escolares completos y abrigos a orfanatos aliados en América Latina y África.'
      },
      category: 'global',
      goal: 30000,
      raised: 23400,
      daysLeft: 19,
      image: '/src/assets/images/global_support_1780852191497.png' // Utilizing exact generated image
    },
    {
      id: 'pascoa-solidaria',
      title: {
        [Language.PT]: 'Páscoa Doce e Feliz',
        [Language.EN]: 'Easter Sweet Hope Project',
        [Language.ES]: 'Pascua Dulce y Esperanza'
      },
      description: {
        [Language.PT]: 'Distribuição de caixas de bombom, ovos de chocolate artesanais e pacotes pedagógicos de páscoa para crianças carentes.',
        [Language.EN]: 'Distribution of chocolate easter eggs, candy boxes, and special pedagogue worksheets for children of rural zones.',
        [Language.ES]: 'Distribución de cajas de chocolate, huevos de pascua artesanales y sets pedagógicos a niños de áreas rurales.'
      },
      category: 'global',
      goal: 15000,
      raised: 8900,
      daysLeft: 42,
      image: 'https://picsum.photos/seed/easter/600/400'
    }
  ];

  const filteredCampaigns = campaigns.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const handleDonateScroll = () => {
    const targetElement = document.querySelector('#donate');
    if (targetElement) {
      const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="campaigns" className="bg-white py-24 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div className="max-w-2xl text-left">
            <span className="text-sm font-bold uppercase tracking-wider text-amber-600 bg-amber-50 rounded-full px-4 py-1.5 shadow-sm">
              Nossas Linhas de Ação
            </span>
            <h2 className="mt-4 font-sans text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              {t.projectsTitle}
            </h2>
            <p className="mt-4 text-base text-gray-500 max-w-lg font-sans">
              {t.projectsSubtitle}
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 bg-amber-50/50 p-1.5 rounded-2xl border border-orange-100">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-orange-100/30'
              }`}
            >
              {t.projectFilterAll}
            </button>
            <button
              onClick={() => setFilter('brazil')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                filter === 'brazil'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-orange-100/30'
              }`}
            >
              {t.projectFilterBrazil}
            </button>
            <button
              onClick={() => setFilter('global')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                filter === 'global'
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-orange-100/30'
              }`}
            >
              {t.projectFilterGlobal}
            </button>
          </div>
        </div>

        {/* Campaign cards grid layout */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCampaigns.map((camp) => {
            const percent = Math.min(100, Math.round((camp.raised / camp.goal) * 100));
            return (
              <motion.article
                key={camp.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-lg hover:shadow-2xl hover:border-amber-200 transition-all duration-300 group"
              >
                 {/* Visual Header Representation with massive credibility instead of standard image */}
                {(() => {
                  const meta = campaignMetadata[camp.id] || campaignMetadata['dia-das-criancas'];
                  return (
                    <div className={`relative aspect-video w-full overflow-hidden bg-gradient-to-br ${meta.bg} flex flex-col justify-center items-center p-6`}>
                      {/* Grid pattern overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

                      {/* Certification tag */}
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1 rounded bg-slate-950/90 border border-white/10 px-2.5 py-0.5 text-[9px] font-mono tracking-widest text-amber-300 shadow">
                         SELO: {meta.badge}
                      </div>

                      <div className="absolute top-4 right-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-800 border border-orange-100/40 shadow-md">
                        {camp.category === 'brazil' ? 'Brasil 🇧🇷' : 'Global 🌐'}
                      </div>

                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${meta.color} bg-slate-900/60 shadow-lg z-10 transition-transform duration-300 group-hover:scale-110 mb-2`}>
                         <meta.icon className="h-7 w-7" />
                      </div>

                      <span className="text-[10px] font-bold text-amber-400/80 uppercase tracking-widest z-10">
                        Ação Governamental / Social Auditada
                      </span>
                    </div>
                  );
                })()}

                {/* Info Block bottom */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="font-sans text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                      {camp.title[currentLang]}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {camp.description[currentLang]}
                    </p>
                  </div>

                  {/* Funding stats segment */}
                  <div className="mt-6 pt-5 border-t border-orange-50 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-gray-500">{t.projectRaised}</span>
                        <span className="font-black text-amber-600">{percent}%</span>
                      </div>
                      
                      {/* Animated Progress Bar */}
                      <div className="h-2 w-full rounded-full bg-orange-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500"
                        />
                      </div>
                    </div>

                    {/* Numeric stats list */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono font-bold text-gray-600 border-b border-orange-50 pb-4">
                      <div>
                        <p className="font-sans font-semibold text-[10px] text-gray-400 uppercase tracking-wider">{t.projectGoal}</p>
                        <p className="text-gray-900">R$ {camp.goal.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-sans font-semibold text-[10px] text-gray-400 uppercase tracking-wider">Arrecadado</p>
                        <p className="text-amber-600">R$ {camp.raised.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <strong>{camp.daysLeft}</strong> {t.projectDaysLeft}
                      </span>

                      <button
                        onClick={handleDonateScroll}
                        className="inline-flex items-center gap-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 text-xs font-bold transition duration-300 shadow-md group-hover:translate-x-0.5"
                      >
                        {t.projectDonateBtn}
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
