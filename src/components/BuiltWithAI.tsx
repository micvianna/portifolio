'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

interface AgentEntry {
    timestamp: string;
    skill: string;
    prompt_intent: string;
    output_type: string;
    roi: string;
    status: 'completed' | 'running' | 'queued';
}

// Static orchestration log — documents how this portfolio was built
const agentLog: AgentEntry[] = [
    {
        timestamp: '2026-02-24T10:00:00Z',
        skill: '@brainstorming',
        prompt_intent: 'Define visual identity, section architecture, and design system tokens for a senior QA portfolio with cyber-precision aesthetic',
        output_type: 'design_spec.md',
        roi: 'Eliminated 3+ revision cycles — creative direction locked in 1 session',
        status: 'completed',
    },
    {
        timestamp: '2026-02-24T10:45:00Z',
        skill: '@frontend-design',
        prompt_intent: 'Implement Hero, Navbar, ParticleNetwork, and TypingEffect with glassmorphism dark mode and Space Grotesk typography',
        output_type: 'Hero.tsx · Navbar.tsx · globals.css',
        roi: 'Production-ready UI components with light/dark theme in <2h',
        status: 'completed',
    },
    {
        timestamp: '2026-02-24T12:30:00Z',
        skill: '@copywriter-pro',
        prompt_intent: 'Rewrite 27 experience bullet points across 3 locales with measurable impact language and quantified achievements',
        output_type: 'en.json · pt-br.json · es.json',
        roi: 'CV-quality copy with metrics (2M+ transactions, 40% blockers reduced) in 1 pass',
        status: 'completed',
    },
    {
        timestamp: '2026-02-24T14:00:00Z',
        skill: '@frontend-design',
        prompt_intent: 'Build SkillsArsenal with SVG proficiency rings + neon bar animations, and ExperienceTimeline with scroll-driven line fill and type legend',
        output_type: 'SkillsArsenal.tsx · ExperienceTimeline.tsx · components.css',
        roi: 'Complex animated components with IntersectionObserver and unique gradient IDs — zero bugs on first build',
        status: 'completed',
    },
    {
        timestamp: '2026-02-24T16:00:00Z',
        skill: '@frontend-design',
        prompt_intent: 'Create BuiltWithAI (terminal log), AboutPersonal (typographic break), and ProjectsGrid (challenge→approach→result cards)',
        output_type: 'BuiltWithAI.tsx · AboutPersonal.tsx · ProjectsGrid.tsx',
        roi: 'Full home page assembled with 0 manual CSS debugging',
        status: 'running',
    },
];

const statusConfig = {
    completed: { label: 'DONE', color: 'var(--accent-cyan)' },
    running: { label: 'EXEC', color: 'var(--accent-gold)' },
    queued: { label: 'WAIT', color: 'var(--text-muted)' },
};

function TerminalCursor() {
    return <span className="terminal-cursor" aria-hidden="true">█</span>;
}

export function BuiltWithAI() {
    const t = useTranslations('builtWith');
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [visibleRows, setVisibleRows] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Stagger reveal rows one by one after section visible
    useEffect(() => {
        if (!isVisible) return;
        let i = 0;
        const interval = setInterval(() => {
            i++;
            setVisibleRows(i);
            if (i >= agentLog.length) clearInterval(interval);
        }, 250);
        return () => clearInterval(interval);
    }, [isVisible]);

    return (
        <section id="built-with" ref={sectionRef} className="terminal-section" aria-label={t('sectionTag')}>
            <div className="section-container">
                <span className="section-tag">{t('sectionTag')}</span>
                <h2 className="terminal-section__title">{t('title')}</h2>
                <p className="terminal-section__description">{t('description')}</p>

                {/* Terminal window */}
                <div className="terminal-window"> </div> {/* tirar aqui */}
                <div className="terminal-window"> 
                    {/* Window chrome */}
                    <div className="terminal-window__header">
                        <div className="terminal-window__dots">
                            <span className="terminal-dot terminal-dot--red" />
                            <span className="terminal-dot terminal-dot--yellow" />
                            <span className="terminal-dot terminal-dot--green" />
                        </div>
                        <span className="terminal-window__title">antigravity — orchestration.log</span>
                        <span className="terminal-window__pid">PID: 2026</span>
                    </div>

                    {/* Boot line */}
                    <div className="terminal-window__body">
                        {isVisible && (
                            <div className="terminal-boot">
                                <span className="terminal-prompt">$</span>
                                <span className="terminal-cmd"> antigravity run --portfolio --mode=production</span>
                                {visibleRows === 0 && <TerminalCursor />}
                            </div>
                        )}

                        {/* Log table */}
                        <div className="terminal-log" role="table" aria-label="Agent execution log">
                            {/* Header */}
                            <div className="terminal-log__header" role="row">
                                <span role="columnheader">TIMESTAMP</span>
                                <span role="columnheader">SKILL</span>
                                <span role="columnheader">PROMPT INTENT</span>
                                <span role="columnheader">ROI</span>
                                <span role="columnheader">STATUS</span>
                            </div>

                            {agentLog.map((entry, i) => {
                                const cfg = statusConfig[entry.status];
                                const shown = i < visibleRows;
                                return (
                                    <div
                                        key={i}
                                        className={`terminal-log__row ${shown ? 'terminal-log__row--visible' : ''}`}
                                        style={{ animationDelay: `${i * 250}ms` }}
                                        role="row"
                                    >
                                        <span className="terminal-log__ts" role="cell">
                                            {entry.timestamp.slice(11, 19)}
                                        </span>
                                        <span className="terminal-log__skill" role="cell">
                                            {entry.skill}
                                        </span>
                                        <span className="terminal-log__intent" role="cell">
                                            <span className="terminal-log__intent-label">intent:</span>{' '}
                                            {entry.prompt_intent}
                                        </span>
                                        <span className="terminal-log__roi" role="cell">
                                            <span className="terminal-log__roi-label">roi:</span>{' '}
                                            {entry.roi}
                                        </span>
                                        <span
                                            className="terminal-log__status"
                                            style={{ color: cfg.color }}
                                            role="cell"
                                        >
                                            [{cfg.label}]
                                            {entry.status === 'running' && i === visibleRows - 1 && (
                                                <TerminalCursor />
                                            )}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Summary line */}
                        {visibleRows >= agentLog.length && (
                            <div className="terminal-summary">
                                <span className="terminal-prompt">✓</span>
                                <span className="terminal-summary__text">
                                    {' '}portfolio compiled successfully — {agentLog.length} skills orchestrated, 0 errors
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
} 
