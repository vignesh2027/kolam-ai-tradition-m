import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Palette, User, ChatCircle } from '@phosphor-icons/react';
import { Language } from '@/types';
import { useTranslation } from '@/lib/translations';
import { useAuth } from '@/hooks/use-auth';

interface HomePageProps {
  language: Language;
  onNavigate: (page: 'canvas' | 'auth') => void;
  onChatToggle: () => void;
}

export function HomePage({ language, onNavigate, onChatToggle }: HomePageProps) {
  const t = useTranslation(language);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen kolam-pattern">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight">
            Kolam AI
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            {language === 'en' && 'Tradition meets technology. Draw sacred geometry with AI guidance.'}
            {language === 'ta' && 'பாரம்பரியம் தொழில்நுட்பத்தை சந்திக்கிறது. AI வழிகாட்டுதலுடன் புனித வடிவவியலை வரையுங்கள்.'}
            {language === 'hi' && 'परंपरा प्रौद्योगिकी से मिलती है। AI मार्गदर्शन के साथ पवित्र ज्यामिति बनाएं।'}
            {language === 'fr' && 'La tradition rencontre la technologie. Dessinez la géométrie sacrée avec l\'IA.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              onClick={() => onNavigate('canvas')}
              className="glow-primary text-lg px-8 py-6 flex items-center space-x-3"
            >
              <Palette size={24} />
              <span>
                {language === 'en' && 'Start Drawing'}
                {language === 'ta' && 'வரைய ஆரம்பிக்கவும்'}
                {language === 'hi' && 'चित्र बनाना शुरू करें'}
                {language === 'fr' && 'Commencer à dessiner'}
              </span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onChatToggle}
              className="glow-accent text-lg px-8 py-6 flex items-center space-x-3"
            >
              <ChatCircle size={24} />
              <span>
                {language === 'en' && 'Meet Your Mentor'}
                {language === 'ta' && 'உங்கள் குருவை சந்திக்கவும்'}
                {language === 'hi' && 'अपने गुरु से मिलें'}
                {language === 'fr' && 'Rencontrez votre mentor'}
              </span>
            </Button>

            {!isAuthenticated && (
              <Button
                variant="ghost"
                size="lg"
                onClick={() => onNavigate('auth')}
                className="text-lg px-8 py-6 flex items-center space-x-3"
              >
                <User size={24} />
                <span>{t('login')}</span>
              </Button>
            )}
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 glow-soft hover:glow-primary transition-all duration-300">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <div className="w-6 h-6 border-2 border-primary rounded-full"></div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-center">
                {language === 'en' && 'Symmetry Engine'}
                {language === 'ta' && 'சமச்சீர் இயந்திரம்'}
                {language === 'hi' && 'समरूपता इंजन'}
                {language === 'fr' && 'Moteur de symétrie'}
              </h3>
              <p className="text-muted-foreground text-center text-sm">
                {language === 'en' && 'Draw once, mirror infinitely. Perfect radial and bilateral symmetry.'}
                {language === 'ta' && 'ஒருமுறை வரையுங்கள், எல்லையற்ற பிரதிபலிப்பு. சரியான கதிர்வீச்சு மற்றும் இருபக்க சமச்சீர்.'}
                {language === 'hi' && 'एक बार बनाएं, अनंत प्रतिबिंब। सही रेडियल और द्विपक्षीय समरूपता।'}
                {language === 'fr' && 'Dessinez une fois, reflétez à l\'infini. Symétrie radiale et bilatérale parfaite.'}
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20 glow-soft hover:glow-accent transition-all duration-300">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <ChatCircle size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-center">
                {language === 'en' && 'AI Cultural Guide'}
                {language === 'ta' && 'AI கலாச்சார வழிகாட்டி'}
                {language === 'hi' && 'AI सांस्कृतिक गाइड'}
                {language === 'fr' && 'Guide culturel IA'}
              </h3>
              <p className="text-muted-foreground text-center text-sm">
                {language === 'en' && 'Learn the meaning behind every pattern. Traditional wisdom meets modern learning.'}
                {language === 'ta' && 'ஒவ்வொரு வடிவத்தின் பின்னால் உள்ள அர்த்தத்தை அறியுங்கள். பாரம்பரிய ஞானம் நவீன கற்றலை சந்திக்கிறது.'}
                {language === 'hi' && 'हर पैटर्न के पीछे का मतलब जानें। पारंपरिक ज्ञान आधुनिक शिक्षा से मिलता है।'}
                {language === 'fr' && 'Apprenez la signification de chaque motif. La sagesse traditionnelle rencontre l\'apprentissage moderne.'}
              </p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/20 glow-soft hover:border-secondary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded"></div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-center">
                {language === 'en' && 'Export & Share'}
                {language === 'ta' && 'ஏற்றுமதி மற்றும் பகிர்வு'}
                {language === 'hi' && 'निर्यात और साझा करें'}
                {language === 'fr' && 'Exporter et partager'}
              </h3>
              <p className="text-muted-foreground text-center text-sm">
                {language === 'en' && 'High-resolution SVG, PNG, and animated GIF exports. Perfect for digital art or printing.'}
                {language === 'ta' && 'உயர் தெளிவுத்திறன் SVG, PNG மற்றும் அனிமேஷன் GIF ஏற்றுமதிகள். டிஜிட்டல் கலை அல்லது அச்சிடுதலுக்கு ஏற்றது.'}
                {language === 'hi' && 'उच्च रिज़ॉल्यूशन SVG, PNG, और एनिमेटेड GIF निर्यात। डिजिटल कला या प्रिंटिंग के लिए परफेक्ट।'}
                {language === 'fr' && 'Exports SVG, PNG et GIF animés haute résolution. Parfait pour l\'art numérique ou l\'impression.'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Technique Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              {language === 'en' && '✨ Try 8-Way Radial Symmetry'}
              {language === 'ta' && '✨ 8-வழி கதிர்வீச்சு சமச்சீர் முயற்சி செய்யுங்கள்'}
              {language === 'hi' && '✨ 8-दिशा रेडियल समरूपता आज़माएं'}
              {language === 'fr' && '✨ Essayez la symétrie radiale à 8 directions'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {language === 'en' && 'Start your kolam journey with the most popular symmetry mode. Every stroke you draw creates 8 beautiful mirror reflections instantly!'}
              {language === 'ta' && 'மிகவும் பிரபலமான சமச்சீர் முறையுடன் உங்கள் கோலம் பயணத்தைத் தொடங்குங்கள். நீங்கள் வரையும் ஒவ்வொரு கோடும் உடனடியாக 8 அழகான கண்ணாடி பிரதிபலிப்புகளை உருவாக்குகிறது!'}
              {language === 'hi' && 'सबसे लोकप्रिय समरूपता मोड के साथ अपनी कोलम यात्रा शुरू करें। आपकी हर स्ट्रोक तुरंत 8 सुंदर मिरर रिफ्लेक्शन बनाती है!'}
              {language === 'fr' && 'Commencez votre voyage kolam avec le mode de symétrie le plus populaire. Chaque trait que vous dessinez crée instantanément 8 beaux reflets miroir !'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Card className="p-8 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-primary/30 glow-primary">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-white rounded-full relative">
                    <div className="absolute inset-0 border-2 border-dashed border-white rounded-full animate-spin"></div>
                    <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-white -translate-x-0.5"></div>
                    <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-white -translate-x-0.5"></div>
                    <div className="absolute left-0 top-1/2 w-8 h-0.5 bg-white -translate-y-0.5"></div>
                    <div className="absolute right-0 top-1/2 w-8 h-0.5 bg-white -translate-y-0.5"></div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {language === 'en' && 'Perfect for Beginners'}
                  {language === 'ta' && 'ஆரம்பநிலையாளர்களுக்கு ஏற்றது'}
                  {language === 'hi' && 'शुरुआती लोगों के लिए परफेक्ट'}
                  {language === 'fr' && 'Parfait pour les débutants'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {language === 'en' && 'Draw one simple line and watch it bloom into a stunning mandala pattern. The 8-way symmetry creates instant masterpieces from the simplest strokes.'}
                  {language === 'ta' && 'ஒரு எளிய கோட்டை வரைந்து அது ஒரு அழகான மண்டல வடிவமாக மலர்வதைப் பாருங்கள். 8-வழி சமச்சீர் எளிமையான கோடுகளிலிருந்து உடனடி மாஸ்டர்பீஸ்களை உருவாக்குகிறது.'}
                  {language === 'hi' && 'एक सरल रेखा खींचें और इसे एक आश्चर्यजनक मंडल पैटर्न में खिलते देखें। 8-दिशा समरूपता सरल स्ट्रोक से तुरंत मास्टरपीस बनाती है।'}
                  {language === 'fr' && 'Dessinez une ligne simple et regardez-la s\'épanouir en un magnifique motif de mandala. La symétrie à 8 directions crée des chefs-d\'œuvre instantanés à partir des traits les plus simples.'}
                </p>
                <Button 
                  size="lg" 
                  onClick={() => onNavigate('canvas')}
                  className="glow-accent"
                >
                  {language === 'en' && 'Try it Now!'}
                  {language === 'ta' && 'இப்போதே முயற்சி செய்யுங்கள்!'}
                  {language === 'hi' && 'अभी कोशिश करें!'}
                  {language === 'fr' && 'Essayez maintenant !'}
                </Button>
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-secondary/10 via-accent/10 to-primary/10 border-secondary/30 glow-secondary">
              <h3 className="text-xl font-semibold mb-4">
                {language === 'en' && '🗄️ Your Creations, Safely Stored'}
                {language === 'ta' && '🗄️ உங்கள் படைப்புகள், பாதுகாப்பாக சேமிக்கப்பட்டுள்ளன'}
                {language === 'hi' && '🗄️ आपकी रचनाएं, सुरक्षित रूप से संग्रहीत'}
                {language === 'fr' && '🗄️ Vos créations, stockées en sécurité'}
              </h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    {language === 'en' && 'All your kolam designs are automatically saved using GitHub\'s secure database system'}
                    {language === 'ta' && 'உங்கள் அனைத்து கோலம் வடிவங்களும் GitHub இன் பாதுகாப்பான தரவுத்தள அமைப்பைப் பயன்படுத்தி தானாகவே சேமிக்கப்படுகின்றன'}
                    {language === 'hi' && 'आपके सभी कोलम डिज़ाइन GitHub के सुरक्षित डेटाबेस सिस्टम का उपयोग करके स्वचालित रूप से सहेजे जाते हैं'}
                    {language === 'fr' && 'Tous vos designs kolam sont automatiquement sauvegardés en utilisant le système de base de données sécurisé de GitHub'}
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    {language === 'en' && 'Access your art from any device, anywhere in the world'}
                    {language === 'ta' && 'உலகில் எங்கிருந்தும், எந்த சாதனத்திலிருந்தும் உங்கள் கலையை அணுகவும்'}
                    {language === 'hi' && 'दुनिया में कहीं से भी, किसी भी डिवाइस से अपनी कला तक पहुंचें'}
                    {language === 'fr' && 'Accédez à votre art depuis n\'importe quel appareil, partout dans le monde'}
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <p>
                    {language === 'en' && 'Chat history with AI mentor preserved for continuous learning'}
                    {language === 'ta' && 'தொடர்ச்சியான கற்றலுக்கு AI வழிகாட்டியுடனான அரட்டை வரலாறு பாதுகாக்கப்படுகிறது'}
                    {language === 'hi' && 'निरंतर सीखने के लिए AI गुरु के साथ चैट इतिहास संरक्षित'}
                    {language === 'fr' && 'Historique de chat avec le mentor IA préservé pour un apprentissage continu'}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Cultural Context Section */}
      <section className="py-16 px-4 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            {language === 'en' && 'Sacred Geometry, Digital Canvas'}
            {language === 'ta' && 'புனித வடிவவியல், டிஜிட்டல் கேன்வாஸ்'}
            {language === 'hi' && 'पवित्र ज्यामिति, डिजिटल कैनवास'}
            {language === 'fr' && 'Géométrie sacrée, toile numérique'}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {language === 'en' && 'Kolam is a form of drawing traditionally created by women in South India. These intricate patterns, drawn with rice flour, represent cosmic energy and invite prosperity. Our platform preserves this ancient art while making it accessible to creators worldwide.'}
            {language === 'ta' && 'கோலம் என்பது தென்னிந்தியாவில் பெண்களால் பாரம்பரியமாக உருவாக்கப்படும் ஒரு வரைபடம். அரிசி மாவில் வரையப்படும் இந்த சிக்கலான வடிவங்கள் பிரபஞ்ச சக்தியைக் குறிக்கின்றன மற்றும் செழிப்பை அழைக்கின்றன.'}
            {language === 'hi' && 'कोलम दक्षिण भारत में महिलाओं द्वारा पारंपरिक रूप से बनाई जाने वाली एक कला है। चावल के आटे से बने ये जटिल पैटर्न ब्रह्मांडीय ऊर्जा का प्रतिनिधित्व करते हैं और समृद्धि को आमंत्रित करते हैं।'}
            {language === 'fr' && 'Le Kolam est une forme de dessin traditionnellement créée par les femmes du sud de l\'Inde. Ces motifs complexes, dessinés avec de la farine de riz, représentent l\'énergie cosmique et invitent la prospérité.'}
          </p>
        </div>
      </section>
    </div>
  );
}