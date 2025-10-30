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
  theme: z.enum(['animals', 'space', 'sports', 'food', 'nature']),
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
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const params = validationResult.data as GenerateWorksheetRequest;

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
        theme: params.theme,
        worksheetUrl: '',
        answerKeyUrl: '',
        status: 'pending',
      },
    });

    // Generate worksheet content using Claude
    console.log('[Generate] Calling Claude API...', { generationId, params });

    const prompt = generateWorksheetPrompt({
      gradeLevel: params.gradeLevel,
      topic: params.topic,
      difficulty: params.difficulty,
      problemCount: params.problemCount,
      theme: params.theme,
    });

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

    // Extract text content from Claude's response
    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => ('text' in block ? block.text : ''))
      .join('\n');

    console.log('[Generate] Claude response received', {
      generationId,
      responseLength: responseText.length,
    });

    // Parse and validate worksheet data
    const worksheetData = parseWorksheetResponse(responseText);
    const validation = validateWorksheet(worksheetData, params);

    if (!validation.valid) {
      console.error('[Generate] Worksheet validation failed', {
        generationId,
        errors: validation.errors,
      });

      return NextResponse.json(
        {
          error: 'Generated worksheet failed validation',
          details: validation.errors,
        },
        { status: 500 }
      );
    }

    console.log('[Generate] Worksheet validated successfully', {
      generationId,
      problemCount: worksheetData.problems.length,
    });

    // Generate PDFs (worksheet and answer key)
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

    // Upload PDFs to Supabase Storage
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

    // Update database record with status 'completed' and URLs
    await prisma.generation.update({
      where: { id: generationId },
      data: {
        status: 'completed',
        worksheetUrl: worksheetUpload.url,
        answerKeyUrl: answerKeyUpload.url,
      },
    });

    const response: GenerateWorksheetResponse = {
      id: generationId,
      status: 'completed',
      worksheetUrl: worksheetUpload.url,
      answerKeyUrl: answerKeyUpload.url,
    };

    console.log('[Generate] Generation completed', { generationId });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('[Generate] Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors,
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
