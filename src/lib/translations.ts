import { Language, TranslationKeys } from '../types';

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // Navigation
    home: 'Home',
    canvas: 'Canvas',
    gallery: 'Gallery', 
    mentor: 'Mentor',
    auth: 'Account',
    
    // Actions
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    save: 'Save',
    export: 'Export',
    clear: 'Clear',
    undo: 'Undo',
    redo: 'Redo',
    
    // Canvas
    symmetryMode: 'Symmetry',
    brushType: 'Brush',
    color: 'Color',
    grid: 'Grid',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success'
  },
  ta: {
    // Navigation (Tamil)
    home: 'முகப்பு',
    canvas: 'வரைபடம்',
    gallery: 'தொகுப்பு',
    mentor: 'குரு',
    auth: 'கணக்கு',
    
    // Actions
    login: 'உள்நுழை',
    signup: 'பதிவு செய்',
    logout: 'வெளியேறு',
    save: 'சேமி',
    export: 'ஏற்றுமதி',
    clear: 'அழி',
    undo: 'செயல்தவிர்',
    redo: 'மீட்டமை',
    
    // Canvas
    symmetryMode: 'சமச்சீர்',
    brushType: 'தூரிகை',
    color: 'நிறம்',
    grid: 'கட்டம்',
    
    // Common
    loading: 'ஏற்றுகிறது...',
    error: 'பிழை',
    success: 'வெற்றி'
  },
  hi: {
    // Navigation (Hindi)
    home: 'होम',
    canvas: 'कैनवास',
    gallery: 'गैलरी',
    mentor: 'गुरु',
    auth: 'खाता',
    
    // Actions
    login: 'लॉगिन',
    signup: 'साइन अप',
    logout: 'लॉगआउट',
    save: 'सेव',
    export: 'एक्सपोर्ट',
    clear: 'साफ़',
    undo: 'पूर्ववत',
    redo: 'फिर से',
    
    // Canvas
    symmetryMode: 'समरूपता',
    brushType: 'ब्रश',
    color: 'रंग',
    grid: 'ग्रिड',
    
    // Common
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता'
  },
  fr: {
    // Navigation (French)
    home: 'Accueil',
    canvas: 'Toile',
    gallery: 'Galerie',
    mentor: 'Mentor',
    auth: 'Compte',
    
    // Actions
    login: 'Connexion',
    signup: 'S\'inscrire',
    logout: 'Déconnexion',
    save: 'Enregistrer',
    export: 'Exporter',
    clear: 'Effacer',
    undo: 'Annuler',
    redo: 'Refaire',
    
    // Canvas
    symmetryMode: 'Symétrie',
    brushType: 'Pinceau',
    color: 'Couleur',
    grid: 'Grille',
    
    // Common
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès'
  }
};

export const useTranslation = (language: Language) => {
  return (key: keyof TranslationKeys): string => {
    return translations[language][key] || translations.en[key];
  };
};