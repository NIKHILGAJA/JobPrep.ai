
export interface ResumeAnalysis {
  name: string;
  email: string;
  skills: string[];
  score: number;
  summary: string;
  missingKeywords: string[];
  improvements: string[];
  education: string[];
  experience: string[];
}

export interface JDMatchResult {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  recruiterFeedback: string;
  atsScore: number;
}

export interface InterviewQuestion {
  id: number;
  question: string;
  type: 'technical' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  followUp?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  feedback?: string; // AI feedback on the user's answer
}

export interface GDTopic {
  topic: string;
  openingLines: string[];
  points: string[];
  pros: string[];
  cons: string[];
  conclusions: string[];
}

export enum AppRoute {
  DASHBOARD = 'dashboard',
  RESUME = 'resume',
  JD_MATCH = 'jd-match',
  INTERVIEW_PREP = 'interview-prep',
  MOCK_INTERVIEW = 'mock-interview',
  GD_TRAINER = 'gd-trainer'
}
