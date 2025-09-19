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

// Declare spark global for TypeScript
declare const spark: {
  llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => string;
  llm: (prompt: string, modelName?: string, jsonMode?: boolean) => Promise<string>;
};

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

  // GitHub Spark LLM integration for accurate mentor responses
  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Create a comprehensive prompt for the Kolam AI mentor
      const prompt = spark.llmPrompt`You are a wise and knowledgeable Kolam AI mentor, deeply versed in South Indian traditional art, sacred geometry, cultural practices, and drawing techniques. 

CONTEXT: You are helping users understand and create kolam patterns - traditional geometric designs drawn with dots and lines that have deep spiritual and mathematical significance in Tamil culture.

LANGUAGE: Respond in ${language === 'en' ? 'English' : 
                       language === 'ta' ? 'Tamil with English transliteration when helpful' :
                       language === 'hi' ? 'Hindi with English transliteration when helpful' : 
                       'French'}.

USER QUESTION: "${userMessage}"

GUIDELINES FOR YOUR RESPONSE:
- Be culturally respectful and authentic
- Provide specific, actionable advice when discussing drawing techniques
- Explain the spiritual/mathematical significance when relevant
- Use warm, encouraging tone as a mentor would
- Include practical tips for creating kolam patterns
- Reference traditional patterns, festivals, or customs when appropriate
- If asked about symmetry, explain the mathematical concepts clearly
- If asked about colors, explain their cultural significance
- If asked about tools or materials, provide authentic traditional methods
- Keep responses focused and helpful, around 2-3 sentences
- Use emojis sparingly and appropriately (🙏, 🌸, ✨)

Remember: You are not just an AI, but a cultural guide helping preserve and share this beautiful art form.`;

      // Call GitHub Spark's LLM API
      const response = await spark.llm(prompt);
      
      return response || getLanguageBasedFallback();
    } catch (error) {
      console.error('Error calling GitHub Spark LLM:', error);
      return getLanguageBasedFallback();
    }
  };

  const getLanguageBasedFallback = (): string => {
    const fallbackResponses: Record<Language, string> = {
      en: "🙏 I'm here to guide you through the sacred art of kolam. These geometric patterns connect us to cosmic harmony through dots, lines, and symmetry. Traditional kolams use rice flour and are drawn at dawn to invite prosperity and ward off negative energies. What specific aspect would you like to explore?",
      ta: "🙏 கோலம் என்ற புனித கலையின் வழியாக உங்களை வழிநடத்த நான் இங்கே இருக்கிறேன். இந்த வடிவியல் வடிவங்கள் புள்ளிகள், கோடுகள் மற்றும் சமச்சீர் மூலம் பிரபஞ்ச இணக்கத்துடன் நம்மை இணைக்கின்றன. பாரம்பரிய கோலங்கள் அரிசி மாவு பயன்படுத்தி விடியற்காலையில் வரையப்படுகின்றன.",
      hi: "🙏 मैं आपको कोलम की पवित्र कला के माध्यम से मार्गदर्शन करने के लिए यहाँ हूँ। ये ज्यामितीय पैटर्न बिंदुओं, रेखाओं और समरूपता के माध्यम से हमें ब्रह्मांडीय सामंजस्य से जोड़ते हैं। पारंपरिक कोलम चावल के आटे से बनाए जाते हैं और समृद्धि लाने के लिए सुबह खींचे जाते हैं।",
      fr: "🙏 Je suis là pour vous guider à travers l'art sacré du kolam. Ces motifs géométriques nous relient à l'harmonie cosmique grâce aux points, aux lignes et à la symétrie. Les kolams traditionnels utilisent de la farine de riz et sont dessinés à l'aube pour inviter la prospérité."
    };
    
    return fallbackResponses[language];
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
          "🙏 Vanakkam! I'm your Kolam AI mentor, versed in centuries of sacred geometry and cultural wisdom. I can guide you through:\n\n✨ Traditional patterns and their meanings\n🔢 Mathematical symmetry (4, 6, 8, 12, 16-way)\n🎨 Drawing techniques and tools\n🌸 Festival-specific designs\n📿 Cultural significance and spirituality\n\nWhat would you like to explore in this ancient art form?" :
          language === 'ta' ?
          "🙏 வணக்கம்! நான் உங்கள் கோலம் AI குரு, பல நூற்றாண்டுகளின் புனித வடிவவியல் மற்றும் கலாச்சார ஞானத்தில் வல்லவன். நான் உங்களுக்கு வழிகாட்ட முடியும்:\n\n✨ பாரம்பரிய வடிவங்கள் மற்றும் அவற்றின் அர்த்தங்கள்\n🔢 கணித சமச்சீர் (4, 6, 8, 12, 16-வழி)\n🎨 வரைபட நுட்பங்கள் மற்றும் கருவிகள்\n🌸 திருவிழா சிறப்பு வடிவமைப்புகள்\n📿 கலாச்சார முக்கியத்துவம் மற்றும் ஆன்மீகம்" :
          language === 'hi' ?
          "🙏 नमस्ते! मैं आपका कोलम AI गुरु हूं, सदियों की पवित्र ज्यामिति और सांस्कृतिक ज्ञान में पारंगत। मैं आपका मार्गदर्शन कर सकता हूं:\n\n✨ पारंपरिक पैटर्न और उनके अर्थ\n🔢 गणितीय समरूपता (4, 6, 8, 12, 16-तरफा)\n🎨 चित्रकला तकनीक और उपकरण\n🌸 त्योहार-विशिष्ट डिज़ाइन\n📿 सांस्कृतिक महत्व और आध्यात्म" :
          "🙏 Namaste ! Je suis votre mentor IA Kolam, versé dans des siècles de géométrie sacrée et de sagesse culturelle. Je peux vous guider à travers :\n\n✨ Motifs traditionnels et leurs significations\n🔢 Symétrie mathématique (4, 6, 8, 12, 16 voies)\n🎨 Techniques de dessin et outils\n🌸 Designs spécifiques aux festivals\n📿 Importance culturelle et spiritualité",
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
              
              language === 'en' ? 'Explain 8-way symmetry' : 
              language === 'ta' ? '8-வழி சமச்சீரை விளக்கவும்' :
              language === 'hi' ? '8-तरफा समरूपता समझाएं' : 
              'Expliquer la symétrie 8-voies',
              
              language === 'en' ? 'Traditional colors meaning' : 
              language === 'ta' ? 'பாரம்பரிய நிற அர்த்தம்' :
              language === 'hi' ? 'पारंपरिक रंगों का अर्थ' : 
              'Signification couleurs traditionnelles',

              language === 'en' ? 'Best tools for drawing' : 
              language === 'ta' ? 'வரைவதற்கான சிறந்த கருவிகள்' :
              language === 'hi' ? 'चित्रकारी के लिए बेहतरीन उपकरण' : 
              'Meilleurs outils pour dessiner',

              language === 'en' ? 'Festival kolam patterns' : 
              language === 'ta' ? 'திருவிழா கோலம் வடிவங்கள்' :
              language === 'hi' ? 'त्योहार कोलम पैटर्न' : 
              'Motifs kolam de festival',

              language === 'en' ? 'How to start as beginner' : 
              language === 'ta' ? 'ஆரம்பநிலையாளர் எவ்வாறு தொடங்குவது' :
              language === 'hi' ? 'शुरुआती कैसे शुरुआत करें' : 
              'Comment commencer en tant que débutant'
            ].map((question) => (
              <Button
                key={question}
                variant="outline"
                size="sm"
                onClick={() => setCurrentMessage(question)}
                className="text-xs hover:bg-accent/20 transition-colors"
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