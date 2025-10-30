import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':***@'));

    await prisma.$connect();
    console.log('✓ Connected to database successfully');

    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✓ Query executed successfully:', result);

    await prisma.$disconnect();
    console.log('✓ Database connection test passed!');
  } catch (error) {
    console.error('✗ Database connection failed:');
    console.error(error.message);
    process.exit(1);
  }
}

testConnection();
