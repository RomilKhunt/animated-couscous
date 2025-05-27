
import React from 'react';
import { useRealEstate } from '@/context/RealEstateContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Building2, CheckCircle, Clock, User } from 'lucide-react';

const ProjectSummaryCard = () => {
  const { currentProject, projectUnits } = useRealEstate();

  if (!currentProject) return null;

  const availableUnits = projectUnits.filter(unit => unit.availability === 'available').length;
  const totalUnits = projectUnits.length;
  
  // Calculate price range
  const prices = projectUnits.map(unit => unit.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const keyMetrics = [
    {
      icon: <MapPin className="h-5 w-5 text-blue-600" />,
      label: 'Location',
      value: currentProject.location
    },
    {
      icon: <User className="h-5 w-5 text-purple-600" />,
      label: 'Developer',
      value: currentProject.developer || 'N/A'
    },
    {
      icon: <DollarSign className="h-5 w-5 text-green-600" />,
      label: 'Price Range',
      value: `₹${(minPrice / 10000000).toFixed(2)} - ${(maxPrice / 10000000).toFixed(2)} Cr`
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
      label: 'Available Units',
      value: `${availableUnits} of ${totalUnits}`
    },
    {
      icon: <Building2 className="h-5 w-5 text-orange-600" />,
      label: 'Property Type',
      value: currentProject.type || 'Mixed Development'
    }
  ];

  return (
    <Card className="border-l-4 border-l-primary bg-white">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          {/* Project Header */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {currentProject.name}
                </h1>
                <p className="text-gray-600 mt-1 text-lg">
                  {currentProject.location}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Badge 
                  variant={currentProject.status === 'ready' ? 'default' : 'secondary'}
                  className={`${currentProject.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'} flex items-center gap-1`}
                >
                  {currentProject.status === 'ready' ? (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      Ready to Move
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3" />
                      {currentProject.status}
                    </>
                  )}
                </Badge>
                {currentProject.certification && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {currentProject.certification}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid - Single Source of Truth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
          {keyMetrics.map((metric, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg bg-gray-50 border-l-4 border-l-gray-300 hover:border-l-primary transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                {metric.icon}
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
              </div>
              <p className="font-bold text-gray-900 break-words">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Project Description */}
        {currentProject.description && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border">
            <p className="text-sm text-gray-700 leading-relaxed">
              {currentProject.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectSummaryCard;
