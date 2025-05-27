
import React from 'react';
import { useRealEstate } from '@/context/RealEstateContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PropertyOverview = () => {
  const { currentProject, projectUnits } = useRealEstate();

  if (!currentProject) return null;

  const availableUnits = projectUnits.filter(unit => unit.availability === 'available').length;
  const totalUnits = projectUnits.length;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold">{currentProject.name}</CardTitle>
            <p className="text-muted-foreground">
              {currentProject.location}
              {currentProject.developer && ` • ${currentProject.developer}`}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <Badge variant="outline">{currentProject.status}</Badge>
            {currentProject.certification && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                {currentProject.certification}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm md:text-base">{currentProject.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-realestate-light-blue rounded-md p-3">
            <p className="text-sm text-muted-foreground">Available Units</p>
            <p className="text-xl font-semibold">{availableUnits} of {totalUnits}</p>
          </div>
          <div className="bg-realestate-light-blue rounded-md p-3">
            <p className="text-sm text-muted-foreground">Property Type</p>
            <p className="text-xl font-semibold">{currentProject.type}</p>
          </div>
        </div>
        
        <Tabs defaultValue="features" className="mt-6">
          <TabsList className="grid grid-cols-4 mb-2">
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="features">
            <div className="flex flex-wrap gap-1 mt-2">
              {currentProject.features.map((feature, index) => (
                <span 
                  key={index}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
            </div>
            
            {(currentProject.landArea || currentProject.towerHeight || currentProject.openSpace) && (
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-500">Project Highlights</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {currentProject.landArea && (
                    <div className="text-xs">
                      <span className="font-medium">Land Area:</span> {currentProject.landArea}
                    </div>
                  )}
                  {currentProject.openSpace && (
                    <div className="text-xs">
                      <span className="font-medium">Open Space:</span> {currentProject.openSpace}
                    </div>
                  )}
                  {currentProject.towerHeight && (
                    <div className="text-xs">
                      <span className="font-medium">Building Height:</span> {currentProject.towerHeight}
                    </div>
                  )}
                  {currentProject.storeys && (
                    <div className="text-xs">
                      <span className="font-medium">Building Height:</span> {currentProject.storeys} storeys
                    </div>
                  )}
                  {currentProject.towers && (
                    <div className="text-xs">
                      <span className="font-medium">Towers:</span> {currentProject.towers}
                    </div>
                  )}
                  {currentProject.towerLayout && (
                    <div className="text-xs">
                      <span className="font-medium">Tower Layout:</span> {currentProject.towerLayout}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {currentProject.businessFocus && (
              <div className="mt-3">
                <p className="text-xs font-medium text-gray-500">Business Overview</p>
                <div className="grid grid-cols-1 gap-2 mt-1">
                  <div className="text-xs">
                    <span className="font-medium">Business Focus:</span> {currentProject.businessFocus}
                  </div>
                  {currentProject.brandPositioning && (
                    <div className="text-xs">
                      <span className="font-medium">Brand Positioning:</span> {currentProject.brandPositioning}
                    </div>
                  )}
                  {currentProject.completionDate && (
                    <div className="text-xs">
                      <span className="font-medium">Completion Date:</span> {currentProject.completionDate}
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="location">
            {currentProject.transportConnections && (
              <div className="space-y-3">
                {currentProject.transportConnections.distances && (
                  <div>
                    <p className="text-xs font-medium text-gray-500">Key Distances</p>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(currentProject.transportConnections.distances).map(([place, distance]) => (
                        <div key={place} className="text-xs">
                          <span className="font-medium">{place}:</span> {distance}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {currentProject.transportConnections.metro && currentProject.transportConnections.metro.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500">Metro Access</p>
                    <div className="text-xs">
                      {currentProject.transportConnections.metro.join(', ')}
                    </div>
                  </div>
                )}
                
                {currentProject.transportConnections.roads && currentProject.transportConnections.roads.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500">Road Connectivity</p>
                    <div className="text-xs">
                      {currentProject.transportConnections.roads.join(', ')}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {currentProject.fullAddress && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-500">Full Address</p>
                <p className="text-xs">{currentProject.fullAddress}</p>
              </div>
            )}
            
            {!currentProject.transportConnections && !currentProject.fullAddress && (
              <p className="text-sm text-gray-500">Located in {currentProject.location}</p>
            )}
          </TabsContent>
          
          <TabsContent value="amenities">
            {(currentProject.amenities || 
              currentProject.amenities?.recreational || 
              currentProject.amenities?.business || 
              currentProject.amenities?.convenience) && (
              <div className="grid grid-cols-2 gap-4">
                {currentProject.amenities?.community && currentProject.amenities.community.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Community Spaces</p>
                    <ul className="text-xs space-y-1">
                      {currentProject.amenities.community.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {currentProject.amenities?.health && currentProject.amenities.health.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Health & Wellness</p>
                    <ul className="text-xs space-y-1">
                      {currentProject.amenities.health.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {currentProject.amenities?.convenience && currentProject.amenities.convenience.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 mb-1">Convenience Features</p>
                    <ul className="text-xs space-y-1">
                      {currentProject.amenities.convenience.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {currentProject.amenities?.outdoor && currentProject.amenities.outdoor.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 mb-1">Outdoor Spaces</p>
                    <ul className="text-xs space-y-1">
                      {currentProject.amenities.outdoor.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {currentProject.amenities?.recreational && currentProject.amenities.recreational.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 mb-1">Recreational</p>
                    <ul className="text-xs space-y-1">
                      {currentProject.amenities.recreational.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {currentProject.amenities?.business && currentProject.amenities.business.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 mb-1">Business</p>
                    <ul className="text-xs space-y-1">
                      {currentProject.amenities.business.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {currentProject.amenities?.indoor && currentProject.amenities.indoor.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500 mb-1">Indoor Facilities</p>
                    <ul className="text-xs space-y-1">
                      {currentProject.amenities.indoor.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {!currentProject.amenities && (
              <div className="text-sm text-gray-500">Amenity information not available</div>
            )}
          </TabsContent>
          
          <TabsContent value="specs">
            {currentProject.specifications && (
              <div className="grid grid-cols-1 gap-4">
                {currentProject.specifications.flooring && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Flooring</p>
                    <ul className="text-xs space-y-1">
                      {typeof currentProject.specifications.flooring === 'object' && !Array.isArray(currentProject.specifications.flooring) ? 
                        Object.entries(currentProject.specifications.flooring).map(([area, material]) => (
                          <li key={area}>• {area}: {material}</li>
                        )) : 
                        Array.isArray(currentProject.specifications.flooring) &&
                        currentProject.specifications.flooring.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                    </ul>
                  </div>
                )}
                
                {currentProject.specifications.doors && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Doors & Windows</p>
                    <ul className="text-xs space-y-1">
                      {typeof currentProject.specifications.doors === 'object' && !Array.isArray(currentProject.specifications.doors) ? 
                        Object.entries(currentProject.specifications.doors).map(([doorType, doorSpec]) => (
                          <li key={doorType}>• {doorType}: {doorSpec}</li>
                        )) : 
                        Array.isArray(currentProject.specifications.doors) &&
                        currentProject.specifications.doors.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      {currentProject.specifications.windows && (
                        <li>• Windows: {currentProject.specifications.windows}</li>
                      )}
                    </ul>
                  </div>
                )}
                
                {currentProject.specifications.electrical && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Electrical</p>
                    <ul className="text-xs space-y-1">
                      {currentProject.specifications.electrical.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {currentProject.specifications.toilets && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Bathroom & Kitchen</p>
                    <ul className="text-xs space-y-1">
                      {currentProject.specifications.toilets.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                      {currentProject.specifications.kitchen && currentProject.specifications.kitchen.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {currentProject.specifications.color && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Paint & Finish</p>
                    <ul className="text-xs space-y-1">
                      {Object.entries(currentProject.specifications.color).map(([area, finish]) => (
                        <li key={area}>• {area}: {finish}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {currentProject.parking && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Parking</p>
                    <p className="text-xs">{currentProject.parking}</p>
                  </div>
                )}
                
                {currentProject.lifts && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Elevators</p>
                    <p className="text-xs">{currentProject.lifts}</p>
                  </div>
                )}
                
                {currentProject.refugeAreaFloors && (
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-1">Refuge Area Floors</p>
                    <p className="text-xs">{currentProject.refugeAreaFloors}</p>
                  </div>
                )}
              </div>
            )}
            
            {!currentProject.specifications && (
              <div className="text-sm text-gray-500">Specification information not available</div>
            )}
          </TabsContent>
        </Tabs>
        
        {currentProject.reraNumber && (
          <div className="mt-4 text-xs text-muted-foreground">
            <p className="font-medium">RERA Number:</p>
            <p className="mt-1">{currentProject.reraNumber}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyOverview;
