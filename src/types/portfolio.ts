// Type definitions for portfolio data
export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  year: string;
}

export interface Category {
  name: string;
  count: number;
}

export interface PortfolioFilters {
  category: string;
  searchTerm: string;
  sortBy: 'date' | 'title' | 'featured';
}
