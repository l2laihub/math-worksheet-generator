# Math Worksheet Generator - Implementation Task List

**Project**: AI Math Worksheet Generator
**Timeline**: 3 weeks (21 days)
**Current Phase**: Phase 1 - Days 3-4 Core Pipeline ✅ COMPLETE
**Last Updated**: 2025-10-30

---

## Quick Reference

### Progress Tracking Legend
- ⏳ **Not Started** - Task hasn't begun
- 🔄 **In Progress** - Currently working on this
- ✅ **Completed** - Task finished and verified
- ⚠️ **Blocked** - Waiting on something
- ⏭️ **Skipped** - Not needed for MVP

### Current Status
**Phase**: Phase 1 - Days 3-4 ✅ COMPLETE
**Active Task**: Core generation pipeline operational, ready for UI (Days 5-7)
**Completion**: ~80/593 tasks (13%)

---

## Phase 0: Pre-Development (Day 0)
**Goal**: Validate assumptions and finalize architecture decisions
**Duration**: 1 day (completed in 3 hours)
**Status**: ✅ COMPLETE
**Completed**: 2025-10-29

### Cost Validation Test
- [x] ✅ Create test directory: `tests/cost-validation/`
- [x] ✅ Set up test script: `test-generation-cost.js`
- [x] ✅ Configure Claude API client with test API key
- [x] ✅ Create sample worksheet parameters (easy, medium, hard)
- [x] ✅ Generate 3 test worksheets with different complexity
- [x] ✅ Measure input tokens for each generation
- [x] ✅ Measure output tokens for each generation
- [x] ✅ Calculate cost per worksheet (input + output)
- [x] ✅ Test with visual aid descriptions (measure token impact)
- [x] ✅ Document actual costs vs PRD estimates
- [x] ✅ Create cost projection spreadsheet (100, 500, 1000 generations)
- [x] ✅ Decision: Validate if costs are within acceptable range

**Acceptance Criteria**: ✅ ALL MET
- ✅ Actual cost per worksheet documented: $0.032
- ✅ Cost projections validated: $32.38/month for 1000 worksheets
- ✅ Go/no-go decision made: GO - costs are 85% under budget

---

### Visual Assets Strategy
- [x] ✅ Research: Browse SVG asset libraries (unDraw, Storyset, etc)
- [x] ✅ Decision: Pre-made SVGs vs AI generation for MVP
- [x] ✅ Identified 5 theme categories (food, animals, nature, space, other)
- [x] ✅ **UPDATED DECISION**: Changed to OpenMoji library (matching Python implementation)
- [x] ✅ Identified 28 core objects matching Python version
- [ ] ⏳ Download 28 OpenMoji SVG files (food: 7, animals: 5, nature: 4, space: 4, other: 8) - DEFERRED to Days 5-7
- [ ] ⏳ Create `public/assets/svg/` directory structure (5 theme folders) - DEFERRED to Days 5-7
- [ ] ⏳ Add 28 SVG files to project with Unicode code comments - DEFERRED to Days 5-7
- [ ] ⏳ Create asset manifest: `assets/svg-manifest.json` (28 objects with Unicode codes) - DEFERRED to Days 5-7
- [ ] ⏳ Implement SVG rendering utility (`lib/pdf/svg-renderer.ts`) - DEFERRED to Days 5-7
- [ ] ⏳ Port 5 visual patterns from Python (`lib/pdf/visual-patterns.ts`): countable_objects, grouped_objects, array, number_line, fraction_circle - DEFERRED to Days 5-7
- [x] ⏭️ AI-generated: Set up DALL-E (SKIPPED - chose OpenMoji SVGs)
- [x] ⏭️ AI-generated: Test image generation (SKIPPED - chose OpenMoji SVGs)
- [x] ⏭️ AI-generated: Calculate cost per image (SKIPPED - chose OpenMoji SVGs)
- [x] ✅ Document decision and rationale (ADR-002)
- [x] ✅ **UPDATED**: ADR-002 revised to specify OpenMoji as source

**Acceptance Criteria**: ✅ ALL MET
- ✅ Visual strategy decided and documented: OpenMoji SVG library
- ✅ Decision documented in ADR-002 (updated with OpenMoji specifics)
- ✅ 28 core objects identified matching Python implementation
- ⏳ Assets download and implementation deferred to Days 5-7 (acceptable for Phase 0)

---

### Architecture Decision
- [x] ✅ Create architecture decision record: `docs/architecture/ADR-001-pdf-generation.md`
- [x] ✅ Option A: Research Python FastAPI + ReportLab approach
- [x] ⏭️ Option A: Create proof-of-concept (SKIPPED - chose Option B)
- [x] ⏭️ Option A: Measure generation time (SKIPPED - chose Option B)
- [x] ✅ Option B: Research Node.js + PDFKit approach
- [x] ✅ Option B: Create proof-of-concept (simple PDF generation)
- [x] ✅ Option B: Measure generation time (0.03s - excellent!)
- [x] ✅ Compare options: speed, cost, maintainability, deployment complexity
- [x] ✅ Decision: Select PDF generation approach (Node.js + PDFKit)
- [x] ✅ Document architecture diagram with data flow
- [x] ✅ Document decision in ADR-001

**Acceptance Criteria**: ✅ ALL MET
- ✅ PDF generation method selected: Node.js + PDFKit
- ✅ Working proof-of-concept: tests/pdf-poc/generate-sample-worksheet.js
- ✅ Architecture documented: ADR-001 + ADR-002
- ✅ Sample PDFs generated successfully (0.03s, 4.2 KB)

---

## Phase 1: Foundation (Week 1)

---

## Days 1-2: Project Infrastructure
**Goal**: Deployable skeleton with core dependencies
**Duration**: 2 days
**Status**: ✅ COMPLETE (Infrastructure setup complete, Supabase manual setup required)

### Project Initialization
- [x] ✅ Run `npx create-next-app@latest math-worksheet-generator` (installed manually with all dependencies)
- [x] ✅ Configure: App Router, TypeScript, Tailwind CSS, ESLint
- [x] ✅ Verify Next.js 14+ is installed (v16.0.1)
- [x] ✅ Remove default Next.js boilerplate files (created minimal structure)
- [x] ✅ Create project directory structure:
  ```
  /app          ✅ Created with layout.tsx, page.tsx, globals.css
  /components   ✅ Created
  /lib          ✅ Created with supabase/, prisma.ts
  /types        ✅ Created
  /prisma       ✅ Created with schema.prisma
  /public       ✅ Created
  /tests        ✅ Already exists from Phase 0
  /docs         ✅ Already exists from Phase 0
  ```
- [x] ✅ Initialize git repository: `git init` (already initialized in Phase 0)
- [x] ✅ Create `.gitignore` (include `.env`, `node_modules`, `.next`) (already exists from Phase 0)
- [x] ✅ Initial commit: "Initial project setup" (committed as "feat: Phase 1 Days 1-2 - Next.js project infrastructure setup")

**Acceptance Criteria**: ✅ ALL MET
- ✅ Next.js app runs locally on port 3000 (tested successfully)
- ✅ Directory structure in place

---

### Styling & UI Setup
- [x] ⏭️ Install Shadcn/ui: `npx shadcn-ui@latest init` (DEFERRED to Days 5-7 when building UI components)
- [x] ⏭️ Configure Shadcn/ui theme (default or custom) (DEFERRED to Days 5-7)
- [x] ⏭️ Install core Shadcn components: (DEFERRED to Days 5-7)
  - [ ] ⏳ Button
  - [ ] ⏳ Card
  - [ ] ⏳ Input
  - [ ] ⏳ Label
  - [ ] ⏳ Select
  - [ ] ⏳ Slider
  - [ ] ⏳ Form components
  - [ ] ⏳ Dialog
  - [ ] ⏳ Toast
- [x] ✅ Create global styles: `app/globals.css` (Tailwind CSS configured)
- [x] ✅ Set up custom color palette (brand colors) (CSS variables configured)
- [x] ✅ Configure font (Inter or system fonts) (Inter font configured via next/font/google)
- [ ] ⏳ Test responsive breakpoints (mobile, tablet, desktop) (DEFERRED to Days 5-7 UI implementation)

**Acceptance Criteria**: ⚠️ PARTIAL (Tailwind configured, Shadcn/ui deferred to UI phase)
- ⏳ Shadcn/ui components render correctly (deferred)
- ✅ Styling system working (Tailwind CSS operational)

---

### Supabase Setup
- [ ] ⚠️ Create Supabase project at supabase.com (MANUAL SETUP REQUIRED - See docs/SUPABASE-SETUP-GUIDE.md)
- [ ] ⚠️ Note project URL and anon key (MANUAL SETUP REQUIRED)
- [x] ✅ Install Supabase client: `npm install @supabase/supabase-js` (@supabase/ssr v0.x installed)
- [ ] ⚠️ Create `.env.local` with Supabase credentials: (MANUAL SETUP REQUIRED - Template created as .env.local.example)
  ```
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  SUPABASE_SERVICE_ROLE_KEY=
  DATABASE_URL=
  DIRECT_URL=
  ```
- [x] ✅ Create `lib/supabase/client.ts` (browser client) (created with createBrowserClient)
- [x] ✅ Create `lib/supabase/server.ts` (server client) (created with createServerClient)
- [ ] ⚠️ Test connection: run simple query (BLOCKED - requires manual Supabase setup)
- [ ] ⚠️ Enable Row Level Security (RLS) on database (MANUAL SETUP REQUIRED - SQL provided in guide)
- [ ] ⚠️ Create storage bucket: `worksheets` in Supabase dashboard (MANUAL SETUP REQUIRED)
- [ ] ⚠️ Configure bucket as public (or set up signed URL access) (MANUAL SETUP REQUIRED)
- [ ] ⏳ Set storage retention policy (if needed) (Optional)

**Acceptance Criteria**: ⚠️ BLOCKED ON MANUAL SETUP
- ⚠️ Supabase client connects successfully (requires .env.local configuration)
- ✅ Environment variables template created (.env.local.example)
- ⚠️ Storage bucket created and accessible (requires manual Supabase setup)
- ✅ Comprehensive setup guide created: docs/SUPABASE-SETUP-GUIDE.md

---

### Database Schema Setup
- [x] ✅ Install Prisma: `npm install prisma @prisma/client` (Prisma v6.x + client installed)
- [x] ✅ Initialize Prisma: `npx prisma init` (prisma/schema.prisma created)
- [x] ✅ Configure `prisma/schema.prisma` with Supabase connection (PostgreSQL datasource configured with DATABASE_URL and DIRECT_URL)
- [x] ✅ Create User model:
  ```prisma
  model User {
    id            String   @id @default(uuid())
    email         String   @unique
    createdAt     DateTime @default(now())
    generations   Generation[]
    @@map("users")
  }
  ```
- [x] ✅ Create Generation model:
  ```prisma
  model Generation {
    id              String   @id @default(uuid())
    userId          String?  @map("user_id")
    gradeLevel      Int      @map("grade_level")
    topic           String
    difficulty      String
    problemCount    Int      @map("problem_count")
    theme           String
    worksheetUrl    String   @map("worksheet_url")
    answerKeyUrl    String   @map("answer_key_url")
    status          String   @default("pending")
    createdAt       DateTime @default(now()) @map("created_at")
    user            User?    @relation(fields: [userId], references: [id], onDelete: Cascade)
    @@map("generations")
    @@index([userId])
    @@index([status])
    @@index([createdAt])
  }
  ```
- [ ] ⚠️ Run migration: `npx prisma migrate dev --name init` (BLOCKED - requires Supabase DATABASE_URL in .env.local)
- [ ] ⚠️ Generate Prisma client: `npx prisma generate` (BLOCKED - requires migration first)
- [x] ✅ Create `lib/prisma.ts` (Prisma client singleton) (created with singleton pattern)
- [ ] ⚠️ Test: Insert test user and generation (BLOCKED - requires migration and .env.local setup)

**Acceptance Criteria**: ⚠️ BLOCKED ON MANUAL SUPABASE SETUP
- ⚠️ Database schema created (schema defined, migration pending)
- ⚠️ Prisma client working (blocked on migration)
- ⚠️ Test data inserted successfully (blocked on migration)

---

### Vercel Deployment Setup
- [ ] ⏳ Create Vercel account (if not exists) (DEFERRED to post-Supabase setup)
- [ ] ⏳ Install Vercel CLI: `npm i -g vercel` (DEFERRED)
- [ ] ⏳ Run `vercel login` (DEFERRED)
- [ ] ⏳ Link project: `vercel link` (DEFERRED)
- [ ] ⏳ Configure project settings (Node.js version, build command) (DEFERRED)
- [ ] ⏳ Add environment variables in Vercel dashboard (DEFERRED)
- [ ] ⏳ Deploy to preview: `vercel` (DEFERRED)
- [ ] ⏳ Verify preview deployment works (DEFERRED)
- [ ] ⏳ Configure production domain: `mathworksheets.huybuilds.app` (DEFERRED)
- [ ] ⏳ Set up automatic deployments on git push (DEFERRED)
- [ ] ⏳ Deploy to production: `vercel --prod` (DEFERRED)
- [ ] ⏳ Verify production deployment (DEFERRED)

**Acceptance Criteria**: ⏳ DEFERRED (Will do after Supabase setup and Days 3-4 core pipeline)
- ⏳ App deployed to Vercel
- ⏳ Custom domain configured
- ⏳ Preview + production environments working

---

### Core Dependencies Installation
- [x] ✅ Install AI SDK: `npm install @anthropic-ai/sdk` (@anthropic-ai/sdk v0.68.0 - already installed from Phase 0)
- [x] ✅ Install validation: `npm install zod` (zod latest installed)
- [x] ✅ Install server state: `npm install @tanstack/react-query` (@tanstack/react-query latest installed)
- [x] ✅ Install forms: `npm install react-hook-form @hookform/resolvers` (both installed)
- [x] ✅ Install date handling: `npm install date-fns` (date-fns installed)
- [x] ✅ Install PDF generation (if Node): `npm install pdfkit` (pdfkit v0.17.2 - already installed from Phase 0)
- [x] ⏭️ Or setup Python service (if FastAPI approach) (SKIPPED - chose Node.js + PDFKit in Phase 0)
- [x] ✅ Install dev dependencies:
  - [x] ✅ `npm install -D @types/node` (@types/node v24.9.2 installed)
  - [x] ⏳ `npm install -D prettier` (DEFERRED - not critical for infrastructure setup)
  - [x] ⏳ `npm install -D eslint-config-prettier` (DEFERRED - ESLint already configured)
- [ ] ⏳ Create `.prettierrc` configuration (DEFERRED)
- [ ] ⏳ Add format script to `package.json` (DEFERRED)

**Acceptance Criteria**: ✅ ALL CRITICAL DEPENDENCIES MET
- ✅ All critical dependencies installed (AI SDK, validation, forms, state, PDF, database)
- ✅ No version conflicts (verified during installation)
- ✅ TypeScript types resolving correctly (tsconfig.json configured)

---

### Environment Configuration
- [x] ✅ Create `.env.example` template: (Created as `.env.local.example` with comprehensive documentation)
  ```
  # Anthropic Claude API
  ANTHROPIC_API_KEY=your_anthropic_api_key_here

  # Supabase
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

  # Database URL for Prisma
  DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.your-project.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
  DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.your-project.supabase.co:5432/postgres"
  ```
- [ ] ⏳ Add environment variables to Vercel (production) (DEFERRED to deployment phase)
- [ ] ⏳ Add environment variables to Vercel (preview) (DEFERRED to deployment phase)
- [ ] ⏳ Create `lib/env.ts` for type-safe env access (DEFERRED - can use process.env directly for now)
- [ ] ⏳ Validate all env vars on app startup (DEFERRED to Days 3-4)

**Acceptance Criteria**: ✅ PARTIAL (Template created, Vercel config deferred)
- ✅ Environment variables documented (.env.local.example created with detailed instructions)
- ⏳ Type-safe env access working (deferred - using process.env for now)
- ✅ No hardcoded secrets in code (verified)

---

### Health Check & Monitoring
- [ ] ⏳ Create API route: `app/api/health/route.ts` (DEFERRED to Days 3-4 when implementing APIs)
- [ ] ⏳ Check database connection (DEFERRED)
- [ ] ⏳ Check Claude API connection (DEFERRED)
- [ ] ⏳ Check Supabase Storage connection (DEFERRED)
- [ ] ⏳ Return health status JSON (DEFERRED)
- [x] ✅ Create "Coming Soon" homepage: `app/page.tsx` (Basic homepage created with hero section and CTAs)
- [x] ⏭️ Add basic header with logo (DEFERRED to Days 5-7 UI implementation - homepage has basic structure)
- [x] ⏭️ Add email signup form (pre-launch) (DEFERRED - not needed for MVP testing phase)
- [ ] ⏳ Test health endpoint: `curl /api/health` (DEFERRED to Days 3-4)
- [ ] ⏳ Deploy to production (DEFERRED to after Supabase setup)
- [ ] ⏳ Verify production health check passes (DEFERRED)

**Acceptance Criteria**: ⚠️ PARTIAL (Infrastructure ready, health checks deferred)
- ⏳ `/api/health` returns 200 OK (deferred to Days 3-4)
- ✅ Homepage created and accessible locally
- ⚠️ All services connected (blocked on manual Supabase setup)

**Day 1-2 Milestone**: ✅ INFRASTRUCTURE COMPLETE
- ✅ Next.js 14 application initialized and running
- ✅ TypeScript, Tailwind CSS, ESLint configured
- ✅ Prisma ORM with complete database schema
- ✅ Supabase client libraries configured
- ✅ All core dependencies installed (AI SDK, validation, forms, state management, PDF)
- ✅ Environment variable templates created
- ✅ Comprehensive Supabase setup guide documented
- ✅ Basic homepage created
- ✅ Committed and pushed to GitHub (commit: 9f97f37)
- ⚠️ **BLOCKED**: Manual Supabase setup required (15-20 min) - See docs/SUPABASE-SETUP-GUIDE.md

---

## Days 3-4: Core Generation Pipeline
**Goal**: End-to-end worksheet generation working (no UI yet)
**Duration**: 2 days
**Status**: ✅ COMPLETE
**Completed**: 2025-10-30

**Summary**: Successfully implemented complete generation pipeline from API request to PDF delivery. Core functionality verified and operational.

**Key Achievements**:
- ✅ API endpoint `/api/generate` fully functional
- ✅ Claude API integration working (worksheet generation)
- ✅ PDF generation with PDFKit (worksheet + answer key)
- ✅ Supabase Storage integration (PDF uploads)
- ✅ Database persistence (generation tracking)
- ✅ WSL development environment configured
- ✅ Prisma ORM with PostgreSQL via Supabase
- ✅ End-to-end testing successful

**Fixes Applied**:
- ✅ WSL permission issues resolved (`chmod +x` for binaries)
- ✅ Prisma binary targets for WSL/Debian
- ✅ Supabase connection pooler URL updated
- ✅ PDFKit externalized from Turbopack bundling
- ✅ PDF page indexing bug fixed
- ✅ Next.js 16 configuration updated

### Grade Standards Reference
- [ ] ⏳ Create `docs/grade-standards.md`
- [ ] ⏳ Research Common Core Math standards for Grade 1
- [ ] ⏳ Research Common Core Math standards for Grade 2
- [ ] ⏳ Research Common Core Math standards for Grade 3
- [ ] ⏳ Research Common Core Math standards for Grade 4
- [ ] ⏳ Research Common Core Math standards for Grade 5
- [ ] ⏳ Research Common Core Math standards for Grade 6
- [ ] ⏳ Structure standards by: Grade → Topic → Subtopics → Examples
- [ ] ⏳ Add difficulty guidelines (Easy, Medium, Hard) per topic
- [ ] ⏳ Add example problems for each topic/difficulty combo
- [ ] ⏳ Create topic mapping: `lib/constants/topics.ts`
- [ ] ⏳ Validate standards with sample problems

**Acceptance Criteria**:
- Standards documented for all 6 grades
- Examples provided for each topic
- Reference file ready for Claude prompts

---

### Claude API Client
- [ ] ⏳ Create `lib/claude/client.ts`
- [ ] ⏳ Initialize Anthropic SDK client
- [ ] ⏳ Create type: `WorksheetParams` (grade, topic, difficulty, count, theme)
- [ ] ⏳ Create type: `WorksheetData` (problems, answers, layoutSpecs)
- [ ] ⏳ Create function: `generateWorksheetData(params): Promise<WorksheetData>`
- [ ] ⏳ Create system prompt with grade standards context
- [ ] ⏳ Create user prompt template with parameters
- [ ] ⏳ Include visual aid descriptions in prompt
- [ ] ⏳ Configure Claude settings (model: sonnet-4, max_tokens: 4000)
- [ ] ⏳ Add error handling (API errors, rate limits)
- [ ] ⏳ Add retry logic (3 attempts with exponential backoff)
- [ ] ⏳ Parse Claude response into structured WorksheetData
- [ ] ⏳ Validate response structure with Zod schema
- [ ] ⏳ Test with sample parameters (Grade 3, Multiplication, Easy)
- [ ] ⏳ Log token usage and costs

**Acceptance Criteria**:
- Claude client returns valid structured data
- Error handling works
- Token usage logged

---

### PDF Generator Service
**Choose Option A OR Option B**

#### Option A: Python FastAPI + ReportLab
- [ ] ⏳ Create `services/pdf-generator/` directory
- [ ] ⏳ Create `requirements.txt` (FastAPI, ReportLab, uvicorn)
- [ ] ⏳ Create virtual environment: `python -m venv venv`
- [ ] ⏳ Install dependencies: `pip install -r requirements.txt`
- [ ] ⏳ Create `main.py` FastAPI app
- [ ] ⏳ Create endpoint: `POST /generate-pdf`
- [ ] ⏳ Create function: `generate_worksheet_pdf(data)`
- [ ] ⏳ Create function: `generate_answer_key_pdf(data)`
- [ ] ⏳ Implement PDF layout (header, problems, visual areas)
- [ ] ⏳ Add theme styling (colors, fonts based on theme)
- [ ] ⏳ Handle SVG asset embedding
- [ ] ⏳ Test PDF generation locally
- [ ] ⏳ Deploy to Vercel as Python serverless function
- [ ] ⏳ Test deployed endpoint

#### Option B: Node.js + PDFKit
- [ ] ⏳ Create `lib/pdf/generator.ts`
- [ ] ⏳ Install: `npm install pdfkit`
- [ ] ⏳ Create function: `generateWorksheetPDF(data): Promise<Buffer>`
- [ ] ⏳ Create function: `generateAnswerKeyPDF(data): Promise<Buffer>`
- [ ] ⏳ Implement PDF layout (header, problems, visual areas)
- [ ] ⏳ Add theme styling (colors, fonts based on theme)
- [ ] ⏳ Handle SVG asset embedding
- [ ] ⏳ Test PDF generation locally
- [ ] ⏳ Verify works in Vercel serverless environment

**Acceptance Criteria**:
- PDF service generates valid worksheet PDFs
- Answer key PDFs generated correctly
- PDFs render properly (open in browser/reader)

---

### Validation & Quality Checks
- [ ] ⏳ Create `lib/validation/worksheet-validator.ts`
- [ ] ⏳ Implement function: `validateProblemCorrectness(problems)`
- [ ] ⏳ Check math problem has valid solution
- [ ] ⏳ Verify answer key matches problems
- [ ] ⏳ Implement function: `validateGradeLevelAppropriate(problems, grade)`
- [ ] ⏳ Check problem complexity matches difficulty
- [ ] ⏳ Implement function: `validateProblemCount(problems, expected)`
- [ ] ⏳ Create validation pipeline
- [ ] ⏳ Add auto-regeneration on validation failure (max 2 retries)
- [ ] ⏳ Log validation failures for analysis
- [ ] ⏳ Test with intentionally incorrect problems

**Acceptance Criteria**:
- Validation catches incorrect problems
- Auto-regeneration works
- False positive rate <5%

---

### Supabase Storage Setup
- [ ] ⏳ Create storage bucket in Supabase dashboard: `worksheets`
- [ ] ⏳ Enable public access for worksheets bucket (or use signed URLs)
- [ ] ⏳ Create `lib/storage/supabase-storage.ts`
- [ ] ⏳ Create function: `uploadPDF(buffer, userId, filename): Promise<url>`
- [ ] ⏳ Configure RLS policies (optional: users can only access their own files)
- [ ] ⏳ Set up folder structure: `{userId}/{worksheetId}.pdf`
- [ ] ⏳ Test upload: sample PDF to Supabase Storage
- [ ] ⏳ Verify public URL is accessible
- [ ] ⏳ Test download: fetch PDF from public URL
- [ ] ⏳ Configure storage cache headers (cache-control: 31536000)

**Acceptance Criteria**:
- PDFs upload successfully to Supabase Storage
- Public URLs accessible (or signed URLs working)
- CDN caching configured

---

### Generation API Endpoint
- [ ] ⏳ Create `app/api/generate/route.ts`
- [ ] ⏳ Define request schema with Zod:
  ```typescript
  const GenerateSchema = z.object({
    gradeLevel: z.number().min(1).max(6),
    topic: z.string(),
    difficulty: z.enum(['easy', 'medium', 'hard']),
    problemCount: z.number().min(5).max(20),
    theme: z.string(),
  })
  ```
- [ ] ⏳ Implement POST handler
- [ ] ⏳ Validate request body with Zod
- [ ] ⏳ Call `generateWorksheetData()` to get problems
- [ ] ⏳ Validate generated data
- [ ] ⏳ Generate worksheet PDF
- [ ] ⏳ Generate answer key PDF
- [ ] ⏳ Upload both PDFs to Supabase Storage
- [ ] ⏳ Save generation record to database
- [ ] ⏳ Return response: `{ id, worksheetUrl, answerKeyUrl }`
- [ ] ⏳ Add error handling (try-catch, proper status codes)
- [ ] ⏳ Add logging (request params, timing, errors)
- [ ] ⏳ Set timeout to 60 seconds

**Acceptance Criteria**:
- API endpoint returns 200 with valid URLs
- Invalid requests return 400 with error message
- Errors return 500 with safe error message

---

### End-to-End Testing (No UI)
- [ ] ⏳ Test with curl: Grade 1, Addition, Easy
- [ ] ⏳ Test with curl: Grade 3, Multiplication, Medium
- [ ] ⏳ Test with curl: Grade 6, Fractions, Hard
- [ ] ⏳ Verify worksheets are created (<60 seconds)
- [ ] ⏳ Download PDFs and verify formatting
- [ ] ⏳ Check answer keys are correct
- [ ] ⏳ Verify visual aids are included
- [ ] ⏳ Test error handling (invalid grade level)
- [ ] ⏳ Test error handling (invalid topic)
- [ ] ⏳ Measure token costs (verify within budget)
- [ ] ⏳ Check database records created
- [ ] ⏳ Verify Supabase Storage URLs work

**Acceptance Criteria**:
- 3/3 test generations successful
- PDFs formatted correctly
- Generation time <60 seconds
- Costs within budget

**Day 3-4 Milestone**: ✅ Core generation pipeline working end-to-end

---

## Days 5-7: Basic Frontend UI
**Goal**: User can generate worksheets through web interface
**Duration**: 3 days
**Status**: ⏳ Not Started

### Homepage Design
- [ ] ⏳ Create `app/page.tsx` (replace Coming Soon)
- [ ] ⏳ Design hero section:
  - [ ] ⏳ Headline: "AI-Powered Math Worksheets in Seconds"
  - [ ] ⏳ Subheadline: value proposition
  - [ ] ⏳ Primary CTA button: "Generate Your First Worksheet"
  - [ ] ⏳ Hero image/illustration
- [ ] ⏳ Add features section:
  - [ ] ⏳ Feature 1: "Standards-Aligned" with icon
  - [ ] ⏳ Feature 2: "Engaging Themes" with icon
  - [ ] ⏳ Feature 3: "Answer Keys Included" with icon
- [ ] ⏳ Add example worksheets section:
  - [ ] ⏳ Display 3 sample worksheet images
  - [ ] ⏳ Show variety (different grades, topics)
- [ ] ⏳ Add testimonials placeholder (empty for now)
- [ ] ⏳ Add footer:
  - [ ] ⏳ Copyright
  - [ ] ⏳ Links: Privacy, Terms, Contact
- [ ] ⏳ Make fully responsive (mobile, tablet, desktop)
- [ ] ⏳ Test on iPhone, iPad, Desktop Chrome
- [ ] ⏳ Deploy to preview environment
- [ ] ⏳ Get feedback from one person

**Acceptance Criteria**:
- Homepage looks professional
- CTA button navigates to generation form
- Responsive on all devices

---

### Navigation Header
- [ ] ⏳ Create `components/layout/Header.tsx`
- [ ] ⏳ Add logo/brand name (left side)
- [ ] ⏳ Add navigation links:
  - [ ] ⏳ Home
  - [ ] ⏳ Generate
  - [ ] ⏳ History (show if logged in)
- [ ] ⏳ Add auth buttons (right side):
  - [ ] ⏳ "Log In" button (if not logged in)
  - [ ] ⏳ "Sign Up" button (if not logged in)
  - [ ] ⏳ User menu (if logged in): Profile, History, Logout
- [ ] ⏳ Make mobile-responsive (hamburger menu)
- [ ] ⏳ Add to `app/layout.tsx`
- [ ] ⏳ Test navigation on all pages

**Acceptance Criteria**:
- Header visible on all pages
- Navigation works
- Mobile menu functional

---

### Generation Form Page
- [ ] ⏳ Create `app/generate/page.tsx`
- [ ] ⏳ Install form dependencies (already done in Day 1-2)
- [ ] ⏳ Create form schema with Zod (reuse from API schema)
- [ ] ⏳ Set up react-hook-form with Zod resolver
- [ ] ⏳ Create grade level dropdown:
  - [ ] ⏳ Options: Grade 1 through Grade 6
  - [ ] ⏳ Default: Grade 3
- [ ] ⏳ Create topic dropdown (dynamic based on grade):
  - [ ] ⏳ Load topics from `lib/constants/topics.ts`
  - [ ] ⏳ Filter topics by selected grade
  - [ ] ⏳ Default: First topic for grade
- [ ] ⏳ Create difficulty radio buttons:
  - [ ] ⏳ Options: Easy, Medium, Hard
  - [ ] ⏳ Visual design: colored pills
  - [ ] ⏳ Default: Medium
- [ ] ⏳ Create problem count slider:
  - [ ] ⏳ Range: 5 to 20
  - [ ] ⏳ Show current value above slider
  - [ ] ⏳ Default: 10
- [ ] ⏳ Create theme selector:
  - [ ] ⏳ Visual cards with icons
  - [ ] ⏳ Options: Animals, Space, Sports, Food, Nature
  - [ ] ⏳ Default: Animals
- [ ] ⏳ Add form validation (client-side)
- [ ] ⏳ Add "Generate Worksheet" submit button
- [ ] ⏳ Add loading state on submit
- [ ] ⏳ Handle form submission:
  - [ ] ⏳ POST to `/api/generate`
  - [ ] ⏳ Show loading spinner
  - [ ] ⏳ Redirect to processing page on success
  - [ ] ⏳ Show error toast on failure
- [ ] ⏳ Make mobile-responsive
- [ ] ⏳ Test all form inputs
- [ ] ⏳ Test validation (empty fields, invalid values)

**Acceptance Criteria**:
- Form submits successfully
- All inputs validated
- Mobile-friendly
- Error handling works

---

### Processing Page
- [ ] ⏳ Create `app/generate/[id]/processing/page.tsx`
- [ ] ⏳ Get generation ID from URL params
- [ ] ⏳ Create loading animation component:
  - [ ] ⏳ Spinner or progress animation
  - [ ] ⏳ Status messages that rotate
- [ ] ⏳ Status messages:
  - [ ] ⏳ "Analyzing grade-level standards..."
  - [ ] ⏳ "Generating math problems..."
  - [ ] ⏳ "Creating visual aids..."
  - [ ] ⏳ "Building worksheet..."
  - [ ] ⏳ "Almost done..."
- [ ] ⏳ Create API route: `app/api/generation/[id]/route.ts`
- [ ] ⏳ Return generation status and URLs when ready
- [ ] ⏳ Implement polling:
  - [ ] ⏳ Use react-query with refetchInterval
  - [ ] ⏳ Poll every 2 seconds
  - [ ] ⏳ Stop polling when status is "completed"
- [ ] ⏳ Redirect to success page when completed
- [ ] ⏳ Show error page if generation failed
- [ ] ⏳ Add timeout (redirect to error after 90 seconds)

**Acceptance Criteria**:
- Loading animation displays
- Polling works correctly
- Redirects when complete
- Timeout protection works

---

### Success Page
- [ ] ⏳ Create `app/generate/[id]/success/page.tsx`
- [ ] ⏳ Fetch generation data from database
- [ ] ⏳ Display success message
- [ ] ⏳ Show worksheet preview:
  - [ ] ⏳ Thumbnail of worksheet (first page preview)
  - [ ] ⏳ Thumbnail of answer key
  - [ ] ⏳ Or use placeholder images if preview not available
- [ ] ⏳ Create download buttons:
  - [ ] ⏳ "Download Worksheet" (primary CTA)
  - [ ] ⏳ "Download Answer Key" (secondary)
  - [ ] ⏳ Both buttons large and prominent
- [ ] ⏳ Add generation details:
  - [ ] ⏳ Grade level
  - [ ] ⏳ Topic
  - [ ] ⏳ Difficulty
  - [ ] ⏳ Problem count
  - [ ] ⏳ Theme
- [ ] ⏳ Add action buttons:
  - [ ] ⏳ "Generate Another Worksheet" (goes to form)
  - [ ] ⏳ "Generate Similar Worksheet" (pre-fills form)
- [ ] ⏳ Add signup prompt for guest users:
  - [ ] ⏳ "Sign up to save your worksheets!"
  - [ ] ⏳ Email input + "Sign Up" button
- [ ] ⏳ Make mobile-responsive
- [ ] ⏳ Test download buttons (verify PDFs download)

**Acceptance Criteria**:
- Success page displays correctly
- Downloads work
- "Generate Another" navigates correctly
- Signup prompt shows for guests

---

### React Query Setup
- [ ] ⏳ Create `lib/query-client.ts`
- [ ] ⏳ Configure QueryClient with defaults
- [ ] ⏳ Add QueryClientProvider to `app/layout.tsx`
- [ ] ⏳ Create query hooks: `useGeneration(id)`
- [ ] ⏳ Create mutation hooks: `useGenerateWorksheet()`
- [ ] ⏳ Test queries and mutations

**Acceptance Criteria**:
- React Query configured
- Hooks working correctly
- Cache invalidation working

---

### Error Handling & UX
- [ ] ⏳ Create error page: `app/generate/[id]/error/page.tsx`
- [ ] ⏳ Display user-friendly error message
- [ ] ⏳ Add "Try Again" button (goes back to form)
- [ ] ⏳ Add "Contact Support" link
- [ ] ⏳ Create toast notification component
- [ ] ⏳ Add toast for generation success
- [ ] ⏳ Add toast for generation failure
- [ ] ⏳ Add toast for API errors
- [ ] ⏳ Test error scenarios:
  - [ ] ⏳ Network error
  - [ ] ⏳ API timeout
  - [ ] ⏳ Invalid parameters
  - [ ] ⏳ Claude API error

**Acceptance Criteria**:
- Errors handled gracefully
- User always knows what to do next
- No cryptic error messages

---

### Mobile Responsiveness
- [ ] ⏳ Test homepage on iPhone SE (375px)
- [ ] ⏳ Test generation form on iPhone SE
- [ ] ⏳ Test success page on iPhone SE
- [ ] ⏳ Test on iPad (768px)
- [ ] ⏳ Test on desktop (1920px)
- [ ] ⏳ Fix any layout issues
- [ ] ⏳ Verify touch targets are >44px
- [ ] ⏳ Test in iOS Safari
- [ ] ⏳ Test in Chrome mobile
- [ ] ⏳ Test landscape orientation

**Acceptance Criteria**:
- App usable on all screen sizes
- No horizontal scrolling
- Touch targets adequate

**Day 5-7 Milestone**: ✅ Full user flow working (generate → processing → download)

---

## Phase 2: User Accounts & Polish (Week 2)

---

## Days 8-9: Authentication
**Goal**: Users can create accounts and log in
**Duration**: 2 days
**Status**: ⏳ Not Started

### Supabase Auth Configuration
- [ ] ⏳ Enable email authentication in Supabase dashboard
- [ ] ⏳ Configure magic link settings
- [ ] ⏳ Set redirect URLs (local + production)
- [ ] ⏳ Customize email templates:
  - [ ] ⏳ Welcome email
  - [ ] ⏳ Magic link email
  - [ ] ⏳ Style with brand colors
- [ ] ⏳ Test email delivery (check spam folder)
- [ ] ⏳ Configure rate limiting (prevent abuse)

**Acceptance Criteria**:
- Emails send successfully
- Links work correctly
- Rate limiting configured

---

### Auth State Management
- [ ] ⏳ Create `lib/auth/auth-context.tsx`
- [ ] ⏳ Create `useAuth()` hook
- [ ] ⏳ Implement `useUser()` hook (returns current user)
- [ ] ⏳ Implement `useSession()` hook (returns session)
- [ ] ⏳ Add AuthProvider to `app/layout.tsx`
- [ ] ⏳ Create `lib/auth/auth-helpers.ts`:
  - [ ] ⏳ `signInWithMagicLink(email)`
  - [ ] ⏳ `signOut()`
  - [ ] ⏳ `getUser()`
- [ ] ⏳ Handle auth state changes (listen to Supabase events)
- [ ] ⏳ Persist auth state across page reloads

**Acceptance Criteria**:
- Auth state accessible throughout app
- State persists on reload
- Hooks work correctly

---

### Auth Pages
- [ ] ⏳ Create `app/login/page.tsx`
- [ ] ⏳ Add email input field
- [ ] ⏳ Add "Send Magic Link" button
- [ ] ⏳ Show loading state on submit
- [ ] ⏳ Show success message: "Check your email!"
- [ ] ⏳ Add error handling (invalid email, rate limited)
- [ ] ⏳ Make mobile-responsive
- [ ] ⏳ Create `app/signup/page.tsx`:
  - [ ] ⏳ Similar to login page
  - [ ] ⏳ Add terms of service checkbox
  - [ ] ⏳ Add privacy policy link
- [ ] ⏳ Create `app/auth/callback/route.ts`:
  - [ ] ⏳ Handle magic link callback
  - [ ] ⏳ Exchange token for session
  - [ ] ⏳ Redirect to dashboard or return URL
- [ ] ⏳ Test login flow end-to-end
- [ ] ⏳ Test signup flow end-to-end

**Acceptance Criteria**:
- Users can sign up via magic link
- Users can log in via magic link
- Callback handling works
- Error states handled

---

### Protected Routes
- [ ] ⏳ Create `middleware.ts` for route protection
- [ ] ⏳ Protect `/history` route (require auth)
- [ ] ⏳ Protect `/account` route (require auth)
- [ ] ⏳ Redirect to login if not authenticated
- [ ] ⏳ Preserve return URL (redirect back after login)
- [ ] ⏳ Test protected routes as guest
- [ ] ⏳ Test protected routes as logged-in user

**Acceptance Criteria**:
- Protected routes redirect to login
- Return URL preserved
- Logged-in users can access protected routes

---

### User Profile & Account
- [ ] ⏳ Create `app/account/page.tsx`
- [ ] ⏳ Display user email
- [ ] ⏳ Display account creation date
- [ ] ⏳ Show total worksheet count
- [ ] ⏳ Add "Log Out" button
- [ ] ⏳ Add "Delete Account" button (with confirmation)
- [ ] ⏳ Implement account deletion:
  - [ ] ⏳ Delete user generations
  - [ ] ⏳ Delete user record
  - [ ] ⏳ Sign out user
  - [ ] ⏳ Redirect to homepage
- [ ] ⏳ Make mobile-responsive
- [ ] ⏳ Test account deletion

**Acceptance Criteria**:
- User can view account info
- Logout works
- Account deletion works (with safety confirmation)

---

### Link Generations to Users
- [ ] ⏳ Update `app/api/generate/route.ts`:
  - [ ] ⏳ Get user ID from session (if logged in)
  - [ ] ⏳ Save userId to generation record
  - [ ] ⏳ Allow null userId for guest users
- [ ] ⏳ Update database schema (already has userId?)
- [ ] ⏳ Test generation as guest (userId should be null)
- [ ] ⏳ Test generation as logged-in user (userId should be set)
- [ ] ⏳ Create function: `claimGuestGenerations(userId, sessionId)`
- [ ] ⏳ When user signs up, claim their guest generations

**Acceptance Criteria**:
- Logged-in users' generations linked to account
- Guest generations work without userId
- Guest generations claimed on signup

---

### Header Auth UI
- [ ] ⏳ Update `components/layout/Header.tsx`
- [ ] ⏳ Show "Log In" + "Sign Up" buttons if not authenticated
- [ ] ⏳ Show user menu if authenticated:
  - [ ] ⏳ User email or avatar
  - [ ] ⏳ Dropdown menu: History, Account, Logout
- [ ] ⏳ Add user avatar (use initials for now)
- [ ] ⏳ Make dropdown mobile-friendly
- [ ] ⏳ Test auth state changes (login/logout) update header

**Acceptance Criteria**:
- Header shows correct state for auth status
- User menu works
- Mobile menu includes auth options

**Day 8-9 Milestone**: ✅ Full authentication system working

---

## Days 10-11: Generation History
**Goal**: Logged-in users can view and re-download past worksheets
**Duration**: 2 days
**Status**: ⏳ Not Started

### History Page Layout
- [ ] ⏳ Create `app/history/page.tsx`
- [ ] ⏳ Add page title: "My Worksheets"
- [ ] ⏳ Add "Generate New Worksheet" button (top right)
- [ ] ⏳ Create empty state (no generations yet):
  - [ ] ⏳ Illustration or icon
  - [ ] ⏳ Message: "You haven't generated any worksheets yet"
  - [ ] ⏳ CTA: "Generate Your First Worksheet"
- [ ] ⏳ Create loading state (skeleton cards)
- [ ] ⏳ Make page mobile-responsive

**Acceptance Criteria**:
- History page renders
- Empty state shows for new users
- Loading state displays while fetching

---

### History API Endpoint
- [ ] ⏳ Create `app/api/history/route.ts`
- [ ] ⏳ Implement GET handler
- [ ] ⏳ Verify user authentication
- [ ] ⏳ Query user's generations from database:
  - [ ] ⏳ Filter by userId
  - [ ] ⏳ Sort by createdAt (newest first)
  - [ ] ⏳ Limit to 20 results (pagination)
- [ ] ⏳ Return generation data:
  - [ ] ⏳ id, gradeLevel, topic, difficulty, theme, createdAt
  - [ ] ⏳ worksheetUrl, answerKeyUrl
- [ ] ⏳ Add pagination support (page query param)
- [ ] ⏳ Test endpoint with Postman/curl
- [ ] ⏳ Test with multiple generations
- [ ] ⏳ Test with empty history

**Acceptance Criteria**:
- Endpoint returns user's generations
- Pagination works
- Only returns authenticated user's data

---

### History Card Component
- [ ] ⏳ Create `components/history/GenerationCard.tsx`
- [ ] ⏳ Display generation details:
  - [ ] ⏳ Thumbnail (placeholder for now)
  - [ ] ⏳ Grade level badge
  - [ ] ⏳ Topic name
  - [ ] ⏳ Difficulty badge (colored)
  - [ ] ⏳ Theme name
  - [ ] ⏳ Creation date (relative: "2 days ago")
- [ ] ⏳ Add action buttons:
  - [ ] ⏳ "Download Worksheet" button
  - [ ] ⏳ "Download Answer Key" button
  - [ ] ⏳ "Generate Similar" button
- [ ] ⏳ Make card clickable (expand details)
- [ ] ⏳ Add hover states
- [ ] ⏳ Make mobile-responsive (stacks vertically)

**Acceptance Criteria**:
- Card displays all generation info
- Buttons work correctly
- Mobile layout looks good

---

### History List Implementation
- [ ] ⏳ Update `app/history/page.tsx`
- [ ] ⏳ Fetch generations with react-query
- [ ] ⏳ Create query hook: `useGenerationHistory()`
- [ ] ⏳ Display generations in grid (3 columns desktop, 1 mobile)
- [ ] ⏳ Map over generations and render GenerationCard for each
- [ ] ⏳ Handle loading state
- [ ] ⏳ Handle error state
- [ ] ⏳ Handle empty state
- [ ] ⏳ Test with 0, 1, 5, 20 generations

**Acceptance Criteria**:
- Generations display in grid
- All states handled correctly
- Grid responsive on mobile

---

### Pagination Implementation
- [ ] ⏳ Add "Load More" button at bottom of history page
- [ ] ⏳ Track current page in state
- [ ] ⏳ Fetch next page on button click
- [ ] ⏳ Append new generations to list
- [ ] ⏳ Hide button when no more generations
- [ ] ⏳ Show loading indicator on button when fetching
- [ ] ⏳ Test with 25+ generations (multiple pages)

**Acceptance Criteria**:
- Pagination loads more generations
- No duplicates in list
- Button hides when at end

---

### Search & Filter UI
- [ ] ⏳ Add search bar (top of history page)
- [ ] ⏳ Add filter dropdown for grade level
- [ ] ⏳ Add filter dropdown for topic
- [ ] ⏳ Add sort dropdown (newest, oldest)
- [ ] ⏳ Update API endpoint to support filters:
  - [ ] ⏳ Add query params: search, grade, topic, sort
  - [ ] ⏳ Implement database filtering
- [ ] ⏳ Wire up filters to query
- [ ] ⏳ Update query hook to accept filter params
- [ ] ⏳ Clear filters button
- [ ] ⏳ Test each filter independently
- [ ] ⏳ Test combined filters

**Acceptance Criteria**:
- Search filters generations
- Grade filter works
- Topic filter works
- Sort options work
- Filters can be combined

---

### "Generate Similar" Feature
- [ ] ⏳ Create function: `prefillGenerationForm(generationId)`
- [ ] ⏳ Store generation params in state/localStorage
- [ ] ⏳ Update `app/generate/page.tsx` to check for prefill data
- [ ] ⏳ Populate form fields with prefill data
- [ ] ⏳ Allow user to modify before generating
- [ ] ⏳ Clear prefill data after form loads
- [ ] ⏳ Test: Click "Generate Similar" from history
- [ ] ⏳ Verify form is pre-filled correctly
- [ ] ⏳ Test generating with pre-filled values

**Acceptance Criteria**:
- "Generate Similar" navigates to form with data
- Form is editable
- Generate works with prefilled data

---

### Re-download Functionality
- [ ] ⏳ Implement download handling in GenerationCard
- [ ] ⏳ On download button click, fetch PDF from Supabase Storage
- [ ] ⏳ Trigger browser download (don't open in new tab)
- [ ] ⏳ Show download progress (if possible)
- [ ] ⏳ Handle download errors (file not found, etc)
- [ ] ⏳ Test downloading worksheet
- [ ] ⏳ Test downloading answer key
- [ ] ⏳ Test on mobile (iOS Safari behavior)

**Acceptance Criteria**:
- Downloads work reliably
- Files have correct names
- Mobile download behavior acceptable

**Day 10-11 Milestone**: ✅ History page fully functional with search, filters, download

---

## Days 12-14: UX Polish & Quality
**Goal**: Production-ready user experience
**Duration**: 3 days
**Status**: ⏳ Not Started

### Loading States & Animations
- [ ] ⏳ Create skeleton loader components:
  - [ ] ⏳ Skeleton for GenerationCard
  - [ ] ⏳ Skeleton for history page
  - [ ] ⏳ Skeleton for form (if needed)
- [ ] ⏳ Add loading spinners to buttons
- [ ] ⏳ Add progress bar for generation process
- [ ] ⏳ Add smooth page transitions (Framer Motion?)
- [ ] ⏳ Add animation to success page (confetti?)
- [ ] ⏳ Ensure no layout shift on load
- [ ] ⏳ Test all loading states

**Acceptance Criteria**:
- Loading states look polished
- No jarring layout shifts
- Animations smooth

---

### Error Handling Improvements
- [ ] ⏳ Create custom error page: `app/error.tsx`
- [ ] ⏳ Create 404 page: `app/not-found.tsx`
- [ ] ⏳ Implement error boundary components
- [ ] ⏳ Add user-friendly error messages:
  - [ ] ⏳ Network errors: "Connection problem. Please try again."
  - [ ] ⏳ API errors: "Something went wrong. We're looking into it."
  - [ ] ⏳ Validation errors: Specific field feedback
- [ ] ⏳ Add retry buttons to error states
- [ ] ⏳ Add "Contact Support" links where appropriate
- [ ] ⏳ Test error scenarios:
  - [ ] ⏳ Network offline
  - [ ] ⏳ API returns 500
  - [ ] ⏳ Claude API timeout
  - [ ] ⏳ Invalid form submission
- [ ] ⏳ Log errors to Sentry (setup in Day 17-18)

**Acceptance Criteria**:
- All error paths handled gracefully
- User always knows what happened and what to do
- No cryptic technical errors shown to users

---

### Validation & Quality Checks
- [ ] ⏳ Review `lib/validation/worksheet-validator.ts`
- [ ] ⏳ Improve problem correctness validation:
  - [ ] ⏳ Check addition problems
  - [ ] ⏳ Check subtraction problems
  - [ ] ⏳ Check multiplication problems
  - [ ] ⏳ Check division problems
  - [ ] ⏳ Check fraction problems
- [ ] ⏳ Improve grade-level validation:
  - [ ] ⏳ Define complexity metrics per topic
  - [ ] ⏳ Check problem matches difficulty setting
- [ ] ⏳ Add answer key verification:
  - [ ] ⏳ Ensure answer key has same problem count
  - [ ] ⏳ Verify answers match problems
- [ ] ⏳ Implement auto-regeneration on failure:
  - [ ] ⏳ Max 2 retry attempts
  - [ ] ⏳ Log validation failures
- [ ] ⏳ Test validation with intentionally bad data
- [ ] ⏳ Measure validation accuracy (false positives/negatives)

**Acceptance Criteria**:
- Validation catches incorrect worksheets
- Auto-regeneration works
- False positive rate <5%

---

### Mobile Responsiveness Refinement
- [ ] ⏳ Test entire app on iPhone SE (375px)
- [ ] ⏳ Test entire app on iPhone Pro (393px)
- [ ] ⏳ Test entire app on iPad (768px)
- [ ] ⏳ Test entire app on iPad Pro (1024px)
- [ ] ⏳ Test entire app on desktop (1920px)
- [ ] ⏳ Fix any layout issues found
- [ ] ⏳ Verify all text is readable (font sizes)
- [ ] ⏳ Verify all buttons are tappable (44px minimum)
- [ ] ⏳ Test in iOS Safari (specific quirks)
- [ ] ⏳ Test in Chrome mobile
- [ ] ⏳ Test in Firefox mobile
- [ ] ⏳ Test landscape orientation on phones
- [ ] ⏳ Fix iOS Safari specific issues (viewport, inputs)

**Acceptance Criteria**:
- App fully functional on all tested devices
- No horizontal scrolling
- Touch targets adequate
- Text readable

---

### Accessibility (WCAG 2.1 AA)
- [ ] ⏳ Install accessibility testing tools (axe DevTools)
- [ ] ⏳ Run automated accessibility audit
- [ ] ⏳ Fix high-priority issues
- [ ] ⏳ Keyboard navigation:
  - [ ] ⏳ Test tab order makes sense
  - [ ] ⏳ Ensure all interactive elements keyboard accessible
  - [ ] ⏳ Add visible focus indicators
  - [ ] ⏳ Test form submission via keyboard
- [ ] ⏳ Screen reader support:
  - [ ] ⏳ Add ARIA labels to interactive elements
  - [ ] ⏳ Add ARIA live regions for dynamic content
  - [ ] ⏳ Test with NVDA (Windows) or VoiceOver (Mac)
  - [ ] ⏳ Ensure form errors announced to screen readers
- [ ] ⏳ Color contrast:
  - [ ] ⏳ Check all text has sufficient contrast (4.5:1)
  - [ ] ⏳ Check button states have sufficient contrast
  - [ ] ⏳ Fix any failing contrast ratios
- [ ] ⏳ Alt text for images
- [ ] ⏳ Form labels properly associated
- [ ] ⏳ Error messages descriptive and helpful
- [ ] ⏳ Run full accessibility audit again
- [ ] ⏳ Fix remaining issues

**Acceptance Criteria**:
- Pass automated accessibility tests
- Keyboard navigation works throughout app
- Screen reader can navigate app
- Color contrast meets WCAG AA

---

### SEO Optimization
- [ ] ⏳ Create `app/layout.tsx` metadata:
  - [ ] ⏳ Title: "AI Math Worksheet Generator | Free Printable Worksheets"
  - [ ] ⏳ Description: SEO-optimized
  - [ ] ⏳ Keywords (if supported)
  - [ ] ⏳ Open Graph tags (og:title, og:description, og:image)
  - [ ] ⏳ Twitter Card tags
- [ ] ⏳ Create page-specific metadata:
  - [ ] ⏳ Homepage metadata
  - [ ] ⏳ Generate page metadata
  - [ ] ⏳ History page metadata
- [ ] ⏳ Create `robots.txt`:
  - [ ] ⏳ Allow all crawlers
  - [ ] ⏳ Disallow `/api/` routes
  - [ ] ⏳ Disallow `/auth/` routes
- [ ] ⏳ Create `sitemap.xml`:
  - [ ] ⏳ Include homepage
  - [ ] ⏳ Include generate page
  - [ ] ⏳ Include login page
  - [ ] ⏳ Auto-update on deployment
- [ ] ⏳ Add Schema.org markup:
  - [ ] ⏳ WebApplication schema
  - [ ] ⏳ Educational materials schema
- [ ] ⏳ Create OG image (1200x630px)
- [ ] ⏳ Test OG tags with Facebook debugger
- [ ] ⏳ Test Twitter Card with Twitter validator
- [ ] ⏳ Submit sitemap to Google Search Console

**Acceptance Criteria**:
- All pages have proper meta tags
- OG preview looks good on social media
- Sitemap accessible at `/sitemap.xml`
- Robots.txt configured

---

### Performance Optimization
- [ ] ⏳ Run Lighthouse audit (Performance, Best Practices, SEO)
- [ ] ⏳ Fix performance issues:
  - [ ] ⏳ Optimize images (use Next.js Image component)
  - [ ] ⏳ Lazy load components (React.lazy, Suspense)
  - [ ] ⏳ Code splitting (dynamic imports)
  - [ ] ⏳ Minimize JavaScript bundle size
- [ ] ⏳ Add loading states to prevent layout shift (CLS)
- [ ] ⏳ Optimize fonts (use font-display: swap)
- [ ] ⏳ Add caching headers to API routes
- [ ] ⏳ Run Lighthouse audit again
- [ ] ⏳ Target scores: Performance >90, Accessibility >95, SEO >95

**Acceptance Criteria**:
- Lighthouse scores meet targets
- Page loads feel fast (<3 seconds LCP)
- No major performance warnings

**Day 12-14 Milestone**: ✅ Production-ready UX, accessible, performant, SEO-optimized

---

## Phase 3: Testing & Launch (Week 3)

---

## Days 15-16: Comprehensive Testing
**Goal**: Find and fix all critical bugs
**Duration**: 2 days
**Status**: ⏳ Not Started

### Functional Testing - Guest User Flows
- [ ] ⏳ Test: Visit homepage → click CTA → generate page
- [ ] ⏳ Test: Fill form with valid data → generate worksheet
- [ ] ⏳ Test: Processing page appears → polls correctly
- [ ] ⏳ Test: Success page appears with download links
- [ ] ⏳ Test: Download worksheet PDF
- [ ] ⏳ Test: Download answer key PDF
- [ ] ⏳ Test: Verify PDFs open correctly in browser
- [ ] ⏳ Test: Verify problem count matches selection
- [ ] ⏳ Test: Verify difficulty matches selection
- [ ] ⏳ Test: Verify visual theme applied
- [ ] ⏳ Test: "Generate Another Worksheet" button works
- [ ] ⏳ Test: Signup prompt shows for guest users

**Acceptance Criteria**: All guest user flows work without errors

---

### Functional Testing - Authenticated User Flows
- [ ] ⏳ Test: Click "Sign Up" → enter email → receive magic link
- [ ] ⏳ Test: Click magic link → redirected back to app → logged in
- [ ] ⏳ Test: Header shows user menu when logged in
- [ ] ⏳ Test: Generate worksheet while logged in
- [ ] ⏳ Test: Verify generation saved to history
- [ ] ⏳ Test: Navigate to history page → see generation
- [ ] ⏳ Test: Re-download worksheet from history
- [ ] ⏳ Test: Re-download answer key from history
- [ ] ⏳ Test: "Generate Similar" pre-fills form
- [ ] ⏳ Test: Search for generation in history
- [ ] ⏳ Test: Filter history by grade level
- [ ] ⏳ Test: Log out → redirected to homepage
- [ ] ⏳ Test: Log in again → history persists

**Acceptance Criteria**: All authenticated user flows work without errors

---

### Functional Testing - Edge Cases
- [ ] ⏳ Test: Submit form with empty fields → validation errors
- [ ] ⏳ Test: Submit form with invalid grade (0, 7) → validation error
- [ ] ⏳ Test: Submit form with invalid problem count → validation error
- [ ] ⏳ Test: Generate with same parameters twice → different worksheets
- [ ] ⏳ Test: Generation timeout (if possible) → error handling
- [ ] ⏳ Test: Network offline → error handling
- [ ] ⏳ Test: Navigate away during generation → can resume
- [ ] ⏳ Test: Direct URL to non-existent generation → 404 page
- [ ] ⏳ Test: Access history without login → redirected to login
- [ ] ⏳ Test: Magic link expired → error message
- [ ] ⏳ Test: Multiple tabs open → auth state synced

**Acceptance Criteria**: All edge cases handled gracefully

---

### Content Quality Testing
- [ ] ⏳ Generate Grade 1 worksheet → verify problems appropriate
- [ ] ⏳ Generate Grade 2 worksheet → verify problems appropriate
- [ ] ⏳ Generate Grade 3 worksheet → verify problems appropriate
- [ ] ⏳ Generate Grade 4 worksheet → verify problems appropriate
- [ ] ⏳ Generate Grade 5 worksheet → verify problems appropriate
- [ ] ⏳ Generate Grade 6 worksheet → verify problems appropriate
- [ ] ⏳ Test each topic for Grade 3:
  - [ ] ⏳ Addition
  - [ ] ⏳ Subtraction
  - [ ] ⏳ Multiplication
  - [ ] ⏳ Division
  - [ ] ⏳ Fractions (if available)
- [ ] ⏳ Test all difficulty levels for Grade 3 Multiplication:
  - [ ] ⏳ Easy → problems use small numbers
  - [ ] ⏳ Medium → moderate complexity
  - [ ] ⏳ Hard → challenging problems
- [ ] ⏳ Verify answer keys are 100% correct (spot-check 10 worksheets)
- [ ] ⏳ Verify visual themes applied correctly
- [ ] ⏳ Verify layout looks good (no overlapping text, proper spacing)

**Acceptance Criteria**: Content quality meets standards, no incorrect answers

---

### Cross-Browser Testing
- [ ] ⏳ Test in Chrome (Windows)
- [ ] ⏳ Test in Chrome (Mac)
- [ ] ⏳ Test in Firefox (Windows)
- [ ] ⏳ Test in Safari (Mac)
- [ ] ⏳ Test in Edge (Windows)
- [ ] ⏳ Test in iOS Safari (iPhone)
- [ ] ⏳ Test in Chrome Mobile (Android)
- [ ] ⏳ Test in Samsung Internet (Android)
- [ ] ⏳ Fix any browser-specific issues
- [ ] ⏳ Document any known browser limitations

**Acceptance Criteria**: App works in all major browsers

---

### Performance Testing
- [ ] ⏳ Install load testing tool (k6 or Artillery)
- [ ] ⏳ Create load test script (simulate 50 concurrent users)
- [ ] ⏳ Run load test against staging environment
- [ ] ⏳ Measure API response times:
  - [ ] ⏳ `/api/generate` (p50, p95, p99)
  - [ ] ⏳ `/api/history` (p50, p95, p99)
  - [ ] ⏳ `/api/generation/[id]` (p50, p95, p99)
- [ ] ⏳ Target: p95 response time <200ms (except /api/generate)
- [ ] ⏳ Target: /api/generate p90 <60 seconds
- [ ] ⏳ Measure generation success rate (target >95%)
- [ ] ⏳ Identify and fix slow queries
- [ ] ⏳ Add database indexes if needed
- [ ] ⏳ Run load test again
- [ ] ⏳ Verify no memory leaks

**Acceptance Criteria**:
- API response times acceptable
- App handles 50 concurrent users
- No crashes under load

---

### Security Testing
- [ ] ⏳ Test SQL injection:
  - [ ] ⏳ Try injecting SQL in form fields
  - [ ] ⏳ Try injecting SQL in URL params
  - [ ] ⏳ Verify Prisma ORM prevents injection
- [ ] ⏳ Test XSS attacks:
  - [ ] ⏳ Try injecting scripts in form fields
  - [ ] ⏳ Verify inputs are sanitized
  - [ ] ⏳ Check for dangerouslySetInnerHTML usage
- [ ] ⏳ Test CSRF protection:
  - [ ] ⏳ Verify Next.js CSRF tokens work
  - [ ] ⏳ Try forging requests from external site
- [ ] ⏳ Test authentication bypass:
  - [ ] ⏳ Try accessing protected routes without auth
  - [ ] ⏳ Try accessing other users' data
  - [ ] ⏳ Verify RLS policies in Supabase
- [ ] ⏳ Test rate limiting:
  - [ ] ⏳ Send 20 requests rapidly → verify rate limited
  - [ ] ⏳ Verify rate limit per IP, not just per user
- [ ] ⏳ Check environment variables:
  - [ ] ⏳ Verify no secrets exposed in client-side code
  - [ ] ⏳ Check `.env` files not committed to git
  - [ ] ⏳ Verify Vercel env vars are set correctly
- [ ] ⏳ Review Supabase RLS policies:
  - [ ] ⏳ Users can only see their own generations
  - [ ] ⏳ Users can't modify other users' data
- [ ] ⏳ Fix any security issues found

**Acceptance Criteria**:
- No critical security vulnerabilities
- SQL injection prevented
- XSS prevented
- Authentication secure
- Rate limiting works

---

### Cost Validation
- [ ] ⏳ Generate 100 test worksheets (varied complexity)
- [ ] ⏳ Measure total Claude API costs
- [ ] ⏳ Calculate average cost per worksheet
- [ ] ⏳ Breakdown by complexity:
  - [ ] ⏳ Easy worksheets (avg cost)
  - [ ] ⏳ Medium worksheets (avg cost)
  - [ ] ⏳ Hard worksheets (avg cost)
  - [ ] ⏳ Higher grades (avg cost)
- [ ] ⏳ Measure Supabase Storage costs
- [ ] ⏳ Project monthly costs at different volumes:
  - [ ] ⏳ 100 generations/month
  - [ ] ⏳ 500 generations/month
  - [ ] ⏳ 1000 generations/month
- [ ] ⏳ Compare actual costs vs. PRD estimates
- [ ] ⏳ Document findings
- [ ] ⏳ Decision: Adjust pricing strategy if needed

**Acceptance Criteria**:
- Actual costs measured and documented
- Cost projections created
- Costs within acceptable range

**Day 15-16 Milestone**: ✅ All testing complete, bugs fixed, app production-ready

---

## Days 17-18: Launch Preparation
**Goal**: Ready for public launch
**Duration**: 2 days
**Status**: ⏳ Not Started

### Legal & Compliance
- [ ] ⏳ Create Privacy Policy:
  - [ ] ⏳ Use Termly or similar generator
  - [ ] ⏳ Customize for our app
  - [ ] ⏳ Include: data collection, cookies, third-party services
  - [ ] ⏳ Add COPPA compliance section (kids under 13)
  - [ ] ⏳ Create page: `app/privacy/page.tsx`
- [ ] ⏳ Create Terms of Service:
  - [ ] ⏳ Use Termly or similar generator
  - [ ] ⏳ Customize for our app
  - [ ] ⏳ Include: usage rules, limitations, liability
  - [ ] ⏳ Create page: `app/terms/page.tsx`
- [ ] ⏳ Add cookie consent banner (if using analytics)
- [ ] ⏳ Link Privacy & Terms in footer
- [ ] ⏳ Add checkbox to signup form (agree to Terms & Privacy)
- [ ] ⏳ Review legal docs (or have someone review)

**Acceptance Criteria**:
- Privacy Policy published
- Terms of Service published
- Linked from footer and signup

---

### Support Infrastructure
- [ ] ⏳ Create Contact/Support page: `app/contact/page.tsx`
- [ ] ⏳ Add contact form:
  - [ ] ⏳ Name field
  - [ ] ⏳ Email field
  - [ ] ⏳ Subject field
  - [ ] ⏳ Message field (textarea)
  - [ ] ⏳ Submit button
- [ ] ⏳ Create API endpoint: `app/api/contact/route.ts`
- [ ] ⏳ Implement email sending (Resend or similar):
  - [ ] ⏳ Send contact form submissions to support email
  - [ ] ⏳ Send confirmation email to user
- [ ] ⏳ Create FAQ page: `app/faq/page.tsx`
- [ ] ⏳ Add common questions:
  - [ ] ⏳ "How do I generate a worksheet?"
  - [ ] ⏳ "Are the worksheets aligned to Common Core?"
  - [ ] ⏳ "Can I save my worksheets?"
  - [ ] ⏳ "How much does it cost?"
  - [ ] ⏳ "How do I delete my account?"
  - [ ] ⏳ At least 10 Q&A pairs
- [ ] ⏳ Create email templates for support:
  - [ ] ⏳ Welcome email (after signup)
  - [ ] ⏳ Contact form confirmation
  - [ ] ⏳ Support response template
- [ ] ⏳ Test contact form submission

**Acceptance Criteria**:
- Contact form works
- FAQ page published
- Email templates ready

---

### Analytics & Monitoring
- [ ] ⏳ Choose analytics tool (Plausible or Posthog)
- [ ] ⏳ Create account
- [ ] ⏳ Install analytics script
- [ ] ⏳ Configure events to track:
  - [ ] ⏳ Page views
  - [ ] ⏳ "Generate Worksheet" clicks
  - [ ] ⏳ Successful generations
  - [ ] ⏳ Failed generations
  - [ ] ⏳ Download clicks
  - [ ] ⏳ Sign ups
  - [ ] ⏳ Logins
- [ ] ⏳ Test event tracking (verify events appear in dashboard)
- [ ] ⏳ Set up Sentry for error tracking:
  - [ ] ⏳ Create Sentry account
  - [ ] ⏳ Install Sentry SDK: `npm install @sentry/nextjs`
  - [ ] ⏳ Configure `sentry.client.config.js`
  - [ ] ⏳ Configure `sentry.server.config.js`
  - [ ] ⏳ Test error reporting (trigger test error)
  - [ ] ⏳ Verify error appears in Sentry dashboard
- [ ] ⏳ Enable Vercel Analytics
- [ ] ⏳ Create monitoring dashboard:
  - [ ] ⏳ Track key metrics (generations, signups, errors)
  - [ ] ⏳ Set up alerts (error rate >5%, API down, etc)

**Acceptance Criteria**:
- Analytics tracking user actions
- Error monitoring working
- Dashboard accessible
- Alerts configured

---

### Production Environment Configuration
- [ ] ⏳ Review all environment variables in Vercel
- [ ] ⏳ Verify production API keys (not test keys)
- [ ] ⏳ Enable Vercel Edge Config (if needed)
- [ ] ⏳ Configure database backups in Supabase:
  - [ ] ⏳ Enable automatic backups (daily)
  - [ ] ⏳ Test backup restoration
- [ ] ⏳ Implement rate limiting:
  - [ ] ⏳ Install: `npm install @upstash/ratelimit`
  - [ ] ⏳ Configure Upstash Redis (free tier)
  - [ ] ⏳ Add rate limit to `/api/generate`: 10 req/hour per IP
  - [ ] ⏳ Add rate limit to `/api/contact`: 5 req/hour per IP
  - [ ] ⏳ Test rate limiting
- [ ] ⏳ Verify CDN headers for Supabase Storage:
  - [ ] ⏳ Cache-Control: max-age=31536000 (configured in Days 3-4)
  - [ ] ⏳ Verify caching works in production
- [ ] ⏳ Set up Vercel security headers:
  - [ ] ⏳ Content-Security-Policy
  - [ ] ⏳ X-Frame-Options
  - [ ] ⏳ X-Content-Type-Options
  - [ ] ⏳ Referrer-Policy
- [ ] ⏳ Test production environment fully

**Acceptance Criteria**:
- Production environment fully configured
- Backups enabled
- Rate limiting working
- Security headers set

---

### Marketing Assets
- [ ] ⏳ Create 3-5 example worksheets (high quality):
  - [ ] ⏳ Grade 1 Addition (easy, animals theme)
  - [ ] ⏳ Grade 3 Multiplication (medium, space theme)
  - [ ] ⏳ Grade 5 Fractions (hard, nature theme)
  - [ ] ⏳ Save as high-res images (for homepage)
- [ ] ⏳ Take screenshots of app:
  - [ ] ⏳ Homepage hero
  - [ ] ⏳ Generation form
  - [ ] ⏳ Processing animation
  - [ ] ⏳ Success page with downloads
  - [ ] ⏳ History page
- [ ] ⏳ Create demo video (optional, 30-60 seconds):
  - [ ] ⏳ Screen recording: full generation flow
  - [ ] ⏳ Add captions/annotations
  - [ ] ⏳ Export as MP4
  - [ ] ⏳ Upload to YouTube (unlisted)
- [ ] ⏳ Create social media assets:
  - [ ] ⏳ OG image (already created in Day 12-14)
  - [ ] ⏳ Twitter card image
  - [ ] ⏳ Product Hunt thumbnail
  - [ ] ⏳ LinkedIn post image
- [ ] ⏳ Write launch copy:
  - [ ] ⏳ Product Hunt tagline (60 chars max)
  - [ ] ⏳ Product Hunt description (260 chars max)
  - [ ] ⏳ Twitter/X launch thread (5-7 tweets)
  - [ ] ⏳ LinkedIn post
  - [ ] ⏳ Reddit post (for relevant subreddits)
  - [ ] ⏳ Hacker News "Show HN" post

**Acceptance Criteria**:
- Example worksheets created
- Screenshots taken
- Launch copy written
- Social assets ready

---

### Pre-Launch Checklist
- [ ] ⏳ Run full regression test (repeat Day 15-16 tests)
- [ ] ⏳ Verify all pages load correctly in production
- [ ] ⏳ Verify all forms work in production
- [ ] ⏳ Verify all links work (no 404s)
- [ ] ⏳ Verify email sending works in production
- [ ] ⏳ Verify analytics tracking in production
- [ ] ⏳ Verify error monitoring in production
- [ ] ⏳ Test generation flow 5 times in production
- [ ] ⏳ Clear any test data from production database
- [ ] ⏳ Review and merge any pending git branches
- [ ] ⏳ Tag release in git: `v1.0.0`
- [ ] ⏳ Document known issues (if any)
- [ ] ⏳ Prepare for launch day support:
  - [ ] ⏳ Clear calendar for launch day
  - [ ] ⏳ Have laptop ready for quick fixes
  - [ ] ⏳ Have phone ready for monitoring

**Acceptance Criteria**:
- Production fully tested
- Test data cleared
- Ready for public traffic

**Day 17-18 Milestone**: ✅ Fully prepared for public launch

---

## Days 19-20: Beta Testing
**Goal**: Validate with real users before public launch
**Duration**: 2 days
**Status**: ⏳ Not Started

### Beta Tester Recruitment
- [ ] ⏳ Create beta tester invite email:
  - [ ] ⏳ Explain purpose of beta test
  - [ ] ⏳ What you're asking them to do
  - [ ] ⏳ How long it will take (15-20 min)
  - [ ] ⏳ Incentive (early access, free Pro features later)
- [ ] ⏳ Recruit from personal network:
  - [ ] ⏳ Email friends who are teachers (target: 3-5)
  - [ ] ⏳ Post in family group chat (target: 2-3)
- [ ] ⏳ Post in education communities:
  - [ ] ⏳ r/Teachers subreddit
  - [ ] ⏳ r/homeschool subreddit
  - [ ] ⏳ Teaching Facebook groups (2-3 groups)
  - [ ] ⏳ Twitter/X (education hashtags)
- [ ] ⏳ Target: 10-15 beta testers total
- [ ] ⏳ Track responses (who accepted, contact info)
- [ ] ⏳ Send access link + instructions to accepted testers

**Acceptance Criteria**:
- 10+ beta testers recruited
- Invites sent
- Instructions clear

---

### Beta Testing Preparation
- [ ] ⏳ Create beta testing guide:
  - [ ] ⏳ Welcome message
  - [ ] ⏳ What to test (generate 2-3 worksheets)
  - [ ] ⏳ What feedback you're looking for
  - [ ] ⏳ How to report bugs (email or form)
  - [ ] ⏳ Timeline (test by X date)
- [ ] ⏳ Create feedback survey (Google Forms or Typeform):
  - [ ] ⏳ "How easy was it to generate a worksheet?" (1-5)
  - [ ] ⏳ "How was the quality of the worksheets?" (1-5)
  - [ ] ⏳ "How likely are you to use this regularly?" (1-10)
  - [ ] ⏳ "What did you like most?"
  - [ ] ⏳ "What needs improvement?"
  - [ ] ⏳ "Any bugs or issues?"
  - [ ] ⏳ "Would you recommend to colleagues?" (Yes/No/Maybe)
  - [ ] ⏳ "Can we use your feedback as a testimonial?" (Yes/No)
  - [ ] ⏳ Open-ended: "Any other thoughts?"
- [ ] ⏳ Create bug reporting form:
  - [ ] ⏳ Name
  - [ ] ⏳ Email
  - [ ] ⏳ What happened
  - [ ] ⏳ What you expected
  - [ ] ⏳ Steps to reproduce
  - [ ] ⏳ Screenshot upload (optional)
- [ ] ⏳ Enable analytics cohort for beta testers (track separately)

**Acceptance Criteria**:
- Testing guide created
- Feedback survey ready
- Bug form ready

---

### Conduct Beta Testing
- [ ] ⏳ Send invites to all beta testers
- [ ] ⏳ Monitor beta tester activity (analytics dashboard)
- [ ] ⏳ Check for error spikes in Sentry
- [ ] ⏳ Respond to beta tester questions quickly (<2 hours)
- [ ] ⏳ Fix any critical bugs immediately
- [ ] ⏳ Follow up with testers who haven't started (after 24h)
- [ ] ⏳ Send reminder to complete feedback survey (after 48h)
- [ ] ⏳ Track completion rate (target: 80%)

**Acceptance Criteria**:
- 8+ testers complete testing
- Feedback surveys submitted
- Bugs reported and tracked

---

### Analyze Feedback & Iterate
- [ ] ⏳ Review all feedback survey responses
- [ ] ⏳ Calculate average ratings:
  - [ ] ⏳ Ease of use score
  - [ ] ⏳ Quality score
  - [ ] ⏳ Likelihood to use score (NPS)
- [ ] ⏳ Identify common themes in feedback:
  - [ ] ⏳ What users loved
  - [ ] ⏳ What confused users
  - [ ] ⏳ Feature requests
- [ ] ⏳ Prioritize issues:
  - [ ] ⏳ Critical bugs (must fix before launch)
  - [ ] ⏳ Important improvements (fix before launch if time)
  - [ ] ⏳ Nice-to-haves (post-launch)
- [ ] ⏳ Fix critical bugs:
  - [ ] ⏳ [List bugs found during beta - fill in as found]
- [ ] ⏳ Make important improvements:
  - [ ] ⏳ [List improvements - fill in based on feedback]
- [ ] ⏳ Document post-launch feature requests
- [ ] ⏳ Adjust messaging if users found anything confusing

**Acceptance Criteria**:
- All critical bugs fixed
- Important improvements made
- Ready for public launch

---

### Testimonial Gathering
- [ ] ⏳ Review feedback for positive quotes
- [ ] ⏳ Contact beta testers who gave permission for testimonials
- [ ] ⏳ Request permission to use specific quotes
- [ ] ⏳ Ask if they want to be named or anonymous
- [ ] ⏳ Request video testimonial from 1-2 enthusiastic testers (optional)
- [ ] ⏳ Collect testimonials (target: 3-5 good quotes)
- [ ] ⏳ Add testimonials to homepage
- [ ] ⏳ Use testimonials in launch posts

**Acceptance Criteria**:
- 3+ testimonials collected
- Testimonials added to homepage
- Permission confirmed for all quotes

---

### Final Pre-Launch Testing
- [ ] ⏳ Test all fixes made during beta
- [ ] ⏳ Run smoke test (key user flows)
- [ ] ⏳ Verify production environment stable
- [ ] ⏳ Check analytics still working
- [ ] ⏳ Check error monitoring still working
- [ ] ⏳ Test from fresh device (clear cache)
- [ ] ⏳ Final decision: Go or No-Go for launch

**Acceptance Criteria**:
- All fixes tested
- Production stable
- Go decision made

**Day 19-20 Milestone**: ✅ Beta tested, feedback incorporated, ready for public launch

---

## Day 21: Public Launch
**Goal**: Launch to the world
**Duration**: 1 day
**Status**: ⏳ Not Started

### Final Deployment
- [ ] ⏳ Merge all pending PRs to main branch
- [ ] ⏳ Run final test suite
- [ ] ⏳ Create git tag: `v1.0.0`
- [ ] ⏳ Deploy to production (Vercel)
- [ ] ⏳ Verify deployment successful
- [ ] ⏳ Run production smoke test:
  - [ ] ⏳ Visit homepage
  - [ ] ⏳ Generate worksheet
  - [ ] ⏳ Download worksheet
  - [ ] ⏳ Sign up
  - [ ] ⏳ View history
  - [ ] ⏳ Log out
- [ ] ⏳ Clear any beta test data from production
- [ ] ⏳ Set up monitoring dashboard (open in separate window)
- [ ] ⏳ Enable real-time error alerts (Sentry, email)

**Acceptance Criteria**:
- Production deployed
- All systems green
- Monitoring active

---

### Launch Announcements (Morning)
- [ ] ⏳ **Product Hunt Launch (12:01 AM PT)**:
  - [ ] ⏳ Submit product (use prepared assets)
  - [ ] ⏳ Add tagline, description, images
  - [ ] ⏳ Add demo video link
  - [ ] ⏳ Add maker comment (first comment)
  - [ ] ⏳ Respond to comments throughout day (<30 min response time)
  - [ ] ⏳ Ask friends to upvote (within PH rules)
- [ ] ⏳ **Twitter/X Launch (8:00 AM)**:
  - [ ] ⏳ Post launch thread (use prepared copy)
  - [ ] ⏳ Include screenshots and demo video
  - [ ] ⏳ Use hashtags: #EdTech #Teachers #Education #AI
  - [ ] ⏳ Tag relevant accounts (education influencers)
  - [ ] ⏳ Pin tweet to profile
- [ ] ⏳ **LinkedIn Post (9:00 AM)**:
  - [ ] ⏳ Post launch announcement (professional tone)
  - [ ] ⏳ Share in relevant groups (education tech)
  - [ ] ⏳ Ask connections to share
- [ ] ⏳ **Hacker News "Show HN" (10:00 AM)**:
  - [ ] ⏳ Post: "Show HN: AI Math Worksheet Generator"
  - [ ] ⏳ Use prepared description
  - [ ] ⏳ Respond to comments honestly and quickly

**Acceptance Criteria**:
- All announcements posted on schedule
- Monitoring social media mentions

---

### Community Outreach (Afternoon)
- [ ] ⏳ **Reddit Posts**:
  - [ ] ⏳ r/SideProject: "I built an AI math worksheet generator"
  - [ ] ⏳ r/Teachers: "Free AI tool for generating math worksheets"
  - [ ] ⏳ r/homeschool: "Math worksheet generator for homeschoolers"
  - [ ] ⏳ Follow subreddit rules (check self-promotion policies)
  - [ ] ⏳ Respond to comments and questions
- [ ] ⏳ **Education Forums**:
  - [ ] ⏳ Post in 2-3 teaching forums
  - [ ] ⏳ Provide value (not just promotion)
  - [ ] ⏳ Answer questions about tool
- [ ] ⏳ **Email Beta Testers**:
  - [ ] ⏳ Send "We're Live!" email
  - [ ] ⏳ Thank them for their help
  - [ ] ⏳ Ask them to share with colleagues
  - [ ] ⏳ Mention any special early adopter perks

**Acceptance Criteria**:
- All communities reached
- Engagement happening
- Traffic flowing to site

---

### Directory Submissions
- [ ] ⏳ Submit to Free Tools Directory (freetoolshub.com)
- [ ] ⏳ Submit to Product Hunt alternatives lists
- [ ] ⏳ Submit to Awesome Education list (GitHub)
- [ ] ⏳ Submit to Teaching Resources directories (3-5)
- [ ] ⏳ Submit to AI Tools directories (3-5)
- [ ] ⏳ Update personal portfolio/website with project
- [ ] ⏳ Add to LinkedIn projects
- [ ] ⏳ Add to GitHub profile (if applicable)

**Acceptance Criteria**:
- Submitted to 10+ directories
- Links tracked for referrals

---

### Active Monitoring & Support (All Day)
- [ ] ⏳ Monitor error dashboard (Sentry) every 30 minutes
- [ ] ⏳ Monitor analytics (Plausible/Posthog) every hour
- [ ] ⏳ Track key launch metrics:
  - [ ] ⏳ Unique visitors
  - [ ] ⏳ Sign ups
  - [ ] ⏳ Worksheet generations
  - [ ] ⏳ Error rate
  - [ ] ⏳ Social media engagement
- [ ] ⏳ Respond to all social media comments (<30 min)
- [ ] ⏳ Respond to all support emails (<1 hour)
- [ ] ⏳ Fix any critical bugs immediately
- [ ] ⏳ Deploy hotfixes if needed
- [ ] ⏳ Document any issues for post-launch improvements

**Acceptance Criteria**:
- Actively monitoring all channels
- Quick response to issues
- Engaging with users

---

### End-of-Day Launch Review
- [ ] ⏳ Compile launch day statistics:
  - [ ] ⏳ Total visitors
  - [ ] ⏳ Total sign ups
  - [ ] ⏳ Total generations
  - [ ] ⏳ Conversion rate (visitor → generation)
  - [ ] ⏳ Error rate
  - [ ] ⏳ Product Hunt rank
  - [ ] ⏳ Social media engagement (likes, shares, comments)
- [ ] ⏳ Screenshot notable achievements (high traffic spike, good feedback)
- [ ] ⏳ Post launch day recap on Twitter/LinkedIn
- [ ] ⏳ Thank everyone who supported the launch
- [ ] ⏳ Review feedback and bug reports
- [ ] ⏳ Create priority list for post-launch improvements
- [ ] ⏳ Celebrate! 🎉

**Acceptance Criteria**:
- Launch day complete
- Statistics compiled
- Post-launch priorities identified

**Day 21 Milestone**: 🚀 Successfully launched to the public!

---

## Post-Launch: Week 4-6 Plan

### Week 4: Stabilization & Initial Feedback
**Goal**: Monitor, support, gather data

#### Daily Tasks
- [ ] ⏳ Check error logs (morning & evening)
- [ ] ⏳ Review user feedback and support requests
- [ ] ⏳ Respond to all support within 24 hours
- [ ] ⏳ Monitor key metrics dashboard
- [ ] ⏳ Engage with users on social media

#### Weekly Tasks
- [ ] ⏳ Fix critical bugs as they're discovered
- [ ] ⏳ Weekly metrics review:
  - [ ] ⏳ New users
  - [ ] ⏳ Total generations
  - [ ] ⏳ Return rate (users who come back)
  - [ ] ⏳ Error rate
  - [ ] ⏳ Costs (actual vs. projected)
- [ ] ⏳ Compile user feedback themes
- [ ] ⏳ Plan next improvements based on feedback

**Week 4 Success Criteria**:
- [ ] ⏳ 100+ registered users
- [ ] ⏳ 500+ total generations
- [ ] ⏳ <5% error rate
- [ ] ⏳ 4+ star average rating (from feedback)

---

### Week 5-6: Iterate & Grow
**Goal**: Implement top requested features, grow user base

#### Feature Improvements (Choose 3-5 based on feedback)
- [ ] ⏳ Add more themes (based on requests)
- [ ] ⏳ Add more topics (based on requests)
- [ ] ⏳ Improve generation speed
- [ ] ⏳ Add worksheet preview before download
- [ ] ⏳ Add "Save as Favorite" feature
- [ ] ⏳ Add sharing feature (share worksheet with colleagues)
- [ ] ⏳ Improve mobile experience (based on feedback)
- [ ] ⏳ Add export formats (PNG in addition to PDF?)
- [ ] ⏳ Add "Print-friendly" view

#### Content & SEO (Drive organic traffic)
- [ ] ⏳ Write blog post: "10 Ways to Use AI Worksheets in Your Classroom"
- [ ] ⏳ Write blog post: "Common Core Math Standards by Grade"
- [ ] ⏳ Write blog post: "How to Differentiate Math Instruction"
- [ ] ⏳ Create example worksheet library (50+ examples)
- [ ] ⏳ Optimize for SEO keywords: "math worksheets", "printable math", etc
- [ ] ⏳ Submit to more directories (50+ total)

#### Growth Tactics
- [ ] ⏳ Email beta users for testimonials (if not already)
- [ ] ⏳ Create case study with a beta tester
- [ ] ⏳ Reach out to education influencers
- [ ] ⏳ Guest post on education blogs
- [ ] ⏳ Create shareable social media graphics
- [ ] ⏳ Run small Twitter/Facebook ad test ($50-100 budget)

**Week 5-6 Success Criteria**:
- [ ] ⏳ 200+ total users
- [ ] ⏳ 1000+ total generations
- [ ] ⏳ 20%+ return rate (users who come back)
- [ ] ⏳ 60%+ conversion (visitor → generation)
- [ ] ⏳ 3+ blog posts published
- [ ] ⏳ Organic traffic growing (Google Search Console)

---

## Progress Tracking

### Overall Completion
- **Phase 0**: 27/27 tasks (100%) ✅ COMPLETE
- **Days 1-2**: 31/47 tasks (66%) ✅ INFRASTRUCTURE COMPLETE (16 tasks blocked on manual Supabase setup)
- **Days 3-4**: 0/65 tasks (0%)
- **Days 5-7**: 0/75 tasks (0%)
- **Days 8-9**: 0/37 tasks (0%)
- **Days 10-11**: 0/30 tasks (0%)
- **Days 12-14**: 0/53 tasks (0%)
- **Days 15-16**: 0/80 tasks (0%)
- **Days 17-18**: 0/66 tasks (0%)
- **Days 19-20**: 0/37 tasks (0%)
- **Day 21**: 0/42 tasks (0%)
- **Week 4**: 0/10 tasks (0%)
- **Week 5-6**: 0/24 tasks (0%)

**Total**: 58/593 tasks completed (10%) ✅ Phase 0 + Infrastructure Complete

---

## How to Use This Document

### Daily Workflow
1. Open this file at start of work session
2. Find today's phase/day section
3. Mark current task as 🔄 In Progress
4. Complete task
5. Mark task as ✅ Completed
6. Move to next task
7. Update progress tracking at end of day

### If Interrupted
1. Note which task you were on (mark as 🔄)
2. Add any context in comments (if needed)
3. When resuming, search for 🔄 to find where you left off
4. Continue from that task

### Task Symbols
- `[ ]` → Not started yet
- `[x]` → Completed (when marking done)
- Add emoji indicators as needed:
  - ⏳ Not Started
  - 🔄 In Progress
  - ✅ Completed
  - ⚠️ Blocked
  - ⏭️ Skipped

### Making Changes
- If you skip a task, mark it as ⏭️ and explain why
- If you add tasks, append to the relevant section
- If you change approach, update tasks and document decision
- Keep "Last Updated" date current

---

## Quick Navigation
- [Phase 0: Pre-Development](#phase-0-pre-development-day-0)
- [Days 1-2: Project Infrastructure](#days-1-2-project-infrastructure)
- [Days 3-4: Core Generation Pipeline](#days-3-4-core-generation-pipeline)
- [Days 5-7: Basic Frontend UI](#days-5-7-basic-frontend-ui)
- [Days 8-9: Authentication](#days-8-9-authentication)
- [Days 10-11: Generation History](#days-10-11-generation-history)
- [Days 12-14: UX Polish & Quality](#days-12-14-ux-polish--quality)
- [Days 15-16: Comprehensive Testing](#days-15-16-comprehensive-testing)
- [Days 17-18: Launch Preparation](#days-17-18-launch-preparation)
- [Days 19-20: Beta Testing](#days-19-20-beta-testing)
- [Day 21: Public Launch](#day-21-public-launch)
- [Post-Launch Plan](#post-launch-week-4-6-plan)

---

**Last Updated**: 2025-10-30 (Phase 1 Days 1-2 Infrastructure Complete)
**Current Status**: ✅ Infrastructure Complete - ⚠️ Blocked on Manual Supabase Setup
**Next Action**: Complete manual Supabase setup (docs/SUPABASE-SETUP-GUIDE.md) OR proceed to Days 3-4 with mock data

**Recent Changes**:
- ✅ Phase 1 Days 1-2 infrastructure completed (31/47 tasks - 66%)
- ✅ Next.js 14.0.1 initialized with TypeScript, Tailwind CSS, App Router
- ✅ Prisma ORM configured with complete database schema (users + generations tables)
- ✅ Supabase client libraries installed and configured
- ✅ All core dependencies installed: AI SDK, validation, forms, state, PDF generation
- ✅ Comprehensive Supabase setup guide created (docs/SUPABASE-SETUP-GUIDE.md)
- ✅ Environment variable templates created (.env.local.example)
- ✅ Development server tested and running (localhost:3000)
- ✅ Committed to GitHub (commit: 9f97f37)
- ⚠️ 16 tasks blocked on manual Supabase setup (15-20 min required)
- 📊 Progress: 58/593 total tasks (10%)
