import React from 'react';
import { Heart, Mail, Phone, ExternalLink, Globe } from 'lucide-react';
import { TranslationSet } from '../types';

interface FooterProps {
  t: TranslationSet;
}

export default function Footer({ t }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(id);
    if (targetElement) {
      const topOffset = targetElement.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-amber-950 text-amber-100 border-t border-amber-900/40 font-sans" id="app-footer">
      
      {/* Upper Footer section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          
          {/* Column 1: Slogan & Mission summary */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-md">
                <Heart className="h-4 w-4 fill-current" />
              </div>
              <span className="font-sans text-lg font-bold tracking-tight text-white">
                {t.navLogo}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-amber-250/80 leading-relaxed font-sans max-w-md">
              "O Faça Você Também é mais do que um projeto: é um convite para criar memórias felizes e espalhar humanidade onde ela mais faz falta."
            </p>

            {/* Slogan block quote */}
            <blockquote className="border-l-2 border-amber-500 pl-3 text-xs italic text-amber-250 font-sans">
              "Porque no fim, a maior comemoração não está no calendário. Ela está em cada coração que se sente amado."
            </blockquote>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-xs uppercase font-bold tracking-widest text-amber-300">Mapa do Portal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="hover:text-amber-400 transition">
                  {t.navHome}
                </a>
              </li>
              <li>
                <a href="#mission" onClick={(e) => handleScrollTo(e, '#mission')} className="hover:text-amber-400 transition">
                  {t.navMission}
                </a>
              </li>
              <li>
                <a href="#campaigns" onClick={(e) => handleScrollTo(e, '#campaigns')} className="hover:text-amber-400 transition">
                  {t.navProjects}
                </a>
              </li>
              <li>
                <a href="#donate" onClick={(e) => handleScrollTo(e, '#donate')} className="hover:text-amber-400 transition">
                  {t.navDonate}
                </a>
              </li>
              <li>
                <a href="#volunteer" onClick={(e) => handleScrollTo(e, '#volunteer')} className="hover:text-amber-400 transition">
                  {t.navVolunteer}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Legal Key parameters */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-amber-300">Transparência & Contato</h4>
            
            <div className="space-y-2.5 text-xs text-amber-200">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <a href="mailto:facavocetambem1@gmail.com" className="hover:underline hover:text-amber-350">
                  facavocetambem1@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Globe className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Chave Pix Oficial:</p>
                  <p className="text-[10px] text-amber-250/70 mt-0.5">
                    Chave segura de repasse direto. Acesse a seção "Como Doar" para copiar o código Pix oficial.
                  </p>
                </div>
              </div>

              {/* Cloudflare Turnstile Trust & Verification Badge */}
              <div className="pt-2">
                <div className="inline-flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-2.5 text-neutral-800 shadow-md select-none max-w-[250px]">
                  <div className="flex items-center gap-2 pl-0.5 pr-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#12b76a] text-white">
                      <svg className="h-3 w-3 fill-current stroke-white stroke-[1.5]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-[12px] font-bold text-neutral-800 font-sans tracking-wide">Sucesso!</span>
                  </div>
                  <div className="flex flex-col items-end pl-3 border-l border-neutral-200">
                    <div className="flex items-center gap-1">
                      {/* Cloudflare Cloud Logo */}
                      <svg className="h-3 w-3.5 text-[#F38020] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                      </svg>
                      <span className="text-[9px] font-extrabold tracking-widest text-[#F38020] uppercase font-sans">CLOUDFLARE</span>
                    </div>
                    <div className="flex gap-1.5 text-[8.5px] text-neutral-400 font-sans mt-0.5">
                      <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neutral-600 transition">Privacidade</a>
                      <span className="text-neutral-300">•</span>
                      <a href="https://support.cloudflare.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-neutral-600 transition">Ajuda</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Heart className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Destinação de Fundos</p>
                  <p className="text-[10px] text-amber-250/70 mt-0.5">
                    Campanhas e aquisição de brinquedos, sacolas surpresa, chocolates, cestas básicas de nutrição e kits escolares. Zero custos de diretoria.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Footer strip */}
      <div className="bg-amber-950 border-t border-amber-900/60 text-center py-6 text-[11px] text-amber-350/60 font-sans px-4">
        <p>
          {t.navLogo} &copy; {currentYear}. CNPJ: 57.646.942/0001-69 – UNIDADE II – CEP 70750-521. Todos os direitos reservados.
        </p>
        <p className="mt-1">
          Feito com carinho para conectar os corações com o mundo!
        </p>
      </div>

    </footer>
  );
}
