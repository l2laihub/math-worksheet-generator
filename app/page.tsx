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
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-100 via-purple-50 to-transparent rounded-full blur-3xl opacity-60" />
        </div>

        <div className="flex flex-col items-center space-y-6 text-center">
          {/* Headline */}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 via-blue-800 to-blue-600 bg-clip-text text-transparent">
            AI-Powered Math Worksheets
            <br className="hidden sm:inline" />
            {' '}<span className="text-primary">in Seconds</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-[600px] text-base text-gray-700 sm:text-lg md:text-xl">
            Generate custom math worksheets aligned with <span className="font-semibold text-blue-600">Common Core Standards</span> - featuring engaging themes and visual aids for grades 1-6
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
              <div className="text-xs text-gray-600 sm:text-sm">CC Standards</div>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-md border border-gray-200">
              <div className="text-2xl font-bold sm:text-3xl text-blue-600">52+</div>
              <div className="text-xs text-gray-600 sm:text-sm">Topics</div>
            </div>
            <div className="p-4 rounded-lg bg-white shadow-md border border-gray-200">
              <div className="text-2xl font-bold sm:text-3xl text-blue-600">5</div>
              <div className="text-xs text-gray-600 sm:text-sm">Themes</div>
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
