
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QueryRequest {
  query: string;
  projectData: any;
  unitsData: any[];
  faqsData: any[];
  context?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, projectData, unitsData, faqsData, context }: QueryRequest = await req.json();

    // Create context for the LLM with the new clean format
    const systemPrompt = `You are a helpful real estate assistant built into a sales dashboard. Your goal is to answer user queries quickly and clearly for live sales calls.

RESPONSE FORMAT RULES:
- Use clean, key-value pair format with emoji headers
- Each property gets a 🏠 emoji header with title
- Use bullet points for easy scanning
- Keep responses friendly but concise
- No marketing fluff, just facts
- End with no CTA or contact details

USE THIS EXACT FORMAT:

🏠 [Property Title like "3 BHK - Type 01" or "3 BHK Lower Penthouse - Type 1"]
Price: ₹X.XX Cr

Area: XXXX sq. ft.

Features: [Comma-separated list of key features]

Availability: ✅ Available / ⏳ Under Construction / ❌ Sold

For multiple units, use separate 🏠 sections for each.

Current Project: ${projectData?.name || 'Multiple Projects'}
Location: ${projectData?.location || 'Various Locations'}

Available Units: ${unitsData.length} units
Price Range: ₹${Math.min(...unitsData.map(u => u.price / 10000000)).toFixed(2)}Cr - ₹${Math.max(...unitsData.map(u => u.price / 10000000)).toFixed(2)}Cr

Context: ${context || 'General inquiry'}`;

    const userPrompt = `Query: "${query}"

Project Data: ${JSON.stringify(projectData, null, 2)}
Units Data: ${JSON.stringify(unitsData.slice(0, 10), null, 2)}
FAQs: ${JSON.stringify(faqsData.slice(0, 5), null, 2)}

Provide a clean, scannable response using the exact format specified with emoji headers and key-value pairs.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Try to extract relevant units from the response
    const relevantUnits = unitsData.filter(unit => {
      const queryLower = query.toLowerCase();
      return (
        queryLower.includes(unit.type.toLowerCase()) ||
        queryLower.includes(`${unit.bedrooms}bhk`) ||
        queryLower.includes('available') && unit.availability === 'available' ||
        queryLower.includes('under') && unit.price <= extractPriceFromQuery(queryLower) ||
        unit.features?.some(feature => queryLower.includes(feature.toLowerCase()))
      );
    }).slice(0, 3);

    return new Response(JSON.stringify({
      response: aiResponse,
      relevantUnits,
      confidence: data.choices[0].finish_reason === 'stop' ? 'high' : 'medium',
      responseTime: Date.now()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in LLM assistant:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      fallback: 'I apologize, but I\'m having trouble processing your request right now. Please try rephrasing your question or use the filter options below.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractPriceFromQuery(query: string): number {
  const croreMatch = query.match(/(\d+(?:\.\d+)?)\s*cr/i);
  if (croreMatch) {
    return parseFloat(croreMatch[1]) * 10000000;
  }
  
  const lakhMatch = query.match(/(\d+(?:\.\d+)?)\s*l/i);
  if (lakhMatch) {
    return parseFloat(lakhMatch[1]) * 100000;
  }
  
  return Infinity;
}
