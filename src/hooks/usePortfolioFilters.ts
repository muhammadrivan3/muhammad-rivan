import { useState, useMemo } from 'react';
import { Project } from '../types/portfolio';

export const usePortfolioFilters = (projects: Project[]) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'featured'>('date');

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Filter by category
    if (activeFilter !== 'All') {
      filtered = filtered.filter(project => project.category === activeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort projects
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return parseInt(b.year) - parseInt(a.year);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'featured':
          return b.featured ? 1 : -1;
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, activeFilter, searchTerm, sortBy]);

  return {
    filteredProjects,
    activeFilter,
    setActiveFilter,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy
  };
};
