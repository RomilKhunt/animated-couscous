
import { Project, Unit, FAQ } from '@/models';
import { QueryResult } from './types';
import { llmService, LLMResponse } from '@/services/llmService';

export const processLLMQuery = async (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): Promise<QueryResult> => {
  try {
    const response: LLMResponse = await llmService.queryAssistant(
      query,
      currentProject,
      units,
      faqs
    );

    return {
      text: response.response,
      type: response.relevantUnits && response.relevantUnits.length > 0 ? 'unit' : 'general',
      relatedItems: response.relevantUnits || [],
      confidence: response.confidence,
      isLLMGenerated: true
    };
  } catch (error) {
    console.error('LLM processing failed:', error);
    
    // Fallback to existing query processors
    return {
      text: "I'm having trouble accessing the AI assistant. Please try using the filter options or rephrasing your question.",
      type: 'general',
      isLLMGenerated: false
    };
  }
};
