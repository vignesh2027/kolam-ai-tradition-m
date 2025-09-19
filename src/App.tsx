import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/hooks/use-auth';
import { Navigation } from '@/components/Navigation';
import { HomePage } from '@/components/HomePage';
import { CanvasPage } from '@/components/CanvasPage';
import { GalleryPage } from '@/components/GalleryPage';
import { AuthPage } from '@/components/AuthPage';
import { ChatOverlay } from '@/components/ChatOverlay';
import { Language } from '@/types';
import { useKV } from '@github/spark/hooks';

type Page = 'home' | 'canvas' | 'gallery' | 'auth';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [language, setLanguage] = useKV<Language>('kolam-language', 'en');
  const [chatOpen, setChatOpen] = useState(false);

  // Detect browser language on first load
  useEffect(() => {
    if (!language) {
      const browserLang = navigator.language.split('-')[0] as Language;
      const supportedLangs: Language[] = ['en', 'ta', 'hi', 'fr'];
      if (supportedLangs.includes(browserLang)) {
        setLanguage(browserLang);
      } else {
        setLanguage('en');
      }
    }
  }, []);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            language={language || 'en'} 
            onNavigate={handleNavigate}
            onChatToggle={handleChatToggle}
          />
        );
      case 'canvas':
        return <CanvasPage language={language || 'en'} />;
      case 'gallery':
        return <GalleryPage language={language || 'en'} />;
      case 'auth':
        return (
          <AuthPage 
            language={language || 'en'} 
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <HomePage 
            language={language || 'en'} 
            onNavigate={handleNavigate}
            onChatToggle={handleChatToggle}
          />
        );
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          language={language || 'en'}
          onLanguageChange={handleLanguageChange}
          onChatToggle={handleChatToggle}
        />
        
        <main>
          {renderCurrentPage()}
        </main>

        <ChatOverlay
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          language={language || 'en'}
        />

        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
      </div>
    </AuthProvider>
  );
}

export default App;