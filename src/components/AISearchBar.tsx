
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, SendIcon } from 'lucide-react';

interface AISearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  initialQuery?: string;
}

const queryTemplates = [
  "Tell me about properties in",
  "What are the amenities in",
  "Show me apartments with",
  "What is the price range for",
  "How many BHK options are available in",
  "Tell me about the location of",
  "What are the specifications of units in",
  "Show me penthouses in",
  "What is the construction status of",
  "What payment plans are available for"
];

const AISearchBar: React.FC<AISearchBarProps> = ({ 
  onSearch, 
  isSearching, 
  initialQuery = '' 
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Update query when initialQuery changes
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setSuggestions([]);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Generate suggestions based on input
    if (value.trim() && value.length > 2) {
      const newSuggestions = queryTemplates
        .filter(template => template.toLowerCase().includes(value.toLowerCase()) || 
                           value.toLowerCase().includes(template.toLowerCase().slice(0, 5)))
        .slice(0, 3);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };
  
  const handleFocus = () => {
    setFocused(true);
  };
  
  const handleBlur = () => {
    // Delayed to allow clicking on suggestions
    setTimeout(() => {
      setFocused(false);
    }, 200);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative">
          <Input
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Ask anything about the property..."
            className="pr-16 md:pr-24 pl-9 md:pl-10 py-5 md:py-6 min-h-[56px] text-sm md:text-base rounded-full border-gray-200 focus:border-primary shadow-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button 
              type="submit" 
              size="sm" 
              disabled={isSearching || !query.trim()}
              className="rounded-full px-3 md:px-4 text-xs md:text-sm h-8 md:h-9"
            >
              {isSearching ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Searching</span>
                </span>
              ) : (
                <span className="flex items-center">
                  <SendIcon className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1" /> Send
                </span>
              )}
            </Button>
          </div>
        </div>
      </form>
      
      {focused && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 bg-white mt-1 rounded-md shadow-md z-10 border border-gray-200">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm md:text-base"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AISearchBar;
