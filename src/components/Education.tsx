'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useEffect, useRef, useState, useCallback } from 'react';

export function Education() {
    const t = useTranslations('education');
    const messages = useMessages();
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const handleIntersection = useCallback(([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, { threshold: 0.15 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [handleIntersection]);

    const educationData = (messages as Record<string, unknown>)?.education as Record<string, unknown>;
    const coursesData = (educationData?.courses as Record<string, unknown>[]) ?? [];

    return (
        <section id="education" ref={sectionRef} className="education-section" aria-label={t('sectionTag')}>
            <div className="section-container">
                <span className="section-tag">{t('sectionTag')}</span>
                <h2 className="education-section__title" style={{
                    background: 'var(--gradient-accent)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '3rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 700
                }}>
                    {t('title')}
                </h2>

                <div className="education-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Degree Card */}
                    <div className={`glow-card ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ padding: '2rem', opacity: isVisible ? 1 : 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                            <div style={{
                                width: '44px', height: '44px', borderRadius: '0.75rem',
                                background: 'var(--accent-purple-dim)', color: 'var(--accent-purple)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                            </div>
                            <div>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                    {t('degree.name')}
                                </h3>
                                <p style={{ color: 'var(--accent-purple)', fontSize: '0.9rem', fontWeight: 500 }}>
                                    {t('degree.institution')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Courses Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1.5rem'
                    }}>
                        {coursesData.map((course, i) => {
                            const name = String(course.name || '');
                            const platform = String(course.platform || '');
                            const year = String(course.year || '');

                            if (!name) return null;

                            return (
                                <div
                                    key={i}
                                    className={`glow-card ${isVisible ? 'animate-fade-in-up' : ''}`}
                                    style={{
                                        padding: '1.5rem',
                                        opacity: isVisible ? 1 : 0,
                                        animationDelay: `${i * 100}ms`
                                    }}
                                >
                                    <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                                        {name}
                                    </h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{platform}</span>
                                        <span style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                                            color: 'var(--accent-cyan)', background: 'var(--accent-cyan-dim)',
                                            padding: '0.2rem 0.5rem', borderRadius: '4px'
                                        }}>
                                            {year}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
