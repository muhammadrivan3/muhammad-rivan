
import {  useRef, useState } from 'react';
import { motion,  useScroll } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
   Zap,  Globe,
   Trophy, Rocket,  CheckCircle,
  Calendar,  Layers, 
} from 'lucide-react';
// import { Skills3D } from '../Skills3D';
// import InteractiveTimeline from '@/components/InteractiveTimeline';
import { portfolioData } from '../../data/portfolio';

gsap.registerPlugin(ScrollTrigger);


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Mengatur jeda 0.2 detik antar animasi anak
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 },
};

// Enhanced Interactive Timeline Component
const InteractiveJourney = () => {
  const [activeYear, setActiveYear] = useState<string | null>(null);
  // const timelineRef = useRef(null);
  
  const journeyData = [
    {
      year: '2016',
      title: 'Started Learning',
      description: 'Began programming journey with HTML, CSS, and JavaScript',
      icon: '🚀',
      color: 'from-blue-500 to-cyan-500',
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    {
      year: '2018',
      title: 'First Major Project',
      description: 'Built first full-stack application with React and Node.js',
      icon: '💡',
      color: 'from-purple-500 to-pink-500',
      skills: ['React', 'Node.js', 'MongoDB']
    },
    {
      year: '2020',
      title: 'Professional Developer',
      description: 'Joined professional team, worked on enterprise applications',
      icon: '⚡',
      color: 'from-green-500 to-emerald-500',
      skills: ['TypeScript', 'AWS', 'Docker']
    },
    {
      year: '2022',
      title: 'Senior Developer',
      description: 'Led teams, architected solutions, mentored juniors',
      icon: '🏆',
      color: 'from-orange-500 to-red-500',
      skills: ['Leadership', 'Architecture', 'Mentoring']
    },
    {
      year: '2024',
      title: 'Full-Stack Expert',
      description: 'Currently leading innovative projects and mentoring teams',
      icon: '🌟',
      color: 'from-indigo-500 to-purple-500',
      skills: ['Full-Stack', 'Innovation', 'Leadership']
    }
  ];

  return (
    <motion.div
      className="relative"
      variants={containerVariants}
      initial="visible"
      // whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} // Pemicu animasi saat 50% dari kontainer terlihat
    >
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent to-primary rounded-full" />
      
      {journeyData.map((item, index) => (
        <motion.div
          key={item.year}
          className="relative pl-16 mb-12"
          variants={itemVariants}
        >
          <motion.div
            className="absolute -left-3 top-2 w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent border-4 border-background cursor-pointer"
            whileHover={{ scale: 1.2 }}
            onClick={() => setActiveYear(activeYear === item.year ? null : item.year)}
          />
          
          <motion.div
            className={`ml-4 p-6 rounded-xl bg-gradient-to-r ${item.color} bg-opacity-10 border border-white/20 backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 cursor-pointer`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="text-3xl">{item.icon}</span>
              <div>
                <h4 className="text-xl font-bold text-white">{item.year} - {item.title}</h4>
                <p className="text-white/80 text-sm">{item.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {item.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-3 py-1 bg-white/20 rounded-full text-xs text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Enhanced Interactive Skills Component
const InteractiveSkills = () => {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  
  const skills = portfolioData.about.skills;
  
  return (
    <div className="space-y-8">
      {/* <h3 className="text-3xl font-bold mb-8 text-center">Interactive Skills Dashboard</h3> */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="relative group cursor-pointer h-full w-full"
            initial={{ opacity: 1, y: 0 }}
            // whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
            onClick={() => setActiveSkill(activeSkill === index ? null : index)}
          >
            <motion.div
              className={`p-6 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/30 transition-all duration-300 ${
                activeSkill === index ? 'border-primary shadow-lg shadow-primary/20' : ''
              }`}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold">{skill.name}</span>
                <span className="text-sm text-primary font-bold">{skill.level}%</span>
              </div>
              
              <div className="relative">
                <div className="w-full h-3 bg-muted/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  />
                </div>
                
                <div className="mt-3">
                  <span className="text-xs text-muted-foreground">{skill.category}</span>
                </div>
                
                {/* {hoveredSkill === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-2 left-0 right-0 bg-primary/10 rounded-lg p-2 text-xs text-center"
                  >
                    Click to explore {skill.name}
                  </motion.div>
                )} */}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Personal Info Component
const PersonalInfo = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm rounded-2xl p-8 border border-border/30"
  >
    <div className="flex items-center gap-6 mb-6">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold">
        MR
      </div>
      <div>
        <h3 className="text-2xl font-bold mb-1">{portfolioData.personal.name}</h3>
        <p className="text-primary font-medium">{portfolioData.personal.title}</p>
      </div>
    </div>
    
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Globe className="w-5 h-5 text-primary" />
        <span className="text-muted-foreground">{portfolioData.personal.location}</span>
      </div>
      <div className="flex items-center gap-3">
        <Zap className="w-5 h-5 text-primary" />
        <span className="text-muted-foreground">5+ Years Experience</span>
      </div>
      <div className="flex items-center gap-3">
        <Rocket className="w-5 h-5 text-primary" />
        <span className="text-muted-foreground">30+ Projects Delivered</span>
      </div>
    </div>
  </motion.div>
);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const achievements = portfolioData.about.achievements;

  return (
    <section id="about" ref={sectionRef} className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full text-sm font-bold mb-6"
          >
            About Me
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Crafting Digital Excellence
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {portfolioData.about.bio}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Journey & Personal Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Calendar className="w-8 h-8 text-primary" />
                My Journey
              </h3>
              <InteractiveJourney />
            </div>
            
            <PersonalInfo />
          </div>

          {/* Right Column - Skills & Achievements */}
          <div className="lg:col-span-7">
            <div className="space-y-12">
              {/* Interactive Skills */}
              <div>
                <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <Layers className="w-8 h-8 text-primary" />
                  Interactive Skills Dashboard
                </h3>
                <InteractiveSkills />
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-primary" />
                  Key Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-r from-card/50 to-card/30 border border-border/30"
                    >
                      <CheckCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
