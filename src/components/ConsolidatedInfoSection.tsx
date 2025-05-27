
import React, { useState } from 'react';
import { useRealEstate } from '@/context/RealEstateContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, FileText, Zap, Settings } from 'lucide-react';

const ConsolidatedInfoSection = () => {
  const { currentProject } = useRealEstate();
  const [expandedSections, setExpandedSections] = useState<string[]>(['overview']);

  if (!currentProject) return null;

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isExpanded = (sectionId: string) => expandedSections.includes(sectionId);

  const sections = [
    {
      id: 'overview',
      title: 'Project Overview',
      icon: <FileText className="h-4 w-4" />,
      content: currentProject.description,
      priority: 'high'
    },
    {
      id: 'amenities',
      title: 'Amenities & Facilities',
      icon: <Zap className="h-4 w-4" />,
      content: currentProject.amenities,
      priority: 'medium'
    },
    {
      id: 'specifications',
      title: 'Technical Specifications',
      icon: <Settings className="h-4 w-4" />,
      content: currentProject.specifications,
      priority: 'low'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">Detailed Information</CardTitle>
        <p className="text-sm text-gray-600">
          Comprehensive project details (Overview shown by default)
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {sections.map((section) => (
          section.content && (
            <Collapsible 
              key={section.id} 
              open={isExpanded(section.id)}
              onOpenChange={() => toggleSection(section.id)}
            >
              <CollapsibleTrigger className={`w-full p-4 rounded-lg border text-left transition-all hover:bg-gray-50 focus:bg-gray-50 focus:outline-2 focus:outline-blue-600 ${
                section.priority === 'high' 
                  ? 'border-blue-200 bg-blue-50' 
                  : 'border-gray-200 bg-white'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className={section.priority === 'high' ? 'text-blue-600' : 'text-gray-600'}>
                      {section.icon}
                    </span>
                    <h4 className={`font-semibold ${
                      section.priority === 'high' ? 'text-blue-900' : 'text-gray-900'
                    }`}>
                      {section.title}
                      {section.priority === 'high' && (
                        <span className="ml-2 text-xs font-normal text-blue-600">• Default</span>
                      )}
                    </h4>
                  </div>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      isExpanded(section.id) ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-3">
                <div className="p-6 bg-gray-50 rounded-lg">
                  {/* Overview Content */}
                  {section.id === 'overview' && typeof section.content === 'string' && (
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 leading-relaxed">{section.content}</p>
                      
                      {/* Additional Overview Details */}
                      {currentProject.features && (
                        <div className="mt-6">
                          <h5 className="font-medium text-gray-800 mb-3">Key Features:</h5>
                          <div className="flex flex-wrap gap-2">
                            {currentProject.features.map((feature, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Amenities Content */}
                  {section.id === 'amenities' && currentProject.amenities && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(currentProject.amenities).map(([category, items]) => (
                        Array.isArray(items) && items.length > 0 && (
                          <div key={category}>
                            <h5 className="font-medium text-gray-800 mb-3 capitalize">{category}:</h5>
                            <ul className="space-y-1">
                              {items.map((item, index) => (
                                <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      ))}
                    </div>
                  )}

                  {/* Specifications Content */}
                  {section.id === 'specifications' && currentProject.specifications && (
                    <div className="space-y-6">
                      {Object.entries(currentProject.specifications).map(([category, specs]) => (
                        <div key={category}>
                          <h5 className="font-medium text-gray-800 mb-3 capitalize">{category}:</h5>
                          <div className="ml-4">
                            {typeof specs === 'object' && !Array.isArray(specs) ? (
                              <div className="space-y-2">
                                {Object.entries(specs).map(([key, value]) => (
                                  <div key={key} className="text-sm">
                                    <span className="font-medium text-gray-700">{key}:</span>
                                    <span className="ml-2 text-gray-600">{value}</span>
                                  </div>
                                ))}
                              </div>
                            ) : Array.isArray(specs) ? (
                              <ul className="space-y-1">
                                {specs.map((item, index) => (
                                  <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-700">{specs}</p>
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
      </CardContent>
    </Card>
  );
};

export default ConsolidatedInfoSection;
