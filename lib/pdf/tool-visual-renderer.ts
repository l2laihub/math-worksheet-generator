/**
 * Visual Tool Renderer for PDF Generation
 * Provides drawing methods for mathematical tool visualizations in PDFs
 */

import type PDFDocument from 'pdfkit';

export interface ToolVisualOptions {
  x: number;
  y: number;
  maxWidth: number;
  doc: typeof PDFDocument;
}

/**
 * Renders base ten blocks using rectangles
 */
export function renderBaseTenBlocks(
  options: ToolVisualOptions & { hundreds?: number; tens: number; ones: number }
): { width: number; height: number } {
  const { doc, x, y, tens, ones, hundreds = 0 } = options;
  const blockSize = 10;
  const spacing = 5;
  let currentX = x;
  let maxHeight = 0;

  // Save current state
  doc.save();

  // Draw hundreds blocks (10x10 grid)
  if (hundreds > 0) {
    doc.fillColor('#3B82F6'); // Blue for hundreds
    for (let i = 0; i < hundreds; i++) {
      doc.rect(currentX, y, blockSize * 10, blockSize * 10)
        .fill();
      currentX += blockSize * 10 + spacing;
    }
    maxHeight = Math.max(maxHeight, blockSize * 10);
  }

  // Draw tens blocks (vertical bars)
  if (tens > 0) {
    doc.fillColor('#10B981'); // Green for tens
    for (let i = 0; i < tens; i++) {
      doc.rect(currentX, y, blockSize, blockSize * 10)
        .fill();
      currentX += blockSize + spacing;
    }
    maxHeight = Math.max(maxHeight, blockSize * 10);
  }

  // Draw ones blocks (small squares)
  if (ones > 0) {
    doc.fillColor('#F59E0B'); // Amber for ones
    const onesPerRow = 5;
    const rows = Math.ceil(ones / onesPerRow);
    
    for (let i = 0; i < ones; i++) {
      const row = Math.floor(i / onesPerRow);
      const col = i % onesPerRow;
      doc.rect(
        currentX + col * (blockSize + 2),
        y + row * (blockSize + 2),
        blockSize,
        blockSize
      ).fill();
    }
    currentX += onesPerRow * (blockSize + 2) + spacing;
    maxHeight = Math.max(maxHeight, rows * (blockSize + 2));
  }

  // Restore state
  doc.restore();

  return {
    width: currentX - x,
    height: maxHeight
  };
}

/**
 * Renders a ten frame with filled and empty circles
 */
export function renderTenFrame(
  options: ToolVisualOptions & { filled: number; total?: number }
): { width: number; height: number } {
  const { doc, x, y, filled, total = 10 } = options;
  const cellSize = 15;
  const circleRadius = 5;
  const frameRows = 2;
  const frameCols = 5;

  // Save current state
  doc.save();

  // Draw frame border
  doc.strokeColor('#374151')
    .lineWidth(1.5)
    .rect(x, y, frameCols * cellSize, frameRows * cellSize)
    .stroke();

  // Draw grid lines
  doc.lineWidth(0.5);
  
  // Vertical lines
  for (let i = 1; i < frameCols; i++) {
    doc.moveTo(x + i * cellSize, y)
      .lineTo(x + i * cellSize, y + frameRows * cellSize)
      .stroke();
  }
  
  // Horizontal line
  doc.moveTo(x, y + cellSize)
    .lineTo(x + frameCols * cellSize, y + cellSize)
    .stroke();

  // Draw circles
  for (let i = 0; i < total && i < 10; i++) {
    const row = Math.floor(i / frameCols);
    const col = i % frameCols;
    const centerX = x + col * cellSize + cellSize / 2;
    const centerY = y + row * cellSize + cellSize / 2;

    if (i < filled) {
      // Filled circle
      doc.fillColor('#3B82F6')
        .circle(centerX, centerY, circleRadius)
        .fill();
    } else {
      // Empty circle
      doc.strokeColor('#9CA3AF')
        .lineWidth(1)
        .circle(centerX, centerY, circleRadius)
        .stroke();
    }
  }

  // Restore state
  doc.restore();

  return {
    width: frameCols * cellSize,
    height: frameRows * cellSize
  };
}

/**
 * Renders an array/grid for multiplication
 */
export function renderArray(
  options: ToolVisualOptions & { rows: number; cols: number; item?: string }
): { width: number; height: number } {
  const { doc, x, y, rows, cols } = options;
  const dotRadius = 3;
  const spacing = 12;

  // Save current state
  doc.save();
  doc.fillColor('#6366F1'); // Indigo for dots

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const dotX = x + c * spacing;
      const dotY = y + r * spacing;
      doc.circle(dotX, dotY, dotRadius).fill();
    }
  }

  // Restore state
  doc.restore();

  return {
    width: (cols - 1) * spacing,
    height: (rows - 1) * spacing
  };
}

/**
 * Renders a number line with tick marks
 */
export function renderNumberLine(
  options: ToolVisualOptions & { start: number; end: number; highlights?: number[] }
): { width: number; height: number } {
  const { doc, x, y, start, end, highlights = [], maxWidth } = options;
  const lineLength = Math.min(maxWidth - 20, 200);
  const range = end - start;
  const tickHeight = 8;
  const numberSpacing = lineLength / range;

  // Save current state
  doc.save();

  // Draw main line
  doc.strokeColor('#374151')
    .lineWidth(2)
    .moveTo(x, y)
    .lineTo(x + lineLength, y)
    .stroke();

  // Draw tick marks and numbers
  doc.lineWidth(1);
  for (let i = 0; i <= range; i++) {
    const tickX = x + i * numberSpacing;
    
    // Draw tick
    doc.moveTo(tickX, y - tickHeight / 2)
      .lineTo(tickX, y + tickHeight / 2)
      .stroke();
    
    // Draw number
    const number = start + i;
    doc.fontSize(8)
      .fillColor('#374151')
      .text(number.toString(), tickX - 5, y + tickHeight / 2 + 2);
  }

  // Highlight specific numbers
  if (highlights.length > 0) {
    doc.fillColor('#EF4444'); // Red for highlights
    highlights.forEach(num => {
      if (num >= start && num <= end) {
        const highlightX = x + (num - start) * numberSpacing;
        doc.circle(highlightX, y, 4).fill();
      }
    });
  }

  // Restore state
  doc.restore();

  return {
    width: lineLength,
    height: tickHeight + 15 // Include space for numbers
  };
}

/**
 * Renders fraction bars with shaded portions
 */
export function renderFractionBar(
  options: ToolVisualOptions & { numerator: number; denominator: number }
): { width: number; height: number } {
  const { doc, x, y, numerator, denominator } = options;
  const barWidth = 120;
  const barHeight = 25;
  const sectionWidth = barWidth / denominator;

  // Save current state
  doc.save();

  // Draw outer rectangle
  doc.strokeColor('#374151')
    .lineWidth(1.5)
    .rect(x, y, barWidth, barHeight)
    .stroke();

  // Draw section dividers and fill
  for (let i = 0; i < denominator; i++) {
    const sectionX = x + i * sectionWidth;
    
    // Fill shaded sections
    if (i < numerator) {
      doc.fillColor('#3B82F6')
        .rect(sectionX, y, sectionWidth, barHeight)
        .fill();
    }
    
    // Draw divider (except for the last one)
    if (i > 0) {
      doc.strokeColor('#374151')
        .lineWidth(1)
        .moveTo(sectionX, y)
        .lineTo(sectionX, y + barHeight)
        .stroke();
    }
  }

  // Add fraction label
  doc.fontSize(10)
    .fillColor('#374151')
    .text(`${numerator}/${denominator}`, x + barWidth + 5, y + barHeight / 2 - 5);

  // Restore state
  doc.restore();

  return {
    width: barWidth + 30, // Include space for label
    height: barHeight
  };
}

/**
 * Renders a geoboard with pegs and rubber band shapes
 */
export function renderGeoboard(
  options: ToolVisualOptions & { 
    size?: number; 
    shape?: 'square' | 'triangle' | 'rectangle';
    vertices?: Array<{x: number, y: number}>;
  }
): { width: number; height: number } {
  const { doc, x, y, size = 5, shape = 'square', vertices = [] } = options;
  const pegSpacing = 20;
  const pegRadius = 2;
  const boardSize = (size - 1) * pegSpacing;

  // Save current state
  doc.save();

  // Draw background grid
  doc.fillColor('#FEF3C7'); // Light yellow background
  doc.rect(x - 10, y - 10, boardSize + 20, boardSize + 20).fill();

  // Draw pegs
  doc.fillColor('#374151'); // Dark gray pegs
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const pegX = x + col * pegSpacing;
      const pegY = y + row * pegSpacing;
      doc.circle(pegX, pegY, pegRadius).fill();
    }
  }

  // Draw shape if specified
  if (shape === 'square' && vertices.length === 0) {
    // Default 3x4 rectangle
    const coords = [
      { x: x + pegSpacing, y: y + pegSpacing },
      { x: x + 3 * pegSpacing, y: y + pegSpacing },
      { x: x + 3 * pegSpacing, y: y + 2 * pegSpacing },
      { x: x + pegSpacing, y: y + 2 * pegSpacing }
    ];
    
    doc.strokeColor('#EF4444') // Red rubber band
      .lineWidth(2)
      .moveTo(coords[0].x, coords[0].y);
    
    for (let i = 1; i < coords.length; i++) {
      doc.lineTo(coords[i].x, coords[i].y);
    }
    doc.closePath().stroke();
  } else if (vertices.length > 0) {
    // Custom shape from vertices
    doc.strokeColor('#EF4444')
      .lineWidth(2)
      .moveTo(x + vertices[0].x * pegSpacing, y + vertices[0].y * pegSpacing);
    
    for (let i = 1; i < vertices.length; i++) {
      doc.lineTo(x + vertices[i].x * pegSpacing, y + vertices[i].y * pegSpacing);
    }
    doc.closePath().stroke();
  }

  // Restore state
  doc.restore();

  return {
    width: boardSize + 20,
    height: boardSize + 20
  };
}

/**
 * Renders money using coin and bill representations
 */
export function renderMoney(
  options: ToolVisualOptions & { 
    dollars?: number; 
    quarters?: number; 
    dimes?: number; 
    nickels?: number; 
    pennies?: number;
  }
): { width: number; height: number } {
  const { doc, x, y, dollars = 0, quarters = 0, dimes = 0, nickels = 0, pennies = 0 } = options;
  let currentX = x;
  let currentY = y;
  const coinRadius = 8;
  const billWidth = 40;
  const billHeight = 20;
  const spacing = 5;

  // Save current state
  doc.save();

  // Draw dollars (bills)
  if (dollars > 0) {
    doc.fillColor('#22C55E'); // Green for dollars
    for (let i = 0; i < dollars; i++) {
      doc.rect(currentX, currentY, billWidth, billHeight)
        .fill();
      doc.strokeColor('#166534')
        .lineWidth(0.5)
        .rect(currentX, currentY, billWidth, billHeight)
        .stroke();
      doc.fillColor('#FFFFFF')
        .fontSize(10)
        .text('$1', currentX + 15, currentY + 5);
      currentX += billWidth + spacing;
    }
    currentY += billHeight + spacing;
    currentX = x;
  }

  // Helper function to draw coin
  const drawCoin = (x: number, y: number, value: string, color: string) => {
    doc.fillColor(color)
      .circle(x, y, coinRadius)
      .fill();
    doc.strokeColor('#374151')
      .lineWidth(0.5)
      .circle(x, y, coinRadius)
      .stroke();
    doc.fillColor('#FFFFFF')
      .fontSize(7)
      .text(value, x - 6, y - 3);
  };

  // Draw quarters
  if (quarters > 0) {
    doc.fillColor('#9CA3AF'); // Silver for quarters
    for (let i = 0; i < quarters; i++) {
      drawCoin(currentX + coinRadius, currentY + coinRadius, '25¢', '#9CA3AF');
      currentX += coinRadius * 2 + spacing;
    }
  }

  // Draw dimes
  if (dimes > 0) {
    for (let i = 0; i < dimes; i++) {
      drawCoin(currentX + coinRadius, currentY + coinRadius, '10¢', '#9CA3AF');
      currentX += coinRadius * 2 + spacing;
    }
  }

  // Draw nickels
  if (nickels > 0) {
    for (let i = 0; i < nickels; i++) {
      drawCoin(currentX + coinRadius, currentY + coinRadius, '5¢', '#9CA3AF');
      currentX += coinRadius * 2 + spacing;
    }
  }

  // Draw pennies
  if (pennies > 0) {
    for (let i = 0; i < pennies; i++) {
      drawCoin(currentX + coinRadius, currentY + coinRadius, '1¢', '#F97316');
      currentX += coinRadius * 2 + spacing;
    }
  }

  // Restore state
  doc.restore();

  const totalHeight = dollars > 0 ? billHeight + spacing + coinRadius * 2 : coinRadius * 2;
  
  return {
    width: currentX - x,
    height: totalHeight
  };
}