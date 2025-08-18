import { useState, useRef, useEffect, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ExternalLink, Github, Filter, Search } from 'lucide-react';
import { portfolioData, projectCategories } from '../../data/portfolio';
import { Project } from '../../types/portfolio';

// Memoized card variants - defined outside component to prevent recreation
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.99 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay: Math.min(i * 0.1, 0.5), // Cap delay to prevent long waits
    },
  }),
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.9, 
    transition: { 
      duration: 0.2,
      ease: "easeIn" 
    } 
  },
};

// Hover animation is now inline in the whileHover prop

// Optimized ProjectCard with React.memo
const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getEmoji = useCallback((id: number) => {
    const emojis = ['🛍️', '🧠', '👕', '💼', '📊', '🎨'];
    return emojis[id - 1] || '🎨';
  }, []);

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center text-6xl">
        {getEmoji(project.id)}
      </div>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center gap-4"
          >
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink size={20} />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
              aria-label={`View ${project.title} source code`}
            >
              <Github size={20} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

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
          <time className="text-xs text-muted-foreground">{project.year}</time>
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
});

ProjectCard.displayName = 'ProjectCard';

// Optimized filter button component
const FilterButton = memo(({ category, activeFilter, onClick }: {
  category: string;
  activeFilter: string;
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-2 rounded-lg font-medium transition-all text-sm md:px-6 md:py-3 md:rounded-xl ${
      activeFilter === category
        ? 'bg-primary text-primary-foreground shadow-glow'
        : 'bg-card hover:bg-muted text-muted-foreground hover:text-foreground'
    }`}
  >
    {category}
  </motion.button>
));

FilterButton.displayName = 'FilterButton';

// Main Portfolio component
export const Portfolio = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Memoized filtered projects calculation
  const filteredProjects = useMemo(() => {
    let filtered = portfolioData.projects;
    
    if (activeFilter !== 'All') {
      filtered = filtered.filter(project => project.category === activeFilter);
    }
    
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    return filtered;
  }, [activeFilter, searchTerm]);

  // Debounced search handler
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Clear search handler
  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <Filter className="w-4 h-4 mr-2" />
            My Work
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            A showcase of my recent work spanning web development, 3D experiences, 
            and innovative digital solutions.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {projectCategories.map((category) => (
              <FilterButton
                key={category}
                category={category}
                activeFilter={activeFilter}
                onClick={() => setActiveFilter(category)}
              />
            ))}
          </div>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-10 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No projects found matching your criteria.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
