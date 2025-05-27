
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processConstructionQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('construction') || 
    lowerQuery.includes('material') || 
    lowerQuery.includes('quality') ||
    lowerQuery.includes('fixtures') ||
    lowerQuery.includes('fittings') ||
    lowerQuery.includes('brand') ||
    lowerQuery.includes('earthquake')
  ) {
    if (!currentProject) {
      return {
        text: "Please select a project to get specific information about construction quality.",
        type: 'general'
      };
    }
    
    if (currentProject.name === 'Greenfield') {
      return {
        text: `Greenfield is constructed with high-quality materials adhering to international standards. The structure is earthquake-resistant with RCC framed construction. The apartments feature vitrified tile flooring in living areas, granite kitchen platforms, putty finished internal walls, 3 phase concealed ISI copper wiring, laminated doors with video door phones, glazed/ceramic bathroom tiles, and branded fixtures.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'S Plus' && currentProject.specifications) {
      return {
        text: `S Plus is built with R.C.C frame structure to ensure durability and safety. The interior specifications include single coat mala plaster with double coat putty finish for interior walls and heritage texture for exterior walls. Doors feature designer flush doors with wooden frames & natural veneer for main doors and flush doors with laminate for internal doors. Flooring includes premium quality vitrified flooring (600x1200) in main areas and premium tiles in toilets. Electrical systems include three phase concealed copper wiring with ELCB/MCB protection for safety.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'SKYVIEW' && currentProject.specifications) {
      return {
        text: `SKYVIEW features an RCC Structure with 3 Basement + Ground + 34 floors. The building includes premium specifications such as vitrified tiles in living areas and bedrooms, natural granite/rustic tiles in balconies, laminated finish doors, anodised/aluminium windows, and 3 phase concealed ISI copper wiring. The project uses quality materials throughout, with branded fixtures in bathrooms and premium finishes for all surfaces.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    return {
      text: `${currentProject.name} is built with quality materials and modern construction techniques to ensure durability and comfort. The project adheres to safety standards and uses premium fixtures and fittings throughout.`,
      type: 'project',
      relatedItems: [currentProject]
    };
  }
  
  return null;
};
