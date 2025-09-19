export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DrawingState {
  strokes: Stroke[];
  currentSymmetryMode: SymmetryMode;
  currentBrush: BrushType;
  currentColor: string;
  gridVisible: boolean;
  gridSize: number;
}

export interface Stroke {
  id: string;
  points: Point[];
  color: string;
  brushType: BrushType;
  width: number;
  timestamp: number;
}

export interface Point {
  x: number;
  y: number;
  pressure?: number;
}

export type SymmetryMode = 
  | 'none'
  | 'horizontal'
  | 'vertical'
  | 'diagonal'
  | 'radial-4'
  | 'radial-6'
  | 'radial-8'
  | 'radial-12'
  | 'radial-16';

export type BrushType = 'thin' | 'bold' | 'dotted' | 'floral';

export interface KolamDesign {
  id: string;
  name: string;
  userId?: string;
  strokes: Stroke[];
  symmetryMode: SymmetryMode;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  isTemplate: boolean;
  description?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'traditional' | 'modern' | 'festival' | 'geometric' | 'floral';
  thumbnail?: string;
  likes?: number;
  culturalSignificance?: string;
}

export interface KolamReel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  duration: number;
  type: 'timelapse' | 'tutorial' | 'cultural' | 'technique';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  views: number;
  likes: number;
  createdAt: string;
}

export interface KolamBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'mental' | 'spiritual' | 'cultural' | 'artistic' | 'social';
  details: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'mentor';
  timestamp: string;
  language: Language;
}

export interface ChatSession {
  id: string;
  userId?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export type Language = 'en' | 'ta' | 'hi' | 'fr';

export interface TranslationKeys {
  // Navigation
  home: string;
  canvas: string;
  gallery: string;
  mentor: string;
  auth: string;
  
  // Actions
  login: string;
  signup: string;
  logout: string;
  save: string;
  export: string;
  clear: string;
  undo: string;
  redo: string;
  
  // Canvas
  symmetryMode: string;
  brushType: string;
  color: string;
  grid: string;
  
  // Common
  loading: string;
  error: string;
  success: string;
}

export interface AppState {
  auth: AuthState;
  drawing: DrawingState;
  language: Language;
  theme: 'dark' | 'light';
  chatOpen: boolean;
}

// GitHub Spark API declarations
declare global {
  interface Window {
    spark: {
      llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => string;
      llm: (prompt: string, modelName?: string, jsonMode?: boolean) => Promise<string>;
      user: () => Promise<{
        avatarUrl: string;
        email: string;
        id: string;
        isOwner: boolean;
        login: string;
      }>;
      kv: {
        keys: () => Promise<string[]>;
        get: <T>(key: string) => Promise<T | undefined>;
        set: <T>(key: string, value: T) => Promise<void>;
        delete: (key: string) => Promise<void>;
      };
    };
  }

  const spark: Window['spark'];
}