import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

interface SuccessPageProps {
  params: Promise<{ id: string }>;
}

export default async function SuccessPage({ params }: SuccessPageProps) {
  const { id } = await params;

  const generation = await prisma.generation.findUnique({
    where: { id },
    select: {
      id: true,
      status: true,
      gradeLevel: true,
      topic: true,
      difficulty: true,
      problemCount: true,
      visualTheme: true,
      worksheetPdfUrl: true,
      answerKeyPdfUrl: true,
      tokenUsage: true,
      createdAt: true,
    },
  });

  if (!generation) {
    notFound();
  }

  if (generation.status !== 'completed') {
    // Redirect back to processing if not complete
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Worksheet Not Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Your worksheet is still being generated.</p>
            <Link href={`/generate/${id}/processing`}>
              <Button>Back to Processing</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">Worksheet Ready!</h1>
        <p className="mt-2 text-muted-foreground">
          Your worksheet has been generated successfully
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Worksheet</CardTitle>
          <CardDescription>
            Grade {generation.gradeLevel} • {generation.topic} • {generation.difficulty} difficulty
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Worksheet Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Problems</div>
              <div className="text-2xl font-bold">{generation.problemCount}</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Theme</div>
              <div className="text-2xl font-bold capitalize">{generation.visualTheme}</div>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="space-y-3">
            <h3 className="font-semibold">Download Your Files</h3>

            {generation.worksheetPdfUrl && (
              <a
                href={generation.worksheetPdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button size="lg" className="w-full">
                  <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Worksheet
                </Button>
              </a>
            )}

            {generation.answerKeyPdfUrl && (
              <a
                href={generation.answerKeyPdfUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button size="lg" variant="outline" className="w-full">
                  <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Answer Key
                </Button>
              </a>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row">
            <Link href="/generate" className="flex-1">
              <Button variant="outline" className="w-full">
                Generate Another Worksheet
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button variant="ghost" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Generation Details */}
          <div className="rounded-lg bg-muted p-4 text-sm">
            <div className="mb-2 font-semibold">Generation Details</div>
            <div className="space-y-1 text-muted-foreground">
              <div>ID: {generation.id}</div>
              <div>Created: {new Date(generation.createdAt).toLocaleString()}</div>
              {generation.tokenUsage && (
                <div>Tokens Used: {generation.tokenUsage.toLocaleString()}</div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
