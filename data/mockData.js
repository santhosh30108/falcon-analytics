// Mock data for Falcon Faculty Analytics Dashboard

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
  { subject: 'Physics', chapter: 'Electrostatics', accuracy: 58.2, avgScore: 14.5, totalQuestions: 25, difficulty: 'Hard', trend: -18, weightage: 'High' },
  { subject: 'Physics', chapter: 'Current Electricity', accuracy: 71.3, avgScore: 17.8, totalQuestions: 25, difficulty: 'Medium', trend: 5, weightage: 'High' },
  { subject: 'Physics', chapter: 'Magnetism', accuracy: 65.7, avgScore: 16.4, totalQuestions: 25, difficulty: 'Medium', trend: -3, weightage: 'Medium' },
  { subject: 'Physics', chapter: 'Kinematics', accuracy: 54.8, avgScore: 13.7, totalQuestions: 25, difficulty: 'Medium', trend: -8, weightage: 'High' },
  { subject: 'Physics', chapter: 'Laws of Motion', accuracy: 78.5, avgScore: 19.6, totalQuestions: 25, difficulty: 'Easy', trend: 12, weightage: 'High' },
  { subject: 'Physics', chapter: 'Work Energy Power', accuracy: 69.2, avgScore: 17.3, totalQuestions: 25, difficulty: 'Medium', trend: 4, weightage: 'Medium' },
  { subject: 'Physics', chapter: 'Rotational Motion', accuracy: 61.4, avgScore: 15.4, totalQuestions: 25, difficulty: 'Hard', trend: -5, weightage: 'Medium' },
  { subject: 'Physics', chapter: 'Gravitation', accuracy: 73.6, avgScore: 18.4, totalQuestions: 25, difficulty: 'Easy', trend: 8, weightage: 'Low' },
  
  // Chemistry
  { subject: 'Chemistry', chapter: 'Chemical Bonding', accuracy: 76.4, avgScore: 19.1, totalQuestions: 25, difficulty: 'Medium', trend: 6, weightage: 'High' },
  { subject: 'Chemistry', chapter: 'Thermodynamics', accuracy: 63.8, avgScore: 16.0, totalQuestions: 25, difficulty: 'Hard', trend: -4, weightage: 'High' },
  { subject: 'Chemistry', chapter: 'Organic Chemistry', accuracy: 59.3, avgScore: 14.8, totalQuestions: 25, difficulty: 'Hard', trend: -12, weightage: 'High' },
  { subject: 'Chemistry', chapter: 'Electrochemistry', accuracy: 71.9, avgScore: 18.0, totalQuestions: 25, difficulty: 'Medium', trend: 7, weightage: 'Medium' },
  { subject: 'Chemistry', chapter: 'Chemical Kinetics', accuracy: 68.5, avgScore: 17.1, totalQuestions: 25, difficulty: 'Medium', trend: 2, weightage: 'Medium' },
  
  // Mathematics
  { subject: 'Mathematics', chapter: 'Calculus', accuracy: 64.2, avgScore: 16.1, totalQuestions: 25, difficulty: 'Hard', trend: -6, weightage: 'High' },
  { subject: 'Mathematics', chapter: 'Algebra', accuracy: 72.8, avgScore: 18.2, totalQuestions: 25, difficulty: 'Medium', trend: 9, weightage: 'High' },
  { subject: 'Mathematics', chapter: 'Trigonometry', accuracy: 69.7, avgScore: 17.4, totalQuestions: 25, difficulty: 'Medium', trend: 3, weightage: 'High' },
  { subject: 'Mathematics', chapter: 'Coordinate Geometry', accuracy: 66.3, avgScore: 16.6, totalQuestions: 25, difficulty: 'Medium', trend: -2, weightage: 'Medium' },
  { subject: 'Mathematics', chapter: 'Probability', accuracy: 74.5, avgScore: 18.6, totalQuestions: 25, difficulty: 'Easy', trend: 11, weightage: 'Medium' },
];

export const topicBreakdown = {
  // Physics
  'Electrostatics': [
    { topic: 'Electric Field', accuracy: 62.3, avgScore: 6.2, difficulty: 'Medium', trend: -5, questions: 10 },
    { topic: 'Gauss Law', accuracy: 48.7, avgScore: 4.9, difficulty: 'Hard', trend: -15, questions: 8 },
    { topic: 'Capacitors', accuracy: 54.1, avgScore: 5.4, difficulty: 'Hard', trend: -12, questions: 10 },
    { topic: 'Electric Potential', accuracy: 66.8, avgScore: 6.7, difficulty: 'Medium', trend: -8, questions: 7 },
  ],
  'Current Electricity': [
    { topic: 'Ohm\'s Law', accuracy: 75.2, avgScore: 7.5, difficulty: 'Easy', trend: 8, questions: 8 },
    { topic: 'Kirchhoff\'s Laws', accuracy: 68.4, avgScore: 6.8, difficulty: 'Medium', trend: 3, questions: 10 },
    { topic: 'Resistor Networks', accuracy: 70.1, avgScore: 7.0, difficulty: 'Medium', trend: 6, questions: 9 },
  ],
  'Magnetism': [
    { topic: 'Magnetic Field', accuracy: 67.8, avgScore: 6.8, difficulty: 'Medium', trend: -2, questions: 9 },
    { topic: 'Magnetic Force', accuracy: 64.2, avgScore: 6.4, difficulty: 'Medium', trend: -4, questions: 8 },
    { topic: 'Electromagnetic Induction', accuracy: 65.1, avgScore: 6.5, difficulty: 'Hard', trend: -3, questions: 8 },
  ],
  'Kinematics': [
    { topic: 'Motion in 1D', accuracy: 68.4, avgScore: 6.8, difficulty: 'Easy', trend: 4, questions: 10 },
    { topic: 'Motion in 2D', accuracy: 52.3, avgScore: 5.2, difficulty: 'Hard', trend: -12, questions: 9 },
    { topic: 'Projectile Motion', accuracy: 48.9, avgScore: 4.9, difficulty: 'Hard', trend: -18, questions: 8 },
    { topic: 'Relative Motion', accuracy: 51.2, avgScore: 5.1, difficulty: 'Medium', trend: -10, questions: 8 },
  ],
  'Laws of Motion': [
    { topic: 'Newton\'s Laws', accuracy: 82.1, avgScore: 8.2, difficulty: 'Easy', trend: 15, questions: 10 },
    { topic: 'Free Body Diagrams', accuracy: 76.3, avgScore: 7.6, difficulty: 'Medium', trend: 10, questions: 8 },
    { topic: 'Friction', accuracy: 77.2, avgScore: 7.7, difficulty: 'Easy', trend: 11, questions: 7 },
  ],
  'Work Energy Power': [
    { topic: 'Work-Energy Theorem', accuracy: 71.5, avgScore: 7.2, difficulty: 'Medium', trend: 5, questions: 9 },
    { topic: 'Conservation of Energy', accuracy: 68.3, avgScore: 6.8, difficulty: 'Medium', trend: 3, questions: 8 },
    { topic: 'Power', accuracy: 67.8, avgScore: 6.8, difficulty: 'Easy', trend: 4, questions: 8 },
  ],
  'Rotational Motion': [
    { topic: 'Moment of Inertia', accuracy: 59.2, avgScore: 5.9, difficulty: 'Hard', trend: -6, questions: 9 },
    { topic: 'Torque', accuracy: 63.1, avgScore: 6.3, difficulty: 'Medium', trend: -4, questions: 8 },
    { topic: 'Angular Momentum', accuracy: 61.8, avgScore: 6.2, difficulty: 'Hard', trend: -5, questions: 8 },
  ],
  'Gravitation': [
    { topic: 'Gravitational Field', accuracy: 76.4, avgScore: 7.6, difficulty: 'Easy', trend: 9, questions: 9 },
    { topic: 'Orbital Motion', accuracy: 71.2, avgScore: 7.1, difficulty: 'Medium', trend: 7, questions: 8 },
    { topic: 'Kepler\'s Laws', accuracy: 73.1, avgScore: 7.3, difficulty: 'Easy', trend: 8, questions: 8 },
  ],
  
  // Chemistry
  'Chemical Bonding': [
    { topic: 'Ionic Bonding', accuracy: 79.3, avgScore: 7.9, difficulty: 'Easy', trend: 8, questions: 8 },
    { topic: 'Covalent Bonding', accuracy: 75.1, avgScore: 7.5, difficulty: 'Medium', trend: 5, questions: 9 },
    { topic: 'Molecular Geometry', accuracy: 74.8, avgScore: 7.5, difficulty: 'Medium', trend: 6, questions: 8 },
  ],
  'Thermodynamics': [
    { topic: 'First Law', accuracy: 67.2, avgScore: 6.7, difficulty: 'Medium', trend: -2, questions: 8 },
    { topic: 'Enthalpy', accuracy: 61.5, avgScore: 6.2, difficulty: 'Hard', trend: -5, questions: 9 },
    { topic: 'Entropy', accuracy: 62.7, avgScore: 6.3, difficulty: 'Hard', trend: -4, questions: 8 },
  ],
  'Organic Chemistry': [
    { topic: 'Nomenclature', accuracy: 71.2, avgScore: 7.1, difficulty: 'Easy', trend: 5, questions: 10 },
    { topic: 'Reaction Mechanisms', accuracy: 45.8, avgScore: 4.6, difficulty: 'Hard', trend: -20, questions: 12 },
    { topic: 'Isomerism', accuracy: 62.4, avgScore: 6.2, difficulty: 'Medium', trend: -8, questions: 8 },
    { topic: 'Functional Groups', accuracy: 58.7, avgScore: 5.9, difficulty: 'Medium', trend: -14, questions: 10 },
  ],
  'Electrochemistry': [
    { topic: 'Redox Reactions', accuracy: 74.3, avgScore: 7.4, difficulty: 'Medium', trend: 8, questions: 9 },
    { topic: 'Electrochemical Cells', accuracy: 70.2, avgScore: 7.0, difficulty: 'Medium', trend: 6, questions: 8 },
    { topic: 'Nernst Equation', accuracy: 71.1, avgScore: 7.1, difficulty: 'Hard', trend: 7, questions: 8 },
  ],
  'Chemical Kinetics': [
    { topic: 'Rate Laws', accuracy: 70.8, avgScore: 7.1, difficulty: 'Medium', trend: 3, questions: 9 },
    { topic: 'Reaction Mechanisms', accuracy: 66.5, avgScore: 6.7, difficulty: 'Hard', trend: 1, questions: 8 },
    { topic: 'Catalysis', accuracy: 68.2, avgScore: 6.8, difficulty: 'Medium', trend: 2, questions: 8 },
  ],
  
  // Mathematics
  'Calculus': [
    { topic: 'Limits', accuracy: 72.5, avgScore: 7.3, difficulty: 'Easy', trend: 8, questions: 10 },
    { topic: 'Derivatives', accuracy: 63.8, avgScore: 6.4, difficulty: 'Medium', trend: -3, questions: 12 },
    { topic: 'Integration', accuracy: 58.2, avgScore: 5.8, difficulty: 'Hard', trend: -12, questions: 13 },
    { topic: 'Applications', accuracy: 61.7, avgScore: 6.2, difficulty: 'Medium', trend: -5, questions: 10 },
  ],
  'Algebra': [
    { topic: 'Quadratic Equations', accuracy: 76.4, avgScore: 7.6, difficulty: 'Easy', trend: 11, questions: 9 },
    { topic: 'Complex Numbers', accuracy: 70.1, avgScore: 7.0, difficulty: 'Medium', trend: 8, questions: 8 },
    { topic: 'Sequences & Series', accuracy: 71.9, avgScore: 7.2, difficulty: 'Medium', trend: 9, questions: 8 },
  ],
  'Trigonometry': [
    { topic: 'Trigonometric Ratios', accuracy: 73.2, avgScore: 7.3, difficulty: 'Easy', trend: 5, questions: 9 },
    { topic: 'Trigonometric Identities', accuracy: 67.8, avgScore: 6.8, difficulty: 'Medium', trend: 2, questions: 8 },
    { topic: 'Inverse Functions', accuracy: 68.1, avgScore: 6.8, difficulty: 'Medium', trend: 3, questions: 8 },
  ],
  'Coordinate Geometry': [
    { topic: 'Straight Lines', accuracy: 70.2, avgScore: 7.0, difficulty: 'Easy', trend: 1, questions: 9 },
    { topic: 'Circles', accuracy: 64.1, avgScore: 6.4, difficulty: 'Medium', trend: -4, questions: 8 },
    { topic: 'Conic Sections', accuracy: 64.7, avgScore: 6.5, difficulty: 'Hard', trend: -3, questions: 8 },
  ],
  'Probability': [
    { topic: 'Basic Probability', accuracy: 78.3, avgScore: 7.8, difficulty: 'Easy', trend: 13, questions: 9 },
    { topic: 'Conditional Probability', accuracy: 72.1, avgScore: 7.2, difficulty: 'Medium', trend: 10, questions: 8 },
    { topic: 'Distributions', accuracy: 73.2, avgScore: 7.3, difficulty: 'Medium', trend: 11, questions: 8 },
  ],
};

export const questionTypeAnalysis = [
  {
    type: 'Conceptual',
    accuracy: 71.4,
    avgScore: 17.9,
    totalQuestions: 150,
    commonErrors: [
      'Misunderstanding of fundamental concepts',
      'Confusion between similar principles',
      'Incorrect application of theory'
    ],
    misconceptions: 'Students often confuse the direction of electric field with force direction'
  },
  {
    type: 'Numerical',
    accuracy: 64.8,
    avgScore: 16.2,
    totalQuestions: 200,
    commonErrors: [
      'Calculation mistakes',
      'Unit conversion errors',
      'Sign convention mistakes'
    ],
    misconceptions: 'Sign convention in capacitor problems causes frequent errors'
  },
  {
    type: 'Multi-step',
    accuracy: 58.3,
    avgScore: 14.6,
    totalQuestions: 180,
    commonErrors: [
      'Missing intermediate steps',
      'Incorrect sequencing',
      'Partial solution attempts'
    ],
    misconceptions: 'Students struggle with breaking down complex problems into manageable steps'
  },
  {
    type: 'Assertion-Reason',
    accuracy: 67.2,
    avgScore: 16.8,
    totalQuestions: 120,
    commonErrors: [
      'Correct assertion but wrong reason',
      'Missing logical connection',
      'Incomplete reasoning'
    ],
    misconceptions: 'Difficulty in establishing cause-effect relationships'
  },
];

export const testRecommendations = [
  {
    id: 1,
    title: 'Increase Electrostatics Coverage',
    description: 'Add 5 more questions on Gauss Law and Capacitors',
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
    title: 'Reduce Gravitation Questions',
    description: 'Decrease from 8 to 5 questions',
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
    title: 'Add Multi-step Problems',
    description: 'Include 8 multi-step problems across Physics chapters',
    reason: 'Only 58.3% accuracy. Need more practice with complex problem-solving.',
    impact: 'High',
    questions: {
      easy: 2,
      medium: 4,
      hard: 2
    },
    topics: ['Kinematics', 'Electrostatics', 'Rotational Motion']
  },
  {
    id: 4,
    title: 'Balance Organic Chemistry Difficulty',
    description: 'Adjust difficulty distribution: 40% Easy, 40% Medium, 20% Hard',
    reason: 'Current distribution too hard. Students struggling with reaction mechanisms.',
    impact: 'High',
    questions: {
      easy: 4,
      medium: 4,
      hard: 2
    },
    topics: ['Nomenclature', 'Functional Groups', 'Isomerism', 'Reaction Mechanisms']
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
    topic: 'Organic Chemistry - Reaction Mechanisms',
    subject: 'Chemistry',
    priority: 'Urgent',
    reason: 'Only 45.8% accuracy, critical for organic chemistry',
    estimatedHours: 5,
    tags: ['High Impact', 'Urgent'],
    weekNumber: 1,
    suggestedActivities: [
      'Step-by-step mechanism breakdown',
      'Electron movement practice',
      'Pattern recognition exercises'
    ]
  },
  {
    id: 4,
    topic: 'Calculus - Integration',
    subject: 'Mathematics',
    priority: 'High',
    reason: '58.2% accuracy, high weightage in JEE',
    estimatedHours: 4,
    tags: ['High Impact', 'Revision Needed'],
    weekNumber: 2,
    suggestedActivities: [
      'Formula revision',
      'Substitution techniques',
      'Application problems'
    ]
  },
  {
    id: 5,
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
    message: 'Electrostatics accuracy dropped 18% in last 2 tests',
    subject: 'Physics',
    chapter: 'Electrostatics',
    actionRequired: true
  },
  {
    id: 2,
    type: 'warning',
    message: 'Kinematics is high-weightage but low-performing (54.8% accuracy)',
    subject: 'Physics',
    chapter: 'Kinematics',
    actionRequired: true
  },
  {
    id: 3,
    type: 'warning',
    message: 'Organic Chemistry reaction mechanisms showing 45.8% accuracy',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry',
    actionRequired: true
  },
  {
    id: 4,
    type: 'info',
    message: 'Laws of Motion showing strong improvement (+12%)',
    subject: 'Physics',
    chapter: 'Laws of Motion',
    actionRequired: false
  },
  {
    id: 5,
    type: 'info',
    message: 'Probability performance excellent (74.5% accuracy)',
    subject: 'Mathematics',
    chapter: 'Probability',
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
      { question: 'Organic reaction mechanism prediction', accuracy: 39.7, type: 'Conceptual' },
      { question: 'Integration by parts (complex)', accuracy: 41.3, type: 'Multi-step' },
    ]
  },
  'improvement areas': {
    answer: 'Key areas showing improvement:',
    data: [
      { topic: 'Laws of Motion', improvement: 12, currentAccuracy: 78.5 },
      { topic: 'Probability', improvement: 11, currentAccuracy: 74.5 },
      { topic: 'Algebra', improvement: 9, currentAccuracy: 72.8 },
      { topic: 'Gravitation', improvement: 8, currentAccuracy: 73.6 },
      { topic: 'Limits (Calculus)', improvement: 8, currentAccuracy: 72.5 },
    ]
  },
};
