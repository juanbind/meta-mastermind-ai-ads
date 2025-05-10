
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Configuration, OpenAIApi } from "https://esm.sh/openai@3.2.1";

const openAiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAiKey) {
      throw new Error("OPENAI_API_KEY is not set in environment variables");
    }

    const configuration = new Configuration({ apiKey: openAiKey });
    const openai = new OpenAIApi(configuration);

    const { productDetails, mainOffer, adType, platform, tone, targetAudience, industry } = await req.json();
    
    console.log("Received request with parameters:", { 
      productDetails, mainOffer, adType, platform, tone, targetAudience, industry 
    });

    // Construct the prompt
    const prompt = `Create compelling ad copy for ${platform} with the following details:
      
Product/Service: ${productDetails}
Main Offer: ${mainOffer}
Ad Type: ${adType}
Target Audience: ${targetAudience || 'General audience'}
Industry: ${industry || 'Not specified'}
Tone: ${tone || 'Professional'}

Generate 3 different versions, each with:
1. Primary Text (main ad copy, 125-150 characters)
2. Headline (short and compelling, 25-40 characters)
3. Description (with a clear call-to-action, 30-60 characters)

Format your response as a JSON object with this structure:
{
  "versions": [
    {
      "primaryText": "...",
      "headline": "...",
      "description": "..."
    },
    // Two more versions similarly structured
  ]
}`;

    const completion = await openai.createChatCompletion({
      model: "gpt-4", // Use GPT-4 for high quality
      messages: [
        { role: "system", content: "You are an expert advertising copywriter who specializes in creating high-converting ad copy for various platforms." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const responseText = completion.data.choices[0].message.content;
    let parsedResponse;

    try {
      parsedResponse = JSON.parse(responseText);
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", e);
      console.log("Raw response:", responseText);
      
      // Attempt to extract the JSON portion if the AI didn't return pure JSON
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsedResponse = JSON.parse(jsonMatch[0]);
        } catch (e2) {
          throw new Error("Could not extract valid JSON from response");
        }
      } else {
        throw new Error("Response contained no valid JSON");
      }
    }

    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error generating ad copy:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred during ad copy generation" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
