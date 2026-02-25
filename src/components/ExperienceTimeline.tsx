'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState, useCallback } from 'react';

const typeConfig: Record<string, { color: string; label: string; glow: string }> = {
    greenfield: {
        color: 'var(--accent-purple)',
        label: 'Greenfield',
        glow: 'var(--glow-purple)',
    },
    turnaround: {
        color: 'var(--accent-gold)',
        label: 'Turnaround',
        glow: 'var(--glow-gold)',
    },
    automation: {
        color: 'var(--accent-cyan)',
        label: 'Automation',
        glow: 'var(--glow-cyan)',
    },
};

function TimelineLegend() {
    return (
        <div className="timeline-legend" role="list" aria-label="Project type legend">
            {Object.entries(typeConfig).map(([key, cfg]) => (
                <div key={key} className="timeline-legend__item" role="listitem">
                    <span
                        className="timeline-legend__dot"
                        style={{ backgroundColor: cfg.color, boxShadow: cfg.glow }}
                    />
                    {cfg.label}
                </div>
            ))}
        </div>
    );
}

export function ExperienceTimeline() {
    const t = useTranslations('experience');
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
    const [lineProgress, setLineProgress] = useState(0);

    // Observe individual timeline items
    const handleItemIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const idx = Number(entry.target.getAttribute('data-index'));
                setVisibleItems((prev) => new Set(prev).add(idx));
            }
        });
    }, []);

    useEffect(() => {
        const items = sectionRef.current?.querySelectorAll('.timeline-item');
        if (!items) return;

        const observer = new IntersectionObserver(handleItemIntersection, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px',
        });

        items.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, [handleItemIntersection]);

    // Scroll-driven line fill
    useEffect(() => {
        const handleScroll = () => {
            if (!timelineRef.current) return;
            const rect = timelineRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Calculate how much of the timeline is "past" the viewport center
            const totalHeight = rect.height;
            const scrolledPast = viewportHeight * 0.5 - rect.top;
            const progress = Math.max(0, Math.min(100, (scrolledPast / totalHeight) * 100));
            setLineProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // initial calculation
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const positionKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    return (
        <section id="experience" ref={sectionRef} className="timeline-section" aria-label={t('sectionTag')}>
            <div className="section-container">
                <span className="section-tag">{t('sectionTag')}</span>
                <h2 className="timeline-section__title">{t('title')}</h2>

                <TimelineLegend />

                <div className="timeline" ref={timelineRef}>
                    {/* Background line */}
                    <div className="timeline__line" />
                    {/* Animated fill line */}
                    <div
                        className="timeline__line-fill"
                        style={{ height: `${lineProgress}%` }}
                    />

                    {positionKeys.map((posIdx, i) => {
                        let company: string;
                        try {
                            company = t(`positions.${posIdx}.company`);
                        } catch {
                            return null;
                        }
                        if (!company) return null;

                        const role = t(`positions.${posIdx}.role`);
                        const period = t(`positions.${posIdx}.period`);
                        const type = t(`positions.${posIdx}.type`) as keyof typeof typeConfig;
                        const config = typeConfig[type] || typeConfig.automation;

                        // next-intl returns the key path as string when key is missing, so we check for that
                        const allocationRaw = t(`positions.${posIdx}.allocation`);
                        const allocationPeriodRaw = t(`positions.${posIdx}.allocationPeriod`);
                        const allocation = allocationRaw.startsWith('experience.') ? null : allocationRaw;
                        const allocationPeriod = allocationPeriodRaw.startsWith('experience.') ? null : allocationPeriodRaw;

                        // Get highlights
                        const highlights: string[] = [];
                        for (let h = 0; h < 5; h++) {
                            try {
                                const hl = t(`positions.${posIdx}.highlights.${h}`);
                                if (hl) highlights.push(hl);
                            } catch { break; }
                        }

                        const isVisible = visibleItems.has(i);
                        const isLeft = i % 2 === 0;

                        return (
                            <div
                                key={posIdx}
                                className={`timeline-item ${isLeft ? 'timeline-item--left' : 'timeline-item--right'} ${isVisible ? 'timeline-item--visible' : ''}`}
                                data-index={i}
                                aria-label={`${company} — ${role}`}
                            >
                                {/* Node dot */}
                                <div
                                    className="timeline-item__node"
                                    style={{
                                        borderColor: config.color,
                                        boxShadow: isVisible ? config.glow : 'none',
                                    }}
                                >
                                    <div
                                        className="timeline-item__node-inner"
                                        style={{ backgroundColor: config.color }}
                                    />
                                </div>

                                {/* Card */}
                                <div className="timeline-item__card glow-card">
                                    {/* Type badge */}
                                    <span
                                        className="timeline-item__badge"
                                        style={{
                                            color: config.color,
                                            borderColor: config.color,
                                            backgroundColor: `color-mix(in srgb, ${config.color} 10%, transparent)`,
                                        }}
                                    >
                                        {config.label}
                                    </span>

                                    {/* Company & Role */}
                                    <h3 className="timeline-item__company">
                                        {company}
                                        {allocation && (
                                            <span className="timeline-item__allocation"> → {allocation}</span>
                                        )}
                                    </h3>
                                    <p className="timeline-item__role">{role}</p>
                                    <p className="timeline-item__period">
                                        {period}
                                        {allocationPeriod && (
                                            <span className="timeline-item__alloc-period"> ({allocationPeriod})</span>
                                        )}
                                    </p>

                                    {/* Highlights */}
                                    {highlights.length > 0 && (
                                        <ul className="timeline-item__highlights">
                                            {highlights.map((hl, idx) => (
                                                <li key={idx} className="timeline-item__highlight">
                                                    <span className="timeline-item__highlight-dot" style={{ backgroundColor: config.color }} />
                                                    {hl}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
