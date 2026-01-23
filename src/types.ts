export type Act = 'I' | 'II' | 'III' | 'IV';

export interface Entry {
  dateKey: string; // YYYY-MM-DD
  dayIndex: number; // 1-based index (global day index for the story)
  act: Act;
  promptText: string;
  sceneDescription: string;
  moodTag: string;
  imageUrl: string;
  audioUrl: string;
  response: string; // User submitted text
  createdAt: number; // timestamp
}

export interface UserState {
  userId: string;
}

export interface DailyContent {
  promptText: string;
  sceneDescription: string;
  moodTag: string;
  imageUrl: string;
  audioUrl: string;
}
