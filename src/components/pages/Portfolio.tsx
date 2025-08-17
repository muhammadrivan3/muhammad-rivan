import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter, Search } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Portfolio3D } from '../Portfolio3D';
import { portfolioData, projectCategories } from '../../data/portfolio';
import { Project } from '../../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

// Separate ProjectCard component
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300"
    >
      <div className="h-80 bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center text-6xl">
        {project.id === 1 ? '🛍️' : 
         project.id === 2 ? '🧠' :
         project.id === 3 ? '👕' :
         project.id === 4 ? '💼' :
         project.id === 5 ? '📊' : '🎨'}
      </div>
      
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
        <motion.a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30"
        >
          <ExternalLink size={20} />
        </motion.a>
        <motion.a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30"
        >
          <Github size={20} />
        </motion.a>
      </div>

      {project.featured && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
          Featured
        </div>
      )}

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            {project.category}
          </span>
          <span className="text-xs text-muted-foreground">{project.year}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string, tagIndex: number) => (
            <span
              key={tagIndex}
              className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = useMemo(() => {
    let filtered = portfolioData.projects;
    
    if (activeFilter !== 'All') {
      filtered = filtered.filter(project => project.category === activeFilter);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return filtered;
  }, [activeFilter, searchTerm]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.portfolio-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-24 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="portfolio-header text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
          >
            <Filter className="inline w-4 h-4 mr-2" />
            My Work
          </motion.div>
          
          <h2 className="text-display mb-6">
            Featured{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          
          <p className="text-body text-muted-foreground max-w-2xl mx-auto mb-12">
            A showcase of my recent work spanning web development, 3D experiences, 
            and innovative digital solutions.
          </p>

          <div className="mb-16">
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
              <Portfolio3D />
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Interactive 3D visualization - hover and drag to explore projects
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {projectCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  activeFilter === category
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-card hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <div className="flex justify-center mb-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;