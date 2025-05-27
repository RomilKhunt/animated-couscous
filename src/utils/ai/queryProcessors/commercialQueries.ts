
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';
import { mockProjects } from '../../../data/mockData';

export const processCommercialQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('commercial') ||
    lowerQuery.includes('showroom') ||
    lowerQuery.includes('office space') ||
    lowerQuery.includes('retail') ||
    lowerQuery.includes('business space')
  ) {
    if (currentProject?.name === 'S Plus') {
      return {
        text: `S Plus is a premier commercial development offering retail & business spaces. It features premium showrooms ranging from 1370 to 4414 sq.ft. with excellent frontage & visibility, and office spaces ranging from 699 to 1897 sq.ft. designed for agility and operational efficiency. The G+12 Tower includes a Triple-Height Entrance Foyer, 9 High-Speed Elevators, Owner-Exclusive Lifts, and Three-Level Basement Parking. The project is strategically located on S.P. Ring Road, offering excellent visibility and connectivity.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }

    // For non-commercial projects
    const commercialProjects = mockProjects.filter(p => p.name === 'S Plus');
    if (commercialProjects.length > 0) {
      return {
        text: `We have commercial offerings such as ${commercialProjects.map(p => p.name).join(', ')}. Would you like more information about any of these commercial projects?`,
        type: 'general'
      };
    }
  }
  
  return null;
};
