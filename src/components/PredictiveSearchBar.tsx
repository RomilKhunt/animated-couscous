import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SendIcon, DollarSign, MapPin, Calendar, Building } from 'lucide-react';
import { useRealEstate } from '@/context/RealEstateContext';
import { Unit } from '@/models';

interface PredictiveSearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  initialQuery?: string;
}

interface QuickSuggestion {
  id: string;
  label: string;
  query: string;
  icon: React.ReactNode;
  category: 'pricing' | 'availability' | 'location' | 'amenities';
}

const PredictiveSearchBar: React.FC<PredictiveSearchBarProps> = ({ 
  onSearch, 
  isSearching, 
  initialQuery = '' 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  const [predictions, setPredictions] = useState<Unit[]>([]);
  const [quickSuggestions, setQuickSuggestions] = useState<QuickSuggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentProject, projectUnits } = useRealEstate();
  
  // Generate contextual quick suggestions based on current project
  useEffect(() => {
    if (currentProject) {
      const suggestions: QuickSuggestion[] = [
        {
          id: 'pricing',
          label: 'Price Range',
          query: `What is the price range for ${currentProject.name}?`,
          icon: <DollarSign size={14} />,
          category: 'pricing'
        },
        {
          id: 'availability',
          label: 'Available Units',
          query: `Show me available units in ${currentProject.name}`,
          icon: <Calendar size={14} />,
          category: 'availability'
        },
        {
          id: 'location',
          label: 'Location Details',
          query: `Tell me about the location of ${currentProject.name}`,
          icon: <MapPin size={14} />,
          category: 'location'
        },
        {
          id: 'amenities',
          label: 'Key Amenities',
          query: `What are the main amenities in ${currentProject.name}?`,
          icon: <Building size={14} />,
          category: 'amenities'
        }
      ];
      setQuickSuggestions(suggestions);
    }
  }, [currentProject]);

  // Predictive search functionality
  useEffect(() => {
    if (query.trim() && query.length > 1) {
      const filteredUnits = projectUnits.filter(unit => {
        const matchesType = unit.type.toLowerCase().includes(query.toLowerCase());
        const matchesFeatures = unit.features?.some(feature => 
          feature.toLowerCase().includes(query.toLowerCase())
        );
        const matchesPrice = query.includes('cr') || query.includes('lakh') || query.includes('₹');
        
        return matchesType || matchesFeatures || matchesPrice;
      }).slice(0, 3); // Show max 3 predictions
      
      setPredictions(filteredUnits);
    } else {
      setPredictions([]);
    }
  }, [query, projectUnits]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setPredictions([]);
      setFocused(false);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setPredictions([]);
    setFocused(false);
  };
  
  const handleQuickSuggestionClick = (suggestion: QuickSuggestion) => {
    onSearch(suggestion.query);
    setPredictions([]);
    setFocused(false);
  };

  const handleFocus = () => {
    setFocused(true);
  };
  
  const handleBlur = () => {
    setTimeout(() => {
      setFocused(false);
    }, 200);
  };

  return (
    <div className="relative w-full">
      {/* Quick Suggestions - Improved responsive layout */}
      <div className="mb-4 lg:mb-6">
        <div className="flex flex-wrap gap-2 lg:gap-3 justify-center sm:justify-start">
          {quickSuggestions.map((suggestion) => (
            <button
              key={suggestion.id}
              onClick={() => handleQuickSuggestionClick(suggestion)}
              className="inline-flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:border-primary focus:bg-gray-50 focus:border-primary transition-colors focus:outline-2 focus:outline-blue-600 min-h-[40px]"
              disabled={isSearching}
              aria-label={`Quick search: ${suggestion.label}`}
            >
              <span aria-hidden="true">{suggestion.icon}</span>
              {suggestion.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative">
          <Input
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Ask about pricing, availability, location, amenities..."
            className="pr-20 sm:pr-24 pl-10 sm:pl-12 py-6 sm:py-7 lg:py-8 min-h-[56px] sm:min-h-[64px] text-sm sm:text-base lg:text-lg rounded-xl border-gray-200 focus:border-primary shadow-sm focus:ring-2 focus:ring-blue-600/20"
            aria-label="Search for property information"
            aria-describedby="search-instructions"
          />
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" aria-hidden="true" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4">
            <Button 
              type="submit" 
              size="sm" 
              disabled={isSearching || !query.trim()}
              className="rounded-full px-4 sm:px-6 lg:px-8 text-xs sm:text-sm lg:text-base h-9 sm:h-10 lg:h-12 focus:outline-2 focus:outline-blue-600"
              aria-label={isSearching ? "Searching..." : "Submit search"}
            >
              {isSearching ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Searching</span>
                </span>
              ) : (
                <span className="flex items-center">
                  <SendIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-2" aria-hidden="true" /> Send
                </span>
              )}
            </Button>
          </div>
        </div>
        <div id="search-instructions" className="sr-only">
          Type your question about property pricing, availability, location, or amenities and press Enter or click Send to search.
        </div>
      </form>
      
      {/* Predictive Results Dropdown - Enhanced accessibility */}
      {focused && (predictions.length > 0 || query.length > 1) && (
        <div 
          className="absolute left-0 right-0 bg-white mt-2 rounded-xl shadow-lg z-20 border border-gray-200 max-h-96 overflow-y-auto"
          role="listbox"
          aria-label="Search suggestions"
        >
          {predictions.length > 0 && (
            <div className="p-4 lg:p-6">
              <h4 className="text-xs font-semibold text-gray-500 mb-3 lg:mb-4 uppercase tracking-wide">
                Matching Properties
              </h4>
              {predictions.map((unit) => (
                <div 
                  key={unit.id}
                  className="p-4 lg:p-5 hover:bg-gray-50 focus:bg-gray-50 cursor-pointer rounded-lg mb-3 last:mb-0 border border-gray-100 focus:outline-2 focus:outline-blue-600"
                  onClick={() => handleSuggestionClick(`Show me details for ${unit.type} unit ${unit.unitNumber}`)}
                  role="option"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSuggestionClick(`Show me details for ${unit.type} unit ${unit.unitNumber}`);
                    }
                  }}
                  aria-label={`${unit.type} unit ${unit.unitNumber}, ${unit.area} sq ft, ₹${(unit.price / 10000000).toFixed(2)} Cr, ${unit.availability === 'available' ? 'Available' : 'Sold'}`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm lg:text-base">{unit.type} - Unit {unit.unitNumber}</p>
                      <p className="text-xs lg:text-sm text-gray-600 mt-1">{unit.area} sq ft</p>
                      {unit.features && unit.features.length > 0 && (
                        <p className="text-xs lg:text-sm text-gray-500 mt-2 line-clamp-2">
                          {unit.features.slice(0, 2).join(', ')}
                        </p>
                      )}
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
                      <p className="font-semibold text-sm lg:text-base">₹{(unit.price / 10000000).toFixed(2)} Cr</p>
                      <span className={`inline-block px-2 py-1 lg:px-3 lg:py-1 rounded-full text-xs lg:text-sm font-medium mt-1 ${
                        unit.availability === 'available' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {unit.availability === 'available' ? 'Available' : 'Sold'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {query.length > 1 && predictions.length === 0 && (
            <div className="p-6 text-center">
              <p className="text-sm lg:text-base text-gray-500">No matching properties found</p>
              <p className="text-xs lg:text-sm text-gray-400 mt-2">Try searching for "3 BHK", "under 2 crore", or "sea view"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PredictiveSearchBar;
