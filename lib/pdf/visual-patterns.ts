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
  | { type: 'fraction_circle'; numerator: number; denominator: number }
  | { type: 'division_groups'; dividend: number; divisor: number; quotient: number; item: string }
  | { type: 'sample_count'; item: string; totalCount: number; sampleCount: number };

/**
 * Visual Pattern Renderer Class
 * Provides static methods for rendering each pattern type
 */
export class VisualPatternRenderer {
  /**
   * Pattern 1: Countable Objects
   * Display items in rows for counting, wrapping to fit width
   *
   * Example: "Count the apples: 🍎🍎🍎🍎🍎"
   *
   * @param doc - PDFKit document
   * @param pattern - Countable objects pattern
   * @param x - X position
   * @param y - Y position
   * @param maxWidth - Maximum width constraint
   * @param size - Size of each item (default: 30)
   */
  static renderCountableObjects(
    doc: typeof PDFDocument,
    pattern: { item: string; count: number },
    x: number,
    y: number,
    maxWidth: number = 220,
    size: number = 30
  ): void {
    const spacing = 10;
    const itemSpacing = size + spacing;
    const itemsPerRow = Math.floor(maxWidth / itemSpacing);
    
    // Render items in rows
    for (let i = 0; i < pattern.count; i++) {
      const row = Math.floor(i / itemsPerRow);
      const col = i % itemsPerRow;
      const itemX = x + col * itemSpacing;
      const itemY = y + row * (size + 5);
      
      renderSVGAsset(doc, pattern.item, itemX, itemY, size);
    }
  }

  /**
   * Pattern 2: Grouped Objects
   * Display groups of items for addition/subtraction with width constraint
   *
   * Example: "🍎🍎🍎 + 🍎🍎 = ?"
   *
   * @param doc - PDFKit document
   * @param pattern - Grouped objects pattern
   * @param x - X position
   * @param y - Y position
   * @param maxWidth - Maximum width constraint
   * @param size - Size of each item (default: 30)
   */
  static renderGroupedObjects(
    doc: typeof PDFDocument,
    pattern: { groups: Array<{ item: string; count: number }> },
    x: number,
    y: number,
    maxWidth: number = 220,
    size: number = 30
  ): void {
    let xOffset = 0;
    let yOffset = 0;
    const itemSpacing = size + 5;
    const rowHeight = size + 10;

    for (let g = 0; g < pattern.groups.length; g++) {
      const group = pattern.groups[g];
      
      // Check if group fits on current row
      const groupWidth = group.count * itemSpacing + (g < pattern.groups.length - 1 ? 30 : 0);
      if (xOffset + groupWidth > maxWidth && xOffset > 0) {
        // Move to next row
        xOffset = 0;
        yOffset += rowHeight;
      }

      // Render items in this group
      for (let i = 0; i < group.count; i++) {
        renderSVGAsset(doc, group.item, x + xOffset, y + yOffset, size);
        xOffset += itemSpacing;
      }

      // Add + sign between groups (except after last group)
      if (g < pattern.groups.length - 1) {
        doc
          .fontSize(20)
          .fillColor('#000')
          .text('+', x + xOffset, y + yOffset + size / 4, { width: 20, align: 'center' });
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
      (doc as any)
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
   * Pattern 6: Division Groups (NEW)
   * Display division as equal groups
   *
   * Example: "84 ÷ 7 = 12" shows 7 groups with 12 items each
   *
   * @param doc - PDFKit document
   * @param pattern - Division groups pattern
   * @param x - X position
   * @param y - Y position
   * @param maxWidth - Maximum width constraint
   * @param size - Size of each item (default: 20)
   */
  static renderDivisionGroups(
    doc: typeof PDFDocument,
    pattern: { dividend: number; divisor: number; quotient: number; item: string },
    x: number,
    y: number,
    maxWidth: number = 220,
    size: number = 20
  ): void {
    const groupSpacing = 40;
    const itemSpacing = size + 3;
    const maxGroupsPerRow = Math.floor(maxWidth / groupSpacing);
    const showFullGroups = pattern.divisor <= 8 && pattern.quotient <= 6;

    if (showFullGroups) {
      // Show all groups with all items
      for (let g = 0; g < pattern.divisor; g++) {
        const groupRow = Math.floor(g / maxGroupsPerRow);
        const groupCol = g % maxGroupsPerRow;
        const groupX = x + groupCol * groupSpacing;
        const groupY = y + groupRow * (size * 3 + 20);

        // Render items in this group (max 2 rows per group)
        const itemsPerRow = Math.ceil(pattern.quotient / 2);
        for (let i = 0; i < pattern.quotient; i++) {
          const itemRow = Math.floor(i / itemsPerRow);
          const itemCol = i % itemsPerRow;
          const itemX = groupX + itemCol * (size + 2);
          const itemY = groupY + itemRow * (size + 2);
          
          renderSVGAsset(doc, pattern.item, itemX, itemY, size - 5);
        }
      }
    } else {
      // Show conceptual representation with text
      const conceptY = y;
      
      // Draw a few sample groups
      const sampleGroups = Math.min(3, pattern.divisor);
      for (let g = 0; g < sampleGroups; g++) {
        const groupX = x + g * 60;
        
        // Draw 3-4 sample items per group
        const sampleItems = Math.min(4, pattern.quotient);
        for (let i = 0; i < sampleItems; i++) {
          const itemX = groupX + (i % 2) * (size + 2);
          const itemY = conceptY + Math.floor(i / 2) * (size + 2);
          renderSVGAsset(doc, pattern.item, itemX, itemY, size - 5);
        }
        
        // Add text label
        doc.fontSize(8).fillColor('#666')
           .text(`${pattern.quotient} ${pattern.item}s`, groupX, conceptY + size * 2 + 5, { width: 40, align: 'center' });
      }
      
      // Add summary text
      if (sampleGroups < pattern.divisor) {
        doc.fontSize(10).fillColor('#000')
           .text(`${pattern.divisor} groups of ${pattern.quotient} = ${pattern.dividend}`, 
                 x, conceptY + size * 2 + 20, { width: maxWidth });
      }
    }
  }

  /**
   * Pattern 7: Sample Count (NEW)
   * Display a sample of items with total count indication
   *
   * Example: Show 8 apples + "... (24 total)"
   *
   * @param doc - PDFKit document
   * @param pattern - Sample count pattern
   * @param x - X position
   * @param y - Y position
   * @param maxWidth - Maximum width constraint
   * @param size - Size of each item (default: 25)
   */
  static renderSampleCount(
    doc: typeof PDFDocument,
    pattern: { item: string; totalCount: number; sampleCount: number },
    x: number,
    y: number,
    maxWidth: number = 220,
    size: number = 25
  ): void {
    const spacing = 5;
    const itemSpacing = size + spacing;
    const itemsPerRow = Math.floor((maxWidth - 60) / itemSpacing); // Reserve space for text
    
    // Render sample items
    for (let i = 0; i < pattern.sampleCount; i++) {
      const row = Math.floor(i / itemsPerRow);
      const col = i % itemsPerRow;
      const itemX = x + col * itemSpacing;
      const itemY = y + row * (size + spacing);
      
      renderSVGAsset(doc, pattern.item, itemX, itemY, size);
    }
    
    // Add continuation indicator
    const lastItemCol = (pattern.sampleCount - 1) % itemsPerRow;
    const lastItemRow = Math.floor((pattern.sampleCount - 1) / itemsPerRow);
    const dotsX = x + (lastItemCol + 1) * itemSpacing;
    const dotsY = y + lastItemRow * (size + spacing) + size / 2;
    
    doc.fontSize(16).fillColor('#666')
       .text('...', dotsX, dotsY - 8);
    
    // Add total count
    const totalY = y + Math.ceil(pattern.sampleCount / itemsPerRow) * (size + spacing) + 5;
    doc.fontSize(10).fillColor('#000')
       .text(`(${pattern.totalCount} total)`, x, totalY, { width: maxWidth, align: 'left' });
  }

  /**
   * Render any visual pattern based on type
   *
   * @param doc - PDFKit document
   * @param pattern - Visual pattern to render
   * @param x - X position
   * @param y - Y position
   * @param maxWidth - Maximum width constraint (default: 220)
   */
  static render(
    doc: typeof PDFDocument,
    pattern: VisualPattern,
    x: number,
    y: number,
    maxWidth: number = 220
  ): void {
    switch (pattern.type) {
      case 'countable_objects':
        this.renderCountableObjects(doc, pattern, x, y, maxWidth);
        break;

      case 'grouped_objects':
        this.renderGroupedObjects(doc, pattern, x, y, maxWidth);
        break;

      case 'array':
        this.renderArray(doc, pattern, x, y);
        break;

      case 'number_line':
        this.renderNumberLine(doc, pattern, x, y, Math.min(maxWidth, 400));
        break;

      case 'fraction_circle':
        this.renderFractionCircle(doc, pattern, x, y);
        break;

      case 'division_groups':
        this.renderDivisionGroups(doc, pattern, x, y, maxWidth);
        break;

      case 'sample_count':
        this.renderSampleCount(doc, pattern, x, y, maxWidth);
        break;

      default:
        console.warn(`Unknown visual pattern type: ${(pattern as any).type}`);
    }
  }
}

/**
 * Helper: Get visual pattern dimensions for layout planning
 */
export function getPatternDimensions(pattern: VisualPattern, maxWidth: number = 220): {
  width: number;
  height: number;
} {
  switch (pattern.type) {
    case 'countable_objects': {
      // Smart limit enforcement - cap at 12 items
      const actualCount = Math.min(pattern.count, 12);
      const itemSpacing = 40; // 30px size + 10px spacing
      const itemsPerRow = Math.floor(maxWidth / itemSpacing);
      const rows = Math.ceil(actualCount / itemsPerRow);
      return {
        width: Math.min(actualCount * itemSpacing, maxWidth),
        height: rows * 35, // 30px size + 5px row spacing
      };
    }

    case 'grouped_objects': {
      const totalItems = pattern.groups.reduce((sum, g) => sum + g.count, 0);
      const separators = pattern.groups.length - 1;
      const singleRowWidth = totalItems * 35 + separators * 30;
      
      if (singleRowWidth <= maxWidth) {
        return {
          width: singleRowWidth,
          height: 30,
        };
      } else {
        // Estimate multi-row height (conservative)
        const estimatedRows = Math.ceil(singleRowWidth / maxWidth);
        return {
          width: maxWidth,
          height: estimatedRows * 40,
        };
      }
    }

    case 'array':
      return {
        width: Math.min(pattern.cols * 30, maxWidth),
        height: pattern.rows * 30,
      };

    case 'number_line':
      return {
        width: Math.min(400, maxWidth),
        height: 40,
      };

    case 'fraction_circle':
      return {
        width: 100,
        height: 100,
      };

    case 'division_groups': {
      const showFullGroups = pattern.divisor <= 8 && pattern.quotient <= 6;
      if (showFullGroups) {
        const groupsPerRow = Math.floor(maxWidth / 40);
        const rows = Math.ceil(pattern.divisor / groupsPerRow);
        return {
          width: maxWidth,
          height: rows * 80, // Space for groups
        };
      } else {
        return {
          width: maxWidth,
          height: 60, // Conceptual representation
        };
      }
    }

    case 'sample_count': {
      const itemSpacing = 30;
      const itemsPerRow = Math.floor((maxWidth - 60) / itemSpacing);
      const rows = Math.ceil(pattern.sampleCount / itemsPerRow);
      return {
        width: maxWidth,
        height: rows * 35 + 25, // Extra space for total count text
      };
    }

    default:
      return { width: 100, height: 100 };
  }
}
