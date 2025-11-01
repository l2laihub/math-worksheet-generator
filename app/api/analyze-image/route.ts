import { NextRequest, NextResponse } from 'next/server';
import { analyzeSampleWorksheet, getImageBuffer } from '@/lib/services/image-analysis';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const userDescription = formData.get('description') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Image file too large (max 10MB)' },
        { status: 400 }
      );
    }

    console.log('[ImageAnalysis] Processing image:', {
      name: file.name,
      size: file.size,
      type: file.type,
      hasDescription: !!userDescription
    });

    // Get image buffer for analysis
    const { buffer, mimeType } = await getImageBuffer(file);

    // Analyze the image
    const analysis = await analyzeSampleWorksheet(buffer, mimeType, userDescription);

    console.log('[ImageAnalysis] Analysis completed:', {
      layout: analysis.layout,
      specialFeatures: analysis.specialFeatures,
      suggestedVisualAids: analysis.suggestedVisualAids
    });

    return NextResponse.json({
      success: true,
      analysis,
      fileName: file.name
    });

  } catch (error) {
    console.error('[ImageAnalysis] Error:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to analyze image',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}