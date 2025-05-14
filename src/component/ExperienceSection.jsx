'use client';
import { motion } from 'framer-motion';
import { BriefcaseBusiness } from 'lucide-react';

const experiences = [
  {
    title: 'Frontend Developer',
    company: 'Tim Saya Oy-IT',
    period: '2023 - Present',
    description:
      'Membangun dan merancang antarmuka pengguna interaktif dengan pendekatan terminal-style. Fokus pada performa, animasi Framer Motion, dan pengalaman UX yang solid.',
  },
  {
    title: 'Freelancer & UI/UX Designer',
    company: 'Independent',
    period: '2021 - 2023',
    description:
      'Mengerjakan berbagai proyek desain antarmuka dan pengembangan web custom untuk klien individu dan startup kecil.',
  },
];

export default function ExperienceSection() {
  return (
    <section className="relative w-full  px-6 py-12 md:px-20 md:py-24 bg-black text-white overflow-hidden">
      {/* Overlays */}
      {/* <div className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay bg-[url('/img/noise.gif')] opacity-10" />
      <div className="absolute inset-0 bg-[url('/img/scanlines.png')] opacity-5 mix-blend-soft-light z-0" /> */}

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 font-mono"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-yellow-400 mb-12 tracking-wider glitch-text flex items-center gap-3">
          <BriefcaseBusiness className="w-8 h-8 text-yellow-400 animate-pulse" /> ~/experience
        </h2>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="border-l-4 border-yellow-400 pl-6 relative group hover:bg-white/5 transition"
            >
              <div className="text-green-500 text-sm">{exp.period}</div>
              <div className="text-xl font-bold text-white mt-1">{exp.title}</div>
              <div className="text-yellow-400 text-sm mb-2">{exp.company}</div>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
