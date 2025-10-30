/**
 * PDF Generation Proof of Concept
 *
 * Purpose: Validate that PDFKit can generate worksheet-style PDFs
 * Tests: Layout, formatting, file size, generation speed
 */

import PDFDocument from 'pdfkit';
import fs from 'fs';

// Sample worksheet data
const worksheetData = {
  gradeLevel: 3,
  topic: 'Multiplication',
  difficulty: 'Medium',
  theme: 'Space',
  date: new Date().toLocaleDateString(),
  problems: [
    { id: 1, question: '3 × 4 = ?', answer: '12', visualAid: 'Three groups of 4 stars' },
    { id: 2, question: '5 × 6 = ?', answer: '30', visualAid: 'Five planets with 6 moons each' },
    { id: 3, question: '7 × 8 = ?', answer: '56', visualAid: 'Seven rockets with 8 windows' },
    { id: 4, question: '9 × 4 = ?', answer: '36', visualAid: 'Nine astronauts with 4 flags' },
    { id: 5, question: '6 × 7 = ?', answer: '42', visualAid: 'Six spaceships with 7 aliens' },
    { id: 6, question: '8 × 5 = ?', answer: '40', visualAid: 'Eight satellites with 5 antennas' },
    { id: 7, question: '4 × 9 = ?', answer: '36', visualAid: 'Four space stations with 9 modules' },
    { id: 8, question: '7 × 6 = ?', answer: '42', visualAid: 'Seven meteor showers with 6 meteors' },
    { id: 9, question: '5 × 8 = ?', answer: '40', visualAid: 'Five galaxies with 8 stars' },
    { id: 10, question: '9 × 7 = ?', answer: '63', visualAid: 'Nine comets with 7 tails' },
  ]
};

/**
 * Generate worksheet PDF
 */
function generateWorksheetPDF(data, filename) {
  console.log('🚀 Generating Worksheet PDF...');
  const startTime = Date.now();

  // Create a document
  const doc = new PDFDocument({
    size: 'LETTER', // 8.5 x 11 inches
    margins: {
      top: 72,    // 1 inch
      bottom: 72,
      left: 72,
      right: 72
    }
  });

  // Pipe to a file
  doc.pipe(fs.createWriteStream(filename));

  // --- HEADER ---
  doc.fontSize(24)
     .font('Helvetica-Bold')
     .text('Math Worksheet', { align: 'center' });

  doc.moveDown(0.5);

  doc.fontSize(12)
     .font('Helvetica')
     .text(`Grade ${data.gradeLevel} - ${data.topic}`, { align: 'center' })
     .text(`Difficulty: ${data.difficulty} | Theme: ${data.theme}`, { align: 'center' })
     .text(`Date: ${data.date}`, { align: 'center' });

  doc.moveDown(1);

  // Separator line
  doc.moveTo(72, doc.y)
     .lineTo(540, doc.y)
     .stroke();

  doc.moveDown(1);

  // --- INSTRUCTIONS ---
  doc.fontSize(11)
     .font('Helvetica-Oblique')
     .text('Solve each problem. Show your work in the space provided.', { align: 'left' });

  doc.moveDown(1.5);

  // --- PROBLEMS ---
  doc.font('Helvetica');

  data.problems.forEach((problem, index) => {
    // Check if we need a new page
    if (doc.y > 650) {
      doc.addPage();
    }

    // Problem number and question
    doc.fontSize(14)
       .font('Helvetica-Bold')
       .text(`${problem.id}.`, 72, doc.y, { continued: true, width: 30 })
       .font('Helvetica')
       .text(`  ${problem.question}`, { width: 440 });

    doc.moveDown(0.3);

    // Visual aid description (in smaller, italic text)
    doc.fontSize(10)
       .font('Helvetica-Oblique')
       .fillColor('#666')
       .text(`    [Visual: ${problem.visualAid}]`, { indent: 20 });

    doc.fillColor('#000'); // Reset color

    // Space for work
    doc.moveDown(0.8);

    // Answer line
    const lineY = doc.y;
    doc.fontSize(11)
       .font('Helvetica')
       .text('Answer: ___________', 100, lineY);

    doc.moveDown(1.8);
  });

  // --- FOOTER ---
  // Note: We'll add page numbers on the first page only for now
  // In production, we can add them to all pages if needed
  doc.fontSize(9)
     .font('Helvetica')
     .text(
       'Math Worksheet Generator',
       72,
       720,
       { align: 'center', width: 468 }
     );

  // Finalize PDF
  doc.end();

  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;

  console.log(`✅ Worksheet PDF generated in ${duration.toFixed(2)}s`);
  console.log(`📄 Saved to: ${filename}`);

  return { filename, duration };
}

/**
 * Generate answer key PDF
 */
function generateAnswerKeyPDF(data, filename) {
  console.log('\n📋 Generating Answer Key PDF...');
  const startTime = Date.now();

  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 72, bottom: 72, left: 72, right: 72 }
  });

  doc.pipe(fs.createWriteStream(filename));

  // --- HEADER ---
  doc.fontSize(24)
     .font('Helvetica-Bold')
     .text('Answer Key', { align: 'center' });

  doc.moveDown(0.5);

  doc.fontSize(12)
     .font('Helvetica')
     .text(`Grade ${data.gradeLevel} - ${data.topic}`, { align: 'center' })
     .text(`Difficulty: ${data.difficulty}`, { align: 'center' });

  doc.moveDown(1);

  doc.moveTo(72, doc.y)
     .lineTo(540, doc.y)
     .stroke();

  doc.moveDown(1);

  // --- ANSWERS ---
  const columns = 2;
  const problemsPerColumn = Math.ceil(data.problems.length / columns);
  const columnWidth = 234;
  const leftColumnX = 72;
  const rightColumnX = 306;

  data.problems.forEach((problem, index) => {
    const column = Math.floor(index / problemsPerColumn);
    const row = index % problemsPerColumn;

    const xPos = column === 0 ? leftColumnX : rightColumnX;
    const yPos = 200 + (row * 35);

    doc.fontSize(12)
       .font('Helvetica-Bold')
       .text(`${problem.id}.`, xPos, yPos, { continued: true, width: 30 })
       .font('Helvetica')
       .text(`${problem.question}`, { continued: true, width: 150 })
       .font('Helvetica-Bold')
       .fillColor('#006400')
       .text(`  ${problem.answer}`, { width: 50 });

    doc.fillColor('#000');
  });

  // --- FOOTER ---
  doc.fontSize(9)
     .font('Helvetica-Oblique')
     .text(
       'For teacher use only',
       72,
       720,
       { align: 'center', width: 468 }
     );

  doc.end();

  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;

  console.log(`✅ Answer Key PDF generated in ${duration.toFixed(2)}s`);
  console.log(`📄 Saved to: ${filename}`);

  return { filename, duration };
}

/**
 * Main test execution
 */
async function main() {
  console.log('=' .repeat(80));
  console.log('PDF Generation Proof of Concept');
  console.log('=' .repeat(80));

  // Create output directory
  const outputDir = 'tests/pdf-poc/output';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate worksheet
  const worksheetFile = `${outputDir}/sample-worksheet.pdf`;
  const worksheetResult = generateWorksheetPDF(worksheetData, worksheetFile);

  // Wait for worksheet to finish
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate answer key
  const answerKeyFile = `${outputDir}/sample-answer-key.pdf`;
  const answerKeyResult = generateAnswerKeyPDF(worksheetData, answerKeyFile);

  // Wait for answer key to finish
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Check file sizes
  const worksheetSize = fs.statSync(worksheetFile).size;
  const answerKeySize = fs.statSync(answerKeyFile).size;

  console.log('\n' + '=' .repeat(80));
  console.log('📊 Results Summary');
  console.log('=' .repeat(80));

  console.log('\n📝 Worksheet:');
  console.log(`   File: ${worksheetFile}`);
  console.log(`   Size: ${(worksheetSize / 1024).toFixed(2)} KB`);
  console.log(`   Generation Time: ${worksheetResult.duration.toFixed(2)}s`);

  console.log('\n📋 Answer Key:');
  console.log(`   File: ${answerKeyFile}`);
  console.log(`   Size: ${(answerKeySize / 1024).toFixed(2)} KB`);
  console.log(`   Generation Time: ${answerKeyResult.duration.toFixed(2)}s`);

  console.log('\n✅ Success Criteria:');
  console.log(`   Generation time <5s: ${worksheetResult.duration < 5 ? '✅' : '❌'} (${worksheetResult.duration.toFixed(2)}s)`);
  console.log(`   File size <2MB: ${worksheetSize < 2_000_000 ? '✅' : '❌'} (${(worksheetSize / 1024).toFixed(2)} KB)`);
  console.log(`   Both PDFs generated: ✅`);

  console.log('\n🎯 Next Steps:');
  console.log('   1. Open the PDFs in different browsers (Chrome, Firefox, Safari, Edge)');
  console.log('   2. Verify formatting and layout');
  console.log('   3. Test printing');
  console.log('   4. If all looks good, proceed with full implementation');

  console.log('\n' + '=' .repeat(80));
}

// Run the test
main().catch(console.error);
