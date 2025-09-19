import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatCircle, PaperPlaneRight, X, Robot, User as UserIcon } from '@phosphor-icons/react';
import { Language, ChatMessage } from '@/types';
import { useTranslation } from '@/lib/translations';
import { useKV } from '@github/spark/hooks';
import { useAuth } from '@/hooks/use-auth';

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export function ChatOverlay({ isOpen, onClose, language }: ChatOverlayProps) {
  const [messages, setMessages] = useKV<ChatMessage[]>('kolam-chat-history', []);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const t = useTranslation(language);

  // GitHub Spark API integration for mentor responses
  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/mentor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          language: language
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      return data.message || "I apologize, but I'm having trouble responding right now. Please try again.";
    } catch (error) {
      console.error('Error calling mentor API:', error);
      
      // Fallback response in case API fails
      const fallbackResponses: Record<Language, string> = {
        en: "I'm experiencing a connection issue. Let me share this: Kolam art is a beautiful blend of mathematics and spirituality, where every pattern reflects cosmic harmony.",
        ta: "இணைப்பு சிக்கல் உள்ளது. இதைப் பகிர்ந்து கொள்கிறேன்: கோலம் கலை கணிதம் மற்றும் ஆன்மீகத்தின் அழகான கலவையாகும்.",
        hi: "मुझे कनेक्शन की समस्या है। यह साझा करता हूं: कोलम कला गणित और आध्यात्म का सुंदर मिश्रण है।",
        fr: "J'ai un problème de connexion. Permettez-moi de partager ceci : l'art kolam est un beau mélange de mathématiques et de spiritualité."
      };
      
      return fallbackResponses[language];
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add welcome message if chat is empty
  useEffect(() => {
    if (isOpen && (!messages || messages.length === 0)) {
      const welcomeMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        content: language === 'en' ? 
          "🙏 Welcome! I'm your Kolam AI mentor. Ask me about sacred geometry, traditional patterns, drawing techniques, or the cultural significance of kolam art." :
          language === 'ta' ?
          "🙏 வணக்கம்! நான் உங்கள் கோலம் AI குரு. புனித வடிவவியல், பாரம்பரிய வடிவங்கள், வரைபட நுட்பங்கள் அல்லது கோலம் கலையின் கலாச்சார முக்கியத்துவம் பற்றி கேளுங்கள்." :
          language === 'hi' ?
          "🙏 नमस्ते! मैं आपका कोलम AI गुरु हूं। मुझसे पवित्र ज्यामिति, पारंपरिक पैटर्न, चित्रकला तकनीक, या कोलम कला के सांस्कृतिक महत्व के बारे में पूछें।" :
          "🙏 Bonjour ! Je suis votre mentor IA Kolam. Demandez-moi des informations sur la géométrie sacrée, les motifs traditionnels, les techniques de dessin ou la signification culturelle de l'art kolam.",
        sender: 'mentor',
        timestamp: new Date().toISOString(),
        language
      };
      
      setMessages([welcomeMessage]);
    }
  }, [isOpen, language]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_user`,
      content: currentMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      language
    };

    setMessages(prev => [...(prev || []), userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(currentMessage);
      
      const mentorMessage: ChatMessage = {
        id: `msg_${Date.now()}_mentor`,
        content: aiResponse,
        sender: 'mentor',
        timestamp: new Date().toISOString(),
        language
      };

      setMessages(prev => [...(prev || []), mentorMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] bg-card/95 backdrop-blur-sm glow-accent">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
              <Robot size={20} className="text-accent" />
            </div>
            <div>
              <CardTitle className="text-lg">
                {language === 'en' && 'Kolam AI Mentor'}
                {language === 'ta' && 'கோலம் AI குரு'}
                {language === 'hi' && 'कोलम AI गुरु'}
                {language === 'fr' && 'Mentor IA Kolam'}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {language === 'en' && 'Your cultural guide and drawing assistant'}
                {language === 'ta' && 'உங்கள் கலாச்சார வழிகாட்டி மற்றும் வரைபட உதவியாளர்'}
                {language === 'hi' && 'आपका सांस्कृतिक गाइड और ड्रॉइंग असिस्टेंट'}
                {language === 'fr' && 'Votre guide culturel et assistant de dessin'}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={16} />
          </Button>
        </CardHeader>

        <CardContent className="flex flex-col h-[500px]">
          {/* Messages */}
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-4">
              {(messages || []).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-primary/20' 
                        : 'bg-accent/20'
                    }`}>
                      {message.sender === 'user' ? (
                        <UserIcon size={16} className="text-primary" />
                      ) : (
                        <Robot size={16} className="text-accent" />
                      )}
                    </div>
                    <div className={`rounded-lg px-3 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-accent/20">
                      <Robot size={16} className="text-accent" />
                    </div>
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                language === 'en' ? 'Ask about kolam patterns, symmetry, or cultural meaning...' :
                language === 'ta' ? 'கோலம் வடிவங்கள், சமச்சீர் அல்லது கலாச்சார அர்த்தத்தைப் பற்றி கேளுங்கள்...' :
                language === 'hi' ? 'कोलम पैटर्न, समरूपता, या सांस्कृतिक अर्थ के बारे में पूछें...' :
                'Demandez des informations sur les motifs kolam, la symétrie ou la signification culturelle...'
              }
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!currentMessage.trim() || isLoading}
              className="glow-primary"
            >
              <PaperPlaneRight size={16} />
            </Button>
          </div>

          {/* Quick Questions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              language === 'en' ? 'What is kolam?' : 
              language === 'ta' ? 'கோலம் என்றால் என்ன?' :
              language === 'hi' ? 'कोलम क्या है?' : 
              'Qu\'est-ce que le kolam ?',
              
              language === 'en' ? 'Explain symmetry' : 
              language === 'ta' ? 'சமச்சீரை விளக்கவும்' :
              language === 'hi' ? 'समरूपता समझाएं' : 
              'Expliquer la symétrie',
              
              language === 'en' ? 'Color meanings' : 
              language === 'ta' ? 'நிற அர்த்தங்கள்' :
              language === 'hi' ? 'रंग के अर्थ' : 
              'Signification des couleurs'
            ].map((question) => (
              <Button
                key={question}
                variant="outline"
                size="sm"
                onClick={() => setCurrentMessage(question)}
                className="text-xs"
                disabled={isLoading}
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}