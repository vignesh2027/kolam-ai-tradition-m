import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Image, 
  Download, 
  Eye, 
  Play, 
  Heart, 
  Star, 
  Clock,
  Sparkle,
  Brain,
  Palette,
  TreeEvergreen,
  Users
} from '@phosphor-icons/react';
import { Language } from '@/types';
import { useTranslation } from '@/lib/translations';
import { kolamTemplates, kolamReels, kolamBenefits } from '@/data/kolamData';
import { useKV } from '@github/spark/hooks';

interface GalleryPageProps {
  language: Language;
}

export function GalleryPage({ language }: GalleryPageProps) {
  const t = useTranslation(language);
  const [activeTab, setActiveTab] = useState('templates');
  const [likedReels, setLikedReels] = useKV<string[]>('liked-reels', []);

  const getBenefitIcon = (iconName: string) => {
    const iconMap = {
      brain: Brain,
      lotus: Sparkle,
      heritage: TreeEvergreen,
      palette: Palette,
      peace: Heart,
      community: Users
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Sparkle;
    return <IconComponent size={24} className="text-primary" />;
  };

  const handleLikeReel = (reelId: string) => {
    setLikedReels(current => {
      const currentArray = current || [];
      return currentArray.includes(reelId) 
        ? currentArray.filter(id => id !== reelId)
        : [...currentArray, reelId];
    });
  };

  const getLocalizedText = (key: string) => {
    const texts: Record<string, Record<Language, string>> = {
      gallery: {
        en: 'Kolam Gallery',
        ta: 'கோலம் தொகுப்பு',
        hi: 'कोलम गैलरी',
        fr: 'Galerie Kolam'
      },
      templates: {
        en: 'Templates',
        ta: 'மாதிரிகள்',
        hi: 'टेम्प्लेट',
        fr: 'Modèles'
      },
      reels: {
        en: 'Reels & Tutorials',
        ta: 'ரீல்ஸ் & பயிற்சி',
        hi: 'रील्स & ट्यूटोरियल',
        fr: 'Reels & Tutoriels'
      },
      benefits: {
        en: 'Benefits',
        ta: 'நன்மைகள்',
        hi: 'लाभ',
        fr: 'Avantages'
      },
      viewDesign: {
        en: 'View Design',
        ta: 'வடிவத்தைப் பார்',
        hi: 'डिज़ाइन देखें',
        fr: 'Voir design'
      },
      useTemplate: {
        en: 'Use Template',
        ta: 'மாதிரி பயன்படுத்து',
        hi: 'टेम्प्लेट उपयोग करें',
        fr: 'Utiliser modèle'
      },
      watch: {
        en: 'Watch',
        ta: 'பார்க்கவும்',
        hi: 'देखें',
        fr: 'Regarder'
      },
      views: {
        en: 'views',
        ta: 'பார்வைகள்',
        hi: 'व्यूज',
        fr: 'vues'
      },
      likes: {
        en: 'likes',
        ta: 'விருப்பங்கள்',
        hi: 'लाइक्स',
        fr: 'likes'
      },
      learnMore: {
        en: 'Learn More',
        ta: 'மேலும் அறிய',
        hi: 'और जानें',
        fr: 'En savoir plus'
      },
      exploreTemplates: {
        en: 'Discover authentic traditional kolam patterns from Tamil culture. Each design carries deep spiritual meaning and has been passed down through generations.',
        ta: 'தமிழ் பண்பாட்டின் உண்மையான பாரம்பரிய கோலம் வடிவங்களைக் கண்டறியுங்கள். ஒவ்வொரு வடிவமும் ஆழ்ந்த ஆன்மீக அர்த்தத்தைக் கொண்டுள்ளது.',
        hi: 'तमिल संस्कृति के प्रामाणिक पारंपरिक कोलम पैटर्न की खोज करें। प्रत्येक डिज़ाइन गहरा आध्यात्मिक अर्थ रखता है।',
        fr: 'Découvrez les véritables motifs traditionnels de kolam de la culture tamoule. Chaque design porte une signification spirituelle profonde.'
      },
      exploreReels: {
        en: 'Watch inspiring kolam creation videos, tutorials, and cultural demonstrations. Learn techniques from masters and discover the art\'s rich heritage.',
        ta: 'உத்வேகம் அளிக்கும் கோலம் உருவாக்கல் வீடியோக்கள், பயிற்சிகள் மற்றும் கலாச்சார நிகழ்ச்சிகளைப் பார்க்கவும்.',
        hi: 'प्रेरणादायक कोलम निर्माण वीडियो, ट्यूटोरियल और सांस्कृतिक प्रदर्शन देखें। मास्टर्स से तकनीक सीखें।',
        fr: 'Regardez des vidéos inspirantes de création de kolam, des tutoriels et des démonstrations culturelles.'
      },
      exploreBenefits: {
        en: 'Discover the mental, spiritual, and cultural benefits of practicing kolam art. From stress relief to cultural connection, kolam offers holistic wellness.',
        ta: 'கோலம் கலையைப் பயிற்சி செய்வதால் கிடைக்கும் மனம், ஆன்மீக மற்றும் கலாச்சார நன்மைகளைக் கண்டறியுங்கள்.',
        hi: 'कोलम कला का अभ्यास करने के मानसिक, आध्यात्मिक और सांस्कृतिक लाभों की खोज करें।',
        fr: 'Découvrez les bienfaits mentaux, spirituels et culturels de la pratique de l\'art kolam.'
      }
    };
    
    return texts[key]?.[language] || texts[key]?.en || key;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background pt-20 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            {getLocalizedText('gallery')}
          </h1>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-3 mb-8">
            <TabsTrigger value="templates" className="flex items-center space-x-2">
              <Image size={18} />
              <span>{getLocalizedText('templates')}</span>
            </TabsTrigger>
            <TabsTrigger value="reels" className="flex items-center space-x-2">
              <Play size={18} />
              <span>{getLocalizedText('reels')}</span>
            </TabsTrigger>
            <TabsTrigger value="benefits" className="flex items-center space-x-2">
              <Heart size={18} />
              <span>{getLocalizedText('benefits')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-6">
            <div className="mb-6">
              <p className="text-muted-foreground text-lg max-w-4xl">
                {getLocalizedText('exploreTemplates')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {kolamTemplates.map((design) => (
                <Card key={design.id} className="group hover:glow-primary transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20">
                  <CardHeader className="p-4">
                    <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden relative">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center">
                        <div className="text-center">
                          <Image size={48} className="text-primary/60 mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">{design.name}</p>
                        </div>
                      </div>
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
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {design.difficulty}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Heart size={14} className="text-primary" />
                        <span className="text-sm text-muted-foreground">{design.likes}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      {design.description}
                    </p>
                  </CardHeader>

                  <CardContent className="p-4 pt-0">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {design.tags.slice(0, 3).map((tag) => (
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
                        <Sparkle size={14} className="mr-2" />
                        {getLocalizedText('useTemplate')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reels Tab */}
          <TabsContent value="reels" className="space-y-6">
            <div className="mb-6">
              <p className="text-muted-foreground text-lg max-w-4xl">
                {getLocalizedText('exploreReels')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kolamReels.map((reel) => (
                <Card key={reel.id} className="group hover:glow-accent transition-all duration-300 bg-card/50 backdrop-blur-sm border-accent/20">
                  <CardHeader className="p-4">
                    <div className="aspect-video bg-muted rounded-lg mb-3 overflow-hidden relative">
                      <div className="w-full h-full bg-gradient-to-br from-accent/20 via-primary/20 to-secondary/20 flex items-center justify-center">
                        <div className="text-center">
                          <Play size={48} className="text-accent/60 mx-auto mb-2" />
                          <div className="absolute bottom-2 right-2 bg-background/80 rounded px-2 py-1">
                            <div className="flex items-center space-x-1">
                              <Clock size={12} />
                              <span className="text-xs">{Math.floor(reel.duration / 60)}:{(reel.duration % 60).toString().padStart(2, '0')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button size="lg" variant="default" className="rounded-full glow-accent">
                          <Play size={24} />
                        </Button>
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg mb-2">{reel.title}</CardTitle>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={reel.type === 'tutorial' ? 'default' : 'secondary'} className="text-xs">
                        {reel.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {reel.difficulty}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      {reel.description}
                    </p>
                  </CardHeader>

                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye size={12} />
                          <span>{formatNumber(reel.views)} {getLocalizedText('views')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart size={12} />
                          <span>{formatNumber(reel.likes)} {getLocalizedText('likes')}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleLikeReel(reel.id)}
                        className={(likedReels || []).includes(reel.id) ? 'text-primary' : ''}
                      >
                        <Heart size={16} className={(likedReels || []).includes(reel.id) ? 'fill-current' : ''} />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {reel.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <Button size="sm" variant="default" className="w-full glow-accent">
                      <Play size={14} className="mr-2" />
                      {getLocalizedText('watch')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Benefits Tab */}
          <TabsContent value="benefits" className="space-y-6">
            <div className="mb-6">
              <p className="text-muted-foreground text-lg max-w-4xl">
                {getLocalizedText('exploreBenefits')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kolamBenefits.map((benefit) => (
                <Card key={benefit.id} className="group hover:glow-secondary transition-all duration-300 bg-card/50 backdrop-blur-sm border-secondary/20 p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                      {getBenefitIcon(benefit.icon)}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground mb-4">{benefit.description}</p>
                    
                    <Badge variant="outline" className="mb-4">
                      {benefit.category}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {benefit.details.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Star size={14} className="text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{detail}</p>
                      </div>
                    ))}
                  </div>

                  <Button size="sm" variant="outline" className="w-full mt-4">
                    {getLocalizedText('learnMore')}
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}