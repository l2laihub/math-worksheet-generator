# Cost Validation Test

## Purpose

This test measures the **actual Claude API costs** for generating math worksheets to validate the cost assumptions in the PRD.

## Test Scenarios

The test runs 3 representative scenarios:

1. **Easy** - Grade 1 Addition (10 problems, Animals theme)
2. **Medium** - Grade 3 Multiplication (12 problems, Space theme)
3. **Hard** - Grade 6 Fractions (15 problems, Nature theme)

## Setup

1. Get your Anthropic API key from [https://console.anthropic.com/](https://console.anthropic.com/)
2. Set the environment variable:
   ```bash
   export ANTHROPIC_API_KEY=your_key_here
   ```
3. Run the test:
   ```bash
   npm run test:cost
   ```

## What It Tests

- ✅ Token usage (input + output)
- ✅ Cost per worksheet
- ✅ Response time
- ✅ JSON response validity
- ✅ Monthly cost projections (100, 500, 1000, 5000 generations)

## Expected Output

The test will:
1. Generate 3 worksheets with different complexity levels
2. Measure token usage and costs for each
3. Calculate average cost per worksheet
4. Project monthly costs at different volumes
5. Compare actual costs vs PRD estimates
6. Save a detailed JSON report

## Interpreting Results

### Success Criteria
- Average cost per worksheet ≤ $0.15
- Response validation passes
- All 3 test scenarios succeed

### If Costs Are Too High
Consider:
- Reducing prompt length (optimize system prompt)
- Using prompt caching for grade standards
- Limiting visual aid descriptions
- Adjusting problem count defaults

## Output Files

Results are saved to:
```
tests/cost-validation/cost-report-YYYY-MM-DD.json
```

Contains:
- Individual test results
- Token usage breakdown
- Cost analysis
- Monthly projections
- Recommendations
