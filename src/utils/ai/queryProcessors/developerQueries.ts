
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processDeveloperQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('developer') || 
    lowerQuery.includes('builder') ||
    lowerQuery.includes('shivalik') ||
    lowerQuery.includes('track record') ||
    lowerQuery.includes('reputation') ||
    lowerQuery.includes('rera')
  ) {
    if (!currentProject) {
      return {
        text: "Please select a project to get developer-specific information.",
        type: 'general'
      };
    }
    
    if (currentProject.developer && currentProject.developer.includes('SHIVALIK')) {
      return {
        text: `${currentProject.name} is developed by ${currentProject.developer}, a reputable developer with the tagline "Building Landmarks Since 1998". Shivalik Group is known for quality construction, timely delivery, and customer satisfaction across residential and commercial projects. Their projects are RERA approved with all necessary legal approvals in place.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.developer) {
      return {
        text: `${currentProject.name} is developed by ${currentProject.developer}, a reputable developer in the real estate sector. The project is designed with quality and customer satisfaction in mind, with all necessary legal approvals in place.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    return {
      text: `${currentProject.name} is developed by a reputable developer in the real estate sector. The project is designed with quality and customer satisfaction in mind, with all necessary legal approvals in place.`,
      type: 'project',
      relatedItems: [currentProject]
    };
  }
  
  return null;
};
