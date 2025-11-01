/**
 * Claude prompt templates for generating grade-appropriate math worksheets
 * Based on Common Core State Standards
 */

import { TOPICS } from '@/lib/constants/topics';
import { MATHEMATICAL_TOOLS, PROBLEM_SOLVING_STRATEGIES, getToolsForTopicAndGrade, type ToolDefinition, type StrategyDefinition } from '@/lib/constants/pedagogical-tools';
import { getToolExamples } from '@/lib/constants/tool-examples';
import type { MathematicalTool, ProblemSolvingStrategy, ScaffoldingLevel, RepresentationType } from '@/types/worksheet';

export interface WorksheetParams {
  gradeLevel: number; // 1-6
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  problemCount: number; // 5-20
  theme: string; // animals, space, sports, food, nature
  mathematicalTools?: MathematicalTool[];
  problemSolvingStrategy?: ProblemSolvingStrategy;
  scaffoldingLevel?: ScaffoldingLevel;
  representationType?: RepresentationType;
  includeThinkingPrompts?: boolean;
  includeToolExamples?: boolean;
}

export interface WorksheetProblem {
  id: number;
  question: string;
  answer: string | number;
  visualAid?: {
    type: 'countable_objects' | 'grouped_objects' | 'array' | 'number_line' | 'fraction_circle' | 'partial_products' | 'lattice_multiplication' | 'decomposition_method' | 'counters' | 'pattern_blocks';
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
    factor1?: number;
    factor2?: number;
    number?: number;
    operation?: 'add' | 'subtract' | 'multiply';
    groupSize?: number;
    shapes?: Array<'hexagon' | 'trapezoid' | 'rhombus' | 'triangle' | 'square'>;
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
  const { 
    gradeLevel, 
    topic, 
    difficulty, 
    problemCount, 
    theme,
    mathematicalTools = [],
    problemSolvingStrategy,
    scaffoldingLevel = 'guided',
    representationType = 'mixed',
    includeThinkingPrompts = false,
    includeToolExamples = false
  } = params;
  
  // Get topic standards from topics list
  const topicData = TOPICS.find(t => t.id === topic);
  const relevantStandards = topicData?.standards?.filter(std => 
    std.includes(`.${gradeLevel}.`) || std.includes(`.K.`)
  ) || [];

  // Get selected tools and strategies
  // IMPORTANT: If abstract representation is selected, we should not use tools
  // Word problems can use tools for educational examples but problems focus on story context
  const shouldUseTool = representationType !== 'abstract';
  const selectedTools = shouldUseTool ? 
    mathematicalTools.map(toolId => 
      MATHEMATICAL_TOOLS.find(tool => tool.id === toolId)
    ).filter(Boolean) as ToolDefinition[] : [];
  
  const selectedStrategy = problemSolvingStrategy && problemSolvingStrategy !== 'none' ? 
    PROBLEM_SOLVING_STRATEGIES.find(strategy => strategy.id === problemSolvingStrategy) || null : null;

  return `You are a math education expert creating a worksheet for Grade ${gradeLevel} students.

**Task**: Generate ${problemCount} ${difficulty} difficulty math problems on the topic: "${topic}"

**Theme**: ${theme} (incorporate this theme in word problems and visual aids)

⚠️  **CRITICAL COMPLIANCE NOTICE** ⚠️
YOU MUST FOLLOW ALL REQUIREMENTS EXACTLY. NON-COMPLIANCE WILL RESULT IN REJECTION.
Each requirement marked as "MANDATORY" or "FORBIDDEN" must be strictly enforced.

**Requirements**:

1. **Grade-Appropriate Content**:
   - Problems must align with Grade ${gradeLevel} Common Core Math Standards
   - Difficulty level: ${difficulty}
   - Use age-appropriate language and context

2. **Problem Variety**:
   - Mix computation problems with word problems
   - Include at least 2-3 word problems using the "${theme}" theme
   - Vary problem formats to maintain engagement${generateToolInstructions(selectedTools)}${generateStrategyInstructions(selectedStrategy)}${generateScaffoldingInstructions(scaffoldingLevel)}${generateRepresentationInstructions(representationType, selectedTools, mathematicalTools, theme)}${generateThinkingPromptsInstructions(includeThinkingPrompts)}${generateToolExamplesInstructions(selectedTools, gradeLevel, topic, includeToolExamples, representationType, mathematicalTools)}

3. **Visual Aids** (SIMPLE RULES):
   - For grades 1-3: Include visual aids for 60-80% of problems
   - For grades 4-6: Include visual aids for 30-50% of problems
   
   **VISUAL AID RULES:**
   - **Only add visualAid for numbers ≤ 12**
   - **For numbers > 12: omit visualAid completely**
   - **Use simple structures only**
   
   **Available visual types:**${generateVisualAidInstructions(selectedTools)}
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
    },
    {
      "id": 2,
      "question": "Calculate: 7 × 4 = ?",
      "answer": "28",
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
- **MANDATORY**: Every problem MUST have "question" AND "answer" fields
- Use double quotes for all strings
- No trailing commas
- No comments in JSON
- Escape special characters in strings
- Keep visualAid simple: use only "type", "item", "count", "groups", "rows", "cols"
- For large numbers (>12), omit visualAid entirely
- **REQUIRED**: "answer" field must contain the solution (never empty/null)

⚠️  **FINAL COMPLIANCE CHECK** ⚠️
Before submitting your response, verify:
✓ EVERY problem has BOTH "question" AND "answer" fields (CRITICAL)
${selectedTools.length > 0 ? `✓ AT LEAST 60% of problems use these tools: ${selectedTools.map(t => t.name).join(', ')}` : ''}
${selectedStrategy ? `✓ AT LEAST 40% of problems use strategy: ${selectedStrategy.name}` : ''}
${representationType === 'concrete' ? '✓ ALL problems use physical manipulatives/objects ONLY' : ''}
${representationType === 'pictorial' ? '✓ ALL problems include visual diagrams/pictures' : ''}
${representationType === 'abstract' ? '✓ ALL problems use numbers/symbols ONLY (NO visuals)' : ''}
${representationType === 'word_problems' ? '✓ ALL problems are story-based word problems ONLY' : ''}
${scaffoldingLevel === 'none' ? '✓ NO hints or guidance provided' : ''}
${scaffoldingLevel === 'guided' ? '✓ 70% of problems include helpful hints' : ''}
${scaffoldingLevel === 'heavy' ? '✓ ALL complex problems broken into steps' : ''}
${includeThinkingPrompts ? '✓ 60% of problems include "Explain Your Thinking" sections' : ''}

🚨 FAILURE TO MEET THESE REQUIREMENTS WILL RESULT IN REJECTION 🚨

**CRITICAL REMINDER**: Each problem MUST include both "question" and "answer" fields!

Generate the complete worksheet now with ${problemCount} problems.`;
}

function getThemeItems(theme: string): string {
  const themeItems: Record<string, string> = {
    animals: 'dog, cat, rabbit, bear, fish, bird',
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
    // Clean up common JSON issues - more careful approach
    jsonStr = jsonStr.trim();
    
    // Remove any content before the first { or after the last }
    const firstBrace = jsonStr.indexOf('{');
    const lastBrace = jsonStr.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);
    }
    
    // Try to parse as-is first
    let parsed;
    try {
      parsed = JSON.parse(jsonStr);
    } catch (firstError) {
      // If that fails, try cleaning up common issues
      let cleanedJsonStr = jsonStr
        .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
        .replace(/:\s*'([^']*?)'/g, ': "$1"') // Replace single quotes with double quotes
        .replace(/\r?\n/g, ' ') // Replace newlines with spaces (safer for JSON)
        .replace(/\t/g, ' ') // Replace tabs with spaces
        .replace(/\s+/g, ' '); // Normalize multiple spaces
        
      // More careful key quoting - only quote keys that are actually unquoted keys
      // Look for pattern: { or , followed by word followed by : but not inside quotes
      cleanedJsonStr = cleanedJsonStr.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, (match, prefix, key, offset, string) => {
        // Check if we're inside a string by counting quotes before this position
        const beforeString = string.substring(0, offset);
        const quoteCount = (beforeString.match(/"/g) || []).length;
        // If odd number of quotes, we're inside a string, don't modify
        if (quoteCount % 2 === 1) {
          return match;
        }
        // Otherwise, quote the key
        return `${prefix}"${key}":`;
      });
      
      try {
        parsed = JSON.parse(cleanedJsonStr);
      } catch (secondError) {
        // If still failing, try to handle incomplete JSON by checking for missing closing braces
        const openBraces = (cleanedJsonStr.match(/{/g) || []).length;
        const closeBraces = (cleanedJsonStr.match(/}/g) || []).length;
        const openBrackets = (cleanedJsonStr.match(/\[/g) || []).length;
        const closeBrackets = (cleanedJsonStr.match(/\]/g) || []).length;
        
        let fixedJsonStr = cleanedJsonStr;
        
        // Add missing closing brackets
        for (let i = 0; i < openBrackets - closeBrackets; i++) {
          fixedJsonStr += ']';
        }
        
        // Add missing closing braces
        for (let i = 0; i < openBraces - closeBraces; i++) {
          fixedJsonStr += '}';
        }
        
        // Try parsing the fixed JSON
        parsed = JSON.parse(fixedJsonStr);
      }
    }

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

/**
 * Generate tool-specific instructions for the prompt
 */
function generateToolInstructions(selectedTools: ToolDefinition[]): string {
  if (selectedTools.length === 0) return '';
  
  const toolNames = selectedTools.map(tool => tool.name).join(', ');
  const toolInstructions = selectedTools.map(tool => `   - ${tool.name}: ${tool.description}`).join('\n');
  
  return `

3. **Mathematical Tools** (MANDATORY FOCUS):
   **CRITICAL**: Design problems specifically for these tools: ${toolNames}
   
${toolInstructions}
   
   **Tool Integration Requirements**:
   - AT LEAST 60% of problems must explicitly use these selected tools
   - Include tool-specific visual aids when numbers allow (≤ 12)
   - Reference tools directly in problem instructions: "Use base ten blocks to solve..."
   - Design problems that REQUIRE these tools for optimal solution
   - Make tools central to the problem-solving process, not optional`;
}

/**
 * Generate strategy-specific instructions for the prompt
 */
function generateStrategyInstructions(selectedStrategy: StrategyDefinition | null): string {
  if (!selectedStrategy) return '';
  
  return `

4. **Problem-Solving Strategy** (MANDATORY: ${selectedStrategy.name}):
   ${selectedStrategy.description}
   
   **Strategy Implementation Requirements**:
   - AT LEAST 40% of problems must be specifically designed for this strategy
   - Add explicit strategy instruction: "${selectedStrategy.instruction}"
   - Design problems that REQUIRE this strategy for optimal solution
   - Include strategy-specific wording in problem statements
   - Make the strategy the primary approach, not just a suggestion`;
}

/**
 * Generate scaffolding-specific instructions
 */
function generateScaffoldingInstructions(scaffoldingLevel: ScaffoldingLevel): string {
  const instructions = {
    none: `

5. **Support Level - Independent** (MANDATORY):
   **CRITICAL**: Provide minimal support only:
   - NO hints, prompts, or guidance
   - Students must work completely independently
   - Use only clear, direct problem statements
   - NO "Think about..." or helper text
   - Problems should be straightforward and self-contained`,
    
    guided: `

5. **Support Level - Guided Practice** (MANDATORY):
   **CRITICAL**: Provide moderate scaffolding for ALL problems:
   - Include helpful hints for 70% of problems
   - Add "Think about..." or "Remember..." cues throughout
   - Provide guiding questions for multi-step problems
   - Show one example solution method at the beginning
   - Use supportive language: "Can you...", "Try to..."`,
    
    heavy: `

5. **Support Level - Heavily Supported** (MANDATORY):
   **CRITICAL**: Provide maximum scaffolding for ALL problems:
   - Include step-by-step guidance for every complex problem
   - Add multiple hints and scaffolding questions
   - Break ALL multi-step problems into smaller parts
   - Include worked examples and think-aloud prompts
   - Use very supportive language: "First, try...", "Next, you can...", "Remember that..."`
  };
  
  return instructions[scaffoldingLevel];
}

/**
 * Generate representation type instructions
 */
function generateRepresentationInstructions(representationType: RepresentationType, selectedTools: ToolDefinition[], originalTools: string[] = [], theme: string = ''): string {
  const instructions = {
    concrete: `

6. **Representation Focus - Concrete** (MANDATORY):
   **CRITICAL**: ALL problems must use concrete, hands-on approaches ONLY:
   - Every problem must reference physical manipulatives (blocks, counters, toys)
   - Use ONLY countable objects students can physically handle
   - NO abstract numbers without concrete context
   - NO pure computation problems - everything must relate to real objects
   - Word problems must focus on tangible items: "Count the bears", "Group the blocks"
   - Examples: "Use 12 teddy bears to make 3 equal groups" NOT "12 ÷ 3 = ?"`,
    
    pictorial: `

6. **Representation Focus - Pictorial** (MANDATORY):
   **CRITICAL**: ALL problems must use visual/pictorial approaches ONLY:
   - Every problem must include or reference pictures, diagrams, or visual models
   - NO pure number computation without visual support
   - NO abstract symbolic work - everything must be visual
   - Use charts, drawings, visual patterns, and graphic organizers
   - Word problems must focus on visual elements: "Look at the picture", "Draw a diagram"
   - Examples: "Draw circles to show 4 × 3" NOT "What is 4 × 3?"`,
    
    abstract: `

6. **Representation Focus - Abstract** (MANDATORY):
   **CRITICAL**: ALL problems must use abstract/symbolic approaches ONLY:
   - Focus exclusively on numbers, symbols, and mathematical notation
   - NO visual aids, pictures, or concrete references
   - NO manipulative references - pure computational focus
   - Use equations, number relationships, and mathematical symbols
   - Problems should be computation-focused: "Calculate", "Solve", "Find"
   - Examples: "7 × 8 = ?" or "What number makes 24 ÷ ? = 6?" NOT story problems${originalTools.length > 0 ? `
   
   ⚠️ **IMPORTANT OVERRIDE**: Abstract representation was selected, which conflicts with tool usage.
   IGNORE all tool requirements above. Do NOT reference or use mathematical tools in any problems.
   Focus ONLY on abstract number computation.` : ''}`,
    
    mixed: `

6. **Representation Focus - Mixed**:
   - Combine concrete, pictorial, and abstract approaches across different problems
   - Include some concrete problems (with manipulatives)
   - Include some pictorial problems (with visual aids) 
   - Include some abstract problems (pure computation)
   - Progress from concrete to abstract within the problem set when possible`,
   
    word_problems: `

6. **Representation Focus - Word Problems Only** (MANDATORY):
   **CRITICAL**: ALL problems must be story-based word problems ONLY:
   - Every problem must have a real-world context or scenario
   - NO computation-only problems (like "7 × 8 = ?")
   - NO problems without context or story elements
   - Use rich narratives with characters, situations, and realistic scenarios
   - Incorporate the "${theme}" theme heavily throughout all problems
   - Focus on application and problem-solving in meaningful contexts
   - Examples: "Sarah has 24 stickers and wants to share them equally among 6 friends" NOT "24 ÷ 6 = ?"
   - Include multi-step word problems that require planning and reasoning`
  };
  
  return instructions[representationType] || '';
}

/**
 * Generate thinking prompts instructions
 */
function generateThinkingPromptsInstructions(includeThinkingPrompts: boolean): string {
  if (!includeThinkingPrompts) return '';
  
  return `

7. **Thinking Prompts** (MANDATORY):
   **CRITICAL**: Include metacognitive reflection for ALL complex problems:
   - Add "Explain Your Thinking" sections to 60% of problems
   - Include specific prompts after each multi-step problem:
     * "How did you solve this problem? Show your steps."
     * "Explain your thinking using words, numbers, or pictures."
     * "What strategy did you use and why?"
     * "Why does this answer make sense? How do you know?"
     * "What would you do differently next time?"
   - Provide adequate space for written explanations
   - Encourage multiple representation types in explanations`;
}

/**
 * Generate visual aid instructions based on selected tools
 */
function generateVisualAidInstructions(selectedTools: ToolDefinition[]): string {
  if (selectedTools.length === 0) return '';
  
  const toolVisualMappings: Record<string, string> = {
    base_ten_blocks: '\n   - base_ten_blocks: Place value blocks\n     `"visualAid": { "type": "base_ten_blocks", "hundreds": 1, "tens": 2, "ones": 3 }`',
    ten_frames: '\n   - ten_frames: Structured counting frames\n     `"visualAid": { "type": "ten_frames", "filled": 7, "total": 10 }`',
    fraction_bars: '\n   - fraction_bars: Proportional fraction representation\n     `"visualAid": { "type": "fraction_bars", "numerator": 3, "denominator": 4 }`',
    area_models: '\n   - area_model: Rectangle-based models\n     `"visualAid": { "type": "area_model", "width": 4, "height": 3 }`',
    bar_models: '\n   - bar_model: Singapore math tape diagrams\n     `"visualAid": { "type": "bar_model", "bars": [{"length": 5, "label": "Group 1"}, {"length": 3, "label": "Group 2"}] }`',
    number_lines: '\n   - number_line: Enhanced number lines\n     `"visualAid": { "type": "number_line", "start": 0, "end": 20, "highlights": [7, 15] }`',
    arrays: '\n   - array: Grid arrangements (already available above)',
    hundreds_charts: '\n   - hundreds_chart: Number pattern charts\n     `"visualAid": { "type": "hundreds_chart", "chartStart": 1, "chartEnd": 100, "highlightedNumbers": [25, 50, 75] }`',
    money_manipulatives: '\n   - money_display: Coins and bills\n     `"visualAid": { "type": "money_display", "dollars": 2, "quarters": 3, "dimes": 1 }`',
    partial_products: '\n   - partial_products: Grid-based multiplication breakdown\n     `"visualAid": { "type": "partial_products", "factor1": 23, "factor2": 15 }`',
    lattice_multiplication: '\n   - lattice_multiplication: Grid multiplication method\n     `"visualAid": { "type": "lattice_multiplication", "factor1": 34, "factor2": 26 }`',
    decomposition_method: '\n   - decomposition_method: Place value breakdown\n     `"visualAid": { "type": "decomposition_method", "number": 345, "operation": "add" }`',
    counters: '\n   - counters: Physical counting objects\n     `"visualAid": { "type": "counters", "count": 12, "groupSize": 5 }`',
    pattern_blocks: '\n   - pattern_blocks: Geometric pattern shapes\n     `"visualAid": { "type": "pattern_blocks", "shapes": ["hexagon", "trapezoid", "triangle"] }`'
  };
  
  const toolVisuals = selectedTools
    .map(tool => toolVisualMappings[tool.id])
    .filter(Boolean)
    .join('');
  
  return toolVisuals;
}

/**
 * Generate tool usage examples instructions for the prompt
 */
function generateToolExamplesInstructions(
  selectedTools: ToolDefinition[], 
  gradeLevel: number, 
  topic: string, 
  includeToolExamples: boolean,
  representationType?: string,
  originalTools?: string[]
): string {
  if (!includeToolExamples) return '';
  
  // For abstract representation, use original tools (before filtering)
  // Tool examples are educational content separate from worksheet problems
  const toolsForExamples = representationType === 'abstract' && originalTools?.length ? 
    originalTools.map(toolId => 
      MATHEMATICAL_TOOLS.find(tool => tool.id === toolId)
    ).filter(Boolean) as ToolDefinition[] : 
    selectedTools;
  
  // If no tools selected but examples requested, auto-select relevant tools for the topic
  let finalToolsForExamples = toolsForExamples;
  if (toolsForExamples.length === 0) {
    // Auto-select topic-appropriate tools when none are specified
    const autoSelectedTools = getToolsForTopicAndGrade(topic, gradeLevel);
    
    // If no topic-specific tools found, use general grade-appropriate tools
    if (autoSelectedTools.length === 0) {
      // Fallback to general tools that work for the grade level
      const generalTools = MATHEMATICAL_TOOLS.filter(tool => 
        tool.grades.includes(gradeLevel)
      );
      finalToolsForExamples = generalTools.slice(0, 3);
    } else {
      // Limit to 2-3 most relevant tools to avoid overwhelming
      finalToolsForExamples = autoSelectedTools.slice(0, 3);
    }
  }
  
  if (finalToolsForExamples.length === 0) return '';
  
  const toolExamples = getToolExamples(
    finalToolsForExamples.map(t => t.id), 
    gradeLevel, 
    topic
  );
  
  if (toolExamples.length === 0) return '';
  
  const exampleText = toolExamples.slice(0, 2).map(example => 
    `**${example.toolName} Example:**
    Problem: ${example.problem}
    Steps:
    ${example.steps.map(step => 
      `${step.number}. ${step.description}${step.visualization ? ' - ' + step.visualization : ''}`
    ).join('\n    ')}
    Solution: ${example.solution}`
  ).join('\n\n    ');
  
  const abstractNote = representationType === 'abstract' ? `
   
   ⚠️ **IMPORTANT NOTE**: These tool examples are for educational reference only.
   The actual worksheet problems will use abstract/symbolic representation as specified.` : '';
  
  return `

8. **Tool Usage Examples** (MANDATORY SECTION):
   **CRITICAL**: Since tool examples are requested, include a dedicated "Tool Usage Examples" section:
   - Add this section BEFORE the main problems
   - Show step-by-step examples for tools: ${finalToolsForExamples.map(t => t.name).join(', ')}
   - Use these specific examples:
   
    ${exampleText}${abstractNote}
   
   **Section Format Requirements:**
   - Title: "How to Use Your Mathematical Tools"
   - Include 1-2 examples from selected tools
   - Show clear step-by-step instructions
   - Use simple visualizations when helpful
   - Make examples grade-appropriate for Grade ${gradeLevel}`;
}

/**
 * Generate a custom worksheet prompt based on user's format description
 */
export interface CustomWorksheetParams {
  gradeLevel: number;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  problemCount: number;
  theme: string;
  customFormatDescription: string;
  sampleImageUrl?: string;
}

export function generateCustomWorksheetPrompt(params: CustomWorksheetParams): string {
  const { 
    gradeLevel, 
    topic, 
    difficulty, 
    problemCount, 
    theme,
    customFormatDescription,
    sampleImageUrl
  } = params;
  
  // Get topic standards from topics list
  const topicData = TOPICS.find(t => t.id === topic);
  const relevantStandards = topicData?.standards?.filter(std => 
    std.includes(`.${gradeLevel}.`) || std.includes(`.K.`)
  ) || [];

  return `You are a math education expert creating a custom-formatted worksheet for Grade ${gradeLevel} students.

**Core Requirements** (MANDATORY):
- Grade Level: ${gradeLevel}
- Topic: "${topic}"
- Difficulty: ${difficulty}
- Number of Problems: ${problemCount}
- Theme: ${theme} (incorporate in word problems and context)

**Custom Format Instructions**:
The teacher has provided this specific format request:
"${customFormatDescription}"

${sampleImageUrl ? `**Sample Image Analysis**: A sample worksheet image has been provided for reference. Analyze the layout, spacing, visual style, and format elements to match the desired appearance.` : ''}

**FORMAT DETECTION**:
- If the description mentions "partial products", "box method", "area model", or "grid multiplication" → use "partial_products" visual aid
- If the description mentions "lattice", "diagonal method", or "lattice multiplication" → use "lattice_multiplication" visual aid  
- If the description mentions "decomposition", "breaking apart numbers", or "place value expansion" → use "decomposition_method" visual aid
- If the description mentions "array", "rows and columns", or "repeated addition" → use "array" visual aid with proper rows/cols

⚠️  **CRITICAL COMPLIANCE NOTICE** ⚠️
YOU MUST FOLLOW ALL REQUIREMENTS EXACTLY. NON-COMPLIANCE WILL RESULT IN REJECTION.

**Educational Standards Requirements**:
1. **Grade-Appropriate Content**:
   - Problems must align with Grade ${gradeLevel} Common Core Math Standards
   - Focus on these specific standards: ${relevantStandards.length > 0 ? relevantStandards.join(', ') : 'appropriate grade-level standards for ' + topic}
   - Use age-appropriate language and mathematical concepts

2. **Content Quality**:
   - Mix computation problems with word problems
   - Include at least 2-3 word problems using the "${theme}" theme
   - Ensure mathematical accuracy in all problems and solutions
   - Provide clear, step-by-step solutions for complex problems

**Custom Format Implementation**:
3. **Layout & Format Adaptation**:
   - CAREFULLY follow the user's format description: "${customFormatDescription}"
   - Adapt the standard problem structure to match requested layout
   - Maintain educational integrity while implementing custom formatting
   - If layout conflicts with educational best practices, prioritize learning while accommodating format requests

4. **Visual Elements**:
   - Include visual aids only when appropriate for the format and numbers ≤ 12
   - **CRITICAL**: Use ONLY these supported visual aid types: "countable_objects", "grouped_objects", "array", "number_line", "fraction_circle", "fraction_bars", "partial_products", "lattice_multiplication", "decomposition_method"
   - Do NOT create text-based visual representations or ASCII art
   - Do NOT use characters like "%", "&", or symbols to represent grids
   - **SPECIAL FORMATS**:
     * For partial products/box method: use \`"visualAid": {"type": "partial_products", "factor1": 23, "factor2": 15}\`
     * For lattice multiplication: use \`"visualAid": {"type": "lattice_multiplication", "factor1": 23, "factor2": 15}\`
     * For regular arrays: use \`"visualAid": {"type": "array", "item": "dog", "rows": 4, "cols": 3}\`
   - Use theme items: ${getThemeItems(theme)}
   - Balance educational effectiveness with format requirements

**Output Requirements**:
- Maintain the same JSON structure as standard worksheets
- Add format-specific instructions in the "instructions" field
- Include custom layout notes in problem descriptions when needed
- Ensure all problems have complete "question" and "answer" fields

**Output Format** (JSON - MUST be valid JSON):
\`\`\`json
{
  "title": "Grade ${gradeLevel} ${topic} Practice - Custom Format",
  "instructions": "Solve each problem following the format shown. Show your work! [Include any specific format instructions here]",
  "problems": [
    {
      "id": 1,
      "question": "Problem text adapted to custom format requirements...",
      "answer": "Correct answer",
      "visualAid": {
        "type": "array",
        "item": "dog",
        "rows": 3,
        "cols": 4
      },
      "workingSpace": true
    },
    {
      "id": 2,
      "question": "Another problem...",
      "answer": "Another answer",
      "visualAid": {
        "type": "countable_objects",
        "item": "cat",
        "count": 6
      },
      "workingSpace": true
    }
  ],
  "metadata": {
    "gradeLevel": ${gradeLevel},
    "topic": "${topic}",
    "difficulty": "${difficulty}",
    "theme": "${theme}",
    "standards": ["CCSS.MATH.CONTENT.example"],
    "customFormat": true,
    "formatDescription": "${customFormatDescription.substring(0, 200)}..."
  }
}
\`\`\`

**CRITICAL VISUAL AID RULES**:
- NEVER include text-based grids, ASCII art, or symbol patterns in the question text
- NEVER use characters like %, &, #, or symbols to draw grids or tables  
- For multiplication arrays, use: \`"visualAid": {"type": "array", "item": "dog", "rows": 4, "cols": 3}\`
- For countable objects, use: \`"visualAid": {"type": "countable_objects", "item": "cat", "count": 12}\`
- Keep the question text clean and readable - let the visualAid handle all visual elements

**CRITICAL VALIDATION REQUIREMENTS**:
✓ EVERY problem MUST have BOTH "question" AND "answer" fields (MANDATORY)
✓ Content must be mathematically accurate and grade-appropriate
✓ Format must reasonably accommodate the user's layout requests
✓ Educational standards must be maintained regardless of format
✓ JSON must be valid and parseable
✓ Problems must align with Grade ${gradeLevel} Common Core standards

⚠️ **IMPORTANT NOTES**:
- Prioritize educational value over format preferences when they conflict
- Be creative in adapting standard educational content to custom formats
- Maintain mathematical rigor while accommodating layout requests
- If specific format elements are unclear, implement reasonable interpretations

🚨 **CRITICAL REMINDER**: Each problem MUST include both "question" and "answer" fields! Custom formatting should enhance, not compromise, educational content.

Generate the complete custom-formatted worksheet now with ${problemCount} problems that follow the requested format while maintaining educational excellence.`;
}
