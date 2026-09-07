import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, LanguageCode, TRANSLATIONS, TranslationStrings, LanguageMeta } from '../data/translations';
import { APP_TRANSLATIONS, AppTranslations, getAppTranslation } from '../data/appTranslations';

interface LanguageContextType {
  currentLang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: TranslationStrings;
  at: AppTranslations;
  languages: LanguageMeta[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
  initialLang?: LanguageCode;
  onLangChange?: (lang: LanguageCode) => void;
}> = ({ children, initialLang, onLangChange }) => {
  const [currentLang, setCurrentLangState] = useState<LanguageCode>(() => {
    if (initialLang) return initialLang;
    const saved = localStorage.getItem('ner_lang') as LanguageCode;
    return saved || 'en';
  });

  const setLang = (lang: LanguageCode) => {
    setCurrentLangState(lang);
    localStorage.setItem('ner_lang', lang);
    if (onLangChange) {
      onLangChange(lang);
    }
  };

  useEffect(() => {
    if (initialLang && initialLang !== currentLang) {
      setCurrentLangState(initialLang);
    }
  }, [initialLang]);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const at = getAppTranslation(currentLang);

  return (
    <LanguageContext.Provider value={{ currentLang, setLang, t, at, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback if rendered outside LanguageProvider
    const defaultLang: LanguageCode = (localStorage.getItem('ner_lang') as LanguageCode) || 'en';
    return {
      currentLang: defaultLang,
      setLang: () => {},
      t: TRANSLATIONS[defaultLang] || TRANSLATIONS.en,
      at: getAppTranslation(defaultLang),
      languages: LANGUAGES,
    };
  }
  return context;
};
