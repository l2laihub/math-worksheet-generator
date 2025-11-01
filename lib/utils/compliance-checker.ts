/**
 * Automated compliance checking for worksheet generation
 */

import type { WorksheetOutput } from '@/lib/prompts/worksheet-generator';
import type { MathematicalTool, ProblemSolvingStrategy, ScaffoldingLevel, RepresentationType } from '@/types/worksheet';

export interface ComplianceParams {
  mathematicalTools?: MathematicalTool[];
  problemSolvingStrategy?: ProblemSolvingStrategy;
  scaffoldingLevel?: ScaffoldingLevel;
  representationType?: RepresentationType;
  includeThinkingPrompts?: boolean;
  gradeLevel: number;
  topic: string;
}

export interface ComplianceResult {
  isCompliant: boolean;
  score: number; // 0-100
  violations: string[];
  successes: string[];
  details: {
    toolCompliance: {
      required: number;
      found: number;
      percentage: number;
    };
    strategyCompliance: {
      required: number;
      found: number;
      percentage: number;
    };
    representationCompliance: {
      type: RepresentationType;
      violations: string[];
    };
    scaffoldingCompliance: {
      level: ScaffoldingLevel;
      violations: string[];
    };
    thinkingPromptsCompliance: {
      required: boolean;
      found: number;
      percentage: number;
    };
  };
}

export function checkWorksheetCompliance(
  worksheet: WorksheetOutput,
  params: ComplianceParams
): ComplianceResult {
  const violations: string[] = [];
  const successes: string[] = [];
  let totalScore = 0;
  const maxScore = 100;

  // Check tools compliance (25 points)
  const toolsResult = checkToolsCompliance(worksheet, params.mathematicalTools || []);
  if (toolsResult.percentage >= 60) {
    successes.push(`Tools: ${toolsResult.percentage}% of problems use selected tools (required: 60%)`);
    totalScore += 25;
  } else if (params.mathematicalTools?.length) {
    violations.push(`Tools: Only ${toolsResult.percentage}% of problems use selected tools (required: 60%)`);
  } else {
    totalScore += 25; // No tools selected, so full score
  }

  // Check strategy compliance (25 points)
  const strategyResult = checkStrategyCompliance(worksheet, params.problemSolvingStrategy);
  if (strategyResult.percentage >= 40) {
    successes.push(`Strategy: ${strategyResult.percentage}% of problems use selected strategy (required: 40%)`);
    totalScore += 25;
  } else if (params.problemSolvingStrategy && params.problemSolvingStrategy !== 'none') {
    violations.push(`Strategy: Only ${strategyResult.percentage}% of problems use selected strategy (required: 40%)`);
  } else {
    totalScore += 25; // No strategy selected, so full score
  }

  // Check representation compliance (25 points)
  const representationResult = checkRepresentationCompliance(worksheet, params.representationType || 'mixed');
  if (representationResult.violations.length === 0) {
    successes.push(`Representation: All problems follow ${params.representationType} format`);
    totalScore += 25;
  } else {
    violations.push(...representationResult.violations);
  }

  // Check scaffolding compliance (15 points)
  const scaffoldingResult = checkScaffoldingCompliance(worksheet, params.scaffoldingLevel || 'guided');
  if (scaffoldingResult.violations.length === 0) {
    successes.push(`Scaffolding: All problems follow ${params.scaffoldingLevel} support level`);
    totalScore += 15;
  } else {
    violations.push(...scaffoldingResult.violations);
  }

  // Check thinking prompts compliance (10 points)
  const thinkingResult = checkThinkingPromptsCompliance(worksheet, params.includeThinkingPrompts || false);
  if (thinkingResult.percentage >= 60 || !params.includeThinkingPrompts) {
    successes.push(`Thinking Prompts: ${thinkingResult.percentage}% of problems include prompts`);
    totalScore += 10;
  } else {
    violations.push(`Thinking Prompts: Only ${thinkingResult.percentage}% of problems include prompts (required: 60%)`);
  }

  return {
    isCompliant: violations.length === 0,
    score: Math.round(totalScore),
    violations,
    successes,
    details: {
      toolCompliance: toolsResult,
      strategyCompliance: strategyResult,
      representationCompliance: representationResult,
      scaffoldingCompliance: scaffoldingResult,
      thinkingPromptsCompliance: thinkingResult,
    }
  };
}

function checkToolsCompliance(worksheet: WorksheetOutput, selectedTools: MathematicalTool[]) {
  if (selectedTools.length === 0) {
    return { required: 0, found: 0, percentage: 100 };
  }

  const requiredCount = Math.ceil(worksheet.problems.length * 0.6); // 60% requirement
  let foundCount = 0;

  const toolKeywords: Record<MathematicalTool, string[]> = {
    base_ten_blocks: ['base ten', 'place value blocks', 'hundreds blocks', 'tens blocks', 'ones blocks'],
    ten_frames: ['ten frame', 'frame', 'dots in frame'],
    fraction_bars: ['fraction bar', 'fraction strip', 'part of the bar'],
    area_models: ['area model', 'rectangle model', 'grid model'],
    bar_models: ['bar model', 'tape diagram', 'strip diagram'],
    number_lines: ['number line', 'on the line', 'jump on'],
    arrays: ['array', 'rows and columns', 'grid of'],
    hundreds_charts: ['hundreds chart', '100 chart', 'number chart'],
    geoboards: ['geoboard', 'dot paper', 'grid dots'],
    money_manipulatives: ['coins', 'dollars', 'cents', 'pennies', 'quarters'],
    partial_products: ['partial product', 'break apart', 'multiply each part'],
    lattice_multiplication: ['lattice', 'grid multiplication', 'diagonal method'],
    decomposition_method: ['decompose', 'break down', 'place value parts'],
    counters: ['counter', 'counting objects', 'circles to count'],
    pattern_blocks: ['pattern block', 'hexagon', 'trapezoid', 'rhombus'],
  };

  worksheet.problems.forEach(problem => {
    const questionLower = problem.question.toLowerCase();
    const hasSelectedTool = selectedTools.some(tool => {
      const keywords = toolKeywords[tool] || [];
      return keywords.some(keyword => questionLower.includes(keyword));
    });
    
    if (hasSelectedTool) {
      foundCount++;
    }
  });

  return {
    required: requiredCount,
    found: foundCount,
    percentage: Math.round((foundCount / worksheet.problems.length) * 100)
  };
}

function checkStrategyCompliance(worksheet: WorksheetOutput, selectedStrategy?: ProblemSolvingStrategy) {
  if (!selectedStrategy || selectedStrategy === 'none') {
    return { required: 0, found: 0, percentage: 100 };
  }

  const requiredCount = Math.ceil(worksheet.problems.length * 0.4); // 40% requirement
  let foundCount = 0;

  const strategyKeywords = {
    draw_picture: ['draw', 'picture', 'diagram', 'sketch'],
    make_table: ['table', 'chart', 'organize', 'list'],
    look_patterns: ['pattern', 'sequence', 'rule'],
    work_backwards: ['work backwards', 'start with', 'reverse'],
    break_parts: ['break', 'parts', 'smaller', 'step'],
    real_world: ['real', 'everyday', 'life', 'situation'],
    multiple_methods: ['different ways', 'another way', 'method'],
    error_analysis: ['error', 'mistake', 'wrong', 'correct'],
    none: []
  };

  worksheet.problems.forEach(problem => {
    const questionLower = problem.question.toLowerCase();
    const keywords = strategyKeywords[selectedStrategy] || [];
    const hasStrategy = keywords.some(keyword => questionLower.includes(keyword));
    
    if (hasStrategy) {
      foundCount++;
    }
  });

  return {
    required: requiredCount,
    found: foundCount,
    percentage: Math.round((foundCount / worksheet.problems.length) * 100)
  };
}

function checkRepresentationCompliance(worksheet: WorksheetOutput, representationType: RepresentationType) {
  const violations: string[] = [];

  worksheet.problems.forEach((problem, index) => {
    const questionLower = problem.question.toLowerCase();
    const hasVisualAid = !!problem.visualAid;
    const hasAbstractNumbers = /\d+\s*[+\-×÷]\s*\d+/.test(problem.question);
    const hasConcreteReferences = /\b(blocks?|bears?|toys?|objects?|counters?|manipulatives?)\b/i.test(problem.question);
    const hasPictorialReferences = /\b(picture|diagram|draw|chart|graph|visual)\b/i.test(problem.question);

    switch (representationType) {
      case 'concrete':
        if (!hasConcreteReferences) {
          violations.push(`Problem ${index + 1}: Missing concrete manipulative references`);
        }
        if (hasAbstractNumbers && !hasConcreteReferences) {
          violations.push(`Problem ${index + 1}: Contains abstract computation without concrete context`);
        }
        break;

      case 'pictorial':
        if (!hasPictorialReferences && !hasVisualAid) {
          violations.push(`Problem ${index + 1}: Missing visual/pictorial elements`);
        }
        break;

      case 'abstract':
        if (hasVisualAid) {
          violations.push(`Problem ${index + 1}: Contains visual aid (forbidden in abstract mode)`);
        }
        if (hasConcreteReferences) {
          violations.push(`Problem ${index + 1}: Contains concrete references (should be pure computation)`);
        }
        break;

      case 'mixed':
        // Mixed allows any combination, so no violations
        break;
    }
  });

  return {
    type: representationType,
    violations
  };
}

function checkScaffoldingCompliance(worksheet: WorksheetOutput, scaffoldingLevel: ScaffoldingLevel) {
  const violations: string[] = [];

  worksheet.problems.forEach((problem, index) => {
    const questionLower = problem.question.toLowerCase();
    const hasHints = /\b(think|remember|hint|try|first|next|step)\b/i.test(problem.question);
    const hasGuidance = /\b(can you|how about|what if|consider)\b/i.test(problem.question);

    switch (scaffoldingLevel) {
      case 'none':
        if (hasHints || hasGuidance) {
          violations.push(`Problem ${index + 1}: Contains hints/guidance (forbidden in independent mode)`);
        }
        break;

      case 'guided':
        // Should have some hints, but this is harder to enforce automatically
        break;

      case 'heavy':
        if (!hasHints && problem.question.length < 50) {
          violations.push(`Problem ${index + 1}: Lacks sufficient scaffolding for heavily supported mode`);
        }
        break;
    }
  });

  return {
    level: scaffoldingLevel,
    violations
  };
}

function checkThinkingPromptsCompliance(worksheet: WorksheetOutput, includeThinkingPrompts: boolean) {
  if (!includeThinkingPrompts) {
    return { required: false, found: 0, percentage: 0 };
  }

  const requiredCount = Math.ceil(worksheet.problems.length * 0.6); // 60% requirement
  let foundCount = 0;

  worksheet.problems.forEach(problem => {
    const questionLower = problem.question.toLowerCase();
    const hasThinkingPrompt = /\b(explain|thinking|how did you|why|show your work|strategy)\b/i.test(problem.question);
    
    if (hasThinkingPrompt) {
      foundCount++;
    }
  });

  return {
    required: includeThinkingPrompts,
    found: foundCount,
    percentage: Math.round((foundCount / worksheet.problems.length) * 100)
  };
}