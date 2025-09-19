import { KolamDesign, KolamReel, KolamBenefit } from '@/types';

// Enhanced kolam templates with cultural significance
export const kolamTemplates: KolamDesign[] = [
  {
    id: 'lotus-mandala',
    name: 'Sacred Lotus Mandala',
    strokes: [], // Would contain actual stroke data
    symmetryMode: 'radial-8',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    tags: ['lotus', 'mandala', 'spiritual', 'sacred'],
    isTemplate: true,
    difficulty: 'intermediate',
    category: 'traditional',
    description: 'A sacred lotus pattern representing purity and enlightenment',
    culturalSignificance: 'The lotus emerges from muddy waters yet blooms pure, symbolizing spiritual awakening',
    likes: 245
  },
  {
    id: 'peacock-symmetry',
    name: 'Dancing Peacock',
    strokes: [],
    symmetryMode: 'radial-6',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    tags: ['peacock', 'dance', 'beauty', 'grace'],
    isTemplate: true,
    difficulty: 'advanced',
    category: 'traditional',
    description: 'Elegant peacock design with flowing feathers in radial symmetry',
    culturalSignificance: 'Peacocks represent beauty, grace, and the divine dance of creation',
    likes: 189
  },
  {
    id: 'cosmic-wheel',
    name: 'Cosmic Wheel (Chakra)',
    strokes: [],
    symmetryMode: 'radial-12',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    tags: ['chakra', 'cosmic', 'meditation', 'divine'],
    isTemplate: true,
    difficulty: 'advanced',
    category: 'geometric',
    description: 'Intricate 12-spoke cosmic wheel representing universal harmony',
    culturalSignificance: 'The cosmic wheel symbolizes the cycle of time and cosmic order',
    likes: 312
  },
  {
    id: 'festival-rangoli',
    name: 'Diwali Celebration',
    strokes: [],
    symmetryMode: 'radial-16',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    tags: ['diwali', 'festival', 'celebration', 'lights'],
    isTemplate: true,
    difficulty: 'intermediate',
    category: 'festival',
    description: 'Vibrant festival kolam with intricate patterns for Diwali celebrations',
    culturalSignificance: 'Festival kolams welcome prosperity and light into homes during celebrations',
    likes: 567
  },
  {
    id: 'simple-geometric',
    name: 'Beginner\'s Delight',
    strokes: [],
    symmetryMode: 'radial-4',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    tags: ['simple', 'beginner', 'geometric', 'learning'],
    isTemplate: true,
    difficulty: 'beginner',
    category: 'geometric',
    description: 'Simple geometric pattern perfect for beginners to learn symmetry',
    culturalSignificance: 'Simple patterns teach the fundamentals of sacred geometry',
    likes: 123
  }
];

// Kolam reels showcasing techniques and culture
export const kolamReels: KolamReel[] = [
  {
    id: 'reel-1',
    title: 'Morning Kolam Ritual',
    description: 'Watch a traditional Tamil grandmother create a beautiful kolam at dawn',
    thumbnail: '/api/placeholder/300/200',
    duration: 180,
    type: 'cultural',
    difficulty: 'intermediate',
    tags: ['traditional', 'morning', 'ritual', 'culture'],
    views: 12450,
    likes: 892,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'reel-2',
    title: '8-Way Radial Symmetry Tutorial',
    description: 'Master the technique of creating perfect radial symmetry kolams',
    thumbnail: '/api/placeholder/300/200',
    duration: 240,
    type: 'tutorial',
    difficulty: 'intermediate',
    tags: ['symmetry', 'tutorial', 'radial', 'technique'],
    views: 8934,
    likes: 567,
    createdAt: '2024-01-02T00:00:00Z'
  },
  {
    id: 'reel-3',
    title: 'Festival Kolam Timelapse',
    description: 'Mesmerizing timelapse of creating an elaborate Pongal festival kolam',
    thumbnail: '/api/placeholder/300/200',
    duration: 120,
    type: 'timelapse',
    difficulty: 'advanced',
    tags: ['festival', 'pongal', 'timelapse', 'elaborate'],
    views: 15678,
    likes: 1234,
    createdAt: '2024-01-03T00:00:00Z'
  },
  {
    id: 'reel-4',
    title: 'Modern Digital Kolam',
    description: 'Fusion of traditional patterns with modern digital art techniques',
    thumbnail: '/api/placeholder/300/200',
    duration: 200,
    type: 'technique',
    difficulty: 'intermediate',
    tags: ['modern', 'digital', 'fusion', 'innovation'],
    views: 6789,
    likes: 445,
    createdAt: '2024-01-04T00:00:00Z'
  },
  {
    id: 'reel-5',
    title: 'Beginner\'s First Kolam',
    description: 'Step-by-step guide for creating your very first kolam pattern',
    thumbnail: '/api/placeholder/300/200',
    duration: 300,
    type: 'tutorial',
    difficulty: 'beginner',
    tags: ['beginner', 'first', 'guide', 'basics'],
    views: 23456,
    likes: 1567,
    createdAt: '2024-01-05T00:00:00Z'
  }
];

// Benefits of practicing kolam art
export const kolamBenefits: KolamBenefit[] = [
  {
    id: 'mental-focus',
    title: 'Enhanced Mental Focus',
    description: 'Creating kolams improves concentration and mindfulness through geometric precision',
    icon: 'brain',
    category: 'mental',
    details: [
      'Improves hand-eye coordination',
      'Enhances spatial awareness',
      'Develops pattern recognition skills',
      'Promotes mindful meditation'
    ]
  },
  {
    id: 'spiritual-connection',
    title: 'Spiritual Connection',
    description: 'Connect with ancient traditions and find inner peace through sacred geometry',
    icon: 'lotus',
    category: 'spiritual',
    details: [
      'Connects with ancestral wisdom',
      'Promotes spiritual reflection',
      'Creates meditative states',
      'Aligns with cosmic patterns'
    ]
  },
  {
    id: 'cultural-preservation',
    title: 'Cultural Preservation',
    description: 'Keep traditional art forms alive while sharing them with the global community',
    icon: 'heritage',
    category: 'cultural',
    details: [
      'Preserves ancient art forms',
      'Shares cultural knowledge',
      'Bridges generational gaps',
      'Promotes cultural appreciation'
    ]
  },
  {
    id: 'artistic-expression',
    title: 'Artistic Expression',
    description: 'Develop creativity and artistic skills through symmetrical pattern creation',
    icon: 'palette',
    category: 'artistic',
    details: [
      'Develops color theory understanding',
      'Enhances design thinking',
      'Improves aesthetic sense',
      'Encourages creative experimentation'
    ]
  },
  {
    id: 'stress-relief',
    title: 'Stress Relief & Relaxation',
    description: 'The repetitive, meditative nature of kolam creation reduces stress and anxiety',
    icon: 'peace',
    category: 'mental',
    details: [
      'Reduces cortisol levels',
      'Promotes relaxation response',
      'Provides mental escape',
      'Improves overall well-being'
    ]
  },
  {
    id: 'community-building',
    title: 'Community Building',
    description: 'Share your creations and connect with fellow kolam enthusiasts worldwide',
    icon: 'community',
    category: 'social',
    details: [
      'Builds online communities',
      'Facilitates knowledge sharing',
      'Creates cultural connections',
      'Encourages collaborative learning'
    ]
  }
];

// Kolam creation suggestions for different occasions
export const kolamSuggestions = {
  daily: [
    'Create a simple 4-way radial pattern for your morning practice',
    'Try alternating between geometric and floral motifs',
    'Use earth tones for a calming daily ritual'
  ],
  festival: [
    'Design elaborate 12 or 16-way radial patterns for Diwali',
    'Incorporate traditional symbols like lotus, peacock, or conch',
    'Use vibrant colors and add decorative elements'
  ],
  meditation: [
    'Focus on circular mandalas with 8-way symmetry',
    'Use monochrome colors to enhance concentration',
    'Create flowing, unbroken lines for meditative flow'
  ],
  beginners: [
    'Start with simple geometric shapes and 4-way symmetry',
    'Practice creating perfect circles and straight lines',
    'Focus on understanding grid alignment and spacing'
  ]
};