import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { generateWorksheetPrompt } from '@/lib/prompts/worksheet-generator';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const params = {
      gradeLevel: body.gradeLevel || 2,
      topic: body.topic || 'addition',
      difficulty: body.difficulty || 'easy',
      problemCount: body.problemCount || 5,
      theme: body.theme || 'animals'
    };

    console.log('[Test] Generating prompt...');
    const prompt = generateWorksheetPrompt(params);

    console.log('[Test] Calling Claude API...');
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

    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => ('text' in block ? block.text : ''))
      .join('\n');

    console.log('[Test] Claude response length:', responseText.length);
    console.log('[Test] Claude response preview:', responseText.substring(0, 500));

    return NextResponse.json({
      success: true,
      responseLength: responseText.length,
      responsePreview: responseText.substring(0, 1000),
      responseEnd: responseText.substring(Math.max(0, responseText.length - 500)),
      hasJsonBlock: responseText.includes('```json'),
      hasCodeBlock: responseText.includes('```'),
      tokenUsage: message.usage
    });

  } catch (error) {
    console.error('[Test] Error:', error);
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}