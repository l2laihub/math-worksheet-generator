/**
 * Tool usage examples for educational worksheets
 */

import type { MathematicalTool } from '@/types/worksheet';

export interface ToolExampleStep {
  number: number;
  description: string;
  visualization?: string;
}

export interface ToolExample {
  toolId: MathematicalTool;
  toolName: string;
  problem: string;
  steps: ToolExampleStep[];
  solution: string;
  gradeLevel: number[];
  topic: string[];
}

export const TOOL_EXAMPLES: ToolExample[] = [
  // Ten Frames Examples
  {
    toolId: 'ten_frames',
    toolName: 'Ten Frames',
    problem: 'What is 6 + 3?',
    steps: [
      {
        number: 1,
        description: 'Put 6 dots in the first ten frame',
        visualization: 'Ten frame 1: 6 filled circles, 4 empty circles'
      },
      {
        number: 2,
        description: 'Put 3 dots in the second ten frame',
        visualization: 'Ten frame 2: 3 filled circles, 7 empty circles'
      },
      {
        number: 3,
        description: 'Count all the filled dots to find the answer',
        visualization: '6 + 3 = 9 dots total'
      }
    ],
    solution: '6 + 3 = 9',
    gradeLevel: [1, 2],
    topic: ['addition-basic', 'counting']
  },
  {
    toolId: 'ten_frames',
    toolName: 'Ten Frames',
    problem: 'What is 8 - 3?',
    steps: [
      {
        number: 1,
        description: 'Put 8 dots in a ten frame',
        visualization: 'Ten frame: 8 filled circles, 2 empty circles'
      },
      {
        number: 2,
        description: 'Remove 3 dots by covering them',
        visualization: 'Cover 3 dots: 5 filled circles, 5 empty circles'
      },
      {
        number: 3,
        description: 'Count the remaining dots',
        visualization: '5 dots are left'
      }
    ],
    solution: '8 - 3 = 5',
    gradeLevel: [1, 2],
    topic: ['subtraction-basic']
  },

  // Base Ten Blocks Examples
  {
    toolId: 'base_ten_blocks',
    toolName: 'Base Ten Blocks',
    problem: 'What is 25 + 13?',
    steps: [
      {
        number: 1,
        description: 'Show 25 using blocks',
        visualization: '2 ten-blocks + 5 one-blocks = 25'
      },
      {
        number: 2,
        description: 'Show 13 using blocks',
        visualization: '1 ten-block + 3 one-blocks = 13'
      },
      {
        number: 3,
        description: 'Combine the blocks',
        visualization: '2 + 1 = 3 tens, 5 + 3 = 8 ones'
      },
      {
        number: 4,
        description: 'Write the final answer',
        visualization: '3 ten-blocks + 8 one-blocks = 38'
      }
    ],
    solution: '25 + 13 = 38',
    gradeLevel: [2, 3, 4, 5],
    topic: ['place-value-basic', 'addition-regrouping']
  },
  {
    toolId: 'base_ten_blocks',
    toolName: 'Base Ten Blocks',
    problem: 'What is 42 - 15?',
    steps: [
      {
        number: 1,
        description: 'Show 42 using blocks',
        visualization: '4 ten-blocks + 2 one-blocks = 42'
      },
      {
        number: 2,
        description: 'We need to subtract 15 (1 ten + 5 ones)',
        visualization: 'Need to take away 1 ten-block + 5 one-blocks'
      },
      {
        number: 3,
        description: 'Trade 1 ten for 10 ones since we need more ones',
        visualization: '3 ten-blocks + 12 one-blocks (same as 42)'
      },
      {
        number: 4,
        description: 'Now subtract: 12 - 5 = 7 ones, 3 - 1 = 2 tens',
        visualization: '2 ten-blocks + 7 one-blocks = 27'
      }
    ],
    solution: '42 - 15 = 27',
    gradeLevel: [3, 4, 5],
    topic: ['subtraction-regrouping']
  },

  // Arrays Examples
  {
    toolId: 'arrays',
    toolName: 'Arrays',
    problem: 'What is 4 × 3?',
    steps: [
      {
        number: 1,
        description: 'Make 4 rows with 3 objects in each row',
        visualization: '4 rows × 3 objects = 12 total'
      },
      {
        number: 2,
        description: 'Count all the objects by rows',
        visualization: '3 + 3 + 3 + 3 = 12'
      },
      {
        number: 3,
        description: 'Or count all the objects at once',
        visualization: '4 rows × 3 in each row = 12 total'
      }
    ],
    solution: '4 × 3 = 12',
    gradeLevel: [2, 3, 4, 5],
    topic: ['multiplication-basic']
  },

  // Area Models Examples
  {
    toolId: 'area_models',
    toolName: 'Area Models',
    problem: 'What is 23 × 15?',
    steps: [
      {
        number: 1,
        description: 'Break apart the numbers into tens and ones',
        visualization: '23 = 20 + 3, and 15 = 10 + 5'
      },
      {
        number: 2,
        description: 'Draw a rectangle and divide it into 4 sections',
        visualization: 'Make a grid:\n\n    |  10  |   5  |\n----|------|------|\n 20 | 200  |  100 |\n----|------|------|\n  3 |  30  |   15 |'
      },
      {
        number: 3,
        description: 'Calculate the area of each section',
        visualization: '20×10=200, 20×5=100, 3×10=30, 3×5=15'
      },
      {
        number: 4,
        description: 'Add all sections together to find the total area',
        visualization: '200 + 100 + 30 + 15 = 345'
      }
    ],
    solution: '23 × 15 = 345',
    gradeLevel: [4, 5, 6],
    topic: ['multiplication-multi-digit']
  },
  {
    toolId: 'area_models',
    toolName: 'Area Models',
    problem: 'What is 12 × 7?',
    steps: [
      {
        number: 1,
        description: 'Break apart 12 into 10 + 2',
        visualization: '12 = 10 + 2'
      },
      {
        number: 2,
        description: 'Draw a rectangle split into 2 parts',
        visualization: 'Rectangle: 10×7 | 2×7'
      },
      {
        number: 3,
        description: 'Calculate each part',
        visualization: '70 + 14 = 84'
      }
    ],
    solution: '12 × 7 = 84',
    gradeLevel: [3, 4],
    topic: ['multiplication-basic']
  },

  // Number Lines Examples
  {
    toolId: 'number_lines',
    toolName: 'Number Lines',
    problem: 'What is 7 + 5?',
    steps: [
      {
        number: 1,
        description: 'Start at 7 on the number line',
        visualization: '0--1--2--3--4--5--6--7--8--9--10--11--12\n                        ^start here'
      },
      {
        number: 2,
        description: 'Jump forward 5 spaces',
        visualization: '0--1--2--3--4--5--6--7>>8>>9>>10>>11>>12\n                        ^jump 5 spaces  ^'
      },
      {
        number: 3,
        description: 'See where you land',
        visualization: 'You land on 12'
      }
    ],
    solution: '7 + 5 = 12',
    gradeLevel: [1, 2, 3, 4, 5, 6],
    topic: ['addition-basic', 'counting']
  },
  {
    toolId: 'number_lines',
    toolName: 'Number Lines',
    problem: 'What is 2.3 + 1.4?',
    steps: [
      {
        number: 1,
        description: 'Start at 2.3 on the decimal number line',
        visualization: '0-----1-----2----2.3-----3-----4-----5\n                    ^start here'
      },
      {
        number: 2,
        description: 'Jump forward 1.4 spaces (1 whole + 4 tenths)',
        visualization: '0-----1-----2----2.3>>>>>3.7---4-----5\n                    ^jump 1.4    ^land here'
      },
      {
        number: 3,
        description: 'See where you land',
        visualization: 'You land on 3.7'
      }
    ],
    solution: '2.3 + 1.4 = 3.7',
    gradeLevel: [4, 5, 6],
    topic: ['decimals', 'addition-basic']
  },

  // Fraction Bars Examples
  {
    toolId: 'fraction_bars',
    toolName: 'Fraction Bars',
    problem: 'What is 1/4 + 1/4?',
    steps: [
      {
        number: 1,
        description: 'Show 1/4 using a fraction bar',
        visualization: 'Fraction bar: 1 part shaded, 3 parts empty (1/4)'
      },
      {
        number: 2,
        description: 'Show another 1/4 using a fraction bar',
        visualization: 'Another fraction bar: 1 part shaded, 3 parts empty (1/4)'
      },
      {
        number: 3,
        description: 'Combine the shaded parts',
        visualization: 'Combined: 2 parts shaded, 2 parts empty (2/4)'
      },
      {
        number: 4,
        description: 'Write as a fraction',
        visualization: '2/4 = 1/2'
      }
    ],
    solution: '1/4 + 1/4 = 2/4 = 1/2',
    gradeLevel: [3, 4, 5, 6],
    topic: ['fractions-basic', 'fractions-operations']
  },

  // Bar Models Examples
  {
    toolId: 'bar_models',
    toolName: 'Bar Models (Tape Diagrams)',
    problem: 'Sarah has 24 stickers. She gives away 8 stickers. How many does she have left?',
    steps: [
      {
        number: 1,
        description: 'Draw a bar to show all 24 stickers',
        visualization: 'Total bar: [========================] 24 stickers'
      },
      {
        number: 2,
        description: 'Mark the part she gives away (8 stickers)',
        visualization: 'Split bar: [########|----------------] \n           8 gave away  16 left'
      },
      {
        number: 3,
        description: 'Find the remaining part',
        visualization: '24 - 8 = 16 stickers left'
      }
    ],
    solution: 'Sarah has 16 stickers left',
    gradeLevel: [2, 3, 4, 5, 6],
    topic: ['subtraction-basic', 'word-problems-multistep']
  },
  {
    toolId: 'bar_models',
    toolName: 'Bar Models (Tape Diagrams)',
    problem: 'A recipe calls for 2.5 cups of flour. Maria has already added 1.8 cups. How much more flour does she need?',
    steps: [
      {
        number: 1,
        description: 'Draw a bar to show the total flour needed (2.5 cups)',
        visualization: 'Total bar: [=========================] 2.5 cups total'
      },
      {
        number: 2,
        description: 'Mark the part already added (1.8 cups)',
        visualization: 'Split bar: [##################|-------] \n           1.8 cups used     0.7 needed'
      },
      {
        number: 3,
        description: 'Find the remaining part',
        visualization: '2.5 - 1.8 = 0.7 cups more needed'
      }
    ],
    solution: 'Maria needs 0.7 more cups of flour',
    gradeLevel: [4, 5, 6],
    topic: ['decimals', 'subtraction-basic', 'word-problems-multistep']
  },

  // Hundreds Charts Examples
  {
    toolId: 'hundreds_charts',
    toolName: 'Hundreds Charts',
    problem: 'What is 47 + 20?',
    steps: [
      {
        number: 1,
        description: 'Find 47 on the hundreds chart',
        visualization: 'Locate 47 in row 5, column 7'
      },
      {
        number: 2,
        description: 'To add 20, move down 2 rows (each row = 10)',
        visualization: 'From 47, go down 2 rows'
      },
      {
        number: 3,
        description: 'See where you land',
        visualization: 'You land on 67'
      }
    ],
    solution: '47 + 20 = 67',
    gradeLevel: [1, 2, 3, 4],
    topic: ['addition-basic', 'place-value-basic', 'patterns-sequences']
  },

  // Money Manipulatives Examples
  {
    toolId: 'money_manipulatives',
    toolName: 'Money Manipulatives',
    problem: 'How much is 2 quarters + 3 dimes + 1 nickel?',
    steps: [
      {
        number: 1,
        description: 'Count the quarters: 2 quarters = 50¢',
        visualization: '2 quarters = 50¢'
      },
      {
        number: 2,
        description: 'Count the dimes: 3 dimes = 30¢',
        visualization: '3 dimes = 30¢'
      },
      {
        number: 3,
        description: 'Count the nickel: 1 nickel = 5¢',
        visualization: '1 nickel = 5¢'
      },
      {
        number: 4,
        description: 'Add all the coins together',
        visualization: '50¢ + 30¢ + 5¢ = 85¢'
      }
    ],
    solution: 'Total = 85¢ or $0.85',
    gradeLevel: [1, 2, 3, 4],
    topic: ['money-coins', 'decimals']
  },

  // Geoboards Examples
  {
    toolId: 'geoboards',
    toolName: 'Geoboards',
    problem: 'What is the area of a rectangle that is 3 units wide and 4 units tall?',
    steps: [
      {
        number: 1,
        description: 'Use rubber bands to make a rectangle on the geoboard',
        visualization: '5×5 geoboard with rubber band rectangle: 3 units wide by 2 units tall'
      },
      {
        number: 2,
        description: 'Count the squares inside the rectangle',
        visualization: 'Area calculation: 3 × 2 = 6 square units inside the rectangle'
      },
      {
        number: 3,
        description: 'Use the formula: length × width',
        visualization: 'Formula: Area = length × width = 3 × 2 = 6 square units'
      }
    ],
    solution: 'Area = 6 square units',
    gradeLevel: [3, 4, 5, 6],
    topic: ['area-perimeter', 'shapes-2d']
  },
  
  // Partial Products Examples
  {
    toolId: 'partial_products',
    toolName: 'Partial Products',
    problem: 'What is 23 × 15?',
    steps: [
      {
        number: 1,
        description: 'Break down each number by place value',
        visualization: '23 = 20 + 3, and 15 = 10 + 5'
      },
      {
        number: 2,
        description: 'Multiply each part (create all combinations)',
        visualization: '20 × 10 = 200\n20 × 5 = 100\n3 × 10 = 30\n3 × 5 = 15'
      },
      {
        number: 3,
        description: 'Add all the partial products',
        visualization: '200 + 100 + 30 + 15 = 345'
      },
      {
        number: 4,
        description: 'Use the Box Method to organize your work:',
        visualization: 'Draw boxes for each partial product:\n\n[200] = 20 × 10\n[100] = 20 × 5  \n[30]  = 3 × 10\n[15]  = 3 × 5\n________________\n[345] = 200 + 100 + 30 + 15'
      }
    ],
    solution: '23 × 15 = 345',
    gradeLevel: [3, 4, 5, 6],
    topic: ['multiplication-multi-digit', 'multiplication-basic']
  },
  
  // Lattice Multiplication Example
  {
    toolId: 'lattice_multiplication',
    toolName: 'Lattice Multiplication',
    problem: 'What is 34 × 26?',
    steps: [
      {
        number: 1,
        description: 'Create a 2×2 grid and write the digits along the top and right',
        visualization: 'Grid with 3, 4 on top and 2, 6 on right'
      },
      {
        number: 2,
        description: 'Multiply each pair and write in the diagonal boxes',
        visualization: '3×2=06, 3×6=18, 4×2=08, 4×6=24'
      },
      {
        number: 3,
        description: 'Add along the diagonals to get the answer',
        visualization: 'Diagonal sums: 0, 6+1+0, 8+8+2, 4 = 0884 = 884'
      }
    ],
    solution: '34 × 26 = 884',
    gradeLevel: [4, 5, 6],
    topic: ['multiplication-multi-digit']
  },
  
  // Decomposition Method Example
  {
    toolId: 'decomposition_method',
    toolName: 'Decomposition Method',
    problem: 'What is 345 + 178?',
    steps: [
      {
        number: 1,
        description: 'Break down both numbers by place value',
        visualization: '345 = 300 + 40 + 5\n178 = 100 + 70 + 8'
      },
      {
        number: 2,
        description: 'Add by place value',
        visualization: 'Hundreds: 300 + 100 = 400\nTens: 40 + 70 = 110\nOnes: 5 + 8 = 13'
      },
      {
        number: 3,
        description: 'Combine all parts',
        visualization: '400 + 110 + 13 = 523'
      }
    ],
    solution: '345 + 178 = 523',
    gradeLevel: [2, 3, 4, 5],
    topic: ['addition-regrouping', 'place-value-basic']
  },
  
  // Counters Example
  {
    toolId: 'counters',
    toolName: 'Counters',
    problem: 'Skip count by 3s to 15',
    steps: [
      {
        number: 1,
        description: 'Make groups of 3 counters',
        visualization: 'Group 1: ⭕⭕⭕'
      },
      {
        number: 2,
        description: 'Keep adding groups of 3',
        visualization: 'Groups: ⭕⭕⭕ | ⭕⭕⭕ | ⭕⭕⭕ | ⭕⭕⭕ | ⭕⭕⭕'
      },
      {
        number: 3,
        description: 'Count by 3s: 3, 6, 9, 12, 15',
        visualization: '5 groups of 3 = 15 counters total'
      }
    ],
    solution: '3, 6, 9, 12, 15',
    gradeLevel: [1, 2, 3],
    topic: ['skip-counting', 'multiplication-basic']
  },
  
  // Pattern Blocks Example
  {
    toolId: 'pattern_blocks',
    toolName: 'Pattern Blocks',
    problem: 'Show that 1/2 + 1/2 = 1 whole',
    steps: [
      {
        number: 1,
        description: 'Use two trapezoid blocks (red)',
        visualization: 'Two red trapezoids side by side'
      },
      {
        number: 2,
        description: 'Compare to one hexagon (yellow)',
        visualization: 'The two trapezoids together equal one hexagon'
      },
      {
        number: 3,
        description: 'Each trapezoid is 1/2 of the hexagon',
        visualization: '1/2 + 1/2 = 1 whole hexagon'
      }
    ],
    solution: '1/2 + 1/2 = 1',
    gradeLevel: [2, 3, 4, 5],
    topic: ['fractions-basic', 'shapes-2d']
  }
];

/**
 * Get examples for specific tools and grade level
 */
export function getToolExamples(
  toolIds: MathematicalTool[], 
  gradeLevel: number,
  topic?: string
): ToolExample[] {
  return TOOL_EXAMPLES.filter(example => 
    toolIds.includes(example.toolId) &&
    example.gradeLevel.includes(gradeLevel) &&
    (!topic || example.topic.includes(topic))
  );
}

/**
 * Get a single example for a tool (first match)
 */
export function getToolExample(
  toolId: MathematicalTool,
  gradeLevel: number,
  topic?: string
): ToolExample | undefined {
  return TOOL_EXAMPLES.find(example =>
    example.toolId === toolId &&
    example.gradeLevel.includes(gradeLevel) &&
    (!topic || example.topic.includes(topic))
  );
}