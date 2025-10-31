/**
 * Math topics organized by grade level
 * Based on Common Core Math Standards
 */

export type GradeLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Theme = 'animals' | 'space' | 'food' | 'nature' | 'other';

export interface Topic {
  id: string;
  name: string;
  description: string;
  grades: GradeLevel[];
}

export const TOPICS: Topic[] = [
  // Grade 1-2
  {
    id: 'counting',
    name: 'Counting',
    description: 'Count objects and write numbers',
    grades: [1, 2],
  },
  {
    id: 'addition-basic',
    name: 'Addition (Basic)',
    description: 'Addition within 20',
    grades: [1, 2],
  },
  {
    id: 'subtraction-basic',
    name: 'Subtraction (Basic)',
    description: 'Subtraction within 20',
    grades: [1, 2],
  },
  {
    id: 'place-value-basic',
    name: 'Place Value',
    description: 'Tens and ones',
    grades: [1, 2],
  },

  // Grade 2-3
  {
    id: 'addition-regrouping',
    name: 'Addition with Regrouping',
    description: 'Two-digit addition with carrying',
    grades: [2, 3],
  },
  {
    id: 'subtraction-regrouping',
    name: 'Subtraction with Regrouping',
    description: 'Two-digit subtraction with borrowing',
    grades: [2, 3],
  },
  {
    id: 'skip-counting',
    name: 'Skip Counting',
    description: 'Count by 2s, 5s, 10s',
    grades: [2, 3],
  },

  // Grade 3-4
  {
    id: 'multiplication-basic',
    name: 'Multiplication (Basic)',
    description: 'Times tables 1-10',
    grades: [3, 4],
  },
  {
    id: 'division-basic',
    name: 'Division (Basic)',
    description: 'Basic division facts',
    grades: [3, 4],
  },
  {
    id: 'fractions-basic',
    name: 'Fractions (Basic)',
    description: 'Simple fractions and comparisons',
    grades: [3, 4],
  },
  {
    id: 'area-perimeter',
    name: 'Area and Perimeter',
    description: 'Calculate area and perimeter of shapes',
    grades: [3, 4, 5],
  },

  // Grade 4-5
  {
    id: 'multiplication-multi-digit',
    name: 'Multi-Digit Multiplication',
    description: 'Multiply larger numbers',
    grades: [4, 5],
  },
  {
    id: 'division-multi-digit',
    name: 'Multi-Digit Division',
    description: 'Long division',
    grades: [4, 5],
  },
  {
    id: 'fractions-operations',
    name: 'Fraction Operations',
    description: 'Add, subtract, multiply fractions',
    grades: [4, 5, 6],
  },
  {
    id: 'decimals',
    name: 'Decimals',
    description: 'Decimal operations',
    grades: [4, 5, 6],
  },

  // Grade 5-6
  {
    id: 'percentages',
    name: 'Percentages',
    description: 'Percent calculations',
    grades: [5, 6],
  },
  {
    id: 'ratios-proportions',
    name: 'Ratios and Proportions',
    description: 'Ratios, rates, and proportions',
    grades: [6],
  },
  {
    id: 'integers',
    name: 'Integers',
    description: 'Negative numbers and operations',
    grades: [6],
  },
  {
    id: 'algebraic-expressions',
    name: 'Algebraic Expressions',
    description: 'Simple expressions and equations',
    grades: [6],
  },
];

export const THEMES: { id: Theme; name: string; emoji: string }[] = [
  { id: 'animals', name: 'Animals', emoji: '🐶' },
  { id: 'space', name: 'Space', emoji: '🚀' },
  { id: 'food', name: 'Food', emoji: '🍎' },
  { id: 'nature', name: 'Nature', emoji: '🌸' },
  { id: 'other', name: 'Shapes & Objects', emoji: '🔷' },
];

export const DIFFICULTIES: { id: Difficulty; name: string; description: string }[] = [
  { id: 'easy', name: 'Easy', description: 'Simple problems for practice' },
  { id: 'medium', name: 'Medium', description: 'Standard difficulty' },
  { id: 'hard', name: 'Hard', description: 'Challenging problems' },
];

/**
 * Get topics available for a specific grade level
 */
export function getTopicsForGrade(grade: GradeLevel): Topic[] {
  return TOPICS.filter(topic => topic.grades.includes(grade));
}

/**
 * Get topic by ID
 */
export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find(topic => topic.id === id);
}
