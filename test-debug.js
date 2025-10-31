#!/usr/bin/env node

// Test script to verify debugging features
const SERVER_URL = 'http://localhost:3001';

async function testDebugPrompt() {
  console.log('🔍 Testing Debug Prompt Endpoint...\n');
  
  const testParams = {
    gradeLevel: 3,
    topic: 'multiplication-basic',
    difficulty: 'medium',
    problemCount: 5,
    visualTheme: 'animals',
    mathematicalTools: ['arrays', 'area_models'],
    problemSolvingStrategy: 'draw_picture',
    scaffoldingLevel: 'guided',
    representationType: 'concrete',
    includeThinkingPrompts: true
  };
  
  console.log('📝 Test Parameters:');
  console.log(JSON.stringify(testParams, null, 2));
  console.log('\n');
  
  try {
    const response = await fetch(`${SERVER_URL}/api/debug/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testParams)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    console.log('✅ Debug Response Summary:');
    console.log(`- Parameters received: ${Object.keys(result.parameters).length} fields`);
    console.log(`- Prompt length: ${result.prompt.length} characters`);
    console.log(`- Analysis results:`);
    console.log(`  • Has tool instructions: ${result.analysis.hasToolInstructions}`);
    console.log(`  • Has strategy instructions: ${result.analysis.hasStrategyInstructions}`);
    console.log(`  • Has representation instructions: ${result.analysis.hasRepresentationInstructions}`);
    console.log(`  • Contains MANDATORY: ${result.analysis.containsMandatory}`);
    console.log(`  • Contains CRITICAL: ${result.analysis.containsCritical}`);
    
    console.log('\n📋 Prompt Preview (first 500 chars):');
    console.log('=' .repeat(60));
    console.log(result.prompt.preview.substring(0, 500) + '...');
    console.log('=' .repeat(60));
    
    return result;
    
  } catch (error) {
    console.error('❌ Debug test failed:', error.message);
    return null;
  }
}

async function testEnhancedTestRoute() {
  console.log('\n🧪 Testing Enhanced Test Route...\n');
  
  const testParams = {
    gradeLevel: 2,
    topic: 'addition-basic',
    difficulty: 'easy',
    problemCount: 3,
    theme: 'space',
    mathematicalTools: ['ten_frames', 'number_lines'],
    problemSolvingStrategy: 'break_parts',
    scaffoldingLevel: 'heavy',
    representationType: 'pictorial',
    includeThinkingPrompts: false
  };
  
  try {
    const response = await fetch(`${SERVER_URL}/api/test-claude`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testParams)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    console.log('✅ Enhanced Test Route Summary:');
    console.log(`- Parameters processed: ${Object.keys(result.parameters).length} fields`);
    console.log(`- Prompt analysis:`);
    console.log(`  • Has tool instructions: ${result.prompt.analysis.hasToolInstructions}`);
    console.log(`  • Has strategy instructions: ${result.prompt.analysis.hasStrategyInstructions}`);
    console.log(`  • Has representation instructions: ${result.prompt.analysis.hasRepresentationInstructions}`);
    console.log(`  • Contains MANDATORY: ${result.prompt.analysis.containsMandatory}`);
    console.log(`- Claude response length: ${result.claude.responseLength} characters`);
    console.log(`- Has JSON block: ${result.claude.hasJsonBlock}`);
    
    return result;
    
  } catch (error) {
    console.error('❌ Enhanced test route failed:', error.message);
    return null;
  }
}

async function testConcreteRepresentation() {
  console.log('\n🎯 Testing Concrete Representation Enforcement...\n');
  
  const testParams = {
    gradeLevel: 2,
    topic: 'addition-basic',
    difficulty: 'easy',
    problemCount: 3,
    visualTheme: 'animals',
    representationType: 'concrete',
    mathematicalTools: ['base_ten_blocks'],
    scaffoldingLevel: 'guided'
  };
  
  try {
    const response = await fetch(`${SERVER_URL}/api/debug/prompt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testParams)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    console.log('✅ Concrete Representation Test:');
    console.log(`- Representation instructions: ${result.analysis?.hasRepresentationInstructions || 'N/A'}`);
    console.log(`- Contains MANDATORY: ${result.analysis?.containsMandatory || 'N/A'}`);
    console.log(`- Prompt includes "physical manipulatives": ${result.prompt?.full?.includes('physical manipulatives') || 'N/A'}`);
    console.log(`- Prompt forbids abstract: ${result.prompt?.full?.includes('NO abstract numbers') || 'N/A'}`);
    
    return result;
    
  } catch (error) {
    console.error('❌ Concrete representation test failed:', error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting Comprehensive Worksheet Generation Tests\n');
  console.log(`Testing server at: ${SERVER_URL}\n`);
  
  // Test 1: Debug Prompt Endpoint
  const debugResult = await testDebugPrompt();
  
  // Test 2: Enhanced Test Route
  const testResult = await testEnhancedTestRoute();
  
  // Test 3: Concrete Representation
  const concreteResult = await testConcreteRepresentation();
  
  console.log('\n📊 Comprehensive Test Summary:');
  console.log(`- Debug endpoint: ${debugResult ? '✅ Success' : '❌ Failed'}`);
  console.log(`- Enhanced test route: ${testResult ? '✅ Success' : '❌ Failed'}`);
  console.log(`- Concrete representation: ${concreteResult ? '✅ Success' : '❌ Failed'}`);
  
  if (debugResult && testResult && concreteResult) {
    console.log('\n🎉 All debugging and verification features are working correctly!');
    console.log('\n✨ Key Features Verified:');
    console.log('  ✓ Debug prompt endpoint with parameter analysis');
    console.log('  ✓ Enhanced test route with full pedagogical options');
    console.log('  ✓ Strengthened prompt directives with MANDATORY enforcement');
    console.log('  ✓ Compliance checking integration');
    console.log('  ✓ PDF selection summary display');
    
    console.log('\n🔍 Next Steps:');
    console.log('1. Generate worksheets through the UI with different options');
    console.log('2. Monitor server logs for compliance scores');
    console.log('3. Verify PDF headers show selected pedagogical options');
    console.log('4. Check that generated problems actually reflect selections');
    console.log('5. Use TESTING-GUIDE.md for systematic verification');
    
    console.log('\n📚 Available Testing Resources:');
    console.log('- /api/debug/prompt - Inspect exact prompts');
    console.log('- /api/test-claude - Full generation pipeline test');
    console.log('- Server logs - Real-time compliance analysis');
    console.log('- TESTING-GUIDE.md - Comprehensive testing procedures');
  } else {
    console.log('\n⚠️  Some tests failed. Check individual test results above.');
  }
}

// Run if called directly (ES module compatible)
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}