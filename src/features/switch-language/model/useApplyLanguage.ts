import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export function useApplyLanguage() {
  const { t, i18n } = useTranslation()
  const language = i18n.resolvedLanguage
  const documentTitle = t('app.documentTitle')

  useEffect(() => {
    // Screen readers pick their pronunciation from `lang`, so it has to follow the UI language.
    if (language) document.documentElement.lang = language
    document.title = documentTitle
  }, [language, documentTitle])
}
