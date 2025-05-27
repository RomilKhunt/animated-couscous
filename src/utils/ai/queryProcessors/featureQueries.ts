
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processFeatureQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  const features = [
    'sea view', 'garden view', 'city view', 'private pool', 'smart home', 
    'italian marble', 'modular kitchen', 'terrace', 'balcony', 'personal foyer',
    'vitrified', 'granite', 'video door', 'work from home', 'wfh'
  ];
  
  for (const feature of features) {
    if (lowerQuery.includes(feature)) {
      // Filter units by feature and project if a project is selected
      let matchedUnits = units.filter(unit => 
        unit.features.some(f => f.toLowerCase().includes(feature))
      );
      if (currentProject) {
        matchedUnits = matchedUnits.filter(unit => unit.projectId === currentProject.id);
      }
      
      if (matchedUnits.length > 0) {
        return {
          text: `I found ${matchedUnits.length} properties with ${feature} in ${currentProject?.name || 'our portfolio'}.`,
          type: 'unit',
          relatedItems: matchedUnits
        };
      } else {
        return {
          text: `I couldn't find any properties with ${feature} in ${currentProject?.name || 'our portfolio'}.`,
          type: 'general'
        };
      }
    }
  }
  
  return null;
};
