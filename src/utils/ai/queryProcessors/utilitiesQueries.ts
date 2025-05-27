
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processUtilitiesQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('water supply') || 
    lowerQuery.includes('power backup') || 
    lowerQuery.includes('electricity') ||
    lowerQuery.includes('sewage') ||
    lowerQuery.includes('lifts') ||
    lowerQuery.includes('elevators') ||
    lowerQuery.includes('waste')
  ) {
    if (!currentProject) {
      return {
        text: "Please select a project to get specific information about utilities and services.",
        type: 'general'
      };
    }
    
    if (currentProject.name === 'Greenfield') {
      return {
        text: `Greenfield has 24-hour water supply with underground and overhead tanks. There's power backup for common areas and essential services. The project has modern sewage treatment plants and efficient waste management systems. Each tower is equipped with high-speed elevators including a dedicated service lift.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'S Plus') {
      return {
        text: `S Plus is equipped with 9 High-Speed Elevators and Owner-Exclusive Lifts for efficient vertical transportation. The building features three phase concealed copper wiring with ELCB/MCB protection for electrical safety. Water supply, power backup, and waste management systems are designed to meet the needs of commercial establishments.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'SKYVIEW') {
      return {
        text: `SKYVIEW features 8 high-speed passenger lifts plus 2 additional fire/service lifts to serve the 34-floor tower efficiently. The building has 3 phase concealed ISI copper wiring with modular switches and MCB distribution panels. Water supply systems are designed to ensure consistent availability, and power backup is provided for essential services and common areas.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    return {
      text: `${currentProject.name} is equipped with modern utility systems including water supply, power management, and waste handling. The project features elevator services appropriate for the building height and occupancy needs.`,
      type: 'project',
      relatedItems: [currentProject]
    };
  }
  
  return null;
};
