
// Models for real estate properties and projects

export interface Project {
  id: string;
  name: string;
  location: string;
  type?: string;
  status: string;
  description: string;
  features?: string[];
  imageUrl?: string;
  developer?: string;
  certification?: string;
  landArea?: string;
  openSpace?: string;
  towers?: number;
  storeys?: number;
  towerLayout?: string;
  distanceBetweenTowers?: string;
  parking?: string;
  // Add missing properties
  totalUnits?: number;
  availableUnits?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  // New fields for commercial properties
  businessFocus?: string;
  brandPositioning?: string;
  completionDate?: string;
  towerHeight?: string;
  constructionType?: string;
  totalFloors?: number;
  fullAddress?: string;
  reraNumber?: string;
  contactNumber?: string;
  website?: string;
  refugeAreaFloors?: string;
  lifts?: string;
  // New fields for connectivity
  transportConnections?: {
    roads?: string[];
    metro?: string[];
    distances?: Record<string, string>;
  };
  connectivity?: string;
  amenities?: {
    community?: string[];
    health?: string[];
    convenience?: string[];
    outdoor?: string[];
    recreational?: string[];
    business?: string[];
    indoor?: string[];
  };
  // Building specifications
  specifications?: {
    flooring?: Record<string, string> | string[];
    airConditioner?: string;
    doors?: Record<string, string> | string[];
    windows?: string;
    electrical?: string[];
    toilets?: string[];
    kitchen?: string[];
    color?: Record<string, string>;
  };
}

export interface Unit {
  id: string;
  projectId: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  price: number;
  area: number;
  floorPlan?: string;
  availability: 'available' | 'pending' | 'sold';
  features: string[];
  imageUrl?: string;
  unitNumber?: string; 
  // New fields for commercial units
  size?: string;
  frontage?: string;
  floorHeight?: string;
  designFocus?: string;
  // For detailed apartment layouts
  layout?: {
    carpetArea?: string;
    superBuiltUpArea?: string;
    balconyAccess?: string;
    upperFloorTerrace?: string;
    rooms?: Record<string, string>;
  };
  specifications?: {
    flooring?: string[];
    walls?: string[];
    electrical?: string[];
    doors?: string[];
    bathroom?: string[];
    special?: string[];
  };
}

export interface FAQ {
  id: string;
  projectId: string;
  question: string;
  answer: string;
  tags: string[];
}

export interface FilterTag {
  id: string;
  label: string;
  query: string;
}
