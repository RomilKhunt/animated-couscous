
import React from 'react';
import { QueryResult } from '@/utils/aiHelpers';
import { Unit } from '@/models';
import { formatIndianPrice } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Info, MapPin, Home, Calendar } from 'lucide-react';

interface AIResponseCardProps {
  result: QueryResult;
}

const AIResponseCard: React.FC<AIResponseCardProps> = ({ result }) => {
  return (
    <div className="animate-fade-in">
      <Card className="mt-6 overflow-hidden border-0 shadow-sm">
        <CardHeader className="bg-gray-50/50 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <CardTitle className="text-base font-medium text-gray-900">AI Assistant Response</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Clean, minimal text response */}
          <div className="prose prose-sm max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {result.text}
            </div>
          </div>
          
          {result.relatedItems && result.type === 'unit' && (
            <div className="mt-8 space-y-6">
              {result.relatedItems.map((item, index) => {
                const unit = item as Unit;
                const isRecommended = index === 0;
                
                return (
                  <div 
                    key={unit.id}
                    className={`border rounded-xl bg-white transition-all duration-200 hover:shadow-md ${
                      isRecommended ? 'border-primary/20 bg-primary/2' 
                      : 'border-gray-100'
                    }`}
                  >
                    {/* Header with key info */}
                    <div className="p-5 border-b border-gray-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{unit.type}</h3>
                          <p className="text-2xl font-semibold text-primary mt-1">
                            {formatIndianPrice(unit.price)}
                          </p>
                        </div>
                        <Badge className={
                          unit.availability === 'available' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : unit.availability === 'pending' 
                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'  
                            : 'bg-red-50 text-red-700 border-red-200' 
                        }>
                          {unit.availability === 'available' ? '✅ Available' : unit.availability}
                        </Badge>
                      </div>
                      
                      {isRecommended && (
                        <div className="flex items-center text-sm font-medium text-primary mb-3">
                          <Check size={16} className="mr-2" />
                          <span>Recommended for you</span>
                        </div>
                      )}
                    </div>

                    {/* Key Details Grid */}
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Home size={18} className="text-gray-600" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Area</p>
                            <p className="font-medium text-gray-900">{unit.area} sq.ft.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <MapPin size={18} className="text-gray-600" />
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Configuration</p>
                            <p className="font-medium text-gray-900">{unit.bedrooms} BHK • {unit.bathrooms} Bath</p>
                          </div>
                        </div>
                        
                        {unit.unitNumber && (
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Calendar size={18} className="text-gray-600" />
                            <div>
                              <p className="text-xs text-gray-500 uppercase tracking-wide">Unit</p>
                              <p className="font-medium text-gray-900">Unit {unit.unitNumber}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Features as clean tags */}
                      <div className="mb-5">
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Key Features</p>
                        <div className="flex flex-wrap gap-2">
                          {unit.features.slice(0, 6).map((feature, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-full text-gray-700"
                            >
                              {feature}
                            </span>
                          ))}
                          {unit.features.length > 6 && (
                            <span className="px-3 py-1.5 text-xs bg-gray-100 border border-gray-200 rounded-full text-gray-600">
                              +{unit.features.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Special note for recommended */}
                      {isRecommended && unit.specifications?.special && unit.specifications.special.length > 0 && (
                        <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                          <Info size={16} className="mt-0.5 text-primary shrink-0" />
                          <p className="text-sm text-gray-700">{unit.specifications.special[0]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIResponseCard;
