
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processWorkFromHomeQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('work from home') || 
    lowerQuery.includes('wfh') || 
    lowerQuery.includes('home office')
  ) {
    if (currentProject?.name === 'EDGE') {
      return {
        text: `EDGE is specifically designed with the modern work-life balance in mind, offering 4 BHK + Work From Home (WFH) apartments. These spacious units provide dedicated areas that can function as home offices, ensuring residents have comfortable and productive spaces for remote work without compromising on living areas. The thoughtful layout separates work and living spaces for optimal functionality.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    // For non-WFH specific projects
    const wfhUnits = units.filter(unit => 
      unit.features.some(f => f.toLowerCase().includes('work') && f.toLowerCase().includes('home')) ||
      unit.type.toLowerCase().includes('wfh')
    );
    
    if (wfhUnits.length > 0) {
      return {
        text: `We have ${wfhUnits.length} units specifically designed with work-from-home features in our portfolio. The EDGE project specifically offers 4 BHK + WFH apartments designed for the modern professional.`,
        type: 'unit',
        relatedItems: wfhUnits
      };
    } else {
      return {
        text: `Our EDGE project offers 4 BHK + Work From Home apartments specifically designed for professionals who need dedicated space for remote work. Other projects can accommodate home office setups in their spacious layouts.`,
        type: 'general'
      };
    }
  }
  
  return null;
};
