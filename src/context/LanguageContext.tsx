import React, { useState, useEffect } from 'react';
import type { SupportedLanguage } from '../types/i18n';
import { StorageService, StorageKeys } from '../services/storageService';
import { getTranslations } from '../i18n';
import { LanguageContext } from './LanguageContextObject';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    return StorageService.get<SupportedLanguage>(StorageKeys.LANGUAGE, 'en');
  });

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    StorageService.set(StorageKeys.LANGUAGE, newLang);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = getTranslations(language);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

