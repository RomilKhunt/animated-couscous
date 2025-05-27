
import React, { useState } from 'react';
import { FilterTag } from '../models';
import { useRealEstate } from '@/context/RealEstateContext';
import { DollarSign, Calendar, MapPin, Home, Zap, Building2, Eye } from 'lucide-react';

interface EnhancedFilterTagsProps {
  filters: FilterTag[];
  onFilterSelect: (query: string) => void;
}

interface FilterSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  filters: {
    id: string;
    label: string;
    query: string;
    icon: React.ReactNode;
  }[];
}

const EnhancedFilterTags: React.FC<EnhancedFilterTagsProps> = ({
  filters,
  onFilterSelect
}) => {
  const { currentProject, projectUnits } = useRealEstate();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Organized filter sections
  const filterSections: FilterSection[] = [
    {
      id: 'budget-availability',
      title: 'Budget & Availability',
      icon: <DollarSign size={14} />,
      filters: [
        {
          id: 'under-1cr',
          label: 'Under ₹1 Cr',
          query: 'Show me properties under 1 crore',
          icon: <DollarSign size={12} />
        },
        {
          id: 'under-2cr',
          label: 'Under ₹2 Cr',
          query: 'Show me properties under 2 crore',
          icon: <DollarSign size={12} />
        },
        {
          id: 'available-now',
          label: 'Available Now',
          query: 'Show me immediately available units',
          icon: <Calendar size={12} />
        },
        {
          id: 'upcoming',
          label: 'Upcoming',
          query: 'Show me upcoming properties',
          icon: <Calendar size={12} />
        }
      ]
    },
    {
      id: 'property-type',
      title: 'Property Type & Configuration',
      icon: <Home size={14} />,
      filters: [
        {
          id: '2bhk',
          label: '2 BHK',
          query: 'Show me 2 BHK apartments',
          icon: <Home size={12} />
        },
        {
          id: '3bhk',
          label: '3 BHK',
          query: 'Show me 3 BHK apartments',
          icon: <Home size={12} />
        },
        {
          id: 'penthouse',
          label: 'Penthouses',
          query: 'Show me penthouse apartments',
          icon: <Building2 size={12} />
        },
        {
          id: 'studio',
          label: 'Studio Apartments',
          query: 'Show me studio apartments',
          icon: <Home size={12} />
        }
      ]
    },
    {
      id: 'location-features',
      title: 'Location & Features',
      icon: <MapPin size={14} />,
      filters: [
        {
          id: 'sea-view',
          label: 'Sea View',
          query: 'Show me sea view properties',
          icon: <Eye size={12} />
        },
        {
          id: 'green-building',
          label: 'Green Building',
          query: 'Show me green certified buildings',
          icon: <Zap size={12} />
        },
        {
          id: 'near-highway',
          label: 'Near Highway',
          query: 'Show me properties near highway',
          icon: <MapPin size={12} />
        },
        {
          id: 'pre-certified',
          label: 'Pre-certified Projects',
          query: 'Show me pre-certified projects',
          icon: <Building2 size={12} />
        }
      ]
    }
  ];

  const handleSectionToggle = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  const getVisibleFilters = () => {
    if (activeSection) {
      const section = filterSections.find(s => s.id === activeSection);
      return section ? section.filters : [];
    }
    // Show 2 priority filters from each section when collapsed
    return filterSections.flatMap(section => section.filters.slice(0, 2));
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {/* Section Headers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {filterSections.map(section => (
          <button
            key={section.id}
            onClick={() => handleSectionToggle(section.id)}
            className={`p-3 rounded-lg border text-left transition-all hover:shadow-sm focus:outline-2 focus:outline-blue-600 ${
              activeSection === section.id 
                ? 'bg-primary text-white border-primary shadow-sm' 
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-primary'
            }`}
          >
            <div className="flex items-center gap-2">
              {section.icon}
              <span className="font-medium text-sm">{section.title}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Subtle divider */}
      <div className="border-t border-gray-100 my-4"></div>

      {/* Filter Tags */}
      <div className="space-y-3">
        {activeSection && (
          <div className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg text-center">
            <strong>
              {filterSections.find(s => s.id === activeSection)?.title}
            </strong>
            <span className="ml-2">
              ({filterSections.find(s => s.id === activeSection)?.filters.length} filters)
            </span>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2">
          {/* Original filters (if any) */}
          {filters.slice(0, 2).map(filter => (
            <button
              key={filter.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 rounded-full hover:bg-blue-100 transition-colors"
              onClick={() => onFilterSelect(filter.query)}
            >
              {filter.label}
            </button>
          ))}

          {/* Organized filters */}
          {getVisibleFilters().map(filter => (
            <button
              key={filter.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-primary transition-all"
              onClick={() => onFilterSelect(filter.query)}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}

          {!activeSection && (
            <button
              onClick={() => setActiveSection('budget-availability')}
              className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors border border-dashed border-gray-300 rounded-full hover:border-gray-400"
            >
              View All Filters
            </button>
          )}

          {activeSection && (
            <button
              onClick={() => setActiveSection(null)}
              className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedFilterTags;
