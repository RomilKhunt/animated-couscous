import * as React from 'react';
import { Project, Unit, FAQ, FilterTag } from '../models';
import { mockProjects, mockUnits, mockFaqs, mockFilterTags } from '../data/mockData';

interface RealEstateContextType {
  currentProject: Project | null;
  allProjects: Project[];
  projectUnits: Unit[];
  projectFaqs: FAQ[];
  availableFilters: FilterTag[];
  setCurrentProject: (project: Project) => void;
  getUnitsForProject: (projectId: string) => Unit[];
  getFaqsForProject: (projectId: string) => FAQ[];
}

const RealEstateContext = React.createContext<RealEstateContextType | undefined>(undefined);

export const useRealEstate = () => {
  const context = React.useContext(RealEstateContext);
  if (context === undefined) {
    throw new Error('useRealEstate must be used within a RealEstateProvider');
  }
  return context;
};

interface RealEstateProviderProps {
  children: React.ReactNode;
}

export const RealEstateProvider: React.FC<RealEstateProviderProps> = ({ children }) => {
  const [currentProject, setCurrentProject] = React.useState<Project | null>(mockProjects[0] || null);

  const getUnitsForProject = (projectId: string) => {
    return mockUnits.filter(unit => unit.projectId === projectId);
  };

  const getFaqsForProject = (projectId: string) => {
    return mockFaqs.filter(faq => faq.projectId === projectId);
  };

  const projectUnits = currentProject ? getUnitsForProject(currentProject.id) : [];
  const projectFaqs = currentProject ? getFaqsForProject(currentProject.id) : [];
  
  // Filter tags based on current project
  const availableProjectFilters = currentProject 
    ? mockFilterTags.filter(tag => tag.label.includes(currentProject.name) || !tag.label.includes(' ')) 
    : mockFilterTags;

  const value = {
    currentProject,
    allProjects: mockProjects,
    projectUnits,
    projectFaqs,
    availableFilters: availableProjectFilters,
    setCurrentProject,
    getUnitsForProject,
    getFaqsForProject,
  };

  return (
    <RealEstateContext.Provider value={value}>
      {children}
    </RealEstateContext.Provider>
  );
};
