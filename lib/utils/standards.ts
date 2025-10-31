/**
 * Utility functions for Common Core standards in UI components
 */

import { TOPICS, type Topic } from '@/lib/constants/topics';
import { ALL_STANDARDS } from '@/lib/constants/standards';

export interface StandardDisplay {
  code: string;
  description: string;
  domain: string;
  grade: number;
}

/**
 * Get standards that would be covered for a given topic and grade
 */
export function getStandardsForTopicAndGrade(topicId: string, gradeLevel: number): StandardDisplay[] {
  const topic = TOPICS.find(t => t.id === topicId);
  if (!topic?.standards) return [];

  // Filter standards that match the grade level (or kindergarten for grade 1)
  const relevantStandardCodes = topic.standards.filter(code => 
    code.includes(`.${gradeLevel}.`) || (gradeLevel === 1 && code.includes(`.K.`))
  );

  // Get full standard information
  return ALL_STANDARDS
    .filter(standard => relevantStandardCodes.includes(standard.code))
    .map(standard => ({
      code: standard.code,
      description: standard.description,
      domain: standard.domain,
      grade: standard.grade
    }));
}

/**
 * Get a readable standards summary for display
 */
export function getStandardsSummary(standards: StandardDisplay[]): string {
  if (standards.length === 0) return "No specific standards targeted";
  
  const domains = [...new Set(standards.map(s => s.domain))];
  
  if (domains.length === 1) {
    return `${standards.length} ${domains[0]} standard${standards.length > 1 ? 's' : ''}`;
  }
  
  return `${standards.length} standards across ${domains.length} domains`;
}

/**
 * Get domain breakdown for standards
 */
export function getStandardsByDomain(standards: StandardDisplay[]): Record<string, StandardDisplay[]> {
  return standards.reduce((acc, standard) => {
    if (!acc[standard.domain]) {
      acc[standard.domain] = [];
    }
    acc[standard.domain].push(standard);
    return acc;
  }, {} as Record<string, StandardDisplay[]>);
}

/**
 * Format standard code for compact display (e.g., "1.OA.A.1")
 */
export function formatStandardCode(code: string): string {
  const match = code.match(/CCSS\.MATH\.CONTENT\.(.+)/);
  return match ? match[1] : code;
}