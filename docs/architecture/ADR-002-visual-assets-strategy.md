# ADR-002: Visual Assets Strategy

**Status**: Decided
**Date**: 2025-10-29
**Decision Makers**: Development Team
**Relates to**: ADR-001 (PDF Generation)

---

## Context

The Math Worksheet Generator needs visual aids to make worksheets engaging for students. Visual aids should:
- Be thematically consistent (Animals, Space, Sports, Food, Nature)
- Be appropriate for grade levels 1-6
- Load quickly and render in PDFs
- Support different problem types

**Requirements**:
- Must work with PDFKit PDF generation
- Must be cost-effective
- Must be reliable (no broken images)
- Should be customizable to themes
- Quality should be consistent

---

## Decision Drivers

1. **Cost**: Minimize per-generation costs
2. **Speed**: Fast loading/rendering
3. **Quality**: Professional and engaging
4. **Reliability**: No broken/missing images
5. **Implementation Time**: Fast to MVP
6. **Variety**: Sufficient options for engagement

---

## Options Considered

### Option A: OpenMoji SVG Library ✅ RECOMMENDED

**Description**: Use OpenMoji open-source emoji/icon library (same as Python implementation's optional mode).

**Architecture**:
```
public/assets/svg/
  ├── food/
  │   ├── apple.svg (1F34E)
  │   ├── banana.svg (1F34C)
  │   └── ...
  ├── animals/
  │   ├── dog.svg (1F436)
  │   ├── cat.svg (1F431)
  │   └── ...
  └── ...

assets/svg-manifest.json → Maps themes to OpenMoji Unicode codes
```

**Asset Source**:
- [OpenMoji](https://openmoji.org/) - 4000+ open-source emojis/icons (CC BY-SA 4.0)
- Available as npm package: `openmoji`
- Same library used in Python Claude skill implementation

**Pros**:
- ✅ **Zero cost per generation**
- ✅ **Instant rendering** (no API calls)
- ✅ **100% reliable** (no network dependencies)
- ✅ **Full control** over visual style
- ✅ **Predictable** quality
- ✅ **Works offline** in development
- ✅ **Small file sizes** (SVGs are tiny)
- ✅ **Scalable** (vector graphics)
- ✅ **Easy to embed** in PDFs
- ✅ **Can customize** colors programmatically

**Cons**:
- ⚠️ **Attribution required** (CC BY-SA 4.0 license)
- ⚠️ **Emoji-style** (not realistic illustrations)
- ⚠️ **Limited variety** (28-50 objects vs infinite)

**Cost**: $0/generation
**Implementation Time**: 2 hours (download 28 SVGs matching Python version)
**Quality**: High (professionally designed, consistent style)

---

### Option B: AI-Generated Images (DALL-E 3 / Stable Diffusion)

**Description**: Generate images on-demand using AI image generation APIs.

**Architecture**:
```
Claude generates worksheet data
  ↓
For each problem:
  → Generate prompt: "cartoon style [theme] illustration of [concept]"
  → Call DALL-E 3 API
  → Download and cache image
  ↓
Embed images in PDF
```

**Pros**:
- ✅ **Unlimited variety**
- ✅ **Highly relevant** to specific problems
- ✅ **Novel/unique** every time
- ✅ **No upfront work** needed

**Cons**:
- ❌ **Expensive**: $0.04-$0.08 per worksheet (DALL-E 3)
- ❌ **Slow**: 2-3 seconds per image generation
- ❌ **Unreliable**: API can fail, images may not match prompt
- ❌ **Quality variance**: Not always kid-friendly or appropriate
- ❌ **More complex**: Caching, retry logic, fallbacks needed
- ❌ **Rate limits**: Can hit API limits
- ❌ **Large files**: DALL-E images are 256KB-1MB each

**Cost**:
- DALL-E 3 Standard: $0.040 per image
- Assuming 2-3 images per worksheet: **$0.08-$0.12 per worksheet**
- At 1000 worksheets/month: **$80-$120/month** just for images

**Implementation Time**: 10 hours (API integration, caching, error handling)
**Quality**: Variable

---

### Option C: Hybrid Approach

**Description**: Use pre-made SVGs for MVP, add AI generation as premium feature later.

**Phase 1** (MVP): Pre-made SVG assets
**Phase 2** (Post-launch): Optional AI-generated images for premium users

**Pros**:
- ✅ Fast MVP launch with SVGs
- ✅ Add AI images as value-add feature
- ✅ Can charge for AI-generated worksheets
- ✅ Best of both worlds

**Cons**:
- ⚠️ More complex pricing model
- ⚠️ Two systems to maintain

---

### Option D: Icon Libraries (Font Awesome, Lucide, etc.)

**Description**: Use icon libraries for simple, minimalist visual aids.

**Pros**:
- ✅ Free and abundant
- ✅ Easy to integrate
- ✅ Tiny file sizes

**Cons**:
- ❌ **Too minimal** for engaging worksheets
- ❌ **Not colorful** enough for kids
- ❌ **Less thematic**

**Status**: ❌ Rejected (not engaging enough for target audience)

---

## Decision: Option A (OpenMoji SVG Library)

**Rationale**:

### 1. **Consistency with Python Implementation**
- Python Claude skill already uses OpenMoji successfully
- Proven approach with 28 pre-selected objects
- Maintains feature parity between skill and web app
- Same visual style users are familiar with

### 2. **Cost Effectiveness**
- Zero per-generation cost vs $0.08-0.12 for AI
- At 1000 worksheets/month: **Save $80-120/month**
- ROI on 2 hours of setup: Immediate

### 3. **Speed & Reliability**
- Instant rendering (no API calls)
- 100% uptime (no external dependencies)
- Consistent quality
- 4000+ objects available for future expansion

### 4. **Implementation Speed**
- Can complete in 2 hours (vs 5 hours for curation)
- No complex API integration
- No caching or retry logic needed
- npm package available: `npm install openmoji`

### 5. **Professional Quality**
- Designed by designers at HfG Schwäbisch Gmünd
- Consistent style across all objects
- Kid-friendly and appropriate for education
- Open-source with active community

### 6. **Future Flexibility**
- Can add AI generation later
- Can offer as premium feature
- Hybrid approach possible
- Can expand to more OpenMoji objects as needed

---

## Implementation Plan

### OpenMoji Asset Setup (2 hours)

**Step 1: Download OpenMoji SVGs** (30 minutes)

Download the 28 core objects matching Python implementation:

**Themes & Objects (28 total)**:
1. **Food** (7 objects)
   - 🍎 Apple (1F34E)
   - 🍌 Banana (1F34C)
   - 🍊 Orange (1F34A)
   - 🍓 Strawberry (1F353)
   - 🍪 Cookie (1F36A)
   - 🍕 Pizza (1F355)
   - 🥕 Carrot (1F955)

2. **Animals** (5 objects)
   - 🐶 Dog (1F436)
   - 🐱 Cat (1F431)
   - 🐰 Rabbit (1F430)
   - 🐻 Bear (1F43B)
   - 🐟 Fish (1F41F)

3. **Nature** (4 objects)
   - 🦋 Butterfly (1F98B)
   - 🐝 Bee (1F41D)
   - 🌼 Flower (1F33C)
   - 🌳 Tree (1F333)

4. **Space** (4 objects)
   - ⭐ Star (2B50)
   - ☀️ Sun (2600)
   - 🌙 Moon (1F319)
   - 🚀 Rocket (1F680)

5. **Other** (8 objects)
   - 🚗 Car (1F697)
   - 📖 Book (1F4D6)
   - ✏️ Pencil (270F)
   - ⚫ Circle (26AB)
   - ◼️ Square (25FC)
   - 🔺 Triangle (1F53A)
   - ▭ Rectangle (25AD)
   - ❤️ Heart (2764)

**Total**: 28 assets (matching Python implementation)

---

**Step 2: Organize Files** (30 minutes)
```
public/assets/svg/
  ├── food/
  │   ├── apple.svg (1F34E)
  │   ├── banana.svg (1F34C)
  │   └── ... (7 total)
  ├── animals/
  │   ├── dog.svg (1F436)
  │   ├── cat.svg (1F431)
  │   └── ... (5 total)
  ├── nature/
  │   └── ... (4 total)
  ├── space/
  │   └── ... (4 total)
  └── other/
      └── ... (8 total)
```

File naming: `theme/descriptive-name.svg` + comment with Unicode code

---

**Step 3: Create Asset Manifest** (30 minutes)

```json
// assets/svg-manifest.json
{
  "food": [
    { "id": "apple", "unicode": "1F34E", "path": "/assets/svg/food/apple.svg", "name": "Apple" },
    { "id": "banana", "unicode": "1F34C", "path": "/assets/svg/food/banana.svg", "name": "Banana" },
    { "id": "orange", "unicode": "1F34A", "path": "/assets/svg/food/orange.svg", "name": "Orange" },
    { "id": "strawberry", "unicode": "1F353", "path": "/assets/svg/food/strawberry.svg", "name": "Strawberry" },
    { "id": "cookie", "unicode": "1F36A", "path": "/assets/svg/food/cookie.svg", "name": "Cookie" },
    { "id": "pizza", "unicode": "1F355", "path": "/assets/svg/food/pizza.svg", "name": "Pizza" },
    { "id": "carrot", "unicode": "1F955", "path": "/assets/svg/food/carrot.svg", "name": "Carrot" }
  ],
  "animals": [
    { "id": "dog", "unicode": "1F436", "path": "/assets/svg/animals/dog.svg", "name": "Dog" },
    { "id": "cat", "unicode": "1F431", "path": "/assets/svg/animals/cat.svg", "name": "Cat" },
    { "id": "rabbit", "unicode": "1F430", "path": "/assets/svg/animals/rabbit.svg", "name": "Rabbit" },
    { "id": "bear", "unicode": "1F43B", "path": "/assets/svg/animals/bear.svg", "name": "Bear" },
    { "id": "fish", "unicode": "1F41F", "path": "/assets/svg/animals/fish.svg", "name": "Fish" }
  ]
}
```

---

**Step 4: Implement SVG Rendering** (30 minutes)

```typescript
// lib/pdf/svg-renderer.ts
import SVGtoPDF from 'svg-to-pdfkit';
import fs from 'fs';
import path from 'path';
import manifest from '@/assets/svg-manifest.json';

/**
 * Render SVG asset in PDF at specified position
 */
export async function renderSVGAsset(
  doc: PDFKit.PDFDocument,
  assetId: string,
  x: number,
  y: number,
  size: number
) {
  // Find asset in manifest
  const asset = findAssetById(assetId);
  if (!asset) {
    console.warn(`Asset ${assetId} not found, using fallback`);
    renderFallbackCircle(doc, x, y, size);
    return;
  }

  // Read SVG file
  const svgPath = path.join(process.cwd(), 'public', asset.path);
  const svgData = fs.readFileSync(svgPath, 'utf-8');

  // Render SVG to PDF
  SVGtoPDF(doc, svgData, x, y, {
    width: size,
    height: size,
    preserveAspectRatio: 'xMidYMid meet'
  });
}

/**
 * Fallback: simple colored circle
 */
function renderFallbackCircle(doc: PDFKit.PDFDocument, x: number, y: number, size: number) {
  doc.fillColor('#95E1D3')
     .circle(x + size / 2, y + size / 2, size / 2)
     .fill();
  doc.fillColor('#000'); // Reset
}
```

**Step 5: Create Visual Pattern Renderers** (30 minutes)

Port the 5 rendering patterns from Python implementation:

```typescript
// lib/pdf/visual-patterns.ts

export type VisualPattern =
  | { type: 'countable_objects'; item: string; count: number }
  | { type: 'grouped_objects'; groups: Array<{ item: string; count: number }> }
  | { type: 'array'; item: string; rows: number; cols: number }
  | { type: 'number_line'; start: number; end: number; highlights: number[] }
  | { type: 'fraction_circle'; numerator: number; denominator: number };

export class VisualPatternRenderer {
  /**
   * Render countable objects (e.g., "Count the apples: 🍎🍎🍎🍎🍎")
   */
  static async renderCountableObjects(
    doc: PDFKit.PDFDocument,
    pattern: { item: string; count: number },
    x: number,
    y: number,
    size: number = 30
  ) {
    const spacing = size + 10;
    for (let i = 0; i < pattern.count; i++) {
      await renderSVGAsset(doc, pattern.item, x + (i * spacing), y, size);
    }
  }

  /**
   * Render grouped objects for addition (e.g., "🍎🍎🍎 + 🍎🍎")
   */
  static async renderGroupedObjects(
    doc: PDFKit.PDFDocument,
    pattern: { groups: Array<{ item: string; count: number }> },
    x: number,
    y: number,
    size: number = 30
  ) {
    let xOffset = 0;
    for (let g = 0; g < pattern.groups.length; g++) {
      const group = pattern.groups[g];

      // Render items in this group
      for (let i = 0; i < group.count; i++) {
        await renderSVGAsset(doc, group.item, x + xOffset, y, size);
        xOffset += size + 5;
      }

      // Add + sign between groups
      if (g < pattern.groups.length - 1) {
        doc.fontSize(20).text('+', x + xOffset, y + size / 4);
        xOffset += 30;
      }
    }
  }

  /**
   * Render array for multiplication (3 rows × 4 cols)
   */
  static async renderArray(
    doc: PDFKit.PDFDocument,
    pattern: { item: string; rows: number; cols: number },
    x: number,
    y: number,
    size: number = 25
  ) {
    const spacing = size + 5;
    for (let row = 0; row < pattern.rows; row++) {
      for (let col = 0; col < pattern.cols; col++) {
        await renderSVGAsset(
          doc,
          pattern.item,
          x + (col * spacing),
          y + (row * spacing),
          size
        );
      }
    }
  }

  /**
   * Render number line with tick marks
   */
  static renderNumberLine(
    doc: PDFKit.PDFDocument,
    pattern: { start: number; end: number; highlights: number[] },
    x: number,
    y: number,
    width: number = 400
  ) {
    const range = pattern.end - pattern.start;
    const tickSpacing = width / range;

    // Draw main line
    doc.moveTo(x, y)
       .lineTo(x + width, y)
       .stroke();

    // Draw tick marks and numbers
    for (let i = pattern.start; i <= pattern.end; i++) {
      const tickX = x + ((i - pattern.start) * tickSpacing);

      // Highlight if in highlights array
      const isHighlighted = pattern.highlights.includes(i);
      if (isHighlighted) {
        doc.fillColor('#FF6B6B')
           .circle(tickX, y - 15, 8)
           .fill();
        doc.fillColor('#000');
      }

      // Tick mark
      doc.moveTo(tickX, y - 5)
         .lineTo(tickX, y + 5)
         .stroke();

      // Number label
      doc.fontSize(10).text(i.toString(), tickX - 5, y + 10);
    }
  }

  /**
   * Render fraction circle (shaded portions)
   */
  static renderFractionCircle(
    doc: PDFKit.PDFDocument,
    pattern: { numerator: number; denominator: number },
    x: number,
    y: number,
    radius: number = 50
  ) {
    const centerX = x + radius;
    const centerY = y + radius;
    const anglePerSlice = (2 * Math.PI) / pattern.denominator;

    // Draw filled slices (numerator)
    doc.fillColor('#4ECDC4');
    for (let i = 0; i < pattern.numerator; i++) {
      const startAngle = i * anglePerSlice - Math.PI / 2;
      const endAngle = startAngle + anglePerSlice;

      doc.moveTo(centerX, centerY)
         .arc(centerX, centerY, radius, startAngle, endAngle)
         .lineTo(centerX, centerY)
         .fill();
    }

    // Draw all slice outlines
    doc.strokeColor('#000').lineWidth(2);
    for (let i = 0; i < pattern.denominator; i++) {
      const angle = i * anglePerSlice - Math.PI / 2;
      const endX = centerX + radius * Math.cos(angle);
      const endY = centerY + radius * Math.sin(angle);

      doc.moveTo(centerX, centerY)
         .lineTo(endX, endY)
         .stroke();
    }

    // Draw outer circle
    doc.circle(centerX, centerY, radius).stroke();
    doc.fillColor('#000'); // Reset
  }
}
```

---

## Success Criteria

- [x] Decision made: OpenMoji SVG library
- [x] 28 core objects identified (matching Python implementation)
- [ ] 28 OpenMoji SVG files downloaded
- [ ] Assets organized in folder structure (5 themes)
- [ ] Asset manifest JSON created (28 entries)
- [ ] SVG rendering utility implemented
- [ ] 5 visual pattern renderers ported from Python
- [ ] Test all patterns in PDF (via PDFKit)
- [ ] Verify visual quality in generated worksheets

---

## Future Enhancements

### Phase 2: AI Image Generation (Post-MVP)

**When to add**:
- After MVP launch and user feedback
- If users request more variety
- As premium feature ($1-2 extra per worksheet)

**Implementation**:
```typescript
// Feature flag for AI generation
if (user.isPremium && preferences.useAIImages) {
  images = await generateAIImages(prompts);
} else {
  images = selectUniqueSVGs(theme, count);
}
```

### Phase 3: User-Uploaded Assets

Allow teachers to upload their own clip art libraries.

---

## Consequences

### Positive

1. **Zero Ongoing Costs**
   - No per-generation fees
   - Predictable budget

2. **Fast & Reliable**
   - Instant rendering
   - No API failures

3. **Offline Development**
   - Can work without internet
   - Faster iteration

### Negative

1. **Limited Variety**
   - May become repetitive over time
   - Users might recognize same assets

2. **Manual Curation**
   - Need to add assets manually
   - Requires design taste

### Mitigation

1. **For Variety**:
   - Start with 60 assets (sufficient for MVP)
   - Add more assets based on usage patterns
   - Rotate assets randomly

2. **For Quality**:
   - Curate high-quality sources
   - Maintain consistent style
   - Get user feedback

---

## Asset License Requirements

**OpenMoji License**: CC BY-SA 4.0

**Requirements**:
- ✅ Commercial use allowed
- ⚠️ Attribution required
- ✅ Modification allowed
- ✅ Distribution allowed (embedded in PDFs)
- ⚠️ Share-alike (derivatives must use same license)

**Attribution Format** (in PDF footer):
```
Icons by OpenMoji (CC BY-SA 4.0) - openmoji.org
```

**Compliance**:
- Add attribution to PDF footer on all worksheets
- Include license file in repository
- Document OpenMoji usage in README

---

## References

- [OpenMoji](https://openmoji.org/) - Open-source emoji library
- [OpenMoji GitHub](https://github.com/hfg-gmuend/openmoji)
- [OpenMoji License](https://github.com/hfg-gmuend/openmoji/blob/master/LICENSE.txt) - CC BY-SA 4.0
- [SVG-to-PDFKit](https://github.com/alafr/SVG-to-PDFKit) - SVG rendering for PDFKit
- ADR-001: PDF Generation Approach
- Python Worksheet Generator (Claude skill) - Reference implementation

---

## Revision History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-10-29 | 1.0 | Initial decision | Development Team |
| 2025-10-29 | 2.0 | Updated to OpenMoji (from generic SVG sources) | Development Team |

---

**Next Steps**:
1. ✅ Decision made: OpenMoji SVG library
2. ✅ 28 objects identified matching Python implementation
3. ⏳ Download 28 OpenMoji SVG files (Days 5-7)
4. ⏳ Create asset manifest JSON
5. ⏳ Implement SVG rendering utility
6. ⏳ Port 5 visual pattern renderers from Python
7. ⏳ Test all patterns in PDFKit
