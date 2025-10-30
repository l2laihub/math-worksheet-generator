/**
 * SVG Renderer for PDFKit
 * Renders OpenMoji SVG assets in PDF worksheets
 *
 * Uses svg-to-pdfkit to embed SVG graphics in PDFs
 */

import SVGtoPDF from 'svg-to-pdfkit';
import fs from 'fs';
import path from 'path';
import type PDFDocument from 'pdfkit';
import manifest from '@/assets/svg-manifest.json';

/**
 * SVG Asset from manifest
 */
export interface SVGAsset {
  id: string;
  unicode: string;
  path: string;
  name: string;
}

/**
 * Theme type (food, animals, nature, space, other)
 */
export type Theme = 'food' | 'animals' | 'nature' | 'space' | 'other';

/**
 * Get all assets for a theme
 */
export function getAssetsForTheme(theme: Theme): SVGAsset[] {
  return manifest[theme] || [];
}

/**
 * Get a specific asset by ID from any theme
 */
export function getAssetById(assetId: string): SVGAsset | null {
  for (const theme of Object.keys(manifest) as Theme[]) {
    const asset = manifest[theme].find((a) => a.id === assetId);
    if (asset) return asset;
  }
  return null;
}

/**
 * Get random assets from a theme
 */
export function getRandomAssets(theme: Theme, count: number): SVGAsset[] {
  const assets = getAssetsForTheme(theme);
  const shuffled = [...assets].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Render SVG asset in PDF at specified position
 *
 * @param doc - PDFKit document instance
 * @param assetId - Asset ID (e.g., 'apple', 'dog', 'star')
 * @param x - X position in points
 * @param y - Y position in points
 * @param size - Size in points (width and height)
 */
export function renderSVGAsset(
  doc: typeof PDFDocument,
  assetId: string,
  x: number,
  y: number,
  size: number = 30
): void {
  // Find asset in manifest
  const asset = getAssetById(assetId);

  if (!asset) {
    console.warn(`Asset '${assetId}' not found in manifest, using fallback`);
    renderFallbackCircle(doc, x, y, size);
    return;
  }

  try {
    // Read SVG file from public directory
    const svgPath = path.join(process.cwd(), 'public', asset.path);

    if (!fs.existsSync(svgPath)) {
      console.warn(`SVG file not found: ${svgPath}, using fallback`);
      renderFallbackCircle(doc, x, y, size);
      return;
    }

    const svgData = fs.readFileSync(svgPath, 'utf-8');

    // Render SVG to PDF
    SVGtoPDF(doc, svgData, x, y, {
      width: size,
      height: size,
      preserveAspectRatio: 'xMidYMid meet',
    });
  } catch (error) {
    console.error(`Error rendering SVG '${assetId}':`, error);
    renderFallbackCircle(doc, x, y, size);
  }
}

/**
 * Render multiple SVG assets in a row
 *
 * @param doc - PDFKit document instance
 * @param assetIds - Array of asset IDs to render
 * @param x - Starting X position
 * @param y - Y position
 * @param size - Size of each asset
 * @param spacing - Spacing between assets (default: 10)
 */
export function renderSVGRow(
  doc: typeof PDFDocument,
  assetIds: string[],
  x: number,
  y: number,
  size: number = 30,
  spacing: number = 10
): void {
  let xOffset = x;

  for (const assetId of assetIds) {
    renderSVGAsset(doc, assetId, xOffset, y, size);
    xOffset += size + spacing;
  }
}

/**
 * Render SVG assets in a grid
 *
 * @param doc - PDFKit document instance
 * @param assetId - Asset ID to repeat in grid
 * @param x - Starting X position
 * @param y - Starting Y position
 * @param rows - Number of rows
 * @param cols - Number of columns
 * @param size - Size of each asset
 * @param spacing - Spacing between assets (default: 5)
 */
export function renderSVGGrid(
  doc: typeof PDFDocument,
  assetId: string,
  x: number,
  y: number,
  rows: number,
  cols: number,
  size: number = 25,
  spacing: number = 5
): void {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const xPos = x + col * (size + spacing);
      const yPos = y + row * (size + spacing);
      renderSVGAsset(doc, assetId, xPos, yPos, size);
    }
  }
}

/**
 * Fallback: Render a simple colored circle when SVG is unavailable
 */
function renderFallbackCircle(
  doc: typeof PDFDocument,
  x: number,
  y: number,
  size: number
): void {
  const radius = size / 2;
  const centerX = x + radius;
  const centerY = y + radius;

  // Save current fill color
  const currentColor = (doc as any)._fillColor || '#000000';

  // Draw colored circle
  doc
    .fillColor('#95E1D3')
    .circle(centerX, centerY, radius)
    .fill();

  // Restore original fill color
  doc.fillColor(currentColor);
}

/**
 * Get asset path for direct file access
 */
export function getAssetPath(assetId: string): string | null {
  const asset = getAssetById(assetId);
  if (!asset) return null;

  return path.join(process.cwd(), 'public', asset.path);
}

/**
 * Verify all SVG assets exist on disk
 */
export function verifyAssets(): { exists: string[]; missing: string[] } {
  const exists: string[] = [];
  const missing: string[] = [];

  for (const theme of Object.keys(manifest) as Theme[]) {
    for (const asset of manifest[theme]) {
      const assetPath = path.join(process.cwd(), 'public', asset.path);

      if (fs.existsSync(assetPath)) {
        exists.push(asset.id);
      } else {
        missing.push(asset.id);
      }
    }
  }

  return { exists, missing };
}
