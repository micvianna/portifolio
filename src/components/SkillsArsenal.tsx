'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useCallback } from 'react';
import React from 'react';

const categoryIcons: Record<string, React.ReactNode> = {
    robot: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><circle cx="8" cy="16" r="1" fill="currentColor" /><circle cx="16" cy="16" r="1" fill="currentColor" />
        </svg>
    ),
    api: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
    ),
    pipeline: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
    checklist: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
    ),
    database: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
    ),
    terminal: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
        </svg>
    ),
};

interface SkillRingProps {
    level: number;
    size?: number;
    animate: boolean;
    gradientId: string;
}

function SkillRing({ level, size = 44, animate, gradientId }: SkillRingProps) {
    const strokeWidth = 3;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (level / 100) * circumference;

    // Animated counter
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!animate) {
            // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional reset when animation is disabled
            setDisplayValue(0);
            return;
        }
        let frame: number;
        const duration = 1200;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(eased * level));
            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            }
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [animate, level]);

    return (
        <svg width={size} height={size} className="skill-ring" viewBox={`0 0 ${size} ${size}`}>
            {/* Background ring */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="var(--border-subtle)"
                strokeWidth={strokeWidth}
            />
            {/* Progress ring */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={`url(#${gradientId})`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={animate ? offset : circumference}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
                style={{
                    transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
            />
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent-purple)" />
                    <stop offset="100%" stopColor="var(--accent-cyan)" />
                </linearGradient>
            </defs>
            {/* Percentage text */}
            <text
                x={size / 2}
                y={size / 2}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--text-secondary)"
                fontSize="11"
                fontFamily="var(--font-mono)"
                fontWeight="500"
            >
                {displayValue}
            </text>
        </svg>
    );
}

export function SkillsArsenal() {
    const t = useTranslations('skills');
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

    // Get categories from translations
    const categoryKeys = ['0', '1', '2', '3', '4', '5'];

    return (
        <section id="skills" ref={sectionRef} className="skills-section" aria-label={t('sectionTag')}>
            <div className="section-container">
                <span className="section-tag">{t('sectionTag')}</span>
                <h2 className="skills-section__title">{t('title')}</h2>

                <div className="skills-grid">
                    {categoryKeys.map((catIdx, i) => {
                        const icon = t(`categories.${catIdx}.icon`);
                        const itemKeys = ['0', '1', '2', '3', '4', '5', '6'];

                        return (
                            <div
                                key={catIdx}
                                className={`skill-card glow-card ${isVisible ? 'skill-card--visible' : ''}`}
                                style={{ transitionDelay: `${i * 120}ms` }}
                            >
                                {/* Card Header */}
                                <div className="skill-card__header">
                                    <div className="skill-card__icon">
                                        {categoryIcons[icon] || categoryIcons.terminal}
                                    </div>
                                    <h3 className="skill-card__title">{t(`categories.${catIdx}.name`)}</h3>
                                </div>

                                {/* Skill Items */}
                                <ul className="skill-card__items">
                                    {itemKeys.map((itemIdx) => {
                                        let name: string;
                                        let level: number;
                                        try {
                                            name = t(`categories.${catIdx}.items.${itemIdx}.name`);
                                            level = Number(t(`categories.${catIdx}.items.${itemIdx}.level`));
                                        } catch {
                                            return null;
                                        }
                                        if (!name || isNaN(level)) return null;

                                        const uniqueGradientId = `sg-${catIdx}-${itemIdx}`;

                                        return (
                                            <li key={itemIdx} className="skill-item">
                                                <div className="skill-item__info">
                                                    <span className="skill-item__name">{name}</span>
                                                    <div className="skill-item__bar-track">
                                                        <div
                                                            className="skill-item__bar-fill"
                                                            style={{
                                                                width: isVisible ? `${level}%` : '0%',
                                                                transitionDelay: `${i * 120 + 300}ms`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <SkillRing
                                                    level={level}
                                                    animate={isVisible}
                                                    gradientId={uniqueGradientId}
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
