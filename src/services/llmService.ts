import { supabase } from '../integrations/supabase/client';
import { Project, Unit, FAQ } from '@/models';

export interface LLMResponse {
  response: string;
  relevantUnits?: Unit[];
  confidence: 'high' | 'medium' | 'low';
  responseTime: number;
  fallback?: string;
}

export class LLMService {
  private static instance: LLMService;
  
  public static getInstance(): LLMService {
    if (!LLMService.instance) {
      LLMService.instance = new LLMService();
    }
    return LLMService.instance;
  }

  async queryAssistant(
    query: string,
    project: Project | null,
    units: Unit[],
    faqs: FAQ[],
    context?: string
  ): Promise<LLMResponse> {
    try {
      console.log('Querying LLM assistant with:', { query, projectName: project?.name });
      
      const { data, error } = await supabase.functions.invoke('llm-assistant', {
        body: {
          query,
          projectData: project,
          unitsData: units,
          faqsData: faqs,
          context
        }
      });

      if (error) {
        console.error('LLM Service error:', error);
        throw error;
      }

      return data as LLMResponse;
    } catch (error) {
      console.error('Failed to query LLM assistant:', error);
      
      // Fallback to clean format
      return {
        response: this.createCleanFallbackResponse(query, units, project),
        confidence: 'low',
        responseTime: Date.now(),
        fallback: 'AI service temporarily unavailable'
      };
    }
  }

  private createCleanFallbackResponse(query: string, units: Unit[], project: Project | null): string {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('price') || queryLower.includes('cost')) {
      const prices = units.map(u => u.price);
      const minPrice = Math.min(...prices) / 10000000;
      const maxPrice = Math.max(...prices) / 10000000;
      return `🏠 **${project?.name || 'Property'} Pricing**\nPrice Range: ₹${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)} Cr\n\nAvailability: Multiple units available\n\nFeatures: Contact sales team for current offers and payment plans`;
    }
    
    if (queryLower.includes('available')) {
      const available = units.filter(u => u.availability === 'available').length;
      return `🏠 **Availability Update**\nUnits Available: ${available} units ready for booking\n\nConfiguration: Multiple options available\n\nAvailability: ✅ Available`;
    }

    if (queryLower.includes('3bhk') || queryLower.includes('3 bhk')) {
      const bhk3Units = units.filter(u => u.bedrooms === 3 && u.availability === 'available');
      if (bhk3Units.length > 0) {
        const unit = bhk3Units[0];
        return `🏠 3 BHK Apartments\nPrice: ₹${(unit.price / 10000000).toFixed(2)} Cr\n\nArea: ${unit.area} sq. ft.\n\nFeatures: ${unit.features.slice(0, 3).join(', ')}\n\nAvailability: ✅ ${bhk3Units.length} units available`;
      }
    }
    
    return `🏠 **${project?.name || 'Property'} Information**\nQuery: Use specific filters above for targeted results\n\nOptions: Ask about pricing, availability, unit types, amenities\n\nSupport: Sales team available for detailed discussions`;
  }

  // Quick response generators for one-click buttons
  async getLocationDetails(project: Project): Promise<string> {
    return this.queryAssistant(
      `Tell me about the location of ${project.name} including connectivity and nearby landmarks`,
      project,
      [],
      [],
      'location_inquiry'
    ).then(response => response.response);
  }

  async getStartingPrice(project: Project, units: Unit[]): Promise<string> {
    return this.queryAssistant(
      `What is the starting price for ${project.name}?`,
      project,
      units,
      [],
      'pricing_inquiry'
    ).then(response => response.response);
  }

  async getAvailableUnits(project: Project, units: Unit[]): Promise<string> {
    return this.queryAssistant(
      `How many units are available right now in ${project.name}?`,
      project,
      units,
      [],
      'availability_inquiry'
    ).then(response => response.response);
  }

  async getTopAmenities(project: Project): Promise<string> {
    return this.queryAssistant(
      `What are the key amenities that clients ask about most in ${project.name}?`,
      project,
      [],
      [],
      'amenities_inquiry'
    ).then(response => response.response);
  }
}

export const llmService = LLMService.getInstance();
