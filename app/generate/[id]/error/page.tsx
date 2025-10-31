'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GenerationData {
  id: string;
  status: string;
  errorMessage?: string;
  createdAt: string;
}

export default function ErrorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [generationData, setGenerationData] = useState<GenerationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenerationData() {
      try {
        const response = await fetch(`/api/generation/${id}`);
        if (response.ok) {
          const data = await response.json();
          setGenerationData(data);
        }
      } catch (error) {
        console.error('Failed to fetch generation data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchGenerationData();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <svg className="h-8 w-8 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <CardTitle className="text-center text-destructive">Generation Failed</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-muted-foreground">
            We encountered an error while generating your worksheet.
          </p>
          
          {generationData?.errorMessage && (
            <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-left">
              <p className="text-sm font-medium text-destructive mb-2">Error Details:</p>
              <p className="text-xs text-muted-foreground font-mono break-words">
                {generationData.errorMessage}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Generation ID: {id}
              </p>
            </div>
          )}
          
          {loading && (
            <div className="mb-6 text-sm text-muted-foreground">
              Loading error details...
            </div>
          )}
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/generate')}
              className="w-full"
            >
              Create New Worksheet
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/')}
              className="w-full"
            >
              Return Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}