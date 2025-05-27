
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processPenthouseQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('penthouse') || 
    lowerQuery.includes('duplex') || 
    lowerQuery.includes('terrace') ||
    lowerQuery.includes('top floor')
  ) {
    const penthouses = units.filter(unit => 
      unit.type.toLowerCase().includes('penthouse') || 
      unit.features.some(f => f.toLowerCase().includes('duplex'))
    );
    
    // Filter penthouses to the current project if one is selected
    const projectPenthouses = currentProject ? 
      penthouses.filter(unit => unit.projectId === currentProject.id) : 
      penthouses;
    
    if (projectPenthouses.length > 0 && currentProject?.name === 'Greenfield') {
      return {
        text: `Greenfield offers 12 limited edition 4 BHK duplex penthouses on the 20th and 21st floors: Type A (4,548 sq.ft) and Type B (4,542 sq.ft). These luxury penthouses feature spacious layouts, premium finishes, and are accessed via dedicated elevators. Each penthouse comes with personal foyers and enjoys panoramic views of the surroundings.`,
        type: 'unit',
        relatedItems: projectPenthouses
      };
    } else if (projectPenthouses.length > 0 && currentProject?.name === 'SKYVIEW') {
      return {
        text: `SKYVIEW offers luxurious penthouses on the 33rd floor with duplex layouts extending to the 34th floor. The penthouses come in both 3 BHK and 4 BHK configurations, with super built-up areas ranging from 2,771 to 4,557 sq.ft. These exclusive units feature private terraces (ranging from 151 to 650 sq.ft.), lounge areas, and premium finishes. The 4 BHK penthouses are particularly spacious with features like private studies and large terraces up to 31'0" X 16'9".`,
        type: 'unit',
        relatedItems: projectPenthouses
      };
    } else if (projectPenthouses.length > 0 && currentProject?.name === 'EDGE') {
      return {
        text: `EDGE offers exclusive penthouses with duplex layouts. The lower floor features living & dining spaces (25'0" X 17'6"), multiple bedrooms with attached toilets, kitchen, and utility spaces. The upper floor adds a bedroom, lounge/office space (11'0" X 17'0"), and two private terraces (12'0" X 12'0" each). These penthouses represent the pinnacle of luxury living with premium finishes and spacious layouts.`,
        type: 'unit',
        relatedItems: projectPenthouses
      };
    } else if (projectPenthouses.length > 0) {
      return {
        text: `I found ${projectPenthouses.length} penthouses in ${currentProject?.name || 'our portfolio'}.`,
        type: 'unit',
        relatedItems: projectPenthouses
      };
    } else if (penthouses.length > 0) {
      return {
        text: `While ${currentProject?.name || 'the current project'} doesn't offer penthouses, we have ${penthouses.length} penthouses in other projects in our portfolio.`,
        type: 'unit',
        relatedItems: penthouses
      };
    } else {
      return {
        text: `I couldn't find any penthouses in our current portfolio.`,
        type: 'general'
      };
    }
  }
  
  return null;
};
