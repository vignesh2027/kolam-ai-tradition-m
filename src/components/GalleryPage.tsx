import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image, Download, Eye } from '@phosphor-icons/react';
import { Language } from '@/types';
import { useTranslation } from '@/lib/translations';

interface GalleryPageProps {
  language: Language;
}

// Sample kolam designs for demonstration
const sampleDesigns = [
  {
    id: '1',
    name: 'Lotus Mandala',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImciPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmYiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM0RUNEQzQiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMTAwIDEwMG0tODAgMGE4MCA4MCAwIDEgMSAxNjAgMGE4MCA4MCAwIDEgMS0xNjAgMCIgZmlsbD0idXJsKCNnKSIgb3BhY2l0eT0iMC4zIi8+PC9zdmc+',
    tags: ['lotus', 'mandala', 'spiritual'],
    createdAt: '2024-01-15',
    strokeCount: 24
  },
  {
    id: '2',
    name: 'Geometric Harmony',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImwiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNGRjZCNkIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM0NUI3RDEiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNsKSIgb3BhY2l0eT0iMC4yIi8+PC9zdmc+',
    tags: ['geometric', 'symmetry', 'modern'],
    createdAt: '2024-01-14',
    strokeCount: 16
  },
  {
    id: '3',
    name: 'Peacock Feather',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InAiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM5NkNFQjQiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNGRkVBQTciLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48ZWxsaXBzZSBjeD0iMTAwIiBjeT0iMTAwIiByeD0iNjAiIHJ5PSI4MCIgZmlsbD0idXJsKCNwKSIgb3BhY2l0eT0iMC4zIi8+PC9zdmc+',
    tags: ['peacock', 'traditional', 'colorful'],
    createdAt: '2024-01-13',
    strokeCount: 32
  },
  {
    id: '4',
    name: 'Cosmic Spiral',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48Y29uaWNhbEdyYWRpZW50IGlkPSJjIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjREREREREIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOTY1MkQ4Ii8+PC9jb25pY2FsR3JhZGllbnQ+PC9kZWZzPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNzAiIGZpbGw9InVybCgjYykiIG9wYWNpdHk9IjAuNCIvPjwvc3ZnPg==',
    tags: ['spiral', 'cosmic', 'mystical'],
    createdAt: '2024-01-12',
    strokeCount: 18
  }
];

export function GalleryPage({ language }: GalleryPageProps) {
  const t = useTranslation(language);

  const getLocalizedText = (key: string) => {
    const texts: Record<string, Record<Language, string>> = {
      gallery: {
        en: 'Gallery',
        ta: 'தொகுப்பு',
        hi: 'गैलरी',
        fr: 'Galerie'
      },
      templates: {
        en: 'Template Library',
        ta: 'வார்ப்புரு நூலகம்',
        hi: 'टेम्पलेट लाइब्रेरी',
        fr: 'Bibliothèque de modèles'
      },
      myDesigns: {
        en: 'My Designs',
        ta: 'என் வடிவங்கள்',
        hi: 'मेरे डिज़ाइन',
        fr: 'Mes créations'
      },
      viewDesign: {
        en: 'View Design',
        ta: 'வடிவத்தைப் பார்க்கவும்',
        hi: 'डिज़ाइन देखें',
        fr: 'Voir le design'
      },
      downloadDesign: {
        en: 'Download',
        ta: 'பதிவிறக்கம்',
        hi: 'डाउनलोड',
        fr: 'Télécharger'
      },
      strokes: {
        en: 'strokes',
        ta: 'வரிகள்',
        hi: 'स्ट्रोक',
        fr: 'traits'
      },
      exploreTemplates: {
        en: 'Explore beautiful kolam patterns created by our community and traditional artists. Click any design to use as a starting point for your own creation.',
        ta: 'எங்கள் சமூகம் மற்றும் பாரம்பரிய கலைஞர்களால் உருவாக்கப்பட்ட அழகான கோலம் வடிவங்களை ஆராயுங்கள்.',
        hi: 'हमारे समुदाय और पारंपरिक कलाकारों द्वारा बनाए गए सुंदर कोलम पैटर्न का अन्वेषण करें।',
        fr: 'Explorez les magnifiques motifs de kolam créés par notre communauté et les artistes traditionnels.'
      }
    };
    
    return texts[key]?.[language] || texts[key]?.en || key;
  };

  return (
    <div className="min-h-screen bg-background pt-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {getLocalizedText('gallery')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            {getLocalizedText('exploreTemplates')}
          </p>
        </div>

        {/* Template Library Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <Image size={24} className="text-primary" />
            <h2 className="text-2xl font-semibold">{getLocalizedText('templates')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sampleDesigns.map((design) => (
              <Card key={design.id} className="group hover:glow-primary transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20">
                <CardHeader className="p-4">
                  <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden relative">
                    <img 
                      src={design.thumbnail} 
                      alt={design.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="secondary" className="glow-accent">
                          <Eye size={16} />
                        </Button>
                        <Button size="sm" variant="secondary" className="glow-primary">
                          <Download size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg">{design.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {design.strokeCount} {getLocalizedText('strokes')} • {design.createdAt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {design.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye size={14} className="mr-2" />
                      {getLocalizedText('viewDesign')}
                    </Button>
                    <Button size="sm" variant="default" className="flex-1 glow-primary">
                      <Download size={14} className="mr-2" />
                      {getLocalizedText('downloadDesign')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Patterns */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            {language === 'en' && 'Featured Traditional Patterns'}
            {language === 'ta' && 'சிறப்பு பாரம்பரிய வடிவங்கள்'}
            {language === 'hi' && 'विशेष पारंपरिक पैटर्न'}
            {language === 'fr' && 'Motifs traditionnels en vedette'}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h3 className="text-xl font-semibold mb-3">
                {language === 'en' && 'Festival Kolams'}
                {language === 'ta' && 'திருவிழா கோலங்கள்'}
                {language === 'hi' && 'त्योहारी कोलम'}
                {language === 'fr' && 'Kolams de festival'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {language === 'en' && 'Special designs for Diwali, Pongal, and other celebrations'}
                {language === 'ta' && 'தீபாவளி, பொங்கல் மற்றும் பிற கொண்டாட்டங்களுக்கான சிறப்பு வடிவங்கள்'}
                {language === 'hi' && 'दिवाली, पोंगल और अन्य उत्सवों के लिए विशेष डिज़ाइन'}
                {language === 'fr' && 'Designs spéciaux pour Diwali, Pongal et autres célébrations'}
              </p>
              <Button variant="outline" className="w-full">
                {language === 'en' && 'Explore Festival Designs'}
                {language === 'ta' && 'திருவிழா வடிவங்களை ஆராயுங்கள்'}
                {language === 'hi' && 'त्योहारी डिज़ाइन देखें'}
                {language === 'fr' && 'Explorer les designs de festival'}
              </Button>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20">
              <h3 className="text-xl font-semibold mb-3">
                {language === 'en' && 'Daily Practice'}
                {language === 'ta' && 'தினசரி பயிற்சி'}
                {language === 'hi' && 'दैनिक अभ्यास'}
                {language === 'fr' && 'Pratique quotidienne'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {language === 'en' && 'Simple, elegant patterns perfect for everyday drawing'}
                {language === 'ta' && 'அன்றாட வரைபடத்திற்கு ஏற்ற எளிய, நேர்த்தியான வடிவங்கள்'}
                {language === 'hi' && 'रोजाना बनाने के लिए सरल, सुंदर पैटर्न'}
                {language === 'fr' && 'Motifs simples et élégants parfaits pour le dessin quotidien'}
              </p>
              <Button variant="outline" className="w-full">
                {language === 'en' && 'Browse Daily Patterns'}
                {language === 'ta' && 'தினசரி வடிவங்களைப் பார்க்கவום்'}
                {language === 'hi' && 'दैनिक पैटर्न देखें'}
                {language === 'fr' && 'Parcourir les motifs quotidiens'}
              </Button>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}