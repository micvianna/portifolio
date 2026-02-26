'use client';

import { Hero } from '@/components/Hero';
import { HulyHero } from '@/components/HulyHero';
import { useDesign } from '@/context/DesignContext';
import { SkillsArsenal } from '@/components/SkillsArsenal';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { BuiltWithAI } from '@/components/BuiltWithAI';
import { AboutPersonal } from '@/components/AboutPersonal';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';

export default function Home() {
    const { designVersion } = useDesign();

    return (
        <>
            {designVersion === 'myhra' ? <Hero /> : <HulyHero />}
            <SkillsArsenal />
            <ExperienceTimeline />
            <BuiltWithAI />
            <AboutPersonal />
            <ProjectsGrid />
            <Education />
            <Contact />
        </>
    );
}
