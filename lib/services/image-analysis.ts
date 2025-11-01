/**
 * Image Analysis Service for Custom Worksheet Formats
 * Uses Claude Vision API to analyze sample worksheet images
 */

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export interface ImageAnalysisResult {
  layout: 'single-column' | 'two-column' | 'three-column' | 'grid' | 'custom';
  visualStyle: string;
  problemSpacing: string;
  specialFeatures: string[];
  formatDescription: string;
  suggestedVisualAids: string[];
}

/**
 * Analyze a sample worksheet image to extract format information
 */
export async function analyzeSampleWorksheet(
  imageBuffer: Buffer,
  mimeType: string,
  userDescription?: string
): Promise<ImageAnalysisResult> {
  try {
    // Convert buffer to base64
    const base64Image = imageBuffer.toString('base64');
    
    const prompt = `You are an expert in educational worksheet design and mathematical formatting. Analyze this sample worksheet image and provide detailed format information.

${userDescription ? `The user described their desired format as: "${userDescription}"` : ''}

Please analyze:
1. **Layout Structure**: How are problems arranged? (single column, multiple columns, grid, etc.)
2. **Visual Style**: What visual elements are used? (boxes, lines, grids, mathematical notation styles)
3. **Problem Spacing**: How much space is between problems and sections?
4. **Special Features**: Any unique formatting elements (partial products grids, lattice multiplication, number lines, visual aids, etc.)
5. **Mathematical Visualization**: What types of mathematical representations are shown?

Provide your analysis in this JSON format:
{
  "layout": "single-column|two-column|three-column|grid|custom",
  "visualStyle": "Description of the visual appearance and style",
  "problemSpacing": "Description of spacing and layout density",
  "specialFeatures": ["feature1", "feature2", "feature3"],
  "formatDescription": "Detailed description of the overall format that can be used to recreate this style",
  "suggestedVisualAids": ["partial_products", "array", "countable_objects", "etc"]
}

Focus especially on identifying:
- Partial products/box method grids
- Lattice multiplication patterns  
- Array arrangements
- Number lines
- Visual counting aids
- Mathematical notation styles
- Problem organization patterns`;

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt
            },
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
                data: base64Image
              }
            }
          ]
        }
      ]
    });

    const responseText = message.content
      .filter((block) => block.type === 'text')
      .map((block) => ('text' in block ? block.text : ''))
      .join('\n');

    // Parse the JSON response
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON response from image analysis');
    }

    const analysisResult = JSON.parse(jsonMatch[0].replace(/```json|```/g, '').trim());
    
    return {
      layout: analysisResult.layout || 'single-column',
      visualStyle: analysisResult.visualStyle || 'Standard worksheet format',
      problemSpacing: analysisResult.problemSpacing || 'Normal spacing',
      specialFeatures: analysisResult.specialFeatures || [],
      formatDescription: analysisResult.formatDescription || 'Standard worksheet layout',
      suggestedVisualAids: analysisResult.suggestedVisualAids || []
    };

  } catch (error) {
    console.error('Error analyzing sample worksheet image:', error);
    
    // Return fallback analysis
    return {
      layout: 'single-column',
      visualStyle: 'Unable to analyze image - using standard format',
      problemSpacing: 'Standard spacing',
      specialFeatures: [],
      formatDescription: userDescription || 'Standard worksheet layout with custom formatting requested',
      suggestedVisualAids: ['array', 'countable_objects']
    };
  }
}

/**
 * Upload image to temporary storage and return URL
 */
export async function uploadTempImage(file: File): Promise<string> {
  // For now, return a placeholder - we'll implement actual upload later
  // This would typically upload to a service like Supabase Storage or AWS S3
  return `temp-image-${Date.now()}-${file.name}`;
}

/**
 * Get image buffer from uploaded file for analysis
 */
export async function getImageBuffer(file: File): Promise<{ buffer: Buffer; mimeType: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimeType = file.type;
  
  return { buffer, mimeType };
}