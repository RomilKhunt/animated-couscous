
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processSpecificationsQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('specification') || 
    lowerQuery.includes('material') || 
    lowerQuery.includes('quality') ||
    lowerQuery.includes('flooring') ||
    lowerQuery.includes('bathroom') ||
    lowerQuery.includes('kitchen')
  ) {
    if (!currentProject) {
      return {
        text: "Please select a project to get specific specification information.",
        type: 'general'
      };
    }
    
    if (currentProject.name === 'Greenfield') {
      return {
        text: `Greenfield apartments feature vitrified tile flooring in living areas, granite kitchen platforms with S.S. sink, putty finished internal walls, 3 phase concealed ISI copper wiring, laminated doors with video door phones, glazed/ceramic bathroom tiles, branded EWC couple closets, and other premium fittings. The apartments also include personal foyers for added privacy and elegance.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'S Plus' && currentProject.specifications) {
      return {
        text: `S Plus features premium specifications including vitrified flooring (600x1200) in main areas, premium tiles (600x600) in toilets, and granite/vitrified flooring in common areas. Doors include designer flush doors with wooden frames & natural veneer for main doors and flush doors with laminate for internal doors. Plumbing uses CPVC-UPVC with branded accessories and premium quality CP fittings. Electrical systems include three phase concealed copper wiring with ELCB/MCB protection.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'SKYVIEW' && currentProject.specifications) {
      return {
        text: `SKYVIEW apartments feature vitrified tiles in living areas and bedrooms, natural granite/rustic tiles in balconies, and provision for air conditioning in living room and all bedrooms. Doors have laminated finish on both sides, with anodised/aluminium windows throughout. Toilets include glazed/ceramic tiles up to lintel level, counter basin/wall hung basin, and branded EWC couple closets. The kitchen has glazed/ceramic tiles up to ceiling level. Interior walls have putty finish while exterior walls have acrylic enamel finish.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    return {
      text: `${currentProject.name} features quality specifications including premium flooring, modern fixtures in bathrooms and kitchens, and durable finishes throughout. Please contact our sales team for detailed specifications.`,
      type: 'project',
      relatedItems: [currentProject]
      };
  }
  
  return null;
};
