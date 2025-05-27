
import React, { useState } from 'react';
import { useRealEstate } from '@/context/RealEstateContext';
import { Button } from '@/components/ui/button';
import { Home, DollarSign, Eye, Building2 } from 'lucide-react';

interface StreamlinedFilterBarProps {
  onFilterSelect: (query: string) => void;
}

const StreamlinedFilterBar: React.FC<StreamlinedFilterBarProps> = ({ onFilterSelect }) => {
  const { currentProject } = useRealEstate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filterCategories = [
    {
      id: 'property-type',
      label: 'Property Type',
      icon: <Home size={14} />,
      filters: [
        { label: '2 BHK', query: 'Show me all 2 BHK apartments with detailed specifications' },
        { label: '3 BHK', query: 'Show me all 3 BHK apartments with detailed specifications' },
        { label: '4 BHK', query: 'Show me all 4 BHK apartments with detailed specifications' },
        { label: 'Penthouse', query: 'Show me all penthouse units with premium features' }
      ]
    },
    {
      id: 'budget',
      label: 'Budget Range',
      icon: <DollarSign size={14} />,
      filters: [
        { label: 'Under ₹1 Cr', query: 'Show me all units priced under 1 crore with payment options' },
        { label: '₹1-2 Cr', query: 'Show me all units between 1-2 crores with financing details' },
        { label: 'Over ₹2 Cr', query: 'Show me premium units over 2 crores with luxury features' }
      ]
    },
    {
      id: 'features',
      label: 'Key Features',
      icon: <Eye size={14} />,
      filters: [
        { label: 'Sea View', query: 'Show me all sea-facing units with view details' },
        { label: 'Green Building', query: 'Tell me about eco-friendly features and certifications' },
        { label: 'Near Schools', query: 'Show me units near educational institutions' },
        { label: 'Metro Access', query: 'Show me units with metro connectivity details' }
      ]
    }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const handleFilterClick = (query: string) => {
    onFilterSelect(query);
    setActiveCategory(null);
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h3>
      
      {/* Category Headers */}
      <div className="flex flex-wrap gap-3 mb-4">
        {filterCategories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryToggle(category.id)}
            className="flex items-center gap-2"
          >
            {category.icon}
            {category.label}
          </Button>
        ))}
      </div>

      {/* Active Category Filters */}
      {activeCategory && (
        <div className="border-t pt-4">
          <div className="flex flex-wrap gap-2">
            {filterCategories
              .find(cat => cat.id === activeCategory)
              ?.filters.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => handleFilterClick(filter.query)}
                  className="px-3 py-2 text-sm bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-colors"
                >
                  {filter.label}
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Quick Access Filters (Always Visible) */}
      {!activeCategory && (
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600 mb-3">Quick access:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleFilterClick('Show me the most popular unit configurations')}
              className="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              Popular Units
            </button>
            <button
              onClick={() => handleFilterClick('What are the current offers and discounts?')}
              className="px-3 py-2 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
            >
              Current Offers
            </button>
            <button
              onClick={() => handleFilterClick('Show me ready-to-move units')}
              className="px-3 py-2 text-sm bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors"
            >
              Ready to Move
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamlinedFilterBar;
