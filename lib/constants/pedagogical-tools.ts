/**
 * Mathematical tools and problem-solving strategies for enhanced worksheet generation
 */

import type { MathematicalTool, ProblemSolvingStrategy, ScaffoldingLevel, RepresentationType } from '@/types/worksheet';

export interface ToolDefinition {
  id: MathematicalTool;
  name: string;
  description: string;
  grades: number[];
  subjects: string[];
  icon: string;
}

export interface StrategyDefinition {
  id: ProblemSolvingStrategy;
  name: string;
  description: string;
  grades: number[];
  instruction: string;
  icon: string;
}

export const MATHEMATICAL_TOOLS: ToolDefinition[] = [
  {
    id: 'base_ten_blocks',
    name: 'Base Ten Blocks',
    description: 'Visual place value representation using hundreds, tens, and ones blocks',
    grades: [1, 2, 3, 4, 5],
    subjects: ['place-value-basic', 'addition-regrouping', 'subtraction-regrouping'],
    icon: '🧱'
  },
  {
    id: 'ten_frames',
    name: 'Ten Frames',
    description: 'Structured counting and number sense development',
    grades: [1, 2],
    subjects: ['counting', 'addition-basic', 'subtraction-basic'],
    icon: '⬜'
  },
  {
    id: 'fraction_bars',
    name: 'Fraction Bars',
    description: 'Visual fraction understanding with proportional bars',
    grades: [3, 4, 5, 6],
    subjects: ['fractions-basic', 'fractions-operations'],
    icon: '📊'
  },
  {
    id: 'area_models',
    name: 'Area Models',
    description: 'Rectangle-based models for multiplication, division, and fractions',
    grades: [3, 4, 5, 6],
    subjects: ['multiplication-basic', 'multiplication-multi-digit', 'fractions-operations'],
    icon: '⬛'
  },
  {
    id: 'bar_models',
    name: 'Bar Models (Tape Diagrams)',
    description: 'Singapore math approach for problem representation',
    grades: [2, 3, 4, 5, 6],
    subjects: ['addition-basic', 'subtraction-basic', 'multiplication-basic', 'word-problems-multistep'],
    icon: '▬'
  },
  {
    id: 'number_lines',
    name: 'Number Lines',
    description: 'Enhanced number lines for operations and number sense',
    grades: [1, 2, 3, 4, 5, 6],
    subjects: ['counting', 'addition-basic', 'subtraction-basic', 'integers'],
    icon: '↔️'
  },
  {
    id: 'arrays',
    name: 'Arrays',
    description: 'Grid arrangements for multiplication and division understanding',
    grades: [2, 3, 4, 5],
    subjects: ['multiplication-basic', 'division-basic', 'area-perimeter'],
    icon: '⬜'
  },
  {
    id: 'hundreds_charts',
    name: 'Hundreds Charts',
    description: 'Number patterns and relationships visualization',
    grades: [1, 2, 3, 4],
    subjects: ['counting', 'skip-counting', 'patterns-sequences'],
    icon: '💯'
  },
  {
    id: 'geoboards',
    name: 'Geoboards',
    description: 'Geometric shapes and spatial reasoning tool',
    grades: [3, 4, 5, 6],
    subjects: ['shapes-2d', 'area-perimeter', 'coordinate-plane'],
    icon: '📐'
  },
  {
    id: 'money_manipulatives',
    name: 'Money Manipulatives',
    description: 'Coins and bills for real-world mathematics',
    grades: [1, 2, 3, 4],
    subjects: ['money-coins', 'decimals'],
    icon: '💰'
  }
];

export const PROBLEM_SOLVING_STRATEGIES: StrategyDefinition[] = [
  {
    id: 'draw_picture',
    name: 'Draw a Picture/Diagram',
    description: 'Visual representation of problem elements',
    grades: [1, 2, 3, 4, 5, 6],
    instruction: 'Draw a picture to help you understand and solve this problem.',
    icon: '🎨'
  },
  {
    id: 'make_table',
    name: 'Make a Table/Chart',
    description: 'Organize information systematically',
    grades: [3, 4, 5, 6],
    instruction: 'Organize the information in a table or chart.',
    icon: '📋'
  },
  {
    id: 'look_patterns',
    name: 'Look for Patterns',
    description: 'Identify mathematical patterns and relationships',
    grades: [2, 3, 4, 5, 6],
    instruction: 'Look for patterns to help you find the answer.',
    icon: '🔍'
  },
  {
    id: 'work_backwards',
    name: 'Work Backwards',
    description: 'Start with the answer and work in reverse',
    grades: [3, 4, 5, 6],
    instruction: 'Start with what you know at the end and work backwards.',
    icon: '⏪'
  },
  {
    id: 'break_parts',
    name: 'Break into Smaller Parts',
    description: 'Decompose complex problems into manageable pieces',
    grades: [2, 3, 4, 5, 6],
    instruction: 'Break this problem into smaller, easier parts.',
    icon: '🧩'
  },
  {
    id: 'real_world',
    name: 'Real-World Applications',
    description: 'Connect mathematics to everyday situations',
    grades: [1, 2, 3, 4, 5, 6],
    instruction: 'Think about how this problem connects to real life.',
    icon: '🌍'
  },
  {
    id: 'multiple_methods',
    name: 'Multiple Solution Methods',
    description: 'Show different ways to solve the same problem',
    grades: [3, 4, 5, 6],
    instruction: 'Try to solve this problem in more than one way.',
    icon: '🔄'
  },
  {
    id: 'error_analysis',
    name: 'Error Analysis',
    description: 'Find and explain common mistakes',
    grades: [3, 4, 5, 6],
    instruction: 'Find the error in this solution and explain how to fix it.',
    icon: '🔍'
  }
];

export const SCAFFOLDING_LEVELS: Array<{
  id: ScaffoldingLevel;
  name: string;
  description: string;
}> = [
  {
    id: 'none',
    name: 'Independent',
    description: 'Minimal support - students work independently'
  },
  {
    id: 'guided',
    name: 'Guided Practice',
    description: 'Some hints and prompts provided'
  },
  {
    id: 'heavy',
    name: 'Heavily Supported',
    description: 'Step-by-step guidance and examples'
  }
];

export const REPRESENTATION_TYPES: Array<{
  id: RepresentationType;
  name: string;
  description: string;
}> = [
  {
    id: 'concrete',
    name: 'Concrete',
    description: 'Physical manipulatives and real objects'
  },
  {
    id: 'pictorial',
    name: 'Pictorial',
    description: 'Visual representations and diagrams'
  },
  {
    id: 'abstract',
    name: 'Abstract',
    description: 'Numbers and symbolic notation'
  },
  {
    id: 'mixed',
    name: 'Mixed',
    description: 'Combination of concrete, pictorial, and abstract'
  }
];

/**
 * Get tools appropriate for a specific topic and grade level
 */
export function getToolsForTopicAndGrade(topicId: string, gradeLevel: number): ToolDefinition[] {
  return MATHEMATICAL_TOOLS.filter(tool => 
    tool.grades.includes(gradeLevel) && 
    tool.subjects.includes(topicId)
  );
}

/**
 * Get strategies appropriate for a specific grade level
 */
export function getStrategiesForGrade(gradeLevel: number): StrategyDefinition[] {
  return PROBLEM_SOLVING_STRATEGIES.filter(strategy => 
    strategy.grades.includes(gradeLevel)
  );
}

/**
 * Get recommended tools based on topic type
 */
export function getRecommendedTools(topicId: string): MathematicalTool[] {
  const recommendations: Record<string, MathematicalTool[]> = {
    // Number & Operations
    'counting': ['ten_frames', 'hundreds_charts'],
    'place-value-basic': ['base_ten_blocks', 'hundreds_charts'],
    'addition-basic': ['ten_frames', 'number_lines', 'bar_models'],
    'subtraction-basic': ['ten_frames', 'number_lines', 'bar_models'],
    'multiplication-basic': ['arrays', 'area_models', 'bar_models'],
    'division-basic': ['arrays', 'area_models', 'bar_models'],
    
    // Fractions
    'fractions-basic': ['fraction_bars', 'area_models'],
    'fractions-operations': ['fraction_bars', 'area_models', 'bar_models'],
    
    // Measurement & Data
    'money-coins': ['money_manipulatives'],
    'time-calendar': ['number_lines'],
    'data-graphs': ['bar_models'],
    
    // Geometry
    'shapes-2d': ['geoboards'],
    'area-perimeter': ['geoboards', 'arrays'],
    'coordinate-plane': ['geoboards']
  };
  
  return recommendations[topicId] || [];
}