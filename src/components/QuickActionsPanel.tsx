
import React, { useState } from 'react';
import { useRealEstate } from '@/context/RealEstateContext';
import { llmService } from '@/services/llmService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, MapPin, Calendar, Zap, FileText } from 'lucide-react';

interface QuickActionsPanelProps {
  onResponseGenerated: (response: string) => void;
}

const QuickActionsPanel: React.FC<QuickActionsPanelProps> = ({ onResponseGenerated }) => {
  const { currentProject, projectUnits } = useRealEstate();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(['actions']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const quickActions = [
    {
      id: 'connectivity',
      label: 'Detailed Connectivity',
      icon: <MapPin size={16} />,
      description: 'Transport links & distances',
      action: () => currentProject ? llmService.queryAssistant(
        `Give me detailed connectivity information for ${currentProject.name} including metro, bus routes, and distances to key locations not mentioned in the summary`,
        currentProject,
        [],
        [],
        'detailed_connectivity'
      ).then(res => res.response) : Promise.resolve('')
    },
    {
      id: 'inventory',
      label: 'Unit Configurations',
      icon: <Calendar size={16} />,
      description: 'Detailed unit breakdown',
      action: () => currentProject ? llmService.queryAssistant(
        `Provide detailed unit configuration breakdown for ${currentProject.name} including floor plans, sizes, and specific availability by type`,
        currentProject,
        projectUnits,
        [],
        'unit_configurations'
      ).then(res => res.response) : Promise.resolve('')
    },
    {
      id: 'amenities',
      label: 'Complete Amenities',
      icon: <Zap size={16} />,
      description: 'Full amenities list',
      action: () => currentProject ? llmService.queryAssistant(
        `List all amenities and facilities in ${currentProject.name} including those not mentioned in the overview, organized by category`,
        currentProject,
        [],
        [],
        'complete_amenities'
      ).then(res => res.response) : Promise.resolve('')
    },
    {
      id: 'timeline',
      label: 'Payment & Timeline',
      icon: <FileText size={16} />,
      description: 'Payment plans & delivery',
      action: () => currentProject ? llmService.queryAssistant(
        `What are the payment plans, construction timeline, and possession details for ${currentProject.name}?`,
        currentProject,
        [],
        [],
        'payment_timeline'
      ).then(res => res.response) : Promise.resolve('')
    }
  ];

  const handleQuickAction = async (action: any) => {
    setLoadingAction(action.id);
    try {
      const response = await action.action();
      onResponseGenerated(response);
    } catch (error) {
      console.error('Quick action failed:', error);
      onResponseGenerated(`Sorry, I couldn't get the ${action.label.toLowerCase()} right now. Please try again.`);
    } finally {
      setLoadingAction(null);
    }
  };

  if (!currentProject) {
    return null;
  }

  return (
    <Card className="h-fit">
      <Collapsible 
        open={expandedSections.includes('actions')}
        onOpenChange={() => toggleSection('actions')}
      >
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-3 cursor-pointer hover:bg-gray-50 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg">
              <span>Quick Actions</span>
              <ChevronDown 
                className={`h-4 w-4 transition-transform ${
                  expandedSections.includes('actions') ? 'rotate-180' : ''
                }`}
              />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-3">
            {quickActions.map((action) => (
              <div key={action.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-primary mt-1" aria-hidden="true">{action.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm">{action.label}</h4>
                    <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickAction(action)}
                  disabled={loadingAction === action.id}
                  className="w-full text-xs"
                  aria-label={`Get ${action.label.toLowerCase()}`}
                >
                  {loadingAction === action.id ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    `Get ${action.label}`
                  )}
                </Button>
              </div>
            ))}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default QuickActionsPanel;
