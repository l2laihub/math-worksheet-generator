/**
 * Seed script to populate Common Core standards in the database
 */

import { prisma } from '@/lib/prisma';
import { ALL_STANDARDS, TOPIC_STANDARDS_MAP } from '@/lib/constants/standards';

export async function seedStandards() {
  console.log('🌱 Seeding Common Core standards...');

  try {
    // First, insert all standards
    const standardsData = ALL_STANDARDS.map(standard => ({
      code: standard.code,
      description: standard.description,
      grade: standard.grade,
      domain: standard.domain,
      domainCode: standard.domainCode,
      cluster: standard.cluster,
      clusterCode: standard.clusterCode,
      standardNum: standard.standardNum,
    }));

    // Use createMany for bulk insert
    const result = await prisma.standard.createMany({
      data: standardsData,
      skipDuplicates: true, // Avoid errors on re-runs
    });

    console.log(`✅ Created ${result.count} standards`);

    // Get all standards from database to map IDs
    const dbStandards = await prisma.standard.findMany({
      select: { id: true, code: true }
    });

    const standardCodeToId = new Map(
      dbStandards.map(s => [s.code, s.id])
    );

    // Create topic-standards mappings
    const topicStandardsData = [];
    for (const [topicId, standardCodes] of Object.entries(TOPIC_STANDARDS_MAP)) {
      for (const standardCode of standardCodes) {
        const standardId = standardCodeToId.get(standardCode);
        if (standardId) {
          topicStandardsData.push({
            topicId,
            standardId,
          });
        } else {
          console.warn(`⚠️ Standard not found: ${standardCode} for topic ${topicId}`);
        }
      }
    }

    const topicResult = await prisma.topicStandard.createMany({
      data: topicStandardsData,
      skipDuplicates: true,
    });

    console.log(`✅ Created ${topicResult.count} topic-standard mappings`);

    // Print summary
    const standardCount = await prisma.standard.count();
    const topicStandardCount = await prisma.topicStandard.count();

    console.log(`\n📊 Standards Database Summary:`);
    console.log(`   Total Standards: ${standardCount}`);
    console.log(`   Topic Mappings: ${topicStandardCount}`);
    console.log(`   Grades Covered: K-3 (partial)`);
    console.log(`   Domains: OA, NBT, CC, NF, MD`);

  } catch (error) {
    console.error('❌ Error seeding standards:', error);
    throw error;
  }
}

export async function clearStandards() {
  console.log('🧹 Clearing existing standards...');
  
  await prisma.generationStandard.deleteMany();
  await prisma.topicStandard.deleteMany();
  await prisma.standard.deleteMany();
  
  console.log('✅ Standards cleared');
}

// If run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedStandards()
    .then(() => {
      console.log('✅ Standards seeding completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Standards seeding failed:', error);
      process.exit(1);
    });
}