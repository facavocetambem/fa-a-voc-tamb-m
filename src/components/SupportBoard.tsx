import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, MessageSquare, Plus, RefreshCw, Calendar, Pin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TranslationSet, Language } from '../types';

interface SupportLetter {
  id: string;
  name: string;
  location: string;
  message: string;
  seedType: 'supporter' | 'guardian' | 'hero';
  date: string;
  isPinned?: boolean;
}

interface SupportBoardProps {
  t: TranslationSet;
  currentLang: Language;
}

export default function SupportBoard({ t, currentLang }: SupportBoardProps) {
  const [letters, setLetters] = useState<SupportLetter[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [seedType, setSeedType] = useState<'supporter' | 'guardian' | 'hero'>('supporter');
  const [successMsg, setSuccessMsg] = useState(false);

  // Initial fixed cards matching user request exactly
  const initialLetters: SupportLetter[] = [
    {
      id: 'pin-1',
      name: 'Gabriela Mendes',
      location: 'São Paulo, Brasil',
      message: 'Ver o sorriso no rosto das crianças no ano passado me mostrou que pequenos atos geram transformações imensas. Orgulho de apoiar!',
      seedType: 'hero',
      date: '12 de mai. de 2026',
      isPinned: true
    },
    {
      id: 'pin-2',
      name: 'Liam O\'Connor',
      location: 'Dublin, Ireland',
      message: 'A truly wonderful initiative. Solidarity knows no boundaries, and bringing smiles to kids is a universal language.',
      seedType: 'supporter',
      date: '18 de abr. de 2026',
      isPinned: true
    },
    {
      id: 'pin-3',
      name: 'Alejandra Ruiz',
      location: 'Medellín, Colombia',
      message: '¡Hagámoslo nosotros también! Un pequeño juguete puede ser la semilla de un gran sueño. Un abrazo fuerte a todo el equipazo del proyecto.',
      seedType: 'guardian',
      date: '27 de mai. de 2026',
      isPinned: true
    },
    {
      id: 'pin-4',
      name: 'Lucas Alencar',
      location: 'Lisboa, Portugal',
      message: 'Fico muito feliz de colaborar daqui da terrinha. Que o projeto continue se espalhando e impactando positivamente milhares de famílias!',
      seedType: 'supporter',
      date: '3 de jun. de 2026',
      isPinned: true
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('fvt_support_letters');
    if (saved) {
      try {
        setLetters(JSON.parse(saved));
      } catch (e) {
        setLetters(initialLetters);
      }
    } else {
      setLetters(initialLetters);
      localStorage.setItem('fvt_support_letters', JSON.stringify(initialLetters));
    }
  }, []);

  const handleRefresh = () => {
    // Refresh letters list from storage
    const saved = localStorage.getItem('fvt_support_letters');
    if (saved) {
      try {
        setLetters(JSON.parse(saved));
      } catch (e) {
        setLetters(initialLetters);
      }
    } else {
      setLetters(initialLetters);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !location || !message) return;

    // Format current date in appropriate style
    const options: any = { day: 'numeric', month: 'short', year: 'numeric' };
    const dateFormatted = new Date().toLocaleDateString(currentLang === 'PT' ? 'pt-BR' : currentLang === 'ES' ? 'es-ES' : 'en-US', options);

    const newLetter: SupportLetter = {
      id: `user-${Date.now()}`,
      name,
      location,
      message,
      seedType,
      date: `Post ${dateFormatted}`,
      isPinned: false
    };

    const updated = [newLetter, ...letters];
    setLetters(updated);
    localStorage.setItem('fvt_support_letters', JSON.stringify(updated));

    // Reset Form
    setName('');
    setLocation('');
    setMessage('');
    setSeedType('supporter');
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setIsFormOpen(false);
    }, 2500);
  };

  const seedLabels = {
    supporter: {
      PT: '🌱 Semente Solidária (Apoiador)',
      EN: '🌱 Solidary Seed (Supporter)',
      ES: '🌱 Semilla Solidaria (Apoyador)'
    },
    guardian: {
      PT: '🍁 Guardião do Futuro (Guardião)',
      EN: '🍁 Future Guardian (Guardian)',
      ES: '🍁 Guardián del Futuro (Guardián)'
    },
    hero: {
      PT: '✨ Herói da Esperança',
      EN: '✨ Hero of Hope',
      ES: '✨ Héroe de la Esperanza'
    }
  };

  const badgeStyles = {
    supporter: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    guardian: 'bg-amber-50 text-amber-700 border-amber-100',
    hero: 'bg-rose-50 text-rose-700 border-rose-100'
  };

  const getSeedBadgeName = (type: 'supporter' | 'guardian' | 'hero', lang: Language) => {
    const labels = {
      PT: { supporter: 'Apoiador', guardian: 'Guardião', hero: 'Heroína da Esperança' },
      EN: { supporter: 'Supporter', guardian: 'Guardian', hero: 'Hero of Hope' },
      ES: { supporter: 'Apoyador', guardian: 'Guardián', hero: 'Héroe de la Esperanza' }
    };
    return labels[lang]?.[type] || labels['PT'][type];
  };

  return (
    <section id="support-board" className="bg-amber-50/10 py-24 border-t border-orange-50 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-100 rounded-full px-4 py-1.5 shadow-sm">
            Mural da Solidariedade Global
          </span>
          <h2 className="mt-4 font-sans text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            Cartas de Esperança e Força
          </h2>
          <p className="mt-4 text-base text-gray-600 font-sans leading-relaxed">
            Deixe uma palavra de carinho e incentivo para as crianças e famílias apoiadas pelo movimento Faça Você Também em todo o mundo. O amor cura!
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-amber-600" />
            <span className="text-sm font-bold text-gray-800">
              Cartas no Mural ({letters.length})
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-1.5 rounded-xl border border-orange-200 bg-white hover:bg-orange-50 px-4 py-2 text-xs font-bold text-gray-700 shadow-sm transition"
              title="Atualizar Mural"
            >
              <RefreshCw className="h-3.5 w-3.5 text-orange-600" />
              <span>Atualizar</span>
            </button>

            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-white font-bold px-5 py-2.5 text-xs shadow-md transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
              <span>Escrever Nova Carta</span>
            </button>
          </div>
        </div>

        {/* Form Expansion Drawer */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-10"
              id="new-letter-form-drawer"
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-xl max-w-2xl mx-auto space-y-4">
                <h3 className="font-sans text-base font-bold text-gray-900 flex items-center gap-2 pb-3 border-b border-orange-50">
                  <Sparkles className="h-4.5 w-4.5 text-amber-500" />
                  Plante Sua Semente de Carinho
                </h3>

                {successMsg ? (
                  <div className="py-8 text-center text-emerald-600 font-sans space-y-2">
                    <Heart className="h-10 w-10 fill-current text-rose-500 mx-auto animate-bounce" />
                    <p className="font-bold text-lg">Sua semente de amor foi plantada!</p>
                    <p className="text-xs text-gray-500">Agradecemos de coração pelas palavras de esperança.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-gray-500">Seu nome ou apelido:</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Ex: Maria Helena, Família Silva..."
                          className="mt-1 block w-full rounded-xl border border-orange-100 bg-amber-50/10 px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                      </div>

                      {/* Location input */}
                      <div>
                        <label className="block text-[11px] uppercase font-bold text-gray-500">Sua Cidade & País:</label>
                        <input
                          type="text"
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Ex: Curitiba, Brasil / London, UK..."
                          className="mt-1 block w-full rounded-xl border border-orange-100 bg-amber-50/10 px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-gray-500">Sua mensagem de apoio:</label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Escreva palavras doces de fé, sorrisos ou motivação..."
                        rows={3}
                        className="mt-1 block w-full rounded-xl border border-orange-100 bg-amber-50/10 px-3.5 py-2.5 text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
                      />
                    </div>

                    {/* Seed Type Selection */}
                    <div>
                      <label className="block text-[11px] uppercase font-bold text-gray-500 mb-2">Escolha qual semente de amor você deseja plantar:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {(['supporter', 'guardian', 'hero'] as const).map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setSeedType(type)}
                            className={`rounded-xl border p-3 text-xs font-bold transition-all text-left flex items-center justify-between ${
                              seedType === type
                                ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                                : 'border-gray-200 bg-white text-gray-600 hover:bg-orange-50/40'
                            }`}
                          >
                            <span>{seedLabels[type][currentLang]}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-orange-50 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="rounded-xl border border-orange-100 bg-white hover:bg-orange-50 px-4 py-2 text-xs font-bold text-gray-600 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2 text-xs shadow-md transition duration-200"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>Enviar Carta com Amor</span>
                      </button>
                    </div>
                  </>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Letters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="mural-letters-grid">
          <AnimatePresence mode="popLayout">
            {letters.map((letter, index) => (
              <motion.div
                key={letter.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-orange-100/60 p-5 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Visual pin element for pinned messages */}
                {letter.isPinned && (
                  <div className="absolute top-3 right-3 text-red-400 group-hover:scale-110 transition-transform" title="Mensagem Fixada">
                    <Pin className="h-4.5 w-4.5 rotate-45 fill-current" />
                  </div>
                )}

                {/* Card Top */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-black ${badgeStyles[letter.seedType]}`}>
                      {getSeedBadgeName(letter.seedType, currentLang)}
                    </span>
                    <span className="text-[9px] text-gray-400 font-mono flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {letter.date}
                    </span>
                  </div>

                  <p className="text-xs text-gray-700 font-sans italic leading-relaxed pt-1 select-text">
                    “{letter.message}”
                  </p>
                </div>

                {/* Card Author Footer */}
                <div className="border-t border-orange-50/60 pt-3.5 mt-4 text-left">
                  <h4 className="text-xs font-black text-gray-900 capitalize">
                    {letter.name}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-sans">
                    {letter.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
