import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import en from './idiomas/en.json';
import pt from './idiomas/pt.json';

const supportedLanguages = ['pt', 'en'];
const deviceLanguage = getLocales()?.[0]?.languageCode ?? 'pt';
const normalizedLanguage = deviceLanguage.split('-')[0]; // "pt-BR" → "pt"
const initialLanguage = supportedLanguages.includes(normalizedLanguage) ? normalizedLanguage : 'pt';


i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: initialLanguage,
  fallbackLng: 'en',
  supportedLngs: supportedLanguages,
  resources: {
    pt: { translation: pt },
    en: { translation: en }
  },
  interpolation: { escapeValue: false },
});

export default i18n;