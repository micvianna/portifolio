'use client';

import { useTranslations } from 'next-intl';
import { ParticleNetwork } from './ParticleNetwork';
import { TypingEffect } from './TypingEffect';

export function Hero() {
    const t = useTranslations('hero');

    const phrases = [
        t('typingPhrases.0'),
        t('typingPhrases.1'),
        t('typingPhrases.2'),
        t('typingPhrases.3'),
    ];

    return (
        <section className="hero" id="hero">
            <ParticleNetwork />

            <div className="hero__content">
                {/* Greeting */}
                <p className="hero__greeting animate-fade-in-up">
                    {t('greeting')}
                </p>

                {/* Name */}
                <h1 className="hero__name animate-fade-in-up delay-200">
                    {t('name')}
                </h1>

                {/* Role with gradient */}
                <p className="hero__role animate-fade-in-up delay-300">
                    <span className="gradient-text">{t('role')}</span>
                </p>

                {/* Typing Effect */}
                <div className="hero__typing animate-fade-in-up delay-400">
                    <span className="hero__typing-prefix">&gt; </span>
                    <TypingEffect phrases={phrases} />
                </div>

                {/* Stats */}
                <div className="hero__stats animate-fade-in-up delay-500">
                    <div className="hero__stat">
                        <span className="hero__stat-value">{t('stats.years')}</span>
                        <span className="hero__stat-label">{t('stats.yearsLabel')}</span>
                    </div>
                    <div className="hero__stat-divider" />
                    <div className="hero__stat">
                        <span className="hero__stat-value">{t('stats.companies')}</span>
                        <span className="hero__stat-label">{t('stats.companiesLabel')}</span>
                    </div>
                    <div className="hero__stat-divider" />
                    <div className="hero__stat">
                        <span className="hero__stat-value">{t('stats.industries')}</span>
                        <span className="hero__stat-label">{t('stats.industriesLabel')}</span>
                    </div>
                </div>

                {/* CTA */}
                <a href="#contact" className="hero__cta animate-fade-in-up delay-600">
                    {t('cta')}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </a>
            </div>

            {/* Scroll Hint */}
            <div className="absolute left-1/2 bottom-8 -translate-x-1/2 z-10 w-full flex justify-center">
                <div className="animate-fade-in-up delay-700 flex flex-col items-center gap-2" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    <span>{t('scrollHint')}</span>
                    <svg className="animate-scroll-hint" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="7 13 12 18 17 13" />
                        <polyline points="7 6 12 11 17 6" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
