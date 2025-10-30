/**
 * Test the /api/generate endpoint
 * Run with: node tests/test-api.js
 */

async function testGenerateAPI() {
  console.log('Testing /api/generate endpoint...\n');

  const testRequest = {
    gradeLevel: 2,
    topic: 'Addition',
    difficulty: 'easy',
    problemCount: 5,
    theme: 'animals',
  };

  console.log('Request:', JSON.stringify(testRequest, null, 2));
  console.log('\nCalling API...\n');

  try {
    const response = await fetch('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testRequest),
    });

    const data = await response.json();

    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('\n✅ API test successful!');
    } else {
      console.log('\n❌ API test failed');
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

// Run test
testGenerateAPI();
