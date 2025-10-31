/**
 * Extended PDFKit types for methods not in @types/pdfkit
 */

import 'pdfkit';

declare module 'pdfkit' {
  interface PDFDocument {
    /**
     * Draw an arc
     * @param x - Center X coordinate
     * @param y - Center Y coordinate
     * @param radius - Arc radius
     * @param startAngle - Start angle in radians
     * @param endAngle - End angle in radians
     * @param anticlockwise - Draw counterclockwise (default: false)
     */
    arc(
      x: number,
      y: number,
      radius: number,
      startAngle: number,
      endAngle: number,
      anticlockwise?: boolean
    ): this;
  }
}
