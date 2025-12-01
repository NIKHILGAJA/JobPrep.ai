
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ResumeAnalysis, JDMatchResult, InterviewQuestion, GDTopic } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper to convert File to Base64
export const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const GeminiService = {
  // 1. Analyze Resume
  analyzeResume: async (file: File): Promise<ResumeAnalysis> => {
    const filePart = await fileToGenerativePart(file);

    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        email: { type: Type.STRING },
        skills: { type: Type.ARRAY, items: { type: Type.STRING } },
        score: { type: Type.NUMBER, description: "A score from 0 to 100 based on resume completeness and formatting" },
        summary: { type: Type.STRING },
        missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        improvements: { type: Type.ARRAY, items: { type: Type.STRING } },
        education: { type: Type.ARRAY, items: { type: Type.STRING } },
        experience: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["name", "skills", "score", "improvements"],
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
            filePart,
            { text: "Analyze this resume. Extract key details and provide critical feedback for improvement. Output strictly in JSON." }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    return JSON.parse(response.text || "{}");
  },

  // 2. JD Matcher
  matchJD: async (resumeText: string, jdText: string): Promise<JDMatchResult> => {
    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        matchPercentage: { type: Type.NUMBER },
        matchedSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
        missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
        recruiterFeedback: { type: Type.STRING },
        atsScore: { type: Type.NUMBER, description: "Estimated ATS score based on keyword matching" },
      },
      required: ["matchPercentage", "matchedSkills", "missingSkills", "atsScore"],
    };

    const prompt = `
      Resume Text: "${resumeText.substring(0, 5000)}"
      
      Job Description: "${jdText.substring(0, 5000)}"
      
      Compare the resume against the job description. Calculate a match percentage and ATS score. Identify missing keywords.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    return JSON.parse(response.text || "{}");
  },

  // 3. Generate Interview Questions
  generateQuestions: async (role: string, jdText?: string): Promise<InterviewQuestion[]> => {
    const schema: Schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER },
          question: { type: Type.STRING },
          type: { type: Type.STRING, enum: ["technical", "behavioral"] },
          difficulty: { type: Type.STRING, enum: ["easy", "medium", "hard"] },
          followUp: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
      },
    };

    const prompt = `Generate 8 technical questions (mix of easy/medium/hard) and 4 behavioral questions for a ${role} role. 
    ${jdText ? `Base it on this JD snippet: ${jdText.substring(0, 1000)}` : ''}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    return JSON.parse(response.text || "[]");
  },

  // 4. GD Topic Generator
  generateGDTopic: async (topicInput?: string): Promise<GDTopic> => {
    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        topic: { type: Type.STRING },
        openingLines: { type: Type.ARRAY, items: { type: Type.STRING } },
        points: { type: Type.ARRAY, items: { type: Type.STRING } },
        pros: { type: Type.ARRAY, items: { type: Type.STRING } },
        cons: { type: Type.ARRAY, items: { type: Type.STRING } },
        conclusions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Strategies or lines to effectively conclude the discussion." },
      },
    };

    const prompt = topicInput 
      ? `Generate a detailed Group Discussion guide for the topic: "${topicInput}". Include pros, cons, opening lines, key points, and strategies to conclude the discussion.`
      : "Generate a trending or abstract Group Discussion topic for a corporate interview process. Include pros, cons, opening lines, key points, and strategies to conclude.";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    return JSON.parse(response.text || "{}");
  },

  // 5. Mock Interview Chat (Feedback Loop)
  getInterviewFeedback: async (history: {role: string, parts: {text: string}[]}[], lastAnswer: string): Promise<{feedback: string, nextQuestion: string}> => {
     const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        feedback: { type: Type.STRING, description: "Critique of the candidate's last answer." },
        nextQuestion: { type: Type.STRING, description: "The next interview question." },
      },
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: lastAnswer }] }
      ],
      config: {
        systemInstruction: "You are a professional HR Interviewer. You are strict but fair. Evaluate the candidate's answer for clarity, STAR method usage, and relevance. Keep feedback concise. Then ask a follow-up or new question.",
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    return JSON.parse(response.text || "{}");
  }
};
