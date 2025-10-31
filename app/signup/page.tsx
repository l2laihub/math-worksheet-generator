'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-muted-foreground">
            Sign up functionality is coming soon! For now, you can use all features without an account.
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => router.push('/generate')}
              className="w-full"
            >
              Start Creating Worksheets
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