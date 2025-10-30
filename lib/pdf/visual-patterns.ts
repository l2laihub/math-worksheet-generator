/**
 * Visual Pattern Renderers for Math Worksheets
 * Ports 5 visual patterns from Python implementation
 *
 * Patterns:
 * 1. countable_objects - Display items to count (e.g., 🍎🍎🍎🍎🍎)
 * 2. grouped_objects - Display groups for addition (e.g., 🍎🍎🍎 + 🍎🍎)
 * 3. array - Display grid for multiplication (e.g., 3×4 array)
 * 4. number_line - Display number line with markers
 * 5. fraction_circle - Display fraction circle with shaded portions
 */

import type PDFDocument from 'pdfkit';
import { renderSVGAsset, renderSVGGrid, renderSVGRow } from './svg-renderer';

/**
 * Visual Pattern Types
 */
export type VisualPattern =
  | { type: 'countable_objects'; item: string; count: number }
  | { type: 'grouped_objects'; groups: Array<{ item: string; count: number }> }
  | { type: 'array'; item: string; rows: number; cols: number }
  | { type: 'number_line'; start: number; end: number; highlights: number[] }
  | { type: 'fraction_circle'; numerator: number; denominator: number };

/**
 * Visual Pattern Renderer Class
 * Provides static methods for rendering each pattern type
 */
export class VisualPatternRenderer {
  /**
   * Pattern 1: Countable Objects
   * Display items in a row for counting
   *
   * Example: "Count the apples: 🍎🍎🍎🍎🍎"
   *
   * @param doc - PDFKit document
   * @param pattern - Countable objects pattern
   * @param x - X position
   * @param y - Y position
   * @param size - Size of each item (default: 30)
   */
  static renderCountableObjects(
    doc: typeof PDFDocument,
    pattern: { item: string; count: number },
    x: number,
    y: number,
    size: number = 30
  ): void {
    const spacing = 10;
    const itemSpacing = size + spacing;

    // Render items in a row
    for (let i = 0; i < pattern.count; i++) {
      renderSVGAsset(doc, pattern.item, x + i * itemSpacing, y, size);
    }
  }

  /**
   * Pattern 2: Grouped Objects
   * Display groups of items for addition/subtraction
   *
   * Example: "🍎🍎🍎 + 🍎🍎 = ?"
   *
   * @param doc - PDFKit document
   * @param pattern - Grouped objects pattern
   * @param x - X position
   * @param y - Y position
   * @param size - Size of each item (default: 30)
   */
  static renderGroupedObjects(
    doc: typeof PDFDocument,
    pattern: { groups: Array<{ item: string; count: number }> },
    x: number,
    y: number,
    size: number = 30
  ): void {
    let xOffset = 0;
    const itemSpacing = size + 5;

    for (let g = 0; g < pattern.groups.length; g++) {
      const group = pattern.groups[g];

      // Render items in this group
      for (let i = 0; i < group.count; i++) {
        renderSVGAsset(doc, group.item, x + xOffset, y, size);
        xOffset += itemSpacing;
      }

      // Add + sign between groups (except after last group)
      if (g < pattern.groups.length - 1) {
        doc
          .fontSize(20)
          .fillColor('#000')
          .text('+', x + xOffset, y + size / 4, { width: 20, align: 'center' });
        xOffset += 30;
      }
    }
  }

  /**
   * Pattern 3: Array
   * Display items in a grid for multiplication
   *
   * Example: 3 rows × 4 columns of 🍎
   *
   * @param doc - PDFKit document
   * @param pattern - Array pattern
   * @param x - X position
   * @param y - Y position
   * @param size - Size of each item (default: 25)
   */
  static renderArray(
    doc: typeof PDFDocument,
    pattern: { item: string; rows: number; cols: number },
    x: number,
    y: number,
    size: number = 25
  ): void {
    const spacing = 5;

    renderSVGGrid(doc, pattern.item, x, y, pattern.rows, pattern.cols, size, spacing);
  }

  /**
   * Pattern 4: Number Line
   * Display a number line with tick marks and highlights
   *
   * Example: Number line from 0 to 10 with 5 highlighted
   *
   * @param doc - PDFKit document
   * @param pattern - Number line pattern
   * @param x - X position
   * @param y - Y position
   * @param width - Total width of number line (default: 400)
   */
  static renderNumberLine(
    doc: typeof PDFDocument,
    pattern: { start: number; end: number; highlights: number[] },
    x: number,
    y: number,
    width: number = 400
  ): void {
    const range = pattern.end - pattern.start;
    const tickSpacing = width / range;

    // Save current stroke/fill colors
    const currentStrokeColor = (doc as any)._strokeColor || '#000000';
    const currentFillColor = (doc as any)._fillColor || '#000000';

    // Draw main line
    doc
      .strokeColor('#000')
      .lineWidth(2)
      .moveTo(x, y)
      .lineTo(x + width, y)
      .stroke();

    // Draw tick marks and numbers
    for (let i = pattern.start; i <= pattern.end; i++) {
      const tickX = x + (i - pattern.start) * tickSpacing;

      // Highlight if in highlights array
      const isHighlighted = pattern.highlights.includes(i);
      if (isHighlighted) {
        doc
          .fillColor('#FF6B6B')
          .circle(tickX, y - 15, 8)
          .fill();
      }

      // Tick mark
      doc
        .strokeColor('#000')
        .lineWidth(2)
        .moveTo(tickX, y - 5)
        .lineTo(tickX, y + 5)
        .stroke();

      // Number label
      doc
        .fillColor('#000')
        .fontSize(10)
        .text(i.toString(), tickX - 5, y + 10, { width: 10, align: 'center' });
    }

    // Restore original colors
    doc.strokeColor(currentStrokeColor).fillColor(currentFillColor);
  }

  /**
   * Pattern 5: Fraction Circle
   * Display a circle divided into portions with some shaded
   *
   * Example: 3/4 circle (3 out of 4 slices shaded)
   *
   * @param doc - PDFKit document
   * @param pattern - Fraction circle pattern
   * @param x - X position
   * @param y - Y position
   * @param radius - Radius of circle (default: 50)
   */
  static renderFractionCircle(
    doc: typeof PDFDocument,
    pattern: { numerator: number; denominator: number },
    x: number,
    y: number,
    radius: number = 50
  ): void {
    const centerX = x + radius;
    const centerY = y + radius;
    const anglePerSlice = (2 * Math.PI) / pattern.denominator;

    // Save current colors
    const currentStrokeColor = (doc as any)._strokeColor || '#000000';
    const currentFillColor = (doc as any)._fillColor || '#000000';

    // Draw filled slices (numerator)
    doc.fillColor('#4ECDC4');
    for (let i = 0; i < pattern.numerator; i++) {
      const startAngle = i * anglePerSlice - Math.PI / 2; // Start at top (-90°)
      const endAngle = startAngle + anglePerSlice;

      // Calculate arc endpoints
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      // Draw filled slice
      doc.save();
      doc
        .moveTo(centerX, centerY)
        .lineTo(x1, y1)
        .arc(centerX, centerY, radius, startAngle, endAngle)
        .lineTo(centerX, centerY)
        .fill();
      doc.restore();
    }

    // Draw all slice dividing lines
    doc.strokeColor('#000').lineWidth(2);
    for (let i = 0; i < pattern.denominator; i++) {
      const angle = i * anglePerSlice - Math.PI / 2;
      const endX = centerX + radius * Math.cos(angle);
      const endY = centerY + radius * Math.sin(angle);

      doc.moveTo(centerX, centerY).lineTo(endX, endY).stroke();
    }

    // Draw outer circle
    doc
      .strokeColor('#000')
      .lineWidth(2)
      .circle(centerX, centerY, radius)
      .stroke();

    // Restore original colors
    doc.strokeColor(currentStrokeColor).fillColor(currentFillColor);
  }

  /**
   * Render any visual pattern based on type
   *
   * @param doc - PDFKit document
   * @param pattern - Visual pattern to render
   * @param x - X position
   * @param y - Y position
   */
  static render(
    doc: typeof PDFDocument,
    pattern: VisualPattern,
    x: number,
    y: number
  ): void {
    switch (pattern.type) {
      case 'countable_objects':
        this.renderCountableObjects(doc, pattern, x, y);
        break;

      case 'grouped_objects':
        this.renderGroupedObjects(doc, pattern, x, y);
        break;

      case 'array':
        this.renderArray(doc, pattern, x, y);
        break;

      case 'number_line':
        this.renderNumberLine(doc, pattern, x, y);
        break;

      case 'fraction_circle':
        this.renderFractionCircle(doc, pattern, x, y);
        break;

      default:
        console.warn(`Unknown visual pattern type: ${(pattern as any).type}`);
    }
  }
}

/**
 * Helper: Get visual pattern dimensions for layout planning
 */
export function getPatternDimensions(pattern: VisualPattern): {
  width: number;
  height: number;
} {
  switch (pattern.type) {
    case 'countable_objects':
      return {
        width: pattern.count * 40, // 30px size + 10px spacing
        height: 30,
      };

    case 'grouped_objects': {
      const totalItems = pattern.groups.reduce((sum, g) => sum + g.count, 0);
      const separators = pattern.groups.length - 1;
      return {
        width: totalItems * 35 + separators * 30,
        height: 30,
      };
    }

    case 'array':
      return {
        width: pattern.cols * 30,
        height: pattern.rows * 30,
      };

    case 'number_line':
      return {
        width: 400,
        height: 40,
      };

    case 'fraction_circle':
      return {
        width: 100,
        height: 100,
      };

    default:
      return { width: 100, height: 100 };
  }
}
