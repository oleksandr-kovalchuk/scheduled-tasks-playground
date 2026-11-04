import { useTranslation } from 'react-i18next'
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES } from '@/shared/i18n/languages'
import { Select } from '@/shared/ui/Select'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()

  return (
    <Select
      aria-label={t('switchLanguage.label')}
      value={i18n.resolvedLanguage}
      onChange={(event) => void i18n.changeLanguage(event.target.value)}
    >
      {SUPPORTED_LANGUAGES.map((language) => (
        <option key={language} value={language} lang={language}>
          {LANGUAGE_NAMES[language]}
        </option>
      ))}
    </Select>
  )
}
