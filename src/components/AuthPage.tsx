import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Language } from '@/types';
import { useTranslation } from '@/lib/translations';
import { useAuth } from '@/hooks/use-auth';

interface AuthPageProps {
  language: Language;
  onNavigate: (page: 'home') => void;
}

export function AuthPage({ language, onNavigate }: AuthPageProps) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', password: '', name: '', confirmPassword: '' });
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslation(language);
  const { login, signup } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(loginForm.email, loginForm.password);
    if (success) {
      onNavigate('home');
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupForm.password !== signupForm.confirmPassword) {
      return;
    }
    
    setIsLoading(true);
    
    const success = await signup(signupForm.email, signupForm.password, signupForm.name);
    if (success) {
      onNavigate('home');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen kolam-pattern flex items-center justify-center px-4 pt-20">
      <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm glow-soft">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {language === 'en' && 'Welcome to Kolam AI'}
            {language === 'ta' && 'கோலம் AI வில் வரவேற்கிறோம்'}
            {language === 'hi' && 'कोलम AI में आपका स्वागत है'}
            {language === 'fr' && 'Bienvenue sur Kolam AI'}
          </CardTitle>
          <CardDescription>
            {language === 'en' && 'Create your account to save designs and access the AI mentor'}
            {language === 'ta' && 'வடிவங்களை சேமிக்கவும் AI குருவை அணுகவும் உங்கள் கணக்கை உருவாக்கவும்'}
            {language === 'hi' && 'डिज़ाइन सेव करने और AI मेंटर तक पहुंचने के लिए अपना खाता बनाएं'}
            {language === 'fr' && 'Créez votre compte pour sauvegarder vos créations et accéder au mentor IA'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t('login')}</TabsTrigger>
              <TabsTrigger value="signup">{t('signup')}</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">
                    {language === 'en' && 'Email'}
                    {language === 'ta' && 'மின்னஞ்சல்'}
                    {language === 'hi' && 'ईमेल'}
                    {language === 'fr' && 'Email'}
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder={
                      language === 'en' ? 'Enter your email' :
                      language === 'ta' ? 'உங்கள் மின்னஞ்சலை உள்ளிடவும்' :
                      language === 'hi' ? 'अपना ईमेल दर्ज करें' :
                      'Entrez votre email'
                    }
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    required
                    className="glow-accent focus:glow-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">
                    {language === 'en' && 'Password'}
                    {language === 'ta' && 'கடவுச்சொல்'}
                    {language === 'hi' && 'पासवर्ड'}
                    {language === 'fr' && 'Mot de passe'}
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder={
                      language === 'en' ? 'Enter your password' :
                      language === 'ta' ? 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்' :
                      language === 'hi' ? 'अपना पासवर्ड दर्ज करें' :
                      'Entrez votre mot de passe'
                    }
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                    className="glow-accent focus:glow-primary"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full glow-primary" 
                  disabled={isLoading}
                >
                  {isLoading ? t('loading') : t('login')}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4 mt-6">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">
                    {language === 'en' && 'Name'}
                    {language === 'ta' && 'பெயர்'}
                    {language === 'hi' && 'नाम'}
                    {language === 'fr' && 'Nom'}
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder={
                      language === 'en' ? 'Enter your name' :
                      language === 'ta' ? 'உங்கள் பெயரை உள்ளிடவும்' :
                      language === 'hi' ? 'अपना नाम दर्ज करें' :
                      'Entrez votre nom'
                    }
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    required
                    className="glow-accent focus:glow-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">
                    {language === 'en' && 'Email'}
                    {language === 'ta' && 'மின்னஞ்சல்'}
                    {language === 'hi' && 'ईमेल'}
                    {language === 'fr' && 'Email'}
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder={
                      language === 'en' ? 'Enter your email' :
                      language === 'ta' ? 'உங்கள் மின்னஞ்சலை உள்ளிடவும்' :
                      language === 'hi' ? 'अपना ईमेल दर्ज करें' :
                      'Entrez votre email'
                    }
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    required
                    className="glow-accent focus:glow-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">
                    {language === 'en' && 'Password'}
                    {language === 'ta' && 'கடவுச்சொல்'}
                    {language === 'hi' && 'पासवर्ड'}
                    {language === 'fr' && 'Mot de passe'}
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder={
                      language === 'en' ? 'Create a password' :
                      language === 'ta' ? 'கடவுச்சொல்லை உருவாக்கவும்' :
                      language === 'hi' ? 'पासवर्ड बनाएं' :
                      'Créez un mot de passe'
                    }
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    required
                    className="glow-accent focus:glow-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm">
                    {language === 'en' && 'Confirm Password'}
                    {language === 'ta' && 'கடவுச்சொல்லை உறுதிப்படுத்தவும்'}
                    {language === 'hi' && 'पासवर्ड की पुष्टि करें'}
                    {language === 'fr' && 'Confirmez le mot de passe'}
                  </Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    placeholder={
                      language === 'en' ? 'Confirm your password' :
                      language === 'ta' ? 'உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்' :
                      language === 'hi' ? 'अपने पासवर्ड की पुष्टि करें' :
                      'Confirmez votre mot de passe'
                    }
                    value={signupForm.confirmPassword}
                    onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                    required
                    className="glow-accent focus:glow-primary"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full glow-primary" 
                  disabled={isLoading || signupForm.password !== signupForm.confirmPassword}
                >
                  {isLoading ? t('loading') : t('signup')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => onNavigate('home')}
              className="text-sm text-muted-foreground"
            >
              {language === 'en' && 'Continue as guest'}
              {language === 'ta' && 'விருந்தினராக தொடரவும்'}
              {language === 'hi' && 'अतिथि के रूप में जारी रखें'}
              {language === 'fr' && 'Continuer en tant qu\'invité'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}