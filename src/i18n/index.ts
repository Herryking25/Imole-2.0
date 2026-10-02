import { en } from './en';
import { yo } from './yo';
import { pcm } from './pcm';
import type { SupportedLanguage } from '../types/i18n';

export const TRANSLATIONS = {
  en,
  yo,
  pcm,
};

export type TranslationDict = typeof en;

export function getTranslations(lang: SupportedLanguage): TranslationDict {
  return TRANSLATIONS[lang] || en;
}

