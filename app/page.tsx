import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section - Mobile First */}
      <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col items-center space-y-6 text-center">
          {/* Headline */}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            AI-Powered Math Worksheets
            <br className="hidden sm:inline" />
            {' '}<span className="text-primary">in Seconds</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-[600px] text-base text-muted-foreground sm:text-lg md:text-xl">
            Generate custom, standards-aligned math worksheets with engaging visual themes for grades 1-6
          </p>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/generate">Generate Worksheet</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid w-full grid-cols-3 gap-4 text-center sm:gap-8">
            <div>
              <div className="text-2xl font-bold sm:text-3xl">78</div>
              <div className="text-xs text-muted-foreground sm:text-sm">Topics</div>
            </div>
            <div>
              <div className="text-2xl font-bold sm:text-3xl">6</div>
              <div className="text-xs text-muted-foreground sm:text-sm">Grades</div>
            </div>
            <div>
              <div className="text-2xl font-bold sm:text-3xl">5</div>
              <div className="text-xs text-muted-foreground sm:text-sm">Themes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Everything You Need
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base md:text-lg">
              Professional worksheets with all the features teachers love
            </p>
          </div>

          {/* Features Grid - Mobile First */}
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <Card className="border-2">
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:h-12 sm:w-12">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl">Standards-Aligned</CardTitle>
                <CardDescription className="text-sm">
                  Common Core aligned for grades 1-6
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2">
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:h-12 sm:w-12">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl">Engaging Themes</CardTitle>
                <CardDescription className="text-sm">
                  Animals, Space, Food, Nature & more
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2">
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:h-12 sm:w-12">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl">Answer Keys</CardTitle>
                <CardDescription className="text-sm">
                  Complete answer keys for easy grading
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2">
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:h-12 sm:w-12">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl">Instant Generation</CardTitle>
                <CardDescription className="text-sm">
                  Get worksheets in seconds, not hours
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 5 */}
            <Card className="border-2">
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:h-12 sm:w-12">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl">Fully Customizable</CardTitle>
                <CardDescription className="text-sm">
                  Grade, topic, difficulty & problem count
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 6 */}
            <Card className="border-2">
              <CardHeader className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:h-12 sm:w-12">
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                </div>
                <CardTitle className="text-lg sm:text-xl">Print-Ready PDFs</CardTitle>
                <CardDescription className="text-sm">
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
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs text-muted-foreground sm:text-sm">
              © 2025 Math Worksheet Generator. Powered by Claude AI.
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-xs text-muted-foreground hover:text-primary sm:text-sm">
                Privacy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-primary sm:text-sm">
                Terms
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-primary sm:text-sm">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-muted-foreground">
            Icons by OpenMoji (CC BY-SA 4.0)
          </div>
        </div>
      </footer>
    </div>
  );
}
