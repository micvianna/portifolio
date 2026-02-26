'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function HulyHero() {
    const t = useTranslations('hero');

    return (
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] selection:bg-orange-500/30 font-body">

            {/* === BACKGROUND GLOWS & FEIXE DE LUZ === */}
            {/* Container posicionado no topo centro, com overflow visível apenas para os glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-full pointer-events-none flex justify-center">

                {/* Glow principal: Azul e Roxo intensos espalhados no topo */}
                <div className="absolute top-[-20%] w-[80%] h-[600px] bg-gradient-to-r from-violet-600/40 via-blue-500/30 to-purple-600/40 blur-[130px] rounded-[100%]" />

                {/* Feixe central caindo "do teto" - branco diluído para azul */}
                <div className="absolute top-[-5%] w-[40%] max-w-[500px] h-[500px] bg-gradient-to-b from-white/15 via-blue-400/5 to-transparent blur-[80px]" />
            </div>

            {/* === TEXTURA DE GRID === */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* === CONTEÚDO PRINCIPAL === */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl mt-16 sm:mt-0">

                {/* Badge Animado */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.02)] transition-colors hover:bg-white/[0.05]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-xs font-medium tracking-widest text-zinc-300 uppercase">
                        Huly Interface Mode
                    </span>
                </div>

                {/* Headline Principal */}
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40 mb-8 font-display">
                    QA Sênior & <br className="hidden sm:block" />
                    AI-First Mindset
                </h1>

                {/* Subtitle */}
                <p className="max-w-2xl text-lg sm:text-xl text-zinc-400 leading-relaxed font-light mb-12">
                    Arquitetando soluções de teste antes da codificação usando LLMs e automação avançada.
                </p>

                {/* === CALL TO ACTION === */}
                <div className="relative group cursor-pointer inline-block">

                    {/* GLOW LARANJA INTENSO NO BOTÃO */}
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse" />

                    {/* Botão em si */}
                    <a href="#projects" className="relative flex items-center justify-center gap-2 px-8 py-4 bg-[#050505] text-white rounded-full font-medium tracking-wide border border-white/10 group-hover:border-white/20 transition-all duration-300 w-full sm:w-auto">
                        Explorar Cases
                        <ArrowRight className="w-4 h-4 text-orange-400 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>

        </section>
    );
}
