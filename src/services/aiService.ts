import { Task } from '../types/task.types';

// Using a standard OpenAI format. You can swap this for Anthropic, Gemini, etc.
const AI_API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY; 

/**
 * The System Prompt is the most important part of the AI engine. 
 * It forces the AI to behave exactly how we want and guarantees a specific JSON format.
 */
const SYSTEM_PROMPT = 
You are a world-class AI personal productivity assistant embedded in a mobile app.
Your goal is to parse the user's natural language input and extract actionable tasks.

You MUST respond ONLY with a valid JSON object matching this exact structure:
{
  "message": "A friendly, concise reply to the user (max 2 sentences).",
  "extractedTasks": [
    {
      "title": "Task title",
      "priority": "low" | "medium" | "high" | "urgent",
      "estimatedMinutes": number (guess based on the task),
      "tags": ["category1", "category2"]
    }
  ]
}
Do not include markdown blocks like \\\json. Just return the raw JSON object.
;

export interface AIResponse {
  message: string;
  extractedTasks: Array<Omit<Task, 'id' | 'createdAt' | 'status' | 'isAIGenerated'>>;
}

export const AIService = {
  /**
   * Sends user text to the AI and returns structured task data.
   */
  async processUserInput(userInput: string): Promise<AIResponse> {
    
    // 🚧 DEMO MODE: If no API key is provided, return a simulated response after a delay.
    // This allows you to test the beautiful UI immediately without setting up billing.
    if (!API_KEY) {
      console.warn("No API key found. Using simulated AI response.");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            message: "I've added the Q4 presentation to your tasks and allocated 60 minutes for it. I also created a quick reminder for your emails.",
            extractedTasks: [
              {
                title: "Draft Q4 Presentation",
                priority: "high",
                estimatedMinutes: 60,
                tags: ["Work", "Deep Work"],
              },
              {
                title: "Process Inbox",
                priority: "medium",
                estimatedMinutes: 15,
                tags: ["Routine"],
              }
            ]
          });
        }, 1500); // 1.5 second artificial delay
      });
    }

    // 🚀 PRODUCTION MODE: Real API Call
    try {
      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Bearer ${API_KEY},
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo', // or gpt-3.5-turbo for speed/cost
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userInput }
          ],
          temperature: 0.2, // Low temperature for consistent, predictable JSON output
        }),
      });

      if (!response.ok) {
        throw new Error(API Error: ${response.status}`);
      }

      const data = await response.json();
      const rawContent = data.choices[0].message.content.trim();
      
      // Parse the JSON string returned by the AI into our TypeScript interface
      const parsedContent = JSON.parse(rawContent) as AIResponse;
      return parsedContent;

    } catch (error) {
      console.error("AI Service Error:", error);
      throw new Error("Failed to process request. Please try again.");
    }
  }
};