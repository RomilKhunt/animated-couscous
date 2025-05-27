
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processLocationQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  // Check if query is related to location
  if (
    lowerQuery.includes('location') || 
    lowerQuery.includes('connectivity') || 
    lowerQuery.includes('nearby') ||
    lowerQuery.includes('distance') ||
    lowerQuery.includes('how far') ||
    lowerQuery.includes('traffic') ||
    lowerQuery.includes('transportation') ||
    lowerQuery.includes('commute')
  ) {
    if (!currentProject) {
      return {
        text: "Please select a project to get location-specific information.",
        type: 'general'
      };
    }
    
    if (currentProject.name === 'Greenfield') {
      return {
        text: `Greenfield is located in Shantigram, near SG Highway with excellent connectivity: 5 mins to SG Highway, 7 mins to Vaisno Devi Circle, 7 mins to SP Ring Road, 25 mins to International Airport, and 8 mins to KD Hospital. It's also near corporate houses like Adani, Zydus & Lubi.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'S Plus') {
      return {
        text: `S Plus is strategically located at Ognaj, S.P. Ring Road (Near Ognaj Circle, Beside Krystal By Shakti farm party plot) with excellent connectivity. It's positioned in a high-growth corridor with high visibility on S.P. Ring Road. The location offers proximity to business zones like Science City, Vaishnodevi Circle, and Gota, making it ideal for commercial establishments seeking connectivity and visibility.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'SKYVIEW') {
      return {
        text: `SKYVIEW is located in the prestigious GIFT City with excellent connectivity. It's just 10 minutes from SP Ring Road and SG Highway, 15 minutes from International Airport, and 18 minutes from Gandhinagar. The property is connected by 4/6 lane State and National Highways and has access to the Metro Transit System linking Ahmedabad and Gandhinagar. GIFT City has its own metro stations including Udyan Station, Vitth Station, and Exhibition Station.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'EDGE') {
      return {
        text: `EDGE is located in Ambli, an upscale area of Ahmedabad. The property enjoys excellent connectivity to major roads and business districts of the city, making it a premium residential address with convenient access to both work and leisure destinations.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    // Generic location response for other projects
    return {
      text: `${currentProject.name} is located in ${currentProject.location}, offering convenience and accessibility to key areas of the city.`,
      type: 'project',
      relatedItems: [currentProject]
    };
  }
  
  return null;
};
