
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processAvailabilityQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('available') || lowerQuery.includes('ready to move')) {
    // Filter available units by project if a project is selected
    let availableUnits = units.filter(unit => unit.availability === 'available');
    if (currentProject) {
      availableUnits = availableUnits.filter(unit => unit.projectId === currentProject.id);
    }
    
    return {
      text: `There are ${availableUnits.length} available units in ${currentProject?.name || 'our portfolio'} that are ready for booking.`,
      type: 'unit',
      relatedItems: availableUnits
    };
  }
  
  return null;
};
