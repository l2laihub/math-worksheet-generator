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

### Option A: Pre-Made SVG Assets ✅ RECOMMENDED

**Description**: Curate a library of 50-100 pre-made SVG illustrations organized by theme.

**Architecture**:
```
public/assets/svg/
  ├── animals/
  │   ├── cat.svg
  │   ├── dog.svg
  │   └── ...
  ├── space/
  │   ├── rocket.svg
  │   ├── planet.svg
  │   └── ...
  └── ...

assets/svg-manifest.json → Maps themes to available SVGs
```

**Asset Sources**:
- [unDraw](https://undraw.co/) - Free, customizable, MIT license
- [Storyset](https://storyset.com/) - Free for commercial use
- [DrawKit](https://www.drawkit.com/) - Free SVGs
- [Icons8 Illustrations](https://icons8.com/illustrations) - Free/paid options
- [Humaaans](https://www.humaaans.com/) - Free, MIT license

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
- ⚠️ **Upfront work** (~5 hours to curate)
- ⚠️ **Limited variety** (50-100 assets vs infinite)
- ⚠️ **Manual updates** to add new assets
- ⚠️ **Less dynamic** than AI-generated

**Cost**: $0/generation
**Implementation Time**: 5 hours
**Quality**: High (curated)

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

## Decision: Option A (Pre-Made SVG Assets)

**Rationale**:

### 1. **Cost Effectiveness**
- Zero per-generation cost vs $0.08-0.12 for AI
- At 1000 worksheets/month: **Save $80-120/month**
- ROI on 5 hours of curation: Immediate

### 2. **Speed & Reliability**
- Instant rendering (no API calls)
- 100% uptime (no external dependencies)
- Consistent quality

### 3. **Sufficient Variety for MVP**
- 50-100 assets = 10 per theme
- Can mix and match
- Enough variety for launch

### 4. **Implementation Speed**
- Can complete in one work session
- No complex API integration
- No caching or retry logic needed

### 5. **Future Flexibility**
- Can add AI generation later
- Can offer as premium feature
- Hybrid approach possible

---

## Implementation Plan

### Asset Curation (5 hours)

**Step 1: Source Assets** (2 hours)
- Browse unDraw, Storyset, DrawKit
- Download 60-80 SVG files
- Focus on: simple, colorful, kid-friendly

**Themes & Target Count**:
1. **Animals** (12 assets)
   - Farm animals: cow, pig, chicken, horse
   - Pets: dog, cat, rabbit
   - Zoo: lion, elephant, giraffe, monkey
   - Sea: fish, whale

2. **Space** (12 assets)
   - Rocket, spaceship, UFO
   - Planets: Earth, Mars, Saturn
   - Astronaut, alien
   - Stars, moon, comet
   - Satellite, space station

3. **Sports** (12 assets)
   - Soccer ball, goal, player
   - Basketball, hoop, player
   - Baseball, bat, glove
   - Swimming, tennis, running

4. **Food** (12 assets)
   - Fruits: apple, banana, orange, strawberry
   - Vegetables: carrot, broccoli, corn
   - Snacks: pizza, burger, ice cream
   - Drinks: juice, milk

5. **Nature** (12 assets)
   - Trees: oak, pine, palm
   - Flowers: sunflower, rose, tulip
   - Weather: sun, cloud, rain, snow
   - Mountains, river, forest

**Total**: 60 assets (12 per theme)

---

**Step 2: Organize Files** (1 hour)
```
public/assets/svg/
  ├── animals/
  │   ├── cow.svg
  │   ├── dog.svg
  │   └── ...
  ├── space/
  │   ├── rocket.svg
  │   ├── planet-earth.svg
  │   └── ...
  ├── sports/
  ├── food/
  └── nature/
```

File naming convention: `theme/descriptive-name.svg`

---

**Step 3: Create Asset Manifest** (30 minutes)

```json
// assets/svg-manifest.json
{
  "animals": [
    { "id": "cow", "path": "/assets/svg/animals/cow.svg", "keywords": ["farm", "milk", "counting"] },
    { "id": "dog", "path": "/assets/svg/animals/dog.svg", "keywords": ["pet", "friend", "counting"] },
    ...
  ],
  "space": [
    { "id": "rocket", "path": "/assets/svg/space/rocket.svg", "keywords": ["launch", "counting", "speed"] },
    ...
  ],
  ...
}
```

---

**Step 4: Create Selection Helper** (1.5 hours)

```typescript
// lib/assets/svg-selector.ts
import manifest from '@/assets/svg-manifest.json';

/**
 * Select random SVG for a theme
 */
export function selectRandomSVG(theme: string): SVGAsset {
  const assets = manifest[theme] || [];
  return assets[Math.floor(Math.random() * assets.length)];
}

/**
 * Select multiple unique SVGs for a theme
 */
export function selectUniqueSVGs(theme: string, count: number): SVGAsset[] {
  const assets = manifest[theme] || [];
  return shuffleArray(assets).slice(0, count);
}

/**
 * Embed SVG in PDF
 */
export async function embedSVGInPDF(doc: PDFDocument, svgPath: string, x: number, y: number, size: number) {
  // Convert SVG to PDF-compatible format
  // Or embed as base64 image
}
```

---

## Success Criteria

- [x] Decision made: Pre-made SVG assets
- [ ] 60 SVG assets downloaded (12 per theme)
- [ ] Assets organized in folder structure
- [ ] Asset manifest created
- [ ] Selection helper functions implemented
- [ ] Test embedding in PDF (via PDFKit)
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

**Must Have**:
- ✅ Commercial use allowed
- ✅ No attribution required (or attribute in footer)
- ✅ Modification allowed
- ✅ Distribution allowed (embedded in PDFs)

**Recommended Licenses**:
- MIT License
- CC0 (Public Domain)
- Free for commercial use with attribution

**Sources Verification**:
- unDraw: MIT License ✅
- Storyset: Free for commercial with attribution ✅
- DrawKit: MIT License ✅
- Icons8: Free tier available ✅

---

## References

- [unDraw](https://undraw.co/)
- [Storyset](https://storyset.com/)
- [DrawKit](https://www.drawkit.com/)
- [Icons8 Illustrations](https://icons8.com/illustrations)
- ADR-001: PDF Generation Approach

---

## Revision History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-10-29 | 1.0 | Initial decision | Development Team |

---

**Next Steps**:
1. ✅ Decision made: Pre-made SVG assets
2. ⏳ Download and organize 60 SVG assets
3. ⏳ Create asset manifest JSON
4. ⏳ Implement selection helper functions
5. ⏳ Test SVG embedding in PDFKit
