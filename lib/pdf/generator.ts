import PDFDocument from 'pdfkit';
import type { WorksheetOutput } from '@/lib/prompts/worksheet-generator';
import type { VisualAid } from '@/types/worksheet';
import { VisualPatternRenderer, getPatternDimensions, type VisualPattern } from './visual-patterns';
import { getToolExamples } from '@/lib/constants/tool-examples';
import { 
  renderBaseTenBlocks, 
  renderTenFrame, 
  renderArray, 
  renderNumberLine, 
  renderFractionBar,
  renderMoney,
  renderGeoboard 
} from './tool-visual-renderer';

export interface PDFGenerationOptions {
  title: string;
  gradeLevel: number;
  problems: Array<{
    number: number;
    question: string;
    visualAid?: VisualAid;
    answer?: string;
    solution?: string;
  }>;
  isAnswerKey?: boolean;
  standards?: string[];
  // New pedagogical options for verification
  selections?: {
    mathematicalTools?: string[];
    problemSolvingStrategy?: string;
    scaffoldingLevel?: string;
    representationType?: string;
    includeThinkingPrompts?: boolean;
    includeToolExamples?: boolean;
    difficulty?: string;
    theme?: string;
  };
}

export async function generateWorksheetPDF(
  worksheet: WorksheetOutput,
  isAnswerKey: boolean = false,
  selections?: {
    mathematicalTools?: string[];
    problemSolvingStrategy?: string;
    scaffoldingLevel?: string;
    representationType?: string;
    includeThinkingPrompts?: boolean;
    includeToolExamples?: boolean;
    difficulty?: string;
    theme?: string;
  }
): Promise<Buffer> {
  const options: PDFGenerationOptions = {
    title: worksheet.title,
    gradeLevel: worksheet.metadata.gradeLevel,
    problems: worksheet.problems.map((p, idx) => ({
      number: idx + 1,
      question: p.question,
      visualAid: p.visualAid,
      answer: isAnswerKey ? String(p.answer) : undefined,
      solution: undefined, // WorksheetProblem doesn't have solution field
    })),
    isAnswerKey,
    standards: worksheet.metadata.standards,
    selections: selections,
  };

  return createPDF(options);
}

function createPDF(options: PDFGenerationOptions): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'LETTER',
      margins: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50,
      },
    });

    const buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    // Header
    doc
      .fontSize(20)
      .font('Helvetica-Bold')
      .text(
        options.isAnswerKey ? `${options.title} - Answer Key` : options.title,
        {
          align: 'center',
        }
      )
      .moveDown(0.5);

    doc
      .fontSize(12)
      .font('Helvetica')
      .text(`Grade ${options.gradeLevel}`, { align: 'center' })
      .moveDown(0.5);

    // Pedagogical Selections Summary Box (for verification)
    if (!options.isAnswerKey && options.selections) {
      const selectionBoxY = doc.y;
      const selectionLines = [];
      
      if (options.selections.mathematicalTools?.length) {
        selectionLines.push(`Tools: ${options.selections.mathematicalTools.join(', ')}`);
      }
      if (options.selections.problemSolvingStrategy && options.selections.problemSolvingStrategy !== 'none') {
        selectionLines.push(`Strategy: ${options.selections.problemSolvingStrategy.replace(/_/g, ' ')}`);
      }
      if (options.selections.representationType) {
        selectionLines.push(`Representation: ${options.selections.representationType}`);
      }
      if (options.selections.scaffoldingLevel) {
        selectionLines.push(`Support: ${options.selections.scaffoldingLevel}`);
      }
      if (options.selections.includeThinkingPrompts) {
        selectionLines.push('Thinking Prompts: Enabled');
      }
      if (options.selections.includeToolExamples) {
        selectionLines.push('Tool Examples: Enabled');
      }
      
      if (selectionLines.length > 0) {
        const selectionBoxHeight = (selectionLines.length * 12) + 20;
        const selectionBoxPadding = 8;
        
        // Draw selections box
        doc
          .rect(50, selectionBoxY, doc.page.width - 100, selectionBoxHeight)
          .fillAndStroke('#fff3cd', '#ffeaa7')
          .fillColor('#000');
        
        // Selections header
        doc
          .fontSize(10)
          .font('Helvetica-Bold')
          .fillColor('#856404')
          .text('Pedagogical Selections:', 50 + selectionBoxPadding, selectionBoxY + selectionBoxPadding);
        
        // Selections list
        doc
          .fontSize(9)
          .font('Helvetica')
          .fillColor('#856404');
          
        selectionLines.forEach((line, index) => {
          doc.text(`• ${line}`, 50 + selectionBoxPadding + 10, selectionBoxY + selectionBoxPadding + 15 + (index * 12));
        });
        
        doc.y = selectionBoxY + selectionBoxHeight + 10;
        doc.fillColor('#000');
      }
    }

    // Common Core Standards Box (prominent display on first page)
    if (!options.isAnswerKey && options.standards && options.standards.length > 0) {
      const boxY = doc.y;
      const boxHeight = 40;
      const boxPadding = 8;
      
      // Draw standards box
      doc
        .rect(50, boxY, doc.page.width - 100, boxHeight)
        .fillAndStroke('#f8fafc', '#e2e8f0')
        .fillColor('#000');
      
      // Standards header
      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .fillColor('#1e40af')
        .text('Common Core Standards Covered:', 50 + boxPadding, boxY + boxPadding);
      
      // Standards list
      const standardsText = options.standards.map(code => {
        const shortCode = code.replace('CCSS.MATH.CONTENT.', '');
        return shortCode;
      }).join(' • ');
      
      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('#374151')
        .text(standardsText, 50 + boxPadding, boxY + boxPadding + 12, {
          width: doc.page.width - 100 - (boxPadding * 2),
          align: 'left'
        });
      
      doc.y = boxY + boxHeight + 10;
    } else {
      doc.moveDown(0.5);
    }

    // Tool Usage Examples Section
    if (!options.isAnswerKey && options.selections?.includeToolExamples && options.selections?.mathematicalTools?.length) {
      const toolExamples = getToolExamples(
        options.selections.mathematicalTools as any,
        options.gradeLevel
      );
      
      if (toolExamples.length > 0) {
        const exampleBoxY = doc.y;
        const exampleBoxPadding = 8;
        
        // Tool Examples Header
        doc
          .fontSize(12)
          .font('Helvetica-Bold')
          .fillColor('#059669')
          .text('How to Use Your Mathematical Tools', 50, exampleBoxY);
        
        doc.y = exampleBoxY + 20;
        
        // Display examples (limit to 2 for space)
        const examplestoShow = toolExamples.slice(0, 2);
        
        examplestoShow.forEach((example, exampleIndex) => {
          const exampleStartY = doc.y;
          
          // Tool name and problem
          doc
            .fontSize(10)
            .font('Helvetica-Bold')
            .fillColor('#065f46')
            .text(`${example.toolName} Example:`, 50, doc.y);
          
          doc
            .fontSize(9)
            .font('Helvetica')
            .fillColor('#374151')
            .text(`Problem: ${example.problem}`, 50, doc.y + 2);
          
          doc.moveDown(0.3);
          
          // Steps
          doc
            .fontSize(9)
            .font('Helvetica-Bold')
            .fillColor('#065f46')
            .text('Steps:', 50, doc.y);
          
          example.steps.forEach((step, stepIndex) => {
            doc
              .fontSize(8)
              .font('Helvetica')
              .fillColor('#374151')
              .text(`${step.number}. ${step.description}`, 55, doc.y + 2, {
                width: doc.page.width - 110,
                align: 'left'
              });
            
            if (step.visualization) {
              // Check if we should render a visual element
              const visualY = doc.y + 2;
              const visualRendered = renderToolExampleVisual(doc, example.toolId, step, 65, visualY, doc.page.width - 120);
              
              if (!visualRendered) {
                // Fall back to text visualization if no visual was rendered
                doc
                  .fontSize(8)
                  .font('Helvetica-Oblique')
                  .fillColor('#6b7280')
                  .text(`   ${step.visualization}`, 55, doc.y + 2);
              }
            }
            
            doc.moveDown(0.1);
          });
          
          // Solution
          doc
            .fontSize(9)
            .font('Helvetica-Bold')
            .fillColor('#065f46')
            .text(`Solution: ${example.solution}`, 50, doc.y + 2);
          
          doc.moveDown(0.5);
          
          // Add separator line between examples (except for last one)
          if (exampleIndex < examplestoShow.length - 1) {
            doc
              .strokeColor('#e5e7eb')
              .lineWidth(0.5)
              .moveTo(50, doc.y)
              .lineTo(doc.page.width - 50, doc.y)
              .stroke();
            doc.moveDown(0.3);
          }
        });
        
        doc.moveDown(0.5);
        
        // Add bottom border for tool examples section
        doc
          .strokeColor('#d1fae5')
          .lineWidth(2)
          .moveTo(50, doc.y)
          .lineTo(doc.page.width - 50, doc.y)
          .stroke();
        
        doc.moveDown(0.5);
        doc.fillColor('#000');
      }
    }

    // Problems
    const columnWidth = 250;
    const maxVisualWidth = 220; // Reserve space for visuals
    const startX = 50;
    const pageBottom = doc.page.height - 100; // Leave margin at bottom
    const columnStartY = doc.y;
    
    console.log(`[PDF] Starting problems section at Y=${columnStartY}, page bottom=${pageBottom}`);
    
    let currentColumn = 0;
    let column1Y = columnStartY; // Track Y position for column 1
    let column2Y = columnStartY; // Track Y position for column 2
    let problemsInCurrentColumn = 0;

    options.problems.forEach((problem, index) => {
      // Get current Y based on column
      let currentY = currentColumn === 0 ? column1Y : column2Y;
      
      // Calculate space needed for this problem
      let estimatedHeight = 80; // Base height for problem text and answer line
      
      // Add visual aid height if present
      if (problem.visualAid && !options.isAnswerKey) {
        try {
          const pattern = convertToVisualPattern(problem.visualAid);
          const dimensions = getPatternDimensions(pattern, maxVisualWidth);
          estimatedHeight += dimensions.height + 20; // Add pattern height plus spacing
        } catch {
          estimatedHeight += 80; // Default visual height on error
        }
      }
      
      const totalNeeded = estimatedHeight;
      
      // Check if we need to switch columns or add a new page
      if (currentY + totalNeeded > pageBottom) {
        if (currentColumn === 0) {
          // Switch to second column
          currentColumn = 1;
          currentY = column2Y;
          problemsInCurrentColumn = 0;
        } else {
          // Need a new page
          console.log(`[PDF] Adding new page for problem ${index + 1}`);
          doc.addPage();
          column1Y = doc.y;
          column2Y = doc.y;
          currentColumn = 0;
          currentY = column1Y;
          problemsInCurrentColumn = 0;
        }
      }
      
      const x = startX + currentColumn * (columnWidth + 50);
      doc.x = x;
      doc.y = currentY;

      // Problem number
      doc.fontSize(12).font('Helvetica-Bold').text(`${problem.number}.`, {
        continued: false,
      });

      currentY = doc.y;

      // Problem question
      doc
        .fontSize(11)
        .font('Helvetica')
        .text(problem.question, x + 20, currentY, {
          width: Math.min(columnWidth - 20, maxVisualWidth),
          align: 'left',
        });

      currentY = doc.y + 5;

      // Visual aid rendering (if not answer key)
      if (problem.visualAid && !options.isAnswerKey) {
        try {
          // Convert VisualAid to VisualPattern
          const pattern = convertToVisualPattern(problem.visualAid);

          // Get pattern dimensions to reserve space
          const dimensions = getPatternDimensions(pattern, maxVisualWidth);

          // Render the visual pattern with width constraint
          VisualPatternRenderer.render(doc as any, pattern, x + 20, currentY, maxVisualWidth);

          // Update currentY based on pattern height
          currentY += dimensions.height + 10;
        } catch (error) {
          console.error('Error rendering visual aid:', error);
          // Fallback to text placeholder
          doc.fontSize(9).fillColor('#666').text('[Visual Aid]', x + 20, currentY, {
            width: maxVisualWidth,
          });
          currentY = doc.y + 5;
        }
      }

      // Answer space (if not answer key)
      if (!options.isAnswerKey) {
        doc
          .fontSize(10)
          .fillColor('#000')
          .text('Answer: ___________', x + 20, currentY, {
            width: maxVisualWidth,
          });
        currentY = doc.y + 20;
      }
      // Show answer and solution (if answer key)
      else {
        if (problem.answer) {
          doc
            .fontSize(10)
            .fillColor('#000')
            .font('Helvetica-Bold')
            .text('Answer: ', x + 20, currentY, { continued: true })
            .font('Helvetica')
            .fillColor('#0066cc')
            .text(problem.answer);
          currentY = doc.y + 5;
        }

        if (problem.solution) {
          doc
            .fontSize(9)
            .fillColor('#666')
            .text('Solution: ', x + 20, currentY, { continued: true })
            .text(problem.solution, {
              width: maxVisualWidth,
            });
          currentY = doc.y + 10;
        }
      }

      // Update currentY for next problem and save to appropriate column
      currentY += 5;
      problemsInCurrentColumn++;
      
      if (currentColumn === 0) {
        column1Y = currentY;
      } else {
        column2Y = currentY;
      }
    });

    // Footer - add page numbers to all pages
    const range = doc.bufferedPageRange();
    const pageCount = range.count;

    if (pageCount > 0) {
      console.log(`[PDF] Page range: start=${range.start}, count=${pageCount}`);
      
      try {
        // PDFKit: bufferedPageRange() returns {start: X, count: Y}
        // switchToPage() expects absolute page index starting from range.start
        for (let i = 0; i < pageCount; i++) {
          const pageIndex = range.start + i; // Use start as base
          console.log(`[PDF] Switching to page ${pageIndex} (${i + 1}/${pageCount})`);
          
          try {
            doc.switchToPage(pageIndex);
            
            // Page number
            doc
              .fontSize(8)
              .fillColor('#666')
              .text(
                `Page ${i + 1} of ${pageCount}`,
                50,
                doc.page.height - 50,
                {
                  align: 'center',
                  width: doc.page.width - 100,
                }
              );
          } catch (pageError) {
            console.warn(`[PDF] Failed to switch to page ${pageIndex}:`, pageError.message);
            // Continue with next page
          }
        }
      } catch (footerError) {
        console.warn('[PDF] Footer generation failed:', footerError.message);
        // Continue without page numbers
      }
    }

    // End the document without trying to switch pages
    doc.end();
  });
}

/**
 * Render visual representation for tool examples
 */
function renderToolExampleVisual(
  doc: typeof PDFDocument,
  toolId: string,
  step: any,
  x: number,
  y: number,
  maxWidth: number
): boolean {
  // Extract numbers from visualization text for rendering
  const vizText = step.visualization || '';
  
  switch (toolId) {
    case 'base_ten_blocks':
      // Look for patterns like "2 ten-blocks + 5 one-blocks"
      const blockMatch = vizText.match(/(\d+)\s*ten-block[s]?\s*\+\s*(\d+)\s*one-block[s]?/);
      if (blockMatch) {
        const tens = parseInt(blockMatch[1]);
        const ones = parseInt(blockMatch[2]);
        const dimensions = renderBaseTenBlocks({
          doc: doc as any,
          x,
          y,
          maxWidth,
          tens,
          ones
        });
        doc.y = y + dimensions.height + 5;
        return true;
      }
      break;
      
    case 'ten_frames':
      // Look for patterns like "6 filled circles, 4 empty circles"
      const frameMatch = vizText.match(/(\d+)\s*filled\s*circle[s]?/);
      if (frameMatch) {
        const filled = parseInt(frameMatch[1]);
        const dimensions = renderTenFrame({
          doc: doc as any,
          x,
          y,
          maxWidth,
          filled
        });
        doc.y = y + dimensions.height + 5;
        return true;
      }
      break;
      
    case 'arrays':
      // Look for array dimensions in the problem or steps
      if (step.number === 1 && vizText.includes('rows')) {
        // Try to extract from visualization like "4 rows × 3 in each row"
        const arrayMatch = vizText.match(/(\d+)\s*rows?\s*×\s*(\d+)/);
        if (arrayMatch) {
          const rows = parseInt(arrayMatch[1]);
          const cols = parseInt(arrayMatch[2]);
          const dimensions = renderArray({
            doc: doc as any,
            x,
            y,
            maxWidth,
            rows,
            cols
          });
          doc.y = y + dimensions.height + 5;
          return true;
        }
      }
      break;
      
    case 'fraction_bars':
      // Look for fraction patterns like "1 part shaded, 3 parts empty (1/4)"
      const fractionMatch = vizText.match(/(\d+)\s*part[s]?\s*shaded.*\((\d+)\/(\d+)\)/);
      if (fractionMatch) {
        const numerator = parseInt(fractionMatch[2]);
        const denominator = parseInt(fractionMatch[3]);
        const dimensions = renderFractionBar({
          doc: doc as any,
          x,
          y,
          maxWidth,
          numerator,
          denominator
        });
        doc.y = y + dimensions.height + 5;
        return true;
      }
      break;
      
    case 'money_manipulatives':
      // Look for money patterns like "2 quarters + 3 dimes + 1 nickel"
      const quarterMatch = vizText.match(/(\d+)\s*quarter[s]?/);
      const dimeMatch = vizText.match(/(\d+)\s*dime[s]?/);
      const nickelMatch = vizText.match(/(\d+)\s*nickel[s]?/);
      const pennyMatch = vizText.match(/(\d+)\s*penn/);
      
      if (quarterMatch || dimeMatch || nickelMatch || pennyMatch) {
        const dimensions = renderMoney({
          doc: doc as any,
          x,
          y,
          maxWidth,
          quarters: quarterMatch ? parseInt(quarterMatch[1]) : 0,
          dimes: dimeMatch ? parseInt(dimeMatch[1]) : 0,
          nickels: nickelMatch ? parseInt(nickelMatch[1]) : 0,
          pennies: pennyMatch ? parseInt(pennyMatch[1]) : 0
        });
        doc.y = y + dimensions.height + 5;
        return true;
      }
      break;
      
    case 'geoboards':
      // For geoboard examples, render a basic geoboard with a simple rectangle
      if (step.number === 1 && vizText.includes('rubber band')) {
        const dimensions = renderGeoboard({
          doc: doc as any,
          x,
          y,
          maxWidth,
          size: 5,
          shape: 'square'
        });
        doc.y = y + dimensions.height + 5;
        return true;
      }
      break;
  }
  
  return false;
}

/**
 * Convert VisualAid to VisualPattern
 * The types are compatible but need to be cast properly
 */
function convertToVisualPattern(visualAid: VisualAid): VisualPattern {
  return visualAid as unknown as VisualPattern;
}
