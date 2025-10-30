/**
 * Cost Validation Test for Math Worksheet Generator
 *
 * Purpose: Measure actual Claude API costs for worksheet generation
 * Tests 3 scenarios: Easy (Grade 1), Medium (Grade 3), Hard (Grade 6)
 *
 * Usage:
 *   1. Set ANTHROPIC_API_KEY environment variable
 *   2. Run: npm run test:cost
 */

import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';

// Test scenarios
const TEST_SCENARIOS = [
  {
    name: 'Easy - Grade 1 Addition',
    gradeLevel: 1,
    topic: 'Addition',
    difficulty: 'easy',
    problemCount: 10,
    theme: 'Animals'
  },
  {
    name: 'Medium - Grade 3 Multiplication',
    gradeLevel: 3,
    topic: 'Multiplication',
    difficulty: 'medium',
    problemCount: 12,
    theme: 'Space'
  },
  {
    name: 'Hard - Grade 6 Fractions',
    gradeLevel: 6,
    topic: 'Fractions',
    difficulty: 'hard',
    problemCount: 15,
    theme: 'Nature'
  }
];

// Pricing (as of October 2024)
const PRICING = {
  'claude-sonnet-4-20250514': {
    input: 3.00 / 1_000_000,   // $3 per million input tokens
    output: 15.00 / 1_000_000  // $15 per million output tokens
  }
};

const MODEL = 'claude-sonnet-4-20250514';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Sample grade standards (simplified for testing)
const GRADE_STANDARDS = {
  1: {
    'Addition': {
      description: 'Add within 20, demonstrating fluency for addition within 10',
      examples: ['7 + 3', '5 + 8', '10 + 6'],
      easy: 'Single digit addition (0-10)',
      medium: 'Addition within 20',
      hard: 'Two-digit addition without regrouping'
    }
  },
  3: {
    'Multiplication': {
      description: 'Multiply one-digit whole numbers by multiples of 10',
      examples: ['3 × 4', '6 × 7', '9 × 8'],
      easy: 'Multiplication facts 0-5',
      medium: 'Multiplication facts 0-10',
      hard: 'Two-digit by one-digit multiplication'
    }
  },
  6: {
    'Fractions': {
      description: 'Apply and extend understanding of operations with fractions',
      examples: ['1/2 + 1/3', '2/5 × 3/4', '3/4 ÷ 1/2'],
      easy: 'Add/subtract fractions with same denominator',
      medium: 'Add/subtract fractions with different denominators',
      hard: 'Multiply and divide fractions, word problems'
    }
  }
};

/**
 * Generate system prompt with standards context
 */
function createSystemPrompt() {
  return `You are an expert math educator and worksheet creator. Your task is to generate high-quality,
standards-aligned math worksheets for elementary school students (grades 1-6).

You will be given specific parameters (grade level, topic, difficulty, problem count, theme) and you must:
1. Generate appropriate math problems aligned to Common Core standards
2. Provide correct answer keys
3. Include brief descriptions for themed visual aids
4. Ensure problems match the specified difficulty level

Return the response as a JSON object with this structure:
{
  "problems": [
    {
      "id": 1,
      "question": "7 + 3 = ?",
      "answer": "10",
      "visualAid": "Two groups of apples being combined"
    }
  ],
  "answerKey": {
    "problems": [...same as above with answers shown]
  },
  "metadata": {
    "gradeLevel": 1,
    "topic": "Addition",
    "difficulty": "easy",
    "problemCount": 10,
    "theme": "Animals"
  }
}`;
}

/**
 * Generate user prompt for worksheet generation
 */
function createUserPrompt(params) {
  const standards = GRADE_STANDARDS[params.gradeLevel]?.[params.topic] || {};

  return `Generate a math worksheet with the following specifications:

**Grade Level:** ${params.gradeLevel}
**Topic:** ${params.topic}
**Difficulty:** ${params.difficulty}
**Number of Problems:** ${params.problemCount}
**Theme:** ${params.theme}

**Standards Guidance:**
${standards.description || 'N/A'}

**Difficulty Level Details:**
- Easy: ${standards.easy || 'Basic problems'}
- Medium: ${standards.medium || 'Moderate complexity'}
- Hard: ${standards.hard || 'Advanced problems'}

**Requirements:**
1. Generate exactly ${params.problemCount} problems
2. All problems must be at "${params.difficulty}" difficulty level
3. Include visual aid descriptions that incorporate the "${params.theme}" theme
4. Ensure all answers are mathematically correct
5. Problems should vary in structure (not all identical format)
6. Return data as valid JSON matching the specified structure

Generate the worksheet now.`;
}

/**
 * Generate worksheet and measure token usage
 */
async function generateWorksheet(scenario) {
  console.log(`\n📝 Testing: ${scenario.name}`);
  console.log(`   Parameters: Grade ${scenario.gradeLevel}, ${scenario.problemCount} problems, ${scenario.difficulty} difficulty`);

  try {
    const startTime = Date.now();

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4000,
      system: createSystemPrompt(),
      messages: [
        {
          role: 'user',
          content: createUserPrompt(scenario)
        }
      ]
    });

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    // Extract token usage
    const inputTokens = message.usage.input_tokens;
    const outputTokens = message.usage.output_tokens;

    // Calculate costs
    const inputCost = inputTokens * PRICING[MODEL].input;
    const outputCost = outputTokens * PRICING[MODEL].output;
    const totalCost = inputCost + outputCost;

    // Parse response (basic validation)
    let responseValid = false;
    try {
      const content = message.content[0].text;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        responseValid = data.problems && Array.isArray(data.problems);
      }
    } catch (e) {
      console.log(`   ⚠️  Response parsing: Failed (${e.message})`);
    }

    return {
      scenario: scenario.name,
      success: true,
      duration,
      tokens: {
        input: inputTokens,
        output: outputTokens,
        total: inputTokens + outputTokens
      },
      cost: {
        input: inputCost,
        output: outputCost,
        total: totalCost
      },
      responseValid
    };
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return {
      scenario: scenario.name,
      success: false,
      error: error.message
    };
  }
}

/**
 * Calculate and display cost projections
 */
function calculateProjections(results) {
  const successfulResults = results.filter(r => r.success);
  if (successfulResults.length === 0) {
    console.log('\n❌ No successful tests to calculate projections');
    return;
  }

  // Calculate averages
  const avgCost = successfulResults.reduce((sum, r) => sum + r.cost.total, 0) / successfulResults.length;
  const avgInputTokens = successfulResults.reduce((sum, r) => sum + r.tokens.input, 0) / successfulResults.length;
  const avgOutputTokens = successfulResults.reduce((sum, r) => sum + r.tokens.output, 0) / successfulResults.length;

  console.log('\n' + '='.repeat(80));
  console.log('📊 COST ANALYSIS & PROJECTIONS');
  console.log('='.repeat(80));

  console.log('\n📈 Average Per Worksheet:');
  console.log(`   Cost:           $${avgCost.toFixed(4)} per worksheet`);
  console.log(`   Input Tokens:   ${Math.round(avgInputTokens)} tokens`);
  console.log(`   Output Tokens:  ${Math.round(avgOutputTokens)} tokens`);
  console.log(`   Total Tokens:   ${Math.round(avgInputTokens + avgOutputTokens)} tokens`);

  console.log('\n💰 Monthly Cost Projections:');
  const volumes = [100, 500, 1000, 5000];
  volumes.forEach(vol => {
    const monthlyCost = avgCost * vol;
    console.log(`   ${vol.toLocaleString().padStart(5)} generations/month: $${monthlyCost.toFixed(2)}`);
  });

  console.log('\n📋 PRD Estimate Comparison:');
  console.log(`   PRD Estimated:  $0.05 - $0.15 per worksheet`);
  console.log(`   Actual Average: $${avgCost.toFixed(4)} per worksheet`);

  if (avgCost > 0.15) {
    console.log(`   ⚠️  HIGHER than PRD estimate by ${((avgCost / 0.15 - 1) * 100).toFixed(0)}%`);
  } else if (avgCost < 0.05) {
    console.log(`   ✅ LOWER than PRD estimate by ${((1 - avgCost / 0.05) * 100).toFixed(0)}%`);
  } else {
    console.log(`   ✅ Within PRD estimate range`);
  }

  console.log('\n🎯 Cost Breakdown:');
  console.log(`   Input Cost:     ${((avgInputTokens * PRICING[MODEL].input / avgCost) * 100).toFixed(1)}% of total`);
  console.log(`   Output Cost:    ${((avgOutputTokens * PRICING[MODEL].output / avgCost) * 100).toFixed(1)}% of total`);

  return {
    avgCost,
    avgInputTokens,
    avgOutputTokens,
    projections: volumes.map(vol => ({ volume: vol, cost: avgCost * vol }))
  };
}

/**
 * Save results to file
 */
function saveResults(results, projections) {
  const timestamp = new Date().toISOString();
  const report = {
    timestamp,
    model: MODEL,
    pricing: PRICING[MODEL],
    testResults: results,
    analysis: projections,
    conclusion: {
      withinBudget: projections.avgCost <= 0.15,
      recommendedAction: projections.avgCost <= 0.15
        ? 'Proceed with implementation - costs are acceptable'
        : 'Consider cost optimization strategies or adjust pricing model'
    }
  };

  const filename = `tests/cost-validation/cost-report-${new Date().toISOString().split('T')[0]}.json`;
  fs.writeFileSync(filename, JSON.stringify(report, null, 2));
  console.log(`\n💾 Full report saved to: ${filename}`);
}

/**
 * Main test execution
 */
async function main() {
  console.log('🚀 Math Worksheet Generator - Cost Validation Test');
  console.log('='.repeat(80));
  console.log(`Model: ${MODEL}`);
  console.log(`Input Pricing:  $${PRICING[MODEL].input * 1_000_000}/M tokens`);
  console.log(`Output Pricing: $${PRICING[MODEL].output * 1_000_000}/M tokens`);
  console.log('='.repeat(80));

  // Check API key
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('\n❌ ERROR: ANTHROPIC_API_KEY environment variable not set');
    console.log('\nTo run this test:');
    console.log('  1. Get your API key from https://console.anthropic.com/');
    console.log('  2. Set it: export ANTHROPIC_API_KEY=your_key_here');
    console.log('  3. Run: npm run test:cost');
    process.exit(1);
  }

  const results = [];

  // Run tests sequentially
  for (const scenario of TEST_SCENARIOS) {
    const result = await generateWorksheet(scenario);
    results.push(result);

    if (result.success) {
      console.log(`   ✅ Success (${result.duration.toFixed(2)}s)`);
      console.log(`   📊 Tokens: ${result.tokens.input} input + ${result.tokens.output} output = ${result.tokens.total} total`);
      console.log(`   💵 Cost: $${result.cost.total.toFixed(4)} ($${result.cost.input.toFixed(4)} input + $${result.cost.output.toFixed(4)} output)`);
      console.log(`   ${result.responseValid ? '✅' : '⚠️ '} Response validation: ${result.responseValid ? 'Valid JSON' : 'Invalid'}`);
    }

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Calculate projections
  const projections = calculateProjections(results);

  // Save results
  if (projections) {
    saveResults(results, projections);
  }

  console.log('\n' + '='.repeat(80));
  console.log('✅ Cost validation test complete!');
  console.log('='.repeat(80) + '\n');
}

// Run the test
main().catch(console.error);
