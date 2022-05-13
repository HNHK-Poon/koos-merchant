import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import en from '@locales/en.json';
import cn from '@locales/cn.json';

i18n.use(LanguageDetector)
    .use(Backend)
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources: {
            'en': {
                // translation is the default namespace
                translation: en,
            },
            'zh': {
                translation: cn,
            },
        },
        fallbackLng: 'en',
        debug: true,
        nonExplicitSupportedLngs: true,
        supportedLngs: ['en', 'zh'], // available languages for browser dector to pick from
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });
export default i18n;
