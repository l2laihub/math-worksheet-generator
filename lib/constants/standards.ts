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

// Combine all standards
export const ALL_STANDARDS: Omit<Standard, 'id'>[] = [
  ...KINDERGARTEN_STANDARDS,
  ...GRADE1_STANDARDS,
  ...GRADE2_STANDARDS,
  ...GRADE3_STANDARDS,
  // Note: Grades 4-6 would follow similar pattern
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
    'CCSS.MATH.CONTENT.3.OA.C.7'
  ],
  'division-basic': [
    'CCSS.MATH.CONTENT.3.OA.A.2',
    'CCSS.MATH.CONTENT.3.OA.A.3',
    'CCSS.MATH.CONTENT.3.OA.B.6',
    'CCSS.MATH.CONTENT.3.OA.C.7'
  ],
  'fractions-basic': [
    'CCSS.MATH.CONTENT.3.NF.A.1',
    'CCSS.MATH.CONTENT.3.NF.A.2',
    'CCSS.MATH.CONTENT.3.NF.A.3'
  ]
};