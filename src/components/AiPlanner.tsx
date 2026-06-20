import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, ListTodo, ClipboardList, Lightbulb, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TranslationSet, Language } from '../types';

interface AiPlannerProps {
  t: TranslationSet;
  currentLang: Language;
}

export default function AiPlanner({ t, currentLang }: AiPlannerProps) {
  const [selectedCause, setSelectedCause] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<string>('');
  const [loadingText, setLoadingText] = useState<string>('');

  const causes = [
    {
      id: 'kids',
      labelPT: 'Apoio a Crianças / Orfanatos',
      labelEN: 'Children & Orphanages Support',
      labelES: 'Apoyo a Niños / Orfanatos',
      emoji: '🧸',
      descPT: 'Mutirões de brinquedos, contação de histórias e kits recreativos.',
      descEN: 'Toy drives, storytelling sessions, and recreational kits.',
      descES: 'Campañas de juguetes, cuentacuentos y kits recreativos.'
    },
    {
      id: 'food',
      labelPT: 'Distribuição de Alimentos',
      labelEN: 'Food Sharing Ecosystems',
      labelES: 'Distribución de Alimentos',
      emoji: '🍲',
      descPT: 'Arrecadação de cestas básicas, sopões comunitários e pães festivos.',
      descEN: 'Essential nutrition baskets, community soups, and celebratory breads.',
      descES: 'Colecta de canastas de comida, comedores y panes especiales.'
    },
    {
      id: 'elders',
      labelPT: 'Visita e Cuidado a Idosos',
      labelEN: 'Elderly Assistance & Caring visits',
      labelES: 'Visita y Cuidado de Ancianos',
      emoji: '👵',
      descPT: 'Tardes de carinho, agasalhos de tricô e escuta compassiva em asilos.',
      descEN: 'Afternoons of love, hand-knitted warm clothes, and compassionate listening.',
      descES: 'Tardes de cariño, abrigos tejidos y escucha compasiva.'
    },
    {
      id: 'neighborhood',
      labelPT: 'Projetos de Bairro / Mutirões',
      labelEN: 'Neighborhood & Mutual Aid Drives',
      labelES: 'Proyectos de Barrio / Mingas',
      emoji: '🤝',
      descPT: 'Pintura de parquinhos, revitalização de hortas e coletas locais.',
      descEN: 'Park painting, garden revitalization, and local cleanups.',
      descES: 'Pintura de parques, huertas comunitarias y limpiezas.'
    }
  ];

  const handleGeneratePlan = async () => {
    if (!selectedCause) return;

    setIsGenerating(true);
    setGeneratedPlan('');
    
    // Rotate beautiful loading statements
    const loadingStates = [
      'Analisando impacto social e demandas comunitárias...',
      'Desenhando cronograma de caridade na base do afeto...',
      'Dimensionando materiais mínimos necessários...',
      'Semeando ideias de mobilização no WhatsApp/redes sociais...',
      'Finalizando cronograma prático pelo bem comum...'
    ];

    let step = 0;
    setLoadingText(loadingStates[0]);
    const interval = setInterval(() => {
      step = (step + 1) % loadingStates.length;
      setLoadingText(loadingStates[step]);
    }, 1500);

    try {
      const selectedCauseLabel = causes.find(c => c.id === selectedCause)?.labelPT || selectedCause;
      const response = await fetch('/api/plan-action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cause: selectedCauseLabel,
          location: location || undefined,
          language: currentLang
        }),
      });

      if (!response.ok) {
        throw new Error('Falha no servidor ao gerar plano');
      }

      const data = await response.json();
      setGeneratedPlan(data.plan);
    } catch (error) {
      console.error(error);
      setGeneratedPlan(
        currentLang === 'PT' 
          ? '### ⚠️ Erro de Conexão\n\nNão foi possível conectar ao servidor Faça Você Também AI. Por favor, verifique se seu servidor está rodando ou tente novamente.' 
          : '### ⚠️ Connection Error\n\nCould not connect to the DIY AI engine. Please verify the backend states or retry.'
      );
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  // Basic markdown parser that maps headings, bold, bullet points to styled HTML tags
  const renderFormattedMarkdown = (markdown: string) => {
    if (!markdown) return null;

    const lines = markdown.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      // Empty lines
      if (!trimmed) return <div key={idx} className="h-2" />;

      // Header 1 / H1
      if (trimmed.startsWith('# ')) {
        return (
          <h3 key={idx} className="font-sans text-xl sm:text-2xl font-black text-amber-950 mt-6 mb-3 border-b border-orange-100 pb-2 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500 shrink-0" />
            {trimmed.slice(2)}
          </h3>
        );
      }

      // Header 2 / H2
      if (trimmed.startsWith('## ')) {
        const title = trimmed.slice(3);
        // Map icons dynamically to subsections
        let icon = <ListTodo className="h-4.5 w-4.5 text-orange-500 shrink-0" />;
        if (title.toLowerCase().includes('cronograma') || title.toLowerCase().includes('etapa') || title.toLowerCase().includes('fase')) {
          icon = <ClipboardList className="h-4.5 w-4.5 text-amber-500 shrink-0" />;
        } else if (title.toLowerCase().includes('material') || title.toLowerCase().includes('recurso') || title.toLowerCase().includes('item')) {
          icon = <ListTodo className="h-4.5 w-4.5 text-rose-500 shrink-0" />;
        } else if (title.toLowerCase().includes('mobilização') || title.toLowerCase().includes('divulga') || title.toLowerCase().includes('whatsapp')) {
          icon = <Lightbulb className="h-4.5 w-4.5 text-emerald-500 shrink-0" />;
        }
        return (
          <h4 key={idx} className="font-sans text-sm sm:text-base font-bold text-gray-900 mt-5 mb-2 bg-amber-50/60 rounded-xl p-2.5 border border-orange-100 flex items-center gap-2">
            {icon}
            {title}
          </h4>
        );
      }

      // Header 3 / H3 / bold headers
      if (trimmed.startsWith('### ')) {
        return (
          <h5 key={idx} className="font-sans text-xs sm:text-sm font-black text-gray-800 mt-4 mb-2">
            {trimmed.slice(4)}
          </h5>
        );
      }

      // Styled list items
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const content = trimmed.slice(2);
        return (
          <div key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm text-gray-700 font-sans my-1.5 leading-relaxed pl-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <span className="select-text">{parseBoldTags(content)}</span>
          </div>
        );
      }

      // Default styled paragraphs
      return (
        <p key={idx} className="text-xs sm:text-sm text-gray-700 font-sans leading-relaxed my-2 select-text">
          {parseBoldTags(trimmed)}
        </p>
      );
    });
  };

  // Helper inside renderer to parse simple **bold** tags inline
  const parseBoldTags = (text: string) => {
    const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
    if (parts.length === 1) return text;
    
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-bold text-amber-950">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <section id="ai-planner" className="bg-gradient-to-b from-orange-50/20 to-amber-50/20 py-24 border-t border-orange-50 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-600 bg-orange-100 rounded-full px-4 py-1.5 shadow-sm inline-flex items-center gap-1.5 animate-pulse">
            <Sparkles className="h-3 w-3 fill-current" />
            Faça Você Também com Inteligência Artificial
          </span>
          <h2 className="mt-4 font-sans text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            Planejador de Ação Solidária
          </h2>
          <p className="mt-4 text-base text-gray-600 font-sans leading-relaxed">
            Gere ideias autônomas de caridade e impacto social para colocar em prática em seu bairro, escola, igreja ou empresa.
          </p>
        </div>

        {/* Main Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch" id="planner-grid-workspace">
          
          {/* Left Grid Panel: Selection Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-white rounded-3xl border border-orange-100 p-6 sm:p-8 shadow-lg flex-1">
              <h3 className="font-sans text-base font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-orange-50 mb-5">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 text-amber-600 font-extrabold text-xs">1</span>
                Qual causa você deseja apoiar hoje?
              </h3>

              {/* Causes Selection items list */}
              <div className="space-y-3">
                {causes.map((cause) => {
                  const label = currentLang === 'PT' ? cause.labelPT : currentLang === 'ES' ? cause.labelES : cause.labelEN;
                  const desc = currentLang === 'PT' ? cause.descPT : currentLang === 'ES' ? cause.descES : cause.descEN;
                  
                  return (
                    <button
                      key={cause.id}
                      onClick={() => setSelectedCause(cause.id)}
                      className={`w-full rounded-2xl border p-4 transition-all duration-300 text-left flex gap-3.5 items-start ${
                        selectedCause === cause.id
                          ? 'border-amber-500 bg-amber-50/50 shadow-md ring-1 ring-amber-500/20'
                          : 'border-orange-50 bg-white hover:bg-orange-50/30'
                      }`}
                      id={`cause-item-${cause.id}`}
                    >
                      <span className="text-2xl shrink-0 filter drop-shadow-sm">{cause.emoji}</span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                          {label}
                        </h4>
                        <p className="text-[10px] leading-relaxed text-gray-500 font-sans mt-0.5">
                          {desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Location Input Section */}
              <div className="mt-6 pt-5 border-t border-orange-50">
                <label className="block text-[11px] uppercase font-bold text-gray-500 flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-md bg-orange-100 text-orange-600 text-[10px] font-bold">2</span>
                  Onde planeja realizar a ação? (Opcional)
                </label>
                <div className="relative mt-2">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ex: Meu bairro, escola municipal, empresa, Curitiba..."
                    className="block w-full rounded-xl border border-orange-100 bg-amber-50/10 px-4 py-3 text-xs text-gray-900 outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 placeholder-gray-400 font-sans"
                  />
                </div>
              </div>
            </div>

            {/* CTA Generate button */}
            <button
              onClick={handleGeneratePlan}
              disabled={isGenerating || !selectedCause}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl py-4 text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all duration-300 transform active:scale-95 cursor-pointer ${
                selectedCause
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 shadow-orange-500/10 hover:shadow-lg hover:-translate-y-0.5'
                  : 'bg-gray-300 cursor-not-allowed shadow-none'
              }`}
            >
              <Sparkles className="h-4.5 w-4.5 fill-current animate-pulse text-white" />
              <span>Sua Ideia Revolucionária Espera</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Right Grid Column: Plan Display screen */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-orange-100 shadow-xl overflow-hidden relative flex flex-col justify-between">
            {/* Visual banner */}
            <div className="bg-amber-950 text-amber-100 px-6 py-4 flex items-center justify-between border-b border-amber-900/40">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-300 font-mono">
                DIY AI Solidarity Engine v2.5
              </span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            {/* Inner Content Area */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center min-h-[380px]">
              <AnimatePresence mode="wait">
                {isGenerating ? (
                  /* Loading presentation active */
                  <motion.div
                    key="loading-planner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="relative mx-auto h-16 w-16 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-orange-100 animate-pulse" />
                      <div className="absolute inset-0 rounded-full border-4 border-t-amber-500 animate-spin" />
                      <Sparkles className="h-6 w-6 text-amber-600 animate-bounce" />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-sm font-semibold text-gray-800 font-sans">
                        Gerando Cronograma Solidário...
                      </p>
                      <p className="text-xs text-gray-500 font-sans italic max-w-md mx-auto animate-pulse">
                        "{loadingText}"
                      </p>
                    </div>
                  </motion.div>
                ) : generatedPlan ? (
                  /* Formatted outputs shown */
                  <motion.div
                    key="content-planner"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 text-left max-h-[500px] overflow-y-auto pr-2 scrollbar-thin"
                  >
                    {renderFormattedMarkdown(generatedPlan)}
                  </motion.div>
                ) : (
                  /* Empty state instruction */
                  <motion.div
                    key="empty-planner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12 max-w-md mx-auto space-y-4"
                  >
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-500">
                      <ClipboardList className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-900">
                        {currentLang === 'PT' ? 'Sua Ideia Revolucionária Espera' : currentLang === 'ES' ? 'Tu Idea Revolucionaria Espera' : 'Your Visionary Action Plan Awaits'}
                      </p>
                      <p className="text-xs text-gray-500 font-sans leading-relaxed">
                        Selecione uma categoria desejada à esquerda para que nossa inteligência monte um cronograma prático, especificando os materiais mínimos e as etapas de arrecadação locais.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Card Share/Action Bottom panel */}
            {generatedPlan && !isGenerating && (
              <div className="border-t border-orange-50 bg-amber-50/20 px-6 py-4 flex flex-wrap justify-between items-center gap-3">
                <p className="text-[10px] text-gray-400 font-sans">
                  *Plano interativo criado exclusivamente pela inteligência do Faça Você Também.
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedPlan);
                    alert(currentLang === 'PT' ? 'Plano de ação copiado para a área de transferência!' : 'Action plan copied to clipboard!');
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-orange-200 bg-white hover:bg-orange-50 px-4 py-2 text-xs font-bold text-gray-700 shadow-sm transition"
                >
                  <Share2 className="h-3.5 w-3.5 text-amber-500" />
                  <span>Copiar Plano Completo</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
