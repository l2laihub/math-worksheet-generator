/**
 * Claude prompt templates for generating grade-appropriate math worksheets
 * Based on Common Core State Standards
 */

import { TOPICS } from '@/lib/constants/topics';

export interface WorksheetParams {
  gradeLevel: number; // 1-6
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  problemCount: number; // 5-20
  theme: string; // animals, space, sports, food, nature
}

export interface WorksheetProblem {
  id: number;
  question: string;
  answer: string | number;
  visualAid?: {
    type: 'countable_objects' | 'grouped_objects' | 'array' | 'number_line' | 'fraction_circle';
    item: string;
    count?: number;
    groups?: Array<{ item: string; count: number }>;
    rows?: number;
    cols?: number;
    start?: number;
    end?: number;
    highlights?: number[];
    numerator?: number;
    denominator?: number;
  };
  workingSpace?: boolean;
}

export interface WorksheetOutput {
  title: string;
  problems: WorksheetProblem[];
  instructions: string;
  metadata: {
    gradeLevel: number;
    topic: string;
    difficulty: string;
    theme: string;
    standards: string[]; // Common Core standards
  };
}

export function generateWorksheetPrompt(params: WorksheetParams): string {
  const { gradeLevel, topic, difficulty, problemCount, theme } = params;
  
  // Get topic standards from topics list
  const topicData = TOPICS.find(t => t.id === topic);
  const relevantStandards = topicData?.standards?.filter(std => 
    std.includes(`.${gradeLevel}.`) || std.includes(`.K.`)
  ) || [];

  return `You are a math education expert creating a worksheet for Grade ${gradeLevel} students.

**Task**: Generate ${problemCount} ${difficulty} difficulty math problems on the topic: "${topic}"

**Theme**: ${theme} (incorporate this theme in word problems and visual aids)

**Requirements**:

1. **Grade-Appropriate Content**:
   - Problems must align with Grade ${gradeLevel} Common Core Math Standards
   - Difficulty level: ${difficulty}
   - Use age-appropriate language and context

2. **Problem Variety**:
   - Mix computation problems with word problems
   - Include at least 2-3 word problems using the "${theme}" theme
   - Vary problem formats to maintain engagement

3. **Visual Aids** (SIMPLE RULES):
   - For grades 1-3: Include visual aids for 60-80% of problems
   - For grades 4-6: Include visual aids for 30-50% of problems
   
   **VISUAL AID RULES:**
   - **Only add visualAid for numbers ≤ 12**
   - **For numbers > 12: omit visualAid completely**
   - **Use simple structures only**
   
   **Available visual types:**
   - countable_objects: For counting (count ≤ 12)
     \`"visualAid": { "type": "countable_objects", "item": "apple", "count": 7 }\`
   
   - grouped_objects: For addition/subtraction (total ≤ 12)  
     \`"visualAid": { "type": "grouped_objects", "groups": [{"item": "cat", "count": 3}, {"item": "cat", "count": 4}] }\`
   
   - array: For small multiplication (rows × cols ≤ 12)
     \`"visualAid": { "type": "array", "item": "star", "rows": 3, "cols": 4 }\`

   - Available theme items: ${getThemeItems(theme)}

4. **Answer Key**:
   - Provide clear, step-by-step solutions
   - Show working for multi-step problems

5. **Common Core Standards**:
   - Focus on these specific standards: ${relevantStandards.length > 0 ? relevantStandards.join(', ') : 'appropriate grade-level standards for ' + topic}
   - List ALL standards addressed by your problems in the output
   - Ensure each problem aligns with at least one standard

**Output Format** (JSON - MUST be valid JSON):
\`\`\`json
{
  "title": "Grade ${gradeLevel} ${topic} Practice",
  "instructions": "Solve each problem. Show your work!",
  "problems": [
    {
      "id": 1,
      "question": "Emma has 5 apples. She buys 3 more apples. How many apples does Emma have now?",
      "answer": "8",
      "visualAid": {
        "type": "grouped_objects",
        "groups": [
          { "item": "apple", "count": 5 },
          { "item": "apple", "count": 3 }
        ]
      },
      "workingSpace": true
    }
  ],
  "metadata": {
    "gradeLevel": ${gradeLevel},
    "topic": "${topic}",
    "difficulty": "${difficulty}",
    "theme": "${theme}",
    "standards": ["CCSS.MATH.CONTENT.1.OA.A.1"]
  }
}
\`\`\`

**CRITICAL JSON RULES:**
- Use double quotes for all strings
- No trailing commas
- No comments in JSON
- Escape special characters in strings
- Keep visualAid simple: use only "type", "item", "count", "groups", "rows", "cols"
- For large numbers (>12), omit visualAid entirely

Generate the complete worksheet now with ${problemCount} problems.`;
}

function getThemeItems(theme: string): string {
  const themeItems: Record<string, string> = {
    animals: 'dog, cat, rabbit, bear, fish',
    space: 'star, sun, moon, rocket',
    sports: 'car (racing), circle (ball), square (base)',
    food: 'apple, banana, orange, strawberry, cookie, pizza, carrot',
    nature: 'butterfly, bee, flower, tree',
  };

  return themeItems[theme] || 'circle, square, triangle, heart';
}

/**
 * Parse Claude's response into structured worksheet data
 */
export function parseWorksheetResponse(response: string): WorksheetOutput {
  // Extract JSON from markdown code blocks if present
  const jsonMatch = response.match(/```json\s*([\s\S]*?)\s*```/) || response.match(/```\s*([\s\S]*?)\s*```/);
  let jsonStr = jsonMatch ? jsonMatch[1] : response;

  try {
    // Clean up common JSON issues
    jsonStr = jsonStr.trim()
      .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
      .replace(/([{,]\s*)(\w+):/g, '$1"$2":') // Quote unquoted keys
      .replace(/:\s*'([^']*?)'/g, ': "$1"') // Replace single quotes with double quotes
      .replace(/\n/g, ' ') // Remove newlines that might break JSON
      .replace(/\t/g, ' ') // Remove tabs
      .replace(/\s+/g, ' '); // Normalize whitespace

    const parsed = JSON.parse(jsonStr);

    // Validate structure
    if (!parsed.problems || !Array.isArray(parsed.problems)) {
      throw new Error('Invalid worksheet structure: missing problems array');
    }

    return parsed as WorksheetOutput;
  } catch (error) {
    console.error('Failed to parse worksheet response:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      originalResponse: response.substring(0, 1000) + (response.length > 1000 ? '...' : ''),
      extractedJson: jsonStr.substring(0, 1000) + (jsonStr.length > 1000 ? '...' : ''),
      jsonMatch: !!jsonMatch
    });
    
    // Try to recover by creating a minimal structure
    try {
      const lines = response.split('\n');
      const problems = [];
      let currentProblem: any = null;
      let problemCounter = 1;

      for (const line of lines) {
        if (line.match(/^\s*\d+\./)) {
          // Start of a new problem
          if (currentProblem) {
            problems.push(currentProblem);
          }
          currentProblem = {
            id: problemCounter++,
            question: line.replace(/^\s*\d+\.\s*/, '').trim(),
            answer: "Answer needed",
            workingSpace: true
          };
        }
      }
      
      if (currentProblem) {
        problems.push(currentProblem);
      }

      if (problems.length > 0) {
        return {
          title: "Math Practice Worksheet",
          instructions: "Solve each problem. Show your work!",
          problems,
          metadata: {
            gradeLevel: 4,
            topic: "Math Practice",
            difficulty: "medium",
            theme: "general",
            standards: ["CCSS.MATH"]
          }
        };
      }
    } catch (recoveryError) {
      console.error('Recovery parsing also failed:', recoveryError);
    }
    
    throw new Error('Failed to parse Claude response. Invalid JSON format.');
  }
}

/**
 * Validate worksheet output meets requirements
 */
export function validateWorksheet(worksheet: WorksheetOutput, params: WorksheetParams): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check problem count
  if (worksheet.problems.length !== params.problemCount) {
    errors.push(`Expected ${params.problemCount} problems, got ${worksheet.problems.length}`);
  }

  // Check each problem has required fields
  worksheet.problems.forEach((problem, index) => {
    if (!problem.question) {
      errors.push(`Problem ${index + 1}: Missing question`);
    }
    if (problem.answer === undefined || problem.answer === null || problem.answer === '') {
      errors.push(`Problem ${index + 1}: Missing answer`);
    }
  });

  // Check metadata
  if (!worksheet.metadata) {
    errors.push('Missing metadata');
  } else {
    if (worksheet.metadata.gradeLevel !== params.gradeLevel) {
      errors.push('Grade level mismatch');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
