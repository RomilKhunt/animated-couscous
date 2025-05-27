
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processParkingQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('parking') || 
    lowerQuery.includes('car') || 
    lowerQuery.includes('vehicle') ||
    lowerQuery.includes('storage') ||
    lowerQuery.includes('basement')
  ) {
    if (!currentProject) {
      return {
        text: "Please select a project to get specific information about parking facilities.",
        type: 'general'
      };
    }
    
    if (currentProject.name === 'Greenfield' && currentProject.parking) {
      return {
        text: `${currentProject.name} provides ${currentProject.parking}. Visitor parking is also available. Each apartment is allocated parking space as per the unit type, with penthouses getting additional parking spaces.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'S Plus') {
      return {
        text: `${currentProject.name} features Three-Level Basement Parking to accommodate the parking needs of businesses and their clients. The parking facility is designed for convenience with adequate space allocation for different types of commercial units.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'SKYVIEW') {
      return {
        text: `${currentProject.name} provides covered parking facilities for residents. The project features adequate parking space allocation based on apartment types, ensuring convenience for residents and their visitors.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.parking) {
      return {
        text: `${currentProject.name} provides ${currentProject.parking}.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    return {
      text: `${currentProject.name} includes designated parking facilities for residents. Please contact our sales team for specific details about parking allocation for different unit types.`,
      type: 'project',
      relatedItems: [currentProject]
    };
  }
  
  return null;
};
