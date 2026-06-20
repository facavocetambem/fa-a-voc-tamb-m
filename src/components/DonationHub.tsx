import React, { useState } from 'react';
import { Heart, Copy, Check, ShieldCheck, Gift, Globe, CreditCard, ExternalLink, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TranslationSet } from '../types';

interface DonationHubProps {
  t: TranslationSet;
}

// Simple CRC16 CCITT function for fully valid Pix Payloads
function calculateCRC16(str: string): string {
  let crc = 0xFFFF;
  const polynomial = 0x1021;

  for (let i = 0; i < str.length; i++) {
    const b = str.charCodeAt(i);
    for (let j = 0; j < 8; j++) {
      const bit = ((b >> (7 - j)) & 1) === 1;
      const c15 = ((crc >> 15) & 1) === 1;
      crc <<= 1;
      if (c15 !== bit) {
        crc ^= polynomial;
      }
    }
  }

  crc &= 0xFFFF;
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

// Generate Brazilian PIX Payload
function generatePixPayload(key: string, amount: number, name: string = 'Faca Vc Tambem', city: string = 'Sao Paulo'): string {
  const rawKey = key.replace(/\D/g, '');
  const amountStr = amount.toFixed(2);
  
  const gui = '0014br.gov.bcb.pix';
  const keyTag = `0114${rawKey}`;
  const merchantAccountInfo = `26${(gui.length + keyTag.length).toString().padStart(2, '0')}${gui}${keyTag}`;
  
  const payloadFormat = '000201';
  const initMethod = '010212';
  const categoryCode = '52040000';
  const currencyCode = '5303986'; // BRL
  const transactionAmount = `54${amountStr.length.toString().padStart(2, '0')}${amountStr}`;
  const countryCode = '5802BR';
  const merchantName = `59${name.length.toString().padStart(2, '0')}${name}`;
  const merchantCity = `60${city.length.toString().padStart(2, '0')}${city}`;
  const txId = '0503***';
  const additionalData = `62${(txId.length + 4).toString().padStart(2, '0')}05${txId.length.toString().padStart(2, '0')}${txId}`;
  
  const basePayload = `${payloadFormat}${initMethod}${merchantAccountInfo}${categoryCode}${currencyCode}${transactionAmount}${countryCode}${merchantName}${merchantCity}${additionalData}6304`;
  const crc = calculateCRC16(basePayload);
  
  return `${basePayload}${crc}`;
}

export default function DonationHub({ t }: DonationHubProps) {
  const [method, setMethod] = useState<'pix' | 'international'>('pix');
  const [currency, setCurrency] = useState<'BRL' | 'USD' | 'EUR'>('BRL');
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [copiedPix, setCopiedPix] = useState<boolean>(false);
  const [copiedCNPJ, setCopiedCNPJ] = useState<boolean>(false);
  const [copiedIban, setCopiedIban] = useState<boolean>(false);

  // Simulated gateway card integrations states
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processStep, setProcessStep] = useState<number>(1);
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>('');
  const [cardNo, setCardNo] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCVC, setCardCVC] = useState<string>('');

  const rawCNPJ = '57646942000169';
  const formattedCNPJ = '57.646.942/0001-69';
  const officialMPLink = 'http://link.mercadopago.com.br/facavocetambem';

  const amountPresets = [15, 30, 50, 100];
  const currentAmount = Math.max(0, customAmount ? parseFloat(customAmount) || 0 : donationAmount);

  const currencySymbols = {
    BRL: 'R$',
    USD: '$',
    EUR: '€'
  };

  const pixPayloadString = generatePixPayload(rawCNPJ, currentAmount);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixPayloadString);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleCopyCNPJ = () => {
    navigator.clipboard.writeText(rawCNPJ);
    setCopiedCNPJ(true);
    setTimeout(() => setCopiedCNPJ(false), 3000);
  };

  const handleCopyIban = () => {
    navigator.clipboard.writeText('BR12 0036 0001 5764 6942 0001 69');
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 3000);
  };

  const handleSimulatedCardPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount <= 0) return;

    setIsProcessing(true);
    setProcessStep(1);

    const steps = [
      'Autenticando transação internacional segura...',
      'Validando as diretrizes de compliance global...',
      'Transferindo dotação social de caridade para o F.V.T. Global...',
      'Finalizando emissão do seu Certificado Oficial de Amor...'
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length - 1) {
        stepIdx++;
        setProcessStep(stepIdx + 1);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
        setDonationSuccess(true);
      }
    }, 1200);
  };

  return (
    <section id="donate" className="bg-gradient-to-b from-amber-50 to-orange-100/40 py-24 scroll-mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-100 rounded-full px-4 py-1.5 shadow-sm inline-flex items-center gap-1">
            ★ Arrecadação de Solidariedade
          </span>
          <h2 className="mt-4 font-sans text-3xl font-black tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Faça sua Doação Global
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 font-sans leading-relaxed">
            Seu Gesto Tem Força Universal. Qualquer quantia transforma vidas em sorrisos palpáveis. Toque corações em todo o mundo.
          </p>
        </div>

        {/* Currency select triggers */}
        <div className="flex flex-col items-center justify-center gap-5 mb-10">
          <div className="flex gap-2.5 rounded-2xl border border-orange-200/50 bg-white/60 p-1.5 shadow-sm">
            {(['BRL', 'USD', 'EUR'] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => {
                  setCurrency(curr);
                  if (curr === 'BRL') {
                    setMethod('pix');
                  } else {
                    setMethod('international');
                  }
                  setDonationSuccess(false);
                }}
                className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                  currency === curr
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                id={`currency-btn-${curr.toLowerCase()}`}
              >
                {curr} ({currencySymbols[curr]})
              </button>
            ))}
          </div>

          <p className="text-xs font-bold text-orange-950/70 border-b border-orange-200/50 pb-1">
            Sugestão de valor para doar:
          </p>

          <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
            {amountPresets.map((preset) => (
              <button
                key={preset}
                onClick={() => {
                  setDonationAmount(preset);
                  setCustomAmount('');
                }}
                className={`rounded-xl border py-2.5 text-xs font-extrabold transition-all duration-200 ${
                  currentAmount === preset && !customAmount
                    ? 'border-amber-500 bg-amber-500 text-white shadow-sm'
                    : 'border-orange-100 bg-white text-gray-700 hover:bg-orange-50/40'
                }`}
              >
                {currencySymbols[currency]} {preset}
              </button>
            ))}
          </div>

          <div className="w-full max-w-sm">
            <input
              type="number"
              min="0"
              value={customAmount}
              onChange={(e) => {
                const val = e.target.value.replace(/[-]/g, '');
                setCustomAmount(val);
              }}
              placeholder="Digite outro valor personalizado..."
              className="block w-full text-center rounded-xl border border-orange-200 bg-white py-2.5 text-xs font-bold text-gray-900 focus:ring-1 focus:ring-amber-500 outline-none"
            />
          </div>
        </div>

        {/* Navigation tabs for checkout types */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-full border border-orange-200 bg-white/75 p-1 px-1.5 shadow-md">
            <button
              onClick={() => {
                setMethod('pix');
                setCurrency('BRL');
              }}
              className={`rounded-full px-6 py-2 text-xs font-black transition-all duration-300 ${
                method === 'pix'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Pix
            </button>
            <button
              onClick={() => {
                setMethod('international');
                if (currency === 'BRL') setCurrency('USD');
              }}
              className={`rounded-full px-6 py-2 text-xs font-black transition-all duration-300 ${
                method === 'international'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Global
            </button>
          </div>
        </div>

        {/* Dynamic Display */}
        <div className="mx-auto max-w-4xl" id="donation-workspace-card">
          <AnimatePresence mode="wait">
            
            {/* PIX AREA (Brazil Only) */}
            {method === 'pix' && (
              <motion.div
                key="pix-checkout"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 rounded-3xl border border-orange-100 bg-white p-6 sm:p-10 shadow-xl"
              >
                {/* Left side text info */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="font-sans text-lg font-black text-gray-900">
                      Apoiar via Pix (Brasil)
                    </h3>
                    <p className="text-xs text-gray-500 font-sans leading-relaxed">
                      Utilize o botão de facilitação rápida ao lado para copiar a chave Pix oficial de forma direta e segura para realizar sua transferência espontânea.
                    </p>

                    <div className="rounded-xl border border-orange-100/60 bg-orange-50/25 p-4 flex gap-3 items-start">
                      <Gift className="h-5 w-5 text-orange-500 shrink-0 mt-0.5 animate-bounce" />
                      <div>
                        <h4 className="text-xs font-bold text-orange-950">Seu Impacto Estimado:</h4>
                        <p className="text-xs text-orange-900 mt-0.5 leading-relaxed font-sans">
                          {currentAmount <= 20 
                            ? `Seu apoio de ${currencySymbols[currency]} ${currentAmount.toFixed(2)} compra lanches saborosos embalados e 1 brinquedo educativo.` 
                            : currentAmount <= 60 
                            ? `Seu apoio garante kits escolares completos ou brinquedos educativos com doces para ${Math.ceil(currentAmount / 20)} crianças.` 
                            : `Ajuda fantástica! Viabiliza cestas básicas fartas de suprimentos cruciais para nutrir uma família vulnerável inteira por 2 semanas.`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-emerald-600 font-bold font-sans mt-5 flex items-center gap-1.5">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                    <span>Sua doação vai de forma direta e integral para os projetos da instituição.</span>
                  </p>
                </div>

                {/* Right side QR code panel */}
                <div className="md:col-span-5 flex flex-col items-center justify-center bg-amber-50/20 rounded-2xl border border-orange-100 p-5 text-center">
                  <span className="text-[9px] uppercase font-black text-amber-700 tracking-widest">Canal de Apoio Seguro</span>
                  <div className="text-lg font-black text-gray-900 mt-1 pb-1 border-b border-orange-100 w-full">
                    PIX SOLIDÁRIO ATIVO
                  </div>

                  {/* Heart display block instead of QR code */}
                  <div className="relative my-4 aspect-square w-36 rounded-2xl bg-orange-50/65 border border-orange-100/80 flex flex-col items-center justify-center shadow-inner">
                    <motion.div
                      animate={{
                        scale: [1, 1.12, 1],
                        filter: ["drop-shadow(0px 0px 0px rgba(249,115,22,0))", "drop-shadow(0px 4px 10px rgba(249,115,22,0.3))", "drop-shadow(0px 0px 0px rgba(249,115,22,0))"]
                      }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-orange-500"
                    >
                      <Heart className="h-16 w-16 fill-orange-500 text-orange-500 stroke-[1.5]" />
                    </motion.div>
                  </div>

                  <p className="text-[10px] text-gray-500 leading-relaxed font-sans max-w-[200px]">
                    Utilize as opções rápidas de cópia segura abaixo para realizar sua doação instantânea pelo seu aplicativo bancário:
                  </p>

                  <div className="w-full space-y-2 mt-4">
                    <button
                      onClick={handleCopyCNPJ}
                      className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black py-2.5 text-xs transition shadow-sm cursor-pointer"
                    >
                      {copiedCNPJ ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      <span>{copiedCNPJ ? 'Chave Copiada!' : 'Copiar Chave Pix'}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* INTERNATIONAL AREA (USD/EUR) */}
            {method === 'international' && (
              <motion.div
                key="international-checkout"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="rounded-3xl border border-orange-100 bg-white p-6 sm:p-10 shadow-xl"
              >
                {!donationSuccess ? (
                  <div className="space-y-8">
                    <div>
                      <h3 className="font-sans text-lg font-black text-gray-900">Doações Internacionais</h3>
                      <p className="text-xs text-gray-500 font-sans mt-1">
                        Você pode apoiar o Faça Você Também de qualquer lugar do mundo.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      {/* Option A Card */}
                      <div className="border border-orange-100 rounded-2xl p-5 sm:p-6 space-y-4 bg-amber-50/10 min-h-[300px] flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-100 rounded px-2 py-0.5 inline-block">Option A</span>
                          <h4 className="font-sans text-sm font-bold text-gray-900">Apoiar via PayPal / Cartão de Crédito</h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                            Aceita cartões globais e remessas diretas de PayPal.
                          </p>
                        </div>

                        {/* Interactive Checkout details */}
                        <form onSubmit={handleSimulatedCardPay} className="space-y-3 bg-white p-4 rounded-xl border border-orange-50 shadow-sm mt-3 text-left">
                          <p className="text-[9px] uppercase font-bold text-gray-400">Cartão de Crédito Internacional</p>
                          <div>
                            <input
                              type="text"
                              required
                              placeholder="Alex von Humboldt"
                              value={donorName}
                              onChange={(e) => setDonorName(e.target.value)}
                              className="w-full text-[10px] px-2.5 py-1.5 rounded-lg border border-orange-100 focus:ring-1 focus:ring-amber-500 outline-none font-sans"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              required
                              placeholder="MM/AA"
                              maxLength={5}
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full text-[10px] px-2.5 py-1.5 rounded-lg border border-orange-100 focus:ring-1 focus:ring-amber-500 outline-none"
                            />
                            <input
                              type="password"
                              required
                              placeholder="CVC"
                              maxLength={3}
                              value={cardCVC}
                              onChange={(e) => setCardCVC(e.target.value)}
                              className="w-full text-[10px] px-2.5 py-1.5 rounded-lg border border-orange-100 focus:ring-1 focus:ring-amber-500 outline-none"
                            />
                          </div>
                          
                          <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 text-[10px] transition disabled:opacity-50 flex items-center justify-center gap-1.5"
                          >
                            {isProcessing ? 'Processando transação...' : `Doar ${currencySymbols[currency]} ${currentAmount.toFixed(2)}`}
                          </button>
                        </form>

                        <a
                          href={officialMPLink}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="w-full block text-center rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-95 text-white font-semibold py-2.5 text-xs shadow-sm transition"
                        >
                          Ir para Plataforma Segura →
                        </a>
                      </div>

                      {/* Option B Card */}
                      <div className="border border-orange-100 rounded-2xl p-5 sm:p-6 space-y-4 bg-amber-50/10 min-h-[300px] flex flex-col justify-between">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase text-amber-700 bg-amber-100 rounded px-2 py-0.5 inline-block">Option B</span>
                          <h4 className="font-sans text-sm font-bold text-gray-900">Transferência Internacional Swift / IBAN</h4>
                          <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                            Perfeito para doações corporativas ou altos incentivos internacionais.
                          </p>
                        </div>

                        {/* Swift display box */}
                        <div className="bg-amber-950 text-amber-100 font-mono text-[9px] p-4 rounded-xl space-y-2 text-left relative overflow-hidden mt-3 shadow-inner">
                          <p><span className="text-amber-400">BANK:</span> BANCO DE INVESTIMENTOS BRASILEIROS S.A.</p>
                          <p><span className="text-amber-400">SWIFT/BIC:</span> BIBRBRP2XXX</p>
                          <p className="flex justify-between items-center gap-1">
                            <span><span className="text-amber-400">IBAN:</span> BR12 0036 0001 5764 ...</span>
                            <button
                              onClick={handleCopyIban}
                              className="bg-amber-900 text-amber-200 px-1.5 py-0.5 rounded hover:bg-amber-800 text-[8px] tracking-wider"
                              title="Copiar IBAN completo"
                            >
                              {copiedIban ? 'COPIADO' : 'COPIAR'}
                            </button>
                          </p>
                          <p><span className="text-amber-400">DESTINATÁRIO:</span> F.V.T. Global Solidarity Project</p>
                        </div>

                        <p className="text-[10px] text-center text-amber-900 font-medium italic mt-4">
                          Moeda convertida automaticamente pela instituição parceira
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Success Screen Certificate on direct credit card simulation */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 max-w-2xl mx-auto space-y-6"
                    id="donation-success-panel"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Sparkles className="h-7 w-7 text-emerald-600" />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-sans text-2xl font-black text-gray-900">{t.donateSuccessTitle}</h3>
                      <p className="text-sm text-gray-500 font-sans">{t.donateSuccessMsg}</p>
                    </div>

                    {/* Certificate rendering */}
                    <div className="rounded-3xl border-4 border-double border-amber-700 bg-amber-50/60 p-6 sm:p-10 text-center shadow-xl relative overflow-hidden font-sans border-spacing-2 select-none">
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-800 m-4" />
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-800 m-4" />
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-800 m-4" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-800 m-4" />
                      
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100/80 mb-4 text-amber-800">
                        <Award className="h-7 w-7" />
                      </div>

                      <span className="text-[10px] uppercase font-black text-amber-800 tracking-widest block mb-1">PROJETO FAÇA VOCÊ TAMBÉM</span>
                      <h4 className="text-xl font-black tracking-tight text-amber-900 uppercase">Certificado de Solidariedade Global</h4>
                      
                      <div className="my-6">
                        <p className="text-xs text-amber-850 italic font-sans">Este certificado confirma que</p>
                        <p className="text-lg font-black text-amber-950 underline decoration-amber-600 underline-offset-4 capitalize mt-1.5 font-sans">
                          {donorName || 'Apoiador Global de Amor'}
                        </p>
                        <p className="text-xs text-amber-800 mt-4 max-w-md mx-auto leading-relaxed">
                          contribuiu generosamente com <strong>{currencySymbols[currency]} {currentAmount.toFixed(2)}</strong> para apoiar o fornecimento de alimentos, presentes e guloseimas a crianças carentes brasileiras e internacionais, mitigando o abismo social e levando amor.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-amber-200 pt-5 text-[10px] font-mono text-amber-800">
                        <div className="text-left font-mono">
                          <p>CÓDIGO DE REGISTRO:</p>
                          <p className="font-bold text-amber-950">FVT-{Math.floor(Math.random() * 900000 + 100000)}</p>
                        </div>
                        <div className="text-right font-mono">
                          <p>DATA DE EMISSÃO:</p>
                          <p className="font-bold text-amber-950">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => setDonationSuccess(false)}
                        className="rounded-xl border border-orange-200 bg-white hover:bg-orange-50 px-6 py-2.5 text-xs font-bold text-gray-700 transition"
                      >
                        Fazer Nova Doação
                      </button>
                      <button
                        onClick={() => window.print()}
                        className="rounded-xl bg-amber-500 hover:bg-amber-600 px-6 py-2.5 text-xs font-bold text-white shadow transition-all duration-300"
                      >
                        Imprimir Recibo
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
