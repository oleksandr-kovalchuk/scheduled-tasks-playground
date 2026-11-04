import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/shared/i18n/languages'
import { LANGUAGE_STORAGE_KEY } from '@/shared/i18n/languageStorageKey'
import { en } from '@/shared/i18n/locales/en'
import { uk } from '@/shared/i18n/locales/uk'

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      uk: { translation: uk },
    },
    supportedLngs: SUPPORTED_LANGUAGES,
    // Map regional variants from the browser (en-US, uk-UA) onto the languages we ship.
    nonExplicitSupportedLngs: true,
    fallbackLng: DEFAULT_LANGUAGE,
    // A stored choice wins over the browser language, and the active language is stored on every change.
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      caches: ['localStorage'],
    },
    // Resources are bundled, so there is nothing to wait for: translations are ready before the first render.
    initAsync: false,
    // React already escapes interpolated values.
    interpolation: { escapeValue: false },
  })

export { i18n }
