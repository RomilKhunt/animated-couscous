import React, { useState, useEffect } from 'react';
import { useRealEstate } from '@/context/RealEstateContext';
import { processQuery, QueryResult } from '@/utils/aiHelpers';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ProjectSidebar from '@/components/ProjectSidebar';
import PredictiveSearchBar from '@/components/PredictiveSearchBar';
import AIResponseCard from '@/components/AIResponseCard';
import StreamlinedFilterBar from '@/components/StreamlinedFilterBar';
import ProjectSummaryCard from '@/components/ProjectSummaryCard';
import QuickActionsPanel from '@/components/QuickActionsPanel';
import ConsolidatedInfoSection from '@/components/ConsolidatedInfoSection';
import { MessageCircle, Zap } from 'lucide-react';

const Index = () => {
  const {
    currentProject,
    projectUnits,
    projectFaqs,
    availableFilters
  } = useRealEstate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [responseTime, setResponseTime] = useState<number | null>(null);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory).slice(0, 5));
      } catch (e) {
        console.error('Error parsing search history:', e);
      }
    }
  }, []);

  // Save search history to localStorage when it changes
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    const startTime = Date.now();
    setSearchQuery(query);
    setIsSearching(true);
    setResponseTime(null);

    // Add to history if not a duplicate of the most recent query
    if (!searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 4)]);
    } else {
      setSearchHistory(prev => [query, ...prev.filter(item => item !== query)]);
    }

    try {
      const result = await processQuery(query, currentProject, projectUnits, projectFaqs);
      setQueryResult(result);
      setResponseTime(Date.now() - startTime);
    } catch (error) {
      console.error('Search failed:', error);
      setQueryResult({
        text: 'Sorry, there was an error processing your request. Please try again.',
        type: 'general'
      });
      setResponseTime(Date.now() - startTime);
    } finally {
      setIsSearching(false);
    }
  };

  const handleQuickResponse = (response: string) => {
    setQueryResult({
      text: response,
      type: 'general',
      isLLMGenerated: true
    });
  };

  // Smart suggested queries (context-aware, no duplicates)
  const smartSuggestions = [
    `How many ${currentProject?.type || 'units'} are available in ${currentProject?.name || 'this project'}?`,
    `Show me detailed amenities not mentioned in the overview`,
    `What are the payment plans and construction timeline?`,
    `Compare this project with nearby alternatives`
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 w-full">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50 outline-none focus:outline-2 focus:outline-blue-600" 
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      
      <ProjectSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-[1000px] mx-auto px-6 sm:px-8 lg:px-10 py-6">
          <header className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center min-w-0 flex-1">
              <SidebarTrigger 
                aria-label="Toggle sidebar navigation" 
                className="focus:outline-2 focus:outline-blue-600" 
              />
              <h1 className="text-2xl lg:text-3xl font-bold ml-3 text-gray-900 truncate">
                Real Estate Sales Assistant
              </h1>
            </div>
            {responseTime && (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border flex-shrink-0">
                <Zap size={14} className="text-green-500" aria-hidden="true" />
                <span>Response: {responseTime}ms</span>
              </div>
            )}
          </header>
          
          <main id="main-content" className="space-y-6">
            {/* Single Source of Truth - Project Summary */}
            {currentProject && (
              <section aria-labelledby="project-summary">
                <h2 id="project-summary" className="sr-only">Project Summary</h2>
                <ProjectSummaryCard />
              </section>
            )}
            
            {/* Quick Filters Section */}
            <section aria-labelledby="filters" className="w-full">
              <div className="bg-white p-6 rounded-lg border">
                <h2 id="filters" className="text-base font-medium text-gray-900 mb-4">Quick Filters</h2>
                <div className="space-y-6">
                  {/* Filter Categories */}
                  <div className="flex flex-wrap gap-4">
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-base font-medium text-gray-700">
                      <span className="w-6 h-6">🏠</span>
                      Property Type
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-base font-medium text-gray-700">
                      <span className="w-6 h-6">💰</span>
                      Budget Range
                    </button>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-base font-medium text-gray-700">
                      <span className="w-6 h-6">✨</span>
                      Key Features
                    </button>
                  </div>

                  {/* Quick Access Tags */}
                  <div>
                    <p className="text-base text-gray-600 mb-3">Quick access:</p>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-base hover:bg-blue-100">
                        Popular Units
                      </button>
                      <button className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-base hover:bg-green-100">
                        Current Offers
                      </button>
                      <button className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-base hover:bg-orange-100">
                        Ready to Move
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <div className="space-y-6">
              {/* Smart AI Search */}
              <section aria-labelledby="ai-search" className="w-full">
                <h2 id="ai-search" className="sr-only">AI Search</h2>
                <div className="bg-white p-4 rounded-lg border">
                  <div className="space-y-4">
                    <PredictiveSearchBar 
                      onSearch={handleSearch} 
                      isSearching={isSearching} 
                      initialQuery={searchQuery} 
                    />
                    
                    {/* Smart Suggestions */}
                    <div className="mt-4">
                      <p className="text-base text-gray-600 mb-2">Try asking:</p>
                      <div className="flex flex-wrap gap-2">
                        {smartSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(suggestion)}
                            className="text-base px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-gray-700 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {isSearching && (
                <div className="flex justify-center py-8" role="status" aria-live="polite">
                  <div className="animate-pulse flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20" aria-hidden="true"></div>
                    <div className="space-y-2">
                      <div className="h-2 w-48 rounded bg-primary/20" aria-hidden="true"></div>
                      <div className="h-2 w-40 rounded bg-primary/20" aria-hidden="true"></div>
                    </div>
                    <div className="text-sm text-gray-500">AI is processing...</div>
                  </div>
                </div>
              )}
              
              {queryResult && !isSearching && (
                <section aria-labelledby="search-results" className="w-full">
                  <h2 id="search-results" className="sr-only">Search Results</h2>
                  <div className="bg-white p-6 rounded-lg border">
                    <AIResponseCard result={queryResult} />
                  </div>
                </section>
              )}
            </div>
            
            {/* Consolidated Info Section - Single Expandable */}
            {currentProject && (
              <section aria-labelledby="detailed-info">
                <h2 id="detailed-info" className="sr-only">Detailed Property Information</h2>
                <ConsolidatedInfoSection />
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
