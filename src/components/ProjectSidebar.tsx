
import React from 'react';
import { Project } from '../models';
import { useRealEstate } from '../context/RealEstateContext';
import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar';
import { ChevronRight } from 'lucide-react';

const ProjectSidebar = () => {
  const {
    allProjects,
    currentProject,
    setCurrentProject
  } = useRealEstate();
  
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-3">
          <h3 className="text-xl font-semibold font-display">Shivalik Developers</h3>
          <p className="text-sm text-muted-foreground">Select a project</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="space-y-1">
          {allProjects.map(project => (
            <button 
              key={project.id} 
              onClick={() => setCurrentProject(project)} 
              className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors rounded-md ${
                currentProject?.id === project.id 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              } interactive-element`}
              aria-current={currentProject?.id === project.id ? 'page' : undefined}
            >
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full ${
                  currentProject?.id === project.id ? 'bg-primary' : 'bg-muted-foreground/60'
                } mr-2`}></div>
                <span className="font-medium">{project.name}</span>
              </div>
              {currentProject?.id === project.id && <ChevronRight className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProjectSidebar;
