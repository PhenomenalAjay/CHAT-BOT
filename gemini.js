import { GoogleGenAI } from "@google/genai";

class GeminiAI {
  constructor() {
    this.ai = new GoogleGenAI({});
    this.model = "gemini-2.5-flash";
  }

  async generateResponse(prompt) {
    try {
      const response = await this.ai.models.generateContent({
        model: this.model,
        contents: prompt,
        config: {
          thinkingConfig: {
            thinkingBudget: 0, // Disables thinking
          },
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to generate response");
    }
  }
}

export { GeminiAI };
