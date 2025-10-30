# Math Worksheet Generator

AI-powered math worksheet generator with engaging visual themes. Aligned to Common Core standards for grades 1-6.

## Project Status

**Current Phase**: Phase 0 - Pre-Development (Cost Validation)
**Progress**: Setup complete, ready for testing

---

## Quick Start (Phase 0 - Cost Validation)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your Anthropic API key
# Get your key from: https://console.anthropic.com/
```

### 3. Run Cost Validation Test

```bash
npm run test:cost
```

This will:
- Generate 3 sample worksheets (Easy, Medium, Hard)
- Measure actual Claude API costs
- Calculate monthly projections
- Save a detailed cost report

---

## Project Structure

```
math-worksheet-generator/
├── docs/                          # Documentation
│   ├── PHASE-0-SUMMARY.md        # Phase 0 status and decisions
│   └── architecture/              # Architecture decision records
├── tests/
│   └── cost-validation/           # Cost validation tests
│       ├── README.md
│       ├── test-generation-cost.js
│       └── cost-report-*.json    # Generated reports
├── IMPLEMENTATION-TASKS.md        # Detailed task list (593 tasks)
├── math-worksheet-generator-prd.md # Product requirements
├── package.json
├── .env.example
└── README.md                      # This file
```

---

## Phase 0 Goals

1. **✅ Cost Validation Test Setup**
   - Created automated test script
   - Tests 3 complexity levels
   - Measures token usage and costs

2. **⏳ Run Cost Validation**
   - Awaiting API key and test execution
   - Will validate $0.05-$0.15 per worksheet estimate

3. **📋 Visual Assets Strategy**
   - Decision: Pre-made SVG assets (50 assets)
   - Need to source from unDraw, Storyset, etc.

4. **🏗️ PDF Architecture**
   - Decision: Node.js + PDFKit
   - Need proof-of-concept implementation

---

## Next Steps

### For You (Developer)

1. **Get Anthropic API Key**
   - Visit: https://console.anthropic.com/
   - Create account and get API key
   - Add to `.env` file

2. **Run Cost Test**
   ```bash
   npm run test:cost
   ```

3. **Review Results**
   - Check console output
   - Review `tests/cost-validation/cost-report-*.json`
   - Update `docs/PHASE-0-SUMMARY.md` with findings

4. **Make Go/No-Go Decision**
   - If costs ≤ $0.20/worksheet: ✅ Proceed
   - If costs > $0.20/worksheet: Consider optimization

5. **Source SVG Assets**
   - Download 50 SVG illustrations (10 per theme)
   - Organize in folder structure
   - Create asset manifest

6. **PDF Proof of Concept**
   - Install PDFKit
   - Generate sample worksheet PDF
   - Verify it works in browsers

---

## Cost Validation Details

### Test Scenarios

| Scenario | Grade | Topic | Difficulty | Problems | Theme |
|----------|-------|-------|------------|----------|-------|
| Easy | 1 | Addition | Easy | 10 | Animals |
| Medium | 3 | Multiplication | Medium | 12 | Space |
| Hard | 6 | Fractions | Hard | 15 | Nature |

### Success Criteria
- Average cost ≤ $0.15 per worksheet (PRD estimate)
- All 3 scenarios generate valid JSON
- Response time <60 seconds per worksheet

### What Happens if Costs Are Too High?

Optimization strategies:
1. Reduce prompt length (simplify system prompt)
2. Use prompt caching for grade standards
3. Limit visual aid descriptions
4. Reduce default problem count
5. Consider prompt engineering improvements

---

## Technology Stack (Planned)

### Frontend
- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS + Shadcn/ui

### Backend
- Next.js API Routes
- Supabase (Database + Auth + Storage)
- Prisma ORM

### AI & PDF
- Anthropic Claude API (Sonnet 4)
- PDFKit (PDF generation)

### Infrastructure
- Vercel (Hosting)
- Supabase (Database, Auth, Storage)

---

## Documentation

- **[IMPLEMENTATION-TASKS.md](IMPLEMENTATION-TASKS.md)** - Complete task breakdown (593 tasks)
- **[math-worksheet-generator-prd.md](math-worksheet-generator-prd.md)** - Product requirements
- **[docs/PHASE-0-SUMMARY.md](docs/PHASE-0-SUMMARY.md)** - Phase 0 status and decisions
- **[tests/cost-validation/README.md](tests/cost-validation/README.md)** - Cost test documentation

---

## Development Timeline

### Phase 0: Pre-Development (Day 0) - **CURRENT**
- ✅ Cost validation setup
- ⏳ Run cost test
- ⏳ Finalize architecture
- ⏳ Source visual assets

### Phase 1: Foundation (Week 1)
- Days 1-2: Project infrastructure
- Days 3-4: Core generation pipeline
- Days 5-7: Basic frontend UI

### Phase 2: User Accounts & Polish (Week 2)
- Days 8-9: Authentication
- Days 10-11: Generation history
- Days 12-14: UX polish & quality

### Phase 3: Testing & Launch (Week 3)
- Days 15-16: Comprehensive testing
- Days 17-18: Launch preparation
- Days 19-20: Beta testing
- Day 21: Public launch 🚀

---

## Questions or Issues?

1. Check [PHASE-0-SUMMARY.md](docs/PHASE-0-SUMMARY.md) for current status
2. Review [IMPLEMENTATION-TASKS.md](IMPLEMENTATION-TASKS.md) for detailed tasks
3. See test documentation in `tests/cost-validation/README.md`

---

**Last Updated**: 2025-10-29
**Status**: Phase 0 - Ready for cost validation test
