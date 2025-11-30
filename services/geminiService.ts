import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    throw new Error("API Key is required");
  }
  return new GoogleGenAI({ apiKey });
};

export const askOracle = async (userQuery: string): Promise<string> => {
  try {
    const ai = getClient();
    const model = "gemini-2.5-flash";
    
    const systemInstruction = `
      You are the "Scent Oracle" for a luxury, dark, and mysterious perfume brand called "Crimson Note". 
      The perfume smells of Black Rose, Oud, Smoked Amber, and a hint of metallic blood orange.
      Your persona is enigmatic, poetic, seductive, and slightly gothic. 
      Answer the user's questions about the scent, mood, or occasion in a short, evocative paragraph (max 60 words).
      Do not be salesy. Be atmospheric.
      If they ask about ingredients, mention: Midnight Rose, Ancient Oud, Saffron, and Dark Amber.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: userQuery,
      config: {
        systemInstruction,
        temperature: 0.9,
      }
    });

    return response.text || "The mists are too thick to see... try again.";
  } catch (error) {
    console.error("Oracle Error:", error);
    return "The connection to the ethereal plane is severed. Please try again later.";
  }
};

export const generateWelcomePoem = async (name: string): Promise<string> => {
  try {
    const ai = getClient();
    const model = "gemini-2.5-flash";
    const prompt = `Write a very short (2 lines), dark, romantic, rhyming welcome couplet for a new member named "${name}" joining the "Crimson Note" secret society.`;
    
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || `Welcome, ${name}. The darkness embraces you.`;
  } catch (error) {
    return `Welcome, ${name}. The journey begins.`;
  }
};