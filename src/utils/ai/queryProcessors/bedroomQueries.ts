
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processBedroomQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('bhk') || lowerQuery.includes('bedroom')) {
    let bedrooms = 0;
    
    // Extract the bedroom count from query
    if (lowerQuery.includes('1 bhk') || lowerQuery.includes('1 bedroom')) bedrooms = 1;
    else if (lowerQuery.includes('2 bhk') || lowerQuery.includes('2 bedroom')) bedrooms = 2;
    else if (lowerQuery.includes('3 bhk') || lowerQuery.includes('3 bedroom')) bedrooms = 3;
    else if (lowerQuery.includes('4 bhk') || lowerQuery.includes('4 bedroom')) bedrooms = 4;
    else if (lowerQuery.includes('5 bhk') || lowerQuery.includes('5 bedroom')) bedrooms = 5;
    
    if (bedrooms > 0) {
      // Filter units by bedroom count and project if a project is selected
      let matchedUnits = units.filter(unit => unit.bedrooms === bedrooms);
      if (currentProject) {
        matchedUnits = matchedUnits.filter(unit => unit.projectId === currentProject.id);
      }
      
      if (matchedUnits.length > 0) {
        return {
          text: `I found ${matchedUnits.length} ${bedrooms} BHK properties in ${currentProject?.name || 'our portfolio'}.`,
          type: 'unit',
          relatedItems: matchedUnits
        };
      } else {
        return {
          text: `I couldn't find any ${bedrooms} BHK properties in ${currentProject?.name || 'our portfolio'}.`,
          type: 'general'
        };
      }
    }
  }
  
  return null;
};
