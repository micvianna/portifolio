'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
}

export function ParticleNetwork() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const { theme } = useTheme();

    const getColors = useCallback(() => {
        const isDark = theme !== 'light';
        return {
            particle: isDark ? 'rgba(0, 240, 255, 0.6)' : 'rgba(8, 145, 178, 0.4)',
            line: isDark ? 'rgba(0, 240, 255, 0.12)' : 'rgba(8, 145, 178, 0.08)',
            mouseLine: isDark ? 'rgba(139, 92, 246, 0.25)' : 'rgba(124, 58, 237, 0.15)',
        };
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 40 : 80;
        const connectionDistance = isMobile ? 120 : 150;
        const mouseDistance = 200;

        function resize() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function initParticles() {
            if (!canvas) return;
            particlesRef.current = Array.from({ length: particleCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.3,
            }));
        }

        function animate() {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const colors = getColors();
            const particles = particlesRef.current;

            // Update and draw particles
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = colors.particle;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
                ctx.globalAlpha = 1;
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = colors.line;
                        ctx.globalAlpha = 1 - dist / connectionDistance;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }

                // Mouse interaction
                const mdx = particles[i].x - mouseRef.current.x;
                const mdy = particles[i].y - mouseRef.current.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mDist < mouseDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                    ctx.strokeStyle = colors.mouseLine;
                    ctx.globalAlpha = 1 - mDist / mouseDistance;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        }

        function handleMouseMove(e: MouseEvent) {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        }

        function handleMouseLeave() {
            mouseRef.current = { x: -1000, y: -1000 };
        }

        resize();
        initParticles();
        animate();

        window.addEventListener('resize', resize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [getColors]);

    return (
        <canvas
            ref={canvasRef}
            className="particle-canvas"
            aria-hidden="true"
        />
    );
}
