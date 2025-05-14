'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const typingSkills = [
  { name: 'Programing Languages', skills: ['JavaScript', 'Python', 'PHP', 'Java', 'C++'] },
  { name: 'Frameworks', skills: ['React', 'Nextjs', 'Node.js', 'Express.js', 'Flask', 'Django'] },
  { name: 'Databases', skills: ['MongoDB', 'MySQL', 'PostgreSQL'] },
  { name: 'Tools', skills: ['Git', 'Docker', 'Adobe', 'Figma'] },
  { name: 'Others', skills: ['HTML', 'CSS', 'TailwindCSS', 'Bootstrap'] },
];

const educationLines = [
  { degree: 'S1 Teknik Informatika', institution: 'Universitas UPI YPTK Padang', year: '2018 - 2024' },
  { degree: 'SMK', institution: 'SMK Nurul Falah', year: '2016 - 2018' },
];

export default function SkillsAndEducationSection() {
  const [typedSkill, setTypedSkill] = useState('');
  const [showSkills, setShowSkills] = useState(false);

  const [typedEdu, setTypedEdu] = useState('');
  const [showEducation, setShowEducation] = useState(false);

  const skillCmd = 'ls ~/Skills';
  const eduCmd = 'cat ~/Education.txt';

  // Typing for Skills
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedSkill(skillCmd.slice(0, index));
      index++;
      if (index > skillCmd.length) {
        clearInterval(interval);
        setShowSkills(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Typing for Education (after skill shown)
  useEffect(() => {
    if (!showSkills) return;
    let timeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        setTypedEdu(eduCmd.slice(0, index));
        index++;
        if (index > eduCmd.length) {
          clearInterval(interval);
          setShowEducation(true);
        }
      }, 40);
    }, 1000); // delay before typing education
    return () => clearTimeout(timeout);
  }, [showSkills]);

  return (
    <section id='skill' className="relative min-h-screen w-full px-6 py-12 md:px-20 md:py-24 bg-black text-green-500 font-mono overflow-hidden">
      {/* Background Overlays */}
     
      {/* <div className="absolute inset-0 text-xs font-mono text-green-900 opacity-5 whitespace-pre z-0">
        {Array(50).fill('0010110001101010').join('\n')}
      </div> */}
      {/* Terminal Window */}
      <div className="relative z-10">
        <div className="bg-black/80 border border-green-500 p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto text-sm md:text-base">
          
          {/* Typing Education Command */}
          {showSkills && (
            <pre className="whitespace-pre-wrap mb-4">
              <span className="text-green-500">$ {typedEdu}</span>
              {!showEducation && <span className="inline-block w-2 h-5 ml-1 bg-green-500 animate-blink" />}
            </pre>
          )}

          {/* Education Output */}
          {showEducation && (
            <motion.ul
              className="space-y-3  mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.3 } },
              }}
            >
              {educationLines.map((edu, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="relative pl-4 border-l-2 border-green-500"
                >
                  <div className="absolute left-0 top-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-300 font-bold">{edu.degree}</span>
                  <div className="text-green-400 ml-2">
                    {edu.institution} — <i>{edu.year}</i>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}
          
          {/* Typing Skill Command */}
          <pre className="whitespace-pre-wrap mb-4">
            <span className="text-green-500">$ {typedSkill}</span>
            {!showSkills && <span className="inline-block w-2 h-5 ml-1 bg-green-500 animate-blink" />}
          </pre>

          {/* Skills Output */}
          {showSkills && (
            <motion.ul
              className="space-y-3 mb-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.2 } },
              }}
            >
              {typingSkills.map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
                  }}
                  className="relative pl-4 border-l-2 border-green-500 hover:scale-[1.02] transition duration-300"
                >
                  <div className="absolute left-0 top-1 w-2 h-2 bg-green-500 rounded-full animate-glitch" />
                  <span className="text-green-300 font-bold">{item.name}</span>
                  <div className="text-green-400 ml-2 flex flex-wrap">
                    {item.skills.map((skill, i) => (
                      <span key={i} className="m-1">{skill}</span>
                    ))}
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          )}

          
        </div>
      </div>
    </section>
  );
}
