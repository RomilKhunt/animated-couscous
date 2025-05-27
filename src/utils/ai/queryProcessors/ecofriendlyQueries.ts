
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processEcofriendlyQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('green building') || 
    lowerQuery.includes('eco-friendly') || 
    lowerQuery.includes('sustainable') ||
    lowerQuery.includes('certification') ||
    lowerQuery.includes('pre-certified')
  ) {
    if (!currentProject) {
      return {
        text: "Please select a project to get specific information about green building features.",
        type: 'general'
      };
    }
    
    if (currentProject.name === 'Greenfield') {
      return {
        text: `${currentProject.name} is a ${currentProject.certification} with 70% open space design. The eco-friendly features include energy-efficient design, water conservation systems, waste management, and use of sustainable materials in construction. The project represents 'The Green Aspect of Life' with 270° open views and only 2 apartments per wing ensuring minimal environmental impact.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    // Generic response for projects without specific green certifications
    return {
      text: `${currentProject.name} incorporates modern design principles with focus on natural light and ventilation. Please contact our sales team for specific information about eco-friendly features of this project.`,
      type: 'project',
      relatedItems: [currentProject]
    };
  }
  
  return null;
};
