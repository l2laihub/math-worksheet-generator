import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateWorksheetPrompt } from '@/lib/prompts/worksheet-generator';

// Validation schema matching the main generate endpoint
const DebugPromptSchema = z.object({
  gradeLevel: z.number().int().min(1).max(6),
  topic: z.string().min(1).max(100),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  problemCount: z.number().int().min(5).max(20),
  visualTheme: z.enum(['animals', 'space', 'food', 'nature', 'other']),
  mathematicalTools: z.array(z.string()).optional(),
  problemSolvingStrategy: z.string().optional(),
  scaffoldingLevel: z.enum(['none', 'guided', 'heavy']).optional(),
  representationType: z.enum(['concrete', 'pictorial', 'abstract', 'mixed']).optional(),
  includeThinkingPrompts: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    console.log('[Debug] Debug prompt endpoint called');
    
    // Parse and validate request body
    const body = await request.json();
    console.log('[Debug] Received parameters:', JSON.stringify(body, null, 2));
    
    const validationResult = DebugPromptSchema.safeParse(body);

    if (!validationResult.success) {
      console.log('[Debug] Validation failed:', validationResult.error.issues);
      return NextResponse.json(
        {
          error: 'Invalid request parameters',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const params = validationResult.data;
    console.log('[Debug] Validated parameters:', JSON.stringify(params, null, 2));

    // Generate the prompt
    const prompt = generateWorksheetPrompt({
      gradeLevel: params.gradeLevel,
      topic: params.topic,
      difficulty: params.difficulty,
      problemCount: params.problemCount,
      theme: params.visualTheme,
      mathematicalTools: params.mathematicalTools as any,
      problemSolvingStrategy: params.problemSolvingStrategy as any,
      scaffoldingLevel: params.scaffoldingLevel,
      representationType: params.representationType,
      includeThinkingPrompts: params.includeThinkingPrompts,
    });

    console.log('[Debug] Generated prompt length:', prompt.length);
    console.log('[Debug] Generated prompt preview:', prompt.substring(0, 1000));

    // Analyze prompt content for verification
    const promptAnalysis = {
      hasToolInstructions: params.mathematicalTools?.length ? prompt.includes('Mathematical Tools') : null,
      hasStrategyInstructions: params.problemSolvingStrategy && params.problemSolvingStrategy !== 'none' ? prompt.includes('Problem-Solving Strategy') : null,
      hasScaffoldingInstructions: prompt.includes('Support Level'),
      hasRepresentationInstructions: prompt.includes('Representation Focus'),
      hasThinkingPrompts: params.includeThinkingPrompts ? prompt.includes('Thinking Prompts') : null,
      containsMandatory: prompt.includes('MANDATORY'),
      containsCritical: prompt.includes('CRITICAL'),
      toolsListed: params.mathematicalTools?.map(tool => prompt.includes(tool)) || [],
      strategyMentioned: params.problemSolvingStrategy && params.problemSolvingStrategy !== 'none' ? prompt.includes(params.problemSolvingStrategy) : null,
    };

    return NextResponse.json({
      success: true,
      parameters: params,
      prompt: {
        full: prompt,
        preview: prompt.substring(0, 2000),
        length: prompt.length,
        sections: {
          beginning: prompt.substring(0, 500),
          middle: prompt.substring(prompt.length / 2 - 250, prompt.length / 2 + 250),
          end: prompt.substring(prompt.length - 500),
        }
      },
      analysis: promptAnalysis,
      metadata: {
        timestamp: new Date().toISOString(),
        promptHash: prompt.length.toString() + prompt.substring(0, 10).replace(/\s/g, ''),
      }
    });

  } catch (error) {
    console.error('[Debug] Error:', error);
    return NextResponse.json({
      error: 'Debug failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}