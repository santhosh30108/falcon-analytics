// Mock data for Falcon Faculty Analytics Dashboard

// Faculty can handle multiple batches, each with one subject
export const facultyInfo = {
  name: 'Dr. Rajesh Kumar',
  batches: [
    {
      id: 'DL483',
      name: 'DL483-0010-2024-105317',
      subject: 'Physics',
      students: 245,
      averageScore: 68.5,
      accuracyPercentage: 72.3,
      attemptRate: 89.7,
      trend: {
        score: 2.3,
        accuracy: -1.5,
        attemptRate: 3.2
      }
    },
    {
      id: 'DL301',
      name: 'DL483-0011-2024-105317',
      subject: 'Botany',
      students: 180,
      averageScore: 74.2,
      accuracyPercentage: 81.5,
      attemptRate: 92.1,
      trend: {
        score: 1.5,
        accuracy: 2.1,
        attemptRate: -0.5
      }
    },
  ]
};

export const batchOverview = {
  totalStudents: 245,
  averageScore: 68.5,
  accuracyPercentage: 72.3,
  attemptRate: 89.7,
  trend: {
    score: 2.3,
    accuracy: -1.5,
    attemptRate: 3.2
  }
};

export const chapterPerformance = [
  // Physics
  { subject: 'Physics', chapter: 'Electrostatics', accuracy: 58.2, avgScore: 14.5, totalQuestions: 25, difficulty: 'Hard', trend: -18, weightage: 'High', timeSpent: 110 },
  { subject: 'Physics', chapter: 'Current Electricity', accuracy: 71.3, avgScore: 17.8, totalQuestions: 25, difficulty: 'Medium', trend: 5, weightage: 'High', timeSpent: 85 },
  { subject: 'Physics', chapter: 'Magnetism', accuracy: 65.7, avgScore: 16.4, totalQuestions: 25, difficulty: 'Medium', trend: -3, weightage: 'Medium', timeSpent: 95 },
  { subject: 'Physics', chapter: 'Kinematics', accuracy: 54.8, avgScore: 13.7, totalQuestions: 25, difficulty: 'Medium', trend: -8, weightage: 'High', timeSpent: 105 },
  { subject: 'Physics', chapter: 'Laws of Motion', accuracy: 78.5, avgScore: 19.6, totalQuestions: 25, difficulty: 'Easy', trend: 12, weightage: 'High', timeSpent: 65 },
  { subject: 'Physics', chapter: 'Work Energy Power', accuracy: 69.2, avgScore: 17.3, totalQuestions: 25, difficulty: 'Medium', trend: 4, weightage: 'Medium', timeSpent: 75 },
  { subject: 'Physics', chapter: 'Rotational Motion', accuracy: 61.4, avgScore: 15.4, totalQuestions: 25, difficulty: 'Hard', trend: -5, weightage: 'Medium', timeSpent: 115 },
  { subject: 'Physics', chapter: 'Gravitation', accuracy: 73.6, avgScore: 18.4, totalQuestions: 25, difficulty: 'Easy', trend: 8, weightage: 'Low', timeSpent: 60 },
];

export const topicBreakdown = {
  // Physics
  'Electrostatics': [
    { topic: 'Electric Field', accuracy: 62.3, avgScore: 6.2, difficulty: 'Medium', trend: -5, questions: 10, timeSpent: 90 },
    { topic: 'Gauss Law', accuracy: 48.7, avgScore: 4.9, difficulty: 'Hard', trend: -15, questions: 8, timeSpent: 125 },
    { topic: 'Capacitors', accuracy: 54.1, avgScore: 5.4, difficulty: 'Hard', trend: -12, questions: 10, timeSpent: 110 },
    { topic: 'Electric Potential', accuracy: 66.8, avgScore: 6.7, difficulty: 'Medium', trend: -8, questions: 7, timeSpent: 85 },
  ],
  'Current Electricity': [
    { topic: 'Ohm\'s Law', accuracy: 75.2, avgScore: 7.5, difficulty: 'Easy', trend: 8, questions: 8, timeSpent: 55 },
    { topic: 'Kirchhoff\'s Laws', accuracy: 68.4, avgScore: 6.8, difficulty: 'Medium', trend: 3, questions: 10, timeSpent: 95 },
    { topic: 'Resistor Networks', accuracy: 70.1, avgScore: 7.0, difficulty: 'Medium', trend: 6, questions: 9, timeSpent: 80 },
  ],
  'Magnetism': [
    { topic: 'Magnetic Field', accuracy: 67.8, avgScore: 6.8, difficulty: 'Medium', trend: -2, questions: 9, timeSpent: 75 },
    { topic: 'Magnetic Force', accuracy: 64.2, avgScore: 6.4, difficulty: 'Medium', trend: -4, questions: 8, timeSpent: 85 },
    { topic: 'Electromagnetic Induction', accuracy: 65.1, avgScore: 6.5, difficulty: 'Hard', trend: -3, questions: 8, timeSpent: 100 },
  ],
  'Kinematics': [
    { topic: 'Motion in 1D', accuracy: 68.4, avgScore: 6.8, difficulty: 'Easy', trend: 4, questions: 10, timeSpent: 60 },
    { topic: 'Motion in 2D', accuracy: 52.3, avgScore: 5.2, difficulty: 'Hard', trend: -12, questions: 9, timeSpent: 110 },
    { topic: 'Projectile Motion', accuracy: 48.9, avgScore: 4.9, difficulty: 'Hard', trend: -18, questions: 8, timeSpent: 120 },
    { topic: 'Relative Motion', accuracy: 51.2, avgScore: 5.1, difficulty: 'Medium', trend: -10, questions: 8, timeSpent: 95 },
  ],
  'Laws of Motion': [
    { topic: 'Newton\'s Laws', accuracy: 82.1, avgScore: 8.2, difficulty: 'Easy', trend: 15, questions: 10, timeSpent: 45 },
    { topic: 'Free Body Diagrams', accuracy: 76.3, avgScore: 7.6, difficulty: 'Medium', trend: 10, questions: 8, timeSpent: 65 },
    { topic: 'Friction', accuracy: 77.2, avgScore: 7.7, difficulty: 'Easy', trend: 11, questions: 7, timeSpent: 50 },
  ],
  'Work Energy Power': [
    { topic: 'Work-Energy Theorem', accuracy: 71.5, avgScore: 7.2, difficulty: 'Medium', trend: 5, questions: 9, timeSpent: 70 },
    { topic: 'Conservation of Energy', accuracy: 68.3, avgScore: 6.8, difficulty: 'Medium', trend: 3, questions: 8, timeSpent: 80 },
    { topic: 'Power', accuracy: 67.8, avgScore: 6.8, difficulty: 'Easy', trend: 4, questions: 8, timeSpent: 55 },
  ],
  'Rotational Motion': [
    { topic: 'Moment of Inertia', accuracy: 59.2, avgScore: 5.9, difficulty: 'Hard', trend: -6, questions: 9, timeSpent: 105 },
    { topic: 'Torque', accuracy: 63.1, avgScore: 6.3, difficulty: 'Medium', trend: -4, questions: 8, timeSpent: 90 },
    { topic: 'Angular Momentum', accuracy: 61.8, avgScore: 6.2, difficulty: 'Hard', trend: -5, questions: 8, timeSpent: 120 },
  ],
  'Gravitation': [
    { topic: 'Gravitational Field', accuracy: 76.4, avgScore: 7.6, difficulty: 'Easy', trend: 9, questions: 9, timeSpent: 50 },
    { topic: 'Orbital Motion', accuracy: 71.2, avgScore: 7.1, difficulty: 'Medium', trend: 7, questions: 8, timeSpent: 70 },
    { topic: 'Kepler\'s Laws', accuracy: 73.1, avgScore: 7.3, difficulty: 'Easy', trend: 8, questions: 8, timeSpent: 55 },
  ],
};

export const questionTypeAnalysis = [
  {
    type: 'SCMCQ',
    fullName: 'Single Choice MCQ',
    accuracy: 74.2,
    avgScore: 18.5,
    totalQuestions: 180,
    timeSpent: 65,
    commonErrors: [
      'Rushing through without reading all options',
      'Misinterpreting the question stem',
      'Confusion between similar options'
    ],
    misconceptions: 'Students often select the first "correct-looking" option without checking others'
  },
  {
    type: 'MCMCQ',
    fullName: 'Multiple Choice MCQ',
    accuracy: 58.6,
    avgScore: 14.7,
    totalQuestions: 120,
    timeSpent: 110,
    commonErrors: [
      'Missing one or more correct options',
      'Including incorrect options along with correct ones',
      'Partial marking strategy not understood'
    ],
    misconceptions: 'Students struggle with identifying ALL correct options and often miss partial marks'
  },
  {
    type: 'ASSR',
    fullName: 'Assertion-Reasoning',
    accuracy: 62.4,
    avgScore: 15.6,
    totalQuestions: 100,
    timeSpent: 85,
    commonErrors: [
      'Correct assertion but wrong reason evaluation',
      'Missing logical connection between A and R',
      'Confusing "correct explanation" with "correct statement"'
    ],
    misconceptions: 'Difficulty distinguishing whether the reason correctly explains the assertion'
  },
  {
    type: 'MATCHLIST',
    fullName: 'Match the Following',
    accuracy: 55.3,
    avgScore: 13.8,
    totalQuestions: 80,
    timeSpent: 120,
    commonErrors: [
      'Cross-matching errors in complex lists',
      'Missing one match affects entire answer',
      'Time pressure leading to rushed matching'
    ],
    misconceptions: 'Students find it challenging when multiple items could seemingly match multiple options'
  },
  {
    type: 'SAN',
    fullName: 'Single Answer Numerical',
    accuracy: 51.8,
    avgScore: 12.9,
    totalQuestions: 150,
    timeSpent: 130,
    commonErrors: [
      'Calculation mistakes in final steps',
      'Sign convention errors',
      'Unit conversion mistakes',
      'Rounding errors affecting final answer'
    ],
    misconceptions: 'Students often get the method correct but make computational errors in the numpad entry'
  },
  {
    type: 'MATRIX',
    fullName: 'Matrix Match',
    accuracy: 48.2,
    avgScore: 12.1,
    totalQuestions: 60,
    timeSpent: 145,
    commonErrors: [
      'Misunderstanding row-column relationships',
      'Incorrect mapping of D/E rows to S/T columns',
      'Partial matching errors affecting overall score'
    ],
    misconceptions: 'Complex structure confuses students; they struggle to systematically match all combinations'
  },
  {
    type: 'Comprehension',
    fullName: 'Comprehension Based',
    accuracy: 65.7,
    avgScore: 16.4,
    totalQuestions: 90,
    timeSpent: 115,
    commonErrors: [
      'Not reading the full passage carefully',
      'Missing context clues in the paragraph',
      'Time management issues with long passages'
    ],
    misconceptions: 'Students often skim passages and miss crucial information needed for later questions'
  },
];

export const testRecommendations = [
  {
    id: 1,
    title: 'Reinforce Electrostatics Concepts',
    description: 'Prioritize deep conceptual questions on Gauss Law and Capacitors to address recent gaps.',
    reason: 'Accuracy dropped 18% in last 2 tests. High weightage chapter needs reinforcement.',
    impact: 'High',
    questions: {
      easy: 2,
      medium: 2,
      hard: 1
    },
    topics: ['Gauss Law', 'Capacitors', 'Electric Potential']
  },
  {
    id: 2,
    title: 'Optimize Gravitation Focus',
    description: 'Maintain maintenance-level coverage only, as students have mastered the basics.',
    reason: 'Students performing well (73.6% accuracy). Low weightage in actual exam.',
    impact: 'Medium',
    questions: {
      easy: 2,
      medium: 2,
      hard: 1
    },
    topics: ['Gravitational Field', 'Orbital Motion']
  },
  {
    id: 3,
    title: 'Enhance Problem Solving',
    description: 'Integrate multi-concept problems connecting different Physics chapters.',
    reason: 'Only 58.3% accuracy. Need more practice with complex problem-solving.',
    impact: 'High',
    questions: {
      easy: 2,
      medium: 4,
      hard: 2
    },
    topics: ['Kinematics', 'Electrostatics', 'Rotational Motion']
  },
];

export const teachingPriorities = [
  {
    id: 1,
    topic: 'Electrostatics - Gauss Law',
    subject: 'Physics',
    priority: 'Urgent',
    reason: 'Accuracy dropped to 48.7%, high exam weightage',
    estimatedHours: 4,
    tags: ['High Impact', 'Urgent'],
    weekNumber: 1,
    suggestedActivities: [
      'Conceptual revision session',
      'Practice problem solving',
      'Common mistakes discussion'
    ]
  },
  {
    id: 2,
    topic: 'Kinematics - Projectile Motion',
    subject: 'Physics',
    priority: 'High',
    reason: '48.9% accuracy, fundamental concept for mechanics',
    estimatedHours: 3,
    tags: ['High Impact', 'Revision Needed'],
    weekNumber: 1,
    suggestedActivities: [
      'Vector decomposition practice',
      'Real-world examples',
      'Graphical analysis'
    ]
  },
  {
    id: 3,
    topic: 'Electrostatics - Capacitors',
    subject: 'Physics',
    priority: 'High',
    reason: '54.1% accuracy, sign convention confusion',
    estimatedHours: 3,
    tags: ['High Impact'],
    weekNumber: 2,
    suggestedActivities: [
      'Sign convention clarification',
      'Series-parallel combinations',
      'Energy storage problems'
    ]
  },
  {
    id: 6,
    topic: 'Kinematics - Motion in 2D',
    subject: 'Physics',
    priority: 'Medium',
    reason: '52.3% accuracy, foundation for advanced mechanics',
    estimatedHours: 2,
    tags: ['Revision Needed'],
    weekNumber: 2,
    suggestedActivities: [
      'Vector addition practice',
      'Coordinate system exercises',
      'Problem-solving strategies'
    ]
  },
];

export const alerts = [
  {
    id: 1,
    type: 'critical',
    message: 'Gauss Law: Low accuracy (48.7%) + students spending 3.2 min avg (expected 2 min)',
    chapter: 'Electrostatics',
    metric: 'accuracy+time',
    accuracy: 48.7,
    avgTime: 3.2,
    expectedTime: 2,
    trend: -15,
    actionRequired: true
  },
  {
    id: 2,
    type: 'critical',
    message: 'Projectile Motion: Accuracy dropped 18% + rushing (1.1 min avg vs 2.5 expected)',
    chapter: 'Kinematics',
    metric: 'accuracy+time',
    accuracy: 48.9,
    avgTime: 1.1,
    expectedTime: 2.5,
    trend: -18,
    actionRequired: true
  },
  {
    id: 3,
    type: 'warning',
    message: 'Motion in 2D: 52.3% accuracy with 8% drop from previous tests',
    chapter: 'Kinematics',
    metric: 'accuracy',
    accuracy: 52.3,
    trend: -12,
    actionRequired: true
  },
  {
    id: 4,
    type: 'info',
    message: 'Laws of Motion: Strong +12% improvement, optimal time usage',
    chapter: 'Laws of Motion',
    metric: 'accuracy',
    accuracy: 78.5,
    trend: 12,
    actionRequired: false
  },
];

export const chatResponses = {
  'weakest topics': {
    answer: 'Based on recent test performance, here are the top 5 weakest Physics topics:',
    data: [
      { topic: 'Gauss Law (Electrostatics)', accuracy: 48.7, trend: -15 },
      { topic: 'Projectile Motion (Kinematics)', accuracy: 48.9, trend: -18 },
      { topic: 'Relative Motion (Kinematics)', accuracy: 51.2, trend: -10 },
      { topic: 'Motion in 2D (Kinematics)', accuracy: 52.3, trend: -12 },
      { topic: 'Capacitors (Electrostatics)', accuracy: 54.1, trend: -12 },
    ]
  },
  'trickiest questions': {
    answer: 'The trickiest questions in the last test were:',
    data: [
      { question: 'Gauss Law application in non-uniform fields', accuracy: 32.4, type: 'Multi-step' },
      { question: 'Projectile motion with air resistance', accuracy: 35.8, type: 'Numerical' },
      { question: 'Capacitor network with mixed connections', accuracy: 38.2, type: 'Multi-step' },
      { question: 'Rotational motion with angular momentum conservation', accuracy: 39.7, type: 'Multi-step' },
      { question: 'Magnetic field due to current carrying wire', accuracy: 41.3, type: 'Multi-step' },
    ]
  },
  'improvement areas': {
    answer: 'Key areas showing improvement:',
    data: [
      { topic: 'Laws of Motion', improvement: 12, currentAccuracy: 78.5 },
      { topic: 'Current Electricity', improvement: 5, currentAccuracy: 71.3 },
      { topic: 'Gravitation', improvement: 8, currentAccuracy: 73.6 },
      { topic: 'Work Energy Power', improvement: 4, currentAccuracy: 69.2 },
      { topic: 'Magnetism', improvement: -3, currentAccuracy: 65.7 },
    ]
  },
};
