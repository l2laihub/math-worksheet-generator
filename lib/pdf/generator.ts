import PDFDocument from 'pdfkit';
import type { WorksheetOutput } from '@/lib/prompts/worksheet-generator';
import type { VisualAid } from '@/types/worksheet';
import { VisualPatternRenderer, getPatternDimensions, type VisualPattern } from './visual-patterns';

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
}

export async function generateWorksheetPDF(
  worksheet: WorksheetOutput,
  isAnswerKey: boolean = false
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
      .moveDown(1.5);

    // Problems
    const columnWidth = 250;
    const maxVisualWidth = 220; // Reserve space for visuals
    const startX = 50;
    const pageBottom = doc.page.height - 100; // Leave margin at bottom
    const columnStartY = doc.y;
    
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
      // PDFKit: bufferedPageRange() returns {start: X, count: Y}
      // switchToPage() expects absolute page index starting from range.start
      for (let i = 0; i < pageCount; i++) {
        const pageIndex = range.start + i; // Use start as base
        doc.switchToPage(pageIndex);
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
      }
    }

    doc.end();
  });
}

/**
 * Convert VisualAid to VisualPattern
 * The types are compatible but need to be cast properly
 */
function convertToVisualPattern(visualAid: VisualAid): VisualPattern {
  return visualAid as unknown as VisualPattern;
}
