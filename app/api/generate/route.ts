import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { generateWorksheetPrompt, generateCustomWorksheetPrompt, parseWorksheetResponse, validateWorksheet } from '@/lib/prompts/worksheet-generator';
import { checkWorksheetCompliance } from '@/lib/utils/compliance-checker';
import type { GenerateWorksheetRequest, GenerateWorksheetResponse } from '@/types/worksheet';
import { generateWorksheetPDF } from '@/lib/pdf/generator';
import { uploadPDF, generatePDFFileName } from '@/lib/storage/upload';
import { prisma } from '@/lib/prisma';

// Validation schema
const GenerateWorksheetSchema = z.object({
  gradeLevel: z.number().int().min(1).max(6),
  topic: z.string().min(1).max(100),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  problemCount: z.number().int().min(5).max(20),
  visualTheme: z.enum(['animals', 'space', 'food', 'nature', 'other']),
  mathematicalTools: z.array(z.string()).optional(),
  problemSolvingStrategy: z.string().optional(),
  scaffoldingLevel: z.enum(['none', 'guided', 'heavy']).optional(),
  representationType: z.enum(['concrete', 'pictorial', 'abstract', 'mixed', 'word_problems']).optional(),
  includeThinkingPrompts: z.boolean().optional(),
  includeToolExamples: z.boolean().optional(),
  // Custom format fields
  useCustomFormat: z.boolean().optional(),
  customFormatDescription: z.string().max(2000).optional(),
  sampleImageUrl: z.string().optional(),
}).refine((data) => {
  // If custom format is enabled, description is required
  if (data.useCustomFormat && !data.customFormatDescription?.trim()) {
    return false;
  }
  return true;
}, {
  message: "Custom format description is required when using custom format",
  path: ["customFormatDescription"]
}).refine((data) => {
  // Custom format description minimum length validation
  if (data.customFormatDescription && data.customFormatDescription.trim().length > 0 && data.customFormatDescription.trim().length < 50) {
    return false;
  }
  return true;
}, {
  message: "Please provide more detail about your desired format (minimum 50 characters)",
  path: ["customFormatDescription"]
});

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validationResult = GenerateWorksheetSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request parameters',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const params = validationResult.data;
    
    // Enhanced parameter logging
    console.log('[Generate] Received parameters:', JSON.stringify({
      gradeLevel: params.gradeLevel,
      topic: params.topic,
      difficulty: params.difficulty,
      problemCount: params.problemCount,
      visualTheme: params.visualTheme,
      mathematicalTools: params.mathematicalTools || 'none',
      problemSolvingStrategy: params.problemSolvingStrategy || 'none',
      scaffoldingLevel: params.scaffoldingLevel || 'default',
      representationType: params.representationType || 'default',
      includeThinkingPrompts: params.includeThinkingPrompts || false,
      includeToolExamples: params.includeToolExamples || false,
    }, null, 2));

    // Generate unique ID for this generation
    const generationId = crypto.randomUUID();

    // Create database record with status 'pending'
    await prisma.generation.create({
      data: {
        id: generationId,
        gradeLevel: params.gradeLevel,
        topic: params.topic,
        difficulty: params.difficulty,
        problemCount: params.problemCount,
        visualTheme: params.visualTheme,
        status: 'pending',
      },
    });

    // Return immediately with generation ID
    const immediateResponse = NextResponse.json({ 
      id: generationId,
      status: 'pending' 
    }, { status: 202 });

    // Start async generation process (don't await)
    processGenerationAsync(generationId, params).catch(error => {
      console.error('[Generate] Async generation failed:', error);
    });

    return immediateResponse;
  } catch (error) {
    console.error('[Generate] Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to generate worksheet',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Process worksheet generation asynchronously
 */
async function processGenerationAsync(generationId: string, params: any) {
  let currentStep = 'initialization';
  
  try {
    console.log('[Generate] Starting async generation...', { generationId, params });

    // Step 1: Validate environment variables
    currentStep = 'environment_validation';
    const requiredEnvVars = ['ANTHROPIC_API_KEY', 'NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
      throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
    }
    console.log('[Generate] Environment variables validated', { generationId });

    // Step 2: Generate prompt
    currentStep = 'prompt_generation';
    const prompt = params.useCustomFormat 
      ? generateCustomWorksheetPrompt({
          gradeLevel: params.gradeLevel,
          topic: params.topic,
          difficulty: params.difficulty,
          problemCount: params.problemCount,
          theme: params.visualTheme,
          customFormatDescription: params.customFormatDescription,
          sampleImageUrl: params.sampleImageUrl,
        })
      : generateWorksheetPrompt({
          gradeLevel: params.gradeLevel,
          topic: params.topic,
          difficulty: params.difficulty,
          problemCount: params.problemCount,
          theme: params.visualTheme,
          mathematicalTools: params.mathematicalTools,
          problemSolvingStrategy: params.problemSolvingStrategy,
          scaffoldingLevel: params.scaffoldingLevel,
          representationType: params.representationType,
          includeThinkingPrompts: params.includeThinkingPrompts,
        });
    console.log('[Generate] Prompt generated', { generationId, promptLength: prompt.length });
    
    // Enhanced prompt logging for debugging
    console.log('[Generate] Prompt preview (first 2000 chars):', prompt.substring(0, 2000));
    console.log('[Generate] Prompt analysis:', {
      generationId,
      hasToolInstructions: params.mathematicalTools?.length ? prompt.includes('Mathematical Tools') : 'N/A',
      hasStrategyInstructions: params.problemSolvingStrategy && params.problemSolvingStrategy !== 'none' ? prompt.includes('Problem-Solving Strategy') : 'N/A',
      hasRepresentationInstructions: prompt.includes('Representation Focus'),
      containsMandatory: prompt.includes('MANDATORY'),
      selectedTools: params.mathematicalTools || [],
      selectedStrategy: params.problemSolvingStrategy || 'none',
      selectedRepresentation: params.representationType || 'mixed',
    });

    // Step 3: Call Claude API
    currentStep = 'claude_api_call';
    console.log('[Generate] Calling Claude API...', { generationId });
    
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Step 4: Extract response text
    currentStep = 'response_extraction';
    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => ('text' in block ? block.text : ''))
      .join('\n');

    console.log('[Generate] Claude response received', {
      generationId,
      responseLength: responseText.length,
      tokenUsage: message.usage,
    });
    
    // Enhanced response logging for debugging
    console.log('[Generate] Claude response preview (first 1000 chars):', responseText.substring(0, 1000));
    console.log('[Generate] Claude response analysis:', {
      generationId,
      hasJsonBlock: responseText.includes('```json'),
      hasProblemsArray: responseText.includes('"problems"'),
      hasMetadata: responseText.includes('"metadata"'),
      responseStructure: {
        startsWithJson: responseText.trim().startsWith('{') || responseText.includes('```json'),
        endsWithJson: responseText.trim().endsWith('}') || responseText.includes('```'),
        containsTitle: responseText.includes('"title"'),
      }
    });

    // Step 5: Parse worksheet response
    currentStep = 'response_parsing';
    console.log('[Generate] Parsing worksheet response...', { 
      generationId, 
      responsePreview: responseText.substring(0, 200) + '...'
    });
    
    let worksheetData;
    try {
      worksheetData = parseWorksheetResponse(responseText);
      console.log('[Generate] Response parsed successfully', {
        generationId,
        problemCount: worksheetData.problems?.length || 0,
        title: worksheetData.title
      });
    } catch (parseError) {
      const errorDetails = {
        generationId,
        error: parseError instanceof Error ? parseError.message : 'Unknown parsing error',
        responseLength: responseText.length,
        responseStart: responseText.substring(0, 500),
        responseEnd: responseText.substring(Math.max(0, responseText.length - 500))
      };
      console.error('[Generate] Failed to parse Claude response', errorDetails);
      
      // Store detailed error in database for debugging
      const detailedError = `Parsing failed: ${parseError instanceof Error ? parseError.message : 'Unknown'}. Response preview: ${responseText.substring(0, 200)}...`;
      throw new Error(detailedError);
    }

    // Step 6: Validate worksheet
    currentStep = 'worksheet_validation';
    const validation = validateWorksheet(worksheetData, {
      gradeLevel: params.gradeLevel,
      topic: params.topic,
      difficulty: params.difficulty,
      problemCount: params.problemCount,
      theme: params.visualTheme,
    });

    if (!validation.valid) {
      const errorMsg = `Worksheet validation failed: ${validation.errors.join(', ')}`;
      console.error('[Generate] Worksheet validation failed', {
        generationId,
        errors: validation.errors,
      });

      await prisma.generation.update({
        where: { id: generationId },
        data: { 
          status: 'failed',
          errorMessage: errorMsg
        },
      });

      return;
    }

    console.log('[Generate] Worksheet validated successfully', {
      generationId,
      problemCount: worksheetData.problems.length,
    });

    // Step 6.5: Compliance checking
    currentStep = 'compliance_checking';
    const complianceResult = checkWorksheetCompliance(worksheetData, {
      mathematicalTools: params.mathematicalTools as any,
      problemSolvingStrategy: params.problemSolvingStrategy as any,
      scaffoldingLevel: params.scaffoldingLevel,
      representationType: params.representationType,
      includeThinkingPrompts: params.includeThinkingPrompts,
      gradeLevel: params.gradeLevel,
      topic: params.topic,
    });

    console.log('[Generate] Compliance check results:', {
      generationId,
      isCompliant: complianceResult.isCompliant,
      score: complianceResult.score,
      violations: complianceResult.violations,
      successes: complianceResult.successes,
    });

    // Log detailed compliance analysis
    if (!complianceResult.isCompliant) {
      console.warn('[Generate] Compliance violations detected:', {
        generationId,
        score: complianceResult.score,
        violations: complianceResult.violations,
        details: complianceResult.details,
      });
    }

    // Step 7: Generate PDFs
    currentStep = 'pdf_generation';
    console.log('[Generate] Generating PDFs...', { generationId });

    const selections = {
      mathematicalTools: params.mathematicalTools,
      problemSolvingStrategy: params.problemSolvingStrategy,
      scaffoldingLevel: params.scaffoldingLevel,
      representationType: params.representationType,
      includeThinkingPrompts: params.includeThinkingPrompts,
      includeToolExamples: params.includeToolExamples,
      difficulty: params.difficulty,
      theme: params.visualTheme,
    };

    const [worksheetBuffer, answerKeyBuffer] = await Promise.all([
      generateWorksheetPDF(worksheetData, false, selections),
      generateWorksheetPDF(worksheetData, true, selections),
    ]);

    console.log('[Generate] PDFs generated', {
      generationId,
      worksheetSize: worksheetBuffer.length,
      answerKeySize: answerKeyBuffer.length,
    });

    // Step 8: Upload PDFs
    currentStep = 'pdf_upload';
    console.log('[Generate] Uploading PDFs...', { generationId });

    const [worksheetUpload, answerKeyUpload] = await Promise.all([
      uploadPDF(worksheetBuffer, generatePDFFileName(generationId, 'worksheet')),
      uploadPDF(answerKeyBuffer, generatePDFFileName(generationId, 'answer-key')),
    ]);

    console.log('[Generate] PDFs uploaded', {
      generationId,
      worksheetUrl: worksheetUpload.url,
      answerKeyUrl: answerKeyUpload.url,
    });

    // Step 9: Update database with completion
    currentStep = 'database_completion_update';
    await prisma.generation.update({
      where: { id: generationId },
      data: {
        status: 'completed',
        worksheetPdfUrl: worksheetUpload.url,
        answerKeyPdfUrl: answerKeyUpload.url,
        tokenUsage: message.usage.input_tokens + message.usage.output_tokens,
        errorMessage: null // Clear any previous error
      },
    });

    console.log('[Generate] Async generation completed successfully', { generationId });

  } catch (error) {
    const errorMsg = `Failed at step '${currentStep}': ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error('[Generate] Async generation error:', {
      generationId,
      currentStep,
      error: errorMsg,
      stack: error instanceof Error ? error.stack : undefined
    });

    // Update database with failed status and detailed error
    try {
      await prisma.generation.update({
        where: { id: generationId },
        data: { 
          status: 'failed',
          errorMessage: errorMsg
        },
      });
      console.log('[Generate] Database updated with error status', { generationId });
    } catch (dbError) {
      console.error('[Generate] Failed to update database with error status:', {
        generationId,
        dbError: dbError instanceof Error ? dbError.message : 'Unknown DB error'
      });
    }
  }
}
