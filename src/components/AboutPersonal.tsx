'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

// Interests outside tech — placeholders ready for injection
const interests = [
    {
        emoji: '🙏',
        titleKey: 'interest0Title',
        textKey: 'interest0Text',
    },
    {
        emoji: '📚',
        titleKey: 'interest1Title',
        textKey: 'interest1Text',
    },
    {
        emoji: '🗺️',
        titleKey: 'interest2Title',
        textKey: 'interest2Text',
    },
    {
        emoji: '🎮',
        titleKey: 'interest3Title',
        textKey: 'interest3Text',
    },
];

export function AboutPersonal() {
    const t = useTranslations('whoAmI');
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="about"
            ref={sectionRef}
            className={`about-section ${isVisible ? 'about-section--visible' : ''}`}
            aria-label={t('sectionTag')}
        >
            <div className="section-container">
                <div className="about-layout">
                    {/* Left — Typography centrepiece */}
                    <div className="about-left">
                        <span className="section-tag">{t('sectionTag')}</span>

                        <h2 className="about-headline">
                            {t('title')}
                        </h2>

                        <p className="about-body">{t('description')}</p>

                        {/* Pull-quote / personal statement — placeholder */}
                        <blockquote className="about-quote">
                            <span className="about-quote__mark">&ldquo;</span>
                            {t('quote')}
                            <span className="about-quote__mark">&rdquo;</span>
                        </blockquote>
                    </div>

                    {/* Right — Interests grid */}
                    <div className="about-right">
                        <p className="about-interests-label">{t('interestsLabel')}</p>
                        <div className="about-interests">
                            {interests.map((item, i) => {
                                let title: string;
                                let text: string;
                                try {
                                    title = t(item.titleKey);
                                    text = t(item.textKey);
                                } catch {
                                    title = 'Coming soon';
                                    text = 'This space will be filled with personal insights.';
                                }

                                return (
                                    <div
                                        key={i}
                                        className="about-interest-card"
                                        style={{ transitionDelay: `${i * 100}ms` }}
                                    >
                                        <span className="about-interest-card__emoji" aria-hidden="true">
                                            {item.emoji}
                                        </span>
                                        <div>
                                            <p className="about-interest-card__title">{title}</p>
                                            <p className="about-interest-card__text">{text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
