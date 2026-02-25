'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

interface ProjectCard {
    id: string;
    status: 'wip' | 'live';
    accent: string;
}

// Static project definitions — content from translations
const projects: ProjectCard[] = [
    { id: '0', status: 'wip', accent: 'var(--accent-cyan)' },
    { id: '1', status: 'wip', accent: 'var(--accent-purple)' },
    { id: '2', status: 'wip', accent: 'var(--accent-gold)' },
];

const WIPIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

const DecodeIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
);

export function ProjectsGrid() {
    const t = useTranslations('projects');
    const messages = useMessages();
    const sectionRef = useRef<HTMLElement>(null);
    const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

    useEffect(() => {
        const cards = sectionRef.current?.querySelectorAll('.project-card');
        if (!cards) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-id') ?? '';
                        setVisibleCards((prev) => new Set(prev).add(id));
                    }
                });
            },
            { threshold: 0.2 }
        );

        cards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="projects" ref={sectionRef} className="projects-section" aria-label={t('sectionTag')}>
            <div className="section-container">
                <span className="section-tag">{t('sectionTag')}</span>
                <h2 className="projects-section__title">{t('title')}</h2>
                <p className="projects-section__subtitle">{t('subtitle')}</p>

                <div className="projects-grid">
                    {projects.map(({ id, accent }) => {
                        const projectsData = (messages as Record<string, unknown>)?.projects as Record<string, unknown>;
                        const itemsData = (projectsData?.items as Record<string, unknown>[]) ?? [];
                        const item = itemsData[parseInt(id)];

                        let title = 'Decoding Case...';
                        let challenge = '';
                        let approach = '';
                        let result = '';
                        let stack: string[] = [];

                        if (item) {
                            title = String(item.title || 'Decoding Case...');
                            challenge = String(item.challenge || '');
                            approach = String(item.approach || '');
                            result = String(item.result || '');

                            const rawStack = Array.isArray(item.stack) ? item.stack : [];
                            stack = rawStack.map(s => String(s)).filter(Boolean);
                        }

                        const isVisible = visibleCards.has(id);

                        return (
                            <article
                                key={id}
                                data-id={id}
                                className={`project-card glow-card ${isVisible ? 'project-card--visible' : ''}`}
                                style={{ '--card-accent': accent } as React.CSSProperties}
                                aria-label={title}
                            >
                                {/* WIP banner */}
                                <div className="project-card__status-bar" style={{ background: accent }}>
                                    <WIPIcon />
                                    <span>{t('wipLabel')}</span>
                                    <span className="project-card__status-decode">
                                        <DecodeIcon />
                                        {t('decodingLabel')}
                                    </span>
                                </div>

                                {/* Card body */}
                                <div className="project-card__body">
                                    <h3 className="project-card__title" style={{ color: accent }}>
                                        {title}
                                    </h3>

                                    {/* Challenge → Approach → Result */}
                                    <div className="project-card__flow">
                                        <div className="project-card__flow-item">
                                            <span className="project-card__flow-label" style={{ color: accent }}>
                                                {t('challengeLabel')}
                                            </span>
                                            <p className="project-card__flow-text">{challenge || t('placeholder')}</p>
                                        </div>
                                        <div className="project-card__flow-arrow" aria-hidden="true">→</div>
                                        <div className="project-card__flow-item">
                                            <span className="project-card__flow-label" style={{ color: accent }}>
                                                {t('approachLabel')}
                                            </span>
                                            <p className="project-card__flow-text">{approach || t('placeholder')}</p>
                                        </div>
                                        <div className="project-card__flow-arrow" aria-hidden="true">→</div>
                                        <div className="project-card__flow-item">
                                            <span className="project-card__flow-label" style={{ color: accent }}>
                                                {t('resultLabel')}
                                            </span>
                                            <p className="project-card__flow-text">{result || t('placeholder')}</p>
                                        </div>
                                    </div>

                                    {/* Stack tags */}
                                    <div className="project-card__stack">
                                        {(stack.length > 0 ? stack : ['Robot Framework', 'Python', 'CI/CD']).map((tag, i) => (
                                            <span
                                                key={i}
                                                className="project-card__tag"
                                                style={{
                                                    borderColor: accent,
                                                    color: accent,
                                                    background: `color-mix(in srgb, ${accent} 8%, transparent)`,
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
