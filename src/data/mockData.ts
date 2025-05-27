import { Project, Unit, FAQ } from '../models';

export const formatIndianPrice = (amount: number) => {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
  return formattedAmount;
};

export const mockUnits: Unit[] = [
  {
    id: 'unit-1',
    projectId: 'greenfield-1',
    type: '3 BHK Apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 2652,
    price: 28000000,
    availability: 'available',
    imageUrl: '/api/placeholder/800/600',
    features: ['270° Open View', 'Personal Foyer', 'Green Building Certified', 'Vaastu Compliant'],
    specifications: {
      flooring: ['Vitrified tiles in living areas', 'Anti-skid tiles in bathrooms'],
      electrical: ['3 phase concealed ISI copper wiring', 'Modular switches and sockets'],
      bathroom: ['Glazed/ceramic tiles up to lintel level', 'Branded EWC couple closets', 'Premium quality CP fittings']
    }
  },
  {
    id: 'unit-2',
    projectId: 'greenfield-1',
    type: '4 BHK Duplex Penthouse',
    bedrooms: 4,
    bathrooms: 4,
    area: 4542,
    price: 42000000,
    availability: 'pending',
    imageUrl: '/api/placeholder/800/600',
    features: ['Private Terrace', 'Dedicated Elevator', 'Panoramic View', 'Smart Home Automation'],
    specifications: {
      flooring: ['Imported marble in living areas', 'Wooden flooring in bedrooms'],
      electrical: ['Smart home automation ready', 'Dedicated IT infrastructure'],
      bathroom: ['Premium imported fittings', 'Rain showers', 'Jacuzzi in master bathroom']
    }
  },
  {
    id: 'unit-3',
    projectId: 'splus-2',
    type: 'Premium Showroom',
    bedrooms: 0,
    bathrooms: 2,
    area: 2800,
    price: 35000000,
    availability: 'available',
    imageUrl: '/api/placeholder/800/600',
    features: ['High Visibility', 'Ample Parking', 'Central Air Conditioning', '24/7 Security'],
    specifications: {
      flooring: ['Vitrified flooring (600x1200) in main areas', 'Premium tiles (600x600) in toilets'],
      electrical: ['Three phase concealed copper wiring with ELCB/MCB protection', 'Adequate power points for commercial use'],
      bathroom: ['Premium quality CP fittings', 'Modern sanitaryware']
    }
  },
  {
    id: 'unit-4',
    projectId: 'splus-2',
    type: 'Office Space',
    bedrooms: 0,
    bathrooms: 2,
    area: 1200,
    price: 18000000,
    availability: 'available',
    imageUrl: '/api/placeholder/800/600',
    features: ['High-Speed Elevators', 'Power Backup', 'Fire Safety Systems', 'High-Speed Internet Ready'],
    specifications: {
      flooring: ['Vitrified flooring (600x1200) in main areas', 'Premium tiles (600x600) in toilets'],
      electrical: ['Three phase concealed copper wiring with ELCB/MCB protection', 'Adequate power points for commercial use'],
      bathroom: ['Premium quality CP fittings', 'Modern sanitaryware']
    }
  },
  {
    id: 'unit-5',
    projectId: 'skyview-3',
    type: '2 BHK Apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1550,
    price: 16500000,
    availability: 'available',
    imageUrl: '/api/placeholder/800/600',
    features: ['Panoramic City View', 'Balcony Access', 'High-Speed Internet', '24/7 Security'],
    specifications: {
      flooring: ['Vitrified tiles in living areas and bedrooms', 'Natural granite/rustic tiles in balconies'],
      electrical: ['3 phase concealed ISI copper wiring', 'Provision for air conditioning in all rooms'],
      bathroom: ['Glazed/ceramic tiles up to lintel level', 'Counter basin/wall hung basin', 'Branded EWC couple closets']
    }
  },
  {
    id: 'unit-6',
    projectId: 'skyview-3',
    type: '3 BHK Penthouse',
    bedrooms: 3,
    bathrooms: 3,
    area: 2771,
    price: 45000000,
    availability: 'pending',
    imageUrl: '/api/placeholder/800/600',
    features: ['Private Terrace', 'Sky Lounge Access', 'Infinity Pool', 'Concierge Services'],
    specifications: {
      flooring: ['Vitrified tiles in living areas and bedrooms', 'Natural granite/rustic tiles in balconies'],
      electrical: ['3 phase concealed ISI copper wiring', 'Provision for air conditioning in all rooms'],
      bathroom: ['Glazed/ceramic tiles up to lintel level', 'Counter basin/wall hung basin', 'Branded EWC couple closets']
    }
  },
  {
    id: 'unit-7',
    projectId: 'edge-4',
    type: '4 BHK + WFH Apartment',
    bedrooms: 4,
    bathrooms: 4,
    area: 3800,
    price: 55000000,
    availability: 'available',
    imageUrl: '/api/placeholder/800/600',
    features: ['Dedicated Work Zone', 'Smart Home Automation', 'Premium Clubhouse', 'Landscaped Gardens'],
    specifications: {
      flooring: ['Premium Italian marble in living areas', 'Wooden flooring in bedrooms'],
      electrical: ['Smart home automation ready', 'Dedicated IT infrastructure'],
      bathroom: ['Premium imported fittings', 'Rain showers', 'Jacuzzi in master bathroom']
    }
  },
  {
    id: 'unit-8',
    projectId: 'edge-4',
    type: '4 BHK + WFH Penthouse',
    bedrooms: 4,
    bathrooms: 5,
    area: 5200,
    price: 72000000,
    availability: 'sold',
    imageUrl: '/api/placeholder/800/600',
    features: ['Private Terrace', 'Co-working Spaces', 'Business Center', 'Rooftop Terrace'],
    specifications: {
      flooring: ['Premium Italian marble in living areas', 'Wooden flooring in bedrooms'],
      electrical: ['Smart home automation ready', 'Dedicated IT infrastructure'],
      bathroom: ['Premium imported fittings', 'Rain showers', 'Jacuzzi in master bathroom']
    }
  }
];

export const mockFaqs: FAQ[] = [
  {
    id: 'faq-1',
    projectId: 'greenfield-1',
    question: 'What are the key features of Greenfield apartments?',
    answer: 'Greenfield apartments feature 270° open views, personal foyers, green building certification, and world-class amenities.',
    tags: ['features', 'amenities', 'green building']
  },
  {
    id: 'faq-2',
    projectId: 'greenfield-1',
    question: 'What is the price range for apartments in Greenfield?',
    answer: 'The price range for apartments in Greenfield is between ₹2.2 Cr to ₹4.5 Cr.',
    tags: ['price', 'cost', 'budget']
  },
  {
    id: 'faq-3',
    projectId: 'splus-2',
    question: 'What types of commercial spaces are available in S Plus?',
    answer: 'S Plus offers premium showrooms and office spaces with high visibility on SP Ring Road.',
    tags: ['commercial', 'office', 'showroom']
  },
  {
    id: 'faq-4',
    projectId: 'splus-2',
    question: 'What parking facilities are available at S Plus?',
    answer: 'S Plus features Three-Level Basement Parking to accommodate the parking needs of businesses and their clients.',
    tags: ['parking', 'basement', 'vehicles']
  },
  {
    id: 'faq-5',
    projectId: 'skyview-3',
    question: 'What are the key amenities offered at SKYVIEW?',
    answer: 'SKYVIEW offers amenities such as a Sky Lounge, Infinity Swimming Pool, and a State-of-the-art Gymnasium.',
    tags: ['amenities', 'sky lounge', 'swimming pool']
  },
  {
    id: 'faq-6',
    projectId: 'skyview-3',
    question: 'Where is SKYVIEW located and what is its connectivity?',
    answer: 'SKYVIEW is located in GIFT City and is well-connected with SP Ring Road, the International Airport, and the Metro Transit System.',
    tags: ['location', 'connectivity', 'GIFT City']
  },
  {
    id: 'faq-7',
    projectId: 'edge-4',
    question: 'What makes EDGE apartments unique?',
    answer: 'EDGE apartments are designed as 4 BHK + Work From Home units, catering to modern professionals seeking luxury and functionality.',
    tags: ['WFH', 'work from home', 'luxury']
  },
  {
    id: 'faq-8',
    projectId: 'edge-4',
    question: 'What are the specifications of EDGE apartments?',
    answer: 'EDGE apartments feature premium Italian marble in living areas, wooden flooring in bedrooms, and smart home automation.',
    tags: ['specifications', 'flooring', 'smart home']
  }
];

export const mockFilterTags = [
  {
    id: 'filter-1',
    label: 'Sea View',
    query: 'Show me sea view properties'
  },
  {
    id: 'filter-2',
    label: 'Under ₹1 Cr',
    query: 'Show me properties under 1 crore'
  },
  {
    id: 'filter-3',
    label: 'Available Now',
    query: 'Show me immediately available units'
  },
  {
    id: 'filter-4',
    label: 'Green Building',
    query: 'Show me green certified buildings'
  }
];

export const mockProjects: Project[] = [
  {
    id: 'greenfield-1',
    name: 'Greenfield',
    location: 'Shantigram, Near SG Highway',
    description: 'Premium residential project offering 3 BHK apartments and exclusive penthouses with 270° open views. Features include green building certification, personal foyers, and world-class amenities.',
    status: 'Available',
    totalUnits: 240,
    availableUnits: 45,
    priceRange: {
      min: 22000000,
      max: 45000000
    },
    amenities: {
      community: [
        'Clubhouse with swimming pool',
        'Fully equipped gymnasium',
        'Children\'s play area',
        'Landscaped gardens'
      ],
      recreational: [
        'Jogging track',
        'Multi-purpose hall',
        'Indoor games room'
      ],
      convenience: [
        '24/7 security',
        'Power backup',
        'Rainwater harvesting'
      ]
    },
    specifications: {
      flooring: ['Vitrified tiles in living areas', 'Anti-skid tiles in bathrooms'],
      electrical: ['3 phase concealed ISI copper wiring', 'Modular switches and sockets'],
      toilets: ['Glazed/ceramic tiles up to lintel level', 'Branded EWC couple closets', 'Premium quality CP fittings']
    },
    parking: '2-level basement parking with designated spaces',
    connectivity: 'Excellent connectivity to SG Highway, SP Ring Road, and major business districts',
    developer: 'Shivalik Developers',
    completionDate: '2025-12-31',
    images: ['/api/placeholder/800/600']
  },
  {
    id: 'splus-2',
    name: 'S Plus',
    location: 'Ognaj, S.P. Ring Road',
    description: 'Modern commercial complex offering premium showrooms and office spaces with high visibility on SP Ring Road.',
    status: 'Under Construction',
    totalUnits: 120,
    availableUnits: 85,
    priceRange: {
      min: 8500000,
      max: 45000000
    },
    amenities: {
      business: [
        '9 High-Speed Elevators',
        'Owner-Exclusive Lifts',
        'Three-Level Basement Parking'
      ],
      convenience: [
        '24/7 Security',
        'Power Backup',
        'Fire Safety Systems',
        'Central Air Conditioning',
        'High-Speed Internet Ready'
      ]
    },
    specifications: {
      flooring: ['Vitrified flooring (600x1200) in main areas', 'Premium tiles (600x600) in toilets'],
      electrical: ['Three phase concealed copper wiring with ELCB/MCB protection', 'Adequate power points for commercial use'],
      toilets: ['Premium quality CP fittings', 'Modern sanitaryware']
    },
    parking: 'Three-Level Basement Parking',
    connectivity: 'Strategic location on SP Ring Road with high visibility and connectivity',
    developer: 'Shivalik Developers',
    completionDate: '2025-06-30',
    images: ['/api/placeholder/800/600']
  },
  {
    id: 'skyview-3',
    name: 'SKYVIEW',
    location: 'GIFT City',
    description: 'Ultra-luxury high-rise residential tower offering 2 BHK, 3 BHK apartments and exclusive penthouses with panoramic city views.',
    status: 'Ready to Move',
    totalUnits: 280,
    availableUnits: 18,
    priceRange: {
      min: 14000000,
      max: 60000000
    },
    amenities: {
      recreational: [
        'Sky Lounge',
        'Infinity Swimming Pool',
        'State-of-the-art Gymnasium',
        'Spa & Wellness Center',
        'Rooftop Garden'
      ],
      business: [
        'Business Center',
        'Concierge Services',
        'Valet Parking'
      ],
      convenience: [
        '8 High-Speed Passenger Lifts',
        '2 Service Lifts'
      ]
    },
    specifications: {
      flooring: ['Vitrified tiles in living areas and bedrooms', 'Natural granite/rustic tiles in balconies'],
      electrical: ['3 phase concealed ISI copper wiring', 'Provision for air conditioning in all rooms'],
      toilets: ['Glazed/ceramic tiles up to lintel level', 'Counter basin/wall hung basin', 'Branded EWC couple closets']
    },
    parking: 'Multi-level automated parking system',
    connectivity: '10 minutes from SP Ring Road, 15 minutes from International Airport, Metro connectivity',
    developer: 'Shivalik Developers',
    completionDate: '2024-03-31',
    images: ['/api/placeholder/800/600']
  },
  {
    id: 'edge-4',
    name: 'EDGE',
    location: 'Ambli',
    description: 'Exclusive 4 BHK + Work From Home apartments designed for modern professionals seeking luxury and functionality.',
    status: 'Upcoming',
    totalUnits: 60,
    availableUnits: 60,
    priceRange: {
      min: 35000000,
      max: 75000000
    },
    amenities: {
      business: [
        'Premium Clubhouse',
        'Co-working Spaces',
        'Business Center'
      ],
      recreational: [
        'Swimming Pool',
        'Gymnasium',
        'Spa',
        'Rooftop Terrace',
        'Landscaped Gardens'
      ],
      convenience: [
        'Dedicated Work Zones',
        'High-Speed Internet Infrastructure'
      ]
    },
    specifications: {
      flooring: ['Premium Italian marble in living areas', 'Wooden flooring in bedrooms'],
      electrical: ['Smart home automation ready', 'Dedicated IT infrastructure'],
      toilets: ['Premium imported fittings', 'Rain showers', 'Jacuzzi in master bathroom']
    },
    parking: 'Covered parking with EV charging points',
    connectivity: 'Prime location in Ambli with excellent connectivity to business districts',
    developer: 'Shivalik Developers',
    completionDate: '2026-12-31',
    images: ['/api/placeholder/800/600']
  }
];

// Export aliases for compatibility
export const units = mockUnits;
export const faqs = mockFaqs;
export const projects = mockProjects;
export const filterTags = mockFilterTags;
