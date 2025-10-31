# 🧪 Worksheet Generation Testing Guide

This guide provides comprehensive testing procedures to verify that worksheet generation correctly reflects selected pedagogical options (tools, strategies, representation types, etc.).

## 🎯 Overview

The testing system provides multiple verification layers:
1. **Debug Prompt Endpoint** - Inspect exact prompts sent to Claude AI
2. **Enhanced Logging** - Server-side parameter and response analysis  
3. **PDF Selection Summary** - Visual verification on generated worksheets
4. **Compliance Checking** - Automated analysis of worksheet content
5. **Test Scripts** - Automated validation workflows

---

## 🔧 Testing Tools

### 1. Debug Prompt Endpoint (`/api/debug/prompt`)
**Purpose**: Generate and analyze prompts without calling Claude AI

**Usage**:
```bash
curl -X POST http://localhost:3001/api/debug/prompt \
-H "Content-Type: application/json" \
-d '{
  "gradeLevel": 3,
  "topic": "multiplication-basic", 
  "difficulty": "medium",
  "problemCount": 5,
  "visualTheme": "animals",
  "mathematicalTools": ["arrays", "area_models"],
  "problemSolvingStrategy": "draw_picture",
  "scaffoldingLevel": "guided",
  "representationType": "concrete",
  "includeThinkingPrompts": true
}'
```

**What to verify**:
- ✅ `analysis.hasToolInstructions` = true
- ✅ `analysis.hasStrategyInstructions` = true  
- ✅ `analysis.containsMandatory` = true
- ✅ `analysis.containsCritical` = true
- ✅ Prompt preview contains your selected tools/strategies

### 2. Enhanced Test Route (`/api/test-claude`)
**Purpose**: Test full generation pipeline with Claude AI

**Usage**:
```bash
curl -X POST http://localhost:3001/api/test-claude \
-H "Content-Type: application/json" \
-d '{
  "gradeLevel": 2,
  "topic": "addition-basic",
  "mathematicalTools": ["ten_frames"],
  "representationType": "pictorial"
}'
```

**What to verify**:
- ✅ Parameters correctly processed
- ✅ Prompt analysis shows expected instructions
- ✅ Claude response contains JSON worksheet
- ✅ Generated problems reflect selections

### 3. Server Logs
**Purpose**: Real-time monitoring of generation process

**How to view**:
```bash
# If using npm run dev
# Check terminal output for detailed logs

# Key log entries to look for:
# [Generate] Received parameters: {...}
# [Generate] Prompt analysis: {...}  
# [Generate] Compliance check results: {...}
```

**What to verify**:
- ✅ Parameters received correctly
- ✅ Prompt includes tool/strategy instructions
- ✅ Compliance score > 80
- ✅ No major violations detected

---

## 🎮 Test Scenarios

### Scenario 1: Concrete Representation Test
**Goal**: Verify "Concrete" mode produces only physical manipulative problems

**Setup**:
```json
{
  "gradeLevel": 2,
  "topic": "addition-basic",
  "representationType": "concrete",
  "mathematicalTools": ["base_ten_blocks"],
  "problemCount": 5
}
```

**Expected Results**:
- ✅ All problems reference physical objects (blocks, bears, toys)
- ✅ NO abstract computation (e.g., "5 + 3 = ?")
- ✅ PDF header shows "Representation: concrete"
- ✅ Compliance score ≥ 90

**Red Flags**:
- ❌ Problems like "What is 7 + 4?"
- ❌ Abstract number sentences without context
- ❌ Compliance violations for representation

### Scenario 2: Mathematical Tools Verification
**Goal**: Verify selected tools are actually used in problems

**Setup**:
```json
{
  "gradeLevel": 3,
  "topic": "multiplication-basic", 
  "mathematicalTools": ["arrays", "area_models"],
  "problemCount": 5
}
```

**Expected Results**:
- ✅ 60%+ of problems mention "arrays", "rows and columns", or "area model"
- ✅ Problems designed to use these specific tools
- ✅ PDF header shows "Tools: arrays, area_models"
- ✅ Compliance tool detection ≥ 60%

**Red Flags**:
- ❌ Generic multiplication problems without tool references
- ❌ Tool compliance < 60%
- ❌ No mention of selected tools in problems

### Scenario 3: Problem-Solving Strategy Test
**Goal**: Verify strategy focus in problem design

**Setup**:
```json
{
  "gradeLevel": 4,
  "topic": "word-problems-multistep",
  "problemSolvingStrategy": "draw_picture", 
  "scaffoldingLevel": "guided",
  "problemCount": 5
}
```

**Expected Results**:
- ✅ 40%+ of problems include "draw", "picture", "diagram" instructions
- ✅ Problems designed to benefit from visual representation
- ✅ PDF header shows "Strategy: draw picture"
- ✅ Strategy compliance ≥ 40%

**Red Flags**:
- ❌ Pure computation problems without strategy guidance
- ❌ Strategy compliance < 40%
- ❌ No explicit strategy instructions

### Scenario 4: Scaffolding Level Verification
**Goal**: Verify support level affects problem structure

**Setup - Independent**:
```json
{
  "scaffoldingLevel": "none",
  "gradeLevel": 5,
  "topic": "division-basic"
}
```

**Expected Results**:
- ✅ Clean, direct problem statements
- ✅ NO hints, prompts, or guidance
- ✅ PDF header shows "Support: none"

**Setup - Heavy Support**:
```json
{
  "scaffoldingLevel": "heavy",
  "gradeLevel": 3, 
  "topic": "fractions-basic"
}
```

**Expected Results**:
- ✅ Step-by-step guidance in problems
- ✅ Hints like "First, try...", "Remember that..."
- ✅ Multi-step problems broken down
- ✅ PDF header shows "Support: heavy"

---

## 🔍 Quick Verification Checklist

### Before Generation:
- [ ] Server running on correct port (3001)
- [ ] Environment variables configured (ANTHROPIC_API_KEY, etc.)
- [ ] Database connection working

### After Selecting Options:
- [ ] Use debug endpoint to verify prompt contains your selections
- [ ] Check browser Network tab for correct API request payload
- [ ] Verify no console errors in browser

### During Generation:
- [ ] Monitor server logs for parameter reception
- [ ] Check compliance analysis in logs
- [ ] Verify no generation errors

### After PDF Generation:
- [ ] PDF header shows selected options correctly
- [ ] Problems reflect chosen representation type
- [ ] Tools/strategies evident in problem content
- [ ] Compliance score documented in logs

---

## 🚨 Troubleshooting Common Issues

### Issue: "Prompt doesn't include my selections"
**Solution**:
1. Use `/api/debug/prompt` to inspect exact prompt
2. Check if parameters passed correctly in request
3. Verify tool/strategy functions are called properly

### Issue: "PDF shows wrong selections" 
**Solution**:
1. Check API route passes `selections` to PDF generator
2. Verify PDF generator receives all parameters
3. Look for TypeScript type mismatches

### Issue: "Generated problems ignore representation type"
**Solution**:
1. Check compliance score in server logs
2. Verify prompt contains MANDATORY directives
3. Consider strengthening prompt language further

### Issue: "Compliance score always low"
**Solution**:
1. Review compliance checker keyword matching
2. Adjust detection algorithms for your specific use case
3. Check if Claude AI response format changed

---

## 🧪 Automated Test Script

Run the provided test script for comprehensive validation:

```bash
node test-debug.js
```

This will:
- ✅ Test debug prompt endpoint
- ✅ Test enhanced test route with all parameters
- ✅ Verify prompt analysis functionality
- ✅ Show detailed results and next steps

---

## 📊 Success Metrics

### High Priority (Must Pass):
- ✅ Compliance score ≥ 80
- ✅ Representation type enforced correctly
- ✅ PDF selection summary displays
- ✅ No critical generation errors

### Medium Priority (Should Pass):
- ✅ Tool compliance ≥ 60%
- ✅ Strategy compliance ≥ 40%
- ✅ Scaffolding level appropriate
- ✅ Thinking prompts when enabled

### Low Priority (Nice to Have):
- ✅ Compliance score ≥ 95
- ✅ All problems use selected tools
- ✅ Perfect strategy implementation
- ✅ Advanced scaffolding features

---

## 🎓 Advanced Testing

### Custom Compliance Rules
Modify `/lib/utils/compliance-checker.ts` to add:
- Subject-specific tool detection
- Grade-level appropriate complexity
- Custom keyword patterns
- Institution-specific requirements

### Prompt Optimization
Use debug endpoint to:
- Test different prompt structures
- A/B test directive language
- Optimize for specific Claude AI versions
- Fine-tune compliance rates

### Performance Testing
- Test with different problem counts (5-20)
- Verify generation time remains reasonable
- Check memory usage with complex selections
- Validate PDF generation performance

---

## 🏆 Quality Assurance

### Manual Review Process:
1. **Generate 5 test worksheets** with different option combinations
2. **Review each PDF** for selection summary accuracy
3. **Read all problems** to verify pedagogical alignment
4. **Check compliance reports** in server logs
5. **Document any discrepancies** for improvement

### Regression Testing:
- Test major option combinations monthly
- Verify core functionality after updates
- Maintain test worksheet library for comparison
- Monitor compliance score trends over time

---

*This testing guide ensures your worksheet generation accurately reflects pedagogical selections and provides teachers with the customized learning materials they expect.*