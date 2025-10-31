/**
 * Common Core State Standards for Mathematics
 * Grade K-6 Standards organized by domain and cluster
 */

export interface Standard {
  id: string;
  code: string;
  description: string;
  grade: number; // 0 for K, 1-6 for grades
  domain: string;
  domainCode: string;
  cluster: string;
  clusterCode: string;
  standardNum: number;
}

// Kindergarten Standards
export const KINDERGARTEN_STANDARDS: Omit<Standard, 'id'>[] = [
  // Counting and Cardinality (CC)
  {
    code: "CCSS.MATH.CONTENT.K.CC.A.1",
    description: "Count to 100 by ones and by tens.",
    grade: 0,
    domain: "Counting & Cardinality",
    domainCode: "CC",
    cluster: "Know number names and the count sequence",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.K.CC.A.2",
    description: "Count forward beginning from a given number within the known sequence (instead of having to begin at 1).",
    grade: 0,
    domain: "Counting & Cardinality",
    domainCode: "CC",
    cluster: "Know number names and the count sequence",
    clusterCode: "A",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.K.CC.A.3",
    description: "Write numbers from 0 to 20. Represent a number of objects with a written numeral 0-20 (with 0 representing a count of no objects).",
    grade: 0,
    domain: "Counting & Cardinality",
    domainCode: "CC",
    cluster: "Know number names and the count sequence",
    clusterCode: "A",
    standardNum: 3
  },
  {
    code: "CCSS.MATH.CONTENT.K.CC.B.4",
    description: "Understand the relationship between numbers and quantities; connect counting to cardinality.",
    grade: 0,
    domain: "Counting & Cardinality",
    domainCode: "CC",
    cluster: "Count to tell the number of objects",
    clusterCode: "B",
    standardNum: 4
  },
  {
    code: "CCSS.MATH.CONTENT.K.CC.B.5",
    description: "Count to answer 'how many?' questions about as many as 20 things arranged in a line, a rectangular array, or a circle, or as many as 10 things in a scattered configuration; given a number from 1-20, count out that many objects.",
    grade: 0,
    domain: "Counting & Cardinality",
    domainCode: "CC",
    cluster: "Count to tell the number of objects",
    clusterCode: "B",
    standardNum: 5
  },
  {
    code: "CCSS.MATH.CONTENT.K.CC.C.6",
    description: "Identify whether the number of objects in one group is greater than, less than, or equal to the number of objects in another group, e.g., by using matching and counting strategies.",
    grade: 0,
    domain: "Counting & Cardinality",
    domainCode: "CC",
    cluster: "Compare numbers",
    clusterCode: "C",
    standardNum: 6
  },
  {
    code: "CCSS.MATH.CONTENT.K.CC.C.7",
    description: "Compare two numbers between 1 and 10 presented as written numerals.",
    grade: 0,
    domain: "Counting & Cardinality",
    domainCode: "CC",
    cluster: "Compare numbers",
    clusterCode: "C",
    standardNum: 7
  },
  // Operations and Algebraic Thinking (OA)
  {
    code: "CCSS.MATH.CONTENT.K.OA.A.1",
    description: "Represent addition and subtraction with objects, fingers, mental images, drawings, sounds (e.g., claps), acting out situations, verbal explanations, expressions, or equations.",
    grade: 0,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Understand addition as putting together and adding to, and understand subtraction as taking apart and taking from",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.K.OA.A.2",
    description: "Solve addition and subtraction word problems, and add and subtract within 10, e.g., by using objects or drawings to represent the problem.",
    grade: 0,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Understand addition as putting together and adding to, and understand subtraction as taking apart and taking from",
    clusterCode: "A",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.K.OA.A.3",
    description: "Decompose numbers less than or equal to 10 into pairs in more than one way, e.g., by using objects or drawings, and record each decomposition by a drawing or equation (e.g., 5 = 2 + 3 and 5 = 4 + 1).",
    grade: 0,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Understand addition as putting together and adding to, and understand subtraction as taking apart and taking from",
    clusterCode: "A",
    standardNum: 3
  },
  {
    code: "CCSS.MATH.CONTENT.K.OA.A.4",
    description: "For any number from 1 to 9, find the number that makes 10 when added to the given number, e.g., by using objects or drawings, and record the answer with a drawing or equation.",
    grade: 0,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Understand addition as putting together and adding to, and understand subtraction as taking apart and taking from",
    clusterCode: "A",
    standardNum: 4
  },
  {
    code: "CCSS.MATH.CONTENT.K.OA.A.5",
    description: "Fluently add and subtract within 5.",
    grade: 0,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Understand addition as putting together and adding to, and understand subtraction as taking apart and taking from",
    clusterCode: "A",
    standardNum: 5
  },
  // Measurement and Data (MD)
  {
    code: "CCSS.MATH.CONTENT.K.MD.A.1",
    description: "Describe measurable attributes of objects, such as length or weight. Describe several measurable attributes of a single object.",
    grade: 0,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Describe and compare measurable attributes",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.K.MD.A.2",
    description: "Directly compare two objects with a measurable attribute in common, to see which object has 'more of'/'less of' the attribute, and describe the difference.",
    grade: 0,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Describe and compare measurable attributes",
    clusterCode: "A",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.K.MD.B.3",
    description: "Classify objects into given categories; count the numbers of objects in each category and sort the categories by count.",
    grade: 0,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Classify objects and count the number of objects in each category",
    clusterCode: "B",
    standardNum: 3
  },
  // Geometry (G)
  {
    code: "CCSS.MATH.CONTENT.K.G.A.1",
    description: "Describe objects in the environment using names of shapes, and describe the relative positions of these objects using terms such as above, below, beside, in front of, behind, and next to.",
    grade: 0,
    domain: "Geometry",
    domainCode: "G",
    cluster: "Identify and describe shapes (squares, circles, triangles, rectangles, hexagons, cubes, cones, cylinders, and spheres)",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.K.G.A.2",
    description: "Correctly name shapes regardless of their orientations or overall size.",
    grade: 0,
    domain: "Geometry",
    domainCode: "G",
    cluster: "Identify and describe shapes (squares, circles, triangles, rectangles, hexagons, cubes, cones, cylinders, and spheres)",
    clusterCode: "A",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.K.G.A.3",
    description: "Identify shapes as two-dimensional (lying in a plane, 'flat') or three-dimensional ('solid').",
    grade: 0,
    domain: "Geometry",
    domainCode: "G",
    cluster: "Identify and describe shapes (squares, circles, triangles, rectangles, hexagons, cubes, cones, cylinders, and spheres)",
    clusterCode: "A",
    standardNum: 3
  },
  {
    code: "CCSS.MATH.CONTENT.K.G.B.4",
    description: "Analyze and compare two- and three-dimensional shapes, in different sizes and orientations, using informal language to describe their similarities, differences, parts (e.g., number of sides and vertices/'corners') and other attributes (e.g., having sides of equal length).",
    grade: 0,
    domain: "Geometry",
    domainCode: "G",
    cluster: "Analyze, compare, create, and compose shapes",
    clusterCode: "B",
    standardNum: 4
  },
  {
    code: "CCSS.MATH.CONTENT.K.G.B.6",
    description: "Compose simple shapes to form larger shapes. For example, 'Can you join these two triangles with full sides touching to make a rectangle?'",
    grade: 0,
    domain: "Geometry",
    domainCode: "G",
    cluster: "Analyze, compare, create, and compose shapes",
    clusterCode: "B",
    standardNum: 6
  }
];

// Grade 1 Standards
export const GRADE1_STANDARDS: Omit<Standard, 'id'>[] = [
  // Operations and Algebraic Thinking (OA)
  {
    code: "CCSS.MATH.CONTENT.1.OA.A.1",
    description: "Use addition and subtraction within 20 to solve word problems involving situations of adding to, taking from, putting together, taking apart, and comparing, with unknowns in all positions, e.g., by using objects, drawings, and equations with a symbol for the unknown number to represent the problem.",
    grade: 1,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Represent and solve problems involving addition and subtraction",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.1.OA.A.2",
    description: "Solve word problems that call for addition of three whole numbers whose sum is less than or equal to 20, e.g., by using objects, drawings, and equations with a symbol for the unknown number to represent the problem.",
    grade: 1,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Represent and solve problems involving addition and subtraction",
    clusterCode: "A",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.1.OA.B.3",
    description: "Apply properties of operations as strategies to add and subtract.",
    grade: 1,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Understand and apply properties of operations and the relationship between addition and subtraction",
    clusterCode: "B",
    standardNum: 3
  },
  {
    code: "CCSS.MATH.CONTENT.1.OA.B.4",
    description: "Understand subtraction as an unknown-addend problem.",
    grade: 1,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Understand and apply properties of operations and the relationship between addition and subtraction",
    clusterCode: "B",
    standardNum: 4
  },
  {
    code: "CCSS.MATH.CONTENT.1.OA.C.5",
    description: "Relate counting to addition and subtraction (e.g., by counting on 2 to add 2).",
    grade: 1,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Add and subtract within 20",
    clusterCode: "C",
    standardNum: 5
  },
  {
    code: "CCSS.MATH.CONTENT.1.OA.C.6",
    description: "Add and subtract within 20, demonstrating fluency for addition and subtraction within 10. Use strategies such as counting on; making ten (e.g., 8 + 6 = 8 + 2 + 4 = 10 + 4 = 14); decomposing a number leading to a ten (e.g., 13 - 4 = 13 - 3 - 1 = 10 - 1 = 9); using the relationship between addition and subtraction (e.g., knowing that 8 + 4 = 12, one knows 12 - 8 = 4); and creating equivalent but easier or known sums (e.g., adding 6 + 7 by creating the known equivalent 6 + 6 + 1 = 12 + 1 = 13).",
    grade: 1,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Add and subtract within 20",
    clusterCode: "C",
    standardNum: 6
  },
  {
    code: "CCSS.MATH.CONTENT.1.OA.D.7",
    description: "Understand the meaning of the equal sign, and determine if equations involving addition and subtraction are true or false.",
    grade: 1,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Work with addition and subtraction equations",
    clusterCode: "D",
    standardNum: 7
  },
  {
    code: "CCSS.MATH.CONTENT.1.OA.D.8",
    description: "Determine the unknown whole number in an addition or subtraction equation relating three whole numbers.",
    grade: 1,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Work with addition and subtraction equations",
    clusterCode: "D",
    standardNum: 8
  },
  // Number and Operations in Base Ten (NBT)
  {
    code: "CCSS.MATH.CONTENT.1.NBT.A.1",
    description: "Count to 120, starting at any number less than 120. In this range, read and write numerals and represent a number of objects with a written numeral.",
    grade: 1,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Extend the counting sequence",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.1.NBT.B.2",
    description: "Understand that the two digits of a two-digit number represent amounts of tens and ones.",
    grade: 1,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Understand place value",
    clusterCode: "B",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.1.NBT.B.3",
    description: "Compare two two-digit numbers based on meanings of the tens and ones digits, recording the results of comparisons with the symbols >, =, and <.",
    grade: 1,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Understand place value",
    clusterCode: "B",
    standardNum: 3
  },
  {
    code: "CCSS.MATH.CONTENT.1.NBT.C.4",
    description: "Add within 100, including adding a two-digit number and a one-digit number, and adding a two-digit number and a multiple of 10, using concrete models or drawings and strategies based on place value, properties of operations, and/or the relationship between addition and subtraction; relate the strategy to a written method and explain the reasoning used. Understand that in adding two-digit numbers, one adds tens and tens, ones and ones; and sometimes it is necessary to compose a ten.",
    grade: 1,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to add and subtract",
    clusterCode: "C",
    standardNum: 4
  },
  {
    code: "CCSS.MATH.CONTENT.1.NBT.C.5",
    description: "Given a two-digit number, mentally find 10 more or 10 less than the number, without having to count; explain the reasoning used.",
    grade: 1,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to add and subtract",
    clusterCode: "C",
    standardNum: 5
  },
  {
    code: "CCSS.MATH.CONTENT.1.NBT.C.6",
    description: "Subtract multiples of 10 in the range 10-90 from multiples of 10 in the range 10-90 (positive or zero differences), using concrete models or drawings and strategies based on place value, properties of operations, and/or the relationship between addition and subtraction; relate the strategy to a written method and explain the reasoning used.",
    grade: 1,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to add and subtract",
    clusterCode: "C",
    standardNum: 6
  },
  // Measurement and Data (MD)
  {
    code: "CCSS.MATH.CONTENT.1.MD.A.1",
    description: "Order three objects by length; compare the lengths of two objects indirectly by using a third object.",
    grade: 1,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Measure lengths indirectly and by iterating length units",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.1.MD.A.2",
    description: "Express the length of an object as a whole number of length units, by laying multiple copies of a shorter object (the length unit) end to end; understand that the length measurement of an object is the number of same-size length units that span it with no gaps or overlaps.",
    grade: 1,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Measure lengths indirectly and by iterating length units",
    clusterCode: "A",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.1.MD.B.3",
    description: "Tell and write time in hours and half-hours using analog and digital clocks.",
    grade: 1,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Tell and write time",
    clusterCode: "B",
    standardNum: 3
  },
  {
    code: "CCSS.MATH.CONTENT.1.MD.C.4",
    description: "Organize, represent, and interpret data with up to three categories; ask and answer questions about the total number of data points, how many in each category, and how many more or less are in one category than in another.",
    grade: 1,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Represent and interpret data",
    clusterCode: "C",
    standardNum: 4
  },
  // Geometry (G)
  {
    code: "CCSS.MATH.CONTENT.1.G.A.1",
    description: "Distinguish between defining attributes (e.g., triangles are closed and three-sided) versus non-defining attributes (e.g., color, orientation, overall size); build and draw shapes to possess defining attributes.",
    grade: 1,
    domain: "Geometry",
    domainCode: "G",
    cluster: "Reason with shapes and their attributes",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.1.G.A.2",
    description: "Compose two-dimensional shapes (rectangles, squares, trapezoids, triangles, half-circles, and quarter-circles) or three-dimensional shapes (cubes, right rectangular prisms, right circular cones, and right circular cylinders) to create a composite shape, and compose new shapes from the composite shape.",
    grade: 1,
    domain: "Geometry",
    domainCode: "G",
    cluster: "Reason with shapes and their attributes",
    clusterCode: "A",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.1.G.A.3",
    description: "Partition circles and rectangles into two and four equal shares, describe the shares using the words halves, fourths, and quarters, and use the phrases half of, fourth of, and quarter of. Describe the whole as two of, or four of the shares. Understand for these examples that decomposing into more equal shares creates smaller shares.",
    grade: 1,
    domain: "Geometry",
    domainCode: "G",
    cluster: "Reason with shapes and their attributes",
    clusterCode: "A",
    standardNum: 3
  }
];

// Grade 2 Standards
export const GRADE2_STANDARDS: Omit<Standard, 'id'>[] = [
  // Operations and Algebraic Thinking (OA)
  {
    code: "CCSS.MATH.CONTENT.2.OA.A.1",
    description: "Use addition and subtraction within 100 to solve one- and two-step word problems involving situations of adding to, taking from, putting together, taking apart, and comparing, with unknowns in all positions, e.g., by using drawings and equations with a symbol for the unknown number to represent the problem.",
    grade: 2,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Represent and solve problems involving addition and subtraction",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.2.OA.B.2",
    description: "Fluently add and subtract within 20 using mental strategies. By end of Grade 2, know from memory all sums of two one-digit numbers.",
    grade: 2,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Add and subtract within 20",
    clusterCode: "B",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.2.OA.C.3",
    description: "Determine whether a group of objects (up to 20) has an odd or even number of members, e.g., by pairing objects or counting them by 2s; write an equation to express an even number as a sum of two equal addends.",
    grade: 2,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Work with equal groups of objects to gain foundations for multiplication",
    clusterCode: "C",
    standardNum: 3
  },
  {
    code: "CCSS.MATH.CONTENT.2.OA.C.4",
    description: "Use addition to find the total number of objects arranged in rectangular arrays with up to 5 rows and up to 5 columns; write an equation to express the total as a sum of equal addends.",
    grade: 2,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Work with equal groups of objects to gain foundations for multiplication",
    clusterCode: "C",
    standardNum: 4
  },
  // Number and Operations in Base Ten (NBT)
  {
    code: "CCSS.MATH.CONTENT.2.NBT.A.1",
    description: "Understand that the three digits of a three-digit number represent amounts of hundreds, tens, and ones; e.g., 706 equals 7 hundreds, 0 tens, and 6 ones.",
    grade: 2,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Understand place value",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.2.NBT.A.2",
    description: "Count within 1000; skip-count by 5s, 10s, and 100s.",
    grade: 2,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Understand place value",
    clusterCode: "A",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.2.NBT.A.3",
    description: "Read and write numbers to 1000 using base-ten numerals, number names, and expanded form.",
    grade: 2,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Understand place value",
    clusterCode: "A",
    standardNum: 3
  },
  {
    code: "CCSS.MATH.CONTENT.2.NBT.A.4",
    description: "Compare two three-digit numbers based on meanings of the hundreds, tens, and ones digits, using >, =, and < symbols to record the results of comparisons.",
    grade: 2,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Understand place value",
    clusterCode: "A",
    standardNum: 4
  },
  {
    code: "CCSS.MATH.CONTENT.2.NBT.B.5",
    description: "Fluently add and subtract within 100 using strategies based on place value, properties of operations, and/or the relationship between addition and subtraction.",
    grade: 2,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to add and subtract",
    clusterCode: "B",
    standardNum: 5
  },
  {
    code: "CCSS.MATH.CONTENT.2.NBT.B.6",
    description: "Add up to four two-digit numbers using strategies based on place value and properties of operations.",
    grade: 2,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to add and subtract",
    clusterCode: "B",
    standardNum: 6
  },
  {
    code: "CCSS.MATH.CONTENT.2.NBT.B.7",
    description: "Add and subtract within 1000, using concrete models or drawings and strategies based on place value, properties of operations, and/or the relationship between addition and subtraction; relate the strategy to a written method. Understand that in adding or subtracting three-digit numbers, one adds or subtracts hundreds and hundreds, tens and tens, ones and ones; and sometimes it is necessary to compose or decompose tens or hundreds.",
    grade: 2,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to add and subtract",
    clusterCode: "B",
    standardNum: 7
  },
  {
    code: "CCSS.MATH.CONTENT.2.NBT.B.8",
    description: "Mentally add 10 or 100 to a given number 100–900, and mentally subtract 10 or 100 from a given number 100–900.",
    grade: 2,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to add and subtract",
    clusterCode: "B",
    standardNum: 8
  },
  {
    code: "CCSS.MATH.CONTENT.2.NBT.B.9",
    description: "Explain why addition and subtraction strategies work, using place value and the properties of operations.",
    grade: 2,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to add and subtract",
    clusterCode: "B",
    standardNum: 9
  }
];

// Grade 3 Standards (Partial - focusing on key OA and NBT standards)
export const GRADE3_STANDARDS: Omit<Standard, 'id'>[] = [
  // Operations and Algebraic Thinking
  {
    code: "CCSS.MATH.CONTENT.3.OA.A.1",
    description: "Interpret products of whole numbers, e.g., interpret 5 × 7 as the total number of objects in 5 groups of 7 objects each.",
    grade: 3,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Represent and solve problems involving multiplication and division",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.3.OA.A.2",
    description: "Interpret whole-number quotients of whole numbers, e.g., interpret 56 ÷ 8 as the number of objects in each share when 56 objects are partitioned equally into 8 shares, or as a number of shares when 56 objects are partitioned into equal shares of 8 objects each.",
    grade: 3,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Represent and solve problems involving multiplication and division",
    clusterCode: "A",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.3.OA.A.3",
    description: "Use multiplication and division within 100 to solve word problems in situations involving equal groups, arrays, and measurement quantities, e.g., by using drawings and equations with a symbol for the unknown number to represent the problem.",
    grade: 3,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Represent and solve problems involving multiplication and division",
    clusterCode: "A",
    standardNum: 3
  },
  {
    code: "CCSS.MATH.CONTENT.3.OA.A.4",
    description: "Determine the unknown whole number in a multiplication or division equation relating three whole numbers.",
    grade: 3,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Represent and solve problems involving multiplication and division",
    clusterCode: "A",
    standardNum: 4
  },
  {
    code: "CCSS.MATH.CONTENT.3.OA.B.5",
    description: "Apply properties of operations as strategies to multiply and divide.",
    grade: 3,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Understand properties of multiplication and the relationship between multiplication and division",
    clusterCode: "B",
    standardNum: 5
  },
  {
    code: "CCSS.MATH.CONTENT.3.OA.B.6",
    description: "Understand division as an unknown-factor problem.",
    grade: 3,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Understand properties of multiplication and the relationship between multiplication and division",
    clusterCode: "B",
    standardNum: 6
  },
  {
    code: "CCSS.MATH.CONTENT.3.OA.C.7",
    description: "Fluently multiply and divide within 100, using strategies such as the relationship between multiplication and division or properties of operations. By the end of Grade 3, know from memory all products of two one-digit numbers.",
    grade: 3,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Multiply and divide within 100",
    clusterCode: "C",
    standardNum: 7
  },
  {
    code: "CCSS.MATH.CONTENT.3.OA.D.8",
    description: "Solve two-step word problems using the four operations. Represent these problems using equations with a letter standing for the unknown quantity. Assess the reasonableness of answers using mental computation and estimation strategies including rounding.",
    grade: 3,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Solve problems involving the four operations, and identify and explain patterns in arithmetic",
    clusterCode: "D",
    standardNum: 8
  },
  {
    code: "CCSS.MATH.CONTENT.3.OA.D.9",
    description: "Identify arithmetic patterns (including patterns in the addition table or multiplication table), and explain them using properties of operations.",
    grade: 3,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Solve problems involving the four operations, and identify and explain patterns in arithmetic",
    clusterCode: "D",
    standardNum: 9
  },
  // Number and Operations in Base Ten
  {
    code: "CCSS.MATH.CONTENT.3.NBT.A.1",
    description: "Use place value understanding to round whole numbers to the nearest 10 or 100.",
    grade: 3,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to perform multi-digit arithmetic",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.3.NBT.A.2",
    description: "Fluently add and subtract within 1000 using strategies and algorithms based on place value, properties of operations, and/or the relationship between addition and subtraction.",
    grade: 3,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to perform multi-digit arithmetic",
    clusterCode: "A",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.3.NBT.A.3",
    description: "Multiply one-digit whole numbers by multiples of 10 in the range 10–90 (e.g., 9 × 80, 5 × 60) using strategies based on place value and properties of operations.",
    grade: 3,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to perform multi-digit arithmetic",
    clusterCode: "A",
    standardNum: 3
  },
  // Number and Operations - Fractions
  {
    code: "CCSS.MATH.CONTENT.3.NF.A.1",
    description: "Understand a fraction 1/b as the quantity formed by 1 part when a whole is partitioned into b equal parts; understand a fraction a/b as the quantity formed by a parts of size 1/b.",
    grade: 3,
    domain: "Number & Operations - Fractions",
    domainCode: "NF",
    cluster: "Develop understanding of fractions as numbers",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.3.NF.A.2",
    description: "Understand a fraction as a number on the number line; represent fractions on a number line diagram.",
    grade: 3,
    domain: "Number & Operations - Fractions",
    domainCode: "NF",
    cluster: "Develop understanding of fractions as numbers",
    clusterCode: "A",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.3.NF.A.3",
    description: "Explain equivalence of fractions in special cases, and compare fractions by reasoning about their size.",
    grade: 3,
    domain: "Number & Operations - Fractions",
    domainCode: "NF",
    cluster: "Develop understanding of fractions as numbers",
    clusterCode: "A",
    standardNum: 3
  }
];

// Additional Grade 2-3 MD & Geometry Standards
export const GRADE2_MD_G_STANDARDS: Omit<Standard, 'id'>[] = [
  // Grade 2 Measurement and Data
  {
    code: "CCSS.MATH.CONTENT.2.MD.A.1",
    description: "Measure the length of an object by selecting and using appropriate tools such as rulers, yardsticks, meter sticks, and measuring tapes.",
    grade: 2,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Measure and estimate lengths in standard units",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.2.MD.A.3",
    description: "Estimate lengths using units of inches, feet, centimeters, and meters.",
    grade: 2,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Measure and estimate lengths in standard units",
    clusterCode: "A",
    standardNum: 3
  },
  {
    code: "CCSS.MATH.CONTENT.2.MD.C.7",
    description: "Tell and write time from analog and digital clocks to the nearest five minutes, using a.m. and p.m.",
    grade: 2,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Work with time and money",
    clusterCode: "C",
    standardNum: 7
  },
  {
    code: "CCSS.MATH.CONTENT.2.MD.C.8",
    description: "Solve word problems involving dollar bills, quarters, dimes, nickels, and pennies, using $ and ¢ symbols appropriately.",
    grade: 2,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Work with time and money",
    clusterCode: "C",
    standardNum: 8
  },
  {
    code: "CCSS.MATH.CONTENT.2.MD.D.9",
    description: "Generate measurement data by measuring lengths of several objects to the nearest whole unit, or by making repeated measurements of the same object. Show the measurements by making a line plot, where the horizontal scale is marked off in whole-number units.",
    grade: 2,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Represent and interpret data",
    clusterCode: "D",
    standardNum: 9
  },
  // Grade 2 Geometry
  {
    code: "CCSS.MATH.CONTENT.2.G.A.1",
    description: "Recognize and draw shapes having specified attributes, such as a given number of angles or a given number of equal faces. Identify triangles, quadrilaterals, pentagons, hexagons, and cubes.",
    grade: 2,
    domain: "Geometry",
    domainCode: "G",
    cluster: "Reason with shapes and their attributes",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.2.G.A.3",
    description: "Partition circles and rectangles into two, three, or four equal shares, describe the shares using the words halves, thirds, half of, a third of, etc., and describe the whole as two halves, three thirds, four fourths. Recognize that equal shares of identical wholes need not have the same shape.",
    grade: 2,
    domain: "Geometry",
    domainCode: "G",
    cluster: "Reason with shapes and their attributes",
    clusterCode: "A",
    standardNum: 3
  },
  // Grade 3 Measurement and Data
  {
    code: "CCSS.MATH.CONTENT.3.MD.A.1",
    description: "Tell and write time to the nearest minute and measure time intervals in minutes. Solve word problems involving addition and subtraction of time intervals in minutes, e.g., by representing the problem on a number line diagram.",
    grade: 3,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Solve problems involving measurement and estimation of intervals of time, liquid volumes, and masses of objects",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.3.MD.A.2",
    description: "Measure and estimate liquid volumes and masses of objects using standard units of grams (g), kilograms (kg), and liters (l). Add, subtract, multiply, or divide to solve one-step word problems involving masses or volumes that are given in the same units, e.g., by using drawings (such as a beaker with a measurement scale) to represent the problem.",
    grade: 3,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Solve problems involving measurement and estimation of intervals of time, liquid volumes, and masses of objects",
    clusterCode: "A",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.3.MD.B.3",
    description: "Draw a scaled picture graph and a scaled bar graph to represent a data set with several categories. Solve one- and two-step 'how many more' and 'how many less' problems using information presented in scaled bar graphs.",
    grade: 3,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Represent and interpret data",
    clusterCode: "B",
    standardNum: 3
  },
  {
    code: "CCSS.MATH.CONTENT.3.MD.B.4",
    description: "Generate measurement data by measuring lengths using rulers marked with halves and fourths of an inch. Show the data by making a line plot, where the horizontal scale is marked off in appropriate units— whole numbers, halves, or quarters.",
    grade: 3,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Represent and interpret data",
    clusterCode: "B",
    standardNum: 4
  },
  // Grade 3 Geometry
  {
    code: "CCSS.MATH.CONTENT.3.G.A.1",
    description: "Understand that shapes in different categories (e.g., rhombuses, rectangles, and others) may share attributes (e.g., having four sides), and that the shared attributes can define a larger category (e.g., quadrilaterals). Recognize rhombuses, rectangles, and squares as examples of quadrilaterals, and draw examples of quadrilaterals that do not belong to any of these subcategories.",
    grade: 3,
    domain: "Geometry",
    domainCode: "G",
    cluster: "Reason with shapes and their attributes",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.3.G.A.2",
    description: "Partition shapes into parts with equal areas. Express the area of each part as a unit fraction of the whole.",
    grade: 3,
    domain: "Geometry",
    domainCode: "G",
    cluster: "Reason with shapes and their attributes",
    clusterCode: "A",
    standardNum: 2
  }
];

// Grade 4 Standards (Key subset for major topics)
export const GRADE4_STANDARDS: Omit<Standard, 'id'>[] = [
  {
    code: "CCSS.MATH.CONTENT.4.OA.A.1",
    description: "Interpret a multiplication equation as a comparison, e.g., interpret 35 = 5 × 7 as a statement that 35 is 5 times as many as 7 and 7 times as many as 5.",
    grade: 4,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Use the four operations with whole numbers to solve problems",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.4.NBT.B.4",
    description: "Fluently add and subtract multi-digit whole numbers using the standard algorithm.",
    grade: 4,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to perform multi-digit arithmetic",
    clusterCode: "B",
    standardNum: 4
  },
  {
    code: "CCSS.MATH.CONTENT.4.NBT.B.5",
    description: "Multiply a whole number of up to four digits by a one-digit whole number, and multiply two two-digit numbers, using strategies based on place value and the properties of operations.",
    grade: 4,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to perform multi-digit arithmetic",
    clusterCode: "B",
    standardNum: 5
  },
  {
    code: "CCSS.MATH.CONTENT.4.NBT.B.6",
    description: "Find whole-number quotients and remainders with up to four-digit dividends and one-digit divisors, using strategies based on place value, the properties of operations, and/or the relationship between multiplication and division.",
    grade: 4,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Use place value understanding and properties of operations to perform multi-digit arithmetic",
    clusterCode: "B",
    standardNum: 6
  },
  {
    code: "CCSS.MATH.CONTENT.4.NF.A.1",
    description: "Explain why a fraction a/b is equivalent to a fraction (n×a)/(n×b) by using visual fraction models, with attention to how the number and size of the parts differ even though the two fractions themselves are the same size.",
    grade: 4,
    domain: "Number & Operations—Fractions",
    domainCode: "NF",
    cluster: "Extend understanding of fraction equivalence and ordering",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.4.NF.A.2",
    description: "Compare two fractions with different numerators and different denominators, e.g., by creating common denominators or numerators, or by comparing to a benchmark fraction such as 1/2.",
    grade: 4,
    domain: "Number & Operations—Fractions",
    domainCode: "NF",
    cluster: "Extend understanding of fraction equivalence and ordering",
    clusterCode: "A",
    standardNum: 2
  },
  {
    code: "CCSS.MATH.CONTENT.4.MD.A.3",
    description: "Apply the area and perimeter formulas for rectangles in real world and mathematical problems.",
    grade: 4,
    domain: "Measurement & Data",
    domainCode: "MD",
    cluster: "Solve problems involving measurement and conversion of measurements from a larger unit to a smaller unit",
    clusterCode: "A",
    standardNum: 3
  },
];

// Grade 5 Standards (Key subset for major topics)
export const GRADE5_STANDARDS: Omit<Standard, 'id'>[] = [
  {
    code: "CCSS.MATH.CONTENT.5.OA.A.1",
    description: "Use parentheses, brackets, or braces in numerical expressions, and evaluate expressions with these symbols.",
    grade: 5,
    domain: "Operations & Algebraic Thinking",
    domainCode: "OA",
    cluster: "Write and interpret numerical expressions",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.5.NBT.B.5",
    description: "Fluently multiply multi-digit whole numbers using the standard algorithm.",
    grade: 5,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Perform operations with multi-digit whole numbers and with decimals to hundredths",
    clusterCode: "B",
    standardNum: 5
  },
  {
    code: "CCSS.MATH.CONTENT.5.NBT.B.6",
    description: "Find whole-number quotients of whole numbers with up to four-digit dividends and two-digit divisors, using strategies based on place value, the properties of operations, and/or the relationship between multiplication and division.",
    grade: 5,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Perform operations with multi-digit whole numbers and with decimals to hundredths",
    clusterCode: "B",
    standardNum: 6
  },
  {
    code: "CCSS.MATH.CONTENT.5.NBT.B.7",
    description: "Add, subtract, multiply, and divide decimals to hundredths, using concrete models or drawings and strategies based on place value, properties of operations, and/or the relationship between addition and subtraction.",
    grade: 5,
    domain: "Number & Operations in Base Ten",
    domainCode: "NBT",
    cluster: "Perform operations with multi-digit whole numbers and with decimals to hundredths",
    clusterCode: "B",
    standardNum: 7
  },
  {
    code: "CCSS.MATH.CONTENT.5.NF.A.1",
    description: "Add and subtract fractions with unlike denominators (including mixed numbers) by replacing given fractions with equivalent fractions in such a way as to produce an equivalent sum or difference of fractions with like denominators.",
    grade: 5,
    domain: "Number & Operations—Fractions",
    domainCode: "NF",
    cluster: "Use equivalent fractions as a strategy to add and subtract fractions",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.5.NF.B.4",
    description: "Apply and extend previous understandings of multiplication to multiply a fraction or whole number by a fraction.",
    grade: 5,
    domain: "Number & Operations—Fractions",
    domainCode: "NF",
    cluster: "Apply and extend previous understandings of multiplication and division to multiply and divide fractions",
    clusterCode: "B",
    standardNum: 4
  },
];

// Grade 6 Standards (Key subset for major topics)
export const GRADE6_STANDARDS: Omit<Standard, 'id'>[] = [
  {
    code: "CCSS.MATH.CONTENT.6.RP.A.1",
    description: "Understand the concept of a ratio and use ratio language to describe a ratio relationship between two quantities.",
    grade: 6,
    domain: "Ratios & Proportional Relationships",
    domainCode: "RP",
    cluster: "Understand ratio concepts and use ratio reasoning to solve problems",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.6.RP.A.3",
    description: "Use ratio and rate reasoning to solve real-world and mathematical problems, e.g., by reasoning about tables of equivalent ratios, tape diagrams, double number line diagrams, or equations.",
    grade: 6,
    domain: "Ratios & Proportional Relationships",
    domainCode: "RP",
    cluster: "Understand ratio concepts and use ratio reasoning to solve problems",
    clusterCode: "A",
    standardNum: 3
  },
  {
    code: "CCSS.MATH.CONTENT.6.NS.A.1",
    description: "Interpret and compute quotients of fractions, and solve word problems involving division of fractions by fractions, e.g., by using visual fraction models and equations to represent the problem.",
    grade: 6,
    domain: "The Number System",
    domainCode: "NS",
    cluster: "Apply and extend previous understandings of multiplication and division to divide fractions by fractions",
    clusterCode: "A",
    standardNum: 1
  },
  {
    code: "CCSS.MATH.CONTENT.6.NS.B.3",
    description: "Fluently add, subtract, multiply, and divide multi-digit decimals using the standard algorithm for each operation.",
    grade: 6,
    domain: "The Number System",
    domainCode: "NS",
    cluster: "Compute fluently with multi-digit numbers and find common factors and multiples",
    clusterCode: "B",
    standardNum: 3
  },
  {
    code: "CCSS.MATH.CONTENT.6.NS.C.5",
    description: "Understand that positive and negative numbers are used together to describe quantities having opposite directions or values (e.g., temperature above/below zero, elevation above/below sea level, credits/debits, positive/negative electric charge); use positive and negative numbers to represent quantities in real-world contexts, explaining the meaning of 0 in each situation.",
    grade: 6,
    domain: "The Number System",
    domainCode: "NS",
    cluster: "Apply and extend previous understandings of numbers to the system of rational numbers",
    clusterCode: "C",
    standardNum: 5
  },
  {
    code: "CCSS.MATH.CONTENT.6.EE.A.2",
    description: "Write, read, and evaluate expressions in which letters stand for numbers.",
    grade: 6,
    domain: "Expressions & Equations",
    domainCode: "EE",
    cluster: "Apply and extend previous understandings of arithmetic to algebraic expressions",
    clusterCode: "A",
    standardNum: 2
  },
];

// Combine all standards
export const ALL_STANDARDS: Omit<Standard, 'id'>[] = [
  ...KINDERGARTEN_STANDARDS,
  ...GRADE1_STANDARDS,
  ...GRADE2_STANDARDS,
  ...GRADE3_STANDARDS,
  ...GRADE2_MD_G_STANDARDS, // Additional MD & Geometry standards for grades 2-3
  ...GRADE4_STANDARDS,
  ...GRADE5_STANDARDS,
  ...GRADE6_STANDARDS,
];

// Helper functions
export function getStandardsByGrade(grade: number): Omit<Standard, 'id'>[] {
  return ALL_STANDARDS.filter(standard => standard.grade === grade);
}

export function getStandardsByDomain(domainCode: string): Omit<Standard, 'id'>[] {
  return ALL_STANDARDS.filter(standard => standard.domainCode === domainCode);
}

export function getStandardByCode(code: string): Omit<Standard, 'id'> | undefined {
  return ALL_STANDARDS.find(standard => standard.code === code);
}

// Topic to Standards mapping
export const TOPIC_STANDARDS_MAP: Record<string, string[]> = {
  // Kindergarten & Grade 1
  'counting': [
    'CCSS.MATH.CONTENT.K.CC.A.1',
    'CCSS.MATH.CONTENT.K.CC.B.4',
    'CCSS.MATH.CONTENT.K.CC.B.5',
    'CCSS.MATH.CONTENT.1.NBT.A.1'
  ],
  'addition-basic': [
    'CCSS.MATH.CONTENT.K.OA.A.1',
    'CCSS.MATH.CONTENT.K.OA.A.2',
    'CCSS.MATH.CONTENT.1.OA.A.1',
    'CCSS.MATH.CONTENT.1.OA.C.6'
  ],
  'subtraction-basic': [
    'CCSS.MATH.CONTENT.K.OA.A.1',
    'CCSS.MATH.CONTENT.K.OA.A.2',
    'CCSS.MATH.CONTENT.1.OA.A.1',
    'CCSS.MATH.CONTENT.1.OA.B.4',
    'CCSS.MATH.CONTENT.1.OA.C.6'
  ],
  'place-value-basic': [
    'CCSS.MATH.CONTENT.1.NBT.B.2',
    'CCSS.MATH.CONTENT.1.NBT.B.3',
    'CCSS.MATH.CONTENT.2.NBT.A.1'
  ],
  
  // Grade 2-3
  'addition-regrouping': [
    'CCSS.MATH.CONTENT.2.NBT.B.5',
    'CCSS.MATH.CONTENT.2.NBT.B.7',
    'CCSS.MATH.CONTENT.3.NBT.A.2'
  ],
  'subtraction-regrouping': [
    'CCSS.MATH.CONTENT.2.NBT.B.5',
    'CCSS.MATH.CONTENT.2.NBT.B.7',
    'CCSS.MATH.CONTENT.3.NBT.A.2'
  ],
  'skip-counting': [
    'CCSS.MATH.CONTENT.2.NBT.A.2',
    'CCSS.MATH.CONTENT.2.OA.C.3'
  ],
  
  // Grade 3-4
  'multiplication-basic': [
    'CCSS.MATH.CONTENT.3.OA.A.1',
    'CCSS.MATH.CONTENT.3.OA.A.3',
    'CCSS.MATH.CONTENT.3.OA.C.7',
    'CCSS.MATH.CONTENT.4.OA.A.1',
    'CCSS.MATH.CONTENT.4.NBT.B.5'
  ],
  'division-basic': [
    'CCSS.MATH.CONTENT.3.OA.A.2',
    'CCSS.MATH.CONTENT.3.OA.A.3',
    'CCSS.MATH.CONTENT.3.OA.B.6',
    'CCSS.MATH.CONTENT.3.OA.C.7',
    'CCSS.MATH.CONTENT.4.NBT.B.6'
  ],
  'fractions-basic': [
    'CCSS.MATH.CONTENT.3.NF.A.1',
    'CCSS.MATH.CONTENT.3.NF.A.2',
    'CCSS.MATH.CONTENT.3.NF.A.3',
    'CCSS.MATH.CONTENT.4.NF.A.1',
    'CCSS.MATH.CONTENT.4.NF.A.2'
  ],
  'area-perimeter': [
    'CCSS.MATH.CONTENT.4.MD.A.3'
  ],

  // Grade 4-5
  'multiplication-multi-digit': [
    'CCSS.MATH.CONTENT.4.NBT.B.5',
    'CCSS.MATH.CONTENT.5.NBT.B.5'
  ],
  'division-multi-digit': [
    'CCSS.MATH.CONTENT.4.NBT.B.6',
    'CCSS.MATH.CONTENT.5.NBT.B.6'
  ],
  'fractions-operations': [
    'CCSS.MATH.CONTENT.5.NF.A.1',
    'CCSS.MATH.CONTENT.5.NF.B.4'
  ],
  'decimals': [
    'CCSS.MATH.CONTENT.5.NBT.B.7'
  ],

  // Grade 5-6
  'percentages': [
    'CCSS.MATH.CONTENT.6.RP.A.3'
  ],
  'ratios-proportions': [
    'CCSS.MATH.CONTENT.6.RP.A.1',
    'CCSS.MATH.CONTENT.6.RP.A.3'
  ],
  'integers': [
    'CCSS.MATH.CONTENT.6.NS.C.5'
  ],
  'algebraic-expressions': [
    'CCSS.MATH.CONTENT.6.EE.A.2'
  ],

  // MEASUREMENT & DATA TOPICS
  'time-calendar': [
    'CCSS.MATH.CONTENT.1.MD.B.3',
    'CCSS.MATH.CONTENT.2.MD.C.7',
    'CCSS.MATH.CONTENT.3.MD.A.1'
  ],
  'money-coins': [
    'CCSS.MATH.CONTENT.2.MD.C.8'
  ],
  'length-measurement': [
    'CCSS.MATH.CONTENT.1.MD.A.1',
    'CCSS.MATH.CONTENT.1.MD.A.2',
    'CCSS.MATH.CONTENT.2.MD.A.1',
    'CCSS.MATH.CONTENT.2.MD.A.3'
  ],
  'weight-volume': [
    'CCSS.MATH.CONTENT.3.MD.A.2'
  ],
  'data-graphs': [
    'CCSS.MATH.CONTENT.1.MD.C.4',
    'CCSS.MATH.CONTENT.2.MD.D.9',
    'CCSS.MATH.CONTENT.3.MD.B.3',
    'CCSS.MATH.CONTENT.3.MD.B.4'
  ],
  'statistics-probability': [
    'CCSS.MATH.CONTENT.6.SP.A.1',
    'CCSS.MATH.CONTENT.6.SP.A.2',
    'CCSS.MATH.CONTENT.6.SP.B.4',
    'CCSS.MATH.CONTENT.6.SP.B.5'
  ],

  // GEOMETRY TOPICS
  'shapes-2d': [
    'CCSS.MATH.CONTENT.K.G.A.2',
    'CCSS.MATH.CONTENT.1.G.A.1',
    'CCSS.MATH.CONTENT.2.G.A.1',
    'CCSS.MATH.CONTENT.3.G.A.1'
  ],
  'shapes-3d': [
    'CCSS.MATH.CONTENT.K.G.A.3',
    'CCSS.MATH.CONTENT.K.G.B.4',
    'CCSS.MATH.CONTENT.1.G.A.2'
  ],
  'coordinate-plane': [
    'CCSS.MATH.CONTENT.5.G.A.1',
    'CCSS.MATH.CONTENT.5.G.A.2',
    'CCSS.MATH.CONTENT.6.G.A.3'
  ],
  'angles-lines': [
    'CCSS.MATH.CONTENT.4.G.A.1',
    'CCSS.MATH.CONTENT.4.G.A.2'
  ],
  'transformations': [
    'CCSS.MATH.CONTENT.4.G.A.3'
  ],
  'volume-surface-area': [
    'CCSS.MATH.CONTENT.5.MD.C.3',
    'CCSS.MATH.CONTENT.5.MD.C.4',
    'CCSS.MATH.CONTENT.5.MD.C.5',
    'CCSS.MATH.CONTENT.6.G.A.2',
    'CCSS.MATH.CONTENT.6.G.A.4'
  ],

  // ENHANCED NUMBER SYSTEM TOPICS
  'number-recognition': [
    'CCSS.MATH.CONTENT.K.CC.A.3'
  ],
  'number-comparison': [
    'CCSS.MATH.CONTENT.K.CC.C.6',
    'CCSS.MATH.CONTENT.K.CC.C.7'
  ],
  'prime-composite': [
    'CCSS.MATH.CONTENT.4.OA.B.4'
  ],

  // ADVANCED TOPICS
  'patterns-sequences': [
    'CCSS.MATH.CONTENT.4.OA.C.5',
    'CCSS.MATH.CONTENT.5.OA.B.3'
  ],
  'word-problems-multistep': [
    'CCSS.MATH.CONTENT.4.OA.A.3'
  ],
  'estimation-rounding': [
    'CCSS.MATH.CONTENT.4.NBT.A.3',
    'CCSS.MATH.CONTENT.5.NBT.A.4'
  ],
  'mental-math': [
    'CCSS.MATH.CONTENT.2.OA.C.3'
  ],
  'measurement-units': [
    'CCSS.MATH.CONTENT.4.MD.A.1',
    'CCSS.MATH.CONTENT.5.MD.A.1'
  ],
  'scale-proportion': [
    'CCSS.MATH.CONTENT.6.RP.A.3'
  ]
};