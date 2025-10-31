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
  standards?: string[]; // Common Core standard codes
}

export const TOPICS: Topic[] = [
  // Grade 1-2
  {
    id: 'counting',
    name: 'Counting',
    description: 'Count objects and write numbers',
    grades: [1, 2],
    standards: [
      'CCSS.MATH.CONTENT.K.CC.A.1',
      'CCSS.MATH.CONTENT.K.CC.B.4',
      'CCSS.MATH.CONTENT.K.CC.B.5',
      'CCSS.MATH.CONTENT.1.NBT.A.1'
    ]
  },
  {
    id: 'addition-basic',
    name: 'Addition (Basic)',
    description: 'Addition within 20',
    grades: [1, 2],
    standards: [
      'CCSS.MATH.CONTENT.K.OA.A.1',
      'CCSS.MATH.CONTENT.K.OA.A.2',
      'CCSS.MATH.CONTENT.1.OA.A.1',
      'CCSS.MATH.CONTENT.1.OA.C.6',
      'CCSS.MATH.CONTENT.2.OA.B.2'
    ]
  },
  {
    id: 'subtraction-basic',
    name: 'Subtraction (Basic)',
    description: 'Subtraction within 20',
    grades: [1, 2],
    standards: [
      'CCSS.MATH.CONTENT.K.OA.A.1',
      'CCSS.MATH.CONTENT.K.OA.A.2',
      'CCSS.MATH.CONTENT.1.OA.A.1',
      'CCSS.MATH.CONTENT.1.OA.B.4',
      'CCSS.MATH.CONTENT.1.OA.C.6',
      'CCSS.MATH.CONTENT.2.OA.B.2'
    ]
  },
  {
    id: 'place-value-basic',
    name: 'Place Value',
    description: 'Tens and ones',
    grades: [1, 2],
    standards: [
      'CCSS.MATH.CONTENT.1.NBT.B.2',
      'CCSS.MATH.CONTENT.1.NBT.B.3',
      'CCSS.MATH.CONTENT.2.NBT.A.1',
      'CCSS.MATH.CONTENT.2.NBT.A.3'
    ]
  },

  // Grade 2-3
  {
    id: 'addition-regrouping',
    name: 'Addition with Regrouping',
    description: 'Two-digit addition with carrying',
    grades: [2, 3],
    standards: [
      'CCSS.MATH.CONTENT.2.NBT.B.5',
      'CCSS.MATH.CONTENT.2.NBT.B.7',
      'CCSS.MATH.CONTENT.3.NBT.A.2'
    ]
  },
  {
    id: 'subtraction-regrouping',
    name: 'Subtraction with Regrouping',
    description: 'Two-digit subtraction with borrowing',
    grades: [2, 3],
    standards: [
      'CCSS.MATH.CONTENT.2.NBT.B.5',
      'CCSS.MATH.CONTENT.2.NBT.B.7',
      'CCSS.MATH.CONTENT.3.NBT.A.2'
    ]
  },
  {
    id: 'skip-counting',
    name: 'Skip Counting',
    description: 'Count by 2s, 5s, 10s',
    grades: [2, 3],
    standards: [
      'CCSS.MATH.CONTENT.2.NBT.A.2',
      'CCSS.MATH.CONTENT.2.OA.C.3'
    ]
  },

  // Grade 3-4
  {
    id: 'multiplication-basic',
    name: 'Multiplication (Basic)',
    description: 'Times tables 1-10',
    grades: [3, 4],
    standards: [
      'CCSS.MATH.CONTENT.3.OA.A.1',
      'CCSS.MATH.CONTENT.3.OA.A.3',
      'CCSS.MATH.CONTENT.3.OA.C.7',
      'CCSS.MATH.CONTENT.4.NBT.B.5'
    ]
  },
  {
    id: 'division-basic',
    name: 'Division (Basic)',
    description: 'Basic division facts',
    grades: [3, 4],
    standards: [
      'CCSS.MATH.CONTENT.3.OA.A.2',
      'CCSS.MATH.CONTENT.3.OA.A.3',
      'CCSS.MATH.CONTENT.3.OA.B.6',
      'CCSS.MATH.CONTENT.3.OA.C.7',
      'CCSS.MATH.CONTENT.4.NBT.B.6'
    ]
  },
  {
    id: 'fractions-basic',
    name: 'Fractions (Basic)',
    description: 'Simple fractions and comparisons',
    grades: [3, 4],
    standards: [
      'CCSS.MATH.CONTENT.3.NF.A.1',
      'CCSS.MATH.CONTENT.3.NF.A.2',
      'CCSS.MATH.CONTENT.3.NF.A.3',
      'CCSS.MATH.CONTENT.4.NF.A.1',
      'CCSS.MATH.CONTENT.4.NF.A.2'
    ]
  },
  {
    id: 'area-perimeter',
    name: 'Area and Perimeter',
    description: 'Calculate area and perimeter of shapes',
    grades: [3, 4, 5],
    standards: [
      'CCSS.MATH.CONTENT.3.MD.C.5',
      'CCSS.MATH.CONTENT.3.MD.C.7',
      'CCSS.MATH.CONTENT.3.MD.D.8',
      'CCSS.MATH.CONTENT.4.MD.A.3'
    ]
  },

  // Grade 4-5
  {
    id: 'multiplication-multi-digit',
    name: 'Multi-Digit Multiplication',
    description: 'Multiply larger numbers',
    grades: [4, 5],
    standards: [
      'CCSS.MATH.CONTENT.4.NBT.B.5',
      'CCSS.MATH.CONTENT.5.NBT.B.5'
    ]
  },
  {
    id: 'division-multi-digit',
    name: 'Multi-Digit Division',
    description: 'Long division',
    grades: [4, 5],
    standards: [
      'CCSS.MATH.CONTENT.4.NBT.B.6',
      'CCSS.MATH.CONTENT.5.NBT.B.6'
    ]
  },
  {
    id: 'fractions-operations',
    name: 'Fraction Operations',
    description: 'Add, subtract, multiply fractions',
    grades: [4, 5, 6],
    standards: [
      'CCSS.MATH.CONTENT.5.NF.A.1',
      'CCSS.MATH.CONTENT.5.NF.B.4',
      'CCSS.MATH.CONTENT.6.NS.A.1'
    ]
  },
  {
    id: 'decimals',
    name: 'Decimals',
    description: 'Decimal operations',
    grades: [4, 5, 6],
    standards: [
      'CCSS.MATH.CONTENT.5.NBT.B.7',
      'CCSS.MATH.CONTENT.6.NS.B.3'
    ]
  },

  // Grade 5-6
  {
    id: 'percentages',
    name: 'Percentages',
    description: 'Percent calculations',
    grades: [5, 6],
    standards: [
      'CCSS.MATH.CONTENT.6.RP.A.3'
    ]
  },
  {
    id: 'ratios-proportions',
    name: 'Ratios and Proportions',
    description: 'Ratios, rates, and proportions',
    grades: [6],
    standards: [
      'CCSS.MATH.CONTENT.6.RP.A.1',
      'CCSS.MATH.CONTENT.6.RP.A.3'
    ]
  },
  {
    id: 'integers',
    name: 'Integers',
    description: 'Negative numbers and operations',
    grades: [6],
    standards: [
      'CCSS.MATH.CONTENT.6.NS.C.5'
    ]
  },
  {
    id: 'algebraic-expressions',
    name: 'Algebraic Expressions',
    description: 'Simple expressions and equations',
    grades: [6],
    standards: [
      'CCSS.MATH.CONTENT.6.EE.A.2'
    ]
  },

  // MEASUREMENT & DATA TOPICS
  {
    id: 'time-calendar',
    name: 'Time & Calendar',
    description: 'Telling time and understanding calendar concepts',
    grades: [1, 2, 3],
    standards: [
      'CCSS.MATH.CONTENT.1.MD.B.3',
      'CCSS.MATH.CONTENT.2.MD.C.7',
      'CCSS.MATH.CONTENT.3.MD.A.1'
    ]
  },
  {
    id: 'money-coins',
    name: 'Money & Coins',
    description: 'Counting money and making change',
    grades: [1, 2, 3],
    standards: [
      'CCSS.MATH.CONTENT.2.MD.C.8'
    ]
  },
  {
    id: 'length-measurement',
    name: 'Length Measurement',
    description: 'Measuring length with rulers and tools',
    grades: [1, 2, 3, 4, 5],
    standards: [
      'CCSS.MATH.CONTENT.1.MD.A.1',
      'CCSS.MATH.CONTENT.1.MD.A.2',
      'CCSS.MATH.CONTENT.2.MD.A.1',
      'CCSS.MATH.CONTENT.2.MD.A.3'
    ]
  },
  {
    id: 'weight-volume',
    name: 'Weight & Volume',
    description: 'Measuring weight and liquid volume',
    grades: [2, 3, 4, 5],
    standards: [
      'CCSS.MATH.CONTENT.3.MD.A.2'
    ]
  },
  {
    id: 'data-graphs',
    name: 'Data & Graphs',
    description: 'Creating and interpreting graphs and charts',
    grades: [1, 2, 3, 4, 5, 6],
    standards: [
      'CCSS.MATH.CONTENT.1.MD.C.4',
      'CCSS.MATH.CONTENT.2.MD.D.9',
      'CCSS.MATH.CONTENT.3.MD.B.3',
      'CCSS.MATH.CONTENT.3.MD.B.4'
    ]
  },
  {
    id: 'statistics-probability',
    name: 'Statistics & Probability',
    description: 'Statistical analysis and probability concepts',
    grades: [6],
    standards: [
      'CCSS.MATH.CONTENT.6.SP.A.1',
      'CCSS.MATH.CONTENT.6.SP.A.2',
      'CCSS.MATH.CONTENT.6.SP.B.4',
      'CCSS.MATH.CONTENT.6.SP.B.5'
    ]
  },

  // GEOMETRY TOPICS
  {
    id: 'shapes-2d',
    name: '2D Shapes & Properties',
    description: 'Identifying and analyzing 2D shapes',
    grades: [1, 2, 3, 4],
    standards: [
      'CCSS.MATH.CONTENT.K.G.A.2',
      'CCSS.MATH.CONTENT.1.G.A.1',
      'CCSS.MATH.CONTENT.2.G.A.1',
      'CCSS.MATH.CONTENT.3.G.A.1'
    ]
  },
  {
    id: 'shapes-3d',
    name: '3D Shapes & Solids',
    description: 'Identifying and analyzing 3D shapes',
    grades: [1, 2, 3, 4, 5],
    standards: [
      'CCSS.MATH.CONTENT.K.G.A.3',
      'CCSS.MATH.CONTENT.K.G.B.4',
      'CCSS.MATH.CONTENT.1.G.A.2'
    ]
  },
  {
    id: 'coordinate-plane',
    name: 'Coordinate Plane',
    description: 'Plotting points and graphing on coordinate plane',
    grades: [5, 6],
    standards: [
      'CCSS.MATH.CONTENT.5.G.A.1',
      'CCSS.MATH.CONTENT.5.G.A.2',
      'CCSS.MATH.CONTENT.6.G.A.3'
    ]
  },
  {
    id: 'angles-lines',
    name: 'Angles & Lines',
    description: 'Understanding angles, lines, and geometric relationships',
    grades: [4, 5, 6],
    standards: [
      'CCSS.MATH.CONTENT.4.G.A.1',
      'CCSS.MATH.CONTENT.4.G.A.2'
    ]
  },
  {
    id: 'transformations',
    name: 'Transformations',
    description: 'Rotations, reflections, and translations',
    grades: [4, 5, 6],
    standards: [
      'CCSS.MATH.CONTENT.4.G.A.3'
    ]
  },
  {
    id: 'volume-surface-area',
    name: 'Volume & Surface Area',
    description: 'Calculating volume and surface area of 3D shapes',
    grades: [5, 6],
    standards: [
      'CCSS.MATH.CONTENT.5.MD.C.3',
      'CCSS.MATH.CONTENT.5.MD.C.4',
      'CCSS.MATH.CONTENT.5.MD.C.5',
      'CCSS.MATH.CONTENT.6.G.A.2',
      'CCSS.MATH.CONTENT.6.G.A.4'
    ]
  },

  // ENHANCED NUMBER SYSTEM TOPICS
  {
    id: 'number-recognition',
    name: 'Number Recognition & Writing',
    description: 'Recognizing and writing numbers',
    grades: [1],
    standards: [
      'CCSS.MATH.CONTENT.K.CC.A.3'
    ]
  },
  {
    id: 'number-comparison',
    name: 'Number Comparison',
    description: 'Comparing and ordering numbers',
    grades: [1, 2],
    standards: [
      'CCSS.MATH.CONTENT.K.CC.C.6',
      'CCSS.MATH.CONTENT.K.CC.C.7'
    ]
  },
  {
    id: 'prime-composite',
    name: 'Prime & Composite Numbers',
    description: 'Understanding prime and composite numbers',
    grades: [4, 5],
    standards: [
      'CCSS.MATH.CONTENT.4.OA.B.4'
    ]
  },

  // ADVANCED TOPICS
  {
    id: 'patterns-sequences',
    name: 'Patterns & Sequences',
    description: 'Identifying and extending patterns',
    grades: [2, 3, 4, 5, 6],
    standards: [
      'CCSS.MATH.CONTENT.4.OA.C.5',
      'CCSS.MATH.CONTENT.5.OA.B.3'
    ]
  },
  {
    id: 'word-problems-multistep',
    name: 'Multi-Step Word Problems',
    description: 'Solving complex word problems',
    grades: [3, 4, 5, 6],
    standards: [
      'CCSS.MATH.CONTENT.4.OA.A.3'
    ]
  },
  {
    id: 'estimation-rounding',
    name: 'Estimation & Rounding',
    description: 'Estimating and rounding numbers',
    grades: [3, 4, 5, 6],
    standards: [
      'CCSS.MATH.CONTENT.4.NBT.A.3',
      'CCSS.MATH.CONTENT.5.NBT.A.4'
    ]
  },
  {
    id: 'mental-math',
    name: 'Mental Math Strategies',
    description: 'Mental calculation strategies',
    grades: [2, 3, 4, 5, 6],
    standards: [
      'CCSS.MATH.CONTENT.2.OA.C.3'
    ]
  },
  {
    id: 'measurement-units',
    name: 'Metric vs Imperial Units',
    description: 'Converting between measurement systems',
    grades: [4, 5, 6],
    standards: [
      'CCSS.MATH.CONTENT.4.MD.A.1',
      'CCSS.MATH.CONTENT.5.MD.A.1'
    ]
  },
  {
    id: 'scale-proportion',
    name: 'Scale & Proportional Reasoning',
    description: 'Working with scale and proportions',
    grades: [5, 6],
    standards: [
      'CCSS.MATH.CONTENT.6.RP.A.3'
    ]
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
