import { Hero } from '@/components/Hero';
import { SkillsArsenal } from '@/components/SkillsArsenal';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { BuiltWithAI } from '@/components/BuiltWithAI';
import { AboutPersonal } from '@/components/AboutPersonal';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';

export default function Home() {
    return (
        <>
            <Hero />
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
