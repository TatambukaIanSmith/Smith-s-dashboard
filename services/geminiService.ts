
import { GoogleGenAI, Type } from "@google/genai";

// Always initialize with process.env.API_KEY directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIPlatformSummary = async (metrics: any) => {
  try {
    const prompt = `As a platform administrator assistant for "Job-lyNK", analyze these current metrics:
    - Total Users: ${metrics.users}
    - Active Jobs: ${metrics.jobs}
    - Pending Reviews: ${metrics.pending}
    - Disputes: ${metrics.disputes}
    
    Provide a professional, concise 3-sentence summary of the platform's current health and one actionable recommendation for the admin.`;

    // Use ai.models.generateContent with correct model name and prompt
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    // Extract text using the .text property
    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to AI services.";
  }
};

export const moderateContent = async (text: string) => {
  try {
    const prompt = `Analyze this job posting content for safety and professionalism: "${text}".`;

    // Recommended way for JSON is using responseSchema
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: "Safety score from 0 to 10.",
            },
            concerns: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of identified concerns.",
            },
            status: {
              type: Type.STRING,
              description: "Final status: Approved or Flagged.",
            },
          },
          required: ["score", "concerns", "status"],
        }
      }
    });

    // Extract and parse text output
    const jsonStr = response.text?.trim() || '{}';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Moderation Error:", error);
    return { status: 'Error', concerns: ['AI moderation failed'], score: 0 };
  }
};
