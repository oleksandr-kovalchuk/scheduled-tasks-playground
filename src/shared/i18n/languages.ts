export const SUPPORTED_LANGUAGES = ['en', 'uk'] as const

export type Language = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE = 'en' satisfies Language

// Endonyms: each language is named in itself so a user can find theirs whatever the current UI language is.
export const LANGUAGE_NAMES = {
  en: 'English',
  uk: 'Українська',
} satisfies Record<Language, string>
