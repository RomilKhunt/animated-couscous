
import { FAQ } from '@/models';

export interface FAQCategory {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

export interface ResponseTemplate {
  type: string;
  template: string;
  keywords: string[];
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'location',
    name: 'Location',
    description: 'Proximity, Traffic, Routes',
    tags: ['location', 'proximity', 'traffic', 'routes', 'connectivity', 'distance']
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Background, Portfolio, Credentials',
    tags: ['developer', 'background', 'portfolio', 'credentials', 'experience']
  },
  {
    id: 'apartment',
    name: 'Apartment',
    description: 'Unit Types, Layouts, Carpet Area',
    tags: ['apartment', 'unit', 'layout', 'carpet area', 'bhk', 'size']
  },
  {
    id: 'penthouse',
    name: 'Penthouse',
    description: 'Features, Terrace, Floor Plans',
    tags: ['penthouse', 'terrace', 'floor plan', 'duplex', 'luxury']
  },
  {
    id: 'amenities',
    name: 'Amenities',
    description: 'Pools, Gyms, Timings',
    tags: ['amenities', 'pool', 'gym', 'facilities', 'timings', 'clubhouse']
  },
  {
    id: 'parking',
    name: 'Parking',
    description: 'Allotment, Visitor Spaces',
    tags: ['parking', 'allotment', 'visitor', 'spaces', 'garage']
  },
  {
    id: 'financial',
    name: 'Financial',
    description: 'Total Price, Payment Schedule, Maintenance',
    tags: ['price', 'payment', 'schedule', 'maintenance', 'cost', 'charges']
  },
  {
    id: 'legal',
    name: 'Legal',
    description: 'RERA, Land Title, Approvals',
    tags: ['rera', 'legal', 'approval', 'title', 'documents', 'registration']
  },
  {
    id: 'construction',
    name: 'Construction',
    description: 'Materials, Earthquake Safety',
    tags: ['construction', 'materials', 'safety', 'earthquake', 'quality']
  },
  {
    id: 'possession',
    name: 'Possession',
    description: 'Timeline, Inspection, Customization',
    tags: ['possession', 'timeline', 'inspection', 'customization', 'handover']
  },
  {
    id: 'utilities',
    name: 'Utilities',
    description: 'Power, Water, STP, Lifts',
    tags: ['utilities', 'power', 'water', 'stp', 'lifts', 'electricity']
  },
  {
    id: 'neighborhood',
    name: 'Neighborhood',
    description: 'Schools, Hospitals, Retail',
    tags: ['neighborhood', 'schools', 'hospitals', 'retail', 'nearby', 'vicinity']
  },
  {
    id: 'investment',
    name: 'Investment',
    description: 'Price Trends, Rental, Resale',
    tags: ['investment', 'price trends', 'rental', 'resale', 'appreciation']
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    description: 'Offers, Loans, Comparisons',
    tags: ['offers', 'loans', 'comparison', 'miscellaneous', 'other']
  }
];

export const RESPONSE_TEMPLATES: ResponseTemplate[] = [
  {
    type: 'pricing',
    template: 'For {unit_type}, price: ₹{price} ({rate} per sq ft). Includes: {inclusions}. Charges: {additional_charges}. Offers: {offers}.',
    keywords: ['price', 'cost', 'rate', 'charges', 'offers']
  },
  {
    type: 'amenities',
    template: 'Amenities include: {amenities_list}. Hours: {timings}. Maintenance: {maintenance_info}.',
    keywords: ['amenities', 'facilities', 'timings', 'maintenance']
  },
  {
    type: 'location',
    template: 'Address: {address}. Distance to {destination}: {distance} ({travel_time}). Routes: {connectivity_details}.',
    keywords: ['location', 'address', 'distance', 'connectivity', 'routes']
  },
  {
    type: 'developer',
    template: '{developer_name}: {experience} years, {projects_count} projects. Notables: {project_list}. Track record: {achievements}.',
    keywords: ['developer', 'experience', 'projects', 'track record']
  },
  {
    type: 'legal',
    template: 'RERA: {rera_number}. Approvals: {approvals_list}. Land: {land_type}. Documents available.',
    keywords: ['rera', 'legal', 'approvals', 'documents']
  }
];

export const QUICK_FILTERS = [
  {
    id: 'under-1cr',
    label: 'Under ₹1 Cr',
    description: 'Units below ₹1 crore',
    criteria: 'price_max: 10000000',
    query: 'Show me units under 1 crore'
  },
  {
    id: 'sea-view',
    label: 'Sea View',
    description: 'Sea-facing units',
    criteria: 'special_features: Sea View',
    query: 'Show me sea view properties'
  },
  {
    id: 'ready-to-move',
    label: 'Ready to Move',
    description: 'Immediate availability',
    criteria: 'possession_status: ready',
    query: 'Show me ready to move properties'
  },
  {
    id: 'corner-units',
    label: 'Corner Units',
    description: 'Extra light/space',
    criteria: 'unit_type: corner',
    query: 'Show me corner units'
  },
  {
    id: 'high-floor',
    label: 'High Floor',
    description: 'Floors 10+',
    criteria: 'floor_min: 10',
    query: 'Show me high floor apartments'
  },
  {
    id: 'dual-parking',
    label: '2 Parking',
    description: 'Dual parking spaces',
    criteria: 'parking_spaces: 2',
    query: 'Show me units with 2 parking spaces'
  }
];

export const categorizeFAQ = (faq: FAQ): string => {
  const lowerQuestion = faq.question.toLowerCase();
  const lowerAnswer = faq.answer.toLowerCase();
  const lowerTags = faq.tags.map(tag => tag.toLowerCase());
  
  for (const category of FAQ_CATEGORIES) {
    const matchesCategory = category.tags.some(tag => 
      lowerQuestion.includes(tag) || 
      lowerAnswer.includes(tag) || 
      lowerTags.includes(tag)
    );
    
    if (matchesCategory) {
      return category.id;
    }
  }
  
  return 'miscellaneous';
};

export const getResponseTemplate = (queryType: string): string | null => {
  const template = RESPONSE_TEMPLATES.find(t => t.type === queryType);
  return template ? template.template : null;
};
