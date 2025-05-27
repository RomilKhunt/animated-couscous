
import React, { useState } from 'react';
import { useRealEstate } from '@/context/RealEstateContext';
import { llmService } from '@/services/llmService';
import { MapPin, DollarSign, Calendar, Zap, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickResponseCardsProps {
  onResponseGenerated: (response: string) => void;
}

const QuickResponseCards: React.FC<QuickResponseCardsProps> = ({ onResponseGenerated }) => {
  const { currentProject, projectUnits } = useRealEstate();
  const [loadingCard, setLoadingCard] = useState<string | null>(null);

  const quickActions = [
    {
      id: 'location',
      label: 'Location Details',
      icon: <MapPin size={16} />,
      description: 'Connectivity & proximity',
      action: () => currentProject ? llmService.getLocationDetails(currentProject) : Promise.resolve('')
    },
    {
      id: 'pricing',
      label: 'Starting Price',
      icon: <DollarSign size={16} />,
      description: 'Current pricing info',
      action: () => currentProject ? llmService.getStartingPrice(currentProject, projectUnits) : Promise.resolve('')
    },
    {
      id: 'availability',
      label: 'Available Units',
      icon: <Calendar size={16} />,
      description: 'Current inventory',
      action: () => currentProject ? llmService.getAvailableUnits(currentProject, projectUnits) : Promise.resolve('')
    },
    {
      id: 'amenities',
      label: 'Top Amenities',
      icon: <Zap size={16} />,
      description: 'Key selling points',
      action: () => currentProject ? llmService.getTopAmenities(currentProject) : Promise.resolve('')
    }
  ];

  const handleQuickAction = async (action: any) => {
    setLoadingCard(action.id);
    try {
      const response = await action.action();
      onResponseGenerated(response);
    } catch (error) {
      console.error('Quick action failed:', error);
      onResponseGenerated(`Sorry, I couldn't get the ${action.label.toLowerCase()} right now. Please try again.`);
    } finally {
      setLoadingCard(null);
    }
  };

  if (!currentProject) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      {quickActions.map((action) => (
        <Card 
          key={action.id}
          className="hover:shadow-md transition-shadow cursor-pointer border-gray-200"
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <span className="text-primary" aria-hidden="true">{action.icon}</span>
              {action.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-gray-600 mb-4">{action.description}</p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleQuickAction(action)}
              disabled={loadingCard === action.id}
              className="w-full text-xs"
              aria-label={`Get ${action.label.toLowerCase()}`}
            >
              {loadingCard === action.id ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <MessageCircle size={14} aria-hidden="true" />
                  Get Info
                </span>
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickResponseCards;
