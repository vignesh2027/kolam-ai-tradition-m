import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useKV } from '@github/spark/hooks';
import { User, AuthState } from '../types';
import { toast } from 'sonner';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [users, setUsers] = useKV<Record<string, User & { password: string }>>('kolam-users', {});
  const [currentUserId, setCurrentUserId, deleteCurrentUserId] = useKV<string | null>('kolam-current-user', null);
  const [isLoading, setIsLoading] = useState(true);

  // Get current user from stored users
  const currentUser = currentUserId && users ? users[currentUserId] : null;
  const user: User | null = currentUser ? {
    id: currentUser.id,
    email: currentUser.email,
    name: currentUser.name,
    createdAt: currentUser.createdAt
  } : null;

  useEffect(() => {
    // Initialize auth state
    setIsLoading(false);
  }, [currentUserId]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Find user by email
    const userEntry = Object.values(users || {}).find(u => u.email === email);
    
    if (!userEntry || userEntry.password !== password) {
      toast.error('Invalid email or password');
      setIsLoading(false);
      return false;
    }

    setCurrentUserId(userEntry.id);
    toast.success(`Welcome back, ${userEntry.name}!`);
    setIsLoading(false);
    return true;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);

    // Check if user already exists
    const existingUser = Object.values(users || {}).find(u => u.email === email);
    if (existingUser) {
      toast.error('User with this email already exists');
      setIsLoading(false);
      return false;
    }

    // Create new user
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newUser: User & { password: string } = {
      id: userId,
      email,
      name,
      password,
      createdAt: new Date().toISOString()
    };

    setUsers(currentUsers => ({
      ...currentUsers,
      [userId]: newUser
    }));

    setCurrentUserId(userId);
    toast.success(`Welcome to Kolam AI, ${name}!`);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    deleteCurrentUserId();
    toast.success('Logged out successfully');
  };

  const authState: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}