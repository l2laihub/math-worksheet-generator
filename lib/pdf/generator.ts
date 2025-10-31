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
    const problemsPerColumn = options.isAnswerKey ? 10 : 5;
    const columnWidth = 250;
    const startX = 50;
    let currentY = doc.y;
    let currentColumn = 0;

    options.problems.forEach((problem, index) => {
      // Check if we need a new page
      if (index > 0 && index % (problemsPerColumn * 2) === 0) {
        doc.addPage();
        currentY = 50;
        currentColumn = 0;
      }
      // Check if we need to switch columns
      else if (index > 0 && index % problemsPerColumn === 0) {
        currentColumn = 1;
        currentY = 50;
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
          width: columnWidth - 20,
          align: 'left',
        });

      currentY = doc.y + 5;

      // Visual aid rendering (if not answer key)
      if (problem.visualAid && !options.isAnswerKey) {
        try {
          // Convert VisualAid to VisualPattern
          const pattern = convertToVisualPattern(problem.visualAid);

          // Get pattern dimensions to reserve space
          const dimensions = getPatternDimensions(pattern);

          // Render the visual pattern
          VisualPatternRenderer.render(doc as any, pattern, x + 20, currentY);

          // Update currentY based on pattern height
          currentY += dimensions.height + 10;
        } catch (error) {
          console.error('Error rendering visual aid:', error);
          // Fallback to text placeholder
          doc.fontSize(9).fillColor('#666').text('[Visual Aid]', x + 20, currentY, {
            width: columnWidth - 20,
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
            width: columnWidth - 20,
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
              width: columnWidth - 20,
            });
          currentY = doc.y + 10;
        }
      }

      // Update currentY for next problem
      currentY += 5;
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
