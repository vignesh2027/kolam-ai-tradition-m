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

  // Sample AI responses based on language
  const getAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const responses: Record<Language, Record<string, string>> = {
      en: {
        greeting: "Hello! I'm your Kolam mentor. I can help you understand the sacred geometry, cultural significance, and drawing techniques of kolam art. What would you like to learn?",
        symmetry: "Kolam patterns are based on mathematical symmetry principles. Radial symmetry (like 8-way) creates mandala-like patterns representing cosmic harmony. Each axis represents a different spiritual direction or element.",
        dots: "Dots in kolam represent the universe's fundamental building blocks. Traditional kolams start with a dot grid because dots symbolize potential energy - each dot can become the center of infinite possibilities.",
        meaning: "Kolam is more than art - it's a spiritual practice. The continuous lines represent life's interconnectedness, while the geometric patterns invoke cosmic order and invite prosperity into the home.",
        colors: "Traditional kolams use white rice flour for purity, red kumkum for energy and auspiciousness, and sometimes turmeric yellow for prosperity. Each color carries spiritual meaning.",
        default: "That's a great question about kolam! Each pattern tells a story of cosmic harmony and spiritual balance. Try experimenting with different symmetry modes to discover new patterns."
      },
      ta: {
        greeting: "வணக்கம்! நான் உங்கள் கோலம் குரு. புனித வடிவவியல், கலாச்சார முக்கியத்துவம் மற்றும் கோலம் கலையின் வரைபட நுட்பங்களைப் புரிந்துகொள்ள நான் உதவ முடியும். எதைப் பற்றி அறிய விரும்புகிறீர்கள்?",
        symmetry: "கோலம் வடிவங்கள் கணித சமச்சீர் கொள்கைகளை அடிப்படையாகக் கொண்டவை. கதிர்வீச்சு சமச்சீர் (8-வழி போன்றது) பிரபஞ்ச ஒற்றுமையைக் குறிக்கும் மண்டல போன்ற வடிவங்களை உருவாக்குகிறது.",
        dots: "கோலத்தில் உள்ள புள்ளிகள் பிரபஞ்சத்தின் அடிப்படை கட்டுமானத் தொகுதிகளைக் குறிக்கின்றன. பாரம்பரிய கோலங்கள் புள்ளி கட்டத்துடன் தொடங்குகின்றன.",
        meaning: "கோலம் வெறும் கலை அல்ல - இது ஆன்மீக பயிற்சி. தொடர்ச்சியான கோடுகள் வாழ்க்கையின் பரஸ்பர தொடர்பைக் குறிக்கின்றன.",
        colors: "பாரம்பரிய கோலங்கள் தூய்மைக்காக வெள்ளை அரிசி மாவு, சக்திக்காக சிவப்பு குங்குமம் பயன்படுத்துகின்றன.",
        default: "கோலத்தைப் பற்றிய அருமையான கேள்வி! ஒவ்வொரு வடிவமும் பிரபஞ்ச ஒற்றுமையின் கதையைச் சொல்கிறது."
      },
      hi: {
        greeting: "नमस्ते! मैं आपका कोलम गुरु हूं। मैं आपको पवित्र ज्यामिति, सांस्कृतिक महत्व, और कोलम कला की तकनीकों को समझने में मदद कर सकता हूं। आप क्या सीखना चाहते हैं?",
        symmetry: "कोलम पैटर्न गणितीय समरूपता सिद्धांतों पर आधारित हैं। रेडियल समरूपता (जैसे 8-तरफा) मंडल जैसे पैटर्न बनाती है जो ब्रह्मांडीय सामंजस्य का प्रतिनिधित्व करते हैं।",
        dots: "कोलम में बिंदु ब्रह्मांड के मूलभूत निर्माण खंडों का प्रतिनिधित्व करते हैं। पारंपरिक कोलम बिंदु ग्रिड से शुरू होते हैं।",
        meaning: "कोलम केवल कला नहीं है - यह एक आध्यात्मिक अभ्यास है। निरंतर रेखाएं जीवन के अंतर्संबंध का प्रतिनिधित्व करती हैं।",
        colors: "पारंपरिक कोलम पवित्रता के लिए सफेद चावल का आटा, ऊर्जा के लिए लाल कुमकुम का उपयोग करते हैं।",
        default: "कोलम के बारे में बहुत अच्छा सवाल! हर पैटर्न ब्रह्मांडीय सामंजस्य की कहानी कहता है।"
      },
      fr: {
        greeting: "Bonjour ! Je suis votre mentor Kolam. Je peux vous aider à comprendre la géométrie sacrée, la signification culturelle et les techniques de dessin de l'art kolam. Que souhaitez-vous apprendre ?",
        symmetry: "Les motifs Kolam sont basés sur des principes de symétrie mathématique. La symétrie radiale (comme 8 directions) crée des motifs semblables à des mandalas représentant l'harmonie cosmique.",
        dots: "Les points dans le kolam représentent les blocs de construction fondamentaux de l'univers. Les kolams traditionnels commencent par une grille de points.",
        meaning: "Le Kolam n'est pas seulement de l'art - c'est une pratique spirituelle. Les lignes continues représentent l'interconnexion de la vie.",
        colors: "Les kolams traditionnels utilisent de la farine de riz blanche pour la pureté, du kumkum rouge pour l'énergie.",
        default: "Excellente question sur le kolam ! Chaque motif raconte une histoire d'harmonie cosmique."
      }
    };

    const userLower = userMessage.toLowerCase();
    
    if (userLower.includes('hello') || userLower.includes('hi') || userLower.includes('வணக்கம்') || userLower.includes('नमस्ते') || userLower.includes('bonjour')) {
      return responses[language].greeting;
    } else if (userLower.includes('symmetry') || userLower.includes('சமச்சீர்') || userLower.includes('समरूपता') || userLower.includes('symétrie')) {
      return responses[language].symmetry;
    } else if (userLower.includes('dot') || userLower.includes('புள்ளி') || userLower.includes('बिंदु') || userLower.includes('point')) {
      return responses[language].dots;
    } else if (userLower.includes('meaning') || userLower.includes('significance') || userLower.includes('அர்த்தம்') || userLower.includes('मतलब') || userLower.includes('signification')) {
      return responses[language].meaning;
    } else if (userLower.includes('color') || userLower.includes('நிறம்') || userLower.includes('रंग') || userLower.includes('couleur')) {
      return responses[language].colors;
    } else {
      return responses[language].default;
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