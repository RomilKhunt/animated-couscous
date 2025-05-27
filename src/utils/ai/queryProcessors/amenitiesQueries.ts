
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processAmenitiesQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('amenities') || 
    lowerQuery.includes('facilities') || 
    lowerQuery.includes('features') ||
    lowerQuery.includes('gym') ||
    lowerQuery.includes('pool') ||
    lowerQuery.includes('swimming') ||
    lowerQuery.includes('clubhouse') ||
    lowerQuery.includes('spa')
  ) {
    if (!currentProject) {
      return {
        text: "Please select a project to get specific amenity information.",
        type: 'general'
      };
    }
    
    if (currentProject.name === 'Greenfield' && currentProject.amenities) {
      const allAmenities = [
        ...(currentProject.amenities.community || []),
        ...(currentProject.amenities.health || []),
        ...(currentProject.amenities.convenience || []),
        ...(currentProject.amenities.outdoor || [])
      ];
      
      return {
        text: `${currentProject.name} offers a wide range of amenities including: ` +
              `Community spaces (${(currentProject.amenities.community || []).join(', ')}), ` +
              `Health & wellness facilities (${(currentProject.amenities.health || []).join(', ')}), ` +
              `Convenience features (${(currentProject.amenities.convenience || []).join(', ')}), ` +
              `and Outdoor spaces (${(currentProject.amenities.outdoor || []).join(', ')}).`,
        type: 'project',
        relatedItems: [currentProject]
      };
    } 
    
    if (currentProject.name === 'S Plus' && currentProject.amenities) {
      return {
        text: `${currentProject.name} offers various amenities designed for business and convenience including: ` +
              `Recreational facilities (${(currentProject.amenities.recreational || []).join(', ')}), ` +
              `Business facilities (${(currentProject.amenities.business || []).join(', ')}), ` +
              `and Convenience features (${(currentProject.amenities.convenience || []).join(', ')}).`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'SKYVIEW' && currentProject.amenities) {
      return {
        text: `${currentProject.name} offers comprehensive amenities including: ` +
              `Outdoor facilities (${(currentProject.amenities.outdoor || []).join(', ')}), ` +
              `and Indoor facilities (${(currentProject.amenities.indoor || []).join(', ')}).`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.name === 'EDGE' && currentProject.amenities) {
      return {
        text: `${currentProject.name} offers premium lifestyle amenities including: ` +
              `${(currentProject.amenities.outdoor || []).join(', ')}.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    if (currentProject.features && currentProject.features.length > 0) {
      return {
        text: `${currentProject.name} offers various features including: ${currentProject.features.join(', ')}.`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    return {
      text: `Please contact our sales team for detailed information about the amenities offered at ${currentProject.name}.`,
      type: 'project',
      relatedItems: [currentProject]
    };
  }
  
  return null;
};
