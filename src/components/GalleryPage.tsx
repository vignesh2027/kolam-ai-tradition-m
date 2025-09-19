import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image, Download, Eye } from '@phosphor-icons/react';
import { Language } from '@/types';
import { useTranslation } from '@/lib/translations';

interface GalleryPageProps {
  language: Language;
}

// Authentic kolam designs from Tamil tradition
const kolamDesigns = [
  {
    id: '1',
    name: 'Padi Kolam',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InBhZGkiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9Im9rbGNoKDAuNyAwLjE1IDYwKSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0idHJhbnNwYXJlbnQiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0ib2tsY2goMC4xNSAwLjA1IDI0MCkiLz48ZyBzdHJva2U9Im9rbGNoKDAuNyAwLjE1IDYwKSIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIj48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjIwIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI0NSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNzAiLz48cGF0aCBkPSJNMTAwIDMwTDEwMCAxNzBNMzAgMTAwTDE3MCAxMDBNNjIgNjJMMTM4IDEzOE02MiAxMzhMMTM4IDYyIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iNjAiIHI9IjUiIGZpbGw9Im9rbGNoKDAuNzUgMC4xOCAxODApIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTQwIiByPSI1IiBmaWxsPSJva2xjaCgwLjc1IDAuMTggMTgwKSIvPjxjaXJjbGUgY3g9IjE0MCIgY3k9IjEwMCIgcj0iNSIgZmlsbD0ib2tsY2goMC43NSAwLjE4IDE4MCkiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjEwMCIgcj0iNSIgZmlsbD0ib2tsY2goMC43NSAwLjE4IDE4MCkiLz48L2c+PC9zdmc+',
    tags: ['dotted', 'traditional', 'sacred'],
    createdAt: 'Ancient Tamil Tradition',
    strokeCount: 8,
    description: 'Classic dotted kolam representing harmony and protection'
  },
  {
    id: '2',
    name: 'Lotus Kolam',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImxvdHVzIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSJva2xjaCgwLjc1IDAuMTggMTgwKSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0idHJhbnNwYXJlbnQiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0ib2tsY2goMC4xNSAwLjA1IDI0MCkiLz48ZyBzdHJva2U9Im9rbGNoKDAuNyAwLjE1IDYwKSIgc3Ryb2tlLXdpZHRoPSIyLjUiIGZpbGw9Im5vbmUiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwMCwxMDApIj48ZWxsaXBzZSByeD0iMTUiIHJ5PSI0NSIgdHJhbnNmb3JtPSJyb3RhdGUoMCkiLz48ZWxsaXBzZSByeD0iMTUiIHJ5PSI0NSIgdHJhbnNmb3JtPSJyb3RhdGUoNDUpIi8+PGVsbGlwc2Ugcng9IjE1IiByeT0iNDUiIHRyYW5zZm9ybT0icm90YXRlKDkwKSIvPjxlbGxpcHNlIHJ4PSIxNSIgcnk9IjQ1IiB0cmFuc2Zvcm09InJvdGF0ZSgxMzUpIi8+PGVsbGlwc2Ugcng9IjEwIiByeT0iMzAiIHRyYW5zZm9ybT0icm90YXRlKDIyLjUpIi8+PGVsbGlwc2Ugcng9IjEwIiByeT0iMzAiIHRyYW5zZm9ybT0icm90YXRlKDY3LjUpIi8+PGVsbGlwc2Ugcng9IjEwIiByeT0iMzAiIHRyYW5zZm9ybT0icm90YXRlKDExMi41KSIvPjxlbGxpcHNlIHJ4PSIxMCIgcnk9IjMwIiB0cmFuc2Zvcm09InJvdGF0ZSgxNTcuNSkiLz48L2c+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI4IiBmaWxsPSJva2xjaCgwLjc1IDAuMTggMTgwKSIvPjwvZz48L3N2Zz4=',
    tags: ['lotus', 'spiritual', 'petals'],
    createdAt: 'Classical Tamil Design',
    strokeCount: 16,
    description: 'Sacred lotus symbolizing purity and divine beauty'
  },
  {
    id: '3',
    name: 'Sikku Kolam',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InNpa2t1Ij48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSJva2xjaCgwLjU1IDAuMiAyNSkiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9InRyYW5zcGFyZW50Ii8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9Im9rbGNoKDAuMTUgMC4wNSAyNDApIi8+PGcgc3Ryb2tlPSJva2xjaCgwLjcgMC4xNSA2MCkiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iNjAiIGN5PSI2MCIgcj0iMTAiLz48Y2lyY2xlIGN4PSIxNDAiIGN5PSI2MCIgcj0iMTAiLz48Y2lyY2xlIGN4PSI2MCIgY3k9IjE0MCIgcj0iMTAiLz48Y2lyY2xlIGN4PSIxNDAiIGN5PSIxNDAiIHI9IjEwIi8+PHBhdGggZD0iTTcwIDYwQzg1IDYwIDEwMCA3NSAxMDAgMTAwUzExNSAxNDAgMTMwIDE0ME0xMzAgNjBDMTE1IDYwIDEwMCA3NSAxMDAgMTAwUzg1IDE0MCA3MCAxNDBNNjAgNzBDNjAgODUgNzUgMTAwIDEwMCAxMDBTMTQwIDExNSAxNDAgMTMwTTYwIDEzMEM2MCAxMTUgNzUgMTAwIDEwMCAxMDBTMTQwIDg1IDE0MCA3MCIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNSIgZmlsbD0ib2tsY2goMC43NSAwLjE4IDE4MCkiLz48L2c+PC9zdmc+',
    tags: ['interwoven', 'continuous', 'complex'],
    createdAt: 'Traditional Weaving Style',
    strokeCount: 12,
    description: 'Intricate interwoven pattern representing life\'s interconnections'
  },
  {
    id: '4',
    name: 'Rangoli Star',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InN0YXIiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9Im9rbGNoKDAuNzUgMC4xOCAxODApIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSJ0cmFuc3BhcmVudCIvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJva2xjaCgwLjE1IDAuMDUgMjQwKSIvPjxnIHN0cm9rZT0ib2tsY2goMC43IDAuMTUgNjApIiBzdHJva2Utd2lkdGg9IjIuNSIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTEwMCAzMEwxMTUgNjVMMTUwIDY1TDEyMiA4OUwxMzIgMTI0TDEwMCAxMDBMNjggMTI0TDc4IDg5TDUwIDY1TDg1IDY1WiIvPjxwYXRoIGQ9Ik0xMDAgNDBMMTEwIDcwTDEzNSA3MEwxMTggODVMMTI0IDExMEwxMDAgOTZMNzYgMTEwTDgyIDg1TDY1IDcwTDkwIDcwWiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iNTUiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjQwIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSIyNSIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iOCIgZmlsbD0ib2tsY2goMC43NSAwLjE4IDE4MCkiLz48L2c+PC9zdmc+',
    tags: ['star', 'geometric', 'festive'],
    createdAt: 'Diwali Special Pattern',
    strokeCount: 20,
    description: 'Radiant star pattern for festivals and celebrations'
  },
  {
    id: '5',
    name: 'Peacock Kolam',
    thumbnail: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9InBlYWNvY2siPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9Im9rbGNoKDAuNzUgMC4xOCAxODApIi8+PHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9Im9rbGNoKDAuNyAwLjE1IDYwKSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0ib2tsY2goMC41NSAwLjIgMjUpIi8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9Im9rbGNoKDAuMTUgMC4wNSAyNDApIi8+PGcgc3Ryb2tlPSJva2xjaCgwLjcgMC4xNSA2MCkiIHN0cm9rZS13aWR0aD0iMi41IiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTAwIDE2MEMxMDAgMTQwIDEyMCAxMzAgMTM1IDEyMEMxNDAgMTEwIDEzNSAxMDAgMTI1IDk1QzEzMCA4NSAxMjUgNzUgMTE1IDcwQzEyMCA2MCA5NSA1MCA4MCA2MEw2MCA4MEw3MCA5NUw2MCA5NUw3MCAxMDBMNjAgMTEwTDc1IDEyNUw2NSAxMzBMODAgMTQwTDkwIDE1MEMxMDAgMTYwIDEwMCAxNjAgMTAwIDE2MFoiLz48ZWxsaXBzZSBjeD0iMTMwIiBjeT0iODAiIHJ4PSIxNSIgcnk9IjEwIiBmaWxsPSJva2xjaCgwLjc1IDAuMTggMTgwKSIvPjxjaXJjbGUgY3g9IjEzNSIgY3k9IjgwIiByPSI0IiBmaWxsPSJva2xjaCgwLjU1IDAuMiAyNSkiLz48cGF0aCBkPSJNMTEwIDUwQzEyNSA0MCA5NSAzNSA4MCA0NSIgc3Ryb2tlLXdpZHRoPSIzIi8+PGNpcmNsZSBjeD0iODAiIGN5PSI5NSIgcj0iMyIgZmlsbD0ib2tsY2goMC43NSAwLjE4IDE4MCkiLz48Y2lyY2xlIGN4PSI3NSIgY3k9IjEyMCIgcj0iMyIgZmlsbD0ib2tsY2goMC43NSAwLjE4IDE4MCkiLz48Y2lyY2xlIGN4PSI5MCIgY3k9IjE0MCIgcj0iMyIgZmlsbD0ib2tsY2goMC43NSAwLjE4IDE4MCkiLz48L2c+PC9zdmc+',
    tags: ['peacock', 'bird', 'artistic'],
    createdAt: 'Cultural Heritage Design',
    strokeCount: 24,
    description: 'Graceful peacock representing beauty and divine grace'
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
        en: 'Traditional Kolam Collection',
        ta: 'பாரம்பரிய கோலம் தொகுப்பு',
        hi: 'पारंपरिक कोलम संग्रह',
        fr: 'Collection de Kolam Traditionnels'
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
        en: 'Discover authentic traditional kolam patterns from Tamil culture. Each design carries deep spiritual meaning and has been passed down through generations. Click any pattern to start your own kolam journey.',
        ta: 'தமிழ் பண்பாட்டின் உண்மையான பாரம்பரிய கோலம் வடிவங்களைக் கண்டறியுங்கள். ஒவ்வொரு வடிவமும் ஆழ்ந்த ஆன்மீக அர்த்தத்தைக் கொண்டுள்ளது.',
        hi: 'तमिल संस्कृति के प्रामाणिक पारंपरिक कोलम पैटर्न की खोज करें। प्रत्येक डिज़ाइन गहरा आध्यात्मिक अर्थ रखता है।',
        fr: 'Découvrez les véritables motifs traditionnels de kolam de la culture tamoule. Chaque design porte une signification spirituelle profonde.'
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
            {kolamDesigns.map((design) => (
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
                  <CardDescription className="text-sm mb-2">
                    {design.strokeCount} {getLocalizedText('strokes')} • {design.createdAt}
                  </CardDescription>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {design.description}
                  </p>
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