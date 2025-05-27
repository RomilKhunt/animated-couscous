import React, { useState } from 'react';
import { useRealEstate } from '@/context/RealEstateContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, MapPin, DollarSign, Calendar, Building2, CheckCircle, Clock } from 'lucide-react';

const ScannablePropertyOverview = () => {
  const { currentProject, projectUnits } = useRealEstate();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  if (!currentProject) return null;

  const availableUnits = projectUnits.filter(unit => unit.availability === 'available').length;
  const totalUnits = projectUnits.length;
  
  // Calculate price range
  const prices = projectUnits.map(unit => unit.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isExpanded = (sectionId: string) => expandedSections.includes(sectionId);

  // Key selling points for immediate visibility with improved responsive layout
  const keyPoints = [
    {
      icon: <DollarSign className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" aria-hidden="true" />,
      label: 'Price Range',
      value: `₹${(minPrice / 10000000).toFixed(2)} - ${(maxPrice / 10000000).toFixed(2)} Cr`,
      priority: 'high'
    },
    {
      icon: <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-600" aria-hidden="true" />,
      label: 'Available Units',
      value: `${availableUnits} of ${totalUnits}`,
      priority: 'high'
    },
    {
      icon: <MapPin className="h-4 w-4 lg:h-5 lg:w-5 text-blue-600" aria-hidden="true" />,
      label: 'Location',
      value: currentProject.location,
      priority: 'high'
    },
    {
      icon: <Building2 className="h-4 w-4 lg:h-5 lg:w-5 text-purple-600" aria-hidden="true" />,
      label: 'Property Type',
      value: currentProject.type,
      priority: 'medium'
    }
  ];

  const sections = [
    {
      id: 'location-details',
      title: 'Location & Connectivity',
      priority: 'high',
      content: currentProject.transportConnections || currentProject.fullAddress
    },
    {
      id: 'amenities',
      title: 'Key Amenities',
      priority: 'high',
      content: currentProject.amenities
    },
    {
      id: 'specifications',
      title: 'Specifications',
      priority: 'medium',
      content: currentProject.specifications
    },
    {
      id: 'features',
      title: 'Features & Highlights',
      priority: 'medium',
      content: currentProject.features
    }
  ];

  return (
    <Card className="border-l-4 border-l-primary w-full max-w-none">
      <CardHeader className="pb-4 lg:pb-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-6">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
              {currentProject.name}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2 lg:mt-3">
              <MapPin className="h-4 w-4 lg:h-5 lg:w-5 text-gray-500 flex-shrink-0" aria-hidden="true" />
              <p className="text-gray-600 font-medium text-sm lg:text-base xl:text-lg min-w-0">
                {currentProject.location}
                {currentProject.developer && ` • by ${currentProject.developer}`}
              </p>
            </div>
          </div>
          <div className="flex flex-row lg:flex-col gap-2 lg:items-end flex-wrap lg:flex-nowrap">
            <Badge 
              variant={currentProject.status === 'ready' ? 'default' : 'secondary'}
              className={`${currentProject.status === 'ready' ? 'bg-green-100 text-green-800' : ''} text-xs lg:text-sm px-3 py-1 lg:px-4 lg:py-2 flex items-center gap-1`}
            >
              {currentProject.status === 'ready' ? (
                <>
                  <CheckCircle className="h-3 w-3 lg:h-4 lg:w-4" aria-hidden="true" />
                  Ready to Move
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3 lg:h-4 lg:w-4" aria-hidden="true" />
                  {currentProject.status}
                </>
              )}
            </Badge>
            {currentProject.certification && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs lg:text-sm px-3 py-1 lg:px-4 lg:py-2">
                {currentProject.certification}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 lg:space-y-8">
        {/* Critical Information - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {keyPoints.map((point, index) => (
            <div 
              key={index}
              className={`p-4 lg:p-5 xl:p-6 rounded-lg border-l-4 ${
                point.priority === 'high' 
                  ? 'bg-blue-50 border-l-blue-500' 
                  : 'bg-gray-50 border-l-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 lg:mb-3">
                {point.icon}
                <p className="text-xs lg:text-sm font-medium text-gray-600">{point.label}</p>
              </div>
              <p className={`font-bold break-words ${
                point.priority === 'high' 
                  ? 'text-base lg:text-lg xl:text-xl' 
                  : 'text-sm lg:text-base'
              }`}>
                {point.value}
              </p>
            </div>
          ))}
        </div>

        {/* Project Description - Improved responsive layout */}
        {currentProject.description && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6 xl:p-8">
            <h4 className="font-semibold text-gray-900 mb-3 lg:mb-4 text-base lg:text-lg">Overview</h4>
            <p className="text-sm lg:text-base leading-relaxed text-gray-700">{currentProject.description}</p>
          </div>
        )}

        {/* Progressive Disclosure Sections with improved accessibility */}
        <div className="space-y-4 lg:space-y-6">
          {sections.map((section) => (
            section.content && (
              <Collapsible 
                key={section.id} 
                open={isExpanded(section.id)}
              >
                <CollapsibleTrigger 
                  onClick={() => toggleSection(section.id)}
                  className={`w-full p-4 lg:p-5 xl:p-6 rounded-lg border text-left transition-all hover:bg-gray-50 focus:bg-gray-50 focus:outline-2 focus:outline-blue-600 ${
                    section.priority === 'high' 
                      ? 'border-blue-200 bg-blue-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                  aria-expanded={isExpanded(section.id)}
                  aria-controls={`section-content-${section.id}`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className={`font-semibold text-sm lg:text-base xl:text-lg ${
                      section.priority === 'high' ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {section.title}
                      {section.priority === 'high' && (
                        <span className="ml-2 text-xs font-normal text-blue-600">• Essential Info</span>
                      )}
                    </h4>
                    <ChevronDown 
                      className={`h-4 w-4 lg:h-5 lg:w-5 transition-transform flex-shrink-0 ${
                        isExpanded(section.id) ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent 
                  className="mt-3 lg:mt-4"
                  id={`section-content-${section.id}`}
                >
                  <div className="p-4 lg:p-6 xl:p-8 bg-gray-50 rounded-lg">
                    {/* Location details with improved structure */}
                    {section.id === 'location-details' && (
                      <div className="space-y-4 lg:space-y-6">
                        {currentProject.transportConnections?.distances && (
                          <div>
                            <p className="font-medium text-gray-800 mb-3 lg:mb-4 text-sm lg:text-base">• Key Distances:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 ml-4">
                              {Object.entries(currentProject.transportConnections.distances).map(([place, distance]) => (
                                <div key={place} className="text-sm lg:text-base">
                                  <strong>{place}:</strong> {distance}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {currentProject.transportConnections?.metro && (
                          <div>
                            <p className="font-medium text-gray-800 mb-1">• Metro Access:</p>
                            <p className="text-sm ml-4">{currentProject.transportConnections.metro.join(', ')}</p>
                          </div>
                        )}
                        {currentProject.fullAddress && (
                          <div>
                            <p className="font-medium text-gray-800 mb-1">• Full Address:</p>
                            <p className="text-sm ml-4">{currentProject.fullAddress}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Amenities with improved responsive grid */}
                    {section.id === 'amenities' && currentProject.amenities && (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        {Object.entries(currentProject.amenities).map(([category, items]) => (
                          Array.isArray(items) && items.length > 0 && (
                            <div key={category}>
                              <p className="font-medium text-gray-800 mb-2 lg:mb-3 capitalize text-sm lg:text-base">• {category}:</p>
                              <ul className="text-sm lg:text-base space-y-1 ml-4">
                                {items.map((item, index) => (
                                  <li key={index}>- {item}</li>
                                ))}
                              </ul>
                            </div>
                          )
                        ))}
                      </div>
                    )}

                    {/* Features with improved responsive layout */}
                    {section.id === 'features' && currentProject.features && (
                      <div className="flex flex-wrap gap-2 lg:gap-3">
                        {currentProject.features.map((feature, index) => (
                          <span 
                            key={index}
                            className="px-3 py-2 lg:px-4 lg:py-2 bg-white border border-gray-200 rounded-full text-sm lg:text-base font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Specifications with improved structure */}
                    {section.id === 'specifications' && currentProject.specifications && (
                      <div className="space-y-4 lg:space-y-6">
                        {Object.entries(currentProject.specifications).map(([category, specs]) => (
                          <div key={category}>
                            <p className="font-medium text-gray-800 mb-2 lg:mb-3 capitalize text-sm lg:text-base">• {category}:</p>
                            <div className="text-sm lg:text-base ml-4">
                              {typeof specs === 'object' && !Array.isArray(specs) ? (
                                <div className="space-y-1 lg:space-y-2">
                                  {Object.entries(specs).map(([key, value]) => (
                                    <div key={key} className="break-words"><strong>{key}:</strong> {value}</div>
                                  ))}
                                </div>
                              ) : Array.isArray(specs) ? (
                                <ul className="space-y-1">
                                  {specs.map((item, index) => (
                                    <li key={index}>- {item}</li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="break-words">{specs}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          ))}
        </div>

        {/* RERA Information - Enhanced accessibility and responsiveness */}
        {currentProject.reraNumber && (
          <div className="mt-6 lg:mt-8 p-4 lg:p-5 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm lg:text-base break-all">
              <strong className="text-yellow-800">RERA Number:</strong> 
              <span className="font-mono ml-2 select-all">{currentProject.reraNumber}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScannablePropertyOverview;
