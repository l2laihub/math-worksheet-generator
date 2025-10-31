'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const STATUS_MESSAGES = [
  { text: 'Analyzing grade-level standards...', icon: '📚' },
  { text: 'Generating math problems...', icon: '🧮' },
  { text: 'Creating visual aids...', icon: '🎨' },
  { text: 'Building worksheet layout...', icon: '📄' },
  { text: 'Finalizing answer key...', icon: '✅' },
  { text: 'Almost done...', icon: '⚡' },
];

export default function ProcessingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [messageIndex, setMessageIndex] = useState(0);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Rotate status messages every 3 seconds
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 3000);

    // Simulate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 3;
      });
    }, 500);

    // Poll for completion every 2 seconds
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/generation/${id}`);
        if (response.ok) {
          const data = await response.json();

          if (data.status === 'completed') {
            setProgress(100);
            clearInterval(pollInterval);
            clearInterval(messageInterval);
            clearInterval(progressInterval);

            // Small delay to show 100% completion
            setTimeout(() => {
              router.push(`/generate/${id}/success`);
            }, 500);
          } else if (data.status === 'failed') {
            clearInterval(pollInterval);
            clearInterval(messageInterval);
            clearInterval(progressInterval);
            router.push(`/generate/${id}/error`);
          }
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 2000);

    // Timeout after 90 seconds
    const timeout = setTimeout(() => {
      setTimeoutReached(true);
      clearInterval(pollInterval);
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    }, 90000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(pollInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [id, router]);

  if (timeoutReached) {
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
            <CardTitle className="text-center text-destructive">Generation Timeout</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-6 text-muted-foreground">
              The worksheet generation is taking longer than expected. Please try again.
            </p>
            <Button
              onClick={() => router.push('/generate')}
              className="w-full"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentMessage = STATUS_MESSAGES[messageIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card
          className={`overflow-hidden border-2 shadow-2xl transition-all duration-700 ${
            mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
          }`}
        >
          <CardHeader className="space-y-1 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 pb-8">
            <div className="mb-4 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                Processing
              </div>
            </div>
            <CardTitle className="text-center text-2xl sm:text-3xl">
              Generating Your Worksheet
            </CardTitle>
            <p className="text-center text-sm text-muted-foreground">
              This usually takes 10-30 seconds
            </p>
          </CardHeader>

          <CardContent className="space-y-8 p-6 sm:p-8">
            {/* Animated Icon */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Outer rotating ring */}
                <div className="absolute inset-0 -m-4">
                  <div className="h-32 w-32 animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
                </div>

                {/* Middle pulsing ring */}
                <div className="absolute inset-0 -m-2">
                  <div className="h-28 w-28 animate-pulse rounded-full border-4 border-primary/10"></div>
                </div>

                {/* Center icon */}
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg">
                  <span className="text-5xl animate-bounce">{currentMessage.icon}</span>
                </div>

                {/* Orbiting dots */}
                <div className="absolute inset-0 -m-6 animate-spin" style={{ animationDuration: '3s' }}>
                  <div className="relative h-36 w-36">
                    <div className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-lg"></div>
                    <div className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-lg"></div>
                    <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-lg"></div>
                    <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Message */}
            <div className="space-y-2 text-center">
              <p
                key={messageIndex}
                className="text-lg font-medium animate-in fade-in slide-in-from-bottom-2 duration-500"
              >
                {currentMessage.text}
              </p>
              <div className="flex justify-center gap-1">
                {STATUS_MESSAGES.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === messageIndex
                        ? 'w-8 bg-primary'
                        : index < messageIndex
                        ? 'bg-primary/50'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/80 shadow-lg transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                >
                  <div className="h-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress</span>
                <span className="font-medium text-primary">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  💡
                </div>
                <div>
                  <p className="text-sm font-medium">Did you know?</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Our AI generates unique problems tailored to your specifications, ensuring no two worksheets are exactly alike!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div
          className={`mt-6 text-center text-sm text-muted-foreground transition-all duration-700 delay-300 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p>Powered by Claude AI • Standards-Aligned Content</p>
        </div>
      </div>
    </div>
  );
}
