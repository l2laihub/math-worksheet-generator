# Visual Pattern Rendering Specification

**Status**: Specification
**Date**: 2025-10-29
**Based on**: Python Claude Skill worksheet-generator.py

---

## Overview

This document specifies the 5 visual pattern rendering types used in the Math Worksheet Generator. These patterns are pedagogically proven and align with Common Core visual learning standards. They are ported from the Python-based Claude skill implementation.

---

## Visual Pattern Types

### 1. Countable Objects

**Purpose**: Simple counting exercises (Grade 1-2)
**Use Case**: "How many apples are there?"

**Visual**: Objects arranged in a horizontal line

```
🍎 🍎 🍎 🍎 🍎
```

**TypeScript Interface**:
```typescript
interface CountableObjectsPattern {
  type: 'countable_objects';
  item: string;        // Asset ID (e.g., 'apple')
  count: number;       // Number of objects to render (1-20)
}
```

**Example Usage**:
```typescript
const pattern: CountableObjectsPattern = {
  type: 'countable_objects',
  item: 'apple',
  count: 5
};

// Claude generates problem:
// "How many apples are there? Count the apples below."
// Visual: 🍎 🍎 🍎 🍎 🍎
// Answer: 5
```

**Rendering Specs**:
- Object size: 30px
- Spacing between objects: 10px
- Maximum per row: 10 objects (wrap to next row if needed)
- Alignment: Left-aligned

---

### 2. Grouped Objects

**Purpose**: Addition with visual grouping (Grade 1-2)
**Use Case**: "3 apples + 4 apples = ?"

**Visual**: Groups of objects separated by + signs

```
🍎 🍎 🍎  +  🍎 🍎 🍎 🍎
```

**TypeScript Interface**:
```typescript
interface GroupedObjectsPattern {
  type: 'grouped_objects';
  groups: Array<{
    item: string;      // Asset ID (e.g., 'apple')
    count: number;     // Objects in this group (1-10)
  }>;
}
```

**Example Usage**:
```typescript
const pattern: GroupedObjectsPattern = {
  type: 'grouped_objects',
  groups: [
    { item: 'apple', count: 3 },
    { item: 'apple', count: 4 }
  ]
};

// Claude generates problem:
// "Add the groups of apples. 3 + 4 = ?"
// Visual: 🍎🍎🍎 + 🍎🍎🍎🍎
// Answer: 7
```

**Rendering Specs**:
- Object size: 30px
- Spacing within group: 5px
- Spacing between groups: 20px
- Plus sign: 20px font size, vertically centered
- Maximum groups: 4 groups per problem

---

### 3. Array (Grid Layout)

**Purpose**: Multiplication as arrays (Grade 2-4)
**Use Case**: "3 rows × 4 columns = ?"

**Visual**: Objects arranged in rows and columns

```
⭐ ⭐ ⭐ ⭐
⭐ ⭐ ⭐ ⭐
⭐ ⭐ ⭐ ⭐
```

**TypeScript Interface**:
```typescript
interface ArrayPattern {
  type: 'array';
  item: string;        // Asset ID (e.g., 'star')
  rows: number;        // Number of rows (1-10)
  cols: number;        // Number of columns (1-10)
}
```

**Example Usage**:
```typescript
const pattern: ArrayPattern = {
  type: 'array',
  item: 'star',
  rows: 3,
  cols: 4
};

// Claude generates problem:
// "Count the stars. There are 3 rows and 4 columns. How many stars in total?"
// Or: "3 × 4 = ?"
// Visual: 3x4 grid of stars
// Answer: 12
```

**Rendering Specs**:
- Object size: 25px
- Row spacing: 5px
- Column spacing: 5px
- Alignment: Left-aligned, top-aligned
- Maximum grid size: 10×10

---

### 4. Number Line

**Purpose**: Number line visualization for addition, subtraction, counting (Grade 1-3)
**Use Case**: "Start at 5, add 7. Where do you land?"

**Visual**: Horizontal line with tick marks and numbers

```
    ●           ●
────┼───┼───┼───┼───┼───┼───┼───┼───┼───
    5   6   7   8   9  10  11  12  13
```

**TypeScript Interface**:
```typescript
interface NumberLinePattern {
  type: 'number_line';
  start: number;       // Starting number (usually 0 or 1)
  end: number;         // Ending number (up to 100)
  highlights: number[]; // Numbers to highlight (e.g., [5, 12])
}
```

**Example Usage**:
```typescript
const pattern: NumberLinePattern = {
  type: 'number_line',
  start: 0,
  end: 20,
  highlights: [5, 12]
};

// Claude generates problem:
// "Start at 5 (highlighted). Add 7. Which number do you land on?"
// Visual: Number line 0-20 with 5 and 12 highlighted
// Answer: 12
```

**Rendering Specs**:
- Total width: 400px
- Line thickness: 2px
- Tick mark height: 10px
- Number font size: 10px
- Highlighted numbers: Red circle (radius 8px)
- Label position: Below line

---

### 5. Fraction Circle

**Purpose**: Visual fraction representation (Grade 3-6)
**Use Case**: "Shade 3/8 of the circle"

**Visual**: Circle divided into equal slices with some shaded

```
    ╱──┬──╲
   ╱■■╱ │╲  ╲
  │■■╱  │ ╲  │
  │─────┼───│
  │     │   │
   ╲    │  ╱
    ╲───┴─╱
```

**TypeScript Interface**:
```typescript
interface FractionCirclePattern {
  type: 'fraction_circle';
  numerator: number;    // Number of shaded slices (1-12)
  denominator: number;  // Total number of slices (2-12)
}
```

**Example Usage**:
```typescript
const pattern: FractionCirclePattern = {
  type: 'fraction_circle',
  numerator: 3,
  denominator: 8
};

// Claude generates problem:
// "What fraction of the circle is shaded?"
// Or: "Shade 3/8 of the circle"
// Visual: Circle divided into 8 slices, 3 shaded
// Answer: 3/8
```

**Rendering Specs**:
- Circle radius: 50px
- Shaded color: #4ECDC4 (teal)
- Unshaded: White
- Border color: Black
- Border width: 2px
- Slice divider lines: 2px black
- Maximum denominator: 12 (beyond that, slices too small)

---

## Pattern Selection Guidelines

### By Grade Level

**Grade 1**:
- `countable_objects` (primary)
- `grouped_objects` (for simple addition)
- `number_line` (for counting)

**Grade 2**:
- `countable_objects` (advanced counting)
- `grouped_objects` (addition/subtraction)
- `array` (introduction to multiplication)
- `number_line` (skip counting)

**Grade 3**:
- `array` (multiplication tables)
- `number_line` (larger numbers)
- `fraction_circle` (introduction to fractions)

**Grade 4-5**:
- `array` (advanced multiplication)
- `fraction_circle` (fraction operations)
- `number_line` (decimals)

**Grade 6**:
- `fraction_circle` (complex fractions)
- `number_line` (negative numbers, ratios)

---

### By Topic

**Addition/Subtraction**:
- `countable_objects` - Simple addition by counting
- `grouped_objects` - Visual addition (3 + 4)
- `number_line` - Number line jumps

**Multiplication/Division**:
- `array` - Rows and columns (3 × 4)
- `grouped_objects` - Equal groups (3 groups of 4)

**Fractions**:
- `fraction_circle` - Shaded portions
- `array` - Grid fractions (3/12 as grid)

**Counting**:
- `countable_objects` - Basic counting
- `number_line` - Skip counting

**Place Value**:
- `grouped_objects` - Tens and ones (2 groups of 10 + 3 ones)
- `array` - Base-10 blocks simulation

---

## Implementation Notes

### Asset Selection

When Claude generates the visual aid description, it includes:
```json
{
  "visualAid": {
    "type": "countable_objects",
    "item": "apple",
    "count": 5,
    "description": "Five red apples arranged in a row"
  }
}
```

The `item` field must match one of the 28 available OpenMoji assets:

**Food**: apple, banana, orange, strawberry, cookie, pizza, carrot
**Animals**: dog, cat, rabbit, bear, fish
**Nature**: butterfly, bee, flower, tree
**Space**: star, sun, moon, rocket
**Other**: car, book, pencil, circle, square, triangle, rectangle, heart

### Fallback Behavior

If an asset is missing:
1. Log warning: `Asset '${item}' not found`
2. Render colored circle as fallback
3. Fallback colors by theme:
   - Food: #FF6B6B (red)
   - Animals: #4ECDC4 (teal)
   - Space: #FFE66D (yellow)
   - Nature: #95E1D3 (green)
   - Other: #B39CD0 (purple)

### Responsive Sizing

On smaller PDFs or mobile previews:
- Scale all dimensions proportionally
- Minimum object size: 20px
- Adjust spacing to maintain visual clarity

---

## Python Implementation Reference

### From worksheet-generator.py (Lines 456-650)

**Countable Objects** (Python):
```python
def draw_visual_aid(self, c, visual_type, x, y, **kwargs):
    if visual_type == "countable_objects":
        item = kwargs.get('item', 'circle')
        count = kwargs.get('count', 5)
        spacing = 40

        for i in range(count):
            self.draw_object(c, item, x + (i * spacing), y)
```

**Grouped Objects** (Python):
```python
elif visual_type == "grouped_objects":
    groups = kwargs.get('groups', [])
    spacing = 40
    group_spacing = 60
    x_offset = 0

    for group_index, group in enumerate(groups):
        for i in range(group['count']):
            self.draw_object(c, group['item'], x + x_offset, y)
            x_offset += spacing

        if group_index < len(groups) - 1:
            c.setFont("Helvetica", 20)
            c.drawString(x + x_offset + 10, y + 10, "+")
            x_offset += group_spacing
```

**Array** (Python):
```python
elif visual_type == "array":
    rows = kwargs.get('rows', 3)
    cols = kwargs.get('cols', 4)
    item = kwargs.get('item', 'star')
    spacing = 35

    for row in range(rows):
        for col in range(cols):
            self.draw_object(c, item, x + (col * spacing), y + (row * spacing))
```

---

## Testing Checklist

When implementing visual patterns:

- [ ] Test each pattern type with all 28 assets
- [ ] Verify spacing and alignment
- [ ] Test with minimum values (e.g., 1 object, 2/2 fractions)
- [ ] Test with maximum values (e.g., 20 objects, 12/12 fractions)
- [ ] Check fallback behavior for missing assets
- [ ] Verify PDF rendering quality (not blurry/pixelated)
- [ ] Test on different PDF sizes (Letter, A4)
- [ ] Verify colors match specification
- [ ] Check that patterns match Python implementation output
- [ ] Test with all grade levels (1-6)
- [ ] Verify Common Core alignment for each pattern

---

## Future Enhancements

### Phase 2 (Post-MVP)

1. **Additional Patterns**:
   - `bar_model` - Singapore Math bar models
   - `number_bond` - Number bond diagrams
   - `place_value_chart` - Place value visualization
   - `factor_tree` - Prime factorization trees

2. **Interactive Elements** (Web Preview):
   - Draggable objects for answers
   - Clickable number line
   - Interactive fraction pie

3. **Customization**:
   - Color themes (not just fixed colors)
   - Object size preferences
   - Font size scaling

---

## References

- Python Implementation: `worksheet-generator.py` (Lines 456-650)
- OpenMoji Asset Library: https://openmoji.org/
- Common Core Math Standards: http://www.corestandards.org/Math/
- ADR-002: Visual Assets Strategy
- Math Visual Models Research: [Van de Walle, 2017](https://example.com)

---

**Version**: 1.0
**Last Updated**: 2025-10-29
**Author**: Development Team
**Status**: Ready for Implementation (Days 5-7)
