import { createContext } from 'react';
import type { SupportedLanguage } from '../types/i18n';
import type { TranslationDict } from '../i18n';

export interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDict;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

