export type SupportedLanguage = 'en' | 'yo' | 'pcm';

export interface LanguageOption {
  code: SupportedLanguage;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'yo', label: 'Yoruba', nativeLabel: 'Èdè Yorùbá', flag: '🇳🇬' },
  { code: 'pcm', label: 'Pidgin', nativeLabel: 'Naija Pidgin', flag: '🇳🇬' },
];

