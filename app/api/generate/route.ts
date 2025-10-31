import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { generateWorksheetPrompt, parseWorksheetResponse, validateWorksheet } from '@/lib/prompts/worksheet-generator';
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
    const prompt = generateWorksheetPrompt({
      gradeLevel: params.gradeLevel,
      topic: params.topic,
      difficulty: params.difficulty,
      problemCount: params.problemCount,
      theme: params.visualTheme,
    });
    console.log('[Generate] Prompt generated', { generationId, promptLength: prompt.length });

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

    // Step 5: Parse worksheet response
    currentStep = 'response_parsing';
    console.log('[Generate] Parsing worksheet response...', { generationId });
    
    const worksheetData = parseWorksheetResponse(responseText);
    console.log('[Generate] Response parsed successfully', {
      generationId,
      problemCount: worksheetData.problems?.length || 0,
      title: worksheetData.title
    });

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

    // Step 7: Generate PDFs
    currentStep = 'pdf_generation';
    console.log('[Generate] Generating PDFs...', { generationId });

    const [worksheetBuffer, answerKeyBuffer] = await Promise.all([
      generateWorksheetPDF(worksheetData, false),
      generateWorksheetPDF(worksheetData, true),
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
