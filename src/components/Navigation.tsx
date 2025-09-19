import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  House as Home, 
  Palette, 
  Image, 
  ChatCircle as MessageCircle, 
  User,
  Globe,
  SignOut as LogOut
} from '@phosphor-icons/react';
import { useAuth } from '@/hooks/use-auth';
import { Language } from '@/types';
import { useTranslation } from '@/lib/translations';

interface NavigationProps {
  currentPage: 'home' | 'canvas' | 'gallery' | 'auth';
  onNavigate: (page: 'home' | 'canvas' | 'gallery' | 'auth') => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onChatToggle: () => void;
}

const languageOptions = [
  { code: 'en' as Language, label: 'English', flag: '🇺🇸' },
  { code: 'ta' as Language, label: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi' as Language, label: 'हिंदी', flag: '🇮🇳' },
  { code: 'fr' as Language, label: 'Français', flag: '🇫🇷' }
];

export function Navigation({ 
  currentPage, 
  onNavigate, 
  language, 
  onLanguageChange,
  onChatToggle 
}: NavigationProps) {
  const [languageOpen, setLanguageOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const t = useTranslation(language);

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg glow-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Kolam AI
          </span>
        </div>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center space-x-2">
          <Button
            variant={currentPage === 'home' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2"
          >
            <Home size={16} />
            <span>{t('home')}</span>
          </Button>

          <Button
            variant={currentPage === 'canvas' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('canvas')}
            className="flex items-center space-x-2"
          >
            <Palette size={16} />
            <span>{t('canvas')}</span>
          </Button>

          <Button
            variant={currentPage === 'gallery' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('gallery')}
            className="flex items-center space-x-2"
          >
            <Image size={16} />
            <span>{t('gallery')}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onChatToggle}
            className="flex items-center space-x-2 glow-accent"
          >
            <MessageCircle size={16} />
            <span>{t('mentor')}</span>
          </Button>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-3">
          {/* Language Switcher */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center space-x-2"
            >
              <Globe size={16} />
              <span className="hidden sm:inline">{currentLanguage?.flag}</span>
            </Button>

            {languageOpen && (
              <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-md shadow-lg min-w-[150px] z-10">
                {languageOptions.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setLanguageOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-accent/10 flex items-center space-x-2 text-sm"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Controls */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline text-sm text-muted-foreground">
                {user?.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="flex items-center space-x-2"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">{t('logout')}</span>
              </Button>
            </div>
          ) : (
            <Button
              variant={currentPage === 'auth' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onNavigate('auth')}
              className="flex items-center space-x-2"
            >
              <User size={16} />
              <span>{t('auth')}</span>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border px-4 py-2">
        <div className="flex justify-around">
          <Button
            variant={currentPage === 'home' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('home')}
          >
            <Home size={20} />
          </Button>
          <Button
            variant={currentPage === 'canvas' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('canvas')}
          >
            <Palette size={20} />
          </Button>
          <Button
            variant={currentPage === 'gallery' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onNavigate('gallery')}
          >
            <Image size={20} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onChatToggle}
            className="glow-accent"
          >
            <MessageCircle size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
}