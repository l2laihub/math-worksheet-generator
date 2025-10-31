/**
 * Type definitions for svg-to-pdfkit
 */

declare module 'svg-to-pdfkit' {
  import type PDFDocument from 'pdfkit';

  interface SVGtoPDFOptions {
    width?: number;
    height?: number;
    preserveAspectRatio?: string;
    useCSS?: boolean;
    fontCallback?: (family: string, bold: boolean, italic: boolean) => string;
    imageCallback?: (link: string) => string;
    warningCallback?: (warning: string) => void;
    assumePt?: boolean;
    precision?: number;
  }

  function SVGtoPDF(
    doc: typeof PDFDocument,
    svg: string,
    x?: number,
    y?: number,
    options?: SVGtoPDFOptions
  ): void;

  export = SVGtoPDF;
}
