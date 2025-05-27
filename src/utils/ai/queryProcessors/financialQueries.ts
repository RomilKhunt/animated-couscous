
import { Project, Unit, FAQ } from '../../../models';
import { QueryResult, QueryProcessorFn } from '../types';

export const processFinancialQuery: QueryProcessorFn = (
  query: string,
  currentProject: Project | null,
  units: Unit[],
  faqs: FAQ[]
): QueryResult | null => {
  const lowerQuery = query.toLowerCase();
  
  if (
    lowerQuery.includes('price') || 
    lowerQuery.includes('cost') || 
    lowerQuery.includes('payment') ||
    lowerQuery.includes('loan') ||
    lowerQuery.includes('discount') ||
    lowerQuery.includes('maintenance') ||
    lowerQuery.includes('charges') ||
    lowerQuery.includes('starting')
  ) {
    if (!currentProject) {
      return {
        text: "Please select a project to get specific pricing information.",
        type: 'general'
      };
    }
    
    // Calculate pricing details for call-optimized response
    const projectUnits = units.filter(unit => unit.projectId === currentProject.id);
    
    if (projectUnits.length > 0) {
      const availableUnits = projectUnits.filter(unit => unit.availability === 'available');
      const prices = projectUnits.map(unit => unit.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      // Get unit type breakdown for better sales support
      const unitTypes = projectUnits.reduce((acc, unit) => {
        if (!acc[unit.type]) acc[unit.type] = [];
        acc[unit.type].push(unit);
        return acc;
      }, {} as Record<string, Unit[]>);

      let response = `**${currentProject.name} Pricing Overview:**\n\n`;
      
      // Key pricing info for calls
      response += `• **Price Range:** ₹${(minPrice / 10000000).toFixed(2)} - ${(maxPrice / 10000000).toFixed(2)} Crore\n`;
      response += `• **Available Units:** ${availableUnits.length} units ready for booking\n\n`;
      
      // Unit type breakdown
      response += `**By Unit Type:**\n`;
      Object.entries(unitTypes).forEach(([type, typeUnits]) => {
        const typePrices = typeUnits.map(u => u.price);
        const typeMin = Math.min(...typePrices);
        const typeMax = Math.max(...typePrices);
        const typeAvailable = typeUnits.filter(u => u.availability === 'available').length;
        
        response += `• **${type}:** ₹${(typeMin / 10000000).toFixed(2)}`;
        if (typeMin !== typeMax) {
          response += ` - ${(typeMax / 10000000).toFixed(2)}`;
        }
        response += ` Cr (${typeAvailable} available)\n`;
      });
      
      response += `\n**Additional Information:**\n`;
      response += `• Flexible payment plans available\n`;
      response += `• Home loan assistance through partner banks\n`;
      response += `• Maintenance charges: Approx. ₹2-3 per sq.ft/month\n`;
      response += `• Current offers and discounts available - speak with sales team\n`;
      
      return {
        text: response,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    // Fallback for Greenfield or projects without unit data
    if (currentProject.name === 'Greenfield') {
      return {
        text: `**Greenfield Pricing (Call-Ready Summary):**\n\n• **3 BHK:** Starting ₹1.5 Crore\n• **4 BHK Penthouses:** Starting ₹2.78 Crore\n• **Maintenance:** ₹2.5 per sq.ft/month\n• **Payment Plans:** Flexible options available\n• **Loans:** Pre-approved bank partnerships\n• **Current Offers:** Contact sales for latest promotions`,
        type: 'project',
        relatedItems: [currentProject]
      };
    }
    
    return {
      text: `**${currentProject.name} Pricing Information:**\n\nFor current pricing, payment plans, and special offers, please contact our sales team. We have flexible financing options and can assist with loan approvals through our partner banks.`,
      type: 'project',
      relatedItems: [currentProject]
    };
  }

  // Budget-specific queries with enhanced filtering
  if (lowerQuery.includes('under') && (lowerQuery.includes('cr') || lowerQuery.includes('crore'))) {
    let priceLimit = 0;
    
    const matches = lowerQuery.match(/(\d+(\.\d+)?)/);
    if (matches && matches[1]) {
      priceLimit = parseFloat(matches[1]) * 10000000;
    }
    
    const matchedUnits = units.filter(unit => 
      unit.price < priceLimit && 
      (!currentProject || unit.projectId === currentProject.id)
    );
    
    if (matchedUnits.length > 0) {
      // Group by type for better presentation
      const unitsByType = matchedUnits.reduce((acc, unit) => {
        if (!acc[unit.type]) acc[unit.type] = [];
        acc[unit.type].push(unit);
        return acc;
      }, {} as Record<string, Unit[]>);

      let response = `**Properties Under ₹${priceLimit / 10000000} Crore:**\n\n`;
      response += `Found ${matchedUnits.length} units in ${currentProject?.name || 'our portfolio'}\n\n`;
      
      Object.entries(unitsByType).forEach(([type, typeUnits]) => {
        const available = typeUnits.filter(u => u.availability === 'available').length;
        response += `• **${type}:** ${typeUnits.length} units (${available} available)\n`;
      });
      
      return {
        text: response,
        type: 'unit',
        relatedItems: matchedUnits
      };
    } else {
      return {
        text: `**No properties found under ₹${priceLimit / 10000000} Crore** in ${currentProject?.name || 'our portfolio'}.\n\nTry searching for a higher budget range or contact our sales team for upcoming launches in your budget.`,
        type: 'general'
      };
    }
  }
  
  return null;
};
