import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* Hero Section - Mobile First */}
      <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        {/* Gradient background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-full blur-3xl opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/60 to-purple-900/50" />
        </div>

        <div className="flex flex-col items-center space-y-6 text-center">
          {/* Headline */}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg">
            AI-Powered Math Worksheets
            <br className="hidden sm:inline" />
            {' '}<span className="text-blue-200">in Seconds</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-[600px] text-base text-white/90 sm:text-lg md:text-xl drop-shadow-md">
            Generate custom math worksheets fully aligned with <span className="font-semibold text-blue-200">Common Core State Standards (CCSS)</span> - featuring research-based pedagogical tools and engaging themes for grades K-6, trusted by educators nationwide
          </p>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl hover:scale-105 transition-all" asChild>
              <Link href="/generate">Generate Worksheet</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto hover:bg-accent hover:scale-105 transition-all" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid w-full grid-cols-3 gap-4 text-center sm:gap-8">
            <div className="p-4 rounded-lg bg-white shadow-md border border-gray-200">
              <div className="text-2xl font-bold sm:text-3xl text-blue-600">73+</div>
              <div className="text-xs text-gray-600 sm:text-sm">CCSS Standards</div>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-md border border-gray-200">
              <div className="text-2xl font-bold sm:text-3xl text-green-600">K-6</div>
              <div className="text-xs text-gray-600 sm:text-sm">Grade Coverage</div>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-md border border-gray-200">
              <div className="text-2xl font-bold sm:text-3xl text-purple-600">100%</div>
              <div className="text-xs text-gray-600 sm:text-sm">Aligned</div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Standards Section */}
      <section className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Fully Aligned with Educational Standards
            </h2>
            <p className="mt-3 text-sm text-gray-600 sm:text-base md:text-lg">
              Supporting educators with curriculum-compliant worksheets
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Common Core Standards */}
            <Card className="border-2 border-blue-200 bg-white hover:shadow-lg hover:scale-105 transition-all duration-200">
              <CardHeader className="space-y-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl text-gray-900">Common Core State Standards</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  73+ standards across all K-6 mathematical domains including Operations & Algebraic Thinking, Number & Operations, Measurement & Data, and Geometry - adopted by 41+ states nationwide
                </CardDescription>
              </CardHeader>
            </Card>
            
            {/* Nationwide Coverage */}
            <Card className="border-2 border-green-200 bg-white hover:shadow-lg hover:scale-105 transition-all duration-200">
              <CardHeader className="space-y-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl text-gray-900">Nationwide Coverage</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Trusted by educators across the United States with curriculum-compliant worksheets that meet state and federal mathematics standards
                </CardDescription>
              </CardHeader>
            </Card>
            
            {/* Research-Based Tools */}
            <Card className="border-2 border-purple-200 bg-white hover:shadow-lg hover:scale-105 transition-all duration-200">
              <CardHeader className="space-y-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl text-gray-900">Research-Based Tools</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  10+ mathematical tools including base ten blocks, ten frames, and visual models recommended by educational research and best practices
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          {/* Standards Compliance Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-md border border-blue-200">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              CCSS Aligned
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-md border border-green-200">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Nationwide Standards
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-purple-700 shadow-md border border-purple-200">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Research-Based Pedagogy
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-orange-700 shadow-md border border-orange-200">
              <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Educator Approved
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gradient-to-b from-white to-blue-50/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Everything You Need
            </h2>
            <p className="mt-3 text-sm text-gray-600 sm:text-base md:text-lg">
              Professional worksheets with all the features teachers love
            </p>
          </div>

          {/* Features Grid - Mobile First */}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border-2 border-gray-200 bg-white hover:shadow-lg hover:scale-105 transition-all duration-200">
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md sm:h-12 sm:w-12 overflow-hidden">
                  <svg className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 max-h-6 max-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl text-gray-900">Common Core Aligned</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  73+ standards across K-6 domains with automatic grade-level targeting
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 border-gray-200 bg-white hover:shadow-lg hover:scale-105 transition-all duration-200">
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md sm:h-12 sm:w-12 overflow-hidden">
                  <svg className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 max-h-6 max-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl text-gray-900">Engaging Themes</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Animals, Space, Food, Nature & more
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 border-gray-200 bg-white hover:shadow-lg hover:scale-105 transition-all duration-200">
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md sm:h-12 sm:w-12 overflow-hidden">
                  <svg className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 max-h-6 max-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl text-gray-900">Answer Keys</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Complete answer keys for easy grading
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2 border-gray-200 bg-white hover:shadow-lg hover:scale-105 transition-all duration-200">
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 text-white shadow-md sm:h-12 sm:w-12 overflow-hidden">
                  <svg className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 max-h-6 max-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl text-gray-900">Instant Generation</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Get worksheets in seconds, not hours
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 5 */}
            <Card className="border-2 border-gray-200 bg-white hover:shadow-lg hover:scale-105 transition-all duration-200">
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md sm:h-12 sm:w-12 overflow-hidden">
                  <svg className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 max-h-6 max-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl text-gray-900">Fully Customizable</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Grade, topic, difficulty & problem count
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 6 */}
            <Card className="border-2 border-gray-200 bg-white hover:shadow-lg hover:scale-105 transition-all duration-200">
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md sm:h-12 sm:w-12 overflow-hidden">
                  <svg className="h-5 w-5 shrink-0 sm:h-6 sm:w-6 max-h-6 max-w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl text-gray-900">Print-Ready PDFs</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Professional PDFs ready to print
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/generate">Start Generating Worksheets</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Educational Benefits Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Built for Educators, by Educators
            </h2>
            <p className="mt-3 text-sm text-gray-600 sm:text-base md:text-lg max-w-2xl mx-auto">
              Every feature designed to support effective mathematics instruction and student learning
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Standards Compliance */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Standards Compliance</h3>
              <p className="text-sm text-gray-600">
                Automatic alignment with state and federal standards. Every worksheet meets Common Core State Standards and nationwide curriculum requirements.
              </p>
            </div>
            
            {/* Differentiated Instruction */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Differentiated Instruction</h3>
              <p className="text-sm text-gray-600">
                Multiple representation types (concrete, pictorial, abstract) and scaffolding levels for all learners.
              </p>
            </div>
            
            {/* Assessment Ready */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Assessment Ready</h3>
              <p className="text-sm text-gray-600">
                Built-in answer keys, learning objectives, and progress tracking tools for effective assessment.
              </p>
            </div>
            
            {/* Professional Development */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Development</h3>
              <p className="text-sm text-gray-600">
                Evidence-based teaching strategies and tool usage examples to enhance your instructional practice.
              </p>
            </div>
          </div>
          
          {/* Teaching Methods Highlight */}
          <div className="mt-16 rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Research-Based Teaching Methods</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                <div className="flex items-center gap-2 text-green-700">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Concrete-Pictorial-Abstract (CPA) Approach
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guided Math Instruction
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mathematical Problem Solving Strategies
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Visual Mathematical Models
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Metacognitive Reflection Prompts
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Differentiated Scaffolding Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs text-gray-600 sm:text-sm">
              © 2025 Math Worksheet Generator. Powered by Claude AI.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-xs text-gray-600 hover:text-blue-600 sm:text-sm">
                Privacy
              </Link>
              <Link href="#" className="text-xs text-gray-600 hover:text-blue-600 sm:text-sm">
                Terms
              </Link>
              <Link href="#" className="text-xs text-gray-600 hover:text-blue-600 sm:text-sm">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500">
            Icons by OpenMoji (CC BY-SA 4.0)
          </div>
        </div>
      </footer>
    </div>
  );
}
