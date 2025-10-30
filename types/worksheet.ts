/**
 * Type definitions for worksheet generation
 */

export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Theme = 'animals' | 'space' | 'sports' | 'food' | 'nature';

export interface GenerateWorksheetRequest {
  gradeLevel: GradeLevel;
  topic: string;
  difficulty: Difficulty;
  problemCount: number; // 5-20
  theme: Theme;
}

export interface GenerateWorksheetResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  worksheetUrl?: string;
  answerKeyUrl?: string;
  error?: string;
}

export interface WorksheetProblem {
  id: number;
  question: string;
  answer: string | number;
  visualAid?: VisualAid;
  workingSpace?: boolean;
}

export type VisualAidType =
  | 'countable_objects'
  | 'grouped_objects'
  | 'array'
  | 'number_line'
  | 'fraction_circle';

export interface VisualAid {
  type: VisualAidType;
  item?: string;
  count?: number;
  groups?: Array<{ item: string; count: number }>;
  rows?: number;
  cols?: number;
  start?: number;
  end?: number;
  highlights?: number[];
  numerator?: number;
  denominator?: number;
}

export interface WorksheetData {
  title: string;
  problems: WorksheetProblem[];
  instructions: string;
  metadata: {
    gradeLevel: GradeLevel;
    topic: string;
    difficulty: Difficulty;
    theme: Theme;
    standards: string[];
  };
}
