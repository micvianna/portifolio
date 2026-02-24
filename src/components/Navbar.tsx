'use client';

import { useTranslations } from 'next-intl';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useEffect, useState } from 'react';

export function Navbar() {
    const t = useTranslations('nav');
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#about', label: t('about') },
        { href: '#skills', label: t('skills') },
        { href: '#experience', label: t('experience') },
        { href: '#education', label: t('education') },
        { href: '#contact', label: t('contact') },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__inner">
                {/* Logo */}
                <a href="#" className="navbar__logo">
                    <span className="navbar__logo-bracket">&lt;</span>
                    <span className="navbar__logo-name">MV</span>
                    <span className="navbar__logo-bracket">/&gt;</span>
                </a>

                {/* Desktop Navigation */}
                <div className="navbar__links">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="navbar__link">
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Controls */}
                <div className="navbar__controls">
                    <LanguageSwitcher />
                    <ThemeToggle />

                    {/* Mobile Hamburger */}
                    <button
                        className="navbar__hamburger"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                    >
                        <span className={`navbar__hamburger-line ${mobileOpen ? 'open' : ''}`} />
                        <span className={`navbar__hamburger-line ${mobileOpen ? 'open' : ''}`} />
                        <span className={`navbar__hamburger-line ${mobileOpen ? 'open' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
                {navLinks.map((link) => (
                    <a
                        key={link.href}
                        href={link.href}
                        className="navbar__mobile-link"
                        onClick={() => setMobileOpen(false)}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </nav>
    );
}
