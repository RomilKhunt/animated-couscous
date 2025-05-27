
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processLayoutQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('layout') || 
    lowerQuery.includes('floor plan') || 
    lowerQuery.includes('carpet area') ||
    lowerQuery.includes('carpet') ||
    lowerQuery.includes('super built') ||
    lowerQuery.includes('direction') ||
    lowerQuery.includes('face') ||
    lowerQuery.includes('vastu')
  ) {
    if (!currentProject) {
      return {
        text: "Please select a project to get specific layout information.",
        type: 'general'
      };
    }
    
    if (currentProject.name === 'Greenfield') {
      return {
        text: `Greenfield offers thoughtfully designed layouts with 270° open views. The 3 BHK apartments come in two variants: Type A (2,652 sq.ft) and Type B (2,653 sq.ft), both with personal foyers. The apartments feature good ventilation with large windows and optimal natural light. The project is designed with vastu principles in mind.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'S Plus') {
      return {
        text: `S Plus offers well-designed commercial spaces with two main variants: Premium Showrooms (1370 to 4414 sq.ft) with 14 and 12 feet floor heights, and Office Spaces (699 to 1897 sq.ft) with 10.5 feet floor height. The building features a G+12 tower with 8+ showrooms & offices per floor, arranged to maximize visibility, footfall, and operational efficiency. Each floor is designed with modern business requirements in mind.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'SKYVIEW') {
      return {
        text: `SKYVIEW offers thoughtfully designed apartments with optimum space utilization. The 2 BHK apartments come in multiple variants with super built-up areas around 1500-1600 sq.ft. and carpet+balcony areas of 828-880 sq.ft. The 3 BHK apartments are larger at about 2671-2686 sq.ft. with carpet+balcony areas of approximately 1470-1480 sq.ft. Most units feature balcony access from all rooms. The penthouses on the 33rd floor feature duplex layouts with exclusive terraces on the 34th floor. The apartments are designed with optimal ventilation and natural light.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'EDGE') {
      return {
        text: `EDGE offers spacious 4 BHK + Work From Home layouts that prioritize comfort and luxury. The apartments feature generous living & dining spaces (25'0" X 17'6"), well-proportioned bedrooms, and dedicated utility areas. The master bedrooms are typically 15'0" X 17'0", while other bedrooms range from 10'0" to 12'0" in width. Each apartment features personal foyers and maid rooms. The penthouses add exclusive terrace spaces and additional lounge/office areas on the upper floor. The layouts are designed to maximize space utilization while ensuring privacy and comfort.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    // Generic layout response for other projects
    return {
      text: `${currentProject.name} features thoughtfully designed layouts that maximize space utilization and comfort. Please contact our sales team for specific floor plans and layout details.`,
      type: 'project',
      relatedItems: [currentProject]
    };
  }
  
  return null;
};
