import React, { useState } from 'react';
import { ShieldCheck, Users, Sparkles, Globe, Heart, Award, ArrowUpRight, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { TranslationSet } from '../types';

interface MissionImpactProps {
  t: TranslationSet;
}

export default function MissionImpact({ t }: MissionImpactProps) {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'impact'>('mission');

  // Statistics counters
  const stats = [
    { label: t.statsFamilies, value: '12.450', icon: Users, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: t.statsToys, value: '48.200', icon: Sparkles, color: 'text-rose-600', bg: 'bg-rose-100' },
    { label: t.statsCountries, value: '14+', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: t.statsVolunteers, value: '520', icon: Heart, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const socialImpacts = [
    {
      title: 'Segurança Alimentar e Nutricional',
      desc: 'Mais do que brinquedos, garantimos que datas festivas venham acompanhadas de ceias e cestas básicas abundantes. Isso garante dignidade à mesa e união familiar real em momentos que tradicionalmente seriam de privação.',
      icon: ShieldCheck,
      color: 'from-amber-400 to-orange-500',
    },
    {
      title: 'Impacto Psico-Emocional e Autoestima',
      desc: 'O ato de receber um brinquedo novo e embalado, com carinho, ensina à criança vulnerável que ela não foi esquecida pelo mundo. Isso fortalece o senso de pertencimento, esperança e reduz as taxas de isolamento social.',
      icon: Award,
      color: 'from-rose-400 to-pink-500',
    },
    {
      title: 'Educação Continuada e Suporte Escolar',
      desc: 'Nossas campanhas sazonais também incluem fornecimento de materiais escolares (mochilas, cadernos, canetas) e uniformes com agasalhos de frio, combatendo diretamente a evasão escolar após as férias.',
      icon: Sparkles,
      color: 'from-orange-400 to-red-500',
    },
    {
      title: 'Conexão Global de Amor e União de Culturas',
      desc: 'Provamos que a empatia une nações. Através de canais logísticos estabelecidos com órgãos beneficentes globais, viabilizamos o recebimento e entrega de ajuda em países da África, Ásia e América Latina.',
      icon: Globe,
      color: 'from-blue-400 to-indigo-500',
    }
  ];

  return (
    <section id="mission" className="bg-amber-50/40 py-24 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-wider text-amber-600 bg-amber-100 rounded-full px-4 py-1.5 shadow-sm">
            {t.missionImpactBadge}
          </span>
          <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            {t.missionTitle}
          </h2>
          <p className="mt-4 font-sans text-base sm:text-lg text-gray-600 leading-relaxed">
            {t.missionSubtitle}
          </p>
        </div>

        {/* Detailed Copy & Tabbed Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-start mb-20">
          <div className="space-y-6">
            <h3 className="font-sans text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-amber-500 block" />
              Semeando Conexões e Esperança
            </h3>
            <p className="font-sans text-sm sm:text-base text-gray-700 leading-relaxed">
              {t.missionParagraph1}
            </p>
            <p className="font-sans text-sm sm:text-base text-gray-700 leading-relaxed">
              {t.missionParagraph2}
            </p>

            <div className="rounded-2xl bg-amber-100/55 border border-orange-100 p-6 space-y-4">
              <h4 className="font-sans text-base font-bold text-amber-900 flex items-center gap-2">
                <Gift className="h-5 w-5 text-amber-600" />
                {t.missionHeading1}
              </h4>
              <p className="font-sans text-sm text-gray-700 leading-relaxed">
                {t.missionParagraph3}
              </p>
            </div>
          </div>

          {/* Graphical Representation / Tabbed interactive Panel */}
          <div className="rounded-3xl border border-orange-100 bg-white p-6 sm:p-8 shadow-xl relative overflow-hidden group">
            {/* Soft decorative background radial glow */}
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-rose-200/20 blur-3xl group-hover:scale-110 transition-transform" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-200/20 blur-3xl" />

            <div className="flex border-b border-orange-100 pb-3 mb-6 gap-2 sm:gap-4 overflow-x-auto">
              <button
                onClick={() => setActiveTab('mission')}
                className={`pb-3 text-sm font-bold border-b-2 px-1 transition-all capitalize ${
                  activeTab === 'mission' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                A Instituição
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`pb-3 text-sm font-bold border-b-2 px-1 transition-all capitalize ${
                  activeTab === 'vision' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {t.missionHeading2}
              </button>
              <button
                onClick={() => setActiveTab('impact')}
                className={`pb-3 text-sm font-bold border-b-2 px-1 transition-all capitalize ${
                  activeTab === 'impact' ? 'border-amber-500 text-amber-600' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                Atuação Global
              </button>
            </div>

            {/* Tab contents */}
            <div>
              {activeTab === 'mission' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Nossos Princípios</p>
                  <h4 className="text-xl font-extrabold text-gray-900 font-sans">Acolhimento Integral e Afeto</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Entendemos que o alimento mata a fome do corpo, mas o afeto, a lembrança e o carinho matam a fome da alma. Por isso, nossas ações celebram a humanidade de cada pessoa atendida, dando-lhes voz e carinho personalizado.
                  </p>
                  <div className="pt-4 grid grid-cols-2 gap-4">
                    <div className="border border-amber-100 bg-amber-50/50 p-4 rounded-xl">
                      <span className="text-lg font-bold text-amber-600">100%</span>
                      <p className="text-xs text-gray-500">Doações destinadas aos projetos finais</p>
                    </div>
                    <div className="border border-orange-100 bg-orange-50/50 p-4 rounded-xl">
                      <span className="text-lg font-bold text-orange-600">Zero</span>
                      <p className="text-xs text-gray-500">Custos administrativos retirados do Pix</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'vision' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Compromisso de Futuro</p>
                  <h4 className="text-xl font-extrabold text-gray-900 font-sans">Romper o Ciclo da Invisibilidade</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t.missionParagraph4}
                  </p>
                  <blockquote className="border-l-4 border-rose-500 pl-4 py-2 text-sm italic text-gray-600 bg-rose-50/40 rounded-r-lg">
                    "O Faça Você Também é mais do que fazer doações: é um convite para criar memórias felizes e espalhar humanidade onde ela mais faz falta."
                  </blockquote>
                </motion.div>
              )}

              {activeTab === 'impact' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">Expansão de Fronteiras</p>
                  <h4 className="text-xl font-extrabold text-gray-900 font-sans">Pontes Solidárias pelo Planeta</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Nossa missão não se limita às periferias brasileiras. Entendemos que a desigualdade é global. Estruturamos pontos focais internacionais onde doadores mundiais participam e auxiliam no envio de pacotes de auxílio infantil para orfanatos e vilas carentes.
                  </p>
                  <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex gap-3 items-center">
                    <Globe className="h-8 w-8 text-blue-600 animate-spin" style={{ animationDuration: '25s' }} />
                    <div>
                      <h5 className="font-bold text-xs text-blue-900">Interconexão de Sistemas</h5>
                      <p className="text-[11px] text-blue-700">Tornamos doações globais fáceis com câmbio direto de moedas em tempo real no nosso Checkout.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Counter Dashboard */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 mb-24" id="stats-dashboard">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="rounded-2xl border border-orange-100 bg-white p-5 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shadow-inner">
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <h4 className="font-sans text-2xl font-black text-gray-900 sm:text-3xl">
                {item.value}
              </h4>
              <p className="font-sans text-xs sm:text-sm font-semibold text-gray-500 mt-1">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Social Impacts Grid */}
        <div className="space-y-8">
          <div className="max-w-xl">
            <h3 className="font-sans text-2xl font-bold text-gray-900 leading-tight">
              Os Impactos Sociais que Você Ajuda a Gerar
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Cada centavo doado e cada hora voluntariada é convertido em resultados metodologicamente focados no bem-estar humano.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {socialImpacts.map((impact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col sm:flex-row gap-4 p-6 rounded-2xl bg-white border border-orange-100 shadow-md hover:border-amber-300 transition-all duration-300 group"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${impact.color} text-white shadow-md shadow-orange-500/10`}>
                  <impact.icon className="h-6 w-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-sans text-base font-bold text-gray-900 flex items-center gap-1.5">
                    {impact.title}
                    <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-amber-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {impact.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
