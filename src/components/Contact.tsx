'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useCallback } from 'react';

export function Contact() {
    const t = useTranslations('contact');
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

    return (
        <section id="contact" ref={sectionRef} className="contact-section" aria-label={t('sectionTag')} style={{ paddingBottom: '4rem' }}>
            <div className="section-container">
                <span className="section-tag">{t('sectionTag')}</span>
                <h2 className="contact-section__title" style={{
                    background: 'var(--gradient-accent)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 700
                }}>
                    {t('title')}
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '3rem', fontSize: '1.1rem' }}>
                    {t('description')}
                </p>

                <div className={`glow-card ${isVisible ? 'animate-fade-in-up' : ''}`} style={{
                    padding: '2rem',
                    opacity: isVisible ? 1 : 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem'
                }}>
                    {/* Info */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '0.5rem',
                                background: 'var(--accent-cyan-dim)', color: 'var(--accent-cyan)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Location</span>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{t('info.location')}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '40px', height: '40px', borderRadius: '0.5rem',
                                background: 'var(--accent-purple-dim)', color: 'var(--accent-purple)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <div>
                                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>Email</span>
                                <a href={`mailto:${t('info.email')}`} style={{ color: 'var(--accent-purple)', fontWeight: 500, textDecoration: 'none' }}>{t('info.email')}</a>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: '1px', background: 'var(--border-subtle)', width: '100%' }} />

                    {/* Contact Form Placeholder */}
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder={t('form.name')}
                                style={{
                                    background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)',
                                    padding: '0.75rem 1rem', borderRadius: '0.5rem', width: '100%', fontFamily: 'var(--font-body)'
                                }}
                            />
                            <input
                                type="email"
                                placeholder={t('form.email')}
                                style={{
                                    background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)',
                                    padding: '0.75rem 1rem', borderRadius: '0.5rem', width: '100%', fontFamily: 'var(--font-body)'
                                }}
                            />
                        </div>
                        <textarea
                            placeholder={t('form.message')}
                            rows={4}
                            style={{
                                background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)',
                                padding: '0.75rem 1rem', borderRadius: '0.5rem', width: '100%', fontFamily: 'var(--font-body)', resize: 'vertical'
                            }}
                        />
                        <button style={{
                            background: 'var(--gradient-accent)', color: '#fff', border: 'none', padding: '0.75rem 2rem',
                            borderRadius: '0.5rem', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start',
                            transition: 'transform 0.2s, boxShadow 0.2s'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            {t('form.send')}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
