/**
 * Type definitions for worksheet generation
 */

export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Theme = 'animals' | 'space' | 'food' | 'nature' | 'other';

export type MathematicalTool = 
  | 'base_ten_blocks'
  | 'ten_frames'
  | 'fraction_bars'
  | 'area_models'
  | 'bar_models'
  | 'number_lines'
  | 'arrays'
  | 'hundreds_charts'
  | 'geoboards'
  | 'money_manipulatives';

export type ProblemSolvingStrategy =
  | 'none'
  | 'draw_picture'
  | 'make_table'
  | 'look_patterns'
  | 'work_backwards'
  | 'break_parts'
  | 'real_world'
  | 'multiple_methods'
  | 'error_analysis';

export type ScaffoldingLevel = 'none' | 'guided' | 'heavy';
export type RepresentationType = 'concrete' | 'pictorial' | 'abstract' | 'mixed';

export interface GenerateWorksheetRequest {
  gradeLevel: GradeLevel;
  topic: string;
  difficulty: Difficulty;
  problemCount: number; // 5-20
  theme: Theme;
  mathematicalTools?: MathematicalTool[];
  problemSolvingStrategy?: ProblemSolvingStrategy;
  scaffoldingLevel?: ScaffoldingLevel;
  representationType?: RepresentationType;
  includeThinkingPrompts?: boolean;
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
  | 'fraction_circle'
  | 'base_ten_blocks'
  | 'ten_frames'
  | 'fraction_bars'
  | 'area_model'
  | 'bar_model'
  | 'hundreds_chart'
  | 'clock_face'
  | 'money_display'
  | 'coordinate_grid'
  | 'measurement_tools';

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
  
  // Base Ten Blocks
  hundreds?: number;
  tens?: number;
  ones?: number;
  
  // Ten Frames
  filled?: number;
  total?: number;
  
  // Fraction Bars
  wholes?: number;
  parts?: number;
  shaded?: number;
  
  // Area Model
  width?: number;
  height?: number;
  partitions?: Array<{ width: number; height: number; label?: string }>;
  
  // Bar Model
  bars?: Array<{ length: number; label?: string; color?: string }>;
  
  // Hundreds Chart
  chartStart?: number;
  chartEnd?: number;
  highlightedNumbers?: number[];
  
  // Clock
  hours?: number;
  minutes?: number;
  
  // Money
  dollars?: number;
  quarters?: number;
  dimes?: number;
  nickels?: number;
  pennies?: number;
  
  // Coordinate Grid
  points?: Array<{ x: number; y: number; label?: string }>;
  gridSize?: number;
  
  // Measurement Tools
  unit?: string;
  measurement?: number;
  scale?: number;
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
