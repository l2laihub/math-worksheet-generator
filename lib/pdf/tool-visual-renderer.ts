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

/**
 * Renders partial products using Box Method format (proper multi-digit breakdown)
 */
export function renderPartialProducts(
  options: ToolVisualOptions & { factor1: number; factor2: number }
): { width: number; height: number } {
  const { doc, x, y, factor1, factor2 } = options;
  const boxWidth = 50;
  const boxHeight = 25;
  const fontSize = 11;
  const labelFontSize = 9;
  
  // Save current state
  doc.save();
  
  let currentY = y;
  
  // Problem header (e.g., "23 × 15")
  doc.fontSize(fontSize)
    .fillColor('#000000')
    .text(`${factor1} × ${factor2}`, x, currentY);
  currentY += 30;
  
  // Properly decompose BOTH factors
  function decompose(num: number): number[] {
    const str = num.toString();
    const parts: number[] = [];
    
    if (str.length === 1) {
      parts.push(num);
    } else if (str.length === 2) {
      const tens = Math.floor(num / 10) * 10;
      const ones = num % 10;
      if (tens > 0) parts.push(tens);
      if (ones > 0) parts.push(ones);
    } else if (str.length === 3) {
      const hundreds = Math.floor(num / 100) * 100;
      const tens = Math.floor((num % 100) / 10) * 10;
      const ones = num % 10;
      if (hundreds > 0) parts.push(hundreds);
      if (tens > 0) parts.push(tens);
      if (ones > 0) parts.push(ones);
    }
    
    return parts;
  }
  
  const f1Parts = decompose(factor1);
  const f2Parts = decompose(factor2);
  
  doc.strokeColor('#000000').lineWidth(1);
  
  // Handle different cases based on the complexity
  if (f1Parts.length === 1 && f2Parts.length === 1) {
    // Simple single-digit × single-digit
    doc.rect(x, currentY, boxWidth, boxHeight).stroke();
    doc.fontSize(labelFontSize)
      .text('=', x + boxWidth + 5, currentY + boxHeight/2 - 3)
      .text(`${factor1} × ${factor2}`, x + boxWidth + 20, currentY + boxHeight/2 - 3);
    currentY += boxHeight + 10;
    
  } else if (f2Parts.length === 1) {
    // Multi-digit × single-digit (e.g., 23 × 4)
    f1Parts.forEach((part, index) => {
      if (index > 0) {
        doc.fontSize(fontSize).text('+', x - 15, currentY + boxHeight/2 - 5);
      }
      
      doc.rect(x, currentY, boxWidth, boxHeight).stroke();
      doc.fontSize(labelFontSize)
        .text('=', x + boxWidth + 5, currentY + boxHeight/2 - 3)
        .text(`${part} × ${factor2}`, x + boxWidth + 20, currentY + boxHeight/2 - 3);
      
      currentY += boxHeight + 5;
    });
    
  } else {
    // Multi-digit × multi-digit (e.g., 23 × 15) - Create proper grid
    let boxY = currentY;
    
    f2Parts.forEach((f2Part, f2Index) => {
      f1Parts.forEach((f1Part, f1Index) => {
        if (f1Index > 0) {
          doc.fontSize(fontSize).text('+', x - 15, boxY + boxHeight/2 - 5);
        }
        
        doc.rect(x, boxY, boxWidth, boxHeight).stroke();
        doc.fontSize(labelFontSize)
          .text('=', x + boxWidth + 5, boxY + boxHeight/2 - 3)
          .text(`${f1Part} × ${f2Part}`, x + boxWidth + 20, boxY + boxHeight/2 - 3);
        
        boxY += boxHeight + 5;
      });
      
      // Add spacing between factor2 groups
      if (f2Index < f2Parts.length - 1) {
        boxY += 5;
      }
    });
    
    currentY = boxY;
  }
  
  // Draw line for sum
  doc.strokeColor('#000000').lineWidth(1.5);
  doc.moveTo(x - 20, currentY)
    .lineTo(x + boxWidth, currentY)
    .stroke();
  
  currentY += 10;
  
  // Final answer box
  doc.rect(x, currentY, boxWidth, boxHeight).stroke();
  
  // Option to show completed example or leave blank for students
  const showAnswers = false; // Set to true for answer key
  
  if (showAnswers) {
    doc.fontSize(labelFontSize);
    let answerY = y + 30;
    
    // Fill in partial products
    f2Parts.forEach(f2Part => {
      f1Parts.forEach(f1Part => {
        doc.text((f1Part * f2Part).toString(), x + 5, answerY + boxHeight/2 - 3);
        answerY += boxHeight + 5;
      });
      answerY += 5; // Extra spacing between groups
    });
    
    // Fill in final answer
    doc.text((factor1 * factor2).toString(), x + 5, currentY + boxHeight/2 - 3);
  }
  
  currentY += boxHeight + 5;
  
  // Restore state
  doc.restore();
  
  return {
    width: boxWidth + 150, // Include space for labels
    height: currentY - y
  };
}

/**
 * Renders lattice multiplication grid
 */
export function renderLatticeMultiplication(
  options: ToolVisualOptions & { factor1: number; factor2: number }
): { width: number; height: number } {
  const { doc, x, y, factor1, factor2 } = options;
  const cellSize = 40;
  const f1Str = factor1.toString();
  const f2Str = factor2.toString();
  const gridWidth = f1Str.length * cellSize;
  const gridHeight = f2Str.length * cellSize;
  
  // Save current state
  doc.save();
  
  // Draw the grid
  doc.strokeColor('#374151').lineWidth(1);
  
  // Draw outer rectangle
  doc.rect(x, y, gridWidth, gridHeight).stroke();
  
  // Draw vertical lines
  for (let i = 1; i < f1Str.length; i++) {
    doc.moveTo(x + i * cellSize, y)
      .lineTo(x + i * cellSize, y + gridHeight)
      .stroke();
  }
  
  // Draw horizontal lines
  for (let i = 1; i < f2Str.length; i++) {
    doc.moveTo(x, y + i * cellSize)
      .lineTo(x + gridWidth, y + i * cellSize)
      .stroke();
  }
  
  // Draw diagonal lines in each cell
  for (let i = 0; i < f1Str.length; i++) {
    for (let j = 0; j < f2Str.length; j++) {
      const cellX = x + i * cellSize;
      const cellY = y + j * cellSize;
      doc.moveTo(cellX, cellY + cellSize)
        .lineTo(cellX + cellSize, cellY)
        .stroke();
    }
  }
  
  // Add digits along top and right
  doc.fontSize(12).fillColor('#374151');
  
  // Top digits
  for (let i = 0; i < f1Str.length; i++) {
    doc.text(f1Str[i], x + i * cellSize + cellSize/2 - 5, y - 15);
  }
  
  // Right digits
  for (let i = 0; i < f2Str.length; i++) {
    doc.text(f2Str[i], x + gridWidth + 5, y + i * cellSize + cellSize/2 - 5);
  }
  
  // Fill in products (simplified - just showing structure)
  doc.fontSize(10).fillColor('#6B7280');
  for (let i = 0; i < f1Str.length; i++) {
    for (let j = 0; j < f2Str.length; j++) {
      const product = parseInt(f1Str[i]) * parseInt(f2Str[j]);
      const tens = Math.floor(product / 10);
      const ones = product % 10;
      const cellX = x + i * cellSize;
      const cellY = y + j * cellSize;
      
      if (tens > 0) {
        doc.text(tens.toString(), cellX + 5, cellY + 5);
      }
      doc.text(ones.toString(), cellX + cellSize - 15, cellY + cellSize - 15);
    }
  }
  
  // Restore state
  doc.restore();
  
  return {
    width: gridWidth + 20,
    height: gridHeight + 20
  };
}

/**
 * Renders decomposition method visualization
 */
export function renderDecompositionMethod(
  options: ToolVisualOptions & { number: number; operation: 'add' | 'subtract' | 'multiply' }
): { width: number; height: number } {
  const { doc, x, y, number, operation } = options;
  const fontSize = 12;
  const lineSpacing = 20;
  let currentY = y;
  
  // Save current state
  doc.save();
  
  // Decompose the number into place values
  const numStr = number.toString();
  const placeValues: number[] = [];
  
  for (let i = 0; i < numStr.length; i++) {
    const digit = parseInt(numStr[i]);
    const placeValue = Math.pow(10, numStr.length - i - 1);
    if (digit > 0) {
      placeValues.push(digit * placeValue);
    }
  }
  
  // Show original number
  doc.fontSize(fontSize)
    .fillColor('#374151')
    .text(`${number} =`, x, currentY);
  
  // Show decomposition
  const decompositionText = placeValues.join(' + ');
  doc.text(decompositionText, x + 50, currentY);
  currentY += lineSpacing * 1.5;
  
  // Show visual blocks for each place value
  doc.strokeColor('#374151').lineWidth(1);
  placeValues.forEach((value, index) => {
    const blockWidth = Math.min(value.toString().length * 10 + 20, 100);
    doc.fillColor(index === 0 ? '#3B82F6' : index === 1 ? '#10B981' : '#F59E0B')
      .rect(x, currentY, blockWidth, 15)
      .fill();
    doc.fillColor('#FFFFFF')
      .fontSize(10)
      .text(value.toString(), x + 5, currentY + 2);
    currentY += 20;
  });
  
  // Restore state
  doc.restore();
  
  return {
    width: 150,
    height: currentY - y
  };
}

/**
 * Renders counters (circles) for basic operations
 */
export function renderCounters(
  options: ToolVisualOptions & { count: number; groupSize?: number }
): { width: number; height: number } {
  const { doc, x, y, count, groupSize = 10 } = options;
  const counterRadius = 8;
  const spacing = 5;
  const countersPerRow = Math.min(groupSize, 10);
  let currentX = x;
  let currentY = y;
  let maxX = x;
  
  // Save current state
  doc.save();
  
  for (let i = 0; i < count; i++) {
    // Draw counter
    doc.fillColor('#EF4444')
      .circle(currentX + counterRadius, currentY + counterRadius, counterRadius)
      .fill();
    doc.strokeColor('#374151')
      .lineWidth(0.5)
      .circle(currentX + counterRadius, currentY + counterRadius, counterRadius)
      .stroke();
    
    // Move to next position
    if ((i + 1) % countersPerRow === 0 && i < count - 1) {
      currentX = x;
      currentY += counterRadius * 2 + spacing;
      
      // Add group separator
      if ((i + 1) % groupSize === 0) {
        currentY += spacing * 2;
      }
    } else {
      currentX += counterRadius * 2 + spacing;
      maxX = Math.max(maxX, currentX);
    }
  }
  
  // Restore state
  doc.restore();
  
  return {
    width: maxX - x + counterRadius * 2,
    height: currentY - y + counterRadius * 2
  };
}

/**
 * Renders pattern blocks
 */
export function renderPatternBlocks(
  options: ToolVisualOptions & { 
    shapes: Array<'hexagon' | 'trapezoid' | 'rhombus' | 'triangle' | 'square'>;
  }
): { width: number; height: number } {
  const { doc, x, y, shapes } = options;
  const blockSize = 30;
  const spacing = 10;
  let currentX = x;
  let maxHeight = 0;
  
  // Save current state
  doc.save();
  
  shapes.forEach(shape => {
    switch (shape) {
      case 'hexagon':
        doc.fillColor('#FBBF24'); // Yellow
        drawHexagon(doc, currentX + blockSize/2, y + blockSize/2, blockSize/2);
        break;
      case 'trapezoid':
        doc.fillColor('#EF4444'); // Red
        drawTrapezoid(doc, currentX, y, blockSize);
        break;
      case 'rhombus':
        doc.fillColor('#3B82F6'); // Blue
        drawRhombus(doc, currentX, y, blockSize);
        break;
      case 'triangle':
        doc.fillColor('#10B981'); // Green
        drawTriangle(doc, currentX, y, blockSize);
        break;
      case 'square':
        doc.fillColor('#F97316'); // Orange
        doc.rect(currentX, y, blockSize, blockSize).fill();
        break;
    }
    
    // Add outline
    doc.strokeColor('#374151').lineWidth(1).stroke();
    
    currentX += blockSize + spacing;
    maxHeight = Math.max(maxHeight, blockSize);
  });
  
  // Restore state
  doc.restore();
  
  return {
    width: currentX - x - spacing,
    height: maxHeight
  };
  
  // Helper functions for drawing shapes
  function drawHexagon(doc: any, cx: number, cy: number, radius: number) {
    const angles = [0, 60, 120, 180, 240, 300];
    doc.moveTo(
      cx + radius * Math.cos(angles[0] * Math.PI / 180),
      cy + radius * Math.sin(angles[0] * Math.PI / 180)
    );
    for (let i = 1; i < angles.length; i++) {
      doc.lineTo(
        cx + radius * Math.cos(angles[i] * Math.PI / 180),
        cy + radius * Math.sin(angles[i] * Math.PI / 180)
      );
    }
    doc.closePath();
  }
  
  function drawTrapezoid(doc: any, x: number, y: number, size: number) {
    doc.moveTo(x + size * 0.2, y);
    doc.lineTo(x + size * 0.8, y);
    doc.lineTo(x + size, y + size);
    doc.lineTo(x, y + size);
    doc.closePath();
  }
  
  function drawRhombus(doc: any, x: number, y: number, size: number) {
    doc.moveTo(x + size/2, y);
    doc.lineTo(x + size, y + size/2);
    doc.lineTo(x + size/2, y + size);
    doc.lineTo(x, y + size/2);
    doc.closePath();
  }
  
  function drawTriangle(doc: any, x: number, y: number, size: number) {
    doc.moveTo(x + size/2, y);
    doc.lineTo(x + size, y + size);
    doc.lineTo(x, y + size);
    doc.closePath();
  }
}