'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { THEMES, DIFFICULTIES, getTopicsForGrade, type GradeLevel } from '@/lib/constants/topics';

const formSchema = z.object({
  gradeLevel: z.number().min(1).max(6),
  topic: z.string().min(1, 'Please select a topic'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  problemCount: z.number().min(5).max(20),
  visualTheme: z.enum(['animals', 'space', 'food', 'nature', 'other']),
});

type FormValues = z.infer<typeof formSchema>;

export default function GeneratePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gradeLevel: 3,
      topic: 'multiplication-basic',
      difficulty: 'medium',
      problemCount: 10,
      visualTheme: 'animals',
    },
  });

  const availableTopics = getTopicsForGrade(selectedGrade);

  // Set default topic when grade changes
  const handleGradeChange = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    const topics = getTopicsForGrade(grade);
    if (topics.length > 0) {
      form.setValue('topic', topics[0].id);
    }
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate worksheet');
      }

      const data = await response.json();

      // Redirect to processing page
      router.push(`/generate/${data.id}/processing`);

    } catch (error) {
      console.error('Generation error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate worksheet');
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto max-w-5xl px-4 py-8 sm:py-12">
        {/* Header Section with Animation */}
        <div
          className={`mb-8 text-center transition-all duration-700 ${
            mounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            AI-Powered Generation
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
            Generate Your Worksheet
          </h1>
          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            Customize your math worksheet with the options below
          </p>
        </div>

        {/* Form Card with Animations */}
        <Card
          className={`overflow-hidden border-2 bg-white shadow-2xl transition-all duration-700 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <CardHeader className="space-y-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardTitle className="text-xl sm:text-2xl text-white">Worksheet Options</CardTitle>
            <CardDescription className="text-sm sm:text-base text-blue-50">
              Select the grade level, topic, and difficulty for your worksheet
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">

                {/* Grade & Topic - Side by Side on Desktop */}
                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Grade Level */}
                  <FormField
                    control={form.control}
                    name="gradeLevel"
                    render={({ field }) => (
                      <FormItem className="group">
                        <FormLabel className="text-base font-semibold text-gray-900">📚 Grade Level</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            const grade = parseInt(value) as GradeLevel;
                            field.onChange(grade);
                            handleGradeChange(grade);
                          }}
                          value={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 transition-all hover:border-primary">
                              <SelectValue placeholder="Select grade level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map((grade) => (
                              <SelectItem key={grade} value={grade.toString()}>
                                Grade {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Topic */}
                  <FormField
                    control={form.control}
                    name="topic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold text-gray-900">📖 Topic</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 transition-all hover:border-primary">
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableTopics.map((topic) => (
                              <SelectItem key={topic.id} value={topic.id}>
                                {topic.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {field.value && (
                          <FormDescription className="text-xs text-gray-600">
                            {availableTopics.find(t => t.id === field.value)?.description}
                          </FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Difficulty Selector */}
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-gray-900">🎯 Difficulty Level</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                          {DIFFICULTIES.map((diff) => (
                            <button
                              key={diff.id}
                              type="button"
                              onClick={() => field.onChange(diff.id)}
                              className={`group relative overflow-hidden rounded-xl border-2 p-4 text-left transition-all duration-300 sm:p-5 ${
                                field.value === diff.id
                                  ? 'scale-105 border-blue-500 bg-gradient-to-br from-blue-100 to-blue-50 shadow-xl ring-4 ring-blue-200'
                                  : 'border-gray-200 bg-white hover:scale-102 hover:border-blue-300 hover:shadow-lg'
                              }`}
                            >
                              <div className={`absolute right-2 top-2 transition-all duration-300 ${
                                field.value === diff.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                              }`}>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                              <div className={`font-bold text-lg ${field.value === diff.id ? 'text-blue-700' : 'text-gray-900'}`}>{diff.name}</div>
                              <div className="mt-1 text-xs text-gray-600 sm:text-sm">{diff.description}</div>
                              <div className={`mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200 transition-all duration-300`}>
                                <div className={`h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ${
                                  field.value === diff.id ? 'w-full' : 'w-0'
                                }`}></div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Problem Count Slider */}
                <FormField
                  control={form.control}
                  name="problemCount"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base font-semibold text-gray-900">🔢 Number of Problems</FormLabel>
                        <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white shadow-md">
                          {field.value}
                        </div>
                      </div>
                      <FormControl>
                        <div className="pt-2">
                          <Slider
                            min={5}
                            max={20}
                            step={1}
                            value={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                            className="w-full"
                          />
                          <div className="mt-2 flex justify-between text-xs text-gray-600">
                            <span>5 problems</span>
                            <span>20 problems</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription className="text-gray-600">Choose between 5 and 20 problems</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Visual Theme Selector */}
                <FormField
                  control={form.control}
                  name="visualTheme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-gray-900">🎨 Visual Theme</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                          {THEMES.map((theme) => (
                            <button
                              key={theme.id}
                              type="button"
                              onClick={() => field.onChange(theme.id)}
                              className={`group relative flex flex-col items-center gap-3 rounded-xl border-2 p-4 transition-all duration-300 sm:p-5 ${
                                field.value === theme.id
                                  ? 'scale-110 border-blue-500 bg-gradient-to-br from-blue-100 to-blue-50 shadow-xl ring-4 ring-blue-200'
                                  : 'border-gray-200 bg-white hover:scale-105 hover:border-blue-300 hover:shadow-lg'
                              }`}
                            >
                              <div className={`absolute right-1 top-1 transition-all duration-300 ${
                                field.value === theme.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                              }`}>
                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                              <span className={`text-4xl transition-all group-hover:scale-110 ${
                                field.value === theme.id ? 'scale-110' : ''
                              }`}>
                                {theme.emoji}
                              </span>
                              <span className={`text-center text-xs font-semibold sm:text-sm ${
                                field.value === theme.id ? 'text-blue-700' : 'text-gray-900'
                              }`}>
                                {theme.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-base font-semibold shadow-lg transition-all hover:shadow-2xl hover:scale-105 sm:text-lg"
                    disabled={isLoading}
                  >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                    {isLoading ? (
                      <>
                        <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Generating Your Worksheet...
                      </>
                    ) : (
                      <>
                        <svg className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Generate Worksheet
                      </>
                    )}
                  </Button>
                  <p className="mt-3 text-center text-xs text-gray-600">
                    ⚡ Usually ready in 10-30 seconds
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div
          className={`mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 transition-all duration-700 delay-300 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">78+</div>
            <div className="text-xs text-gray-600">Topics</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">6</div>
            <div className="text-xs text-gray-600">Grade Levels</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">5</div>
            <div className="text-xs text-gray-600">Themes</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600">AI</div>
            <div className="text-xs text-gray-600">Powered</div>
          </div>
        </div>
      </div>
    </div>
  );
}
