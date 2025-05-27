import { Project, Unit, FAQ } from '../../models';
import { QueryResult } from './types';
import { FAQ_CATEGORIES, categorizeFAQ, getResponseTemplate } from './faqTemplates';

export const processFaqMatch = (
  query: string,
  currentProject: Project | null,
  faqs: FAQ[]
): QueryResult | null => {
  // Convert query to lowercase for easier matching
  const lowerQuery = query.toLowerCase();
  
  // First, check for exact FAQ matches using standardized categories
  for (const faq of faqs) {
    const questionLower = faq.question.toLowerCase();
    const answerLower = faq.answer.toLowerCase();
    const faqCategory = categorizeFAQ(faq);
    
    // Check if query keywords are in the FAQ question, answer, or category tags
    const categoryData = FAQ_CATEGORIES.find(cat => cat.id === faqCategory);
    const categoryMatches = categoryData?.tags.some(tag => 
      lowerQuery.includes(tag.toLowerCase())
    ) || false;
    
    if (
      faq.tags.some(tag => lowerQuery.includes(tag.toLowerCase())) ||
      questionLower.includes(lowerQuery) || 
      answerLower.includes(lowerQuery) ||
      categoryMatches
    ) {
      // Try to use a standardized response template if available
      let responseText = faq.answer;
      
      // Check if we can enhance the response with a template
      if (faqCategory === 'financial' && currentProject) {
        const template = getResponseTemplate('pricing');
        if (template && faq.answer.includes('₹')) {
          // Keep original answer but add category context
          responseText = `${faq.answer}\n\nCategory: Financial Information`;
        }
      } else if (faqCategory === 'location' && currentProject) {
        responseText = `${faq.answer}\n\nCategory: Location & Connectivity`;
      } else if (faqCategory === 'developer' && currentProject) {
        responseText = `${faq.answer}\n\nCategory: Developer Information`;
      }
      
      return {
        text: responseText,
        type: 'faq',
        relatedItems: [faq]
      };
    }
  }
  
  // If no direct FAQ match, try to match by category
  const matchedCategory = FAQ_CATEGORIES.find(category =>
    category.tags.some(tag => lowerQuery.includes(tag.toLowerCase()))
  );
  
  if (matchedCategory) {
    const categoryFAQs = faqs.filter(faq => categorizeFAQ(faq) === matchedCategory.id);
    
    if (categoryFAQs.length > 0) {
      const mostRelevantFAQ = categoryFAQs[0]; // Get the first relevant FAQ
      return {
        text: `${mostRelevantFAQ.answer}\n\nCategory: ${matchedCategory.name}`,
        type: 'faq',
        relatedItems: [mostRelevantFAQ]
      };
    }
    
    // If no FAQs in category, provide general category information
    return {
      text: `I found questions related to ${matchedCategory.name} (${matchedCategory.description}). Please ask a more specific question about ${currentProject?.name || 'this project'} regarding ${matchedCategory.description.toLowerCase()}.`,
      type: 'general'
    };
  }
  
  return null;
};

export const getFAQsByCategory = (faqs: FAQ[], categoryId: string): FAQ[] => {
  return faqs.filter(faq => categorizeFAQ(faq) === categoryId);
};

export const getAllFAQCategories = (faqs: FAQ[]): { category: string, count: number }[] => {
  const categoryCounts: { [key: string]: number } = {};
  
  faqs.forEach(faq => {
    const category = categorizeFAQ(faq);
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });
  
  return Object.entries(categoryCounts).map(([category, count]) => ({ category, count }));
};
